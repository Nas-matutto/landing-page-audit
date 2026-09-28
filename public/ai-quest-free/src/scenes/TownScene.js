/**
 * The overworld: tilemap rendering, grid-locked movement, NPCs, signs, warps.
 *
 * Both maps (the town and the Hall interior) run through this one scene via
 * loadMap(), so there is no second copy of the movement and interaction code.
 *
 * Movement is grid-locked and tween-driven rather than physics-driven. That is
 * what produces the crisp classic feel, and it makes collision a lookup rather
 * than a solver - no tunnelling, no sub-pixel drift, no Arcade Physics at all.
 */

import { getMap } from '../data/maps.js';
import { BLOCKED, SAILABLE } from '../data/tiles.js';
import { ACTOR_ROW, T } from '../data/tileIndex.js';
import { DELTA, OPPOSITE, idleFrame } from '../systems/actors.js';
import { gameState, HP_PER_LEVEL } from '../systems/gameState.js';
import {
  VALLEY_CHALLENGERS, TOTAL_TOKENS, TOTAL_SIGILS, GATES, npcsOnMap, npcById,
  INTRO_LINES, CRYSTAL_LINES, BOAT_LINES, UPDRAFT_LINES, DRIFT_LINES,
  REMATCH_LINES, CLOUD_REWARD_LINES, sigilLines,
} from '../data/npcs.js';
import { saveGame } from '../systems/save.js';
import { heldDirection } from '../systems/touchInput.js';
import DialoguePanel from '../ui/panel.js';
import LevelUpPopup from '../ui/levelUpPopup.js';
import BadgePopup from '../ui/badgePopup.js';
import SettingsButton from '../ui/settingsButton.js';
import { drawPanel, drawBar, textStyle } from '../ui/theme.js';
import { VIEW_W, VIEW_H, TILE, STEP_MS } from '../config.js';

const TURN_LOCK_MS = 130;
const FADE_MS = 180;
// The mobile hero frame crops a modest strip off the left/right (Scale.
// ENVELOP, see main.js) rather than letterboxing, so anything anchored to
// the true edge would run off-screen there. 22px clears that crop with
// margin to spare - see SettingsButton.js for the matching top-right inset.
const HUD_X = 22;
const HUD_Y = 4;
const HUD_W = 104;
const HUD_H = 26;
const CHALLENGER_COUNT = VALLEY_CHALLENGERS.length;

export default class TownScene extends Phaser.Scene {
  constructor() {
    super('Town');
  }

  create() {
    this.mode = 'explore'; // explore | dialogue | battle | transition
    this.warpGuard = null;
    this.turnLockUntil = 0;
    this.heldDirs = [];
    this.npcs = [];
    this.boulders = [];
    this.lastSolid = null;
    this.layers = [];
    this.tilemap = null;
    this.player = null;

    this.cameras.main.setBackgroundColor(0x0d0f18);

    this.keys = this.input.keyboard.addKeys({
      up: 'UP', down: 'DOWN', left: 'LEFT', right: 'RIGHT',
      w: 'W', a: 'A', s: 'S', d: 'D',
    });

    this.dialogue = new DialoguePanel(this);
    this.levelUp = new LevelUpPopup(this);
    this.badgePopup = new BadgePopup(this);
    this.buildHud();

    this.settingsButton = new SettingsButton(this, () => this.openSettings());

    // Registered once, in create, so repeated battles cannot stack listeners.
    this.input.keyboard.on('keydown', this.onKeyDown, this);
    this.input.keyboard.on('keyup', this.onKeyUp, this);
    this.input.on('pointerdown', this.onPointerDown, this);
    this.events.on('resume', this.onResumed, this);
    this.events.once('shutdown', this.cleanup, this);

    // Where to come in. Returning from the ending screen wins, then a loaded
    // save's exact tile, then the map's own entrance.
    const returning = gameState.returnSpot;
    gameState.returnSpot = null;
    const spot = returning ?? gameState.spawnAt;
    this.loadMap(returning?.map ?? gameState.mapKey ?? 'town', spot);

    // A quiet autosave on a timer, so closing the tab mid-walk costs nothing.
    // Cheap: one JSON.stringify of a small object every few seconds.
    this.saveTimer = this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => this.autosave(),
    });
  }

  /** Record exactly where the player is standing, for the next save. */
  captureSpawn() {
    if (!this.player) return;
    gameState.mapKey = this.map.key;
    gameState.spawnAt = {
      x: this.player.gridX,
      y: this.player.gridY,
      facing: this.player.facing,
    };
  }

  autosave() {
    // Never save mid-transition: the player's tile is meaningless while a warp
    // fade is in flight.
    if (this.mode === 'transition' || this.player?.isMoving) return;
    this.captureSpawn();
    saveGame(gameState);
  }

  cleanup() {
    this.saveTimer?.remove();
    this.input.keyboard.off('keydown', this.onKeyDown, this);
    this.input.keyboard.off('keyup', this.onKeyUp, this);
    this.input.off('pointerdown', this.onPointerDown, this);
    this.events.off('resume', this.onResumed, this);
    this.dialogue?.destroy();
    this.levelUp?.destroy();
    this.badgePopup?.destroy();
    this.settingsButton?.destroy();
  }

  /* ---------------------------------------------------------------- */
  /* Map loading                                                       */
  /* ---------------------------------------------------------------- */

  loadMap(key, spawnAt = null) {
    // Never carry a conversation across a map change: whoever was talking is
    // not here any more, and a stale box would block movement in the new map.
    this.dialogue?.hide();
    this.levelUp?.dismiss();
    this.badgePopup?.dismiss();

    this.layers.forEach((l) => l.destroy());
    this.layers = [];
    this.tilemap?.destroy();
    this.npcs.forEach((n) => n.sprite.destroy());
    this.npcs = [];
    this.player?.destroy();

    const map = getMap(key);
    this.map = map;
    gameState.mapKey = key;

    // Maps smaller than the viewport get centred rather than pinned to the
    // top-left, so the Hall interior sits neatly in frame.
    const pxW = map.width * TILE;
    const pxH = map.height * TILE;
    const boundsW = Math.max(VIEW_W, pxW);
    const boundsH = Math.max(VIEW_H, pxH);
    this.originX = Math.floor((boundsW - pxW) / 2);
    this.originY = Math.floor((boundsH - pxH) / 2);

    this.tilemap = this.make.tilemap({
      data: map.ground,
      tileWidth: TILE,
      tileHeight: TILE,
    });
    const tileset = this.tilemap.addTilesetImage('tiles', 'tiles', TILE, TILE, 0, 0);

    const ground = this.tilemap.createLayer(0, tileset, this.originX, this.originY);
    ground.setDepth(-20);

    const decor = this.tilemap.createBlankLayer('decor', tileset, this.originX, this.originY);
    decor.putTilesAt(map.decor, 0, 0);
    decor.setDepth(-10);

    // Drawn above every actor: tree canopies you can walk behind.
    const over = this.tilemap.createBlankLayer('over', tileset, this.originX, this.originY);
    over.putTilesAt(map.over, 0, 0);
    over.setDepth(10000);

    this.layers = [ground, decor, over];

    this.spawnBoulders(key, map);
    this.restoreSpentTiles(key, map);

    const spawn = spawnAt ?? map.spawn;
    this.player = this.makeActor('player', spawn.x, spawn.y, spawn.facing);
    this.syncPlayerSprite();
    this.lastSolid = { x: spawn.x, y: spawn.y };

    for (const def of npcsOnMap(key)) {
      // A gate guard stands in the way until their condition is met, then
      // takes up their alternate spot beside it.
      const spot = def.altPosition && this.guardStoodDown(def) ? def.altPosition : def;
      const sprite = this.makeActor(def.sprite, spot.x, spot.y, def.facing);
      this.npcs.push({ def, sprite });
    }

    const cam = this.cameras.main;
    cam.setBounds(0, 0, boundsW, boundsH);
    cam.startFollow(this.player, true);

    this.refreshHud();
    this.showLocationBanner(map.title);

    // Explain the goal once, on arrival, after the location card has had a
    // moment on screen. Without this the player has no idea why they are here.
    if (key === 'town' && !gameState.seenIntro) {
      gameState.seenIntro = true;
      this.brief(INTRO_LINES);
      return;
    }

    // Anywhere the rules of movement change gets the same treatment: say what
    // the task is the first time the player walks in, and never again.
    if (map.briefing && !gameState.seenBriefings.has(key)) {
      gameState.seenBriefings.add(key);
      this.brief(map.briefing);
    }
  }

  /**
   * Hold the arrival card for a beat, then talk. Checks the map again on the
   * way out: a briefing scheduled for one place must not land in another.
   */
  brief(lines) {
    const forMap = this.map.key;
    this.time.delayedCall(900, () => {
      if (this.mode === 'explore' && this.map.key === forMap) this.showLines(lines);
    });
  }

  /**
   * Whether a gate guard has met their condition and stepped aside.
   *
   * Purely about the token/sigil requirement - earning it is always visible
   * and real, a reward in its own right.
   */
  guardStoodDown(def) {
    if (def.opensAtSigils) return gameState.sigils.length >= def.opensAtSigils;
    return gameState.tokens.length >= (def.opensAt ?? 1);
  }

  /**
   * Move any guard who has just earned the right to stand aside.
   *
   * Placement happens in loadMap, which is fine for a guard you unlock in a
   * gym and then walk out to. It is not fine on the Open Strait, where the
   * challengers and the harbourmaster share one map: without this, the player
   * wins the last sigil and the boom stays down until they leave and come back.
   */
  refreshGuards() {
    for (const npc of this.npcs) {
      const { def, sprite } = npc;
      if (!def.altPosition || !this.guardStoodDown(def)) continue;
      if (sprite.gridX === def.altPosition.x && sprite.gridY === def.altPosition.y) continue;

      sprite.gridX = def.altPosition.x;
      sprite.gridY = def.altPosition.y;
      this.tweens.add({
        targets: sprite,
        x: this.worldX(sprite.gridX),
        y: this.worldY(sprite.gridY),
        duration: STEP_MS * 2,
      });
    }
  }

  /**
   * Boulders live in run state rather than in the tilemap, so a puzzle you
   * solved stays solved after you walk out of the cave and back in.
   */
  spawnBoulders(key, map) {
    this.boulders.forEach((b) => b.sprite.destroy());
    this.boulders = [];

    if (!map.boulders?.length) return;

    if (!gameState.boulders[key]) {
      gameState.boulders[key] = map.boulders.map((b) => ({ ...b }));
      gameState.filledPits[key] = [];
    }

    // Re-lay any pits that were bridged on an earlier visit.
    for (const spot of gameState.filledPits[key] ?? []) {
      const [px, py] = spot.split(',').map(Number);
      this.layers[0].putTileAt(T.PIT_FILLED, px, py);
    }

    for (const pos of gameState.boulders[key]) {
      const sprite = this.add.image(this.worldX(pos.x), this.worldY(pos.y), 'tiles', T.BOULDER);
      this.boulders.push({ sprite, gridX: pos.x, gridY: pos.y, ref: pos });
    }
  }

  /* ---------------------------------------------------------------- */
  /* The cloud crossings                                               */
  /* ---------------------------------------------------------------- */

  /**
   * Re-lay whatever the player has already spent on this map, so a crossing
   * made earlier in the run is still made when they come back to it.
   */
  restoreSpentTiles(key, map) {
    if (!map.softClouds?.length) return;
    gameState.spentClouds[key] = gameState.spentClouds[key] ?? [];
    for (const spot of gameState.spentClouds[key]) {
      const [px, py] = spot.split(',').map(Number);
      this.layers[0].putTileAt(T.CLOUD_SPENT, px, py);
    }
  }

  spentHere() {
    return gameState.spentClouds[this.map.key] ?? [];
  }

  /**
   * A one-use cloud the player has just walked off thins away into sky. Called
   * with the tile they left, not the one they arrived on - the cloud has to
   * hold long enough to carry them.
   */
  spendCloud(x, y) {
    if (this.map.ground[y]?.[x] !== T.CLOUD_SOFT) return;
    const key = `${x},${y}`;
    const spent = this.spentHere();
    if (spent.includes(key)) return;

    gameState.spentClouds[this.map.key] = [...spent, key];
    this.layers[0].putTileAt(T.CLOUD_SPENT, x, y);

    // A puff of the cloud lifting away, so the tile change is something you
    // watch happen rather than something you notice later.
    const puff = this.add.image(this.worldX(x), this.worldY(y), 'tiles', T.CLOUD_SOFT)
      .setDepth(20000);
    this.tweens.add({
      targets: puff,
      y: puff.y - 10,
      scale: 1.4,
      alpha: 0,
      duration: 420,
      onComplete: () => puff.destroy(),
    });
  }

  /** Put every spent cloud back and redraw them. */
  gatherClouds() {
    const key = this.map.key;
    for (const spot of this.spentHere()) {
      const [px, py] = spot.split(',').map(Number);
      this.layers[0].putTileAt(T.CLOUD_SOFT, px, py);
    }
    gameState.spentClouds[key] = [];
  }

  /** Nowhere left to step: the crossing has closed behind them. */
  isStranded() {
    if (!this.map.softClouds?.length) return false;
    const { gridX: x, gridY: y } = this.player;
    return ![[1, 0], [-1, 0], [0, 1], [0, -1]]
      .some(([dx, dy]) => this.isWalkable(x + dx, y + dy));
  }

  /**
   * Float the player back to the last solid ground they stood on and gather
   * every cloud. A one-way puzzle needs a way out that is not a restart, and
   * losing the crossing is punishment enough.
   */
  driftBack() {
    this.mode = 'transition';
    const cam = this.cameras.main;
    const spot = this.lastSolid ?? this.map.spawn;

    cam.fadeOut(FADE_MS, 238, 241, 255);
    cam.once('camerafadeoutcomplete', () => {
      this.gatherClouds();
      this.player.gridX = spot.x;
      this.player.gridY = spot.y;
      this.player.setPosition(this.worldX(spot.x), this.worldY(spot.y));
      this.lastSolid = { ...spot };
      cam.fadeIn(FADE_MS, 238, 241, 255);
      this.mode = 'explore';
      this.showLines(DRIFT_LINES);
    });
  }

  boulderAt(x, y) {
    return this.boulders.find((b) => b.gridX === x && b.gridY === y) ?? null;
  }

  /**
   * Try to shove a boulder one tile. Returns true if it moved, which is what
   * lets the player follow it into the space it left.
   */
  pushBoulder(boulder, dx, dy) {
    const tx = boulder.gridX + dx;
    const ty = boulder.gridY + dy;
    const map = this.map;

    if (tx < 0 || ty < 0 || tx >= map.width || ty >= map.height) return false;
    if (this.boulderAt(tx, ty)) return false;

    const isPit = map.ground[ty][tx] === T.PIT
      && !(gameState.filledPits[map.key] ?? []).includes(`${tx},${ty}`);

    // Anything solid stops it, except a pit - which is the whole point.
    if (!isPit && !this.isWalkable(tx, ty)) return false;

    boulder.gridX = tx;
    boulder.gridY = ty;
    boulder.ref.x = tx;
    boulder.ref.y = ty;

    this.tweens.add({
      targets: boulder.sprite,
      x: this.worldX(tx),
      y: this.worldY(ty),
      duration: STEP_MS,
    });

    if (isPit) this.fillPit(boulder, tx, ty);
    return true;
  }

  /** A boulder shoved into a pit drops in and becomes the floor. */
  fillPit(boulder, x, y) {
    const key = this.map.key;
    gameState.filledPits[key] = gameState.filledPits[key] ?? [];
    gameState.filledPits[key].push(`${x},${y}`);
    gameState.boulders[key] = gameState.boulders[key].filter((b) => b !== boulder.ref);
    this.boulders = this.boulders.filter((b) => b !== boulder);

    this.layers[0].putTileAt(T.PIT_FILLED, x, y);
    this.cameras.main.shake(180, 0.005);

    this.tweens.add({
      targets: boulder.sprite,
      scale: 0.55,
      alpha: 0,
      duration: 240,
      onComplete: () => boulder.sprite.destroy(),
    });
  }

  makeActor(spriteKey, gx, gy, facing) {
    const row = ACTOR_ROW[spriteKey];
    const sprite = this.add.sprite(
      this.worldX(gx), this.worldY(gy),
      'actors', idleFrame(row, facing),
    );
    sprite.actorRow = row;
    sprite.actorKey = spriteKey;
    sprite.gridX = gx;
    sprite.gridY = gy;
    sprite.facing = facing;
    sprite.isMoving = false;
    return sprite;
  }

  worldX(gx) { return this.originX + gx * TILE + TILE / 2; }
  worldY(gy) { return this.originY + gy * TILE + TILE / 2; }

  /* ---------------------------------------------------------------- */
  /* Input                                                             */
  /* ---------------------------------------------------------------- */

  onKeyDown(event) {
    const dir = DIR_FOR_CODE[event.code];
    if (dir) {
      // Track press order so the most recent key wins, which is what makes
      // turning at a corner feel right when both keys are briefly held.
      this.heldDirs = this.heldDirs.filter((d) => d !== dir);
      this.heldDirs.push(dir);
      return;
    }

    if (event.code === 'Escape') {
      this.openSettings();
      return;
    }

    if (!CONFIRM_CODES.has(event.code)) return;
    event.preventDefault?.();
    this.confirm();
  }

  /** Shared by the keyboard, the on-screen button, and a tap. */
  confirm() {
    if (this.anyPopupOpen()) {
      this.levelUp.dismiss() || this.badgePopup.dismiss();
      return;
    }
    if (this.dialogue.isOpen) {
      this.dialogue.advance();
      return;
    }
    if (this.mode !== 'explore' || this.player?.isMoving) return;
    this.interact();
  }

  /**
   * A tap anywhere advances a conversation or clears the level-up card, which
   * is what a touch player will instinctively try. It deliberately does not
   * trigger `interact()` - that would fire on every stray tap on the map.
   */
  onPointerDown() {
    if (this.anyPopupOpen()) {
      this.levelUp.dismiss() || this.badgePopup.dismiss();
      return;
    }
    if (this.dialogue.isOpen) this.dialogue.advance();
  }

  anyPopupOpen() {
    return this.levelUp.isOpen || this.badgePopup.isOpen;
  }

  onKeyUp(event) {
    const dir = DIR_FOR_CODE[event.code];
    if (dir) this.heldDirs = this.heldDirs.filter((d) => d !== dir);
  }

  /** Most recently pressed direction that is still physically down. */
  readDirection() {
    const external = heldDirection();
    if (external) return external;

    const down = {
      up: this.keys.up.isDown || this.keys.w.isDown,
      down: this.keys.down.isDown || this.keys.s.isDown,
      left: this.keys.left.isDown || this.keys.a.isDown,
      right: this.keys.right.isDown || this.keys.d.isDown,
    };
    for (let i = this.heldDirs.length - 1; i >= 0; i--) {
      if (down[this.heldDirs[i]]) return this.heldDirs[i];
    }
    return Object.keys(down).find((d) => down[d]) ?? null;
  }

  /* ---------------------------------------------------------------- */
  /* Movement                                                          */
  /* ---------------------------------------------------------------- */

  update(time) {
    if (!this.player) return;

    // Depth by Y so actors sort against each other correctly.
    this.player.setDepth(this.player.y);
    for (const n of this.npcs) n.sprite.setDepth(n.sprite.y);
    for (const b of this.boulders) b.sprite.setDepth(b.sprite.y);

    if (this.mode !== 'explore' || this.player.isMoving || time < this.turnLockUntil) return;

    const dir = this.readDirection();
    if (!dir) {
      this.player.anims.stop();
      this.player.setFrame(idleFrame(this.player.actorRow, this.player.facing));
      return;
    }
    this.tryStep(dir);
  }

  tryStep(dir) {
    const player = this.player;
    player.facing = dir;

    const [dx, dy] = DELTA[dir];
    const tx = player.gridX + dx;
    const ty = player.gridY + dy;

    // Walking into a boulder shoves it, and you follow it into the gap.
    const boulder = this.boulderAt(tx, ty);
    if (boulder && this.pushBoulder(boulder, dx, dy)) {
      this.stepTo(tx, ty, dir);
      return;
    }

    if (!this.isWalkable(tx, ty)) {
      // Classic bump-and-turn: face the obstacle without moving.
      player.anims.stop();
      player.setFrame(idleFrame(player.actorRow, dir));
      this.turnLockUntil = this.time.now + TURN_LOCK_MS;

      const shut = this.closedGateAt(tx, ty);
      if (shut) {
        this.showLines(GATES[shut.gate].lines);
      }
      return;
    }

    this.stepTo(tx, ty, dir);
  }

  /** Tween the player one tile, then run whatever the new tile triggers. */
  stepTo(tx, ty, dir) {
    const player = this.player;
    const fromX = player.gridX;
    const fromY = player.gridY;
    player.isMoving = true;
    // Decided from where the step ends, not where it started, so the boat
    // appears as you push off rather than a beat after you land.
    this.setPlayerSprite(this.isOpenWater(tx, ty) ? 'sailor' : 'player');
    player.anims.play(`${player.actorKey}-${dir}`, true);

    this.tweens.add({
      targets: player,
      x: this.worldX(tx),
      y: this.worldY(ty),
      duration: STEP_MS,
      onComplete: () => {
        player.gridX = tx;
        player.gridY = ty;
        player.isMoving = false;
        // The cloud they just left gives way behind them.
        this.spendCloud(fromX, fromY);
        this.onEnterTile(tx, ty);
      },
    });
  }

  isWalkable(x, y) {
    const map = this.map;
    if (x < 0 || y < 0 || x >= map.width || y >= map.height) return false;

    // A pit is solid until a boulder has been dropped into it.
    if (map.ground[y][x] === T.PIT) {
      if (!(gameState.filledPits[map.key] ?? []).includes(`${x},${y}`)) return false;
    } else if (map.ground[y][x] === T.CLOUD_SOFT) {
      // A one-use cloud holds until it has been stepped off.
      if ((gameState.spentClouds[map.key] ?? []).includes(`${x},${y}`)) return false;
    } else if (this.isOpenWater(x, y)) {
      // Water is solid everywhere except on a sailable map, and then only once
      // there is a boat to cross it in.
      if (!gameState.hasBoat) return false;
    } else if (BLOCKED.has(map.ground[y][x])) {
      return false;
    }

    if (this.boulderAt(x, y)) return false;

    const decor = map.decor[y][x];
    if (decor !== -1 && BLOCKED.has(decor)) return false;

    if (this.npcAt(x, y)) return false;

    // A shut gate behaves like a wall, so you bump into the doors rather than
    // standing inside a doorway that refuses to open.
    if (this.closedGateAt(x, y)) return false;

    return true;
  }

  /** Sea an actor could row across, on a map that has any. */
  isOpenWater(x, y) {
    return !!this.map.sailable && SAILABLE.has(this.map.ground[y]?.[x]);
  }

  /**
   * Swap the player between the walking sprite and the boat one, so stepping
   * off a dock puts them in the boat and stepping onto sand takes them out of
   * it without a cutscene or a menu.
   */
  setPlayerSprite(key) {
    const player = this.player;
    if (!player || player.actorKey === key) return;

    player.actorKey = key;
    player.actorRow = ACTOR_ROW[key];
    player.anims.stop();
    player.setFrame(idleFrame(player.actorRow, player.facing));
  }

  /** Pick the right sprite for wherever the player is standing now. */
  syncPlayerSprite() {
    if (!this.player) return;
    const afloat = this.isOpenWater(this.player.gridX, this.player.gridY);
    this.setPlayerSprite(afloat ? 'sailor' : 'player');
  }

  npcAt(x, y) {
    return this.npcs.find((n) => n.sprite.gridX === x && n.sprite.gridY === y) ?? null;
  }

  warpAt(x, y) {
    return this.map.warps.find((w) => w.x === x && w.y === y) ?? null;
  }

  /**
   * A gated warp opens once every challenger it names has been beaten and the
   * player holds however many Tool Sigils it asks for. Either half may be
   * absent, so most gates only ever check the first.
   */
  gateOpen(gateId) {
    const gate = GATES[gateId];
    if (!gate) return true;
    if (gate.sigils && gameState.sigils.length < gate.sigils) return false;
    return (gate.requires ?? []).every((id) => gameState.isDefeated(id));
  }

  /** The warp on this tile, if it is currently shut. */
  closedGateAt(x, y) {
    const warp = this.warpAt(x, y);
    return warp?.gate && !this.gateOpen(warp.gate) ? warp : null;
  }

  onEnterTile(x, y) {
    const key = `${x},${y}`;

    // Remember the last footing that will still be there later, which is where
    // a failed cloud crossing puts the player back.
    if (this.map.ground[y]?.[x] !== T.CLOUD_SOFT) this.lastSolid = { x, y };

    // Suppress the warp you just arrived on, otherwise the exit mat in the
    // Hall would bounce you straight back out.
    if (this.warpGuard === key) return;
    this.warpGuard = null;

    const warp = this.warpAt(x, y);
    if (warp) {
      this.doWarp(warp);
      return;
    }

    if (this.isStranded()) this.driftBack();
  }

  doWarp(warp) {
    this.mode = 'transition';
    const cam = this.cameras.main;

    // Walking out past the last keeper ends the run. Remember exactly where,
    // facing back the way they came, so the ending screen can drop the player
    // straight back into the world instead of making them restart to explore.
    if (warp.to === 'ending') {
      gameState.returnSpot = {
        map: this.map.key,
        x: warp.x,
        y: warp.y,
        facing: OPPOSITE[this.player.facing],
      };
      cam.fadeOut(FADE_MS, 13, 15, 24);
      cam.once('camerafadeoutcomplete', () => this.scene.start('Ending'));
      return;
    }

    cam.fadeOut(FADE_MS, 13, 15, 24);
    cam.once('camerafadeoutcomplete', () => {
      this.loadMap(warp.to, {
        x: warp.tx,
        y: warp.ty,
        facing: this.player.facing,
      });
      this.warpGuard = `${warp.tx},${warp.ty}`;
      cam.fadeIn(FADE_MS, 13, 15, 24);
      this.mode = 'explore';
    });
  }

  /* ---------------------------------------------------------------- */
  /* Interaction                                                       */
  /* ---------------------------------------------------------------- */

  interact() {
    const [dx, dy] = DELTA[this.player.facing];
    const tx = this.player.gridX + dx;
    const ty = this.player.gridY + dy;

    const npc = this.npcAt(tx, ty);
    if (npc) return this.talkTo(npc);

    const sign = this.map.signs.find((s) => s.x === tx && s.y === ty);
    if (sign) return this.showLines(sign.lines);

    if (this.map.decor[ty]?.[tx] === T.CRYSTAL) return this.resetBoulders();
    if (this.map.decor[ty]?.[tx] === T.UPDRAFT) return this.useUpdraft();

    const shut = this.closedGateAt(tx, ty);
    if (shut) {
      return this.showLines(GATES[shut.gate].lines);
    }

    return undefined;
  }

  talkTo(npc) {
    // Turn to meet the player's eye.
    npc.sprite.setFrame(idleFrame(npc.sprite.actorRow, OPPOSITE[this.player.facing]));
    npc.sprite.facing = OPPOSITE[this.player.facing];

    const def = npc.def;

    // The Archivist: talk, then the region map takes over the screen.
    if (def.action === 'map') {
      const firstTime = !gameState.seenMap;
      gameState.seenMap = true;
      this.showLines(firstTime ? def.lines : def.repeatLines, {
        speaker: def.name,
        onDone: () => this.openWorldMap(),
      });
      return;
    }

    // A gate guard: what they say depends on whether their condition is met.
    if (def.action === 'gate') {
      const open = this.guardStoodDown(def);
      this.showLines(open ? def.openLines : def.lines, { speaker: def.name });
      return;
    }

    // The ferrier: talk, and the sea becomes crossable.
    if (def.action === 'boat') {
      const firstTime = !gameState.hasBoat;
      this.showLines(firstTime ? def.lines : def.repeatLines, {
        speaker: def.name,
        onDone: () => {
          if (!firstTime) return;
          gameState.hasBoat = true;
          this.cameras.main.flash(220, 95, 179, 217);
          this.showLines(BOAT_LINES);
        },
      });
      return;
    }

    // The ordering drill away from the Workshop: same mechanic, area colours,
    // and whichever pool of drills the NPC names.
    if (def.action === 'drill') {
      const pool = def.drillPool ?? 'sea';
      const firstTime = !gameState.seenDrills.has(pool);
      gameState.seenDrills.add(pool);
      this.showLines(firstTime ? def.lines : def.repeatLines, {
        speaker: def.name,
        onDone: () => this.openWorkshop(pool),
      });
      return;
    }

    // The cave keeper: talk, then the true/false gauntlet takes over.
    if (def.action === 'signal') {
      const firstTime = !gameState.seenSignal;
      gameState.seenSignal = true;
      this.showLines(firstTime ? def.lines : def.repeatLines, {
        speaker: def.name,
        onDone: () => this.openSignal(),
      });
      return;
    }

    // The Workshop host: talk, then the ordering drill takes over the screen.
    if (def.action === 'workshop') {
      const firstTime = !gameState.seenWorkshop;
      gameState.seenWorkshop = true;
      this.showLines(firstTime ? def.lines : def.repeatLines, {
        speaker: def.name,
        onDone: () => this.openWorkshop('workshop'),
      });
      return;
    }

    if (!def.battle) {
      this.showLines(def.lines ?? [], { speaker: def.name });
      return;
    }

    // A repeatable opponent never counts as beaten, so it can always be
    // challenged again - that is the point of the practice partner.
    //
    // Once the run has been finished, everyone takes a rematch. A completed
    // game should be somewhere you can keep playing, not a museum.
    if (!def.repeatable && gameState.isDefeated(def.id)) {
      if (!gameState.freePlay) {
        this.showLines(def.postDefeat, { speaker: def.name });
        return;
      }
      this.showLines([...def.postDefeat, ...REMATCH_LINES], {
        speaker: def.name,
        onDone: () => this.startBattle(def),
      });
      return;
    }

    this.showLines(def.intro, {
      speaker: def.name,
      onDone: () => this.startBattle(def),
    });
  }

  /**
   * Touching a cave crystal grinds every stone back to where it started.
   * Sokoban always lets you strand a block; this is the way out of that
   * without making the puzzles trivial.
   */
  resetBoulders() {
    const key = this.map.key;
    if (!this.map.boulders?.length) return;

    gameState.boulders[key] = this.map.boulders.map((b) => ({ ...b }));
    gameState.filledPits[key] = [];

    this.showLines(CRYSTAL_LINES, {
      onDone: () => this.loadMap(key, this.map.spawn),
    });
  }

  /**
   * The cloud equivalent of a crystal: gathers every spent cloud back. Unlike
   * the crystal it does not move the player, because up here the way you came
   * is the thing that closed, not the way ahead.
   */
  useUpdraft() {
    if (!this.map.softClouds?.length) return;
    this.gatherClouds();
    this.cameras.main.flash(260, 255, 242, 189);
    this.showLines(UPDRAFT_LINES);
  }

  openWorldMap() {
    this.mode = 'map';
    this.scene.launch('WorldMap');
    this.scene.pause();
  }

  openWorkshop(pool = 'workshop') {
    this.mode = 'workshop';
    this.scene.launch('Sequence', { pool });
    this.scene.pause();
  }

  openSignal() {
    this.mode = 'workshop';
    this.scene.launch('Signal');
    this.scene.pause();
  }

  openSettings() {
    if (this.mode !== 'explore') return;
    this.mode = 'settings';
    this.scene.launch('Settings', { caller: 'Town' });
    this.scene.pause();
  }

  showLines(lines, { speaker = null, onDone = null } = {}) {
    this.mode = 'dialogue';
    this.player.anims.stop();
    this.player.setFrame(idleFrame(this.player.actorRow, this.player.facing));

    this.dialogue.show(lines, {
      speaker,
      onDone: () => {
        this.mode = 'explore';
        onDone?.();
      },
    });
  }

  /* ---------------------------------------------------------------- */
  /* Battle handoff                                                    */
  /* ---------------------------------------------------------------- */

  startBattle(def) {
    this.mode = 'battle';
    this.heldDirs = [];
    this.scene.launch('Battle', { npcId: def.id });
    this.scene.pause();
  }

  /** Fired by any launched scene (Battle, Settings, WorldMap...) resuming this one. */
  onResumed(sys, data) {
    this.mode = 'explore';
    this.heldDirs = [];

    // Cheap and idempotent, so it is simplest to just always re-check every
    // guard's position on the way back into Town rather than reason case by
    // case about which of the launched scenes could have changed one.
    this.refreshGuards();

    // The Workshop drill banks its own EXP; only the level-up card is left.
    if (data?.sequence) {
      this.refreshHud();
      this.autosave();
      if (data.levelsGained?.length) {
        this.mode = 'popup';
        this.levelUp.show(
          gameState.level,
          data.levelsGained.length * HP_PER_LEVEL,
          data.levelsGained.length,
          () => { this.mode = 'explore'; this.refreshHud(); this.rewardClouds(); },
        );
        return;
      }
      this.rewardClouds();
      return;
    }

    if (!data?.npcId) return;

    const def = npcById(data.npcId);
    if (!def) return;

    // Bank EXP first: correct answers pay out win or lose, so a defeat still
    // makes progress and a rematch is never wasted effort.
    // EXP was already banked and animated inside the battle; all that is left
    // here is to celebrate whatever it produced.
    const levelsReached = data.levelsGained ?? [];

    let sigilWon = null;
    if (data.won && !def.repeatable) {
      gameState.markDefeated(def.id);
      if (def.token) gameState.awardToken(def.token);
      if (def.sigil && gameState.awardSigil(def.sigil)) sigilWon = def.sigil;
    }
    this.refreshHud();
    this.refreshGuards();
    this.autosave();

    // The challenger speaks first, then the level-up card, then any
    // consequences of the win. Each beat gets the screen to itself.
    this.showLines(data.won ? def.win : def.lose, {
      speaker: def.name,
      onDone: () => this.celebrate(levelsReached, def, data.won, sigilWon),
    });
  }

  /**
   * Finishing any challenge on the cloud maps gathers every spent crossing
   * back in.
   *
   * The Ascent's clouds are one-way, and a player who takes a bad line can
   * find the route they wanted closed behind them. Drifting back covers being
   * completely cornered; this covers the commoner case of simply having
   * crossed badly. It also gives the people up there a reason to exist beyond
   * EXP: beat one and you get the climb back.
   */
  rewardClouds() {
    if (!this.map.softClouds?.length) return;
    if (!this.spentHere().length) return;

    this.gatherClouds();
    this.cameras.main.flash(220, 255, 242, 189);
    this.showLines(CLOUD_REWARD_LINES);
  }

  /**
   * The reward chain after a win, each beat getting the screen to itself:
   * level-up card, then the badge card if a gym just fell, then whatever the
   * win unlocked in the world.
   */
  celebrate(levels, def, won, sigilWon = null) {
    const narrate = () => {
      if (sigilWon) {
        this.cameras.main.flash(200, 255, 217, 119);
        this.showLines(sigilLines(sigilWon, gameState.sigils.length), {
          onDone: () => {
            if (won && def.clearedLines) {
              this.showLines(def.clearedLines, { onDone: () => this.rewardClouds() });
              return;
            }
            this.rewardClouds();
          },
        });
        return;
      }
      if (!won || !def.clearedLines) {
        this.rewardClouds();
        return;
      }
      this.showLines(def.clearedLines, { onDone: () => this.rewardClouds() });
    };

    const badge = () => {
      if (!won || !def.token) {
        narrate();
        return;
      }
      this.mode = 'popup';
      this.badgePopup.show(def.token, () => {
        this.mode = 'explore';
        this.refreshHud();
        narrate();
      });
    };

    if (!levels.length) {
      badge();
      return;
    }

    this.mode = 'popup';
    this.levelUp.show(
      gameState.level,
      levels.length * HP_PER_LEVEL,
      levels.length,
      () => {
        this.mode = 'explore';
        this.refreshHud();
        badge();
      },
    );
  }

  /* ---------------------------------------------------------------- */
  /* HUD                                                               */
  /* ---------------------------------------------------------------- */

  buildHud() {
    // Origin 0.5 on Y: positioning by the top edge leaves glyphs clipped by
    // the panel's bottom border once Text padding is taken into account.
    this.hudG = this.add.graphics().setScrollFactor(0).setDepth(15000);
    this.hudBarG = this.add.graphics().setScrollFactor(0).setDepth(15001);

    this.levelText = this.add
      .text(HUD_X + 5, HUD_Y + 8, '', textStyle({ color: 'goldLight', bold: true }))
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(15002);

    this.hudText = this.add
      .text(HUD_X + HUD_W - 5, HUD_Y + 8, '', textStyle({ color: 'paper' }))
      .setOrigin(1, 0.5)
      .setScrollFactor(0)
      .setDepth(15002);

    this.bannerG = this.add.graphics().setScrollFactor(0).setDepth(15000);
    this.bannerText = this.add
      .text(0, 0, '', textStyle({ color: 'gold', bold: true }))
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(15001);
  }

  refreshHud() {
    this.levelText.setText(`Lv ${gameState.level}`);

    // The counter always shows the thing the player is currently collecting:
    // wins before the first gym, sigils while they are out on the water, and
    // tokens the rest of the time.
    const wins = gameState.challengerWins(VALLEY_CHALLENGERS);
    let label = `WINS ${wins}/${CHALLENGER_COUNT}`;
    if (this.map?.sailable) label = `SIGILS ${gameState.sigils.length}/${TOTAL_SIGILS}`;
    else if (gameState.tokens.length) label = `TOKENS ${gameState.tokens.length}/${TOTAL_TOKENS}`;
    this.hudText.setText(label);

    this.hudG.clear();
    drawPanel(this.hudG, HUD_X, HUD_Y, HUD_W, HUD_H, { fill: 'shadow' });

    // EXP bar along the bottom of the panel.
    const ratio = Phaser.Math.Clamp(gameState.exp / gameState.expToNext(), 0, 1);
    this.hudBarG.clear();
    drawBar(this.hudBarG, HUD_X + 5, HUD_Y + 15, HUD_W - 10, 6, ratio, 'waterLight');
  }

  /** Brief map-name card on arrival, then fades out of the way. */
  showLocationBanner(title) {
    this.bannerText.setText(title);
    const w = Math.ceil(this.bannerText.width) + 14;
    const x = Math.floor((VIEW_W - w) / 2);
    const y = VIEW_H - 26;

    this.bannerG.clear();
    drawPanel(this.bannerG, x, y, w, 16, { fill: 'shadow' });
    this.bannerText.setPosition(x + 7, y + 8);

    this.bannerG.setAlpha(1);
    this.bannerText.setAlpha(1);
    this.tweens.add({
      targets: [this.bannerG, this.bannerText],
      alpha: 0,
      delay: 1400,
      duration: 400,
    });
  }
}

const DIR_FOR_CODE = {
  ArrowUp: 'up', KeyW: 'up',
  ArrowDown: 'down', KeyS: 'down',
  ArrowLeft: 'left', KeyA: 'left',
  ArrowRight: 'right', KeyD: 'right',
};

const CONFIRM_CODES = new Set(['Space', 'Enter', 'NumpadEnter', 'KeyE']);
