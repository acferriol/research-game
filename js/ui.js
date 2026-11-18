/* ============ ui.js — centralized DOM rendering. No other module touches the DOM directly. ============ */

const $ = (id) => document.getElementById(id);
const els = {};

function cacheUi() {
  ["screen-title", "screen-settings", "screen-hall", "screen-story",
   "btn-continue", "chapter-label", "scene-bg", "hud",
   "portrait-layer", "dialogue-box", "speaker-name", "dialogue-text", "advance-hint",
   "choices", "email-view", "email-from", "email-subject", "email-body", "email-continue",
   "upload-layer", "upload-fill", "upload-status", "upload-title",
   "tracking-view", "tk-rows", "minigame-view", "mg-title", "mg-days", "mg-status", "mg-message", "mg-actions",
   "battle-view", "bt-name", "bt-destr", "bt-round", "bt-comment", "bt-reply", "bt-actions", "bt-hint",
   "results-view", "rs-ending", "rs-rows", "rs-achv", "rs-back",
   "screen-chapters", "chapters-list",
   "splash-layer", "splash-text", "toast-container",
   "coffee-count", "app",
   "hall-runs", "hall-rejections", "hall-coffee", "hall-achv", "hall-endings",
   "opt-sound", "opt-motion", "opt-music"].forEach((id) => { els[id] = $(id); });
}
cacheUi();

const SCREENS = {
  title: "screen-title",
  settings: "screen-settings",
  hall: "screen-hall",
  chapters: "screen-chapters",
  story: "screen-story",
};

/* ---------- screens ---------- */
function showScreen(name) {
  for (const key of Object.values(SCREENS)) els[key].hidden = true;
  if (SCREENS[name]) {
    els[SCREENS[name]].hidden = false;
    document.getElementById("app").dataset.screen = name;
  }
}

function setContinueEnabled(enabled) {
  els["btn-continue"].disabled = !enabled;
}

/* ---------- story scene chrome ---------- */
function setChapterLabel(text) {
  els["chapter-label"].textContent = text;
}

function setBackground(name) {
  els["scene-bg"].dataset.bg = name;
}

function setPortrait(charId, expression) {
  const layer = els["portrait-layer"];
  layer.innerHTML = "";
  if (!charId) return;
  const char = getCharacter(charId);
  if (!char || !char.avatar) return;
  const img = document.createElement("img");
  img.className = "portrait-img " + char.cls;
  img.src = char.avatar(expression);
  img.alt = "";
  img.draggable = false;
  layer.appendChild(img);
}

function setStats(stats, coffee) {
  const fills = {
    rigor: els["hud"].querySelector('[data-stat="rigor"] .stat-fill'),
    patience: els["hud"].querySelector('[data-stat="patience"] .stat-fill'),
    time: els["hud"].querySelector('[data-stat="time"] .stat-fill'),
    credibility: els["hud"].querySelector('[data-stat="credibility"] .stat-fill'),
  };
  for (const [key, el] of Object.entries(fills)) {
    if (el && stats[key] !== undefined) el.style.width = (stats[key] * 10) + "%";
  }
  els["coffee-count"].textContent = String(coffee);
}

function showStatDeltas(deltas) {
  const labels = { rigor: "RIG", patience: "PAT", time: "TIME", credibility: "CRED", coffee: "COFFEE" };
  for (const [key, delta] of Object.entries(deltas)) {
    if (!delta || !labels[key]) continue;
    const statEl = els["hud"].querySelector(`[data-stat="${key}"]`) ||
                   els["hud"].querySelector(".stat-coffee");
    if (!statEl) continue;
    const tag = document.createElement("span");
    tag.className = `stat-delta ${delta > 0 ? "up" : "down"}`;
    tag.textContent = (delta > 0 ? "+" : "") + delta;
    statEl.appendChild(tag);
    setTimeout(() => tag.remove(), 1000);
  }
}

/* ---------- dialogue ---------- */
let typeTimer = null;
let typingDone = true;

function renderDialogue(charId, text, onAdvance) {
  clearChoices();
  els["email-view"].hidden = true;
  els["upload-layer"].hidden = true;
  els["dialogue-box"].hidden = false;

  const nameEl = els["speaker-name"];
  const textEl = els["dialogue-text"];
  textEl.classList.remove("narration-text");

  if (charId && getCharacter(charId)) {
    const char = getCharacter(charId);
    nameEl.hidden = false;
    nameEl.classList.remove("narration");
    nameEl.textContent = char.name;
    nameEl.style.color = char.theme;
  } else {
    nameEl.hidden = false;
    nameEl.classList.add("narration");
    textEl.classList.add("narration-text");
  }

  // typewriter
  clearInterval(typeTimer);
  typingDone = false;
  let i = 0;
  textEl.innerHTML = "";
  const finish = () => {
    clearInterval(typeTimer);
    typingDone = true;
    textEl.textContent = text;
    els["advance-hint"].hidden = !onAdvance;
  };
  typeTimer = setInterval(() => {
    i += 1;
    if (i >= text.length) { finish(); return; }
    textEl.innerHTML = escapeHtml(text.slice(0, i)) + '<span class="cursor">&#9608;</span>';
  }, 18);

  els["dialogue-box"].onclick = () => {
    if (!typingDone) { finish(); return; }
    if (onAdvance) { Sfx.advance(); onAdvance(); }
  };
}

function isTyping() { return !typingDone; }

/* ---------- choices ---------- */
function clearChoices() {
  els["choices"].innerHTML = "";
}

function renderChoices(prompt, choices, onChoose) {
  els["dialogue-box"].hidden = true;
  els["advance-hint"].hidden = true;
  clearChoices();

  if (prompt) {
    const p = document.createElement("p");
    p.className = "choice-prompt";
    p.textContent = prompt;
    els["choices"].appendChild(p);
  }
  const KEYS = ["A", "B", "C", "D", "E", "F"];
  choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "btn choice-btn";
    btn.style.animationDelay = (i * 0.07) + "s";
    btn.setAttribute("role", "menuitem");
    btn.innerHTML =
      `<span class="choice-key">${KEYS[i]}.</span>` +
      `<span class="choice-text">${escapeHtml(choice.text)}` +
      (choice.desc ? `<span class="choice-desc">${escapeHtml(choice.desc)}</span>` : "") +
      `</span>`;
    btn.onclick = () => { Sfx.choose(); onChoose(i); };
    els["choices"].appendChild(btn);
    btn.focus({ preventScroll: true });
  });
}

/* ---------- email ---------- */
function renderEmail(email, onContinue) {
  els["dialogue-box"].hidden = true;
  els["advance-hint"].hidden = true;
  clearChoices();
  els["email-view"].hidden = false;
  els["email-from"].textContent = email.from;
  els["email-subject"].textContent = email.subject;
  els["email-body"].textContent = email.body;
  const btn = els["email-continue"];
  btn.textContent = email.button || "CONTINUE";
  btn.onclick = () => { Sfx.click(); onContinue(); };
  btn.focus({ preventScroll: true });
}

/* ---------- upload animation ---------- */
function uploadAnimation(label, statuses, onDone) {
  els["dialogue-box"].hidden = true;
  clearChoices();
  els["upload-layer"].hidden = false;
  els["upload-title"].textContent = label;
  els["upload-fill"].style.width = "0%";
  els["upload-status"].textContent = statuses[0].text;

  let progress = 0;
  let si = 0;
  const step = () => {
    const status = statuses[si];
    if (status && progress >= status.at) {
      els["upload-status"].textContent = status.text;
      si += 1;
    }
    progress = Math.min(100, progress + Math.floor(Math.random() * 7) + 2);
    els["upload-fill"].style.width = progress + "%";
    if (progress % 20 < 9) Sfx.upload();
    if (progress < 100) {
      setTimeout(step, 120 + Math.random() * 160);
    } else {
      els["upload-status"].textContent = "Upload complete. Nothing can undo this now.";
      setTimeout(() => { els["upload-layer"].hidden = true; onDone(); }, 700);
    }
  };
  setTimeout(step, 350);
}

/* ---------- tracking (Chapter II status timeline) ---------- */
function trackingShow(onAdvance) {
  els["dialogue-box"].hidden = true;
  els["advance-hint"].hidden = true;
  clearChoices();
  els["tracking-view"].hidden = false;
  els["tk-rows"].innerHTML = "";
  els["tracking-view"].onclick = onAdvance;
}

function trackingAppend(entry, isCurrent) {
  const row = document.createElement("div");
  row.className = "tk-row" + (isCurrent ? " current" : "");
  row.innerHTML =
    `<div class="tk-line"><span class="tk-day">DAY ${String(entry.day).padStart(3, "0")}</span>` +
    `<span class="tk-status">${escapeHtml(entry.status)}</span></div>` +
    `<div class="tk-note">${escapeHtml(entry.note)}</div>`;
  els["tk-rows"].appendChild(row);
}

function trackingHide() {
  els["tracking-view"].hidden = true;
  els["tracking-view"].onclick = null;
}

/* ---------- chapter select ---------- */
function renderChapters(chapters, onPick) {
  const wrap = els["chapters-list"];
  wrap.innerHTML = "";
  chapters.forEach((c) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = c.title;
    btn.onclick = () => { Sfx.choose(); onPick(c.chapter); };
    wrap.appendChild(btn);
  });
}

/* ---------- battle ---------- */
let btTimer = null;
let btCtrl = null;

function typeInto(el, text, onDone) {
  clearInterval(btTimer);
  let i = 0;
  let finished = false;
  el.textContent = "";
  const finish = () => {
    clearInterval(btTimer);
    el.textContent = text;
    if (!finished) { finished = true; if (onDone) onDone(); }
  };
  btTimer = setInterval(() => {
    i += 1;
    if (i >= text.length) { finish(); return; }
    el.textContent = text.slice(0, i);
  }, 16);
  return { finish, isDone: () => finished };
}

function battleShow(scene) {
  els["dialogue-box"].hidden = true;
  els["advance-hint"].hidden = true;
  clearChoices();
  els["battle-view"].hidden = false;
  const char = getCharacter(scene.enemy);
  els["bt-name"].textContent = char ? char.name : scene.enemy;
  els["bt-name"].style.color = char ? char.theme : "var(--text)";
  els["bt-destr"].textContent = "DESTRUCTION " + (scene.destructionLevel || "?") + "/10";
  els["bt-reply"].hidden = true;
  els["bt-hint"].hidden = true;
  els["battle-view"].onclick = null;
}

function battleRound(total, index) {
  els["bt-round"].textContent = "ROUND " + index + "/" + total;
}

function battleComment(text) {
  els["bt-reply"].hidden = true;
  els["bt-hint"].hidden = true;
  els["battle-view"].onclick = null;
  btCtrl = typeInto(els["bt-comment"], text);
}

function battleOptions(options, onChoose) {
  const wrap = els["bt-actions"];
  wrap.innerHTML = "";
  const KEYS = ["A", "B", "C", "D"];
  options.forEach((o, i) => {
    const btn = document.createElement("button");
    btn.className = "btn choice-btn";
    btn.style.animationDelay = (i * 0.06) + "s";
    btn.innerHTML =
      `<span class="choice-key">${KEYS[i]}.</span>` +
      `<span class="choice-text">${escapeHtml(o.text)}` +
      (o.desc ? `<span class="choice-desc">${escapeHtml(o.desc)}</span>` : "") +
      `</span>`;
    btn.onclick = () => { Sfx.choose(); onChoose(i); };
    wrap.appendChild(btn);
  });
}

function battleReply(text, onContinue) {
  els["bt-actions"].innerHTML = "";
  els["bt-reply"].hidden = false;
  els["bt-hint"].hidden = true;
  btCtrl = typeInto(els["bt-reply"], text, () => { els["bt-hint"].hidden = false; });
  els["battle-view"].onclick = () => {
    if (btCtrl && !btCtrl.isDone()) { btCtrl.finish(); return; }
    els["battle-view"].onclick = null;
    Sfx.advance();
    onContinue();
  };
}

function battleHide() {
  els["battle-view"].hidden = true;
  els["battle-view"].onclick = null;
  clearInterval(btTimer);
}

/* ---------- minigame (Refresh Addiction / Rebuttal drafting) ---------- */
function renderMinigame(scene, counterText, statusText, onAction) {
  els["dialogue-box"].hidden = true;
  els["advance-hint"].hidden = true;
  clearChoices();
  els["minigame-view"].hidden = false;
  els["mg-title"].textContent = scene.header || "REFRESH ADDICTION";
  els["mg-message"].style.color = "";
  els["mg-days"].textContent = counterText;
  els["mg-status"].textContent = statusText;
  els["mg-message"].textContent = scene.intro || "";
  const wrap = els["mg-actions"];
  wrap.innerHTML = "";
  scene.actions.forEach((a, i) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = a.text;
    btn.onclick = () => { Sfx.click(); onAction(i); };
    wrap.appendChild(btn);
  });
}

function updateMinigame(counterText, statusText, message) {
  els["mg-days"].textContent = counterText;
  els["mg-status"].textContent = statusText;
  els["mg-message"].textContent = message;
}

function finishMinigame(message) {
  els["mg-message"].textContent = message;
  els["mg-message"].style.color = "var(--gold)";
  els["mg-actions"].innerHTML = "";
}

function hideMinigame() {
  els["minigame-view"].hidden = true;
}

/* ---------- results screen ---------- */
function renderResults(state, unlocked) {
  els["dialogue-box"].hidden = true;
  els["advance-hint"].hidden = true;
  clearChoices();
  els["results-view"].hidden = false;

  const letter = state.currentEnding || "?";
  const colors = { A: "var(--green)", B: "var(--red)", C: "var(--purple)", D: "var(--gold)" };
  els["rs-ending"].textContent = ENDING_NAMES[letter] || "UNKNOWN";
  els["rs-ending"].style.color = colors[letter] || "var(--text)";

  const rows = [
    ["JOURNAL", state.selectedJournal ? state.selectedJournal.name : "—"],
    ["DAYS WAITED", String(state.totalDays)],
    ["REVISION ROUNDS", String(state.manuscript.revisionRound)],
    ["COFFEES", String(state.coffeeConsumed)],
    ["PORTAL REFRESHES", String(state.flags.refreshCount || 0)],
    ["SARCASTIC REPLIES", String(state.flags.sarcasticCount || 0)],
  ];
  els["rs-rows"].innerHTML = rows
    .map(([k, v]) => `<div class="rs-row"><span>${escapeHtml(k)}</span><span>${escapeHtml(v)}</span></div>`)
    .join("");

  els["rs-achv"].innerHTML = unlocked.length
    ? unlocked.map((a, i) => {
        const div = `<div class="rs-achv-item" style="animation-delay:${i * 0.12}s">&#9733; ${escapeHtml(a.title)}</div>`;
        return div;
      }).join("")
    : `<div class="rs-achv-item rs-achv-none">None this run. The suffering was its own reward.</div>`;

  els["rs-back"].onclick = () => {
    Sfx.click();
    els["results-view"].hidden = true;
    showScreen("title");
    setContinueEnabled(false); // the finished run cleared its save
  };
}

/* ---------- confetti ---------- */
function celebrate() {
  const layer = document.getElementById("fx-layer");
  const colors = ["#22C55E", "#FBBF24", "#F8FAFC", "#38BDF8"];
  for (let i = 0; i < 48; i++) {
    const p = document.createElement("div");
    p.className = "confetti";
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = (Math.random() * 1.2) + "s";
    p.style.animationDuration = (2 + Math.random() * 1.6) + "s";
    layer.appendChild(p);
    setTimeout(() => p.remove(), 5000);
  }
}

/* ---------- splash ---------- */
function showSplash(text, variant = "neutral", holdMs = 1600, sound = true) {
  return new Promise((resolve) => {
    const layer = els["splash-layer"];
    layer.className = variant;
    layer.hidden = false;
    els["splash-text"].textContent = text;
    if (sound) {
      if (variant === "success") Sfx.success();
      else if (variant === "danger") Sfx.danger();
      else Sfx.splash();
    }
    const close = () => {
      layer.hidden = true;
      layer.onclick = null;
      resolve();
    };
    layer.onclick = close; // impatient players can click through
    setTimeout(close, holdMs);
  });
}

/* ---------- toast ---------- */
function toast(text, tone = "t-gold") {
  const el = document.createElement("div");
  el.className = `toast ${tone}`;
  el.textContent = text;
  els["toast-container"].appendChild(el);
  setTimeout(() => el.remove(), 3400);
}

/* ---------- screen shake ---------- */
function shake() {
  const app = els["app"];
  app.classList.remove("shaking");
  void app.offsetWidth; // restart the animation
  app.classList.add("shaking");
}

/* ---------- settings ---------- */
function syncSettings(meta) {
  const s = els["opt-sound"], m = els["opt-motion"], u = els["opt-music"];
  s.textContent = meta.settings.sound ? "ON" : "OFF";
  s.setAttribute("aria-pressed", String(!!meta.settings.sound));
  m.textContent = meta.settings.motion ? "ON" : "OFF";
  m.setAttribute("aria-pressed", String(!!meta.settings.motion));
  u.textContent = meta.settings.music ? "ON" : "OFF";
  u.setAttribute("aria-pressed", String(!!meta.settings.music));
  document.body.classList.toggle("reduced-motion", !meta.settings.motion);
}

/* ---------- hall ---------- */
function renderHall(meta) {
  els["hall-runs"].textContent = String(meta.runs);
  els["hall-rejections"].textContent = String(meta.rejections);
  els["hall-coffee"].textContent = String(meta.coffeeTotal);
  const achCount = Object.values(meta.achievements || {}).filter(Boolean).length;
  els["hall-achv"].textContent = String(achCount);

  const ENDINGS = {
    A: "ACCEPTED",
    B: "REJECTED",
    C: "ETERNAL REVISION",
    D: "???",
  };
  const wrapEl = els["hall-endings"];
  wrapEl.innerHTML = "";
  for (const [letter, name] of Object.entries(ENDINGS)) {
    const found = meta.endingsFound.includes(letter);
    const slot = document.createElement("div");
    slot.className = "ending-slot" + (found ? " found" : "");
    slot.dataset.ending = letter;
    slot.innerHTML = `<span class="slot-letter">${found ? letter : "?"}</span>${found ? name : "UNDISCOVERED"}`;
    wrapEl.appendChild(slot);
  }
}

/* ---------- misc ---------- */
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function hideStoryOverlays() {
  els["email-view"].hidden = true;
  els["upload-layer"].hidden = true;
  els["splash-layer"].hidden = true;
  els["dialogue-box"].hidden = true;
  els["advance-hint"].hidden = true;
  els["tracking-view"].hidden = true;
  els["minigame-view"].hidden = true;
  els["battle-view"].hidden = true;
  els["results-view"].hidden = true;
  clearChoices();
}
