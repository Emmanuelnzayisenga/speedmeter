import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // vehicleId is resolved from the session, never from client input - a driver
    // can only ever see violations for the one vehicle assigned to their own account.
    const vehicle = await prisma.vehicle.findUnique({ where: { driverId: session.user.id } })
    if (!vehicle) {
      return NextResponse.json({ violations: [], pagination: { page: 1, limit: 15, total: 0, totalPages: 1, hasNext: false, hasPrev: false } })
    }

    const { searchParams } = new URL(req.url)
    const pageParam = parseInt(searchParams.get('page') || '1')
    const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
    const limit = 15
    const skip = (page - 1) * limit

    const [violations, total] = await Promise.all([
      prisma.violation.findMany({
        where: { vehicleId: vehicle.id },
        include: { zone: { select: { name: true } } },
        orderBy: { timestamp: 'desc' },
        skip,
        take: limit,
      }),
      prisma.violation.count({ where: { vehicleId: vehicle.id } }),
    ])

    return NextResponse.json({
      violations,
      pagination: {
        page, limit, total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
        hasNext: skip + limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error('GET /api/my-vehicle/violations error:', error)
    return NextResponse.json({ error: 'Failed to fetch violations' }, { status: 500 })
  }
}
