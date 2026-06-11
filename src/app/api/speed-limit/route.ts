import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
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

function pointInPolygon(lat: number, lng: number, points: { lat: number; lng: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].lng, yi = points[i].lat;
    const xj = points[j].lng, yj = points[j].lat;
    const intersect = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function pointInCircle(lat: number, lng: number, centerLat: number, centerLng: number, radius: number): boolean {
  return haversineMeters(lat, lng, centerLat, centerLng) <= radius;
}

function distanceToSegmentMeters(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax, dy = by - ay;
  if (dx === 0 && dy === 0) return haversineMeters(px, py, ax, ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return haversineMeters(px, py, ax + t * dx, ay + t * dy);
}

function pointNearCorridor(lat: number, lng: number, points: { lat: number; lng: number }[], halfWidthMeters: number): boolean {
  for (let i = 0; i < points.length - 1; i++) {
    const dist = distanceToSegmentMeters(lat, lng, points[i].lat, points[i].lng, points[i + 1].lat, points[i + 1].lng);
    if (dist <= halfWidthMeters) return true;
  }
  return false;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");
  const deviceId = searchParams.get("device");

  if (!latStr || !lngStr) {
    return NextResponse.json({ success: false, message: "Missing required query params: lat, lng" }, { status: 400 });
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ success: false, message: "Invalid lat/lng values" }, { status: 400 });
  }

  try {
    const zones = await prisma.speedZone.findMany({
      where: { active: true },
      orderBy: { speedLimit: "asc" },
    });

    let matchedLimit: number | null = null;
    let matchedZoneName: string | null = null;

    for (const zone of zones) {
      const raw = zone.coordinates as any;
      let inside = false;

      if (zone.zoneType === "CIRCLE") {
        // shape: { lat, lng, radius }
        if (typeof raw?.lat === "number" && typeof raw?.lng === "number" && typeof raw?.radius === "number") {
          inside = pointInCircle(lat, lng, raw.lat, raw.lng, raw.radius);
        }

      } else if (zone.zoneType === "POLYGON") {
        // shape: [{ lat, lng }, ...]
        if (Array.isArray(raw) && raw.length >= 3) {
          inside = pointInPolygon(lat, lng, raw as { lat: number; lng: number }[]);
        }

      } else if (zone.zoneType === "CORRIDOR" || zone.zoneType === "ROAD") {
        // shape: [{ lat, lng }, ...] or { waypoints: [{lat,lng}], width: number }
        const width: number = raw?.width ?? 50;
        let points: { lat: number; lng: number }[] | null = null;
        if (Array.isArray(raw?.waypoints)) {
          points = raw.waypoints;
        } else if (Array.isArray(raw)) {
          points = raw;
        }
        if (points && points.length >= 2) {
          inside = pointNearCorridor(lat, lng, points, width / 2);
        }
      }

      if (inside) {
        matchedLimit = zone.speedLimit;
        matchedZoneName = zone.name;
        break;
      }
    }

    if (matchedLimit !== null) {
      return NextResponse.json({ success: true, limit: matchedLimit, zone: matchedZoneName });
    }

    return NextResponse.json({ success: true, limit: 60, zone: null, default: true });

  } catch (error) {
    console.error("[speed-limit] DB error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}