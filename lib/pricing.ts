/**
 * Public pricing, as sold on /pricing.
 *
 * ⚠️ Mirrors the app's billing page (app-TTDM: lib/constants.ts → PLAN_TIERS,
 * PLAN_RAILS; lib/action-costs.ts → ACTION_CATALOG;
 * components/dashboard/billing-actions.tsx). The app enforces the limits;
 * this file only describes them. Change both together.
 *
 * One meter (Nas, 2026-10-28): every agent's work is paid for in actions.
 * Every pre-built agent is on every plan, Starter too. Plans differ only in
 * actions, how many custom agents you can have, and autopilot (PLAN_RAILS).
 */

import type { PrebuiltAgentId } from "@/lib/prebuilt-agents"

export type PlanId = "starter" | "solo" | "grow" | "scale"

export interface Plan {
  id: PlanId
  name: string
  price: number
  actions: number
  /** Custom agents at once. Pre-built agents never count. */
  customAgents: number
  /** PLAN_RAILS.background + sendEmail: agents work on their own, post and send. */
  autopilot: boolean
  /** What the plan means for you, in one line. */
  role: string
  description: string
  highlight?: string
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    actions: 50,
    customAgents: 0,
    autopilot: false,
    role: "Try every agent",
    description: "Try every pre-built agent and see it work. No card required.",
  },
  {
    id: "solo",
    name: "Solo",
    price: 49,
    actions: 450,
    customAgents: 1,
    autopilot: true,
    role: "Your agents work on their own",
    description: "For one person growing a brand, with agents that plan and follow up for you.",
  },
  {
    id: "grow",
    name: "Grow",
    price: 99,
    actions: 900,
    customAgents: 2,
    autopilot: true,
    role: "Twice the work, every month",
    description: "For a business running several agents across its workflows.",
    highlight: "Most popular",
  },
  {
    id: "scale",
    name: "Scale",
    price: 199,
    actions: 1800,
    customAgents: 4,
    autopilot: true,
    role: "Agents across the whole business",
    description: "For teams putting agents to work across the whole company.",
  },
]

export function customAgentsLabel(n: number): string {
  if (n === 0) return "Custom agents from Solo"
  if (n === 1) return "1 custom agent, built with you"
  return `Up to ${n} custom agents, built with you`
}

/** A plan card's bullets: what's included, then (Starter only) what isn't. */
export function planPoints(plan: Plan): { points: string[]; missing: string[] } {
  const actions = `${plan.actions.toLocaleString("en-US")} actions a month`
  if (!plan.autopilot) {
    return {
      points: [actions, "All 5 pre-built agents", "Your agents work when you ask them"],
      missing: ["No autopilot: nothing runs on its own", "Doesn't post or send emails for you", "No custom agents"],
    }
  }
  return {
    points: [
      actions,
      "All 5 pre-built agents",
      "Autopilot: your agents work on their own",
      "Weekly refreshes, scheduled runs and daily leads",
      "Posts to Instagram and sends your emails",
      customAgentsLabel(plan.customAgents),
    ],
    missing: [],
  }
}

export const AI_NATIVE_FEATURES = [
  { title: "Unlimited agents and actions", body: "No caps and no meter to watch." },
  { title: "Built and run for you", body: "We design, build and look after every agent." },
  { title: "Custom integrations", body: "Your own systems, data and internal tools." },
  { title: "A dedicated AI team", body: "People who know your business, on call." },
]

// ── What counts as an action (app-TTDM lib/action-costs.ts) ─────────────────

export type CostKey = PrebuiltAgentId | "custom"

export interface ActionCost {
  what: string
  /** As shown: "~11", "1–4", "0". */
  cost: string
  /** A single number for the month examples (the middle of the range). */
  typical: number
}

export const ACTION_CATALOG: Record<CostKey, { title: string; costs: ActionCost[] }> = {
  social_manager: {
    title: "Social Media Manager",
    costs: [
      { what: "Pulling an account's latest posts", cost: "1–5", typical: 4 },
      { what: "Your weekly analysis of an account", cost: "~6", typical: 6 },
      { what: "A finished post, from idea to designed", cost: "~11", typical: 11 },
      { what: "Finding competitors in your niche", cost: "10–15", typical: 12 },
      { what: "Posting it to Instagram for you", cost: "0", typical: 0 },
    ],
  },
  seo_manager: {
    title: "SEO & GEO Manager",
    costs: [
      { what: "Reading Search Console and checking your pages", cost: "0", typical: 0 },
      { what: "A ready-to-paste fix, like new page titles", cost: "~5", typical: 5 },
      { what: "Checking one search on ChatGPT, Gemini & Claude", cost: "up to 15", typical: 15 },
      { what: "Writing a full blog post", cost: "10–20", typical: 15 },
    ],
  },
  website_manager: {
    title: "Website Manager",
    costs: [
      { what: "A change to your site, made and put live", cost: "5–15", typical: 7 },
      { what: "Reading a page of your site", cost: "~2", typical: 2 },
      { what: "Undoing a change", cost: "0", typical: 0 },
    ],
  },
  sdr_agent: {
    title: "SDR AI Agent",
    costs: [
      { what: "A lead found, checked and written to", cost: "~4", typical: 4 },
      { what: "Turning your ideal customer into a search", cost: "~1", typical: 1 },
      { what: "Sending an email from your mailbox", cost: "1", typical: 1 },
      { what: "Reading a reply and acting on it", cost: "1", typical: 1 },
    ],
  },
  social_listening: {
    title: "Social Listening",
    costs: [
      { what: "One look across Reddit and X", cost: "~5", typical: 5 },
      { what: "One look on every platform, Facebook search too", cost: "~13", typical: 13 },
      { what: "Redrafting a reply", cost: "~1", typical: 1 },
    ],
  },
  custom: {
    title: "Custom agents",
    costs: [
      { what: "Each tool your agent uses, like reading a sheet", cost: "1", typical: 1 },
      { what: "A quick question to your agent", cost: "~2", typical: 2 },
      { what: "Working through your inbox, or a research job", cost: "10–20", typical: 15 },
    ],
  },
}

/** How many of something an allowance buys, rounded down to a friendly number (app-TTDM howMany). */
export function howMany(actions: number, each: number): number {
  const n = Math.floor(actions / Math.max(1, each))
  return n >= 100 ? Math.floor(n / 10) * 10 : n >= 20 ? Math.floor(n / 5) * 5 : n
}

export const TYPICAL = {
  post: ACTION_CATALOG.social_manager.costs[2].typical,
  lead: ACTION_CATALOG.sdr_agent.costs[0].typical,
  change: ACTION_CATALOG.website_manager.costs[0].typical,
}

/** "≈ 40 finished posts or 110 leads": what a plan's actions buy. */
export function buysLine(actions: number): string {
  return `≈ ${howMany(actions, TYPICAL.post)} finished posts or ${howMany(actions, TYPICAL.lead)} leads`
}

// ── Plan finder ─────────────────────────────────────────────────────────────

/**
 * One slider per kind of work, priced from the catalog above. SEO's "fix or
 * page" averages a fix (~5) and a blog post (~15); a custom-agent task is a
 * mid-sized job (~10).
 */
export interface FinderWork {
  key: CostKey
  label: string
  unit: string
  max: number
  step: number
  each: number
}

export const FINDER_WORK: FinderWork[] = [
  { key: "social_manager", label: "Finished social posts", unit: "posts", max: 60, step: 1, each: TYPICAL.post },
  { key: "seo_manager", label: "SEO fixes and new pages", unit: "fixes", max: 40, step: 1, each: 10 },
  { key: "website_manager", label: "Changes to your website", unit: "changes", max: 100, step: 1, each: TYPICAL.change },
  { key: "sdr_agent", label: "Leads found and written to", unit: "leads", max: 400, step: 10, each: TYPICAL.lead },
  { key: "social_listening", label: "Social listening looks", unit: "looks", max: 60, step: 1, each: ACTION_CATALOG.social_listening.costs[0].typical },
  { key: "custom", label: "Custom agent tasks", unit: "tasks", max: 120, step: 2, each: 10 },
]

export interface FinderInput {
  work: Record<CostKey, number>
  customAgents: number
  autopilot: boolean
}

export const FINDER_DEFAULTS: FinderInput = {
  work: { social_manager: 0, seo_manager: 0, website_manager: 0, sdr_agent: 0, social_listening: 0, custom: 0 },
  customAgents: 0,
  autopilot: false,
}

export interface Recommendation {
  /** null = more than Scale covers: AI Native. */
  plan: Plan | null
  /** Typical actions a month for this work. */
  used: number
}

export function monthlyActions(input: FinderInput): number {
  return FINDER_WORK.reduce((sum, w) => sum + input.work[w.key] * w.each, 0)
}

/** The cheapest plan that covers this work, or AI Native. */
export function recommend(input: FinderInput): Recommendation {
  const used = monthlyActions(input)
  const plan = PLANS.find(
    (p) => used <= p.actions && input.customAgents <= p.customAgents && (!input.autopilot || p.autopilot),
  )
  return { plan: plan ?? null, used }
}
