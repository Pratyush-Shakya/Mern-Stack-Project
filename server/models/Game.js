let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  mongoose = null;
}

if (mongoose && mongoose.Schema) {
  const gameSchema = new mongoose.Schema(
    {
      playerId: {
        type: String,
        required: [true, 'Player ID or Username is required'],
        trim: true,
        index: true
      },
      username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true
      },
      word: {
        type: String,
        required: [true, 'Target word is required'],
        uppercase: true,
        trim: true
      },
      hint: {
        type: String,
        default: ''
      },
      category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        lowercase: true
      },
      difficulty: {
        type: String,
        required: [true, 'Difficulty is required'],
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
      },
      guessedLetters: {
        type: [String],
        default: []
      },
      remainingAttempts: {
        type: Number,
        required: true,
        default: 6,
        min: 0,
        max: 6
      },
      maxAttempts: {
        type: Number,
        default: 6
      },
      status: {
        type: String,
        enum: ['in_progress', 'won', 'lost'],
        default: 'in_progress',
        index: true
      },
      won: {
        type: Boolean,
        default: false
      },
      score: {
        type: Number,
        default: 0
      },
      scoreBreakdown: {
        base: { type: Number, default: 0 },
        bonus: { type: Number, default: 0 }
      }
    },
    {
      timestamps: true
    }
  );

  gameSchema.methods.getMaskedWord = function () {
    return this.word
      .split('')
      .map((char) => {
        if (!/[A-Z]/.test(char)) return char;
        return this.guessedLetters.includes(char) ? char : '_';
      })
      .join('');
  };

  gameSchema.methods.getPublicState = function () {
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
  };

  module.exports = mongoose.model('Game', gameSchema);
} else {
  // Stub for environments before npm install
  module.exports = class MockGameModel {};
}
