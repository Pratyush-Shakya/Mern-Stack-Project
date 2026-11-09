const gameService = require('../services/gameService');

/**
 * @desc    Get player statistics by username or ID
 * @route   GET /api/stats/:playerId
 * @access  Public
 */
const getPlayerStats = async (req, res, next) => {
  try {
    const { playerId } = req.params;

    if (!playerId || !playerId.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Player ID / Username is required.'
      });
    }

    const stats = await gameService.getPlayerStatsByUsername(playerId);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get global game statistics
 * @route   GET /api/stats/summary/global
 * @access  Public
 */
const getGlobalStats = async (req, res, next) => {
  try {
    const summary = await gameService.getGlobalStatistics();

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlayerStats,
  getGlobalStats
};
