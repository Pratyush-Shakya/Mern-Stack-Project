const gameService = require('../services/gameService');

/**
 * @desc    Start a new Hangman game
 * @route   POST /api/game/start
 * @access  Public
 */
const startGame = async (req, res, next) => {
  try {
    const { username, category, difficulty } = req.body;

    if (!username || typeof username !== 'string' || !username.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid player username.'
      });
    }

    const gameState = await gameService.startNewGame({
      username: username.trim(),
      category: category || 'general',
      difficulty: difficulty || 'medium'
    });

    res.status(201).json({
      success: true,
      message: 'New game started successfully.',
      data: gameState
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit a letter guess
 * @route   POST /api/game/guess
 * @access  Public
 */
const submitGuess = async (req, res, next) => {
  try {
    const { gameId, letter } = req.body;

    if (!gameId) {
      return res.status(400).json({
        success: false,
        message: 'Game ID is required to submit a guess.'
      });
    }

    if (!letter || typeof letter !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'A single letter guess is required.'
      });
    }

    const updatedGame = await gameService.processGuess(gameId, letter);

    res.status(200).json({
      success: true,
      message: updatedGame.guessResult.isCorrect ? 'Correct guess!' : 'Incorrect guess!',
      data: updatedGame
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Retrieve game state by ID
 * @route   GET /api/game/:id
 * @access  Public
 */
const getGameState = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Game ID parameter is required.'
      });
    }

    const gameState = await gameService.getGameById(id);

    res.status(200).json({
      success: true,
      data: gameState
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Restart an existing game
 * @route   POST /api/game/restart/:id
 * @access  Public
 */
const restartGame = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Game ID is required to restart.'
      });
    }

    const newGameState = await gameService.restartGameById(id);

    res.status(201).json({
      success: true,
      message: 'Game restarted with new word.',
      data: newGameState
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Manually surrender / finish game
 * @route   POST /api/game/finish
 * @access  Public
 */
const finishGame = async (req, res, next) => {
  try {
    const { gameId } = req.body;

    if (!gameId) {
      return res.status(400).json({
        success: false,
        message: 'Game ID is required.'
      });
    }

    const game = await gameService.getGameById(gameId);
    res.status(200).json({
      success: true,
      message: 'Game finished.',
      data: game
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  startGame,
  submitGuess,
  getGameState,
  restartGame,
  finishGame
};
