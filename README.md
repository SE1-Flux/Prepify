# Prepify — Full-Stack Prototype Implementation

> *"Make knowledge your next adventure."*

A full-stack, AI-assisted, gamified study platform accurately converted from the Figma design (`Prepify — LANDING PAGE`, node `1568:3230`).

---

## 🛠️ Technology Stack & Requirements

* **Frontend Environment:** React.js, Tailwind CSS, Vite, Lucide Icons, Plus Jakarta Sans typography.
* **Backend Environment:** Node.js, Express.js (REST API, CORS, Multer file upload).
* **AI & Document Processing:**
  * **Google Gemini API** (`@google/genai`): Automated syllabus analysis, executive summarization, active-recall flashcard generation, and tiered quiz question synthesis.
  * **`pdf-parse`**: Document text extraction from uploaded slide decks and PDF handouts in Node.js.
* **Database:** **MongoDB Server** with Mongoose schemas (User accounts, Uploaded study materials, Flashcard sets, and "The Dive" game high scores & streaks), featuring an automatic in-memory fallback for immediate zero-friction local testing.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Open a terminal in the root directory:

```bash
# Install Server dependencies
cd server
npm install

# Install Client dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` in `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/prepify
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=prepify_super_secret_jwt_key_2026
```

*(Note: If no Gemini API key is provided, the platform automatically utilizes structured high-yield packs matching the Figma Cell Biology prototype. If MongoDB is not yet running, the server gracefully defaults to in-memory mode.)*

### 3. Launch the Application

**Start Backend (Terminal 1):**
```bash
cd server
npm run dev
# Running on http://localhost:5000
```

**Start Frontend (Terminal 2):**
```bash
cd client
npm run dev
# Running on http://localhost:5173
```

Navigate to `http://localhost:5173` in your browser.

---

## 🎨 Implemented Figma Sections & Features

1. **Header & Navigation (`1568:3231`):**
   * Responsive navigation bar with links to Features, Meet the crew, The Dive game, and FAQs.
   * "Log in" and "Start studying" interactive triggers.

2. **Hero Section (`1568:3238`):**
   * *"LESS CRAM. MORE ADVENTURE."* badge and *"Big brain energy. One small dive."* headline.
   * Floating pixel companions (*The go-getter*, *The curious one*, *The page-turner*).
   * **Interactive Flashcards Preview (`1568:3256`)**: Click **Reveal Answer** to flip the card and reveal Mitochondria ATP synthesis!
   * Quick chips: *PDFs & slides*, *Smart flashcards*, *Instant quizzes*.

3. **Benefits Ribbon (`1568:3269`):**
   * Dark navy ribbon highlighting the 3 foundational pillars of Prepify.

4. **Study Toolkit (`1568:3276`):**
   * `01 / IMPORT`: Interactive document import preview (`BIOLOGY_LECTURE_04.PDF`).
   * `02 / FLASHCARDS`: Clickable active recall flashcard stack.
   * `03 / QUIZZES`: Instant interactive quiz check with instant feedback.

5. **How It Works (`1568:3307`):**
   * 3-step pipeline: *Drop in your material* $\rightarrow$ *Find your study flow* $\rightarrow$ *Take your knowledge for a dive*.

6. **Meet Your Study Crew (`1568:3322`):**
   * Interactive cards showcasing all 7 character companions downloaded directly from Figma:
     1. The go-getter
     2. The curious one
     3. The spark
     4. The page-turner
     5. The thinker
     6. The explorer
     7. The cheer squad

7. **The Dive Game (`1568:3349`):**
   * Midnight ocean depth ladder (*Shallows: 0m*, *Twilight: 200m*, *Midnight: 1,000m*, *Abyss: 4,000m*).
   * Live streak & score tracking, interactive question answering, and high score submission.

8. **Questions Answered FAQ (`1568:3379`):**
   * Accordion answering key user questions on material types, study tools, and the Dive game.

9. **Start Your Adventure CTA (`1568:3392`) & Footer (`1568:3399`):**
   * Call to action with companions and copyright footer.

10. **Full-Stack Document Ingestion & Study Viewer Modal:**
    * PDF drag-and-drop file upload.
    * Real-time text extraction with `pdf-parse`.
    * AI synthesis via Gemini API.
    * Interactive Study View with Overview, Flashcard deck, and scored Practice Quiz.
