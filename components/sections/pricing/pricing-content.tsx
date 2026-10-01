"use client"

import { useState } from "react"
import { ArrowRight, Check, Hammer, Infinity as InfinityIcon, Instagram, Plug, Users, Zap } from "lucide-react"
import { PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import { SIGNUP_URL } from "@/lib/links"
import {
  ACTION_GUIDE,
  AI_NATIVE_FEATURES,
  LENS_PLANS,
  LENSES,
  PLANS,
  SAMPLE_MONTHS,
  type Lens,
  type PlanId,
} from "@/lib/pricing"
import { cn } from "@/lib/utils"

// /pricing: the same plans as the app's billing page, described for whichever
// agent the visitor picks. Every button goes to sign-up.

const AI_NATIVE_ICONS = [InfinityIcon, Hammer, Plug, Users]

const ACTION_BUCKETS = [
  { key: "free", label: "Free", range: "0", hint: "Never uses your actions" },
  { key: "small", label: "Small jobs", range: "1–6", hint: "Most everyday steps" },
  { key: "big", label: "Big jobs", range: "10+", hint: "Long or research-heavy work" },
] as const

const ACTION_FACTS = [
  { title: "One meter for every agent", body: "Your Social, SEO and custom agents all draw from the same monthly actions. No separate bills." },
  { title: "Resets on the 1st", body: "Your actions top back up at the start of every month. You can watch what each agent uses in your dashboard." },
  { title: "Running low? Nothing breaks", body: "If you use them all, your agents pause until the 1st or until you upgrade. A job that has already started always finishes." },
  { title: "No surprise charges", body: "You're never billed for extra actions. The price on the card is the price you pay." },
]

/** Bar shades for a sample month, darkest first. */
const SEGMENT_SHADES = ["bg-ink", "bg-quiet", "bg-faint"]

export function PricingContent() {
  const [lens, setLens] = useState<Lens>("social")
  const current = LENSES.find((l) => l.id === lens)!

  return (
    <>
      {/* Hero */}
      <section className="bg-white px-6 pb-12 pt-36 text-center sm:pt-44 lg:px-8 lg:pt-40">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow mb-5">Pricing</p>
          <h1 className="display text-[clamp(2.75rem,7vw,4.75rem)]">Pay for the work your agents do</h1>
          <p className="lede mx-auto mt-6 max-w-xl text-lg sm:text-xl">
            One plan covers every agent. Start free with no card, then upgrade as your agents take on more of the work for you.
          </p>
        </Reveal>
      </section>

      {/* Plans */}
      <section className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-ink">Which agent are you running?</p>
            <div role="tablist" aria-label="Agent type" className="mt-3 inline-flex flex-wrap justify-center gap-1 rounded-full border border-hairline bg-mist p-1">
              {LENSES.map((l) => (
                <button
                  key={l.id}
                  role="tab"
                  aria-selected={lens === l.id}
                  onClick={() => setLens(l.id)}
                  className={cn(
                    "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    lens === l.id ? "bg-ink text-white" : "text-quiet hover:text-ink",
                  )}
                >
                  {l.short}
                </button>
              ))}
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-quiet">{current.body}</p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan, i) => {
              const lp = LENS_PLANS[lens][plan.id]
              return (
                <Reveal key={plan.id} delay={i * 0.05} className="h-full">
                  <div
                    className={cn(
                      "relative flex h-full flex-col rounded-3xl border bg-white p-6",
                      plan.highlight ? "border-ink shadow-xl shadow-black/5" : "border-hairline",
                    )}
                  >
                    {plan.highlight && (
                      <span className="absolute -top-3 left-6 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                        {plan.highlight}
                      </span>
                    )}
                    <h2 className="text-lg font-semibold text-ink">{plan.name}</h2>
                    <p className="mt-2">
                      <span className="text-4xl font-bold tracking-tight text-ink">${plan.price}</span>
                      <span className="ml-1 text-sm text-quiet">/ month</span>
                    </p>
                    <p className="mt-2 text-[13px] lg:min-h-[3.75rem] leading-snug text-quiet">{plan.description}</p>

                    <AgentRole role={lp.role} instagram={lp.instagram} level={i + 1} />

                    <ul className="mt-4 space-y-2 text-sm font-medium text-ink">
                      {lp.does.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-current" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mb-6 mt-4 flex-1 space-y-2 border-t border-hairline pt-4 text-sm text-quiet">
                      {lp.limits.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={SIGNUP_URL}
                      className={cn(
                        "group inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold transition-colors",
                        plan.highlight ? "bg-ink text-white hover:opacity-85" : "border border-hairline text-ink hover:bg-mist",
                      )}
                    >
                      {plan.price === 0 ? "Start free" : `Start with ${plan.name}`}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <p className="mt-6 text-center text-sm text-quiet">
            Prices in US dollars. No setup fees, no long-term contracts, cancel any time.
          </p>

          {/* AI Native */}
          <Reveal className="mt-12">
            <div className="relative overflow-hidden rounded-[32px] bg-ink p-7 text-white sm:p-10">
              <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/50">AI Native</p>
                  <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Your own AI team, built and run for you</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/65">
                    For companies that want agents across every team. We scope the work with you, build every agent, and keep them running.
                  </p>
                  <p className="mt-5 text-sm text-white/50">
                    <span className="text-xl font-bold text-white">Custom pricing</span> · shaped around your workflows
                  </p>
                  <a
                    href={SIGNUP_URL}
                    className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition-opacity hover:opacity-90 sm:w-auto"
                  >
                    Get started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {AI_NATIVE_FEATURES.map((f, i) => {
                    const Icon = AI_NATIVE_ICONS[i]
                    return (
                      <li key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <Icon className="h-5 w-5 text-accent" />
                        <p className="mt-3 text-[15px] font-semibold">{f.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/55">{f.body}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What counts as an action */}
      <section id="actions" className="border-y border-hairline bg-mist px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">How actions work</p>
            <h2 className="display text-[clamp(2.25rem,5vw,3.5rem)]">What counts as an action?</h2>
            <p className="mt-6 text-lg leading-relaxed text-quiet">
              An action is <strong className="font-semibold text-ink">one small step your agent takes for you</strong>, like pulling data, using a tool or
              writing something. Small jobs use a few, big jobs use more. Here&apos;s what that looks like for the{" "}
              <span className="font-semibold text-ink">{current.title}</span>.
            </p>
          </Reveal>

          <div className="mt-6 inline-flex flex-wrap gap-1 rounded-full border border-hairline bg-white p-1" role="tablist" aria-label="Agent type">
            {LENSES.map((l) => (
              <button
                key={l.id}
                role="tab"
                aria-selected={lens === l.id}
                onClick={() => setLens(l.id)}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  lens === l.id ? "bg-ink text-white" : "text-quiet hover:text-ink",
                )}
              >
                {l.short}
              </button>
            ))}
          </div>

          {/* Jobs by size */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ACTION_BUCKETS.map((b, i) => (
              <Reveal key={b.key} delay={i * 0.05} className="h-full">
                <div className="h-full rounded-3xl border border-hairline bg-white p-7">
                  <p className="text-5xl font-bold tracking-tight tabular-nums text-ink">{b.range}</p>
                  <p className="mt-2 text-base font-semibold text-ink">{b.label}</p>
                  <p className="text-sm text-quiet">{b.hint}</p>
                  <ul className="mt-6 space-y-3 border-t border-hairline pt-5">
                    {ACTION_GUIDE[lens][b.key].map((e) => (
                      <li key={e.what} className="flex items-start justify-between gap-4 text-[15px]">
                        <span className="text-ink/80">{e.what}</span>
                        {e.cost && <span className="shrink-0 font-semibold tabular-nums text-ink">{e.cost}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* A month on each plan */}
          <Reveal className="mt-16">
            <h3 className="text-2xl font-semibold tracking-tight text-ink">What a month looks like</h3>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-quiet">
              A typical month for the {current.title} on each paid plan. Every plan leaves room for questions and one-off jobs.
            </p>
          </Reveal>
          <div className="mt-6 space-y-4">
            {PLANS.filter((p) => p.id !== "starter").map((plan) => {
              const parts = SAMPLE_MONTHS[lens][plan.id as Exclude<PlanId, "starter">]
              const used = parts.reduce((n, p) => n + p.actions, 0)
              const left = Math.max(0, plan.actions - used)
              return (
                <Reveal key={plan.id}>
                  <div className="rounded-3xl border border-hairline bg-white p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-base font-semibold text-ink">
                        {plan.name} <span className="font-normal text-quiet">· ${plan.price}/month</span>
                      </p>
                      <p className="text-sm font-semibold tabular-nums text-ink">{plan.actions.toLocaleString("en-US")} actions</p>
                    </div>
                    <div className="mt-4 flex h-3 overflow-hidden rounded-full border border-hairline bg-mist">
                      {parts.map((p, i) => (
                        <div key={p.label} className={SEGMENT_SHADES[i]} style={{ width: `${(p.actions / plan.actions) * 100}%` }} />
                      ))}
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      {parts.map((p, i) => (
                        <li key={p.label} className="flex items-center gap-2 text-ink/80">
                          <span className={cn("h-2.5 w-2.5 rounded-full", SEGMENT_SHADES[i])} />
                          {p.label} <span className="tabular-nums text-quiet">~{p.actions}</span>
                        </li>
                      ))}
                      <li className="flex items-center gap-2 text-ink/80">
                        <span className="h-2.5 w-2.5 rounded-full border border-hairline bg-mist" />
                        Left for questions and extra jobs <span className="tabular-nums text-quiet">~{left}</span>
                      </li>
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* The rules */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {ACTION_FACTS.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 0.05} className="h-full">
                <div className="h-full rounded-3xl border border-hairline bg-white p-7">
                  <p className="text-base font-semibold text-ink">{f.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-quiet">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/**
 * The lead block of a plan card: what the agent does on your behalf, with a
 * four-step meter filled to the plan's place on the ladder.
 */
function AgentRole({ role, instagram, level }: { role: string; instagram?: boolean; level: number }) {
  const strong = level >= 3
  return (
    <div className={cn("mt-5 rounded-2xl p-4", strong ? "bg-ink text-white" : "border border-hairline bg-mist text-ink")}>
      <div className="flex items-center gap-2">
        <span className={cn("text-[10px] font-semibold uppercase tracking-wide", strong ? "text-white/50" : "text-quiet")}>Does for you</span>
        <div className="flex flex-1 gap-1" role="img" aria-label={`${level} of ${PLANS.length}`}>
          {PLANS.map((p, i) => (
            <span key={p.id} className={cn("h-1 flex-1 rounded-full", i < level ? (strong ? "bg-accent" : "bg-ink") : strong ? "bg-white/20" : "bg-hairline")} />
          ))}
        </div>
      </div>
      <p className="mt-2.5 flex items-start gap-2 text-[15px] font-semibold leading-snug">
        {instagram && <Instagram className="mt-0.5 h-4 w-4 shrink-0" />}
        <span>{role}</span>
      </p>
    </div>
  )
}

/** Closing call to action. */
export function PricingFinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="mx-auto max-w-6xl rounded-[32px] bg-ink px-7 py-14 text-center text-white sm:px-12 sm:py-16">
        <h2 className="display mx-auto max-w-2xl text-[clamp(2.25rem,5vw,3.5rem)] text-white!">Start free. Upgrade when your agent is earning it.</h2>
        <p className="mx-auto mt-5 max-w-md text-lg font-light leading-snug text-white/65">
          100 actions a month and a ready-made agent, free forever. No card required.
        </p>
        <div className="mt-9 flex justify-center">
          <PrimaryCta href={SIGNUP_URL} className="bg-white text-ink">
            Get Started free
          </PrimaryCta>
        </div>
      </Reveal>
    </section>
  )
}
