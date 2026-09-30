"use client"

import { X, Check, Wrench, Sparkles } from "lucide-react"
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si"
import { FaFacebook } from "react-icons/fa"
import { Ambassador } from "@/components/ui/ambassador"
import { SIGNUP_URL } from "@/lib/links"
import { Reveal, Screenshot } from "./parts"

// ── Platforms ───────────────────────────────────────────────────────────────

const PLATFORMS = [
  { Icon: SiInstagram, label: "Instagram" },
  { Icon: SiTiktok, label: "TikTok" },
  { Icon: SiYoutube, label: "YouTube" },
  { Icon: FaFacebook, label: "Facebook" },
]

export function PlatformStrip() {
  return (
    <section className="border-y border-hairline bg-white px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="eyebrow">Reads every channel you post on</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {PLATFORMS.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink">
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">Auto-posts to Instagram · Facebook · TikTok</p>
      </div>
    </section>
  )
}

// ── Does, not supports ──────────────────────────────────────────────────────

const SUPPORTS = [
  "Shows you charts and leaves the analysis to you",
  "Suggests ideas you still have to write",
  "Reminds you it's time to post",
  "Needs a designer for every carousel",
]

const DOES = [
  "Finds your winning posts and tells you why they won",
  "Writes the hooks, the script and the caption",
  "Designs the carousel in your brand kit",
  "Schedules it into your best slot and posts it",
]

export function DoesNotSupport() {
  return (
    <section className="bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">The difference</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">Other tools show you the work. This agent does it.</h2>
          <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
            Most social media tools give you a dashboard and a to-do list. This one is a teammate: you tell it what you want, and it gets it done.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal className="flex flex-col rounded-3xl border border-hairline bg-white p-7 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-quiet">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="eyebrow">Typical social tools</span>
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
  { n: "01", title: "Paste your profile link", body: "Instagram, TikTok, YouTube or a Facebook Page. The agent reads every post and has your first analysis ready in minutes." },
  { n: "02", title: "Tell it what you want", body: "Ask about your numbers, or tell it what to make: plan my week, script a video, design a carousel. It does the work." },
  { n: "03", title: "Approve, or let it post", body: "Review each post, or set it to auto-post. Prefer to post yourself? You get an email reminder with the finished post." },
]

export function SocialHowItWorks() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">How it works</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">From profile link to posted, in three steps</h2>
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

// ── Gallery ─────────────────────────────────────────────────────────────────

const GALLERY_WIDE = [
  { name: "breakouts", w: 1600, h: 1333, title: "Breakout posts in your niche", body: "The competitor posts that beat their own average, ready to learn from.", alt: "Breakout posts from competitors, each with how far it beat their usual" },
  { name: "competitors-suggested", w: 1600, h: 834, title: "Accounts like yours, found for you", body: "Peers and bigger accounts in your niche, with a preview of their best posts.", alt: "Suggested competitor accounts with their top posts" },
  { name: "channels", w: 1600, h: 315, title: "Every channel at a glance", body: "Followers, views and interactions across all your accounts, in one view.", alt: "All your channels: total followers, posts, views and interactions" },
]

export function SocialGallery() {
  return (
    <section className="border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">Inside the workspace</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">Everything your agent works from</h2>
          <p className="lede mx-auto mt-6 max-w-xl text-base sm:text-lg">Real screens from the agent, shown on a sample account.</p>
        </Reveal>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <Reveal className="lg:sticky lg:top-28">
            <Screenshot
              name="chat"
              width={720}
              height={1350}
              alt="The Ask your Agent chat, answering which posts to make more of and planning the week"
              sizes="(min-width: 1024px) 380px, 100vw"
              className="mx-auto max-w-[380px] lg:max-w-none"
            />
            <h3 className="mt-4 text-base font-semibold tracking-[-0.01em] text-ink">Ask it anything</h3>
            <p className="mt-1 text-sm leading-relaxed text-quiet">Answers come from your own numbers, and it says which posts it used.</p>
          </Reveal>

          <div className="space-y-10">
            {GALLERY_WIDE.map((g) => (
              <Reveal key={g.name}>
                <Screenshot name={g.name} width={g.w} height={g.h} alt={g.alt} sizes="(min-width: 1024px) 760px, 100vw" />
                <h3 className="mt-4 text-base font-semibold tracking-[-0.01em] text-ink">{g.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-quiet">{g.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ───────────────────────────────────────────────────────────────

export function SocialFinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Hand your social media to an agent</h2>
          <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/65">
            Paste your profile link, watch it find what works, and tell it what to post next.
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
          <p className="mt-6 text-xs text-white/40">Screens on this page use a sample account.</p>
        </div>
        <Ambassador pose="thumbs-up" sizes="360px" className="pointer-events-none absolute -bottom-2 -right-6 hidden h-[300px] w-[270px] sm:block lg:right-8 lg:h-[380px] lg:w-[340px]" />
      </Reveal>
    </section>
  )
}
