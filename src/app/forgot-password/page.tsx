"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthShell } from "@/components/auth/AuthShell"
import { Loader2, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setPending(true)
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong")
      setSent(true)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setPending(false)
    }
  }

  if (sent) {
    return (
      <AuthShell title="CHECK YOUR EMAIL" subtitle="Fleet Monitor">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-sw-safe/10 border border-sw-safe/30 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-sw-safe" />
          </div>
          <p className="text-sm text-muted-foreground">
            If an account exists for <span className="font-mono text-foreground">{email}</span>, a password
            reset link is on its way. The link expires in 1 hour.
          </p>
          <Link href="/login" className="text-xs text-primary hover:underline pt-2">
            Back to sign in
          </Link>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell title="RESET PASSWORD" subtitle="Fleet Monitor">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-muted-foreground -mt-2">
          Enter the email on your account and we'll send you a link to reset your password.
        </p>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-sw-danger">{error}</p>}

        <Button className="w-full gap-2" disabled={pending}>
          {pending && <Loader2 className="w-4 h-4 animate-spin" />}
          {pending ? "Sending…" : "Send Reset Link"}
        </Button>

        <p className="text-center text-xs text-muted-foreground pt-1">
          <Link href="/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
