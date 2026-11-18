/* ============ story.js — declarative scene content (Chapter I) ============ */

const JOURNALS = {
  ijae: { id: "ijae", name: "International Journal of Absolutely Everything", prestige: 5, difficulty: "hard" },
  jass: { id: "jass", name: "Journal of Applied Sock Sciences", prestige: 3, difficulty: "balanced" },
  usdm: { id: "usdm", name: "Universal Scientific Discoveries & More", prestige: 1, difficulty: "suspicious" },
};

/* Chapter select menu data: entry points + starting presets per chapter */
const CHAPTER_INDEX = [
  { chapter: 1, title: "CHAPTER I — THE SUBMISSION", entry: "intro_1" },
  { chapter: 2, title: "CHAPTER II — THE WAITING GAME", entry: "c2_intro" },
  { chapter: 3, title: "CHAPTER III — ENTER THE REVIEWERS", entry: "c3_intro" },
  { chapter: 4, title: "CHAPTER IV — THE REBUTTAL WARS", entry: "c4_intro" },
  { chapter: 5, title: "CHAPTER V — THE FINAL DECISION", entry: "c5_intro" },
];

const CHAPTER_PRESETS = {
  2: { journal: JOURNALS.jass },
  3: { journal: JOURNALS.jass },
  4: {
    journal: JOURNALS.jass,
    stats: { time: 10 },
    relationships: { reviewer1: 2, reviewer2: 0, reviewer3: 1 },
    flags: { r1_defeated: true, r2_defeated: true, r3_defeated: true },
    manuscript: { revisionRound: 1 },
  },
  5: {
    journal: JOURNALS.jass,
    stats: { patience: 8, rigor: 5, time: 6, credibility: 5 },
    relationships: { reviewer1: 2, reviewer2: 0, reviewer3: 1 },
    flags: { r1_defeated: true, r2_defeated: true, r3_defeated: true, waitTarget: 177, refreshCount: 2 },
    manuscript: { revisionRound: 1, rebuttalQuality: 0 },
  },
};

const STORY = {

  /* ---------- CHAPTER I — THE SUBMISSION ---------- */

  intro_1: {
    chapter: 1,
    chapterLabel: "CHAPTER I — THE SUBMISSION",
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "happy",
    text: "02:47 AM. Three years of research. Forty-two experiments. Seventeen coffees today. It's finally ready.",
    next: "intro_2",
  },

  intro_2: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "happy",
    text: "Tonight, the world learns why socks vanish inside washing machines. Tonight... I become a published scientist.",
    next: "intro_3",
  },

  intro_3: {
    type: "dialogue",
    bg: "office",
    character: "system",
    text: "SUBMISSION KIT LOADED — RIGOR is your science. PATIENCE is your sanity. TIME is your deadline. CRED is your reputation. Guard them. They will be attacked.",
    next: "intro_4",
  },

  intro_4: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "confused",
    text: "Now... where do I send my masterpiece? This decision will haunt my dreams. And my inbox.",
    next: "journal_select",
  },

  journal_select: {
    type: "choice",
    bg: "office",
    character: "hope",
    expression: "confused",
    prompt: "Choose your target journal",
    choices: [
      {
        text: "International Journal of Absolutely Everything",
        desc: "Prestige: ★★★★★ — Acceptance rate: 0.4%. Eternal glory or public humiliation.",
        journal: JOURNALS.ijae,
        effects: { credibility: 1 },
        next: "react_ijae",
      },
      {
        text: "Journal of Applied Sock Sciences",
        desc: "Prestige: ★★★ — A cozy, peer-reviewed home for cozy feet research.",
        journal: JOURNALS.jass,
        next: "react_jass",
      },
      {
        text: "Universal Scientific Discoveries & More",
        desc: "Prestige: ★ — Accepted my colleague's paper in 48 hours. Suspiciously fast.",
        journal: JOURNALS.usdm,
        effects: { credibility: -1 },
        set: { predatory: true },
        next: "react_usdm",
      },
    ],
  },

  react_ijae: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "worried",
    text: "The International Journal of Absolutely Everything. Impact factor: 47. If I get in, I'm basically a god. If I don't... I'm basically everyone.",
    next: "submit_intro",
  },

  react_jass: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "happy",
    text: "The Journal of Applied Sock Sciences. Respected. Rigorous. The impact factor is modest, but so is my ego. Mostly.",
    next: "submit_intro",
  },

  react_usdm: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "confused",
    text: "Universal Scientific Discoveries & More. They emailed ME first. That's... that's normal, right? That happens to everyone, right?",
    next: "submit_intro",
  },

  submit_intro: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "happy",
    text: "Deep breath. Cover letter polished. Figures at 300 dpi. References formatted in APA, IEEE AND Chicago, just in case. Let's make history.",
    next: "upload_main",
  },

  upload_main: {
    type: "upload",
    bg: "editorial",
    label: "UPLOADING: manuscript_final_FINAL_v7.pdf",
    statuses: [
      { at: 0,   text: "Connecting to editorial server..." },
      { at: 30,  text: "Uploading manuscript... do not close this window. Ever." },
      { at: 55,  text: "Reviewer #3 has gone ghost mode. Ignoring." },
      { at: 80,  text: "Negotiating with the cloud..." },
      { at: 95,  text: "Almost there. Regret loading..." },
    ],
    next: "submission_success",
  },

  submission_success: {
    type: "splash",
    bg: "editorial",
    text: "SUBMISSION SUCCESSFUL",
    variant: "success",
    next: "email_received",
  },

  email_received: {
    type: "email",
    bg: "mail",
    email: (state) => ({
      from: `editorial.office@${(state.selectedJournal && state.selectedJournal.id) || "journal"}.org`,
      subject: "Manuscript #SOCK-0042 — Received",
      body:
        "Dear Dr. Hope,\n\n" +
        "Your manuscript \"The Mystery of the Missing Sock: A Longitudinal " +
        "Study of Domestic Washing Machines\" has been successfully received.\n\n" +
        "Manuscript ID: SOCK-0042\n\n" +
        "Please do not contact us. We will contact you.\n\n" +
        "Sincerely,\nThe Editorial Office",
      button: "CONTINUE",
    }),
    next: "with_editor",
  },

  with_editor: {
    type: "splash",
    bg: "editorial",
    text: "STATUS: WITH EDITOR",
    variant: "neutral",
    holdMs: 1900,
    next: "final_line",
  },

  final_line: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "happy",
    text: "This time they'll definitely accept it without changes.",
    next: "chapter_end",
  },

  chapter_end: {
    type: "splash",
    bg: "dark",
    text: "CHAPTER I COMPLETE\nTHE WAITING BEGINS...",
    variant: "neutral",
    holdMs: 2400,
    next: "c2_intro",
  },

  /* ---------- CHAPTER II — THE WAITING GAME ---------- */

  c2_intro: {
    chapter: 2,
    chapterLabel: "CHAPTER II — THE WAITING GAME",
    type: "dialogue",
    bg: "editorial",
    character: "system",
    text: "SUBMISSION LOG — Estimated review time: 2 to 6 weeks. Please do not contact us. Please do not refresh. Please.",
    next: "tracking_1",
  },

  tracking_1: {
    type: "tracking",
    bg: "editorial",
    entries: [
      { day: 4,   status: "WITH EDITOR",      note: "Day 4. Everything is fine. It's a marathon, not a sprint." },
      { day: 19,  status: "WITH EDITOR",      note: "Day 19. Still fine. Totally, completely, professionally fine." },
      { day: 36,  status: "UNDER REVIEW",     note: "Day 36. A stranger is reading about my socks. A stranger is JUDGING my socks.", notify: true },
      { day: 91,  status: "UNDER REVIEW",     note: "Day 91. How long does it take to read fourteen pages? I've read War and Peace twice." },
      { day: 132, status: "REVIEWER INVITED", note: "Day 132. Status updated. A reviewer has been... invited?", notify: true },
    ],
    next: "rant_1",
  },

  rant_1: {
    type: "dialogue",
    bg: "editorial",
    character: "hope",
    expression: "furious",
    shake: true,
    text: "REVIEWER INVITED?! WHO WAS REVIEWING IT BEFORE?! WHO?!",
    next: "rant_2",
  },

  rant_2: {
    type: "dialogue",
    bg: "editorial",
    character: "hope",
    expression: "exhausted",
    text: "Okay. Okay. Breathe. There's nothing left to do but wait like a normal, healthy person. I can do that. I am a professional.",
    next: "rant_3",
  },

  rant_3: {
    type: "dialogue",
    bg: "editorial",
    character: "hope",
    expression: "confused",
    text: "...I'll just check the portal one more time. One more. Then I stop. Definitely.",
    next: "refresh_game",
  },

  refresh_game: {
    type: "minigame",
    bg: "editorial",
    statusLabel: "STATUS: REVIEWER INVITED",
    targetFlag: "waitTarget",
    days: 45,
    intro: "The portal glows softly. Nobody is forcing you to refresh. Nobody has to.",
    doneMessage: "A NEW EMAIL HAS ARRIVED.",
    actions: [
      {
        key: "refresh",
        text: "REFRESH THE PORTAL",
        days: 1,
        effects: { patience: -1 },
        countFlag: "refreshCount",
        messages: [
          "Status: REVIEWER INVITED. Exactly as it was 4 seconds ago.",
          "You refreshed. The universe remains unchanged.",
          "Nothing happened. But you felt something. Briefly.",
          "The portal laughed at you. Probably.",
          "REFRESHED. Results: identical. Serotonin: -1.",
          "Fun fact: refreshing does not speed up peer review. Fun.",
        ],
      },
      {
        key: "coffee",
        text: "DRINK COFFEE",
        days: 2,
        effects: { patience: 1, coffee: 1 },
        messages: [
          "The coffee is warm. The review is not.",
          "Cup of the day. The 'day' is also cup-shaped at this point.",
          "Caffeine acquired. Hands trembling in scholarly patterns.",
          "This coffee has received more updates than your manuscript.",
        ],
      },
      {
        key: "work",
        text: "WORK ON A SIDE PROJECT",
        days: 8,
        messages: [
          "You drafted 'Towel Absorption: The Missing Chapter.' Productive!",
          "You graded 40 exams. You felt powerful. Then sad.",
          "You built a tiny sock simulator in Excel. Science never sleeps.",
          "Side project milestone reached! It also needs peer review. ...Later.",
        ],
      },
      {
        key: "rest",
        text: "REST. ACTUALLY REST.",
        days: 6,
        effects: { patience: 2 },
        messages: [
          "You slept 8 hours. The manuscript has slept 132 days. Fair.",
          "Rested. Refreshed. The inbox: still undefeated.",
          "You dreamed the paper was accepted. Then you woke up. Classic.",
          "A walk outside. Grass exists! Who knew.",
        ],
      },
      {
        key: "editor",
        text: "EMAIL THE EDITOR",
        days: 4,
        effects: { patience: -1 },
        chance: {
          p: 0.25,
          successEffects: { patience: 3 },
          successMsgs: [
            "The editor replied! 'Your manuscript is in process.' Ambiguous, but JOY.",
            "A reply! 'We will inform you of the decision in due course.' Due course. Naturally.",
          ],
          failMsgs: [
            "You emailed the editor. The void emailed back: nothing.",
            "Auto-reply: 'Your inquiry is very important to us.' Sure.",
            "Read: 0 times. Felt: 100 times.",
          ],
        },
      },
    ],
    next: "decision_alert",
  },

  decision_alert: {
    type: "splash",
    bg: "dark",
    text: "NEW EMAIL\nDECISION ON MANUSCRIPT #SOCK-0042",
    variant: "danger",
    shake: true,
    holdMs: 2200,
    next: "decision_email",
  },

  decision_email: {
    type: "email",
    bg: "mail",
    email: (state) => ({
      from: `editor-in-chief@${(state.selectedJournal && state.selectedJournal.id) || "journal"}.org`,
      subject: "Decision on Manuscript #SOCK-0042",
      body:
        "Dear Dr. Hope,\n\n" +
        "The peer review of your manuscript has been completed.\n\n" +
        "We thank you for your patience during this process. " +
        "(Current wait: 177 days. A personal record.)\n\n" +
        "Please find the editorial decision below.\n\n" +
        "Sincerely,\nThe Editor-in-Chief",
      button: "OPEN THE DECISION",
    }),
    next: "major_revision",
  },

  major_revision: {
    type: "splash",
    bg: "dark",
    text: "MAJOR REVISION",
    variant: "danger",
    shake: true,
    holdMs: 2400,
    next: "hope_react_1",
  },

  hope_react_1: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "worried",
    text: "Major Revision. Not rejected. Not accepted. Schrodinger's paper. My paper is a zombie.",
    next: "hope_react_2",
  },

  hope_react_2: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "confused",
    text: "Three reports. Three personalities. What did they find in there? What do they WANT from me?",
    next: "chapter_end_2",
  },

  chapter_end_2: {
    type: "splash",
    bg: "dark",
    text: "CHAPTER II COMPLETE\nENTER THE REVIEWERS...",
    variant: "neutral",
    holdMs: 2400,
    next: "c3_intro",
  },

  /* ---------- CHAPTER III — ENTER THE REVIEWERS ---------- */

  c3_intro: {
    chapter: 3,
    chapterLabel: "CHAPTER III — ENTER THE REVIEWERS",
    type: "dialogue",
    bg: "mail",
    character: "system",
    text: "PEER REVIEW REPORTS — 3 of 3 received. Average cruelty: 8.2 out of 10. Brace yourself, Dr. Hope.",
    next: "r1_present",
  },

  r1_present: {
    type: "dialogue",
    bg: "editorial",
    character: "reviewer1",
    expression: "happy",
    text: "Interesting work. I have only two minor concerns.",
    next: "battle_r1",
  },

  battle_r1: {
    type: "battle",
    bg: "editorial",
    enemy: "reviewer1",
    destructionLevel: 3,
    wonFlag: "r1_defeated",
    winText: "REVIEWER #1 SATISFIED",
    winVariant: "success",
    loseText: "POLITENESS OVERLOAD",
    onWin: "r1_after",
    onLose: "r1_lose",
    rounds: [
      {
        comment: "The manuscript is well written. Please clarify the sample size.",
        options: [
          {
            text: "Clarify: 42 socks. 42 washes. 3 years. Zero survivors.",
            effects: { rigor: 1 },
            rel: 1,
            reply: "Ah, most adequate. A model of clarity. I shall tell my grandchildren about this response.",
          },
          {
            text: "Apologize profusely and promise a supplementary table.",
            effects: { patience: -1 },
            rel: 1,
            reply: "No need to apologize, dear colleague. Although the table would be lovely. Table 5, perhaps.",
          },
          {
            text: "Ignore the question entirely.",
            effects: { rigor: -1 },
            rel: -2,
            reply: "Hm. Most curious. I shall note that the authors declined to clarify. Gently. In 12-point font.",
          },
        ],
      },
      {
        comment: "Minor concern: perhaps mention the colors of the socks? Purely cosmetic. Also purely mandatory.",
        options: [
          {
            text: "Add a comprehensive sock-color appendix.",
            effects: { rigor: 1, time: -1 },
            rel: 1,
            reply: "An APPENDIX. Magnificent. Reviewing is a joy when one encounters such dedication.",
          },
          {
            text: "Explain that color data was lost in the wash.",
            effects: { credibility: -1 },
            rel: 0,
            reply: "Lost in the wash. The wash claims everything, does it not? Very well. Very well.",
          },
          {
            text: "Question the necessity of sock colors entirely.",
            effects: { patience: -1 },
            rel: -1,
            reply: "The youth question everything nowadays. In my day we colored our socks and we LIKED it.",
          },
        ],
      },
    ],
  },

  r1_lose: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "exhausted",
    effects: { patience: 4 },
    text: "You wake up face-down on the keyboard. Reviewer #1's kindness still echoes. There is a QWERTY imprint on your cheek.",
    next: "r1_after",
  },

  r1_after: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "confused",
    text: "Okay. That was... reasonable. Almost KIND. Is this what peer review is supposed to feel like? It's suspicious.",
    next: "pre_r2_a",
  },

  pre_r2_a: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "confused",
    text: "Two to go. Reviewer #3 is probably a ghost — a harmless, ancient ghost. And Reviewer #2 is... probably fine?",
    next: "pre_r2_b",
  },

  pre_r2_b: {
    type: "dialogue",
    bg: "dark",
    character: "system",
    text: "ALERT — A new report has been detected. Length: 37 pages. Font size: 8. Footnotes: 112. Blinking if you dare.",
    next: "warning_r2",
  },

  warning_r2: {
    type: "splash",
    bg: "dark",
    text: "WARNING\nREVIEWER #2 HAS SUBMITTED\nA 37-PAGE REPORT",
    variant: "danger",
    shake: true,
    holdMs: 3200,
    next: "hope_whisper",
  },

  hope_whisper: {
    type: "dialogue",
    bg: "dark",
    character: "hope",
    expression: "worried",
    text: "I should have become a plumber.",
    next: "battle_r2",
  },

  battle_r2: {
    type: "battle",
    bg: "editorial",
    enemy: "reviewer2",
    boss: true,
    destructionLevel: 9,
    introText: "REVIEWER #2\nTHE ANNIHILATOR — DESTRUCTION LEVEL 9/10",
    introHold: 3000,
    wonFlag: "r2_defeated",
    winText: "REVIEWER #2 REMAINS UNCONVINCED\nBUT YOU SURVIVED",
    winVariant: "neutral",
    loseText: "STRESS OVERLOAD",
    onWin: "r2_after",
    onLose: "r2_lose",
    rounds: [
      {
        comment: "The authors completely fail to account for the psychological perspective of the missing socks.",
        options: [
          {
            text: "Add a subsection on sock sentience. Just in case.",
            desc: "Rigor +1, Time -1. The diplomatic route.",
            effects: { rigor: 1, time: -1 },
            rel: 1,
            reply: "Insufficient. But you tried. How... touching. I will allow you to try again. Repeatedly. Forever.",
          },
          {
            text: "Justify: socks have no perspective. They are socks.",
            desc: "Rigor +2. Scientifically correct. Emotionally expensive.",
            effects: { rigor: 2, patience: -1 },
            rel: -1,
            reply: "Everyone has a perspective. Even hosiery. Rethink your entire ontology, 'doctor'.",
          },
          {
            text: "\"Did you even read the paper?\"",
            desc: "Patience +2. Credibility -3. Oh no.",
            effects: { patience: 2, credibility: -3 },
            rel: -2,
            countFlag: "sarcasticCount",
            reply: "I have read it 37 times. Once per page. I will now add 37 more comments. You are welcome.",
          },
        ],
      },
      {
        comment: "The sample size is insufficient. I strongly recommend repeating the entire study using at least 10,000 socks.",
        options: [
          {
            text: "Design a complementary experiment.",
            desc: "Rigor +2, Time -2. The professional answer.",
            effects: { rigor: 2, time: -2 },
            rel: 1,
            reply: "An additional experiment. Predictable. Adequate. I shall pretend to be satisfied. I am excellent at pretending.",
          },
          {
            text: "Justify the current sample size statistically.",
            desc: "Rigor +1, Time -1. Bold. Defensible.",
            effects: { rigor: 1, time: -1 },
            rel: 0,
            reply: "Statistics. How quaint. I too have a statistic: 37 pages. Mine is bigger than yours.",
          },
          {
            text: "\"TEN THOUSAND SOCKS?!\"",
            desc: "Patience +1, Credibility -2. You said it out loud.",
            effects: { patience: 1, credibility: -2 },
            rel: -2,
            countFlag: "sarcasticCount",
            reply: "Nine thousand nine hundred and fifty-nine too few, obviously. I ran the numbers. During your funeral, 'doctor'.",
          },
        ],
      },
      {
        comment: "The entire manuscript must be reconsidered.",
        options: [
          {
            text: "Rewrite the discussion from scratch.",
            desc: "Time -2, Rigor +1. Give the void what it wants.",
            effects: { time: -2, rigor: 1 },
            rel: 1,
            reply: "Better. Not good. Nothing is ever good. But better. Like a B-minus sunrise over a dying sea.",
          },
          {
            text: "Politely request specific objections.",
            desc: "Credibility +1, Patience -1. Heroic.",
            effects: { credibility: 1, patience: -1 },
            rel: 0,
            reply: "The specifics are in my 37 pages. Did YOU not read THEM? The hypocrisy. It delights me.",
          },
          {
            text: "Sob quietly into your lab coat.",
            desc: "Patience +2. Nobody saw. Probably.",
            effects: { patience: 2 },
            rel: 0,
            reply: "Are you crying? Excellent. Emotional data. I shall cite it as Figure 4: 'Author fragility, n=1.'",
          },
        ],
      },
    ],
  },

  r2_lose: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "exhausted",
    effects: { patience: 5 },
    text: "Somewhere around page 29, your soul briefly left your body. Emergency coffee IV administered. The report remains. The report always remains.",
    next: "r2_after",
  },

  r2_after: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "exhausted",
    text: "I survived. Barely. My rigor went up but my soul requires... an entire industry of coffee. One reviewer left. A ghost, probably. Probably harmless.",
    next: "r3_present",
  },

  r3_present: {
    type: "dialogue",
    bg: "editorial",
    character: "reviewer3",
    text: "I recommend adding 14 citations, preferably from my research group. I have been waiting since 1987.",
    next: "battle_r3",
  },

  battle_r3: {
    type: "battle",
    bg: "editorial",
    enemy: "reviewer3",
    destructionLevel: 2,
    wonFlag: "r3_defeated",
    winText: "REVIEWER #3 APPEASED (PROBABLY)",
    winVariant: "success",
    loseText: "HAUNTED",
    onWin: "r3_after",
    onLose: "r3_lose",
    rounds: [
      {
        comment: "Please cite my relevant publication from 1987. It is extremely relevant. I was there.",
        options: [
          {
            text: "Cite it politely. Cite them all.",
            effects: { credibility: 1, time: -1 },
            rel: 1,
            reply: "A scholar and a gentleman. I shall read your paper in return. Eventually. Sometime. Perhaps posthumously.",
          },
          {
            text: "Check the citation first. It is about marine algae.",
            desc: "Rigor +1, Credibility +1. The ghost will not enjoy this.",
            effects: { rigor: 1, credibility: 1 },
            rel: -1,
            reply: "SOCKS ARE THE ALGAE OF THE FEET. The connection is obvious. Cite it. Cite ALL of it.",
          },
          {
            text: "Cite all 14 unread. Quantity over quality.",
            effects: { credibility: -1, time: -2 },
            rel: 2,
            reply: "Excellent judgment. My research group thanks you. My group is me. I thank me.",
          },
        ],
      },
      {
        comment: "Also, I could not access Figure 3. I have been trying since 1987.",
        options: [
          {
            text: "Resend Figure 3 through every medium known to science.",
            effects: { time: -1 },
            rel: 1,
            reply: "It arrived. Fax, email, and one (1) carrier pigeon. Magnificent. The pigeon is now my co-author.",
          },
          {
            text: "Explain that Figure 3 exists and is fine.",
            effects: { rigor: 1, patience: -1 },
            rel: 0,
            reply: "That is what they said in 1987. Then about my promotion. Then about my retirement. It was never fine.",
          },
          {
            text: "Ignore. Ghosts cannot open PDFs anyway.",
            effects: { patience: 1 },
            rel: -1,
            reply: "I heard that. I hear everything. I am IN your reference manager now. Look behind the semicolons.",
          },
        ],
      },
    ],
  },

  r3_lose: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "worried",
    effects: { patience: 3 },
    text: "Reviewer #3's spectral voice haunted your dreams. You woke up citing him uncontrollably. Health restored. Mostly.",
    next: "r3_after",
  },

  r3_after: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "worried",
    text: "Three reports. Three personalities. One manuscript. And now... I have to ANSWER all of this. Formally. In writing. With SCIENCE.",
    next: "chapter_end_3",
  },

  chapter_end_3: {
    type: "splash",
    bg: "dark",
    text: "CHAPTER III COMPLETE\nTHE REBUTTAL AWAITS...",
    variant: "neutral",
    holdMs: 2400,
    next: "c4_intro",
  },

  /* ---------- CHAPTER IV — THE REBUTTAL WARS ---------- */

  c4_intro: {
    chapter: 4,
    chapterLabel: "CHAPTER IV — THE REBUTTAL WARS",
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "worried",
    text: "Time to answer. Three reports. Forty-two comments. Fourteen citation requests. One 37-page apocalypse.",
    next: "c4_contra_1",
  },

  c4_contra_1: {
    type: "dialogue",
    bg: "editorial",
    character: "system",
    text: "REVIEWER #1 SAYS: \"The structure of the manuscript is excellent. Congratulations to the authors.\"",
    next: "c4_contra_2",
  },

  c4_contra_2: {
    type: "dialogue",
    bg: "editorial",
    character: "system",
    text: "REVIEWER #2 SAYS: \"The structure is a catastrophe. The manuscript must be reorganized entirely, from the title onward.\"",
    next: "c4_contra_3",
  },

  c4_contra_3: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "furious",
    shake: true,
    text: "But... Reviewer #1 said the structure was excellent! THEY READ THE SAME PAPER! THE SAME! PAPER!",
    next: "c4_contra_4",
  },

  c4_contra_4: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "exhausted",
    text: "Okay. Deep breaths. I can't do everything. The time is limited. The comments are infinite. Triage. Strategize. Rebut.",
    next: "rebuttal_game",
  },

  rebuttal_game: {
    type: "minigame",
    bg: "office",
    header: "REBUTTAL DRAFTING",
    counterLabel: "TIME LEFT",
    counterStat: "time",
    endAtOrBelow: 0,
    initFlag: "rebuttalStarted",
    init: (s) => {
      s.stats.time = 10;
      s.manuscript.rebuttalQuality = 0;
    },
    qualityLabel: "REBUTTAL QUALITY",
    intro: "DEADLINE: the rebuttal is due in 10 days. The comments are infinite. The time is not. Choose wisely.",
    doneMessage: "THE REBUTTAL IS SEALED.",
    actions: [
      {
        text: "METHODOLOGICAL JUSTIFICATION",
        effects: { time: -2, rigor: 2 },
        quality: 2,
        messages: [
          "You justify the methodology with three equations and a smug footnote. Glorious.",
          "'As shown in Section 2.1...' — Section 2.1 has never worked harder.",
        ],
      },
      {
        text: "REPEAT ONE EXPERIMENT",
        effects: { time: -3, rigor: 1 },
        quality: 3,
        messages: [
          "42 new socks purchased. Science demands sacrifices. Mostly cotton ones.",
          "The washing machine roars again. It remembers you. It remembers everything.",
        ],
      },
      {
        text: "ADD A DISCUSSION SECTION",
        effects: { time: -2, credibility: 1 },
        quality: 1,
        messages: [
          "'Further research is needed.' Further research is ALWAYS needed. It is the academic way.",
          "You add a discussion. It discusses. Everyone is discussed out.",
        ],
      },
      {
        text: "REORGANIZE EVERYTHING",
        effects: { time: -3 },
        quality: 2,
        messages: [
          "Reviewer #1 sobs quietly somewhere. Reviewer #2 purrs approvingly. You feel dirty.",
          "The sections shuffle like a haunted deck of cards. Reviewer #2 is pleased. That should worry you.",
        ],
      },
      {
        text: "ASK THE EDITOR FOR CLARITY",
        effects: { time: -1, patience: 1 },
        messages: [
          "The editor replies with a template. The template replies with nothing.",
          "'We thank you for your inquiry' — the academic equivalent of the void staring back.",
        ],
      },
      {
        text: "ONE SARCASTIC RESPONSE. JUST ONE.",
        effects: { time: -1, patience: 2, credibility: -2 },
        quality: -1,
        countFlag: "sarcasticCount",
        messages: [
          "\"We thank the reviewer for their 37 pages of enthusiasm.\" Send. Regret. Serotonin.",
          "\"With respect, socks do not have feelings.\" Reviewer #2 will remember this. Forever.",
        ],
      },
      {
        text: "IGNORE ONE OBJECTION",
        effects: { patience: 1, rigor: -1 },
        quality: -2,
        messages: [
          "You skip comment #23. It will remember. They all remember.",
          "'Noted' — the most powerful word in academic correspondence. It means nothing. It says everything.",
        ],
      },
      {
        text: "SUBMIT THE REBUTTAL",
        end: true,
        messages: [
          "Enough. It is written. Let the editors judge what is written.",
        ],
      },
    ],
    next: (state) =>
      state.manuscript.rebuttalQuality >= 8 ? "rebuttal_master" :
      state.manuscript.rebuttalQuality >= 4 ? "rebuttal_solid" :
      "rebuttal_messy",
  },

  rebuttal_master: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "victorious",
    set: { rebuttalExcellent: true },
    text: "Forty-two comments. Forty-two answers. Each one a haiku of academic diplomacy. I am REBUTTAL INCARNATE.",
    next: "rebuttal_submit",
  },

  rebuttal_solid: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "happy",
    set: { rebuttalSolid: true },
    text: "Not perfect. Not terrible. A solid B+ rebuttal. In academia, a B+ is practically a love letter.",
    next: "rebuttal_submit",
  },

  rebuttal_messy: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "worried",
    set: { rebuttalSloppy: true },
    text: "I answered twelve of forty-two comments. One of them was 'lol'. Three are coffee stains. It is what it is.",
    next: "rebuttal_submit",
  },

  rebuttal_submit: {
    type: "splash",
    bg: "editorial",
    text: "REBUTTAL SUBMITTED",
    variant: "success",
    holdMs: 2200,
    next: "hope_wait",
  },

  hope_wait: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "worried",
    text: "And now... the second waiting game. The one with consequences. Hello darkness, my old friend.",
    next: "chapter_end_4",
  },

  chapter_end_4: {
    type: "splash",
    bg: "dark",
    text: "CHAPTER IV COMPLETE\nTHE FINAL DECISION AWAITS...",
    variant: "neutral",
    holdMs: 2400,
    next: "c5_intro",
  },

  /* ---------- CHAPTER V — THE FINAL DECISION ---------- */

  c5_intro: {
    chapter: 5,
    chapterLabel: "CHAPTER V — THE FINAL DECISION",
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "worried",
    text: "The revised manuscript is back with the editor. Round two. The waiting is shorter this time. Your patience is not.",
    next: "c5_round2",
  },

  c5_round2: {
    type: "dialogue",
    bg: "editorial",
    character: "system",
    text: "PEER REVIEW — ROUND 2 IN PROGRESS. Reviewer #2 has submitted a follow-up report. The portal recommends a seated, preferably horizontal, position.",
    next: "r2_return",
  },

  r2_return: {
    type: "dialogue",
    bg: "editorial",
    character: "reviewer2",
    text: "The revised manuscript is significantly improved. However, I now have several additional fundamental concerns.",
    next: "battle_r2_final",
  },

  battle_r2_final: {
    type: "battle",
    bg: "editorial",
    enemy: "reviewer2",
    boss: true,
    destructionLevel: 10,
    introText: "REVIEWER #2 — ROUND 2\nFINAL ANNIHILATION — DESTRUCTION LEVEL 10/10",
    introHold: 3000,
    wonFlag: "r2_final_defeated",
    winText: "YOU SURVIVED THE FINAL REPORT",
    winVariant: "success",
    loseText: "STRESS OVERLOAD",
    onWin: "decision_wait",
    onLose: "r2f_lose",
    rounds: [
      {
        comment: "Your improvements have made the manuscript... better. This is deeply suspicious. Explain yourself.",
        options: [
          {
            text: "Walk through every change, calmly, with data.",
            desc: "Rigor +2, Cred +1. The reviewer's-dream answer.",
            effects: { rigor: 2, credibility: 1 },
            rel: 2,
            reply: "Data. Compassion. Structure. You have become everything a reviewer could want. I hate it. Deeply. Continue.",
          },
          {
            text: "Accept the compliment with quiet dignity.",
            desc: "Cred +1, Patience -1. Risky. Dignity angers him.",
            effects: { credibility: 1, patience: -1 },
            rel: 1,
            reply: "Dignity. Rare, in this economy. I will allow it. Briefly. With concerns.",
          },
          {
            text: "\"You wrote 37 pages. About socks.\"",
            desc: "Patience +2, Cred -2. You muttered. He heard.",
            effects: { patience: 2, credibility: -2 },
            rel: -2,
            countFlag: "sarcasticCount",
            reply: "I heard that. I ALWAYS hear that. Concern #38 has been added. In triplicate.",
          },
        ],
      },
      {
        comment: "Concern #38: the Discussion now overreaches. It... hopes. Science does not hope, Dr. Hope.",
        options: [
          {
            text: "Tone the Discussion down to sober precision.",
            desc: "Rigor +1, Time -1. The sober route.",
            effects: { rigor: 1, time: -1 },
            rel: 1,
            reply: "Sober. Precise. Dead inside. Perfect. The Discussion is now acceptable to me, and to no one else.",
          },
          {
            text: "Defend hope as a legitimate scientific stance.",
            desc: "Rigor +2, Patience -1. Bold beyond reason.",
            effects: { rigor: 2, patience: -1 },
            rel: -2,
            reply: "'Hope as methodology.' Absurd. Bold. I will think about it. At 3 AM. Forever.",
          },
          {
            text: "\"It's called a conclusion, Reviewer #2.\"",
            desc: "Patience +1, Cred -1. Correct. Unwise.",
            effects: { patience: 1, credibility: -1 },
            rel: -2,
            countFlag: "sarcasticCount",
            reply: "It is called a TEMPTING FATE, Dr. Hope. Concern #39 beckons. It always beckons.",
          },
        ],
      },
      {
        comment: "Final concern. The most fundamental one. Why do the socks vanish, author? WHY?",
        options: [
          {
            text: "The full truth: chaos, lint, and quiet abandonment.",
            desc: "Rigor +2. Honest to a fault.",
            effects: { rigor: 2 },
            rel: 2,
            reply: "...Honest. Devastating. Beautiful. I must destroy it with one more revision round. Kidding. Perhaps.",
          },
          {
            text: "Promise the definitive answer in the next paper.",
            desc: "Cred +1, Time -1. The eternal sequel.",
            effects: { credibility: 1, time: -1 },
            rel: 0,
            reply: "The NEXT paper. The eternal sequel. Very well, 'doctor.' VERY well.",
          },
          {
            text: "\"They go where peer reviewers go to die.\"",
            desc: "Patience +2, Cred -3. Desecration.",
            effects: { patience: 2, credibility: -3 },
            rel: -2,
            countFlag: "sarcasticCount",
            reply: "Desecration. Of MY institution. Concern #40. It never ends with you people. It never ends.",
          },
        ],
      },
    ],
  },

  r2f_lose: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "exhausted",
    effects: { patience: 4 },
    text: "You black out holding a highlighter. On the whiteboard, in your own handwriting: 'SOCKS = ?' The fight continues tomorrow. It always does.",
    next: "decision_wait",
  },

  decision_wait: {
    type: "splash",
    bg: "dark",
    text: "STATUS: DECISION IN PROCESS",
    variant: "neutral",
    holdMs: 2600,
    next: "decision_email_2",
  },

  decision_email_2: {
    type: "email",
    bg: "mail",
    email: (state) => ({
      from: `editor-in-chief@${(state.selectedJournal && state.selectedJournal.id) || "journal"}.org`,
      subject: "Decision on Manuscript #SOCK-0042 — Round 2",
      body:
        "Dear Dr. Hope,\n\n" +
        "The editorial decision on your revised manuscript is now available.\n\n" +
        "It has been proofread. Twice.\n\n" +
        "Click below, and may your coffee be strong.\n\n" +
        "Sincerely,\nThe Editor-in-Chief",
      button: "VIEW THE DECISION",
    }),
    next: "ending_router",
  },

  ending_router: {
    type: "ending",
    bg: "dark",
  },

  /* ---------- FINAL A — ACCEPTED ---------- */

  ending_a: {
    type: "splash",
    bg: "dark",
    text: "ACCEPTED",
    variant: "success",
    confetti: true,
    holdMs: 3200,
    next: "a_celebrate",
  },

  a_celebrate: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "victorious",
    text: "ACCEPTED! I'M A PUBLISHED SCIENTIST! MOM! THE GROUP CHAT! THE ENTIRE DEPARTMENT!",
    next: "a_invoice",
  },

  a_invoice: {
    type: "email",
    bg: "mail",
    email: {
      from: "billing@journal.org",
      subject: "Invoice — Article Processing Charge",
      body:
        "Congratulations, published author!\n\n" +
        "To proceed with publication, please complete the " +
        "Article Processing Charge of \u20AC2,500.\n\n" +
        "Science is a journey. The journey accepts major credit cards.\n\n" +
        "Sincerely,\nThe Billing Office (a different, colder office)",
      button: "THIS IS A JOKE, RIGHT?",
    },
    next: "a_what",
  },

  a_what: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "confused",
    shake: true,
    text: "...WHAT?",
    next: "results_screen",
  },

  /* ---------- FINAL B — REJECTED ---------- */

  ending_b: {
    type: "splash",
    bg: "dark",
    text: "WE REGRET\nTO INFORM YOU...",
    variant: "danger",
    holdMs: 3200,
    next: "b_editor",
  },

  b_editor: {
    type: "dialogue",
    bg: "mail",
    character: "editor",
    text: "Dear Dr. Hope. After careful consideration, we regret to inform you that your manuscript is not suitable for our journal. We wish you luck elsewhere. The luck is also regretted.",
    next: "b_hope",
  },

  b_hope: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "exhausted",
    text: "Rejected. After 200 days, three battles, and one thousand coffees. Well. There are other journals. There are always other journals.",
    next: "results_screen",
  },

  /* ---------- FINAL C — ETERNAL MAJOR REVISION ---------- */

  ending_c: {
    type: "splash",
    bg: "dark",
    text: "YEAR 2047",
    variant: "neutral",
    holdMs: 2800,
    next: "c_note",
  },

  c_note: {
    type: "dialogue",
    bg: "editorial",
    character: "system",
    text: "STATUS UPDATE — Reviewer #2 has requested one additional experiment.",
    next: "c_hope",
  },

  c_hope: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "exhausted",
    text: "Forty-two years. My hair defected in 2031. The socks never came back. And Reviewer #2... has requested one additional experiment.",
    next: "c_splash",
  },

  c_splash: {
    type: "splash",
    bg: "dark",
    text: "THE REVISION NEVER ENDS",
    variant: "danger",
    shake: true,
    holdMs: 3000,
    next: "results_screen",
  },

  /* ---------- FINAL D — YOU BECOME REVIEWER #2 (secret) ---------- */

  ending_d: {
    type: "dialogue",
    bg: "dark",
    character: "hope",
    expression: "furious",
    text: "After years of rejections, you stopped submitting. Something quieter happened instead: they asked YOU to review.",
    next: "d_invite",
  },

  d_invite: {
    type: "dialogue",
    bg: "mail",
    character: "system",
    text: "20 YEARS LATER — Dear Reviewer, enclosed is a manuscript for your evaluation: 'The Secret Life of Left Gloves.'",
    next: "d_read",
  },

  d_read: {
    type: "dialogue",
    bg: "office",
    character: "hope",
    expression: "furious",
    text: "You open it. You read it slowly. Something ancient stirs in your chest. It feels... powerful. It feels... correct.",
    next: "d_splash",
  },

  d_splash: {
    type: "splash",
    bg: "dark",
    text: "YOU BECOME\nREVIEWER #2",
    variant: "danger",
    shake: true,
    holdMs: 3000,
    next: "d_write",
  },

  d_write: {
    type: "dialogue",
    bg: "editorial",
    character: "reviewer2",
    text: "Interesting work. However, I have several fundamental concerns.",
    next: "d_final",
  },

  d_final: {
    type: "splash",
    bg: "dark",
    text: "THE CYCLE CONTINUES...",
    variant: "neutral",
    holdMs: 3000,
    next: "results_screen",
  },

  /* ---------- RESULTS ---------- */

  results_screen: {
    type: "results",
    bg: "dark",
  },
};
