"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Check, Send, Sparkles } from "lucide-react"
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si"
import type { IconType } from "react-icons"
import { Bricolage_Grotesque } from "next/font/google"
import { SIGNUP_URL } from "@/lib/links"
import { cn } from "@/lib/utils"

// ── Social Media Manager showcase ───────────────────────────────────────────
// Mirrors the agent's look in the app: a dark panel lit by Instagram, TikTok
// and YouTube colours, Bricolage Grotesque for headline numbers, white pills,
// and the dashboard's white cards. The preview runs on sample data only, so it
// never touches the app.

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" })

type PlatformId = "instagram" | "tiktok" | "youtube"
type TabId = "overview" | "hooks" | "plan"

interface PlatformData {
  label: string
  Icon: IconType
  iconColor: string
  handle: string
  followers: string
  primary: string
  ring: string
  kpis: { label: string; value: string; delta: string; spark: number[] }[]
  formats: { label: string; color: string; value: number; display: string }[]
  insight: string
  hooks: { style: string; multiple: number; example: string }[]
  plan: { day: number; time: string; kind: string; title: string }[]
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// Colours match the app's PLATFORM_THEME so each platform reads the same here.
const PLATFORMS: Record<PlatformId, PlatformData> = {
  instagram: {
    label: "Instagram",
    Icon: SiInstagram,
    iconColor: "#DD2A7B",
    handle: "studio.nova",
    followers: "24.8K",
    primary: "#DD2A7B",
    ring: "linear-gradient(45deg, #F58529, #DD2A7B 55%, #8134AF)",
    kpis: [
      { label: "Average views", value: "18.2K", delta: "+12%", spark: [9, 11, 10, 13, 12, 16, 15, 19, 18] },
      { label: "Engagement rate", value: "4.6%", delta: "+0.8pt", spark: [31, 34, 33, 39, 41, 40, 44, 46] },
      { label: "Interactions / post", value: "1.1K", delta: "+9%", spark: [8, 9, 12, 10, 11, 13, 12, 14, 15] },
    ],
    formats: [
      { label: "Carousel", color: "#8134AF", value: 100, display: "1.9K" },
      { label: "Reel", color: "#DD2A7B", value: 68, display: "1.3K" },
      { label: "Image", color: "#D9661A", value: 34, display: "640" },
    ],
    insight: "Carousels earn 2.4× your median. Tuesday 9:00 is your best slot, so I've drafted one for it.",
    hooks: [
      { style: "Result first", multiple: 2.1, example: "“We cut invoice time by 80%”" },
      { style: "Question", multiple: 1.6, example: "“Still posting at random?”" },
      { style: "List / number", multiple: 1.2, example: "“3 mistakes killing your reach”" },
      { style: "Story", multiple: 0.7, example: "“Last year I almost quit…”" },
    ],
    plan: [
      { day: 1, time: "9:00", kind: "Carousel", title: "3 mistakes killing your reach" },
      { day: 3, time: "18:30", kind: "Reel", title: "Behind the scenes" },
      { day: 5, time: "11:00", kind: "Image", title: "Client win" },
    ],
  },
  tiktok: {
    label: "TikTok",
    Icon: SiTiktok,
    iconColor: "#111827",
    handle: "studio.nova",
    followers: "61.2K",
    primary: "#111827",
    ring: "linear-gradient(45deg, #25F4EE, #111827 50%, #FE2C55)",
    kpis: [
      { label: "Average views", value: "42.6K", delta: "+18%", spark: [22, 25, 24, 30, 28, 35, 33, 41, 43] },
      { label: "Engagement rate", value: "7.9%", delta: "+1.2pt", spark: [58, 61, 60, 66, 70, 69, 75, 79] },
      { label: "Interactions / post", value: "3.4K", delta: "+14%", spark: [18, 21, 20, 25, 24, 28, 30, 33, 34] },
    ],
    formats: [
      { label: "Video", color: "#111827", value: 100, display: "3.6K" },
      { label: "Carousel", color: "#FE2C55", value: 61, display: "2.2K" },
      { label: "Image", color: "#0FB5AE", value: 25, display: "900" },
    ],
    insight: "POV videos under 20 seconds beat your median 2.6×. Friday 20:00 is your hottest slot.",
    hooks: [
      { style: "Curiosity gap", multiple: 2.6, example: "“Nobody tells you this about…”" },
      { style: "POV / relatable", multiple: 1.8, example: "“POV: it's Monday and…”" },
      { style: "Warning / mistake", multiple: 1.3, example: "“Stop doing this on camera”" },
      { style: "Trend / meme", multiple: 0.8, example: "“Doing the trend, but…”" },
    ],
    plan: [
      { day: 0, time: "19:00", kind: "Video", title: "POV: your week, planned" },
      { day: 2, time: "12:30", kind: "Video", title: "Nobody tells you this" },
      { day: 4, time: "20:00", kind: "Carousel", title: "5 hooks that always work" },
    ],
  },
  youtube: {
    label: "YouTube",
    Icon: SiYoutube,
    iconColor: "#FF0033",
    handle: "studionova",
    followers: "9.4K",
    primary: "#FF0033",
    ring: "linear-gradient(45deg, #FF0033, #B00020)",
    kpis: [
      { label: "Average views", value: "6.1K", delta: "+7%", spark: [4, 5, 5, 6, 5, 7, 6, 7, 6] },
      { label: "Engagement rate", value: "5.2%", delta: "+0.4pt", spark: [44, 46, 45, 49, 48, 51, 50, 52] },
      { label: "Interactions / post", value: "320", delta: "+5%", spark: [2, 3, 3, 3, 4, 3, 4, 4, 4] },
    ],
    formats: [
      { label: "Short", color: "#282828", value: 100, display: "410" },
      { label: "Video", color: "#FF0033", value: 68, display: "280" },
    ],
    insight: "How-to videos beat your median 1.5× and Shorts reach the most new people. Wednesday 17:00 is your slot.",
    hooks: [
      { style: "Result first", multiple: 1.9, example: "“How I doubled watch time”" },
      { style: "How-to", multiple: 1.5, example: "“How to plan a month in 20 min”" },
      { style: "Question", multiple: 1.1, example: "“Why does nobody watch past 10s?”" },
      { style: "No clear hook", multiple: 0.6, example: "“Weekly update #14”" },
    ],
    plan: [
      { day: 2, time: "17:00", kind: "Video", title: "Plan a month in 20 minutes" },
      { day: 4, time: "12:00", kind: "Short", title: "The 3-second hook rule" },
      { day: 6, time: "10:00", kind: "Short", title: "Behind the scenes" },
    ],
  },
}

// Phone-width labels for the three KPI tiles, in the same order as `kpis`.
const KPI_SHORT_LABELS = ["Views", "Engagement", "Per post"]

const PLATFORM_ORDER: PlatformId[] = ["instagram", "tiktok", "youtube"]

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "hooks", label: "Hooks" },
  { id: "plan", label: "Plan" },
]

const FEATURES = [
  "See how every post performed",
  "Find the formats and hooks that work",
  "Get a week of on-brand posts planned for you",
]

export function SocialAgentShowcase() {
  const [platformId, setPlatformId] = useState<PlatformId>("instagram")
  const [tab, setTab] = useState<TabId>("overview")
  const platform = PLATFORMS[platformId]

  return (
    <MotionConfig reducedMotion="user">
      <div className="group relative overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-xl">
        <PlatformGlow />

        <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:p-12">
          {/* Copy */}
          <div className="flex min-w-0 flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 ring-1 ring-white/15 backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Ready-made agent
            </span>

            <h3 className={cn(display.className, "mt-4 text-4xl font-bold tracking-tight sm:text-5xl")}>
              Social Media Manager
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              Paste your profile link and it studies every post: what performed, which hooks stop the scroll, and what to publish next. Then it plans and posts it for you.
            </p>

            <div className="mt-6">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                Try the preview
              </p>
              <div role="group" aria-label="Preview platform" className="flex flex-wrap gap-2">
                {PLATFORM_ORDER.map((id) => {
                  const p = PLATFORMS[id]
                  const active = id === platformId
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setPlatformId(id)}
                      className={cn(
                        "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all",
                        active
                          ? "bg-white text-zinc-900 shadow-lg ring-2 ring-white/40"
                          : "bg-white/10 text-white/80 ring-1 ring-white/15 hover:bg-white/15",
                      )}
                    >
                      <p.Icon className="h-3.5 w-3.5" style={{ color: active ? p.iconColor : undefined }} />
                      {p.label}
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
                Start with your profile
                <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
              </a>
              <Link
                href="/agents/social-media"
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-semibold text-white/80 transition-colors hover:text-white"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Mini dashboard */}
          <div className="min-w-0 self-center">
            <div className="overflow-hidden rounded-2xl bg-zinc-50 text-zinc-900 shadow-2xl ring-1 ring-white/20">
              {/* Account header */}
              <div className="flex items-center gap-3 border-b border-zinc-200/80 bg-white px-4 py-3 sm:px-5">
                <span className="rounded-full p-[2.5px]" style={{ background: platform.ring }}>
                  <span
                    className={cn(
                      display.className,
                      "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-xs font-bold text-zinc-900",
                    )}
                  >
                    SN
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn(display.className, "truncate text-base font-bold leading-tight tracking-tight")}>
                    @{platform.handle}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <platform.Icon className="h-3 w-3" style={{ color: platform.iconColor }} />
                    {platform.label} · {platform.followers} followers
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
                      id={`social-tab-${t.id}`}
                      aria-selected={tab === t.id}
                      aria-controls="social-preview-panel"
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
                id="social-preview-panel"
                aria-labelledby={`social-tab-${tab}`}
                className="min-h-[430px] px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${platformId}-${tab}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {tab === "overview" && (
                      <OverviewPanel platform={platform} onPlan={() => setTab("plan")} />
                    )}
                    {tab === "hooks" && <HooksPanel platform={platform} />}
                    {tab === "plan" && <PlanPanel key={platformId} platform={platform} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

/** Instagram, TikTok and YouTube glows on a fine grid, as on the agent's card in the app. */
function PlatformGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -left-20 -top-28 h-80 w-80 rounded-full bg-[#F58529]/30 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-[#DD2A7B]/35 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 rounded-full bg-[#8134AF]/35 blur-3xl" />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#25F4EE]/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#FF0033]/30 blur-3xl" />
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

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const id = useId()
  const w = 100
  const h = 26
  const min = Math.min(...data)
  const max = Math.max(...data)
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 2 - ((v - min) / (max - min || 1)) * (h - 4)])
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden className="h-6 w-full overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function OverviewPanel({ platform, onPlan }: { platform: PlatformData; onPlan: () => void }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {platform.kpis.map((k, i) => (
          <div key={k.label} className="flex flex-col rounded-2xl border border-zinc-200/80 bg-white p-2.5 sm:p-3">
            <p className="truncate text-[11px] font-medium text-zinc-500 sm:text-xs">
              <span className="sm:hidden">{KPI_SHORT_LABELS[i]}</span>
              <span className="hidden sm:inline">{k.label}</span>
            </p>
            <p className={cn(display.className, "mt-1 text-xl font-bold leading-none tracking-tight tabular-nums sm:text-[26px]")}>
              {k.value}
            </p>
            <p className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-700">
              <ArrowUpRight className="h-3 w-3" />
              {k.delta}
            </p>
            <div className="mt-1.5">
              <Sparkline data={k.spark} color={platform.primary} />
            </div>
          </div>
        ))}
      </div>

      <Card title="What each format earns" sub="Average interactions per post">
        <ul className="space-y-2.5">
          {platform.formats.map((f) => (
            <li key={f.label} className="flex items-center gap-3 text-xs">
              <span className="w-16 shrink-0 font-medium text-zinc-700">{f.label}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100">
                <span
                  className="block h-full rounded-full transition-[width] duration-500"
                  style={{ width: `${f.value}%`, backgroundColor: f.color }}
                />
              </span>
              <span className="w-9 shrink-0 text-right font-semibold tabular-nums text-zinc-900">{f.display}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-col gap-3 rounded-2xl bg-linear-to-r from-zinc-950 to-zinc-700 p-3.5 text-white shadow-lg shadow-zinc-900/15 sm:flex-row sm:items-center">
        <Sparkles className="hidden h-4 w-4 shrink-0 sm:block" />
        <p className="flex-1 text-xs leading-relaxed text-white/90">
          <span className="font-semibold text-white">Your agent says: </span>
          {platform.insight}
        </p>
        <button
          type="button"
          onClick={onPlan}
          className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 self-start rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 sm:self-auto"
        >
          Add to plan <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

function MultipleBadge({ value }: { value: number }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums",
        value >= 1.2 ? "bg-emerald-50 text-emerald-700" : value <= 0.8 ? "bg-rose-50 text-rose-700" : "bg-zinc-100 text-zinc-600",
      )}
    >
      {value.toFixed(1)}×
    </span>
  )
}

function HooksPanel({ platform }: { platform: PlatformData }) {
  const max = Math.max(...platform.hooks.map((h) => h.multiple))
  return (
    <Card title="Hooks that stop the scroll" sub="Your latest 10 posts · views against your median">
      <ul className="divide-y divide-zinc-100">
        {platform.hooks.map((h, i) => (
          <li key={h.style} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-zinc-900">{h.style}</p>
              <MultipleBadge value={h.multiple} />
            </div>
            <p className="mt-0.5 text-xs italic text-zinc-500">{h.example}</p>
            <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-zinc-100">
              <span
                className="block h-full rounded-full transition-[width] duration-500"
                style={{ width: `${(h.multiple / max) * 100}%`, backgroundColor: i === 0 ? platform.primary : "#a1a1aa" }}
              />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-xl bg-zinc-50 px-3 py-2 text-xs text-zinc-600">
        <span className="font-semibold text-zinc-900">Next posts open with “{platform.hooks[0].style.toLowerCase()}”</span>, since it beats your median {platform.hooks[0].multiple.toFixed(1)}×.
      </p>
    </Card>
  )
}

function PlanPanel({ platform }: { platform: PlatformData }) {
  const [approved, setApproved] = useState(false)
  const formatColor = (kind: string) => platform.formats.find((f) => f.label === kind)?.color ?? platform.primary

  return (
    <div className="space-y-3">
      <Card title="This week" sub="Planned into your best days and times">
        <div className="grid grid-cols-7 gap-1.5">
          {DAYS.map((d, i) => {
            const post = platform.plan.find((p) => p.day === i)
            return (
              <div
                key={d}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-lg border py-2",
                  post ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-400",
                )}
              >
                <span className="text-[10px] font-semibold">{d}</span>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: post ? formatColor(post.kind) : "#e4e4e7", boxShadow: post ? "0 0 0 1.5px rgba(255,255,255,0.85)" : undefined }}
                />
              </div>
            )
          })}
        </div>

        <ul className="mt-3 space-y-2">
          {platform.plan.map((p) => (
            <li key={p.title} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-2.5">
              <span className="w-14 shrink-0 text-[11px] leading-tight text-zinc-500">
                <span className="block font-semibold text-zinc-900">{DAYS[p.day]}</span>
                {p.time}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold text-zinc-900">{p.title}</span>
                <span className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: formatColor(p.kind) }} />
                  {p.kind}
                </span>
              </span>
              {approved && <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-label="Scheduled" />}
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-3">
        <platform.Icon className="h-[18px] w-[18px] shrink-0" style={{ color: platform.iconColor }} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-zinc-900">Auto-post to {platform.label}</p>
          <p className="text-[11px] text-zinc-500">
            {approved ? "Scheduled. It goes out on its own." : "You approve, it does the rest."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setApproved((a) => !a)}
          className={cn(
            "inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors",
            approved ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-zinc-900 text-white hover:bg-black",
          )}
        >
          {approved ? <Check className="h-3 w-3" /> : <Send className="h-3 w-3" />}
          {approved ? "Scheduled" : "Approve week"}
        </button>
      </div>
    </div>
  )
}
