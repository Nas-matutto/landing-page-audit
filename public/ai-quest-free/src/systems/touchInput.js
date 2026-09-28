/**
 * Shared "is this direction being held" state for the DOM D-pad in
 * index.html, read by TownScene.readDirection().
 *
 * Movement can't go through synthetic KeyboardEvents the way A/B (Space/
 * Escape) do. TownScene's own keydown listener matches on `event.code` and
 * works fine either way - but movement additionally depends on Phaser's own
 * `Key` objects (`this.keys.up.isDown`, from `addKeys({up:'UP',...})`), and
 * those are matched internally against the legacy numeric `keyCode`, which a
 * synthetic `KeyboardEvent` does not reliably carry (and browsers disagree on
 * whether a constructed one can even set it). This sidesteps that entirely:
 * the DOM buttons call these directly, no fake keyboard event involved.
 */

const held = [];

export function pressDirection(dir) {
  const i = held.indexOf(dir);
  if (i !== -1) held.splice(i, 1);
  held.push(dir);
}

export function releaseDirection(dir) {
  const i = held.indexOf(dir);
  if (i !== -1) held.splice(i, 1);
}

/** Most recently pressed direction still held, or null. */
export function heldDirection() {
  return held.length ? held[held.length - 1] : null;
}
