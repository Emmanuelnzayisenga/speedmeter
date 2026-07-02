"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { formatDate, formatCurrency, VEHICLE_TYPE_ICONS, cn } from '@/lib/utils'
import {
  Search, AlertTriangle, DollarSign, ChevronLeft, ChevronRight,
  RefreshCw, MapPin, Gauge, Filter, Eye, Edit, Trash2,
  CheckCircle, XCircle, Clock, FileText, Wallet
} from 'lucide-react'
import Link from 'next/link'

const STATUSES = ['PENDING', 'CONFIRMED', 'DISPUTED', 'RESOLVED', 'CANCELLED']
const STATUS_BADGE: Record<string, BadgeVariant> = {
  PENDING: 'warning', CONFIRMED: 'destructive', DISPUTED: 'radar',
  RESOLVED: 'success', CANCELLED: 'default'
}
const STATUS_ICONS: Record<string, any> = {
  PENDING: Clock, CONFIRMED: AlertTriangle, DISPUTED: FileText,
  RESOLVED: CheckCircle, CANCELLED: XCircle
}

export default function ViolationsPage() {
  const { toast } = useToast()
  const [violations, setViolations] = useState<any[]>([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })
  const [totalFines, setTotalFines] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [detailViolation, setDetailViolation] = useState<any>(null)
  const [editViolation, setEditViolation] = useState<any>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ status: '', fineAmount: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [statusCounts, setStatusCounts] = useState({ PENDING: 0, CONFIRMED: 0 })
  const requestIdRef = React.useRef(0)

  const fetchViolations = useCallback(async (page = 1) => {
    setLoading(true)
    const requestId = ++requestIdRef.current
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15' })
      if (search) params.set('search', search)
      if (statusFilter) params.set('status', statusFilter)
      const res = await fetch(`/api/violations?${params}`)
      const data = await res.json()
      if (requestId !== requestIdRef.current) return // a newer request has since started; discard this stale response
      setViolations(data.violations || [])
      setTotalFines(data.totalFines || 0)
      setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 })
    } finally {
      if (requestId === requestIdRef.current) setLoading(false)
    }
  }, [search, statusFilter])

  const fetchStatusCounts = useCallback(async () => {
    try {
      const [pendingRes, confirmedRes] = await Promise.all([
        fetch('/api/violations?status=PENDING&limit=1'),
        fetch('/api/violations?status=CONFIRMED&limit=1'),
      ])
      const [pendingData, confirmedData] = await Promise.all([pendingRes.json(), confirmedRes.json()])
      setStatusCounts({
        PENDING: pendingData.pagination?.total || 0,
        CONFIRMED: confirmedData.pagination?.total || 0,
      })
    } catch {
      // non-critical KPI, leave previous counts on failure
    }
  }, [])

  useEffect(() => { fetchViolations(1) }, [fetchViolations])
  useEffect(() => { fetchStatusCounts() }, [fetchStatusCounts])

  const openEdit = (v: any) => {
    setEditViolation(v)
    setEditForm({ status: v.status, fineAmount: String(v.fineAmount), notes: v.notes || '' })
  }

  const handleSave = async () => {
    if (!editViolation) return
    setSaving(true)
    try {
      const res = await fetch(`/api/violations/${editViolation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      toast({ title: 'Violation updated' })
      setEditViolation(null)
      fetchViolations(pagination.page)
      fetchStatusCounts()
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await fetch(`/api/violations/${deleteId}`, { method: 'DELETE' })
      toast({ title: 'Violation deleted' })
      setDeleteId(null)
      fetchViolations(pagination.page)
      fetchStatusCounts()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const quickResolve = async (id: string) => {
    try {
      await fetch(`/api/violations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'RESOLVED' }),
      })
      toast({ title: 'Violation resolved' })
      fetchViolations(pagination.page)
      fetchStatusCounts()
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const pendingCount = statusCounts.PENDING
  const confirmedCount = statusCounts.CONFIRMED

  return (
    <AppLayout>
      <div className="w-full flex flex-col gap-4 animate-fade-up mx-2">

        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold tracking-wider">VIOLATIONS & FINES</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {pagination.total} total violations — {formatCurrency(totalFines)} in fines
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Total Violations', value: pagination.total, icon: AlertTriangle, color: 'text-sw-danger' },
            { label: 'Pending Review', value: pendingCount, icon: Clock, color: 'text-sw-warn' },
            { label: 'Confirmed', value: confirmedCount, icon: CheckCircle, color: 'text-sw-danger' },
            { label: 'Total Fines', value: formatCurrency(totalFines), icon: DollarSign, color: 'text-sw-warn' },
          ].map(item => (
            <div key={item.label} className="bg-card border border-border rounded-lg p-3 flex items-center gap-3 panel-glow">
              <item.icon className={cn("w-7 h-7 sm:w-8 sm:h-8 opacity-60 flex-shrink-0", item.color)} />
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">{item.label}</p>
                <p className={cn("text-base sm:text-lg font-display font-bold", item.color)}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by vehicle, zone..." value={search}
              onChange={e => setSearch(e.target.value)} className="pl-9 bg-card" />
          </div>
          <Select value={statusFilter || 'all'} onValueChange={v => setStatusFilter(v === 'all' ? '' : v)}>
            <SelectTrigger className="w-full sm:w-44 bg-card">
              <Filter className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => fetchViolations(pagination.page)}>
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </Button>
        </div>

        {/* Desktop grid list */}
        <div className="hidden sm:block rounded-lg border border-border bg-card overflow-hidden panel-glow">
          <div className="hidden sm:grid grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] gap-x-4 items-center px-4 py-2.5 bg-muted/30 border-b border-border">
            <span className="text-[10px] tracking-wider text-muted-foreground font-medium uppercase">Vehicle</span>
            <span className="text-[10px] tracking-wider text-muted-foreground font-medium uppercase">Zone</span>
            <span className="text-[10px] tracking-wider text-muted-foreground font-medium uppercase text-center">Speed</span>
            <span className="text-[10px] tracking-wider text-muted-foreground font-medium uppercase text-center">Fine</span>
            <span className="text-[10px] tracking-wider text-muted-foreground font-medium uppercase text-center">Status</span>
            <span className="text-[10px] tracking-wider text-muted-foreground font-medium uppercase w-32 text-right">Actions</span>
          </div>

          <div className="divide-y divide-border">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] gap-x-4 items-center px-4 py-3">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div key={j} className="h-4 rounded shimmer" />
                  ))}
                </div>
              ))
            ) : violations.length === 0 ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground py-12">
                <AlertTriangle className="w-10 h-10 opacity-20" />
                <p className="text-sm">No violations found</p>
              </div>
            ) : violations.map(v => {
              const StatusIcon = STATUS_ICONS[v.status] || Clock
              const isActionable = v.status === 'PENDING' || v.status === 'CONFIRMED'
              return (
                <div key={v.id} className="group hover:bg-muted/20 transition-colors px-4 py-3 grid grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] gap-x-4 items-center">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base flex-shrink-0">{VEHICLE_TYPE_ICONS[v.vehicle?.type]}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{v.vehicle?.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">{v.vehicle?.plateNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs truncate">{v.zone?.name || 'Unknown zone'}</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <Gauge className="w-3 h-3 text-sw-danger flex-shrink-0" />
                      <span className="text-xs font-mono font-bold text-sw-danger">{Math.round(v.speed)} km/h</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">+{Math.round(v.excessSpeed)} over</p>
                  </div>
                  <div className="text-center">
                    <span className={cn("text-xs font-mono font-bold", v.fineAmount > 0 ? "text-sw-warn" : "text-muted-foreground")}>
                      {v.fineAmount > 0 ? formatCurrency(v.fineAmount) : '—'}
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <Badge variant={STATUS_BADGE[v.status] || 'default'} className="text-[10px] gap-1">
                      <StatusIcon className="w-2.5 h-2.5" />
                      {v.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 justify-end flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDetailViolation(v)}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(v)}>
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    {isActionable && (
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-green-500 hover:text-green-400 hover:bg-green-500/10" onClick={() => quickResolve(v.id)}>
                        <CheckCircle className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={() => setDeleteId(v.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    {isActionable && (
                      <Button asChild size="sm" className="h-7 px-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium gap-1">
                        <Link href={`/payments/${v.id}`}>
                          <Wallet className="h-3.5 w-3.5" />
                          <span className="hidden lg:inline">Pay</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile card grid */}
        <div className="sm:hidden space-y-3">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4 space-y-3">
                <div className="h-5 rounded shimmer w-1/2" />
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div key={j} className="h-4 rounded shimmer" />
                  ))}
                </div>
              </div>
            ))
          ) : violations.length === 0 ? (
            <div className="rounded-lg border border-border bg-card py-12 flex flex-col items-center gap-2 text-muted-foreground">
              <AlertTriangle className="w-10 h-10 opacity-20" />
              <p className="text-sm">No violations found</p>
            </div>
          ) : violations.map(v => {
            const StatusIcon = STATUS_ICONS[v.status] || Clock
            const isActionable = v.status === 'PENDING' || v.status === 'CONFIRMED'
            return (
              <div key={v.id} className="rounded-lg border border-border bg-card overflow-hidden panel-glow">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base flex-shrink-0">{VEHICLE_TYPE_ICONS[v.vehicle?.type]}</span>
                    <div>
                      <p className="text-sm font-medium leading-tight">{v.vehicle?.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">{v.vehicle?.plateNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setDetailViolation(v)}>
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(v)}>
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    {isActionable && (
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-green-500 hover:text-green-400 hover:bg-green-500/10" onClick={() => quickResolve(v.id)}>
                        <CheckCircle className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={() => setDeleteId(v.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    {isActionable && (
                      <Button asChild size="sm" className="h-7 px-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium gap-1">
                        <Link href={`/payments/${v.id}`}>
                          <Wallet className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 py-3">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Zone</p>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs truncate">{v.zone?.name || 'Unknown zone'}</span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Status</p>
                    <Badge variant={STATUS_BADGE[v.status] || 'default'} className="text-[10px] gap-1">
                      <StatusIcon className="w-2.5 h-2.5" />
                      {v.status}
                    </Badge>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Speed</p>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3 h-3 text-sw-danger flex-shrink-0" />
                      <span className="text-xs font-mono font-bold text-sw-danger">{Math.round(v.speed)} km/h</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">+{Math.round(v.excessSpeed)} over limit</p>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Fine</p>
                    <span className={cn("text-xs font-mono font-bold", v.fineAmount > 0 ? "text-sw-warn" : "text-muted-foreground")}>
                      {v.fineAmount > 0 ? formatCurrency(v.fineAmount) : '—'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              Showing {((pagination.page - 1) * 15) + 1}–{Math.min(pagination.page * 15, pagination.total)} of {pagination.total}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={pagination.page <= 1}
                onClick={() => fetchViolations(pagination.page - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-mono">{pagination.page} / {pagination.totalPages}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchViolations(pagination.page + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={!!detailViolation} onOpenChange={() => setDetailViolation(null)}>
        <DialogContent className="max-w-md w-[calc(100vw-2rem)]">
          <DialogHeader>
            <DialogTitle>Violation Details</DialogTitle>
          </DialogHeader>
          {detailViolation && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { label: 'Vehicle', value: detailViolation.vehicle?.name },
                  { label: 'Plate', value: detailViolation.vehicle?.plateNumber },
                  { label: 'Zone', value: detailViolation.zone?.name || 'Unknown' },
                  { label: 'Speed Limit', value: `${detailViolation.speedLimit} km/h` },
                  { label: 'Recorded Speed', value: `${Math.round(detailViolation.speed)} km/h` },
                  { label: 'Excess', value: `+${Math.round(detailViolation.excessSpeed)} km/h` },
                  { label: 'Fine Amount', value: formatCurrency(detailViolation.fineAmount) },
                  { label: 'Status', value: detailViolation.status },
                  { label: 'Date', value: formatDate(detailViolation.timestamp) },
                  { label: 'Location', value: `${detailViolation.latitude.toFixed(5)}, ${detailViolation.longitude.toFixed(5)}` },
                ].map(item => (
                  <div key={item.label} className="bg-secondary/50 rounded-md p-2.5">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-medium mt-0.5 break-words">{item.value}</p>
                  </div>
                ))}
              </div>
              {detailViolation.notes && (
                <div className="bg-secondary/50 rounded-md p-2.5">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-sm">{detailViolation.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editViolation} onOpenChange={() => setEditViolation(null)}>
        <DialogContent className="max-w-md w-[calc(100vw-2rem)]">
          <DialogHeader>
            <DialogTitle>Update Violation</DialogTitle>
            <DialogDescription>Change status, fine amount, or add notes</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={editForm.status} onValueChange={v => setEditForm(f => ({ ...f, status: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Fine Amount (KES)</Label>
              <Input type="number" value={editForm.fineAmount} className="font-mono"
                onChange={e => setEditForm(f => ({ ...f, fineAmount: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea placeholder="Add notes..." value={editForm.notes}
                onChange={e => setEditForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setEditViolation(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <RefreshCw className="w-4 h-4 animate-spin mr-2" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="max-w-sm w-[calc(100vw-2rem)]">
          <DialogHeader>
            <DialogTitle>Delete Violation?</DialogTitle>
            <DialogDescription>This record will be permanently removed.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}