"use client"

import Image from "next/image"
import { ArrowRight, Check, TrendingDown, TrendingUp, X } from "lucide-react"
import { SiClaude, SiGoogle, SiGooglegemini, SiOpenai, SiPerplexity } from "react-icons/si"
import { YouTubeEmbed } from "@/components/ui/youtube-embed"
import { SEO_AGENT_VIDEO, SIGNUP_URL } from "@/lib/links"
import { cn } from "@/lib/utils"
import { PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import { SeoAgentShowcase } from "@/components/sections/seo-agent-showcase"

/** The sign-up button that closes a section. */
export function SeoGetStarted({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center", className)}>
      <PrimaryCta href={SIGNUP_URL} className="bg-seo">
        Get started
      </PrimaryCta>
    </div>
  )
}

// ── Where it gets you found ─────────────────────────────────────────────────

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
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">
          Publishes to <span className="text-seo">WordPress · Webflow · Shopify</span>
        </p>
      </div>
    </section>
  )
}

// ── Before and after ────────────────────────────────────────────────────────

const WITHOUT = [
  "Keyword lists you never get round to writing",
  "Audits that end in a to-do list",
  "Invisible when buyers ask ChatGPT instead of Google",
  "Pages that slip down the rankings without you noticing",
]

const WITH = [
  "The searches you can win, found for you",
  "Pages written to rank and get quoted by AI",
  "Published straight to your site, every week",
  "Slipping pages fixed before you lose the clicks",
]

export function BeforeAfter() {
  return (
    <section className="bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">What changes</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
            Stop guessing at SEO. <span className="text-seo">Start getting found.</span>
          </h2>
          <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
            Most SEO tools hand you a dashboard and a to-do list. Your agent does the work, so your traffic grows while you run the business.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal className="flex flex-col rounded-3xl border border-hairline bg-white p-7 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-quiet">
                <TrendingDown className="h-4 w-4" />
              </div>
              <span className="eyebrow">Doing it yourself</span>
            </div>
            <h3 className="mb-6 text-xl font-semibold tracking-[-0.01em] text-ink">Your traffic stays flat</h3>
            <ul className="mt-auto space-y-3.5">
              {WITHOUT.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
                  <span className="text-sm leading-relaxed text-quiet">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative flex flex-col overflow-hidden rounded-3xl bg-seo p-7 sm:p-8">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
            <div className="relative mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="eyebrow text-white!">With your SEO agent</span>
            </div>
            <h3 className="relative mb-6 text-xl font-semibold tracking-[-0.01em] text-white">Your traffic keeps climbing</h3>
            <ul className="relative mt-auto space-y-3.5">
              {WITH.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  <span className="text-sm leading-relaxed text-white/90">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <SeoGetStarted className="mt-12" />
      </div>
    </section>
  )
}

// ── Try it ──────────────────────────────────────────────────────────────────

export function SeoTryIt() {
  return (
    <section id="try-it" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">Try it</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">See the traffic it would win you</h2>
          <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
            Pick a sample site to see the searches it can win, the page your agent writes and where it ranks.
          </p>
        </Reveal>
        <Reveal>
          <SeoAgentShowcase howItWorks={false} />
        </Reveal>
      </div>
    </section>
  )
}

// ── How it works ────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "Connect your Search Console",
    body: "Sign in with Google and pick your site. Within minutes you see the searches you can win and the traffic each one is worth.",
  },
  {
    n: "02",
    title: "Tell it what you want",
    body: "Find keywords I can win, write my next page, fix the pages that slipped. Ask in plain English and your agent does the work.",
  },
  {
    n: "03",
    title: "Watch your traffic grow",
    body: "Pages land in your website as drafts for you to approve. When you trust it, switch on autopilot and it publishes every week.",
  },
]

export function SeoHowItWorks() {
  return (
    <section className="border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">How it works</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">From Search Console to more traffic, in three steps</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} className="rounded-3xl border border-hairline bg-white p-7 transition-colors hover:border-seo sm:p-8">
              <span className="font-mono text-lg font-medium text-seo">{s.n}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-quiet">{s.body}</p>
            </Reveal>
          ))}
        </div>
        <SeoGetStarted className="mt-12" />
      </div>
    </section>
  )
}

// ── Demo video ──────────────────────────────────────────────────────────────

export function SeoDemoVideo() {
  return (
    <section className="bg-white px-6 pt-20 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow mb-5">Demo</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">See the agent at work in 53 seconds</h2>
          <p className="lede mx-auto mt-6 max-w-xl text-base sm:text-lg">
            Watch it find the searches you can win, write a page built to rank and get cited by AI, and put it live on your site.
          </p>
        </Reveal>
        <Reveal>
          <YouTubeEmbed
            youtubeId={SEO_AGENT_VIDEO.youtubeId}
            title={SEO_AGENT_VIDEO.title}
            thumbnail={SEO_AGENT_VIDEO.thumbnail}
            className="shadow-2xl shadow-seo/15"
          />
        </Reveal>
      </div>
    </section>
  )
}

// ── Final CTA ───────────────────────────────────────────────────────────────

export function SeoFinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-seo px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-black/20 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-xl">
          <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Your customers are searching right now. Make sure they find you.</h2>
          <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/80">
            Connect your Search Console and see the searches you can win, and the traffic they&apos;re worth, in minutes.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={SIGNUP_URL}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-seo transition-opacity hover:opacity-90"
            >
              Grow my traffic
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-colors hover:bg-white/10"
            >
              Book Demo
            </a>
          </div>
          <p className="mt-6 text-xs text-white/60">Previews on this page use a sample site.</p>
        </div>

        {/* The last frame of the hero clip: the agent at his laptop, thumbs up */}
        <div className="pointer-events-none absolute -bottom-10 right-8 hidden h-[300px] w-[300px] overflow-hidden rounded-full bg-white shadow-2xl shadow-black/25 ring-8 ring-white/20 lg:right-14 lg:block lg:h-[340px] lg:w-[340px] xl:h-[380px] xl:w-[380px]">
          <Image
            src="/videos/seo-agent-hero-end.jpg"
            alt="The SEO agent at his laptop with a coffee, giving a thumbs up"
            width={720}
            height={720}
            sizes="380px"
            className="h-full w-full object-cover"
          />
        </div>
      </Reveal>
    </section>
  )
}
