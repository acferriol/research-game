/* ============ audio.js — Web Audio API synthesized SFX ============ */

let ctx = null;
let enabled = true;

function ensureCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq, dur, type = "square", gain = 0.08, when = 0, freqEnd = null) {
  const c = ensureCtx();
  if (!c || !enabled) return;
  const t0 = c.currentTime + when;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, t0 + dur);
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

const Sfx = {
  init() { ensureCtx(); },
  setEnabled(v) { enabled = !!v; },
  click()    { tone(220, 0.06, "square", 0.06, 0, 180); },
  hover()    { tone(320, 0.03, "sine", 0.02); },
  notify()   { tone(660, 0.1, "sine", 0.07); tone(880, 0.14, "sine", 0.07, 0.1); },
  advance()  { tone(440, 0.04, "square", 0.035); },
  choose()   { tone(520, 0.06, "square", 0.06, 0, 620); },
  success()  { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.16, "square", 0.06, i * 0.09)); },
  error()    { tone(110, 0.3, "sawtooth", 0.08); tone(104, 0.3, "sawtooth", 0.06, 0.05); },
  splash()   { tone(196, 0.2, "triangle", 0.07); tone(262, 0.25, "triangle", 0.07, 0.08); },
  upload()   { tone(392, 0.05, "square", 0.03); },
  danger()   { tone(87, 0.4, "sawtooth", 0.1); tone(82, 0.5, "sawtooth", 0.09, 0.12); },
};

/* ============ background music — quiet generative ambient loop in D minor ============ */

const MUSIC = {
  chords: [
    [146.83, 174.61, 220.00], // Dm
    [116.54, 146.83, 174.61], // Bb
    [174.61, 220.00, 261.63], // F
    [130.81, 164.81, 196.00], // C
  ],
  chordMs: 7000,
  arpMs: 550,
  padGain: 0.025,
  arpGain: 0.033,
  droneGain: 0.02,
  droneFreq: 73.42, // D2, root of the key
};

let musicEnabled = true;
let musicPlaying = false;
let musicTimer = null;
let musicMaster = null;
let musicDelaySend = null;
let chordIdx = 0;
let nextChordAt = 0;

function musicChain() {
  const c = ensureCtx();
  if (!c) return null;
  if (!musicMaster) {
    musicMaster = c.createGain();
    musicMaster.gain.value = 1;
    musicMaster.connect(c.destination);
    // feedback delay for space
    const delay = c.createDelay(1.5);
    delay.delayTime.value = 0.42;
    const feedback = c.createGain();
    feedback.gain.value = 0.32;
    delay.connect(feedback).connect(delay);
    const wet = c.createGain();
    wet.gain.value = 0.5;
    delay.connect(wet).connect(musicMaster);
    musicDelaySend = delay;
  }
  return c;
}

function musicPad(freq, startAt) {
  const c = ctx;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;
  const dur = MUSIC.chordMs / 1000;
  g.gain.setValueAtTime(0.0001, startAt);
  g.gain.linearRampToValueAtTime(MUSIC.padGain, startAt + 1.4);
  g.gain.setValueAtTime(MUSIC.padGain, startAt + dur - 1.6);
  g.gain.linearRampToValueAtTime(0.0001, startAt + dur);
  osc.connect(g).connect(musicMaster);
  osc.start(startAt);
  osc.stop(startAt + dur + 0.1);
}

function musicArp(freq, startAt) {
  const c = ctx;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq * 2; // one octave up
  g.gain.setValueAtTime(0.0001, startAt);
  g.gain.linearRampToValueAtTime(MUSIC.arpGain, startAt + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.7);
  osc.connect(g);
  g.connect(musicMaster);
  g.connect(musicDelaySend);
  osc.start(startAt);
  osc.stop(startAt + 0.8);
}

function musicDrone() {
  const c = ctx;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  osc.frequency.value = MUSIC.droneFreq;
  g.gain.setValueAtTime(0.0001, c.currentTime);
  g.gain.linearRampToValueAtTime(MUSIC.droneGain, c.currentTime + 2);
  osc.connect(g).connect(musicMaster);
  osc.start();
  return { osc, g };
}

let droneNodes = null;
let musicStopTimer = null;

function musicTick() {
  const c = ctx;
  if (!c) return;
  const now = c.currentTime + 0.1; // small lookahead
  if (now >= nextChordAt) {
    const chord = MUSIC.chords[chordIdx % MUSIC.chords.length];
    for (const freq of chord) musicPad(freq, Math.max(nextChordAt, now));
    nextChordAt = Math.max(nextChordAt, now) + MUSIC.chordMs / 1000;
    chordIdx += 1;
  }
  // sparse echoing arpeggio over the current chord
  if (Math.random() < 0.4) {
    const chord = MUSIC.chords[Math.max(0, chordIdx - 1) % MUSIC.chords.length];
    musicArp(chord[Math.floor(Math.random() * chord.length)], now);
  }
}

const Music = {
  setEnabled(v) {
    musicEnabled = !!v;
    if (musicEnabled) this.start();
    else this.stop();
  },
  isEnabled() { return musicEnabled; },
  start() {
    if (musicPlaying || !musicEnabled) return;
    const c = musicChain();
    if (!c) return;
    if (musicStopTimer) { clearTimeout(musicStopTimer); musicStopTimer = null; }
    musicPlaying = true;
    nextChordAt = c.currentTime + 0.1;
    droneNodes = musicDrone();
    musicTimer = setInterval(musicTick, MUSIC.arpMs);
  },
  stop() {
    if (!musicPlaying) return;
    musicPlaying = false;
    clearInterval(musicTimer);
    if (droneNodes) {
      try {
        droneNodes.g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        droneNodes.osc.stop(ctx.currentTime + 0.5);
      } catch { /* already stopped */ }
      droneNodes = null;
    }
    // let scheduled pads ring out naturally, then drop the bus
    const master = musicMaster;
    musicMaster = null; // a future start() builds a fresh chain
    musicStopTimer = setTimeout(() => { try { master.disconnect(); } catch { /* fine */ } }, MUSIC.chordMs + 500);
  },
};
