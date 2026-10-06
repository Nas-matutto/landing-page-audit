"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, Check, LayoutGrid, MessageSquare, Plug, Plus, Send } from "lucide-react"
import { SiGithub, SiGoogle, SiInstagram, SiOpenai, SiTiktok, SiWordpress, SiYoutube } from "react-icons/si"
import type { IconType } from "react-icons"
import { Ambassador } from "@/components/ui/ambassador"
import { SIGNUP_URL } from "@/lib/links"
import { cn } from "@/lib/utils"

// ── How it works ────────────────────────────────────────────────────────────
// The four things a new user actually does in the app, each shown on the
// screen where it happens. Steps 02–04 are real captures of the Social Media
// agent on a sample account (in /public/social-agent); step 01 is drawn,
// in the style of the app's agent cards.

type StepId = "pick" | "connect" | "ask" | "run"

const STEPS: { id: StepId; n: string; title: string; body: string; Icon: LucideIcon }[] = [
  {
    id: "pick",
    n: "01",
    title: "Pick your agent",
    body: "Start with a ready-made agent for social media, SEO or your website. Need something else? Describe the job and we'll build an agent for it.",
    Icon: LayoutGrid,
  },
  {
    id: "connect",
    n: "02",
    title: "Connect your accounts",
    body: "Paste a profile link or sign in to the tools you already use. Your agent reads everything and has its first analysis ready in minutes.",
    Icon: Plug,
  },
  {
    id: "ask",
    n: "03",
    title: "Tell it what to do",
    body: "Ask in plain English. It answers from your own numbers, then does the work: plans the week, writes the copy, designs the post.",
    Icon: MessageSquare,
  },
  {
    id: "run",
    n: "04",
    title: "Approve, or let it run",
    body: "Review each piece before it goes out, or switch on auto-post. It publishes on schedule and reports back on how it did.",
    Icon: Send,
  },
]

/** How long each step stays up before the next one plays. */
const STEP_MS = 6000

export function HowItWorksSection() {
  const [active, setActive] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const reduceMotion = useReducedMotion()
  const stepperRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stepperRef, { amount: 0.4 })
  const playing = autoplay && inView && !reduceMotion

  // Walks through the steps while the section is on screen, until someone picks one.
  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => setActive((i) => (i + 1) % STEPS.length), STEP_MS)
    return () => window.clearTimeout(id)
  }, [playing, active])

  function choose(i: number) {
    setAutoplay(false)
    setActive(i)
  }

  return (
    <section id="how-it-works" className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center sm:mb-16">
            <p className="eyebrow mb-5">How it works</p>
            <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
              Up and running in minutes, not months
            </h2>
            <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
              No workflows to wire and no code to write. Here&apos;s what it looks like inside the app.
            </p>
          </div>

          {/* Desktop: pick a step on the left, see it on the right */}
          <div ref={stepperRef} className="hidden items-center gap-10 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <ol className="space-y-3">
              {STEPS.map((step, i) => {
                const on = i === active
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      aria-pressed={on}
                      aria-controls="how-it-works-stage"
                      className={cn(
                        "relative w-full cursor-pointer overflow-hidden rounded-3xl border p-6 text-left transition-colors",
                        on ? "border-ink bg-white" : "border-hairline bg-transparent hover:bg-mist",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="select-none font-mono text-sm font-medium text-faint">{step.n}</span>
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                            on ? "border-ink bg-ink text-white" : "border-hairline text-ink",
                          )}
                        >
                          <step.Icon className="h-4 w-4" />
                        </span>
                        <span className={cn("text-lg font-semibold tracking-[-0.01em]", on ? "text-ink" : "text-quiet")}>
                          {step.title}
                        </span>
                      </span>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.span
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="block overflow-hidden pl-17 text-sm leading-relaxed text-quiet"
                          >
                            <span className="block pt-2">{step.body}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Time left on this step, while the tour plays itself */}
                      {on && playing && (
                        <motion.span
                          key={active}
                          aria-hidden
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-ink"
                        />
                      )}
                    </button>
                  </li>
                )
              })}
            </ol>

            <div id="how-it-works-stage" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={STEPS[active].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <Stage step={STEPS[active].id} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Phones and tablets: the same four steps, one after another */}
          <ol className="space-y-12 lg:hidden">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i === 0 ? 0 : 0.05 }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="select-none font-mono text-sm font-medium text-faint">{step.n}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink bg-ink text-white">
                    <step.Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{step.title}</h3>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-quiet">{step.body}</p>
                <Stage step={step.id} />
              </motion.li>
            ))}
          </ol>

          {/* CTA */}
          <div className="mt-14 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
            <a
              href={SIGNUP_URL}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Start free <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <p className="text-sm text-faint">Screens shown on a sample account</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── The stage: what each step looks like in the app ─────────────────────────

const shot = "absolute h-auto max-w-none rounded-[14px] border border-hairline bg-white shadow-[0_24px_60px_-30px_rgba(20,20,20,0.35)]"

function Stage({ step }: { step: StepId }) {
  return (
    <div className="relative h-80 overflow-hidden rounded-3xl border border-hairline bg-white sm:h-105 lg:h-125">
      {step === "pick" && <PickStage />}
      {step === "connect" && <ConnectStage />}
      {step === "ask" && <AskStage />}
      {step === "run" && <RunStage />}
    </div>
  )
}

/** A floating status card over a screenshot, as a toast would sit in the app. */
function Toast({ title, note, className }: { title: string; note: string; className?: string }) {
  return (
    <div
      className={cn(
        "absolute flex items-center gap-2.5 rounded-2xl border border-hairline bg-white py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-20px_rgba(20,20,20,0.45)]",
        className,
      )}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
        <Check className="h-3.5 w-3.5" />
      </span>
      <span>
        <span className="block text-xs font-semibold text-ink">{title}</span>
        <span className="block text-[11px] text-quiet">{note}</span>
      </span>
    </div>
  )
}

const AGENTS: { name: string; sub: string; glow: string[]; icons: { Icon: IconType; color: string }[] }[] = [
  {
    name: "Social Media Manager",
    sub: "Instagram · TikTok · YouTube",
    glow: ["#F58529", "#DD2A7B", "#8134AF"],
    icons: [
      { Icon: SiInstagram, color: "#DD2A7B" },
      { Icon: SiTiktok, color: "#111827" },
      { Icon: SiYoutube, color: "#FF0033" },
    ],
  },
  {
    name: "SEO & GEO Agent",
    sub: "Google · ChatGPT · Perplexity",
    glow: ["#EA580C", "#7C3AED", "#EA580C"],
    icons: [
      { Icon: SiGoogle, color: "#4285F4" },
      { Icon: SiOpenai, color: "#111827" },
    ],
  },
  {
    name: "Website Manager",
    sub: "Claude Code · Codex · WordPress",
    glow: ["#6366F1", "#06B6D4", "#8B5CF6"],
    icons: [
      { Icon: SiGithub, color: "#111827" },
      { Icon: SiWordpress, color: "#21759B" },
    ],
  },
]

function PickStage() {
  return (
    <>
      <div className="absolute inset-x-[5%] top-[5%] overflow-hidden rounded-[14px] border border-hairline bg-white shadow-[0_24px_60px_-30px_rgba(20,20,20,0.35)]">
        <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
          <span className="text-sm font-semibold text-ink">My agents</span>
          <span className="text-[11px] text-faint">Choose one to start</span>
        </div>
        <ul className="space-y-1.5 p-2.5 lg:space-y-2 lg:p-3">
          {AGENTS.map((agent) => (
            <li key={agent.name} className="flex items-center gap-3 rounded-xl border border-hairline p-2 lg:p-2.5">
              {/* A small version of the agent's dark, platform-lit card */}
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-zinc-950 lg:h-11 lg:w-11">
                <span className="absolute -left-2 -top-2 h-7 w-7 rounded-full blur-md" style={{ background: agent.glow[0] }} />
                <span className="absolute -bottom-2 left-2 h-7 w-7 rounded-full blur-md" style={{ background: agent.glow[1] }} />
                <span className="absolute -right-2 top-1 h-6 w-6 rounded-full opacity-70 blur-md" style={{ background: agent.glow[2] }} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-ink">{agent.name}</span>
                <span className="block truncate text-[11px] text-quiet">{agent.sub}</span>
              </span>
              <span className="hidden items-center gap-1.5 sm:flex">
                {agent.icons.map(({ Icon, color }, i) => (
                  <Icon key={i} className="h-3.5 w-3.5" style={{ color }} />
                ))}
              </span>
              <span className="shrink-0 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-white">Start</span>
            </li>
          ))}
          <li className="flex items-center gap-3 rounded-xl border border-dashed border-hairline p-2 lg:p-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist text-ink lg:h-11 lg:w-11">
              <Plus className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold text-ink">Request a custom agent</span>
              <span className="block truncate text-[11px] text-quiet">Describe the job. We build it around your tools.</span>
            </span>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-0 right-[5%] hidden items-end gap-2 sm:flex">
        <div className="relative mb-6 rounded-2xl rounded-br-sm bg-ink px-3.5 py-2.5 text-[13px] font-medium text-white">
          Which job should I take off your plate?
        </div>
        <Ambassador pose="wave" sizes="140px" className="h-24 w-20 shrink-0 lg:h-33 lg:w-27.5" />
      </div>
    </>
  )
}

function ConnectStage() {
  return (
    <>
      <Image
        src="/social-agent/dashboard-overview.webp"
        alt="The agent's dashboard after connecting an Instagram and a TikTok account: followers, views and interactions across every channel"
        width={1800}
        height={1215}
        sizes="(min-width: 1024px) 820px, 130vw"
        className={cn(shot, "left-[5%] top-[7%] w-[125%]")}
      />
      <div className="absolute bottom-[6%] right-[5%] hidden w-60 rounded-2xl border border-hairline bg-white p-3 shadow-[0_18px_40px_-20px_rgba(20,20,20,0.45)] sm:block">
        <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-faint">Connected</p>
        <ul className="space-y-1.5">
          {[
            { Icon: SiInstagram, color: "#DD2A7B", label: "Instagram" },
            { Icon: SiTiktok, color: "#111827", label: "TikTok" },
          ].map(({ Icon, color, label }) => (
            <li key={label} className="flex items-center gap-2.5 rounded-lg bg-mist px-2.5 py-2">
              <Icon className="h-4 w-4 shrink-0" style={{ color }} />
              <span className="flex-1 text-xs font-medium text-ink">{label}</span>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            </li>
          ))}
          <li className="flex items-center gap-2.5 rounded-lg border border-dashed border-hairline px-2.5 py-2 text-xs font-medium text-quiet">
            <Plus className="h-4 w-4 shrink-0" />
            Add account
          </li>
        </ul>
      </div>
    </>
  )
}

function AskStage() {
  return (
    <>
      {/* The chat opens as a drawer over the dashboard, as it does in the app */}
      <Image
        src="/social-agent/dashboard-overview.webp"
        alt=""
        aria-hidden
        width={1800}
        height={1215}
        sizes="(min-width: 1024px) 820px, 130vw"
        className={cn(shot, "left-[5%] top-[7%] w-[125%] opacity-40 blur-[1.5px]")}
      />
      <Image
        src="/social-agent/chat.webp"
        alt="Ask your Agent: it answers which posts to make more of, then plans and schedules the next week"
        width={720}
        height={1350}
        sizes="(min-width: 1024px) 380px, 70vw"
        className={cn(shot, "right-[5%] top-[7%] w-[62%] sm:w-[52%] lg:w-[56%]")}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white to-transparent" />
      <Ambassador
        pose="working"
        sizes="160px"
        className="pointer-events-none absolute bottom-0 left-[4%] hidden h-42.5 w-35 sm:block lg:h-50 lg:w-41.25"
      />
    </>
  )
}

function RunStage() {
  return (
    <>
      <Image
        src="/social-agent/plan.webp"
        alt="The content plan: a carousel designed in the brand kit, set to auto-post on Tuesday at 9:00, with the reason it was chosen"
        width={1600}
        height={898}
        sizes="(min-width: 1024px) 620px, 95vw"
        className={cn(shot, "left-[4%] top-[7%] w-[92%]")}
      />
      <Toast
        title="Posted to Instagram · Tue 9:00"
        note="I'll report back on how it did"
        className="bottom-[7%] right-[5%] hidden sm:flex"
      />
    </>
  )
}
