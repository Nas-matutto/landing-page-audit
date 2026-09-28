/**
 * Saving a run to the browser.
 *
 * The whole game is client-side with no backend, so "save" means localStorage.
 * That is enough for what it needs to do: survive a page reload, a dev server
 * restart, or closing the tab and coming back.
 *
 * Everything here is wrapped in try/catch. localStorage throws in more
 * situations than people expect - private browsing, a full quota, a page
 * opened over file:// - and none of those are a reason for the game not to
 * run. A failed save just means the run is in memory only, exactly as it was
 * before saving existed.
 */

const KEY = 'ai-quest.save.v1';

/** Bumped when the shape of a snapshot changes; older saves are discarded. */
export const SAVE_VERSION = 1;

function storage() {
  try {
    // Touching localStorage is itself what throws on a blocked origin.
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

/** Whether there is a save worth offering to continue. */
export function hasSave() {
  return readRaw() !== null;
}

function readRaw() {
  const store = storage();
  if (!store) return null;
  try {
    const text = store.getItem(KEY);
    if (!text) return null;
    const data = JSON.parse(text);
    if (!data || data.version !== SAVE_VERSION) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * Write the run out.
 * @returns {boolean} whether it actually landed, so the UI can say so honestly
 */
export function saveGame(state) {
  const store = storage();
  if (!store) return false;
  try {
    store.setItem(KEY, JSON.stringify({
      version: SAVE_VERSION,
      savedAt: Date.now(),
      state: state.snapshot(),
    }));
    return true;
  } catch {
    return false;
  }
}

/**
 * Restore a saved run into the live state object.
 * @returns {boolean} whether anything was loaded
 */
export function loadGame(state) {
  const data = readRaw();
  if (!data?.state) return false;
  try {
    state.restore(data.state);
    return true;
  } catch {
    // A snapshot that will not restore is worse than none: drop it rather
    // than leaving the player with a half-applied run.
    clearSave();
    return false;
  }
}

export function clearSave() {
  const store = storage();
  if (!store) return;
  try {
    store.removeItem(KEY);
  } catch {
    // Nothing sensible to do, and nothing that needs doing.
  }
}

/** A short human description of the save, for the title screen. */
export function saveSummary() {
  const data = readRaw();
  if (!data?.state) return null;
  const s = data.state;
  return {
    level: s.level ?? 1,
    tokens: (s.tokens ?? []).length,
    mapKey: s.mapKey ?? 'town',
  };
}
