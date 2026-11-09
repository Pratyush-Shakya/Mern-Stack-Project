/**
 * Request Validation Middleware Helpers
 */

const validateStartGame = (req, res, next) => {
  const { username, category, difficulty } = req.body;

  if (!username || typeof username !== 'string' || !username.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Username is required and must be non-empty.'
    });
  }

  if (username.trim().length > 30) {
    return res.status(400).json({
      success: false,
      message: 'Username cannot exceed 30 characters.'
    });
  }

  const validDifficulties = ['easy', 'medium', 'hard'];
  if (difficulty && !validDifficulties.includes(difficulty.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: `Invalid difficulty. Allowed values: ${validDifficulties.join(', ')}`
    });
  }

  next();
};

const validateGuess = (req, res, next) => {
  const { gameId, letter } = req.body;

  if (!gameId) {
    return res.status(400).json({
      success: false,
      message: 'gameId is required.'
    });
  }

  if (!letter || typeof letter !== 'string' || letter.trim().length !== 1) {
    return res.status(400).json({
      success: false,
      message: 'Letter must be a single alphabetic character.'
    });
  }

  if (!/^[a-zA-Z]$/.test(letter.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Guessed letter must be an English alphabet letter (A-Z).'
    });
  }

  next();
};

module.exports = {
  validateStartGame,
  validateGuess
};
