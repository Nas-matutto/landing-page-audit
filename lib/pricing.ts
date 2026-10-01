/**
 * Public pricing, as sold on /pricing.
 *
 * ⚠️ Mirrors the app's billing page (app-TTDM: lib/constants.ts → PLAN_TIERS,
 * SOCIAL_PLAN_LIMITS, SEO_PLAN_LIMITS; components/dashboard/billing-actions.tsx).
 * The app enforces the limits; this file only describes them. Change both
 * together.
 *
 * One action ≈ one cent of the work an agent does (AI writing, tool calls,
 * data pulls), rounded up. Typical costs are from app-TTDM lib/usage.ts.
 */

export type PlanId = "starter" | "solo" | "grow" | "scale"
export type Lens = "social" | "seo" | "custom"

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

export const LENSES: { id: Lens; title: string; short: string; body: string }[] = [
  {
    id: "social",
    title: "Social Media Manager",
    short: "Social media",
    body: "Analyses your Instagram, TikTok, YouTube and Facebook, tracks competitors, plans your posts and posts them to Instagram for you.",
  },
  {
    id: "seo",
    title: "SEO & GEO Manager",
    short: "SEO & GEO",
    body: "Reads your Google Search Console, checks your site, tracks whether ChatGPT, Gemini and Claude recommend you, and fixes what's holding you back.",
  },
  {
    id: "custom",
    title: "Custom agents",
    short: "Custom agents",
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

/**
 * A typical month on each paid plan, as shares of its actions. The numbers
 * use the typical costs above (a finished post ~12, a weekly analysis ~30 an
 * account a month, an AI-visibility search 15 × 2 checks a month, a fix ~5,
 * a blog post ~15); whatever is left is "left over".
 */
export const SAMPLE_MONTHS: Record<Lens, Record<Exclude<PlanId, "starter">, { label: string; actions: number }[]>> = {
  social: {
    solo: [
      { label: "10 posts designed", actions: 120 },
      { label: "Weekly analysis, 1 account", actions: 30 },
    ],
    grow: [
      { label: "20 posts built and posted", actions: 240 },
      { label: "Weekly analysis, 2 accounts", actions: 60 },
    ],
    scale: [
      { label: "40 posts built and posted", actions: 480 },
      { label: "Weekly analysis, 4 accounts", actions: 120 },
    ],
  },
  seo: {
    solo: [
      { label: "AI-visibility checks", actions: 90 },
      { label: "10 ready-to-paste fixes", actions: 50 },
      { label: "2 blog posts", actions: 30 },
    ],
    grow: [
      { label: "AI-visibility checks", actions: 180 },
      { label: "10 ready-to-paste fixes", actions: 50 },
      { label: "2 blog posts", actions: 30 },
    ],
    scale: [
      { label: "AI-visibility checks, 3 sites", actions: 360 },
      { label: "20 ready-to-paste fixes", actions: 100 },
      { label: "6 blog posts", actions: 90 },
    ],
  },
  custom: {
    solo: [
      { label: "12 jobs you hand it", actions: 120 },
      { label: "40 quick questions", actions: 80 },
    ],
    grow: [
      { label: "A scheduled job every day", actions: 300 },
      { label: "50 quick questions", actions: 100 },
    ],
    scale: [
      { label: "2 scheduled jobs every day", actions: 600 },
      { label: "100 quick questions", actions: 200 },
    ],
  },
}
