/**
 * All run state, in memory only. Refreshing the page starts a new run - that
 * is deliberate for a 5-10 minute demo, and it keeps every scene free of
 * persistence concerns.
 */

/* ------------------------------------------------------------------ */
/* Levelling                                                           */
/* ------------------------------------------------------------------ */

/**
 * EXP is awarded per correct answer whether you win or lose, so a bad duel
 * still moves you forward and a rematch never feels wasted. The win bonus is
 * what actually drives progression.
 */
export const EXP_PER_CORRECT = 15;
export const WIN_BONUS = 40;
export const BOSS_WIN_BONUS = 120;

/** Each level adds this much max health in battle - the point of levelling. */
export const HP_PER_LEVEL = 12;

/**
 * EXP needed to leave a given level. Gently rising rather than exponential:
 * a full playthrough earns roughly 530 EXP, which lands the player at Level 5
 * as they finish, so every duel visibly moves the bar.
 */
export function expToNext(level) {
  return 60 + (level - 1) * 40;
}

class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    /** @type {Set<string>} ids of challengers already beaten */
    this.defeated = new Set();
    /** @type {Set<string>} question ids used this run, so nothing repeats */
    this.usedQuestions = new Set();
    /** @type {Set<string>} Workshop drills already seen this run */
    this.usedSequences = new Set();
    /** @type {string[]} gym badges earned, in the order they were won */
    this.tokens = [];
    /**
     * Tool Sigils won from the sailing challengers. Separate from tokens: they
     * are a key to one dock, not a badge, and they never appear on the ending
     * screen's badge row.
     */
    this.sigils = [];
    /** Whether Marin has handed over a boat, which is what makes water walkable. */
    this.hasBoat = false;
    /** Which map the player is on, so a battle can return them to it. */
    this.mapKey = 'town';
    /** Levelling. Everyone starts at Level 1 with an empty bar. */
    this.level = 1;
    this.exp = 0;
    /**
     * Cave puzzle progress, per map: where the boulders are now, and which
     * pits have been bridged. Kept here so leaving a cave and coming back does
     * not undo the puzzle you just solved.
     */
    this.boulders = {};
    this.filledPits = {};
    /**
     * Cloud progress, per map: which one-use clouds have already been stepped
     * off. Same reasoning as the boulders - a crossing you made stays made.
     */
    this.spentClouds = {};
    /** One-shot narration flags. */
    this.seenIntro = false;
    this.seenMap = false;
    this.seenWorkshop = false;
    this.seenSignal = false;
    /** @type {Set<string>} drill pools whose host has already introduced them */
    this.seenDrills = new Set();
    /** @type {Set<string>} map keys whose arrival briefing has already played */
    this.seenBriefings = new Set();
    /**
     * Where the player was standing when the ending fired, so the ending screen
     * can put them back there instead of forcing a restart.
     */
    this.returnSpot = null;
    /**
     * The tile the player is standing on right now, kept current by TownScene
     * so a save can put them back exactly where they were.
     */
    this.spawnAt = null;
    /** Whether the primer cards have been shown for this run. */
    this.seenPrimer = false;
    /**
     * Set once the player reaches the ending. From then on every challenger
     * will take a rematch, so a finished run is somewhere you can keep playing
     * rather than a museum you walk around.
     */
    this.freePlay = false;
    /** Totals for the ending screen. */
    this.answered = 0;
    this.correct = 0;
    this.startedAt = Date.now();
  }

  /* ---------------- saving ---------------- */

  /**
   * A plain JSON-safe copy of the run.
   *
   * Written out field by field rather than by iterating the instance: a save
   * format that silently follows whatever fields happen to exist is a format
   * that breaks the moment someone adds a scratch property.
   */
  snapshot() {
    return {
      defeated: [...this.defeated],
      usedQuestions: [...this.usedQuestions],
      usedSequences: [...this.usedSequences],
      seenDrills: [...this.seenDrills],
      seenBriefings: [...this.seenBriefings],
      tokens: [...this.tokens],
      sigils: [...this.sigils],
      hasBoat: this.hasBoat,
      mapKey: this.mapKey,
      spawnAt: this.spawnAt ? { ...this.spawnAt } : null,
      level: this.level,
      exp: this.exp,
      boulders: mapOfArrays(this.boulders, (b) => ({ x: b.x, y: b.y })),
      filledPits: mapOfArrays(this.filledPits, (s) => s),
      spentClouds: mapOfArrays(this.spentClouds, (s) => s),
      seenIntro: this.seenIntro,
      seenMap: this.seenMap,
      seenWorkshop: this.seenWorkshop,
      seenSignal: this.seenSignal,
      seenPrimer: this.seenPrimer,
      freePlay: this.freePlay,
      answered: this.answered,
      correct: this.correct,
      // Stored as a duration, not a timestamp: a clock reading from a previous
      // session would make the ending screen report days of playtime.
      elapsedMs: Date.now() - this.startedAt,
    };
  }

  /** Apply a snapshot over a fresh run. */
  restore(data) {
    this.reset();

    this.defeated = new Set(data.defeated ?? []);
    this.usedQuestions = new Set(data.usedQuestions ?? []);
    this.usedSequences = new Set(data.usedSequences ?? []);
    this.seenDrills = new Set(data.seenDrills ?? []);
    this.seenBriefings = new Set(data.seenBriefings ?? []);
    this.tokens = [...(data.tokens ?? [])];
    this.sigils = [...(data.sigils ?? [])];
    this.hasBoat = !!data.hasBoat;
    this.mapKey = data.mapKey ?? 'town';
    this.spawnAt = data.spawnAt ? { ...data.spawnAt } : null;
    this.level = data.level ?? 1;
    this.exp = data.exp ?? 0;
    this.boulders = mapOfArrays(data.boulders ?? {}, (b) => ({ x: b.x, y: b.y }));
    this.filledPits = mapOfArrays(data.filledPits ?? {}, (s) => s);
    this.spentClouds = mapOfArrays(data.spentClouds ?? {}, (s) => s);
    this.seenIntro = !!data.seenIntro;
    this.seenMap = !!data.seenMap;
    this.seenWorkshop = !!data.seenWorkshop;
    this.seenSignal = !!data.seenSignal;
    this.seenPrimer = !!data.seenPrimer;
    this.freePlay = !!data.freePlay;
    this.answered = data.answered ?? 0;
    this.correct = data.correct ?? 0;
    this.startedAt = Date.now() - (data.elapsedMs ?? 0);
  }

  /* ---------------- levelling ---------------- */

  /** EXP still needed to reach the next level. */
  expToNext() {
    return expToNext(this.level);
  }

  /**
   * Bank EXP and roll over as many levels as it covers.
   * @returns {number[]} the levels reached, so the caller can announce them
   */
  addExp(amount) {
    this.exp += amount;
    const reached = [];
    while (this.exp >= this.expToNext()) {
      this.exp -= this.expToNext();
      this.level += 1;
      reached.push(this.level);
    }
    return reached;
  }

  /**
   * What a battle should award for a given result.
   *
   * `bonus` lets an NPC override the win bonus - the repeatable practice
   * partner pays for the answers rather than for the win, so grinding it is
   * worth doing but not worth doing forever.
   */
  expFor({ correct, won, isBoss, bonus }) {
    let total = correct * EXP_PER_CORRECT;
    if (won) total += bonus ?? (isBoss ? BOSS_WIN_BONUS : WIN_BONUS);
    return total;
  }

  /** Battle health for the player, including the flat bonus from levelling. */
  playerMaxHp(baseHp) {
    return baseHp + (this.level - 1) * HP_PER_LEVEL;
  }

  isDefeated(id) {
    return this.defeated.has(id);
  }

  markDefeated(id) {
    this.defeated.add(id);
  }

  /** Challengers beaten, excluding the Hall's boss. */
  challengerWins(roster) {
    return roster.filter((n) => !n.isBoss && this.defeated.has(n.id)).length;
  }

  awardToken(name) {
    if (!this.tokens.includes(name)) this.tokens.push(name);
  }

  /** @returns {boolean} true if this sigil is new, so the caller can celebrate */
  awardSigil(name) {
    if (this.sigils.includes(name)) return false;
    this.sigils.push(name);
    return true;
  }

  recordAnswer(wasCorrect) {
    this.answered += 1;
    if (wasCorrect) this.correct += 1;
  }

  /** Elapsed run time as m:ss, for the ending screen. */
  elapsed() {
    const total = Math.floor((Date.now() - this.startedAt) / 1000);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
  }
}

/** Copy a `{ mapKey: [...] }` structure, mapping each element. */
function mapOfArrays(source, mapItem) {
  const out = {};
  for (const [key, list] of Object.entries(source ?? {})) {
    if (Array.isArray(list)) out[key] = list.map(mapItem);
  }
  return out;
}

/** Single shared instance - imported directly by the scenes that need it. */
export const gameState = new GameState();
