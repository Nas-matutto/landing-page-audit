/**
 * Public pricing, as sold on /pricing.
 *
 * ⚠️ Mirrors the app's billing page (app-TTDM: lib/constants.ts → PLAN_TIERS,
 * SOCIAL_PLAN_LIMITS, SEO_PLAN_LIMITS, WEBSITE_PLAN_LIMITS;
 * components/dashboard/billing-actions.tsx).
 * The app enforces the limits; this file only describes them. Change both
 * together.
 *
 * One action ≈ one cent of the work an agent does (AI writing, tool calls,
 * data pulls), rounded up. Typical costs are from app-TTDM lib/usage.ts.
 */

export type PlanId = "starter" | "solo" | "grow" | "scale"
export type Lens = "social" | "seo" | "website" | "custom"

export interface Plan {
  id: PlanId
  name: string
  price: number
  actions: number
  description: string
  highlight?: string
}

export const PLANS: Plan[] = [
  { id: "starter", name: "Starter", price: 0, actions: 100, description: "Start a ready-made agent and see it work. No card required." },
  { id: "solo", name: "Solo", price: 49, actions: 240, description: "For one person growing a brand, with agents that plan and follow up for you." },
  { id: "grow", name: "Grow", price: 99, actions: 480, description: "For a business running several agents across its workflows.", highlight: "Most popular" },
  { id: "scale", name: "Scale", price: 199, actions: 960, description: "For teams automating across the whole company." },
]

export const LENSES: { id: Lens; title: string; short: string; tiny: string; body: string }[] = [
  {
    id: "social",
    title: "Social Media Manager",
    short: "Social media",
    tiny: "Social",
    body: "Analyses your Instagram, TikTok, YouTube and Facebook, tracks competitors, plans your posts and posts them to Instagram for you.",
  },
  {
    id: "seo",
    title: "SEO & GEO Manager",
    short: "SEO & GEO",
    tiny: "SEO",
    body: "Reads your Google Search Console, checks your site, tracks whether ChatGPT, Gemini and Claude recommend you, and fixes what's holding you back.",
  },
  {
    id: "website",
    title: "Website Manager",
    short: "Website",
    tiny: "Website",
    body: "Connects to your website through GitHub or WordPress, shows it to you live, and makes the changes you ask for in plain English.",
  },
  {
    id: "custom",
    title: "Custom agents",
    short: "Custom agents",
    tiny: "Custom",
    body: "Agents we build with you for your own workflows: email, sheets, CRM and more.",
  },
]

/** A plan, described for one kind of agent: what the agent does for you, then the limits. */
export interface LensPlan {
  /** The line the card leads with: what the agent does on your behalf. */
  role: string
  /** Show the Instagram mark beside the role. */
  instagram?: boolean
  does: string[]
  limits: string[]
}

const actions = (p: Plan) => `${p.actions.toLocaleString("en-US")} actions / month`

/**
 * Website Manager changes a month (app-TTDM WEBSITE_PLAN_LIMITS). Changes don't
 * use actions: this count is their only limit. The actions are for talking to
 * the agent. Undo is free and never counted.
 */
export const WEBSITE_CHANGES: Record<PlanId, number> = { starter: 3, solo: 25, grow: 100, scale: 250 }
const changesLine = (p: Plan) => `${WEBSITE_CHANGES[p.id]} changes a month`
const websiteLimits = (p: Plan) => [changesLine(p), `${actions(p)} for questions`, "1 website", "GitHub or WordPress, connected free"]

export const LENS_PLANS: Record<Lens, Record<PlanId, LensPlan>> = {
  social: {
    starter: {
      role: "Analyses your account",
      does: ["Your agent's analysis and charts", "What to post next"],
      limits: [actions(PLANS[0]), "1 social account", "Competitor preview", "Refresh once a week", "Your last 10 posts"],
    },
    solo: {
      role: "Plans and designs your posts",
      does: ["Designs 10 posts a month", "Posts 5 of them to Instagram for you", "Hooks, post kits and a content plan", "Reminders and a weekly digest"],
      limits: [actions(PLANS[1]), "4 social accounts", "Track 3 competitors", "Automatic weekly refresh", "Keeps your last 50 posts"],
    },
    grow: {
      role: "Builds, schedules and posts to Instagram for you",
      instagram: true,
      does: ["Builds and schedules 20 posts a month", "Posts every one to Instagram for you, at your best times", "Everything in Solo"],
      limits: [actions(PLANS[2]), "6 social accounts", "Track 6 competitors", "Automatic weekly refresh", "Keeps your last 100 posts"],
    },
    scale: {
      role: "Runs your Instagram on autopilot",
      instagram: true,
      does: ["Builds and schedules 40 posts a month", "Posts every one to Instagram for you, across all 10 accounts", "Everything in Grow"],
      limits: [actions(PLANS[3]), "10 social accounts", "Track 10 competitors", "Automatic weekly refresh", "Keeps your last 250 posts"],
    },
  },
  seo: {
    starter: {
      role: "Checks your site",
      does: ["Your agent's analysis and charts", "One free check of whether AI assistants recommend you"],
      limits: [actions(PLANS[0]), "1 website", "Google Search Console, connected free", "Site check up to 25 pages", "Your last 3 months"],
    },
    solo: {
      role: "Finds what to fix and writes the fixes",
      does: ["Ready-to-paste fixes and an Action Plan", "Publishes fixes to your site when you say go", "Checks if ChatGPT, Gemini & Claude recommend you"],
      limits: [actions(PLANS[1]), "1 website", "Google Search Console, connected free", "Site check up to 100 pages, weekly", "Keeps 2 years of history"],
    },
    grow: {
      role: "Watches your site and acts for you",
      does: [
        "Alerts you the moment your traffic drops",
        "A weekly email with your numbers and the next best move",
        "Checks if ChatGPT, Gemini & Claude recommend you, on 2× the searches",
        "Everything in Solo",
      ],
      limits: [actions(PLANS[2]), "1 website", "Google Search Console, connected free", "Site check up to 250 pages, weekly", "Keeps 3 years of history"],
    },
    scale: {
      role: "Runs your SEO across up to 3 websites",
      does: ["Everything in Grow, on every site", "Checks up to 1,000 pages a week", "Checks if ChatGPT, Gemini & Claude recommend you, on 4× the searches"],
      limits: [actions(PLANS[3]), "Up to 3 websites", "Google Search Console, connected free", "Site check up to 1,000 pages, weekly", "Keeps 5 years of history"],
    },
  },
  website: {
    starter: {
      role: "Makes changes to your website",
      does: ["Your site, live, on desktop and phone", `${changesLine(PLANS[0])}, made and put live for you`, "Undo any change in one click"],
      limits: websiteLimits(PLANS[0]),
    },
    solo: {
      role: "Your on-call web developer",
      does: [`${changesLine(PLANS[1])}, made and put live for you`, "New pages, sections, wording and design", "Live in minutes, with one-click undo"],
      limits: websiteLimits(PLANS[1]),
    },
    grow: {
      role: "Keeps your website moving every week",
      does: [`${changesLine(PLANS[2])}, made and put live for you`, "New pages, sections, wording and design", "Live in minutes, with one-click undo", "Everything in Solo"],
      limits: websiteLimits(PLANS[2]),
    },
    scale: {
      role: "Runs your website day to day",
      does: [`${changesLine(PLANS[3])}, made and put live for you`, "New pages, sections, wording and design", "Live in minutes, with one-click undo", "Everything in Solo"],
      limits: websiteLimits(PLANS[3]),
    },
  },
  custom: {
    starter: {
      role: "Try a ready-made agent",
      does: ["Ready-made agents", "Custom agents from Solo"],
      limits: [actions(PLANS[0]), "1 agent"],
    },
    solo: {
      role: "Does the jobs you give it",
      does: ["Built with you in a free kickoff session", "Connect your tools: email, sheets, CRM and more", "Priority support"],
      limits: [actions(PLANS[1]), "1 custom agent"],
    },
    grow: {
      role: "Works proactively, without being asked",
      does: ["Runs on its own schedule and gets the work done", "Everything in Solo"],
      limits: [actions(PLANS[2]), "Up to 2 custom agents"],
    },
    scale: {
      role: "Runs your workflows end to end",
      does: ["Several agents working proactively across your tools", "Everything in Grow"],
      limits: [actions(PLANS[3]), "Up to 4 custom agents"],
    },
  },
}

export const AI_NATIVE_FEATURES = [
  { title: "Unlimited agents and actions", body: "No caps and no meter to watch." },
  { title: "Built and run for you", body: "We design, build and look after every agent." },
  { title: "Custom integrations", body: "Your own systems, data and internal tools." },
  { title: "A dedicated AI team", body: "People who know your business, on call." },
]

// ── What counts as an action ────────────────────────────────────────────────

export interface ActionExample {
  what: string
  cost?: string
}

export const ACTION_GUIDE: Record<Lens, { free: ActionExample[]; small: ActionExample[]; big: ActionExample[] }> = {
  social: {
    free: [{ what: "Posting to Instagram for you" }, { what: "Editing captions and slides" }, { what: "Your dashboard and charts" }],
    small: [
      { what: "Pulling an account's latest posts", cost: "1–4" },
      { what: "A quick question to your agent", cost: "~2" },
      { what: "A new cover image", cost: "4" },
      { what: "A ready-to-film post kit", cost: "~5" },
      { what: "Your weekly analysis of an account", cost: "~6" },
    ],
    big: [
      { what: "A finished post, from idea to designed", cost: "~11" },
      { what: "Finding competitors in your niche", cost: "10–15" },
    ],
  },
  seo: {
    free: [{ what: "Reading your Google Search Console" }, { what: "Checking your pages and site speed" }, { what: "Your dashboard and charts" }],
    small: [
      { what: "A quick question to your agent", cost: "~2" },
      { what: "A ready-to-paste fix, like new page titles", cost: "~5" },
    ],
    big: [
      { what: "Checking one search on ChatGPT, Gemini & Claude", cost: "up to 15" },
      { what: "Writing a full blog post", cost: "10–20" },
    ],
  },
  website: {
    free: [{ what: "Making a change to your site (counted as a change instead)" }, { what: "The live preview of your site" }, { what: "Undoing a change" }],
    small: [
      { what: "A quick question to your agent", cost: "~2" },
      { what: "Reading a page of your site", cost: "~2" },
    ],
    big: [
      { what: "Reviewing several pages of your site at once", cost: "~10" },
      { what: "Planning a bigger redesign with you", cost: "10–15" },
    ],
  },
  custom: {
    free: [{ what: "Designing your agent with us" }, { what: "Connecting your tools" }],
    small: [
      { what: "Each tool your agent uses, like reading a sheet", cost: "1" },
      { what: "A quick question to your agent", cost: "~2" },
    ],
    big: [
      { what: "Working through your inbox", cost: "10–20" },
      { what: "A research job", cost: "10–20" },
    ],
  },
}

// ── Plan finder ─────────────────────────────────────────────────────────────

/** The limits the plan finder checks against (app-TTDM lib/constants.ts). null = no cap beyond actions. */
export const PLAN_LIMITS: Record<
  PlanId,
  { socialAccounts: number; postsBuilt: number; autoPosts: number | null; websites: number; aiChecks: number; customAgents: number; scheduled: boolean; trafficAlerts: boolean }
> = {
  starter: { socialAccounts: 1, postsBuilt: 0, autoPosts: 0, websites: 1, aiChecks: 0, customAgents: 0, scheduled: false, trafficAlerts: false },
  solo: { socialAccounts: 4, postsBuilt: 10, autoPosts: 5, websites: 1, aiChecks: 90, customAgents: 1, scheduled: false, trafficAlerts: false },
  grow: { socialAccounts: 6, postsBuilt: 20, autoPosts: null, websites: 1, aiChecks: 180, customAgents: 2, scheduled: true, trafficAlerts: true },
  scale: { socialAccounts: 10, postsBuilt: 40, autoPosts: null, websites: 3, aiChecks: 360, customAgents: 4, scheduled: true, trafficAlerts: true },
}

/**
 * Typical actions, rounded up from the costs above: a finished post ~12, a
 * weekly analysis ~30 an account a month, a fix or page ~8 (fixes ~5, blog
 * posts 10–20), a custom-agent task ~10. AI-visibility checks are per plan
 * (PLAN_LIMITS.aiChecks: its searches × 15 actions × 2 checks a month).
 * Website changes don't use actions; questions to any agent are ~2.
 */
export const TYPICAL = { post: 12, analysis: 30, fix: 8, task: 10, question: 2 }

export interface FinderInput {
  social: { posts: number; accounts: number; autopost: boolean }
  seo: { websites: number; fixes: number; alerts: boolean }
  website: { changes: number; questions: number }
  custom: { agents: number; tasks: number; scheduled: boolean }
}

export const FINDER_DEFAULTS: FinderInput = {
  social: { posts: 0, accounts: 1, autopost: false },
  seo: { websites: 1, fixes: 0, alerts: false },
  website: { changes: 0, questions: 0 },
  custom: { agents: 0, tasks: 0, scheduled: false },
}

export interface Recommendation {
  /** null = more than Scale covers: AI Native. */
  plan: Plan | null
  /** Typical actions this month on the recommended plan. */
  used: number
  /** What the plan gives, against what was asked for. */
  covers: string[]
}

/** Typical monthly actions for these needs on a plan. */
function usage(lens: Lens, input: FinderInput, id: PlanId): number {
  if (lens === "social") return input.social.posts * TYPICAL.post + input.social.accounts * TYPICAL.analysis
  if (lens === "seo") return PLAN_LIMITS[id].aiChecks + input.seo.fixes * TYPICAL.fix
  if (lens === "website") return input.website.questions * TYPICAL.question
  return input.custom.tasks * TYPICAL.task
}

function fits(lens: Lens, input: FinderInput, id: PlanId): boolean {
  const l = PLAN_LIMITS[id]
  const plan = PLANS.find((p) => p.id === id)!
  if (usage(lens, input, id) > plan.actions) return false
  if (lens === "social") {
    const { posts, accounts, autopost } = input.social
    return accounts <= l.socialAccounts && posts <= l.postsBuilt && (!autopost || posts === 0 || l.autoPosts === null || posts <= l.autoPosts)
  }
  if (lens === "seo") {
    const { websites, fixes, alerts } = input.seo
    return websites <= l.websites && (fixes === 0 || id !== "starter") && (!alerts || l.trafficAlerts)
  }
  if (lens === "website") return input.website.changes <= WEBSITE_CHANGES[id]
  const { agents, tasks, scheduled } = input.custom
  return agents <= l.customAgents && (tasks === 0 || agents > 0) && (!scheduled || l.scheduled)
}

function covers(lens: Lens, input: FinderInput, id: PlanId): string[] {
  const l = PLAN_LIMITS[id]
  if (lens === "social") {
    const lines = [`${l.socialAccounts} social ${l.socialAccounts === 1 ? "account" : "accounts"}`]
    if (l.postsBuilt > 0) lines.unshift(`Up to ${l.postsBuilt} posts a month`)
    if (input.social.autopost && l.autoPosts !== 0) lines.push(l.autoPosts === null ? "Posts every one to Instagram for you" : `Posts ${l.autoPosts} a month to Instagram for you`)
    if (l.postsBuilt === 0) lines.push("Your agent's analysis and what to post next")
    return lines
  }
  if (lens === "seo") {
    const lines = [l.websites === 1 ? "1 website" : `Up to ${l.websites} websites`]
    lines.push(id === "starter" ? "Search Console and site checks" : "Ready-to-paste fixes, published when you say go")
    if (l.trafficAlerts) lines.push("Traffic-drop alerts and a weekly email")
    return lines
  }
  if (lens === "website") return ["1 website, live on desktop and phone", `${WEBSITE_CHANGES[id]} changes a month`, "One-click undo, always free"]
  if (id === "starter") return ["A ready-made Social, SEO or Website agent", "Upgrade to Solo for a custom agent"]
  return [`${l.customAgents === 1 ? "1 custom agent" : `Up to ${l.customAgents} custom agents`}`, l.scheduled ? "Runs on its own schedule" : "Runs whenever you ask"]
}

/** The cheapest plan that covers these needs, or AI Native. */
export function recommend(lens: Lens, input: FinderInput): Recommendation {
  for (const plan of PLANS) {
    if (fits(lens, input, plan.id)) return { plan, used: usage(lens, input, plan.id), covers: covers(lens, input, plan.id) }
  }
  return { plan: null, used: usage(lens, input, "scale"), covers: ["Unlimited agents and actions", "Custom integrations", "A dedicated AI team"] }
}
