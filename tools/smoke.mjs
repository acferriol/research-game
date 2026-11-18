/* Smoke test: boots the game with a stubbed DOM and plays the full campaign in Node.
   Dev-only regression tool. Run: node tools/smoke.mjs */
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { setTimeout as sleep } from "node:timers/promises";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

/* ---------- DOM stubs ---------- */
function makeEl(id = "") {
  const el = {
    _id: id, hidden: false, disabled: false, dataset: {}, style: {},
    className: "", textContent: "", draggable: false, alt: "", src: "",
    children: [], listeners: {}, onclick: null, _html: "",
    classList: {
      add() {}, remove() {}, toggle() {}, contains() { return false; },
    },
    setAttribute() {}, getAttribute() { return null; },
    focus() {}, remove() {}, offsetWidth: 0,
    appendChild(c) { this.children.push(c); return c; },
    addEventListener(t, fn) { (this.listeners[t] = this.listeners[t] || []).push(fn); },
    click() { (this.listeners.click || []).forEach((fn) => fn({ preventDefault() {}, key: "" })); },
    querySelector() { return makeEl(); },
    querySelectorAll() { return []; },
  };
  Object.defineProperty(el, "innerHTML", {
    get() { return el._html; },
    set(v) { el._html = v; if (v === "") el.children.length = 0; },
  });
  return el;
}

const byId = new Map();
const docEl = (id) => {
  if (!byId.has(id)) byId.set(id, makeEl(id));
  return byId.get(id);
};

globalThis.document = {
  getElementById: docEl,
  createElement: () => makeEl(),
  querySelectorAll: () => [],
  body: makeEl("body"),
};
globalThis.window = {
  addEventListener() {}, removeEventListener() {},
  AudioContext: undefined, webkitAudioContext: undefined,
  POP_EVENT_CHANCE: 0, // determinism: no random events during playthroughs
};
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};

/* ---------- load game scripts (concatenated: browser-like shared top-level scope) ---------- */
const FILES = ["characters", "audio", "gameState", "storage", "story", "ui", "battles", "events", "endings", "gameEngine", "main"];
const code = FILES.map((f) => readFileSync(`${ROOT}js/${f}.js`, "utf8")).join("\n;\n");
vm.runInThisContext(code, { filename: "game.js" });

const app = docEl("app");

let failed = false;
function assert(cond, msg) {
  if (!cond) { console.error("FAIL:", msg); failed = true; return; }
  console.log("PASS:", msg);
}

/* ---------- boot checks ---------- */
assert(app.dataset.screen === "title", "boot reached title screen");
assert(validateStory().length === 0, "story graph validates clean");

/* duplicate top-level scene keys silently overwrite in JS object literals — detect at source level */
{
  const src = readFileSync(`${ROOT}js/story.js`, "utf8");
  const ids = [...src.matchAll(/^ {2}([A-Za-z0-9_]+): \{$/gm)].map((m) => m[1]);
  const seen = new Set();
  const dups = ids.filter((id) => (seen.has(id) ? true : (seen.add(id), false)));
  assert(dups.length === 0, "no duplicate scene keys in story.js (found: " + (dups.join(", ") || "none") + ")");
}

/* ---------- unit checks: ending priority + event catalog ---------- */
{
  const d = createNewState();
  d.flags.sarcasticCount = 5;
  assert(resolveEnding(d) === "D", "ending priority: corruption (D) overrides everything");

  const a = createNewState();
  a.manuscript.rebuttalQuality = 8; a.stats.rigor = 7; a.stats.credibility = 5; a.relationships.reviewer2 = 1;
  assert(resolveEnding(a) === "A", "strong run -> ACCEPTED");

  const c = createNewState();
  c.stats.rigor = 5; c.relationships.reviewer2 = -1;
  assert(resolveEnding(c) === "C", "survivor stuck with hostile Reviewer #2 -> ETERNAL REVISION");

  const b = createNewState();
  b.stats.rigor = 3; b.relationships.reviewer2 = 3; b.manuscript.rebuttalQuality = 0;
  assert(resolveEnding(b) === "B", "weak run -> REJECTED");

  assert((EVENTS || []).length >= 6, "at least 6 random events catalogued");
  (EVENTS || []).forEach((ev) =>
    assert(Boolean(ev.id && (ev.body || (ev.choices && ev.prompt))), "event '" + ev.id + "' well-formed"));
}

/* ---------- event firing is deterministic via POP_EVENT_CHANCE ---------- */
{
  window.POP_EVENT_CHANCE = 1;
  startChapter(3);
  docEl("dialogue-box").onclick(); // finish typing
  docEl("dialogue-box").onclick(); // advance -> event fires before r1_present
  assert((state.triggeredEvents || []).length === 1, "event fires deterministically at chance 1");
  window.POP_EVENT_CHANCE = 0;
}

/* ---------- playthrough driver ---------- */
async function drive(journalIdx, battleIdx, mgIdx) {
  let steps = 0;
  let refreshes = 0;
  while (app.dataset.screen !== "title") {
    if (++steps > 500) { console.error("STUCK mid-playthrough"); failed = true; return; }
    const splash = docEl("splash-layer");
    const box = docEl("dialogue-box");
    const choices = docEl("choices");
    const email = docEl("email-view");
    const tracking = docEl("tracking-view");
    const mg = docEl("minigame-view");
    const bt = docEl("battle-view");
    const results = docEl("results-view");
    const clickables = choices.children.filter((c) => c.onclick);
    if (!results.hidden) { docEl("rs-back").onclick(); }
    else if (!splash.hidden && splash.onclick) { splash.onclick(); } // skip splash holds
    else if (!box.hidden && box.onclick) { box.onclick(); }
    else if (clickables.length) { clickables[Math.min(journalIdx, clickables.length - 1)].onclick(); }
    else if (!email.hidden && docEl("email-continue").onclick) { docEl("email-continue").onclick(); }
    else if (!tracking.hidden && tracking.onclick) { tracking.onclick(); }
    else if (!bt.hidden) {
      const acts = docEl("bt-actions").children.filter((c) => c.onclick);
      if (acts.length) { acts[Math.min(battleIdx, acts.length - 1)].onclick(); }
      else if (bt.onclick) { bt.onclick(); }
      else { await sleep(120); } // enemy comment still typing
    }
    else if (!mg.hidden) {
      const acts = docEl("mg-actions").children.filter((c) => c.onclick);
      if (!acts.length) { await sleep(250); continue; } // finished, waiting for the hand-off timeout
      // the wait game has 5 actions (refresh at 0); the rebuttal has 8 — never "refresh" there
      const idx = refreshes < 2 && acts.length < 6 ? 0 : mgIdx;
      if (idx === 0) refreshes += 1;
      acts[Math.min(idx, acts.length - 1)].onclick();
    }
    else { await sleep(250); }
  }
}

async function play(journalIdx, battleIdx, mgIdx) {
  newGame();
  await drive(journalIdx, battleIdx, mgIdx);
}
async function playChapter(n, battleIdx) {
  startChapter(n);
  await drive(0, battleIdx, 0);
}

/* run 1: full diplomatic playthrough (journal A, option A everywhere, reorganize rebuttal) */
await play(0, 0, 3);
let meta = Storage.loadMeta();
assert(meta.runs === 1, "meta.runs === 1 after first playthrough");
assert(state.currentEnding === "A", "full diplomatic run -> ACCEPTED");
assert(state.chapter === 5, "chapter counter reached 5");
assert(state.selectedJournal.id === "ijae", "journal A selected");
assert(state.stats.credibility === 8, "battles move stats: IJAE 5->6, polite cites (ch3+ch5) -> 8");
assert(state.flags.waitTarget === 177, "minigame target = day 132 + 45");
assert(state.totalDays >= 177, "waited at least until decision day (got day " + state.totalDays + ")");
assert(state.flags.refreshCount === 2, "refresh addiction counted (2 refreshes)");
assert(state.flags.r1_defeated && state.flags.r2_defeated && state.flags.r3_defeated && state.flags.r2_final_defeated, "all four battles survived");
assert(state.relationships.reviewer2 === 8, "diplomatic run: Reviewer #2 relationship +3 (ch3) +5 (ch5)");
assert(!state.flags.sarcasticCount, "diplomatic run: no sarcastic replies");
assert(state.flags.rebuttalExcellent === true, "reorganize strategy -> excellent rebuttal");
assert(state.manuscript.rebuttalQuality === 8, "rebuttal quality 8/10");
assert(Storage.loadGame() === null, "finished run clears the save");
assert(continueGame() === false, "no continue after a finished run");
assert(meta.endingsFound.includes("A") && meta.acceptances === 1, "ending A recorded in hall stats");

/* run 2: full hostile playthrough (journal C, option C everywhere) */
await play(2, 2, 2);
meta = Storage.loadMeta();
assert(meta.runs === 2, "meta.runs === 2 after second playthrough");
assert(state.currentEnding === "D", "full hostile run -> YOU BECOME REVIEWER #2");
assert((state.flags.sarcasticCount || 0) >= 3, "hostility accumulated across chapters");
assert(state.relationships.reviewer2 === -4 || state.relationships.reviewer2 < 0, "Reviewer #2 relationship hostile");
assert(meta.endingsFound.includes("D"), "ending D recorded in hall stats");

/* chapter-select endings: three battle attitudes, three different fates */
await playChapter(5, 0);
assert(state.currentEnding === "B", "select ch5, neutral-but-hollow battle -> REJECTED");
await playChapter(5, 1);
assert(state.currentEnding === "C", "select ch5, bold-but-unconvincing battle -> ETERNAL REVISION");
await playChapter(5, 2);
assert(state.currentEnding === "D", "select ch5, sarcastic battle -> THE CYCLE CONTINUES");

meta = Storage.loadMeta();
assert(meta.endingsFound.length === 4, "all four endings discovered across runs");
const achCount = Object.keys(meta.achievements || {}).length;
assert(achCount === 6, "6 achievements unlocked so far (got " + achCount + ")");

/* mid-run persistence */
startChapter(1);
docEl("dialogue-box").onclick(); // finish typing
docEl("dialogue-box").onclick(); // advance -> autosave
assert(Storage.loadGame().sceneId === "intro_2", "mid-run autosave works");
assert(continueGame() === true, "continue restores a mid-run save");
assert(app.dataset.screen === "story", "continue returns to the story");

/* corrupt save is discarded, not fatal */
globalThis.localStorage.setItem("pop_save_v1", "{broken json");
assert(Storage.loadGame() === null, "corrupt save discarded safely");

if (failed) { console.error("\nSMOKE TESTS FAILED"); process.exit(1); }
console.log("\nALL SMOKE TESTS PASSED");
