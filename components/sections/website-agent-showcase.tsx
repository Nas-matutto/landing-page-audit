"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, ArrowUp, Check, Coffee, Loader2, Menu, Monitor, PenTool, RotateCcw, Smartphone, Sparkles, Star, Stethoscope } from "lucide-react"
import { SiGithub, SiWordpress } from "react-icons/si"
import { Bricolage_Grotesque } from "next/font/google"
import { Ambassador, type AmbassadorPose } from "@/components/ui/ambassador"
import { SIGNUP_URL } from "@/lib/links"
import { cn } from "@/lib/utils"

// ── Website Manager showcase ────────────────────────────────────────────────
// The third ready-made agent, in the same dark panel as its siblings, lit in
// the indigo and cyan of its card in the app. The preview is a sample site
// that really changes when you ask: each request edits the page in front of
// you and lands in the Changes tab, where it can be undone. Sample data only.

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" })

type SiteId = "cafe" | "studio" | "clinic"
type ChangeId = "button" | "banner" | "headline" | "reviews"
type TabId = "site" | "changes"
type Device = "desktop" | "phone"

interface SiteData {
  label: string
  Icon: LucideIcon
  name: string
  domain: string
  builder: string
  /** How the agent reaches the site: its code on GitHub, or WordPress. */
  via: "github" | "wordpress"
  nav: string[]
  headline: string
  newHeadline: string
  sub: string
  cta: string
  banner: string
  /** The hero picture, drawn as two flat shapes. */
  art: [string, string]
  reviews: { quote: string; name: string }[]
}

const CYAN = "#0891B2"

const SITES: Record<SiteId, SiteData> = {
  cafe: {
    label: "Café",
    Icon: Coffee,
    name: "Marlow Coffee",
    domain: "marlowcoffee.com",
    builder: "WordPress",
    via: "wordpress",
    nav: ["Menu", "Visit", "Order"],
    headline: "Small-batch coffee, roasted every Monday",
    newHeadline: "Fresh coffee, roasted down the road",
    sub: "Single-origin beans and pastries baked in-house, open from 7am.",
    cta: "Order ahead",
    banner: "Free pastry with every coffee this week",
    art: ["#B45309", "#FDE68A"],
    reviews: [
      { quote: "Best flat white in town.", name: "Sara K." },
      { quote: "Ordering ahead saves my mornings.", name: "Tom R." },
    ],
  },
  studio: {
    label: "Agency",
    Icon: PenTool,
    name: "Northline Studio",
    domain: "northline.studio",
    builder: "Claude Code",
    via: "github",
    nav: ["Work", "Services", "Contact"],
    headline: "Brands and websites for growing companies",
    newHeadline: "We design brands people remember",
    sub: "Strategy, identity and web design for teams of 5 to 50.",
    cta: "Book a call",
    banner: "Now booking new projects for January",
    art: ["#4F46E5", "#C7D2FE"],
    reviews: [
      { quote: "They rebuilt our site in three weeks.", name: "Priya, Loop" },
      { quote: "Our sign-ups doubled after launch.", name: "Ben, Fieldnote" },
    ],
  },
  clinic: {
    label: "Clinic",
    Icon: Stethoscope,
    name: "Harbor Dental",
    domain: "harbordental.com",
    builder: "Codex",
    via: "github",
    nav: ["Treatments", "Prices", "Book"],
    headline: "Gentle dental care for the whole family",
    newHeadline: "A dentist your kids will actually like",
    sub: "Same-week appointments, clear prices and evening hours.",
    cta: "Book a visit",
    banner: "New patients get a free first check-up",
    art: ["#0891B2", "#A5F3FC"],
    reviews: [
      { quote: "No waiting room, and so friendly.", name: "Maria L." },
      { quote: "Finally a dentist I don't dread.", name: "James P." },
    ],
  },
}

const SITE_ORDER: SiteId[] = ["cafe", "studio", "clinic"]

const CHANGES: Record<ChangeId, { title: string; suggestion: string; working: [string, string]; done: string }> = {
  button: {
    title: "Made the main button green",
    suggestion: "Make the button green",
    working: ["Finding the button in your code…", "Changing its colour…"],
    done: "Done. Your button is green, and it's live.",
  },
  banner: {
    title: "Added an offer banner to the top",
    suggestion: "Add an offer banner",
    working: ["Reading your homepage…", "Adding the banner…"],
    done: "Banner added. It's live on your site.",
  },
  headline: {
    title: "Rewrote the headline",
    suggestion: "Rewrite the headline",
    working: ["Reading your homepage copy…", "Writing a sharper headline…"],
    done: "Your new headline is live. Undo it any time.",
  },
  reviews: {
    title: "Added a customer reviews section",
    suggestion: "Add customer reviews",
    working: ["Reading your homepage…", "Building the reviews section…"],
    done: "Your reviews section is live.",
  },
}

const SUGGESTIONS: ChangeId[] = ["button", "banner", "reviews"]

const FEATURES = [
  "See your live site, on desktop and phone",
  "Ask for any change in plain English, it edits the code for you",
  "Live in minutes, with one-click undo",
]

type Phase = "idle" | "typing" | "working" | "done"
type Intent = ChangeId | "undo"

/** Reads a typed request and decides which change it is. */
function intentOf(text: string): Intent | null {
  const t = text.toLowerCase()
  if (/undo|revert|go back|put it back|change it back/.test(t)) return "undo"
  if (/review|testimonial|quote|rating|star/.test(t)) return "reviews"
  if (/banner|offer|sale|promo|announce|discount|deal/.test(t)) return "banner"
  if (/headline|title|heading|tagline|wording|rewrite|copy|text/.test(t)) return "headline"
  if (/button|colou?r|green|cta|bigger|stand out/.test(t)) return "button"
  return null
}

const POSE_FOR: Record<Phase, AmbassadorPose> = { idle: "wave", typing: "wave", working: "working", done: "thumbs-up" }

export function WebsiteAgentShowcase() {
  const [siteId, setSiteId] = useState<SiteId>("cafe")
  const [tab, setTab] = useState<TabId>("site")
  const [device, setDevice] = useState<Device>("desktop")
  const site = SITES[siteId]

  // Changes made so far, oldest first. The newest one is briefly outlined in the preview.
  const [applied, setApplied] = useState<ChangeId[]>([])
  const [flash, setFlash] = useState<ChangeId | null>(null)
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
    setApplied([])
    setFlash(null)
    setPhase("idle")
    setLine("")
  }

  function undo(id: ChangeId) {
    setApplied((prev) => prev.filter((c) => c !== id))
    setFlash(null)
  }

  /** The agent takes the request: reads, works through two steps, then the site changes. */
  function execute(text: string) {
    const intent = intentOf(text)
    clearTimers()
    setFlash(null)
    if (!intent) {
      setPhase("done")
      setLine("I'd make that one in the app. Try one of the ideas below.")
      return
    }
    if (intent === "undo") {
      const last = applied[applied.length - 1]
      if (!last) {
        setPhase("done")
        setLine("Nothing to undo yet. Ask me for a change first.")
        return
      }
      setPhase("working")
      setLine("Putting your site back…")
      later(() => {
        undo(last)
        setTab("site")
        setPhase("done")
        setLine("Undone. Your site is back how it was.")
      }, 900)
      return
    }
    if (applied.includes(intent)) {
      setPhase("done")
      setLine("That one's already live. Want me to undo it?")
      return
    }
    const change = CHANGES[intent]
    setPhase("working")
    setLine(change.working[0])
    later(() => setLine(change.working[1]), 800)
    later(() => {
      setApplied((prev) => [...prev, intent])
      setTab("site")
      setFlash(intent)
      setPhase("done")
      setLine(change.done)
    }, 1700)
    later(() => setFlash(null), 3500)
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
  const bubble = phase === "idle" ? "Tell me what to change on your site. I'll put it live." : line

  return (
    <MotionConfig reducedMotion="user">
      <div className="group relative h-full overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-xl">
        <SiteGlow />

        <div className="relative grid h-full content-center gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:p-12">
          {/* Copy */}
          <div className="flex min-w-0 flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 ring-1 ring-white/15 backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Ready-made agent
            </span>

            <h3 className={cn(display.className, "mt-4 text-4xl font-bold tracking-tight sm:text-5xl")}>Website Manager</h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              Built your site with Claude Code, Codex or WordPress? Connect it, see it live, and tell your agent what to change in plain English. It makes the change and puts it live while you watch.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm">
                <SiGithub className="h-3.5 w-3.5" />
                GitHub
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm">
                <SiWordpress className="h-3.5 w-3.5" />
                WordPress
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 ring-1 ring-white/15">
                Claude Code · Codex · Lovable · Bolt
              </span>
            </div>

            <div className="mt-6">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-white/50">Try the preview</p>
              <div role="group" aria-label="Preview website" className="flex flex-wrap gap-2">
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
                      <s.Icon className="h-3.5 w-3.5" style={{ color: active ? CYAN : undefined }} />
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
                Connect your website
                <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
              </a>
              <Link
                href="/agents/website-manager"
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-semibold text-white/80 transition-colors hover:text-white"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Mini app */}
          <div className="min-w-0 self-center">
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
                <span className="rounded-full p-[2.5px]" style={{ background: `linear-gradient(45deg, #6366F1, ${CYAN})` }}>
                  <span
                    className={cn(
                      display.className,
                      "flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-zinc-900",
                    )}
                  >
                    <site.Icon className="h-4 w-4" />
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn(display.className, "truncate text-base font-bold leading-tight tracking-tight")}>{site.domain}</p>
                  <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                    {site.via === "wordpress" ? (
                      <SiWordpress className="h-3 w-3 shrink-0 text-[#21759B]" />
                    ) : (
                      <SiGithub className="h-3 w-3 shrink-0 text-zinc-900" />
                    )}
                    <span className="truncate">
                      {site.via === "wordpress" ? "WordPress · connected" : `Built with ${site.builder} · on GitHub`}
                    </span>
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  <span className="sm:hidden">Sample</span>
                  <span className="hidden sm:inline">Sample site</span>
                </span>
              </div>

              {/* Tabs, and the desktop / phone switch */}
              <div className="flex items-center justify-between gap-2 px-4 pt-3 sm:px-5">
                <div role="tablist" aria-label="Website preview" className="inline-flex rounded-lg bg-zinc-100 p-0.5">
                  {(["site", "changes"] as const).map((id) => (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      id={`website-tab-${id}`}
                      aria-selected={tab === id}
                      aria-controls="website-preview-panel"
                      onClick={() => setTab(id)}
                      className={cn(
                        "inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors",
                        tab === id ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800",
                      )}
                    >
                      {id === "site" ? "Live site" : "Changes"}
                      {id === "changes" && applied.length > 0 && (
                        <span className="rounded-full bg-zinc-900 px-1.5 text-[10px] font-semibold leading-4 text-white">{applied.length}</span>
                      )}
                    </button>
                  ))}
                </div>
                <div role="group" aria-label="Preview size" className={cn("inline-flex rounded-lg bg-zinc-100 p-0.5", tab !== "site" && "invisible")}>
                  {(
                    [
                      { id: "desktop", label: "Desktop", Icon: Monitor },
                      { id: "phone", label: "Phone", Icon: Smartphone },
                    ] as const
                  ).map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      aria-pressed={device === d.id}
                      aria-label={d.label}
                      onClick={() => setDevice(d.id)}
                      className={cn(
                        "flex cursor-pointer items-center rounded-md px-2 py-1 transition-colors",
                        device === d.id ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800",
                      )}
                    >
                      <d.Icon className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              </div>

              <div
                role="tabpanel"
                id="website-preview-panel"
                aria-labelledby={`website-tab-${tab}`}
                className="min-h-[430px] px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${siteId}-${tab}-${device}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {tab === "site" ? (
                      <SitePreview site={site} applied={applied} flash={flash} phone={device === "phone"} />
                    ) : (
                      <ChangesPanel site={site} applied={applied} onUndo={undo} />
                    )}
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
                aria-label="Tell your agent what to change"
                placeholder="Tell your agent what to change…"
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
              {SUGGESTIONS.map((id) => (
                <button
                  key={id}
                  type="button"
                  disabled={busy}
                  onClick={() => suggest(CHANGES[id].suggestion)}
                  className="cursor-pointer rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 ring-1 ring-white/15 transition-colors hover:bg-white/20 disabled:cursor-default disabled:opacity-50"
                >
                  {CHANGES[id].suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

/** Indigo and cyan glows on a fine grid, as on the agent's card in the app. */
function SiteGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -left-20 -top-28 h-80 w-80 rounded-full bg-[#6366F1]/30 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-[#06B6D4]/25 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#0EA5E9]/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#8B5CF6]/25 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]" />
    </div>
  )
}

const flashRing = (on: boolean) => cn("rounded-md transition-shadow duration-500", on && "ring-2 ring-[#06B6D4] ring-offset-2")

/** The sample site itself, in a browser window or on a phone. Each applied change shows up in place. */
function SitePreview({ site, applied, flash, phone }: { site: SiteData; applied: ChangeId[]; flash: ChangeId | null; phone: boolean }) {
  const has = (id: ChangeId) => applied.includes(id)
  const headline = has("headline") ? site.newHeadline : site.headline

  return (
    <div
      className={cn(
        "overflow-hidden bg-white",
        phone ? "mx-auto w-[220px] rounded-[28px] border-[6px] border-zinc-900 shadow-xl" : "rounded-xl border border-zinc-200 shadow-sm",
      )}
    >
      {phone ? (
        <div className="flex justify-center pb-1 pt-1.5">
          <span className="h-1 w-12 rounded-full bg-zinc-900/80" />
        </div>
      ) : (
        <div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50 px-3 py-2">
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} className="h-2 w-2 shrink-0 rounded-full" style={{ background: c }} />
          ))}
          <span className="ml-2 min-w-0 flex-1 truncate rounded-md border border-zinc-200 bg-white px-2 text-[10px] leading-4 text-zinc-400">{site.domain}</span>
        </div>
      )}

      <AnimatePresence initial={false}>
        {has("banner") && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className={cn("bg-zinc-900 px-3 py-1.5 text-center text-[10px] font-semibold text-white", flash === "banner" && "bg-[#0E7490]")}>
              {site.banner}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <span className={cn(display.className, "truncate text-xs font-bold text-zinc-900")}>{site.name}</span>
        {phone ? (
          <Menu className="h-3.5 w-3.5 shrink-0 text-zinc-700" />
        ) : (
          <span className="flex shrink-0 gap-3 text-[10px] text-zinc-500">
            {site.nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        )}
      </div>

      {/* Hero */}
      <div className={cn("grid gap-4 px-4 pb-4 pt-1", phone ? "grid-cols-1" : "grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center")}>
        <div className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={headline}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className={cn(
                display.className,
                flashRing(flash === "headline"),
                "font-bold leading-[1.1] tracking-tight text-zinc-900",
                phone ? "text-lg" : "text-[15px] sm:text-xl",
              )}
            >
              {headline}
            </motion.p>
          </AnimatePresence>
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">{site.sub}</p>
          <span
            className={cn(
              flashRing(flash === "button"),
              "mt-3 inline-flex px-3 py-1.5 text-[10px] font-bold text-white transition-colors duration-700",
              has("button") ? "bg-emerald-600" : "bg-zinc-900",
            )}
          >
            {site.cta}
          </span>
        </div>
        <HeroArt colors={site.art} phone={phone} />
      </div>

      <AnimatePresence initial={false}>
        {has("reviews") && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className={cn("mx-4 mb-4 p-1", flashRing(flash === "reviews"))}>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">What customers say</p>
              <div className={cn("grid gap-2", phone ? "grid-cols-1" : "grid-cols-2")}>
                {site.reviews.map((r) => (
                  <div key={r.name} className="rounded-lg border border-zinc-100 bg-zinc-50 p-2.5">
                    <span className="flex gap-0.5 text-amber-400">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-2.5 w-2.5 fill-current" />
                      ))}
                    </span>
                    <p className="mt-1.5 text-[11px] font-medium leading-snug text-zinc-800">“{r.quote}”</p>
                    <p className="mt-1 text-[10px] text-zinc-400">{r.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The rest of the page, sketched */}
      <div className="grid grid-cols-3 gap-2 px-4 pb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5 rounded-lg bg-zinc-50 p-2">
            <div className="h-6 rounded-md bg-zinc-100" />
            <div className="h-1 w-3/4 rounded-full bg-zinc-200" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** A flat picture for the hero: a disc and a card in the site's two colours. */
function HeroArt({ colors, phone }: { colors: [string, string]; phone: boolean }) {
  return (
    <div aria-hidden className={cn("relative overflow-hidden rounded-xl", phone ? "h-24" : "aspect-[4/3]")} style={{ background: colors[1] }}>
      <span className="absolute -bottom-6 -right-4 h-20 w-20 rounded-full sm:h-24 sm:w-24" style={{ background: colors[0] }} />
      <span className="absolute left-3 top-3 h-8 w-12 rounded-md bg-white/80 shadow-sm" />
      <span className="absolute left-5 top-6 h-1 w-6 rounded-full" style={{ background: colors[0] }} />
    </div>
  )
}

function ChangesPanel({ site, applied, onUndo }: { site: SiteData; applied: ChangeId[]; onUndo: (id: ChangeId) => void }) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-3.5 sm:p-4">
        <h4 className="text-sm font-semibold text-zinc-900">Changes to {site.domain}</h4>
        <p className="mt-0.5 text-xs text-zinc-500">Made on your site, put live for you</p>

        {applied.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-zinc-200 px-3 py-6 text-center text-xs leading-relaxed text-zinc-500">
            No changes yet. Ask for one below and it shows up here, with one-click undo.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-zinc-100">
            {[...applied].reverse().map((id, i) => (
              <li key={id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-zinc-900">{CHANGES[id].title}</span>
                  <span className="block truncate text-[11px] text-zinc-500">Live · {i === 0 ? "just now" : `${i * 4 + 2} min ago`}</span>
                </span>
                <button
                  type="button"
                  onClick={() => onUndo(id)}
                  className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                  <RotateCcw className="h-3 w-3" />
                  Undo
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-3 rounded-2xl bg-linear-to-r from-zinc-950 to-zinc-700 p-3.5 text-white shadow-lg shadow-zinc-900/15">
        {site.via === "wordpress" ? <SiWordpress className="h-4 w-4 shrink-0" /> : <SiGithub className="h-4 w-4 shrink-0" />}
        <p className="flex-1 text-xs leading-relaxed text-white/90">
          <span className="font-semibold text-white">
            {site.via === "wordpress" ? "Every page is copied before it changes" : "Every change is saved in your code on GitHub"}
          </span>
          , so nothing is ever lost and undo is always free.
        </p>
      </div>
    </div>
  )
}
