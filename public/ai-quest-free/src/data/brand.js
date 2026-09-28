/**
 * Your brand, in one place.
 *
 * Defaulted from the project folder ("Selling with Nas") - change these five
 * fields and every branded surface updates. Nothing else in the game
 * hard-codes a brand name.
 *
 * Where it shows up, deliberately kept light rather than plastered everywhere:
 *   - the title screen, one line under the controls hint
 *   - the Workshop on the road north, which is the branded mini-game stop
 *   - the Workshop challenge screen, as a small mark in the header
 *   - the ending screen credit
 */

export const BRAND = {
  /** Full name, used on the title and ending screens. */
  name: 'Selling with Nas',

  /** Short form for tight spaces like the challenge header. Keep it under ~10 chars. */
  short: 'NAS',

  /** One line. Shown on the Workshop sign and the ending credit. */
  tagline: 'Learn AI the practical way',

  /** Shown on the Workshop sign so people know where to find you. */
  handle: '@sellingwithnas',

  /** A palette key - tints the Workshop and the challenge screen. */
  accent: 'teal',
  accentDark: 'tealDark',
};

/** The branded stop on the road north. */
export const WORKSHOP = {
  name: `The ${BRAND.short} Workshop`,
  host: 'Nasser the Host',
  sign: [
    `${BRAND.name.toUpperCase()} WORKSHOP`,
    BRAND.tagline + '.',
    `Drop in for a drill. Find more at ${BRAND.handle}.`,
  ],
};
