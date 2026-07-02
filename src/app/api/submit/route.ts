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

function toDate(value: unknown): Date {
  if (!value) return new Date()
  const d = new Date(value as any)
  return isNaN(d.getTime()) ? new Date() : d
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { deviceId, latitude, longitude, speed, heading, altitude, accuracy, satellites, timestamp } = body

    if (!deviceId || latitude === undefined || longitude === undefined || speed === undefined) {
      return NextResponse.json({ error: 'deviceId, latitude, longitude, speed are required' }, { status: 400 })
    }

    const vehicle = await prisma.vehicle.findUnique({ where: { deviceId } })
    if (!vehicle) {
      return NextResponse.json({ error: `No vehicle found for deviceId: ${deviceId}` }, { status: 404 })
    }

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
        timestamp: toDate(timestamp),
      },
    })

    let newStatus = speed > 0 ? 'MOVING' : 'ACTIVE'
    const activeZones = await prisma.speedZone.findMany({ where: { active: true } })
    let violation = null

    for (const zone of activeZones) {
      const inZone = isPointInZone(parseFloat(latitude), parseFloat(longitude), zone.zoneType, zone.coordinates)

      if (inZone && speed > zone.speedLimit) {
        newStatus = 'SPEEDING'
        const excessSpeed = speed - zone.speedLimit
        const fineAmount = calculateFine(excessSpeed)

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

        await sendSms({
          to: vehicle.driverPhone || '+250738754514',
          message: `On ${violation.timestamp.toLocaleString()}, your vehicle ${vehicle.plateNumber} was recorded speeding at ${violation.speed} km/h in zone "${zone.name}" (limit: ${zone.speedLimit} km/h).\n\nFine: RWF ${fineAmount}.\n\n💳 Pay now: ${process.env.NEXTAUTH_URL}/payments/${violation.id}\n🔍 View all fines: ${process.env.NEXTAUTH_URL}/fines?plate=${vehicle.plateNumber}\n\nPlease drive safely!`
        })

        break
      }
    }

    await prisma.vehicle.update({
      where: { id: vehicle.id },
      data: { status: newStatus as any },
    })

    return NextResponse.json({
      success: true,
      vehicleId: vehicle.id,
      locationId: location.id,
      status: newStatus,
      violation: violation ? { id: violation.id, excessSpeed: violation.excessSpeed, fineAmount: violation.fineAmount } : null,
    })
  } catch (error) {
    console.error('GPS ingest error:', error)
    return NextResponse.json({ error: 'Failed to process GPS data' }, { status: 500 })
  }
}

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
            timestamp: toDate(reading.timestamp),
          },
        })

        return { deviceId: reading.deviceId, vehicleId: vehicle.id, success: true }
      })
    )

    return NextResponse.json({
      processed: results.length,
      results: results.map(r => r.status === 'fulfilled' ? r.value : { error: 'Failed' }),
    })
  } catch {
    return NextResponse.json({ error: 'Batch processing failed' }, { status: 500 })
  }
}