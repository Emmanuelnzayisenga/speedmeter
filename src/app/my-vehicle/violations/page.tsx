"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { formatDate, formatCurrency, cn } from '@/lib/utils'
import {
  AlertTriangle, MapPin, Gauge, ChevronLeft, ChevronRight, RefreshCw, Wallet, CheckCircle, Clock, FileText, XCircle,
} from 'lucide-react'

const STATUS_BADGE: Record<string, BadgeVariant> = {
  PENDING: 'warning', CONFIRMED: 'destructive', DISPUTED: 'radar', RESOLVED: 'success', CANCELLED: 'default',
}
const STATUS_ICONS: Record<string, any> = {
  PENDING: Clock, CONFIRMED: AlertTriangle, DISPUTED: FileText, RESOLVED: CheckCircle, CANCELLED: XCircle,
}

export default function MyViolationsPage() {
  const [violations, setViolations] = useState<any[]>([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })
  const [loading, setLoading] = useState(true)

  const fetchViolations = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/my-vehicle/violations?page=${page}`)
      const data = await res.json()
      setViolations(data.violations || [])
      setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchViolations(1) }, [fetchViolations])

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-5 animate-fade-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-wider">MY VIOLATIONS</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{pagination.total} recorded on your vehicle</p>
          </div>
          <Button variant="outline" size="icon" onClick={() => fetchViolations(pagination.page)}>
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden panel-glow divide-y divide-border">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4"><div className="h-4 rounded shimmer" /></div>
            ))
          ) : violations.length === 0 ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground py-12">
              <AlertTriangle className="w-10 h-10 opacity-20" />
              <p className="text-sm">No violations on record</p>
            </div>
          ) : violations.map(v => {
            const StatusIcon = STATUS_ICONS[v.status] || Clock
            const isPayable = v.status === 'PENDING' || v.status === 'CONFIRMED'
            return (
              <div key={v.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={STATUS_BADGE[v.status] || 'default'} className="text-[10px] gap-1">
                      <StatusIcon className="w-2.5 h-2.5" /> {v.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(v.timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm truncate">{v.zone?.name || 'Unknown zone'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Gauge className="w-3 h-3 text-sw-danger flex-shrink-0" />
                    <span className="text-xs font-mono font-bold text-sw-danger">{Math.round(v.speed)} km/h</span>
                    <span className="text-xs text-muted-foreground">(+{Math.round(v.excessSpeed)} over {v.speedLimit} limit)</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={cn("text-sm font-mono font-bold", v.fineAmount > 0 ? "text-sw-warn" : "text-muted-foreground")}>
                    {v.fineAmount > 0 ? formatCurrency(v.fineAmount) : '—'}
                  </span>
                  {isPayable && v.fineAmount > 0 && (
                    <Button asChild size="sm" className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white">
                      <Link href={`/payments/${v.id}`}>
                        <Wallet className="w-3.5 h-3.5" /> Pay
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages} — {pagination.total} total
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={pagination.page <= 1}
                onClick={() => fetchViolations(pagination.page - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchViolations(pagination.page + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
