let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  mongoose = null;
}

if (mongoose && mongoose.Schema) {
  const leaderboardSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
      },
      displayName: {
        type: String,
        trim: true
      },
      score: {
        type: Number,
        required: true,
        default: 0,
        index: -1
      },
      gamesPlayed: {
        type: Number,
        required: true,
        default: 0
      },
      wins: {
        type: Number,
        required: true,
        default: 0
      },
      winPercentage: {
        type: Number,
        required: true,
        default: 0
      },
      bestStreak: {
        type: Number,
        default: 0
      }
    },
    {
      timestamps: true
    }
  );

  module.exports = mongoose.model('Leaderboard', leaderboardSchema);
} else {
  module.exports = class MockLeaderboardModel {};
}
