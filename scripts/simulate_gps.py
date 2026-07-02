#!/usr/bin/env python3
"""
Simulates a moving "phone location" by POSTing frames to /api/p, the
endpoint the ESP8266 firmware itself polls every 2s (fetchPhoneLocation)
for an override location/speed. Per the firmware's resolveActiveLocation(),
phone data takes priority over the device's own GPS whenever it's fresh
(< 15s old) - so this lets you drive a vehicle around and have the real
physical device pick up the simulated speed, display it, and relay it
onward through its own WebSocket connection exactly like a real phone
companion app would.

Note: this is a different pipeline from /api/gps/ingest (which writes
directly to VehicleLocation and bypasses the device entirely). Use
--url .../api/gps/ingest instead if you want to feed the dashboard
directly without a physical device in the loop.

Usage:
    pip install requests
    python scripts/simulate_gps.py --device DEVICE_1

Commands (typed while running):
    speed <km/h>       set current speed, e.g.  speed 45
    heading <deg>       set direction, 0=N 90=E 180=S 270=W, e.g. heading 90
    start                begin sending frames
    stop                 stop sending frames (speed stays remembered)
    pos                   print current lat/lng
    goto <lat> <lng>     jump to a specific starting point
    interval <sec>       change send interval (default 1.5s)
    help                  show this list
    quit / exit           stop and exit
"""

import argparse
import math
import sys
import threading
import time
from datetime import datetime, timezone

import requests

EARTH_KM_PER_DEG_LAT = 111.32


class Simulator:
    def __init__(self, url: str, device_id: str, lat: float, lng: float, interval: float):
        self.url = url
        self.device_id = device_id
        self.lock = threading.Lock()
        self.lat = lat
        self.lng = lng
        self.speed_kmh = 0.0
        self.heading_deg = 0.0
        self.interval = max(0.2, interval)
        self.running = False
        self.stopped = False

    def step(self):
        with self.lock:
            speed = self.speed_kmh
            heading = self.heading_deg
            interval = self.interval

            if speed > 0:
                distance_km = speed * (interval / 3600.0)
                heading_rad = math.radians(heading)
                dlat = distance_km * math.cos(heading_rad) / EARTH_KM_PER_DEG_LAT
                lng_scale = EARTH_KM_PER_DEG_LAT * math.cos(math.radians(self.lat)) or 0.0001
                dlng = distance_km * math.sin(heading_rad) / lng_scale
                self.lat += dlat
                self.lng += dlng

            payload = {
                "deviceId": self.device_id,
                "latitude": round(self.lat, 7),
                "longitude": round(self.lng, 7),
                "speed": round(speed, 2),
                "heading": heading,
                "altitude": 1500.0,
                "satellites": 8,
                "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            }

        try:
            res = requests.post(self.url, json=payload, timeout=8)
            status = res.status_code
            body = res.text[:200]
        except requests.RequestException as e:
            status = "ERR"
            body = str(e)

        print(f"[{payload['timestamp']}] speed={payload['speed']:>5.1f} km/h  "
              f"lat={payload['latitude']:.6f} lng={payload['longitude']:.6f}  -> {status} {body}")

    def loop(self):
        while not self.stopped:
            if self.running:
                try:
                    self.step()
                except Exception as e:
                    print(f"[sender thread] unexpected error, will retry next tick: {e}")
            time.sleep(self.interval)

    def handle_command(self, line: str):
        parts = line.strip().split()
        if not parts:
            return
        cmd, *args = parts

        try:
            if cmd in ("quit", "exit"):
                self.stopped = True
                print("Stopping simulator.")
            elif cmd == "start":
                self.running = True
                print("Started sending frames.")
            elif cmd == "stop":
                self.running = False
                print("Stopped sending frames (state preserved).")
            elif cmd == "speed":
                if not args:
                    print("Usage: speed <km/h>")
                    return
                value = float(args[0])
                with self.lock:
                    self.speed_kmh = max(0.0, value)
                print(f"Speed set to {self.speed_kmh} km/h")
            elif cmd == "heading":
                if not args:
                    print("Usage: heading <degrees>")
                    return
                value = float(args[0])
                with self.lock:
                    self.heading_deg = value % 360
                print(f"Heading set to {self.heading_deg}°")
            elif cmd == "interval":
                if not args:
                    print("Usage: interval <seconds>")
                    return
                value = float(args[0])
                with self.lock:
                    self.interval = max(0.2, value)
                print(f"Interval set to {self.interval}s")
            elif cmd == "goto":
                if len(args) != 2:
                    print("Usage: goto <lat> <lng>")
                    return
                lat, lng = float(args[0]), float(args[1])
                if not (-90 <= lat <= 90) or not (-180 <= lng <= 180):
                    print(f"Out of range: lat must be -90..90, lng must be -180..180 (got {lat}, {lng})")
                    return
                with self.lock:
                    self.lat, self.lng = lat, lng
                print(f"Jumped to {self.lat}, {self.lng}")
            elif cmd == "pos":
                with self.lock:
                    print(f"lat={self.lat:.6f} lng={self.lng:.6f} speed={self.speed_kmh} heading={self.heading_deg}")
            elif cmd == "help":
                print(__doc__)
            else:
                print(f"Unknown command: {line!r} (type 'help')")
        except ValueError as e:
            print(f"Invalid number in {line!r}: {e}")


def main():
    parser = argparse.ArgumentParser(description="Simulate a moving phone location against /api/p, polled by the ESP8266 device")
    parser.add_argument("--url", default="https://speedmeter-rceq.onrender.com/api/p",
                         help="Full endpoint URL (default: /api/p, what the device polls)")
    parser.add_argument("--device", default="DEVICE_1", help="deviceId to simulate")
    parser.add_argument("--lat", type=float, default=-1.677235, help="Starting latitude (default: inside the 'mukoto' zone)")
    parser.add_argument("--lng", type=float, default=29.892139, help="Starting longitude (default: inside the 'mukoto' zone)")
    parser.add_argument("--interval", type=float, default=1.5, help="Seconds between frames")
    args = parser.parse_args()

    if not (-90 <= args.lat <= 90) or not (-180 <= args.lng <= 180):
        parser.error(f"--lat must be -90..90 and --lng must be -180..180 (got {args.lat}, {args.lng})")
    if not args.device.strip():
        parser.error("--device must not be empty")

    sim = Simulator(args.url, args.device, args.lat, args.lng, args.interval)

    print(f"Simulating device '{args.device}' -> {args.url}")
    print(f"Starting at {args.lat}, {args.lng}. Type 'help' for commands, 'start' to begin.\n")

    thread = threading.Thread(target=sim.loop, daemon=True)
    thread.start()

    while not sim.stopped:
        try:
            line = input("> ")
        except (EOFError, KeyboardInterrupt):
            sim.stopped = True
            print("\nInterrupted, stopping.")
            break

        try:
            sim.handle_command(line)
        except Exception as e:
            print(f"Command failed unexpectedly: {e}")

    thread.join(timeout=2)
    sys.exit(0)


if __name__ == "__main__":
    main()
