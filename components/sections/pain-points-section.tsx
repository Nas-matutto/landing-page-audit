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
    dim: "Custom integrations",
    cold: "Wire up every tool and API connection yourself",
    warm: "We build the integrations into your stack for you",
  },
  {
    dim: "API costs",
    cold: "You set up billing and watch rate limits and overages",
    warm: "API costs are handled and bundled - nothing to manage",
  },
  {
    dim: "Hosting & upkeep",
    cold: "Host, scale, monitor, and patch it on your own",
    warm: "Fully hosted and monitored on our platform",
  },
]

const reassurances = [
  "No API bills to manage",
  "Custom integrations included",
  "Hosted & monitored for you",
]

const gridCols = "grid grid-cols-2 md:grid-cols-[minmax(150px,0.8fr)_1fr_1fr]"

export function PainPointsSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">The old way vs. the TTMD way</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              Building AI in-house is broken.{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">
                We fix it.
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
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
            className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-200 bg-white"
          >
            {/* Header row */}
            <div className={gridCols}>
              <div className="hidden md:block px-6 py-4" />
              <div className="px-4 sm:px-6 py-3 md:py-4">
                <span className="text-sm font-semibold text-slate-500">Building it yourself</span>
              </div>
              <div className="px-4 sm:px-6 py-3 md:py-4 bg-primary/5 border-l border-primary/15 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-800">With TTMD</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                  <Check className="w-3 h-3" />
                  Done for you
                </span>
              </div>
            </div>

            {/* Comparison rows */}
            {rows.map((row, i) => (
              <div key={i} className={gridCols}>
                {/* Dimension label */}
                <div className="col-span-2 md:col-span-1 px-4 sm:px-6 pt-3 pb-1.5 md:py-5 flex items-center bg-slate-50/60">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">{row.dim}</span>
                </div>

                {/* In-house */}
                <div className="px-4 sm:px-6 py-4 md:py-5 flex items-start gap-2 sm:gap-2.5">
                  <X className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                  <span className="text-sm leading-relaxed text-slate-500">{row.cold}</span>
                </div>

                {/* TTMD */}
                <div className="px-4 sm:px-6 py-4 md:py-5 flex items-start gap-2 sm:gap-2.5 bg-primary/5 border-l border-primary/15">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm leading-relaxed text-slate-700 font-medium">{row.warm}</span>
                </div>
              </div>
            ))}

            {/* Time-to-live footer row */}
            <div className={gridCols}>
              <div className="col-span-2 md:col-span-1 px-4 sm:px-6 pt-3 pb-1.5 md:py-6 flex items-center bg-slate-50/60">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Time to live</span>
              </div>
              <div className="px-4 sm:px-6 py-4 md:py-6 flex items-center">
                <span className="text-xl sm:text-2xl font-bold text-slate-400">Months</span>
              </div>
              <div className="px-4 sm:px-6 py-4 md:py-6 flex items-center bg-primary/5 border-l border-primary/15">
                <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">
                  Days
                </span>
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
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600"
              >
                <Check className="w-4 h-4 text-primary shrink-0" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
