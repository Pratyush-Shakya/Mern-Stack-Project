/**
 * Rate Limiting Middleware
 * Protects endpoints from brute-force spamming.
 */
let rateLimit;
try {
  rateLimit = require('express-rate-limit');
} catch (e) {
  // Graceful fallback if dependency is loading
  rateLimit = null;
}

const apiLimiter = rateLimit
  ? rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 300, // Limit each IP to 300 requests per 15 mins
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        message: 'Too many requests from this IP. Please try again after 15 minutes.'
      }
    })
  : (req, res, next) => next();

const guessLimiter = rateLimit
  ? rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 120, // 120 guesses per minute
      message: {
        success: false,
        message: 'Guessing too fast! Please slow down.'
      }
    })
  : (req, res, next) => next();

module.exports = {
  apiLimiter,
  guessLimiter
};
