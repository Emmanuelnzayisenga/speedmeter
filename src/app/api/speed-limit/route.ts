import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();


function pointInPolygon(
  lat: number,
  lng: number,
  coordinates: [number, number][]
): boolean {
  let inside = false;
  const x = lng,
    y = lat;
  for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
    const xi = coordinates[i][0],
      yi = coordinates[i][1];
    const xj = coordinates[j][0],
      yj = coordinates[j][1];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function pointInCircle(
  lat: number,
  lng: number,
  center: { lat: number; lng: number },
  radiusMeters: number
): boolean {
  return haversineMeters(lat, lng, center.lat, center.lng) <= radiusMeters;
}

function pointNearCorridor(
  lat: number,
  lng: number,
  points: [number, number][],
  halfWidthMeters: number
): boolean {
  for (let i = 0; i < points.length - 1; i++) {
    const [lng1, lat1] = points[i];
    const [lng2, lat2] = points[i + 1];
    const dist = distanceToSegmentMeters(lat, lng, lat1, lng1, lat2, lng2);
    if (dist <= halfWidthMeters) return true;
  }
  return false;
}

function distanceToSegmentMeters(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
): number {
  const dx = bx - ax,
    dy = by - ay;
  if (dx === 0 && dy === 0) return haversineMeters(px, py, ax, ay);
  const t = Math.max(
    0,
    Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy))
  );
  return haversineMeters(px, py, ax + t * dx, ay + t * dy);
}


type PolygonCoords = { type: "polygon"; points: [number, number][] };
type CircleCoords  = { type: "circle"; center: { lat: number; lng: number }; radius: number };
type LineCoords    = { type: "line"; points: [number, number][]; width?: number };

function parseCoordinates(
  raw: unknown
): PolygonCoords | CircleCoords | LineCoords | null {
  if (!raw || typeof raw !== "object") return null;
  const c = raw as Record<string, unknown>;

  if (c.type === "circle" && c.center && typeof c.radius === "number") {
    return { type: "circle", center: c.center as { lat: number; lng: number }, radius: c.radius };
  }
  if ((c.type === "line" || c.type === "corridor") && Array.isArray(c.points)) {
    return { type: "line", points: c.points as [number, number][], width: (c.width as number) ?? 50 };
  }
  if (Array.isArray(c.points)) {
    return { type: "polygon", points: c.points as [number, number][] };
  }
  if (Array.isArray(raw)) {
    return { type: "polygon", points: raw as [number, number][] };
  }
  return null;
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const latStr    = searchParams.get("lat");
  const lngStr    = searchParams.get("lng");
  const deviceId  = searchParams.get("device");

  if (!latStr || !lngStr) {
    return NextResponse.json(
      { success: false, message: "Missing required query params: lat, lng" },
      { status: 400 }
    );
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json(
      { success: false, message: "Invalid lat/lng values" },
      { status: 400 }
    );
  }

  try {
    const zones = await prisma.speedZone.findMany({
      where: { active: true },
      orderBy: { speedLimit: "asc" },
    });

    let matchedLimit: number | null = null;
    let matchedZoneName: string | null = null;

    for (const zone of zones) {
      const coords = parseCoordinates(zone.coordinates);
      if (!coords) continue;

      let inside = false;

      if (coords.type === "polygon") {
        inside = pointInPolygon(lat, lng, coords.points);
      } else if (coords.type === "circle") {
        inside = pointInCircle(lat, lng, coords.center, coords.radius);
      } else if (coords.type === "line") {
        inside = pointNearCorridor(lat, lng, coords.points, coords.width ?? 50);
      }

      if (inside) {
        matchedLimit = zone.speedLimit;
        matchedZoneName = zone.name;
        break; // already ordered ASC — lowest limit wins
      }
    }

    if (matchedLimit !== null) {
        console.log(`[speed-limit] No zone match for device ${deviceId} at (${lat}, ${lng})`);
      return NextResponse.json({
        success: true,
        limit: String(matchedLimit),
        zone: matchedZoneName,
      });
    }

    console.log(`[speed-limit] No zone match for device ${deviceId} at (${lat}, ${lng})`);

    return NextResponse.json({
      success: true,
      limit: "60",
      zone: null,
      default: true,
    });

  } catch (error) {
    console.error("[speed-limit] DB error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}