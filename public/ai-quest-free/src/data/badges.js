/**
 * Gym badges (called Tokens here).
 *
 * `gameState.tokens` stores the display names; this is the lookup for how each
 * one should be drawn. Adding a gym means adding an entry keyed by its token
 * name - the badge popup, the region map and the ending screen all read from
 * here, so none of them need changing.
 */

export const TOKENS = {
  'Vector Token': {
    short: 'VECTOR',
    gym: 'Inference Hall',
    // Cool teal: earned in the valley, where everything is about embeddings.
    accent: 'teal',
    accentDark: 'tealDark',
    glyph: 'nodes',
  },
  'Context Token': {
    short: 'CONTEXT',
    gym: 'Prompt Foundry',
    // Warm amber: earned in the foundry, where things get forged.
    accent: 'gold',
    accentDark: 'orangeDark',
    glyph: 'window',
  },
  'Charter Token': {
    short: 'CHARTER',
    gym: 'Charter House',
    // Pale and cool: earned where they argue about principles.
    accent: 'crystal',
    accentDark: 'crystalDark',
    glyph: 'scales',
  },
  'Toolwright Token': {
    short: 'TOOLWRIGHT',
    gym: 'The Toolworks',
    // Sea blue: earned on an island you can only reach by boat.
    accent: 'azure',
    accentDark: 'azureDark',
    glyph: 'wrench',
  },
  'Horizon Token': {
    short: 'HORIZON',
    gym: 'Horizon Hall',
    // Dawn light: the last one, earned above the clouds.
    accent: 'halo',
    accentDark: 'gold',
    glyph: 'sunrise',
  },
};

export const TOTAL_BADGES = 5;

/** Style for a token name, with a neutral fallback for anything unlisted. */
export function tokenStyle(name) {
  return TOKENS[name] ?? {
    short: (name || 'TOKEN').toUpperCase(),
    gym: '',
    accent: 'slate',
    accentDark: 'slateDark',
    glyph: 'nodes',
  };
}
