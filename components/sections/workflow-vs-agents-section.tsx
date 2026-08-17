"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  X, Check, AlertTriangle, Wrench, Sparkles, ArrowRight, CornerDownRight,
} from "lucide-react"

const BUILDER_POINTS = [
  "Drag, connect, and map every field by hand",
  "Add a new branch for every edge case",
  "It breaks the moment a tool or field changes",
  "You own the upkeep — forever",
]

const AGENT_POINTS = [
  "Describe the outcome in plain English",
  "It reasons through edge cases — no branches to build",
  "Adapts when your tools or process change",
  "We build, host, and maintain it for you",
]

export function WorkflowVsAgentsSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="mb-14 text-center">
            <p className="eyebrow mb-5">A smarter way to automate</p>
            <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
              Don&apos;t build workflows. Just tell your agent what to do.
            </h2>
            <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
              Tools like Zapier and n8n make you wire every step by hand — then rebuild it the moment something
              changes. An AI agent works from a plain-language brief and adapts on its own.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
            {/* ── The workflow-builder way ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col rounded-3xl border border-hairline bg-white p-7 sm:p-8"
            >
              <div className="mb-2 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-quiet">
                  <Wrench className="h-4 w-4" />
                </div>
                <span className="eyebrow">Zapier · n8n · Make</span>
              </div>
              <h3 className="mb-6 text-xl font-semibold tracking-[-0.01em] text-ink">Building workflows by hand</h3>

              {/* A real hand-built workflow */}
              <div className="mb-6 rounded-[18px] border border-hairline bg-mist p-2">
                <div className="overflow-hidden rounded-xl border border-hairline">
                  <Image
                    src="/n8n-workflow-daily-github-trending.png"
                    alt="A tangled n8n workflow wired by hand — dozens of nodes for triggers, filters, API calls and error handling"
                    width={1986}
                    height={1247}
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-3 flex items-center gap-1.5 px-1 pb-1 text-xs font-medium text-quiet">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  Breaks when a field or tool changes
                </div>
              </div>

              <ul className="mt-auto space-y-3">
                {BUILDER_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
                    <span className="text-sm leading-relaxed text-quiet">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── The AI agent way ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative flex flex-col rounded-3xl bg-ink p-7 sm:p-8"
            >
              <span className="absolute right-6 top-7 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white sm:top-8">
                <Check className="h-3 w-3" />
                The TTMD way
              </span>

              <div className="mb-2 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="eyebrow text-white/50">Your AI agent</span>
              </div>
              <h3 className="mb-6 text-xl font-semibold tracking-[-0.01em] text-white">Prompting an AI agent</h3>

              {/* Plain-language prompt → agent → done */}
              <div className="mb-6 rounded-[18px] border border-white/15 bg-white/5 p-2">
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src="/prompting-ai-agent.png"
                    alt="You describe the outcome in plain English, and the AI agent qualifies the lead, books the call, and handles it end to end"
                    width={1986}
                    height={1247}
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-3 flex items-center gap-1.5 px-1 pb-1 text-xs font-medium text-white/60">
                  <CornerDownRight className="h-3.5 w-3.5 shrink-0" />
                  Handled end to end from one plain-English brief
                </div>
              </div>

              <ul className="mt-auto space-y-3">
                {AGENT_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                    <span className="text-sm leading-relaxed text-white/80">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/get-started"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Describe your workflow <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <p className="text-sm text-faint">No nodes to wire · Live in 24 hours</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
