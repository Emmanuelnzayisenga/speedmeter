"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthShell } from "@/components/auth/AuthShell"
import { Loader2, CheckCircle2 } from "lucide-react"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!token) {
      setError("This reset link is missing its token. Please request a new one.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setPending(true)
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong")
      setDone(true)
      setTimeout(() => router.push("/login"), 2500)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setPending(false)
    }
  }

  if (done) {
    return (
      <AuthShell title="PASSWORD UPDATED" subtitle="Fleet Monitor">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-sw-safe/10 border border-sw-safe/30 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-sw-safe" />
          </div>
          <p className="text-sm text-muted-foreground">
            Your password has been reset. Redirecting you to sign in…
          </p>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell title="SET NEW PASSWORD" subtitle="Fleet Monitor">
      {!token ? (
        <div className="text-center space-y-3">
          <p className="text-sm text-sw-danger">This reset link is invalid or missing its token.</p>
          <Link href="/forgot-password" className="text-xs text-primary hover:underline">
            Request a new reset link
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-sw-danger">{error}</p>}

          <Button className="w-full gap-2" disabled={pending}>
            {pending && <Loader2 className="w-4 h-4 animate-spin" />}
            {pending ? "Updating…" : "Reset Password"}
          </Button>
        </form>
      )}
    </AuthShell>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  )
}
