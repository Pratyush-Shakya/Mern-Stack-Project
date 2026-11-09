import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <span>Hangman Web Application</span>
          <span style={{ color: 'var(--text-muted)' }}>•</span>
          <span style={{ color: 'var(--accent-theme)' }}>Full Stack Web App</span>
        </div>

        <ul className="footer-links">
          <li>
            <Link to="/" className="footer-link">Play Game</Link>
          </li>
          <li>
            <Link to="/leaderboard" className="footer-link">Leaderboard</Link>
          </li>
          <li>
            <Link to="/stats" className="footer-link">Player Stats</Link>
          </li>
          <li>
            <Link to="/about" className="footer-link">About & Tech Stack</Link>
          </li>
        </ul>

        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Built with MERN Stack (MongoDB, Express, React, Node.js)
        </div>
      </div>
    </footer>
  );
}
