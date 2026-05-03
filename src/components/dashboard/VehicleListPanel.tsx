"use client"

import React, { useState } from 'react'
import { cn, formatSpeed, VEHICLE_TYPE_ICONS } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Navigation, AlertTriangle, Circle } from 'lucide-react'

interface Vehicle {
  id: string
  name: string
  plateNumber: string
  type: string
  status: string
  driverName?: string | null
  color?: string | null
  locations?: { speed: number; latitude: number; longitude: number; timestamp: string }[]
}

interface VehicleListPanelProps {
  vehicles: Vehicle[]
  selectedId?: string | null
  onSelect: (vehicle: Vehicle) => void
}

const statusConfig: Record<string, { label: string; color: string; badge: 'default' | 'success' | 'warning' | 'destructive' | 'radar' }> = {
  ACTIVE:   { label: 'Active',   color: 'bg-sw-safe',    badge: 'success' },
  MOVING:   { label: 'Moving',   color: 'bg-primary',    badge: 'radar' },
  SPEEDING: { label: 'Speeding', color: 'bg-sw-danger',  badge: 'destructive' },
  INACTIVE: { label: 'Inactive', color: 'bg-muted-foreground', badge: 'default' },
  OFFLINE:  { label: 'Offline',  color: 'bg-muted-foreground', badge: 'default' },
}

export function VehicleListPanel({ vehicles, selectedId, onSelect }: VehicleListPanelProps) {
  const [search, setSearch] = useState('')

  const filtered = vehicles.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
    (v.driverName?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-display font-semibold text-foreground tracking-wider">
            FLEET ({vehicles.length})
          </h3>
          <div className="flex items-center gap-1">
            {['MOVING', 'SPEEDING'].map(s => {
              const count = vehicles.filter(v => v.status === s).length
              if (!count) return null
              return (
                <Badge key={s} variant={s === 'SPEEDING' ? 'destructive' : 'radar'} className="text-[10px] px-1.5">
                  {count} {s === 'SPEEDING' ? '⚠' : '▶'}
                </Badge>
              )
            })}
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search vehicles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs bg-background"
          />
        </div>
      </div>

      {/* Vehicle list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Circle className="w-8 h-8 mb-2 opacity-30" />
            <p className="text-xs">No vehicles found</p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {filtered.map((vehicle) => {
              const lastLoc = vehicle.locations?.[0]
              const status = statusConfig[vehicle.status] || statusConfig.INACTIVE
              const isSelected = selectedId === vehicle.id
              const isSpeeding = vehicle.status === 'SPEEDING'

              return (
                <button
                  key={vehicle.id}
                  onClick={() => onSelect(vehicle)}
                  className={cn(
                    "w-full text-left px-3 py-2.5 transition-all duration-200 hover:bg-secondary/50",
                    isSelected && "bg-primary/10 border-l-2 border-primary",
                    isSpeeding && "bg-sw-danger/5"
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    {/* Vehicle icon with status dot */}
                    <div className="relative flex-shrink-0 mt-0.5">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center text-sm"
                        style={{ backgroundColor: `${vehicle.color}20`, border: `1px solid ${vehicle.color}40` }}
                      >
                        {VEHICLE_TYPE_ICONS[vehicle.type] || '🚗'}
                      </div>
                      <div className={cn(
                        "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-card",
                        status.color,
                        (vehicle.status === 'MOVING' || vehicle.status === 'SPEEDING') && 'animate-ping-slow'
                      )} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-foreground truncate">
                          {vehicle.name}
                        </span>
                        {lastLoc && (
                          <span className={cn(
                            "text-xs font-mono font-bold flex-shrink-0",
                            isSpeeding ? "text-sw-danger" : "text-muted-foreground"
                          )}>
                            {Math.round(lastLoc.speed)}
                            <span className="text-[9px] ml-0.5">km/h</span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {vehicle.plateNumber}
                        </span>
                        {vehicle.status === 'SPEEDING' && (
                          <AlertTriangle className="w-2.5 h-2.5 text-sw-danger" />
                        )}
                        {vehicle.status === 'MOVING' && (
                          <Navigation className="w-2.5 h-2.5 text-primary" style={{ transform: `rotate(${lastLoc ? 45 : 0}deg)` }} />
                        )}
                      </div>
                      {vehicle.driverName && (
                        <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                          {vehicle.driverName}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
