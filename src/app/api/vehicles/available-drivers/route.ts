import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const drivers = await prisma.user.findMany({
      where: { role: 'DRIVER' },
      select: {
        id: true, username: true, email: true,
        vehicle: { select: { id: true, name: true, plateNumber: true } },
      },
      orderBy: { username: 'asc' },
    })
    return NextResponse.json({ drivers })
  } catch (error) {
    console.error('GET /api/vehicles/available-drivers error:', error)
    return NextResponse.json({ error: 'Failed to fetch drivers' }, { status: 500 })
  }
}
