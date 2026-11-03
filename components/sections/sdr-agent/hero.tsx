"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { SIGNUP_URL } from "@/lib/links"
import { HeroVideo } from "@/components/ui/hero-video"
import { GhostCta, PrimaryCta } from "@/components/sections/social-agent/parts"

// The SDR agent in his red hoodie: waves, takes a call, sits down to work and
// gives a thumbs up (a 360 KB encode of the 9.4 MB original).

const VIDEO = "/videos/sdr-agent-hero.mp4"
const POSTER = "/videos/sdr-agent-hero-poster.jpg"

const OUTCOMES = ["Leads every morning", "Replies in your inbox", "Hours back every week"]

// What a morning with the agent looks like, landing in turn as the page loads.
const DONE = [
  { text: "38 buyers who fit, found", note: "while you slept", delay: 1.2 },
  { text: "38 personal emails written", note: "in your voice", delay: 2.2 },
  { text: "4 replies waiting", note: "in your inbox", delay: 3.2 },
]

export function SdrAgentHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12 lg:px-8">
        <div className="rise-in text-center lg:text-left">
          <p className="eyebrow mb-5 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sdr" aria-hidden />
            AI SDR Agent
          </p>
          <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.6vw,4.25rem)]">
            Wake up to a <span className="text-sdr">full pipeline</span>, not an empty inbox
          </h1>
          <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
            Your AI SDR finds the buyers who fit, writes to every one of them and handles each follow-up. You spend your day in sales conversations, not lead lists.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <PrimaryCta href={SIGNUP_URL} className="bg-sdr">
              Fill my pipeline
            </PrimaryCta>
            <GhostCta href="#try-it">See who it finds</GhostCta>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {OUTCOMES.map((o) => (
              <li key={o} className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sdr text-white">
                  <Check className="h-3 w-3" />
                </span>
                {o}
              </li>
            ))}
          </ul>
        </div>

        {/* The agent at work, lit red behind, with the morning's results */}
        <div className="rise-in relative mx-auto w-full max-w-[520px]" style={{ animationDelay: "0.15s" }}>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-sdr/30 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-sdr/25 blur-3xl" />
          </div>

          <div className="relative rounded-[40px] bg-sdr-soft p-2.5 shadow-2xl shadow-sdr/15 ring-1 ring-sdr/15">
            <HeroVideo
              src={VIDEO}
              poster={POSTER}
              alt="The Talk to me Data SDR agent, in a red hoodie and cap, waving hello"
              sizes="(min-width: 1024px) 520px, 90vw"
            />
            <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm ring-1 ring-hairline backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sdr opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sdr" />
              </span>
              Prospecting for you
            </span>
          </div>

          {/* Under the clip on phones; on wider screens, in the empty top right he never sits in */}
          <ul className="relative mt-5 flex flex-col items-center gap-2 sm:absolute sm:-right-8 sm:top-24 sm:mt-0 sm:items-end lg:-right-4 xl:-right-12">
            {DONE.map((d) => (
              <li
                key={d.text}
                style={{ animationDelay: `${d.delay}s` }}
                className="pop-in flex items-center gap-2.5 rounded-full border border-hairline bg-white py-1.5 pl-1.5 pr-4 shadow-lg shadow-black/5"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sdr text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-semibold text-ink sm:text-[13px]">
                  {d.text} <span className="font-normal text-quiet sm:hidden">· {d.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
