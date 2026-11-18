/* ============ storage.js — versioned localStorage persistence ============ */

const SAVE_KEY = "pop_save_v1";
const META_KEY = "pop_meta_v1";

function defaultMeta() {
  return {
    version: 1,
    runs: 0,
    rejections: 0,
    acceptances: 0,
    coffeeTotal: 0,
    endingsFound: [],
    achievements: {},
    settings: { sound: true, motion: true, music: true },
  };
}

function safeParse(json, fallback) {
  try {
    const data = JSON.parse(json);
    return data && typeof data === "object" ? data : fallback;
  } catch {
    return fallback;
  }
}

function safeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}
function safeRemove(key) {
  try { localStorage.removeItem(key); } catch { /* storage unavailable */ }
}

const Storage = {
  loadGame() {
    const raw = safeGet(SAVE_KEY);
    if (!raw) return null;
    const save = safeParse(raw, null);
    if (!save || typeof save.sceneId !== "string" || typeof save.stats !== "object") {
      safeRemove(SAVE_KEY); // corrupt save: discard rather than break the game
      return null;
    }
    return save;
  },

  saveGame(state) {
    return safeSet(SAVE_KEY, state);
  },

  clearGame() {
    safeRemove(SAVE_KEY);
  },

  loadMeta() {
    const meta = safeParse(safeGet(META_KEY), null);
    if (!meta) return defaultMeta();
    // merge over defaults so new fields survive version updates
    return { ...defaultMeta(), ...meta, settings: { ...defaultMeta().settings, ...(meta.settings || {}) } };
  },

  saveMeta(meta) {
    safeSet(META_KEY, meta);
  },

  resetAll() {
    safeRemove(SAVE_KEY);
    safeRemove(META_KEY);
  },
};
