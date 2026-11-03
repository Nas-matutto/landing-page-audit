"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { SIGNUP_URL } from "@/lib/links"
import { HeroVideo } from "@/components/ui/hero-video"
import { GhostCta, PrimaryCta } from "@/components/sections/social-agent/parts"

// The SEO agent in his green hoodie: walks in, sits down with a coffee, gets
// to work and gives a thumbs up (a 460 KB encode of the 11.5 MB original).

const VIDEO = "/videos/seo-agent-hero.mp4"
const POSTER = "/videos/seo-agent-hero-poster.jpg"

const OUTCOMES = ["More clicks from Google", "Cited in AI answers", "New pages every week"]

// What a week with the agent looks like, landing in turn as the page loads.
const DONE = [
  { text: "5 searches you can win, found", note: "from your Search Console", delay: 1.2 },
  { text: "New page live on your site", note: "built for Google and AI", delay: 2.2 },
  { text: "+640 clicks a month in reach", note: "from one page", delay: 3.2 },
]

export function SeoAgentHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12 lg:px-8">
        <div className="rise-in text-center lg:text-left">
          <p className="eyebrow mb-5 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-seo" aria-hidden />
            AI SEO &amp; GEO Agent
          </p>
          <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.6vw,4.25rem)]">
            More customers from <span className="text-seo">Google and ChatGPT</span>, without writing a word
          </h1>
          <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
            Your agent finds the searches you can win, writes the pages that win them and publishes them to your site. You watch the traffic grow.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <PrimaryCta href={SIGNUP_URL} className="bg-seo">
              Grow my traffic
            </PrimaryCta>
            <GhostCta href="#try-it">See what it finds</GhostCta>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {OUTCOMES.map((o) => (
              <li key={o} className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-seo text-white">
                  <Check className="h-3 w-3" />
                </span>
                {o}
              </li>
            ))}
          </ul>
        </div>

        {/* The agent at work, lit green behind, with the week's results */}
        <div className="rise-in relative mx-auto w-full max-w-[520px]" style={{ animationDelay: "0.15s" }}>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-seo/30 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-seo/25 blur-3xl" />
          </div>

          <div className="relative rounded-[40px] bg-seo-soft p-2.5 shadow-2xl shadow-seo/15 ring-1 ring-seo/15">
            <HeroVideo
              src={VIDEO}
              poster={POSTER}
              alt="The Talk to me Data SEO agent, in a green hoodie and cap, waving hello"
              sizes="(min-width: 1024px) 520px, 90vw"
            />
            <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm ring-1 ring-hairline backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-seo opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-seo" />
              </span>
              Growing your traffic
            </span>
          </div>

          {/* Under the clip on phones; on wider screens, in the empty top right he never fills */}
          <ul className="relative mt-5 flex flex-col items-center gap-2 sm:absolute sm:-right-8 sm:top-24 sm:mt-0 sm:items-end lg:-right-4 xl:-right-12">
            {DONE.map((d) => (
              <li
                key={d.text}
                style={{ animationDelay: `${d.delay}s` }}
                className="pop-in flex items-center gap-2.5 rounded-full border border-hairline bg-white py-1.5 pl-1.5 pr-4 shadow-lg shadow-black/5"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-seo text-white">
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
