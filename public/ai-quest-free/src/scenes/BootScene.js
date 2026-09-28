/**
 * Loads the two spritesheets, waits for the pixel font, and registers every
 * walk animation once so the other scenes never have to.
 */

import { TILE_SIZE, ACTOR_SIZE, ACTOR_ROW, DIRS, actorFrame } from '../data/tileIndex.js';
import { validateQuestions } from '../data/questions.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.spritesheet('tiles', 'assets/tiles.png', {
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
    });
    this.load.spritesheet('actors', 'assets/actors.png', {
      frameWidth: ACTOR_SIZE,
      frameHeight: ACTOR_SIZE,
    });
  }

  async create() {
    this.registerWalkAnimations();

    // Dev-time content check: catches question text that will overflow the
    // battle panel the moment a question is added, rather than on screen.
    validateQuestions();

    await this.waitForFont();

    document.getElementById('boot')?.classList.add('hidden');
    this.scene.start('Title');
  }

  registerWalkAnimations() {
    // Frames per direction are [step, neutral, step], so the classic 4-beat
    // cycle is 0-1-2-1. Frame 1 doubles as the standing pose.
    const CYCLE = [0, 1, 2, 1];

    for (const [id, row] of Object.entries(ACTOR_ROW)) {
      for (const dir of DIRS) {
        this.anims.create({
          key: `${id}-${dir}`,
          frames: CYCLE.map((f) => ({ key: 'actors', frame: actorFrame(row, dir, f) })),
          frameRate: 8,
          repeat: -1,
        });
      }
    }
  }

  /**
   * Force the woff2 to fetch and finish before any text renders, otherwise the
   * first frame of every scene draws in a fallback face and then reflows.
   */
  async waitForFont() {
    if (!document.fonts) return;
    try {
      await Promise.all([
        document.fonts.load('400 16px Silkscreen'),
        document.fonts.load('700 16px Silkscreen'),
      ]);
      await document.fonts.ready;
    } catch (err) {
      // A missing font should degrade to the fallback, not block the game.
      console.warn('Pixel font failed to load; falling back to monospace.', err);
    }
  }
}
