import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { pointInCircle, calculateFine } from '@/lib/utils'

/**
 * GPS Device Data Ingestion Endpoint
 * 
 * POST /api/gps/ingest
 * 
 * Payload (JSON):
 * {
 *   deviceId: string,       // GPS device identifier
 *   latitude: number,
 *   longitude: number,
 *   speed: number,          // km/h
 *   heading?: number,       // degrees 0-360
 *   altitude?: number,      // meters
 *   accuracy?: number,      // meters
 *   satellites?: number,
 *   timestamp?: string      // ISO 8601, defaults to now
 * }
 * 
 * Returns:
 * {
 *   success: boolean,
 *   vehicleId: string,
 *   violation?: { id, excessSpeed, fineAmount }
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { deviceId, latitude, longitude, speed, heading, altitude, accuracy, satellites, timestamp } = body

    if (!deviceId || latitude === undefined || longitude === undefined || speed === undefined) {
      return NextResponse.json(
        { error: 'deviceId, latitude, longitude, speed are required' },
        { status: 400 }
      )
    }

    // Find vehicle by device ID
    const vehicle = await prisma.vehicle.findUnique({ where: { deviceId } })
    if (!vehicle) {
      return NextResponse.json({ error: `No vehicle found for deviceId: ${deviceId}` }, { status: 404 })
    }

    // Save location
    const location = await prisma.vehicleLocation.create({
      data: {
        vehicleId: vehicle.id,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        speed: parseFloat(speed),
        heading: heading ? parseFloat(heading) : null,
        altitude: altitude ? parseFloat(altitude) : null,
        accuracy: accuracy ? parseFloat(accuracy) : null,
        satellites: satellites ? parseInt(satellites) : null,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
      },
    })

    // Determine vehicle status
    let newStatus = speed > 0 ? 'MOVING' : 'ACTIVE'

    // Check speed zones for violations
    const activeZones = await prisma.speedZone.findMany({ where: { active: true } })
    let violation = null

    for (const zone of activeZones) {
      let inZone = false

      try {
        if (zone.zoneType === 'CIRCLE') {
          const coords = zone.coordinates as { lat: number; lng: number; radius: number }
          inZone = pointInCircle(latitude, longitude, coords.lat, coords.lng, coords.radius)
        } else if (zone.zoneType === 'POLYGON') {
          // Simple bounding box check for now (full ray-casting would be in production)
          const coords = zone.coordinates as { lat: number; lng: number }[]
          if (coords.length >= 3) {
            const lats = coords.map(c => c.lat)
            const lngs = coords.map(c => c.lng)
            inZone = latitude >= Math.min(...lats) && latitude <= Math.max(...lats) &&
                     longitude >= Math.min(...lngs) && longitude <= Math.max(...lngs)
          }
        }
      } catch (e) {}

      if (inZone && speed > zone.speedLimit) {
        newStatus = 'SPEEDING'
        const excessSpeed = speed - zone.speedLimit
        const fineAmount = calculateFine(excessSpeed)

        // Create violation
        violation = await prisma.violation.create({
          data: {
            vehicleId: vehicle.id,
            zoneId: zone.id,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            speed: parseFloat(speed),
            speedLimit: zone.speedLimit,
            excessSpeed,
            fineAmount,
          },
        })
        break // Only record first violation
      }
    }

    // Update vehicle status
    await prisma.vehicle.update({
      where: { id: vehicle.id },
      data: { status: newStatus as any },
    })

    return NextResponse.json({
      success: true,
      vehicleId: vehicle.id,
      locationId: location.id,
      status: newStatus,
      violation: violation ? {
        id: violation.id,
        excessSpeed: violation.excessSpeed,
        fineAmount: violation.fineAmount,
      } : null,
    })
  } catch (error) {
    console.error('GPS ingest error:', error)
    return NextResponse.json({ error: 'Failed to process GPS data' }, { status: 500 })
  }
}

/**
 * Batch GPS ingest for multiple vehicles at once
 * POST /api/gps/ingest/batch
 */
export async function PUT(req: NextRequest) {
  try {
    const { readings } = await req.json()
    if (!Array.isArray(readings)) {
      return NextResponse.json({ error: 'readings must be an array' }, { status: 400 })
    }

    const results = await Promise.allSettled(
      readings.map(async (reading) => {
        const vehicle = await prisma.vehicle.findUnique({ where: { deviceId: reading.deviceId } })
        if (!vehicle) return { deviceId: reading.deviceId, error: 'Not found' }

        await prisma.vehicleLocation.create({
          data: {
            vehicleId: vehicle.id,
            latitude: reading.latitude,
            longitude: reading.longitude,
            speed: reading.speed,
            heading: reading.heading,
            timestamp: reading.timestamp ? new Date(reading.timestamp) : new Date(),
          },
        })

        return { deviceId: reading.deviceId, vehicleId: vehicle.id, success: true }
      })
    )

    return NextResponse.json({
      processed: results.length,
      results: results.map(r => r.status === 'fulfilled' ? r.value : { error: 'Failed' }),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Batch processing failed' }, { status: 500 })
  }
}
