/* ============ main.js — boot, menu wiring, global input ============ */

let meta;

function firstGesture() {
  Sfx.init();
  Sfx.setEnabled(meta.settings.sound);
  Music.setEnabled(meta.settings.music);
  window.removeEventListener("pointerdown", firstGesture);
  window.removeEventListener("keydown", firstGesture);
}

function toTitle() {
  showScreen("title");
  setContinueEnabled(!!Storage.loadGame());
}

function wireButtons() {
  const on = (id, fn) => {
    const el = document.getElementById(id);
    el.addEventListener("click", () => { Sfx.click(); fn(); });
    el.addEventListener("mouseenter", () => Sfx.hover());
  };

  on("btn-new", () => newGame());
  on("btn-continue", () => { if (!continueGame()) toast("No saved manuscript found.", "t-red"); });
  on("btn-hall", () => { renderHall(meta); showScreen("hall"); });
  on("btn-settings", () => { syncSettings(meta); showScreen("settings"); });
  on("btn-chapters", () => { renderChapters(CHAPTER_INDEX, (n) => startChapter(n)); showScreen("chapters"); });
  on("btn-hall-back", toTitle);
  on("btn-settings-back", toTitle);
  on("btn-chapters-back", toTitle);

  on("opt-sound", () => {
    meta.settings.sound = !meta.settings.sound;
    Sfx.setEnabled(meta.settings.sound);
    Storage.saveMeta(meta);
    syncSettings(meta);
  });

  on("opt-music", () => {
    meta.settings.music = !meta.settings.music;
    Music.setEnabled(meta.settings.music);
    Storage.saveMeta(meta);
    syncSettings(meta);
  });

  on("opt-motion", () => {
    meta.settings.motion = !meta.settings.motion;
    Storage.saveMeta(meta);
    syncSettings(meta);
  });

  on("opt-reset", () => {
    const btn = document.getElementById("opt-reset");
    if (btn.dataset.armed) {
      Storage.resetAll();
      meta = Storage.loadMeta();
      Sfx.setEnabled(meta.settings.sound);
      btn.dataset.armed = "";
      btn.textContent = "RESET";
      toast("All data deleted. A clean, ignorant mind.", "t-red");
      toTitle();
    } else {
      btn.dataset.armed = "1";
      btn.textContent = "SURE?";
      setTimeout(() => { btn.dataset.armed = ""; btn.textContent = "RESET"; }, 2600);
    }
  });
}

function boot() {
  meta = Storage.loadMeta();
  Sfx.setEnabled(meta.settings.sound);
  syncSettings(meta);

  window.addEventListener("pointerdown", firstGesture);
  window.addEventListener("keydown", firstGesture);
  window.addEventListener("keydown", (e) => handleKey(e));

  const errors = validateStory();
  if (errors.length) {
    console.error("STORY VALIDATION FAILED:\n" + errors.join("\n"));
    toast("Story data error — check console.", "t-red");
  }

  wireButtons();
  toTitle();
}

boot();
