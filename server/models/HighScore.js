import mongoose from 'mongoose';

const highScoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    default: 'Explorer',
  },
  depth: {
    type: Number,
    required: true,
    default: 1000,
  },
  streak: {
    type: Number,
    required: true,
    default: 0,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  companion: {
    type: String,
    default: 'The thinker',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const HighScore = mongoose.models.HighScore || mongoose.model('HighScore', highScoreSchema);
