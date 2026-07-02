import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const VEHICLE_TYPES = ['CAR', 'TRUCK', 'MOTORCYCLE', 'BUS', 'VAN', 'OTHER']
const VEHICLE_STATUSES = ['ACTIVE', 'INACTIVE', 'MOVING', 'SPEEDING', 'OFFLINE']

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
      include: {
        locations: {
          orderBy: { timestamp: 'desc' },
          take: 50,
        },
        violations: {
          orderBy: { timestamp: 'desc' },
          take: 10,
          include: { zone: { select: { name: true, speedLimit: true } } },
        },
      },
    })
    if (!vehicle) return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    return NextResponse.json(vehicle)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vehicle' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { name, plateNumber, type, status, driverName, driverPhone, driverId, deviceId, color } = body

    if (type !== undefined && !VEHICLE_TYPES.includes(type)) {
      return NextResponse.json({ error: `type must be one of ${VEHICLE_TYPES.join(', ')}` }, { status: 400 })
    }
    if (status !== undefined && !VEHICLE_STATUSES.includes(status)) {
      return NextResponse.json({ error: `status must be one of ${VEHICLE_STATUSES.join(', ')}` }, { status: 400 })
    }

    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: { name, plateNumber, type, status, driverName, driverPhone, driverId: driverId === '' ? null : driverId, deviceId, color },
    })
    return NextResponse.json(vehicle)
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    if (error.code === 'P2002') return NextResponse.json({ error: 'Plate number, device ID, or driver is already assigned to another vehicle' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.vehicle.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 })
  }
}
