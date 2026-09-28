/**
 * The world. Twelve hand-authored maps:
 *
 *   town      Loss Valley, the starting town
 *   hall      the Inference Hall - its gym
 *   archive   the second house, home of the region map
 *   route     The Long Prompt, the road north
 *   ridge     Prompt Ridge, the second town
 *   foundry   the Prompt Foundry - its gym
 *   cave      the Whisper Caves, the boulder crossing east
 *   coast     Constitution Coast, the third town
 *   charter   the Charter House - its gym
 *   strait    the Open Strait, the boat crossing
 *   port      Sigil Port, the fourth town
 *   toolworks the Toolworks - its gym
 *
 * A map may carry `briefing`, which TownScene shows once on first arrival.
 * Anywhere the rules of movement change - the caves, the water - has one,
 * because a new rule the player has to guess at is just a bug with scenery.
 *
 * Outdoor maps are 20 tiles wide (320px) so they fill the viewport; interiors
 * are deliberately smaller and get centred with a dark surround.
 *
 * Maps are arrays of equal-length strings, decoded by LEGEND in tiles.js.
 * Hand-coded grids beat Tiled at this scale: no editor, no JSON schema, no
 * tileset alignment step, and the layout is legible right here in the source.
 *
 * If this ever outgrows strings, parseMap() already produces plain index
 * arrays, so a Tiled JSON export can be dropped in behind it without the
 * scenes noticing.
 */

import { parseMap } from './tiles.js';

const TOWN = {
  key: 'town',
  title: 'Loss Valley',
  rows: [
    // The gap at x=10 on the top row is the road out of the valley. A guard
    // stands on it until the Inference Hall has been cleared.
    'TTTTTTTTTT#TTTTTTTTT',
    'T..78889..#....,...T',
    'T..()))}..#.45556..T',
    'T..()))}..#.12223..T',
    'T..QRGRQ..#.WwDwW..T',
    'T..oh#h...#...#..o.T',
    'T....#....#...#....T',
    'T..Y.#....#...#.Y..T',
    'T....#....#...#....T',
    'T..,.#....#...#..,.T',
    'T..############....T',
    'T....#........*....T',
    'T....#....S........T',
    'T.bb.#.......=~~~..T',
    'T.bb.#......=~~~~..T',
    'T.bb.#.......=~~~..T',
    'T....#....o........T',
    'T..,.#...,.....,...T',
    'T.........,........T',
    'TTTTTTTTTTTTTTTTTTTT',
  ],
  spawn: { x: 5, y: 16, facing: 'up' },
  warps: [
    // The Inference Hall's double door. Gated in TownScene by win count.
    { x: 5, y: 4, to: 'hall', tx: 6, ty: 7, gate: 'hall' },
    // The Archive - always open, and home to the region map.
    { x: 14, y: 4, to: 'archive', tx: 5, ty: 7 },
    // The road north, out of the valley and onto the route. Gale guards it
    // until the Inference Hall token is earned (TownScene guardStoodDown).
    { x: 10, y: 0, to: 'route', tx: 10, ty: 24 },
  ],
  signs: [
    {
      x: 10, y: 12,
      lines: [
        'LOSS VALLEY NOTICE BOARD',
        'Three challengers are taking questions today. Beat all three to earn your way into the Inference Hall.',
        'The Archive on the right keeps a map of the wider region. Worth a look.',
      ],
    },
  ],
};

/**
 * The Archive: the second house, always enterable. Holds the region map, which
 * is what tells the player the valley is only the first area.
 */
const ARCHIVE = {
  key: 'archive',
  title: 'The Archive',
  defaultGround: 'FLOOR_WOOD',
  rows: [
    '|^^^^^^^^^|',
    '|^^B^^^B^^|',
    '|_________|',
    '|__+++++__|',
    '|__+___+__|',
    '|__+++++__|',
    '|p_______p|',
    '|____E____|',
    '|||||||||||',
  ],
  spawn: { x: 5, y: 7, facing: 'up' },
  warps: [
    { x: 5, y: 7, to: 'town', tx: 14, ty: 5 },
  ],
  signs: [],
};

/*
 * The five gym interiors each take their town's material rather than sharing
 * one template. The floor does most of that work: boards in the lecture hall,
 * dark tile in the forge, raw rock on the coast, dock planking on the island,
 * marble in the clouds. Walk into any of them and you should know where you
 * are before you read the sign.
 */
const HALL = {
  key: 'hall',
  title: 'The Inference Hall',
  // A lecture hall: a stage at the back, benches with an aisle up the middle,
  // and the reference wall either side.
  defaultGround: 'FLOOR_WOOD',
  rows: [
    '|^^^^^^^^^^^|',
    '|^^^^B^B^^^^|',
    '|I___PPP___I|',
    '|___________|',
    '|_CC_____CC_|',
    '|_CC_____CC_|',
    '|p_________p|',
    '|_____E_____|',
    '|||||||||||||',
  ],
  spawn: { x: 6, y: 7, facing: 'up' },
  warps: [
    { x: 6, y: 7, to: 'town', tx: 5, ty: 5 },
  ],
  signs: [],
};

/**
 * The road from Loss Valley up to Prompt Ridge. A long winding corridor rather
 * than a straight line, so there are corners to tuck trainers and a signpost
 * into and a reason to walk off the path.
 */
const ROUTE = {
  key: 'route',
  title: 'The Long Prompt',
  // 20 wide to match the town: an outdoor area narrower than the 320px view
  // would letterbox, which looks wrong anywhere you can see the horizon.
  rows: [
    'TTTTTTTTTT#TTTTTTTTT',
    'T.,.......#....,...T',
    'T..Y......#......Y.T',
    'T.........#........T',
    'T...o.....#.....o..T',
    'T.........#........T',
    'T.....#####........T',
    'T.....#............T',
    'T..b..#....,.......T',
    'T.....#............T',
    'T.....#.....Y......T',
    'T.....#............T',
    'T.....#########....T',
    'T..45556......#....T',
    'T..12223......#....T',
    'T..WwwwW......#....T',
    'T....#...S....#....T',
    'T....##########....T',
    'T.........#####....T',
    'T..Y......#......Y.T',
    'T.........#........T',
    'T..b......#........T',
    'T.........#........T',
    'T.,.......#.....,..T',
    'T.........#........T',
    'TTTTTTTTTT#TTTTTTTTT',
  ],
  spawn: { x: 10, y: 24, facing: 'up' },
  warps: [
    { x: 10, y: 25, to: 'town', tx: 10, ty: 1 },
    { x: 10, y: 0, to: 'ridge', tx: 10, ty: 14 },
  ],
  signs: [
    {
      x: 9, y: 16,
      lines: [
        'THE LONG PROMPT',
        'North: Prompt Ridge, where they argue about wording for a living.',
        'South: Loss Valley. Mind the challengers either way.',
      ],
    },
  ],
};

/** The second town. Smaller than Loss Valley, built around its gym. */
const RIDGE = {
  key: 'ridge',
  title: 'Prompt Ridge',
  rows: [
    'TTTTTTTTTTTTTTTTTTTT',
    'T...78889..........T',
    'T...()))}....4556..T',
    'T...()))}....1223..T',
    'T...QRGRQ....Wwww..T',
    'T....h#h...........T',
    'T.....#............T',
    'T.....#####..S.....T',
    'T.........##########',
    'T.........#........T',
    'T..b......#.....o..T',
    'T.........#........T',
    'T.........#........T',
    'T..S......#......,.T',
    'T.........#........T',
    'TTTTTTTTTT#TTTTTTTTT',
  ],
  spawn: { x: 10, y: 14, facing: 'up' },
  warps: [
    { x: 10, y: 15, to: 'route', tx: 10, ty: 1 },
    // The second gym: gated on beating the challengers past the first gym.
    { x: 6, y: 4, to: 'foundry', tx: 6, ty: 7, gate: 'foundry' },
    // The east road, into the Whisper Caves. Keeper Bram stands on the
    // approach until both tokens are won.
    { x: 19, y: 8, to: 'cave', tx: 1, ty: 6 },
  ],
  signs: [
    {
      x: 3, y: 13,
      lines: [
        'PROMPT RIDGE',
        'Home of the Prompt Foundry, where they will test how well you actually know these assistants.',
      ],
    },
    {
      x: 13, y: 7,
      lines: [
        'EAST: THE WHISPER CAVES',
        'Mind the fallen stones. Push them into the sinkholes and the way through opens up.',
        'Constitution Coast lies on the far side.',
      ],
    },
  ],
};

/**
 * The Whisper Caves: three chambers, each sealed by a sinkhole in its doorway.
 * Shove a boulder in to bridge it. No questions in here at all - the puzzle IS
 * the challenge, which is the point of putting it between two gyms.
 */
const CAVE = {
  key: 'cave',
  title: 'The Whisper Caves',
  rows: [
    'XXXXXXXXXXXXXXXXXXXXXXXXXX',
    'X:::::::X:::::::X:::::::XX',
    'X:q:::::X:::q:::X:q:::::XX',
    'X:::::::X:::::::X:::::::XX',
    'X:::::::X:::::O:X:::O:::XX',
    'X:::::::X:::::::X:::::::XX',
    '::::::O:v:::::::v:::O:vv::',
    'X:::::::X:::::::X:::::::XX',
    'X:::::::X:::::::X:::::::XX',
    'X:::::::X:::::::X:::::::XX',
    'X::z::::X::::z::X:::::z:XX',
    'X:::::::X:::::::X:::::::XX',
    'XXXXXXXXXXXXXXXXXXXXXXXXXX',
  ],
  spawn: { x: 1, y: 6, facing: 'right' },
  briefing: [
    'THE WHISPER CAVES',
    'Sinkholes block the way east. Walk into a boulder to shove it, and shove one into a hole to bridge it.',
    'A boulder only moves if the space behind it is clear. Touch a glowing crystal to grind every stone back to its start.',
  ],
  warps: [
    { x: 0, y: 6, to: 'ridge', tx: 18, ty: 8 },
    { x: 25, y: 6, to: 'coast', tx: 1, ty: 8 },
  ],
  signs: [],
};

/**
 * Constitution Coast: built into the rock at the far mouth of the caves, so it
 * keeps the cave palette rather than going back to grass.
 *
 * The east mouth is deliberately a one-tile corridor with rock either side.
 * Standing a guard on an open plain never blocks anything - the player just
 * walks round him - so the wall does the blocking and the guard does the
 * explaining.
 */
const COAST = {
  key: 'coast',
  title: 'Constitution Coast',
  // Everything that does not name its own ground stands on bare rock here, so
  // the ordinary building characters build a rock-founded town.
  defaultGround: 'CAVE_FLOOR',
  rows: [
    'XXXXXXXXXXXXXXXXXXXX',
    'X::78889::::::q::::X',
    'X::()))}:::::456:::X',
    'X::()))}:::::123:::X',
    'X::QRGRQ:::::WwW:::X',
    'X:::h;h::::::::::::X',
    'X::::;:::::::::::::X',
    'X::::;;;;;;;;;;:::XX',
    '::::::::::::::::::::',
    'X::z:::::;::::::z:XX',
    'X::::::::;:::::::::X',
    'X:::q::::;::::q::::X',
    'X::::::::;:::::::::X',
    'X:::S::::;:::::::::X',
    'X::::::::;:::::::::X',
    'XXXXXXXXXXXXXXXXXXXX',
  ],
  spawn: { x: 1, y: 8, facing: 'right' },
  warps: [
    { x: 0, y: 8, to: 'cave', tx: 24, ty: 6 },
    // The Charter House: gated on the two challengers here.
    { x: 5, y: 4, to: 'charter', tx: 6, ty: 7, gate: 'charter' },
    // Down to the water. Shut until the Charter House has been cleared.
    { x: 19, y: 8, to: 'strait', tx: 1, ty: 7, gate: 'strait' },
  ],
  signs: [
    {
      x: 4, y: 13,
      lines: [
        'CONSTITUTION COAST',
        'The Charter House sets the rules it lives by, then argues about them in public.',
        'Sena and Orrin will want a word before Arbiter Vale sees you.',
      ],
    },
  ],
};

/**
 * The third gym: a chamber hewn out of the same rock as the town, lit by the
 * cave crystals, with pillars instead of furniture. A debating hall, not a
 * workshop.
 */
const CHARTER = {
  key: 'charter',
  title: 'The Charter House',
  defaultGround: 'CAVE_FLOOR',
  rows: [
    '|^^^^^^^^^^^|',
    '|^^^^B^B^^^^|',
    '|:::::::::::|',
    '|::V:PPP:V::|',
    '|:::::::::::|',
    '|::V:::::V::|',
    '|q:::::::::q|',
    '|:::::E:::::|',
    '|||||||||||||',
  ],
  spawn: { x: 6, y: 7, facing: 'up' },
  warps: [
    { x: 6, y: 7, to: 'coast', tx: 5, ty: 5 },
  ],
  signs: [],
};

/** The second gym: a working forge, hearths lit, crates and benches. */
const FOUNDRY = {
  key: 'foundry',
  title: 'The Prompt Foundry',
  defaultGround: 'FLOOR_TILE_B',
  rows: [
    '|^^^^^^^^^^^|',
    '|^^B^^^^^B^^|',
    '|F_________F|',
    '|___PPPPP___|',
    '|___________|',
    '|_C_cc_cc_C_|',
    '|p_________p|',
    '|_____E_____|',
    '|||||||||||||',
  ],
  spawn: { x: 6, y: 7, facing: 'up' },
  warps: [
    { x: 6, y: 7, to: 'ridge', tx: 6, ty: 5 },
  ],
  signs: [],
};

/**
 * The Open Strait: the water crossing to Agent Archipelago.
 *
 * `sailable: true` is what makes the sea walkable at all, and only once Marin
 * has handed over a boat - see TownScene.isWalkable. Rock spires pinch the
 * channel into bays so the three sailing challengers have somewhere to sit
 * that is worth rowing out to, and the far dock stays shut until all three
 * Tool Sigils are in hand.
 */
const STRAIT = {
  key: 'strait',
  title: 'The Open Strait',
  sailable: true,
  rows: [
    'ZZZZZZZZZZZZZZZZZZZZZZZZ',
    'ZssmmMMMMMMMMMMMMMMmmssZ',
    'ZssmmMMMKMMMMMMKMMMmmssZ',
    'ZssmmMMMMMMMUMMMMMMmmssZ',
    'ZssmmMMZZMMMMMMZZMMmmssZ',
    'ZssmmMZZZMMMMMMZMMMmmssZ',
    'ZndmmMMMMMMMMMMMMMMZmdsZ',
    'dddmmMMMMMMMMMMMMMMmmddd',
    'ZsdmmMMMMMMMMMMMMMMZmdsZ',
    'ZssmmMMZMMMMMMMZZZMmmssZ',
    'ZssmmMMZZMMMMMMZZMMmmssZ',
    'ZssmmMMMKMMMMMMKMMMmmssZ',
    'ZssmJMMMMMMMMMMMMMMJmssZ',
    'ZZZZZZZZZZZZZZZZZZZZZZZZ',
  ],
  spawn: { x: 1, y: 7, facing: 'right' },
  // Shown once, the first time the player rows in. A new movement rule with no
  // explanation is just a wall you cannot see.
  briefing: [
    'THE OPEN STRAIT',
    'Three sailing challengers are moored out among the rocks, and each one carries a Tool Sigil.',
    'Win all three sigils and Harbourmaster Quay will open the far dock. Rocks and kelp you go around.',
  ],
  warps: [
    { x: 0, y: 7, to: 'coast', tx: 18, ty: 8 },
    { x: 23, y: 7, to: 'port', tx: 1, ty: 8, gate: 'port' },
  ],
  signs: [
    {
      x: 1, y: 6,
      lines: [
        'THE OPEN STRAIT',
        'No road from here. Talk to Marin on the sand and she will find you a boat.',
        'Deep water in the middle, shallows along the shore. Both row the same.',
      ],
    },
  ],
};

/**
 * Agent Archipelago's town: an island, so it is ringed by the same water the
 * player just crossed rather than by the usual wall of trees.
 */
const PORT = {
  key: 'port',
  title: 'Sigil Port',
  rows: [
    'MMMMMMMMMMMMMMMMMMMM',
    'MmssssssssssssssssmM',
    'Mms.78889........smM',
    'Mms.()))}..4556..smM',
    'Mms.()))}..1223..smM',
    'Mms.QRGRQ..Wwww..smM',
    'Mms..h#h.L.......smM',
    'Mmsc..#.........csmM',
    'dds####..........ddd',
    'Mmsc........S....smM',
    'Mms..b...........smM',
    'Mms......L....,..smM',
    'Mms..,...........smM',
    'Mms..............smM',
    'MmssssssssssssssssmM',
    'MMMMMMMMMMMMMMMMMMMM',
  ],
  spawn: { x: 1, y: 8, facing: 'right' },
  warps: [
    { x: 0, y: 8, to: 'strait', tx: 22, ty: 7 },
    // The fourth gym, gated on the two challengers standing outside it.
    { x: 6, y: 5, to: 'toolworks', tx: 6, ty: 7, gate: 'toolworks' },
    // The far dock, and the road up into the clouds. Keeper Fen holds it.
    { x: 19, y: 8, to: 'ascent', tx: 9, ty: 22, gate: 'ascent' },
  ],
  signs: [
    {
      x: 12, y: 9,
      lines: [
        'SIGIL PORT',
        'Everything here is built to plug into something else. The Toolworks tests whether you know why that matters.',
        'Pell and Wisp are taking questions outside it.',
      ],
    },
  ],
};

/** The fourth gym: a boathouse floor, pegboards of tools, crates of parts. */
const TOOLWORKS = {
  key: 'toolworks',
  title: 'The Toolworks',
  defaultGround: 'DOCK',
  rows: [
    '|^^^^^^^^^^^|',
    '|^^B^^^^^B^^|',
    '|x_________x|',
    '|___PPPPP___|',
    '|___________|',
    '|_Cc_____cC_|',
    '|p_________p|',
    '|_____E_____|',
    '|||||||||||||',
  ],
  spawn: { x: 6, y: 7, facing: 'up' },
  warps: [
    { x: 6, y: 7, to: 'port', tx: 6, ty: 6 },
  ],
  signs: [],
};

/**
 * The Ascent: the cloud road up to Halcyon Rest.
 *
 * Three crossings of `&` clouds, which hold you exactly once. Step off one and
 * it thins into sky behind you, so the puzzle is choosing a route you can
 * finish rather than one you can retrace. Walk yourself into a corner and you
 * drift back to the last solid ground with every cloud restored; an updraft on
 * each terrace does the same on demand, for when you want to go back down.
 */
const ASCENT = {
  key: 'ascent',
  title: 'The Ascent',
  defaultGround: 'CLOUD',
  rows: [
    '/////////00/////////',
    '////////0000////////',
    '/////000000000//////',
    '////0@0000000@0/////',
    '////00000000000/////',
    '/////>00000000//////',
    '//////0000000///////',
    '///////&&&/&////////',
    '///////&/&&&////////',
    '///////&&/&&////////',
    '/////>00000000//////',
    '////0$0000000$0/////',
    '////00000000000/////',
    '////0A0000000A0/////',
    '////00000000000/////',
    '/////000000000//////',
    '//////0000000///////',
    '//////&&&/&&////////',
    '//////&/&&/&&///////',
    '//////&&/&&&&///////',
    '//////>000000///////',
    '//////00000S0///////',
    '///////00000////////',
    '////////000/////////',
  ],
  spawn: { x: 9, y: 23, facing: 'up' },
  briefing: [
    'THE ASCENT',
    'The pale ringed clouds only hold once. Step off one and it thins away behind you, so pick a way across you can finish.',
    'Corner yourself and you will drift back to solid ground. Touch a rising updraft to gather every cloud back at once.',
  ],
  warps: [
    { x: 9, y: 23, to: 'port', tx: 18, ty: 8 },
    { x: 9, y: 0, to: 'haven', tx: 9, ty: 14 },
  ],
  signs: [
    {
      x: 11, y: 21,
      lines: [
        'THE ASCENT',
        'Above: Halcyon Rest, and the last hall anyone has built.',
        'The ringed clouds hold one crossing each. Nothing up here is a shortcut.',
      ],
    },
  ],
};

/**
 * Halcyon Rest: a town on a cloud. No trees, no roads, no water - the ground
 * itself is the thing that makes it strange, so the map is deliberately sparse
 * and everything on it is either light or stone.
 */
const HAVEN = {
  key: 'haven',
  title: 'Halcyon Rest',
  defaultGround: 'CLOUD',
  rows: [
    '////////////////////',
    '/////0000000000/////',
    '///0078889000000////',
    '///00()))}000000////',
    '///00()))}000000////',
    '///00QRGRQ000000////',
    '//0000h0h00000000///',
    '//00000000000000A0//',
    '//000000000000000000',
    '//00000000000000A0//',
    '//00$00000000$000///',
    '//000000000000000///',
    '//00000S000000000///',
    '///00000000000000///',
    '/////0000000000/////',
    '////////000/////////',
  ],
  spawn: { x: 9, y: 14, facing: 'up' },
  warps: [
    { x: 9, y: 15, to: 'ascent', tx: 9, ty: 1 },
    // The final gym.
    { x: 7, y: 5, to: 'horizon', tx: 6, ty: 7, gate: 'horizon' },
    // The end of everything that has been built.
    { x: 19, y: 8, to: 'ending' },
  ],
  signs: [
    {
      x: 7, y: 12,
      lines: [
        'HALCYON REST',
        'Nobody built this. It settled, and people came up after it.',
        'Horizon Hall takes the questions nobody has finished answering. Lume and Thess are outside it.',
      ],
    },
  ],
};

/** The fifth and final gym: marble on cloud, two lights, and a plain floor. */
const HORIZON = {
  key: 'horizon',
  title: 'Horizon Hall',
  defaultGround: 'FLOOR_MARBLE',
  rows: [
    '|^^^^^^^^^^^|',
    '|^^^^B^B^^^^|',
    '|__e_____e__|',
    '|___PPPPP___|',
    '|___________|',
    '|_V_______V_|',
    '|V_________V|',
    '|_____E_____|',
    '|||||||||||||',
  ],
  spawn: { x: 6, y: 7, facing: 'up' },
  warps: [
    { x: 6, y: 7, to: 'haven', tx: 7, ty: 6 },
  ],
  signs: [],
};

export const MAPS = {
  town: parseMap(TOWN),
  hall: parseMap(HALL),
  archive: parseMap(ARCHIVE),
  route: parseMap(ROUTE),
  ridge: parseMap(RIDGE),
  foundry: parseMap(FOUNDRY),
  cave: parseMap(CAVE),
  coast: parseMap(COAST),
  charter: parseMap(CHARTER),
  strait: parseMap(STRAIT),
  port: parseMap(PORT),
  toolworks: parseMap(TOOLWORKS),
  ascent: parseMap(ASCENT),
  haven: parseMap(HAVEN),
  horizon: parseMap(HORIZON),
};

export function getMap(key) {
  const map = MAPS[key];
  if (!map) throw new Error(`Unknown map "${key}"`);
  return map;
}
