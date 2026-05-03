"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: { value: number; label: string }
  variant?: 'default' | 'danger' | 'success' | 'warning' | 'radar'
  className?: string
  animate?: boolean
}

const variantStyles = {
  default: {
    icon: 'text-primary bg-primary/10 border-primary/20',
    accent: 'from-primary/5 to-transparent',
    value: 'text-foreground',
  },
  danger: {
    icon: 'text-sw-danger bg-sw-danger/10 border-sw-danger/20',
    accent: 'from-sw-danger/5 to-transparent',
    value: 'text-sw-danger',
  },
  success: {
    icon: 'text-sw-safe bg-sw-safe/10 border-sw-safe/20',
    accent: 'from-sw-safe/5 to-transparent',
    value: 'text-sw-safe',
  },
  warning: {
    icon: 'text-sw-warn bg-sw-warn/10 border-sw-warn/20',
    accent: 'from-sw-warn/5 to-transparent',
    value: 'text-sw-warn',
  },
  radar: {
    icon: 'text-sw-radar bg-sw-radar/10 border-sw-radar/20',
    accent: 'from-sw-radar/5 to-transparent',
    value: 'text-sw-radar',
  },
}

export function StatsCard({
  title, value, subtitle, icon: Icon, trend, variant = 'default', className, animate = true
}: StatsCardProps) {
  const styles = variantStyles[variant]

  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg border border-border bg-card p-4 panel-glow",
      animate && "animate-fade-up",
      className
    )}>
      {/* Background gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", styles.accent)} />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
            {title}
          </p>
          <p className={cn("text-2xl font-display font-bold tabular-nums", styles.value)}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-xs font-medium",
              trend.value > 0 ? "text-sw-danger" : trend.value < 0 ? "text-sw-safe" : "text-muted-foreground"
            )}>
              <span>{trend.value > 0 ? '↑' : trend.value < 0 ? '↓' : '→'}</span>
              <span>{Math.abs(trend.value)}% {trend.label}</span>
            </div>
          )}
        </div>

        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center",
          styles.icon
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
