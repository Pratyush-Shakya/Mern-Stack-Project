/**
 * Web Audio API Sound Synthesizer
 * Uses pure native browser Web Audio API to create retro arcade sound effects
 * without depending on external MP3/WAV assets that might fail to load.
 */

class SoundEffects {
  constructor() {
    this.audioCtx = null;
    this.enabled = localStorage.getItem('hangman_sound_enabled') !== 'false';
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem('hangman_sound_enabled', String(this.enabled));
    return this.enabled;
  }

  isSoundEnabled() {
    return this.enabled;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playClick() {
    this.playTone(600, 'triangle', 0.05, 0.05);
  }

  playCorrect() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  playIncorrect() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.setValueAtTime(160, now + 0.1); // Drop

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch (e) {}
  }

  playWin() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
      notes.forEach((freq, index) => {
        setTimeout(() => {
          this.playTone(freq, 'triangle', 0.3, 0.15);
        }, index * 120);
      });
    } catch (e) {}
  }

  playLoss() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const notes = [392, 349.23, 311.13, 261.63]; // Descending minor
      notes.forEach((freq, index) => {
        setTimeout(() => {
          this.playTone(freq, 'sawtooth', 0.25, 0.12);
        }, index * 140);
      });
    } catch (e) {}
  }
}

export const soundManager = new SoundEffects();
