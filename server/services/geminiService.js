import { GoogleGenAI } from '@google/genai';

/**
 * Service to generate study guides, flashcards, quizzes, and Dive game questions
 * using Google's Gemini API via the official @google/genai SDK.
 */
export async function generateStudyPack(title, textContent) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are the AI engine for "Prepify", an interactive, gamified study platform.
Analyze the following study material titled "${title}":

---
${textContent.slice(0, 15000)}
---

Generate a complete JSON response strictly adhering to this structure:
{
  "title": "${title}",
  "summary": "A concise, engaging 2-3 paragraph overview of the core material.",
  "keyConcepts": [
    {"term": "Key Concept 1", "definition": "Clear, accessible definition."}
  ],
  "flashcards": [
    {
      "question": "High-yield active recall question",
      "answer": "Accurate, memorable answer",
      "topic": "Specific subtopic"
    }
  ],
  "quizzes": [
    {
      "question": "Challenging multiple-choice question testing understanding",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 0,
      "explanation": "Clear explanation of why Option A is correct and why other options are incorrect."
    }
  ],
  "diveQuestions": [
    {
      "depth": "Shallows (0 - 200m)",
      "question": "Fundamental recall question",
      "options": ["Choice 1", "Choice 2"],
      "correctAnswerIndex": 0,
      "points": 100
    },
    {
      "depth": "Twilight (200 - 1,000m)",
      "question": "Conceptual application question",
      "options": ["Choice 1", "Choice 2"],
      "correctAnswerIndex": 0,
      "points": 250
    },
    {
      "depth": "Midnight (1,000 - 4,000m)",
      "question": "Deep mechanism or analysis question",
      "options": ["Choice 1", "Choice 2"],
      "correctAnswerIndex": 0,
      "points": 500
    },
    {
      "depth": "Abyss (4,000m+)",
      "question": "Mastery synthesis question",
      "options": ["Choice 1", "Choice 2"],
      "correctAnswerIndex": 0,
      "points": 1000
    }
  ]
}

Return ONLY valid JSON without extra markdown fences or surrounding prose.
`;

      const response = await ai.interactions.create({
        model: 'gemini-4-hydrogen',
        input: prompt,
      });

      const responseText = response.output_text || '';
      const cleanJsonString = responseText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      const parsed = JSON.parse(cleanJsonString);
      return parsed;
    } catch (error) {
      console.warn('[Gemini API] Request failed or timed out, using intelligent fallback data:', error.message);
    }
  } else {
    console.info('[Gemini API] No GEMINI_API_KEY provided in .env. Using intelligent default study pack.');
  }

  // High quality default study pack based on the Figma prototype's Cell Biology theme
  return {
    title: title || 'Cell Biology & Cellular Transport',
    summary: 'This module examines the fundamental organizational principles of eukaryotic cells, specifically focusing on the phospholipid bilayer, membrane transport mechanisms, and ATP-generating metabolic pathways. The plasma membrane functions as a selectively permeable barrier, maintaining internal homeostasis through passive diffusion, facilitated transport, and active ion pumping.',
    keyConcepts: [
      {
        term: 'Active Recall',
        definition: 'A principle of efficient learning where the learner retrieves information from memory through self-testing rather than passively reviewing notes.'
      },
      {
        term: 'Phospholipid Bilayer',
        definition: 'A double layer of phospholipid molecules with hydrophilic phosphate heads pointing outward and hydrophobic fatty acid tails pointing inward.'
      },
      {
        term: 'Mitochondria & ATP',
        definition: 'The double-membraned organelle responsible for aerobic cellular respiration, generating Adenosine Triphosphate (ATP) to power cellular processes.'
      },
      {
        term: 'Anaphase',
        definition: 'The fourth stage of cell division during mitosis where sister chromatids separate at the centromere and are pulled toward opposite cell poles.'
      }
    ],
    flashcards: [
      {
        question: 'What powers a cell?',
        answer: 'Mitochondria produces ATP (Adenosine Triphosphate) through cellular respiration, powering nearly all metabolic work.',
        topic: 'Organelles'
      },
      {
        question: 'What is active recall?',
        answer: 'The practice of stimulating memory during the learning process by querying yourself before looking at the solution.',
        topic: 'Study Methodology'
      },
      {
        question: 'Which phase of mitosis separates sister chromatids?',
        answer: 'Anaphase is the specific mitotic phase where kinetochore microtubules pull sister chromatids to opposite spindle poles.',
        topic: 'Cell Division'
      },
      {
        question: 'What distinguishes passive transport from active transport?',
        answer: 'Passive transport moves solutes down their concentration gradient without ATP expenditure; active transport moves substances against the gradient using ATP.',
        topic: 'Membrane Transport'
      },
      {
        question: 'What is the function of ribosomes?',
        answer: 'Ribosomes are ribonucleoprotein complexes that translate mRNA sequences into polypeptide chains during protein synthesis.',
        topic: 'Molecular Biology'
      }
    ],
    quizzes: [
      {
        question: 'Which organelle produces ATP through cellular respiration?',
        options: ['Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus', 'Lysosome'],
        correctAnswerIndex: 0,
        explanation: 'Correct — mitochondria synthesize the majority of cellular ATP via the citric acid cycle and oxidative phosphorylation.'
      },
      {
        question: 'Which phase separates sister chromatids during mitosis?',
        options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
        correctAnswerIndex: 2,
        explanation: 'Correct — during Anaphase, cohesin complexes are cleaved and sister chromatids separate to opposite poles.'
      },
      {
        question: 'What type of transport requires ATP to move ions against their concentration gradient?',
        options: ['Simple Diffusion', 'Facilitated Diffusion', 'Primary Active Transport', 'Osmosis'],
        correctAnswerIndex: 2,
        explanation: 'Correct — primary active transport directly couples the hydrolysis of ATP to solute movement against a gradient.'
      },
      {
        question: 'Which component constitutes the hydrophobic core of the plasma membrane?',
        options: ['Phosphate heads', 'Fatty acid tails', 'Peripheral proteins', 'Carbohydrate chains'],
        correctAnswerIndex: 1,
        explanation: 'Correct — non-polar fatty acid hydrocarbon chains aggregate inward to avoid aqueous contact.'
      }
    ],
    diveQuestions: [
      {
        depth: 'SHALLOWS — 0 m',
        question: 'What is the powerhouse organelle of the cell?',
        options: ['Mitochondria', 'Vacuole'],
        correctAnswerIndex: 0,
        points: 100
      },
      {
        depth: 'TWILIGHT — 200 m',
        question: 'Does facilitated diffusion require ATP energy expenditure?',
        options: ['No, it is passive', 'Yes, it consumes ATP'],
        correctAnswerIndex: 0,
        points: 250
      },
      {
        depth: 'MIDNIGHT — 1,000 m',
        question: 'Which phase separates sister chromatids?',
        options: ['Anaphase', 'Metaphase'],
        correctAnswerIndex: 0,
        points: 500
      },
      {
        depth: 'ABYSS — 4,000 m',
        question: 'Which complex generates ATP via proton motive force during oxidative phosphorylation?',
        options: ['ATP Synthase (Complex V)', 'Cytochrome c Oxidase'],
        correctAnswerIndex: 0,
        points: 1000
      }
    ]
  };
}
