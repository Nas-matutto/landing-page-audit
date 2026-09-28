/**
 * Difficulty-weighted question selection.
 *
 * The boss is not special-cased anywhere: it simply declares a harder `mix` in
 * npcs.js and this module honours it.
 */

import { QUESTIONS } from '../data/questions.js';

/** Ascending, so a battle naturally ramps from easier to harder. */
const ORDER = ['easy', 'medium', 'hard'];

/**
 * Where to look when a difficulty runs dry. Falling back to a neighbour is
 * always better than repeating a question the player just answered.
 */
const FALLBACK = {
  easy: ['easy', 'medium', 'hard'],
  medium: ['medium', 'hard', 'easy'],
  hard: ['hard', 'medium', 'easy'],
};

function shuffle(arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function firstAvailable(difficulty, blocked) {
  const pool = QUESTIONS.filter((q) => q.difficulty === difficulty && !blocked.has(q.id));
  return pool.length ? shuffle(pool)[0] : null;
}

function takeOne(difficulty, usedInRun, usedInBattle) {
  const chain = FALLBACK[difficulty] ?? ORDER;

  // Preferred: something this run has not touched at all.
  const blocked = new Set([...usedInRun, ...usedInBattle]);
  for (const d of chain) {
    const q = firstAvailable(d, blocked);
    if (q) return q;
  }

  // The run has burned through the bank - most likely a rematch after a loss.
  // Repeating across battles beats handing back a short question list.
  for (const d of chain) {
    const q = firstAvailable(d, usedInBattle);
    if (q) return q;
  }

  return null;
}

/**
 * Shuffle the four options and remap `answer`, so the correct choice is never
 * in a predictable slot. Deliberately not optional - questions.js is authored
 * with the correct answer first, and nothing outside this module should see
 * that ordering.
 */
function randomiseOptions(q) {
  const order = shuffle(q.options.map((_, i) => i));
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    answer: order.indexOf(q.answer),
  };
}

/**
 * @param {{easy?: number, medium?: number, hard?: number}} mix
 * @param {Set<string>} usedInRun  question ids already seen this run
 * @returns {Array} questions, easier first, options pre-shuffled
 */
export function pickQuestions(mix, usedInRun = new Set()) {
  const usedInBattle = new Set();
  const picked = [];

  for (const difficulty of ORDER) {
    const want = mix[difficulty] ?? 0;
    for (let i = 0; i < want; i++) {
      const q = takeOne(difficulty, usedInRun, usedInBattle);
      if (!q) break; // bank is smaller than the requested mix
      usedInBattle.add(q.id);
      picked.push(q);
    }
  }

  return picked.map(randomiseOptions);
}
