/**
 * The level-up card: a centred panel that punches in, holds, and clears.
 *
 * Deliberately not just another dialogue line - a level-up is the reward beat
 * of the whole loop, so it gets its own shape, its own colour, and a moment of
 * screen time where nothing else is happening.
 *
 * Owned by a scene and reused, so repeated level-ups cannot leak objects.
 */

import { drawPanel, textStyle } from './theme.js';
import { hex } from '../data/palette.js';
import { VIEW_W, VIEW_H } from '../config.js';

const W = 188;
const H = 74;
const X = Math.floor((VIEW_W - W) / 2);
const Y = Math.floor((VIEW_H - H) / 2) - 8;
const HOLD_MS = 2200;
const DEPTH = 22000;

export default class LevelUpPopup {
  constructor(scene) {
    this.scene = scene;
    this.onDone = null;
    this.open = false;

    // A container so the whole card can scale about its own centre.
    this.box = scene.add.container(X + W / 2, Y + H / 2).setScrollFactor(0).setDepth(DEPTH);

    this.g = scene.add.graphics();
    this.rays = scene.add.graphics();

    this.title = scene.add
      .text(0, -24, 'LEVEL UP!', textStyle({ size: 16, color: 'goldLight', bold: true }))
      .setOrigin(0.5, 0.5);

    this.levelText = scene.add
      .text(0, -2, '', textStyle({ size: 8, color: 'white', bold: true }))
      .setOrigin(0.5, 0.5);

    this.bonusText = scene.add
      .text(0, 12, '', textStyle({ size: 8, color: 'correct' }))
      .setOrigin(0.5, 0.5);

    this.hint = scene.add
      .text(0, 27, 'SPACE', textStyle({ size: 8, color: 'mist' }))
      .setOrigin(0.5, 0.5);

    this.box.add([this.rays, this.g, this.title, this.levelText, this.bonusText, this.hint]);
    this.box.setVisible(false);
  }

  get isOpen() {
    return this.open;
  }

  /**
   * @param {number} level      the level just reached
   * @param {number} hpGain     max health gained
   * @param {number} times      how many levels this one duel covered
   * @param {() => void} onDone
   */
  show(level, hpGain, times, onDone) {
    this.onDone = onDone;
    this.open = true;

    this.g.clear();
    drawPanel(this.g, -W / 2, -H / 2, W, H, { fill: 'shadow', border: 'gold' });

    // A starburst behind the card, drawn once and spun slowly. Kept just wider
    // than the card so it reads as a glow rather than streaking over the HUD.
    this.rays.clear();
    this.rays.fillStyle(hex('gold'), 0.16);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      this.rays.slice(0, 0, 112, a - 0.07, a + 0.07);
      this.rays.fillPath();
    }

    this.title.setText(times > 1 ? `LEVEL UP x${times}!` : 'LEVEL UP!');
    this.levelText.setText(`You are now Level ${level}`);
    this.bonusText.setText(`+${hpGain} max health in a duel`);

    this.box.setVisible(true);
    this.box.setScale(0.4);
    this.box.setAlpha(0);

    this.scene.tweens.add({
      targets: this.box,
      scale: 1,
      alpha: 1,
      duration: 320,
      ease: 'Back.easeOut',
    });
    this.spin = this.scene.tweens.add({
      targets: this.rays,
      rotation: Math.PI * 2,
      duration: 9000,
      repeat: -1,
    });

    // Auto-clears, but a confirm dismisses it early.
    this.timer = this.scene.time.delayedCall(HOLD_MS, () => this.dismiss());
  }

  /** Confirm pressed. Returns true if this popup consumed it. */
  dismiss() {
    if (!this.open) return false;
    this.open = false;
    this.timer?.remove();
    this.timer = null;
    this.spin?.remove();
    this.spin = null;

    this.scene.tweens.add({
      targets: this.box,
      scale: 0.75,
      alpha: 0,
      duration: 170,
      onComplete: () => {
        this.box.setVisible(false);
        const done = this.onDone;
        this.onDone = null;
        done?.();
      },
    });
    return true;
  }

  destroy() {
    this.timer?.remove();
    this.spin?.remove();
    this.box.destroy(true);
  }
}
