import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    const { name, plateNumber, type, status, driverName, driverPhone, deviceId, color } = body

    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: { name, plateNumber, type, status, driverName, driverPhone, deviceId, color },
    })
    return NextResponse.json(vehicle)
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    if (error.code === 'P2002') return NextResponse.json({ error: 'Plate number or device ID already exists' }, { status: 409 })
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
