/* ============ tools/avatar-art.mjs — single source of truth for character pixel art ============ */

const R = (x, y, w, h, fill, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;

const wrap = (inner, cls = "") =>
  `<svg viewBox="0 0 32 32" shape-rendering="crispEdges" class="portrait ${cls}">${inner}</svg>`;

/* --- Dr. Hope --- */
function hope(expression) {
  const hair = "#7C4A2D", hairD = "#5A341E", skin = "#F2C9A0", skinD = "#D9A87C",
        coat = "#E8ECF4", coatD = "#B8C0D4", shirt = "#3A6EA5",
        frame = "#1C2430", lens = "rgba(56,189,248,0.30)";

  let s = "";
  s += R(8, 2, 16, 3, hair) + R(6, 3, 2, 2, hair) + R(24, 3, 2, 2, hair)
     + R(10, 5, 1, 2, hair) + R(21, 5, 1, 2, hair) + R(7, 6, 2, 5, hair) + R(23, 6, 2, 5, hair);
  s += R(9, 6, 14, 12, skin) + R(8, 10, 1, 3, skin) + R(23, 10, 1, 3, skin)
     + R(9, 6, 14, 1, skinD) + R(9, 17, 1, 1, skinD) + R(22, 17, 1, 1, skinD);
  s += R(10, 9, 5, 4, frame) + R(17, 9, 5, 4, frame) + R(11, 10, 3, 2, lens) + R(18, 10, 3, 2, lens)
     + R(15, 10, 2, 1, frame) + R(9, 9, 1, 2, frame) + R(22, 9, 1, 2, frame);
  s += R(14, 18, 4, 2, skinD);
  s += R(5, 20, 22, 9, coat) + R(5, 20, 22, 1, coatD) + R(5, 28, 22, 1, coatD)
     + R(13, 20, 6, 4, shirt) + R(14, 20, 1, 7, coatD) + R(17, 20, 1, 7, coatD)
     + R(4, 22, 1, 4, coatD) + R(27, 22, 1, 4, coatD);

  const eyes = {
    happy:      R(12, 10, 1, 2, "#10131C") + R(19, 10, 1, 2, "#10131C"),
    confused:   R(12, 11, 1, 2, "#10131C") + R(19, 10, 1, 2, "#10131C"),
    worried:    R(12, 11, 1, 1, "#10131C") + R(19, 11, 1, 1, "#10131C"),
    furious:    R(12, 10, 1, 1, "#10131C") + R(19, 10, 1, 1, "#10131C"),
    exhausted:  R(12, 12, 1, 1, "#10131C") + R(19, 12, 1, 1, "#10131C"),
    victorious: R(12, 10, 1, 2, "#FBBF24") + R(19, 10, 1, 2, "#FBBF24"),
  };
  const brows = {
    happy:      R(10, 8, 4, 1, hairD) + R(18, 8, 4, 1, hairD),
    confused:   R(10, 7, 4, 1, hairD) + R(18, 8, 4, 1, hairD),
    worried:    R(11, 7, 3, 1, hairD) + R(18, 7, 3, 1, hairD) + R(11, 8, 1, 1, hairD) + R(20, 8, 1, 1, hairD),
    furious:    R(10, 8, 4, 1, hairD) + R(18, 8, 4, 1, hairD) + R(13, 9, 1, 1, hairD) + R(18, 9, 1, 1, hairD),
    exhausted:  R(10, 9, 4, 1, hairD) + R(18, 9, 4, 1, hairD),
    victorious: R(10, 8, 4, 1, hairD) + R(18, 8, 4, 1, hairD),
  };
  const mouth = {
    happy:      R(12, 15, 8, 1, "#8C3B3B") + R(13, 16, 6, 1, "#8C3B3B"),
    confused:   R(13, 16, 6, 1, "#8C3B3B") + R(18, 15, 1, 1, "#8C3B3B"),
    worried:    R(14, 15, 4, 2, "#8C3B3B"),
    furious:    R(12, 16, 8, 1, "#EF4444") + R(12, 15, 2, 1, "#8C3B3B") + R(18, 15, 2, 1, "#8C3B3B"),
    exhausted:  R(13, 16, 6, 1, "#8C3B3B") + R(10, 14, 4, 1, skinD) + R(18, 14, 4, 1, skinD),
    victorious: R(12, 15, 8, 1, "#8C3B3B") + R(13, 16, 6, 1, "#8C3B3B") + R(14, 17, 4, 1, "#8C3B3B"),
  };
  const extras = {
    worried:    R(25, 7, 1, 2, "#38BDF8") + R(25, 9, 1, 1, "rgba(56,189,248,.5)"),
    furious:    R(9, 13, 2, 1, "#E88") + R(21, 13, 2, 1, "#E88"),
    exhausted:  R(26, 6, 2, 2, "#94A3B8"),
    victorious: R(26, 4, 2, 2, "#FBBF24") + R(25, 5, 1, 1, "#FBBF24") + R(28, 5, 1, 1, "#FBBF24"),
  };
  s += (eyes[expression] || eyes.happy) + (brows[expression] || brows.happy)
     + (mouth[expression] || mouth.happy) + (extras[expression] || "");
  return wrap(s, "char-hope");
}

/* --- The Editor --- */
function editor() {
  const hair = "#CDD3E0", skin = "#E8C9AC", suit = "#10131C", suitD = "#05070D",
        shirt = "#E8ECF4", tie = "#EF4444";
  let s = "";
  s += R(9, 2, 14, 3, hair) + R(9, 5, 14, 1, "#9AA3B5") + R(16, 2, 1, 4, "#9AA3B5")
     + R(8, 5, 2, 4, hair) + R(22, 5, 2, 4, hair);
  s += R(10, 6, 12, 11, skin) + R(10, 6, 12, 1, "#C8A184");
  s += R(11, 9, 3, 1, "#10131C") + R(18, 9, 3, 1, "#10131C")
     + R(11, 10, 1, 1, "#10131C") + R(20, 10, 1, 1, "#10131C");
  s += R(14, 12, 1, 3, "#C8A184") + R(14, 16, 4, 1, "#8C5A4A");
  s += R(14, 17, 4, 2, skin);
  s += R(5, 20, 22, 9, suit) + R(5, 20, 22, 1, suitD) + R(5, 28, 22, 1, suitD)
     + R(13, 20, 6, 6, shirt) + R(15, 21, 2, 6, tie) + R(15, 20, 2, 1, "#7F1D1D")
     + R(4, 22, 1, 4, suitD) + R(27, 22, 1, 4, suitD);
  return wrap(s, "char-editor");
}

/* --- Reviewer #1 --- */
function reviewer1() {
  const skin = "#E8C9AC", hair = "#CDD3E0", hairD = "#9AA3B5", tweed = "#6B4F2A", tweedD = "#513A20";
  let s = "";
  s += R(10, 4, 12, 7, skin);
  s += R(8, 4, 2, 8, hair) + R(22, 4, 2, 8, hair) + R(8, 3, 2, 1, hair) + R(22, 3, 2, 1, hair);
  s += R(9, 9, 6, 5, hairD) + R(17, 9, 6, 5, hairD)
     + R(10, 10, 4, 3, "#BFE3FF") + R(18, 10, 4, 3, "#BFE3FF")
     + R(12, 11, 1, 1, "#10131C") + R(20, 11, 1, 1, "#10131C");
  s += R(14, 15, 4, 2, skin);
  s += R(9, 16, 14, 7, hair) + R(9, 16, 14, 1, hairD) + R(10, 22, 12, 1, hairD)
     + R(13, 18, 6, 1, "#8C6A55");
  s += R(5, 21, 22, 8, tweed) + R(5, 21, 22, 1, tweedD) + R(5, 28, 22, 1, tweedD)
     + R(8, 24, 2, 2, tweedD) + R(14, 26, 2, 2, tweedD) + R(21, 23, 2, 2, tweedD)
     + R(13, 21, 6, 3, "#D9555A") + R(14, 21, 4, 1, "#8C2F36");
  return wrap(s, "char-r1");
}

/* --- Reviewer #2 --- */
function reviewer2() {
  const cloak = "#14101F", rim = "#2A1F4D", void_ = "#050308";
  let s = "";
  s += R(14, 2, 4, 2, cloak) + R(12, 3, 8, 2, cloak);
  s += R(6, 5, 20, 3, cloak) + R(4, 8, 24, 6, cloak) + R(6, 14, 20, 7, cloak);
  s += R(6, 5, 1, 3, rim) + R(25, 5, 1, 3, rim) + R(4, 8, 1, 6, rim) + R(27, 8, 1, 6, rim)
     + R(6, 14, 1, 7, rim) + R(25, 14, 1, 7, rim);
  s += R(10, 8, 12, 11, void_);
  s += R(10, 11, 7, 4, "rgba(127,29,29,.55)") + R(15, 11, 7, 4, "rgba(127,29,29,.55)");
  s += R(12, 12, 2, 2, "#FF2D2D") + R(18, 12, 2, 2, "#FF2D2D")
     + R(12, 12, 1, 1, "#FFB4B4") + R(18, 12, 1, 1, "#FFB4B4");
  s += R(9, 18, 2, 3, rim) + R(21, 18, 2, 3, rim);
  return wrap(s, "char-r2");
}

/* --- Reviewer #3 --- */
function reviewer3() {
  const body = "#9FE8E8", bodyD = "#6FBFBC", void_ = "#0B1020";
  let s = "";
  s += R(10, 4, 12, 2, body) + R(9, 6, 14, 12, body) + R(9, 6, 14, 1, bodyD);
  s += R(11, 6, 2, 3, bodyD) + R(19, 6, 2, 3, bodyD);
  s += R(12, 9, 2, 3, void_) + R(18, 9, 2, 3, void_);
  s += R(14, 14, 4, 2, void_);
  s += R(9, 18, 2, 3, body) + R(13, 18, 3, 2, body) + R(17, 19, 3, 2, body) + R(20, 18, 3, 3, body);
  s += R(6, 8, 2, 6, "rgba(159,232,232,.35)") + R(24, 8, 2, 6, "rgba(159,232,232,.35)");
  return wrap(s, "char-r3");
}

export const HOPE_EXPRESSIONS = ["happy", "confused", "worried", "furious", "exhausted", "victorious"];

export const AVATAR_ART = {
  hope: { cls: "char-hope", render: hope, expressions: HOPE_EXPRESSIONS },
  editor: { cls: "char-editor", render: editor },
  reviewer1: { cls: "char-r1", render: reviewer1 },
  reviewer2: { cls: "char-r2", render: reviewer2 },
  reviewer3: { cls: "char-r3", render: reviewer3 },
};
