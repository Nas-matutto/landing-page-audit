/**
 * What stacking AppSumo codes unlocks. The live values are set in the app's
 * Admin → AppSumo tab and served by app.talktomedata.com/api/appsumo/tiers,
 * which is what the app enforces; loadAppsumoTiers() reads them (refreshed
 * every 5 minutes). APPSUMO_TIERS below are the launch values, used only if
 * that endpoint can't be reached.
 */
export interface AppsumoTier {
  codes: number
  price: number
  readyMade: number
  actions: number
  agents: number
}

export const APPSUMO_TIERS: AppsumoTier[] = [
  { codes: 1, price: 40, readyMade: 3, actions: 450, agents: 0 },
  { codes: 2, price: 80, readyMade: 4, actions: 900, agents: 1 },
  { codes: 3, price: 120, readyMade: 5, actions: 1350, agents: 2 },
  { codes: 4, price: 160, readyMade: 5, actions: 1800, agents: 2 },
]

export const APPSUMO_MAX_CODES = 4

const TIERS_URL = "https://app.talktomedata.com/api/appsumo/tiers"
const REFRESH_SECONDS = 300

const whole = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v >= 0

/** Server only. The tiers as set in the app, or the launch values if it can't be reached. */
export async function loadAppsumoTiers(): Promise<AppsumoTier[]> {
  try {
    const res = await fetch(TIERS_URL, { next: { revalidate: REFRESH_SECONDS } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as { tiers?: unknown }
    const rows = Array.isArray(data.tiers) ? (data.tiers as Partial<AppsumoTier>[]) : []
    return APPSUMO_TIERS.map(fallback => {
      const t = rows.find(r => r?.codes === fallback.codes)
      return t && whole(t.price) && whole(t.readyMade) && whole(t.actions) && whole(t.agents)
        ? { codes: fallback.codes, price: t.price, readyMade: t.readyMade, actions: t.actions, agents: t.agents }
        : fallback
    })
  } catch (err) {
    console.error("[appsumo] tiers fetch failed, using launch values", err)
    return APPSUMO_TIERS
  }
}

export function appsumoTier(codes: number, tiers: AppsumoTier[] = APPSUMO_TIERS): AppsumoTier {
  return tiers[Math.min(Math.max(codes, 1), APPSUMO_MAX_CODES) - 1]
}
