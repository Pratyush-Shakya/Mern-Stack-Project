import React from 'react';
import {
  Code2,
  Database,
  Server,
  Layers,
  ShieldCheck,
  Award,
  Cpu,
  Globe2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">ABOUT HANGMAN GAME</h1>
        <p className="page-subtitle">
          Modern Full Stack MERN Web Application & Interactive Word Game
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Project Introduction */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div className="section-label">
            <Award size={22} color="#F59E0B" />
            <span>Project Overview</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '1.25rem' }}>
            This application is an enterprise-grade, modern, full-stack recreation of the classic
            <strong> Hangman Game</strong>. Designed with a sleek dark gaming UI and
            smooth micro-animations, it bridges interactive frontend engineering with
            secure, authoritative backend server architecture.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38BDF8' }}>
              <CheckCircle2 size={16} /> Authoritative Backend Validation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34D399' }}>
              <CheckCircle2 size={16} /> Anti-Cheat Masked Secret Words
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FBBF24' }}>
              <CheckCircle2 size={16} /> Real-Time Leaderboard & Streaks
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#C084FC' }}>
              <CheckCircle2 size={16} /> Native Web Audio Sound Effects
            </div>
          </div>
        </div>

        {/* MERN Stack Breakdown Cards */}
        <div>
          <div className="section-label" style={{ marginBottom: '1.2rem' }}>
            <Cpu size={22} color="var(--accent-theme)" />
            <span>MERN Stack Architecture</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {/* MongoDB */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <Database size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#FFF' }}>MongoDB</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                NoSQL document database storing completed games, player profiles, win-loss streaks,
                and high-score leaderboards using Mongoose schemas.
              </p>
            </div>

            {/* Express.js */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(148, 163, 184, 0.15)',
                  color: '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <Server size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#FFF' }}>Express.js</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Fast, minimalist Node.js web framework hosting modular REST API routes, input
                sanitization, rate limiters, and error handling middleware.
              </p>
            </div>

            {/* React.js */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  color: '#06B6D4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <Code2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#FFF' }}>React.js (Vite)</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Component-driven frontend using React 19, React Hooks, React Router DOM, dynamic SVG
                drawing animations, and Axios HTTP client.
              </p>
            </div>

            {/* Node.js */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#22C55E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <Layers size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#FFF' }}>Node.js</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                V8 asynchronous JavaScript runtime executing backend services, calculating point
                bonuses, and orchestrating database transactions.
              </p>
            </div>
          </div>
        </div>

        {/* Security & Anti-Cheat System */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div className="section-label">
            <ShieldCheck size={22} color="#06B6D4" />
            <span>Security & Anti-Cheat Architectural Safeguards</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ color: '#FFF', marginBottom: '0.4rem', fontSize: '1rem' }}>
                1. Secret Word Encapsulation
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                The target secret word is strictly kept on the server and masked with underscores.
                Inspection of browser DevTools or Network tabs cannot reveal the answer during an active match.
              </p>
            </div>

            <div>
              <h4 style={{ color: '#FFF', marginBottom: '0.4rem', fontSize: '1rem' }}>
                2. Server-Side Win & Loss Verification
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                The backend computes remaining attempts, checks winning conditions, and tallies bonus points.
                Frontend inputs are never trusted directly.
              </p>
            </div>

            <div>
              <h4 style={{ color: '#FFF', marginBottom: '0.4rem', fontSize: '1rem' }}>
                3. Rate Limiting & Input Sanitization
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Endpoints employ rate limiters against brute-force guess submissions, ensuring single
                alphabetic characters are validated securely.
              </p>
            </div>
          </div>
        </div>

        {/* Scoring System Rules */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div className="section-label">
            <Award size={22} color="#FBBF24" />
            <span>Scoring & Multiplier Formula</span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              textAlign: 'center'
            }}
          >
            <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
              <div style={{ color: '#10B981', fontWeight: 800, fontSize: '1.25rem' }}>Easy Level</div>
              <div style={{ fontSize: '0.9rem', color: '#FFF', marginTop: '0.2rem' }}>10 Base Pts</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+5 Pts per unused attempt</div>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
              <div style={{ color: '#F59E0B', fontWeight: 800, fontSize: '1.25rem' }}>Medium Level</div>
              <div style={{ fontSize: '0.9rem', color: '#FFF', marginTop: '0.2rem' }}>20 Base Pts</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+7 Pts per unused attempt</div>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
              <div style={{ color: '#F43F5E', fontWeight: 800, fontSize: '1.25rem' }}>Hard Level</div>
              <div style={{ fontSize: '0.9rem', color: '#FFF', marginTop: '0.2rem' }}>30 Base Pts</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+10 Pts per unused attempt</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
