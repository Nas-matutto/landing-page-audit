"use client"

import { motion } from "framer-motion"
import { Check, MapPin, MessageSquareText, Sparkles, Wrench, X } from "lucide-react"
import { Ambassador } from "@/components/ui/ambassador"
import { GhostCta, PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import { SIGNUP_URL } from "@/lib/links"
import { AskPanel, CompsPanel, MailingPanel, SellersPanel } from "./mocks"

// The /agents/real-estate-agent page: an AI agent for realtors that finds
// likely sellers in public property records. Same template as the lead finder
// page. Every claim maps to the app's property_leads tools (app-TTDM
// lib/property-leads.ts): search, address lookup, comps, homes near, contacts.

// ── Hero ────────────────────────────────────────────────────────────────────

const VERBS = ["Finds sellers", "Pulls comps", "Builds mailing lists"]

const DONE = [
  { text: "Found 20 likely sellers", note: "owned 15+ years", delay: 0.9 },
  { text: "Pulled 6 comps", note: "from recorded sales", delay: 1.8 },
  { text: "Built a 50-home mailing list", note: "ready to download", delay: 2.7 },
]

export function RealEstateHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <p className="eyebrow mb-5">AI Agent for Realtors</p>
          <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.4vw,4rem)]">An AI real estate agent that finds your next listing</h1>
          <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
            Ask in plain English. It searches public property records for homeowners likely to sell, pulls comps, and builds your mailing lists.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <PrimaryCta href={SIGNUP_URL}>Get Started</PrimaryCta>
            <GhostCta href="#what-you-can-ask">What you can ask</GhostCta>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {VERBS.map((verb) => (
              <li key={verb} className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="h-3 w-3" />
                </span>
                {verb}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl pb-10 lg:max-w-none lg:pb-0"
        >
          <SellersPanel rows={3} stage />

          <Ambassador
            pose="wave"
            sizes="180px"
            className="pointer-events-none absolute -bottom-4 -left-1 h-[220px] w-[110px] drop-shadow-xl sm:-bottom-2 sm:left-2 sm:h-[240px] sm:w-[120px] lg:-bottom-12"
            priority
          />

          <ul className="absolute -bottom-2 right-0 flex flex-col items-end gap-2 sm:-right-4 sm:bottom-6 lg:-right-6">
            {DONE.map((d) => (
              <motion.li
                key={d.text}
                initial={{ opacity: 0, x: 16, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: d.delay, ease: "easeOut" }}
                className="flex items-center gap-2.5 rounded-full border border-hairline bg-white py-1.5 pl-1.5 pr-4 shadow-lg shadow-black/5"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-semibold text-ink sm:text-[13px]">
                  {d.text} <span className="hidden font-normal text-quiet sm:inline">· {d.note}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

// ── Your market ─────────────────────────────────────────────────────────────

// It's a custom agent: we connect it to the public records for the client's
// own market, anywhere. The sample panels on this page use a Chicago suburb.
const MARKET_SCOPES = ["Your city", "Your state", "Your country"]

export function MarketStrip() {
  return (
    <section className="border-y border-hairline bg-white px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
        <p className="eyebrow">Built for your market</p>
        <p className="max-w-xl text-[15px] font-medium text-ink">
          We set it up on the public property records for the areas you farm, wherever you work.
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {MARKET_SCOPES.map((scope) => (
            <li key={scope} className="flex items-center gap-1.5 text-sm font-medium text-ink">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {scope}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── Does, not supports ──────────────────────────────────────────────────────

const SUPPORTS = [
  "Sells you the same lead list every other agent in town bought",
  "Leaves you digging through the assessor's site one address at a time",
  "Makes you cross-check your sphere against property records by hand",
  "Needs a separate tool for comps and another for mailing lists",
]

const DOES = [
  "Finds homeowners likely to sell, strongest signals first",
  "Gives you owner names and mailing addresses",
  "Checks which of your own contacts own a home",
  "Pulls comps and just-sold mailing lists in the same chat",
]

export function RealEstateDifference() {
  return (
    <section className="bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">The difference</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">Lead lists give you names. This agent gives you listings to chase.</h2>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal className="flex flex-col rounded-3xl border border-hairline bg-white p-7 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-quiet">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="eyebrow">Lead lists and data portals</span>
            </div>
            <h3 className="mb-6 text-xl font-semibold tracking-[-0.01em] text-ink">Supports you</h3>
            <ul className="mt-auto space-y-3.5">
              {SUPPORTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
                  <span className="text-sm leading-relaxed text-quiet">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="relative flex flex-col overflow-hidden rounded-3xl bg-ink p-7 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="eyebrow text-white/50">Your AI agent</span>
            </div>
            <h3 className="mb-6 text-xl font-semibold tracking-[-0.01em] text-white">Does it for you</h3>
            <ul className="mt-auto space-y-3.5 pr-24 sm:pr-32">
              {DOES.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  <span className="text-sm leading-relaxed text-white/80">{point}</span>
                </li>
              ))}
            </ul>
            <Ambassador pose="thumbs-up" sizes="180px" className="pointer-events-none absolute -right-2 bottom-0 h-[150px] w-[130px] sm:h-[190px] sm:w-[165px]" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── Seller signals ──────────────────────────────────────────────────────────

const SIGNALS = [
  { title: "Long-time owners", body: "Owned 10, 15 or 20+ years. The most common reason someone is ready to move." },
  { title: "Absentee and out-of-state owners", body: "Landlords, second homes and owners who already moved away." },
  { title: "Foreclosure auction scheduled", body: "The sheriff or judicial sale date is set, so the clock is running." },
  { title: "Assessment jump", body: "Assessed value up 40% or more in 3 years, which means a much bigger tax bill." },
  { title: "Big renovation permit", body: "A $25k+ remodel in the last 2 years, often done before selling." },
  { title: "Vacant or code violations", body: "City records that point to a property the owner may want off their hands, where your city publishes them." },
]

export function RealEstateSignals() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-3xl">
          <p className="eyebrow mb-5">Seller signals</p>
          <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">It knows what a likely seller looks like</h2>
          <p className="lede mt-5 max-w-2xl text-base sm:text-lg">
            Every search can filter on signals like these, plus property type. Up to 100 homes per search, strongest signals first. We match the signals to what your area publishes.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNALS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.05} className="rounded-3xl border border-hairline bg-white p-7 transition-colors hover:border-ink">
              <span className="font-mono text-sm font-medium text-faint">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-quiet">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── How it works ────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "Ask in plain English",
    body: "Type what you want, the way you'd ask an assistant. It turns it into the right search across the area you work.",
    visual: <AskPanel />,
  },
  {
    n: "02",
    title: "It searches the public records",
    body: "The public records for your area: ownership, recorded sales, permits, foreclosures and more, checked for you in seconds.",
    visual: <CompsPanel />,
  },
  {
    n: "03",
    title: "Get a list you can work",
    body: "Owner names and mailing addresses for door-knocking, calls or postcards. Download it as a CSV in one click.",
    visual: <MailingPanel />,
  },
]

export function RealEstateHowItWorks() {
  return (
    <section className="border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">How it works</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">From a question to a list you can mail, in three steps</h2>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="flex min-w-0 flex-col rounded-3xl border border-hairline bg-white p-6 sm:p-7">
              <span className="font-mono text-lg font-medium text-faint">{s.n}</span>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-quiet">{s.body}</p>
              <div className="mt-6 min-w-0">{s.visual}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── What you can ask ────────────────────────────────────────────────────────

const ASKS = [
  { ask: "Find me 20 houses in Oak Park owned for over 15 years", what: "Likely sellers" },
  { ask: "Tell me about 1234 N Wolcott Ave", what: "Any address" },
  { ask: "Comps for 845 N Grove Ave, 3 bedrooms, last 6 months", what: "Comps" },
  { ask: "The 50 homes nearest 612 Park Ave for a just-sold postcard", what: "Mailing lists" },
  { ask: "Which of my contacts own a home and might sell?", what: "Your sphere" },
  { ask: "How is the Lincoln Park condo market doing this year?", what: "Market questions" },
]

export function RealEstateAsks() {
  return (
    <section id="what-you-can-ask" className="scroll-mt-24 bg-white px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">What you can ask</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">Talk to it like your best assistant</h2>
          <p className="lede mx-auto mt-5 max-w-xl text-base sm:text-lg">Upload your contacts once with “My contacts”, and it can check your whole sphere too.</p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ASKS.map((a, i) => (
            <Reveal key={a.ask} delay={(i % 3) * 0.05} className="flex flex-col rounded-3xl border border-hairline bg-mist p-6">
              <span className="eyebrow">{a.what}</span>
              <p className="mt-4 flex items-start gap-2.5 text-[15px] font-medium leading-snug text-ink">
                <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0" />“{a.ask}”
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ───────────────────────────────────────────────────────────────

export function RealEstateFinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Find your next listing before anyone else</h2>
          <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/65">
            Tell us the areas you farm. We&apos;ll set up your agent with you, then ask it for likely sellers whenever you need them.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-opacity hover:opacity-90"
            >
              Get Started
            </a>
            <a
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-colors hover:bg-white/10"
            >
              Book Demo
            </a>
          </div>
          <p className="mt-6 text-xs text-white/40">Previews on this page use sample addresses, not real owners.</p>
        </div>
        <Ambassador pose="thumbs-up" sizes="360px" className="pointer-events-none absolute -bottom-2 -right-6 hidden h-[300px] w-[270px] sm:block lg:right-8 lg:h-[380px] lg:w-[340px]" />
      </Reveal>
    </section>
  )
}
