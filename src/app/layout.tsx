import type { Metadata } from 'next'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import { Toaster } from '@/components/ui/toaster'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SessionProvider } from 'next-auth/react';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'SpeedWatch — Vehicle Monitoring System',
  description: 'Real-time GPS vehicle speed monitoring, zone management, and violation tracking',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(  "font-sans", geist.variable)}>
      <body className="min-h-screen bg-background antialiased">
          {children}
        <Toaster />
        
      </body>
    </html>
  )
}