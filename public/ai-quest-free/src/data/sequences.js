/**
 * Ordering drills: instead of picking one of four, you put four steps into the
 * order they actually happen. That tests process knowledge rather than recall.
 *
 * Two pools, because the same mechanic runs in two places:
 *
 *   workshop  the branded stop on the road north
 *   sea       Skiff's drill on the Open Strait, all agent and tool process
 *   sky       Nim's drill on the Ascent, on claims, release and uncertainty
 *
 * Ordering is the right shape for agent questions in particular - an agent IS
 * a sequence, so asking someone to put one in order is asking the real thing.
 *
 * Keep each step under ~30 characters - the rows are 300px wide at an 8px
 * font, and a step that wraps breaks the row height.
 */

export const SEQUENCES = [
  {
    id: 'build-a-model',
    pool: 'workshop',
    prompt: 'Put the steps of building a model in order.',
    steps: [
      'Collect and clean data',
      'Train the model',
      'Test on unseen data',
      'Ship it to users',
    ],
    explain: 'Test on data it never trained on, or you are only measuring memory.',
  },
  {
    id: 'prompt-lifecycle',
    pool: 'workshop',
    prompt: 'What happens after you send a prompt?',
    steps: [
      'Your text becomes tokens',
      'The model predicts tokens',
      'Tokens become text again',
      'You read the reply',
    ],
    explain: 'Everything in the middle is the model working in tokens, not words.',
  },
  {
    id: 'better-answers',
    pool: 'workshop',
    prompt: 'Order the habits that get better answers.',
    steps: [
      'Say what you actually want',
      'Show an example',
      'Read the reply properly',
      'Refine and ask again',
    ],
    explain: 'Prompting is a loop, not a single shot. The refining is the skill.',
  },
  {
    id: 'agent-loop',
    pool: 'workshop',
    prompt: 'How does an AI agent work through a task?',
    steps: [
      'Give the agent a goal',
      'It plans a step',
      'It uses a tool',
      'It checks and repeats',
    ],
    explain: 'Plan, act, observe, repeat - that loop is what makes it an agent.',
  },

  /* ------------------------- the sea drills ------------------------- */
  {
    id: 'tool-call',
    pool: 'sea',
    prompt: 'Order what happens when a model uses a tool.',
    steps: [
      'It decides a tool is needed',
      'It writes the tool request',
      'Your code runs the tool',
      'The result goes back in',
    ],
    explain: 'The model never runs anything itself. It asks, your code runs it.',
  },
  {
    id: 'agent-safely',
    pool: 'sea',
    prompt: 'Order how to let an agent loose safely.',
    steps: [
      'Give it a narrow job',
      'Give it only the tools it needs',
      'Watch what it actually does',
      'Widen it once you trust it',
    ],
    explain: 'Start it small enough that a mistake is cheap, then widen.',
  },
  {
    id: 'connect-a-source',
    pool: 'sea',
    prompt: 'Order how to connect an assistant to your files.',
    steps: [
      'Pick the source to connect',
      'Grant read access to it',
      'The assistant searches it',
      'It answers, citing what it read',
    ],
    explain: 'Access first, then retrieval. It can only cite what you let it see.',
  },
  {
    id: 'agent-fails',
    pool: 'sea',
    prompt: 'An agent gets a bad tool result. What now?',
    steps: [
      'It reads the error',
      'It adjusts the plan',
      'It tries a different step',
      'It stops and asks for help',
    ],
    explain: 'Retrying blindly is the failure mode. Knowing when to stop is the skill.',
  },

  /* ------------------------- the sky drills ------------------------- */
  {
    id: 'claim-to-truth',
    pool: 'sky',
    prompt: 'Order how to check a big AI claim.',
    steps: [
      'Find what was actually measured',
      'Find what it was measured on',
      'Ask who else has repeated it',
      'Decide how much it covers',
    ],
    explain: 'A headline is a claim about a measurement. Go and find the measurement.',
  },
  {
    id: 'capability-arrives',
    pool: 'sky',
    prompt: 'Order how a new capability reaches people.',
    steps: [
      'It works once, in a lab',
      'It works reliably enough',
      'It gets cheap enough to run',
      'It shows up in things you use',
    ],
    explain: 'Most of the wait is reliability and cost, not the first demonstration.',
  },
  {
    id: 'uncertain-well',
    pool: 'sky',
    prompt: 'Order how to hold an open question well.',
    steps: [
      'Say plainly what is unknown',
      'Say what would settle it',
      'Give your best guess anyway',
      'Change it when evidence lands',
    ],
    explain: 'Naming what would change your mind is what separates a view from a hunch.',
  },
  {
    id: 'deploy-carefully',
    pool: 'sky',
    prompt: 'Order how a lab releases something risky.',
    steps: [
      'Test it against known harms',
      'Have outsiders try to break it',
      'Release it to a small group',
      'Widen it, watching as you go',
    ],
    explain: 'Staged release exists so the first mistake is small and visible.',
  },
];

/** EXP for a drill. A perfect order pays properly; a near miss pays something. */
export const SEQUENCE_EXP = { perfect: 60, partial: 20 };

/** Look and wording for each place the drill runs. */
export const DRILL_THEMES = {
  workshop: { accent: null, accentDark: null, title: null },  // filled from BRAND
  sea: { accent: 'waterLight', accentDark: 'waterDark', title: "SHIP'S DRILL" },
};

export function pickSequence(usedIds = new Set(), pool = 'workshop') {
  const inPool = SEQUENCES.filter((s) => s.pool === pool);
  const fresh = inPool.filter((s) => !usedIds.has(s.id));
  const choices = fresh.length ? fresh : inPool;
  return choices[Math.floor(Math.random() * choices.length)];
}
