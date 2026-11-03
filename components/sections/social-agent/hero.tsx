"use client"

import { Check } from "lucide-react"
import { SIGNUP_URL } from "@/lib/links"
import { HeroVideo } from "@/components/ui/hero-video"
import { GhostCta, PrimaryCta } from "./parts"

const VERBS = ["Finds", "Tracks", "Creates", "Posts"]

// The agent in his black hoodie: waves, takes a call, sits down to work and
// gives a thumbs up (a 340 KB encode of the 3.8 MB original).

// The agent "working" as the page loads: each finished job lands in turn.
const DONE = [
  { text: "Found your best post", note: "2.4× your median", delay: 0.9 },
  { text: "Designed the carousel", note: "in your brand kit", delay: 1.8 },
  { text: "Scheduled for Tue 9:00", note: "auto-posts to Instagram", delay: 2.7 },
]

export function SocialAgentHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12 lg:px-8">
        <div className="rise-in text-center lg:text-left">
          <p className="eyebrow mb-5">AI Social Media Agent</p>
          <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.4vw,4rem)]">
            An AI agent that runs your social media
          </h1>
          <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
            Tell it what you want. It finds your winning posts, tracks your competitors, designs the content, and posts it for you.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <PrimaryCta href={SIGNUP_URL}>Get Started</PrimaryCta>
            <GhostCta href="#agent-demo">See it work</GhostCta>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {VERBS.map((verb) => (
              <li key={verb} className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="h-3 w-3" />
                </span>
                It {verb.toLowerCase()}
              </li>
            ))}
          </ul>
        </div>

        {/* The agent at work, with the jobs he finishes */}
        <div className="rise-in relative mx-auto w-full max-w-[520px]" style={{ animationDelay: "0.15s" }}>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-ink/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-ink/10 blur-3xl" />
          </div>

          <div className="relative rounded-[40px] bg-mist p-2.5 shadow-2xl shadow-black/10 ring-1 ring-hairline">
            <HeroVideo
              src="/videos/social-agent-hero.mp4"
              poster="/videos/social-agent-hero-poster.jpg"
              alt="The Talk to me Data social media agent, in a black hoodie and cap, waving hello"
              sizes="(min-width: 1024px) 520px, 90vw"
            />
            <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm ring-1 ring-hairline backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-50 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
              </span>
              Running your socials
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
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
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
