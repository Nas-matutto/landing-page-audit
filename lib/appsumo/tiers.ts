/**
 * What stacking AppSumo codes unlocks. The app enforces these
 * (app-TTDM lib/constants.ts → APPSUMO_TIERS); this copy is only for showing
 * them on /redeem, so keep the two in step.
 */
export const APPSUMO_TIERS = [
  { codes: 1, price: 30, readyMade: 2, actions: 450, agents: 0 },
  { codes: 2, price: 60, readyMade: 3, actions: 1000, agents: 1 },
  { codes: 3, price: 90, readyMade: 4, actions: 1700, agents: 2 },
  { codes: 4, price: 120, readyMade: 5, actions: 2500, agents: 3 },
] as const

export const APPSUMO_MAX_CODES = APPSUMO_TIERS.length

export type AppsumoTier = (typeof APPSUMO_TIERS)[number]

export function appsumoTier(codes: number): AppsumoTier {
  return APPSUMO_TIERS[Math.min(Math.max(codes, 1), APPSUMO_MAX_CODES) - 1]
}
