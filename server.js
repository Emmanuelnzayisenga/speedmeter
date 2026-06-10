import { WebSocketServer, WebSocket } from "ws";
import axios from "axios";
import { createServer } from "http";

const PORT           = process.env.PORT || 10000;
const SPEED_LIMIT    = 60;
const SERVER_ADDRESS = "https://speedmeter-rceq.onrender.com";

function ts() {
  return new Date().toISOString();
}

function log(tag, msg, extra = "") {
  console.log(`[${ts()}] ${tag} ${msg}${extra ? " | " + extra : ""}`);
}

function logSection(title) {
  console.log(`\n${"─".repeat(50)}`);
  console.log(`  ${title}`);
  console.log(`${"─".repeat(50)}`);
}

async function safePost(label, url, body) {
  try {
    log("📤 HTTP", `POST ${label}`, `url=${url}`);
    const res = await axios.post(url, body, { timeout: 5000 });
    log("✅ HTTP", `POST ${label} OK`, `status=${res.status}`);
    return res;
  } catch (err) {
    if (err.response) {
      log("❌ HTTP", `POST ${label} FAILED`, `status=${err.response.status} body=${JSON.stringify(err.response.data)}`);
    } else if (err.code === "ECONNREFUSED") {
      log("❌ HTTP", `POST ${label} FAILED`, `ECONNREFUSED — is the REST server running at ${SERVER_ADDRESS}?`);
    } else {
      log("❌ HTTP", `POST ${label} FAILED`, `err=${err.message}`);
    }
    return null;
  }
}

const httpServer = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("GPS WebSocket Server is running\n");
});

const wss = new WebSocketServer({ server: httpServer, path: "/ws/gps" });

httpServer.listen(PORT, () => {
  log("🚀 WS", `GPS WebSocket Server listening`, `port=${PORT} path=/ws/gps`);
});

wss.on("connection", (ws, req) => {
  const clientIp = req.socket.remoteAddress;

  logSection(`NEW CONNECTION`);
  log("🔌 WS", "Client connected", `ip=${clientIp}`);

  let deviceId    = null;
  let msgCount    = 0;
  let gpsCount    = 0;
  let violCount   = 0;
  let connectedAt = Date.now();

  ws.on("message", async (rawMessage) => {
    msgCount++;

    const raw = rawMessage instanceof Buffer
      ? rawMessage.toString("utf8")
      : String(rawMessage);

    log("📨 WS", `Message #${msgCount} received`, `bytes=${rawMessage.length}`);
    console.log(`         Raw: ${raw}`);

    let data;
    try {
      data = JSON.parse(raw);
    } catch (parseErr) {
      log("❌ PARSE", "JSON parse failed", `err=${parseErr.message}`);
      console.error("         Raw that failed:", raw);
      return;
    }

    log("✅ PARSE", `type=${data.type}`, `deviceId=${data.deviceId ?? "?"}`);

    switch (data.type) {

      case "register": {
        deviceId = data.deviceId;
        logSection(`DEVICE REGISTERED`);
        log("📱 REG", `Device registered`, `deviceId=${deviceId} ip=${clientIp}`);

        const ack = JSON.stringify({ type: "ack", status: "registered" });
        ws.send(ack);
        log("📤 WS", "Sent ack", ack);

        const limitMsg = JSON.stringify({ type: "speedLimit", value: SPEED_LIMIT });
        ws.send(limitMsg);
        log("📤 WS", "Sent speedLimit", limitMsg);
        break;
      }

      case "gps": {
        gpsCount++;
        logSection(`GPS FRAME #${gpsCount}`);
        log("📍 GPS", `Device: ${data.deviceId}`);
        log("📍 GPS", `Position`,    `lat=${data.latitude} lng=${data.longitude}`);
        log("📍 GPS", `Motion`,      `speed=${data.speed} km/h heading=${data.heading}°`);
        log("📍 GPS", `Environment`, `alt=${data.altitude}m sats=${data.satellites}`);
        log("📍 GPS", `Timestamp`,   `${data.timestamp ?? "none"}`);

        const required = ["deviceId", "latitude", "longitude", "speed"];
        const missing  = required.filter((k) => data[k] == null);
        if (missing.length) {
          log("⚠️  GPS", "Missing required fields", `fields=${missing.join(", ")}`);
        }

        await safePost("gps/ingest", `${SERVER_ADDRESS}/api/gps/ingest`, {
          deviceId:   data.deviceId,
          latitude:   data.latitude,
          longitude:  data.longitude,
          speed:      data.speed,
          altitude:   data.altitude,
          heading:    data.heading,
          accuracy:   data.accuracy,
          satellites: data.satellites,
          timestamp:  data.timestamp,
        });

        await safePost("submit", `${SERVER_ADDRESS}/api/submit`, {
          deviceId:   data.deviceId,
          latitude:   data.latitude,
          longitude:  data.longitude,
          speed:      data.speed,
          altitude:   data.altitude,
          heading:    data.heading,
          accuracy:   data.accuracy,
          satellites: data.satellites,
          timestamp:  data.timestamp,
        });

        let broadcastCount = 0;
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type:       "gps",
              deviceId:   data.deviceId,
              latitude:   data.latitude,
              longitude:  data.longitude,
              speed:      data.speed,
              altitude:   data.altitude,
              heading:    data.heading,
              accuracy:   data.accuracy,
              satellites: data.satellites,
              timestamp:  data.timestamp,
            }));
            broadcastCount++;
          }
        });

        if (broadcastCount > 0) {
          log("📡 BCAST", `Broadcast GPS to ${broadcastCount} other client(s)`);
        }
        break;
      }

      case "violation": {
        violCount++;
        const excess = Number(data.speed) - Number(data.speedLimit);
        const fine   = 50000;

        logSection(`🚨 SPEED VIOLATION #${violCount}`);
        log("🚨 VIOL", `Device: ${data.deviceId}`);
        log("🚨 VIOL", `Speed`,  `actual=${data.speed} km/h limit=${data.speedLimit} km/h excess=${excess.toFixed(1)} km/h`);
        log("🚨 VIOL", `Fine`,   `RWF ${fine}`);
        log("🚨 VIOL", `Pos`,    `lat=${data.latitude} lng=${data.longitude}`);

        const violAck = JSON.stringify({
          type:        "violation",
          excessSpeed: excess,
          fineAmount:  fine,
        });
        ws.send(violAck);
        log("📤 WS", "Sent violation ack", violAck);
        break;
      }

      default: {
        log("⚠️  WS", `Unknown message type: "${data.type}"`);
        console.log("         Full payload:", JSON.stringify(data, null, 2));
        break;
      }
    }
  });

  ws.on("close", (code, reason) => {
    const uptime = ((Date.now() - connectedAt) / 1000).toFixed(1);
    logSection("CLIENT DISCONNECTED");
    log("🔌 WS", `Client disconnected`, `device=${deviceId ?? "unregistered"} ip=${clientIp} code=${code} uptime=${uptime}s`);
    log("📊 STATS", `Session totals`, `msgs=${msgCount} gps=${gpsCount} violations=${violCount}`);
  });

  ws.on("error", (err) => {
    log("❌ WS", `Socket error`, `device=${deviceId ?? "?"} err=${err.message}`);
    console.error(err);
  });
});

wss.on("error", (err) => {
  log("❌ SERVER", "WebSocket server error", `err=${err.message}`);
  console.error(err);
});

wss.on("close", () => {
  log("🛑 SERVER", "WebSocket server closed");
});

setInterval(() => {
  const connected = [...wss.clients].filter((c) => c.readyState === WebSocket.OPEN).length;
  log("📊 SERVER", "Status", `connectedClients=${connected}`);
}, 30_000);