// prisma/seed.ts
import { PrismaClient, VehicleType, VehicleStatus, ViolationStatus, ZoneType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create vehicles
  const vehicles = await Promise.all([
    prisma.vehicle.upsert({
      where: { plateNumber: 'KAA 001A' },
      update: {},
      create: {
        name: 'Fleet Truck Alpha',
        plateNumber: 'KAA 001A',
        type: VehicleType.TRUCK,
        status: VehicleStatus.MOVING,
        driverName: 'John Kamau',
        driverPhone: '+254712345678',
        deviceId: 'GPS-001',
        color: '#3B82F6',
      },
    }),
    prisma.vehicle.upsert({
      where: { plateNumber: 'KBB 002B' },
      update: {},
      create: {
        name: 'Delivery Van Beta',
        plateNumber: 'KBB 002B',
        type: VehicleType.VAN,
        status: VehicleStatus.ACTIVE,
        driverName: 'Mary Wanjiku',
        driverPhone: '+254723456789',
        deviceId: 'GPS-002',
        color: '#10B981',
      },
    }),
    prisma.vehicle.upsert({
      where: { plateNumber: 'KCC 003C' },
      update: {},
      create: {
        name: 'Company Car Gamma',
        plateNumber: 'KCC 003C',
        type: VehicleType.CAR,
        status: VehicleStatus.SPEEDING,
        driverName: 'Peter Odhiambo',
        driverPhone: '+254734567890',
        deviceId: 'GPS-003',
        color: '#F59E0B',
      },
    }),
    prisma.vehicle.upsert({
      where: { plateNumber: 'KDD 004D' },
      update: {},
      create: {
        name: 'Security Bus Delta',
        plateNumber: 'KDD 004D',
        type: VehicleType.BUS,
        status: VehicleStatus.INACTIVE,
        driverName: 'Grace Akinyi',
        driverPhone: '+254745678901',
        deviceId: 'GPS-004',
        color: '#8B5CF6',
      },
    }),
  ])

  console.log(`✅ Created ${vehicles.length} vehicles`)

  // Create speed zones
  const zones = await Promise.all([
    prisma.speedZone.upsert({
      where: { id: 'zone-nairobi-cbd' },
      update: {},
      create: {
        id: 'zone-nairobi-cbd',
        name: 'Nairobi CBD',
        description: 'Central Business District - Low speed zone',
        speedLimit: 30,
        zoneType: ZoneType.CIRCLE,
        coordinates: { lat: -1.2921, lng: 36.8219, radius: 2000 },
        color: '#EF4444',
        active: true,
      },
    }),
    prisma.speedZone.upsert({
      where: { id: 'zone-thika-highway' },
      update: {},
      create: {
        id: 'zone-thika-highway',
        name: 'Thika Highway',
        description: 'Highway speed zone',
        speedLimit: 100,
        zoneType: ZoneType.CORRIDOR,
        coordinates: [
          { lat: -1.2000, lng: 36.8500 },
          { lat: -1.0000, lng: 37.0000 },
        ],
        color: '#F59E0B',
        active: true,
      },
    }),
    prisma.speedZone.upsert({
      where: { id: 'zone-school-westlands' },
      update: {},
      create: {
        id: 'zone-school-westlands',
        name: 'Westlands School Zone',
        description: 'School zone - reduced speed',
        speedLimit: 20,
        zoneType: ZoneType.CIRCLE,
        coordinates: { lat: -1.2630, lng: 36.8040, radius: 500 },
        color: '#EF4444',
        active: true,
      },
    }),
  ])

  console.log(`✅ Created ${zones.length} speed zones`)

  // Create sample locations
  const baseLocations = [
    { lat: -1.2921, lng: 36.8219 },
    { lat: -1.2850, lng: 36.8300 },
    { lat: -1.2780, lng: 36.8380 },
  ]

  for (let i = 0; i < vehicles.length; i++) {
    const base = baseLocations[i % baseLocations.length]
    const locationData = Array.from({ length: 20 }, (_, j) => ({
      vehicleId: vehicles[i].id,
      latitude: base.lat + (Math.random() - 0.5) * 0.05,
      longitude: base.lng + (Math.random() - 0.5) * 0.05,
      speed: Math.random() * 120,
      heading: Math.random() * 360,
      satellites: Math.floor(Math.random() * 10) + 5,
      timestamp: new Date(Date.now() - j * 60000),
    }))

    await prisma.vehicleLocation.createMany({ data: locationData })
  }

  console.log('✅ Created sample locations')

  // Create sample violations
  const violations = await prisma.violation.createMany({
    data: [
      {
        vehicleId: vehicles[0].id,
        zoneId: zones[0].id,
        latitude: -1.2921,
        longitude: 36.8219,
        speed: 75,
        speedLimit: 30,
        excessSpeed: 45,
        fineAmount: 5000,
        status: ViolationStatus.CONFIRMED,
      },
      {
        vehicleId: vehicles[2].id,
        zoneId: zones[2].id,
        latitude: -1.2630,
        longitude: 36.8040,
        speed: 55,
        speedLimit: 20,
        excessSpeed: 35,
        fineAmount: 8000,
        status: ViolationStatus.PENDING,
      },
      {
        vehicleId: vehicles[1].id,
        zoneId: zones[1].id,
        latitude: -1.1000,
        longitude: 36.9500,
        speed: 140,
        speedLimit: 100,
        excessSpeed: 40,
        fineAmount: 3000,
        status: ViolationStatus.RESOLVED,
        resolvedAt: new Date(),
      },
    ],
  })

  console.log(`✅ Created ${violations.count} violations`)
  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
