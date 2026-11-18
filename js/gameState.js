/* ============ gameState.js — central state model + stat rules ============ */

const STAT_MAX = 10;

function createNewState() {
  return {
    version: 1,
    chapter: 1,
    sceneId: "intro_1",
    selectedJournal: null,

    stats: {
      rigor: 5,
      patience: 7,
      time: 10,
      credibility: 5,
    },

    relationships: { reviewer1: 0, reviewer2: 0, reviewer3: 0 },

    manuscript: {
      status: "draft",
      revisionRound: 0,
      rebuttalQuality: 0,
    },

    flags: {},
    decisions: [],
    triggeredEvents: [],

    totalDays: 0,
    coffeeConsumed: 0,
    currentEnding: null,
  };
}

function clampStat(value) {
  return Math.max(0, Math.min(STAT_MAX, Math.round(value)));
}

/* Applies an effects object to state, returns {statKey: delta} for UI feedback.
   Supported keys: rigor, patience, time, credibility, coffee, days */
function applyEffects(state, effects = {}) {
  const deltas = {};
  if (!effects) return deltas;

  const statKeys = ["rigor", "patience", "time", "credibility"];
  for (const key of statKeys) {
    if (typeof effects[key] === "number" && effects[key] !== 0) {
      const before = state.stats[key];
      state.stats[key] = clampStat(before + effects[key]);
      deltas[key] = state.stats[key] - before;
    }
  }
  if (typeof effects.coffee === "number" && effects.coffee > 0) {
    state.coffeeConsumed += effects.coffee;
    deltas.coffee = effects.coffee;
  }
  if (typeof effects.days === "number") {
    state.totalDays += Math.max(0, Math.round(effects.days));
    deltas.days = effects.days;
  }
  return deltas;
}

/* Evaluates a requirements object: { stat: {rigor: 5}, flag: "name", flagNot: "name" } */
function meetsConditions(state, conditions) {
  if (!conditions) return true;
  if (conditions.stat) {
    for (const [key, min] of Object.entries(conditions.stat)) {
      if (state.stats[key] < min) return false;
    }
  }
  if (conditions.flag && !state.flags[conditions.flag]) return false;
  if (conditions.flagNot && state.flags[conditions.flagNot]) return false;
  return true;
}
