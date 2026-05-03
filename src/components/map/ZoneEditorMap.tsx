"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Circle, Hexagon, Minus, Trash2, Check } from 'lucide-react'

interface Coordinate { lat: number; lng: number }

interface ZoneEditorMapProps {
  zones: Array<{
    id: string; name: string; speedLimit: number; zoneType: string;
    coordinates: any; color: string; active: boolean
  }>
  drawMode: 'CIRCLE' | 'POLYGON' | null
  onZoneDrawn: (coords: any, type: string) => void
  onZoneClick?: (id: string) => void
  className?: string
}

export function ZoneEditorMap({ zones, drawMode, onZoneDrawn, onZoneClick, className }: ZoneEditorMapProps) {
  const mapRef = useRef<any>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [drawing, setDrawing] = useState<Coordinate[]>([])
  const tempLayersRef = useRef<any[]>([])
  const zoneLayersRef = useRef<any[]>([])
  const drawingRef = useRef(drawing)
  drawingRef.current = drawing

  useEffect(() => {
    const init = async () => {
      if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      const map = L.map(mapRef.current, {
        center: [-1.2921, 36.8219],
        zoom: 12,
        zoomControl: true,
        attributionControl: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)
      mapInstanceRef.current = map
      setIsLoaded(true)
    }
    init()
    return () => { mapInstanceRef.current?.remove(); mapInstanceRef.current = null }
  }, [])

  // Handle map clicks for drawing
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return
    const map = mapInstanceRef.current
    const L = require('leaflet')

    const handleClick = (e: any) => {
      if (!drawMode) return
      const coord = { lat: e.latlng.lat, lng: e.latlng.lng }

      if (drawMode === 'CIRCLE') {
        // Circle: first click = center, second click = radius
        const current = drawingRef.current
        if (current.length === 0) {
          setDrawing([coord])
          // Draw center marker
          const marker = L.circleMarker([coord.lat, coord.lng], {
            radius: 6, color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 1
          }).addTo(map)
          tempLayersRef.current.push(marker)
        } else if (current.length === 1) {
          const center = current[0]
          const R = 6371000
          const lat1 = center.lat * Math.PI / 180
          const lat2 = coord.lat * Math.PI / 180
          const dLat = lat2 - lat1
          const dLng = (coord.lng - center.lng) * Math.PI / 180
          const a = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
          const radius = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
          onZoneDrawn({ lat: center.lat, lng: center.lng, radius }, 'CIRCLE')
          setDrawing([])
          tempLayersRef.current.forEach(l => map.removeLayer(l))
          tempLayersRef.current = []
        }
      } else if (drawMode === 'POLYGON') {
        const newPoints = [...drawingRef.current, coord]
        setDrawing(newPoints)
        // Draw point marker
        const marker = L.circleMarker([coord.lat, coord.lng], {
          radius: 5, color: '#F59E0B', fillColor: '#F59E0B', fillOpacity: 1
        }).addTo(map)
        tempLayersRef.current.push(marker)
        // Draw line if 2+ points
        if (newPoints.length >= 2) {
          const last = newPoints[newPoints.length - 2]
          const line = L.polyline([[last.lat, last.lng], [coord.lat, coord.lng]], {
            color: '#F59E0B', weight: 2, dashArray: '5 5'
          }).addTo(map)
          tempLayersRef.current.push(line)
        }
      }
    }

    map.on('click', handleClick)
    return () => map.off('click', handleClick)
  }, [isLoaded, drawMode, onZoneDrawn])

  const finishPolygon = useCallback(() => {
    if (drawing.length < 3) return
    onZoneDrawn(drawing, 'POLYGON')
    setDrawing([])
    if (mapInstanceRef.current) {
      tempLayersRef.current.forEach(l => mapInstanceRef.current.removeLayer(l))
      tempLayersRef.current = []
    }
  }, [drawing, onZoneDrawn])

  const cancelDrawing = useCallback(() => {
    setDrawing([])
    if (mapInstanceRef.current) {
      tempLayersRef.current.forEach(l => mapInstanceRef.current.removeLayer(l))
      tempLayersRef.current = []
    }
  }, [])

  // Render existing zones
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return
    const L = require('leaflet')
    const map = mapInstanceRef.current

    zoneLayersRef.current.forEach(l => map.removeLayer(l))
    zoneLayersRef.current = []

    zones.forEach(zone => {
      let layer: any = null
      const style = {
        color: zone.color, fillColor: zone.color, fillOpacity: 0.15,
        weight: 2, opacity: zone.active ? 0.8 : 0.3, dashArray: '6 4',
      }

      try {
        if (zone.zoneType === 'CIRCLE' && zone.coordinates?.lat) {
          const { lat, lng, radius } = zone.coordinates
          layer = L.circle([lat, lng], { radius, ...style })
        } else if (Array.isArray(zone.coordinates) && zone.coordinates.length >= 3) {
          layer = L.polygon(zone.coordinates.map((c: any) => [c.lat, c.lng]), style)
        }

        if (layer) {
          layer.addTo(map)
          layer.on('click', () => onZoneClick?.(zone.id))
          layer.bindTooltip(`<strong>${zone.name}</strong><br/>${zone.speedLimit} km/h`, {
            permanent: false, sticky: true
          })
          zoneLayersRef.current.push(layer)
        }
      } catch (e) {}
    })
  }, [isLoaded, zones, onZoneClick])

  return (
    <div className={cn("relative w-full h-full rounded-lg overflow-hidden border border-border", className)}>
      <div ref={mapRef} className={cn("w-full h-full", drawMode && "cursor-crosshair")} />

      {/* Drawing controls overlay */}
      {drawMode && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[1000]">
          <div className="bg-card border border-border rounded-lg px-4 py-2 flex items-center gap-3 shadow-xl">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {drawMode === 'CIRCLE' ? (
                <><Circle className="w-3.5 h-3.5 text-primary" /> Click center, then radius</>
              ) : (
                <><Hexagon className="w-3.5 h-3.5 text-sw-warn" /> Click to add points ({drawing.length} added)</>
              )}
            </div>
            {drawMode === 'POLYGON' && drawing.length >= 3 && (
              <Button size="sm" variant="success" className="h-7 text-xs gap-1" onClick={finishPolygon}>
                <Check className="w-3 h-3" /> Finish
              </Button>
            )}
            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-muted-foreground" onClick={cancelDrawing}>
              <Trash2 className="w-3 h-3" /> Cancel
            </Button>
          </div>
        </div>
      )}

      {!isLoaded && (
        <div className="absolute inset-0 bg-background flex items-center justify-center">
          <div className="text-xs font-mono text-muted-foreground animate-pulse tracking-widest">
            LOADING MAP...
          </div>
        </div>
      )}
    </div>
  )
}
