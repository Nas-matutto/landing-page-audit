/**
 * The opening primer: three cards explaining the loop before the player is
 * dropped into it.
 *
 * Deliberately three cards rather than one wall of text, and deliberately
 * before the town rather than inside it - the first thing a new player needs is
 * "what am I supposed to do", and a dialogue box in the corner of a map they
 * are already free to wander is the wrong place to answer it.
 *
 * Shown once per run. Continuing a saved game skips it.
 */

import { drawPanel, drawBackdrop, textStyle } from '../ui/theme.js';
import { drawBadge } from '../ui/badge.js';
import { hex } from '../data/palette.js';
import { gameState } from '../systems/gameState.js';
import { VIEW_W, VIEW_H } from '../config.js';

const CARD = { w: 240, h: 100, y: 30 };
const CARD_X = Math.floor((VIEW_W - CARD.w) / 2);

const NEXT_KEYS = new Set(['Space', 'Enter', 'NumpadEnter', 'KeyE', 'ArrowRight', 'KeyD']);
const BACK_KEYS = new Set(['ArrowLeft', 'KeyA', 'Backspace']);

/**
 * `art` names the small drawing above each line, so the cards are not three
 * identical boxes of text.
 */
const CARDS = [
  {
    art: 'people',
    title: 'TALK TO PEOPLE',
    body: 'Everyone you meet will test what you know about AI. Stand facing them and press SPACE to take them on.',
  },
  {
    art: 'door',
    title: 'PROVE IT, AND DOORS OPEN',
    body: 'Beating the people outside a hall unlocks its doors. Inside waits its Leader - and the badge they are holding.',
  },
  {
    art: 'badge',
    title: 'BADGES OPEN THE MAP',
    body: 'Every badge you win opens the road to a new region. Five badges, five regions, one long road.',
  },
];

export default class PrimerScene extends Phaser.Scene {
  constructor() {
    super('Primer');
  }

  create() {
    this.index = 0;

    const bg = this.add.graphics().setDepth(0);
    drawBackdrop(bg, VIEW_W, VIEW_H, { top: 'grassDark', bottom: 'ink' });

    this.add
      .text(VIEW_W / 2, 14, 'HOW THIS WORKS', textStyle({ size: 8, color: 'gold', bold: true }))
      .setOrigin(0.5, 0.5).setDepth(2);

    this.panel = this.add.graphics().setDepth(1);
    this.art = this.add.graphics().setDepth(2);

    this.title = this.add
      .text(VIEW_W / 2, CARD.y + 46, '', textStyle({ size: 8, color: 'goldLight', bold: true }))
      .setOrigin(0.5, 0.5).setDepth(3);

    this.body = this.add
      .text(VIEW_W / 2, CARD.y + 72, '',
        textStyle({ size: 8, color: 'paper', align: 'center', wrap: CARD.w - 24 }))
      .setOrigin(0.5, 0.5).setDepth(3);

    this.dots = this.add.graphics().setDepth(2);

    this.hint = this.add
      .text(VIEW_W / 2, VIEW_H - 22, '', textStyle({ size: 8, color: 'mist' }))
      .setOrigin(0.5, 0.5).setDepth(3);

    // Skipping is always available. Somebody replaying for the fifth time
    // should not have to read this again.
    this.skip = this.add
      .text(VIEW_W - 8, VIEW_H - 8, 'ESC  SKIP', textStyle({ size: 8, color: 'slate' }))
      .setOrigin(1, 0.5).setDepth(3);

    this.add.rectangle(0, 0, VIEW_W, VIEW_H)
      .setOrigin(0, 0)
      .setFillStyle(0x000000, 0)
      .setInteractive({ useHandCursor: true })
      .setDepth(5)
      .on('pointerdown', () => this.next());

    this.input.keyboard.on('keydown', this.onKeyDown, this);
    this.events.once('shutdown', () => this.input.keyboard.off('keydown', this.onKeyDown, this));

    this.cameras.main.fadeIn(200, 13, 15, 24);
    this.render();
  }

  onKeyDown(event) {
    if (event.code === 'Escape') {
      this.finish();
      return;
    }
    if (BACK_KEYS.has(event.code)) {
      this.index = Math.max(0, this.index - 1);
      this.render();
      return;
    }
    if (!NEXT_KEYS.has(event.code)) return;
    event.preventDefault?.();
    this.next();
  }

  next() {
    if (this.index >= CARDS.length - 1) {
      this.finish();
      return;
    }
    this.index += 1;
    this.render();
  }

  render() {
    const card = CARDS[this.index];
    const last = this.index === CARDS.length - 1;

    this.panel.clear();
    drawPanel(this.panel, CARD_X, CARD.y, CARD.w, CARD.h, { fill: 'shadow', border: 'gold' });

    this.art.clear();
    this.drawArt(card.art, VIEW_W / 2, CARD.y + 22);

    this.title.setText(card.title);
    this.body.setText(card.body);
    this.hint.setText(last ? 'SPACE to begin' : 'SPACE for the next one');

    // Progress dots, so three cards read as three cards.
    this.dots.clear();
    const spacing = 10;
    const startX = VIEW_W / 2 - ((CARDS.length - 1) * spacing) / 2;
    for (let i = 0; i < CARDS.length; i++) {
      const on = i === this.index;
      this.dots.fillStyle(hex(on ? 'goldLight' : 'slateDark'), 1);
      this.dots.fillRect(startX + i * spacing - (on ? 3 : 2), VIEW_H - 36, on ? 6 : 4, 3);
    }

    // A small pop each time, so advancing feels like turning a card over.
    for (const item of [this.title, this.body]) {
      item.setAlpha(0);
      this.tweens.add({ targets: item, alpha: 1, duration: 160 });
    }
  }

  /** One small illustration per card, drawn rather than spelled out. */
  drawArt(kind, cx, cy) {
    const g = this.art;

    if (kind === 'people') {
      // Two figures turned toward each other, with a question between them.
      for (const [dx, accent, look] of [[-17, 'teal', 1], [17, 'orange', -1]]) {
        const x = cx + dx;
        g.fillStyle(hex('ink'), 1);
        g.fillRect(x - 7, cy - 12, 14, 24);
        g.fillStyle(hex('hair'), 1);
        g.fillRect(x - 5, cy - 10, 10, 4);
        g.fillStyle(hex('skin'), 1);
        g.fillRect(x - 5, cy - 7, 10, 6);
        g.fillStyle(hex('ink'), 1);
        g.fillRect(x + look * 2, cy - 5, 2, 2);
        g.fillStyle(hex(accent), 1);
        g.fillRect(x - 6, cy - 1, 12, 8);
        g.fillStyle(hex('navy'), 1);
        g.fillRect(x - 6, cy + 7, 12, 5);
      }
      // A question mark hanging in the gap.
      g.fillStyle(hex('goldLight'), 1);
      g.fillRect(cx - 3, cy - 9, 6, 2);
      g.fillRect(cx + 2, cy - 7, 2, 3);
      g.fillRect(cx - 1, cy - 4, 3, 3);
      g.fillRect(cx - 1, cy + 1, 3, 3);
      return;
    }

    if (kind === 'door') {
      // The gym door, opening: two leaves and a widening band of light.
      g.fillStyle(hex('gymRoofDark'), 1);
      g.fillRect(cx - 22, cy - 12, 44, 24);
      g.fillStyle(hex('halo'), 1);
      g.fillRect(cx - 7, cy - 10, 14, 22);
      g.fillStyle(hex('white'), 1);
      g.fillRect(cx - 4, cy - 10, 8, 22);
      g.fillStyle(hex('wood'), 1);
      g.fillRect(cx - 20, cy - 10, 12, 22);
      g.fillRect(cx + 8, cy - 10, 12, 22);
      g.fillStyle(hex('gold'), 1);
      g.fillRect(cx - 20, cy - 10, 12, 2);
      g.fillRect(cx + 8, cy - 10, 12, 2);
      g.fillStyle(hex('goldLight'), 1);
      g.fillRect(cx - 10, cy, 2, 2);
      g.fillRect(cx + 8, cy, 2, 2);
      return;
    }

    // A badge, drawn with the real routine so it is the thing they will win.
    drawBadge(g, cx, cy, 12, { token: 'Vector Token' });
  }

  finish() {
    gameState.seenPrimer = true;
    this.cameras.main.fadeOut(200, 13, 15, 24);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('Town'));
  }
}
