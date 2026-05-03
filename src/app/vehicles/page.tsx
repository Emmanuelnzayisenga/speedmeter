"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import { formatDate, formatSpeed, VEHICLE_TYPE_ICONS, cn } from '@/lib/utils'
import {
  Plus, Search, Edit, Trash2, Car, ChevronLeft, ChevronRight,
  RefreshCw, AlertTriangle, Gauge, User, Cpu, Filter
} from 'lucide-react'

const VEHICLE_TYPES = ['CAR', 'TRUCK', 'MOTORCYCLE', 'BUS', 'VAN', 'OTHER']
const VEHICLE_STATUSES = ['ACTIVE', 'INACTIVE', 'MOVING', 'SPEEDING', 'OFFLINE']
const STATUS_BADGE: Record<string, any> = {
  ACTIVE: 'success', MOVING: 'radar', SPEEDING: 'destructive', INACTIVE: 'default', OFFLINE: 'default'
}
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4', '#F97316', '#EC4899']

const emptyForm = {
  name: '', plateNumber: '', type: 'CAR', status: 'INACTIVE',
  driverName: '', driverPhone: '', deviceId: '', color: '#3B82F6'
}

export default function VehiclesPage() {
  const { toast } = useToast()
  const [vehicles, setVehicles] = useState<any[]>([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<any>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchVehicles = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15' })
      if (search) params.set('search', search)
      if (statusFilter) params.set('status', statusFilter)
      const res = await fetch(`/api/vehicles?${params}`)
      const data = await res.json()
      setVehicles(data.vehicles || [])
      setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 })
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter])

  useEffect(() => { fetchVehicles(1) }, [fetchVehicles])

  const openCreate = () => { setEditingVehicle(null); setForm(emptyForm); setDialogOpen(true) }
  const openEdit = (v: any) => {
    setEditingVehicle(v)
    setForm({ name: v.name, plateNumber: v.plateNumber, type: v.type, status: v.status,
      driverName: v.driverName || '', driverPhone: v.driverPhone || '',
      deviceId: v.deviceId || '', color: v.color || '#3B82F6' })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.plateNumber) {
      toast({ title: 'Validation Error', description: 'Name and plate number are required', variant: 'destructive' })
      return
    }
    setSaving(true)
    try {
      const url = editingVehicle ? `/api/vehicles/${editingVehicle.id}` : '/api/vehicles'
      const method = editingVehicle ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error)
      }
      toast({ title: editingVehicle ? 'Vehicle updated' : 'Vehicle created', variant: 'success' as any })
      setDialogOpen(false)
      fetchVehicles(pagination.page)
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingId) return
    try {
      await fetch(`/api/vehicles/${deletingId}`, { method: 'DELETE' })
      toast({ title: 'Vehicle deleted' })
      setDeleteDialogOpen(false)
      setDeletingId(null)
      fetchVehicles(pagination.page)
    } catch {
      toast({ title: 'Error deleting vehicle', variant: 'destructive' })
    }
  }

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-5 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-wider">FLEET VEHICLES</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{pagination.total} vehicles registered</p>
          </div>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="w-4 h-4" /> Add Vehicle
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, plate, driver..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-card"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-44 bg-card">
              <Filter className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {VEHICLE_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => fetchVehicles(pagination.page)} className="flex-shrink-0">
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden panel-glow">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs tracking-wider">VEHICLE</TableHead>
                <TableHead className="text-xs tracking-wider">PLATE</TableHead>
                <TableHead className="text-xs tracking-wider">STATUS</TableHead>
                <TableHead className="text-xs tracking-wider">DRIVER</TableHead>
                <TableHead className="text-xs tracking-wider">DEVICE</TableHead>
                <TableHead className="text-xs tracking-wider">LAST SPEED</TableHead>
                <TableHead className="text-xs tracking-wider">VIOLATIONS</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <TableCell key={j}><div className="h-4 rounded shimmer" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : vehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Car className="w-10 h-10 opacity-20" />
                      <p className="text-sm">No vehicles found</p>
                      <Button variant="outline" size="sm" onClick={openCreate}>Add first vehicle</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : vehicles.map(v => (
                <TableRow key={v.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center text-sm flex-shrink-0"
                        style={{ backgroundColor: `${v.color}20`, border: `1px solid ${v.color}40` }}
                      >
                        {VEHICLE_TYPE_ICONS[v.type]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{v.name}</p>
                        <p className="text-[11px] text-muted-foreground">{v.type}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs bg-secondary px-2 py-0.5 rounded">{v.plateNumber}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_BADGE[v.status] || 'default'} className="text-[10px]">
                      {v.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {v.driverName ? (
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs">{v.driverName}</span>
                      </div>
                    ) : <span className="text-xs text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell>
                    {v.deviceId ? (
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-3 h-3 text-primary" />
                        <span className="text-xs font-mono">{v.deviceId}</span>
                      </div>
                    ) : <span className="text-xs text-muted-foreground">Not assigned</span>}
                  </TableCell>
                  <TableCell>
                    {v.locations?.[0] ? (
                      <div className="flex items-center gap-1.5">
                        <Gauge className={cn("w-3 h-3", v.status === 'SPEEDING' ? 'text-sw-danger' : 'text-muted-foreground')} />
                        <span className={cn("text-xs font-mono font-bold", v.status === 'SPEEDING' && 'text-sw-danger')}>
                          {formatSpeed(v.locations[0].speed)}
                        </span>
                      </div>
                    ) : <span className="text-xs text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell>
                    {v._count?.violations > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3 text-sw-danger" />
                        <span className="text-xs font-bold text-sw-danger">{v._count.violations}</span>
                      </div>
                    ) : <span className="text-xs text-sw-safe font-medium">Clean</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(v)}>
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-sw-danger hover:text-sw-danger"
                        onClick={() => { setDeletingId(v.id); setDeleteDialogOpen(true) }}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Showing {((pagination.page - 1) * 15) + 1}–{Math.min(pagination.page * 15, pagination.total)} of {pagination.total}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={pagination.page <= 1}
                onClick={() => fetchVehicles(pagination.page - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-mono">{pagination.page} / {pagination.totalPages}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchVehicles(pagination.page + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
            <DialogDescription>
              {editingVehicle ? 'Update vehicle information' : 'Register a new vehicle in the fleet'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label>Vehicle Name *</Label>
              <Input placeholder="e.g. Fleet Truck Alpha" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Plate Number *</Label>
              <Input placeholder="KAA 001A" className="font-mono uppercase" value={form.plateNumber}
                onChange={e => setForm(f => ({ ...f, plateNumber: e.target.value.toUpperCase() }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{VEHICLE_TYPES.map(t => <SelectItem key={t} value={t}>{VEHICLE_TYPE_ICONS[t]} {t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{VEHICLE_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Color</Label>
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 flex-wrap">
                  {COLORS.map(c => (
                    <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                      className={cn("w-6 h-6 rounded-full border-2 transition-all", form.color === c ? 'border-white scale-110' : 'border-transparent')}
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Driver Name</Label>
              <Input placeholder="John Kamau" value={form.driverName} onChange={e => setForm(f => ({ ...f, driverName: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Driver Phone</Label>
              <Input placeholder="+254712345678" value={form.driverPhone} onChange={e => setForm(f => ({ ...f, driverPhone: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>GPS Device ID</Label>
              <Input placeholder="GPS-001" className="font-mono" value={form.deviceId} onChange={e => setForm(f => ({ ...f, deviceId: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
              {editingVehicle ? 'Save Changes' : 'Add Vehicle'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Vehicle?</DialogTitle>
            <DialogDescription>This will permanently delete the vehicle and all its location history and violations. This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete Vehicle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
