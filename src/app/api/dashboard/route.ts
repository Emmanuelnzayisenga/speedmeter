import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const prevWeekStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

    const [
      totalVehicles,
      activeVehicles,
      speedingNow,
      todayViolations,
      weekViolations,
      prevWeekViolations,
      totalFines,
      pendingFines,
      activeZones,
      recentViolations,
      speedingVehicles,
    ] = await Promise.all([
      prisma.vehicle.count(),
      prisma.vehicle.count({ where: { status: { in: ['ACTIVE', 'MOVING', 'SPEEDING'] } } }),
      prisma.vehicle.count({ where: { status: 'SPEEDING' } }),
      prisma.violation.count({ where: { timestamp: { gte: todayStart } } }),
      prisma.violation.count({ where: { timestamp: { gte: weekStart } } }),
      prisma.violation.count({ where: { timestamp: { gte: prevWeekStart, lt: weekStart } } }),
      prisma.violation.aggregate({ _sum: { fineAmount: true } }),
      prisma.violation.aggregate({
        where: { status: 'PENDING' },
        _sum: { fineAmount: true },
      }),
      prisma.speedZone.count({ where: { active: true } }),
      prisma.violation.findMany({
        orderBy: { timestamp: 'desc' },
        take: 5,
        include: {
          vehicle: { select: { name: true, plateNumber: true, color: true } },
          zone: { select: { name: true } },
        },
      }),
      prisma.vehicle.findMany({
        where: { status: 'SPEEDING' },
        include: { locations: { orderBy: { timestamp: 'desc' }, take: 1 } },
      }),
    ])

    const violationTrend = prevWeekViolations > 0
      ? Math.round(((weekViolations - prevWeekViolations) / prevWeekViolations) * 100)
      : 0

    return NextResponse.json({
      stats: {
        totalVehicles,
        activeVehicles,
        speedingNow,
        todayViolations,
        weekViolations,
        violationTrend,
        totalFines: totalFines._sum.fineAmount || 0,
        pendingFines: pendingFines._sum.fineAmount || 0,
        activeZones,
      },
      recentViolations,
      speedingVehicles,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 })
  }
}
