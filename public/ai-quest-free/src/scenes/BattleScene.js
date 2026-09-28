/**
 * The trivia battle.
 *
 * Runs as its own scene launched over a paused TownScene, drawing on the same
 * canvas at the same pixel scale, so the battle never looks like a web page
 * bolted onto a game.
 *
 * Flow, as an explicit state machine:
 *
 *   INTRO -> QUESTION -> AWAIT -> RESOLVE -> CHECK -+-> QUESTION
 *                                                   +-> WIN | LOSE -> RETURN
 *
 * Input is only accepted in AWAIT and in the states that wait for a keypress,
 * so mashing cannot double-answer or skip a question.
 */

import { npcById } from '../data/npcs.js';
import { ACTOR_ROW } from '../data/tileIndex.js';
import { idleFrame } from '../systems/actors.js';
import { gameState, expToNext } from '../systems/gameState.js';
import { pickQuestions } from '../systems/questionPool.js';
import { drawPanel, drawBar, drawBackdrop, hpColour, textStyle } from '../ui/theme.js';
import { hex } from '../data/palette.js';
import { VIEW_W, VIEW_H } from '../config.js';

/*
 * Layout, all in the 320x180 base resolution. Panel x/w values keep at
 * least ~18px from the true left/right edge - the mobile hero frame crops a
 * modest strip there (Scale.ENVELOP, see main.js) rather than letterboxing,
 * and anything closer than that was losing its first or last character.
 * Sprite positions (foeSprite/youSprite) don't need the same margin - they
 * sit well clear of the crop already, and a partly-cropped sprite is a far
 * smaller loss than clipped text.
 */
const L = {
  stageH: 74,
  foePanel: { x: 18, y: 4, w: 150, h: 26 },
  youPanel: { x: 152, y: 46, w: 150, h: 26 },
  foeSprite: { x: 252, y: 24 },
  youSprite: { x: 60, y: 52 },
  question: { x: 18, y: 76, w: 284, h: 34 },
  optionsY: 112,
  optionH: 15,
  optionGap: 1,
  result: { x: 18, y: 112, w: 284, h: 63 },
};

const SPRITE_SCALE = 2.5;
const STATES = {
  INTRO: 'INTRO',
  QUESTION: 'QUESTION',
  AWAIT: 'AWAIT',
  RESOLVE: 'RESOLVE',
  DONE: 'DONE',
};

const CONFIRM_CODES = new Set(['Space', 'Enter', 'NumpadEnter', 'KeyE']);
const NUMBER_CODES = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Numpad1: 0, Numpad2: 1, Numpad3: 2, Numpad4: 3 };

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  init(data) {
    this.npc = npcById(data.npcId);
    this.cfg = this.npc.battle;

    this.questions = pickQuestions(this.cfg.mix, gameState.usedQuestions);
    this.qIndex = 0;
    this.selected = 0;
    this.won = false;
    /** Correct answers this battle - the overworld turns these into EXP. */
    this.correctCount = 0;

    // Levelling shows up here: every level is flat extra health, so a player
    // who cleared the town can absorb one more mistake from the Warden.
    const youHp = gameState.playerMaxHp(this.cfg.playerHp);
    this.hp = { you: youHp, foe: this.cfg.opponentHp };
    // Displayed values, tweened separately so the bars drain smoothly.
    this.shownHp = { you: youHp, foe: this.cfg.opponentHp };
    this.maxHp = { you: youHp, foe: this.cfg.opponentHp };

    this.state = STATES.INTRO;
  }

  create() {
    this.buildBackdrop();
    this.buildCombatants();
    this.buildPanels();
    this.buildOptions();
    this.buildResult();

    this.input.keyboard.on('keydown', this.onKeyDown, this);

    // Touch: the answer rows are already tappable, so the only thing left is
    // advancing the result and the win/lose card. A tap anywhere does that.
    this.input.on('pointerdown', this.onPointerDown, this);

    this.events.once('shutdown', () => {
      this.input.keyboard.off('keydown', this.onKeyDown, this);
      this.input.off('pointerdown', this.onPointerDown, this);
    });

    this.cameras.main.fadeIn(180, 13, 15, 24);
    this.runIntro();
  }

  /* ---------------------------------------------------------------- */
  /* Construction                                                      */
  /* ---------------------------------------------------------------- */

  buildBackdrop() {
    // Fully opaque: the paused TownScene underneath is still being rendered.
    const g = this.add.graphics().setDepth(0);
    drawBackdrop(g, VIEW_W, VIEW_H);

    // Sky band, haze, then ground - a horizon rather than two flat blocks.
    g.fillStyle(hex('slateDark'), 1);
    g.fillRect(0, 0, VIEW_W, L.stageH);
    g.fillStyle(hex('slate'), 0.75);
    g.fillRect(0, 26, VIEW_W, 18);
    g.fillStyle(hex('mist'), 0.18);
    g.fillRect(0, 40, VIEW_W, 4);
    g.fillStyle(hex('grassDark'), 1);
    g.fillRect(0, 44, VIEW_W, L.stageH - 44);
    g.fillStyle(hex('grass'), 1);
    g.fillRect(0, 44, VIEW_W, 2);
    g.fillStyle(hex('ink'), 0.22);
    g.fillRect(0, L.stageH - 2, VIEW_W, 2);

    // Two ground ellipses so the fighters are standing on something.
    g.fillStyle(hex('grassDark'), 1);
    g.fillEllipse(L.foeSprite.x, L.foeSprite.y + 24, 60, 14);
    g.fillEllipse(L.youSprite.x, L.youSprite.y + 24, 66, 16);
    g.fillStyle(hex('grass'), 1);
    g.fillEllipse(L.foeSprite.x, L.foeSprite.y + 23, 56, 11);
    g.fillEllipse(L.youSprite.x, L.youSprite.y + 23, 62, 13);
  }

  buildCombatants() {
    // The opponent faces the player; the player is seen from behind.
    this.foe = this.add
      .sprite(L.foeSprite.x + 60, L.foeSprite.y, 'actors', idleFrame(ACTOR_ROW[this.npc.sprite], 'down'))
      .setScale(SPRITE_SCALE)
      .setDepth(10);

    this.you = this.add
      .sprite(L.youSprite.x - 60, L.youSprite.y, 'actors', idleFrame(ACTOR_ROW.player, 'up'))
      .setScale(SPRITE_SCALE)
      .setDepth(10);
  }

  buildPanels() {
    this.panelG = this.add.graphics().setDepth(20);
    this.barG = this.add.graphics().setDepth(21);

    const foe = L.foePanel;
    const you = L.youPanel;

    this.panelG.clear();
    drawPanel(this.panelG, foe.x, foe.y, foe.w, foe.h);
    drawPanel(this.panelG, you.x, you.y, you.w, you.h);

    this.foeName = this.add
      .text(foe.x + 5, foe.y + 4, this.npc.name, textStyle({ color: 'paper' }))
      .setDepth(22);

    this.counter = this.add
      .text(foe.x + foe.w - 5, foe.y + 4, '', textStyle({ color: 'gold' }))
      .setOrigin(1, 0)
      .setDepth(22);

    this.youName = this.add
      .text(you.x + 5, you.y + 4, `YOU  Lv${gameState.level}`, textStyle({ color: 'paper' }))
      .setDepth(22);

    this.youHpText = this.add
      .text(you.x + you.w - 5, you.y + 4, '', textStyle({ color: 'mist' }))
      .setOrigin(1, 0)
      .setDepth(22);

    this.questionG = this.add.graphics().setDepth(20);
    this.questionG.clear();
    drawPanel(this.questionG, L.question.x, L.question.y, L.question.w, L.question.h);

    this.questionText = this.add
      .text(
        L.question.x + 6, L.question.y + 5, '',
        textStyle({ color: 'white', wrap: L.question.w - 14 }),
      )
      .setDepth(22);

    this.drawHp();
  }

  buildOptions() {
    this.optionG = this.add.graphics().setDepth(20);
    this.optionTexts = [];
    this.optionZones = [];

    for (let i = 0; i < 4; i++) {
      const y = L.optionsY + i * (L.optionH + L.optionGap);

      // Centred vertically with origin 0.5: positioning by the top edge leaves
      // the glyphs sitting on the bottom border once Text padding is added in.
      this.optionTexts.push(
        this.add
          .text(L.result.x + 16, y + Math.round(L.optionH / 2), '', textStyle({ color: 'paper' }))
          .setOrigin(0, 0.5)
          .setDepth(22),
      );

      const zone = this.add
        .rectangle(L.result.x, y, L.result.w, L.optionH)
        .setOrigin(0, 0)
        .setInteractive({ useHandCursor: true })
        .setFillStyle(0x000000, 0)
        .setDepth(23);

      zone.on('pointerover', () => {
        if (this.state === STATES.AWAIT) this.setSelected(i);
      });
      zone.on('pointerdown', () => {
        if (this.state === STATES.AWAIT) this.answer(i);
      });

      this.optionZones.push(zone);
    }
  }

  buildResult() {
    this.resultG = this.add.graphics().setDepth(24);
    this.resultTitle = this.add
      .text(L.result.x + 8, L.result.y + 11, '', textStyle({ size: 8, bold: true }))
      .setOrigin(0, 0.5)
      .setDepth(25);
    this.resultBody = this.add
      .text(L.result.x + 8, L.result.y + 22, '', textStyle({ color: 'paper', wrap: L.result.w - 16 }))
      .setDepth(25);
    // The hint lives on the title row: the EXP meter needs the bottom strip.
    this.resultHint = this.add
      .text(L.result.x + L.result.w - 8, L.result.y + 11, '', textStyle({ color: 'mist' }))
      .setOrigin(1, 0.5)
      .setDepth(25);

    this.buildExpMeter();
    this.setResultVisible(false);
  }

  /**
   * The EXP meter, shown on the win/lose card and filled right there so the
   * reward lands while the player is still looking at the fight they just had.
   */
  buildExpMeter() {
    const y = L.result.y + L.result.h - 14;
    this.expG = this.add.graphics().setDepth(25);

    this.expLevelText = this.add
      .text(L.result.x + 8, y + 4, '', textStyle({ color: 'goldLight', bold: true }))
      .setOrigin(0, 0.5)
      .setDepth(26);

    this.expGainText = this.add
      .text(L.result.x + L.result.w - 8, y + 4, '', textStyle({ color: 'correct', bold: true }))
      .setOrigin(1, 0.5)
      .setDepth(26);

    this.expBar = { x: L.result.x + 42, y, w: L.result.w - 116, h: 8 };
    this.setExpVisible(false);
  }

  setExpVisible(on) {
    this.expVisible = on;
    this.expG.setVisible(on);
    this.expLevelText.setVisible(on);
    this.expGainText.setVisible(on);
    if (!on) this.expG.clear();
  }

  /**
   * Bank the EXP and animate the bar toward it, rolling over as many levels as
   * it covers. Replaying the whole gain from the starting point each frame is
   * what makes multi-level gains work without any special casing.
   */
  awardExp(won) {
    const gained = gameState.expFor({
      correct: this.correctCount,
      won,
      isBoss: this.npc.isBoss,
      bonus: this.cfg.winBonus,
    });

    const from = { level: gameState.level, exp: gameState.exp };
    this.levelsGained = gameState.addExp(gained);
    this.expGained = gained;

    this.expGainText.setText(gained > 0 ? `+${gained} EXP` : 'NO EXP');
    this.setExpVisible(true);

    const shown = { t: 0 };
    let lastLevel = from.level;
    const paint = () => {
      let level = from.level;
      let exp = from.exp + shown.t;
      while (exp >= expToNext(level)) {
        exp -= expToNext(level);
        level += 1;
      }
      if (level !== lastLevel) {
        lastLevel = level;
        this.cameras.main.flash(140, 255, 236, 170);
      }
      this.expLevelText.setText(`Lv ${level}`);
      this.drawExpBar(exp / expToNext(level), level > from.level);
    };

    paint();
    if (gained <= 0) return;

    this.tweens.add({
      targets: shown,
      t: gained,
      duration: Math.min(1500, 420 + gained * 6),
      delay: 260,
      ease: 'Sine.easeOut',
      onUpdate: paint,
      onComplete: paint,
    });
  }

  drawExpBar(ratio, levelled) {
    const b = this.expBar;
    this.expG.clear();
    if (!this.expVisible) return;
    drawBar(this.expG, b.x, b.y, b.w, b.h, ratio, levelled ? 'goldLight' : 'waterLight');
  }

  /* ---------------------------------------------------------------- */
  /* States                                                            */
  /* ---------------------------------------------------------------- */

  runIntro() {
    this.state = STATES.INTRO;
    this.setOptionsVisible(false);
    this.questionText.setText(`${this.npc.name} wants to compare notes!`);
    this.counter.setText('');

    // Both fighters slide in from off-stage.
    this.tweens.add({ targets: this.foe, x: L.foeSprite.x, duration: 420, ease: 'Back.easeOut' });
    this.tweens.add({
      targets: this.you,
      x: L.youSprite.x,
      duration: 420,
      ease: 'Back.easeOut',
      onComplete: () => this.time.delayedCall(520, () => this.nextQuestion()),
    });
  }

  nextQuestion() {
    if (this.qIndex >= this.questions.length) {
      this.finishOnExhaustion();
      return;
    }

    this.state = STATES.QUESTION;
    const q = this.questions[this.qIndex];
    gameState.usedQuestions.add(q.id);

    this.counter.setText(`${this.qIndex + 1}/${this.questions.length}`);
    this.questionText.setText(q.question);

    this.setResultVisible(false);
    this.setOptionsVisible(true);
    this.selected = 0;
    q.options.forEach((opt, i) => this.optionTexts[i].setText(`${i + 1}. ${opt}`));
    this.drawOptions();

    // A short beat so the options do not appear under a key still being held.
    this.time.delayedCall(120, () => {
      if (this.state === STATES.QUESTION) this.state = STATES.AWAIT;
    });
  }

  answer(choice) {
    if (this.state !== STATES.AWAIT) return;
    this.state = STATES.RESOLVE;

    const q = this.questions[this.qIndex];
    const correct = choice === q.answer;

    this.chosen = choice;
    this.correctIndex = q.answer;
    this.resultReady = false;
    this.drawOptions();

    gameState.recordAnswer(correct);
    if (correct) this.correctCount += 1;

    if (correct) {
      this.hp.foe = Math.max(0, this.hp.foe - this.cfg.hitDamage);
      this.hitEffect(this.foe, 'foe', this.cfg.hitDamage);
    } else {
      this.hp.you = Math.max(0, this.hp.you - this.cfg.missDamage);
      this.hitEffect(this.you, 'you', this.cfg.missDamage);
    }

    // Hold on the marked-up options for a beat so the player can see which one
    // was right before the explanation covers them. Confirm skips the wait.
    this.revealTimer = this.time.delayedCall(750, () => this.showResult(correct, q));
    this.pendingResult = { correct, q };
  }

  /** Jump straight to the explanation instead of waiting out the reveal. */
  revealResultNow() {
    if (!this.pendingResult) return;
    this.revealTimer?.remove();
    this.revealTimer = null;
    const { correct, q } = this.pendingResult;
    this.showResult(correct, q);
  }

  /** White flash, a shove, a floating damage number, and the bar draining. */
  hitEffect(sprite, side, damage) {
    const home = side === 'foe' ? L.foeSprite.x : L.youSprite.x;

    sprite.setTintFill(0xffffff);
    this.time.delayedCall(90, () => sprite.clearTint());

    this.tweens.add({
      targets: sprite,
      x: home + (side === 'foe' ? 6 : -6),
      duration: 60,
      yoyo: true,
      repeat: 1,
      onComplete: () => sprite.setX(home),
    });

    this.cameras.main.shake(160, 0.004);

    const label = this.add
      .text(sprite.x, sprite.y - 18, `-${damage}`, textStyle({ color: side === 'foe' ? 'gold' : 'wrong', bold: true }))
      .setOrigin(0.5, 0.5)
      .setDepth(30);
    this.tweens.add({
      targets: label,
      y: sprite.y - 34,
      alpha: 0,
      duration: 700,
      onComplete: () => label.destroy(),
    });

    this.tweens.add({
      targets: this.shownHp,
      [side]: this.hp[side],
      duration: 420,
      ease: 'Sine.easeOut',
      onUpdate: () => this.drawHp(),
      onComplete: () => this.drawHp(),
    });
  }

  showResult(correct, q) {
    this.pendingResult = null;
    this.revealTimer = null;
    this.resultReady = true;
    this.setOptionsVisible(false);
    this.setResultVisible(true);
    this.setExpVisible(false);

    this.resultG.clear();
    drawPanel(this.resultG, L.result.x, L.result.y, L.result.w, L.result.h, {
      fill: 'shadow',
      border: correct ? 'correct' : 'wrong',
    });

    this.resultTitle
      .setColor(correct ? '#5fbf6a' : '#d9534f')
      .setText(correct ? 'CORRECT' : 'NOT QUITE');

    const body = correct
      ? q.explain
      : `Answer: ${q.options[q.answer]}\n${q.explain}`;
    this.resultBody.setText(body);
    this.resultHint.setText('SPACE');
  }

  /** Confirm pressed on the result panel. */
  continueAfterResult() {
    this.qIndex += 1;

    if (this.hp.foe <= 0) return this.finish(true);
    if (this.hp.you <= 0) return this.finish(false);
    if (this.qIndex >= this.questions.length) return this.finishOnExhaustion();

    this.nextQuestion();
    return undefined;
  }

  /**
   * Questions ran out with both sides standing: whoever has more health left
   * takes it, and the player wins a dead heat.
   */
  finishOnExhaustion() {
    const youRatio = this.hp.you / this.maxHp.you;
    const foeRatio = this.hp.foe / this.maxHp.foe;
    this.finish(youRatio >= foeRatio);
  }

  finish(won) {
    this.state = STATES.DONE;
    this.won = won;
    this.setOptionsVisible(false);
    this.setResultVisible(true);

    const loser = won ? this.foe : this.you;
    this.tweens.add({ targets: loser, alpha: 0.35, angle: won ? 12 : -12, duration: 450 });

    this.resultG.clear();
    drawPanel(this.resultG, L.result.x, L.result.y, L.result.w, L.result.h, {
      fill: 'shadow',
      border: won ? 'gold' : 'slate',
    });

    this.resultTitle
      .setColor(colourOf(won ? 'gold' : 'mist'))
      .setText(won ? 'YOU WIN' : 'YOU LOSE');
    this.resultBody.setText(
      won
        ? `${this.npc.name} concedes the point.`
        : `${this.npc.name} takes this one. Walk back over and retry.`,
    );
    this.resultHint.setText('SPACE');
    this.questionText.setText(won ? 'Well argued.' : 'Better luck next round.');

    // Bank and animate the EXP here rather than back in the overworld, so the
    // bar fills while the player is still looking at the fight.
    this.awardExp(won);
  }

  returnToTown() {
    this.cameras.main.fadeOut(180, 13, 15, 24);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.resume('Town', {
        npcId: this.npc.id,
        won: this.won,
        correct: this.correctCount,
        // EXP was banked in finish(); the overworld only needs to know whether
        // to celebrate, so it must not award anything a second time.
        levelsGained: this.levelsGained ?? [],
        expGained: this.expGained ?? 0,
      });
      this.scene.stop();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Input                                                             */
  /* ---------------------------------------------------------------- */

  onKeyDown(event) {
    if (this.state === STATES.AWAIT) {
      const direct = NUMBER_CODES[event.code];
      if (direct !== undefined) {
        if (direct < this.questions[this.qIndex].options.length) this.answer(direct);
        return;
      }
      if (event.code === 'ArrowUp' || event.code === 'KeyW') return this.setSelected(this.selected - 1);
      if (event.code === 'ArrowDown' || event.code === 'KeyS') return this.setSelected(this.selected + 1);
      if (CONFIRM_CODES.has(event.code)) {
        event.preventDefault?.();
        return this.answer(this.selected);
      }
      return undefined;
    }

    if (!CONFIRM_CODES.has(event.code)) return undefined;
    event.preventDefault?.();

    if (this.state === STATES.RESOLVE) {
      // First confirm skips the reveal pause, the next one moves on - the same
      // two-step rhythm as the overworld dialogue's typewriter.
      if (!this.resultReady) return this.revealResultNow();
      return this.continueAfterResult();
    }
    if (this.state === STATES.DONE) return this.returnToTown();
    return undefined;
  }

  /** Tap anywhere to move past a result. AWAIT is left to the option rows. */
  onPointerDown() {
    if (this.state === STATES.RESOLVE) {
      if (!this.resultReady) this.revealResultNow();
      else this.continueAfterResult();
      return;
    }
    if (this.state === STATES.DONE) this.returnToTown();
  }

  setSelected(index) {
    this.selected = Phaser.Math.Wrap(index, 0, 4);
    this.drawOptions();
  }

  /* ---------------------------------------------------------------- */
  /* Drawing                                                           */
  /* ---------------------------------------------------------------- */

  drawHp() {
    const foe = L.foePanel;
    const you = L.youPanel;

    const foeRatio = Phaser.Math.Clamp(this.shownHp.foe / this.maxHp.foe, 0, 1);
    const youRatio = Phaser.Math.Clamp(this.shownHp.you / this.maxHp.you, 0, 1);

    this.barG.clear();
    drawBar(this.barG, foe.x + 5, foe.y + 16, foe.w - 10, 7, foeRatio, hpColour(foeRatio));
    drawBar(this.barG, you.x + 5, you.y + 16, you.w - 10, 7, youRatio, hpColour(youRatio));

    this.youHpText?.setText(`${Math.max(0, Math.round(this.shownHp.you))}`);
  }

  drawOptions() {
    this.optionG.clear();
    if (!this.optionsVisible) return;

    for (let i = 0; i < 4; i++) {
      const y = L.optionsY + i * (L.optionH + L.optionGap);

      let fill = 'shadow';
      let border = 'slate';
      let textColour = 'paper';

      if (this.state === STATES.RESOLVE) {
        if (i === this.correctIndex) { fill = 'correct'; border = 'white'; textColour = 'ink'; }
        else if (i === this.chosen) { fill = 'wrong'; border = 'white'; textColour = 'ink'; }
      } else if (i === this.selected) {
        fill = 'slateDark';
        border = 'gold';
        textColour = 'white';
      }

      drawPanel(this.optionG, L.result.x, y, L.result.w, L.optionH, { fill, border });
      this.optionTexts[i].setColor(colourOf(textColour));

      if (i === this.selected && this.state !== STATES.RESOLVE) {
        // Solid triangle pointing right: each column one pixel shorter.
        this.optionG.fillStyle(hex('gold'), 1);
        for (let col = 0; col < 4; col++) {
          this.optionG.fillRect(L.result.x + 6 + col, y + 4 + col, 1, 7 - col * 2);
        }
      }
    }
  }

  setOptionsVisible(on) {
    this.optionsVisible = on;
    this.optionTexts.forEach((t) => t.setVisible(on));
    this.optionZones.forEach((z) => z.setVisible(on));
    this.drawOptions();
  }

  setResultVisible(on) {
    this.resultG.setVisible(on);
    this.resultTitle.setVisible(on);
    this.resultBody.setVisible(on);
    this.resultHint.setVisible(on);
    if (!on) {
      this.resultG.clear();
      this.setExpVisible(false);
    }
  }
}

/** Palette key -> css string, for Text.setColor. */
function colourOf(key) {
  return `#${hex(key).toString(16).padStart(6, '0')}`;
}
