"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { RefreshCw, Settings, Save } from 'lucide-react'

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<{ key: string; value: string; description: string | null }[]>([])
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchSettings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      setSettings(data.settings || [])
      const initial: Record<string, string> = {}
      for (const s of data.settings || []) initial[s.key] = s.value
      setValues(initial)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchSettings() }, [fetchSettings])

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = { settings: Object.entries(values).map(([key, value]) => ({ key, value })) }
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      toast({ title: 'Settings saved', variant: 'success' as any })
      fetchSettings()
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-5 animate-fade-up max-w-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-wider">SYSTEM SETTINGS</h1>
            <p className="text-sm text-muted-foreground mt-0.5">System-wide defaults</p>
          </div>
          <Button variant="outline" size="icon" onClick={fetchSettings}>
            <RefreshCw className={loading ? "w-4 h-4 animate-spin" : "w-4 h-4"} />
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 space-y-5 panel-glow">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-10 rounded shimmer" />
            ))
          ) : settings.length === 0 ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground py-8">
              <Settings className="w-10 h-10 opacity-20" />
              <p className="text-sm">No settings available</p>
            </div>
          ) : settings.map((s) => (
            <div key={s.key} className="space-y-1.5">
              <Label>{s.key.replace(/_/g, ' ')}</Label>
              <Input
                value={values[s.key] ?? ''}
                onChange={e => setValues(v => ({ ...v, [s.key]: e.target.value }))}
              />
              {s.description && (
                <p className="text-[11px] text-muted-foreground">{s.description}</p>
              )}
            </div>
          ))}

          <Button onClick={handleSave} disabled={saving || loading} className="gap-2">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Settings
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
