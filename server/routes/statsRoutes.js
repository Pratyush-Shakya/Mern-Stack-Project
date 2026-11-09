const express = require('express');
const router = express.Router();
const { getPlayerStats, getGlobalStats } = require('../controllers/statsController');

// GET /api/stats/summary/global - Global aggregated metrics
router.get('/summary/global', getGlobalStats);

// GET /api/stats/:playerId - Retrieve player statistics
router.get('/:playerId', getPlayerStats);

module.exports = router;
