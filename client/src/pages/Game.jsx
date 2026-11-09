import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Heart,
  RotateCcw,
  Home,
  Flag,
  HelpCircle,
  Sparkles,
  Layers,
  Zap,
  Award,
  AlertCircle
} from 'lucide-react';
import HangmanDrawing from '../components/HangmanDrawing';
import WordDisplay from '../components/WordDisplay';
import Keyboard from '../components/Keyboard';
import GameResultModal from '../components/GameResultModal';
import { submitGuessAPI, getGameAPI, restartGameAPI, startGameAPI } from '../services/api';
import { soundManager } from '../utils/audio';

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();

  const [game, setGame] = useState(location.state?.initialGame || null);
  const [loading, setLoading] = useState(!game);
  const [guessLoading, setGuessLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [revealedWordOnLoss, setRevealedWordOnLoss] = useState('');

  const gameId = game?.gameId || sessionStorage.getItem('current_hangman_game_id');

  // Fetch game state on mount if not in location state
  useEffect(() => {
    if (!game && gameId) {
      setLoading(true);
      getGameAPI(gameId)
        .then((res) => {
          if (res.success && res.data) {
            setGame(res.data);
          } else {
            navigate('/');
          }
        })
        .catch(() => navigate('/'))
        .finally(() => setLoading(false));
    } else if (!game && !gameId) {
      navigate('/');
    }
  }, [game, gameId, navigate]);

  // Handle letter guess
  const handleGuess = useCallback(
    async (letter) => {
      if (!game || game.status !== 'in_progress' || guessLoading) return;
      if (game.guessedLetters.includes(letter)) return;

      setGuessLoading(true);
      setErrorMessage('');

      try {
        const response = await submitGuessAPI(game.gameId, letter);
        if (response.success && response.data) {
          const updatedGame = response.data;
          setGame(updatedGame);

          // Audio and visual feedback
          if (updatedGame.guessResult?.isCorrect) {
            soundManager.playCorrect();
          } else {
            soundManager.playIncorrect();
            // Trigger visual shake on error
            setShake(true);
            setTimeout(() => setShake(false), 450);
          }

          // If game lost, record revealed word
          if (updatedGame.status === 'lost' && updatedGame.word) {
            setRevealedWordOnLoss(updatedGame.word);
          }
        }
      } catch (err) {
        console.error('Error submitting guess:', err);
        const errMsg = err.response?.data?.message || 'Error submitting letter guess.';
        setErrorMessage(errMsg);
      } finally {
        setGuessLoading(false);
      }
    },
    [game, guessLoading]
  );

  // Restart game with same settings
  const handleRestart = async () => {
    if (!game) return;
    soundManager.playClick();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await restartGameAPI(game.gameId);
      if (response.success && response.data) {
        setGame(response.data);
        sessionStorage.setItem('current_hangman_game_id', response.data.gameId);
        setRevealedWordOnLoss('');
      }
    } catch (err) {
      console.error('Error restarting game:', err);
      // Fallback: start new game with same parameters
      try {
        const fallbackRes = await startGameAPI(game.username, game.category, game.difficulty);
        if (fallbackRes.success) {
          setGame(fallbackRes.data);
          sessionStorage.setItem('current_hangman_game_id', fallbackRes.data.gameId);
        }
      } catch (e) {
        setErrorMessage('Failed to restart game.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Give up / surrender
  const handleGiveUp = async () => {
    if (!game || game.status !== 'in_progress') return;
    const confirmSurrender = window.confirm('Are you sure you want to surrender this round?');
    if (!confirmSurrender) return;

    soundManager.playLoss();
    // Simulate losing by making incorrect guesses or fetching revealed word
    setGame((prev) => ({
      ...prev,
      status: 'lost',
      won: false,
      remainingAttempts: 0
    }));
  };

  if (loading || !game) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 0' }}>
        <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
          Loading game session...
        </div>
      </div>
    );
  }

  const remainingAttempts = game.remainingAttempts ?? 6;
  const incorrectGuesses = 6 - remainingAttempts;
  const isWon = game.status === 'won';
  const isLost = game.status === 'lost';
  const isGameOver = isWon || isLost;

  // Letters that are correct
  const correctLetters = game.guessedLetters.filter((letter) =>
    game.maskedWord.includes(letter)
  );

  return (
    <div>
      {/* Top Status Bar */}
      <div className="glass-panel game-top-bar">
        {/* Player Profile */}
        <div className="player-info-badge">
          <div className="player-avatar">
            {game.username ? game.username.substring(0, 2).toUpperCase() : 'P1'}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#FFF' }}>
              {game.username}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Active Player
            </div>
          </div>
        </div>

        {/* Status Pills */}
        <div className="game-stat-pills">
          {/* Category */}
          <div className="stat-pill" style={{ textTransform: 'capitalize' }}>
            <Layers size={16} color="var(--accent-theme)" />
            <span>{game.category}</span>
          </div>

          {/* Difficulty */}
          <div className="stat-pill" style={{ textTransform: 'capitalize' }}>
            <Zap size={16} color="#F59E0B" />
            <span>{game.difficulty}</span>
          </div>

          {/* Hearts / Attempts Remaining */}
          <div className="stat-pill hearts">
            <Heart size={16} className="heart-active" />
            <span>{remainingAttempts} / 6 Attempts</span>
          </div>

          {/* Current Score */}
          <div className="stat-pill score">
            <Award size={16} />
            <span>Score: {game.score || 0}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-secondary"
            onClick={handleRestart}
            title="Restart Game"
            style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
          >
            <RotateCcw size={16} />
            <span>Restart</span>
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            title="Return to Menu"
            style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
          >
            <Home size={16} />
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Main Game Arena */}
      <div className={`game-layout ${shake ? 'shake-animation' : ''}`}>
        {/* Left Column: Hangman Illustration */}
        <div className="glass-panel hangman-visual-panel">
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}
          >
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              THE GALLOWS
            </span>
            <span
              style={{
                fontSize: '0.8rem',
                color: remainingAttempts <= 2 ? 'var(--accent-rose)' : 'var(--text-secondary)'
              }}
            >
              {incorrectGuesses} of 6 mistakes
            </span>
          </div>

          {/* SVG Visual */}
          <HangmanDrawing
            incorrectGuesses={incorrectGuesses}
            isWon={isWon}
            isLost={isLost}
          />

          {/* Heart icons row */}
          <div className="remaining-hearts">
            {[...Array(6)].map((_, i) => (
              <Heart
                key={`heart-${i}`}
                size={22}
                className={i < remainingAttempts ? 'heart-icon heart-active' : 'heart-icon heart-spent'}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Word Slots & Virtual Keyboard */}
        <div>
          {/* Word Display Panel */}
          <div className="glass-panel word-display-panel">
            {/* Clue / Hint Pill */}
            {game.hint && (
              <div className="word-hint-box">
                <HelpCircle size={15} />
                <span>Clue: {game.hint}</span>
              </div>
            )}

            {/* Letter Cards / Underscores */}
            <WordDisplay
              maskedWord={game.maskedWord}
              revealedWord={revealedWordOnLoss || game.word}
              isLost={isLost}
            />

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Word length: {game.wordLength || game.maskedWord?.length || 0} letters
            </div>
          </div>

          {/* Error Message Toast */}
          {errorMessage && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                borderRadius: '12px',
                color: '#FDA4AF',
                fontSize: '0.85rem',
                marginBottom: '1rem'
              }}
            >
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Virtual Keyboard */}
          <div className="glass-panel" style={{ padding: '1.5rem 1rem' }}>
            <Keyboard
              guessedLetters={game.guessedLetters || []}
              correctLetters={correctLetters}
              disabled={isGameOver || guessLoading}
              onGuess={handleGuess}
            />
          </div>
        </div>
      </div>

      {/* Game Result Modal (Victory or Game Over) */}
      {isGameOver && (
        <GameResultModal
          status={game.status}
          revealedWord={game.word || revealedWordOnLoss}
          score={game.score}
          scoreBreakdown={game.scoreBreakdown}
          remainingAttempts={remainingAttempts}
          onPlayAgain={handleRestart}
          onReturnHome={() => navigate('/')}
        />
      )}
    </div>
  );
}
