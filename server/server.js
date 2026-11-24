import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, getMongoStatus, disconnectFromMongoDB } from './config/db.js';
import materialRoutes from './routes/materialRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Resolve directory paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
let dbPromise = null;
const ensureDB = async () => {
  if (!getMongoStatus()) {
    if (!dbPromise) {
      dbPromise = connectDB().finally(() => {
        dbPromise = null;
      });
    }
    await dbPromise;
  }
};
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure DB connected on each serverless invocation
app.use(async (req, res, next) => {
  if (!getMongoStatus()) {
    await ensureDB();
  }
  next();
});

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/materials', materialRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  await ensureDB();
  const mongoOk = getMongoStatus();
  const geminiOk = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here');
  
  res.json({
    status: 'healthy',
    service: 'Prepify Backend API',
    mongoConnected: mongoOk,
    geminiEnabled: geminiOk,
    debug: {
      hasMongoUri: Boolean(process.env.MONGODB_URI),
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      nodeEnv: process.env.NODE_ENV || 'production',
      isVercel: Boolean(process.env.VERCEL),
    },
    timestamp: new Date(),
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down Prepify server...');
  await disconnectFromMongoDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nShutting down Prepify server...');
  await disconnectFromMongoDB();
  process.exit(0);
});

// Start a local Express server outside Vercel serverless deployments.
if (!process.env.VERCEL) {
  const server = app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Prepify Backend Server running on port ${PORT}`);
    console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📚 Materials API: http://localhost:${PORT}/api/materials`);
    console.log(`🎮 Game API:      http://localhost:${PORT}/api/game/leaderboard`);
    console.log(`===============================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Error: Port ${PORT} is already in use by another process.`);
      console.error(`👉 Run this in PowerShell to free it:\n   Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force\n`);
    } else {
      console.error('Server error:', err);
    }
  });
}

export default app;
