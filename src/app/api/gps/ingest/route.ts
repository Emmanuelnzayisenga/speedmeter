import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendSms } from '@/lib/sms'
import { isPointInZone } from '@/lib/geo'

function calculateFine(excessSpeed: number): number {
  if (excessSpeed <= 10) return 5000
  if (excessSpeed <= 20) return 15000
  if (excessSpeed <= 30) return 30000
  return 50000
}

// ─── Coercion helpers ────────────────────────────────────────────────────────

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

function toDate(value: unknown): Date {
  if (!value) return new Date()
  const d = new Date(value as any)
  return isNaN(d.getTime()) ? new Date() : d
}

// ─── POST /api/gps/ingest ────────────────────────────────────────────────────

const SMS_COOLDOWN_MS = 5 * 60 * 1000 // 5 minutes per vehicle+zone

export async function POST(req: NextRequest) {
  try {
    const text = await req.text()
    if (!text?.trim()) {
      console.warn('[ingest] Empty request body')
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
    }

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

    if (
      !deviceId ||
      latitude  === undefined ||
      longitude === undefined ||
      speed     === undefined
    ) {
      return NextResponse.json(
        { error: 'deviceId, latitude, longitude, speed are required' },
        { status: 400 }
      )
    }

    const lat = toFloat(latitude)
    const lng = toFloat(longitude)
    const spd = toFloat(speed)

    if (isNaN(lat) || isNaN(lng) || isNaN(spd)) {
      return NextResponse.json(
        { error: 'latitude, longitude, speed must be valid numbers' },
        { status: 400 }
      )
    }

    if (lat === 0 && lng === 0) {
      console.warn(`[ingest] Skipping null-island frame for device ${deviceId}`)
      return NextResponse.json({ skipped: true, reason: 'No GPS fix' })
    }

    const vehicle = await prisma.vehicle.findUnique({ where: { deviceId } })
    if (!vehicle) {
      return NextResponse.json(
        { error: `No vehicle found for deviceId: ${deviceId}` },
        { status: 404 }
      )
    }

    const location = await prisma.vehicleLocation.create({
      data: {
        vehicleId:  vehicle.id,
        latitude:   lat,
        longitude:  lng,
        speed:      spd,
        heading:    toFloat(heading)  || null,
        altitude:   toFloat(altitude) || null,
        accuracy:   toFloat(accuracy) || null,
        satellites: toInt(satellites),
        timestamp:  toDate(timestamp),
      },
    })

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

        // Only send SMS if no violation was recorded for this vehicle+zone
        // within the cooldown window — violations are still always recorded
        const recentViolation = await prisma.violation.findFirst({
          where: {
            vehicleId: vehicle.id,
            zoneId:    zone.id,
            id:        { not: violation.id },
            timestamp: { gte: new Date(Date.now() - SMS_COOLDOWN_MS) },
          },
          orderBy: { timestamp: 'desc' },
        })

        if (!recentViolation) {
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
        }

        break // one violation per frame is enough
      }
    }

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
            timestamp: toDate(reading.timestamp),
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