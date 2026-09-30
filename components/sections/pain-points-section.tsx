"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { X, Check, ArrowRight } from "lucide-react"

// One job every business has, done both ways: keeping social media going.
const rows = [
  {
    dim: "Checking what worked",
    cold: "Scroll through insights, screenshot posts, and guess why one took off",
    warm: "Reads every post and tells you which formats and hooks win, and why",
  },
  {
    dim: "Watching competitors",
    cold: "Visit rival accounts one by one and try to remember what they posted",
    warm: "Tracks them for you and flags every post that breaks out",
  },
  {
    dim: "Deciding what to post",
    cold: "Sit down to a blank calendar on Sunday night",
    warm: "Plans your week into the days and times that work best for you",
  },
  {
    dim: "Making the content",
    cold: "Write the caption, then wait on a designer or wrestle with templates",
    warm: "Writes the hook, script and caption, and designs it in your brand kit",
  },
  {
    dim: "Posting it",
    cold: "Set reminders, post by hand, and miss half of them",
    warm: "Posts it on schedule, or sends you the finished post to share yourself",
  },
]

const gridCols =
  "grid grid-cols-2 md:grid-cols-[minmax(150px,0.8fr)_1fr_1fr] lg:grid-cols-[170px_1fr_1fr]"

export function PainPointsSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14 text-center">
            <p className="eyebrow mb-5">The manual way vs. the agent way</p>
            <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
              Social media eats your week. An agent gives it back.
            </h2>
            <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
              Take one job every business has to keep up with. Here&apos;s a normal week of it done by hand, and the
              same week with an agent doing the work.
            </p>
          </div>

          {/* Comparison matrix */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="divide-y divide-hairline overflow-hidden rounded-3xl border border-hairline bg-white"
          >
            {/* Header row */}
            <div className={gridCols}>
              <div className="hidden px-6 py-4 md:block" />
              <div className="px-4 py-3 sm:px-6 md:py-4 lg:px-4">
                <span className="text-sm font-semibold text-quiet">Doing it by hand</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-l border-hairline bg-mist px-4 py-3 sm:px-6 md:py-4 lg:px-4">
                <span className="text-sm font-semibold text-ink">With an AI agent</span>
                <span className="hidden items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white sm:inline-flex">
                  <Check className="h-3 w-3" />
                  Done for you
                </span>
              </div>
            </div>

            {/* Comparison rows */}
            {rows.map((row, i) => (
              <div key={i} className={gridCols}>
                {/* Dimension label */}
                <div className="col-span-2 flex items-center bg-mist px-4 pb-1.5 pt-3 sm:px-6 md:col-span-1 md:py-5 lg:px-4">
                  <span className="eyebrow">{row.dim}</span>
                </div>

                {/* By hand */}
                <div className="flex items-start gap-2 px-4 py-4 sm:gap-2.5 sm:px-6 md:py-5 lg:px-4">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
                  <span className="text-sm leading-relaxed text-quiet lg:text-[13px]">{row.cold}</span>
                </div>

                {/* Agent */}
                <div className="flex items-start gap-2 border-l border-hairline bg-mist px-4 py-4 sm:gap-2.5 sm:px-6 md:py-5 lg:px-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                  <span className="text-sm font-medium leading-relaxed text-ink lg:text-[13px]">{row.warm}</span>
                </div>
              </div>
            ))}

            {/* Time-spent footer row */}
            <div className={gridCols}>
              <div className="col-span-2 flex items-center bg-mist px-4 pb-1.5 pt-3 sm:px-6 md:col-span-1 md:py-6 lg:px-4">
                <span className="eyebrow">Your time</span>
              </div>
              <div className="flex items-center px-4 py-4 sm:px-6 md:py-6 lg:px-4">
                <span className="text-xl font-semibold tracking-[-0.01em] text-faint sm:text-2xl">Hours, every week</span>
              </div>
              <div className="flex items-center border-l border-hairline bg-mist px-4 py-4 sm:px-6 md:py-6 lg:px-4">
                <span className="text-xl font-semibold tracking-[-0.01em] text-ink sm:text-2xl">Minutes to approve</span>
              </div>
            </div>
          </motion.div>

          {/* The same shift, for every other job */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5"
          >
            <p className="text-sm text-quiet">
              Social media is one example. SEO, lead follow-up, support and reporting work the same way.
            </p>
            <Link
              href="/agents/social-media"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink"
            >
              Meet the social media agent
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
