/**
 * Constants shared by main.js and the UI modules.
 *
 * These live outside main.js on purpose: main.js imports every scene, and the
 * scenes import these values at module top level, so keeping them here avoids
 * a circular import that would leave them in the temporal dead zone.
 */

/**
 * 320x180 rather than a true GBA 240x160. At 240 wide an 8px font gives about
 * 28 characters per line, which makes four answer options unreadably cramped;
 * 320 keeps the chunky look and gives the battle UI room to breathe.
 */
export const VIEW_W = 320;
export const VIEW_H = 180;

/** Tile size in pixels, matching the generated tileset. */
export const TILE = 16;

/** Milliseconds for one grid step. Lower feels twitchy, higher feels sludgy. */
export const STEP_MS = 150;
