/**
 * The bridge between the human-readable map art in maps.js and the numeric
 * tile indices in the generated tileset.
 *
 * Maps are authored as arrays of strings (see maps.js) because a 20x20 grid of
 * numbers is unreadable and unmaintainable by hand. Each character resolves to
 * up to three layers:
 *
 *   ground   always drawn, always present, never transparent
 *   decor    props and buildings, drawn BELOW actors, source of collision
 *   over     drawn ABOVE actors, never blocking (tree canopies, awnings)
 *
 * `-1` means "no tile" on the decor/over layers, which is what Phaser's
 * tilemap treats as empty.
 */

import { T } from './tileIndex.js';

export const EMPTY = -1;

/**
 * character -> { ground, decor, over }
 *
 * A character that omits `ground` inherits the map's `defaultGround` (see
 * parseMap). That is how one set of building characters serves every terrain:
 * `W` is a wall on grass in Loss Valley, on bare rock in Constitution Coast,
 * and on cloud in Halcyon Rest, without three sets of characters to remember.
 *
 * `overAbove: true` means the `over` tile is placed on the tile ABOVE this
 * one, which is how two-tile-tall trees get a canopy the player can walk
 * behind.
 */
export const LEGEND = {
  // --- outdoor ground -------------------------------------------------
  '.': { ground: T.GRASS },
  ',': { ground: T.GRASS_TUFT },
  '*': { ground: T.GRASS_FLOWER },
  '#': { ground: T.PATH },
  '%': { ground: T.PATH_EDGE },
  's': { ground: T.SAND },
  '~': { ground: T.WATER },
  '=': { ground: T.WATER_EDGE },

  // --- indoor ground --------------------------------------------------
  // `_` is "whatever this room is floored with", taken from the map's
  // defaultGround. That is what makes each gym interior a different material
  // without a character per surface: boards, dark tile, dock planking, marble.
  '_': {},
  '+': { ground: T.FLOOR_TILE },
  '-': { ground: T.FLOOR_TILE_B },
  'r': { ground: T.RUG },
  'P': { ground: T.STAGE },
  'E': { ground: T.EXIT_MAT },
  ' ': { ground: T.VOID },

  // --- house shell (decor: solid; ground inherited) --------------------
  'W': { decor: T.WALL },
  'w': { decor: T.WALL_WINDOW },
  '1': { decor: T.ROOF_L },
  '2': { decor: T.ROOF_M },
  '3': { decor: T.ROOF_R },
  '4': { decor: T.ROOF_TOP_L },
  '5': { decor: T.ROOF_TOP_M },
  '6': { decor: T.ROOF_TOP_R },

  // --- gym shell ------------------------------------------------------
  // Same shape as a house, one course taller and in its own colours, so the
  // building that matters on a map is the one you can pick out at a glance.
  '(': { decor: T.GYM_ROOF_L },
  ')': { decor: T.GYM_ROOF_M },
  '}': { decor: T.GYM_ROOF_R },
  '7': { decor: T.GYM_ROOF_TOP_L },
  '8': { decor: T.GYM_ROOF_TOP_M },
  '9': { decor: T.GYM_ROOF_TOP_R },
  'Q': { decor: T.GYM_WALL },
  'R': { decor: T.GYM_EMBLEM },
  'h': { decor: T.BRAZIER },

  // --- doors (walkable; warps live in the map's `warps` list) ---------
  'D': { decor: T.DOOR },
  'H': { decor: T.DOOR_HALL },
  'G': { decor: T.GYM_DOOR },

  // --- outdoor props --------------------------------------------------
  'T': { decor: T.BUSH },
  'Y': { decor: T.TREE_BOT, over: T.TREE_TOP, overAbove: true },
  'S': { decor: T.SIGN },
  'f': { decor: T.FENCE },
  'L': { decor: T.LAMP },
  'c': { decor: T.CRATE },
  'b': { decor: T.FLOWERBED },
  'o': { decor: T.STONE },
  'u': { ground: T.PATH,  decor: T.RUBBLE },

  // --- the caves ------------------------------------------------------
  ':': { ground: T.CAVE_FLOOR },
  ';': { ground: T.CAVE_FLOOR_ALT },
  'X': { ground: T.CAVE_FLOOR, decor: T.CAVE_WALL },
  'v': { ground: T.PIT },
  'q': { ground: T.CAVE_FLOOR, decor: T.CRYSTAL },
  'z': { ground: T.CAVE_FLOOR, decor: T.CAVE_RUBBLE },
  // A boulder is an object, not a tile: the scene owns and moves it.
  'O': { ground: T.CAVE_FLOOR, boulder: true },

  // --- the open water -------------------------------------------------
  // SHALLOW and DEEP are in BLOCKED like any other water. A map that sets
  // `sailable: true` lifts that for a player who has a boat - see
  // TownScene.isWalkable - so the same tiles stay solid scenery everywhere else.
  'd': { ground: T.DOCK },
  'k': { ground: T.DOCK, decor: T.DOCK_POST },
  '!': { ground: T.DOCK, decor: T.SIGN },
  'm': { ground: T.SHALLOW },
  'M': { ground: T.DEEP },
  'K': { ground: T.DEEP, decor: T.SEA_ROCK },
  'U': { ground: T.DEEP, decor: T.BUOY },
  'J': { ground: T.SHALLOW, decor: T.KELP },
  'Z': { ground: T.DEEP, decor: T.CRAG },
  'n': { ground: T.SAND, decor: T.SIGN },

  // --- cloud country --------------------------------------------------
  // `&` only holds you once: stepping off turns it into CLOUD_SPENT, which is
  // the whole of the Ascent's puzzle. `>` is the way out of a bad route.
  '0': { ground: T.CLOUD },
  'A': { ground: T.CLOUD_ALT },
  '&': { ground: T.CLOUD_SOFT },
  '/': { ground: T.SKY },
  'l': { ground: T.FLOOR_MARBLE },
  '$': { decor: T.CLOUD_PILLAR },
  '@': { decor: T.SUNBEAM },
  '>': { decor: T.UPDRAFT },

  // --- indoor props ---------------------------------------------------
  '|': { ground: T.VOID, decor: T.WALL_INT },
  '^': { ground: T.VOID, decor: T.WALL_INT_TOP },
  'B': { ground: T.VOID, decor: T.BANNER },
  'C': { decor: T.COUNTER },
  'p': { decor: T.PLANT },
  'F': { decor: T.FORGE },
  'I': { decor: T.BOOKSHELF },
  'x': { decor: T.TOOL_RACK },
  'e': { decor: T.ALTAR },
  'V': { decor: T.PILLAR },
};

/**
 * Tile indices an actor cannot stand on.
 *
 * Both doors are deliberately absent: you walk onto them and the map's warp
 * list takes it from there. TREE_TOP is absent because it only ever lives on
 * the `over` layer, above head height.
 */
export const BLOCKED = new Set([
  T.WATER, T.WATER_EDGE, T.VOID,
  T.WALL, T.WALL_WINDOW,
  T.ROOF_L, T.ROOF_M, T.ROOF_R, T.ROOF_TOP_L, T.ROOF_TOP_M, T.ROOF_TOP_R,
  T.GYM_WALL, T.GYM_EMBLEM,
  T.GYM_ROOF_L, T.GYM_ROOF_M, T.GYM_ROOF_R,
  T.GYM_ROOF_TOP_L, T.GYM_ROOF_TOP_M, T.GYM_ROOF_TOP_R,
  T.WALL_INT, T.WALL_INT_TOP, T.BANNER, T.COUNTER, T.PLANT,
  T.FORGE, T.BOOKSHELF, T.TOOL_RACK, T.ALTAR, T.BRAZIER, T.PILLAR,
  T.CAVE_WALL, T.PIT, T.CRYSTAL, T.CAVE_RUBBLE,
  T.SHALLOW, T.DEEP, T.DOCK_POST, T.SEA_ROCK, T.BUOY, T.KELP, T.CRAG,
  T.SKY, T.CLOUD_SPENT, T.CLOUD_PILLAR, T.SUNBEAM, T.UPDRAFT,
  T.BUSH, T.TREE_BOT, T.SIGN, T.FENCE, T.LAMP, T.CRATE,
  T.FLOWERBED, T.STONE, T.RUBBLE,
]);

/**
 * Ground an actor can cross in a boat, on a map that declares itself sailable.
 * Deliberately excludes WATER_EDGE: that tile is the foamy shoreline of the
 * inland ponds, not open water anyone rows across.
 */
export const SAILABLE = new Set([T.WATER, T.SHALLOW, T.DEEP]);

/**
 * Turn an array of legend strings into the three numeric layers.
 * Throws loudly on an unknown character or a ragged row - a typo in a map
 * should fail at boot, not render as a silent hole in the floor.
 */
export function parseMap(def) {
  const rows = def.rows;
  const height = rows.length;
  const width = rows[0].length;

  // What a character that names no ground of its own stands on. Grass unless
  // the map says otherwise, which is what lets one `W` be a wall anywhere.
  if (def.defaultGround !== undefined && T[def.defaultGround] === undefined) {
    throw new Error(`Map "${def.key}" has unknown defaultGround "${def.defaultGround}"`);
  }
  const base = def.defaultGround === undefined ? T.GRASS : T[def.defaultGround];

  const ground = [];
  const decor = [];
  const over = [];
  /** Boulder start positions; the scene tracks where they end up. */
  const boulders = [];
  /** Clouds that only hold once; the scene tracks which have been spent. */
  const softClouds = [];
  for (let y = 0; y < height; y++) {
    ground.push(new Array(width).fill(T.VOID));
    decor.push(new Array(width).fill(EMPTY));
    over.push(new Array(width).fill(EMPTY));
  }

  for (let y = 0; y < height; y++) {
    if (rows[y].length !== width) {
      throw new Error(
        `Map "${def.key}" row ${y} is ${rows[y].length} chars, expected ${width}`
      );
    }
    for (let x = 0; x < width; x++) {
      const ch = rows[y][x];
      const cell = LEGEND[ch];
      if (!cell) {
        throw new Error(`Map "${def.key}" has unknown tile char "${ch}" at ${x},${y}`);
      }
      ground[y][x] = cell.ground ?? base;
      if (cell.boulder) boulders.push({ x, y });
      if (ground[y][x] === T.CLOUD_SOFT) softClouds.push({ x, y });
      if (cell.decor !== undefined) decor[y][x] = cell.decor;
      if (cell.over !== undefined) {
        const oy = cell.overAbove ? y - 1 : y;
        if (oy >= 0) over[oy][x] = cell.over;
      }
    }
  }

  return { ...def, width, height, ground, decor, over, boulders, softClouds };
}
