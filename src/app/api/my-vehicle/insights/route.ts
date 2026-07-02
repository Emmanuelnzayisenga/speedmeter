import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const DAY_MS = 24 * 60 * 60 * 1000
const WINDOW_MS = 30 * DAY_MS

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // vehicleId is resolved from the session, never from client input - a driver
    // can only ever see insights for the one vehicle assigned to their own account.
    const vehicle = await prisma.vehicle.findUnique({ where: { driverId: session.user.id } })
    if (!vehicle) {
      return NextResponse.json({ insights: null })
    }

    const violations = await prisma.violation.findMany({
      where: { vehicleId: vehicle.id },
      include: { zone: { select: { id: true, name: true } } },
      orderBy: { timestamp: 'desc' },
    })

    const now = Date.now()
    const recent = violations.filter(v => now - new Date(v.timestamp).getTime() < WINDOW_MS)
    const prior = violations.filter(v => {
      const age = now - new Date(v.timestamp).getTime()
      return age >= WINDOW_MS && age < WINDOW_MS * 2
    })

    const totalViolations = violations.length
    const totalFines = violations.reduce((s, v) => s + v.fineAmount, 0)
    const avgExcessSpeed = totalViolations > 0
      ? violations.reduce((s, v) => s + v.excessSpeed, 0) / totalViolations
      : 0

    // Zone breakdown - which zones this driver's violations cluster in.
    const zoneCounts = new Map<string, { name: string; count: number }>()
    for (const v of violations) {
      const key = v.zone?.id ?? 'unknown'
      const name = v.zone?.name ?? 'Unknown zone'
      const entry = zoneCounts.get(key) ?? { name, count: 0 }
      entry.count += 1
      zoneCounts.set(key, entry)
    }
    const zoneBreakdown = Array.from(zoneCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .map(z => ({ ...z, percentage: totalViolations > 0 ? Math.round((z.count / totalViolations) * 100) : 0 }))

    const topZone = zoneBreakdown[0] ?? null

    const trendDelta = recent.length - prior.length
    const trend: 'improving' | 'worsening' | 'stable' =
      trendDelta < 0 ? 'improving' : trendDelta > 0 ? 'worsening' : 'stable'

    const lastViolation = violations[0] ?? null
    const daysSinceLast = lastViolation
      ? Math.floor((now - new Date(lastViolation.timestamp).getTime()) / DAY_MS)
      : null

    // Weighted composite risk score (0-100) from three explainable factors:
    // how often, how severe, and how recently this driver has violated.
    const frequencyScore = Math.min(40, recent.length * 8)
    const severityScore = Math.min(35, avgExcessSpeed * 1.5)
    const recencyScore = daysSinceLast === null ? 0 : Math.max(0, 25 - daysSinceLast)
    const riskScore = Math.round(Math.min(100, frequencyScore + severityScore + recencyScore))

    const riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' =
      riskScore >= 75 ? 'CRITICAL' : riskScore >= 50 ? 'HIGH' : riskScore >= 25 ? 'MODERATE' : 'LOW'

    const statements: string[] = []
    if (totalViolations === 0) {
      statements.push('No violations on record — your driving history is clean.')
    } else {
      statements.push(
        `${recent.length} violation${recent.length === 1 ? '' : 's'} recorded in the last 30 days` +
        (prior.length > 0
          ? `, ${trend === 'improving' ? 'down' : trend === 'worsening' ? 'up' : 'unchanged'} from ${prior.length} in the previous 30 days.`
          : '.')
      )
      if (topZone) {
        statements.push(`"${topZone.name}" accounts for ${topZone.percentage}% of your recorded violations — your highest-risk zone.`)
      }
      statements.push(`Average speed over the limit across all violations: ${avgExcessSpeed.toFixed(1)} km/h.`)
      if (daysSinceLast !== null) {
        statements.push(
          daysSinceLast === 0
            ? 'Most recent violation was recorded today.'
            : `${daysSinceLast} day${daysSinceLast === 1 ? '' : 's'} since your last recorded violation.`
        )
      }
    }

    return NextResponse.json({
      insights: {
        riskScore,
        riskLevel,
        trend,
        totalViolations,
        recentCount: recent.length,
        priorCount: prior.length,
        avgExcessSpeed: Math.round(avgExcessSpeed * 10) / 10,
        totalFines,
        daysSinceLast,
        zoneBreakdown,
        statements,
      },
    })
  } catch (error) {
    console.error('GET /api/my-vehicle/insights error:', error)
    return NextResponse.json({ error: 'Failed to compute insights' }, { status: 500 })
  }
}
