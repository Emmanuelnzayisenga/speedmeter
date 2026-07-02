"use client"

import React from 'react'
import { Gauge } from 'lucide-react'

interface AuthShellProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden px-4">
      {/* Ambient radar sweep behind the logo - the one deliberate use of this motif in the app */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[300px] w-[440px] h-[440px] rounded-full radar-sweep pointer-events-none opacity-70" />

      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Gauge className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-wider text-foreground glow-text">SPEEDWATCH</h1>
          <p className="text-[11px] text-muted-foreground tracking-widest uppercase">{subtitle}</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 panel-glow">
          <h2 className="text-sm font-display font-semibold tracking-wider text-center text-muted-foreground mb-6">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  )
}
