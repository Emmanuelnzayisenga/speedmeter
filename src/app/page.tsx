"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { LiveMap } from '@/components/map/LiveMap'
import { VehicleListPanel } from '@/components/dashboard/VehicleListPanel'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatSpeed, formatCurrency, formatDate, VEHICLE_TYPE_ICONS } from '@/lib/utils'
import {
  Activity, Car, AlertTriangle, Gauge, DollarSign,
  MapPin, RefreshCw, Navigation, Clock, X, Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DashboardData {
  stats: {
    totalVehicles: number
    activeVehicles: number
    speedingNow: number
    todayViolations: number
    weekViolations: number
    violationTrend: number
    totalFines: number
    pendingFines: number
    activeZones: number
  }
  recentViolations: any[]
  speedingVehicles: any[]
}

interface LiveData {
  vehicles: any[]
  timestamp: string
}

export default function DashboardPage() {
  const [dashData, setDashData] = useState<DashboardData | null>(null)
  const [liveData, setLiveData] = useState<LiveData | null>(null)
  const [zones, setZones] = useState<any[]>([])
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const intervalRef = useRef<NodeJS.Timeout>()

  const fetchDashboard = useCallback(async () => {
    try {
      const [dashRes, liveRes, zonesRes] = await Promise.all([
        fetch('/api/dashboard'),
        fetch('/api/gps/live'),
        fetch('/api/zones?active=true'),
      ])
      if (dashRes.ok) setDashData(await dashRes.json())
      if (liveRes.ok) setLiveData(await liveRes.json())
      if (zonesRes.ok) {
        const z = await zonesRes.json()
        setZones(z.zones || [])
      }
      setLastUpdate(new Date())
    } catch (e) {
      console.error('Dashboard fetch error:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboard()
    intervalRef.current = setInterval(fetchDashboard, 5000)
    return () => clearInterval(intervalRef.current)
  }, [fetchDashboard])

  const handleVehicleSelect = useCallback((vehicle: any) => {
    setSelectedVehicleId(vehicle.id)
    setSelectedVehicle(vehicle)
  }, [])

  const handleMapVehicleClick = useCallback((id: string) => {
    const v = liveData?.vehicles.find(v => v.id === id)
    if (v) { setSelectedVehicleId(id); setSelectedVehicle(v) }
  }, [liveData])

  const stats = dashData?.stats
  const vehicles = liveData?.vehicles || []

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Ticker bar */}
        <div className="h-8 bg-sw-nav border-b border-border/50 flex items-center overflow-hidden flex-shrink-0">
          <div className="flex-shrink-0 px-3 border-r border-border/50 h-full flex items-center">
            <span className="text-[10px] font-mono font-bold text-primary tracking-widest">LIVE FEED</span>
          </div>
          <div className="ticker-wrap flex-1 px-4">
            <div className="ticker-content flex items-center gap-8 text-[10px] font-mono text-muted-foreground">
              {vehicles.map(v => (
                <span key={v.id} className={cn(v.status === 'SPEEDING' && 'text-sw-danger')}>
                  {VEHICLE_TYPE_ICONS[v.type]} {v.plateNumber} — {Math.round(v.locations?.[0]?.speed || 0)} km/h
                  {v.status === 'SPEEDING' && ' ⚠ SPEEDING'}
                </span>
              ))}
              {vehicles.map(v => (
                <span key={`${v.id}-dup`} className={cn(v.status === 'SPEEDING' && 'text-sw-danger')}>
                  {VEHICLE_TYPE_ICONS[v.type]} {v.plateNumber} — {Math.round(v.locations?.[0]?.speed || 0)} km/h
                  {v.status === 'SPEEDING' && ' ⚠ SPEEDING'}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 px-3 border-l border-border/50 h-full flex items-center gap-2">
            <RefreshCw className="w-3 h-3 text-muted-foreground animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-[10px] font-mono text-muted-foreground">
              {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 p-4 flex-shrink-0 border-b border-border/30">
          <StatsCard
            title="Active Fleet"
            value={loading ? '—' : `${stats?.activeVehicles ?? 0}/${stats?.totalVehicles ?? 0}`}
            subtitle="vehicles online"
            icon={Car}
            variant="radar"
          />
          <StatsCard
            title="Speeding Now"
            value={loading ? '—' : stats?.speedingNow ?? 0}
            subtitle="vehicles over limit"
            icon={Gauge}
            variant={stats?.speedingNow ? 'danger' : 'success'}
          />
          <StatsCard
            title="Today's Violations"
            value={loading ? '—' : stats?.todayViolations ?? 0}
            subtitle="incidents recorded"
            icon={AlertTriangle}
            variant="warning"
            trend={stats ? { value: stats.violationTrend, label: 'vs last week' } : undefined}
          />
          <StatsCard
            title="Speed Zones"
            value={loading ? '—' : stats?.activeZones ?? 0}
            subtitle="active zones"
            icon={MapPin}
            variant="default"
          />
          <StatsCard
            title="Pending Fines"
            value={loading ? '—' : formatCurrency(stats?.pendingFines ?? 0)}
            subtitle="to be collected"
            icon={DollarSign}
            variant="warning"
          />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex min-h-0">
          {/* Vehicle list sidebar */}
          <div className="w-64 border-r border-border/50 flex-shrink-0 hidden md:flex flex-col bg-sw-panel/50">
            <VehicleListPanel
              vehicles={vehicles}
              selectedId={selectedVehicleId}
              onSelect={handleVehicleSelect}
            />
          </div>

          {/* Map */}
          <div className="flex-1 relative min-w-0 p-3">
            <LiveMap
              vehicles={vehicles}
              zones={zones}
              selectedVehicleId={selectedVehicleId}
              onVehicleClick={handleMapVehicleClick}
              className="w-full h-full"
            />

            {/* Floating recent violations */}
            {dashData?.recentViolations && dashData.recentViolations.length > 0 && (
              <div className="absolute top-6 right-6 w-72 animate-slide-in-right">
                <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-xl overflow-hidden">
                  <div className="px-3 py-2 border-b border-border/50 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-sw-danger" />
                    <span className="text-xs font-display font-semibold tracking-wider">RECENT VIOLATIONS</span>
                  </div>
                  <div className="divide-y divide-border/30 max-h-52 overflow-y-auto">
                    {dashData.recentViolations.slice(0, 4).map((v: any) => (
                      <div key={v.id} className="px-3 py-2 flex items-center gap-2.5 hover:bg-secondary/30 transition-colors">
                        <div className="w-7 h-7 rounded-md bg-sw-danger/10 border border-sw-danger/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs">{VEHICLE_TYPE_ICONS[v.vehicle?.type] || '🚗'}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium truncate">{v.vehicle?.plateNumber}</span>
                            <span className="text-[10px] font-mono text-sw-danger font-bold ml-1 flex-shrink-0">
                              {Math.round(v.speed)} km/h
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[10px] text-muted-foreground truncate">
                              {v.zone?.name || 'Unknown zone'}
                            </span>
                            <span className="text-[10px] text-muted-foreground ml-auto flex-shrink-0">
                              +{Math.round(v.excessSpeed)} km/h
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Selected vehicle detail panel */}
          {selectedVehicle && (
            <div className="w-72 border-l border-border/50 flex-shrink-0 bg-sw-panel/50 flex flex-col animate-slide-in-right hidden lg:flex">
              <div className="p-3 border-b border-border/50 flex items-center justify-between">
                <span className="text-xs font-display font-semibold tracking-wider">VEHICLE DETAIL</span>
                <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => { setSelectedVehicleId(null); setSelectedVehicle(null) }}>
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {/* Vehicle header */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: `${selectedVehicle.color || '#3B82F6'}20`, border: `1px solid ${selectedVehicle.color || '#3B82F6'}40` }}
                  >
                    {VEHICLE_TYPE_ICONS[selectedVehicle.type] || '🚗'}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm">{selectedVehicle.name}</h3>
                    <p className="text-xs font-mono text-muted-foreground">{selectedVehicle.plateNumber}</p>
                    <Badge
                      variant={selectedVehicle.status === 'SPEEDING' ? 'destructive' : selectedVehicle.status === 'MOVING' ? 'radar' : 'success'}
                      className="text-[10px] mt-1"
                    >
                      {selectedVehicle.status}
                    </Badge>
                  </div>
                </div>

                {/* Live data */}
                {selectedVehicle.locations?.[0] && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Live Data</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Speed', value: formatSpeed(selectedVehicle.locations[0].speed), icon: Gauge },
                        { label: 'Heading', value: `${Math.round(selectedVehicle.locations[0].heading || 0)}°`, icon: Navigation },
                        { label: 'Satellites', value: selectedVehicle.locations[0].satellites || '—', icon: Activity },
                        { label: 'Updated', value: new Date(selectedVehicle.locations[0].timestamp).toLocaleTimeString(), icon: Clock },
                      ].map(item => (
                        <div key={item.label} className="bg-secondary/50 rounded-md p-2">
                          <p className="text-[10px] text-muted-foreground">{item.label}</p>
                          <p className={cn(
                            "text-sm font-mono font-bold mt-0.5",
                            item.label === 'Speed' && selectedVehicle.status === 'SPEEDING' && "text-sw-danger"
                          )}>{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Speed bar */}
                    <div className="bg-secondary/50 rounded-md p-2">
                      <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                        <span>Speed</span>
                        <span>0 — 120 km/h</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            selectedVehicle.status === 'SPEEDING' ? 'bg-sw-danger' :
                            selectedVehicle.locations[0].speed > 80 ? 'bg-sw-warn' : 'bg-sw-safe'
                          )}
                          style={{ width: `${Math.min((selectedVehicle.locations[0].speed / 120) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Driver info */}
                {selectedVehicle.driverName && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Driver</p>
                    <div className="bg-secondary/50 rounded-md p-2.5 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm">
                        {selectedVehicle.driverName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{selectedVehicle.driverName}</p>
                        {selectedVehicle.driverPhone && (
                          <p className="text-[10px] text-muted-foreground font-mono">{selectedVehicle.driverPhone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Location */}
                {selectedVehicle.locations?.[0] && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">GPS Position</p>
                    <div className="bg-secondary/50 rounded-md p-2.5 font-mono text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">LAT</span>
                        <span>{selectedVehicle.locations[0].latitude.toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">LNG</span>
                        <span>{selectedVehicle.locations[0].longitude.toFixed(6)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
