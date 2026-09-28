/**
 * The badge/token mark, drawn in one place so the popup, the region map and
 * the ending screen can never disagree about what it looks like.
 *
 * Modernised from the earlier flat gold disc: a hexagon with a bevelled rim, a
 * darker inset face, a light direction, and a per-gym glyph. The hexagon is
 * what does most of the work - a circle reads as a coin, a hex reads as a
 * badge.
 */

import { hex } from '../data/palette.js';
import { tokenStyle } from '../data/badges.js';

/** Points of a flat-top hexagon of "radius" r about (cx, cy). */
function hexPoints(cx, cy, r) {
  const w = r;
  const h = Math.round(r * 0.88);
  return [
    [cx - w * 0.5, cy - h],
    [cx + w * 0.5, cy - h],
    [cx + w, cy],
    [cx + w * 0.5, cy + h],
    [cx - w * 0.5, cy + h],
    [cx - w, cy],
  ];
}

function fillHex(g, cx, cy, r) {
  const pts = hexPoints(cx, cy, r);
  g.beginPath();
  pts.forEach(([x, y], i) => (i === 0 ? g.moveTo(x, y) : g.lineTo(x, y)));
  g.closePath();
  g.fillPath();
}

/**
 * @param {Phaser.GameObjects.Graphics} g
 * @param {number} r  outer radius; 20 is the popup size, 6 works on the map
 * @param {{token?: string, dim?: boolean, locked?: boolean}} opts
 */
export function drawBadge(g, cx, cy, r, { token, dim = false, locked = false } = {}) {
  const style = tokenStyle(token);
  const accent = locked ? 'slateDark' : style.accent;
  const accentDark = locked ? 'shadow' : style.accentDark;
  const alpha = dim ? 0.55 : 1;

  // Outline, bevelled rim, inset face.
  g.fillStyle(hex('ink'), alpha);
  fillHex(g, cx, cy, r);
  g.fillStyle(hex(accentDark), alpha);
  fillHex(g, cx, cy, r - 1);
  g.fillStyle(hex(accent), alpha);
  fillHex(g, cx, cy, r - 2);

  // Light from above: a brighter cap, a darker chin.
  if (r >= 8) {
    g.fillStyle(hex('white'), 0.22 * alpha);
    g.fillRect(cx - r * 0.45, cy - r * 0.82, r * 0.9, Math.max(1, Math.round(r * 0.22)));
    g.fillStyle(hex('ink'), 0.22 * alpha);
    g.fillRect(cx - r * 0.45, cy + r * 0.62, r * 0.9, Math.max(1, Math.round(r * 0.18)));
  }

  g.fillStyle(hex(accentDark), alpha);
  fillHex(g, cx, cy, Math.max(2, r - 5));

  if (locked) {
    // A plain bar instead of a glyph: nothing earned here yet.
    g.fillStyle(hex('slate'), alpha);
    g.fillRect(cx - r * 0.4, cy - 1, r * 0.8, 2);
    return;
  }

  drawGlyph(g, cx, cy, r, style.glyph, alpha);
}

/** Per-gym mark, sized off the badge radius so it scales down to the map. */
function drawGlyph(g, cx, cy, r, glyph, alpha) {
  const s = r / 20; // 1 at popup size
  const px = (x, y, w, h) => g.fillRect(
    Math.round(cx + x * s), Math.round(cy + y * s),
    Math.max(1, Math.round(w * s)), Math.max(1, Math.round(h * s)),
  );

  g.fillStyle(hex('white'), 0.92 * alpha);

  if (glyph === 'window') {
    // A context window: a frame with a filled band inside it.
    px(-8, -7, 16, 2);
    px(-8, -7, 2, 14);
    px(6, -7, 2, 14);
    px(-8, 5, 16, 2);
    g.fillStyle(hex('goldLight'), 0.95 * alpha);
    px(-5, -3, 10, 2);
    px(-5, 1, 6, 2);
    return;
  }

  if (glyph === 'sunrise') {
    // A sun coming up over a line: the last badge, and the only thing you can
    // see from Halcyon Rest.
    px(-9, 4, 19, 2);          // the horizon
    px(-4, -5, 9, 9);          // the disc
    px(-6, -3, 13, 7);
    g.fillStyle(hex('goldLight'), 0.95 * alpha);
    px(-2, -8, 5, 2);          // rays
    px(-9, -1, 2, 2);
    px(8, -1, 2, 2);
    px(-7, -6, 2, 2);
    px(6, -6, 2, 2);
    return;
  }

  if (glyph === 'wrench') {
    // A spanner: something built to grip something else, which is the whole
    // idea of the Toolworks. The open jaw is drawn as two prongs rather than a
    // punched-out block, so it survives being scaled down to the region map.
    px(-4, -9, 2, 5);
    px(2, -9, 2, 5);
    px(-4, -5, 8, 3);
    px(-1, -2, 3, 7);
    g.fillStyle(hex('goldLight'), 0.95 * alpha);
    px(-3, 5, 7, 4);
    return;
  }

  if (glyph === 'scales') {
    // A balance: a beam, a post, and two pans.
    px(-1, -9, 3, 3);
    px(-1, -6, 2, 11);
    px(-9, -4, 19, 2);
    px(-10, -2, 5, 2);
    px(5, -2, 5, 2);
    px(-5, 4, 11, 2);
    return;
  }

  // Default: three nodes and their edges.
  px(-1, -8, 3, 3);
  px(-7, 4, 3, 3);
  px(5, 4, 3, 3);
  g.fillStyle(hex('white'), 0.6 * alpha);
  px(-5, -3, 2, 2);
  px(-3, 0, 2, 2);
  px(3, -3, 2, 2);
  px(1, 0, 2, 2);
  px(-3, 6, 7, 2);
}
