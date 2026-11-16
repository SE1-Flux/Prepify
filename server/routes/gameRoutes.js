import express from 'express';
import { HighScore } from '../models/HighScore.js';
import { getMongoStatus } from '../config/db.js';

const router = express.Router();

const inMemoryLeaderboard = [
  { _id: '1', playerName: 'Alex M.', depth: 4000, streak: 16, score: 3850, companion: 'The thinker', createdAt: new Date() },
  { _id: '2', playerName: 'Jordan K.', depth: 2500, streak: 12, score: 2600, companion: 'The go-getter', createdAt: new Date() },
  { _id: '3', playerName: 'Riley C.', depth: 1000, streak: 7, score: 1450, companion: 'The curious one', createdAt: new Date() },
  { _id: '4', playerName: 'Morgan T.', depth: 850, streak: 5, score: 920, companion: 'The explorer', createdAt: new Date() },
];

// GET /api/game/leaderboard - Top high scores
router.get('/leaderboard', async (req, res) => {
  try {
    if (getMongoStatus()) {
      const topScores = await HighScore.find().sort({ score: -1 }).limit(10);
      return res.json({ success: true, data: topScores });
    }
    const sorted = [...inMemoryLeaderboard].sort((a, b) => b.score - a.score);
    return res.json({ success: true, data: sorted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/game/score - Submit a new game score
router.post('/score', async (req, res) => {
  try {
    const { playerName, depth, streak, score, companion } = req.body;

    const record = {
      _id: Date.now().toString(),
      playerName: playerName || 'Explorer',
      depth: depth || 0,
      streak: streak || 0,
      score: score || 0,
      companion: companion || 'The thinker',
      createdAt: new Date(),
    };

    if (getMongoStatus()) {
      const saved = await HighScore.create(record);
      return res.status(201).json({ success: true, data: saved });
    }

    inMemoryLeaderboard.push(record);
    return res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
