"use client"

import { X, Check, Wrench, Sparkles } from "lucide-react"
import { SiClaude, SiGoogle, SiGooglegemini, SiOpenai, SiPerplexity } from "react-icons/si"
import { Ambassador } from "@/components/ui/ambassador"
import { SIGNUP_URL } from "@/lib/links"
import { Reveal } from "@/components/sections/social-agent/parts"

// ── Where it ranks ──────────────────────────────────────────────────────────

const ENGINES = [
  { Icon: SiGoogle, label: "Google" },
  { Icon: SiOpenai, label: "ChatGPT" },
  { Icon: SiClaude, label: "Claude" },
  { Icon: SiPerplexity, label: "Perplexity" },
  { Icon: SiGooglegemini, label: "Gemini" },
]

export function EngineStrip() {
  return (
    <section className="border-y border-hairline bg-white px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 xl:flex-row">
        <p className="eyebrow">Gets you found in</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {ENGINES.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink">
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">Publishes to WordPress · Webflow · Shopify</p>
      </div>
    </section>
  )
}

// ── Does, not supports ──────────────────────────────────────────────────────

const SUPPORTS = [
  "Hands you a keyword list and leaves the writing to you",
  "Audits your site and gives you a to-do list",
  "Only thinks about Google, not ChatGPT or AI answers",
  "Needs you to copy every page into your website",
]

const DOES = [
  "Finds the searches you're closest to winning",
  "Writes the page, built for Google and AI answers",
  "Publishes it straight to your site",
  "Tracks where it ranks and fixes what slips",
]

export function DoesNotSupport() {
  return (
    <section className="bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">The difference</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">Other SEO tools show you the work. This agent does it.</h2>
          <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
            Most SEO tools give you a dashboard and a to-do list. This one is a teammate: you tell it what you want to rank for, and it gets it done.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal className="flex flex-col rounded-3xl border border-hairline bg-white p-7 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-quiet">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="eyebrow">Typical SEO tools</span>
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

// ── How it works ────────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", title: "Connect your Search Console", body: "Sign in with Google and pick your site. The agent reads your clicks, impressions and positions, and has your first opportunities ready in minutes." },
  { n: "02", title: "Tell it what you want", body: "Ask about your numbers, or tell it what to do: find keywords I can win, write my next page, fix the pages that slipped. It does the work." },
  { n: "03", title: "Approve, or let it publish", body: "Pages land in your website as drafts for you to review. When you trust it, switch on autopilot and it publishes every week." },
]

export function SeoHowItWorks() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">How it works</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">From Search Console to published, in three steps</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="rounded-3xl border border-hairline bg-white p-7 transition-colors hover:border-ink sm:p-8">
              <span className="font-mono text-lg font-medium text-faint">{s.n}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-quiet">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Demo video ──────────────────────────────────────────────────────────────

export function SeoDemoVideo() {
  return (
    <section className="border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">Watch it work</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">The agent, start to finish, in 60 seconds</h2>
          <p className="lede mx-auto mt-6 max-w-xl text-base sm:text-lg">From reading Search Console to a published page.</p>
        </Reveal>
        <Reveal className="rounded-[26px] border border-hairline bg-white p-2">
          <div className="relative aspect-video overflow-hidden rounded-[18px] border border-hairline bg-ink">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/oWzmccGbtlk?rel=0"
              title="SEO & GEO AI Agent demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── Final CTA ───────────────────────────────────────────────────────────────

export function SeoFinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Hand your SEO to an agent</h2>
          <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/65">
            Connect your Search Console, see the searches you can win, and tell it which page to write next.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={SIGNUP_URL}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-opacity hover:opacity-90"
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
          <p className="mt-6 text-xs text-white/40">Previews on this page use a sample site.</p>
        </div>
        <Ambassador pose="thumbs-up" sizes="360px" className="pointer-events-none absolute -bottom-2 -right-6 hidden h-[300px] w-[270px] sm:block lg:right-8 lg:h-[380px] lg:w-[340px]" />
      </Reveal>
    </section>
  )
}
