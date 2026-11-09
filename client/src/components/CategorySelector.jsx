import React from 'react';
import {
  PawPrint,
  Cpu,
  Code2,
  Utensils,
  Trophy,
  Globe2,
  Sparkles
} from 'lucide-react';

const CATEGORIES = [
  { id: 'animals', name: 'Animals', icon: PawPrint },
  { id: 'technology', name: 'Technology', icon: Cpu },
  { id: 'programming', name: 'Programming', icon: Code2 },
  { id: 'food', name: 'Food', icon: Utensils },
  { id: 'sports', name: 'Sports', icon: Trophy },
  { id: 'countries', name: 'Countries', icon: Globe2 },
  { id: 'general', name: 'General', icon: Sparkles }
];

export default function CategorySelector({ selectedCategory, onSelect }) {
  return (
    <div className="category-grid">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            className={`category-pill ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(cat.id)}
          >
            <Icon size={20} color={isSelected ? 'var(--accent-theme)' : '#94A3B8'} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
