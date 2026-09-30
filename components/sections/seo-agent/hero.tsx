"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Ambassador } from "@/components/ui/ambassador"
import { SIGNUP_URL } from "@/lib/links"
import { GhostCta, PrimaryCta } from "@/components/sections/social-agent/parts"
import { OverviewPanel } from "./mocks"

const VERBS = ["Finds", "Writes", "Publishes", "Tracks"]

// The agent "working" as the page loads: each finished job lands in turn.
const DONE = [
  { text: "Found 5 searches you can win", note: "from your Search Console", delay: 0.9 },
  { text: "Wrote the page", note: "built for Google and AI", delay: 1.8 },
  { text: "Published to Webflow", note: "tracking where it ranks", delay: 2.7 },
]

export function SeoAgentHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <p className="eyebrow mb-5">AI SEO &amp; GEO Agent</p>
          <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.4vw,4rem)]">
            An AI agent that gets you found on Google and in AI answers
          </h1>
          <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
            Connect your Search Console. It finds the searches you can win, writes the pages, and publishes them to your site.
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
        </motion.div>

        {/* The workspace, with the ambassador and the jobs he finishes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl pb-10 lg:max-w-none lg:pb-0"
        >
          <OverviewPanel />

          <Ambassador
            pose="wave"
            sizes="180px"
            className="pointer-events-none absolute -bottom-6 -left-3 h-[250px] w-[124px] drop-shadow-xl sm:-left-8 sm:h-[330px] sm:w-[164px] lg:-left-14 lg:-bottom-10"
            priority
          />

          <ul className="absolute -bottom-2 right-0 flex flex-col items-end gap-2 sm:bottom-6 sm:-right-4 lg:-right-6">
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
