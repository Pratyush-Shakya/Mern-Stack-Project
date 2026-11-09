import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Gamepad2,
  Trophy,
  BarChart2,
  Info,
  Volume2,
  VolumeX,
  Palette,
  Check,
  Menu,
  X
} from 'lucide-react';
import { soundManager } from '../utils/audio';

const THEMES = [
  { id: 'executive', name: 'Executive Slate', color: '#0EA5E9' },
  { id: 'black', name: 'Clean Obsidian', color: '#FFFFFF' },
  { id: 'emerald', name: 'Nordic Emerald', color: '#10B981' },
  { id: 'steel', name: 'Graphite Steel', color: '#94A3B8' }
];

export default function Navbar() {
  const [soundOn, setSoundOn] = useState(soundManager.isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Default to executive slate, migrating any stale purple
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('hangman_theme');
    if (!saved || saved === 'purple') {
      localStorage.setItem('hangman_theme', 'executive');
      return 'executive';
    }
    return saved;
  });

  // Apply theme on load and change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('hangman_theme', currentTheme);
  }, [currentTheme]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSound = () => {
    const newState = soundManager.toggleSound();
    setSoundOn(newState);
    if (newState) {
      soundManager.playClick();
    }
  };

  const selectTheme = (themeId) => {
    setCurrentTheme(themeId);
    setThemeDropdownOpen(false);
    soundManager.playClick();
  };

  const navItemClick = () => {
    soundManager.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-brand" onClick={navItemClick}>
          <img src="/logo.svg" alt="Hangman Logo" className="nav-brand-logo" />
          <span>
            HANGMAN<span style={{ color: 'var(--accent-theme)' }}>.IO</span>
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="nav-links" style={{ display: mobileMenuOpen ? 'flex' : undefined }}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={navItemClick}
          >
            <Gamepad2 size={18} />
            <span>Play</span>
          </NavLink>

          <NavLink
            to="/leaderboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={navItemClick}
          >
            <Trophy size={18} />
            <span>Leaderboard</span>
          </NavLink>

          <NavLink
            to="/stats"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={navItemClick}
          >
            <BarChart2 size={18} />
            <span>Statistics</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={navItemClick}
          >
            <Info size={18} />
            <span>About</span>
          </NavLink>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions" style={{ position: 'relative' }} ref={dropdownRef}>
          {/* Theme Palette Button */}
          <button
            className="btn-icon"
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            title="Change Theme"
            aria-label="Change Theme"
            style={{ color: 'var(--accent-theme)' }}
          >
            <Palette size={20} />
          </button>

          {/* Theme Selector Dropdown */}
          {themeDropdownOpen && (
            <div className="theme-dropdown">
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                  padding: '0.2rem 0.5rem 0.4rem',
                  borderBottom: '1px solid var(--surface-border)'
                }}
              >
                Color Theme
              </div>
              {THEMES.map((th) => (
                <button
                  key={th.id}
                  className={`theme-option ${currentTheme === th.id ? 'active' : ''}`}
                  onClick={() => selectTheme(th.id)}
                >
                  <span
                    className="theme-color-dot"
                    style={{
                      backgroundColor: th.color,
                      borderColor: th.id === 'black' ? '#71717A' : 'transparent',
                      color: th.color
                    }}
                  />
                  <span style={{ flex: 1 }}>{th.name}</span>
                  {currentTheme === th.id && (
                    <Check size={14} color={th.color} />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Sound Toggle Button */}
          <button
            className="btn-icon"
            onClick={toggleSound}
            title={soundOn ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            aria-label="Toggle Sound"
          >
            {soundOn ? (
              <Volume2 size={20} color="var(--accent-theme)" />
            ) : (
              <VolumeX size={20} color="#64748B" />
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="btn-icon"
            style={{ display: 'none' }}
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
