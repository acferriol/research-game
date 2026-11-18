/* ============ gameEngine.js — declarative scene interpreter ============ */

const SCENE_TYPES = ["dialogue", "choice", "email", "upload", "splash", "tracking", "minigame", "battle", "ending", "results", "end"];

let state = null;
let currentChoices = [];

/* ---------- story data validation (runs once at boot) ---------- */
function validateStory() {
  const errors = [];

  for (const [id, scene] of Object.entries(STORY)) {
    if (!SCENE_TYPES.includes(scene.type)) {
      errors.push(`[${id}] unknown scene type "${scene.type}"`);
    }
    if (scene.character && !getCharacter(scene.character)) {
      errors.push(`[${id}] unknown character "${scene.character}"`);
    }
    const nexts = [];
    if (typeof scene.next === "string") nexts.push(scene.next);
    if (typeof scene.onWin === "string") nexts.push(scene.onWin);
    if (typeof scene.onLose === "string") nexts.push(scene.onLose);
    if (Array.isArray(scene.choices)) {
      scene.choices.forEach((c, i) => {
        if (typeof c.next !== "string") errors.push(`[${id}] choice ${i} missing "next"`);
        else nexts.push(c.next);
      });
    }
    for (const next of nexts) {
      if (next !== "__title" && !STORY[next]) errors.push(`[${id}] references missing scene "${next}"`);
    }
    if (scene.type === "upload" && !Array.isArray(scene.statuses)) {
      errors.push(`[${id}] upload scene requires "statuses" array`);
    }
    if (scene.type === "email" && !scene.email) {
      errors.push(`[${id}] email scene requires "email" object`);
    }
    if (scene.type === "tracking" && (!Array.isArray(scene.entries) || scene.entries.length === 0)) {
      errors.push(`[${id}] tracking scene requires non-empty "entries" array`);
    }
    if (scene.type === "minigame" && (!Array.isArray(scene.actions) || scene.actions.length === 0)) {
      errors.push(`[${id}] minigame scene requires non-empty "actions" array`);
    }
    if (scene.type === "battle") {
      if (!getCharacter(scene.enemy)) {
        errors.push(`[${id}] battle has unknown enemy "${scene.enemy}"`);
      }
      if (!Array.isArray(scene.rounds) || scene.rounds.length === 0) {
        errors.push(`[${id}] battle requires non-empty "rounds" array`);
      } else {
        scene.rounds.forEach((r, i) => {
          if (!r.comment) errors.push(`[${id}] round ${i} missing "comment"`);
          if (!Array.isArray(r.options) || r.options.length === 0) {
            errors.push(`[${id}] round ${i} requires non-empty "options"`);
          }
          (r.options || []).forEach((o, j) => {
            if (!o.text) errors.push(`[${id}] round ${i} option ${j} missing "text"`);
            if (!o.reply) errors.push(`[${id}] round ${i} option ${j} missing "reply"`);
          });
        });
      }
      if (typeof scene.onWin !== "string") errors.push(`[${id}] battle missing "onWin"`);
      if (typeof scene.onLose !== "string") errors.push(`[${id}] battle missing "onLose"`);
    }
  }
  if (!STORY.intro_1) errors.push('story has no entry scene "intro_1"');
  return errors;
}

/* ---------- game lifecycle ---------- */
function newGame() {
  state = createNewState();
  const meta = Storage.loadMeta();
  meta.runs += 1;
  Storage.saveMeta(meta);
  startScene("intro_1");
}

function continueGame() {
  const save = Storage.loadGame();
  if (!save) return false;
  state = save;
  startScene(state.sceneId);
  return true;
}

/* ---------- chapter select (fresh state tuned per chapter) ---------- */
function startChapter(n) {
  const info = (CHAPTER_INDEX || []).find((c) => c.chapter === n);
  if (!info || !STORY[info.entry]) {
    toast("Chapter not available yet.", "t-red");
    return;
  }
  toast("Chapter started — your save has been replaced.", "t-gold");
  state = createNewState();
  const preset = (CHAPTER_PRESETS || {})[n];
  if (preset) {
    if (preset.journal) state.selectedJournal = preset.journal;
    if (preset.flags) Object.assign(state.flags, preset.flags);
    if (preset.relationships) Object.assign(state.relationships, preset.relationships);
    if (preset.stats) Object.assign(state.stats, preset.stats);
    if (preset.manuscript) Object.assign(state.manuscript, preset.manuscript);
  }
  startScene(info.entry);
}

function persist() {
  if (state) Storage.saveGame(state);
}

/* ---------- scene runner ---------- */
function startScene(id) {
  const scene = STORY[id];
  if (!scene) {
    Sfx.error();
    showSplash("DATA ERROR\nMISSING SCENE: " + id, "danger", 4000, false);
    console.error("Missing scene:", id);
    return;
  }
  state.sceneId = id;
  if (scene.chapter) state.chapter = scene.chapter;

  // scene-level effects (choices apply their own)
  let deltas = {};
  if (scene.effects) deltas = applyEffects(state, scene.effects);
  if (scene.set) Object.assign(state.flags, scene.set);

  showScreen("story");
  hideStoryOverlays();

  if (scene.bg) setBackground(scene.bg);
  if (scene.chapterLabel) setChapterLabel(scene.chapterLabel);
  setStats(state.stats, state.coffeeConsumed);
  if (Object.keys(deltas).length) showStatDeltas(deltas);
  persist();

  switch (scene.type) {
    case "dialogue": runDialogue(scene); break;
    case "choice": runChoice(scene); break;
    case "email": runEmail(scene); break;
    case "upload": runUpload(scene); break;
    case "splash": runSplash(scene); break;
    case "tracking": runTracking(scene); break;
    case "minigame": runMinigame(scene); break;
    case "battle": runBattle(scene); break;
    case "ending": runEnding(); break;
    case "results": runResults(); break;
    case "end": runEnd(scene); break;
    default: console.error("Unhandled scene type", scene.type);
  }
}

function next(scene) {
  const target = typeof scene.next === "function" ? scene.next(state) : scene.next;
  if (target === "__title") { returnToTitle(); return; }
  if (maybeTriggerEvent(target)) return; // the event chains into the target when resolved
  startScene(target);
}

/* ---------- random events: fire between calm narrative beats ---------- */
function maybeTriggerEvent(targetId) {
  const target = STORY[targetId];
  if (!target || target.type !== "dialogue") return false;
  if (state.chapter < 2) return false;
  const chance = (typeof window !== "undefined" && typeof window.POP_EVENT_CHANCE === "number")
    ? window.POP_EVENT_CHANCE : 0.25;
  if (Math.random() >= chance) return false;
  if (!Array.isArray(state.triggeredEvents)) state.triggeredEvents = [];
  if (state.triggeredEvents.length >= 3) return false;
  const pool = (EVENTS || []).filter((ev) =>
    !state.triggeredEvents.includes(ev.id) && (!ev.when || ev.when(state)));
  if (!pool.length) return false;
  const event = pool[Math.floor(Math.random() * pool.length)];
  state.triggeredEvents.push(event.id);
  runEvent(event, targetId);
  return true;
}

function runEvent(event, targetId) {
  hideStoryOverlays();
  setPortrait(null);
  Sfx.notify();
  const deltas = applyEffects(state, event.effects);
  showStatDeltas(deltas);
  setStats(state.stats, state.coffeeConsumed);
  persist();

  if (event.choices) {
    renderChoices(event.prompt, event.choices, (i) => {
      const choice = event.choices[i];
      state.decisions.push({ scene: "event:" + event.id, choice: choice.text });
      const d = applyEffects(state, choice.effects);
      showStatDeltas(d);
      setStats(state.stats, state.coffeeConsumed);
      persist();
      renderDialogue(null, choice.reply, () => startScene(targetId));
    });
  } else {
    renderEmail({ from: event.from, subject: event.subject, body: event.body, button: "CONTINUE" },
      () => startScene(targetId));
  }
}

function returnToTitle() {
  hideStoryOverlays();
  showScreen("title");
  setContinueEnabled(!!Storage.loadGame());
}

/* ---------- scene type handlers ---------- */
function runDialogue(scene) {
  setPortrait(scene.character, scene.expression);
  if (scene.shake) shake();
  renderDialogue(scene.character, scene.text, () => next(scene));
}

function runChoice(scene) {
  setPortrait(scene.character || null, scene.expression);
  currentChoices = scene.choices.filter((c) => meetsConditions(state, c.requires));
  renderChoices(scene.prompt, currentChoices, (index) => {
    const choice = currentChoices[index];
    state.decisions.push({ scene: state.sceneId, choice: choice.text });
    const deltas = applyEffects(state, choice.effects);
    if (choice.set) Object.assign(state.flags, choice.set);
    if (choice.journal) state.selectedJournal = choice.journal;
    showStatDeltas(deltas);
    setStats(state.stats, state.coffeeConsumed);
    persist();
    next(choice);
  });
}

function runEmail(scene) {
  setPortrait(null);
  const email = typeof scene.email === "function" ? scene.email(state) : scene.email;
  Sfx.notify();
  renderEmail(email, () => next(scene));
}

function runUpload(scene) {
  setPortrait(null);
  uploadAnimation(scene.label, scene.statuses, () => next(scene));
}

function runSplash(scene) {
  setPortrait(null);
  if (scene.shake) shake();
  if (scene.confetti) celebrate();
  showSplash(scene.text, scene.variant || "neutral", scene.holdMs || 1600)
    .then(() => next(scene));
}

/* ---------- ending resolution: priority D > A > C > B ---------- */
function runEnding() {
  setPortrait(null);
  const letter = resolveEnding(state);
  state.currentEnding = letter;

  const meta = Storage.loadMeta();
  if (letter === "A") meta.acceptances += 1;
  if (letter === "B") meta.rejections += 1;
  if (!meta.endingsFound.includes(letter)) meta.endingsFound.push(letter);
  meta.coffeeTotal += state.coffeeConsumed;
  Storage.saveMeta(meta);
  persist();

  startScene("ending_" + letter.toLowerCase());
}

/* ---------- results screen: summary, achievements, run teardown ---------- */
function runResults() {
  setPortrait(null);
  const meta = Storage.loadMeta();
  const unlocked = checkAchievements(state, meta);
  Storage.saveMeta(meta);
  unlocked.forEach((a) => toast("ACHIEVEMENT UNLOCKED: " + a.title, "t-gold"));
  if (unlocked.length) Sfx.success();
  Storage.clearGame(); // finished run: fresh suffering requires a fresh save
  renderResults(state, unlocked);
}

/* ---------- tracking: editorial status timeline (days set absolutely, so replays stay idempotent) ---------- */
function runTracking(scene) {
  setPortrait(null);
  let i = 0;
  const advance = () => {
    if (i < scene.entries.length) {
      const entry = scene.entries[i];
      state.totalDays = Math.max(state.totalDays, entry.day);
      trackingAppend(entry, i === scene.entries.length - 1);
      if (entry.notify) Sfx.notify();
      else Sfx.advance();
      setStats(state.stats, state.coffeeConsumed);
      persist();
      i += 1;
    } else {
      trackingHide();
      next(scene);
    }
  };
  trackingShow(advance);
  advance();
}

/* ---------- minigame: Refresh Addiction (day counter) or Rebuttal drafting (stat counter) ---------- */
function mgCounterText(scene) {
  const label = scene.counterLabel || "DAY";
  const value = scene.counterStat ? state.stats[scene.counterStat] : state.totalDays;
  return label + " " + value;
}

function mgStatusText(scene) {
  if (scene.qualityLabel) return scene.qualityLabel + ": " + state.manuscript.rebuttalQuality + "/10";
  return scene.statusLabel || "";
}

function runMinigame(scene) {
  setPortrait(null);
  if (scene.init && !state.flags[scene.initFlag]) {
    state.flags[scene.initFlag] = true;
    scene.init(state);
  }
  if (!scene.counterStat && scene.targetFlag && !state.flags[scene.targetFlag]) {
    state.flags[scene.targetFlag] = state.totalDays + scene.days;
  }
  persist();
  renderMinigame(scene, mgCounterText(scene), mgStatusText(scene), (idx) => handleMinigameAction(scene, idx));
}

function handleMinigameAction(scene, idx) {
  const action = scene.actions[idx];
  let deltas = applyEffects(state, action.effects);
  if (action.days && !scene.counterStat) state.totalDays += action.days;
  if (typeof action.quality === "number") {
    state.manuscript.rebuttalQuality = clampStat(state.manuscript.rebuttalQuality + action.quality);
  }
  if (action.countFlag) {
    state.flags[action.countFlag] = (state.flags[action.countFlag] || 0) + 1;
  }

  let message;
  if (action.chance && Math.random() < action.chance.p) {
    deltas = { ...deltas, ...applyEffects(state, action.chance.successEffects) };
    message = pickMessage(action.chance.successMsgs);
    Sfx.notify();
  } else {
    message = pickMessage(action.chance ? action.chance.failMsgs : action.messages);
  }

  showStatDeltas(deltas);
  setStats(state.stats, state.coffeeConsumed);
  updateMinigame(mgCounterText(scene), mgStatusText(scene), message);
  persist();

  const done = action.end ||
    (scene.counterStat
      ? state.stats[scene.counterStat] <= (typeof scene.endAtOrBelow === "number" ? scene.endAtOrBelow : 0)
      : state.totalDays >= state.flags[scene.targetFlag]);

  if (done) {
    finishMinigame(scene.doneMessage);
    Sfx.notify();
    setTimeout(() => { hideMinigame(); next(scene); }, 1600);
  }
}

function pickMessage(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function runEnd(scene) {
  setPortrait(null);
  showSplash(scene.text, scene.variant || "neutral", scene.holdMs || 2200)
    .then(() => {
      toast(scene.toast || "Progress saved.", "t-green");
      returnToTitle();
    });
}

/* ---------- keyboard ---------- */
function handleKey(e) {
  if (document.getElementById("app").dataset.screen !== "story") return;

  const box = document.getElementById("dialogue-box");
  const battle = document.getElementById("battle-view");
  if ((e.key === "Enter" || e.key === " ") && !box.hidden && box.onclick) {
    box.onclick();
    e.preventDefault();
  }
  if ((e.key === "Enter" || e.key === " ") && !battle.hidden && battle.onclick) {
    battle.onclick();
    e.preventDefault();
  }
  const letters = ["a", "b", "c", "d", "e", "f"];
  const idx = letters.indexOf(e.key.toLowerCase());
  if (idx >= 0 && !isTyping()) {
    const btns = document.querySelectorAll("#choices .choice-btn, #battle-actions .choice-btn");
    if (btns.length && btns[idx]) btns[idx].click();
  }
}
