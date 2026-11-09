import React from 'react';

/**
 * WordDisplay - Renders the hidden or revealed word
 * Each letter is displayed in an individual glowing card/slot.
 */
export default function WordDisplay({ maskedWord = '', revealedWord = '', isLost = false }) {
  // If game is lost and revealedWord is provided, show full word marking missed letters
  const displayLetters = isLost && revealedWord ? revealedWord.split('') : maskedWord.split('');

  return (
    <div className="letters-slot-row">
      {displayLetters.map((char, index) => {
        // Handle space characters
        if (char === ' ') {
          return (
            <div
              key={`space-${index}`}
              style={{ width: '20px', height: '64px' }}
              aria-hidden="true"
            />
          );
        }

        const isRevealed = char !== '_';
        const wasMissedOnLoss = isLost && isRevealed && maskedWord[index] === '_';

        return (
          <div
            key={`char-${index}`}
            className={`letter-slot ${isRevealed ? 'revealed' : ''} ${
              wasMissedOnLoss ? 'lost-reveal' : ''
            }`}
          >
            {isRevealed ? char : ''}
          </div>
        );
      })}
    </div>
  );
}
