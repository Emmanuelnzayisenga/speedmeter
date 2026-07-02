"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { AppLayout } from '@/components/layout/AppLayout'
import { LiveMap } from '@/components/map/LiveMap'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatSpeed, formatCurrency, formatDate, VEHICLE_TYPE_ICONS, cn } from '@/lib/utils'
import {
  Car, Gauge, Navigation, Clock, RefreshCw, AlertTriangle, MapPin, ArrowRight,
  Brain, Sparkles, TrendingDown, TrendingUp, Minus, Radar,
} from 'lucide-react'

const RISK_BADGE: Record<string, 'success' | 'warning' | 'radar' | 'destructive'> = {
  LOW: 'success', MODERATE: 'warning', HIGH: 'radar', CRITICAL: 'destructive',
}
const RISK_COLOR: Record<string, string> = {
  LOW: 'text-sw-safe', MODERATE: 'text-sw-warn', HIGH: 'text-sw-radar', CRITICAL: 'text-sw-danger',
}
const TREND_ICON: Record<string, typeof TrendingUp> = {
  improving: TrendingDown, worsening: TrendingUp, stable: Minus,
}
const BEHAVIOR_BADGE: Record<string, 'success' | 'warning' | 'radar' | 'destructive'> = {
  CAUTIOUS: 'success', MODERATE: 'warning', ASSERTIVE: 'radar', AGGRESSIVE: 'destructive',
}

interface Insights {
  riskScore: number
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL'
  behaviorClass: 'CAUTIOUS' | 'MODERATE' | 'ASSERTIVE' | 'AGGRESSIVE'
  confidence: number
  trend: 'improving' | 'worsening' | 'stable'
  totalViolations: number
  avgExcessSpeed: number
  totalFines: number
  projectedFines30d: number
  zoneBreakdown: { name: string; count: number; percentage: number }[]
  statements: string[]
  prediction: string
  aheadZone: { name: string; speedLimit: number; distanceMeters: number; etaSeconds: number | null } | null
}

export default function MyVehiclePage() {
  const [vehicle, setVehicle] = useState<any>(null)
  const [zones, setZones] = useState<any[]>([])
  const [insights, setInsights] = useState<Insights | null>(null)
  const [loading, setLoading] = useState(true)
  const [speedAhead, setSpeedAhead] = useState<{ distanceMeters: number; etaSeconds: number | null; zone: { name: string; speedLimit: number } } | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [vehicleRes, zonesRes, insightsRes] = await Promise.all([
        fetch('/api/my-vehicle'),
        fetch('/api/zones?active=true'),
        fetch('/api/my-vehicle/insights'),
      ])
      const vehicleData = await vehicleRes.json()
      const zonesData = await zonesRes.json()
      const insightsData = await insightsRes.json()
      setVehicle(vehicleData.vehicle || null)
      setZones(zonesData.zones || [])
      setInsights(insightsData.insights || null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  useEffect(() => {
    if (!vehicle?.id) { setSpeedAhead(null); return }
    let cancelled = false
    fetch(`/api/speed-limit/ahead?vehicleId=${vehicle.id}`)
      .then(res => res.json())
      .then(data => { if (!cancelled) setSpeedAhead(data.zone ? data : null) })
      .catch(() => { if (!cancelled) setSpeedAhead(null) })
    return () => { cancelled = true }
  }, [vehicle?.id])

  // Light auto-refresh so position/speed stay current without a full WS setup for a single vehicle.
  useEffect(() => {
    const interval = setInterval(fetchData, 10_000)
    return () => clearInterval(interval)
  }, [fetchData])

  const loc = vehicle?.locations?.[0]

  if (!loading && !vehicle) {
    return (
      <AppLayout>
        <div className="p-4 lg:p-6 h-full flex flex-col items-center justify-center gap-3 text-center">
          <Car className="w-12 h-12 text-muted-foreground opacity-20" />
          <div>
            <p className="text-lg font-display font-bold">No vehicle assigned</p>
            <p className="text-sm text-muted-foreground mt-1">Contact your administrator to link your account to a vehicle.</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 h-full flex flex-col gap-4 animate-fade-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-wider">MY VEHICLE</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {vehicle ? `${vehicle.name} · ${vehicle.plateNumber}` : 'Loading…'}
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={fetchData}>
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </Button>
        </div>

        {vehicle && (
          <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
            <div className="flex-1 min-h-[300px] rounded-lg overflow-hidden border border-border">
              <LiveMap
                vehicles={[vehicle]}
                zones={zones}
                selectedVehicleId={vehicle.id}
                className="w-full h-full"
              />
            </div>

            <div className="w-full lg:w-80 flex-shrink-0 space-y-3">
              <div className="bg-card border border-border rounded-lg p-3 panel-glow">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                    style={{ backgroundColor: `${vehicle.color || '#3B82F6'}20`, border: `1px solid ${vehicle.color || '#3B82F6'}40` }}
                  >
                    {VEHICLE_TYPE_ICONS[vehicle.type]}
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm">{vehicle.name}</p>
                    <p className="text-xs font-mono text-muted-foreground">{vehicle.plateNumber}</p>
                  </div>
                  <Badge
                    variant={vehicle.status === 'SPEEDING' ? 'destructive' : vehicle.status === 'MOVING' ? 'radar' : 'default'}
                    className="text-[10px] ml-auto"
                  >
                    {vehicle.status}
                  </Badge>
                </div>

                {loc ? (
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Speed', value: formatSpeed(loc.speed), icon: Gauge },
                      { label: 'Heading', value: `${Math.round(loc.heading || 0)}°`, icon: Navigation },
                      { label: 'Updated', value: new Date(loc.timestamp).toLocaleTimeString(), icon: Clock },
                    ].map(item => (
                      <div key={item.label} className="bg-secondary/50 rounded-md p-2">
                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                        <p className={cn(
                          "text-sm font-mono font-bold mt-0.5",
                          item.label === 'Speed' && vehicle.status === 'SPEEDING' && 'text-sw-danger'
                        )}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No GPS data yet</p>
                )}
              </div>

              {speedAhead?.zone && (
                <div className="bg-card border border-border rounded-lg p-3 panel-glow flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Speed Limit Ahead</p>
                    <p className="text-sm font-mono font-bold">{speedAhead.zone.speedLimit} km/h</p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {speedAhead.zone.name} · {speedAhead.distanceMeters}m
                      {speedAhead.etaSeconds ? ` · ~${Math.round(speedAhead.etaSeconds)}s` : ''}
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-card border border-border rounded-lg overflow-hidden panel-glow">
                <div className="px-3 py-2 border-b border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-sw-danger" />
                    <span className="text-xs font-display font-semibold tracking-wider">RECENT VIOLATIONS</span>
                  </div>
                  <Link href="/my-vehicle/violations" className="text-[10px] text-primary hover:underline flex items-center gap-0.5">
                    View all <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
                <div className="divide-y divide-border/30">
                  {(!vehicle.violations || vehicle.violations.length === 0) && (
                    <p className="text-xs text-muted-foreground text-center py-6">No violations on record</p>
                  )}
                  {vehicle.violations?.map((v: any) => (
                    <div key={v.id} className="px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-sw-danger">{Math.round(v.speed)} km/h</span>
                        <span className="text-[10px] text-muted-foreground">{formatCurrency(v.fineAmount)}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-muted-foreground flex-shrink-0" />
                        <span className="text-[10px] text-muted-foreground truncate">{v.zone?.name || 'Unknown zone'}</span>
                        <span className="text-[10px] text-muted-foreground ml-auto flex-shrink-0">{formatDate(v.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {vehicle && insights && (
          <div className="bg-card border border-border rounded-lg overflow-hidden panel-glow flex-shrink-0">
            <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-sm font-display font-bold tracking-wider">AI DRIVING INSIGHTS</span>
                <Badge variant="outline" className="text-[9px]">BETA</Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant={BEHAVIOR_BADGE[insights.behaviorClass]} className="text-[10px]">
                  {insights.behaviorClass}
                </Badge>
                <Badge variant={RISK_BADGE[insights.riskLevel]} className="text-[10px]">
                  {insights.riskLevel} RISK
                </Badge>
              </div>
            </div>

            {/* Stat tiles */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50 border-b border-border/50">
              <div className="flex flex-col items-center justify-center gap-0.5 py-3">
                <p className={cn("text-2xl font-mono font-bold", RISK_COLOR[insights.riskLevel])}>{insights.riskScore}</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Risk / 100</p>
                <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                  {React.createElement(TREND_ICON[insights.trend], {
                    className: cn(
                      "w-2.5 h-2.5",
                      insights.trend === 'improving' && 'text-sw-safe',
                      insights.trend === 'worsening' && 'text-sw-danger'
                    ),
                  })}
                  <span className="capitalize">{insights.trend}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-0.5 py-3">
                <p className="text-2xl font-mono font-bold text-primary">{insights.confidence}%</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Model Confidence</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-0.5 py-3">
                <p className="text-2xl font-mono font-bold">{insights.avgExcessSpeed}</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Avg Excess km/h</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-0.5 py-3">
                <p className="text-2xl font-mono font-bold text-sw-warn">{formatCurrency(insights.projectedFines30d)}</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Projected 30d Fines</p>
              </div>
            </div>

            {/* Predictive forecast - real ahead-zone projection from current location + heading */}
            <div className={cn(
              "mx-4 mt-3 px-3 py-2.5 rounded-md border flex items-start gap-2.5",
              insights.aheadZone && insights.prediction.startsWith('⚠')
                ? 'bg-sw-danger/10 border-sw-danger/30'
                : 'bg-primary/5 border-primary/20'
            )}>
              <Radar className={cn(
                "w-4 h-4 flex-shrink-0 mt-0.5",
                insights.aheadZone && insights.prediction.startsWith('⚠') ? 'text-sw-danger' : 'text-primary'
              )} />
              <div className="min-w-0">
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-0.5">Predictive Forecast</p>
                <p className="text-xs text-foreground">{insights.prediction}</p>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {insights.statements.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <Sparkles className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{s}</span>
                </div>
              ))}
            </div>

            {insights.zoneBreakdown.length > 0 && (
              <div className="px-4 pb-4 space-y-1.5 border-t border-border/50 pt-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5">Zone Risk Breakdown</p>
                {insights.zoneBreakdown.map(z => (
                  <div key={z.name} className="flex items-center gap-2">
                    <span className="text-xs w-28 truncate flex-shrink-0">{z.name}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-sw-danger rounded-full transition-all" style={{ width: `${z.percentage}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground w-16 text-right flex-shrink-0">
                      {z.count} ({z.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
