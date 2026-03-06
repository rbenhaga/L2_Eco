// Load environment variables FIRST (before any other imports)
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { initializeDatabase } from './db/database.js';

// Import routes (AFTER dotenv.config())
import checkoutRouter from './routes/checkout.js';
import webhookRouter from './routes/webhook.js';
import subscriptionRouter from './routes/subscription.js';
import userRouter from './routes/user.js';
import aiRouter from './routes/ai.js';
import ttsRouter from './routes/tts.js';
import adminRouter from './routes/admin.js';
import progressRouter from './routes/progress.js';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Security: Helmet for HTTP headers
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

// Rate limiting (prevent abuse)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per 15min
    message: 'Too many requests, please try again later.',
    skip: (req) => req.originalUrl === '/api/webhook',
});
app.use('/api/', limiter);

// Body parsing
// IMPORTANT: Webhook route needs raw body, so it's handled separately in webhook.js
app.use((req, res, next) => {
    if (req.originalUrl === '/api/webhook') {
        next(); // Skip JSON parsing for webhooks
    } else {
        express.json()(req, res, next);
    }
});

// Initialize database
initializeDatabase();

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// API Routes
app.use('/api', checkoutRouter);
app.use('/api', webhookRouter);
app.use('/api', subscriptionRouter);
app.use('/api', userRouter);
app.use('/api', aiRouter);
app.use('/api', ttsRouter);
app.use('/api', adminRouter);
app.use('/api', progressRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════╗
║   🚀 RevP2 Backend API Running       ║
╠═══════════════════════════════════════╣
║   Port: ${PORT.toString().padEnd(30)}║
║   Environment: ${(process.env.NODE_ENV || 'development').padEnd(21)}║
║   Frontend: ${(process.env.FRONTEND_URL || 'not set').padEnd(22)}║
╚═══════════════════════════════════════╝

Available endpoints:
  GET  /health
  POST /api/create-checkout-session
  POST /api/create-customer-portal-session
  POST /api/webhook
  GET  /api/subscription/:userId
  GET  /api/subscriptions/stats
  GET  /api/user/:userId/onboarding
  POST /api/user/:userId/onboarding
  GET  /api/user/:userId/preferences
  POST /api/user/:userId/preferences
  POST /api/ai/chat
  POST /api/ai/feedback
  GET  /api/ai/quota
  GET  /api/ai/health
  POST /api/tts/generate
  GET  /api/tts/metadata/:segmentId
  GET  /api/tts/stats
  POST /api/tts/cache/clean
  DELETE /api/tts/segment/:segmentId

Ready to accept requests! ✨
  `);
});

export default app;
