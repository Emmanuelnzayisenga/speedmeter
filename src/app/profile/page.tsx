"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { formatDate } from '@/lib/utils'
import { User, Lock, Save, RefreshCw, Mail, Shield } from 'lucide-react'

const ROLE_BADGE: Record<string, BadgeVariant> = {
  ADMIN: 'destructive', DRIVER: 'success',
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const [form, setForm] = useState({ username: '', phoneNumber: '' })
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })

  const fetchProfile = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/profile')
      const data = await res.json()
      setProfile(data)
      setForm({ username: data.username || '', phoneNumber: data.phoneNumber || '' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProfile() }, [fetchProfile])

  const handleSaveProfile = async () => {
    setSavingProfile(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, phoneNumber: form.phoneNumber }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      toast({ title: 'Profile updated', variant: 'success' as any })
      fetchProfile()
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' })
    } finally {
      setSavingProfile(false)
    }
  }

  const handleChangePassword = async () => {
    if (!passwordForm.newPassword || passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({ title: 'Validation Error', description: 'New passwords do not match', variant: 'destructive' })
      return
    }
    setSavingPassword(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      toast({ title: 'Password changed', variant: 'success' as any })
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' })
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-5 animate-fade-up max-w-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-wider">MY PROFILE</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage your account details</p>
          </div>
          <Button variant="outline" size="icon" onClick={fetchProfile}>
            <RefreshCw className={loading ? "w-4 h-4 animate-spin" : "w-4 h-4"} />
          </Button>
        </div>

        {profile && (
          <div className="bg-card border border-border rounded-lg p-3 panel-glow flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile.username || profile.email}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Mail className="w-3 h-3" /> <span className="truncate">{profile.email}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <Badge variant={ROLE_BADGE[profile.role] || 'default'} className="text-[10px]">{profile.role}</Badge>
              <p className="text-[10px] text-muted-foreground mt-1">Since {formatDate(profile.createdAt)}</p>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-border bg-card p-5 space-y-4 panel-glow">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-display font-semibold tracking-wider">ACCOUNT DETAILS</h2>
          </div>
          <div className="space-y-1.5">
            <Label>Username</Label>
            <Input value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="username" />
          </div>
          <div className="space-y-1.5">
            <Label>Phone Number</Label>
            <Input value={form.phoneNumber} onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))} placeholder="+250700000000" />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input value={profile?.email || ''} disabled className="opacity-60" />
            <p className="text-[11px] text-muted-foreground">Email is your login ID and can't be changed here.</p>
          </div>
          <Button onClick={handleSaveProfile} disabled={savingProfile} className="gap-2">
            {savingProfile ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 space-y-4 panel-glow">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-display font-semibold tracking-wider">CHANGE PASSWORD</h2>
          </div>
          <div className="space-y-1.5">
            <Label>Current Password</Label>
            <Input type="password" value={passwordForm.currentPassword}
              onChange={e => setPasswordForm(f => ({ ...f, currentPassword: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <Label>New Password</Label>
            <Input type="password" value={passwordForm.newPassword}
              onChange={e => setPasswordForm(f => ({ ...f, newPassword: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <Label>Confirm New Password</Label>
            <Input type="password" value={passwordForm.confirmPassword}
              onChange={e => setPasswordForm(f => ({ ...f, confirmPassword: e.target.value }))} />
          </div>
          <Button onClick={handleChangePassword} disabled={savingPassword} variant="outline" className="gap-2">
            {savingPassword ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
            Update Password
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
