import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm'
};

// In-memory master state
let masterState = {
  jobs: [],
  users: [],
  reviews: [],
  notifications: [],
  lastUpdated: new Date().toISOString()
};

const clients = new Set();

function broadcast(payload, excludeWs) {
  const jsonStr = JSON.stringify(payload);
  clients.forEach(client => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      try {
        client.send(jsonStr);
      } catch (err) {
        console.warn('Error broadcasting:', err);
      }
    }
  });
}

function broadcastDeviceCount() {
  broadcast({
    type: 'CONNECTED_DEVICES_UPDATE',
    timestamp: new Date().toISOString(),
    data: { count: clients.size }
  });
}

function handleSyncEvent(payload, senderWs) {
  switch (payload.type) {
    case 'INITIAL_SYNC_REQUEST':
      if (senderWs && senderWs.readyState === WebSocket.OPEN) {
        senderWs.send(JSON.stringify({
          type: 'INITIAL_SYNC_RESPONSE',
          timestamp: new Date().toISOString(),
          data: masterState
        }));
      }
      break;
    case 'JOB_CREATED': {
      const job = payload.data;
      if (job && job.id) {
        masterState.jobs = [job, ...masterState.jobs.filter(j => j.id !== job.id)];
        masterState.lastUpdated = new Date().toISOString();
        broadcast(payload, senderWs);
      }
      break;
    }
    case 'JOB_CLAIMED': {
      const { jobId, seekerId, seekerName, seekerPhone } = payload.data || {};
      const job = masterState.jobs.find(j => j.id === jobId);
      if (job) {
        job.status = 'CLAIMED';
        job.claimed_by = seekerId;
        if (seekerName) job.claimed_by_name = seekerName;
        if (seekerPhone) job.claimed_by_phone = seekerPhone;
        masterState.lastUpdated = new Date().toISOString();
      }
      broadcast(payload, senderWs);
      break;
    }
    case 'JOB_STATUS_UPDATED': {
      const { jobId, status } = payload.data || {};
      const job = masterState.jobs.find(j => j.id === jobId);
      if (job) {
        job.status = status;
        masterState.lastUpdated = new Date().toISOString();
      }
      broadcast(payload, senderWs);
      break;
    }
    case 'JOB_DELETED': {
      const { jobId } = payload.data || {};
      masterState.jobs = masterState.jobs.filter(j => j.id !== jobId);
      masterState.lastUpdated = new Date().toISOString();
      broadcast(payload, senderWs);
      break;
    }
    case 'USER_UPSERTED': {
      const user = payload.data;
      if (user && user.id) {
        const idx = masterState.users.findIndex(u => u.id === user.id);
        if (idx >= 0) masterState.users[idx] = user;
        else masterState.users.unshift(user);
        masterState.lastUpdated = new Date().toISOString();
        broadcast(payload, senderWs);
      }
      break;
    }
    case 'NOTIFICATION_ADDED': {
      const notif = payload.data;
      if (notif && notif.id) {
        masterState.notifications.unshift(notif);
        masterState.lastUpdated = new Date().toISOString();
        broadcast(payload, senderWs);
      }
      break;
    }
    case 'REVIEW_ADDED': {
      const review = payload.data;
      if (review && review.id) {
        masterState.reviews.unshift(review);
        masterState.lastUpdated = new Date().toISOString();
        broadcast(payload, senderWs);
      }
      break;
    }
    case 'PING':
      if (senderWs && senderWs.readyState === WebSocket.OPEN) {
        senderWs.send(JSON.stringify({ type: 'PONG', timestamp: new Date().toISOString() }));
      }
      break;
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Sync API endpoints
  if (pathname === '/api/sync/state' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({
      success: true,
      connectedDevices: clients.size,
      state: masterState
    }));
    return;
  }

  if (pathname === '/api/sync/event' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        handleSyncEvent(payload);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Static File Serving
  let filePath = path.join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (req, socket, head) => {
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  if (pathname === '/ws-sync') {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  }
});

wss.on('connection', (ws) => {
  clients.add(ws);
  broadcastDeviceCount();

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message.toString());
      handleSyncEvent(parsed, ws);
    } catch (err) {
      console.warn('WebSocket message error:', err);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    broadcastDeviceCount();
  });

  ws.on('error', () => {
    clients.delete(ws);
    broadcastDeviceCount();
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Skill2Work Production Server live on http://0.0.0.0:${PORT}`);
});
