"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Check, Wand2 } from "lucide-react"
import { Reveal } from "@/components/sections/social-agent/parts"
import { AgentFace } from "@/components/sections/prebuilt-agent-card"
import { SIGNUP_URL } from "@/lib/links"
import { PREBUILT_AGENTS } from "@/lib/prebuilt-agents"
import { FINDER_DEFAULTS, FINDER_WORK, PLANS, recommend, type CostKey, type FinderInput } from "@/lib/pricing"
import { cn } from "@/lib/utils"

// "Find your plan": how much work you want from each agent, added up into one
// month of actions, and the cheapest plan that covers it (lib/pricing.ts →
// recommend). Starts at zero, so it opens on the free plan rather than upselling.

const FACES = Object.fromEntries(PREBUILT_AGENTS.map((a) => [a.id, a.face])) as Record<CostKey, string | undefined>
const SCALE = PLANS[PLANS.length - 1]

export function PlanFinder() {
  const [input, setInput] = useState<FinderInput>(FINDER_DEFAULTS)
  const rec = recommend(input)
  const setWork = (key: CostKey, v: number) => setInput((prev) => ({ ...prev, work: { ...prev.work, [key]: v } }))

  const limit = rec.plan?.actions ?? null
  const pct = limit ? Math.min(100, (rec.used / limit) * 100) : 100
  const picked = FINDER_WORK.filter((w) => input.work[w.key] > 0)

  return (
    <section id="find-your-plan" className="scroll-mt-24 bg-white px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Not sure which plan?</p>
          <h2 className="display text-[clamp(2.25rem,5vw,3.5rem)]">Find your plan</h2>
          <p className="mt-5 text-lg leading-relaxed text-quiet">
            Tell us the results you want each month, from any mix of agents. We&apos;ll add up the actions and pick the
            smallest plan that covers it.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid overflow-hidden rounded-[32px] border border-hairline lg:grid-cols-[1fr_400px]">
            {/* Questions */}
            <div className="bg-mist p-6 sm:p-10">
              <p className="text-sm font-semibold text-ink">What should your agents get done each month?</p>

              <div className="mt-6 space-y-7">
                {FINDER_WORK.filter((w) => w.key !== "custom").map((w) => (
                  <Range
                    key={w.key}
                    face={FACES[w.key]}
                    label={w.label}
                    value={input.work[w.key]}
                    max={w.max}
                    step={w.step}
                    display={(v) => (v === 0 ? "None" : `${v} ${w.unit}`)}
                    onChange={(v) => setWork(w.key, v)}
                  />
                ))}
              </div>

              <div className="mt-8 space-y-7 border-t border-hairline pt-8">
                <Range
                  label="Custom agents built for you"
                  value={input.customAgents}
                  max={6}
                  display={(v) => (v === 0 ? "None" : `${v} ${v === 1 ? "agent" : "agents"}`)}
                  onChange={(customAgents) =>
                    setInput((prev) => ({ ...prev, customAgents, work: customAgents === 0 ? { ...prev.work, custom: 0 } : prev.work }))
                  }
                />
                <Range
                  label="Tasks for your custom agents"
                  value={input.work.custom}
                  max={FINDER_WORK.find((w) => w.key === "custom")!.max}
                  step={2}
                  disabled={input.customAgents === 0}
                  display={(v) => (v === 0 ? "None" : `${v} tasks`)}
                  onChange={(v) => setWork("custom", v)}
                />
                <Toggle
                  label="Let my agents work on autopilot"
                  hint="Scheduled runs, daily leads, posting to Instagram and sending your emails"
                  checked={input.autopilot}
                  onChange={(autopilot) => setInput((prev) => ({ ...prev, autopilot }))}
                />
              </div>
            </div>

            {/* Answer */}
            <div className="relative flex flex-col bg-ink p-6 text-white sm:p-10">
              <div className="flex items-end gap-3">
                <Image
                  src="/ambassador-thumbs-up.png"
                  alt="The Talk to me Data agent ambassador giving a thumbs up"
                  width={566}
                  height={912}
                  sizes="96px"
                  className="h-auto w-20 shrink-0 sm:w-24"
                />
                <div className="mb-6 rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-[14px] font-medium leading-snug text-ink">
                  {rec.plan ? (
                    <>
                      I&apos;d go with <span className="font-bold">{rec.plan.name}</span>.
                      {rec.plan.price === 0 ? " It's free, and every agent is included." : " One plan covers all of it."}
                    </>
                  ) : (
                    <>That&apos;s more than {SCALE.name} covers. Let&apos;s talk AI Native.</>
                  )}
                </div>
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-white/50">Recommended</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">{rec.plan ? rec.plan.name : "AI Native"}</p>
              <p className="mt-1 text-white/60">{rec.plan ? (rec.plan.price === 0 ? "Free forever" : `$${rec.plan.price} / month`) : "Custom pricing"}</p>

              <div className="mt-6">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Your month: ~{rec.used.toLocaleString("en-US")} actions</span>
                  <span>{limit === null ? "Unlimited" : `${limit.toLocaleString("en-US")} included`}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-white transition-[width] duration-300" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <ul className="mt-6 space-y-2.5 text-[15px]">
                {picked.length === 0 ? (
                  <li className="flex items-start gap-2 text-white/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                    <span>Try every agent on your own accounts</span>
                  </li>
                ) : (
                  picked.map((w) => (
                    <li key={w.key} className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2">
                        {FACES[w.key] ? (
                          <AgentFace src={FACES[w.key]!} size={22} />
                        ) : (
                          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/10">
                            <Wand2 className="h-3 w-3" />
                          </span>
                        )}
                        {input.work[w.key]} {w.unit}
                      </span>
                      <span className="tabular-nums text-white/50">~{(input.work[w.key] * w.each).toLocaleString("en-US")}</span>
                    </li>
                  ))
                )}
                {rec.plan?.autopilot && (
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                    <span>Autopilot, posting and sending included</span>
                  </li>
                )}
                {rec.plan && rec.plan.customAgents > 0 && input.customAgents > 0 && (
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                    <span>
                      {rec.plan.customAgents === 1 ? "1 custom agent" : `Up to ${rec.plan.customAgents} custom agents`}, built with you
                    </span>
                  </li>
                )}
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href={rec.plan ? SIGNUP_URL : "/book-demo"}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition-opacity hover:opacity-90"
                >
                  {rec.plan ? (rec.plan.price === 0 ? "Start free" : `Start with ${rec.plan.name}`) : "Book a free call"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Range({
  face,
  label,
  value,
  max,
  step = 1,
  disabled,
  display,
  onChange,
}: {
  face?: string
  label: string
  value: number
  max: number
  step?: number
  disabled?: boolean
  display: (v: number) => string
  onChange: (v: number) => void
}) {
  return (
    <label className={cn("block", disabled && "opacity-40")}>
      <span className="flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
          {face && <AgentFace src={face} size={28} />}
          {label}
        </span>
        <span className="text-[15px] font-semibold tabular-nums text-ink">{display(value)}</span>
      </span>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full cursor-pointer accent-ink disabled:cursor-not-allowed"
      />
    </label>
  )
}

function Toggle({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4">
      <span>
        <span className="block text-[15px] font-semibold text-ink">{label}</span>
        {hint && <span className="mt-0.5 block text-sm text-quiet">{hint}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn("relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors", checked ? "bg-ink" : "bg-faint")}
      >
        <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white transition-all", checked ? "left-6" : "left-1")} />
      </button>
    </label>
  )
}
