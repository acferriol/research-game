# PUBLISH OR PERISH
### The Peer Review Nightmare

> One paper. Three reviewers. Zero mercy.

A comedic narrative game about the academic publishing underworld. You are Dr. Hope,
a young researcher about to submit the manuscript that will change science forever:
*"The Mystery of the Missing Sock: A Longitudinal Study of Domestic Washing Machines."*

It will be reviewed by a kind elderly professor, a spectral reviewer who has been trying
to open Figure 3 since 1987, and Reviewer #2 — who will submit a 37-page report about
the psychological perspective of the missing socks.

Built with **vanilla HTML5, CSS3 and JavaScript**. No frameworks, no build step,
no dependencies, no external services. Works from a double-click and on GitHub Pages.

## Look & feel

Dark-academia pixel aesthetic: a stormy office at 02:47 AM, a retro editorial portal
with blinking cursors, turn-based "combat" against reviewers rendered as pixel-art
portraits (inline SVG), typewriter dialogue, screen shake, red WARNING splashes for
Reviewer #2, and confetti when the impossible happens.

## How to run

Just open `index.html` in your browser. That's it.

Optionally, serve it statically (GitHub Pages parity):

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Repository **Settings → Pages → Source**: select your main branch, root.
3. Done. The game works from a project subpath (`<user>.github.io/<repo>/`) because
   every asset reference is relative — no routing, no backend, no build.

## Mechanics

- **Four resources**: Rigor (your science), Patience (your sanity), Time (your
  deadline) and Credibility (your reputation). Every choice moves them.
- **Five chapters**: submission, the waiting game, the reviewers, the rebuttal wars,
  and the final decision — each with its own mechanics.
- **Editorial combat**: reviewers attack with comments; you respond with science,
  diplomacy, or career-ending sarcasm. Relationships persist.
- **Refresh Addiction**: a waiting minigame where refreshing the portal feels good
  and accomplishes nothing. Just like in real life.
- **Rebuttal drafting**: answer 42 comments under a 10-day time budget; the rebuttal
  quality you earn decides your fate.
- **Four endings**, resolved by explicit priority — the corrupt become Reviewer #2:
  - **ACCEPTED** (with a €2,500 Article Processing Charge punchline)
  - **REJECTED** ("We regret to inform you...")
  - **ETERNAL MAJOR REVISION** (Year 2047. One additional experiment remains.)
  - **YOU BECOME REVIEWER #2** (secret ending)
- **8 random events** between scenes: coffee overdose, haunted LaTeX compilers,
  Reviewer #1 defending you in public, editors with devastatingly empty urgent emails.
- **8 persistent achievements** and a Hall of Rejections that remembers everything.

## Controls

- **Mouse**: click to advance dialogue, choose options, continue after each battle reply.
- **Keyboard**: `Enter` / `Space` advances dialogue, `A`–`C` pick options and battle responses.
- Splashes can be clicked through if you cannot bear the suspense.
- Everything autosaves. Finished runs are archived into the Hall of Rejections.

## Save system

- `localStorage` with versioned keys: `pop_save_v1` (current run, autosaved every
  scene) and `pop_meta_v1` (hall stats, achievements, discovered endings, settings).
- Corrupt saves are detected and discarded instead of breaking the game.
- Settings let you toggle sound effects, background music and animations
  (animations also respect `prefers-reduced-motion`).
- **CHAPTER SELECT** on the title screen starts a fresh run at any chapter with a
  tuned state — for testing and for the impatient.

## File structure

```text
publish-or-perish/
├── index.html            — screens skeleton, story chrome
├── README.md
├── css/
│   ├── main.css          — palette, panels, screens, HUD, battle, results
│   ├── animations.css    — keyframes (rain, lightning, glitch, confetti...)
│   └── responsive.css    — tablets and phones
├── js/
│   ├── main.js           — boot, menu wiring, global input
│   ├── gameState.js      — central state model, effects, conditions
│   ├── gameEngine.js     — declarative scene interpreter + validation
│   ├── story.js          — all scene data (five chapters, four endings)
│   ├── characters.js     — cast data (avatars live in assets/)
│   ├── battles.js        — turn-based editorial combat
│   ├── events.js         — random event catalog
│   ├── endings.js        — ending priority resolution + achievements
│   ├── audio.js          — Web Audio synthesized SFX + ambient music
│   ├── ui.js             — centralized DOM rendering (the only DOM module)
│   └── storage.js        — versioned localStorage persistence
├── assets/
│   ├── avatars/          — 10 standalone pixel-art SVG portraits
│   └── icons/            — favicon.svg
└── tools/                 — dev-only, the game never needs these
    ├── avatar-art.mjs        — pixel art source of truth
    ├── generate-avatars.mjs  — regenerates assets/avatars/*.svg
    └── smoke.mjs             — headless regression: plays the whole campaign
```

## Dev tools (optional)

```bash
node tools/generate-avatars.mjs   # regenerate avatar SVGs from pixel art source
node tools/smoke.mjs              # full-campaign regression: 46 assertions
```

## Possible expansions

- More journals with unique editorial twists (the predatory one deserves a storyline).
- Reviewer #3's haunted bibliography as a collectible side quest.
- A second campaign: Dr. Hope's tenure dossier.
- Translations (all copy is data in `story.js` / `events.js`).

---

*Manuscript #SOCK-0042. No reviewers were harmed in the making of this game.
Some socks, however, remain unaccounted for.*
