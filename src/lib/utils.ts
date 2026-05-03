import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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

export function haversineDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371000
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function pointInCircle(
  lat: number, lng: number,
  centerLat: number, centerLng: number,
  radiusMeters: number
): boolean {
  return haversineDistance(lat, lng, centerLat, centerLng) <= radiusMeters
}

export const VEHICLE_TYPE_ICONS: Record<string, string> = {
  CAR: '🚗',
  TRUCK: '🚛',
  MOTORCYCLE: '🏍️',
  BUS: '🚌',
  VAN: '🚐',
  OTHER: '🚙',
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
