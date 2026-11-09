import React from 'react';
import { ShieldCheck, Zap, Flame } from 'lucide-react';

const DIFFICULTIES = [
  {
    id: 'easy',
    name: 'Easy',
    points: '10 Pts + Bonus',
    desc: 'Common words',
    icon: ShieldCheck,
    color: '#10B981'
  },
  {
    id: 'medium',
    name: 'Medium',
    points: '20 Pts + Bonus',
    desc: 'Moderate challenge',
    icon: Zap,
    color: '#F59E0B'
  },
  {
    id: 'hard',
    name: 'Hard',
    points: '30 Pts + Bonus',
    desc: 'Challenging words',
    icon: Flame,
    color: '#F43F5E'
  }
];

export default function DifficultySelector({ selectedDifficulty, onSelect }) {
  return (
    <div className="difficulty-grid">
      {DIFFICULTIES.map((diff) => {
        const Icon = diff.icon;
        const isSelected = selectedDifficulty === diff.id;
        return (
          <div
            key={diff.id}
            className={`difficulty-card ${isSelected ? `selected ${diff.id}` : ''}`}
            onClick={() => onSelect(diff.id)}
            role="button"
            tabIndex={0}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.4rem' }}>
              <Icon size={24} color={isSelected ? diff.color : '#94A3B8'} />
            </div>
            <div className="difficulty-title" style={{ color: isSelected ? '#FFF' : '#E2E8F0' }}>
              {diff.name}
            </div>
            <div className="difficulty-pts" style={{ color: isSelected ? diff.color : 'var(--text-muted)' }}>
              {diff.points}
            </div>
          </div>
        );
      })}
    </div>
  );
}
