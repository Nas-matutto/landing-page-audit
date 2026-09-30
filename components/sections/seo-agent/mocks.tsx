"use client"

import { ArrowDown, ArrowUp, Check, RefreshCw } from "lucide-react"
import { SiClaude, SiGooglegemini, SiOpenai, SiPerplexity, SiWebflow } from "react-icons/si"
import type { IconType } from "react-icons"
import { cn } from "@/lib/utils"

// Panels in the style of the agent's workspace, filled with a sample site
// ("Flowdesk", a SaaS on Webflow). They sit in the same frame the social
// agent page uses for its screenshots.

export const SITE = { domain: "flowdesk.io", cms: "Webflow" }

/** The site's screenshot frame: hairline border on a mist mat, with a title bar. */
export function Frame({ title, meta, children, className }: { title: string; meta?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[26px] border border-hairline bg-mist p-2", className)}>
      <div className="overflow-hidden rounded-[18px] border border-hairline bg-white text-ink">
        <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-5">
          <p className="truncate text-sm font-semibold">{title}</p>
          {meta && <p className="shrink-0 text-[11px] text-quiet">{meta}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}

type EngineId = "chatgpt" | "claude" | "perplexity" | "gemini"

const ENGINES: Record<EngineId, { label: string; Icon: IconType }> = {
  chatgpt: { label: "ChatGPT", Icon: SiOpenai },
  claude: { label: "Claude", Icon: SiClaude },
  perplexity: { label: "Perplexity", Icon: SiPerplexity },
  gemini: { label: "Gemini", Icon: SiGooglegemini },
}

function Delta({ value, down }: { value: string; down?: boolean }) {
  return <span className={cn("text-[11px] font-semibold", down ? "text-rose-600" : "text-emerald-600")}>{value}</span>
}

const TAG_TONES = {
  "Page two": "bg-amber-50 text-amber-700 ring-amber-200",
  "Low CTR": "bg-sky-50 text-sky-700 ring-sky-200",
  "New page": "bg-mist text-ink ring-hairline",
  "AI question": "bg-violet-50 text-violet-700 ring-violet-200",
}

function Tag({ label }: { label: keyof typeof TAG_TONES }) {
  return <span className={cn("inline-flex shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset", TAG_TONES[label])}>{label}</span>
}

// ── Overview (hero) ─────────────────────────────────────────────────────────

const KPIS = [
  { label: "Clicks", value: "4.2K", delta: "+18%" },
  { label: "Impressions", value: "128K", delta: "+24%" },
  { label: "Avg position", value: "8.3", delta: "↑ 2.1" },
  { label: "AI citations", value: "37", delta: "+12" },
]

// Clicks per week over the last quarter, climbing as new pages go live.
const TREND = [22, 24, 23, 27, 26, 31, 30, 35, 39, 38, 44, 49, 53]

function TrendLine() {
  const w = 320
  const h = 70
  const max = Math.max(...TREND)
  const min = Math.min(...TREND)
  const points = TREND.map((v, i) => `${(i / (TREND.length - 1)) * w},${h - 6 - ((v - min) / (max - min)) * (h - 12)}`).join(" ")
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-16 w-full" aria-hidden>
      <polygon points={`0,${h} ${points} ${w},${h}`} className="fill-emerald-500/10" />
      <polyline points={points} fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="stroke-emerald-600" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export function OverviewPanel() {
  return (
    <Frame title={SITE.domain} meta="Google Search Console · last 3 months">
      <div className="grid grid-cols-2 gap-px border-b border-hairline bg-hairline sm:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-white px-4 py-3">
            <p className="text-[11px] text-quiet">{k.label}</p>
            <p className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-lg font-semibold tabular-nums">{k.value}</span>
              <Delta value={k.delta} />
            </p>
          </div>
        ))}
      </div>
      <div className="border-b border-hairline px-4 pb-2 pt-4 sm:px-5">
        <p className="mb-1 text-[11px] font-medium text-quiet">Clicks per week</p>
        <TrendLine />
      </div>
      <div className="px-4 py-3 sm:px-5">
        <p className="mb-2 text-[11px] font-medium text-quiet">Searches you can win next</p>
        <ul className="space-y-2">
          {OPPORTUNITIES.slice(0, 3).map((o) => (
            <li key={o.query} className="flex items-center gap-3 text-[13px]">
              <span className="min-w-0 flex-1 truncate font-medium">{o.query}</span>
              <span className="hidden text-[11px] text-quiet sm:inline">{o.where}</span>
              <Tag label={o.tag} />
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  )
}

// ── Opportunities ───────────────────────────────────────────────────────────

const OPPORTUNITIES: { query: string; where: string; tag: keyof typeof TAG_TONES; upside: string }[] = [
  { query: "best crm for agencies", where: "18.2K impr. · #11", tag: "Page two", upside: "+640 clicks/mo" },
  { query: "agency client portal", where: "9.6K impr. · #14", tag: "Page two", upside: "+310 clicks/mo" },
  { query: "crm pricing for agencies", where: "7.1K impr. · #4 · 1.9% CTR", tag: "Low CTR", upside: "+220 clicks/mo" },
  { query: "how do agencies track billable hours", where: "Asked in AI answers", tag: "AI question", upside: "New page" },
  { query: "flowdesk vs hubspot", where: "2.3K impr. · no page", tag: "New page", upside: "+150 clicks/mo" },
]

export function OpportunitiesPanel() {
  return (
    <Frame title="Opportunities" meta="Ranked by upside ÷ effort">
      <ul className="divide-y divide-hairline">
        {OPPORTUNITIES.map((o, i) => (
          <li key={o.query} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <span className="w-4 shrink-0 font-mono text-[11px] text-faint">{i + 1}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium">{o.query}</span>
              <span className="block truncate text-[11px] text-quiet">{o.where}</span>
            </span>
            <Tag label={o.tag} />
            <span className="hidden w-24 shrink-0 text-right text-[12px] font-semibold tabular-nums sm:block">{o.upside}</span>
          </li>
        ))}
      </ul>
      <p className="border-t border-hairline bg-mist/60 px-4 py-3 text-[12px] leading-relaxed text-quiet sm:px-5">
        <span className="font-semibold text-ink">Verdict:</span> “best crm for agencies” is your biggest win. You&apos;re #11 on 18.2K impressions, so one stronger page gets it onto page one.
      </p>
    </Frame>
  )
}

// ── Weekly report ───────────────────────────────────────────────────────────

const WEEK = [
  { label: "Clicks", now: "1,084", before: "962", delta: "+12.7%" },
  { label: "Impressions", now: "31.4K", before: "28.9K", delta: "+8.7%" },
  { label: "CTR", now: "3.5%", before: "3.3%", delta: "+0.2 pts" },
  { label: "Avg position", now: "8.3", before: "9.1", delta: "↑ 0.8" },
]

const MOVERS = [
  { page: "/blog/billable-hours-explained", change: "#9 → #5", note: "clicks +42%", down: false },
  { page: "/blog/client-portal-guide", change: "#14 → #8", note: "recommended last week", down: false },
  { page: "/pricing", change: "#6 → #8", note: "title refresh queued", down: true },
]

export function ReportPanel() {
  return (
    <Frame title="Weekly report" meta="21 – 27 Sep vs the week before">
      <div className="grid grid-cols-2 gap-px border-b border-hairline bg-hairline sm:grid-cols-4">
        {WEEK.map((k) => (
          <div key={k.label} className="bg-white px-4 py-3">
            <p className="text-[11px] text-quiet">{k.label}</p>
            <p className="mt-0.5 text-lg font-semibold tabular-nums">{k.now}</p>
            <p className="text-[11px] text-faint">
              was {k.before} · <Delta value={k.delta} />
            </p>
          </div>
        ))}
      </div>
      <div className="px-4 py-4 sm:px-5">
        <p className="mb-2 text-[11px] font-medium text-quiet">Top movers</p>
        <ul className="space-y-2">
          {MOVERS.map((m) => (
            <li key={m.page} className="flex items-center gap-2.5 text-[13px]">
              <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full", m.down ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600")}>
                {m.down ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
              </span>
              <span className="min-w-0 flex-1 truncate font-medium">{m.page}</span>
              <span className="shrink-0 font-mono text-[12px] tabular-nums">{m.change}</span>
              <span className="hidden w-36 shrink-0 text-right text-[11px] text-quiet sm:block">{m.note}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-hairline bg-mist/60 px-4 py-3 text-[12px] leading-relaxed text-quiet sm:px-5">
        <span className="font-semibold text-ink">Improving.</span> Last week&apos;s two new pages are climbing. /pricing slipped two places, so its title and intro are being rewritten.
      </p>
    </Frame>
  )
}

// ── New page ────────────────────────────────────────────────────────────────

const OUTLINE = ["What an agency CRM needs to do", "The 7 best CRMs for agencies, compared", "Which CRM is best for a small agency?", "FAQ"]

const CHECKS = ["Title & meta, keyword first", "Question-style headings", "Direct answer up top", "FAQ schema", "4 internal links", "Sources cited"]

export function PagePanel() {
  return (
    <Frame title="New page" meta="Draft · ready to publish">
      <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
        <div>
          <p className="font-mono text-[11px] text-quiet">{SITE.domain}/blog/best-crm-for-agencies</p>
          <p className="mt-1 text-lg font-semibold leading-snug tracking-[-0.01em]">Best CRM for Agencies in 2026: 7 Tools Compared</p>
        </div>
        <div className="rounded-xl border border-violet-200 bg-violet-50/60 px-3.5 py-3">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-violet-700">Direct answer, for AI to quote</p>
          <p className="text-[13px] leading-relaxed">
            The best CRM for an agency tracks clients, projects and billable hours in one place. For teams of 5–50, Flowdesk leads on client portals and time tracking.
          </p>
        </div>
        <ul className="space-y-1.5 border-l border-hairline pl-3.5">
          {OUTLINE.map((h) => (
            <li key={h} className="text-[13px] text-quiet">
              <span className="mr-1.5 font-mono text-[10px] text-faint">H2</span>
              {h}
            </li>
          ))}
        </ul>
      </div>
      <ul className="grid grid-cols-1 gap-x-4 gap-y-2 border-t border-hairline bg-mist/60 px-4 py-3.5 sm:grid-cols-2 sm:px-5">
        {CHECKS.map((c) => (
          <li key={c} className="flex items-center gap-2 text-[12px]">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ink text-white">
              <Check className="h-2.5 w-2.5" />
            </span>
            {c}
          </li>
        ))}
      </ul>
    </Frame>
  )
}

// ── Publishing ──────────────────────────────────────────────────────────────

const QUEUE = [
  { title: "Best CRM for agencies", when: "Published Mon 9:00", status: "Live", tone: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  { title: "How agencies track billable hours", when: "Scheduled Thu 9:00", status: "Scheduled", tone: "bg-sky-50 text-sky-700 ring-sky-200" },
  { title: "Flowdesk vs HubSpot", when: "Waiting for your review", status: "Draft", tone: "bg-amber-50 text-amber-700 ring-amber-200" },
  { title: "/pricing · new title and intro", when: "Update to a live page", status: "Refresh", tone: "bg-mist text-ink ring-hairline" },
]

export function PublishPanel() {
  return (
    <Frame title="Publishing" meta={`Connected to ${SITE.cms}`}>
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-5">
        <span className="flex items-center gap-2 text-[13px] font-medium">
          <SiWebflow className="h-4 w-4 text-[#146EF5]" aria-hidden />
          {SITE.domain}
        </span>
        <span className="flex rounded-full border border-hairline p-0.5 text-[11px] font-semibold">
          <span className="rounded-full px-2.5 py-1 text-quiet">Review first</span>
          <span className="rounded-full bg-ink px-2.5 py-1 text-white">Autopilot</span>
        </span>
      </div>
      <ul className="divide-y divide-hairline">
        {QUEUE.map((q) => (
          <li key={q.title} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium">{q.title}</span>
              <span className="block truncate text-[11px] text-quiet">{q.when}</span>
            </span>
            <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset", q.tone)}>{q.status}</span>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

// ── Rankings & AI citations ─────────────────────────────────────────────────

const RANKED: { title: string; google: number; move: string; down?: boolean; cited: EngineId[] }[] = [
  { title: "Best CRM for agencies", google: 3, move: "↑ 8", cited: ["chatgpt", "perplexity", "gemini"] },
  { title: "Billable hours, explained", google: 5, move: "↑ 4", cited: ["chatgpt", "claude", "perplexity"] },
  { title: "Client portal guide", google: 8, move: "↑ 6", cited: ["claude"] },
  { title: "Pricing", google: 8, move: "↓ 2", down: true, cited: [] },
]

export function RankingsPanel() {
  return (
    <Frame title="Rankings" meta="Google position · cited in AI answers">
      <ul className="divide-y divide-hairline">
        {RANKED.map((r) => (
          <li key={r.title} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{r.title}</span>
            <span className="w-16 shrink-0 text-right">
              <span className="font-mono text-[13px] font-semibold tabular-nums">#{r.google}</span> <Delta value={r.move} down={r.down} />
            </span>
            <span className="flex w-24 shrink-0 items-center justify-end gap-1.5 sm:w-32">
              {r.cited.length ? (
                r.cited.map((id) => {
                  const { label, Icon } = ENGINES[id]
                  return (
                    <span key={id} title={label} className="flex h-6 w-6 items-center justify-center rounded-full border border-hairline">
                      <Icon className="h-3 w-3" aria-label={label} />
                    </span>
                  )
                })
              ) : (
                <span className="flex items-center gap-1 text-[11px] font-medium text-quiet">
                  <RefreshCw className="h-3 w-3" /> Refreshing
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-hairline bg-mist/60 px-4 py-3 text-[12px] leading-relaxed text-quiet sm:px-5">
        Asked “What&apos;s the best CRM for a small agency?”, <span className="font-medium text-ink">ChatGPT</span> quotes your page and links to it.
      </p>
    </Frame>
  )
}
