/**
 * GENERATED FILE - do not edit by hand.
 * Source: tools/shared.mjs, emitted by tools/gen-art.mjs.
 * Re-run `node tools/gen-art.mjs` after changing the source.
 */

export const PALETTE = {
  ink:         '#12141f',
  shadow:      '#1e2233',
  slateDark:   '#333a55',
  slate:       '#525d80',
  mist:        '#98a3c4',
  paper:       '#e4e8f5',
  white:       '#ffffff',
  grassDark:   '#35704a',
  grass:       '#4e9862',
  grassLight:  '#6cb87c',
  pathDark:    '#8d7757',
  path:        '#bda780',
  pathLight:   '#dbc9a3',
  sand:        '#ded0a4',
  waterDark:   '#265d84',
  water:       '#3585b5',
  waterLight:  '#5fb3d9',
  roofDark:    '#7b3552',
  roof:        '#ab4a64',
  roofLight:   '#d0697d',
  wallDark:    '#a2957f',
  wall:        '#cec2ab',
  wallLight:   '#ebe2cf',
  wood:        '#6d4c36',
  woodLight:   '#94694a',
  stone:       '#818899',
  stoneLight:  '#aab1c0',
  gold:        '#f2b53c',
  goldLight:   '#ffd977',
  correct:     '#4fc98a',
  wrong:       '#e8556d',
  skin:        '#e0a878',
  skinShade:   '#b87d52',
  hair:        '#3d2b21',
  teal:        '#2fb0a0',
  tealDark:    '#1d7a70',
  orange:      '#ec8646',
  orangeDark:  '#b05c2e',
  moss:        '#7aa648',
  mossDark:    '#54742f',
  violet:      '#9a6ad4',
  violetDark:  '#684496',
  azure:       '#4a8ada',
  azureDark:   '#2f5f9c',
  sable:       '#544878',
  sableDark:   '#332c4d',
  navy:        '#2f3d6b',
  crimson:     '#c94f63',
  crimsonDark: '#8d3345',
  rock:        '#4a4657',
  rockDark:    '#332f3e',
  rockLight:   '#635e73',
  crystal:     '#6fd8e8',
  crystalDark: '#2f8fa6',
  gymRoof:     '#3f4a7a',
  gymRoofDark: '#282e52',
  gymRoofLight: '#5f6cae',
  ember:       '#ff9b4a',
  emberDark:   '#c4551f',
  cloud:       '#eef1ff',
  cloudDark:   '#c4cbe9',
  cloudShade:  '#9aa4cc',
  sky:         '#8cbdec',
  skyDeep:     '#3f74b4',
  dawn:        '#f9cba6',
  halo:        '#fff2bd',
};

/** '#rrggbb' -> 0xrrggbb, for the Phaser APIs that want a number. */
export function hex(name) {
  return parseInt(PALETTE[name].slice(1), 16);
}

/** '#rrggbb' as-is, for Phaser Text styles and CSS. */
export function css(name) {
  return PALETTE[name];
}
