/**
 * The Signal Check: six claims, true or false, against a clock.
 *
 * The third challenge shape in the game, and deliberately the fastest. The
 * battles are considered recall; the Workshop drill is ordering; this one is
 * snap judgement, which is the right format for myth-busting. It also looks
 * nothing like either - one big claim card, two fat buttons, a draining timer.
 *
 * Runs as its own scene over a paused TownScene.
 */

import { pickSignals, SIGNAL_SECONDS, SIGNAL_EXP } from '../data/signals.js';
import { gameState } from '../systems/gameState.js';
import { drawPanel, drawBar, drawBackdrop, textStyle } from '../ui/theme.js';
import { hex } from '../data/palette.js';
import { VIEW_W, VIEW_H } from '../config.js';

const HEADER_H = 18;
const CARD = { x: 14, y: 38, w: VIEW_W - 28, h: 60 };
const BTN = { y: 102, h: 28, w: 128 };
const BTN_TRUE_X = 14;
const BTN_FALSE_X = VIEW_W - 14 - BTN.w;
const TIMER = { x: 14, y: 30, w: VIEW_W - 28, h: 6 };

const STATES = { ASKING: 'ASKING', FEEDBACK: 'FEEDBACK', DONE: 'DONE' };
const CONFIRM = new Set(['Space', 'Enter', 'NumpadEnter']);

export default class SignalScene extends Phaser.Scene {
  constructor() {
    super('Signal');
  }

  init() {
    this.claims = pickSignals();
    this.index = 0;
    this.correct = 0;
    this.state = STATES.ASKING;
    this.remaining = SIGNAL_SECONDS;
  }

  create() {
    this.buildBackdrop();
    this.buildHeader();
    this.buildCard();
    this.buildButtons();
    this.buildFooter();

    this.input.keyboard.on('keydown', this.onKeyDown, this);
    this.events.once('shutdown', () => this.input.keyboard.off('keydown', this.onKeyDown, this));

    this.cameras.main.fadeIn(180, 13, 15, 24);
    this.ask();
  }

  /* ---------------------------------------------------------------- */
  /* Construction                                                      */
  /* ---------------------------------------------------------------- */

  buildBackdrop() {
    const g = this.add.graphics().setDepth(0);
    drawBackdrop(g, VIEW_W, VIEW_H, { top: 'crystalDark', bottom: 'ink' });
    // Faint crystal seams, so it reads as underground.
    g.fillStyle(hex('crystal'), 0.07);
    for (let i = 0; i < 7; i++) {
      const x = 18 + i * 44;
      g.fillTriangle(x, VIEW_H, x + 10, VIEW_H - 26 - (i % 3) * 12, x + 20, VIEW_H);
    }
  }

  buildHeader() {
    const g = this.add.graphics().setDepth(1);
    g.fillStyle(hex('ink'), 0.9);
    g.fillRect(0, 0, VIEW_W, HEADER_H);
    g.fillStyle(hex('crystal'), 1);
    g.fillRect(0, HEADER_H - 1, VIEW_W, 1);

    this.add.text(8, 9, 'SIGNAL CHECK', textStyle({ size: 8, color: 'crystal', bold: true }))
      .setOrigin(0, 0.5).setDepth(2);
    this.counter = this.add
      .text(VIEW_W - 8, 9, '', textStyle({ size: 8, color: 'paper' }))
      .setOrigin(1, 0.5).setDepth(2);

    this.timerG = this.add.graphics().setDepth(2);
  }

  buildCard() {
    this.cardG = this.add.graphics().setDepth(1);
    this.claimText = this.add
      .text(CARD.x + CARD.w / 2, CARD.y + 21, '',
        textStyle({ size: 8, color: 'white', align: 'center', wrap: CARD.w - 20 }))
      .setOrigin(0.5, 0.5).setDepth(2);
    this.noteText = this.add
      .text(CARD.x + CARD.w / 2, CARD.y + 45, '',
        textStyle({ size: 8, color: 'mist', align: 'center', wrap: CARD.w - 20 }))
      .setOrigin(0.5, 0.5).setDepth(2);
  }

  buildButtons() {
    this.btnG = this.add.graphics().setDepth(1);
    this.buttons = [
      { verdict: true, x: BTN_TRUE_X, label: 'TRUE', hint: '1  or  <' },
      { verdict: false, x: BTN_FALSE_X, label: 'FALSE', hint: '2  or  >' },
    ];

    this.btnLabels = this.buttons.map((b) => {
      const label = this.add
        .text(b.x + BTN.w / 2, BTN.y + 11, b.label,
          textStyle({ size: 16, color: 'white', bold: true }))
        .setOrigin(0.5, 0.5).setDepth(2);
      this.add
        .text(b.x + BTN.w / 2, BTN.y + 22, b.hint, textStyle({ size: 8, color: 'slate' }))
        .setOrigin(0.5, 0.5).setDepth(2);

      this.add.rectangle(b.x, BTN.y, BTN.w, BTN.h)
        .setOrigin(0, 0)
        .setFillStyle(0x000000, 0)
        .setInteractive({ useHandCursor: true })
        .setDepth(3)
        .on('pointerdown', () => this.answer(b.verdict));

      return label;
    });
  }

  buildFooter() {
    this.footer = this.add
      .text(VIEW_W / 2, VIEW_H - 10, '', textStyle({ size: 8, color: 'mist', align: 'center' }))
      .setOrigin(0.5, 0.5).setDepth(2);
  }

  /* ---------------------------------------------------------------- */
  /* Flow                                                              */
  /* ---------------------------------------------------------------- */

  ask() {
    const claim = this.claims[this.index];
    this.state = STATES.ASKING;
    this.remaining = SIGNAL_SECONDS;
    this.chosen = null;

    this.counter.setText(`${this.index + 1} / ${this.claims.length}`);
    this.claimText.setText(claim.claim).setColor(css('white'));
    this.noteText.setText('');
    this.footer.setText('Call it: true or false.');
    this.redraw();

    this.ticker?.remove();
    this.ticker = this.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        if (this.state !== STATES.ASKING) return;
        this.remaining = Math.max(0, this.remaining - 0.1);
        this.redraw();
        if (this.remaining <= 0) this.answer(null);
      },
    });
  }

  /** @param {boolean|null} verdict null means the clock ran out */
  answer(verdict) {
    if (this.state !== STATES.ASKING) return;
    this.state = STATES.FEEDBACK;
    this.ticker?.remove();

    const claim = this.claims[this.index];
    const right = verdict !== null && verdict === claim.truth;
    if (right) this.correct += 1;
    this.chosen = verdict;
    this.wasRight = right;

    this.claimText.setColor(css(right ? 'correct' : 'wrong'));
    this.noteText.setText(claim.note);
    this.footer.setText(
      verdict === null ? 'Out of time. SPACE to carry on.' : 'SPACE to carry on.',
    );
    this.redraw();
    this.cameras.main.flash(140, right ? 60 : 200, right ? 200 : 70, right ? 130 : 90);
  }

  next() {
    this.index += 1;
    if (this.index >= this.claims.length) this.finish();
    else this.ask();
  }

  finish() {
    this.state = STATES.DONE;
    const sweep = this.correct === this.claims.length;
    const exp = this.correct * SIGNAL_EXP.perCorrect + (sweep ? SIGNAL_EXP.sweep : 0);

    this.expGained = exp;
    this.levelsGained = exp > 0 ? gameState.addExp(exp) : [];

    this.counter.setText(`${this.correct} / ${this.claims.length}`);
    this.claimText
      .setColor(css(sweep ? 'correct' : 'white'))
      .setText(sweep ? 'CLEAN SWEEP' : `${this.correct} of ${this.claims.length} called right`);
    this.noteText.setText(sweep
      ? 'Nothing got past you.'
      : 'The ones you missed are the ones worth remembering.');
    this.footer.setText(exp > 0 ? `+${exp} EXP    SPACE to leave` : 'SPACE to leave');
    this.redraw();
  }

  onKeyDown(event) {
    if (this.state === STATES.ASKING) {
      if (event.code === 'Digit1' || event.code === 'ArrowLeft') this.answer(true);
      else if (event.code === 'Digit2' || event.code === 'ArrowRight') this.answer(false);
      return;
    }
    if (!CONFIRM.has(event.code) && event.code !== 'Escape') return;
    event.preventDefault?.();
    if (this.state === STATES.FEEDBACK) this.next();
    else this.close();
  }

  /* ---------------------------------------------------------------- */
  /* Drawing                                                           */
  /* ---------------------------------------------------------------- */

  redraw() {
    const claim = this.claims[this.index];

    // Timer: only meaningful while a claim is live.
    this.timerG.clear();
    if (this.state === STATES.ASKING) {
      const ratio = this.remaining / SIGNAL_SECONDS;
      drawBar(this.timerG, TIMER.x, TIMER.y, TIMER.w, TIMER.h, ratio,
        ratio > 0.5 ? 'crystal' : (ratio > 0.25 ? 'gold' : 'wrong'));
    }

    let border = 'crystal';
    if (this.state === STATES.FEEDBACK) border = this.wasRight ? 'correct' : 'wrong';
    if (this.state === STATES.DONE) border = 'gold';

    this.cardG.clear();
    drawPanel(this.cardG, CARD.x, CARD.y, CARD.w, CARD.h, { fill: 'shadow', border });

    this.btnG.clear();
    if (this.state === STATES.DONE) {
      this.btnLabels.forEach((l) => l.setVisible(false));
      return;
    }

    this.buttons.forEach((b, i) => {
      let fill = 'slateDark';
      let edge = b.verdict ? 'correct' : 'wrong';
      let textColour = 'white';

      if (this.state === STATES.FEEDBACK) {
        const isTruth = claim.truth === b.verdict;
        const isPick = this.chosen === b.verdict;
        fill = isTruth ? 'correct' : (isPick ? 'wrong' : 'shadow');
        edge = isTruth ? 'white' : (isPick ? 'white' : 'slate');
        textColour = isTruth || isPick ? 'ink' : 'slate';
      }

      drawPanel(this.btnG, b.x, BTN.y, BTN.w, BTN.h, { fill, border: edge });
      this.btnLabels[i].setVisible(true).setColor(css(textColour));
    });
  }

  close() {
    this.cameras.main.fadeOut(160, 13, 15, 24);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.resume('Town', {
        sequence: true,
        expGained: this.expGained ?? 0,
        levelsGained: this.levelsGained ?? [],
      });
      this.scene.stop();
    });
  }
}

function css(key) {
  return `#${hex(key).toString(16).padStart(6, '0')}`;
}
