"use client"

import { motion } from "framer-motion"
import { X, Check } from "lucide-react"

const rows = [
  {
    dim: "Getting started",
    cold: "Map your Agent and build it from the ground up",
    warm: "Describe your workflow in plain language",
  },
  {
    dim: "Integrations",
    cold: "Wire up every tool and API connection yourself",
    warm: "We build the integrations into your stack for you",
  },
  {
    dim: "API costs",
    cold: "You set up billing and watch rate limits and overages",
    warm: "API costs are handled and bundled - nothing to manage",
  },
  {
    dim: "Hosting",
    cold: "Host, scale, monitor, and patch it on your own",
    warm: "Fully hosted and monitored on our platform",
  },
]

const reassurances = [
  "No API bills to manage",
  "Custom integrations included",
  "Hosted & monitored for you",
]

const gridCols =
  "grid grid-cols-2 md:grid-cols-[minmax(150px,0.8fr)_1fr_1fr] lg:grid-cols-[150px_1fr_1fr]"

export function PainPointsSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14 text-center">
            <p className="eyebrow mb-5">The old way vs. the TTMD way</p>
            <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
              Building AI in-house is broken. We fix it.
            </h2>
            <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
              We don&apos;t just build the agent - we handle the API costs, the custom integrations, and the hosting.
              You don&apos;t manage a single thing.
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
                <span className="text-sm font-semibold text-quiet">Building it yourself</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-l border-hairline bg-mist px-4 py-3 sm:px-6 md:py-4 lg:px-4">
                <span className="text-sm font-semibold text-ink">With TTMD</span>
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

                {/* In-house */}
                <div className="flex items-start gap-2 px-4 py-4 sm:gap-2.5 sm:px-6 md:py-5 lg:px-4">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
                  <span className="text-sm leading-relaxed text-quiet lg:text-[13px]">{row.cold}</span>
                </div>

                {/* TTMD */}
                <div className="flex items-start gap-2 border-l border-hairline bg-mist px-4 py-4 sm:gap-2.5 sm:px-6 md:py-5 lg:px-4">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                  <span className="text-sm font-medium leading-relaxed text-ink lg:text-[13px]">{row.warm}</span>
                </div>
              </div>
            ))}

            {/* Time-to-live footer row */}
            <div className={gridCols}>
              <div className="col-span-2 flex items-center bg-mist px-4 pb-1.5 pt-3 sm:px-6 md:col-span-1 md:py-6 lg:px-4">
                <span className="eyebrow">Time to live</span>
              </div>
              <div className="flex items-center px-4 py-4 sm:px-6 md:py-6 lg:px-4">
                <span className="text-xl font-semibold tracking-[-0.01em] text-faint sm:text-2xl">Months</span>
              </div>
              <div className="flex items-center border-l border-hairline bg-mist px-4 py-4 sm:px-6 md:py-6 lg:px-4">
                <span className="text-xl font-semibold tracking-[-0.01em] text-ink sm:text-2xl">Days</span>
              </div>
            </div>
          </motion.div>

          {/* Reassurance strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {reassurances.map((text, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm font-medium text-quiet"
              >
                <Check className="h-4 w-4 shrink-0 text-ink" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
