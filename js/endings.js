/* ============ endings.js — resolution priority + achievement catalog ============ */

const ENDING_NAMES = {
  A: "ACCEPTED",
  B: "REJECTED",
  C: "ETERNAL MAJOR REVISION",
  D: "YOU BECOME REVIEWER #2",
};

/* Priority order: the secret corruption (D) overrides everything.
   Glory (A) requires a genuinely strong run. The loop (C) traps survivors
   who never convinced Reviewer #2. Rejection (B) is the honest default. */
function resolveEnding(state) {
  if ((state.flags.sarcasticCount || 0) >= 3 ||
      (state.relationships.reviewer2 <= -4 && state.stats.credibility <= 2)) {
    return "D";
  }
  if (state.manuscript.rebuttalQuality >= 7 &&
      state.stats.rigor >= 6 &&
      state.stats.credibility >= 4 &&
      state.relationships.reviewer2 >= 0) {
    return "A";
  }
  if ((state.manuscript.rebuttalQuality >= 4 || state.stats.rigor >= 5) &&
      state.relationships.reviewer2 < 0) {
    return "C";
  }
  return "B";
}

const ACHIEVEMENTS = [
  { id: "first_rejection", title: "First Rejection",
    check: (s) => s.currentEnding === "B" },
  { id: "r2_survivor", title: "Reviewer #2 Survivor",
    check: (s) => !!s.flags.r2_defeated && !!s.flags.r2_final_defeated },
  { id: "coffee_coauthor", title: "Coffee Is My Coauthor",
    check: (s) => s.coffeeConsumed >= 10 },
  { id: "professional", title: "Professional Response",
    check: (s) => !s.flags.sarcasticCount && !!s.currentEnding },
  { id: "publish_or_perish", title: "Publish or Perish",
    check: (s) => s.currentEnding === "A" },
  { id: "cycle_continues", title: "The Cycle Continues",
    check: (s) => s.currentEnding === "D" },
  { id: "refresh_amnesty", title: "Refresh Button Amnesty",
    check: (s) => (s.flags.refreshCount || 0) >= 5 },
  { id: "veteran", title: "Peer Review Veteran",
    check: (s, meta) => meta.endingsFound.length >= 4 },
];

/* Unlocks any achievement whose condition now passes; returns the newly unlocked list. */
function checkAchievements(state, meta) {
  meta.achievements = meta.achievements || {};
  const unlocked = [];
  for (const a of ACHIEVEMENTS) {
    if (!meta.achievements[a.id] && a.check(state, meta)) {
      meta.achievements[a.id] = true;
      unlocked.push(a);
    }
  }
  return unlocked;
}
