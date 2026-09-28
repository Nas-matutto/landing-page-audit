/**
 * The ordering drill: put four steps into the order they happen.
 *
 * This exists so the long stretches between gyms are not more multiple-choice
 * fights. It is a different question shape (sequence, not recall), a different
 * screen (no HP bars, no combatants), and a different input rhythm (tap four
 * things in order rather than pick one).
 *
 * It runs in two places, chosen by the `pool` passed in at launch: the branded
 * Workshop on the road north, and Skiff's ship's drill on the Open Strait,
 * which draws agent and tool process questions in sea colours.
 *
 * Runs as its own scene over a paused TownScene, like the battle.
 */

import { pickSequence, SEQUENCE_EXP } from '../data/sequences.js';
import { BRAND, WORKSHOP } from '../data/brand.js';
import { gameState } from '../systems/gameState.js';
import { drawPanel, drawBackdrop, textStyle } from '../ui/theme.js';
import { hex } from '../data/palette.js';
import { VIEW_W, VIEW_H } from '../config.js';

const ROW_X = 10;
const ROW_W = VIEW_W - 20;
const ROW_H = 20;
const ROW_GAP = 4;
const FIRST_ROW_Y = 50;
const HEADER_H = 18;

/**
 * How each non-branded pool dresses the screen. The Workshop takes its colours
 * from brand.js instead, so it is not listed here.
 */
const POOL_THEMES = {
  sea: { accent: 'waterLight', accentDark: 'waterDark', heading: "SHIP'S DRILL" },
  sky: { accent: 'halo', accentDark: 'skyDeep', heading: "WAYFINDER'S DRILL" },
};

const STATES = { PICKING: 'PICKING', DONE: 'DONE' };
const CONFIRM = new Set(['Space', 'Enter', 'NumpadEnter', 'KeyE']);
const NUMBERS = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3 };

export default class SequenceScene extends Phaser.Scene {
  constructor() {
    super('Sequence');
  }

  init(data) {
    // The same mechanic runs in two places, so the pool decides both which
    // drills can come up and what the screen looks like: brand colours and the
    // brand mark on the road north, sea colours out on the water.
    this.pool = data?.pool ?? 'workshop';
    this.branded = this.pool === 'workshop';
    const theme = POOL_THEMES[this.pool] ?? POOL_THEMES.sea;
    this.accent = this.branded ? BRAND.accent : theme.accent;
    this.accentDark = this.branded ? BRAND.accentDark : theme.accentDark;
    this.heading = this.branded ? WORKSHOP.name.toUpperCase() : theme.heading;

    this.drill = pickSequence(gameState.usedSequences, this.pool);
    // Present the steps shuffled; `order` holds the correct index per row.
    this.rows = this.drill.steps
      .map((text, correctIndex) => ({ text, correctIndex }))
      .sort(() => Math.random() - 0.5);
    this.picks = [];
    this.state = STATES.PICKING;
  }

  create() {
    gameState.usedSequences.add(this.drill.id);

    this.buildBackdrop();
    this.buildHeader();
    this.buildPrompt();
    this.buildRows();
    this.buildFooter();
    this.redraw();

    this.input.keyboard.on('keydown', this.onKeyDown, this);
    this.events.once('shutdown', () => this.input.keyboard.off('keydown', this.onKeyDown, this));

    this.cameras.main.fadeIn(180, 13, 15, 24);
  }

  /* ---------------------------------------------------------------- */
  /* Chrome                                                            */
  /* ---------------------------------------------------------------- */

  buildBackdrop() {
    const g = this.add.graphics().setDepth(0);
    drawBackdrop(g, VIEW_W, VIEW_H, { top: this.accentDark, bottom: 'ink' });
    // A faint grid, so the workshop reads as a workbench rather than a battle.
    g.fillStyle(hex(this.accent), 0.06);
    for (let x = 0; x < VIEW_W; x += 8) g.fillRect(x, HEADER_H, 1, VIEW_H - HEADER_H);
    for (let y = HEADER_H; y < VIEW_H; y += 8) g.fillRect(0, y, VIEW_W, 1);
  }

  buildHeader() {
    const g = this.add.graphics().setDepth(1);
    g.fillStyle(hex('ink'), 0.9);
    g.fillRect(0, 0, VIEW_W, HEADER_H);
    g.fillStyle(hex(this.accent), 1);
    g.fillRect(0, HEADER_H - 1, VIEW_W, 1);

    // A small square mark: the brand's initial on the road north, a ship's
    // wheel out on the water.
    g.fillStyle(hex(this.accent), 1);
    g.fillRect(6, 4, 11, 11);
    g.fillStyle(hex('ink'), 1);
    g.fillRect(8, 6, 7, 7);

    if (this.branded) {
      this.add.text(9, 9, BRAND.short.slice(0, 1),
        textStyle({ size: 8, color: this.accent, bold: true }))
        .setOrigin(0.5, 0.5).setDepth(2);
    } else {
      g.fillStyle(hex(this.accent), 1);
      g.fillRect(11, 6, 1, 7);
      g.fillRect(8, 9, 7, 1);
      g.fillRect(9, 7, 1, 1); g.fillRect(13, 7, 1, 1);
      g.fillRect(9, 11, 1, 1); g.fillRect(13, 11, 1, 1);
    }

    this.add.text(22, 9, this.heading,
      textStyle({ size: 8, color: 'white', bold: true }))
      .setOrigin(0, 0.5).setDepth(2);

    this.add.text(VIEW_W - 6, 9, 'ORDER THE STEPS',
      textStyle({ size: 8, color: this.accent, bold: true }))
      .setOrigin(1, 0.5).setDepth(2);
  }

  buildPrompt() {
    const g = this.add.graphics().setDepth(1);
    drawPanel(g, ROW_X, 24, ROW_W, 20, { fill: 'shadow', border: 'slate' });
    this.add.text(ROW_X + 8, 34, this.drill.prompt,
      textStyle({ size: 8, color: 'paper' }))
      .setOrigin(0, 0.5).setDepth(2);
  }

  buildRows() {
    this.rowG = this.add.graphics().setDepth(1);
    this.rowTexts = [];
    this.rowBadges = [];
    this.trueLabels = [];

    this.rows.forEach((row, i) => {
      const y = FIRST_ROW_Y + i * (ROW_H + ROW_GAP);

      this.rowBadges.push(
        this.add.text(ROW_X + 14, y + ROW_H / 2, '',
          textStyle({ size: 8, color: 'ink', bold: true }))
          .setOrigin(0.5, 0.5).setDepth(3),
      );
      this.rowTexts.push(
        this.add.text(ROW_X + 30, y + ROW_H / 2, row.text,
          textStyle({ size: 8, color: 'paper' }))
          .setOrigin(0, 0.5).setDepth(3),
      );
      // Hidden until graded, then reveals where this step actually belonged.
      this.trueLabels.push(
        this.add.text(ROW_X + ROW_W - 15, y + ROW_H / 2, String(row.correctIndex + 1),
          textStyle({ size: 8, color: 'gold', bold: true }))
          .setOrigin(0.5, 0.5).setDepth(4).setVisible(false),
      );

      this.add.rectangle(ROW_X, y, ROW_W, ROW_H)
        .setOrigin(0, 0)
        .setFillStyle(0x000000, 0)
        .setInteractive({ useHandCursor: true })
        .setDepth(4)
        .on('pointerdown', () => this.pick(i));
    });
  }

  buildFooter() {
    this.footerG = this.add.graphics().setDepth(1);
    this.footerText = this.add
      .text(ROW_X + 8, VIEW_H - 16, '',
        textStyle({ size: 8, color: 'mist', wrap: ROW_W - 116 }))
      .setOrigin(0, 0.5).setDepth(2);
    this.progressText = this.add
      .text(VIEW_W - ROW_X - 8, VIEW_H - 16, '', textStyle({ size: 8, color: this.accent, bold: true }))
      .setOrigin(1, 0.5).setDepth(2);
  }

  /* ---------------------------------------------------------------- */
  /* Interaction                                                       */
  /* ---------------------------------------------------------------- */

  onKeyDown(event) {
    if (this.state === STATES.DONE) {
      if (CONFIRM.has(event.code)) this.close();
      return;
    }
    const n = NUMBERS[event.code];
    if (n !== undefined) this.pick(n);
    if (event.code === 'Backspace') this.reset();
  }

  pick(index) {
    if (this.state !== STATES.PICKING) return;
    if (this.picks.includes(index)) return;

    this.picks.push(index);
    this.redraw();

    if (this.picks.length === this.rows.length) {
      this.time.delayedCall(280, () => this.grade());
    }
  }

  reset() {
    this.picks = [];
    this.redraw();
  }

  grade() {
    this.state = STATES.DONE;

    // A pick is right if the step chosen Nth really is the Nth step.
    const correct = this.picks.filter(
      (rowIndex, position) => this.rows[rowIndex].correctIndex === position,
    ).length;
    const perfect = correct === this.rows.length;

    const exp = perfect ? SEQUENCE_EXP.perfect : (correct >= 2 ? SEQUENCE_EXP.partial : 0);
    this.levelsGained = exp > 0 ? gameState.addExp(exp) : [];
    this.expGained = exp;
    this.perfect = perfect;

    this.redraw();
    this.cameras.main.flash(200, perfect ? 120 : 60, perfect ? 220 : 70, 160);
  }

  /* ---------------------------------------------------------------- */
  /* Drawing                                                           */
  /* ---------------------------------------------------------------- */

  redraw() {
    this.rowG.clear();

    this.rows.forEach((row, i) => {
      const y = FIRST_ROW_Y + i * (ROW_H + ROW_GAP);
      const position = this.picks.indexOf(i);
      const chosen = position >= 0;

      let fill = 'shadow';
      let border = 'slate';
      let badgeFill = 'slateDark';
      let badgeText = '';
      let textColour = 'paper';

      if (chosen) {
        badgeText = String(position + 1);
        fill = 'slateDark';
        border = this.accent;
        badgeFill = this.accent;
      }

      if (this.state === STATES.DONE && chosen) {
        const right = row.correctIndex === position;
        border = right ? 'correct' : 'wrong';
        badgeFill = right ? 'correct' : 'wrong';
        fill = 'shadow';
        textColour = right ? 'white' : 'mist';
      }

      drawPanel(this.rowG, ROW_X, y, ROW_W, ROW_H, { fill, border });

      // Order badge on the left of the row.
      this.rowG.fillStyle(hex('ink'), 1);
      this.rowG.fillCircle(ROW_X + 14, y + ROW_H / 2, 7);
      this.rowG.fillStyle(hex(badgeFill), 1);
      this.rowG.fillCircle(ROW_X + 14, y + ROW_H / 2, 6);

      this.rowBadges[i].setText(badgeText).setColor(css(chosen ? 'ink' : 'slate'));
      if (!chosen) this.rowBadges[i].setText('-');
      this.rowTexts[i].setColor(css(textColour));

      // Once graded, reveal where each step actually belonged.
      this.trueLabels[i].setVisible(this.state === STATES.DONE);
    });

    this.drawFooter();
  }

  drawFooter() {
    this.footerG.clear();

    if (this.state === STATES.PICKING) {
      this.footerText.setText('Tap them in order. BACKSPACE to start over.').setColor(css('mist'));
      this.progressText.setText(`${this.picks.length} / ${this.rows.length}`);
      return;
    }

    drawPanel(this.footerG, ROW_X, VIEW_H - 30, ROW_W, 26, {
      fill: 'shadow',
      border: this.perfect ? 'correct' : 'gold',
    });
    this.footerText
      .setText(this.perfect ? this.drill.explain : 'Gold numbers show the real order.')
      .setColor(css(this.perfect ? 'paper' : 'mist'))
      .setPosition(ROW_X + 8, VIEW_H - 17);
    this.progressText
      .setText(this.expGained > 0 ? `+${this.expGained} EXP   SPACE` : 'SPACE')
      .setColor(css(this.expGained > 0 ? 'correct' : 'mist'))
      .setPosition(VIEW_W - ROW_X - 8, VIEW_H - 17);

  }

  close() {
    this.cameras.main.fadeOut(160, 13, 15, 24);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.resume('Town', {
        sequence: true,
        perfect: this.perfect,
        expGained: this.expGained,
        levelsGained: this.levelsGained ?? [],
      });
      this.scene.stop();
    });
  }
}

/** Palette key -> css string, for Text.setColor. */
function css(key) {
  return `#${hex(key).toString(16).padStart(6, '0')}`;
}
