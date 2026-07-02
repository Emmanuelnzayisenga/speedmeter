import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/require-admin'

const DEFAULT_SETTINGS = [
  { key: 'default_fine_amount', value: '5000', description: 'Default fine amount (RWF) applied to new violations' },
  { key: 'default_zone_buffer_meters', value: '50', description: 'Default buffer distance (meters) used when drawing new speed zones' },
]

export async function GET() {
  const guard = await requireAdmin()
  if ('error' in guard) return guard.error

  try {
    for (const def of DEFAULT_SETTINGS) {
      await prisma.systemSettings.upsert({
        where: { key: def.key },
        update: {},
        create: def,
      })
    }
    const settings = await prisma.systemSettings.findMany({ orderBy: { key: 'asc' } })
    return NextResponse.json({ settings })
  } catch (error) {
    console.error('GET /api/admin/settings error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const guard = await requireAdmin()
  if ('error' in guard) return guard.error

  try {
    const body = await req.json()
    const updates: { key: string; value: string }[] = body.settings || []

    await Promise.all(
      updates.map((u) =>
        prisma.systemSettings.upsert({
          where: { key: u.key },
          update: { value: u.value },
          create: { key: u.key, value: u.value },
        })
      )
    )

    const settings = await prisma.systemSettings.findMany({ orderBy: { key: 'asc' } })
    return NextResponse.json({ settings })
  } catch (error) {
    console.error('PUT /api/admin/settings error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
