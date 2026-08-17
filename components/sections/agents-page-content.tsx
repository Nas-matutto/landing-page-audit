"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import {
  ArrowRight, Check, Wand2,
  Server, KeyRound, Bot, Activity, RefreshCw, Plug, Shield, LayoutDashboard,
} from "lucide-react"
import { AGENTS, isAgentBuilt } from "@/lib/agents"
import { SIGNUP_URL } from "@/lib/links"
import { IntegrationMarquee } from "@/components/ui/integration-marquee"

// ─── Rotating hero words ─────────────────────────────────────────────────────

const ROTATING_WORDS = ["Customer Service", "Marketing", "Sales", "HR", "Finance", "Operations"]

function RotatingWord() {
  const [index, setIndex] = useState(0)
  const titles = useMemo(() => ROTATING_WORDS, [])

  useEffect(() => {
    const id = setTimeout(() => setIndex(i => (i + 1) % titles.length), 2200)
    return () => clearTimeout(id)
  }, [index, titles])

  return (
    <span className="relative inline-flex justify-center w-full overflow-hidden" style={{ height: "1.15em" }}>
      {titles.map((word, i) => (
        <motion.span
          key={word}
          className="display absolute"
          initial={{ opacity: 0, y: 60 }}
          animate={index === i ? { opacity: 1, y: 0 } : { opacity: 0, y: index > i ? -60 : 60 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// ─── What we handle ───────────────────────────────────────────────────────────

const WE_HANDLE = [
  { icon: Server, title: "Cloud infrastructure", body: "Your agent runs on enterprise-grade hosting. Zero DevOps required on your end." },
  { icon: KeyRound, title: "AI model access & API keys", body: "We manage all API access — GPT-4, Claude, and more. You don't need any AI accounts." },
  { icon: Bot, title: "Agent design & configuration", body: "We design, train, and configure your agent from scratch based on a plain-language brief." },
  { icon: Activity, title: "24/7 monitoring & alerts", body: "Uptime monitoring around the clock. If something breaks, we catch and fix it before you notice." },
  { icon: Plug, title: "Integrations & connections", body: "We wire up your tools — email, CRM, Slack, Calendly, Zendesk. No API docs for you to read." },
  { icon: RefreshCw, title: "Ongoing updates", body: "As AI improves, so does your agent. We retrain and redeploy — you always have the latest." },
  { icon: Shield, title: "Security & data isolation", body: "Your data stays yours. Isolated environments, never used for training. Enterprise-grade by default." },
  { icon: LayoutDashboard, title: "Unified dashboard", body: "See all your agents, their activity, and status in one place — no logins to multiple tools." },
]

// ─── Main component ───────────────────────────────────────────────────────────

export function AgentsPageContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white pb-20 pt-36 sm:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
            <span className="eyebrow">Fully managed · Deployed in 24 hours</span>
          </div>

          <h1 className="display text-[clamp(2.5rem,6.5vw,4.5rem)]">AI agents built for</h1>
          <div className="mb-8 mt-1 text-[clamp(2.5rem,6.5vw,4.5rem)]">
            <RotatingWord />
          </div>

          <p className="lede mx-auto mb-10 max-w-2xl text-lg">
            We build, deploy, and host custom AI agents on our infrastructure. Tell us your workflow — your agent is
            live within 24 hours.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={SIGNUP_URL}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85 sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <Link
              href="/book-demo"
              className="inline-flex w-full items-center justify-center rounded-full border border-hairline px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-colors hover:bg-mist sm:w-auto"
            >
              Book a free call
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Explore Agents: clickable grid ── */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <p className="eyebrow mb-5">Explore agents</p>
              <h2 className="display mb-4 text-[clamp(1.75rem,4vw,2.75rem)]">
                Agents we build for every team
              </h2>
              <p className="lede mx-auto max-w-xl text-lg">
                Pick the workflow you want to automate. Each agent is fully built, hosted, and managed by us.
              </p>
            </motion.div>

            {/* Connected hairline grid — shared 1px dividers read as one engineered
                surface rather than scattered cards. gap-px over a hairline bg draws the rules. */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3"
            >
              {AGENTS.map((agent) => {
                const built = isAgentBuilt(agent)
                const href = built ? `/agents/${agent.slug}` : "/book-demo"
                const Icon = agent.icon
                return (
                  <Link
                    key={agent.id}
                    href={href}
                    className="group relative flex flex-col bg-white p-6 transition-colors hover:bg-mist sm:p-7"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink">
                        <Icon className="h-5 w-5" />
                      </div>
                      {!built && (
                        <span className="rounded-full border border-hairline px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-faint">
                          On request
                        </span>
                      )}
                    </div>

                    <h3 className="mt-5 text-base font-semibold tracking-[-0.01em] text-ink">{agent.title}</h3>
                    <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-quiet">{agent.description}</p>

                    {/* Outcome readout — the proof the card is built around */}
                    <div className="mt-auto flex items-end justify-between border-t border-hairline pt-5">
                      <div>
                        <p className="eyebrow">Typical result</p>
                        <p className="mt-1.5 flex items-baseline gap-1.5">
                          <span className="text-xl font-semibold tabular-nums tracking-[-0.02em] text-ink">
                            {agent.metricValue}
                          </span>
                          <span className="text-xs font-medium text-quiet">{agent.metricLabel}</span>
                        </p>
                      </div>
                      <span className="flex items-center gap-1 pb-0.5 text-xs font-semibold text-quiet transition-colors group-hover:text-ink">
                        {built ? "Details" : "Talk to us"}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                )
              })}

              {/* Custom Agent — the one dark cell; its gradient mark is the section's single bold accent */}
              <Link
                href="/book-demo"
                className="group relative flex flex-col overflow-hidden bg-ink p-6 transition-opacity hover:opacity-90 sm:p-7"
              >
                <div className="relative flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white">
                    <Wand2 className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="relative mt-5 text-base font-semibold tracking-[-0.01em] text-white">Custom agent</h3>
                <p className="relative mt-1.5 line-clamp-3 text-sm leading-relaxed text-white/60">
                  Something not on this list? Describe any workflow in plain language and we&apos;ll build, host, and manage a bespoke agent around it.
                </p>

                <div className="relative mt-auto flex items-end justify-between border-t border-white/15 pt-5">
                  <div>
                    <p className="eyebrow text-white/50">Scope</p>
                    <p className="mt-1.5 text-sm font-medium text-white/80">Any workflow, any complexity</p>
                  </div>
                  <span className="flex items-center gap-1 pb-0.5 text-xs font-semibold text-white/70 transition-colors group-hover:text-white">
                    Talk to us
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── AI Agents on Demand ── */}
      <section className="border-y border-hairline bg-mist py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Left: heading + description */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:sticky lg:top-32"
              >
                <p className="eyebrow mb-5">AI Agents on Demand</p>
                <h2 className="display mb-6 text-[clamp(2rem,4.5vw,3.25rem)]">
                  Plug and play. We handle everything.
                </h2>
                <p className="lede mb-8 text-lg">
                  You don't need a server, an OpenAI account, or a developer on your team. Give us a brief — we handle every layer of the stack and hand you back a working agent.
                </p>

                {/* What you do */}
                <div className="rounded-3xl border border-hairline bg-white p-6">
                  <p className="eyebrow mb-4">What you do</p>
                  <ul className="space-y-3">
                    {[
                      "Describe your workflow in plain language (once)",
                      "Get on a 20-minute call with our team",
                      "Use your live agent — request changes anytime",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-hairline">
                          <Check className="h-3.5 w-3.5 text-ink" />
                        </div>
                        <span className="text-sm leading-relaxed text-quiet">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={SIGNUP_URL}
                  className="group relative mt-8 inline-flex cursor-pointer items-center gap-2 self-start overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85"
                >
                  <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                  <span className="relative flex items-center gap-2">
                    Get started <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </motion.div>

              {/* Right: what we handle grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="eyebrow col-span-full mb-2">What we handle</p>
                {WE_HANDLE.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="rounded-3xl border border-hairline bg-white p-5 transition-colors hover:border-ink"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-hairline">
                      <item.icon className="h-4 w-4 text-ink" />
                    </div>
                    <h3 className="mb-1.5 text-sm font-semibold text-ink">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-quiet">{item.body}</p>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto mb-12 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow mb-5">Integrations</p>
            <h2 className="display mb-4 text-[clamp(1.75rem,4vw,2.75rem)]">
              Works with your existing tools
            </h2>
            <p className="lede mx-auto max-w-xl text-lg">
              Your agents connect to the platforms you already use — no migrations, no new logins. We wire everything
              up for you.
            </p>
          </motion.div>
        </div>

        <IntegrationMarquee />
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-hairline bg-mist py-24 sm:py-32">
        <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">
              Ready to automate your first workflow?
            </h2>
            <p className="lede mx-auto mt-6 max-w-xl text-lg">
              Book a free 20-minute call. We&apos;ll tell you exactly what your agent can do and get it live within 24
              hours.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/book-demo"
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85 sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  Book a free call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <a
                href={SIGNUP_URL}
                className="inline-flex w-full items-center justify-center rounded-full border border-hairline bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-colors hover:bg-mist sm:w-auto"
              >
                Get Started
              </a>
            </div>
            <p className="mt-6 text-[13px] text-faint">Free call · No commitment · Live in 24h if it&apos;s a fit</p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
