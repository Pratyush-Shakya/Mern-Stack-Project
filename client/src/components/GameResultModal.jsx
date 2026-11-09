import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Trophy, Skull, RotateCcw, Home, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function GameResultModal({
  status,
  revealedWord,
  score = 0,
  scoreBreakdown = { base: 0, bonus: 0 },
  remainingAttempts = 0,
  onPlayAgain,
  onReturnHome
}) {
  const navigate = useNavigate();
  const isWon = status === 'won';

  useEffect(() => {
    if (isWon) {
      soundManager.playWin();
      // Confetti explosion
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      soundManager.playLoss();
    }
  }, [isWon]);

  return (
    <div className="modal-backdrop">
      <div className={`glass-panel modal-card ${isWon ? 'glass-panel-glow' : ''}`}>
        {/* Result Icon */}
        <div className={`result-icon-wrapper ${isWon ? 'win' : 'lose'}`}>
          {isWon ? <Trophy size={42} /> : <Skull size={42} />}
        </div>

        {/* Heading */}
        <h2 className="result-title" style={{ color: isWon ? '#34D399' : '#FB7185' }}>
          {isWon ? 'VICTORY!' : 'GAME OVER!'}
        </h2>
        <p className="result-subtitle">
          {isWon
            ? 'Incredible! You beat the Hangman and saved the day!'
            : 'The Hangman got you this time! Keep practicing!'}
        </p>

        {/* Secret Word Revealed */}
        <div className="word-reveal-box">
          <div className="word-reveal-label">The Secret Word Was</div>
          <div className="word-reveal-text">{revealedWord || 'UNKNOWN'}</div>
        </div>

        {/* Score Breakdown (if Won) */}
        {isWon && (
          <div className="score-breakdown-grid">
            <div className="score-box">
              <div className="score-val">{scoreBreakdown.base || 0}</div>
              <div className="score-lbl">Base Points</div>
            </div>
            <div className="score-box">
              <div className="score-val" style={{ color: '#38BDF8' }}>
                +{scoreBreakdown.bonus || 0}
              </div>
              <div className="score-lbl">Attempts Bonus</div>
            </div>
            <div className="score-box" style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: '#10B981' }}>
              <div className="score-val" style={{ color: '#34D399' }}>{score}</div>
              <div className="score-lbl">Total Score</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onReturnHome}>
            <Home size={18} />
            <span>Home</span>
          </button>

          <button className="btn btn-primary" onClick={onPlayAgain}>
            <RotateCcw size={18} />
            <span>Play Again</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              soundManager.playClick();
              navigate('/leaderboard');
            }}
          >
            <Award size={18} />
            <span>Ranks</span>
          </button>
        </div>
      </div>
    </div>
  );
}
