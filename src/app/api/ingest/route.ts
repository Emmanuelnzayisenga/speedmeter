import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function toFloat(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return parseFloat(value)
  return NaN
}

export async function POST(req: NextRequest) {
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

    const { deviceId, latitude, longitude, speed } = body

    if (!deviceId || latitude === undefined || longitude === undefined || speed === undefined) {
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
      return NextResponse.json({ skipped: true, reason: 'No GPS fix' })
    }

    const vehicle = await prisma.vehicle.findUnique({ where: { deviceId } })
    if (!vehicle) {
      return NextResponse.json(
        { error: `No vehicle found for deviceId: ${deviceId}` },
        { status: 404 }
      )
    }

    await prisma.pLocation.upsert({
      where:  { vehicleId: vehicle.id },
      update: { latitude: lat, longitude: lng, speed: spd },
      create: { vehicleId: vehicle.id, latitude: lat, longitude: lng, speed: spd },
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('[ingest] Unhandled error:', error)
    return NextResponse.json({ error: 'Failed to process GPS data' }, { status: 500 })
  }
}