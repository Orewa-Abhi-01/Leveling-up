import { Howl } from 'howler';

class AudioManager {
  constructor() {
    this.sounds = {};
    this.music = {};
    this.currentMusic = null;
    this.isMuted = false;
    this.musicVolume = 0.5;
    this.sfxVolume = 0.8;
    
    // Try to load mute state from localStorage
    const savedMute = localStorage.getItem('isMuted');
    if (savedMute !== null) {
      this.isMuted = savedMute === 'true';
    }
  }

  // Initialize with multiple sound effects and music tracks
  init(soundEffects, musicTracks) {
    // Load sound effects
    Object.entries(soundEffects).forEach(([name, path]) => {
      this.sounds[name] = new Howl({
        src: [path],
        volume: this.sfxVolume,
        mute: this.isMuted
      });
    });

    // Load music tracks
    Object.entries(musicTracks).forEach(([name, path]) => {
      this.music[name] = new Howl({
        src: [path],
        volume: this.musicVolume,
        loop: true,
        mute: this.isMuted
      });
    });
  }

  // Play a sound effect
  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].play();
    } else {
      console.warn(`Sound "${soundName}" not found`);
    }
  }

  // Play with custom parameters (pitch, rate, etc)
  playWithParams(soundName, params = {}) {
    if (this.sounds[soundName]) {
      const id = this.sounds[soundName].play();
      
      if (params.rate) {
        this.sounds[soundName].rate(params.rate, id);
      }
      
      if (params.volume) {
        this.sounds[soundName].volume(params.volume * this.sfxVolume, id);
      }
    }
  }

  // Play a music track with optional crossfade
  playMusic(trackName, fadeTime = 1000) {
    if (!this.music[trackName]) {
      console.warn(`Music track "${trackName}" not found`);
      return;
    }

    // Fade out current music if playing
    if (this.currentMusic && this.music[this.currentMusic].playing()) {
      this.music[this.currentMusic].fade(this.musicVolume, 0, fadeTime);
      setTimeout(() => {
        this.music[this.currentMusic].stop();
      }, fadeTime);
    }

    // Start new track
    this.music[trackName].volume(0);
    this.music[trackName].play();
    this.music[trackName].fade(0, this.musicVolume, fadeTime);
    this.currentMusic = trackName;
  }

  // Stop all music
  stopMusic(fadeTime = 1000) {
    if (this.currentMusic) {
      this.music[this.currentMusic].fade(this.musicVolume, 0, fadeTime);
      setTimeout(() => {
        this.music[this.currentMusic].stop();
        this.currentMusic = null;
      }, fadeTime);
    }
  }

  // Toggle mute state
  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('isMuted', this.isMuted.toString());
    
    // Update all sounds and music
    Object.values(this.sounds).forEach(sound => {
      sound.mute(this.isMuted);
    });
    
    Object.values(this.music).forEach(track => {
      track.mute(this.isMuted);
    });
    
    return this.isMuted;
  }

  // Set music volume (0-1)
  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    
    Object.values(this.music).forEach(track => {
      track.volume(this.musicVolume);
    });
  }

  // Set sound effects volume (0-1)
  setSfxVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    
    Object.values(this.sounds).forEach(sound => {
      sound.volume(this.sfxVolume);
    });
  }
}

// Singleton instance
const audioManager = new AudioManager();
export default audioManager; 