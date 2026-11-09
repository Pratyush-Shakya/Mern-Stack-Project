import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Crown,
  Medal,
  Flame,
  Search,
  RotateCcw,
  Gamepad2,
  TrendingUp,
  Percent
} from 'lucide-react';
import { getLeaderboardAPI } from '../services/api';
import { soundManager } from '../utils/audio';

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getLeaderboardAPI(30);
      if (response.success && response.data) {
        setPlayers(response.data);
      }
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
      setError('Could not load leaderboard. Check backend server connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const filteredPlayers = players.filter((p) => {
    const name = p.displayName || p.username || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const top1 = players[0];
  const top2 = players[1];
  const top3 = players[2];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">CHAMPIONS LEADERBOARD</h1>
        <p className="page-subtitle">
          The finest wordsmiths and quickest minds in the Hangman Realm.
        </p>
      </div>

      {/* Podium for Top 3 */}
      {players.length >= 3 && (
        <div className="podium-container">
          {/* Rank 2 */}
          {top2 && (
            <div className="glass-panel podium-card podium-2">
              <div className="podium-rank" style={{ color: '#94A3B8' }}>
                <Medal size={32} style={{ margin: '0 auto' }} /> #2
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: '#FFF' }}>
                {top2.displayName || top2.username}
              </h3>
              <div style={{ color: '#38BDF8', fontWeight: 800, fontSize: '1.4rem' }}>
                {top2.score} Pts
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                {top2.wins} Wins • {top2.winPercentage}% Win Rate
              </div>
            </div>
          )}

          {/* Rank 1 (Center & Higher) */}
          {top1 && (
            <div className="glass-panel podium-card podium-1">
              <div className="podium-rank" style={{ color: '#F59E0B' }}>
                <Crown size={40} style={{ margin: '0 auto' }} /> #1
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem', color: '#FFF' }}>
                {top1.displayName || top1.username}
              </h3>
              <div style={{ color: '#FBBF24', fontWeight: 900, fontSize: '1.8rem' }}>
                {top1.score} Pts
              </div>
              <div style={{ fontSize: '0.85rem', color: '#FDE68A', marginTop: '0.3rem' }}>
                {top1.wins} Wins • {top1.winPercentage}% Win Rate
              </div>
            </div>
          )}

          {/* Rank 3 */}
          {top3 && (
            <div className="glass-panel podium-card podium-3">
              <div className="podium-rank" style={{ color: '#D97706' }}>
                <Medal size={32} style={{ margin: '0 auto' }} /> #3
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: '#FFF' }}>
                {top3.displayName || top3.username}
              </h3>
              <div style={{ color: '#FB923C', fontWeight: 800, fontSize: '1.4rem' }}>
                {top3.score} Pts
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                {top3.wins} Wins • {top3.winPercentage}% Win Rate
              </div>
            </div>
          )}
        </div>
      )}

      {/* Control Bar: Search & Refresh */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', width: '300px' }}>
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
            placeholder="Search by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              soundManager.playClick();
              fetchLeaderboard();
            }}
          >
            <RotateCcw size={16} />
            <span>Refresh</span>
          </button>
          <Link to="/" className="btn btn-primary">
            <Gamepad2 size={18} />
            <span>Play Game</span>
          </Link>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-panel table-container">
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Loading rankings...
          </div>
        ) : error ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--accent-rose)' }}>
            {error}
          </div>
        ) : filteredPlayers.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No players recorded yet. Be the first to win and set a high score!
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Highest Score</th>
                <th>Games Played</th>
                <th>Wins</th>
                <th>Win Rate</th>
                <th>Best Streak</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, index) => {
                const isTop1 = index === 0;
                const isTop2 = index === 1;
                const isTop3 = index === 2;

                return (
                  <tr key={player._id || player.username || index}>
                    <td style={{ fontWeight: 800 }}>
                      {isTop1 ? (
                        <span style={{ color: '#F59E0B' }}>🥇 1</span>
                      ) : isTop2 ? (
                        <span style={{ color: '#94A3B8' }}>🥈 2</span>
                      ) : isTop3 ? (
                        <span style={{ color: '#D97706' }}>🥉 3</span>
                      ) : (
                        `#${index + 1}`
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: 'rgba(14, 165, 233, 0.15)',
                            color: '#7DD3FC',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.85rem'
                          }}
                        >
                          {(player.displayName || player.username || 'P').substring(0, 2).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600 }}>
                          {player.displayName || player.username}
                        </span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 800, color: '#38BDF8' }}>
                      {player.score || 0}
                    </td>
                    <td>{player.gamesPlayed || 0}</td>
                    <td style={{ color: '#34D399', fontWeight: 600 }}>{player.wins || 0}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div
                          style={{
                            width: '60px',
                            height: '6px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}
                        >
                          <div
                            style={{
                              width: `${player.winPercentage || 0}%`,
                              height: '100%',
                              background: 'linear-gradient(90deg, #10B981, #06B6D4)'
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.85rem' }}>{player.winPercentage || 0}%</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Flame size={14} color="#F43F5E" />
                        <span>{player.bestStreak || 0}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
