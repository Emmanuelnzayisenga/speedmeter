import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/require-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const guard = await requireAdmin()
  if ('error' in guard) return guard.error

  try {
    const [
      totalUsers,
      activeUsers,
      adminUsers,
      totalVehicles,
      totalViolations,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.vehicle.count(),
      prisma.violation.count(),
      prisma.user.findMany({
        orderBy: { lastLogin: 'desc' },
        take: 5,
        select: { id: true, username: true, email: true, role: true, lastLogin: true },
      }),
    ])

    return NextResponse.json({
      stats: { totalUsers, activeUsers, adminUsers, totalVehicles, totalViolations },
      recentUsers,
    })
  } catch (error) {
    console.error('GET /api/admin/overview error:', error)
    return NextResponse.json({ error: 'Failed to fetch overview' }, { status: 500 })
  }
}
