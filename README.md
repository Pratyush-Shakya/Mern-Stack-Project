# 🎮 Hangman Game – Full MERN Stack Web Application

[![Stack](https://img.shields.io/badge/Stack-MERN%20(Mongo%20%7C%20Express%20%7C%20React%20%7C%20Node)-06B6D4?style=for-the-badge)](https://react.dev/)
[![Status](https://img.shields.io/badge/Status-Fully%20Functional%20%26%20Tested-10B981?style=for-the-badge)](#)

> **Main Heading:** HANGMAN GAME  
> **Subtitle:** *Test your vocabulary. Challenge your mind. Beat the Hangman!*

A modern, responsive, and secure full-stack web application built from the ground up using the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js).

---

## 📌 Table of Contents
1. [Project Overview & Objectives](#-project-overview--objectives)
2. [Key Features](#-key-features)
3. [Technology Stack](#-technology-stack)
4. [Application Architecture](#-application-architecture)
5. [Directory Structure](#-directory-structure)
6. [Anti-Cheat & Security Highlights](#-anti-cheat--security-highlights)
7. [Screens & UI Walkthrough](#-screens--ui-walkthrough)
8. [Installation & Setup Guide (Windows)](#-installation--setup-guide-windows)
9. [MongoDB Configuration](#-mongodb-configuration)
10. [REST API Documentation](#-rest-api-documentation)
11. [Scoring Formula & Multipliers](#-scoring-formula--multipliers)
12. [Evaluation & Project Explanation Guide](#-evaluation--project-explanation-guide)

---

## 🎯 Project Overview & Objectives

The primary objective of this project is to engineer an enterprise-quality Hangman game that satisfies modern full-stack web standards:
* **Interactive UI/UX**: Dark-themed navy/purple aesthetic with glassmorphism, responsive SVG animations, and native Web Audio sound synthesis.
* **Authoritative Server Architecture**: All game state transitions, letter verifications, score computations, and win/loss evaluations occur exclusively on the backend.
* **Persistent Analytics**: Tracking game sessions, player statistics, win percentages, streaks, and global leaderboards in MongoDB.
* **Anti-Cheat Design**: The secret target word is masked on the server and is **never** transmitted to the client during active gameplay.

---

## ✨ Key Features

### 🕹️ Gameplay
* **Dynamic Word Bank**: Over 200+ curated words across **7 distinct categories**:
  * 🐾 *Animals*
  * 💻 *Technology*
  * ⌨️ *Programming*
  * 🍕 *Food*
  * ⚽ *Sports*
  * 🌍 *Countries*
  * ✨ *General Knowledge*
* **3 Difficulty Settings**:
  * **Easy**: Common words (4–6 characters), 10 base pts + attempt bonus.
  * **Medium**: Moderately complex words (6–9 characters), 20 base pts + attempt bonus.
  * **Hard**: Challenging/technical terminology (8+ characters), 30 base pts + attempt bonus.
* **Dual Input System**: Seamless letter inputs via the on-screen glowing QWERTY keyboard or physical keyboard keypresses (`A-Z`).
* **Progressive Hangman Drawing**: Real-time vector SVG rendering that sequentially reveals:
  1. Head (with dynamic facial expressions: neutral, happy on victory, "X" eyes on defeat)
  2. Torso / Body
  3. Left Arm
  4. Right Arm
  5. Left Leg
  6. Right Leg
* **Victory Celebration**: Particle confetti blast and audio fanfares when the word is successfully solved.
* **Graceful Loss & Word Reveal**: Reveals the secret word and highlights missed letters when all 6 attempts are exhausted.

### 📊 Player Statistics & Leaderboard
* **Real-time Leaderboard**: Ranked podium for Top 3 players with Gold, Silver, and Bronze badges, plus a search filterable master ranking table.
* **Personal Analytics Dashboard**: Tracks total games played, total wins, total losses, win rate percentage, active winning streak, and personal best high scores.
* **Global Benchmarks**: Displays community-wide total matches and overall win ratios.

### 🎵 Native Web Audio Synthesizer
* Pure HTML5 Web Audio API sound synthesis with zero external MP3 dependencies:
  * Two-tone chime on correct letter guess
  * Low buzz on incorrect letter guess
  * Ascending arpeggio fanfare upon winning
  * Descending minor chord on game over
  * One-click mute/unmute audio toggle in the navigation bar

---

## 🛠️ Technology Stack

| Layer | Technologies Used | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite, JavaScript (ES6+), React Router DOM v7, Axios, Lucide React, Canvas Confetti | Component-driven Single Page Application (SPA) with glassmorphism CSS |
| **Backend** | Node.js (v23+), Express.js v4, CORS, Express Rate Limit | REST API managing game sessions, validation, and scoring |
| **Database** | MongoDB, Mongoose v8 | Document store for Games, Players, and Leaderboard records |
| **Tooling** | Git, npm, Visual Studio Code, Postman | Version control, package management, and API diagnostics |

---

## 🏗️ Application Architecture

```
[ Web Browser / Client: React.js (Vite) ]
      │
      │  HTTP Requests (Axios via Vite Proxy)
      ▼
[ Express.js REST API Server (Port 5000) ]
      │
      ├── Rate Limiter & Input Validation Middleware
      ├── Game Controller & Scoring Engine
      ├── Leaderboard & Player Stats Aggregator
      │
      ▼
[ MongoDB Database / Atlas via Mongoose ]
      ├── 'games' collection (active & completed game docs)
      ├── 'players' collection (user profiles, streaks, win rates)
      └── 'leaderboards' collection (high scores & rankings)
```

---

## 📁 Directory Structure

```
d:\Hangman Game Mern Stack\
│
├── client/                               # React + Vite Frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   └── logo.svg                      # Custom neon vector logo
│   ├── src/
│   │   ├── assets/
│   │   ├── components/                   # Reusable UI components
│   │   │   ├── Navbar.jsx                # Responsive header & audio toggle
│   │   │   ├── Footer.jsx                # Project & internship metadata
│   │   │   ├── HangmanDrawing.jsx        # 6-step progressive SVG animation
│   │   │   ├── WordDisplay.jsx           # Animated letter slots & reveal
│   │   │   ├── Keyboard.jsx              # Virtual & physical QWERTY input
│   │   │   ├── CategorySelector.jsx      # 7 category cards with icons
│   │   │   ├── DifficultySelector.jsx    # Easy/Medium/Hard selector
│   │   │   └── GameResultModal.jsx       # Won/Lost celebration modal
│   │   ├── pages/                        # Screen Views
│   │   │   ├── Home.jsx                  # Landing page & game setup
│   │   │   ├── Game.jsx                  # Main interactive game arena
│   │   │   ├── Leaderboard.jsx           # Top players podium & table
│   │   │   ├── PlayerStats.jsx           # Personal performance metrics
│   │   │   └── About.jsx                 # MERN stack & architecture guide
│   │   ├── services/
│   │   │   └── api.js                    # Axios API service client
│   │   ├── styles/
│   │   │   └── index.css                 # Dark theme glassmorphism CSS
│   │   ├── utils/
│   │   │   └── audio.js                  # Native Web Audio sound generator
│   │   ├── App.jsx                       # Router configuration
│   │   └── main.jsx                      # Vite React entry point
│   ├── index.html                        # HTML5 template with Google fonts
│   ├── vite.config.js                    # Vite configuration with /api proxy
│   └── package.json
│
├── server/                               # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                         # Mongoose MongoDB connection
│   ├── controllers/
│   │   ├── gameController.js             # Game lifecycle handlers
│   │   ├── leaderboardController.js      # Leaderboard query handler
│   │   └── statsController.js            # Player analytics handlers
│   ├── data/
│   │   └── words.js                      # 200+ categorized word dictionary
│   ├── middleware/
│   │   ├── errorHandler.js               # Centralized API error handler
│   │   ├── rateLimiter.js                # Rate limiting protection
│   │   └── validator.js                  # Request body sanitization
│   ├── models/                           # Mongoose Schemas
│   │   ├── Game.js                       # Game schema & public mask methods
│   │   ├── Player.js                     # Player profile & streak metrics
│   │   └── Leaderboard.js                # Leaderboard ranking schema
│   ├── routes/
│   │   ├── gameRoutes.js                 # /api/game router
│   │   ├── leaderboardRoutes.js          # /api/leaderboard router
│   │   └── statsRoutes.js                # /api/stats router
│   ├── services/
│   │   └── gameService.js                # Core business logic & score engine
│   ├── .env.example                      # Sample environment variables
│   ├── .env                              # Active environment variables
│   ├── server.js                         # Express server entry point
│   └── package.json
│
├── .gitignore
├── package.json                          # Monorepo root scripts
└── README.md
```

---

## 🔒 Anti-Cheat & Security Highlights

1. **Hidden Secret Words**:
   * During an active game, the backend outputs `maskedWord` (e.g. `_ _ A _ _`).
   * The `word` property is strictly excluded from responses until the game concludes (`status === 'won'` or `status === 'lost'`).
   * Inspecting network requests in Chrome DevTools will not leak the secret word.
2. **Server-Side Verification**:
   * Guessed letters, remaining attempts, win status, and score calculations are executed exclusively by `gameService.js`.
3. **Duplicate Guess Prevention**:
   * Attempting to guess an already-submitted letter returns HTTP `400 Bad Request` without consuming attempts.
4. **Rate Limiting**:
   * Endpoints are protected against automated brute-force attacks via `express-rate-limit`.

---

## 🚀 Installation & Setup Guide (Windows)

### Prerequisites
* **Node.js** (v18.0.0 or higher) – [Download Node.js](https://nodejs.org/)
* **Git** – [Download Git](https://git-scm.com/)
* Optional: **MongoDB** local service or a free **MongoDB Atlas** cluster account.

### Step 1: Clone or Navigate to the Project
```powershell
cd "d:\Hangman Game Mern Stack"
```

### Step 2: Install Backend Dependencies
```powershell
cd server
npm.cmd install
cd ..
```

### Step 3: Install Frontend Dependencies
```powershell
cd client
npm.cmd install
cd ..
```

*(Note: On Windows PowerShell if script execution is restricted, use `npm.cmd` instead of `npm`)*

### Step 4: Configure Backend Environment Variables
Verify or edit `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/hangman_db
CLIENT_URL=http://localhost:5173
```

### Step 5: Start the Backend Server
In Terminal 1:
```powershell
cd server
node server.js
```
*The server will start at `http://localhost:5000`.*

### Step 6: Start the Frontend Application
In Terminal 2:
```powershell
cd client
npm.cmd run dev
```
*Open your browser and navigate to `http://localhost:5173`.*

---

## 🍃 MongoDB Configuration

### Option A: Free MongoDB Atlas (Cloud - Recommended)
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free M0 cluster.
2. Under **Database Access**, create a database user and password.
3. Under **Network Access**, whitelist your IP (`0.0.0.0/0` for development).
4. Click **Connect** > **Drivers** > copy the connection string.
5. Paste into `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hangman_db?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB
If MongoDB Community Server is installed on your Windows machine:
```powershell
net start MongoDB
```
Connection URI: `mongodb://127.0.0.1:27017/hangman_db`

### In-Memory Development Mode:
If MongoDB is not installed locally, the server automatically boots into **In-Memory Store Mode**, enabling full gameplay, session tracking, and leaderboards without crashing!

---

## 📡 REST API Documentation

### 1. Start a New Game
* **Endpoint:** `POST /api/game/start`
* **Request Body:**
  ```json
  {
    "username": "CodeMaster",
    "category": "programming",
    "difficulty": "medium"
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "gameId": "gm_1793376022623_ijegz",
      "username": "CodeMaster",
      "category": "programming",
      "difficulty": "medium",
      "hint": "The scripting language that powers the web",
      "maskedWord": "__________",
      "wordLength": 10,
      "guessedLetters": [],
      "remainingAttempts": 6,
      "maxAttempts": 6,
      "status": "in_progress",
      "score": 0
    }
  }
  ```

### 2. Submit a Guess
* **Endpoint:** `POST /api/game/guess`
* **Request Body:**
  ```json
  {
    "gameId": "gm_1793376022623_ijegz",
    "letter": "E"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Correct guess!",
    "data": {
      "gameId": "gm_1793376022623_ijegz",
      "maskedWord": "_____E____",
      "guessedLetters": ["E"],
      "remainingAttempts": 6,
      "status": "in_progress",
      "guessResult": {
        "letter": "E",
        "isCorrect": true,
        "remainingAttempts": 6
      }
    }
  }
  ```

### 3. Get Game State
* **Endpoint:** `GET /api/game/:id`
* **Response (200 OK):** Returns the current state of the requested game.

### 4. Restart Game
* **Endpoint:** `POST /api/game/restart/:id`
* **Response (201 Created):** Restarts with a fresh word for the same player, category, and difficulty.

### 5. Leaderboard Rankings
* **Endpoint:** `GET /api/leaderboard?limit=25`
* **Response (200 OK):** Array of ranked players sorted by highest score and win rate.

### 6. Player Statistics
* **Endpoint:** `GET /api/stats/:playerId`
* **Response (200 OK):** Comprehensive stats including total games, wins, losses, win rate, and streaks.

### 7. Health Check
* **Endpoint:** `GET /api/health`
* **Response (200 OK):** Server online status, uptime, and database connection state.

---

## 🏆 Scoring Formula & Multipliers

Points are awarded exclusively when a round is won:
$$\text{Total Score} = \text{Base Points} + (\text{Remaining Attempts} \times \text{Bonus Multiplier})$$

| Difficulty | Base Points | Bonus per Remaining Attempt | Max Score (0 Mistakes) |
| :--- | :---: | :---: | :---: |
| **Easy** | 10 pts | +5 pts | **40 pts** |
| **Medium** | 20 pts | +7 pts | **62 pts** |
| **Hard** | 30 pts | +10 pts | **90 pts** |

*Rounds lost award 0 points and reset the player's active winning streak.*

---

## 🎓 Architecture & Project Explanation Guide

### 1. What is the MERN Stack?
* **M (MongoDB)**: A flexible NoSQL document database that stores JSON-like documents.
* **E (Express.js)**: A minimalist web framework on top of Node.js used to build RESTful APIs.
* **R (React.js)**: A declarative component-based JavaScript library used to create interactive user interfaces.
* **N (Node.js)**: An open-source, cross-platform JavaScript runtime environment executing JS code outside the browser.

### 2. How React Works in This Application
React maintains a **Virtual DOM**. In our Hangman game, states like `game`, `guessedLetters`, and `remainingAttempts` are managed using `useState`. When the user guesses a letter, the state updates and React efficiently re-renders only the changed letter slots, the SVG hangman limbs, and keyboard buttons.

### 3. How the Frontend Communicates with the Backend
We use the **Axios** library inside `client/src/services/api.js`. When the user clicks a letter:
1. Axios sends an asynchronous HTTP POST request to `/api/game/guess`.
2. Vite's proxy forwards the request to `http://localhost:5000`.
3. The Express backend receives the letter, validates it, updates database records, and sends back the updated game state in JSON format.
4. React receives the JSON response and updates the UI accordingly.

### 4. How the Anti-Cheat Game Logic Works
The secret word is selected and stored **only on the server**. The client receives a masked string of underscores (e.g., `_ _ _ _ _`). Each guess is evaluated on the backend. Only when the game status becomes `won` or `lost` does the backend reveal the full secret word. This ensures that even users inspecting DevTools cannot cheat.

---

## 🌟 Hinglish Project Summary

> *"Yeh project complete MERN stack architecture par based hai. Frontend ko React aur Vite ke through develop kiya gaya hai with modern clean UI. Backend me Node.js aur Express.js REST API use hui hai, aur database me MongoDB with Mongoose ODM integrate hai.*  
>  
> *Game ka main logic backend-heavy hai. Secret word client ko pehle kabhi expose nahi hota; server se masked underscores aate hain. Har guess par backend validation hota hai, duplicate guesses block hote hain, aur attempts calculate hote hain. Jab game khatam hota hai, tab score calculate hoke MongoDB me player stats aur leaderboard update ho jata hai."*

---

## 👨‍💻 Project Info
* **Project Name:** Hangman Game Web Application
* **License:** MIT License
