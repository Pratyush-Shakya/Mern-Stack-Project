let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  mongoose = null;
}

if (mongoose && mongoose.Schema) {
  const playerSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [2, 'Username must be at least 2 characters long'],
        maxlength: [25, 'Username cannot exceed 25 characters'],
        index: true
      },
      displayName: {
        type: String,
        trim: true
      },
      totalGames: {
        type: Number,
        default: 0,
        min: 0
      },
      totalWins: {
        type: Number,
        default: 0,
        min: 0
      },
      totalLosses: {
        type: Number,
        default: 0,
        min: 0
      },
      winPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      currentStreak: {
        type: Number,
        default: 0,
        min: 0
      },
      bestStreak: {
        type: Number,
        default: 0,
        min: 0
      },
      highestScore: {
        type: Number,
        default: 0,
        min: 0
      },
      totalScore: {
        type: Number,
        default: 0,
        min: 0
      }
    },
    {
      timestamps: true
    }
  );

  playerSchema.methods.updateGameStats = function (won, score) {
    this.totalGames += 1;
    this.totalScore += score || 0;

    if (won) {
      this.totalWins += 1;
      this.currentStreak += 1;
      if (this.currentStreak > this.bestStreak) {
        this.bestStreak = this.currentStreak;
      }
      if (score > this.highestScore) {
        this.highestScore = score;
      }
    } else {
      this.totalLosses += 1;
      this.currentStreak = 0;
    }

    this.winPercentage =
      this.totalGames > 0 ? Math.round((this.totalWins / this.totalGames) * 100) : 0;

    return this;
  };

  module.exports = mongoose.model('Player', playerSchema);
} else {
  module.exports = class MockPlayerModel {};
}
