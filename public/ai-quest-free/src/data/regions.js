/**
 * The world, as drawn on the Archive's region map.
 *
 * All five areas are built. Adding a sixth means adding its maps, listing them
 * in `maps`, giving it a position, and adding a ROUTES entry saying how you get
 * there - WorldMapScene needs no changes.
 *
 * `x`/`y` are positions on the 320x180 map screen, so the layout lives with
 * the data rather than being buried in the drawing code.
 *
 * Region names are original; the themes name real products and labs because
 * that is what each area would actually be about.
 */

export const REGIONS = [
  {
    id: 'loss-valley',
    name: 'LOSS VALLEY',
    theme: 'AI and ML foundations',
    gym: 'Inference Hall',
    token: 'Vector Token',
    x: 40, y: 132, labelDy: 12,
    maps: ['town', 'hall', 'archive'],
    locked: false,
  },
  {
    id: 'prompt-ridge',
    name: 'PROMPT RIDGE',
    theme: 'OpenAI, GPT and ChatGPT',
    gym: 'Prompt Foundry',
    token: 'Context Token',
    x: 48, y: 78, labelDy: 12,
    maps: ['ridge', 'foundry'],
    locked: false,
  },
  {
    id: 'constitution-coast',
    name: 'CONSTITUTION COAST',
    theme: 'Anthropic and Claude',
    gym: 'Charter House',
    token: 'Charter Token',
    x: 132, y: 48, labelDy: 12,
    maps: ['coast', 'charter'],
    locked: false,
  },
  {
    id: 'agent-archipelago',
    name: 'AGENT ARCHIPELAGO',
    theme: 'Agents, tools and MCP',
    gym: 'The Toolworks',
    token: 'Toolwright Token',
    x: 232, y: 128, labelDy: 12,
    maps: ['port', 'toolworks'],
    locked: false,
  },
  {
    id: 'open-expanse',
    // Label sits above this one: below would run into the sky road.
    name: 'HALCYON REST',
    theme: 'What is next, and what is unknown',
    gym: 'Horizon Hall',
    token: 'Horizon Token',
    x: 274, y: 62, labelDy: -19,
    // Not on the ground at all - the map draws this one on a cloud.
    aloft: true,
    maps: ['haven', 'horizon'],
    locked: false,
  },
];

/**
 * How you actually get from one region to the next, and what the journey is.
 * `kind` decides how the map draws the link, so the region map matches the
 * world: a walked road, a boulder crossing underground, an open-water sail,
 * and a climb through cloud.
 */
export const ROUTES = [
  { from: 'loss-valley', to: 'prompt-ridge', kind: 'road', label: 'The Long Prompt' },
  { from: 'prompt-ridge', to: 'constitution-coast', kind: 'cave', label: 'The Whisper Caves' },
  { from: 'constitution-coast', to: 'agent-archipelago', kind: 'sea', label: 'The Open Strait' },
  { from: 'agent-archipelago', to: 'open-expanse', kind: 'sky', label: 'The Ascent' },
];

/**
 * Overworld maps that are roads rather than places. The pin sits halfway along
 * the drawn route instead of on a town.
 */
export const ROUTE_MAPS = {
  route: ['loss-valley', 'prompt-ridge'],
  cave: ['prompt-ridge', 'constitution-coast'],
  strait: ['constitution-coast', 'agent-archipelago'],
  ascent: ['agent-archipelago', 'open-expanse'],
};

export function regionForMap(mapKey) {
  return REGIONS.find((r) => r.maps.includes(mapKey)) ?? null;
}

export function regionById(id) {
  return REGIONS.find((r) => r.id === id) ?? null;
}
