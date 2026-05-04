import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
 
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const plate  = searchParams.get('plate')?.trim().toUpperCase().replace(/\s+/g, ' ')
  const phone  = searchParams.get('phone')?.trim()
  const id     = searchParams.get('id')?.trim()
  const status = searchParams.get('status')?.trim().toUpperCase()

  // At least one search param required
  if (!plate && !phone && !id) {
    return NextResponse.json(
      { error: 'Provide at least one of: plate, phone, or id' },
      { status: 400 }
    )
  }

  try {
    const where: any = {}

    if (id) {
      where.id = id
    } else if (plate) {
      where.vehicle = { plateNumber: { contains: plate, mode: 'insensitive' } }
    } else if (phone) {
      where.vehicle = { driverPhone: { contains: phone, mode: 'insensitive' } }
    }

    // Optional status filter
    if (status && ['PENDING','CONFIRMED','DISPUTED','RESOLVED','CANCELLED'].includes(status)) {
      where.status = status
    }

    const violations = await prisma.violation.findMany({
      where,
      include: {
        vehicle: { select: { name: true, plateNumber: true, driverPhone: true } },
        zone:    { select: { name: true } },
      },
      orderBy: { timestamp: 'desc' },
      take: 50,
    })

    return NextResponse.json({ data: violations, total: violations.length })
  } catch (error) {
    console.error('[violations/search]', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}