import { useEffect, useState, useRef, useCallback } from 'react'

interface DashboardStats {
  totalVehicles: number
  activeVehicles: number
  speedingNow: number
  todayViolations: number
  weekViolations: number
  violationTrend: number
  totalFines: number
  pendingFines: number
  activeZones: number
}

interface DashboardData {
  stats: DashboardStats
  recentViolations: any[]
  speedingVehicles: any[]
}

interface LiveData {
  vehicles: any[]
  timestamp: string
}

// ── Config ────────────────────────────────────────────────────────────────────
const WS_URL          = process.env.NEXT_PUBLIC_WS_URL!   // e.g. ws://192.168.1.100:3001/ws/dashboard
const POLL_INTERVAL   = 10_000
const RECONNECT_DELAY = 5_000

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useDashboardStats() {
  const [data, setData]           = useState<DashboardData | null>(null)
  const [liveData, setLiveData]   = useState<LiveData | null>(null)
  const [zones, setZones]         = useState<any[]>([])
  const [connected, setConnected] = useState(false)
  const [error, setError]         = useState<string | null>(null)

  const wsRef        = useRef<WebSocket | null>(null)
  const pollRef      = useRef<NodeJS.Timeout | null>(null)
  const reconnectRef = useRef<NodeJS.Timeout | null>(null)
  const unmountedRef = useRef(false)

  // ── HTTP fetch (dashboard + live + zones) ───────────────────────────────────
  const fetchHttp = useCallback(async () => {
    try {
      const [dashRes, liveRes, zonesRes] = await Promise.all([
        fetch('/api/dashboard'),
        fetch('/api/gps/live'),
        fetch('/api/zones?active=true'),
      ])

      if (dashRes.ok  && !unmountedRef.current) setData(await dashRes.json())
      if (liveRes.ok  && !unmountedRef.current) setLiveData(await liveRes.json())
      if (zonesRes.ok && !unmountedRef.current) {
        const z = await zonesRes.json()
        setZones(z.zones || [])
      }
      if (!unmountedRef.current) setError(null)
    } catch (err: any) {
      if (!unmountedRef.current) setError(err.message)
    }
  }, [])

  // ── Polling ─────────────────────────────────────────────────────────────────
  const stopPolling = useCallback(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
  }, [])

  const startPolling = useCallback(() => {
    if (pollRef.current) return
    console.warn('⚠️ WS unavailable — falling back to HTTP polling every 10s')
    fetchHttp()
    pollRef.current = setInterval(fetchHttp, POLL_INTERVAL)
  }, [fetchHttp])

  // ── WebSocket ───────────────────────────────────────────────────────────────
  const connectWS = useCallback(() => {
    if (unmountedRef.current) return
    if (!WS_URL) {
      startPolling() // no WS endpoint configured - go straight to HTTP polling
      return
    }

    console.log(`🔌 Connecting to WS: ${WS_URL}`)
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onopen = () => {
      if (unmountedRef.current) { ws.close(); return }
      console.log(`📊 Dashboard WS connected → ${WS_URL}`)
      setConnected(true)
      setError(null)
      stopPolling()
      fetchHttp()                         // immediate data on connect
    }

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        if (unmountedRef.current) return

        switch (msg.type) {
          case 'dashboard_update':
            const { type: _t, liveData: ld, zones: z, ...rest } = msg
            setData(rest as DashboardData)
            if (ld)  setLiveData(ld)
            if (z)   setZones(z)
            break

          // GPS server can also push just live vehicles
          case 'gps':
            setLiveData(prev => {
              if (!prev) return prev
              const updated = prev.vehicles.map((v: any) =>
                v.deviceId === msg.deviceId
                  ? { ...v, locations: [{ latitude: msg.latitude, longitude: msg.longitude, speed: msg.speed, heading: msg.heading, satellites: msg.satellites, timestamp: msg.timestamp }] }
                  : v
              )
              return { ...prev, vehicles: updated, timestamp: msg.timestamp }
            })
            break
        }
      } catch {
        console.error('❌ Failed to parse WS message')
      }
    }

    ws.onerror = () => {
      console.error(`❌ WS error on ${WS_URL}`)
      setConnected(false)
      ws.close() // force onclose to fire deterministically so the polling fallback + reconnect timer kick in
    }

    ws.onclose = (event) => {
      if (unmountedRef.current) return
      console.warn(`🔌 WS closed (code: ${event.code}) — retrying in ${RECONNECT_DELAY / 1000}s`)
      setConnected(false)
      wsRef.current = null
      startPolling()
      reconnectRef.current = setTimeout(() => {
        if (!unmountedRef.current) connectWS()
      }, RECONNECT_DELAY)
    }
  }, [fetchHttp, startPolling, stopPolling])

  // ── Lifecycle ───────────────────────────────────────────────────────────────
  useEffect(() => {
    unmountedRef.current = false
    fetchHttp()
    connectWS()

    return () => {
      unmountedRef.current = true
      wsRef.current?.close()
      wsRef.current = null
      stopPolling()
      if (reconnectRef.current) clearTimeout(reconnectRef.current)
    }
  }, [])

  return { data, liveData, zones, connected, error, refetch: fetchHttp }
}