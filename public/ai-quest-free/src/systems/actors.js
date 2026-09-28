/** Shared grid/sprite helpers used by both the overworld and the battle. */

import { actorFrame } from '../data/tileIndex.js';

/** direction -> grid delta. */
export const DELTA = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

export const OPPOSITE = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

/** The neutral standing pose is the middle frame of each direction's cycle. */
export function idleFrame(row, dir) {
  return actorFrame(row, dir, 1);
}
