"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ChevronRight, X, Check, AlertTriangle, Wrench, Sparkles, ArrowRight, CornerDownRight,
} from "lucide-react"

// The brittle chain a builder wires by hand in Zapier / n8n / Make
const WORKFLOW_STEPS = ["Trigger", "Filter", "Format", "If / else", "API call", "Handle error", "Update CRM"]

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
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">A smarter way to automate</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              Don&apos;t build workflows.{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">
                Just tell your agent what to do.
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
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
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 sm:p-8"
            >
              <div className="flex items-center gap-2.5 mb-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-200">
                  <Wrench className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Zapier · n8n · Make</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-6">Building workflows by hand</h3>

              {/* Brittle node chain */}
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4 mb-6">
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                  {WORKFLOW_STEPS.map((step, i) => (
                    <div key={step} className="flex items-center gap-1.5">
                      <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-500 shadow-sm">
                        {step}
                      </span>
                      {i < WORKFLOW_STEPS.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-amber-600">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  Breaks when a field or tool changes
                </div>
              </div>

              <ul className="space-y-3 mt-auto">
                {BUILDER_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <X className="h-4 w-4 text-slate-300 mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed text-slate-500">{point}</span>
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
              className="relative flex flex-col rounded-2xl border border-primary/20 bg-primary/5 p-7 sm:p-8 shadow-sm"
            >
              <span className="absolute right-6 top-7 sm:top-8 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                <Check className="h-3 w-3" />
                The TTMD way
              </span>

              <div className="flex items-center gap-2.5 mb-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-violet-500 text-white shadow-sm">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-primary/70">Your AI agent</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Prompting an AI agent</h3>

              {/* Plain-language prompt → outcome */}
              <div className="rounded-xl border border-primary/15 bg-white p-4 mb-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">You say</p>
                <p className="text-sm leading-relaxed text-slate-700 font-medium">
                  &ldquo;When a new lead fills out the form, qualify them against our ICP, and book a call if they&apos;re a fit.&rdquo;
                </p>
                <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3">
                  <CornerDownRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm leading-relaxed text-slate-600">
                    The agent handles it end to end — and asks you when it&apos;s genuinely unsure.
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mt-auto">
                {AGENT_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm leading-relaxed text-slate-700 font-medium">{point}</span>
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
              className="relative overflow-hidden group inline-flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Describe your workflow <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <p className="text-sm text-slate-400">No nodes to wire · Live in 24 hours</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
