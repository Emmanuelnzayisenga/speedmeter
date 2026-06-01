"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
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
const STATUS_BADGE: Record<string, any> = {
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

  const fetchViolations = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15' })
      if (search) params.set('search', search)
      if (statusFilter) params.set('status', statusFilter)
      const res = await fetch(`/api/violations?${params}`)
      const data = await res.json()
      setViolations(data.violations || [])
      setTotalFines(data.totalFines || 0)
      setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 })
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter])

  useEffect(() => { fetchViolations(1) }, [fetchViolations])

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
    } catch {
      toast({ title: 'Error', variant: 'destructive' })
    }
  }

  const pendingCount = violations.filter(v => v.status === 'PENDING').length
  const confirmedCount = violations.filter(v => v.status === 'CONFIRMED').length

  return (
    <AppLayout>
      <div className="w-full flex flex-col gap-4 animate-fade-up mx-2">

        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold tracking-wider">VIOLATIONS & FINES</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {pagination.total} total violations — {formatCurrency(totalFines)} in fines
          </p>
        </div>

        {/* Stats */}
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by vehicle, zone..." value={search}
              onChange={e => setSearch(e.target.value)} className="pl-9 bg-card" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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

        {/* Card-grid list */}
        <div className="rounded-lg border border-border bg-card overflow-hidden panel-glow">

          {/* Column headers — hidden on mobile */}
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
                <div key={i} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto_auto_auto_auto] gap-x-4 items-center px-4 py-3">
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
                <div
                  key={v.id}
                  className="group hover:bg-muted/20 transition-colors px-4 py-3 flex flex-col sm:grid sm:grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] sm:gap-x-4 sm:items-center gap-y-0"
                >
                  {/* ── Mobile: 2-col label/value grid; Desktop: individual cells ── */}

                  {/* Vehicle */}
                  <div className="flex items-center gap-2 min-w-0 py-1.5 sm:py-0">
                    {/* Mobile label */}
                    <span className="sm:hidden text-[10px] text-muted-foreground uppercase tracking-wider w-16 flex-shrink-0">Vehicle</span>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base flex-shrink-0">{VEHICLE_TYPE_ICONS[v.vehicle?.type]}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{v.vehicle?.name}</p>
                        <p className="text-[10px] font-mono text-muted-foreground">{v.vehicle?.plateNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Zone */}
                  <div className="flex items-center gap-2 min-w-0 py-1.5 sm:py-0 sm:gap-1.5">
                    <span className="sm:hidden text-[10px] text-muted-foreground uppercase tracking-wider w-16 flex-shrink-0">Zone</span>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs truncate">{v.zone?.name || 'Unknown zone'}</span>
                    </div>
                  </div>

                  {/* Speed */}
                  <div className="flex items-center gap-2 py-1.5 sm:py-0 sm:block sm:text-center">
                    <span className="sm:hidden text-[10px] text-muted-foreground uppercase tracking-wider w-16 flex-shrink-0">Speed</span>
                    <div>
                      <div className="flex items-center gap-1 sm:justify-center">
                        <Gauge className="w-3 h-3 text-sw-danger flex-shrink-0" />
                        <span className="text-xs font-mono font-bold text-sw-danger">{Math.round(v.speed)} km/h</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground sm:text-center">+{Math.round(v.excessSpeed)} over</p>
                    </div>
                  </div>

                  {/* Fine */}
                  <div className="flex items-center gap-2 py-1.5 sm:py-0 sm:block sm:text-center">
                    <span className="sm:hidden text-[10px] text-muted-foreground uppercase tracking-wider w-16 flex-shrink-0">Fine</span>
                    <span className={cn(
                      "text-xs font-mono font-bold",
                      v.fineAmount > 0 ? "text-sw-warn" : "text-muted-foreground"
                    )}>
                      {v.fineAmount > 0 ? formatCurrency(v.fineAmount) : '—'}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 py-1.5 sm:py-0 sm:justify-center">
                    <span className="sm:hidden text-[10px] text-muted-foreground uppercase tracking-wider w-16 flex-shrink-0">Status</span>
                    <Badge variant={STATUS_BADGE[v.status] || 'default'} className="text-[10px] gap-1">
                      <StatusIcon className="w-2.5 h-2.5" />
                      {v.status}
                    </Badge>
                  </div>

                  {/* Actions — always visible, never overflow */}
                  <div className="flex items-center gap-1 pt-2.5 pb-0.5 border-t border-border/50 sm:border-none sm:pt-0 sm:pb-0 sm:justify-end flex-shrink-0">
                    <Button
                      variant="ghost" size="icon" className="h-7 w-7"
                      title="View details"
                      onClick={() => setDetailViolation(v)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost" size="icon" className="h-7 w-7"
                      title="Edit"
                      onClick={() => openEdit(v)}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    {isActionable && (
                      <Button
                        variant="ghost" size="icon"
                        className="h-7 w-7 text-green-500 hover:text-green-400 hover:bg-green-500/10"
                        title="Quick resolve"
                        onClick={() => quickResolve(v.id)}
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Button
                      variant="ghost" size="icon"
                      className="h-7 w-7 text-destructive hover:bg-destructive/10"
                      title="Delete"
                      onClick={() => setDeleteId(v.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    {isActionable && (
                      <Button
                        asChild size="sm"
                        className="h-7 px-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium gap-1"
                        title="Pay fine"
                      >
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

        {/* Pagination */}
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

      {/* Detail Dialog */}
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

      {/* Edit Dialog */}
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

      {/* Delete Dialog */}
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