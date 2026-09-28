/**
 * The cast. Original characters; each carries a light AI-concept personality
 * so the town has some flavour without the theme taking over the writing.
 *
 * Battle numbers live here rather than in BattleScene so difficulty is a data
 * edit, never a code change.
 *
 * Two kinds of entry live here. `NPCS` are challengers: anyone with a `battle`,
 * including the four gym bosses. `TOWNSFOLK` are everyone else, and what they
 * do is decided by their `action` - opening the region map, guarding a road,
 * handing over a boat, or running one of the non-duel challenges.
 *
 * The town challengers are deliberately short and gentle - two or three easy
 * questions each. They are the tutorial; the Inference Hall is the test.
 *
 * How the tuning plays out (before any level bonus to player health):
 *
 *   Pip - 2 questions, 60 dealt, 55 taken.
 *     2 correct  -> knockout.
 *     1 correct  -> nobody drops; you take the higher-HP tiebreak, narrowly.
 *     0 correct  -> the second wrong answer finishes you.
 *
 *   Other challengers - 3 questions, 40 dealt, 45 taken.
 *     3 correct  -> knockout.
 *     2 correct  -> comfortable tiebreak win.
 *     1 correct  -> the opponent takes the tiebreak.
 *
 *   Warden Sable - 10 questions, 15 dealt, 22 taken.
 *     7 correct  -> knockout.
 *     6 correct  -> a genuine squeaker on the tiebreak.
 *     5 correct  -> the fifth wrong answer finishes you.
 *
 * Levelling adds flat health (see HP_PER_LEVEL in systems/gameState.js), so a
 * player who cleared the town arrives at the Warden able to absorb one more
 * mistake than these numbers alone suggest.
 */

import { BRAND, WORKSHOP } from './brand.js';

export const TOKEN_NAME = 'Vector Token';
export const TOKEN_TWO = 'Context Token';
export const TOKEN_THREE = 'Charter Token';
export const TOKEN_FOUR = 'Toolwright Token';
export const TOKEN_FIVE = 'Horizon Token';

/**
 * The three Tool Sigils, won from the sailing challengers on the Open Strait.
 * Not badges: they are the key to one dock, and each one names the idea its
 * owner tests you on.
 */
export const SIGILS = {
  hook: 'Hook Sigil',
  loop: 'Loop Sigil',
  bridge: 'Bridge Sigil',
};

export const TOTAL_SIGILS = Object.keys(SIGILS).length;

/** Shown once, when the player first arrives in the town. */
export const INTRO_LINES = [
  'Three challengers are scattered around Loss Valley, and every one of them will quiz you on AI.',
  'Beat them to earn EXP. Enough EXP and you level up, which makes you tougher in a duel.',
  'Beat all three and the Inference Hall opens. Clear that, and the road north out of the valley opens too.',
];

/** Three questions, all drawn from the beginner band. */
const CHALLENGER_BATTLE = {
  questions: 3,
  opponentHp: 100,
  playerHp: 100,
  hitDamage: 40,
  missDamage: 45,
  mix: { easy: 3, medium: 0, hard: 0 },
};

export const NPCS = [
  {
    id: 'pip',
    name: 'Pip the Prompter',
    sprite: 'pip',
    map: 'town',
    x: 8, y: 8, facing: 'down',
    isBoss: false,
    intro: [
      'I rewrite things until they work.',
      'Ask me anything about talking to models. Or let me ask you. Ready?',
    ],
    win: ['Fair enough. You said what you meant.', "That's most of the trick, honestly."],
    lose: ['Too vague! Come back when the question is sharper.'],
    postDefeat: ['Rewrite the prompt, rewrite the outcome.'],
    // The first fight anyone will meet: two questions, and the shortest ramp
    // into how a duel works.
    battle: {
      ...CHALLENGER_BATTLE,
      questions: 2,
      hitDamage: 60,
      missDamage: 55,
      mix: { easy: 2, medium: 0, hard: 0 },
    },
  },
  {
    id: 'vex',
    name: 'Vex the Vectorist',
    sprite: 'vex',
    map: 'town',
    x: 7, y: 6, facing: 'left',
    isBoss: false,
    intro: [
      "Everything in here is a number. Words, pictures, you.",
      "Let's see whether you can follow where they point.",
    ],
    win: ['Huh. Your answers clustered nicely.', 'Go on, then.'],
    lose: ['Way off. Wrong direction entirely.'],
    postDefeat: ['Similar things sit close together. You are getting closer.'],
    battle: { ...CHALLENGER_BATTLE },
  },
  {
    id: 'dot',
    name: 'Dot the Data Wrangler',
    sprite: 'dot',
    map: 'town',
    x: 4, y: 14, facing: 'right',
    isBoss: false,
    intro: [
      "I have been cleaning this dataset for six hours. Distract me.",
      'Bad data in, bad everything out. Prove you know the difference.',
    ],
    win: ['Clean run. No leakage.', 'Take the win.'],
    lose: ['You memorised without understanding. Classic.'],
    postDefeat: ['Half the job is the data. Everyone forgets that.'],
    battle: { ...CHALLENGER_BATTLE },
  },
  {
    id: 'sable',
    name: 'Warden Sable',
    sprite: 'sable',
    map: 'hall',
    x: 6, y: 2, facing: 'down',
    isBoss: true,
    intro: [
      'So you got past the others.',
      'I keep this hall. Nobody walks out with a token by guessing.',
      'Ten questions, and I do not pick the gentle ones. Begin.',
    ],
    token: TOKEN_NAME,
    clearedLines: [
      `The ${TOKEN_NAME} is yours.`,
      'Gale will stand aside from the north gate now. The road out of Loss Valley is open.',
    ],
    win: [
      '...Well argued. Genuinely.',
      `The hall is yours. Take the ${TOKEN_NAME} - you earned it.`,
    ],
    lose: ['Not yet. The door stays open. Come back when you are sure.'],
    postDefeat: ['Come back any time. Bring harder questions.'],
    battle: {
      questions: 10,
      opponentHp: 100,
      playerHp: 100,
      hitDamage: 15,
      missDamage: 22,
      mix: { easy: 0, medium: 3, hard: 7 },
    },
  },

  /* ---------------- The Long Prompt (the road north) ---------------- */
  {
    id: 'wren',
    name: 'Wren the Rewriter',
    sprite: 'wren',
    map: 'route',
    x: 7, y: 8, facing: 'left',
    isBoss: false,
    intro: [
      'Fourteen drafts of the same request. Fourteen!',
      'The last one worked. Want to know why? Answer me this.',
    ],
    win: ['Right. Say the thing you actually want.', 'Off you go.'],
    lose: ['Draft fifteen for you, then.'],
    postDefeat: ['Shorter is not always clearer. Clearer is clearer.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 1, medium: 2, hard: 0 } },
  },
  {
    id: 'sol',
    name: 'Sol the Sampler',
    sprite: 'sol',
    map: 'route',
    x: 13, y: 14, facing: 'left',
    isBoss: false,
    intro: [
      'Same question, same model, different answer. Every time.',
      'I have opinions about why. Do you?',
    ],
    win: ['Fine. You know your settings.', 'Go on up the ridge.'],
    lose: ['Turn it down a notch and try again.'],
    postDefeat: ['Randomness is a dial, not a bug.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 1, medium: 2, hard: 0 } },
  },
  {
    id: 'echo',
    name: 'Echo the Practice Partner',
    sprite: 'echo',
    map: 'route',
    x: 11, y: 21, facing: 'left',
    isBoss: false,
    // The grinding spot: always available, worth less, and never "beaten".
    repeatable: true,
    intro: [
      'I do not keep score. Ask me for a round whenever you like.',
      'Three questions. Good practice before the Foundry.',
    ],
    win: ['Nicely done. Come back any time.'],
    lose: ['No harm done. Go again whenever you want.'],
    postDefeat: [],
    battle: {
      ...CHALLENGER_BATTLE,
      mix: { easy: 2, medium: 1, hard: 0 },
      // A repeatable fight pays for the answers, not for the win.
      winBonus: 15,
    },
  },

  /* ---------------- Prompt Ridge ---------------- */
  {
    id: 'rune',
    name: 'Rune the Roleplayer',
    sprite: 'rune',
    map: 'ridge',
    x: 13, y: 10, facing: 'left',
    isBoss: false,
    intro: [
      '"You are a helpful assistant." Every conversation starts somewhere.',
      'Let us see if you know where.',
    ],
    win: ['Good. The setup matters as much as the question.'],
    lose: ['Set the scene first. Then ask.'],
    postDefeat: ['Tell it who it is, and it will hold the part.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 1, medium: 2, hard: 0 } },
  },
  {
    id: 'sena',
    name: 'Sena the Steward',
    sprite: 'sena',
    map: 'coast',
    x: 7, y: 9, facing: 'right',
    isBoss: false,
    intro: [
      'Everyone wants a model that is helpful. The argument is about what it should refuse.',
      'Let us see where you land.',
    ],
    win: ['Sensible. Helpful and careful are not opposites.'],
    lose: ['Think it through again. It matters.'],
    postDefeat: ['A model without limits is not more useful. Just less predictable.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 0, medium: 3, hard: 0 } },
  },
  {
    id: 'orrin',
    name: 'Orrin the Auditor',
    sprite: 'orrin',
    map: 'coast',
    x: 12, y: 11, facing: 'left',
    isBoss: false,
    intro: [
      'I check whether the thing does what it says on the box.',
      'Three questions. No marks for confidence.',
    ],
    win: ['Good. You checked instead of assuming.'],
    lose: ['You assumed. That is exactly the failure I test for.'],
    postDefeat: ['Measure it, or you do not know it.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 0, medium: 2, hard: 1 } },
  },
  {
    id: 'vale',
    name: 'Arbiter Vale',
    sprite: 'vale',
    map: 'charter',
    x: 6, y: 3, facing: 'down',
    isBoss: true,
    intro: [
      'Two tokens, and you walked the caves to get here. Noted.',
      'This house does not test what a model can do. It tests whether you know what it should do.',
      'Ten questions. Begin.',
    ],
    token: TOKEN_THREE,
    clearedLines: [
      `Three tokens. The ${TOKEN_THREE} is a heavy one to carry.`,
      'Keeper Rell will let you past now. Mind you, the way on is water - you will need a boat and a reason to be trusted with one.',
    ],
    win: [
      'You argued the hard cases rather than the easy ones. That is the whole job.',
      `The ${TOKEN_THREE} is yours.`,
    ],
    lose: ['Not yet. Sit with the difficult ones a while longer.'],
    postDefeat: ['Principles are easy to write and hard to keep. Come back any time.'],
    battle: {
      questions: 10,
      opponentHp: 100,
      playerHp: 100,
      hitDamage: 15,
      missDamage: 22,
      mix: { easy: 0, medium: 4, hard: 6 },
    },
  },
  /* ---------------- The Open Strait ---------------- */
  /*
   * Three challengers moored out among the rocks. Each one hands over a Tool
   * Sigil, and the far dock will not open without all three - so unlike the
   * road challengers these are not optional, and they are written to be beaten
   * by someone who has been paying attention rather than by an expert.
   */
  {
    id: 'marl',
    name: 'Marl the Toolsmith',
    sprite: 'marl',
    map: 'strait',
    x: 11, y: 2, facing: 'down',
    isBoss: false,
    sigil: SIGILS.hook,
    intro: [
      'A model on its own can only talk. Hand it a tool and it can actually do something.',
      'Three questions on that, and the Hook Sigil is yours.',
    ],
    win: [
      'Good. You know the difference between answering and acting.',
      'Take the Hook Sigil. Quay will want to see it.',
    ],
    lose: ['Come back when you can tell me what a tool call actually is.'],
    postDefeat: ['A tool is just a door. The model still has to know to open it.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 0, medium: 2, hard: 1 } },
  },
  {
    id: 'coral',
    name: 'Coral the Coordinator',
    sprite: 'coral',
    map: 'strait',
    x: 11, y: 11, facing: 'up',
    isBoss: false,
    sigil: SIGILS.loop,
    intro: [
      'One answer is a reply. Many answers in a row, each one deciding the next, is an agent.',
      'Show me you know the loop and the Loop Sigil is yours.',
    ],
    win: [
      'Plan, act, look at what happened, go again. You had it.',
      'The Loop Sigil. Row on.',
    ],
    lose: ['You skipped the looking-at-what-happened part. Everyone does.'],
    postDefeat: ['The checking step is the one people cut. It is the one that matters.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 0, medium: 2, hard: 1 } },
  },
  {
    id: 'brack',
    name: 'Brack the Broker',
    sprite: 'brack',
    map: 'strait',
    x: 17, y: 4, facing: 'left',
    isBoss: false,
    sigil: SIGILS.bridge,
    intro: [
      'I connect things to other things. Files, calendars, whole companies.',
      'Last sigil, and I do not make it the easy one. Three questions.',
    ],
    win: [
      'Fine. You understand what you are plugging in, which is more than most.',
      'The Bridge Sigil. That is all three - go and see Quay.',
    ],
    lose: ['Connect something you do not understand and you will find out why I ask.'],
    postDefeat: ['Every connection is a door both ways. Remember that.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 0, medium: 1, hard: 2 } },
  },

  /* ---------------- Sigil Port ---------------- */
  {
    id: 'pell',
    name: 'Pell the Planner',
    sprite: 'pell',
    map: 'port',
    x: 12, y: 6, facing: 'left',
    isBoss: false,
    intro: [
      'Big task, small steps. That is the whole job, and it is harder than it sounds.',
      'Three questions before the Toolworks will have you.',
    ],
    win: ['Right. Break it down, then start.'],
    lose: ['You tried to do it all in one go. That is the classic mistake.'],
    postDefeat: ['A plan you can check as you go beats a perfect plan you cannot.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 0, medium: 3, hard: 0 } },
  },
  {
    id: 'wisp',
    name: 'Wisp the Watcher',
    sprite: 'wisp',
    map: 'port',
    x: 4, y: 11, facing: 'right',
    isBoss: false,
    intro: [
      'Somebody has to watch the things that run on their own. That is me.',
      'Three questions about what can go wrong. Ready?',
    ],
    win: ['Good. You know where to put the brakes.'],
    lose: ['Left it running unwatched, did you. That is how it goes.'],
    postDefeat: ['An agent you cannot stop is not a tool. It is a rumour.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 0, medium: 2, hard: 1 } },
  },
  {
    id: 'tarn',
    name: 'Overseer Tarn',
    sprite: 'tarn',
    map: 'toolworks',
    x: 6, y: 3, facing: 'down',
    isBoss: true,
    intro: [
      'Three tokens, three sigils, and a boat you did not start with. You get around.',
      'Everything on this floor is a model wired to something it can actually change.',
      'Ten questions on what that costs and what it buys. Begin.',
    ],
    token: TOKEN_FOUR,
    clearedLines: [
      `Four tokens. The ${TOKEN_FOUR} on top of the rest.`,
      'Keeper Fen has the far dock, and past it the road goes up rather than on. Mind your footing.',
    ],
    win: [
      'You worried about the right things in the right order. That is the job.',
      `The ${TOKEN_FOUR} is yours.`,
    ],
    lose: ['Not yet. Go and break something small before you come back.'],
    postDefeat: ['The floor is always running. Come back any time.'],
    battle: {
      questions: 10,
      opponentHp: 100,
      playerHp: 100,
      hitDamage: 15,
      missDamage: 22,
      mix: { easy: 0, medium: 4, hard: 6 },
    },
  },
  /* ---------------- The Ascent ---------------- */
  {
    id: 'vela',
    name: 'Vela the Forecaster',
    sprite: 'vela',
    map: 'ascent',
    x: 7, y: 4, facing: 'right',
    isBoss: false,
    intro: [
      'Everyone up here has an opinion about what happens next. Mine is that most of them are guesses.',
      'Three questions on what we actually know. Ready?',
    ],
    win: ['Good. You said "it depends" in the right places.'],
    lose: ['Too certain. That is the whole failure mode up here.'],
    postDefeat: ['Predictions are cheap. Calibrated ones are not.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 0, medium: 2, hard: 1 } },
  },
  {
    id: 'cirro',
    name: 'Cirro the Skeptic',
    sprite: 'cirro',
    map: 'ascent',
    x: 11, y: 4, facing: 'left',
    isBoss: false,
    intro: [
      'I spend my days telling people the thing they read was overstated.',
      'Let us find out whether you can tell a result from a headline.',
    ],
    win: ['You checked what was actually claimed. That is rarer than it should be.'],
    lose: ['You believed the summary. Read what it was a summary of.'],
    postDefeat: ['Ask what was measured. Then ask on what.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 0, medium: 2, hard: 1 } },
  },

  /* ---------------- Halcyon Rest ---------------- */
  {
    id: 'lume',
    name: 'Lume the Luminary',
    sprite: 'lume',
    map: 'haven',
    x: 5, y: 11, facing: 'right',
    isBoss: false,
    intro: [
      'People come up here to ask what all this becomes. I like the question.',
      'Three of my own first, though.',
    ],
    win: ['Yes. Nobody knows, and the honest ones say so.'],
    lose: ['You wanted a clean answer. There is not one yet.'],
    postDefeat: ['Wonder is fine. Certainty is the thing to be careful with.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 0, medium: 3, hard: 0 } },
  },
  {
    id: 'thess',
    name: 'Thess the Theorist',
    sprite: 'thess',
    map: 'haven',
    x: 12, y: 10, facing: 'left',
    isBoss: false,
    intro: [
      'I work on the parts nobody has solved. It is mostly being wrong carefully.',
      'Three questions. Some of them do not have settled answers, and I will say which.',
    ],
    win: ['Good. You knew which ones were open.'],
    lose: ['You answered an open question as though it were closed.'],
    postDefeat: ['Knowing what is unsettled is most of knowing the field.'],
    battle: { ...CHALLENGER_BATTLE, mix: { easy: 0, medium: 2, hard: 1 } },
  },
  {
    id: 'aurel',
    name: 'Sage Aurel',
    sprite: 'aurel',
    map: 'horizon',
    x: 6, y: 3, facing: 'down',
    isBoss: true,
    intro: [
      'Four tokens, a boat, a cave and a crossing of clouds. You have come the whole way.',
      'This hall does not test what you have learned. It tests whether you know where the learning stops.',
      'Ten questions, and I am not going to make the last one easy. Begin.',
    ],
    token: TOKEN_FIVE,
    clearedLines: [
      `Five tokens. The ${TOKEN_FIVE} closes the set.`,
      'There is no sixth hall. Walk east into the light whenever you are ready - the rest of it has not been built yet, by anyone.',
    ],
    win: [
      'You held the uncertain things as uncertain and the settled things as settled.',
      `That is the whole of it. The ${TOKEN_FIVE} is yours.`,
    ],
    lose: ['Not yet. Sit with the ones that have no answer a while longer.'],
    postDefeat: ['Come back whenever the questions change. They will.'],
    battle: {
      questions: 10,
      opponentHp: 100,
      playerHp: 100,
      hitDamage: 15,
      missDamage: 22,
      mix: { easy: 0, medium: 4, hard: 6 },
    },
  },
  {
    id: 'quill',
    name: 'Foreman Quill',
    sprite: 'quill',
    map: 'foundry',
    x: 6, y: 3, facing: 'down',
    isBoss: true,
    intro: [
      'So the valley let you through. Good for the valley.',
      'Down here we do not care what a model is. We care what it does when you ask it something.',
      'Ten questions. Mostly the hard ones. Begin.',
    ],
    token: TOKEN_TWO,
    clearedLines: [
      `Two tokens. ${TOKEN_NAME} and ${TOKEN_TWO}.`,
      'Keeper Bram will open the east road now. Constitution Coast is that way.',
    ],
    win: [
      'Hm. You have actually used one of these.',
      `Take the ${TOKEN_TWO}. You have earned the right to argue about wording.`,
    ],
    lose: ['Come back when you have read a little more of the manual.'],
    postDefeat: ['The Foundry is always warm. Come back any time.'],
    battle: {
      questions: 10,
      opponentHp: 100,
      playerHp: 100,
      hitDamage: 15,
      missDamage: 22,
      mix: { easy: 0, medium: 4, hard: 6 },
    },
  },
];

/**
 * Locked doors, as data. A warp carries `gate: '<id>'`; the door opens once
 * every challenger in `requires` has been beaten and the player holds at least
 * `sigils` Tool Sigils. Either condition may be left out.
 */
export const GATES = {
  hall: {
    requires: ['pip', 'vex', 'dot'],
    lines: [
      'The double doors do not budge.',
      'A plate above them reads: BEAT ALL THREE CHALLENGERS FIRST.',
    ],
  },
  charter: {
    requires: ['sena', 'orrin'],
    lines: [
      'The Charter House door is closed, and a notice is pinned to it.',
      'IN SESSION. The house hears no one who has not first been heard.',
      'Sena and Orrin are out on the terrace. Start with them.',
    ],
  },
  foundry: {
    requires: ['wren', 'sol', 'rune'],
    lines: [
      'The Foundry doors are barred from the inside.',
      'A chalkboard by the handle reads: NO WALK-INS.',
      'Beat Wren and Sol on the road, and Rune here in town, and Quill will see you.',
    ],
  },
  strait: {
    requires: ['vale'],
    lines: [
      'The cut down to the water is chained off, and Keeper Rell is standing in it.',
      'A board on the chain reads: NO CROSSING UNTIL THE CHARTER HOUSE HAS SIGNED YOU OFF.',
    ],
  },
  port: {
    sigils: 3,
    lines: [
      'A boom of rope and floats is strung across the last stretch of water.',
      'Harbourmaster Quay will not lift it for anyone carrying fewer than three Tool Sigils.',
    ],
  },
  toolworks: {
    requires: ['pell', 'wisp'],
    lines: [
      'The Toolworks shutter is down, and a slate hangs off it.',
      'BOOKED SOLID. Pell and Wisp are outside taking questions - see them first.',
    ],
  },
  ascent: {
    requires: ['tarn'],
    lines: [
      'The far dock ends in open air, and the cloud road above it is out of reach.',
      'Keeper Fen has the only way up, and he will not give it to anyone the Toolworks has not signed off.',
    ],
  },
  horizon: {
    requires: ['lume', 'thess'],
    lines: [
      'The doors of Horizon Hall are shut, and the light behind them does not flicker.',
      'A line cut into the step reads: BE HEARD BEFORE YOU ASK.',
      'Lume and Thess are out on the cloud. Start there.',
    ],
  },
};

/** Shown when a cave crystal is touched. */
export const CRYSTAL_LINES = [
  'The crystal hums, and somewhere behind you stone grinds on stone.',
  'Every boulder is back where it started. So are you.',
];

/** Tacked onto a beaten challenger's line once the run has been finished. */
export const REMATCH_LINES = [
  'Although - you are still here, and so am I. Go again?',
];

/**
 * Shown after any challenge won on the cloud maps. Beating someone up here
 * gathers the crossings back, so a badly chosen route is never the end of it.
 */
export const CLOUD_REWARD_LINES = [
  'The clouds hear it, and come rolling back in beneath you.',
  'Every crossing on this climb is whole again. Pick a new line.',
];

/** Shown when an updraft is touched on the Ascent. */
export const UPDRAFT_LINES = [
  'The updraft catches, and the thinned clouds come rolling back in beneath you.',
  'Every crossing is whole again.',
];

/** Shown when the player corners themselves on the cloud crossings. */
export const DRIFT_LINES = [
  'The last cloud gives way, and you drift gently back to solid footing.',
  'Nothing lost but the crossing. The clouds have gathered again - try another line.',
];

/** Shown the moment Marin actually hands the boat over. */
export const BOAT_LINES = [
  'You got a boat! Blue water is yours now - shallows and open sea alike.',
  'Rocks, kelp and crags still stop you. Go around them.',
];

/** Shown when a sailing challenger hands over their sigil. */
export function sigilLines(name, count) {
  return [
    `TOOL SIGIL OBTAINED: the ${name}.`,
    count >= TOTAL_SIGILS
      ? 'That is all three. Harbourmaster Quay will lift the boom now.'
      : `${count} of ${TOTAL_SIGILS}. Quay wants all three before the far dock opens.`,
  ];
}

/** Everyone in the town who is not a challenger. */
export const TOWNSFOLK = [
  {
    id: 'nasser',
    name: WORKSHOP.host,
    sprite: 'nasser',
    map: 'route',
    x: 5, y: 16, facing: 'down',
    action: 'workshop',
    lines: [
      `Welcome to ${WORKSHOP.name}. We do drills here, not duels.`,
      'I will give you four steps out of order. Put them back in order. That is the whole thing.',
    ],
    repeatLines: [`Back for another drill? ${BRAND.tagline}.`],
  },
  {
    id: 'bram',
    name: 'Keeper Bram',
    sprite: 'gale',
    map: 'ridge',
    x: 18, y: 8, facing: 'left',
    // Steps aside once both gyms are cleared, opening the east road.
    altPosition: { x: 18, y: 7 },
    opensAt: 2,
    action: 'gate',
    lines: [
      'East road is shut. Constitution Coast is a long walk and the Charter House does not take beginners.',
      'Two tokens, minimum. Come back when the Foundry has signed you off.',
    ],
    openLines: [
      'Two tokens. That will do it.',
      'East road is open. Mind how you go - it only gets harder from here.',
    ],
  },
  {
    id: 'vane',
    name: 'Vane of the Deep',
    sprite: 'vane',
    map: 'cave',
    x: 12, y: 9, facing: 'down',
    action: 'signal',
    lines: [
      'Down here you cannot see far, so you learn to judge a claim on its own merits.',
      'Six statements. True or false, quick as you like. Ready?',
    ],
    repeatLines: ['Another round of signal checking? Go on then.'],
  },
  {
    id: 'rell',
    name: 'Keeper Rell',
    sprite: 'gale',
    map: 'coast',
    x: 17, y: 8, facing: 'left',
    altPosition: { x: 17, y: 7 },
    opensAt: 3,
    action: 'gate',
    lines: [
      'Far enough. The road past here runs to country I would not send a two-token traveller into.',
      'Clear the Charter House. Three tokens, then we talk.',
    ],
    openLines: [
      'Three tokens. Well then.',
      'Down the cut and onto the water. Marin keeps the boats - she will see you right.',
    ],
  },

  /* ---------------- The Open Strait ---------------- */
  {
    id: 'marin',
    name: 'Marin the Ferrier',
    sprite: 'marin',
    map: 'strait',
    x: 1, y: 8, facing: 'right',
    action: 'boat',
    lines: [
      'You will not walk to the Archipelago. Nobody has managed it yet.',
      'Take the spare boat - she is slow but she floats. Row anywhere blue; go round the rocks and the kelp.',
      'Three challengers are moored out there, one to a bay. Beat all three, collect their Tool Sigils, and Quay will open the far dock for you.',
    ],
    repeatLines: [
      'Boat still floating? Good.',
      'Three sigils, then the far dock. That is the whole of it.',
    ],
  },
  {
    id: 'skiff',
    name: 'Skiff the Deckhand',
    sprite: 'skiff',
    map: 'strait',
    x: 2, y: 6, facing: 'down',
    action: 'drill',
    drillPool: 'sea',
    lines: [
      'Before you row out - want a drill? No fighting, no health bars.',
      'I give you four steps out of order, you put them back. Good warm-up for what is out there.',
    ],
    repeatLines: ['Another run through the steps? Go on, then.'],
  },
  {
    id: 'quay',
    name: 'Harbourmaster Quay',
    sprite: 'quay',
    map: 'strait',
    x: 22, y: 7, facing: 'left',
    // Steps off the dock once all three sigils are in hand.
    altPosition: { x: 22, y: 6 },
    opensAtSigils: 3,
    action: 'gate',
    lines: [
      'Boom stays down. Three Tool Sigils buys you the far dock, and nothing else does.',
      'Marl to the north, Coral to the south, Brack tucked in behind the east rocks. Off you go.',
    ],
    openLines: [
      'All three. Right you are.',
      'Boom is up. Sigil Port is straight on - mind the moorings on the way in.',
    ],
  },

  /* ---------------- Sigil Port ---------------- */
  {
    id: 'fen',
    name: 'Keeper Fen',
    sprite: 'gale',
    map: 'port',
    x: 17, y: 8, facing: 'left',
    altPosition: { x: 17, y: 7 },
    opensAt: 4,
    action: 'gate',
    lines: [
      'Far dock is mine, and it stays shut. Nothing out there is charted.',
      'Clear the Toolworks first. Four tokens, then we talk about it.',
    ],
    openLines: [
      'Four tokens. I have never had to say this to anyone before.',
      'Far dock is open. The road up starts where the planking stops - and yes, it is cloud. It holds. Mostly.',
    ],
  },

  /* ---------------- The Ascent ---------------- */
  {
    id: 'nim',
    name: 'Nim the Wayfinder',
    sprite: 'nim',
    map: 'ascent',
    x: 7, y: 13, facing: 'right',
    action: 'drill',
    drillPool: 'sky',
    lines: [
      'Long way up. Sit a moment - I do drills, not duels.',
      'Four steps out of order, you put them back. It is what I do instead of worrying.',
    ],
    repeatLines: ['Another set of steps? Go on.'],
  },

  /* ---------------- Halcyon Rest ---------------- */
  {
    id: 'iris',
    name: 'Iris of the Rest',
    sprite: 'iris',
    map: 'haven',
    x: 10, y: 6, facing: 'down',
    lines: [
      'You made the climb. Most people turn back at the second crossing.',
      'Horizon Hall is the one building up here, and Sage Aurel asks the questions nobody has finished answering.',
      'Lume and Thess are out on the cloud. The hall will not open until you have talked to both.',
    ],
  },
  {
    id: 'nova',
    name: 'Keeper Nova',
    sprite: 'nova',
    map: 'haven',
    x: 17, y: 8, facing: 'left',
    altPosition: { x: 17, y: 7 },
    opensAt: 5,
    action: 'gate',
    lines: [
      'East of here the cloud runs out and the light starts. I do not let people walk into that unfinished.',
      'Clear Horizon Hall. Five tokens, and the way is yours.',
    ],
    openLines: [
      'Five. Nobody has done that before.',
      'Go on, then. There is nothing past here that anyone has mapped - which is the point of you going.',
    ],
  },
  {
    id: 'atlas',
    name: 'Atlas the Archivist',
    sprite: 'atlas',
    map: 'archive',
    x: 5, y: 2, facing: 'down',
    action: 'map',
    lines: [
      'Welcome to the Archive. Somebody has to keep track of where everything is.',
      'Loss Valley is one corner of a much bigger region. Here, take a look at the map.',
    ],
    repeatLines: ['Want another look at the map?'],
  },
  {
    id: 'mira',
    name: 'Mira of the Ridge',
    sprite: 'mira',
    map: 'ridge',
    x: 8, y: 9, facing: 'right',
    lines: [
      'Welcome up. Quieter than the valley, and twice as opinionated.',
      'The Prompt Foundry is the building on the left. Quill runs it, and he does not warm up gently.',
      'If you want practice first, Echo is back down the road and never minds a rematch.',
    ],
  },
  {
    id: 'gale',
    name: 'Gale of the North Gate',
    sprite: 'gale',
    map: 'town',
    x: 10, y: 1, facing: 'down',
    // Steps off the road once the Token is won, opening the way north - a
    // real, physical reward for clearing the Inference Hall.
    altPosition: { x: 9, y: 1 },
    opensAt: 1,
    action: 'gate',
    lines: [
      'Hold it. The road north leads out of the valley, and it is not a gentle walk.',
      'Clear the Inference Hall and bring me the Vector Token. Then I will stand aside.',
    ],
    openLines: [
      'You have the Token. That settles it.',
      'The road north is yours - Prompt Ridge is a few days that way. Good luck out there.',
    ],
  },
];

/** Challengers and townsfolk share the placement/dialogue plumbing. */
export const ALL_NPCS = [...NPCS, ...TOWNSFOLK];

/** Every NPC you can duel, anywhere. */
export const CHALLENGERS = NPCS.filter((n) => n.battle && !n.isBoss);

/**
 * Only the three in Loss Valley itself gate the Inference Hall - the ones out
 * on the road north are optional practice, not part of the requirement.
 */
export const VALLEY_CHALLENGERS = CHALLENGERS.filter((n) => n.map === 'town');

/** Total gyms in the world, for the token counter. */
export const TOTAL_TOKENS = 5;

export function npcsOnMap(mapKey) {
  return ALL_NPCS.filter((n) => n.map === mapKey);
}

export function npcById(id) {
  return ALL_NPCS.find((n) => n.id === id);
}
