/**
 * The menu button. Small, camera-fixed, top-right.
 *
 * A hamburger rather than a cog: what is behind it is a menu of several things
 * - save, settings, restart - and a cog would promise only preferences.
 *
 * Shared by the overworld and the ending screen so it sits in the same place
 * in both.
 */

import { hex } from '../data/palette.js';
import { VIEW_W } from '../config.js';

const SIZE = 16;
// See the matching comment on HUD_X in TownScene.js: inset enough to clear
// the crop the mobile hero frame applies (Scale.ENVELOP, main.js).
const X = VIEW_W - SIZE - 22;
const Y = 4;
const DEPTH = 16000;

export default class SettingsButton {
  constructor(scene, onOpen) {
    this.scene = scene;
    this.hover = false;

    this.g = scene.add.graphics().setScrollFactor(0).setDepth(DEPTH);

    this.zone = scene.add
      .rectangle(X, Y, SIZE, SIZE)
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setFillStyle(0x000000, 0)
      .setInteractive({ useHandCursor: true })
      .setDepth(DEPTH + 1)
      .on('pointerover', () => { this.hover = true; this.draw(); })
      .on('pointerout', () => { this.hover = false; this.draw(); })
      .on('pointerdown', () => onOpen());

    this.draw();
  }

  setVisible(on) {
    this.g.setVisible(on);
    this.zone.setVisible(on);
  }

  draw() {
    const g = this.g;
    g.clear();

    g.fillStyle(hex('ink'), this.hover ? 0.95 : 0.72);
    g.fillRect(X, Y + 1, SIZE, SIZE - 2);
    g.fillRect(X + 1, Y, SIZE - 2, SIZE);

    // Three bars. 2px tall with 3px gaps: at 16px anything thinner disappears
    // once the canvas is scaled down on a phone.
    const tint = this.hover ? 'goldLight' : 'mist';
    g.fillStyle(hex(tint), 1);
    for (const dy of [4, 7, 10]) g.fillRect(X + 4, Y + dy, SIZE - 8, 2);
  }

  destroy() {
    this.g.destroy();
    this.zone.destroy();
  }
}
