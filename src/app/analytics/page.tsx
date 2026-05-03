"use client"

import React, { useState, useEffect } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, AlertTriangle, DollarSign, Car, Gauge, MapPin } from 'lucide-react'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl text-xs">
        <p className="text-muted-foreground mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="font-mono font-bold">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null)
  const [violations, setViolations] = useState<any[]>([])
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const [dashRes, vRes, vehRes] = await Promise.all([
          fetch('/api/dashboard'),
          fetch('/api/violations?limit=100'),
          fetch('/api/vehicles?limit=100'),
        ])
        if (dashRes.ok) setStats((await dashRes.json()).stats)
        if (vRes.ok) setViolations((await vRes.json()).violations || [])
        if (vehRes.ok) setVehicles((await vehRes.json()).vehicles || [])
      } finally {
        setLoading(false)
      }
    }
    fetch_()
  }, [])

  // Build charts data
  const violationsByStatus = ['PENDING', 'CONFIRMED', 'DISPUTED', 'RESOLVED', 'CANCELLED'].map(s => ({
    name: s, value: violations.filter(v => v.status === s).length,
  })).filter(d => d.value > 0)

  const vehiclesByType = ['CAR', 'TRUCK', 'BUS', 'VAN', 'MOTORCYCLE', 'OTHER'].map(t => ({
    name: t, count: vehicles.filter(v => v.type === t).length,
  })).filter(d => d.count > 0)

  const speedBuckets = [
    { range: '0-30', count: violations.filter(v => v.speed <= 30).length },
    { range: '31-60', count: violations.filter(v => v.speed > 30 && v.speed <= 60).length },
    { range: '61-80', count: violations.filter(v => v.speed > 60 && v.speed <= 80).length },
    { range: '81-100', count: violations.filter(v => v.speed > 80 && v.speed <= 100).length },
    { range: '101-120', count: violations.filter(v => v.speed > 100 && v.speed <= 120).length },
    { range: '120+', count: violations.filter(v => v.speed > 120).length },
  ]

  // Fine brackets
  const fineBrackets = [
    { range: '0-2K', total: violations.filter(v => v.fineAmount > 0 && v.fineAmount <= 2000).length },
    { range: '2K-5K', total: violations.filter(v => v.fineAmount > 2000 && v.fineAmount <= 5000).length },
    { range: '5K-10K', total: violations.filter(v => v.fineAmount > 5000 && v.fineAmount <= 10000).length },
    { range: '10K+', total: violations.filter(v => v.fineAmount > 10000).length },
  ]

  // Top violators
  const vehicleViolations = vehicles
    .map(v => ({ name: v.plateNumber, violations: v._count?.violations || 0, vehicle: v.name }))
    .filter(v => v.violations > 0)
    .sort((a, b) => b.violations - a.violations)
    .slice(0, 8)

  const PIE_COLORS = [
    'hsl(var(--sw-warn))', 'hsl(var(--sw-danger))', 'hsl(var(--primary))',
    'hsl(var(--sw-safe))', 'hsl(var(--muted-foreground))'
  ]

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 rounded-lg shimmer" />
          ))}
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-5 animate-fade-up">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-wider">ANALYTICS</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Fleet performance & violation insights</p>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Fleet Size', value: stats?.totalVehicles || 0, icon: Car, sub: `${stats?.activeVehicles || 0} active` },
            { label: 'Week Violations', value: stats?.weekViolations || 0, icon: AlertTriangle, sub: `${stats?.violationTrend > 0 ? '↑' : '↓'} ${Math.abs(stats?.violationTrend || 0)}% trend` },
            { label: 'Total Fines', value: formatCurrency(stats?.totalFines || 0), icon: DollarSign, sub: `${formatCurrency(stats?.pendingFines || 0)} pending` },
            { label: 'Active Zones', value: stats?.activeZones || 0, icon: MapPin, sub: 'speed zones' },
          ].map(kpi => (
            <div key={kpi.label} className="bg-card border border-border rounded-lg p-3 panel-glow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{kpi.label}</p>
                  <p className="text-xl font-display font-bold text-primary mt-1">{kpi.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.sub}</p>
                </div>
                <kpi.icon className="w-8 h-8 text-primary opacity-20" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Speed distribution */}
          <Card className="panel-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Gauge className="w-4 h-4 text-primary" />
                Speed Distribution at Violations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={speedBuckets} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Violations" radius={[4, 4, 0, 0]}>
                    {speedBuckets.map((_, i) => (
                      <Cell key={i} fill={i < 2 ? 'hsl(var(--sw-safe))' : i < 4 ? 'hsl(var(--sw-warn))' : 'hsl(var(--sw-danger))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Violation status pie */}
          <Card className="panel-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-sw-warn" />
                Violations by Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {violationsByStatus.length === 0 ? (
                <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">No violation data</div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={violationsByStatus} cx="50%" cy="50%" outerRadius={80}
                      dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      fontSize={10}
                    >
                      {violationsByStatus.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Top violators */}
          <Card className="panel-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sw-danger" />
                Top Violating Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vehicleViolations.length === 0 ? (
                <div className="h-52 flex items-center justify-center text-muted-foreground text-sm">No violation data</div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={vehicleViolations} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} width={70} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="violations" name="Violations" fill="hsl(var(--sw-danger))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Fine brackets */}
          <Card className="panel-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-sw-warn" />
                Fines by Amount Bracket
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={fineBrackets} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="total" name="Count" fill="hsl(var(--sw-warn))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Vehicle type breakdown */}
          <Card className="lg:col-span-2 panel-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                Fleet Composition by Vehicle Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={vehiclesByType} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Vehicles" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
