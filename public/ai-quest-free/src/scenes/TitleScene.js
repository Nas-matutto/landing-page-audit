/**
 * Title card.
 *
 * Themed off the overworld rather than off a menu: the same grass, the same
 * wooden sign, the same warm gold accent. A dark screen with yellow type reads
 * as a different product from the game behind it.
 */

import { textStyle, drawPanel } from '../ui/theme.js';
import { hex, PALETTE } from '../data/palette.js';
import { saveSummary, loadGame, clearSave } from '../systems/save.js';
import { ACTOR_ROW } from '../data/tileIndex.js';
import { idleFrame } from '../systems/actors.js';
import { gameState } from '../systems/gameState.js';
import { BRAND } from '../data/brand.js';
import { VIEW_W, VIEW_H } from '../config.js';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.drawMeadow();
    this.drawSign();

    // The player character, idling on the grass.
    const hero = this.add.sprite(VIEW_W / 2, 116, 'actors', idleFrame(ACTOR_ROW.player, 'down'));
    hero.setScale(2);
    this.tweens.add({ targets: hero, y: 114, duration: 700, yoyo: true, repeat: -1 });

    this.buildMenu();

    this.add
      .text(VIEW_W / 2, 168, `by ${BRAND.name}`, textStyle({ size: 8, color: 'goldLight' }))
      .setOrigin(0.5, 0);
  }

  /**
   * One prompt normally; a Continue / New Game choice when there is a save.
   *
   * A saved run must never be lost to someone mashing space on the title, so
   * when a save exists Continue is what is selected by default and New Game
   * has to be chosen deliberately.
   */
  buildMenu() {
    this.saved = saveSummary();
    this.selected = 0;

    if (!this.saved) {
      this.prompt = this.add
        .text(VIEW_W / 2, 138, 'PRESS SPACE OR ENTER',
          textStyle({ size: 8, color: 'white', bold: true }))
        .setOrigin(0.5, 0);
      this.tweens.add({ targets: this.prompt, alpha: 0.3, duration: 620, yoyo: true, repeat: -1 });

      this.add
        .text(VIEW_W / 2, 154, 'Arrows / WASD to walk  -  SPACE to talk',
          textStyle({ size: 8, color: 'paper' }))
        .setOrigin(0.5, 0);

      this.input.keyboard.once('keydown', () => this.begin());
      this.input.once('pointerdown', () => this.begin());
      return;
    }

    this.options = [
      { id: 'continue', label: `CONTINUE  -  Lv ${this.saved.level}, ${this.saved.tokens}/5 badges` },
      { id: 'new', label: 'NEW GAME' },
    ];

    this.menuG = this.add.graphics().setDepth(3);
    this.rows = this.options.map((option, i) => {
      const y = 132 + i * 18;
      const label = this.add
        .text(VIEW_W / 2, y + 8, option.label, textStyle({ size: 8, color: 'white', bold: true }))
        .setOrigin(0.5, 0.5).setDepth(4);

      this.add.rectangle(48, y, VIEW_W - 96, 16)
        .setOrigin(0, 0)
        .setFillStyle(0x000000, 0)
        .setInteractive({ useHandCursor: true })
        .setDepth(5)
        .on('pointerover', () => { this.selected = i; this.drawMenu(); })
        .on('pointerdown', () => this.activate(i));

      return label;
    });

    this.drawMenu();
    this.input.keyboard.on('keydown', this.onKeyDown, this);
    this.events.once('shutdown', () => this.input.keyboard.off('keydown', this.onKeyDown, this));
  }

  drawMenu() {
    this.menuG.clear();
    this.options.forEach((option, i) => {
      const y = 132 + i * 18;
      const active = i === this.selected;
      drawPanel(this.menuG, 48, y, VIEW_W - 96, 16, {
        fill: active ? 'slateDark' : 'shadow',
        border: active ? 'gold' : 'slate',
        shadow: false,
      });
      this.rows[i].setColor(PALETTE[active ? 'goldLight' : 'mist']);
    });
  }

  onKeyDown(event) {
    if (['ArrowUp', 'KeyW', 'ArrowDown', 'KeyS'].includes(event.code)) {
      this.selected = (this.selected + 1) % this.options.length;
      this.drawMenu();
      return;
    }
    if (!['Space', 'Enter', 'NumpadEnter'].includes(event.code)) return;
    event.preventDefault?.();
    this.activate(this.selected);
  }

  activate(index) {
    if (this.options[index].id === 'continue') this.resume();
    else this.begin();
  }

  /** A sunlit meadow: sky, hills, then the grass the player is standing on. */
  drawMeadow() {
    const g = this.add.graphics().setDepth(0);

    g.fillStyle(hex('waterLight'), 1);
    g.fillRect(0, 0, VIEW_W, 46);
    g.fillStyle(hex('crystal'), 0.35);
    g.fillRect(0, 30, VIEW_W, 16);

    // Rolling hills behind the sign.
    g.fillStyle(hex('grassDark'), 1);
    g.fillEllipse(48, 62, 150, 46);
    g.fillEllipse(200, 58, 190, 44);
    g.fillEllipse(300, 64, 130, 40);

    // The meadow itself.
    g.fillStyle(hex('grass'), 1);
    g.fillRect(0, 60, VIEW_W, VIEW_H - 60);
    g.fillStyle(hex('grassLight'), 1);
    g.fillRect(0, 60, VIEW_W, 2);

    // Grass texture, thickening toward the bottom of the screen.
    g.fillStyle(hex('grassDark'), 0.55);
    for (let y = 66; y < VIEW_H; y += 6) {
      for (let x = (y * 13) % 14; x < VIEW_W; x += 14) g.fillRect(x, y, 2, 1);
    }
    g.fillStyle(hex('grassLight'), 0.5);
    for (let y = 70; y < VIEW_H; y += 10) {
      for (let x = (y * 7) % 22; x < VIEW_W; x += 22) g.fillRect(x, y, 3, 1);
    }

    // A short path stub under the player. It deliberately stops short of the
    // text: pale ground running behind pale type is unreadable.
    g.fillStyle(hex('path'), 1);
    g.fillRect(VIEW_W / 2 - 14, 118, 28, 18);
    g.fillStyle(hex('pathLight'), 0.6);
    g.fillRect(VIEW_W / 2 - 14, 118, 28, 2);

    // Shade across the lower meadow, so the instructions sit on something.
    g.fillStyle(hex('ink'), 0.34);
    g.fillRect(0, 134, VIEW_W, VIEW_H - 134);
    g.fillStyle(hex('ink'), 0.12);
    g.fillRect(0, 130, VIEW_W, 4);
  }

  /** The title on a wooden signboard, like the ones planted around the map. */
  drawSign() {
    const g = this.add.graphics().setDepth(1);
    const w = 232;
    const h = 46;
    const x = Math.floor((VIEW_W - w) / 2);
    const y = 22;

    // Posts.
    g.fillStyle(hex('wood'), 1);
    g.fillRect(x + 26, y + h - 4, 6, 26);
    g.fillRect(x + w - 32, y + h - 4, 6, 26);
    g.fillStyle(hex('ink'), 0.3);
    g.fillRect(x + 30, y + h - 4, 2, 26);

    // Board.
    g.fillStyle(hex('ink'), 0.35);
    g.fillRect(x + 3, y + 4, w, h);
    g.fillStyle(hex('ink'), 1);
    g.fillRect(x, y, w, h);
    g.fillStyle(hex('woodLight'), 1);
    g.fillRect(x + 2, y + 2, w - 4, h - 4);
    g.fillStyle(hex('wood'), 1);
    g.fillRect(x + 4, y + 4, w - 8, h - 8);
    g.fillStyle(hex('woodLight'), 0.5);
    g.fillRect(x + 4, y + 4, w - 8, 1);

    this.add
      .text(VIEW_W / 2, y + 17, 'AI QUEST',
        textStyle({ size: 24, color: 'goldLight', bold: true }))
      .setOrigin(0.5, 0.5).setDepth(2);

    this.add
      .text(VIEW_W / 2, y + 35, 'Every duel is a question.',
        textStyle({ size: 8, color: 'sand' }))
      .setOrigin(0.5, 0.5).setDepth(2);
  }

  begin() {
    // A fresh run, and a fresh save: starting over should not leave the old
    // one sitting there to be resumed by accident.
    gameState.reset();
    clearSave();
    this.leaveTo('Primer');
  }

  resume() {
    if (!loadGame(gameState)) {
      // The save turned out to be unusable. Say nothing clever, just start.
      this.begin();
      return;
    }
    this.leaveTo('Town');
  }

  leaveTo(sceneKey) {
    this.cameras.main.fadeOut(220, 13, 15, 24);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start(sceneKey));
  }
}
