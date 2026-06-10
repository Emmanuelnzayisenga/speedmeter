import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendSms } from '@/lib/sms'

// ─── Geo helpers ─────────────────────────────────────────────────────────────

function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371000
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function pointInPolygon(
  lat: number, lng: number,
  polygon: { lat: number; lng: number }[]
): boolean {
  let inside = false
  const n = polygon.length
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i].lng, yi = polygon[i].lat
    const xj = polygon[j].lng, yj = polygon[j].lat
    const intersects =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    if (intersects) inside = !inside
  }
  return inside
}

function pointInCircle(
  lat: number, lng: number,
  centerLat: number, centerLng: number,
  radiusMeters: number
): boolean {
  return haversineDistance(lat, lng, centerLat, centerLng) <= radiusMeters
}

function distanceToSegment(
  lat: number, lng: number,
  aLat: number, aLng: number,
  bLat: number, bLng: number
): number {
  const dx = bLng - aLng
  const dy = bLat - aLat
  const lenSq = dx * dx + dy * dy
  if (lenSq === 0) return haversineDistance(lat, lng, aLat, aLng)
  let t = ((lng - aLng) * dx + (lat - aLat) * dy) / lenSq
  t = Math.max(0, Math.min(1, t))
  return haversineDistance(lat, lng, aLat + t * dy, aLng + t * dx)
}

function pointInCorridor(
  lat: number, lng: number,
  waypoints: { lat: number; lng: number }[],
  halfWidthMeters: number
): boolean {
  if (waypoints.length < 2) return false
  for (let i = 0; i < waypoints.length - 1; i++) {
    if (
      distanceToSegment(
        lat, lng,
        waypoints[i].lat, waypoints[i].lng,
        waypoints[i + 1].lat, waypoints[i + 1].lng
      ) <= halfWidthMeters
    ) return true
  }
  return false
}

function isPointInZone(
  lat: number, lng: number,
  zoneType: string,
  coordinates: unknown
): boolean {
  try {
    switch (zoneType) {
      case 'CIRCLE': {
        const c = coordinates as { lat: number; lng: number; radius: number }
        if (!c?.lat || !c?.lng || !c?.radius) return false
        return pointInCircle(lat, lng, c.lat, c.lng, c.radius)
      }
      case 'POLYGON': {
        const poly = coordinates as { lat: number; lng: number }[]
        if (!Array.isArray(poly) || poly.length < 3) return false
        return pointInPolygon(lat, lng, poly)
      }
      case 'CORRIDOR':
      case 'ROAD': {
        const raw = coordinates as any
        if (raw?.waypoints && Array.isArray(raw.waypoints))
          return pointInCorridor(lat, lng, raw.waypoints, (raw.width ?? 50) / 2)
        if (Array.isArray(raw) && raw.length >= 2)
          return pointInCorridor(lat, lng, raw, 25)
        return false
      }
      default:
        return false
    }
  } catch {
    return false
  }
}

function calculateFine(excessSpeed: number): number {
  if (excessSpeed <= 10) return 5000
  if (excessSpeed <= 20) return 15000
  if (excessSpeed <= 30) return 30000
  return 50000
}

// ─── Helper: safely coerce to float ─────────────────────────────────────────

function toFloat(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return parseFloat(value)
  return NaN
}

function toInt(value: unknown): number | null {
  if (value === undefined || value === null) return null
  if (typeof value === 'number') return Math.round(value)
  if (typeof value === 'string') return parseInt(value, 10)
  return null
}

// ─── POST /api/gps/ingest ────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    // 1. Guard against empty / non-JSON bodies
    const text = await req.text()
    if (!text?.trim()) {
      console.warn('[ingest] Empty request body')
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }

    // 2. Parse JSON safely
    let body: any
    try {
      body = JSON.parse(text)
    } catch (parseErr) {
      console.warn('[ingest] JSON parse error:', parseErr)
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const {
      deviceId,
      latitude,
      longitude,
      speed,
      heading,
      altitude,
      accuracy,
      satellites,
      timestamp,
    } = body

    // 3. Validate required fields exist
    if (
      !deviceId ||
      latitude === undefined ||
      longitude === undefined ||
      speed === undefined
    ) {
      return NextResponse.json(
        { error: 'deviceId, latitude, longitude, speed are required' },
        { status: 400 }
      )
    }

    // 4. Coerce and validate numeric types
    const lat = toFloat(latitude)
    const lng = toFloat(longitude)
    const spd = toFloat(speed)

    if (isNaN(lat) || isNaN(lng) || isNaN(spd)) {
      return NextResponse.json(
        { error: 'latitude, longitude, speed must be valid numbers' },
        { status: 400 }
      )
    }

    // 5. Skip frames that have no real GPS fix (0,0 is the null-island default)
    if (lat === 0 && lng === 0) {
      console.warn(`[ingest] Skipping null-island frame for device ${deviceId}`)
      return NextResponse.json({ skipped: true, reason: 'No GPS fix' })
    }

    // 6. Look up vehicle
    const vehicle = await prisma.vehicle.findUnique({ where: { deviceId } })
    if (!vehicle) {
      return NextResponse.json(
        { error: `No vehicle found for deviceId: ${deviceId}` },
        { status: 404 }
      )
    }

    // 7. Store location
    const location = await prisma.vehicleLocation.create({
      data: {
        vehicleId: vehicle.id,
        latitude:  lat,
        longitude: lng,
        speed:     spd,
        heading:   toFloat(heading)  || null,
        altitude:  toFloat(altitude) || null,
        accuracy:  toFloat(accuracy) || null,
        satellites: toInt(satellites),
        // FIX: actually use the device timestamp when provided
        timestamp: timestamp ? new Date(timestamp) : new Date(),
      },
    })

    // 8. Determine vehicle status and check speed zones
    let newStatus = spd > 0 ? 'MOVING' : 'ACTIVE'
    const activeZones = await prisma.speedZone.findMany({ where: { active: true } })
    let violation = null

    for (const zone of activeZones) {
      const inZone = isPointInZone(lat, lng, zone.zoneType, zone.coordinates)

      if (inZone && spd > zone.speedLimit) {
        newStatus = 'SPEEDING'
        const excessSpeed = spd - zone.speedLimit
        const fineAmount  = calculateFine(excessSpeed)

        violation = await prisma.violation.create({
          data: {
            vehicleId:  vehicle.id,
            zoneId:     zone.id,
            latitude:   lat,
            longitude:  lng,
            speed:      spd,
            speedLimit: zone.speedLimit,
            excessSpeed,
            fineAmount,
          },
        })

        // Send SMS alert (fire-and-forget — don't let SMS failure break the response)
        sendSms({
          to: vehicle.driverPhone || '',
          message:
            `On ${violation.timestamp.toLocaleString()}, your vehicle ` +
            `${vehicle.plateNumber} was recorded speeding at ${violation.speed} km/h ` +
            `in zone "${zone.name}" (limit: ${zone.speedLimit} km/h).\n\n` +
            `Fine: RWF ${fineAmount}.\n\n` +
            `💳 Pay now: ${process.env.NEXTAUTH_URL}/payments/${violation.id}\n` +
            `🔍 View fines: ${process.env.NEXTAUTH_URL}/fines?plate=${vehicle.plateNumber}\n\n` +
            `Please drive safely!`,
        }).catch(smsErr => {
          console.error('[ingest] SMS send failed:', smsErr)
        })

        break // one violation per frame is enough
      }
    }

    // 9. Update vehicle status
    await prisma.vehicle.update({
      where: { id: vehicle.id },
      data:  { status: newStatus as any },
    })

    return NextResponse.json({
      success:    true,
      vehicleId:  vehicle.id,
      locationId: location.id,
      status:     newStatus,
      violation:  violation
        ? {
            id:          violation.id,
            excessSpeed: violation.excessSpeed,
            fineAmount:  violation.fineAmount,
          }
        : null,
    })
  } catch (error) {
    console.error('[ingest] Unhandled error:', error)
    return NextResponse.json({ error: 'Failed to process GPS data' }, { status: 500 })
  }
}

// ─── PUT /api/gps/ingest  (batch) ────────────────────────────────────────────

export async function PUT(req: NextRequest) {
  try {
    const text = await req.text()
    if (!text?.trim()) {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }

    let body: any
    try {
      body = JSON.parse(text)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { readings } = body
    if (!Array.isArray(readings)) {
      return NextResponse.json({ error: 'readings must be an array' }, { status: 400 })
    }

    const results = await Promise.allSettled(
      readings.map(async (reading) => {
        const vehicle = await prisma.vehicle.findUnique({
          where: { deviceId: reading.deviceId },
        })
        if (!vehicle) return { deviceId: reading.deviceId, error: 'Not found' }

        await prisma.vehicleLocation.create({
          data: {
            vehicleId: vehicle.id,
            latitude:  toFloat(reading.latitude),
            longitude: toFloat(reading.longitude),
            speed:     toFloat(reading.speed),
            heading:   reading.heading ? toFloat(reading.heading) : null,
            // FIX: use provided timestamp
            timestamp: reading.timestamp ? new Date(reading.timestamp) : new Date(),
          },
        })

        return { deviceId: reading.deviceId, vehicleId: vehicle.id, success: true }
      })
    )

    return NextResponse.json({
      processed: results.length,
      results: results.map(r =>
        r.status === 'fulfilled' ? r.value : { error: 'Failed' }
      ),
    })
  } catch {
    return NextResponse.json({ error: 'Batch processing failed' }, { status: 500 })
  }
}