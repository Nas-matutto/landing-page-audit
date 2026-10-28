"use client"

import { ArrowRight, Check, Gift, Hammer, Infinity as InfinityIcon, Layers, Plug, Users, Wand2, X, Zap } from "lucide-react"
import { PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import { PlanFinder } from "@/components/sections/pricing/plan-finder"
import { AgentFace } from "@/components/sections/prebuilt-agent-card"
import { SIGNUP_URL } from "@/lib/links"
import { PREBUILT_AGENTS } from "@/lib/prebuilt-agents"
import { ACTION_CATALOG, AI_NATIVE_FEATURES, PLANS, TYPICAL, buysLine, howMany, planPoints, type CostKey } from "@/lib/pricing"
import { cn } from "@/lib/utils"

// /pricing: the same plans as the app's billing page. One meter for every
// agent, so the page leads with that and every button goes to sign-up.

const AI_NATIVE_ICONS = [InfinityIcon, Hammer, Plug, Users]

const PROMISES = [
  { Icon: Layers, title: "Every agent, every plan", body: "All five pre-built agents are included, even on the free plan. Use one or use them all." },
  { Icon: Zap, title: "Pay for work, not agents", body: "Your agents share one monthly pool of actions. Spend it on whatever gets you results." },
  { Icon: Gift, title: "Free to start", body: "50 actions a month on Starter, free forever. No card, no trial clock." },
]

const ACTION_FACTS = [
  { title: "One meter for every agent", body: "Social, SEO, Website, SDR, Social Listening and custom agents all draw from the same monthly actions. No separate bills." },
  { title: "Resets on the 1st", body: "Your actions top back up at the start of every month. Your dashboard shows what each agent has used." },
  { title: "Running low? Nothing breaks", body: "If you use them all, your agents pause until the 1st or until you upgrade. A job that has already started always finishes." },
  { title: "No surprise charges", body: "You're never billed for extra actions. The price on the card is the price you pay." },
]

const COST_ORDER: CostKey[] = ["social_manager", "seo_manager", "website_manager", "sdr_agent", "social_listening", "custom"]
const FACES = Object.fromEntries(PREBUILT_AGENTS.map((a) => [a.id, a.face])) as Record<CostKey, string | undefined>

export function PricingContent() {
  const solo = PLANS[1]

  return (
    <>
      {/* Hero */}
      <section className="bg-white px-6 pb-14 pt-36 text-center sm:pt-44 lg:px-8 lg:pt-40">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow mb-5">Pricing</p>
          <h1 className="display text-[clamp(2.75rem,7vw,4.75rem)]">Use any agent. Pay for the work it does.</h1>
          <p className="lede mx-auto mt-6 max-w-xl text-lg sm:text-xl">
            Every plan includes all five pre-built agents. You pay in actions, the tasks your agents do for you, so you
            can mix them however you like. Start free with 50 actions a month.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryCta href={SIGNUP_URL}>Start free</PrimaryCta>
            <a
              href="#find-your-plan"
              className="inline-flex w-full items-center justify-center rounded-full border border-hairline px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-mist sm:w-auto"
            >
              Find your plan
            </a>
          </div>

          {/* The five agents, all on every plan */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="flex -space-x-2">
              {PREBUILT_AGENTS.map((a) => (
                <span key={a.id} title={a.title}>
                  <AgentFace src={a.face} size={44} className="ring-2 ring-white" />
                </span>
              ))}
            </div>
            <p className="text-[13px] text-quiet">
              {PREBUILT_AGENTS.map((a) => a.title).join(", ").replace(/, ([^,]*)$/, " and $1")}. All included.
            </p>
          </div>
        </Reveal>
      </section>

      {/* The three things that make the decision easy */}
      <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {PROMISES.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.05} className="h-full">
              <div className="h-full rounded-3xl border border-hairline bg-mist p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-base font-semibold text-ink">{title}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-quiet">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="bg-white px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((plan, i) => {
              const { points, missing } = planPoints(plan)
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
                    <p className="mt-2 text-[13px] leading-snug text-quiet">{buysLine(plan.actions)}</p>

                    <PlanRole role={plan.role} level={i + 1} />

                    <ul className="mb-6 mt-4 flex-1 space-y-2 text-sm text-quiet">
                      {points.map((f, j) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" />
                          <span className={j === 0 ? "font-semibold text-ink" : undefined}>{f}</span>
                        </li>
                      ))}
                      {missing.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-faint">
                          <X className="mt-0.5 h-3.5 w-3.5 shrink-0" />
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
                    href="/book-demo"
                    className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition-opacity hover:opacity-90 sm:w-auto"
                  >
                    Book a free call
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {AI_NATIVE_FEATURES.map((f, i) => {
                    const Icon = AI_NATIVE_ICONS[i]
                    return (
                      <li key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <Icon className="h-5 w-5 text-white" />
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

      <PlanFinder />

      {/* What counts as an action */}
      <section id="actions" className="border-y border-hairline bg-mist px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">How actions work</p>
            <h2 className="display text-[clamp(2.25rem,5vw,3.5rem)]">What counts as an action?</h2>
            <p className="mt-6 text-lg leading-relaxed text-quiet">
              An action is <strong className="font-semibold text-ink">one task your agent does for you</strong>, like pulling your latest posts, writing a
              post or finding a lead. Small tasks take one action, bigger ones take a few. Here&apos;s what every agent&apos;s work costs.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {COST_ORDER.map((key, i) => {
              const agent = ACTION_CATALOG[key]
              const face = FACES[key]
              return (
                <Reveal key={key} delay={(i % 3) * 0.05} className="h-full">
                  <div className="h-full rounded-3xl border border-hairline bg-white p-6">
                    <div className="flex items-center gap-3">
                      {face ? (
                        <AgentFace src={face} size={36} />
                      ) : (
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink">
                          <Wand2 className="h-4 w-4" />
                        </span>
                      )}
                      <p className="text-base font-semibold text-ink">{agent.title}</p>
                    </div>
                    <ul className="mt-5 space-y-2">
                      {agent.costs.map((c) => (
                        <li key={c.what} className="flex items-center justify-between gap-3 rounded-xl bg-mist px-3 py-2 text-sm">
                          <span className="text-ink/80">{c.what}</span>
                          <span
                            className={cn(
                              "shrink-0 rounded-full border border-hairline bg-white px-2 py-0.5 text-xs font-semibold tabular-nums",
                              c.cost === "0" ? "text-quiet" : "text-ink",
                            )}
                          >
                            {c.cost === "0" ? "Free" : c.cost}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* One worked month, so the allowance means something */}
          <Reveal className="mt-6">
            <div className="rounded-3xl bg-ink p-6 text-white sm:p-8">
              <p className="text-[15px] leading-relaxed sm:text-lg">
                <span className="font-semibold">What a month looks like. </span>
                <span className="text-white/70">
                  On {solo.name}, {solo.actions.toLocaleString("en-US")} actions is about {howMany(solo.actions, TYPICAL.post)} finished posts,{" "}
                  {howMany(solo.actions, TYPICAL.lead)} leads written to, or {howMany(solo.actions, TYPICAL.change)} website changes. Or any mix of
                  them across your agents.
                </span>
              </p>
            </div>
          </Reveal>

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
 * The lead block of a plan card: what the plan means for you, with a
 * four-step meter filled to the plan's place on the ladder.
 */
function PlanRole({ role, level }: { role: string; level: number }) {
  const strong = level >= 3
  return (
    <div className={cn("mt-5 rounded-2xl p-4", strong ? "bg-ink text-white" : "border border-hairline bg-mist text-ink")}>
      <div className="flex gap-1" role="img" aria-label={`${level} of ${PLANS.length}`}>
        {PLANS.map((p, i) => (
          <span key={p.id} className={cn("h-1 flex-1 rounded-full", i < level ? (strong ? "bg-white" : "bg-ink") : strong ? "bg-white/20" : "bg-hairline")} />
        ))}
      </div>
      <p className="mt-2.5 text-[15px] font-semibold leading-snug">{role}</p>
    </div>
  )
}

/** Closing call to action. */
export function PricingFinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="mx-auto max-w-6xl rounded-[32px] bg-ink px-7 py-14 text-center text-white sm:px-12 sm:py-16">
        <h2 className="display mx-auto max-w-2xl text-[clamp(2.25rem,5vw,3.5rem)] text-white!">Start free. Upgrade when your agents are earning it.</h2>
        <p className="mx-auto mt-5 max-w-md text-lg font-light leading-snug text-white/65">
          Every pre-built agent and 50 actions a month, free forever. No card required.
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
