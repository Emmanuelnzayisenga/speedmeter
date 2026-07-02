import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { destinationPoint, isPointInZone } from "@/lib/geo";

const STEP_METERS = 100;
const MAX_DISTANCE_METERS = 2000;

// Straight-line projection along the vehicle's last known heading — not
// routed navigation, since speed zones are shapes/polylines, not a road graph.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vehicleId = searchParams.get("vehicleId");

  if (!vehicleId) {
    return NextResponse.json({ success: false, message: "Missing required query param: vehicleId" }, { status: 400 });
  }

  try {
    const location = await prisma.vehicleLocation.findFirst({
      where: { vehicleId },
      orderBy: { timestamp: "desc" },
    });

    if (!location) {
      return NextResponse.json({ success: false, message: "No location data for this vehicle" }, { status: 404 });
    }

    if (location.heading === null || location.heading === undefined) {
      return NextResponse.json({ success: true, zone: null, message: "No heading data available" });
    }

    const zones = await prisma.speedZone.findMany({ where: { active: true } });

    for (let distance = STEP_METERS; distance <= MAX_DISTANCE_METERS; distance += STEP_METERS) {
      const projected = destinationPoint(location.latitude, location.longitude, location.heading, distance);

      for (const zone of zones) {
        if (isPointInZone(projected.lat, projected.lng, zone.zoneType, zone.coordinates)) {
          const etaSeconds = location.speed > 0 ? distance / (location.speed / 3.6) : null;
          return NextResponse.json({
            success: true,
            distanceMeters: distance,
            etaSeconds,
            zone: { id: zone.id, name: zone.name, speedLimit: zone.speedLimit },
            projectedPoint: projected,
          });
        }
      }
    }

    return NextResponse.json({ success: true, zone: null, message: "No speed zone ahead within 2km" });
  } catch (error) {
    console.error("[speed-limit/ahead] error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
