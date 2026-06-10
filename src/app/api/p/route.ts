// app/api/p/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const deviceId = searchParams.get("device");

  if (!deviceId) {
    return NextResponse.json(
      { success: false, message: "Missing device parameter" },
      { status: 400 }
    );
  }

  try {
    const vehicle = await prisma.vehicle.findFirst({
      where: { deviceId },
    });

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: `No vehicle found for device ${deviceId}` },
        { status: 404 }
      );
    }

    // Get the most recently inserted phone location for this vehicle
    const loc = await prisma.pLocation.findFirst({
      where: { vehicleId: vehicle.id },
      orderBy: { id: "desc" }, // newest first (no timestamp col, use cuid ordering)
    });

    if (!loc) {
      return NextResponse.json(
        { success: false, message: "No phone location available" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        latitude:  loc.latitude,
        longitude: loc.longitude,
        speed:     loc.speed,
      },
    });
  } catch (error) {
    console.error("[/api/p] DB error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST — let the phone push its location for a device
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { deviceId, latitude, longitude, speed } = body;

    if (!deviceId || latitude == null || longitude == null) {
      return NextResponse.json(
        { success: false, message: "deviceId, latitude and longitude are required" },
        { status: 400 }
      );
    }

    const vehicle = await prisma.vehicle.findFirst({
      where: { deviceId },
    });

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: `No vehicle found for device ${deviceId}` },
        { status: 404 }
      );
    }

    // Upsert: keep only one row per vehicle (overwrite previous phone location)
    await prisma.pLocation.deleteMany({ where: { vehicleId: vehicle.id } });
    await prisma.pLocation.create({
      data: {
        vehicleId: vehicle.id,
        latitude,
        longitude,
        speed: speed ?? 0,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/p] POST error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}