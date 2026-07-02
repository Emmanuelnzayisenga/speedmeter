import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { driverId: session.user.id },
      include: {
        locations: { orderBy: { timestamp: 'desc' }, take: 1 },
        violations: {
          orderBy: { timestamp: 'desc' },
          take: 5,
          include: { zone: { select: { name: true } } },
        },
      },
    })

    if (!vehicle) {
      return NextResponse.json({ vehicle: null })
    }

    return NextResponse.json({ vehicle })
  } catch (error) {
    console.error('GET /api/my-vehicle error:', error)
    return NextResponse.json({ error: 'Failed to fetch vehicle' }, { status: 500 })
  }
}
