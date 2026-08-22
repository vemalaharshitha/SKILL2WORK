import { WebSocketServer, WebSocket } from 'ws';
import type { IncomingMessage, ServerResponse } from 'http';
import type { ViteDevServer, PreviewServer } from 'vite';

export interface SyncPayload {
  type: 
    | 'INITIAL_SYNC_REQUEST'
    | 'INITIAL_SYNC_RESPONSE'
    | 'JOB_CREATED'
    | 'JOB_CLAIMED'
    | 'JOB_STATUS_UPDATED'
    | 'JOB_DELETED'
    | 'USER_UPSERTED'
    | 'NOTIFICATION_ADDED'
    | 'REVIEW_ADDED'
    | 'CONNECTED_DEVICES_UPDATE'
    | 'PING'
    | 'PONG';
  senderId?: string;
  senderDevice?: string;
  timestamp: string;
  data?: any;
}

// In-memory master sync storage for Vite server session
let masterState = {
  jobs: [] as any[],
  users: [] as any[],
  reviews: [] as any[],
  notifications: [] as any[],
  lastUpdated: new Date().toISOString()
};

const clients = new Set<WebSocket>();

function broadcast(payload: SyncPayload, excludeWs?: WebSocket) {
  const jsonStr = JSON.stringify(payload);
  clients.forEach(client => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      try {
        client.send(jsonStr);
      } catch (err) {
        console.warn('Error broadcasting to client:', err);
      }
    }
  });
}

function broadcastDeviceCount() {
  const payload: SyncPayload = {
    type: 'CONNECTED_DEVICES_UPDATE',
    timestamp: new Date().toISOString(),
    data: {
      count: clients.size
    }
  };
  broadcast(payload);
}

export function handleSyncEvent(payload: SyncPayload, senderWs?: WebSocket) {
  switch (payload.type) {
    case 'INITIAL_SYNC_REQUEST': {
      if (senderWs && senderWs.readyState === WebSocket.OPEN) {
        const response: SyncPayload = {
          type: 'INITIAL_SYNC_RESPONSE',
          timestamp: new Date().toISOString(),
          data: masterState
        };
        senderWs.send(JSON.stringify(response));
      }
      break;
    }

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
        if (idx >= 0) {
          masterState.users[idx] = user;
        } else {
          masterState.users.unshift(user);
        }
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

    case 'PING': {
      if (senderWs && senderWs.readyState === WebSocket.OPEN) {
        senderWs.send(JSON.stringify({ type: 'PONG', timestamp: new Date().toISOString() }));
      }
      break;
    }

    default:
      break;
  }
}

export function setupSyncServer(server: ViteDevServer | PreviewServer) {
  const httpServer = server.httpServer;
  if (!httpServer) return;

  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (req, socket, head) => {
    const pathname = new URL(req.url || '', `http://${req.headers.host}`).pathname;
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
        const parsed: SyncPayload = JSON.parse(message.toString());
        handleSyncEvent(parsed, ws);
      } catch (err) {
        console.warn('Sync server JSON parse error:', err);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
      broadcastDeviceCount();
    });

    ws.on('error', (err) => {
      console.warn('Sync server client error:', err);
      clients.delete(ws);
      broadcastDeviceCount();
    });
  });

  // Attach HTTP middleware for REST sync endpoints
  server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const url = req.url || '';
    if (url.startsWith('/api/sync/state') && req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(JSON.stringify({
        success: true,
        connectedDevices: clients.size,
        state: masterState
      }));
      return;
    }

    if (url.startsWith('/api/sync/event') && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          const payload: SyncPayload = JSON.parse(body);
          handleSyncEvent(payload);
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({ success: true }));
        } catch (e: any) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }

    next();
  });
}
