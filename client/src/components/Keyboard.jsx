import React, { useEffect } from 'react';

/**
 * Keyboard - Interactive On-Screen & Physical QWERTY Keyboard
 * Layout:
 * Row 1: Q W E R T Y U I O P
 * Row 2: A S D F G H J K L
 * Row 3: Z X C V B N M
 */
const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export default function Keyboard({
  guessedLetters = [],
  correctLetters = [],
  disabled = false,
  onGuess
}) {
  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (disabled) return;
      // Ignore if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        if (!guessedLetters.includes(key)) {
          onGuess(key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, guessedLetters, onGuess]);

  return (
    <div className="keyboard-container" aria-label="On-Screen Keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="keyboard-row">
          {row.map((letter) => {
            const isGuessed = guessedLetters.includes(letter);
            const isCorrect = isGuessed && correctLetters.includes(letter);
            const isIncorrect = isGuessed && !correctLetters.includes(letter);

            let statusClass = '';
            if (isCorrect) statusClass = 'correct';
            else if (isIncorrect) statusClass = 'incorrect';

            return (
              <button
                key={letter}
                type="button"
                className={`key-btn ${statusClass}`}
                disabled={disabled || isGuessed}
                onClick={() => onGuess(letter)}
                aria-label={`Letter ${letter}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
