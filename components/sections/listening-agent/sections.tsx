"use client"

import Image from "next/image"
import { ArrowRight, Check, Clock, Ear, X } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"
import { SiFacebook, SiInstagram, SiReddit, SiThreads, SiX, SiYoutube } from "react-icons/si"
import { SIGNUP_URL } from "@/lib/links"
import { cn } from "@/lib/utils"
import { PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import { ListeningAgentShowcase } from "@/components/sections/sdr-listening-showcases"

/** The sign-up button that closes a section. */
export function ListeningGetStarted({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center", className)}>
      <PrimaryCta href={SIGNUP_URL}>Get started</PrimaryCta>
    </div>
  )
}

// ── Where it listens ────────────────────────────────────────────────────────

const PLATFORMS = [
  { Icon: SiReddit, label: "Reddit", color: "#FF4500" },
  { Icon: SiX, label: "X", color: "#000000" },
  { Icon: SiThreads, label: "Threads", color: "#000000" },
  { Icon: SiYoutube, label: "YouTube", color: "#FF0000" },
  { Icon: FaLinkedin, label: "LinkedIn", color: "#0A66C2" },
  { Icon: SiFacebook, label: "Facebook", color: "#0866FF" },
  { Icon: SiInstagram, label: "Instagram", color: "#E4405F" },
]

export function PlatformStrip() {
  return (
    <section className="border-y border-hairline bg-white px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 xl:flex-row">
        <p className="eyebrow">Listens on</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {PLATFORMS.map(({ Icon, label, color }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink">
              <Icon className="h-4 w-4" style={{ color }} aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">
          Drafts replies · <span className="text-ink">you send them</span>
        </p>
      </div>
    </section>
  )
}

// ── Before and after ────────────────────────────────────────────────────────

const WITHOUT = [
  "Hours scrolling Reddit and X hoping to spot a buyer",
  "Missing the posts that went up while you slept",
  "Wading through self-promotion and job posts",
  "Replies written from scratch that read like an ad",
]

const WITH = [
  "People asking for what you sell, found every day",
  "Seven platforms covered, without opening one",
  "The noise filtered out: no vendors, no self-promotion, no job posts",
  "A helpful reply and a DM drafted for every one",
]

export function BeforeAfter() {
  return (
    <section className="bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">What changes</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">Stop scrolling for leads. Start replying to buyers.</h2>
          <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
            Every day people post asking for exactly what you sell. Your agent finds them first, so you&apos;re the one who answers.
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
            <h3 className="mb-6 text-xl font-semibold tracking-[-0.01em] text-ink">Hours of scrolling, little to show</h3>
            <ul className="mt-auto space-y-3.5">
              {WITHOUT.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
                  <span className="text-sm leading-relaxed text-quiet">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative flex flex-col overflow-hidden rounded-3xl bg-ink p-7 sm:p-8">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="relative mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white">
                <Ear className="h-4 w-4" />
              </div>
              <span className="eyebrow text-white!">With your listening agent</span>
            </div>
            <h3 className="relative mb-6 text-xl font-semibold tracking-[-0.01em] text-white">Buyers find their way to you</h3>
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
        <ListeningGetStarted className="mt-12" />
      </div>
    </section>
  )
}

// ── Try it ──────────────────────────────────────────────────────────────────

export function ListeningTryIt() {
  return (
    <section id="try-it" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">Try it</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">See the buyers it would find you</h2>
          <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
            Pick a sample business and open any post to read the reply and DM your agent drafted.
          </p>
        </Reveal>
        <Reveal>
          <ListeningAgentShowcase howItWorks={false} />
        </Reveal>
      </div>
    </section>
  )
}

// ── How it works ────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "Describe who you want to reach",
    body: "In a sentence or two: the people you help and the problem they post about. That's all your agent needs to start listening.",
  },
  {
    n: "02",
    title: "Get matches with replies drafted",
    body: "Your agent reads the conversations, skips the noise and hands you the posts worth answering, each with a reply and a DM ready.",
  },
  {
    n: "03",
    title: "Send, and start conversations",
    body: "Pick the ones you like, make any change you want and send them yourself. Your agent keeps listening, every day.",
  },
]

export function ListeningHowItWorks() {
  return (
    <section className="border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">How it works</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">From who you want to reach to conversations, in three steps</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} className="rounded-3xl border border-hairline bg-white p-7 transition-colors hover:border-ink sm:p-8">
              <span className="font-mono text-lg font-medium text-ink">{s.n}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-quiet">{s.body}</p>
            </Reveal>
          ))}
        </div>
        <ListeningGetStarted className="mt-12" />
      </div>
    </section>
  )
}

// ── Final CTA ───────────────────────────────────────────────────────────────

export function ListeningFinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-xl">
          <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Someone is asking for what you sell right now. Be the one who answers.</h2>
          <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/70">
            Describe who you want to reach and see the posts, and the replies, your agent hands you.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={SIGNUP_URL}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-opacity hover:opacity-90"
            >
              Find my customers
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-colors hover:bg-white/10"
            >
              Book Demo
            </a>
          </div>
          <p className="mt-6 text-xs text-white/40">Previews on this page use sample businesses.</p>
        </div>

        <div className="pointer-events-none absolute -bottom-10 right-8 hidden h-[300px] w-[300px] overflow-hidden rounded-full bg-white shadow-2xl shadow-black/40 ring-8 ring-white/10 lg:right-14 lg:block lg:h-[340px] lg:w-[340px] xl:h-[380px] xl:w-[380px]">
          <Image
            src="/Social-listening-body-agent.jpeg"
            alt="The social listening agent waving"
            width={1024}
            height={1024}
            sizes="380px"
            className="h-full w-full scale-125 object-cover object-[50%_15%]"
          />
        </div>
      </Reveal>
    </section>
  )
}
