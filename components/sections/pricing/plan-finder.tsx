"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { Reveal } from "@/components/sections/social-agent/parts"
import { LensTabs } from "@/components/sections/pricing/lens-tabs"
import { SIGNUP_URL } from "@/lib/links"
import { FINDER_DEFAULTS, recommend, type FinderInput, type Lens } from "@/lib/pricing"
import { cn } from "@/lib/utils"

// "Find your plan": a few sliders for the agent the visitor picked, and the
// cheapest plan that covers them (lib/pricing.ts → recommend). Starts at the
// smallest answers, so it opens on the free plan rather than upselling.

export function PlanFinder({ lens, setLens }: { lens: Lens; setLens: (l: Lens) => void }) {
  const [input, setInput] = useState<FinderInput>(FINDER_DEFAULTS)
  const rec = recommend(lens, input)
  const set = <L extends Lens>(l: L, patch: Partial<FinderInput[L]>) => setInput((prev) => ({ ...prev, [l]: { ...prev[l], ...patch } }))

  const limit = rec.plan?.actions ?? null
  const pct = limit ? Math.min(100, (rec.used / limit) * 100) : 0

  return (
    <section id="find-your-plan" className="bg-white px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Not sure which plan?</p>
          <h2 className="display text-[clamp(2.25rem,5vw,3.5rem)]">Find your plan</h2>
          <p className="mt-5 text-lg leading-relaxed text-quiet">Tell us what you need each month and we&apos;ll pick the smallest plan that covers it.</p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid overflow-hidden rounded-[32px] border border-hairline lg:grid-cols-[1fr_400px]">
            {/* Questions */}
            <div className="bg-mist p-6 sm:p-10">
              <p className="text-sm font-semibold text-ink">Which agent?</p>
              <LensTabs lens={lens} setLens={setLens} className="mt-3 bg-white" />

              <div className="mt-8 space-y-8">
                {lens === "social" && (
                  <>
                    <Range
                      label="How many posts should your agent make each month?"
                      value={input.social.posts}
                      min={0}
                      max={50}
                      display={(v) => (v === 0 ? "None, just analysis" : `${v} posts`)}
                      onChange={(posts) => set("social", { posts })}
                    />
                    <Range
                      label="How many social accounts do you run?"
                      value={input.social.accounts}
                      min={1}
                      max={12}
                      display={(v) => `${v} ${v === 1 ? "account" : "accounts"}`}
                      onChange={(accounts) => set("social", { accounts })}
                    />
                    <Toggle
                      label="Post them to Instagram for me"
                      checked={input.social.autopost}
                      disabled={input.social.posts === 0}
                      onChange={(autopost) => set("social", { autopost })}
                    />
                  </>
                )}
                {lens === "seo" && (
                  <>
                    <Range
                      label="How many websites?"
                      value={input.seo.websites}
                      min={1}
                      max={5}
                      display={(v) => `${v} ${v === 1 ? "website" : "websites"}`}
                      onChange={(websites) => set("seo", { websites })}
                    />
                    <Range
                      label="How many fixes or new pages each month?"
                      value={input.seo.fixes}
                      min={0}
                      max={60}
                      display={(v) => (v === 0 ? "None, just checks" : `${v} a month`)}
                      onChange={(fixes) => set("seo", { fixes })}
                    />
                    <Toggle label="Email me when my traffic drops" checked={input.seo.alerts} onChange={(alerts) => set("seo", { alerts })} />
                  </>
                )}
                {lens === "website" && (
                  <>
                    <Range
                      label="How many changes to your site each month?"
                      value={input.website.changes}
                      min={0}
                      max={300}
                      display={(v) => (v === 0 ? "None, just the live preview" : `${v} ${v === 1 ? "change" : "changes"}`)}
                      onChange={(changes) => set("website", { changes })}
                    />
                    <Range
                      label="How many questions to your agent each month?"
                      value={input.website.questions}
                      min={0}
                      max={100}
                      step={5}
                      display={(v) => (v === 0 ? "None" : `${v} questions`)}
                      onChange={(questions) => set("website", { questions })}
                    />
                  </>
                )}
                {lens === "custom" && (
                  <>
                    <Range
                      label="How many custom agents?"
                      value={input.custom.agents}
                      min={0}
                      max={6}
                      display={(v) => (v === 0 ? "None, a ready-made one is fine" : `${v} ${v === 1 ? "agent" : "agents"}`)}
                      onChange={(agents) => set("custom", agents === 0 ? { agents, tasks: 0, scheduled: false } : { agents })}
                    />
                    <Range
                      label="How many tasks should they do each month?"
                      value={input.custom.tasks}
                      min={0}
                      max={120}
                      step={2}
                      disabled={input.custom.agents === 0}
                      display={(v) => (v === 0 ? "None yet" : `${v} tasks`)}
                      onChange={(tasks) => set("custom", { tasks })}
                    />
                    <Toggle
                      label="Run on their own schedule, without being asked"
                      checked={input.custom.scheduled}
                      disabled={input.custom.agents === 0}
                      onChange={(scheduled) => set("custom", { scheduled })}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Answer */}
            <div className="relative flex flex-col bg-ink p-6 text-white sm:p-10">
              <div className="flex items-end gap-3">
                <Image
                  src="/ambassador-thumbs-up.png"
                  alt="The TTMD agent ambassador giving a thumbs up"
                  width={566}
                  height={912}
                  sizes="96px"
                  className="h-auto w-20 shrink-0 sm:w-24"
                />
                <div className="mb-6 rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-[14px] font-medium leading-snug text-ink">
                  {rec.plan ? (
                    <>
                      I&apos;d go with <span className="font-bold">{rec.plan.name}</span>.
                      {rec.plan.price === 0 ? " It's free, and covers everything you need." : ""}
                    </>
                  ) : (
                    <>That&apos;s more than Scale covers. Let&apos;s talk AI Native.</>
                  )}
                </div>
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-white/50">Recommended</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">{rec.plan ? rec.plan.name : "AI Native"}</p>
              <p className="mt-1 text-white/60">{rec.plan ? (rec.plan.price === 0 ? "Free forever" : `$${rec.plan.price} / month`) : "Custom pricing"}</p>

              <ul className="mt-6 space-y-2.5 text-[15px]">
                {rec.covers.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              {limit !== null && (
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Typical month: ~{rec.used} actions</span>
                    <span>{limit} included</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )}

              <div className="mt-auto pt-8">
                <a
                  href={SIGNUP_URL}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition-opacity hover:opacity-90"
                >
                  {rec.plan ? (rec.plan.price === 0 ? "Start free" : `Start with ${rec.plan.name}`) : "Get started"}
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
  label,
  value,
  min,
  max,
  step = 1,
  disabled,
  display,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  disabled?: boolean
  display: (v: number) => string
  onChange: (v: number) => void
}) {
  return (
    <label className={cn("block", disabled && "opacity-40")}>
      <span className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-[15px] font-semibold text-ink">{label}</span>
        <span className="text-[15px] font-semibold tabular-nums text-ink">{display(value)}</span>
      </span>
      <input
        type="range"
        min={min}
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

function Toggle({ label, checked, disabled, onChange }: { label: string; checked: boolean; disabled?: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className={cn("flex cursor-pointer items-center justify-between gap-4", disabled && "cursor-not-allowed opacity-40")}>
      <span className="text-[15px] font-semibold text-ink">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked && !disabled}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn("relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors disabled:cursor-not-allowed", checked && !disabled ? "bg-ink" : "bg-faint")}
      >
        <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white transition-all", checked && !disabled ? "left-6" : "left-1")} />
      </button>
    </label>
  )
}
