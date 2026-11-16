import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  topic: { type: String, default: 'General' },
});

const quizQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  explanation: { type: String, default: '' },
});

const diveQuestionSchema = new mongoose.Schema({
  depth: { type: String, default: 'Shallows (0-200m)' },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  points: { type: Number, default: 100 },
});

const studyMaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    default: 'untitled.pdf',
  },
  fileSize: {
    type: Number,
    default: 0,
  },
  extractedWordCount: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    default: '',
  },
  keyConcepts: [{
    term: String,
    definition: String,
  }],
  flashcards: [flashcardSchema],
  quizzes: [quizQuestionSchema],
  diveQuestions: [diveQuestionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const StudyMaterial = mongoose.models.StudyMaterial || mongoose.model('StudyMaterial', studyMaterialSchema);
