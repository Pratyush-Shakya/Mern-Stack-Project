import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Play,
  User,
  Layers,
  Zap,
  HelpCircle,
  Trophy,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import CategorySelector from '../components/CategorySelector';
import DifficultySelector from '../components/DifficultySelector';
import { startGameAPI } from '../services/api';
import { soundManager } from '../utils/audio';

export default function Home() {
  const navigate = useNavigate();

  // Load saved username or generate default
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('hangman_player_name') || 'Player1';
  });
  const [category, setCategory] = useState('programming');
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('hangman_player_name', username);
  }, [username]);

  const handleStartGame = async (e) => {
    e?.preventDefault();
    if (!username.trim()) {
      setErrorMessage('Please enter a username to start playing!');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    soundManager.playClick();

    try {
      const response = await startGameAPI(username.trim(), category, difficulty);
      if (response.success && response.data) {
        // Save game ID in session/local storage
        sessionStorage.setItem('current_hangman_game_id', response.data.gameId);
        navigate('/game', { state: { initialGame: response.data } });
      } else {
        setErrorMessage(response.message || 'Failed to start game. Please try again.');
      }
    } catch (err) {
      console.error('Error starting game:', err);
      setErrorMessage(
        err.response?.data?.message ||
          'Could not reach server. Please check backend server connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <span>Full MERN Stack Web Application</span>
        </div>
        <h1 className="hero-title">HANGMAN GAME</h1>
        <p className="hero-subtitle">
          Test your vocabulary. Challenge your mind. Beat the Hangman!
        </p>
      </section>

      {/* Main Setup & How-To Grid */}
      <div className="setup-grid">
        {/* Game Configuration Panel */}
        <div className="glass-panel setup-card">
          <form onSubmit={handleStartGame}>
            {/* Username Input */}
            <div className="input-group">
              <label className="input-label" htmlFor="username">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={16} /> Player Username
                </span>
              </label>
              <input
                id="username"
                type="text"
                className="input-field"
                placeholder="Enter your gamer tag (e.g., CodeNinja)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={20}
                required
              />
            </div>

            {/* Category Selector */}
            <div className="input-group">
              <label className="input-label">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={16} /> Select Category
                </span>
              </label>
              <CategorySelector
                selectedCategory={category}
                onSelect={(cat) => {
                  soundManager.playClick();
                  setCategory(cat);
                }}
              />
            </div>

            {/* Difficulty Selector */}
            <div className="input-group">
              <label className="input-label">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Zap size={16} /> Select Difficulty
                </span>
              </label>
              <DifficultySelector
                selectedDifficulty={difficulty}
                onSelect={(diff) => {
                  soundManager.playClick();
                  setDifficulty(diff);
                }}
              />
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.8rem 1rem',
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  borderRadius: '12px',
                  color: '#FDA4AF',
                  fontSize: '0.9rem',
                  marginBottom: '1.5rem'
                }}
              >
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Start Game Action */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={loading}
            >
              <Play size={22} fill="currentColor" />
              <span>{loading ? 'Starting Game...' : 'START GAME'}</span>
            </button>
          </form>
        </div>

        {/* How to Play & Quick Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel how-to-play-card" style={{ flex: 1 }}>
            <div>
              <div className="section-label">
                <HelpCircle size={20} color="var(--accent-theme)" />
                <span>How to Play</span>
              </div>

              <div className="rule-item">
                <div className="rule-icon">1</div>
                <div className="rule-text">
                  <h4>Guess The Hidden Word</h4>
                  <p>A random word from your selected category is concealed behind underscores.</p>
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-icon">2</div>
                <div className="rule-text">
                  <h4>Type or Click Letters</h4>
                  <p>Submit one letter at a time using your physical keyboard or the on-screen keys.</p>
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-icon">3</div>
                <div className="rule-text">
                  <h4>Watch Your Attempts</h4>
                  <p>You have 6 incorrect attempts before the Hangman is fully drawn and the game ends.</p>
                </div>
              </div>

              <div className="rule-item">
                <div className="rule-icon">4</div>
                <div className="rule-text">
                  <h4>Earn Bonus Points</h4>
                  <p>Higher difficulties grant more points, plus bonus score for unused attempts!</p>
                </div>
              </div>
            </div>

            {/* Quick Action Pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--surface-border)'
              }}
            >
              <Link to="/leaderboard" className="btn btn-secondary" style={{ padding: '0.7rem' }}>
                <Trophy size={18} color="#F59E0B" />
                <span style={{ fontSize: '0.9rem' }}>Leaderboard</span>
              </Link>
              <Link to="/stats" className="btn btn-secondary" style={{ padding: '0.7rem' }}>
                <BarChart3 size={18} color="#06B6D4" />
                <span style={{ fontSize: '0.9rem' }}>Player Stats</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
