"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Circle, Hexagon, Trash2, Check, Route, Undo2, Redo2, Delete, Search, LocateFixed, X, ChevronRight } from 'lucide-react'

interface Coordinate { lat: number; lng: number }

interface ZoneEditorMapProps {
    zones: Array<{
        id: string; name: string; speedLimit: number; zoneType: string;
        coordinates: any; color: string; active: boolean
    }>
    drawMode: 'CIRCLE' | 'POLYGON' | 'ROAD' | null
    onZoneDrawn: (coords: any, type: string) => void
    onZoneClick?: (id: string) => void
    className?: string
}

// ─── Nominatim result type ────────────────────────────────────────────────────
interface NominatimResult {
    place_id: number
    display_name: string
    lat: string
    lon: string
    type: string
    importance: number
}

// ─── Parse "lat, lng" coordinate string ──────────────────────────────────────
// Supports: "-1.9441, 30.0619" | "S 1.9441, E 30.0619" | "1.9441°S 30.0619°E"
function parseCoordString(raw: string): { lat: number; lng: number } | null {
    const cleaned = raw.replace(/[°NSEW]/gi, ' ').replace(/,/g, ' ').trim()
    const parts = cleaned.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) {
        const lat = parseFloat(parts[0])
        const lng = parseFloat(parts[1])
        if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            const origUp = raw.toUpperCase()
            return {
                lat: Math.abs(lat) * (origUp.includes('S') ? -1 : 1),
                lng: Math.abs(lng) * (origUp.includes('W') ? -1 : 1),
            }
        }
    }
    return null
}

export function ZoneEditorMap({ zones, drawMode, onZoneDrawn, onZoneClick, className }: ZoneEditorMapProps) {
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<any>(null)
    const LRef = useRef<any>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [drawing, setDrawing] = useState<Coordinate[]>([])
    const cursorHudRef = useRef<HTMLDivElement>(null)
    const tempLayersRef = useRef<any[]>([])
    const zoneLayersRef = useRef<any[]>([])
    const searchPinRef = useRef<any>(null)
    const drawingRef = useRef(drawing)
    drawingRef.current = drawing

    // ── Search state ─────────────────────────────────────────────────────────
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<NominatimResult[]>([])
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchError, setSearchError] = useState('')
    const [searchOpen, setSearchOpen] = useState(false)
    const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    // ── Undo/redo ─────────────────────────────────────────────────────────────
    const undoStackRef = useRef<Coordinate[][]>([])
    const redoStackRef = useRef<Coordinate[][]>([])
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)

    const syncHistoryState = useCallback(() => {
        setCanUndo(undoStackRef.current.length > 0)
        setCanRedo(redoStackRef.current.length > 0)
    }, [])

    const pushUndo = useCallback((snapshot: Coordinate[]) => {
        undoStackRef.current.push([...snapshot])
        redoStackRef.current = []
        syncHistoryState()
    }, [syncHistoryState])

    const rebuildTempLayers = useCallback((points: Coordinate[]) => {
        if (!mapInstanceRef.current || !LRef.current) return
        const map = mapInstanceRef.current
        const L = LRef.current
        tempLayersRef.current.forEach(l => map.removeLayer(l))
        tempLayersRef.current = []

        if (drawMode === 'CIRCLE') {
            if (points.length >= 1) {
                const coord = points[0]
                const marker = L.circleMarker([coord.lat, coord.lng], {
                    radius: 6, color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 1
                }).addTo(map)
                    .bindTooltip(`Center: ${coord.lat.toFixed(5)}, ${coord.lng.toFixed(5)}`,
                        { permanent: true, direction: 'top', offset: [0, -10], className: 'coord-label' }).openTooltip()
                tempLayersRef.current.push(marker)
            }
        } else if (drawMode === 'POLYGON') {
            points.forEach((coord, i) => {
                const marker = L.circleMarker([coord.lat, coord.lng], {
                    radius: 5, color: '#F59E0B', fillColor: '#F59E0B', fillOpacity: 1
                }).addTo(map)
                    .bindTooltip(`#${i + 1}  ${coord.lat.toFixed(5)}, ${coord.lng.toFixed(5)}`,
                        { permanent: true, direction: 'top', offset: [0, -10], className: 'coord-label' }).openTooltip()
                tempLayersRef.current.push(marker)
            })
            if (points.length >= 2) {
                tempLayersRef.current.push(
                    L.polyline(points.map(p => [p.lat, p.lng]),
                        { color: '#F59E0B', weight: 2, dashArray: '5 5' }).addTo(map)
                )
            }
        } else if (drawMode === 'ROAD') {
            points.forEach((coord, i) => {
                const marker = L.circleMarker([coord.lat, coord.lng], {
                    radius: 4, color: '#10B981', fillColor: '#10B981', fillOpacity: 1
                }).addTo(map)
                    .bindTooltip(`#${i + 1}  ${coord.lat.toFixed(5)}, ${coord.lng.toFixed(5)}`,
                        { permanent: true, direction: 'top', offset: [0, -10], className: 'coord-label' }).openTooltip()
                tempLayersRef.current.push(marker)
            })
            if (points.length >= 2) {
                tempLayersRef.current.push(
                    L.polyline(points.map(p => [p.lat, p.lng]),
                        { color: '#10B981', weight: 5, opacity: 0.7, lineCap: 'round', lineJoin: 'round' }).addTo(map)
                )
            }
        }
    }, [drawMode])

    const handleUndo = useCallback(() => {
        if (!undoStackRef.current.length) return
        const prev = undoStackRef.current.pop()!
        redoStackRef.current.push([...drawingRef.current])
        setDrawing(prev); drawingRef.current = prev
        rebuildTempLayers(prev); syncHistoryState()
    }, [rebuildTempLayers, syncHistoryState])

    const handleRedo = useCallback(() => {
        if (!redoStackRef.current.length) return
        const next = redoStackRef.current.pop()!
        undoStackRef.current.push([...drawingRef.current])
        setDrawing(next); drawingRef.current = next
        rebuildTempLayers(next); syncHistoryState()
    }, [rebuildTempLayers, syncHistoryState])

    const handleDeleteLast = useCallback(() => {
        if (!drawingRef.current.length) return
        pushUndo(drawingRef.current)
        const pts = drawingRef.current.slice(0, -1)
        setDrawing(pts); drawingRef.current = pts
        rebuildTempLayers(pts)
    }, [pushUndo, rebuildTempLayers])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!drawMode) return
            if (e.ctrlKey && !e.shiftKey && e.key === 'z') { e.preventDefault(); handleUndo() }
            if ((e.ctrlKey && e.shiftKey && e.key === 'Z') || (e.ctrlKey && e.key === 'y')) { e.preventDefault(); handleRedo() }
            if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); handleDeleteLast() }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [drawMode, handleUndo, handleRedo, handleDeleteLast])

    const resetHistory = useCallback(() => {
        undoStackRef.current = []; redoStackRef.current = []; syncHistoryState()
    }, [syncHistoryState])

    useEffect(() => { if (!drawMode) resetHistory() }, [drawMode, resetHistory])

    // ── Map init ──────────────────────────────────────────────────────────────
    useEffect(() => {
        if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return
        let cancelled = false

        const init = async () => {
            const L = (await import('leaflet')).default
            await import('leaflet/dist/leaflet.css')
            if (cancelled || mapInstanceRef.current) return

            LRef.current = L
            delete (L.Icon.Default.prototype as any)._getIconUrl
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            })

            const map = L.map(mapRef.current!, {
                center: [-1.9441, 30.0619], zoom: 12,
                zoomControl: true, attributionControl: false,
            })
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)
            mapInstanceRef.current = map

            const container = map.getContainer()
            container.style.zIndex = 'auto'
            map.getPane('tilePane')!.style.zIndex = '1'
            map.getPane('overlayPane')!.style.zIndex = '2'
            map.getPane('shadowPane')!.style.zIndex = '3'
            map.getPane('markerPane')!.style.zIndex = '4'
            map.getPane('tooltipPane')!.style.zIndex = '5'
            map.getPane('popupPane')!.style.zIndex = '6'

            if (!document.getElementById('coord-label-style')) {
                const style = document.createElement('style')
                style.id = 'coord-label-style'
                style.textContent = `
                  .coord-label { background: rgba(0,0,0,0.75) !important; border: 1px solid rgba(255,255,255,0.15) !important; border-radius: 4px !important; color: #e2e8f0 !important; font-family: 'ui-monospace','SFMono-Regular',monospace !important; font-size: 10px !important; font-weight: 500 !important; padding: 2px 6px !important; white-space: nowrap !important; box-shadow: 0 2px 8px rgba(0,0,0,0.4) !important; backdrop-filter: blur(4px) !important; }
                  .coord-label::before { display: none !important; }
                  .leaflet-tooltip.coord-label { pointer-events: none !important; }
                  .search-pin-icon { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5)); }
                `
                document.head.appendChild(style)
            }

            setTimeout(() => { map.invalidateSize(); setIsLoaded(true) }, 100)
        }

        init()
        return () => {
            cancelled = true
            if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null }
        }
    }, [])

    const prevDrawMode = useRef(drawMode)
    useEffect(() => {
        if (prevDrawMode.current !== drawMode) {
            prevDrawMode.current = drawMode
            if (mapInstanceRef.current) setTimeout(() => mapInstanceRef.current?.invalidateSize(), 50)
        }
    }, [drawMode])

    // ── Cursor HUD ────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!isLoaded || !mapInstanceRef.current) return
        const map = mapInstanceRef.current
        const hud = cursorHudRef.current
        if (!hud) return
        const accent = drawMode === 'CIRCLE' ? '#60a5fa' : drawMode === 'ROAD' ? '#34d399' : '#fbbf24'
        const handleMove = (e: any) => {
            if (!drawMode) { hud.style.display = 'none'; return }
            const { lat, lng } = e.latlng
            const native = e.originalEvent as MouseEvent
            hud.querySelector<HTMLSpanElement>('#hud-lat')!.textContent = `${lat >= 0 ? 'N' : 'S'} ${Math.abs(lat).toFixed(5)}°`
            hud.querySelector<HTMLSpanElement>('#hud-lng')!.textContent = `${lng >= 0 ? 'E' : 'W'} ${Math.abs(lng).toFixed(5)}°`
            hud.style.left = `${native.clientX + 18}px`
            hud.style.top = `${native.clientY - 36}px`
            hud.style.display = 'flex'
            hud.querySelectorAll<HTMLSpanElement>('.hud-accent').forEach(el => { el.style.color = accent })
        }
        const handleOut = () => { hud.style.display = 'none' }
        map.on('mousemove', handleMove)
        map.on('mouseout', handleOut)
        return () => { map.off('mousemove', handleMove); map.off('mouseout', handleOut); hud.style.display = 'none' }
    }, [isLoaded, drawMode])

    // ── Map click ─────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!isLoaded || !mapInstanceRef.current || !LRef.current) return
        const map = mapInstanceRef.current
        const L = LRef.current

        const handleClick = (e: any) => {
            if (!drawMode) return
            const coord: Coordinate = { lat: e.latlng.lat, lng: e.latlng.lng }

            if (drawMode === 'CIRCLE') {
                const current = drawingRef.current
                if (current.length === 0) {
                    pushUndo(current)
                    setDrawing([coord])
                    const marker = L.circleMarker([coord.lat, coord.lng], {
                        radius: 6, color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 1
                    }).addTo(map)
                        .bindTooltip(`Center: ${coord.lat.toFixed(5)}, ${coord.lng.toFixed(5)}`,
                            { permanent: true, direction: 'top', offset: [0, -10], className: 'coord-label' }).openTooltip()
                    tempLayersRef.current.push(marker)
                } else if (current.length === 1) {
                    const center = current[0]
                    const R = 6371000
                    const lat1 = center.lat * Math.PI / 180, lat2 = coord.lat * Math.PI / 180
                    const dLat = lat2 - lat1, dLng = (coord.lng - center.lng) * Math.PI / 180
                    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
                    const radius = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
                    onZoneDrawn({ lat: center.lat, lng: center.lng, radius }, 'CIRCLE')
                    setDrawing([]); resetHistory()
                    tempLayersRef.current.forEach(l => map.removeLayer(l)); tempLayersRef.current = []
                }
            } else if (drawMode === 'POLYGON') {
                pushUndo(drawingRef.current)
                const newPoints = [...drawingRef.current, coord]
                setDrawing(newPoints)
                const marker = L.circleMarker([coord.lat, coord.lng], {
                    radius: 5, color: '#F59E0B', fillColor: '#F59E0B', fillOpacity: 1
                }).addTo(map)
                    .bindTooltip(`#${newPoints.length}  ${coord.lat.toFixed(5)}, ${coord.lng.toFixed(5)}`,
                        { permanent: true, direction: 'top', offset: [0, -10], className: 'coord-label' }).openTooltip()
                tempLayersRef.current.push(marker)
                if (newPoints.length >= 2) {
                    const last = newPoints[newPoints.length - 2]
                    tempLayersRef.current.push(
                        L.polyline([[last.lat, last.lng], [coord.lat, coord.lng]],
                            { color: '#F59E0B', weight: 2, dashArray: '5 5' }).addTo(map)
                    )
                }
            } else if (drawMode === 'ROAD') {
                pushUndo(drawingRef.current)
                const newPoints = [...drawingRef.current, coord]
                setDrawing(newPoints)
                const marker = L.circleMarker([coord.lat, coord.lng], {
                    radius: 4, color: '#10B981', fillColor: '#10B981', fillOpacity: 1
                }).addTo(map)
                    .bindTooltip(`#${newPoints.length}  ${coord.lat.toFixed(5)}, ${coord.lng.toFixed(5)}`,
                        { permanent: true, direction: 'top', offset: [0, -10], className: 'coord-label' }).openTooltip()
                tempLayersRef.current.push(marker)
                if (newPoints.length >= 2) {
                    const lastPolyIdx = tempLayersRef.current.findLastIndex?.((l: any) => l._path && l._latlngs?.length > 1 && !l._radius)
                    if (lastPolyIdx !== undefined && lastPolyIdx >= 0) {
                        map.removeLayer(tempLayersRef.current[lastPolyIdx]); tempLayersRef.current.splice(lastPolyIdx, 1)
                    }
                    tempLayersRef.current.push(
                        L.polyline(newPoints.map(p => [p.lat, p.lng]),
                            { color: '#10B981', weight: 5, opacity: 0.7, lineCap: 'round', lineJoin: 'round' }).addTo(map)
                    )
                }
            }
        }
        map.on('click', handleClick)
        return () => map.off('click', handleClick)
    }, [isLoaded, drawMode, onZoneDrawn, pushUndo, resetHistory])

    // ── Search: zoom helper ───────────────────────────────────────────────────
    const zoomToCoord = useCallback((lat: number, lng: number, zoom = 15) => {
        const map = mapInstanceRef.current
        const L = LRef.current
        if (!map || !L) return

        // Remove old search pin
        if (searchPinRef.current) { map.removeLayer(searchPinRef.current); searchPinRef.current = null }

        const pinIcon = L.divIcon({
            className: 'search-pin-icon',
            html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0C6.268 0 0 6.268 0 14c0 9.625 12.6 21.375 13.125 21.875a1.25 1.25 0 001.75 0C15.4 35.375 28 23.625 28 14 28 6.268 21.732 0 14 0z" fill="#3B82F6"/>
              <circle cx="14" cy="14" r="6" fill="white"/>
            </svg>`,
            iconSize: [28, 36],
            iconAnchor: [14, 36],
            popupAnchor: [0, -36],
        })

        searchPinRef.current = L.marker([lat, lng], { icon: pinIcon }).addTo(map)
        map.flyTo([lat, lng], zoom, { duration: 1.2 })
    }, [])

    // ── Search: run query ─────────────────────────────────────────────────────
    const runSearch = useCallback(async (q: string) => {
        const trimmed = q.trim()
        if (!trimmed) { setSearchResults([]); setSearchError(''); return }

        // Direct coordinate input — skip Nominatim
        const coord = parseCoordString(trimmed)
        if (coord) {
            zoomToCoord(coord.lat, coord.lng, 16)
            setSearchResults([])
            setSearchOpen(false)
            return
        }

        setSearchLoading(true); setSearchError('')
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trimmed)}&limit=6&addressdetails=0`
            const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
            if (!res.ok) throw new Error('Search failed')
            const data: NominatimResult[] = await res.json()
            setSearchResults(data)
            if (data.length === 0) setSearchError('No results found')
        } catch {
            setSearchError('Search unavailable')
        } finally {
            setSearchLoading(false)
        }
    }, [zoomToCoord])

    const handleSearchSelect = useCallback((result: NominatimResult) => {
        zoomToCoord(parseFloat(result.lat), parseFloat(result.lon))
        setSearchQuery(result.display_name.split(',').slice(0, 2).join(','))
        setSearchResults([])
        setSearchOpen(false)
    }, [zoomToCoord])

    const handleSearchSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault()
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current)
        runSearch(searchQuery)
    }, [searchQuery, runSearch])

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setSearchQuery(val)
        setSearchOpen(true)
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current)
        if (val.trim().length >= 3) {
            searchDebounceRef.current = setTimeout(() => runSearch(val), 500)
        } else {
            setSearchResults([]); setSearchError('')
        }
    }, [runSearch])

    const handleClearSearch = useCallback(() => {
        setSearchQuery(''); setSearchResults([]); setSearchError(''); setSearchOpen(false)
        if (searchPinRef.current && mapInstanceRef.current) {
            mapInstanceRef.current.removeLayer(searchPinRef.current); searchPinRef.current = null
        }
        searchInputRef.current?.focus()
    }, [])

    // ── Finish / cancel drawing ───────────────────────────────────────────────
    const finishLine = useCallback(() => {
        if (drawing.length < 2) return
        onZoneDrawn(drawing, 'ROAD'); setDrawing([]); resetHistory()
        if (mapInstanceRef.current) { tempLayersRef.current.forEach(l => mapInstanceRef.current.removeLayer(l)); tempLayersRef.current = [] }
    }, [drawing, onZoneDrawn, resetHistory])

    const finishPolygon = useCallback(() => {
        if (drawing.length < 3) return
        onZoneDrawn(drawing, 'POLYGON'); setDrawing([]); resetHistory()
        if (mapInstanceRef.current) { tempLayersRef.current.forEach(l => mapInstanceRef.current.removeLayer(l)); tempLayersRef.current = [] }
    }, [drawing, onZoneDrawn, resetHistory])

    const cancelDrawing = useCallback(() => {
        setDrawing([]); resetHistory()
        if (cursorHudRef.current) cursorHudRef.current.style.display = 'none'
        if (mapInstanceRef.current) { tempLayersRef.current.forEach(l => mapInstanceRef.current.removeLayer(l)); tempLayersRef.current = [] }
    }, [resetHistory])

    // ── Render existing zones ─────────────────────────────────────────────────
    useEffect(() => {
        if (!isLoaded || !mapInstanceRef.current || !LRef.current) return
        const L = LRef.current, map = mapInstanceRef.current
        zoneLayersRef.current.forEach(l => map.removeLayer(l)); zoneLayersRef.current = []

        zones.forEach(zone => {
            let layer: any = null
            try {
                if (zone.zoneType === 'CIRCLE' && zone.coordinates?.lat) {
                    const { lat, lng, radius } = zone.coordinates
                    layer = L.circle([lat, lng], { radius, color: zone.color, fillColor: zone.color, fillOpacity: 0.15, weight: 2, opacity: zone.active ? 0.8 : 0.3, dashArray: '6 4' })
                } else if (zone.zoneType === 'ROAD' && Array.isArray(zone.coordinates) && zone.coordinates.length >= 2) {
                    const latlngs = zone.coordinates.map((c: any) => [c.lat, c.lng])
                    const shadow = L.polyline(latlngs, { color: zone.color, weight: 14, opacity: zone.active ? 0.15 : 0.05, lineCap: 'round', lineJoin: 'round' }).addTo(map)
                    shadow.on('click', () => onZoneClick?.(zone.id)); zoneLayersRef.current.push(shadow)
                    layer = L.polyline(latlngs, { color: zone.color, weight: 5, opacity: zone.active ? 0.85 : 0.3, lineCap: 'round', lineJoin: 'round', dashArray: zone.active ? undefined : '8 6' })
                } else if (zone.zoneType === 'POLYGON' && Array.isArray(zone.coordinates) && zone.coordinates.length >= 3) {
                    layer = L.polygon(zone.coordinates.map((c: any) => [c.lat, c.lng]), { color: zone.color, fillColor: zone.color, fillOpacity: 0.15, weight: 2, opacity: zone.active ? 0.8 : 0.3, dashArray: '6 4' })
                }
                if (layer) {
                    layer.addTo(map); layer.on('click', () => onZoneClick?.(zone.id))
                    layer.bindTooltip(`<strong>${zone.name}</strong><br/>${zone.speedLimit} km/h`, { permanent: false, sticky: true })
                    zoneLayersRef.current.push(layer)
                }
            } catch { }
        })
    }, [isLoaded, zones, onZoneClick])

    const canDeleteLast = drawing.length > 0 && (drawMode === 'POLYGON' || drawMode === 'ROAD')

    return (
        <div className={cn("w-full h-full flex flex-col", className)} style={{ zIndex: 0 }}>

            {/* ── Top bar ── */}
            <div className="flex items-start gap-2 px-1 pb-2 shrink-0 flex-wrap">

                {/* Search */}
                <div className="relative w-64 shrink-0">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                        <Input
                            ref={searchInputRef}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => setSearchOpen(true)}
                            onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
                            placeholder="Search place or paste coords…"
                            className="pl-8 pr-7 h-9 text-xs bg-card border-border shadow-lg"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </form>

                    {/* Dropdown */}
                    {searchOpen && (searchResults.length > 0 || searchLoading || searchError) && (
                        <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-lg shadow-2xl overflow-hidden z-[9999]">
                            {searchLoading && (
                                <div className="px-3 py-2.5 text-xs text-muted-foreground animate-pulse">Searching…</div>
                            )}
                            {searchError && !searchLoading && (
                                <div className="px-3 py-2.5 text-xs text-muted-foreground">{searchError}</div>
                            )}
                            {searchResults.map(r => (
                                <button
                                    key={r.place_id}
                                    type="button"
                                    onMouseDown={() => handleSearchSelect(r)}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-accent/50 transition-colors border-b border-border/40 last:border-0 group"
                                >
                                    <LocateFixed className="w-3 h-3 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                                    <span className="truncate text-foreground leading-snug">{r.display_name}</span>
                                    <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0 ml-auto" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Drawing toolbar */}
                {drawMode && (
                    <div className="bg-card border border-border rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xl">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            {drawMode === 'CIRCLE' ? (
                                <><Circle className="w-3.5 h-3.5 text-primary" />
                                    {drawing.length === 0 ? 'Click to set center' : 'Click to set radius'}
                                </>
                            ) : drawMode === 'ROAD' ? (
                                <><Route className="w-3.5 h-3.5 text-emerald-400" />
                                    Trace road ({drawing.length} pt{drawing.length !== 1 ? 's' : ''})
                                </>
                            ) : (
                                <><Hexagon className="w-3.5 h-3.5 text-sw-warn" />
                                    Add points ({drawing.length})
                                </>
                            )}
                        </div>

                        <div className="w-px h-4 bg-border" />

                        <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost"
                                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground disabled:opacity-30"
                                title="Undo (Ctrl+Z)" disabled={!canUndo} onClick={handleUndo}>
                                <Undo2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button size="sm" variant="ghost"
                                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground disabled:opacity-30"
                                title="Redo (Ctrl+Y)" disabled={!canRedo} onClick={handleRedo}>
                                <Redo2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button size="sm" variant="ghost"
                                className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive disabled:opacity-30"
                                title="Delete last point (Backspace)" disabled={!canDeleteLast} onClick={handleDeleteLast}>
                                <Delete className="w-3.5 h-3.5" />
                            </Button>
                        </div>

                        {((drawMode === 'ROAD' && drawing.length >= 2) || (drawMode === 'POLYGON' && drawing.length >= 3)) &&
                            <div className="w-px h-4 bg-border" />}

                        {drawMode === 'ROAD' && drawing.length >= 2 && (
                            <Button size="sm" variant="success" className="h-7 text-xs gap-1" onClick={finishLine}>
                                <Check className="w-3 h-3" /> Finish Road
                            </Button>
                        )}
                        {drawMode === 'POLYGON' && drawing.length >= 3 && (
                            <Button size="sm" variant="success" className="h-7 text-xs gap-1" onClick={finishPolygon}>
                                <Check className="w-3 h-3" /> Finish
                            </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-muted-foreground" onClick={cancelDrawing}>
                            <Trash2 className="w-3 h-3" /> Cancel
                        </Button>
                    </div>
                )}
            </div>

            {/* ── Map ── */}
            <div className={cn(
                "relative flex-1 min-h-0 rounded-lg border border-border overflow-hidden",
                drawMode && "cursor-crosshair",
            )}>
                <div ref={mapRef} className="w-full h-full" />

                {/* Cursor HUD */}
                <div ref={cursorHudRef} style={{ display: 'none', position: 'fixed', pointerEvents: 'none', zIndex: 9999, alignItems: 'center', gap: '6px', padding: '3px 8px', borderRadius: '5px', background: 'rgba(0,0,0,0.80)', border: '1px solid rgba(255,255,255,0.13)', backdropFilter: 'blur(6px)', boxShadow: '0 2px 10px rgba(0,0,0,0.5)', whiteSpace: 'nowrap', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: '11px', fontWeight: 500, color: '#e2e8f0', letterSpacing: '0.03em', userSelect: 'none' }}>
                    <span className="hud-accent" style={{ fontSize: '9px', lineHeight: 1 }}>✛</span>
                    <span id="hud-lat" className="hud-accent" />
                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '9px' }}>|</span>
                    <span id="hud-lng" className="hud-accent" />
                </div>

                {!isLoaded && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-[30]">
                        <div className="text-xs font-mono text-muted-foreground animate-pulse tracking-widest">LOADING MAP...</div>
                    </div>
                )}
            </div>
        </div>
    )
}