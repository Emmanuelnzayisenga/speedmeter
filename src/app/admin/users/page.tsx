"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'
import { formatDate, cn } from '@/lib/utils'
import {
  Plus, Search, Edit, Trash2, Users, ChevronLeft, ChevronRight,
  RefreshCw, ShieldCheck, Filter
} from 'lucide-react'

const ROLES = ['ADMIN', 'OPERATOR', 'VIEWER', 'DRIVER']
const ROLE_BADGE: Record<string, BadgeVariant> = {
  ADMIN: 'destructive', OPERATOR: 'radar', VIEWER: 'default', DRIVER: 'success',
}

const emptyForm = {
  username: '', email: '', password: '', phoneNumber: '', role: 'VIEWER',
}

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<any[]>([])
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15' })
      if (search) params.set('search', search)
      if (roleFilter) params.set('role', roleFilter)
      const res = await fetch(`/api/admin/users?${params}`)
      const data = await res.json()
      setUsers(data.users || [])
      setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 })
    } finally {
      setLoading(false)
    }
  }, [search, roleFilter])

  useEffect(() => { fetchUsers(1) }, [fetchUsers])

  const openCreate = () => { setEditingUser(null); setForm(emptyForm); setDialogOpen(true) }
  const openEdit = (u: any) => {
    setEditingUser(u)
    setForm({ username: u.username || '', email: u.email, password: '', phoneNumber: u.phoneNumber, role: u.role })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingUser && (!form.email || !form.password || !form.phoneNumber)) {
      toast({ title: 'Validation Error', description: 'Email, password and phone number are required', variant: 'destructive' })
      return
    }
    setSaving(true)
    try {
      if (editingUser) {
        const res = await fetch(`/api/admin/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: form.role, isActive: editingUser.isActive }),
        })
        if (!res.ok) throw new Error((await res.json()).error)
        toast({ title: 'User updated', variant: 'success' as any })
      } else {
        const res = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error((await res.json()).error)
        toast({ title: 'User created', variant: 'success' as any })
      }
      setDialogOpen(false)
      fetchUsers(pagination.page)
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (u: any) => {
    try {
      const res = await fetch(`/api/admin/users/${u.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: u.role, isActive: !u.isActive }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      toast({ title: u.isActive ? 'User deactivated' : 'User activated' })
      fetchUsers(pagination.page)
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' })
    }
  }

  const handleDelete = async () => {
    if (!deletingId) return
    try {
      const res = await fetch(`/api/admin/users/${deletingId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error)
      toast({ title: 'User deleted' })
      setDeleteDialogOpen(false)
      setDeletingId(null)
      fetchUsers(pagination.page)
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' })
    }
  }

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-5 animate-fade-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-wider">USER MANAGEMENT</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{pagination.total} users registered</p>
          </div>
          <Button onClick={openCreate} className="gap-2">
            <Plus className="w-4 h-4" /> Add User
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by username or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-card"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            <Filter className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            {['', ...ROLES].map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-md border text-xs font-medium tracking-wide transition-all whitespace-nowrap",
                  roleFilter === r
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground"
                )}
              >
                {r === '' ? 'All' : r}
              </button>
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={() => fetchUsers(pagination.page)} className="flex-shrink-0">
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden panel-glow">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs tracking-wider">USER</TableHead>
                <TableHead className="text-xs tracking-wider">PHONE</TableHead>
                <TableHead className="text-xs tracking-wider">ROLE</TableHead>
                <TableHead className="text-xs tracking-wider">STATUS</TableHead>
                <TableHead className="text-xs tracking-wider">LAST LOGIN</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}><div className="h-4 rounded shimmer" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Users className="w-10 h-10 opacity-20" />
                      <p className="text-sm">No users found</p>
                      <Button variant="outline" size="sm" onClick={openCreate}>Add first user</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : users.map(u => (
                <TableRow key={u.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-md flex items-center justify-center text-sm flex-shrink-0 bg-primary/10 border border-primary/20">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{u.username || u.email}</p>
                        <p className="text-[11px] text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs">{u.phoneNumber}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={ROLE_BADGE[u.role] || 'default'} className="text-[10px]">{u.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => toggleActive(u)}>
                      <Badge variant={u.isActive ? 'success' : 'default'} className="text-[10px] cursor-pointer">
                        {u.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {u.lastLogin ? formatDate(u.lastLogin) : 'Never'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(u)}>
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-sw-danger hover:text-sw-danger"
                        onClick={() => { setDeletingId(u.id); setDeleteDialogOpen(true) }}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Showing {((pagination.page - 1) * 15) + 1}–{Math.min(pagination.page * 15, pagination.total)} of {pagination.total}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={pagination.page <= 1}
                onClick={() => fetchUsers(pagination.page - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-mono">{pagination.page} / {pagination.totalPages}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchUsers(pagination.page + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Update role for this user' : 'Create a new user account'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            {!editingUser && (
              <>
                <div className="space-y-1.5">
                  <Label>Username</Label>
                  <Input placeholder="jkamau" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Email *</Label>
                  <Input type="email" placeholder="user@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Password *</Label>
                  <Input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number *</Label>
                  <Input placeholder="+250700000000" value={form.phoneNumber} onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))} />
                </div>
              </>
            )}
            <div className="space-y-1.5">
              <Label>Role</Label>
              <div className="flex gap-2">
                {ROLES.map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, role: r }))}
                    className={cn(
                      "flex-shrink-0 px-3 py-2 rounded-md border text-xs font-medium tracking-wide transition-all",
                      form.role === r
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-transparent text-muted-foreground hover:border-primary hover:text-foreground"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
              {editingUser ? 'Save Changes' : 'Add User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete User?</DialogTitle>
            <DialogDescription>This will permanently delete the user account. This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
