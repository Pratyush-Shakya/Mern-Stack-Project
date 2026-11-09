import React from 'react';

/**
 * HangmanDrawing - Responsive Vector Graphic with Dynamic Theme Glow
 * Progressively renders the hangman figure based on incorrect guesses (0 to 6).
 */
export default function HangmanDrawing({ incorrectGuesses = 0, isWon = false, isLost = false }) {
  const gallowsColor = '#475569';
  const ropeColor = '#F59E0B';
  const figureColor = isWon ? '#10B981' : isLost ? '#F43F5E' : 'var(--accent-theme)';
  const figureGlow = isWon
    ? 'rgba(16, 185, 129, 0.5)'
    : isLost
    ? 'rgba(244, 63, 94, 0.5)'
    : 'var(--accent-theme-glow)';

  return (
    <div className="hangman-svg-container">
      <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={figureGlow} />
          </filter>
          <linearGradient id="gallowsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-theme)" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>
        </defs>

        {/* ================= GALLOWS STRUCTURE ================= */}
        {/* Base Hill / Platform */}
        <path
          d="M 20 340 L 140 340"
          stroke={gallowsColor}
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Vertical Post */}
        <line
          x1="60"
          y1="340"
          x2="60"
          y2="40"
          stroke="url(#gallowsGrad)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Horizontal Top Beam */}
        <line
          x1="56"
          y1="40"
          x2="210"
          y2="40"
          stroke="url(#gallowsGrad)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Diagonal Brace */}
        <line
          x1="60"
          y1="90"
          x2="110"
          y2="40"
          stroke="var(--accent-theme)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Rope / Noose */}
        <line
          x1="200"
          y1="40"
          x2="200"
          y2="85"
          stroke={ropeColor}
          strokeWidth="4"
          strokeDasharray="3 3"
        />
        {/* Noose Knot */}
        <circle cx="200" cy="85" r="4" fill={ropeColor} />

        {/* ================= HANGMAN BODY PARTS ================= */}

        {/* 1. HEAD (incorrectGuesses >= 1) */}
        {incorrectGuesses >= 1 && (
          <g filter="url(#neon-glow)" style={{ animation: 'fadeIn 0.3s ease-in' }}>
            <circle
              cx="200"
              cy="115"
              r="26"
              stroke={figureColor}
              strokeWidth="5"
              fill="#0F172A"
            />
            {/* Face Expressions */}
            {isLost ? (
              // X eyes and sad mouth
              <>
                <line x1="190" y1="108" x2="196" y2="114" stroke={figureColor} strokeWidth="2.5" />
                <line x1="196" y1="108" x2="190" y2="114" stroke={figureColor} strokeWidth="2.5" />
                <line x1="204" y1="108" x2="210" y2="114" stroke={figureColor} strokeWidth="2.5" />
                <line x1="210" y1="108" x2="204" y2="114" stroke={figureColor} strokeWidth="2.5" />
                <path d="M 193 130 Q 200 123 207 130" stroke={figureColor} strokeWidth="2.5" fill="none" />
              </>
            ) : isWon ? (
              // Smiling happy eyes and smile
              <>
                <path d="M 191 112 Q 194 106 197 112" stroke={figureColor} strokeWidth="2.5" fill="none" />
                <path d="M 203 112 Q 206 106 209 112" stroke={figureColor} strokeWidth="2.5" fill="none" />
                <path d="M 192 124 Q 200 134 208 124" stroke={figureColor} strokeWidth="2.5" fill="none" />
              </>
            ) : (
              // Regular eyes and neutral mouth
              <>
                <circle cx="194" cy="111" r="3" fill={figureColor} />
                <circle cx="206" cy="111" r="3" fill={figureColor} />
                <line
                  x1="195"
                  y1="126"
                  x2="205"
                  y2="126"
                  stroke={figureColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </>
            )}
          </g>
        )}

        {/* 2. BODY (incorrectGuesses >= 2) */}
        {incorrectGuesses >= 2 && (
          <line
            x1="200"
            y1="141"
            x2="200"
            y2="215"
            stroke={figureColor}
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#neon-glow)"
            style={{ animation: 'fadeIn 0.3s ease-in' }}
          />
        )}

        {/* 3. LEFT ARM (incorrectGuesses >= 3) */}
        {incorrectGuesses >= 3 && (
          <line
            x1="200"
            y1="160"
            x2="165"
            y2="195"
            stroke={figureColor}
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#neon-glow)"
            style={{ animation: 'fadeIn 0.3s ease-in' }}
          />
        )}

        {/* 4. RIGHT ARM (incorrectGuesses >= 4) */}
        {incorrectGuesses >= 4 && (
          <line
            x1="200"
            y1="160"
            x2="235"
            y2="195"
            stroke={figureColor}
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#neon-glow)"
            style={{ animation: 'fadeIn 0.3s ease-in' }}
          />
        )}

        {/* 5. LEFT LEG (incorrectGuesses >= 5) */}
        {incorrectGuesses >= 5 && (
          <line
            x1="200"
            y1="215"
            x2="168"
            y2="275"
            stroke={figureColor}
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#neon-glow)"
            style={{ animation: 'fadeIn 0.3s ease-in' }}
          />
        )}

        {/* 6. RIGHT LEG (incorrectGuesses >= 6) */}
        {incorrectGuesses >= 6 && (
          <line
            x1="200"
            y1="215"
            x2="232"
            y2="275"
            stroke={figureColor}
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#neon-glow)"
            style={{ animation: 'fadeIn 0.3s ease-in' }}
          />
        )}
      </svg>
    </div>
  );
}
