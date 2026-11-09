const gameService = require('../services/gameService');

/**
 * @desc    Get top players on the leaderboard
 * @route   GET /api/leaderboard
 * @access  Public
 */
const getLeaderboard = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 25;
    const leaderboard = await gameService.getLeaderboardList(limit);

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      data: leaderboard
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeaderboard
};
