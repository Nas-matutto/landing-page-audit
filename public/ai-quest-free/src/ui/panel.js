/**
 * The overworld dialogue box: a camera-fixed panel with a typewriter reveal,
 * an optional speaker tab, and a blinking advance indicator.
 *
 * Owned by a scene, reused for every conversation rather than rebuilt, so
 * repeated battles can't leak text objects.
 */

import { drawPanel, textStyle } from './theme.js';
import { hex } from '../data/palette.js';
import { VIEW_W, VIEW_H } from '../config.js';

// The mobile hero frame crops a modest strip off the left/right (Scale.
// ENVELOP, see main.js) rather than letterboxing, so this needs more margin
// from the true edge than it used to - 6px used to be plenty when every
// pixel of the 320-wide view was always shown; not any more.
const PANEL_X = 18;
const PANEL_W = VIEW_W - 36;
const PANEL_H = 52;
const PANEL_Y = VIEW_H - PANEL_H - 6;
const PAD = 7;
const CHARS_PER_TICK = 2;
const TICK_MS = 16;

export default class DialoguePanel {
  constructor(scene) {
    this.scene = scene;
    this.lines = [];
    this.index = 0;
    this.onDone = null;
    this.revealing = false;

    const depth = 20000;

    this.g = scene.add.graphics().setScrollFactor(0).setDepth(depth);
    this.nameG = scene.add.graphics().setScrollFactor(0).setDepth(depth + 1);
    this.arrow = scene.add.graphics().setScrollFactor(0).setDepth(depth + 2);

    // Vertically centred in the speaker tab; see the note in TownScene's HUD.
    this.nameText = scene.add
      .text(PANEL_X + PAD + 5, PANEL_Y - 6, '', textStyle({ color: 'gold', bold: true }))
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(depth + 2);

    this.body = scene.add
      .text(PANEL_X + PAD, PANEL_Y + PAD, '', textStyle({ wrap: PANEL_W - PAD * 2 }))
      .setScrollFactor(0)
      .setDepth(depth + 2);

    this.timer = null;
    this.blink = scene.time.addEvent({
      delay: 400,
      loop: true,
      callback: () => this.drawArrow(),
    });

    this.setVisible(false);
    this.arrowOn = true;
  }

  get isOpen() {
    return this.g.visible;
  }

  setVisible(on) {
    this.g.setVisible(on);
    this.nameG.setVisible(on);
    this.arrow.setVisible(on);
    this.nameText.setVisible(on);
    this.body.setVisible(on);
  }

  /**
   * @param {string[]} lines
   * @param {{speaker?: string, onDone?: () => void}} opts
   */
  show(lines, { speaker = null, onDone = null } = {}) {
    this.lines = lines.slice();
    this.index = 0;
    this.onDone = onDone;
    this.speaker = speaker;

    this.g.clear();
    drawPanel(this.g, PANEL_X, PANEL_Y, PANEL_W, PANEL_H);

    this.nameG.clear();
    this.nameText.setText(speaker ?? '');
    if (speaker) {
      // Measure the rendered text rather than guessing at glyph widths.
      const w = Math.ceil(this.nameText.width) + 8;
      drawPanel(this.nameG, PANEL_X + PAD, PANEL_Y - 13, w, 15, { fill: 'slateDark' });
    }

    this.setVisible(true);
    this.renderLine();
  }

  renderLine() {
    const full = this.lines[this.index] ?? '';
    this.full = full;
    this.shown = 0;
    this.revealing = true;
    this.body.setText('');
    this.drawArrow();

    this.timer?.remove();
    this.timer = this.scene.time.addEvent({
      delay: TICK_MS,
      loop: true,
      callback: () => {
        this.shown = Math.min(this.full.length, this.shown + CHARS_PER_TICK);
        this.body.setText(this.full.slice(0, this.shown));
        if (this.shown >= this.full.length) this.finishLine();
      },
    });
  }

  finishLine() {
    this.timer?.remove();
    this.timer = null;
    this.revealing = false;
    this.body.setText(this.full);
    this.drawArrow();
  }

  /** Confirm pressed: skip the reveal, else move on. Returns true if consumed. */
  advance() {
    if (!this.isOpen) return false;

    if (this.revealing) {
      this.shown = this.full.length;
      this.finishLine();
      return true;
    }

    this.index += 1;
    if (this.index < this.lines.length) {
      this.renderLine();
      return true;
    }

    this.hide();
    const done = this.onDone;
    this.onDone = null;
    done?.();
    return true;
  }

  hide() {
    this.timer?.remove();
    this.timer = null;
    this.revealing = false;
    this.setVisible(false);
  }

  /** Small pixel triangle rather than a glyph, so it can't depend on the font. */
  drawArrow() {
    this.arrowOn = !this.arrowOn;
    this.arrow.clear();
    if (!this.isOpen || this.revealing || !this.arrowOn) return;

    const x = PANEL_X + PANEL_W - 14;
    const y = PANEL_Y + PANEL_H - 12;
    this.arrow.fillStyle(hex('gold'), 1);
    this.arrow.fillRect(x, y, 7, 1);
    this.arrow.fillRect(x + 1, y + 1, 5, 1);
    this.arrow.fillRect(x + 2, y + 2, 3, 1);
    this.arrow.fillRect(x + 3, y + 3, 1, 1);
  }

  destroy() {
    this.timer?.remove();
    this.blink?.remove();
    this.g.destroy();
    this.nameG.destroy();
    this.arrow.destroy();
    this.nameText.destroy();
    this.body.destroy();
  }
}
