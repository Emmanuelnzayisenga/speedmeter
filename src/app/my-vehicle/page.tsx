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
} from 'lucide-react'

export default function MyVehiclePage() {
  const [vehicle, setVehicle] = useState<any>(null)
  const [zones, setZones] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [speedAhead, setSpeedAhead] = useState<{ distanceMeters: number; etaSeconds: number | null; zone: { name: string; speedLimit: number } } | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [vehicleRes, zonesRes] = await Promise.all([
        fetch('/api/my-vehicle'),
        fetch('/api/zones?active=true'),
      ])
      const vehicleData = await vehicleRes.json()
      const zonesData = await zonesRes.json()
      setVehicle(vehicleData.vehicle || null)
      setZones(zonesData.zones || [])
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
      </div>
    </AppLayout>
  )
}
