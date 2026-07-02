import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/require-admin'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if ('error' in guard) return guard.error

  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true, username: true, email: true, phoneNumber: true,
        role: true, isActive: true, lastLogin: true, createdAt: true, updatedAt: true,
      },
    })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if ('error' in guard) return guard.error

  try {
    const body = await req.json()
    const { role, isActive } = body

    const user = await prisma.user.update({
      where: { id: params.id },
      data: { role, isActive },
      select: {
        id: true, username: true, email: true, phoneNumber: true,
        role: true, isActive: true, lastLogin: true, createdAt: true, updatedAt: true,
      },
    })
    return NextResponse.json(user)
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const guard = await requireAdmin()
  if ('error' in guard) return guard.error

  if (guard.session.user.id === params.id) {
    return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 })
  }

  try {
    await prisma.user.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
