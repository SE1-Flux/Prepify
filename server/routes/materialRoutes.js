import express from 'express';
import multer from 'multer';
import { extractTextFromPDF } from '../services/pdfService.js';
import { generateStudyPack } from '../services/geminiService.js';
import { StudyMaterial } from '../models/StudyMaterial.js';
import { getMongoStatus } from '../config/db.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max
});

// In-memory cache fallback when MongoDB server is not running
const inMemoryMaterials = [];

// Seed sample study material matching the Figma Prototype
const seedBiologyMaterial = {
  _id: 'sample-bio-1',
  title: 'Biology Lecture 04: Cell Biology',
  fileName: 'BIOLOGY_LECTURE_04.PDF',
  fileSize: 2450000,
  extractedWordCount: 1820,
  summary: 'This core lecture addresses the structural hierarchy and transport thermodynamics of eukaryotic cells, specifically the phospholipid bilayer, selective permeability, cellular respiration within mitochondria, and mitotic segregation in anaphase.',
  keyConcepts: [
    { term: 'Active Recall', definition: 'Retrieving concepts through questioning rather than passive reading.' },
    { term: 'Phospholipid Bilayer', definition: 'Amphipathic membrane structure regulating cellular intake and output.' },
    { term: 'Mitochondria & ATP', definition: 'The cellular powerhouse generating ATP via oxidative phosphorylation.' },
    { term: 'Anaphase', definition: 'Mitotic division phase where sister chromatids separate toward poles.' }
  ],
  flashcards: [
    { question: 'What powers a cell?', answer: 'Mitochondria generates ATP via cellular respiration.', topic: 'Organelles' },
    { question: 'What is active recall?', answer: 'Stimulating memory by testing yourself before checking the answer.', topic: 'Methodology' },
    { question: 'Which phase separates sister chromatids?', answer: 'Anaphase pulls chromatids toward opposite spindle poles.', topic: 'Mitosis' },
    { question: 'What is the role of the plasma membrane?', answer: 'Provides a selective barrier and maintains cellular homeostasis.', topic: 'Membrane' }
  ],
  quizzes: [
    {
      question: 'Which organelle produces ATP through cellular respiration?',
      options: ['Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Lysosome'],
      correctAnswerIndex: 0,
      explanation: 'Correct — that’s the cell’s energy source.'
    },
    {
      question: 'Which phase separates sister chromatids?',
      options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
      correctAnswerIndex: 2,
      explanation: 'Correct — sister chromatids diverge during Anaphase.'
    }
  ],
  diveQuestions: [
    { depth: 'SHALLOWS — 0 m', question: 'What organelle produces ATP?', options: ['Mitochondria', 'Chloroplast'], correctAnswerIndex: 0, points: 100 },
    { depth: 'TWILIGHT — 200 m', question: 'Does passive transport require ATP?', options: ['No, passive does not', 'Yes, it requires ATP'], correctAnswerIndex: 0, points: 250 },
    { depth: 'MIDNIGHT — 1,000 m', question: 'Which phase separates sister chromatids?', options: ['Anaphase', 'Metaphase'], correctAnswerIndex: 0, points: 500 },
    { depth: 'ABYSS — 4,000 m', question: 'What enzyme synthesizes ATP using a proton gradient?', options: ['ATP Synthase', 'DNA Ligase'], correctAnswerIndex: 0, points: 1000 }
  ],
  createdAt: new Date(),
};

inMemoryMaterials.push(seedBiologyMaterial);

// GET /api/materials - List all study materials
router.get('/', async (req, res) => {
  try {
    if (getMongoStatus()) {
      const materials = await StudyMaterial.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: materials.length, data: materials });
    }
    return res.json({ success: true, count: inMemoryMaterials.length, data: inMemoryMaterials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/materials/demo - Get the default Figma sample material
router.get('/demo', (req, res) => {
  res.json({ success: true, data: seedBiologyMaterial });
});

// GET /api/materials/:id - Get specific material
router.get('/:id', async (req, res) => {
  try {
    if (getMongoStatus()) {
      const material = await StudyMaterial.findById(req.params.id);
      if (material) return res.json({ success: true, data: material });
    }
    const mem = inMemoryMaterials.find(m => m._id.toString() === req.params.id);
    if (mem) return res.json({ success: true, data: mem });
    
    return res.status(404).json({ success: false, message: 'Study material not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/materials/upload - Upload PDF, extract text, call Gemini AI, save study guide
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    let extractedText = '';
    let fileName = 'Untitled Notes';
    let fileSize = 0;
    let wordCount = 0;

    if (req.file) {
      fileName = req.file.originalname;
      fileSize = req.file.size;

      // Extract text with pdf-parse if PDF
      if (req.file.mimetype === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
        const parsed = await extractTextFromPDF(req.file.buffer);
        extractedText = parsed.text;
        wordCount = parsed.wordCount;
      } else {
        // Plain text or notes upload
        extractedText = req.file.buffer.toString('utf-8');
        wordCount = extractedText.split(/\s+/).filter(Boolean).length;
      }
    } else if (req.body.text) {
      extractedText = req.body.text;
      fileName = req.body.title || 'Pasted Study Notes';
      wordCount = extractedText.split(/\s+/).filter(Boolean).length;
    } else {
      return res.status(400).json({
        success: false,
        message: 'No file or study notes text provided. Please upload a PDF or paste notes.',
      });
    }

    const title = req.body.title || fileName.replace(/\.[^/.]+$/, '');

    // AI Generation via Gemini
    console.log(`[Prepify AI] Processing "${title}" with Gemini API... (${wordCount} words)`);
    const generatedPack = await generateStudyPack(title, extractedText);

    const studyDoc = {
      _id: Date.now().toString(),
      title: generatedPack.title || title,
      fileName,
      fileSize,
      extractedWordCount: wordCount,
      summary: generatedPack.summary,
      keyConcepts: generatedPack.keyConcepts || [],
      flashcards: generatedPack.flashcards || [],
      quizzes: generatedPack.quizzes || [],
      diveQuestions: generatedPack.diveQuestions || [],
      createdAt: new Date(),
    };

    // Save to MongoDB if available
    if (getMongoStatus()) {
      const savedDoc = await StudyMaterial.create(studyDoc);
      return res.status(201).json({
        success: true,
        message: 'Study pack synthesized successfully and saved to MongoDB!',
        data: savedDoc,
      });
    }

    // Save to in-memory store
    inMemoryMaterials.unshift(studyDoc);
    return res.status(201).json({
      success: true,
      message: 'Study pack synthesized successfully (In-Memory)!',
      data: studyDoc,
    });
  } catch (error) {
    console.error('Error processing material upload:', error);
    res.status(500).json({
      success: false,
      message: `Failed to process study material: ${error.message}`,
    });
  }
});

export default router;
