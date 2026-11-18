/* ============ characters.js — cast data. Pixel art lives in assets/avatars/ (see tools/avatar-art.mjs) ============ */

const AVATARS = "assets/avatars/";

const HOPE_EXPRESSIONS = ["happy", "confused", "worried", "furious", "exhausted", "victorious"];

const CHARACTERS = {
  hope: {
    name: "DR. HOPE", theme: "#38BDF8", cls: "char-hope",
    avatar: (expr) => AVATARS + "hope-" + (HOPE_EXPRESSIONS.includes(expr) ? expr : "happy") + ".svg",
  },
  editor: {
    name: "THE EDITOR", theme: "#FBBF24", cls: "char-editor",
    avatar: () => AVATARS + "editor.svg",
  },
  reviewer1: {
    name: "REVIEWER #1", theme: "#22C55E", cls: "char-r1",
    avatar: () => AVATARS + "reviewer1.svg",
  },
  reviewer2: {
    name: "REVIEWER #2", theme: "#EF4444", cls: "char-r2",
    avatar: () => AVATARS + "reviewer2.svg",
  },
  reviewer3: {
    name: "REVIEWER #3", theme: "#9FE8E8", cls: "char-r3",
    avatar: () => AVATARS + "reviewer3.svg",
  },
  system: {
    name: "EDITORIAL SYSTEM", theme: "#94A3B8", cls: "", avatar: null,
  },
};

function getCharacter(id) { return CHARACTERS[id] || null; }
