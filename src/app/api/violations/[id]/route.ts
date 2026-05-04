import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const violation = await prisma.violation.findUnique({
      where: { id: params.id },
      include: {
        vehicle: true,
        zone: true,
      },
    })
    if (!violation) return NextResponse.json({ error: 'Violation not found' }, { status: 404 })
    return NextResponse.json(violation)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch violation' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { status, fineAmount, notes } = body

    const data: any = {}
    if (status) data.status = status
    if (fineAmount !== undefined) data.fineAmount = parseFloat(fineAmount)
    if (notes !== undefined) data.notes = notes
    if (status === 'RESOLVED') data.resolvedAt = new Date()
    if (status === 'CANCELLED') data.resolvedAt = new Date()

    const violation = await prisma.violation.update({
      where: { id: params.id },
      data,
      include: {
        vehicle: { select: { name: true, plateNumber: true } },
        zone: { select: { name: true } },
      },
    })
    
    return NextResponse.json(violation)
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Violation not found' }, { status: 404 })
    return NextResponse.json({ error: 'Failed to update violation' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.violation.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Violation not found' }, { status: 404 })
    return NextResponse.json({ error: 'Failed to delete violation' }, { status: 500 })
  }
}
