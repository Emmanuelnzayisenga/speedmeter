import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const zone = await prisma.speedZone.findUnique({
      where: { id: params.id },
      include: {
        violations: {
          orderBy: { timestamp: 'desc' },
          take: 10,
          include: { vehicle: { select: { name: true, plateNumber: true } } },
        },
        _count: { select: { violations: true } },
      },
    })
    if (!zone) return NextResponse.json({ error: 'Zone not found' }, { status: 404 })
    return NextResponse.json(zone)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch zone' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { name, description, speedLimit, coordinates, zoneType, color, active } = body
    const zone = await prisma.speedZone.update({
      where: { id: params.id },
      data: { name, description, speedLimit: speedLimit ? parseFloat(speedLimit) : undefined, coordinates, zoneType, color, active },
    })
    return NextResponse.json(zone)
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Zone not found' }, { status: 404 })
    return NextResponse.json({ error: 'Failed to update zone' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.speedZone.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Zone not found' }, { status: 404 })
    return NextResponse.json({ error: 'Failed to delete zone' }, { status: 500 })
  }
}
