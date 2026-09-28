/**
 * Shared look for every piece of on-canvas UI: one font, one set of text
 * styles, and one panel shape. Original chrome - deliberately not modelled on
 * any existing game's UI.
 */

import { PALETTE, hex } from '../data/palette.js';

/** Bundled OFL pixel font, with a monospace fallback if it ever fails. */
export const FONT = '"Silkscreen", "Courier New", monospace';

/**
 * Silkscreen advances ~8px per glyph at 8px, so a 320px-wide screen fits
 * roughly 38 characters per line once panel padding is taken off.
 */
export const CHAR_W = 8;

export function textStyle({ size = 8, color = 'paper', wrap = 0, bold = false, align = 'left' } = {}) {
  const style = {
    fontFamily: FONT,
    fontSize: `${size}px`,
    fontStyle: bold ? 'bold' : 'normal',
    color: PALETTE[color],
    align,
    // Phaser's default padding clips the tails of some pixel glyphs.
    padding: { x: 2, y: 2 },
    // Text renders to its own small offscreen canvas at the game's native
    // 320x180 scale, then that whole canvas is stretched up to fill
    // whatever the page displays it at - on the landing page that's often
    // 2-3x now (a tall mobile hero, a large popup on desktop). At
    // resolution 1 that stretch blows up the glyphs' own anti-aliasing into
    // visible blur; rendering the text bitmap at a higher resolution first
    // keeps it crisp at those larger display sizes. Cheap for the small
    // number of text objects this game ever has on screen at once.
    resolution: 3,
  };
  if (wrap) style.wordWrap = { width: wrap, useAdvancedWrap: true };
  return style;
}

/**
 * The project's panel. Modernised while staying on the pixel grid:
 *
 *   - a soft drop shadow offset down-right, so panels sit above the scene
 *     rather than being pasted onto it
 *   - 2px stepped corners, which read as a radius at this scale without the
 *     mush that an actual rounded rect gives you at 320x180
 *   - a bright inner top edge and a dark inner bottom edge, so the surface has
 *     a light direction instead of a flat outline
 */
export function drawPanel(g, x, y, w, h, { fill = 'shadow', border = 'slate', shadow = true } = {}) {
  if (shadow) {
    g.fillStyle(hex('ink'), 0.32);
    steppedRect(g, x + 2, y + 3, w, h);
  }

  g.fillStyle(hex('ink'), 1);
  steppedRect(g, x, y, w, h);

  g.fillStyle(hex(border), 1);
  steppedRect(g, x + 1, y + 1, w - 2, h - 2);

  g.fillStyle(hex(fill), 1);
  steppedRect(g, x + 2, y + 2, w - 4, h - 4);

  // Light from above: a highlight along the top, a shade along the bottom.
  g.fillStyle(hex('white'), 0.10);
  g.fillRect(x + 4, y + 2, w - 8, 1);
  g.fillStyle(hex('ink'), 0.28);
  g.fillRect(x + 4, y + h - 3, w - 8, 1);
}

/**
 * A rectangle with its four corner pixels stepped in - the pixel-art way to
 * suggest a corner radius without antialiasing.
 */
function steppedRect(g, x, y, w, h) {
  g.fillRect(x + 2, y, w - 4, h);
  g.fillRect(x, y + 2, w, h - 4);
  g.fillRect(x + 1, y + 1, w - 2, h - 2);
}

/** A rounded meter with an inset track - used for HP and EXP. */
export function drawBar(g, x, y, w, h, ratio, fillKey) {
  // Track
  g.fillStyle(hex('ink'), 1);
  g.fillRect(x, y, w, h);
  g.fillStyle(hex('slateDark'), 1);
  g.fillRect(x + 1, y + 1, w - 2, h - 2);

  const inner = Math.max(0, Math.round((w - 2) * ratio));
  if (inner <= 0) return;

  g.fillStyle(hex(fillKey), 1);
  g.fillRect(x + 1, y + 1, inner, h - 2);

  // Gloss along the top half, shade along the bottom row.
  g.fillStyle(hex('white'), 0.28);
  g.fillRect(x + 1, y + 1, inner, 1);
  g.fillStyle(hex('ink'), 0.18);
  g.fillRect(x + 1, y + h - 2, inner, 1);

  // A soft leading edge, so a draining bar has some motion to it.
  if (inner > 2 && ratio < 1) {
    g.fillStyle(hex('white'), 0.35);
    g.fillRect(x + inner, y + 1, 1, h - 2);
  }
}

/**
 * A vertical wash used behind menus and the battle stage. Cheap depth: three
 * bands rather than a real gradient, which would band anyway at this size.
 */
export function drawBackdrop(g, w, h, { top = 'slateDark', bottom = 'ink' } = {}) {
  g.fillStyle(hex(bottom), 1);
  g.fillRect(0, 0, w, h);
  g.fillStyle(hex(top), 0.55);
  g.fillRect(0, 0, w, Math.round(h * 0.45));
  g.fillStyle(hex(top), 0.28);
  g.fillRect(0, Math.round(h * 0.45), w, Math.round(h * 0.2));
}

/** Colour a health bar by how much is left. */
export function hpColour(ratio) {
  if (ratio > 0.5) return 'correct';
  if (ratio > 0.25) return 'gold';
  return 'wrong';
}
