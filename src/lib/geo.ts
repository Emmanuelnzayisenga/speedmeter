const EARTH_RADIUS_METERS = 6371000

export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  return EARTH_RADIUS_METERS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function pointInPolygon(
  lat: number, lng: number,
  polygon: { lat: number; lng: number }[]
): boolean {
  let inside = false
  const n = polygon.length
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i].lng, yi = polygon[i].lat
    const xj = polygon[j].lng, yj = polygon[j].lat
    const intersects =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    if (intersects) inside = !inside
  }
  return inside
}

export function pointInCircle(
  lat: number, lng: number,
  centerLat: number, centerLng: number,
  radiusMeters: number
): boolean {
  return haversineDistance(lat, lng, centerLat, centerLng) <= radiusMeters
}

export function distanceToSegment(
  lat: number, lng: number,
  aLat: number, aLng: number,
  bLat: number, bLng: number
): number {
  const dx = bLng - aLng
  const dy = bLat - aLat
  const lenSq = dx * dx + dy * dy
  if (lenSq === 0) return haversineDistance(lat, lng, aLat, aLng)
  let t = ((lng - aLng) * dx + (lat - aLat) * dy) / lenSq
  t = Math.max(0, Math.min(1, t))
  return haversineDistance(lat, lng, aLat + t * dy, aLng + t * dx)
}

export function pointInCorridor(
  lat: number, lng: number,
  waypoints: { lat: number; lng: number }[],
  halfWidthMeters: number
): boolean {
  if (waypoints.length < 2) return false
  for (let i = 0; i < waypoints.length - 1; i++) {
    if (
      distanceToSegment(
        lat, lng,
        waypoints[i].lat, waypoints[i].lng,
        waypoints[i + 1].lat, waypoints[i + 1].lng
      ) <= halfWidthMeters
    ) return true
  }
  return false
}

/** Dispatches to the right containment check based on zone shape. */
export function isPointInZone(
  lat: number, lng: number,
  zoneType: string,
  coordinates: unknown
): boolean {
  try {
    switch (zoneType) {
      case 'CIRCLE': {
        const c = coordinates as { lat: number; lng: number; radius: number }
        if (!c?.lat || !c?.lng || !c?.radius) return false
        return pointInCircle(lat, lng, c.lat, c.lng, c.radius)
      }
      case 'POLYGON': {
        const poly = coordinates as { lat: number; lng: number }[]
        if (!Array.isArray(poly) || poly.length < 3) return false
        return pointInPolygon(lat, lng, poly)
      }
      case 'CORRIDOR':
      case 'ROAD': {
        const raw = coordinates as any
        if (raw?.waypoints && Array.isArray(raw.waypoints))
          return pointInCorridor(lat, lng, raw.waypoints, (raw.width ?? 50) / 2)
        if (Array.isArray(raw) && raw.length >= 2)
          return pointInCorridor(lat, lng, raw, 25)
        return false
      }
      default:
        return false
    }
  } catch {
    return false
  }
}

/** Initial bearing in degrees [0, 360) from point A to point B. */
export function bearing(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δλ = ((lng2 - lng1) * Math.PI) / 180
  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  const θ = Math.atan2(y, x)
  return ((θ * 180) / Math.PI + 360) % 360
}

/** Projects a point forward along a bearing (degrees) by a distance (meters). */
export function destinationPoint(
  lat: number, lng: number,
  bearingDeg: number, distanceMeters: number
): { lat: number; lng: number } {
  const δ = distanceMeters / EARTH_RADIUS_METERS
  const θ = (bearingDeg * Math.PI) / 180
  const φ1 = (lat * Math.PI) / 180
  const λ1 = (lng * Math.PI) / 180

  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ)
  )
  const λ2 =
    λ1 +
    Math.atan2(
      Math.sin(θ) * Math.sin(δ) * Math.cos(φ1),
      Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)
    )

  return {
    lat: (φ2 * 180) / Math.PI,
    lng: (λ2 * 180) / Math.PI,
  }
}
