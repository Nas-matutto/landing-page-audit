/**
 * Closing card: the badges earned, the run's numbers, and what comes next.
 *
 * Deliberately does NOT restart on a keypress. A finished run stays on screen
 * until the player deliberately chooses what happens next, so nobody loses
 * their result to a stray tap. There are two ways out and neither is automatic:
 * KEEP EXPLORING drops back into the world on the tile the run ended on, and
 * settings offers a restart.
 */

import { drawPanel, drawBackdrop, textStyle } from '../ui/theme.js';
import { drawBadge } from '../ui/badge.js';
import { tokenStyle, TOTAL_BADGES } from '../data/badges.js';
import { hex } from '../data/palette.js';
import { gameState } from '../systems/gameState.js';
import { saveGame } from '../systems/save.js';
import { REGIONS } from '../data/regions.js';
import { BRAND } from '../data/brand.js';
import SettingsButton from '../ui/settingsButton.js';
import { VIEW_W, VIEW_H } from '../config.js';

const RESUME_KEYS = new Set(['Space', 'Enter', 'NumpadEnter', 'KeyE']);

export default class EndingScene extends Phaser.Scene {
  constructor() {
    super('Ending');
  }

  create() {
    // Reaching the ending unlocks free play: from here on everyone in the
    // world will take a rematch, so the run carries on being playable.
    gameState.freePlay = true;
    saveGame(gameState);

    const g = this.add.graphics();
    drawBackdrop(g, VIEW_W, VIEW_H, { top: 'slateDark', bottom: 'ink' });

    // A run that cleared every hall is finished, and should say so rather than
    // promising a sixth that does not exist.
    const complete = gameState.tokens.length >= TOTAL_BADGES;
    this.add
      .text(VIEW_W / 2, 8, complete ? 'THE HORIZON' : 'TO BE CONTINUED',
        textStyle({ size: 16, color: 'gold', bold: true }))
      .setOrigin(0.5, 0);

    this.drawBadges();
    this.drawStats();
    this.drawNext();
    this.drawResumeButton();

    this.add
      .text(VIEW_W / 2, VIEW_H - 6, `${BRAND.name}  -  ${BRAND.handle}`,
        textStyle({ size: 8, color: 'slate' }))
      .setOrigin(0.5, 0.5);

    this.settingsButton = new SettingsButton(this, () => this.openSettings());
    this.events.once('shutdown', () => this.settingsButton?.destroy());

    this.input.keyboard.on('keydown', (e) => {
      if (e.code === 'Escape') this.openSettings();
      else if (RESUME_KEYS.has(e.code)) this.resume();
    });
  }

  /**
   * The way back into the world. A finished run is not a dead end: the player
   * keeps their level, their badges and their boat, and lands back on the tile
   * they walked out on.
   */
  drawResumeButton() {
    const w = 152;
    const h = 18;
    const x = Math.floor((VIEW_W - w) / 2);
    const y = 151;

    const g = this.add.graphics().setDepth(6);
    drawPanel(g, x, y, w, h, { fill: 'slateDark', border: 'gold' });

    this.add
      .text(VIEW_W / 2, y + h / 2, 'KEEP PLAYING  -  SPACE',
        textStyle({ size: 8, color: 'goldLight', bold: true }))
      .setOrigin(0.5, 0.5).setDepth(7);

    this.add.rectangle(x, y, w, h)
      .setOrigin(0, 0)
      .setFillStyle(0x000000, 0)
      .setInteractive({ useHandCursor: true })
      .setDepth(8)
      .on('pointerdown', () => this.resume());
  }

  resume() {
    if (this.scene.isPaused()) return;
    this.cameras.main.fadeOut(200, 13, 15, 24);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('Town'));
  }

  /** Every badge slot, earned ones filled and the rest shown as empty sockets. */
  drawBadges() {
    const earned = gameState.tokens;
    const g = this.add.graphics();
    const r = 13;
    const spacing = 34;
    const startX = VIEW_W / 2 - ((TOTAL_BADGES - 1) * spacing) / 2;
    const y = 46;

    for (let i = 0; i < TOTAL_BADGES; i++) {
      const token = earned[i];
      drawBadge(g, startX + i * spacing, y, r, {
        token,
        locked: !token,
        dim: !token,
      });
    }

    const names = earned.map((t) => tokenStyle(t).short).join('  ');
    this.add
      .text(VIEW_W / 2, 64, names || 'NO BADGES',
        textStyle({ color: 'goldLight', bold: true, align: 'center', wrap: VIEW_W - 16 }))
      .setOrigin(0.5, 0);
  }

  drawStats() {
    const accuracy = gameState.answered
      ? Math.round((gameState.correct / gameState.answered) * 100)
      : 0;

    const stats = [
      `Badges               ${gameState.tokens.length}/${TOTAL_BADGES}`,
      `Final level          ${gameState.level}`,
      `Questions answered   ${gameState.answered}`,
      `Correct              ${gameState.correct}  (${accuracy}%)`,
      `Time                 ${gameState.elapsed()}`,
    ].join('\n');

    const panel = this.add.graphics();
    drawPanel(panel, 58, 76, 204, 60, { fill: 'shadow' });
    this.add.text(66, 81, stats, textStyle({ color: 'paper' }));
  }

  drawNext() {
    const next = REGIONS.find((r) => r.locked);
    const line = next
      ? `NEXT: ${next.name}  -  ${next.theme}`
      : (gameState.tokens.length >= TOTAL_BADGES
        ? 'Every hall cleared. Everyone out there will take a rematch now.'
        : 'Halls still standing. Go back and finish them.');
    this.add
      .text(VIEW_W / 2, 138, line, textStyle({ color: 'mist' }))
      .setOrigin(0.5, 0);
  }

  openSettings() {
    if (this.scene.isPaused()) return;
    this.scene.launch('Settings', { caller: 'Ending' });
    this.scene.pause();
  }
}
