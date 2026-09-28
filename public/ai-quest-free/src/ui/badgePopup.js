/**
 * The badge-earned card: the biggest reward beat in the game, so it gets the
 * loudest treatment - a full-screen dim, a spinning starburst, the badge
 * dropping in with a bounce, and a shine sweeping across it.
 *
 * Owned by a scene and reused, like the level-up popup.
 */

import { drawPanel, textStyle } from './theme.js';
import { drawBadge } from './badge.js';
import { tokenStyle } from '../data/badges.js';
import { hex } from '../data/palette.js';
import { VIEW_W, VIEW_H } from '../config.js';

const W = 214;
const H = 104;
const X = Math.floor((VIEW_W - W) / 2);
const Y = Math.floor((VIEW_H - H) / 2) - 4;
const DEPTH = 23000;
const BADGE_R = 20;

export default class BadgePopup {
  constructor(scene) {
    this.scene = scene;
    this.onDone = null;
    this.open = false;

    this.dim = scene.add.graphics().setScrollFactor(0).setDepth(DEPTH - 1);
    this.box = scene.add.container(X + W / 2, Y + H / 2).setScrollFactor(0).setDepth(DEPTH);

    this.rays = scene.add.graphics();
    this.panel = scene.add.graphics();
    this.badge = scene.add.graphics();
    this.shine = scene.add.graphics();

    this.title = scene.add
      .text(0, -36, 'BADGE EARNED', textStyle({ size: 8, color: 'gold', bold: true }))
      .setOrigin(0.5, 0.5);
    this.tokenName = scene.add
      .text(0, 20, '', textStyle({ size: 16, color: 'white', bold: true }))
      .setOrigin(0.5, 0.5);
    this.gymName = scene.add
      .text(0, 34, '', textStyle({ size: 8, color: 'mist' }))
      .setOrigin(0.5, 0.5);
    this.hint = scene.add
      .text(0, 45, 'SPACE', textStyle({ size: 8, color: 'slate' }))
      .setOrigin(0.5, 0.5);

    this.box.add([this.rays, this.panel, this.badge, this.shine,
      this.title, this.tokenName, this.gymName, this.hint]);
    this.setHidden();
  }

  get isOpen() {
    return this.open;
  }

  setHidden() {
    this.box.setVisible(false);
    this.dim.setVisible(false);
  }

  /** @param {string} token display name, e.g. "Vector Token" */
  show(token, onDone) {
    const style = tokenStyle(token);
    this.onDone = onDone;
    this.open = true;

    this.dim.clear();
    this.dim.fillStyle(hex('ink'), 0.78);
    this.dim.fillRect(0, 0, VIEW_W, VIEW_H);
    this.dim.setVisible(true);

    this.panel.clear();
    drawPanel(this.panel, -W / 2, -H / 2, W, H, { fill: 'shadow', border: style.accent });

    this.rays.clear();
    this.rays.fillStyle(hex(style.accent), 0.18);
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      this.rays.slice(0, 0, 128, a - 0.06, a + 0.06);
      this.rays.fillPath();
    }

    this.badge.clear();
    drawBadge(this.badge, 0, -8, BADGE_R, { token });

    // Kept narrower than the badge and swept only across its face: a streak
    // wider than the silhouette reads as a scratch rather than a shine.
    this.shine.clear();
    this.shine.fillStyle(hex('white'), 0.45);
    this.shine.fillRect(-9, 0, 18, 2);
    this.shine.fillRect(-6, 2, 12, 1);
    this.shine.setAlpha(0);

    this.tokenName.setText(style.short);
    this.gymName.setText(style.gym ? `${style.gym} cleared` : '');

    this.box.setVisible(true);
    this.box.setScale(0.5);
    this.box.setAlpha(0);
    this.badge.setScale(0.2);

    this.scene.tweens.add({ targets: this.box, scale: 1, alpha: 1, duration: 300, ease: 'Back.easeOut' });
    this.scene.tweens.add({
      targets: this.badge, scale: 1, duration: 460, delay: 140, ease: 'Back.easeOut',
    });
    this.spin = this.scene.tweens.add({
      targets: this.rays, rotation: Math.PI * 2, duration: 11000, repeat: -1,
    });
    // A shine sweeping down across the badge, once it has landed.
    this.sweep = this.scene.tweens.add({
      targets: this.shine,
      y: { from: -22, to: 2 },
      alpha: { from: 0, to: 0.85 },
      duration: 480,
      delay: 640,
      yoyo: true,
      repeat: -1,
      repeatDelay: 1000,
      ease: 'Sine.easeInOut',
    });

    this.scene.cameras.main.flash(220, 255, 240, 200);
  }

  /** Confirm pressed. Returns true if this popup consumed it. */
  dismiss() {
    if (!this.open) return false;
    this.open = false;
    this.spin?.remove();
    this.sweep?.remove();

    this.scene.tweens.add({
      targets: [this.box, this.dim],
      alpha: 0,
      duration: 190,
      onComplete: () => {
        this.setHidden();
        const done = this.onDone;
        this.onDone = null;
        done?.();
      },
    });
    return true;
  }

  destroy() {
    this.spin?.remove();
    this.sweep?.remove();
    this.box.destroy(true);
    this.dim.destroy();
  }
}
