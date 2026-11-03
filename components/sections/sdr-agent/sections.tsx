"use client"

import Image from "next/image"
import { ArrowRight, Check, Clock, X } from "lucide-react"
import { FaLinkedin, FaMicrosoft } from "react-icons/fa"
import { SiGmail, SiInstagram, SiX } from "react-icons/si"
import { SIGNUP_URL } from "@/lib/links"
import { cn } from "@/lib/utils"
import { PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import { SdrAgentShowcase } from "@/components/sections/sdr-listening-showcases"

/** The sign-up button that closes each section. */
export function SdrGetStarted({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center", className)}>
      <PrimaryCta href={SIGNUP_URL} className="bg-sdr">
        Get started
      </PrimaryCta>
    </div>
  )
}

// ── Where it reaches buyers ─────────────────────────────────────────────────

const CHANNELS = [
  { Icon: SiGmail, label: "Gmail", color: "#EA4335" },
  { Icon: FaMicrosoft, label: "Outlook", color: "#0078D4" },
  { Icon: FaLinkedin, label: "LinkedIn", color: "#0A66C2" },
  { Icon: SiX, label: "X", color: "#000000" },
  { Icon: SiInstagram, label: "Instagram", color: "#E4405F" },
]

export function ChannelStrip() {
  return (
    <section className="border-y border-hairline bg-white px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 xl:flex-row">
        <p className="eyebrow">Reaches your buyers through</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {CHANNELS.map(({ Icon, label, color }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink">
              <Icon className="h-4 w-4" style={{ color }} aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">
          Sends from <span className="text-sdr">your own mailbox</span>
        </p>
      </div>
    </section>
  )
}

// ── Before and after ────────────────────────────────────────────────────────

const WITHOUT = [
  "Hours every week building lead lists by hand",
  "Generic emails that get ignored",
  "Follow-ups that slip the moment you get busy",
  "A pipeline that dries up when you stop prospecting",
]

const WITH = [
  "Fresh buyers who fit, ready every morning",
  "Emails written for each person, so they get answered",
  "Every follow-up sent on time, without you",
  "A pipeline that keeps filling while you sell",
]

export function BeforeAfter() {
  return (
    <section className="bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">What changes</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
            Stop prospecting. <span className="text-sdr">Start closing.</span>
          </h2>
          <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
            Prospecting eats the hours you should spend selling. Hand it to your agent and spend your week talking to buyers who are ready to listen.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal className="flex flex-col rounded-3xl border border-hairline bg-white p-7 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-quiet">
                <Clock className="h-4 w-4" />
              </div>
              <span className="eyebrow">Doing it yourself</span>
            </div>
            <h3 className="mb-6 text-xl font-semibold tracking-[-0.01em] text-ink">Your week goes on admin</h3>
            <ul className="mt-auto space-y-3.5">
              {WITHOUT.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
                  <span className="text-sm leading-relaxed text-quiet">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative flex flex-col overflow-hidden rounded-3xl bg-sdr p-7 sm:p-8">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
            <div className="relative mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white">
                <Check className="h-4 w-4" />
              </div>
              <span className="eyebrow text-white!">With your AI SDR</span>
            </div>
            <h3 className="relative mb-6 text-xl font-semibold tracking-[-0.01em] text-white">Your week goes on selling</h3>
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
        <SdrGetStarted className="mt-12" />
      </div>
    </section>
  )
}

// ── Try it ──────────────────────────────────────────────────────────────────

export function SdrTryIt() {
  return (
    <section id="try-it" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">Try it</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">See the buyers it would bring you</h2>
          <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
            Pick a sample business and open any lead to read the email your agent wrote for them.
          </p>
        </Reveal>
        <Reveal>
          <SdrAgentShowcase howItWorks={false} />
        </Reveal>
      </div>
    </section>
  )
}

// ── How it works ────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "Describe who you sell to",
    body: "In a sentence or two, the way you'd brief a new hire: the kind of company, the size, the person you want to reach.",
  },
  {
    n: "02",
    title: "Get leads and emails in minutes",
    body: "Your agent finds the buyers who fit, checks why now is a good time, and writes to each one. You see exactly who it found and what it wrote.",
  },
  {
    n: "03",
    title: "Let it fill your pipeline",
    body: "On paid plans it sends from your own Gmail or Outlook and lines up every follow-up. The replies come straight to you.",
  },
]

export function SdrHowItWorks() {
  return (
    <section className="border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">How it works</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">From your ideal customer to replies, in three steps</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} className="rounded-3xl border border-hairline bg-white p-7 transition-colors hover:border-sdr sm:p-8">
              <span className="font-mono text-lg font-medium text-sdr">{s.n}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-quiet">{s.body}</p>
            </Reveal>
          ))}
        </div>
        <SdrGetStarted className="mt-12" />
      </div>
    </section>
  )
}

// ── Final CTA ───────────────────────────────────────────────────────────────

export function SdrFinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-sdr px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-black/20 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-xl">
          <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Your next customers are out there. Let your agent find them.</h2>
          <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/80">
            Describe who you sell to and see the buyers, and the emails, your agent hands you in minutes.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={SIGNUP_URL}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-sdr transition-opacity hover:opacity-90"
            >
              Fill my pipeline
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-colors hover:bg-white/10"
            >
              Book Demo
            </a>
          </div>
          <p className="mt-6 text-xs text-white/60">Previews on this page use sample businesses.</p>
        </div>

        {/* The last frame of the hero clip: the agent, seated, thumbs up */}
        <div className="pointer-events-none absolute -bottom-10 right-8 hidden h-[300px] w-[300px] overflow-hidden rounded-full bg-white shadow-2xl shadow-black/25 ring-8 ring-white/20 lg:right-14 lg:block lg:h-[340px] lg:w-[340px] xl:h-[380px] xl:w-[380px]">
          <Image
            src="/videos/sdr-agent-hero-end.jpg"
            alt="The SDR agent at his laptop, on a call, giving a thumbs up"
            width={720}
            height={720}
            sizes="360px"
            className="h-full w-full object-cover"
          />
        </div>
      </Reveal>
    </section>
  )
}
