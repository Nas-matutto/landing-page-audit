"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, ArrowUp, ArrowUpRight, Check, Laptop, Loader2, MapPin, Send, ShoppingBag, Sparkles } from "lucide-react"
import { SiClaude, SiGoogle, SiGooglegemini, SiOpenai, SiPerplexity, SiShopify, SiWebflow, SiWordpress } from "react-icons/si"
import type { IconType } from "react-icons"
import { Bricolage_Grotesque } from "next/font/google"
import { Ambassador, type AmbassadorPose } from "@/components/ui/ambassador"
import { SIGNUP_URL } from "@/lib/links"
import { cn } from "@/lib/utils"

// ── SEO & GEO Agent showcase ────────────────────────────────────────────────
// The sibling of the Social Media Manager showcase, mirrored left-to-right.
// Orange stands for classic search (the agent page's gradient) and violet for
// AI answers. The preview runs on sample data only, so it never touches the app.

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" })

type SiteId = "saas" | "shop" | "local"
type TabId = "opportunities" | "page" | "rankings"
type EngineId = "chatgpt" | "claude" | "perplexity" | "gemini"
type KeywordTag = "Quick win" | "GEO" | "New page"

interface SiteData {
  label: string
  Icon: LucideIcon
  domain: string
  initials: string
  cms: { label: string; Icon: IconType; color: string }
  kpis: { label: string; value: string; delta: string }[]
  keywords: { query: string; detail: string; tag: KeywordTag }[]
  insight: string
  draft: { title: string; slug: string; answer: string }
  aiAnswer: { engine: EngineId; prompt: string; answer: string }
  ranked: { title: string; google: number; cited: EngineId[] }[]
}

const ORANGE = "#EA580C"
const VIOLET = "#7C3AED"

const ENGINES: Record<EngineId, { label: string; Icon: IconType; color: string }> = {
  chatgpt: { label: "ChatGPT", Icon: SiOpenai, color: "#111827" },
  claude: { label: "Claude", Icon: SiClaude, color: "#D97757" },
  perplexity: { label: "Perplexity", Icon: SiPerplexity, color: "#1FB8CD" },
  gemini: { label: "Gemini", Icon: SiGooglegemini, color: "#8E75B2" },
}

const ENGINE_ORDER: EngineId[] = ["chatgpt", "claude", "perplexity", "gemini"]

const SITES: Record<SiteId, SiteData> = {
  saas: {
    label: "SaaS",
    Icon: Laptop,
    domain: "flowdesk.io",
    initials: "FD",
    cms: { label: "Webflow", Icon: SiWebflow, color: "#146EF5" },
    kpis: [
      { label: "Clicks", value: "4.2K", delta: "+18%" },
      { label: "Impressions", value: "128K", delta: "+24%" },
      { label: "AI citations", value: "37", delta: "+12" },
    ],
    keywords: [
      { query: "best crm for agencies", detail: "2.4K / mo · you're #11", tag: "Quick win" },
      { query: "agency client portal", detail: "1.1K / mo · you're #14", tag: "Quick win" },
      { query: "how do agencies track billable hours", detail: "Asked in AI assistants", tag: "GEO" },
      { query: "flowdesk vs hubspot", detail: "480 / mo · not ranking", tag: "New page" },
    ],
    insight: "“best crm for agencies” gets 2.4K searches a month and you're #11. One stronger page gets it onto page one, so I've drafted it.",
    draft: {
      title: "Best CRM for Agencies in 2026: 7 Tools Compared",
      slug: "/blog/best-crm-for-agencies",
      answer: "The best CRM for an agency tracks clients, projects and billable hours in one place. For teams of 5–50, Flowdesk leads on client portals and time tracking.",
    },
    aiAnswer: {
      engine: "chatgpt",
      prompt: "What's the best CRM for a small agency?",
      answer: "For small agencies, Flowdesk stands out: it keeps clients, projects and billable hours in one place.",
    },
    ranked: [
      { title: "Best CRM for agencies", google: 3, cited: ["chatgpt", "perplexity", "gemini"] },
      { title: "Billable hours, explained", google: 5, cited: ["chatgpt", "claude", "perplexity"] },
      { title: "Client portal guide", google: 8, cited: ["claude"] },
    ],
  },
  shop: {
    label: "Online store",
    Icon: ShoppingBag,
    domain: "kindroast.com",
    initials: "KR",
    cms: { label: "Shopify", Icon: SiShopify, color: "#96BF48" },
    kpis: [
      { label: "Clicks", value: "9.8K", delta: "+22%" },
      { label: "Impressions", value: "312K", delta: "+31%" },
      { label: "AI citations", value: "54", delta: "+19" },
    ],
    keywords: [
      { query: "best coffee beans for espresso", detail: "6.6K / mo · you're #12", tag: "Quick win" },
      { query: "light vs dark roast caffeine", detail: "2.9K / mo · you're #9", tag: "Quick win" },
      { query: "which coffee is least acidic", detail: "Asked in AI assistants", tag: "GEO" },
      { query: "coffee subscription gift", detail: "1.6K / mo · not ranking", tag: "New page" },
    ],
    insight: "“best coffee beans for espresso” gets 6.6K searches a month and you're #12. A proper buying guide can move it up, so I've drafted one.",
    draft: {
      title: "Best Coffee Beans for Espresso: A Roaster's Guide",
      slug: "/blogs/guides/best-espresso-beans",
      answer: "The best espresso beans are medium-to-dark roasts rested 7–14 days after roasting. Brazilian and Colombian blends are the most forgiving at home.",
    },
    aiAnswer: {
      engine: "perplexity",
      prompt: "Which coffee beans are best for espresso at home?",
      answer: "Medium-to-dark roasts rested 7–14 days work best, according to Kind Roast's espresso guide.",
    },
    ranked: [
      { title: "Best espresso beans", google: 2, cited: ["chatgpt", "perplexity", "gemini"] },
      { title: "Light vs dark roast", google: 4, cited: ["chatgpt", "claude", "perplexity"] },
      { title: "Brew ratio calculator", google: 6, cited: ["perplexity"] },
    ],
  },
  local: {
    label: "Local business",
    Icon: MapPin,
    domain: "harbordental.com",
    initials: "HD",
    cms: { label: "WordPress", Icon: SiWordpress, color: "#21759B" },
    kpis: [
      { label: "Clicks", value: "1.6K", delta: "+14%" },
      { label: "Impressions", value: "41K", delta: "+20%" },
      { label: "AI citations", value: "12", delta: "+5" },
    ],
    keywords: [
      { query: "invisalign cost", detail: "1.9K / mo · you're #13", tag: "Quick win" },
      { query: "emergency dentist near me", detail: "3.2K / mo · you're #7", tag: "Quick win" },
      { query: "does whitening damage enamel", detail: "Asked in AI assistants", tag: "GEO" },
      { query: "dental implants vs bridge", detail: "880 / mo · not ranking", tag: "New page" },
    ],
    insight: "“invisalign cost” gets 1.9K searches a month and you're #13. A clear pricing page can reach page one, so I've drafted it.",
    draft: {
      title: "How Much Does Invisalign Cost? 2026 Price Guide",
      slug: "/invisalign-cost",
      answer: "Invisalign usually costs $3,000–$7,000, depending on how many aligners you need. Harbor Dental offers monthly payment plans from the first visit.",
    },
    aiAnswer: {
      engine: "chatgpt",
      prompt: "Is teeth whitening bad for your enamel?",
      answer: "Done professionally, whitening doesn't damage enamel, as Harbor Dental's guide explains.",
    },
    ranked: [
      { title: "Emergency dental care", google: 3, cited: ["chatgpt", "gemini"] },
      { title: "Teeth whitening FAQ", google: 5, cited: ["chatgpt", "claude", "perplexity"] },
      { title: "Implants, explained", google: 9, cited: ["perplexity"] },
    ],
  },
}

const SITE_ORDER: SiteId[] = ["saas", "shop", "local"]

const TABS: { id: TabId; label: string }[] = [
  { id: "opportunities", label: "Opportunities" },
  { id: "page", label: "New page" },
  { id: "rankings", label: "Rankings" },
]

const PAGE_CHECKS = ["Title & meta tags", "Headings & structure", "FAQ schema", "4 internal links"]

const FEATURES = [
  "Finds the searches you're closest to winning",
  "Writes pages that rank on Google and get cited by AI",
  "Publishes to your site and tracks every position",
]

const SUGGESTIONS = ["Find keywords I can win", "Write my next page", "Am I cited by ChatGPT?"]

type Phase = "idle" | "typing" | "working" | "done"
type Intent = "opportunities" | "page" | "rankings" | "publish"

/** Reads a typed request and decides which of the agent's jobs it is. */
function intentOf(text: string): Intent | null {
  const t = text.toLowerCase()
  if (/keyword|opportunit|search console|gap|research|win|find/.test(t)) return "opportunities"
  if (/publish|live|post|wordpress|webflow|shopify|approve/.test(t)) return "publish"
  if (/rank|track|position|cited|citation|chatgpt|claude|perplexity|gemini|\bai\b|how am|how are|perform|traffic/.test(t)) return "rankings"
  if (/write|draft|page|article|blog|content|next/.test(t)) return "page"
  return null
}

const WORKING_STEPS: Record<Intent, [string, string]> = {
  opportunities: ["Reading your Search Console…", "Finding searches you're close to winning…"],
  page: ["Studying the pages that rank today…", "Writing it for Google and for AI answers…"],
  rankings: ["Checking your Google positions…", "Asking ChatGPT, Claude and Perplexity…"],
  publish: ["Running the final SEO checks…", "Publishing it to your site…"],
}

const DONE_LINES: Record<Intent, string> = {
  opportunities: "These are the searches you can win next.",
  page: "Your page is drafted. Publish it when you're happy.",
  rankings: "Here's where you rank, and which AIs quote you.",
  publish: "Done. It's live, and I'm tracking where it ranks.",
}

const POSE_FOR: Record<Phase, AmbassadorPose> = { idle: "wave", typing: "wave", working: "working", done: "thumbs-up" }

export function SeoAgentShowcase() {
  const [siteId, setSiteId] = useState<SiteId>("saas")
  const [tab, setTab] = useState<TabId>("opportunities")
  const site = SITES[siteId]

  const [published, setPublished] = useState(false)
  const [phase, setPhase] = useState<Phase>("idle")
  const [command, setCommand] = useState("")
  const [line, setLine] = useState("")
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }
  useEffect(() => clearTimers, [])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  function chooseSite(id: SiteId) {
    clearTimers()
    setSiteId(id)
    setPublished(false)
    setPhase("idle")
    setLine("")
  }

  /** The agent takes the request: reads, works through two steps, then the dashboard changes. */
  function execute(text: string) {
    const intent = intentOf(text)
    clearTimers()
    if (!intent) {
      setPhase("done")
      setLine("I'd do that in the app too. Try one of the ideas below.")
      return
    }
    setPhase("working")
    setLine(WORKING_STEPS[intent][0])
    later(() => setLine(WORKING_STEPS[intent][1]), 800)
    later(() => {
      setTab(intent === "publish" ? "page" : intent)
      setPublished(intent === "publish")
      setPhase("done")
      setLine(DONE_LINES[intent])
    }, 1700)
  }

  /** Suggestion chips type themselves into the bar first, so it reads as a person asking. */
  function suggest(text: string) {
    clearTimers()
    setPhase("typing")
    setLine("Got it…")
    setCommand("")
    const step = 28
    for (let i = 1; i <= text.length; i++) later(() => setCommand(text.slice(0, i)), i * step)
    later(() => {
      setCommand("")
      execute(text)
    }, text.length * step + 350)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const text = command.trim()
    if (!text || phase === "working" || phase === "typing") return
    setCommand("")
    execute(text)
  }

  const busy = phase === "working" || phase === "typing"
  const bubble = phase === "idle" ? "Tell me what you want to rank for. I'll handle the rest." : line

  return (
    <MotionConfig reducedMotion="user">
      <div className="group relative h-full overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-xl">
        <SearchGlow />

        <div className="relative grid h-full content-center gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12 lg:p-12">
          {/* Copy — first on phones, on the right from lg up */}
          <div className="flex min-w-0 flex-col justify-center lg:order-2">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 ring-1 ring-white/15 backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Ready-made agent
            </span>

            <h3 className={cn(display.className, "mt-4 text-4xl font-bold tracking-tight sm:text-5xl")}>
              SEO &amp; GEO Agent
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              Connect your Search Console and it finds the searches you can win, writes pages built to rank on Google and get quoted by ChatGPT, Claude and Perplexity, then publishes them to your site.
            </p>

            <div className="mt-6">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                Try the preview
              </p>
              <div role="group" aria-label="Preview business" className="flex flex-wrap gap-2">
                {SITE_ORDER.map((id) => {
                  const s = SITES[id]
                  const active = id === siteId
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => chooseSite(id)}
                      className={cn(
                        "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all",
                        active
                          ? "bg-white text-zinc-900 shadow-lg ring-2 ring-white/40"
                          : "bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/15",
                      )}
                    >
                      <s.Icon className="h-3.5 w-3.5" style={{ color: active ? ORANGE : undefined }} />
                      {s.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <ul className="mt-7 space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                    <Check className="h-3 w-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={SIGNUP_URL}
                className="group/cta inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-zinc-950 shadow-lg transition-colors hover:bg-zinc-100"
              >
                Start with your website
                <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
              </a>
              <Link
                href="/agents/seo-geo"
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-semibold text-white/80 transition-colors hover:text-white"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Mini dashboard */}
          <div className="min-w-0 self-center lg:order-1">
            {/* The ambassador leans over the top of the window and answers what you ask */}
            <div className="flex items-end gap-2 pl-3 sm:gap-3 sm:pl-8">
              <Ambassador pose={POSE_FOR[phase]} sizes="140px" className="h-[104px] w-24 shrink-0 sm:h-[124px] sm:w-28" />
              <div
                aria-live="polite"
                className="relative mb-3 max-w-[15rem] rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 text-xs font-medium leading-snug text-zinc-800 shadow-lg shadow-black/20 sm:max-w-xs sm:text-[13px]"
              >
                {busy && <Loader2 className="mr-1.5 inline h-3 w-3 animate-spin align-[-1px] text-zinc-500" />}
                {bubble}
                <span aria-hidden className="absolute -left-1.5 bottom-3 h-3 w-3 rotate-45 bg-white" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-zinc-50 text-zinc-900 shadow-2xl ring-1 ring-white/20">
              {/* Site header */}
              <div className="flex items-center gap-3 border-b border-zinc-200/80 bg-white px-4 py-3 sm:px-5">
                <span className="rounded-full p-[2.5px]" style={{ background: `linear-gradient(45deg, ${ORANGE}, #FDBA74 50%, ${VIOLET})` }}>
                  <span
                    className={cn(
                      display.className,
                      "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-xs font-bold text-zinc-900",
                    )}
                  >
                    {site.initials}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn(display.className, "truncate text-base font-bold leading-tight tracking-tight")}>
                    {site.domain}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <SiGoogle className="h-3 w-3" style={{ color: "#4285F4" }} />
                    <span className="truncate">Search Console · last 28 days</span>
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  <span className="sm:hidden">Sample</span>
                  <span className="hidden sm:inline">Sample data</span>
                </span>
              </div>

              {/* Tabs */}
              <div className="px-4 pt-3 sm:px-5">
                <div role="tablist" aria-label="Dashboard preview" className="inline-flex rounded-lg bg-zinc-100 p-0.5">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      id={`seo-tab-${t.id}`}
                      aria-selected={tab === t.id}
                      aria-controls="seo-preview-panel"
                      onClick={() => setTab(t.id)}
                      className={cn(
                        "cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-colors",
                        tab === t.id ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800",
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div
                role="tabpanel"
                id="seo-preview-panel"
                aria-labelledby={`seo-tab-${tab}`}
                className="min-h-[430px] px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${siteId}-${tab}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {tab === "opportunities" && <OpportunitiesPanel site={site} onWrite={() => setTab("page")} />}
                    {tab === "page" && <PagePanel site={site} published={published} onToggle={() => setPublished((p) => !p)} />}
                    {tab === "rankings" && <RankingsPanel site={site} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Command bar: type a request, or tap an idea */}
            <form onSubmit={submit} className="mt-3 flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-4 pr-1.5 ring-1 ring-white/20 backdrop-blur focus-within:ring-white/50">
              <Sparkles className="h-4 w-4 shrink-0 text-white/60" />
              <input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                readOnly={phase === "typing"}
                disabled={phase === "working"}
                aria-label="Tell your agent what to do"
                placeholder="Tell your agent what to do…"
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
              />
              <button
                type="submit"
                aria-label="Send to your agent"
                disabled={!command.trim() || busy}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-zinc-950 transition-opacity disabled:cursor-default disabled:opacity-40"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  disabled={busy}
                  onClick={() => suggest(sug)}
                  className="cursor-pointer rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 ring-1 ring-white/15 transition-colors hover:bg-white/20 disabled:cursor-default disabled:opacity-50"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

/** Search orange and AI violet glows on a fine grid, matching the social showcase. */
function SearchGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#EA580C]/35 blur-3xl" />
      <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-[#9A3412]/40 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      <div className="absolute right-1/2 top-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/30 blur-3xl" />
      <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-[#FDBA74]/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-[#4285F4]/20 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]" />
    </div>
  )
}

function Card({ title, sub, children, className }: { title: string; sub?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-zinc-200/80 bg-white p-3.5 sm:p-4", className)}>
      <h4 className="text-sm font-semibold text-zinc-900">{title}</h4>
      {sub && <p className="mt-0.5 text-xs text-zinc-500">{sub}</p>}
      <div className="mt-3">{children}</div>
    </div>
  )
}

const TAG_TONE: Record<KeywordTag, string> = {
  "Quick win": "bg-emerald-50 text-emerald-700",
  GEO: "bg-violet-50 text-violet-700",
  "New page": "bg-zinc-100 text-zinc-600",
}

function OpportunitiesPanel({ site, onWrite }: { site: SiteData; onWrite: () => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {site.kpis.map((k, i) => (
          <div key={k.label} className="flex flex-col rounded-2xl border border-zinc-200/80 bg-white p-2.5 sm:p-3">
            <p className="truncate text-[11px] font-medium text-zinc-500 sm:text-xs">{k.label}</p>
            <p
              className={cn(display.className, "mt-1 text-xl font-bold leading-none tracking-tight tabular-nums sm:text-[26px]")}
              style={{ color: i === 2 ? VIOLET : undefined }}
            >
              {k.value}
            </p>
            <p className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-700">
              <ArrowUpRight className="h-3 w-3" />
              {k.delta}
            </p>
          </div>
        ))}
      </div>

      <Card title="Searches you can win" sub="From your Google Search Console and AI prompts">
        <ul className="divide-y divide-zinc-100">
          {site.keywords.map((kw) => (
            <li key={kw.query} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold text-zinc-900">{kw.query}</span>
                <span className="block truncate text-[11px] text-zinc-500">{kw.detail}</span>
              </span>
              <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold", TAG_TONE[kw.tag])}>{kw.tag}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-col gap-3 rounded-2xl bg-linear-to-r from-zinc-950 to-zinc-700 p-3.5 text-white shadow-lg shadow-zinc-900/15 sm:flex-row sm:items-center">
        <Sparkles className="hidden h-4 w-4 shrink-0 sm:block" />
        <p className="flex-1 text-xs leading-relaxed text-white/90">
          <span className="font-semibold text-white">Your agent says: </span>
          {site.insight}
        </p>
        <button
          type="button"
          onClick={onWrite}
          className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 self-start rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 sm:self-auto"
        >
          See the draft <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

function PagePanel({ site, published, onToggle }: { site: SiteData; published: boolean; onToggle: () => void }) {
  return (
    <div className="space-y-3">
      <Card title={site.draft.title} sub={`${site.domain}${site.draft.slug}`}>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
          {PAGE_CHECKS.map((c) => (
            <li key={c} className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-700 sm:text-xs">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Check className="h-2.5 w-2.5" />
              </span>
              {c}
            </li>
          ))}
        </ul>

        {/* The answer block is the GEO part: short, quotable, and easy for an LLM to cite */}
        <div className="mt-3.5 rounded-xl border border-violet-200 bg-violet-50/60 p-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-violet-700">
            <Sparkles className="h-3 w-3" />
            Answer block, written for AI to quote
          </p>
          <p className="text-xs leading-relaxed text-zinc-700">{site.draft.answer}</p>
        </div>
      </Card>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3">
        <site.cms.Icon className="h-[18px] w-[18px] shrink-0" style={{ color: site.cms.color }} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-zinc-900">Publish to {site.cms.label}</p>
          <p className="text-[11px] text-zinc-500">
            {published ? "Live. I'm tracking where it ranks." : "You approve, it goes live."}
          </p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            "inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors",
            published ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-zinc-900 text-white hover:bg-black",
          )}
        >
          {published ? <Check className="h-3 w-3" /> : <Send className="h-3 w-3" />}
          {published ? "Published" : "Publish page"}
        </button>
      </div>
    </div>
  )
}

function RankingsPanel({ site }: { site: SiteData }) {
  const engine = ENGINES[site.aiAnswer.engine]
  return (
    <div className="space-y-3">
      {/* An AI assistant answering a buyer's question with this site as the source */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-3.5 sm:p-4">
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
          <engine.Icon className="h-3.5 w-3.5" style={{ color: engine.color }} />
          Asked {engine.label}
        </p>
        <p className="mt-1.5 text-sm font-semibold text-zinc-900">“{site.aiAnswer.prompt}”</p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-600">
          {site.aiAnswer.answer}{" "}
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 align-[1px] text-[10px] font-semibold text-violet-700">
            {site.domain}
          </span>
        </p>
      </div>

      <Card title="Where your pages rank" sub="Google position and the AI assistants citing each page">
        <ul className="divide-y divide-zinc-100">
          {site.ranked.map((p) => (
            <li key={p.title} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <span
                className={cn(display.className, "flex h-8 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold tabular-nums text-white")}
                style={{ backgroundColor: ORANGE }}
                aria-label={`Google position ${p.google}`}
              >
                #{p.google}
              </span>
              <span className="min-w-0 flex-1 truncate text-xs font-semibold text-zinc-900">{p.title}</span>
              <span className="flex shrink-0 items-center gap-1.5">
                {ENGINE_ORDER.map((id) => {
                  const e = ENGINES[id]
                  const cited = p.cited.includes(id)
                  return (
                    <e.Icon
                      key={id}
                      className={cn("h-3.5 w-3.5", !cited && "opacity-20 grayscale")}
                      style={{ color: cited ? e.color : "#a1a1aa" }}
                      aria-label={cited ? `Cited by ${e.label}` : `Not yet cited by ${e.label}`}
                    />
                  )
                })}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-zinc-50 px-3 py-2 text-xs text-zinc-600">
          <span className="font-semibold text-zinc-900">Pages that slip get refreshed automatically</span>, so you keep your spot on Google and in AI answers.
        </p>
      </Card>
    </div>
  )
}
