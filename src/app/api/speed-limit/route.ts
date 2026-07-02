import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPointInZone } from "@/lib/geo";

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
      const inside = isPointInZone(lat, lng, zone.zoneType, zone.coordinates);

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