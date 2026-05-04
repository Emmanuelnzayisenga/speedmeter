import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const active = searchParams.get('active')

    const zones = await prisma.speedZone.findMany({
      where: active !== null ? { active: active === 'true' } : undefined,
      include: { _count: { select: { violations: true } } },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ zones })
  } catch (error) {
    console.error('[GET /api/zones]', error)
    return NextResponse.json({ error: 'Failed to fetch zones' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, description, speedLimit, coordinates, zoneType, color, active } = body

    if (!name || speedLimit == null || !coordinates || !zoneType) {
      return NextResponse.json(
        { error: 'name, speedLimit, coordinates, zoneType are required' },
        { status: 400 }
      )
    }

    const parsed = parseFloat(speedLimit)
    if (isNaN(parsed) || parsed <= 0) {
      return NextResponse.json(
        { error: 'speedLimit must be a positive number' },
        { status: 400 }
      )
    }

    const zone = await prisma.speedZone.create({
      data: {
        name,
        description: description ?? null,
        speedLimit: parsed,
        coordinates,
        zoneType,
        color: color ?? '#3B82F6',
        active: active ?? true,
      },
    })

    return NextResponse.json(zone, { status: 201 })
  } catch (error) {
    console.error('[POST /api/zones]', error)
    return NextResponse.json({ error: 'Failed to create zone' }, { status: 500 })
  }
}