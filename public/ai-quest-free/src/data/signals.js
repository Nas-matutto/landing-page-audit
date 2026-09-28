/**
 * Statements for the Signal Check in the Whisper Caves.
 *
 * The third challenge shape: not "pick one of four" and not "put these in
 * order", but a fast run of claims you mark true or false against a clock.
 * That makes it about judgement under pressure rather than recall, and it is
 * the format that suits myth-busting best.
 *
 * Keep each claim under ~78 characters - it renders on two lines at most.
 */

export const SIGNALS = [
  { claim: 'A language model always tells the truth.', truth: false,
    note: 'It predicts likely text. Likely is not the same as true.' },
  { claim: 'Tokens are usually whole words or parts of words.', truth: true,
    note: 'Common words are one token; rarer ones get split up.' },
  { claim: 'Asking the same question twice can give different answers.', truth: true,
    note: 'The next token is sampled, not fixed, unless you force it.' },
  { claim: 'Chatting with a model permanently teaches it new facts.', truth: false,
    note: 'Your conversation is context, not training. It forgets after.' },
  { claim: 'A bigger context window always gives better answers.', truth: false,
    note: 'More room helps, but detail can get buried in the noise.' },
  { claim: 'Models can produce citations that do not exist.', truth: true,
    note: 'A plausible-looking reference is exactly the kind of thing it invents.' },
  { claim: 'Prompting well is a skill you can practise.', truth: true,
    note: 'It is empirical. Try, compare, refine.' },
  { claim: 'An AI model understands text the way a person does.', truth: false,
    note: 'It models statistical structure, which is not the same thing.' },
  { claim: 'Training a large model takes a lot of computing power.', truth: true,
    note: 'That is why it happens on racks of GPUs, not on a laptop.' },
  { claim: 'If a model sounds confident, the answer is probably right.', truth: false,
    note: 'Tone carries no information about accuracy. Check it.' },
  { claim: 'The same model can be used for many different tasks.', truth: true,
    note: 'That generality is what makes a general-purpose model useful.' },
  { claim: 'A model knows what happened yesterday by default.', truth: false,
    note: 'Training has a cutoff, unless something feeds it fresh data.' },
  { claim: 'Giving examples in a prompt usually helps.', truth: true,
    note: 'Few-shot prompting shows the pattern instead of describing it.' },
  { claim: 'Deleting a chat removes the model that answered it.', truth: false,
    note: 'The model is unchanged. You only removed your own transcript.' },
  { claim: 'A model can run a program on your computer by itself.', truth: false,
    note: 'It asks for a tool to be run. Your code decides whether to run it.' },
  { claim: 'An agent only knows what is in its context right now.', truth: true,
    note: 'No hidden memory. Anything not carried forward is simply gone.' },
  { claim: 'Giving an agent more access always makes it more useful.', truth: false,
    note: 'It also makes every mistake bigger. Grant the least that works.' },
  { claim: 'Text an agent fetches from the web can try to instruct it.', truth: true,
    note: 'That is prompt injection. Fetched content is data, never orders.' },
];

/** How many claims one run puts to the player. */
export const SIGNAL_ROUND = 6;
/** Seconds allowed per claim before it counts as a miss. */
export const SIGNAL_SECONDS = 8;
/** EXP per correct call, plus a bonus for a clean sweep. */
export const SIGNAL_EXP = { perCorrect: 12, sweep: 40 };

export function pickSignals(count = SIGNAL_ROUND) {
  return [...SIGNALS].sort(() => Math.random() - 0.5).slice(0, count);
}
