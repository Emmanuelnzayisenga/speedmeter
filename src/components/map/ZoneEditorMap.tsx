"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import {
  Edit, Trash2, MapPin, Circle, Hexagon, RefreshCw,
  AlertTriangle, ToggleLeft, ToggleRight, Gauge, Info, Route
} from 'lucide-react'
import { ZoneEditorMap } from './zoneeditor'

const ZONE_COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#06B6D4']

const emptyForm = {
  name: '', description: '', speedLimit: '50', color: '#EF4444', active: true
}

export default function ZoneManagerPage() {
  const { toast } = useToast()
  const [zones, setZones] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [drawMode, setDrawMode] = useState<'CIRCLE' | 'POLYGON' | 'ROAD' | null>(null)
  const [pendingCoords, setPendingCoords] = useState<any>(null)
  const [pendingType, setPendingType] = useState<string>('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingZone, setEditingZone] = useState<any>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null)

  const fetchZones = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/zones')
      const data = await res.json()
      setZones(data.zones || [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchZones() }, [fetchZones])

  const handleZoneDrawn = useCallback((coords: any, type: string) => {
    setPendingCoords(coords)
    setPendingType(type)
    setDrawMode(null)
    setEditingZone(null)
    setForm({ ...emptyForm, color: type === 'ROAD' ? '#10B981' : '#EF4444' })
    setDialogOpen(true)
  }, [])

  const openEdit = (zone: any) => {
    setEditingZone(zone)
    setForm({
      name: zone.name, description: zone.description || '',
      speedLimit: String(zone.speedLimit), color: zone.color, active: zone.active,
    })
    setPendingCoords(null)
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.speedLimit) {
      toast({ title: 'Validation Error', description: 'Name and speed limit are required', variant: 'destructive' })
      return
    }
    setSaving(true)
    try {
      const payload: any = { ...form, speedLimit: parseFloat(form.speedLimit) }
      if (!editingZone) {
        payload.coordinates = pendingCoords
        payload.zoneType = pendingType
      }
      const url = editingZone ? `/api/zones/${editingZone.id}` : '/api/zones'
      const method = editingZone ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error((await res.json()).error)
      toast({ title: editingZone ? 'Zone updated' : 'Zone created' })
      setDialogOpen(false)
      fetchZones()
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await fetch(`/api/zones/${deleteId}`, { method: 'DELETE' })
      toast({ title: 'Zone deleted' })
      setDeleteId(null)
      fetchZones()
    } catch {
      toast({ title: 'Error deleting zone', variant: 'destructive' })
    }
  }

  const toggleActive = async (zone: any) => {
    try {
      await fetch(`/api/zones/${zone.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !zone.active }),
      })
      fetchZones()
    } catch {
      toast({ title: 'Error updating zone', variant: 'destructive' })
    }
  }

  // Zone type icon helper
  const ZoneTypeIcon = ({ type }: { type: string }) => {
    if (type === 'CIRCLE') return <Circle className="w-2.5 h-2.5" />
    if (type === 'ROAD') return <Route className="w-2.5 h-2.5" />
    return <Hexagon className="w-2.5 h-2.5" />
  }

  return (
    <>
      <AppLayout>
        <div className="flex h-full">
          {/* Left panel */}
          <div className="w-72 border-r border-border/50 flex flex-col bg-sw-panel/50 flex-shrink-0">
            <div className="p-3 border-b border-border/50">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-display font-bold tracking-wider">SPEED ZONES</h2>
                <Badge variant="radar" className="text-[10px]">{zones.filter(z => z.active).length} active</Badge>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <Button
                  variant={drawMode === 'CIRCLE' ? 'default' : 'outline'}
                  size="sm"
                  className="gap-1 text-xs px-2"
                  onClick={() => setDrawMode(d => d === 'CIRCLE' ? null : 'CIRCLE')}
                >
                  <Circle className="w-3 h-3" />
                  Circle
                </Button>
                <Button
                  variant={drawMode === 'POLYGON' ? 'default' : 'outline'}
                  size="sm"
                  className="gap-1 text-xs px-2"
                  onClick={() => setDrawMode(d => d === 'POLYGON' ? null : 'POLYGON')}
                >
                  <Hexagon className="w-3 h-3" />
                  Polygon
                </Button>
                <Button
                  variant={drawMode === 'ROAD' ? 'default' : 'outline'}
                  size="sm"
                  className={cn(
                    "gap-1 text-xs px-2",
                    drawMode === 'ROAD' && "bg-emerald-600 hover:bg-emerald-700 border-emerald-500"
                  )}
                  onClick={() => setDrawMode(d => d === 'ROAD' ? null : 'ROAD')}
                >
                  <Route className="w-3 h-3" />
                  Road
                </Button>
              </div>

              {drawMode && (
                <div className={cn(
                  "mt-2 px-2.5 py-2 rounded-md border flex items-start gap-2",
                  drawMode === 'ROAD'
                    ? 'bg-emerald-500/10 border-emerald-500/20'
                    : 'bg-primary/10 border-primary/20'
                )}>
                  <Info className={cn(
                    "w-3.5 h-3.5 flex-shrink-0 mt-0.5",
                    drawMode === 'ROAD' ? 'text-emerald-400' : 'text-primary'
                  )} />
                  <p className={cn(
                    "text-[11px] leading-relaxed",
                    drawMode === 'ROAD' ? 'text-emerald-400' : 'text-primary'
                  )}>
                    {drawMode === 'CIRCLE'
                      ? 'Click map to set center, then click again to set radius'
                      : drawMode === 'ROAD'
                        ? 'Click along a road to trace its path. Click "Finish Road" when done (min 2 points)'
                        : 'Click map to add polygon vertices. Click "Finish" when done (min 3 points)'}
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-3 space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-16 rounded-md shimmer" />
                  ))}
                </div>
              ) : zones.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-2">
                  <MapPin className="w-8 h-8 opacity-20" />
                  <p className="text-xs">No zones created yet</p>
                  <p className="text-[10px] text-center px-4">Use the draw tools above to add speed zones to the map</p>
                </div>
              ) : (
                <div className="divide-y divide-border/30">
                  {zones.map(zone => (
                    <div
                      key={zone.id}
                      className={cn(
                        "px-3 py-2.5 hover:bg-secondary/30 transition-colors cursor-pointer group",
                        selectedZoneId === zone.id && 'bg-primary/10 border-l-2 border-primary',
                        !zone.active && 'opacity-50'
                      )}
                      onClick={() => setSelectedZoneId(zone.id === selectedZoneId ? null : zone.id)}
                    >
                      <div className="flex items-start gap-2.5">
                        {/* Road zones show a line swatch, others show a square */}
                        {zone.zoneType === 'ROAD' ? (
                          <div className="flex items-center mt-1.5 flex-shrink-0 w-3">
                            <div className="w-3 h-[3px] rounded-full" style={{ backgroundColor: zone.color }} />
                          </div>
                        ) : (
                          <div className="w-3 h-3 rounded-sm mt-1 flex-shrink-0" style={{ backgroundColor: zone.color }} />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs font-semibold truncate">{zone.name}</p>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={(e) => { e.stopPropagation(); toggleActive(zone) }} className="text-muted-foreground hover:text-foreground">
                                {zone.active ? <ToggleRight className="w-3.5 h-3.5 text-sw-safe" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); openEdit(zone) }} className="text-muted-foreground hover:text-foreground">
                                <Edit className="w-3 h-3" />
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); setDeleteId(zone.id) }} className="text-muted-foreground hover:text-sw-danger">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-sw-warn">
                              <Gauge className="w-2.5 h-2.5" /> {zone.speedLimit} km/h
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <ZoneTypeIcon type={zone.zoneType} /> {zone.zoneType}
                            </span>
                            {zone._count?.violations > 0 && (
                              <span className="flex items-center gap-0.5 text-[10px] text-sw-danger">
                                <AlertTriangle className="w-2.5 h-2.5" /> {zone._count.violations}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Map area */}
          <div className="flex-1 p-3" style={{ zIndex: 0, position: 'relative' }}>
            <ZoneEditorMap
              zones={zones}
              drawMode={drawMode}
              onZoneDrawn={handleZoneDrawn}
              onZoneClick={setSelectedZoneId}
              className="w-full h-full"
            />
          </div>
        </div>
      </AppLayout>

      {/* Dialogs outside AppLayout */}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingZone ? 'Edit Speed Zone' : 'Create Speed Zone'}</DialogTitle>
            <DialogDescription>
              {editingZone
                ? 'Update zone configuration'
                : `Configure the new ${pendingType?.toLowerCase()} zone`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Zone Name *</Label>
              <Input placeholder="e.g. Kigali CBD Road" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input placeholder="Optional description" value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Speed Limit (km/h) *</Label>
              <Input type="number" placeholder="50" min="5" max="200" value={form.speedLimit}
                onChange={e => setForm(f => ({ ...f, speedLimit: e.target.value }))} className="font-mono" />
              <div className="grid grid-cols-4 gap-1.5">
                {[20, 30, 50, 80, 100, 110, 120, 130].map(v => (
                  <button key={v} onClick={() => setForm(f => ({ ...f, speedLimit: String(v) }))}
                    className={cn(
                      "text-[11px] font-mono py-1 rounded border transition-colors",
                      form.speedLimit === String(v)
                        ? 'bg-primary/20 border-primary/50 text-primary'
                        : 'bg-secondary border-border text-muted-foreground hover:border-border/80'
                    )}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Zone Color</Label>
              <div className="flex gap-2">
                {ZONE_COLORS.map(c => (
                  <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                    className={cn("w-7 h-7 rounded-full border-2 transition-transform",
                      form.color === c ? 'border-white scale-125' : 'border-transparent')}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <RefreshCw className="w-4 h-4 animate-spin mr-2" />}
              {editingZone ? 'Save Changes' : 'Create Zone'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Zone?</DialogTitle>
            <DialogDescription>This will remove the speed zone from the map. Violation records will be kept.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete Zone</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}