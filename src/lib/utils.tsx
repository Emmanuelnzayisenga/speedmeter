import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Truck, Car,Bike, Bus  } from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSpeed(speed: number): string {
  return `${Math.round(speed)} km/h`
}

export function formatCurrency(amount: number, currency = 'RWF'): string {
  return new Intl.NumberFormat('en-Rw', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getSpeedColor(speed: number, limit: number): string {
  const ratio = speed / limit
  if (ratio < 0.8) return 'hsl(var(--sw-safe))'
  if (ratio < 1.0) return 'hsl(var(--sw-warn))'
}

export function calculateFine(excessSpeed: number): number {
  if (excessSpeed <= 10) return 2000
  if (excessSpeed <= 20) return 5000
  if (excessSpeed <= 30) return 10000
  if (excessSpeed <= 50) return 20000
  return 50000
}

export { haversineDistance, pointInCircle } from './geo'

export const VEHICLE_TYPE_ICONS: Record<string, any> = {
  CAR: <Car/>,
  TRUCK: <Truck/>,
  MOTORCYCLE: <Bike/>,
  BUS: <Bus/>,
  VAN: <Car/>,
  OTHER: <Car/>,
}

export const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'hsl(var(--sw-safe))',
  MOVING: 'hsl(var(--sw-radar))',
  SPEEDING: 'hsl(var(--sw-danger))',
  INACTIVE: 'hsl(var(--muted-foreground))',
  OFFLINE: 'hsl(var(--muted-foreground))',
}

export const VIOLATION_STATUS_COLORS: Record<string, string> = {
  PENDING: 'hsl(var(--sw-warn))',
  CONFIRMED: 'hsl(var(--sw-danger))',
  DISPUTED: 'hsl(var(--primary))',
  RESOLVED: 'hsl(var(--sw-safe))',
  CANCELLED: 'hsl(var(--muted-foreground))',
}
