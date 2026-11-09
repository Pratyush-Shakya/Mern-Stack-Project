/**
 * API Service for Hangman Client
 * Manages all HTTP REST API calls to the Express backend.
 */

import axios from 'axios';

// Base API URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Start a new game
 */
export const startGameAPI = async (username, category, difficulty) => {
  const response = await api.post('/api/game/start', {
    username,
    category,
    difficulty,
  });
  return response.data;
};

/**
 * Submit a single letter guess
 */
export const submitGuessAPI = async (gameId, letter) => {
  const response = await api.post('/api/game/guess', {
    gameId,
    letter,
  });
  return response.data;
};

/**
 * Get game state by ID
 */
export const getGameAPI = async (gameId) => {
  const response = await api.get(`/api/game/${gameId}`);
  return response.data;
};

/**
 * Restart game with same settings
 */
export const restartGameAPI = async (gameId) => {
  const response = await api.post(`/api/game/restart/${gameId}`);
  return response.data;
};

/**
 * Get leaderboard rankings
 */
export const getLeaderboardAPI = async (limit = 25) => {
  const response = await api.get(`/api/leaderboard?limit=${limit}`);
  return response.data;
};

/**
 * Get player statistics
 */
export const getPlayerStatsAPI = async (playerId) => {
  const response = await api.get(`/api/stats/${encodeURIComponent(playerId)}`);
  return response.data;
};

/**
 * Get global statistics summary
 */
export const getGlobalStatsAPI = async () => {
  const response = await api.get('/api/stats/summary/global');
  return response.data;
};

/**
 * Check backend health
 */
export const checkHealthAPI = async () => {
  const response = await api.get('/api/health');
  return response.data;
};

export default api;
