import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const skip = (page - 1) * limit

    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { plateNumber: { contains: search, mode: 'insensitive' } },
        { driverName: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (status) where.status = status

    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        include: {
          locations: {
            orderBy: { timestamp: 'desc' },
            take: 1,
          },
          _count: { select: { violations: true } },
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.vehicle.count({ where }),
    ])

    return NextResponse.json({
      vehicles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: skip + limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error('GET /api/vehicles error:', error)
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, plateNumber, type, driverName, driverPhone, deviceId, color } = body

    if (!name || !plateNumber) {
      return NextResponse.json({ error: 'Name and plate number are required' }, { status: 400 })
    }

    const vehicle = await prisma.vehicle.create({
      data: { name, plateNumber, type, driverName, driverPhone, deviceId, color },
    })

    return NextResponse.json(vehicle, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Plate number or device ID already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 })
  }
}
