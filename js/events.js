/* ============ events.js — random editorial events (interrupt scenes, data-driven) ============ */

/* Each event: id, when(state) gate, and EITHER an email-style body OR choices.
   The engine may fire one between dialogue scenes (chapter >= 2), max 3 per run,
   never the same event twice per run. Design rule: events sting, they never destroy. */

const EVENTS = [
  {
    id: "coffee_overdose",
    when: (s) => s.coffeeConsumed >= 3,
    effects: { patience: 1, rigor: -1 },
    from: "campus-health@university.edu",
    subject: "URGENT: Your Heartbeat",
    body:
      "Our sensors have detected a rhythm consistent with a small jazz drum solo.\n\n" +
      "You have consumed enough caffeine to remain productive until 2031.\n\n" +
      "Effects: patience +1, scientific precision -1. Carry on. Slowly.",
  },
  {
    id: "r2_chat",
    when: (s) => s.chapter >= 3,
    effects: { patience: -1 },
    from: "noreply@editorial-portal.org",
    subject: "REVIEWER #2 HAS ENTERED THE CHAT",
    body:
      "A new comment has materialized.\n\n" +
      "Timestamp: 03:12 AM. Length: 4 pages. Topic: your comma usage in the Figure 2 caption.\n\n" +
      "Nobody sleeps like Reviewer #2 doesn't.",
  },
  {
    id: "conference_deadline",
    choices: [
      {
        text: "ATTEND THE CONFERENCE",
        effects: { time: -2, credibility: 1 },
        reply: "You present a poster. Three people nod. One of them is Reviewer #3. He was already there. He is always already there.",
      },
      {
        text: "STAY AND REVISE",
        effects: { patience: 1 },
        reply: "The conference will miss you. The manuscript will not. It never misses anything.",
      },
    ],
    prompt: "CONFERENCE DEADLINE — A conference invites you to present your sock research in person. In public. With slides.",
  },
  {
    id: "supervisor_change",
    effects: { patience: -2, time: -1 },
    from: "professor.emeritus@university.edu",
    subject: "One small thing",
    body:
      "Your supervisor suggests 'one small change' to the results section.\n\n" +
      "The small change has opened five new tasks. Three of them are existential.\n\n" +
      "It was, as always, 'just a quick fix.'",
  },
  {
    id: "latex_fail",
    effects: { time: -1, patience: -1 },
    from: "compiler@latex.local",
    subject: "COMPILATION FAILED",
    body:
      "Error at line 847.\n\n" +
      "There is no line 847. The error is a lie. The error has always been a lie.\n\n" +
      "Time lost: one day. Dignity lost: immeasurable.",
  },
  {
    id: "citation_needed",
    choices: [
      {
        text: "CITE A REAL, PEER-REVIEWED SOURCE",
        effects: { credibility: 1, time: -1 },
        reply: "You find a 1971 paper on the wetness of water. It cost you a full day. It was worth it.",
      },
      {
        text: "CITE YOURSELF (2019, UNPUBLISHED)",
        effects: { credibility: -1 },
        reply: "Bold. Recursive. Legally concerning. Reviewer #2 has printed it out specifically to circle it in red.",
      },
    ],
    prompt: "CITATION NEEDED — A reviewer demands a reference for the sentence 'water is wet.' Choose your fighter.",
  },
  {
    id: "r1_defends",
    when: (s) => s.relationships.reviewer1 >= 2,
    effects: { credibility: 2, patience: 2 },
    from: "editorial.office@journal.org",
    subject: "FW: Reviewer #1's report",
    body:
      "'The authors responded thoughtfully and thoroughly to my comments. " +
      "I fully support publication.'\n\n" +
      "— Reviewer #1, in writing, in public.\n\n" +
      "You will frame this email. Mentally, you already have.",
  },
  {
    id: "editor_false_alarm",
    from: "editor-in-chief@journal.org",
    subject: "URGENT — ACTION REQUIRED",
    body:
      "The subject line said URGENT. Your heart rate agreed.\n\n" +
      "The action required: 'Please update your ORCID profile photo. " +
      "Current photo: JPEG. Year: 2004.'\n\n" +
      "Devastating tension. Zero content. The system works.",
  },
];
