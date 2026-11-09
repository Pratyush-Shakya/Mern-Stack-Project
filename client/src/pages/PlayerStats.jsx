import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Trophy,
  Flame,
  Award,
  Zap,
  CheckCircle2,
  XCircle,
  Percent,
  Search,
  Globe2,
  Users
} from 'lucide-react';
import { getPlayerStatsAPI, getGlobalStatsAPI } from '../services/api';
import { soundManager } from '../utils/audio';

export default function PlayerStats() {
  const [targetUsername, setTargetUsername] = useState(() => {
    return localStorage.getItem('hangman_player_name') || 'Player1';
  });
  const [searchInput, setSearchInput] = useState(targetUsername);
  const [stats, setStats] = useState(null);
  const [globalStats, setGlobalStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async (userToFetch) => {
    setLoading(true);
    setError('');
    try {
      const [playerRes, globalRes] = await Promise.all([
        getPlayerStatsAPI(userToFetch),
        getGlobalStatsAPI().catch(() => ({ success: false }))
      ]);

      if (playerRes.success && playerRes.data) {
        setStats(playerRes.data);
      }
      if (globalRes.success && globalRes.data) {
        setGlobalStats(globalRes.data);
      }
    } catch (err) {
      console.error('Failed to load player stats:', err);
      setError('Unable to load stats for player: ' + userToFetch);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(targetUsername);
  }, [targetUsername]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    soundManager.playClick();
    setTargetUsername(searchInput.trim());
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">PLAYER ANALYTICS</h1>
        <p className="page-subtitle">
          Comprehensive performance breakdown, win streaks, and game metrics.
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ maxWidth: '500px', margin: '0 auto 2.5rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="text"
              className="input-field"
              placeholder="Search player username..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          Loading player statistics...
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--accent-rose)' }}>
          {error}
        </div>
      ) : (
        <>
          {/* Player Banner */}
          <div
            className="glass-panel"
            style={{
              padding: '1.5rem 2rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  background: 'var(--btn-grad)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#FFF'
                }}
              >
                {(stats?.displayName || stats?.username || 'P').substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF' }}>
                  {stats?.displayName || stats?.username}
                </h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {stats?.isNewPlayer ? 'Unranked Cadet • Play to rank up!' : 'Season Contender'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>All-Time High Score</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38BDF8' }}>
                  {stats?.highestScore || 0}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Accumulated Points</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-theme)' }}>
                  {stats?.totalScore || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="stats-cards-grid">
            {/* Total Games */}
            <div className="glass-panel stat-card">
              <div className="stat-card-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818CF8' }}>
                <Gamepad2 size={26} />
              </div>
              <div>
                <div className="stat-card-val">{stats?.totalGames || 0}</div>
                <div className="stat-card-lbl">Total Games Played</div>
              </div>
            </div>

            {/* Total Wins */}
            <div className="glass-panel stat-card">
              <div className="stat-card-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399' }}>
                <CheckCircle2 size={26} />
              </div>
              <div>
                <div className="stat-card-val" style={{ color: '#34D399' }}>{stats?.totalWins || 0}</div>
                <div className="stat-card-lbl">Games Won</div>
              </div>
            </div>

            {/* Total Losses */}
            <div className="glass-panel stat-card">
              <div className="stat-card-icon" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#FB7185' }}>
                <XCircle size={26} />
              </div>
              <div>
                <div className="stat-card-val" style={{ color: '#FB7185' }}>{stats?.totalLosses || 0}</div>
                <div className="stat-card-lbl">Games Lost</div>
              </div>
            </div>

            {/* Win Percentage */}
            <div className="glass-panel stat-card">
              <div className="stat-card-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22D3EE' }}>
                <Percent size={26} />
              </div>
              <div>
                <div className="stat-card-val" style={{ color: '#22D3EE' }}>{stats?.winPercentage || 0}%</div>
                <div className="stat-card-lbl">Win Percentage</div>
              </div>
            </div>

            {/* Current Streak */}
            <div className="glass-panel stat-card">
              <div className="stat-card-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' }}>
                <Flame size={26} />
              </div>
              <div>
                <div className="stat-card-val" style={{ color: '#FBBF24' }}>{stats?.currentStreak || 0}</div>
                <div className="stat-card-lbl">Current Streak</div>
              </div>
            </div>

            {/* Best Streak */}
            <div className="glass-panel stat-card">
              <div className="stat-card-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#F472B6' }}>
                <Award size={26} />
              </div>
              <div>
                <div className="stat-card-val" style={{ color: '#F472B6' }}>{stats?.bestStreak || 0}</div>
                <div className="stat-card-lbl">Best Streak Record</div>
              </div>
            </div>
          </div>

          {/* Global Community Overview */}
          {globalStats && (
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div className="section-label" style={{ marginBottom: '1.25rem' }}>
                <Globe2 size={20} color="#06B6D4" />
                <span>Global Community Benchmarks</span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Total Global Games
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF' }}>
                    {globalStats.totalGamesPlayed || 0}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Total Global Victories
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34D399' }}>
                    {globalStats.totalWins || 0}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Unique Contenders
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#818CF8' }}>
                    {globalStats.totalPlayers || 0}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Global Win Rate
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FBBF24' }}>
                    {globalStats.globalWinRate || 0}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
