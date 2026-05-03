import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') || ''
    const vehicleId = searchParams.get('vehicleId') || ''
    const search = searchParams.get('search') || ''
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (vehicleId) where.vehicleId = vehicleId
    if (search) {
      where.OR = [
        { vehicle: { name: { contains: search, mode: 'insensitive' } } },
        { vehicle: { plateNumber: { contains: search, mode: 'insensitive' } } },
        { zone: { name: { contains: search, mode: 'insensitive' } } },
      ]
    }

    const [violations, total] = await Promise.all([
      prisma.violation.findMany({
        where,
        include: {
          vehicle: { select: { id: true, name: true, plateNumber: true, type: true, color: true } },
          zone: { select: { id: true, name: true, speedLimit: true } },
        },
        orderBy: { timestamp: 'desc' },
        skip,
        take: limit,
      }),
      prisma.violation.count({ where }),
    ])

    const totalFines = await prisma.violation.aggregate({
      where,
      _sum: { fineAmount: true },
    })

    return NextResponse.json({
      violations,
      totalFines: totalFines._sum.fineAmount || 0,
      pagination: {
        page, limit, total,
        totalPages: Math.ceil(total / limit),
        hasNext: skip + limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch violations' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { vehicleId, zoneId, latitude, longitude, speed, speedLimit, excessSpeed, fineAmount, notes } = body

    if (!vehicleId || !latitude || !longitude || speed === undefined || !speedLimit) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const violation = await prisma.violation.create({
      data: {
        vehicleId, zoneId, latitude, longitude, speed, speedLimit,
        excessSpeed: excessSpeed || (speed - speedLimit),
        fineAmount: fineAmount || 0, notes,
      },
      include: {
        vehicle: { select: { name: true, plateNumber: true } },
        zone: { select: { name: true } },
      },
    })

    return NextResponse.json(violation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create violation' }, { status: 500 })
  }
}
