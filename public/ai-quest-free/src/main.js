/**
 * AI Quest - entry point.
 *
 * Phaser is loaded as a global by a plain <script> tag in index.html (see
 * vendor/phaser.min.js), so there is no bundler and no build step; this file
 * and everything under src/ are native ES modules the browser loads directly.
 */

import BootScene from './scenes/BootScene.js';
import TitleScene from './scenes/TitleScene.js';
import PrimerScene from './scenes/PrimerScene.js';
import TownScene from './scenes/TownScene.js';
import BattleScene from './scenes/BattleScene.js';
import WorldMapScene from './scenes/WorldMapScene.js';
import SequenceScene from './scenes/SequenceScene.js';
import SignalScene from './scenes/SignalScene.js';
import SettingsScene from './scenes/SettingsScene.js';
import EndingScene from './scenes/EndingScene.js';
import { hex } from './data/palette.js';
import { VIEW_W, VIEW_H } from './config.js';
import { gameState } from './systems/gameState.js';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: VIEW_W,
  height: VIEW_H,
  backgroundColor: hex('ink'),

  // Crisp upscaling: nearest-neighbour filtering, no sub-pixel sprite offsets.
  pixelArt: true,
  roundPixels: true,

  // ENVELOP scales to fill its parent completely (cropping overflow) rather
  // than FIT's letterbox-and-shrink. On desktop the hero frame is exactly
  // 16:9 - the same as this game's own resolution - so there's nothing to
  // crop and this behaves identically to FIT. On the mobile hero frame
  // (index.html, a bit taller than 16:9 on purpose - see the comment there)
  // it crops a modest strip off the left/right instead of adding dead black
  // bars above and below.
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: [BootScene, TitleScene, PrimerScene, TownScene, BattleScene,
    WorldMapScene, SequenceScene, SignalScene, SettingsScene, EndingScene],
});

// Handy for poking at the running game from the browser console.
window.aiQuest = game;
window.aiQuestState = gameState;

export default game;
