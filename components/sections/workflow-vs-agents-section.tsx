"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  X, Check, AlertTriangle, Wrench, Sparkles, ArrowRight, Play, RotateCcw, Zap, Loader2, MousePointer2, CornerDownRight,
} from "lucide-react"
import { Ambassador, type AmbassadorPose } from "@/components/ui/ambassador"
import { cn } from "@/lib/utils"

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

// ── The demo: one task, done both ways ──────────────────────────────────────

const TASK = "Qualify every new lead. If they're a fit, book a call and tell me in Slack."

const NODES = [
  { title: "New lead", kind: "Webhook" },
  { title: "Valid email?", kind: "Filter" },
  { title: "Look up company", kind: "HTTP request" },
  { title: "Fit score above 70?", kind: "IF" },
  { title: "Create contact", kind: "CRM" },
  { title: "Book a call", kind: "Calendar" },
  { title: "Notify #sales", kind: "Slack" },
]
/** The CRM node is the one that breaks when a field is renamed. */
const BROKEN_NODE = 4

const AGENT_STEPS = [
  "Read the new lead",
  "Researched their company",
  "Scored the fit: strong",
  "Booked a call for Thursday 2pm",
  "Told #sales in Slack",
]

// Time moves in ticks. The agent needs one per step; the workflow needs two
// per node, because every node has to be dragged in and wired by hand.
const TICK_MS = 350
const TICKS_PER_NODE = 2
const AGENT_START = 2
const AGENT_DONE_TICK = AGENT_START + AGENT_STEPS.length
const BUILD_DONE_TICK = NODES.length * TICKS_PER_NODE + 1

type Phase = "idle" | "building" | "built" | "changing" | "changed"

export function WorkflowVsAgentsSection() {
  const [phase, setPhase] = useState<Phase>("idle")
  const [tick, setTick] = useState(0)

  // Everything advances from one clock, so the two lanes stay in step.
  useEffect(() => {
    if (phase !== "building" && phase !== "changing") return
    const id = window.setInterval(() => setTick((t) => t + 1), TICK_MS)
    return () => window.clearInterval(id)
  }, [phase])

  useEffect(() => {
    if (phase === "building" && tick >= BUILD_DONE_TICK) setPhase("built")
    if (phase === "changing" && tick >= BUILD_DONE_TICK + 4) setPhase("changed")
  }, [phase, tick])

  const running = phase === "building" || phase === "changing"
  const changed = phase === "changing" || phase === "changed"

  // Left lane: how many nodes have been wired so far.
  const nodesBuilt = phase === "building" ? Math.min(NODES.length, Math.floor(tick / TICKS_PER_NODE)) : NODES.length
  const wiringIndex = phase === "building" && nodesBuilt < NODES.length ? nodesBuilt : -1

  // Right lane: how many steps the agent has finished.
  const agentDone = phase === "idle" ? 0 : phase === "building" ? Math.max(0, Math.min(AGENT_STEPS.length, tick - AGENT_START + 1)) : AGENT_STEPS.length
  const agentFinished = phase !== "idle" && agentDone >= AGENT_STEPS.length
  const adapting = phase === "changing" && tick < BUILD_DONE_TICK + 2
  const adapted = phase === "changed" || (phase === "changing" && !adapting)

  const pose: AmbassadorPose =
    phase === "idle" ? "wave" : adapting || (phase === "building" && !agentFinished) ? "working" : "thumbs-up"

  const bubble =
    phase === "idle"
      ? "Describe it once. I'll take it from here."
      : adapting
        ? "Your CRM renamed a field. Looking for the new one…"
        : adapted
          ? "Found it and carried on. Nothing to rebuild."
          : agentFinished
            ? "Done, from one sentence. Waiting on the workflow…"
            : "On it…"

  const workflowCaption =
    phase === "idle"
      ? "7 nodes, wired by hand"
      : phase === "building"
        ? `Wiring node ${Math.min(nodesBuilt + 1, NODES.length)} of ${NODES.length}…`
        : phase === "built"
          ? "Wired. Now test every branch."
          : "Stopped: field “company” not found. Fix it, then re-test."

  function start() {
    setTick(0)
    setPhase("building")
  }
  function change() {
    setPhase("changing")
  }

  const control =
    phase === "idle"
      ? { label: "Run it both ways", Icon: Play, onClick: start }
      : phase === "built"
        ? { label: "Now change something", Icon: Zap, onClick: change }
        : phase === "changed"
          ? { label: "Replay", Icon: RotateCcw, onClick: start }
          : { label: "Running…", Icon: Loader2, onClick: undefined }

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <div className="mb-12 text-center">
            <p className="eyebrow mb-5">A smarter way to automate</p>
            <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
              Don&apos;t build workflows. Just tell your agent what to do.
            </h2>
            <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
              Tools like Zapier and n8n make you wire every step by hand — then rebuild it the moment something
              changes. An AI agent works from a plain-language brief and adapts on its own.
            </p>
          </div>

          {/* The task, and the button that runs it both ways */}
          <div className="mx-auto mb-6 flex max-w-3xl flex-col items-stretch gap-3 rounded-[28px] border border-hairline bg-mist p-2 pl-5 sm:flex-row sm:items-center sm:rounded-full">
            <p className="flex-1 py-2 text-sm leading-snug text-quiet sm:py-0">
              <span className="eyebrow mr-2">The task</span>
              <span className="font-medium text-ink">“{TASK}”</span>
            </p>
            <button
              type="button"
              onClick={control.onClick}
              disabled={running}
              className="group relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85 disabled:cursor-default disabled:opacity-60"
            >
              <span className="relative flex items-center gap-2">
                <control.Icon className={cn("h-4 w-4", running && "animate-spin")} />
                {control.label}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            {/* ── The workflow-builder way ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col rounded-3xl border border-hairline bg-white p-6 sm:p-8"
            >
              <div className="mb-2 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-quiet">
                  <Wrench className="h-4 w-4" />
                </div>
                <span className="eyebrow">Zapier · n8n · Make</span>
              </div>
              <h3 className="mb-5 text-xl font-semibold tracking-[-0.01em] text-ink">Building workflows by hand</h3>

              <div className="mb-6 rounded-[18px] border border-hairline bg-mist p-3">
                <ol className="space-y-0">
                  {NODES.map((node, i) => {
                    const built = i < nodesBuilt
                    const wiring = i === wiringIndex
                    const broken = changed && i === BROKEN_NODE
                    const downstream = changed && i > BROKEN_NODE
                    return (
                      <li key={node.title}>
                        {i > 0 && (
                          <span
                            aria-hidden
                            className={cn(
                              "ml-5.5 block h-3 border-l-2 transition-colors duration-300",
                              built && !downstream ? "border-ink/25" : "border-dashed border-hairline",
                            )}
                          />
                        )}
                        <div
                          className={cn(
                            "flex items-center gap-3 rounded-xl border px-3 py-2 transition-all duration-300",
                            broken
                              ? "border-red-300 bg-red-50"
                              : built
                                ? "border-hairline bg-white"
                                : "border-dashed border-hairline bg-transparent",
                            wiring && "border-ink bg-white shadow-sm",
                            downstream && "opacity-45",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-medium transition-colors",
                              broken ? "bg-red-600 text-white" : built ? "bg-ink text-white" : "bg-transparent text-faint ring-1 ring-inset ring-hairline",
                            )}
                          >
                            {broken ? <AlertTriangle className="h-3 w-3" /> : String(i + 1).padStart(2, "0")}
                          </span>
                          <span className={cn("min-w-0 flex-1 transition-opacity", built || wiring ? "opacity-100" : "opacity-40")}>
                            <span className="block truncate text-[13px] font-semibold text-ink">
                              {built || wiring ? node.title : "Empty slot"}
                            </span>
                            <span className="block truncate font-mono text-[10px] uppercase tracking-wider text-quiet">
                              {broken ? "Field “company” not found" : built || wiring ? node.kind : "Drag a node here"}
                            </span>
                          </span>
                          {wiring && <MousePointer2 className="h-4 w-4 shrink-0 animate-pulse text-ink" />}
                          {built && !broken && !downstream && <Check className="h-3.5 w-3.5 shrink-0 text-faint" />}
                        </div>
                      </li>
                    )
                  })}
                </ol>

                <div
                  aria-live="polite"
                  className={cn(
                    "mt-3 flex items-center gap-1.5 px-1 pb-0.5 text-xs font-medium",
                    phase === "changed" || phase === "changing" ? "text-red-700" : "text-quiet",
                  )}
                >
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  {workflowCaption}
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
              className="relative flex flex-col overflow-hidden rounded-3xl bg-ink p-6 sm:p-8"
            >
              <span className="absolute right-5 top-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white sm:right-6 sm:top-8">
                <Check className="h-3 w-3" />
                The TTMD way
              </span>

              <div className="mb-2 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="eyebrow text-white/50">Your AI agent</span>
              </div>
              <h3 className="mb-5 text-xl font-semibold tracking-[-0.01em] text-white">Prompting an AI agent</h3>

              <div className="mb-6 flex flex-1 flex-col rounded-[18px] border border-white/15 bg-white/5 p-3">
                {/* What you said */}
                <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-sm bg-white px-3.5 py-2.5 text-[13px] font-medium leading-snug text-ink">
                  {TASK}
                </div>

                {/* The ambassador, and what he says */}
                <div className="mt-3 flex items-end gap-2">
                  <Ambassador pose={pose} sizes="140px" className="h-29.5 w-26 shrink-0" />
                  <div
                    aria-live="polite"
                    className="relative mb-3 rounded-2xl rounded-bl-sm bg-white/10 px-3.5 py-2.5 text-[13px] leading-snug text-white ring-1 ring-white/15"
                  >
                    {running && !agentFinished && <Loader2 className="mr-1.5 inline h-3 w-3 animate-spin align-[-1px] text-white/60" />}
                    {bubble}
                  </div>
                </div>

                {/* What he did */}
                <ul className="mt-2 space-y-1.5">
                  {AGENT_STEPS.map((step, i) => {
                    const done = i < agentDone
                    const active = phase === "building" && i === agentDone
                    return (
                      <li
                        key={step}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors duration-300",
                          done ? "bg-white/10 text-white" : "text-white/40",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors",
                            done ? "bg-white text-ink" : "ring-1 ring-inset ring-white/25",
                          )}
                        >
                          {done ? <Check className="h-2.5 w-2.5" /> : active ? <Loader2 className="h-2.5 w-2.5 animate-spin text-white/70" /> : null}
                        </span>
                        {step}
                      </li>
                    )
                  })}
                  {changed && (
                    <li className="flex items-center gap-2.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-[13px] text-white">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-ink">
                        {adapting ? <Loader2 className="h-2.5 w-2.5 animate-spin" /> : <Check className="h-2.5 w-2.5" />}
                      </span>
                      CRM renamed a field, so I found the new one
                    </li>
                  )}
                </ul>

                <div className="mt-auto flex items-center gap-1.5 px-1 pb-0.5 pt-3 text-xs font-medium text-white/60">
                  <CornerDownRight className="h-3.5 w-3.5 shrink-0" />
                  Handled end to end from one plain-English brief
                </div>
              </div>

              <ul className="space-y-3">
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
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
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
