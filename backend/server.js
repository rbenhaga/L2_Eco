import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './db/database.js';

import checkoutRouter from './routes/checkout.js';
import webhookRouter from './routes/webhook.js';
import subscriptionRouter from './routes/subscription.js';
import userRouter from './routes/user.js';
import aiRouter from './routes/ai.js';
import ttsRouter from './routes/tts.js';
import adminRouter from './routes/admin.js';
import progressRouter from './routes/progress.js';
import oikoNewsRouter from './routes/oikoNews.ts';
import { startOikoScheduler } from './oiko/scheduler.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const API_RATE_LIMIT_MAX = Number(
  process.env.API_RATE_LIMIT_MAX
  || (process.env.NODE_ENV === 'development' ? 600 : 200)
);
const CHECKOUT_STATUS_RATE_LIMIT_MAX = Number(
  process.env.CHECKOUT_STATUS_RATE_LIMIT_MAX
  || (process.env.NODE_ENV === 'development' ? 60 : 20)
);

app.use(helmet({
  crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
  // Oiko assets are intentionally consumed from the frontend on a different origin.
  crossOriginResourcePolicy: false,
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number.isFinite(API_RATE_LIMIT_MAX) && API_RATE_LIMIT_MAX > 0 ? API_RATE_LIMIT_MAX : 200,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => (
    req.originalUrl === '/api/webhook'
    || req.originalUrl.startsWith('/api/checkout-session-status/')
  ),
});
app.use('/api/', limiter);

const checkoutStatusLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: Number.isFinite(CHECKOUT_STATUS_RATE_LIMIT_MAX) && CHECKOUT_STATUS_RATE_LIMIT_MAX > 0
    ? CHECKOUT_STATUS_RATE_LIMIT_MAX
    : 20,
  message: 'Too many checkout confirmation attempts, please try again shortly.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/checkout-session-status', checkoutStatusLimiter);

app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

initializeDatabase();

if (process.env.OIKO_CRON_ENABLED === 'true') {
  startOikoScheduler();
}

app.use('/static/oiko-news', express.static(path.join(__dirname, 'public', 'oiko-news'), {
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  },
}));

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

app.use('/api', checkoutRouter);
app.use('/api', webhookRouter);
app.use('/api', subscriptionRouter);
app.use('/api', userRouter);
app.use('/api', aiRouter);
app.use('/api', ttsRouter);
app.use('/api', adminRouter);
app.use('/api', progressRouter);
app.use('/api', oikoNewsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`RevP2 Backend API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend: ${process.env.FRONTEND_URL || 'not set'}`);
  console.log('Available endpoints: /health, /api/*');
});

export default app;

