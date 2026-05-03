# SpeedWatch 🚗⚡

**Real-time GPS Vehicle Speed Monitoring System**

A full-stack Next.js application for monitoring vehicle speeds, managing speed zones, tracking violations and fines — inspired by professional fleet management dashboards.

---

## ✨ Features

- **🗺️ Live Monitor** — Real-time vehicle positions on an interactive map, auto-refreshing every 5 seconds
- **📍 Zone Manager** — Draw circle or polygon speed zones directly on the map with custom speed limits
- **🚗 Fleet CRUD** — Add, edit, delete vehicles with GPS device assignment, driver info, color coding
- **⚠️ Violations CRUD** — Full violation management with status workflow, fine amounts, notes, pagination
- **📊 Analytics** — Charts for speed distribution, violation trends, top violators, fine brackets
- **📡 GPS Device API** — REST endpoint for physical GPS devices to push real-time location data
- **🔔 Auto violation detection** — Automatic speeding detection when GPS data enters a speed zone

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd speedwatch
npm install
```

### 2. Database Setup

```bash
# Copy env file
cp .env.example .env

# Edit .env with your PostgreSQL connection string
# DATABASE_URL="postgresql://user:pass@localhost:5432/speedwatch"

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 3. Run

```bash
npm run dev
# Open http://localhost:3000
```

---

## 📡 GPS Device API

### Send location data from a GPS device

```http
POST /api/gps/ingest
Content-Type: application/json

{
  "deviceId": "GPS-001",
  "latitude": -1.2921,
  "longitude": 36.8219,
  "speed": 75.5,
  "heading": 180,
  "altitude": 1700,
  "accuracy": 5,
  "satellites": 9,
  "timestamp": "2024-11-22T10:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "vehicleId": "clxxx...",
  "locationId": "clyyy...",
  "status": "SPEEDING",
  "violation": {
    "id": "clzzz...",
    "excessSpeed": 45,
    "fineAmount": 5000
  }
}
```

### Batch ingest (multiple vehicles at once)

```http
PUT /api/gps/ingest
Content-Type: application/json

{
  "readings": [
    { "deviceId": "GPS-001", "latitude": -1.29, "longitude": 36.82, "speed": 45 },
    { "deviceId": "GPS-002", "latitude": -1.28, "longitude": 36.83, "speed": 62 }
  ]
}
```

### Get live vehicle positions

```http
GET /api/gps/live
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Database | PostgreSQL |
| ORM | Prisma 5 |
| UI | shadcn/ui + Radix UI |
| Styling | Tailwind CSS |
| Maps | Leaflet + React-Leaflet |
| Charts | Recharts |
| Language | TypeScript |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Live Monitor dashboard
│   ├── map/page.tsx          # Zone Manager
│   ├── vehicles/page.tsx     # Fleet CRUD
│   ├── violations/page.tsx   # Violations & Fines CRUD
│   ├── analytics/page.tsx    # Charts & Analytics
│   └── api/
│       ├── vehicles/         # CRUD + [id]
│       ├── zones/            # CRUD + [id]
│       ├── violations/       # CRUD + [id]
│       ├── gps/
│       │   ├── ingest/       # GPS device POST endpoint
│       │   └── live/         # Real-time vehicle positions
│       └── dashboard/        # Aggregate stats
├── components/
│   ├── layout/AppLayout.tsx  # Sidebar navigation
│   ├── dashboard/            # Stats cards, vehicle list
│   ├── map/                  # LiveMap, ZoneEditorMap
│   └── ui/                   # shadcn components
├── lib/
│   ├── prisma.ts             # Prisma client singleton
│   └── utils.ts              # Helpers, formatters
└── hooks/
    └── use-toast.ts
prisma/
├── schema.prisma
└── seed.ts
```

---

## 🔌 REST API Reference

### Vehicles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vehicles` | List all (paginated, searchable) |
| POST | `/api/vehicles` | Create vehicle |
| GET | `/api/vehicles/:id` | Get by ID with history |
| PUT | `/api/vehicles/:id` | Update |
| DELETE | `/api/vehicles/:id` | Delete |

### Speed Zones
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/zones` | List all zones |
| POST | `/api/zones` | Create zone |
| GET | `/api/zones/:id` | Get by ID |
| PUT | `/api/zones/:id` | Update |
| DELETE | `/api/zones/:id` | Delete |

### Violations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/violations` | List all (paginated, filterable) |
| POST | `/api/violations` | Create manually |
| GET | `/api/violations/:id` | Get by ID |
| PUT | `/api/violations/:id` | Update status/fine |
| DELETE | `/api/violations/:id` | Delete |

### GPS
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/gps/ingest` | Ingest GPS reading from device |
| PUT | `/api/gps/ingest` | Batch ingest |
| GET | `/api/gps/live` | Get all live positions |

---

## 🎨 Theme

The app uses a custom dark theme with CSS variables. All colors are theme-aware via:
- `--sw-radar` — Cyan accent (brand primary)
- `--sw-safe` — Green (OK/active)
- `--sw-warn` — Amber (warning)
- `--sw-danger` — Red (violations/speeding)

Edit in `src/app/globals.css` → `:root` block.

---

## 📦 Deployment

```bash
# Build
npm run build

# Environment variables needed in production:
DATABASE_URL=postgresql://...
```

Recommended hosting: **Vercel** (frontend) + **Supabase/Neon/Railway** (PostgreSQL).
