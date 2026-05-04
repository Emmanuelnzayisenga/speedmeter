import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        locations: {
          orderBy: { timestamp: 'desc' },
          take: 2,
        },
      },
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({ vehicles, timestamp: new Date().toISOString() }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch live vehicles' }, { status: 500 })
  }
}
