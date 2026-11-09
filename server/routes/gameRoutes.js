const express = require('express');
const router = express.Router();
const {
  startGame,
  submitGuess,
  getGameState,
  restartGame,
  finishGame
} = require('../controllers/gameController');
const { validateStartGame, validateGuess } = require('../middleware/validator');
const { guessLimiter } = require('../middleware/rateLimiter');

// POST /api/game/start - Start a new game
router.post('/start', validateStartGame, startGame);

// POST /api/game/guess - Submit a guessed letter
router.post('/guess', guessLimiter, validateGuess, submitGuess);

// GET /api/game/:id - Retrieve current game state
router.get('/:id', getGameState);

// POST /api/game/restart/:id - Restart game
router.post('/restart/:id', restartGame);

// POST /api/game/finish - Finish / surrender game
router.post('/finish', finishGame);

module.exports = router;
