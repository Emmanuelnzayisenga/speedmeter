"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Activity, Map, Car, AlertTriangle, BarChart2,
  ChevronLeft, ChevronRight, Gauge, Shield, Menu, X, LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SessionProvider } from 'next-auth/react'

const navItems = [
  { href: '/dashboard', label: 'Live Monitor', icon: Activity, badge: 'LIVE' },
  { href: '/map', label: 'Zone Manager', icon: Map },
  { href: '/vehicles', label: 'Vehicles', icon: Car },
  { href: '/violations', label: 'Violations', icon: AlertTriangle },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/logout', label: 'Logout', icon: LogOut },
]

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeLabel =
    navItems.find(n => n.href === pathname || (n.href !== '/' && pathname.startsWith(n.href)))?.label
    ?? 'Live Monitor'

  return (
    <SessionProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <aside
          className={cn(
            "fixed left-0 top-0 z-50 h-full flex flex-col border-r border-border bg-sw-nav transition-all duration-300 ease-in-out",
            collapsed ? "w-20" : "w-60",
            mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <div className={cn(
            "flex items-center gap-3 p-4 border-b border-border/50",
            collapsed ? "justify-center px-2" : "pr-2"
          )}>
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
              <Gauge className="w-4 h-4 text-primary" />
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <h1 className="text-base font-display font-bold text-foreground tracking-wider glow-text">
                  SPEEDWATCH
                </h1>
                <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
                  Fleet Monitor
                </p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex w-7 h-7 flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-primary/10 border border-border/50 rounded-md"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </Button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                  <div className={cn(
                    "relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-r-full" />
                    )}
                    <item.icon className={cn(
                      "flex-shrink-0 transition-transform group-hover:scale-110",
                      collapsed ? "w-5 h-5" : "w-4 h-4"
                    )} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 font-display tracking-wide">{item.label}</span>
                        {item.badge && (
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sw-safe/20 text-sw-safe border border-sw-safe/30 animate-pulse">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className={cn(
          "flex-1 flex flex-col min-h-0 transition-all duration-300",
          collapsed ? "md:ml-16" : "md:ml-56"
        )}>
          <header className="h-12 flex items-center gap-3 px-4 border-b border-border/50 bg-sw-nav/50 backdrop-blur-sm flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-8 h-8"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>

            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="text-muted-foreground font-mono text-xs">SpeedWatch</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium text-xs">{activeLabel}</span>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-sw-safe/10 border border-sw-safe/20">
              <div className="w-1.5 h-1.5 rounded-full bg-sw-safe animate-ping-slow" />
              <span className="text-[10px] font-mono font-bold text-sw-safe tracking-widest">LIVE</span>
            </div>
          </header>

          <main className="flex-1 overflow-auto mx-2">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  )
}