"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, BarChart3, CalendarClock, Check, Plug, Plus, Sparkles } from "lucide-react"
import { SiFacebook, SiInstagram, SiTiktok, SiYoutube } from "react-icons/si"
import { SIGNUP_URL } from "@/lib/links"
import { cn } from "@/lib/utils"

// ── How it works ────────────────────────────────────────────────────────────
// The social media agent from first login to a post going out: connect your
// accounts, read what it found, ask it for posts, then schedule them or let it
// run. Every stage is a real capture of the agent on a sample account (in
// /public/social-agent), with a drawn card or toast laid over it.

type StepId = "connect" | "insights" | "create" | "schedule"

const STEPS: { id: StepId; n: string; title: string; body: string; Icon: LucideIcon }[] = [
  {
    id: "connect",
    n: "01",
    title: "Connect your accounts",
    body: "Sign in to Instagram, TikTok, Facebook or YouTube through each platform's own login, or paste a profile link. Your agent reads every post and has its first analysis ready in minutes.",
    Icon: Plug,
  },
  {
    id: "insights",
    n: "02",
    title: "Get your data and insights",
    body: "See which formats, hooks and time slots win with your audience, plus a short list of what to keep doing, what to fix and what to try this week.",
    Icon: BarChart3,
  },
  {
    id: "create",
    n: "03",
    title: "Ask it to make your posts",
    body: "Tell it what you want in plain English, or press Build it on any insight. It writes the hooks and captions and designs each post in your brand kit.",
    Icon: Sparkles,
  },
  {
    id: "schedule",
    n: "04",
    title: "Schedule them, or go on autopilot",
    body: "Approve each post and it goes out at your best time, or switch on autopilot and the agent posts for you. Either way, it reports back on how each post did.",
    Icon: CalendarClock,
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
              How does the AI social media agent work?
            </h2>
            <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
              Connect your accounts, see what&apos;s working, then ask for posts and let it schedule them. Here&apos;s what
              that looks like inside the app.
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
            {STEPS.map((step) => (
              <li key={step.id} className="reveal">
                <div className="mb-3 flex items-center gap-3">
                  <span className="select-none font-mono text-sm font-medium text-faint">{step.n}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink bg-ink text-white">
                    <step.Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{step.title}</h3>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-quiet">{step.body}</p>
                <Stage step={step.id} />
              </li>
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
      {step === "connect" && <ConnectStage />}
      {step === "insights" && <InsightsStage />}
      {step === "create" && <CreateStage />}
      {step === "schedule" && <ScheduleStage />}
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

const CONNECTED = [
  { Icon: SiInstagram, color: "#E4405F", label: "Instagram", on: true },
  { Icon: SiTiktok, color: "#111827", label: "TikTok", on: true },
  { Icon: SiFacebook, color: "#0866FF", label: "Facebook", on: true },
  { Icon: SiYoutube, color: "#FF0000", label: "YouTube", on: false },
]

function ConnectStage() {
  return (
    <>
      <Image
        src="/social-agent/dashboard-overview.webp"
        alt="The agent's dashboard after connecting Instagram and TikTok: followers, views and interactions across every channel"
        width={1800}
        height={1215}
        sizes="(min-width: 1024px) 820px, 130vw"
        className={cn(shot, "left-[5%] top-[7%] w-[125%]")}
      />
      <div className="absolute bottom-[6%] right-[5%] hidden w-60 rounded-2xl border border-hairline bg-white p-3 shadow-[0_18px_40px_-20px_rgba(20,20,20,0.45)] sm:block">
        <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-faint">Your accounts</p>
        <ul className="space-y-1.5">
          {CONNECTED.map(({ Icon, color, label, on }) => (
            <li key={label} className="flex items-center gap-2.5 rounded-lg bg-mist px-2.5 py-2">
              <Icon className="h-4 w-4 shrink-0" style={{ color }} />
              <span className="flex-1 text-xs font-medium text-ink">{label}</span>
              {on ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white">Connect</span>
              )}
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

function InsightsStage() {
  return (
    <>
      {/* The charts behind, the agent's read of them in front */}
      <Image
        src="/social-agent/patterns.webp"
        alt="Charts of the account's posting rhythm, breakout posts, best time slots and what each format earns"
        width={1600}
        height={1275}
        sizes="(min-width: 1024px) 760px, 120vw"
        className={cn(shot, "left-[5%] top-[5%] w-[110%]")}
      />
      <Image
        src="/social-agent/analysis.webp"
        alt="Your Agent's analysis: carousels earn 2.4 times the median, with what to keep doing, what to fix and what to try this week"
        width={1600}
        height={570}
        sizes="(min-width: 1024px) 640px, 95vw"
        className={cn(shot, "bottom-[6%] left-[4%] w-[92%]")}
      />
    </>
  )
}

function CreateStage() {
  return (
    <>
      {/* You ask in the chat; the finished carousel comes back in your brand kit */}
      <Image
        src="/social-agent/design.webp"
        alt="A finished five-slide carousel, 3 branding mistakes killing your reach, designed in the brand kit and ready to edit"
        width={1500}
        height={1513}
        sizes="(min-width: 1024px) 520px, 90vw"
        className={cn(shot, "left-[5%] top-[7%] w-[78%] sm:w-[66%]")}
      />
      <Image
        src="/social-agent/chat.webp"
        alt="Ask your Agent: it says which posts to make more of, then plans and schedules the next week"
        width={720}
        height={1350}
        sizes="(min-width: 1024px) 340px, 60vw"
        className={cn(shot, "right-[4%] top-[12%] hidden w-[44%] sm:block")}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white to-transparent" />
    </>
  )
}

function ScheduleStage() {
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
