import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const active = searchParams.get('active')

    const zones = await prisma.speedZone.findMany({
      where: active !== null ? { active: active === 'true' } : {},
      include: { _count: { select: { violations: true } } },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ zones })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch zones' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, description, speedLimit, coordinates, zoneType, color, active } = body

    if (!name || !speedLimit || !coordinates || !zoneType) {
      return NextResponse.json({ error: 'name, speedLimit, coordinates, zoneType are required' }, { status: 400 })
    }

    const zone = await prisma.speedZone.create({
      data: { name, description, speedLimit: parseFloat(speedLimit), coordinates, zoneType, color, active: active ?? true },
    })

    return NextResponse.json(zone, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create zone' }, { status: 500 })
  }
}
