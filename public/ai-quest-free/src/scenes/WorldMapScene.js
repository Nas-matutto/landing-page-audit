/**
 * The region map, shown by Atlas in the Archive.
 *
 * A drawn map rather than a list: a landmass on a sea, towns as little
 * buildings, dotted roads between them, a gym badge on every town that has
 * one, and a bouncing pin on wherever the player currently is. That is what
 * makes it read as somewhere you are travelling through rather than a menu.
 *
 * Runs as its own scene over a paused TownScene, like the battle.
 */

import { REGIONS, ROUTES, ROUTE_MAPS, regionForMap, regionById } from '../data/regions.js';
import { gameState } from '../systems/gameState.js';
import { drawPanel, textStyle } from '../ui/theme.js';
import { drawBadge } from '../ui/badge.js';
import { hex } from '../data/palette.js';
import { VIEW_W, VIEW_H } from '../config.js';

const HEADER_H = 18;
const FOOTER_Y = VIEW_H - 15;

/** What the footer says when the player is between towns. */
const ROUTE_BLURB = {
  road: 'On the road between towns',
  cave: 'Underground, shifting stones',
  sea: 'At sea, hunting Tool Sigils',
  sky: 'Climbing, on clouds that hold once',
};

export default class WorldMapScene extends Phaser.Scene {
  constructor() {
    super('WorldMap');
  }

  create() {
    this.here = this.locate();

    this.drawSea();
    this.drawLand();
    this.drawRoutes();
    this.drawTowns();
    this.drawChrome();
    this.drawPin();

    const close = () => this.close();
    this.input.keyboard.on('keydown', close);
    this.input.on('pointerdown', close);
    this.events.once('shutdown', () => this.input.keyboard.off('keydown', close));
  }

  /**
   * Where to put the pin: on a town, or halfway along a road if the player is
   * currently between two of them.
   */
  locate() {
    const region = regionForMap(gameState.mapKey);
    if (region) return { x: region.x, y: region.y - 11, region };

    const link = ROUTE_MAPS[gameState.mapKey];
    if (link) {
      const a = regionById(link[0]);
      const b = regionById(link[1]);
      const leg = ROUTES.find((r) => r.from === link[0] && r.to === link[1]);
      if (a && b) {
        return {
          x: Math.round((a.x + b.x) / 2),
          y: Math.round((a.y + b.y) / 2) - (leg?.kind === 'sky' ? 24 : 10),
          region: null,
          leg,
        };
      }
    }
    return { x: REGIONS[0].x, y: REGIONS[0].y - 12, region: REGIONS[0] };
  }

  /* ---------------------------------------------------------------- */
  /* Terrain                                                           */
  /* ---------------------------------------------------------------- */

  drawSea() {
    const g = this.add.graphics().setDepth(0);
    g.fillStyle(hex('waterDark'), 1);
    g.fillRect(0, 0, VIEW_W, VIEW_H);

    // Slow horizontal swell, so the sea is not a flat block of blue.
    g.fillStyle(hex('water'), 0.5);
    for (let y = HEADER_H; y < VIEW_H; y += 6) {
      g.fillRect(0, y, VIEW_W, 1);
    }
    g.fillStyle(hex('waterLight'), 0.25);
    for (let y = HEADER_H + 3; y < VIEW_H; y += 12) {
      for (let x = (y * 7) % 16; x < VIEW_W; x += 16) g.fillRect(x, y, 5, 1);
    }
  }

  /**
   * The mainland, the archipelago's islands, and the mountains the caves run
   * under. The mainland stops well short of the south-east so the sail to the
   * archipelago crosses real open water rather than cutting over a bay.
   */
  drawLand() {
    const g = this.add.graphics().setDepth(1);

    const mainland = [
      [18, 148], [12, 116], [24, 86], [20, 58], [40, 36], [70, 26],
      [100, 30], [124, 22], [150, 24], [172, 34], [186, 52], [188, 76],
      [178, 98], [156, 116], [128, 130], [96, 142], [64, 152], [36, 154],
    ];
    const islands = [
      [[210, 116], [238, 108], [262, 120], [258, 142], [230, 152], [206, 138]],
      [[268, 110], [288, 116], [296, 132], [280, 142], [264, 128]],
    ];

    // Shoreline halo first, then the land on top of it.
    for (const shape of [mainland, ...islands]) {
      g.fillStyle(hex('waterLight'), 0.45);
      this.poly(g, shape, 3);
      g.fillStyle(hex('grassDark'), 1);
      this.poly(g, shape, 1);
      g.fillStyle(hex('grass'), 1);
      this.poly(g, shape, -1);
    }

    // A little relief, so the mainland is not a flat green blob.
    g.fillStyle(hex('grassDark'), 0.55);
    for (const [cx, cy, rw, rh] of [[70, 110, 26, 10], [148, 96, 30, 11]]) {
      g.fillEllipse(cx, cy, rw, rh);
    }
    g.fillStyle(hex('sand'), 0.45);
    g.fillEllipse(168, 74, 22, 9);
    g.fillEllipse(232, 140, 26, 8);

    this.drawMountains(g);
  }

  /**
   * The range the Whisper Caves run under, sitting on the road between Prompt
   * Ridge and Constitution Coast. Drawn as a row of peaks with a dark mouth in
   * the middle, so the map says "you went through here, not over it".
   */
  drawMountains(g) {
    const peaks = [[64, 62, 11], [80, 54, 14], [98, 50, 12], [114, 56, 10]];
    for (const [x, y, h] of peaks) {
      g.fillStyle(hex('ink'), 0.3);
      g.fillTriangle(x - h - 1, y + h + 1, x + 1, y - 1, x + h + 1, y + h + 1);
      g.fillStyle(hex('slateDark'), 1);
      g.fillTriangle(x - h, y + h, x, y, x + h, y + h);
      g.fillStyle(hex('slate'), 1);
      g.fillTriangle(x - Math.round(h * 0.5), y + h, x, y, x + h, y + h);
      g.fillStyle(hex('paper'), 0.85);
      g.fillTriangle(x - 3, y + 4, x, y, x + 3, y + 4);
    }

    // The cave mouth itself.
    g.fillStyle(hex('ink'), 1);
    g.fillEllipse(89, 66, 13, 9);
    g.fillStyle(hex('crystalDark'), 0.7);
    g.fillEllipse(89, 67, 7, 5);
    g.fillStyle(hex('crystal'), 0.9);
    g.fillRect(88, 64, 2, 2);
  }

  /** The cloud that Halcyon Rest sits on, drawn instead of land. */
  drawCloudIsland(g, cx, cy) {
    const puffs = [[-30, 6, 30, 13], [-8, 0, 34, 16], [16, 5, 28, 13], [34, 9, 20, 10]];
    g.fillStyle(hex('halo'), 0.35);
    for (const [dx, dy, w, h] of puffs) g.fillEllipse(cx + dx, cy + dy + 2, w + 6, h + 5);
    g.fillStyle(hex('cloudShade'), 1);
    for (const [dx, dy, w, h] of puffs) g.fillEllipse(cx + dx, cy + dy + 3, w, h);
    g.fillStyle(hex('cloud'), 1);
    for (const [dx, dy, w, h] of puffs) g.fillEllipse(cx + dx, cy + dy, w, h);
    g.fillStyle(hex('white'), 1);
    for (const [dx, dy, w, h] of puffs) g.fillEllipse(cx + dx, cy + dy - 2, w - 8, h - 5);
  }

  /** Fill a polygon, optionally grown/shrunk about its centre. */
  poly(g, points, grow) {
    const cx = points.reduce((a, p) => a + p[0], 0) / points.length;
    const cy = points.reduce((a, p) => a + p[1], 0) / points.length;
    g.beginPath();
    points.forEach(([px, py], i) => {
      const dx = px - cx;
      const dy = py - cy;
      const len = Math.hypot(dx, dy) || 1;
      const x = px + (dx / len) * grow;
      const y = py + (dy / len) * grow;
      if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
    });
    g.closePath();
    g.fillPath();
  }

  /* ---------------------------------------------------------------- */
  /* Roads and towns                                                   */
  /* ---------------------------------------------------------------- */

  /**
   * Each leg drawn as what it actually is. A dotted track for the walked road,
   * rock markers for the crossing under the mountains, a dashed wake for the
   * sail, and a rising line of puffs for the climb through cloud - so the map
   * tells you how you got somewhere, not just that the two are connected.
   */
  drawRoutes() {
    const g = this.add.graphics().setDepth(2);

    for (const route of ROUTES) {
      const a = regionById(route.from);
      const b = regionById(route.to);
      if (!a || !b) continue;

      const walkable = !a.locked && !b.locked;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;
      const steps = Math.max(3, Math.round(dist / 7));

      // Bow each leg out sideways so it never reads as a ruler line. It has to
      // be perpendicular to the leg, not simply upward: a near-vertical road
      // bowed on Y just slides along itself and stays straight.
      const amount = route.kind === 'sky' ? 14 : 8;
      const px = -dy / dist;
      const py = dx / dist;

      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const bow = Math.sin(t * Math.PI) * amount;
        const x = Math.round(a.x + dx * t + px * bow);
        const y = Math.round(a.y + dy * t + py * bow);
        this.drawLeg(g, route.kind, x, y, i, walkable);
      }
    }
  }

  drawLeg(g, kind, x, y, i, walkable) {
    const dim = walkable ? 1 : 0.5;

    if (kind === 'cave') {
      // Stones, with the middle stretch shown as a tunnel under the range.
      g.fillStyle(hex('ink'), 0.45 * dim);
      g.fillRect(x - 2, y - 1, 6, 5);
      g.fillStyle(hex(walkable ? 'rockLight' : 'slate'), dim);
      g.fillRect(x - 1, y, 4, 3);
      if (i % 2 === 0) {
        g.fillStyle(hex('crystal'), 0.9 * dim);
        g.fillRect(x, y + 1, 1, 1);
      }
      return;
    }

    if (kind === 'sea') {
      // A wake: two short dashes offset, so it reads as water not road.
      g.fillStyle(hex('ink'), 0.28 * dim);
      g.fillRect(x - 1, y + 1, 6, 2);
      g.fillStyle(hex(walkable ? 'paper' : 'slate'), dim);
      g.fillRect(x - 1, y, 3, 1);
      g.fillRect(x + 2, y + 2, 3, 1);
      return;
    }

    if (kind === 'sky') {
      // Little puffs, brightening as they climb.
      const r = 2 + (i % 3);
      g.fillStyle(hex('cloudShade'), 0.5 * dim);
      g.fillEllipse(x + 1, y + 2, r * 2 + 2, r + 2);
      g.fillStyle(hex(walkable ? 'cloud' : 'slate'), dim);
      g.fillEllipse(x, y, r * 2 + 2, r + 2);
      g.fillStyle(hex('halo'), 0.85 * dim);
      g.fillRect(x - 1, y - 1, 2, 1);
      return;
    }

    // road
    g.fillStyle(hex('ink'), 0.35 * dim);
    g.fillRect(x - 1, y, 4, 3);
    g.fillStyle(hex(walkable ? 'pathLight' : 'slate'), dim);
    g.fillRect(x, y, 2, 2);
  }

  drawTowns() {
    for (const region of REGIONS) {
      const g = this.add.graphics().setDepth(3);
      const known = !region.locked;
      const isHere = this.here.region?.id === region.id;

      if (region.aloft) {
        // Nothing under this one but sky, so it gets a cloud to stand on.
        this.drawCloudIsland(g, region.x, region.y + 9);
      } else {
        // Ground shadow.
        g.fillStyle(hex('ink'), 0.35);
        g.fillEllipse(region.x, region.y + 7, 18, 5);
      }

      // A little town: two roofs and a wall band. The one in the clouds is
      // gilded rather than clay-tiled, because a red roof up there reads as a
      // farmhouse someone lifted into the sky.
      const roof = known ? (region.aloft ? 'gold' : 'roof') : 'slate';
      const roofLight = known ? (region.aloft ? 'goldLight' : 'roofLight') : 'slate';
      const wall = known ? (region.aloft ? 'cloud' : 'wallLight') : 'slateDark';

      g.fillStyle(hex('ink'), 1);
      g.fillRect(region.x - 10, region.y - 8, 20, 15);
      g.fillStyle(hex(wall), 1);
      g.fillRect(region.x - 9, region.y - 1, 18, 7);
      g.fillStyle(hex(roof), 1);
      g.fillRect(region.x - 9, region.y - 7, 18, 6);
      g.fillStyle(hex(roofLight), 1);
      g.fillRect(region.x - 9, region.y - 7, 18, 2);

      // Door and windows, so it reads as buildings and not a box.
      g.fillStyle(hex('ink'), 0.75);
      g.fillRect(region.x - 1, region.y + 2, 3, 4);
      g.fillRect(region.x - 6, region.y + 1, 2, 2);
      g.fillRect(region.x + 5, region.y + 1, 2, 2);

      if (isHere) {
        g.fillStyle(hex('goldLight'), 1);
        g.fillRect(region.x - 11, region.y - 9, 22, 1);
        g.fillRect(region.x - 11, region.y + 7, 22, 1);
        g.fillRect(region.x - 11, region.y - 9, 1, 17);
        g.fillRect(region.x + 10, region.y - 9, 1, 17);
      }

      if (region.gym) this.drawGymBadge(g, region, known);
      this.drawLabel(region, known, isHere);
    }
  }

  /**
   * The badge marker that says "there is a gym here", drawn with the same
   * routine as the reward popup so a cleared gym shows the exact badge you won.
   */
  drawGymBadge(g, region, known) {
    const cleared = region.token && gameState.tokens.includes(region.token);
    drawBadge(g, region.x + 12, region.y - 10, 7, {
      token: region.token,
      locked: !cleared,
      dim: !known,
    });
  }

  /**
   * Labels sit where the region's `labelDy` puts them - above or below the
   * town - because at 320px the long names collide if they all sit below.
   */
  drawLabel(region, known, isHere) {
    const y = region.y + (region.labelDy ?? 12);
    const label = this.add
      .text(region.x, y, region.name,
        textStyle({ color: isHere ? 'goldLight' : (known ? 'white' : 'mist'), bold: true }))
      .setOrigin(0.5, 0)
      .setDepth(5);

    if (label.x - label.width / 2 < 3) label.setX(3 + label.width / 2);
    if (label.x + label.width / 2 > VIEW_W - 3) label.setX(VIEW_W - 3 - label.width / 2);

    const plate = this.add.graphics().setDepth(4);
    plate.fillStyle(hex('ink'), 0.72);
    plate.fillRect(label.x - label.width / 2 - 3, y + 1, label.width + 6, 9);
    if (isHere) {
      plate.fillStyle(hex('gold'), 1);
      plate.fillRect(label.x - label.width / 2 - 3, y + 10, label.width + 6, 1);
    }
  }

  /** The "you are here" pin, bouncing so the eye finds it immediately. */
  drawPin() {
    const g = this.add.graphics().setDepth(20);

    // Teardrop head with a stem, drawn a good clear of the roofline.
    g.fillStyle(hex('ink'), 1);
    g.fillRect(-5, -15, 10, 11);
    g.fillRect(-3, -4, 6, 2);
    g.fillRect(-1, -2, 2, 3);
    g.fillStyle(hex('gold'), 1);
    g.fillRect(-4, -14, 8, 9);
    g.fillRect(-2, -5, 4, 1);
    g.fillStyle(hex('goldLight'), 1);
    g.fillRect(-4, -14, 8, 3);
    g.fillStyle(hex('ink'), 1);
    g.fillRect(-2, -11, 4, 4);
    g.fillStyle(hex('goldLight'), 1);
    g.fillRect(-1, -10, 2, 2);

    g.setPosition(this.here.x, this.here.y);
    this.tweens.add({
      targets: g,
      y: this.here.y - 4,
      duration: 520,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  /* ---------------------------------------------------------------- */
  /* Header, footer, legend                                            */
  /* ---------------------------------------------------------------- */

  drawChrome() {
    const g = this.add.graphics().setDepth(10);

    g.fillStyle(hex('ink'), 0.88);
    g.fillRect(0, 0, VIEW_W, HEADER_H);
    g.fillStyle(hex('gold'), 1);
    g.fillRect(0, HEADER_H - 1, VIEW_W, 1);

    this.add
      .text(8, HEADER_H / 2, 'REGION MAP', textStyle({ color: 'gold', bold: true }))
      .setOrigin(0, 0.5)
      .setDepth(11);

    const where = this.here.region
      ? this.here.region.name
      : (this.here.leg?.label ?? 'ON THE ROAD').toUpperCase();
    this.add
      .text(VIEW_W - 8, HEADER_H / 2, where, textStyle({ color: 'paper' }))
      .setOrigin(1, 0.5)
      .setDepth(11);

    g.fillStyle(hex('ink'), 0.88);
    g.fillRect(0, FOOTER_Y, VIEW_W, VIEW_H - FOOTER_Y);
    g.fillStyle(hex('slateDark'), 1);
    g.fillRect(0, FOOTER_Y, VIEW_W, 1);

    const theme = this.here.region?.theme
      ?? (this.here.leg ? ROUTE_BLURB[this.here.leg.kind] : 'Travelling between towns');
    this.add
      .text(8, FOOTER_Y + 7, theme, textStyle({ color: 'mist' }))
      .setOrigin(0, 0.5)
      .setDepth(11);

    this.add
      .text(VIEW_W - 8, FOOTER_Y + 7, `${gameState.tokens.length}/5 TOKENS`,
        textStyle({ color: 'gold', bold: true }))
      .setOrigin(1, 0.5)
      .setDepth(11);

    // A small card naming the current town's gym.
    const region = this.here.region;
    if (region?.gym) {
      const cleared = region.token && gameState.tokens.includes(region.token);
      const card = this.add.graphics().setDepth(12);
      const text = `${region.gym}${cleared ? '  CLEARED' : ''}`;
      const label = this.add
        .text(0, 0, text, textStyle({ color: cleared ? 'gold' : 'paper' }))
        .setDepth(13);
      const w = Math.ceil(label.width) + 14;
      const x = 6;
      const y = HEADER_H + 5;
      drawPanel(card, x, y, w, 15, { fill: 'shadow', border: cleared ? 'gold' : 'slate' });
      label.setPosition(x + 7, y + 7).setOrigin(0, 0.5);
    }
  }

  close() {
    this.scene.resume('Town');
    this.scene.stop();
  }
}
