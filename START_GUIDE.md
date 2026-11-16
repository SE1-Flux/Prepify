# Prepify — Getting Started & Installation Guide

This guide walks you through setting up and running the **Prepify** full-stack application on your local development environment.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed on your machine:
* **Node.js**: v18.0.0 or higher (`node -v`)
* **npm**: v9.0.0 or higher (`npm -v`)
* **MongoDB**: A free [MongoDB Atlas Cluster](https://www.mongodb.com/cloud/atlas) or a locally running MongoDB instance (`mongod`).
* **Google Gemini API Key** *(Optional but recommended)*: Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).

---

## 🚀 Quick Setup (Step-by-Step)

### Step 1: Install Dependencies

From the root project directory (`d:\Downloads\Prepify`), run:

```bash
# 1. Install Server Dependencies
cd server
npm install

# 2. Install Client Dependencies
cd ../client
npm install
```

---

### Step 2: Configure Environment Variables

Navigate to the `server/` directory and configure the `.env` file:

```bash
# Open server/.env in your editor
```

Ensure your `server/.env` file contains your configuration:

```env
# Server Port
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
# Replace <db_password> with your actual database user password
MONGODB_URI=mongodb+srv://delacruzrainjehanbscs2024_db_user:<db_password>@fluxdb.68bqaj3.mongodb.net/prepify?retryWrites=true&w=majority

# Google Gemini API Key (from https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key_here

# JWT Authentication Secret
JWT_SECRET=prepify_super_secret_jwt_key_2026
```

> [!IMPORTANT]
> * **MongoDB Setup:** Replace `<db_password>` with your database user's password. If left as `<db_password>`, the server automatically operates in **In-Memory Mode** so you can test immediately without database errors.
> * **Gemini API Setup:** If you don't enter a `GEMINI_API_KEY` immediately, the server provides structured default study packs (Cell Biology, Genetics) so all UI features and games remain fully testable out of the box.

---

### Step 3: Run the Application

You can start both backend and frontend using separate terminal windows:

#### Terminal 1 — Start the Backend Server:
```bash
cd server
npm run dev
```
* The Express server will launch on: **`http://localhost:5000`**
* Health check endpoint: **`http://localhost:5000/api/health`**

#### Terminal 2 — Start the Frontend Client:
```bash
cd client
npm run dev
```
* The Vite development server will launch on: **`http://localhost:5173`**
* Open your browser and navigate to **`http://localhost:5173`**

---

### Running Concurrently from Root (Alternative)
You can also launch both services with a single command from the project root:

```bash
npm run dev
```
*(Requires `concurrently` installed via `npm install`).*

---

## 🧪 Testing the Core Features

Once the app is running in your browser:

1. **Interactive Hero Flashcard:**
   * On the hero section, click **"Reveal answer"** on the card preview to see the active recall flip animation in action.

2. **Explore The 7 Companions:**
   * Scroll down to **"Meet the crew"** and click on any pixel companion card (*The go-getter, The curious one, The spark, The page-turner, The thinker, The explorer, The cheer squad*) to read their personality archetype.

3. **Play The Dive Game:**
   * Scroll to **"The Dive game"** section.
   * Click choices on the question card to advance your depth (*Shallows: 0m* $\rightarrow$ *Twilight: 200m* $\rightarrow$ *Midnight: 1,000m* $\rightarrow$ *Abyss: 4,000m*).
   * Watch your live streak and score increase in real time.

4. **Upload a Study Document:**
   * Click **"Import your notes"** or **"Start studying"** in the top navigation bar.
   * Drag and drop a lecture PDF or click **"Or explore sample Biology Lecture 04"**.
   * The system will parse the PDF using `pdf-parse`, generate active recall study sets via Gemini AI, and open the full **Study Pack Viewer** with:
     * Executive AI Summary & Key Definitions
     * Smart Flashcard Decks with Active Recall Flip
     * Self-Grading Practice Quizzes with Explanation Feedback

5. **User Authentication:**
   * Click **"Log in"** in the navigation bar to test the sign-in modal or create an account with a preferred study companion.

---

## 🛠️ Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **`MongoServerSelectionError`** | Invalid MongoDB Atlas password or IP whitelist restriction. | 1. Replace `<db_password>` in `server/.env`.<br>2. Ensure your current IP is whitelisted in [MongoDB Atlas Network Access](https://cloud.mongodb.com/). |
| **`Port 5000 in use`** | Another process is occupying port 5000. | Change `PORT=5001` in `server/.env` and adjust the proxy target in `client/vite.config.js`. |
| **`Gemini API Quota / Key Error`** | Invalid API key or quota exceeded. | Verify your key at [Google AI Studio](https://aistudio.google.com/). The server falls back to high-yield demo packs if omitted. |
| **Client proxy not connecting** | Server is not running. | Make sure `npm run dev` in `server/` is running concurrently with the client. |

---

## 🛡️ Git Safety Reminder

Your secrets are safe:
* `server/.env` is ignored by Git and will **never** be pushed to GitHub.
* Keep your secrets in `server/.env` and only push `.env.example` to public repositories.
