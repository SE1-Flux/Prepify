# Prepify — AI-Powered Gamified Study Platform

> *"Make knowledge your next adventure."*

**Prepify** is a full-stack educational technology platform that transforms static, overwhelming study materials—such as lecture PDFs, slide decks, and syllabi—into structured, active-recall study sets and an ocean-depth learning game called **"The Dive"**. 

This system represents a production-grade implementation of the [Prepify Figma Prototype](https://www.figma.com/design/kYSEVTkrotKRcnFEboyVgE/Prepify-Prototype?node-id=1568-3230) (`Prepify — LANDING PAGE`, node `1568:3230`).

---

> 📖 **Looking to run or install the project?**  
> Check out the complete step-by-step [**Getting Started & Installation Guide (START_GUIDE.md)**](file:///d:/Downloads/Prepify/START_GUIDE.md).

---

## 🌟 System Vision & Value Proposition

Traditional studying often defaults to passive re-reading, highlighting, and last-minute cramming—methods proven to have low long-term retention. **Prepify** redesigns the learning workflow around cognitive science principles:

1. **Active Recall over Passive Review:** Flashcards require learners to query memory before flipping to reveal solutions.
2. **Immediate Formative Feedback:** Auto-generated quizzes diagnose knowledge gaps and provide immediate explanatory rationales.
3. **Gamified Flow State:** "The Dive" game translates correct answer streaks into deep-sea exploration, turning repetitive practice into engaging milestones.
4. **Emotional Resonance & Companionship:** Seven distinct pixel-art companion archetypes accompany learners, providing praise, encouragement, and personality.

---

## 🏛️ System Architecture

Prepify is engineered as a decoupled full-stack application structured into three distinct layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT / PRESENTATION LAYER                     │
│    React.js (v18) · Tailwind CSS · Vite · Plus Jakarta Sans Typography │
│    Interactive Landing Page · Modals · Study Viewer · Dive Simulator   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST / JSON & Multipart
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     BACKEND & APPLICATION PROCESSING LAYER             │
│    Node.js · Express.js · Multer Ingest · CORS · Process Lifecycle     │
├───────────────────────────────────┬────────────────────────────────────┤
│       Document Processing         │          AI Synthesis Engine       │
│  pdf-parse (Binary Text Extract)  │  Google Gemini API (@google/genai) │
│  Cleaning, Token & Word Counting  │  Summaries, Cards, Quizzes, Depths │
└───────────────────────────────────┴────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA PERSISTENCE LAYER                          │
│    MongoDB Atlas Cloud Cluster (fluxdb.68bqaj3.mongodb.net)            │
│    Mongoose Schemas: User Accounts, Study Materials, High Scores       │
│    * Includes automatic In-Memory fallback for zero-friction setup     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Core Functional Modules

### 1. Document Ingestion & Text Parsing Engine
* **Input Formats:** Accepts raw PDF files, presentation slides, or pasted text excerpts.
* **Extraction Pipeline:** Utilizes `pdf-parse` in a Node.js server environment to process uploaded binary streams, extract raw text, calculate word and page counts, and sanitize formatting artifacts.
* **Multipart Handling:** Implements Multer memory buffering (up to 20MB) to handle high-resolution course syllabi without writing unencrypted temporary files to the host filesystem.

### 2. Google Gemini AI Synthesis Engine
* **SDK & Model:** Powered by Google's official `@google/genai` SDK using `gemini-4-hydrogen` (with graceful fallback to structured sample decks).
* **Automated Outputs:**
  * **Executive Summaries:** 2–3 paragraph high-level overviews distilling the core thesis of the lecture.
  * **Key Concepts & Definitions:** Formatted glossary entries for rapid review.
  * **Active Recall Flashcards:** Front-and-back pairs tagged by topic to stimulate retrieval pathways.
  * **Diagnostic Practice Quizzes:** Multiple-choice questions complete with four options, correct answer indices, and comprehensive explanations detailing why the correct answer is right and why distractors are incorrect.
  * **Dive Tiered Questions:** Categorized questions matched to ocean depth tiers with point values.

### 3. "The Dive" Gamified Study Engine
"The Dive" is an interactive study break game that incorporates questions sourced directly from the student's study materials:
* **Ocean Depth Tiers:**
  * **🌊 SHALLOWS (0 m):** Foundational vocabulary and baseline definitions (100 XP).
  * **🌌 TWILIGHT (200 m):** Conceptual relationships and mechanism tracing (250 XP).
  * **🌑 MIDNIGHT (1,000 m):** Analytical comparisons and multi-step logic (500 XP).
  * **🪐 ABYSS (4,000 m+):** Advanced synthesis and high-stakes recall (1,000 XP).
* **Streak Mechanics:** Answering questions correctly increases the streak counter (`STREAK 07`), updates the visual depth gauge, and awards bonus XP.
* **Leaderboards & Persistence:** Scores and companion stats are recorded in the MongoDB `HighScore` collection.

### 4. The 7 Study Companion Archetypes
To prevent study fatigue, Prepify introduces a team of 7 study companions:
* **The go-getter (`b8cdf.png`):** High momentum; first to start, keeps the study pace energetic.
* **The curious one (`0951b.png`):** The questioner; explores the "why" behind every concept.
* **The spark (`059cc.png`):** Energetic motivator; breaks through mental blocks.
* **The page-turner (`a3bf5.png`):** The scholar; leaves no footnote or diagram uninspected.
* **The thinker (`aa88e.png`):** Systems analyst; connects the dots across complex concepts.
* **The explorer (`adf57.png`):** Adventurer; ventures into unfamiliar and difficult topics.
* **The cheer squad (`907ff.png`):** The encourager; celebrates streaks and small study victories.

### 5. Study View Center & Modals
* **Study View Modal:** A dedicated tabbed modal allowing students to seamlessly switch between the Executive Summary, Flashcards (with 3D flip interaction), and Practice Quizzes (with immediate scoring).
* **Upload Modal:** A drag-and-drop file interface featuring real-time three-stage status updates (*Extracting* $\rightarrow$ *AI Synthesizing* $\rightarrow$ *Saving*).
* **Auth Modal:** Student login and registration with interactive companion selection.

---

## 🎨 Design System & Visual Tokens

The frontend accurately translates the Figma design tokens into Tailwind CSS utility classes:

| Token Category | Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `primary-50` | `#eef6ff` | Hero background, Card backgrounds, Accent pills |
| **Primary** | `primary-100` | `#d9eaff` | Avatar stage circle, Progress tracks, Badge fills |
| **Primary** | `primary-200` | `#b9d8ff` | Ribbon numbers, Subtitle accents |
| **Primary** | `primary-600` | `#1763dd` | Primary CTAs, Active indicators, Brand buttons |
| **Primary** | `primary-700` | `#164fba` | Sub-headers, Taglines, Section markers |
| **Primary** | `primary-800` | `#193f91` | Dark button hovers, Depth marker badges |
| **Primary** | `primary-900` | `#1a376f` | Dive gameplay box background |
| **Primary** | `primary-950` | `#172554` | Midnight ocean sections, Benefits ribbon |
| **Neutral** | `neutral-50` | `#f6f8fb` | Section alternating backgrounds, Card fills |
| **Neutral** | `neutral-200` | `#dce3ed` | Dividers, Borders, Step rule lines |
| **Neutral** | `neutral-600` | `#596983` | Body copy, Secondary details |
| **Neutral** | `neutral-700` | `#45536a` | Navigation links, Sub-headings |
| **Neutral** | `neutral-900` | `#172238` | Main headlines, Title text |
| **Typography** | `Plus Jakarta Sans` | Google Fonts | Primary geometric sans-serif typeface across all headings and controls |

---

## 🗄️ Database Schemas (MongoDB)

### 1. `StudyMaterial` Collection
```typescript
{
  _id: ObjectId,
  title: String,
  fileName: String,
  fileSize: Number,
  extractedWordCount: Number,
  summary: String,
  keyConcepts: [{ term: String, definition: String }],
  flashcards: [{ question: String, answer: String, topic: String }],
  quizzes: [{ question: String, options: [String], correctAnswerIndex: Number, explanation: String }],
  diveQuestions: [{ depth: String, question: String, options: [String], correctAnswerIndex: Number, points: Number }],
  createdAt: Date
}
```

### 2. `User` Collection
```typescript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // hashed
  selectedMascot: String, // e.g. "The go-getter"
  createdAt: Date
}
```

### 3. `HighScore` Collection
```typescript
{
  _id: ObjectId,
  playerName: String,
  depth: Number,
  streak: Number,
  score: Number,
  companion: String,
  createdAt: Date
}
```

---

## 🌐 API Endpoint Specification

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status, MongoDB state, and Gemini configuration check |
| `GET` | `/api/materials` | Lists all synthesized study sets |
| `GET` | `/api/materials/demo` | Retrieves the default Figma Cell Biology prototype study pack |
| `GET` | `/api/materials/:id` | Retrieves full study guide, flashcards, and quizzes for a given material |
| `POST` | `/api/materials/upload` | Multipart upload for PDF/notes; parses text and triggers Gemini AI generation |
| `GET` | `/api/game/leaderboard` | Retrieves top scores from the Dive game |
| `POST` | `/api/game/score` | Records a new Dive depth achievement and streak |
| `POST` | `/api/auth/register` | Registers a new student account |
| `POST` | `/api/auth/login` | Authenticates a student |

---

## 🚀 Getting Started

To install dependencies, configure environment variables, and run Prepify locally, please follow the instructions in:

👉 [**START_GUIDE.md — Step-by-Step Setup Instructions**](file:///d:/Downloads/Prepify/START_GUIDE.md)

---

## 📄 License
This project is authored as a prototype defense implementation for Prepify. All rights reserved © 2026 Prepify.
