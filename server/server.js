/**
 * Hangman Web Application - Backend REST API Server
 * Built with Express.js, Node.js, and MongoDB / Mongoose
 * Includes native Node.js fallback so the server can run even before npm install completes!
 */

try {
  require('dotenv').config();
} catch (e) {}

const http = require('http');
const url = require('url');

let express, cors;
try {
  express = require('express');
  cors = require('cors');
} catch (e) {
  express = null;
  cors = null;
}

const PORT = process.env.PORT || 5000;
const gameService = require('./services/gameService');
const { connectDB, getDBStatus } = require('./config/db');

if (express) {
  // ==========================================
  // FULL EXPRESS & MONGOOSE REST API SERVER
  // ==========================================
  const errorHandler = require('./middleware/errorHandler');
  const { apiLimiter } = require('./middleware/rateLimiter');

  const gameRoutes = require('./routes/gameRoutes');
  const leaderboardRoutes = require('./routes/leaderboardRoutes');
  const statsRoutes = require('./routes/statsRoutes');

  const app = express();

  // Connect Database
  connectDB();

  // CORS Middleware
  app.use(
    cors({
      origin: '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logger
  app.use((req, res, next) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
  });

  // Apply Rate Limiting
  app.use('/api/', apiLimiter);

  // Health Endpoint
  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'online',
      mode: 'Express.js & MongoDB',
      timestamp: new Date(),
      uptimeSeconds: Math.floor(process.uptime()),
      database: getDBStatus()
    });
  });

  // Mount API Endpoints
  app.use('/api/game', gameRoutes);
  app.use('/api/leaderboard', leaderboardRoutes);
  app.use('/api/stats', statsRoutes);

  // Welcome Route
  app.get('/', (req, res) => {
    res.json({
      project: 'Hangman Game MERN Stack REST API',
      status: 'Running (Express Mode)',
      version: '1.0.0'
    });
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`\n===============================================`);
    console.log(` Hangman API Server (Express) running on port ${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(` Base URL: http://localhost:${PORT}`);
    console.log(` Health Check: http://localhost:${PORT}/api/health`);
    console.log(`===============================================\n`);
  });

  module.exports = app;
} else {
  // ==========================================
  // NATIVE NODE.JS HTTP REST API FALLBACK
  // Runs seamlessly without external dependencies
  // ==========================================
  console.log('[Mode]: Running Native Node.js HTTP Server (Dependencies optional)');

  // Helper to parse JSON body
  const parseJsonBody = (req) =>
    new Promise((resolve) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          resolve({});
        }
      });
    });

  const sendJson = (res, statusCode, data) => {
    res.writeHead(statusCode, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
  };

  const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      return res.end();
    }

    try {
      // GET / or /api/health
      if (pathname === '/' || pathname === '/api/health') {
        return sendJson(res, 200, {
          status: 'online',
          mode: 'Native Node.js Server',
          timestamp: new Date(),
          database: getDBStatus()
        });
      }

      // POST /api/game/start
      if (pathname === '/api/game/start' && method === 'POST') {
        const body = await parseJsonBody(req);
        if (!body.username || !body.username.trim()) {
          return sendJson(res, 400, { success: false, message: 'Username is required.' });
        }
        const game = await gameService.startNewGame(body);
        return sendJson(res, 201, { success: true, data: game });
      }

      // POST /api/game/guess
      if (pathname === '/api/game/guess' && method === 'POST') {
        const body = await parseJsonBody(req);
        if (!body.gameId || !body.letter) {
          return sendJson(res, 400, { success: false, message: 'Game ID and letter guess are required.' });
        }
        const updated = await gameService.processGuess(body.gameId, body.letter);
        return sendJson(res, 200, { success: true, data: updated });
      }

      // GET /api/game/:id
      if (pathname.startsWith('/api/game/') && method === 'GET') {
        const id = pathname.replace('/api/game/', '');
        const game = await gameService.getGameById(id);
        return sendJson(res, 200, { success: true, data: game });
      }

      // POST /api/game/restart/:id
      if (pathname.startsWith('/api/game/restart/') && method === 'POST') {
        const id = pathname.replace('/api/game/restart/', '');
        const newGame = await gameService.restartGameById(id);
        return sendJson(res, 201, { success: true, data: newGame });
      }

      // GET /api/leaderboard
      if (pathname === '/api/leaderboard' && method === 'GET') {
        const limit = parseInt(parsedUrl.query.limit, 10) || 25;
        const list = await gameService.getLeaderboardList(limit);
        return sendJson(res, 200, { success: true, count: list.length, data: list });
      }

      // GET /api/stats/summary/global
      if (pathname === '/api/stats/summary/global' && method === 'GET') {
        const summary = await gameService.getGlobalStatistics();
        return sendJson(res, 200, { success: true, data: summary });
      }

      // GET /api/stats/:playerId
      if (pathname.startsWith('/api/stats/') && method === 'GET') {
        const playerId = decodeURIComponent(pathname.replace('/api/stats/', ''));
        const stats = await gameService.getPlayerStatsByUsername(playerId);
        return sendJson(res, 200, { success: true, data: stats });
      }

      // 404
      return sendJson(res, 404, { success: false, message: `Route not found: ${method} ${pathname}` });
    } catch (err) {
      console.error('[Server Error]:', err);
      return sendJson(res, err.status || 500, {
        success: false,
        message: err.message || 'Internal Server Error'
      });
    }
  });

  server.listen(PORT, () => {
    console.log(`\n===============================================`);
    console.log(` Hangman Server running on port ${PORT}`);
    console.log(` Base URL: http://localhost:${PORT}`);
    console.log(` Health Check: http://localhost:${PORT}/api/health`);
    console.log(`===============================================\n`);
  });

  module.exports = server;
}
