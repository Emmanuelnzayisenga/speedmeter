"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { AppLayout } from '@/components/layout/AppLayout'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { Users, ShieldCheck, Car, AlertTriangle, UserCog, Settings, ArrowRight } from 'lucide-react'

const ROLE_BADGE: Record<string, BadgeVariant> = {
  ADMIN: 'destructive', OPERATOR: 'radar', VIEWER: 'default', DRIVER: 'success',
}

export default function AdminOverviewPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchOverview = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/overview')
      setData(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchOverview() }, [fetchOverview])

  const stats = data?.stats

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-5 animate-fade-up">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-wider">ADMIN OVERVIEW</h1>
          <p className="text-sm text-muted-foreground mt-0.5">System health and user management</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <StatsCard title="Total Users" value={loading ? '—' : stats?.totalUsers ?? 0} icon={Users} variant="default" />
          <StatsCard title="Active Users" value={loading ? '—' : stats?.activeUsers ?? 0} icon={ShieldCheck} variant="success" />
          <StatsCard title="Admins" value={loading ? '—' : stats?.adminUsers ?? 0} icon={UserCog} variant="radar" />
          <StatsCard title="Vehicles" value={loading ? '—' : stats?.totalVehicles ?? 0} icon={Car} variant="default" />
          <StatsCard title="Violations" value={loading ? '—' : stats?.totalViolations ?? 0} icon={AlertTriangle} variant="warning" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/users" className="rounded-lg border border-border bg-card p-5 panel-glow hover:border-primary/40 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Manage Users</p>
                <p className="text-xs text-muted-foreground">Roles, activation, accounts</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/admin/settings" className="rounded-lg border border-border bg-card p-5 panel-glow hover:border-primary/40 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">System Settings</p>
                <p className="text-xs text-muted-foreground">Defaults and configuration</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden panel-glow">
          <div className="px-4 py-3 border-b border-border/50">
            <span className="text-xs font-display font-semibold tracking-wider">RECENT LOGINS</span>
          </div>
          <div className="divide-y divide-border/30">
            {!loading && (!data?.recentUsers || data.recentUsers.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-8">No login activity yet</p>
            )}
            {data?.recentUsers?.map((u: any) => (
              <div key={u.id} className="px-4 py-2.5 flex items-center justify-between">
                <div>
                  <p className="text-sm">{u.username || u.email}</p>
                  <p className="text-[11px] text-muted-foreground">{u.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={ROLE_BADGE[u.role] || 'default'} className="text-[10px]">{u.role}</Badge>
                  <span className="text-xs text-muted-foreground w-28 text-right">
                    {u.lastLogin ? formatDate(u.lastLogin) : 'Never'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
