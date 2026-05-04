"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface MapVehicle {
  id: string
  name: string
  plateNumber: string
  type: string
  status: string
  color?: string | null
  locations?: { latitude: number; longitude: number; speed: number; heading?: number | null }[]
}

interface SpeedZone {
  id: string
  name: string
  speedLimit: number
  zoneType: string
  coordinates: any
  color: string
  active: boolean
}

interface LiveMapProps {
  vehicles: MapVehicle[]
  zones: SpeedZone[]
  selectedVehicleId?: string | null
  onVehicleClick?: (id: string) => void
  className?: string
}

export function LiveMap({ vehicles, zones, selectedVehicleId, onVehicleClick, className }: LiveMapProps) {
  const mapRef = useRef<any>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<Map<string, any>>(new Map())
  const zoneLayersRef = useRef<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const initMap = useCallback(async () => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return

    const L = (await import('leaflet')).default
    await import('leaflet/dist/leaflet.css')

    // Custom tile URL - dark map
    const map = L.map(mapRef.current, {
      center:[-1.69459, 29.92002],
      zoom: 12,
      zoomControl: true,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map)

    mapInstanceRef.current = map
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    initMap()
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [initMap])

  // Render zones
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return
    const L = require('leaflet')
    const map = mapInstanceRef.current

    // Remove old zone layers
    zoneLayersRef.current.forEach(l => map.removeLayer(l))
    zoneLayersRef.current = []

    zones.filter(z => z.active).forEach(zone => {
      let layer: any = null
      const style = {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.1,
        weight: 2,
        opacity: 0.7,
        dashArray: '6 4',
      }

      try {
        if (zone.zoneType === 'CIRCLE' && zone.coordinates?.lat) {
          const { lat, lng, radius } = zone.coordinates
          layer = L.circle([lat, lng], { radius, ...style })
        } else if (zone.zoneType === 'POLYGON' && Array.isArray(zone.coordinates)) {
          const points = zone.coordinates.map((c: any) => [c.lat, c.lng])
          layer = L.polygon(points, style)
        }

        if (layer) {
          layer.addTo(map)
          layer.bindPopup(`
            <div style="font-family: 'Rajdhani', sans-serif; min-width: 160px;">
              <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">${zone.name}</div>
              <div style="font-size: 12px; opacity: 0.8;">Speed Limit: <strong>${zone.speedLimit} km/h</strong></div>
              <div style="font-size: 11px; opacity: 0.6; margin-top: 2px;">${zone.zoneType}</div>
            </div>
          `)
          zoneLayersRef.current.push(layer)
        }
      } catch (e) {
        // skip invalid geometry
      }
    })
  }, [isLoaded, zones])

  // Render vehicles
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return
    const L = require('leaflet')
    const map = mapInstanceRef.current

    const statusEmoji: Record<string, string> = {
      MOVING: '🔵', SPEEDING: '🔴', ACTIVE: '🟢', INACTIVE: '⚫', OFFLINE: '⚫'
    }

    vehicles.forEach(vehicle => {
      const loc = vehicle.locations?.[0]
      if (!loc) return

      const color = vehicle.color || '#3B82F6'
      const isSpeeding = vehicle.status === 'SPEEDING'
      const isSelected = vehicle.id === selectedVehicleId

      const iconHtml = `
        <div style="
          position: relative;
          width: ${isSelected ? '44px' : '36px'};
          height: ${isSelected ? '44px' : '36px'};
          transition: all 0.3s ease;
        ">
          ${isSelected || isSpeeding ? `
            <div style="
              position: absolute; inset: -4px; border-radius: 50%;
              border: 2px solid ${isSpeeding ? '#EF4444' : color};
              opacity: 0.5;
              animation: ping 1.5s ease-in-out infinite;
            "></div>
          ` : ''}
          <div style="
            width: 100%; height: 100%; border-radius: 50%;
            background: ${color}20;
            border: 2px solid ${isSpeeding ? '#EF4444' : isSelected ? color : color + '80'};
            display: flex; align-items: center; justify-content: center;
            font-size: ${isSelected ? '18px' : '14px'};
            box-shadow: 0 2px 8px rgba(0,0,0,0.4), 0 0 ${isSelected ? '12px' : '6px'} ${color}60;
            cursor: pointer;
          ">
            ${vehicle.type === 'TRUCK' ? '🚛' : vehicle.type === 'BUS' ? '🚌' : vehicle.type === 'MOTORCYCLE' ? '🏍️' : vehicle.type === 'VAN' ? '🚐' : '🚗'}
          </div>
          <div style="
            position: absolute; bottom: -18px; left: 50%; transform: translateX(-50%);
            background: ${isSpeeding ? '#EF444490' : '#00000090'};
            color: white; font-size: 9px; font-family: 'Space Mono', monospace;
            padding: 1px 5px; border-radius: 3px; white-space: nowrap;
            border: 1px solid ${isSpeeding ? '#EF444440' : '#ffffff20'};
          ">${Math.round(loc.speed)} km/h</div>
        </div>
      `

      const icon = L.divIcon({
        html: iconHtml,
        className: '',
        iconSize: [isSelected ? 44 : 36, 54],
        iconAnchor: [isSelected ? 22 : 18, isSelected ? 22 : 18],
      })

      const existing = markersRef.current.get(vehicle.id)
      if (existing) {
        existing.setLatLng([loc.latitude, loc.longitude])
        existing.setIcon(icon)
      } else {
        const marker = L.marker([loc.latitude, loc.longitude], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; min-width: 180px;">
              <div style="font-weight: 700; font-size: 14px; font-family: 'Rajdhani', sans-serif; margin-bottom: 6px;">
                ${vehicle.name}
              </div>
              <div style="display: grid; gap: 3px; font-size: 12px;">
                <div>🪪 ${vehicle.plateNumber}</div>
                <div>⚡ Speed: <strong>${Math.round(loc.speed)} km/h</strong></div>
                ${vehicle.type ? `<div>🚗 Type: ${vehicle.type}</div>` : ''}
              </div>
            </div>
          `)

        marker.on('click', () => {
          onVehicleClick?.(vehicle.id)
        })

        markersRef.current.set(vehicle.id, marker)
      }
    })

    // Remove markers for removed vehicles
    markersRef.current.forEach((marker, id) => {
      if (!vehicles.find(v => v.id === id)) {
        map.removeLayer(marker)
        markersRef.current.delete(id)
      }
    })
  }, [isLoaded, vehicles, selectedVehicleId, onVehicleClick])

  // Pan to selected vehicle
  useEffect(() => {
    if (!isLoaded || !selectedVehicleId || !mapInstanceRef.current) return
    const vehicle = vehicles.find(v => v.id === selectedVehicleId)
    const loc = vehicle?.locations?.[0]
    if (loc) {
      mapInstanceRef.current.flyTo([loc.latitude, loc.longitude], 15, { duration: 1 })
    }
  }, [isLoaded, selectedVehicleId, vehicles])

  return (
    <div className={cn("relative w-full h-full rounded-lg overflow-hidden border border-border", className)}>
      <div ref={mapRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-radar-scan" />
              <div className="absolute inset-2 rounded-full border border-primary/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
              </div>
            </div>
            <span className="text-xs font-mono text-muted-foreground tracking-widest animate-pulse">
              INITIALIZING MAP...
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
