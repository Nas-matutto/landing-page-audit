/**
 * The menu behind the hamburger button.
 *
 * Holds saving, the (not yet built) settings, and the only restart in the
 * game. Nothing restarts on its own anywhere: a finished run stays on screen
 * until the player deliberately chooses what happens next.
 *
 * The rows are data, not fixed slots, so adding an option is one entry in
 * `options` - which is what the settings panel will be when it exists.
 *
 * Launched over whichever scene called it, which it pauses and resumes.
 */

import { drawPanel, textStyle } from '../ui/theme.js';
import { hex } from '../data/palette.js';
import { gameState } from '../systems/gameState.js';
import { saveGame, clearSave } from '../systems/save.js';
import { BRAND } from '../data/brand.js';
import { VIEW_W, VIEW_H } from '../config.js';

const W = 200;
const ROW_H = 18;
const ROW_GAP = 4;
const HEADER_H = 26;
// Two lines' worth: the hint and the save notice both wrap at this width, and
// a footer sized for one line pushes the second past the panel border.
const FOOTER_H = 36;
/** Enough rows for the longest menu, so the panel never has to resize. */
const MAX_ROWS = 4;
const H = HEADER_H + MAX_ROWS * (ROW_H + ROW_GAP) + FOOTER_H;
const X = Math.floor((VIEW_W - W) / 2);
const Y = Math.floor((VIEW_H - H) / 2);

export default class SettingsScene extends Phaser.Scene {
  constructor() {
    super('Settings');
  }

  init(data) {
    /** Which scene to resume when this closes. */
    this.caller = data?.caller ?? 'Town';
    this.confirmingRestart = false;
    this.selected = 0;
    /** Transient line shown under the rows after an action. */
    this.notice = '';
  }

  create() {
    const dim = this.add.graphics().setDepth(0);
    dim.fillStyle(hex('ink'), 0.8);
    dim.fillRect(0, 0, VIEW_W, VIEW_H);

    this.panel = this.add.graphics().setDepth(1);
    this.heading = this.add.text(VIEW_W / 2, Y + 13, 'MENU',
      textStyle({ size: 8, color: 'gold', bold: true }))
      .setOrigin(0.5, 0.5).setDepth(3);

    this.rows = [];
    this.buildRows();

    // Wrapped and centred inside the panel: an unwrapped hint runs straight
    // out past the border at this width.
    this.hint = this.add
      .text(VIEW_W / 2, Y + H - 28, '',
        textStyle({ size: 8, color: 'slate', align: 'center', wrap: W - 24 }))
      .setOrigin(0.5, 0).setDepth(3);

    this.add
      .text(VIEW_W / 2, VIEW_H - 8, `${BRAND.name}  -  ${BRAND.handle}`,
        textStyle({ size: 8, color: 'slateDark' }))
      .setOrigin(0.5, 0.5).setDepth(3);

    this.redraw();

    this.input.keyboard.on('keydown', this.onKeyDown, this);
    this.events.once('shutdown', () => this.input.keyboard.off('keydown', this.onKeyDown, this));
  }

  /**
   * `tone` is only ever 'wrong' for the destructive confirmation; `disabled`
   * rows are shown so the menu says what is coming rather than hiding it.
   */
  get options() {
    if (this.confirmingRestart) {
      return [
        { id: 'confirm', label: 'YES, RESTART', tone: 'wrong' },
        { id: 'cancel', label: 'NO, GO BACK' },
      ];
    }
    return [
      { id: 'save', label: 'SAVE GAME' },
      { id: 'settings', label: 'SETTINGS', disabled: true },
      { id: 'restart', label: 'RESTART GAME' },
      { id: 'close', label: 'CLOSE' },
    ];
  }

  buildRows() {
    for (let i = 0; i < MAX_ROWS; i++) {
      const y = this.rowY(i);
      const text = this.add
        .text(VIEW_W / 2, y + ROW_H / 2, '', textStyle({ size: 8, color: 'paper', bold: true }))
        .setOrigin(0.5, 0.5).setDepth(3);

      const zone = this.add.rectangle(X + 12, y, W - 24, ROW_H)
        .setOrigin(0, 0)
        .setFillStyle(0x000000, 0)
        .setInteractive({ useHandCursor: true })
        .setDepth(4)
        .on('pointerover', () => { this.moveTo(i); })
        .on('pointerdown', () => this.activate(i));

      this.rows.push({ text, zone });
    }
  }

  rowY(index) {
    return Y + HEADER_H + index * (ROW_H + ROW_GAP);
  }

  /** Hover and arrow keys both land here, and both skip disabled rows. */
  moveTo(index) {
    if (this.options[index]?.disabled) return;
    this.selected = index;
    this.redraw();
  }

  /** Step the selection, passing over anything not selectable. */
  step(delta) {
    const opts = this.options;
    for (let i = 1; i <= opts.length; i++) {
      const next = (this.selected + delta * i + opts.length * i) % opts.length;
      if (!opts[next].disabled) {
        this.selected = next;
        this.redraw();
        return;
      }
    }
  }

  onKeyDown(event) {
    if (event.code === 'ArrowUp' || event.code === 'KeyW') {
      this.step(-1);
      return;
    }
    if (event.code === 'ArrowDown' || event.code === 'KeyS') {
      this.step(1);
      return;
    }
    if (event.code === 'Escape') {
      if (this.confirmingRestart) {
        this.confirmingRestart = false;
        this.selected = 0;
        this.redraw();
      } else this.close();
      return;
    }
    if (['Space', 'Enter', 'NumpadEnter'].includes(event.code)) {
      event.preventDefault?.();
      this.activate(this.selected);
    }
  }

  activate(index) {
    const option = this.options[index];
    if (!option || option.disabled) return;

    if (option.id === 'save') {
      // Ask the caller where the player is standing first, so the save puts
      // them back on the right tile rather than at the last map entrance.
      this.scene.get(this.caller)?.captureSpawn?.();
      this.notice = saveGame(gameState)
        ? 'Saved. Close the tab whenever you like.'
        : 'Could not save - this browser is blocking storage.';
      this.redraw();
      return;
    }
    if (option.id === 'restart') {
      this.confirmingRestart = true;
      this.selected = 1; // default to the safe choice
      this.notice = '';
      this.redraw();
      return;
    }
    if (option.id === 'cancel') {
      this.confirmingRestart = false;
      this.selected = 0;
      this.redraw();
      return;
    }
    if (option.id === 'confirm') {
      this.restart();
      return;
    }
    this.close();
  }

  restart() {
    gameState.reset();
    clearSave();
    // Stop whatever was underneath, so the fresh run starts from a clean slate.
    this.scene.stop(this.caller);
    this.scene.stop();
    this.scene.start('Title');
  }

  redraw() {
    this.panel.clear();
    drawPanel(this.panel, X, Y, W, H, { fill: 'shadow', border: 'gold' });

    this.heading.setText(this.confirmingRestart ? 'RESTART?' : 'MENU');

    const opts = this.options;
    this.rows.forEach((row, i) => {
      const option = opts[i];
      if (!option) {
        row.text.setVisible(false);
        row.zone.setVisible(false);
        return;
      }

      const y = this.rowY(i);
      const active = i === this.selected;
      const accent = option.tone === 'wrong' ? 'wrong' : 'gold';

      drawPanel(this.panel, X + 12, y, W - 24, ROW_H, {
        fill: active ? 'slateDark' : 'shadow',
        border: option.disabled ? 'slateDark' : (active ? accent : 'slate'),
        shadow: false,
      });

      let colour = 'mist';
      if (option.disabled) colour = 'slateDark';
      else if (active) colour = option.tone === 'wrong' ? 'wrong' : 'white';

      row.text
        .setText(option.disabled ? `${option.label}  (SOON)` : option.label)
        .setColor(css(colour))
        .setVisible(true);
      row.zone.setVisible(true);
    });

    let hint = 'Arrows and SPACE to choose. ESC closes.';
    if (this.confirmingRestart) hint = 'This wipes your badges, level and save.';
    else if (this.notice) hint = this.notice;
    this.hint.setText(hint);
  }

  close() {
    this.scene.resume(this.caller);
    this.scene.stop();
  }
}

function css(key) {
  return `#${hex(key).toString(16).padStart(6, '0')}`;
}
