/**
 * Game Business Logic Service
 * Handles word masking, scoring calculations, win/loss verification,
 * and database synchronization with seamless in-memory fallback.
 */

let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  mongoose = null;
}

const Game = require('../models/Game');
const Player = require('../models/Player');
const Leaderboard = require('../models/Leaderboard');
const { getRandomWord } = require('../data/words');

// In-Memory store fallback
const memoryStore = {
  games: new Map(),
  players: new Map(),
  leaderboards: new Map()
};

/**
 * Check if Mongoose connection is ready
 */
const isMongoConnected = () => {
  return !!(mongoose && mongoose.connection && mongoose.connection.readyState === 1);
};

/**
 * Calculate game score based on difficulty and remaining attempts
 */
const calculateScore = (difficulty, remainingAttempts) => {
  let basePoints = 10;
  let bonusMultiplier = 5;

  if (difficulty === 'medium') {
    basePoints = 20;
    bonusMultiplier = 7;
  } else if (difficulty === 'hard') {
    basePoints = 30;
    bonusMultiplier = 10;
  }

  const bonusPoints = remainingAttempts * bonusMultiplier;
  const totalScore = basePoints + bonusPoints;

  return {
    base: basePoints,
    bonus: bonusPoints,
    total: totalScore
  };
};

/**
 * Start a new game
 */
const startNewGame = async ({ username, category, difficulty }) => {
  const chosenDifficulty = ['easy', 'medium', 'hard'].includes(difficulty?.toLowerCase())
    ? difficulty.toLowerCase()
    : 'medium';

  const cleanCategory = (category || 'general').toLowerCase();
  const wordObj = getRandomWord(cleanCategory, chosenDifficulty);
  const targetWord = wordObj.word.toUpperCase();
  const hint = wordObj.hint;

  const gameData = {
    playerId: username.toLowerCase().trim(),
    username: username.trim(),
    word: targetWord,
    hint: hint,
    category: cleanCategory,
    difficulty: chosenDifficulty,
    guessedLetters: [],
    remainingAttempts: 6,
    maxAttempts: 6,
    status: 'in_progress',
    won: false,
    score: 0,
    scoreBreakdown: { base: 0, bonus: 0 }
  };

  if (isMongoConnected() && Game.create) {
    try {
      const game = await Game.create(gameData);
      return game.getPublicState();
    } catch (e) {
      console.warn('MongoDB create fallback:', e.message);
    }
  }

  // In-memory active game creation
  const mockId = 'gm_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const mockGame = {
    _id: mockId,
    ...gameData,
    createdAt: new Date(),
    updatedAt: new Date(),
    getMaskedWord() {
      return this.word
        .split('')
        .map((c) => (/[A-Z]/.test(c) ? (this.guessedLetters.includes(c) ? c : '_') : c))
        .join('');
    },
    getPublicState() {
      const isFinished = this.status !== 'in_progress';
      return {
        gameId: this._id,
        playerId: this.playerId,
        username: this.username,
        category: this.category,
        difficulty: this.difficulty,
        hint: this.hint,
        maskedWord: this.getMaskedWord(),
        wordLength: this.word.length,
        guessedLetters: this.guessedLetters,
        remainingAttempts: this.remainingAttempts,
        maxAttempts: this.maxAttempts,
        status: this.status,
        won: this.won,
        score: this.score,
        scoreBreakdown: this.scoreBreakdown,
        createdAt: this.createdAt,
        word: isFinished ? this.word : undefined
      };
    }
  };
  memoryStore.games.set(mockId, mockGame);
  return mockGame.getPublicState();
};

/**
 * Process a letter guess for a game
 */
const processGuess = async (gameId, letter) => {
  const cleanLetter = String(letter).toUpperCase().trim();

  // Validate single alphabetic letter
  if (!cleanLetter || cleanLetter.length !== 1 || !/[A-Z]/.test(cleanLetter)) {
    throw { status: 400, message: 'Invalid guess. Please submit a single letter between A-Z.' };
  }

  let game;
  if (isMongoConnected() && Game.findById) {
    try {
      game = await Game.findById(gameId);
    } catch (e) {
      game = memoryStore.games.get(gameId);
    }
  } else {
    game = memoryStore.games.get(gameId);
  }

  if (!game) {
    throw { status: 404, message: 'Game session not found. Please start a new game.' };
  }

  // Check if game is still active
  if (game.status !== 'in_progress') {
    throw {
      status: 400,
      message: `Game is already ${game.status.toUpperCase()}. Please restart to play again.`
    };
  }

  // Prevent duplicate letter guess
  if (game.guessedLetters.includes(cleanLetter)) {
    throw {
      status: 400,
      message: `Letter '${cleanLetter}' has already been guessed. Pick another letter.`
    };
  }

  // Add letter to guessed list
  game.guessedLetters.push(cleanLetter);

  // Check if letter exists in the target word
  const isCorrect = game.word.includes(cleanLetter);
  if (!isCorrect) {
    game.remainingAttempts = Math.max(0, game.remainingAttempts - 1);
  }

  // Check win condition: all unique letters of word have been guessed
  const uniqueWordLetters = [...new Set(game.word.split('').filter((c) => /[A-Z]/.test(c)))];
  const isWon = uniqueWordLetters.every((c) => game.guessedLetters.includes(c));

  if (isWon) {
    game.status = 'won';
    game.won = true;
    const scoreData = calculateScore(game.difficulty, game.remainingAttempts);
    game.score = scoreData.total;
    game.scoreBreakdown = {
      base: scoreData.base,
      bonus: scoreData.bonus
    };
  } else if (game.remainingAttempts <= 0) {
    game.status = 'lost';
    game.won = false;
    game.score = 0;
    game.scoreBreakdown = { base: 0, bonus: 0 };
  }

  // Save game state
  if (isMongoConnected() && game.save) {
    await game.save();
    if (game.status !== 'in_progress') {
      await updatePlayerAndLeaderboard(game);
    }
  } else {
    game.updatedAt = new Date();
    memoryStore.games.set(gameId, game);
    if (game.status !== 'in_progress') {
      updateInMemoryPlayerAndLeaderboard(game);
    }
  }

  return {
    ...game.getPublicState(),
    guessResult: {
      letter: cleanLetter,
      isCorrect,
      remainingAttempts: game.remainingAttempts
    }
  };
};

/**
 * Retrieve current game state
 */
const getGameById = async (gameId) => {
  let game;
  if (isMongoConnected() && Game.findById) {
    try {
      game = await Game.findById(gameId);
    } catch (e) {
      game = memoryStore.games.get(gameId);
    }
  } else {
    game = memoryStore.games.get(gameId);
  }

  if (!game) {
    throw { status: 404, message: 'Game not found.' };
  }

  return game.getPublicState();
};

/**
 * Restart game with same player, category and difficulty
 */
const restartGameById = async (gameId) => {
  let existingGame;
  if (isMongoConnected() && Game.findById) {
    try {
      existingGame = await Game.findById(gameId);
    } catch (e) {
      existingGame = memoryStore.games.get(gameId);
    }
  } else {
    existingGame = memoryStore.games.get(gameId);
  }

  if (!existingGame) {
    throw { status: 404, message: 'Game to restart not found.' };
  }

  return await startNewGame({
    username: existingGame.username,
    category: existingGame.category,
    difficulty: existingGame.difficulty
  });
};

/**
 * Update Player stats and Leaderboard in MongoDB
 */
const updatePlayerAndLeaderboard = async (game) => {
  try {
    const username = game.username;
    const playerId = game.playerId;
    const won = game.won;
    const score = game.score;

    let player = await Player.findOne({ username: playerId });
    if (!player) {
      player = new Player({
        username: playerId,
        displayName: username
      });
    }

    player.updateGameStats(won, score);
    await player.save();

    // Update Leaderboard
    let lb = await Leaderboard.findOne({ username: playerId });
    if (!lb) {
      lb = new Leaderboard({
        username: playerId,
        displayName: username,
        score: player.highestScore,
        gamesPlayed: player.totalGames,
        wins: player.totalWins,
        winPercentage: player.winPercentage,
        bestStreak: player.bestStreak
      });
    } else {
      if (player.highestScore > lb.score) {
        lb.score = player.highestScore;
      }
      lb.gamesPlayed = player.totalGames;
      lb.wins = player.totalWins;
      lb.winPercentage = player.winPercentage;
      lb.bestStreak = player.bestStreak;
    }
    await lb.save();
  } catch (err) {
    console.error('Error updating MongoDB stats:', err.message);
  }
};

/**
 * Update in-memory Player stats and Leaderboard
 */
const updateInMemoryPlayerAndLeaderboard = (game) => {
  const username = game.username;
  const playerId = game.playerId;
  const won = game.won;
  const score = game.score;

  let player = memoryStore.players.get(playerId) || {
    username: playerId,
    displayName: username,
    totalGames: 0,
    totalWins: 0,
    totalLosses: 0,
    winPercentage: 0,
    currentStreak: 0,
    bestStreak: 0,
    highestScore: 0,
    totalScore: 0,
    createdAt: new Date()
  };

  player.totalGames += 1;
  player.totalScore += score;
  if (won) {
    player.totalWins += 1;
    player.currentStreak += 1;
    if (player.currentStreak > player.bestStreak) {
      player.bestStreak = player.currentStreak;
    }
    if (score > player.highestScore) {
      player.highestScore = score;
    }
  } else {
    player.totalLosses += 1;
    player.currentStreak = 0;
  }
  player.winPercentage = Math.round((player.totalWins / player.totalGames) * 100);
  memoryStore.players.set(playerId, player);

  // Leaderboard entry
  let lb = memoryStore.leaderboards.get(playerId) || {
    username: playerId,
    displayName: username,
    score: 0,
    gamesPlayed: 0,
    wins: 0,
    winPercentage: 0,
    bestStreak: 0,
    createdAt: new Date()
  };

  if (player.highestScore > lb.score) {
    lb.score = player.highestScore;
  }
  lb.gamesPlayed = player.totalGames;
  lb.wins = player.totalWins;
  lb.winPercentage = player.winPercentage;
  lb.bestStreak = player.bestStreak;
  memoryStore.leaderboards.set(playerId, lb);
};

/**
 * Fetch leaderboard ranking
 */
const getLeaderboardList = async (limit = 25) => {
  if (isMongoConnected() && Leaderboard.find) {
    try {
      return await Leaderboard.find()
        .sort({ score: -1, winPercentage: -1, wins: -1 })
        .limit(limit)
        .lean();
    } catch (e) {}
  }

  const list = Array.from(memoryStore.leaderboards.values());
  list.sort((a, b) => b.score - a.score || b.winPercentage - a.winPercentage || b.wins - a.wins);
  return list.slice(0, limit);
};

/**
 * Fetch stats for a specific player
 */
const getPlayerStatsByUsername = async (username) => {
  const cleanId = String(username).toLowerCase().trim();

  if (isMongoConnected() && Player.findOne) {
    try {
      const player = await Player.findOne({ username: cleanId }).lean();
      if (player) return player;
    } catch (e) {}
  }

  const player = memoryStore.players.get(cleanId);
  if (player) return player;

  return {
    username: cleanId,
    displayName: username,
    totalGames: 0,
    totalWins: 0,
    totalLosses: 0,
    winPercentage: 0,
    currentStreak: 0,
    bestStreak: 0,
    highestScore: 0,
    totalScore: 0,
    isNewPlayer: true
  };
};

/**
 * Fetch global aggregated stats across all games
 */
const getGlobalStatistics = async () => {
  if (isMongoConnected() && Game.countDocuments) {
    try {
      const totalGamesCount = await Game.countDocuments();
      const totalWonCount = await Game.countDocuments({ won: true });
      const totalPlayersCount = await Player.countDocuments();

      return {
        totalGamesPlayed: totalGamesCount,
        totalWins: totalWonCount,
        totalPlayers: totalPlayersCount,
        globalWinRate:
          totalGamesCount > 0 ? Math.round((totalWonCount / totalGamesCount) * 100) : 0
      };
    } catch (e) {}
  }

  const games = Array.from(memoryStore.games.values());
  const totalGamesCount = games.length;
  const totalWonCount = games.filter((g) => g.won).length;
  const totalPlayersCount = memoryStore.players.size;

  return {
    totalGamesPlayed: totalGamesCount,
    totalWins: totalWonCount,
    totalPlayers: totalPlayersCount,
    globalWinRate: totalGamesCount > 0 ? Math.round((totalWonCount / totalGamesCount) * 100) : 0
  };
};

module.exports = {
  startNewGame,
  processGuess,
  getGameById,
  restartGameById,
  getLeaderboardList,
  getPlayerStatsByUsername,
  getGlobalStatistics,
  calculateScore
};
