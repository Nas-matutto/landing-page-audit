"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, MotionConfig, motion, useInView } from "framer-motion"
import { ArrowUp, BarChart3, CalendarDays, Check, Images, Loader2, Send, Sparkles, Users, Zap } from "lucide-react"
import { Ambassador, type AmbassadorPose } from "@/components/ui/ambassador"
import { cn } from "@/lib/utils"

// An interactive replay of the agent taking a request. The replies follow what
// the agent really does on a sample account ("Studio Nova"): analysis in chat,
// post kits, brand-kit carousels and auto-posting through its own actions.

export interface Command {
  id: string
  prompt: string
  Icon: typeof Sparkles
  steps: string[]
  reply: React.ReactNode
  /** Shown under the reply, e.g. the finished carousel. */
  attachment?: React.ReactNode
}

export const B = ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-ink">{children}</strong>

const SLIDES = (
  <div className="flex gap-2 overflow-x-auto pb-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <Image
        key={n}
        src={`/social-agent/slide-${n}.webp`}
        alt={`Slide ${n} of the carousel, designed in the brand kit`}
        width={480}
        height={600}
        sizes="110px"
        className="h-36 w-auto shrink-0 rounded-lg border border-hairline"
      />
    ))}
  </div>
)

const COMMANDS: Command[] = [
  {
    id: "best",
    prompt: "Which of my posts should I make more of?",
    Icon: BarChart3,
    steps: ["Reading your last 44 posts", "Comparing formats with your median", "Checking which openings work"],
    reply: (
      <>
        <p>
          Make more <B>carousels</B>. Your last 6 averaged <B>31K views</B>, 2.4× your median.
        </p>
        <p className="mt-2">
          Your best opening is <B>result-first</B>: “We cut a rebrand from 6 weeks to 9 days” did 2.1× your median. Reels of <B>20–30 seconds</B> beat your longer ones.
        </p>
      </>
    ),
  },
  {
    id: "competitors",
    prompt: "What are my competitors doing that I'm not?",
    Icon: Users,
    steps: ["Reading 3 competitors' latest posts", "Finding their breakout posts", "Comparing them with your account"],
    reply: (
      <>
        <p>
          Brandcraft’s <B>3 breakout carousels</B> each taught one idea and earned 3× their usual views.
        </p>
        <p className="mt-2">
          Pixel Parlor’s top reels open on the <B>finished result</B>, then rewind to how it was made. You out-post them, 3.5 a week to 1.2, so the gap is the opening, not the volume.
        </p>
      </>
    ),
  },
  {
    id: "plan",
    prompt: "Plan my week",
    Icon: CalendarDays,
    steps: ["Finding your best days and times", "Writing 3 posts with hooks and scripts", "Adding them to your plan"],
    reply: (
      <>
        <p>
          Done. <B>3 posts</B> are in your plan, in your best slots:
        </p>
        <ul className="mt-2 space-y-1">
          <li>
            <B>Tue 9:00</B> · Carousel: 3 branding mistakes killing your reach
          </li>
          <li>
            <B>Thu 18:30</B> · Reel: Behind the scenes, a rebrand in 30 seconds
          </li>
          <li>
            <B>Sat 11:00</B> · Image: Client win, +212% enquiries
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "carousel",
    prompt: "Make a carousel from my best topic",
    Icon: Images,
    steps: ["Picking the topic your audience likes most", "Writing 5 slides", "Designing them in your brand kit"],
    attachment: SLIDES,
    reply: (
      <p>
        Done. <B>5 slides</B> in your brand kit: your colours, your font, your handle. Edit any slide, or send it straight to your plan.
      </p>
    ),
  },
  {
    id: "post",
    prompt: "Post it for me",
    Icon: Send,
    steps: ["Checking your Instagram connection", "Queuing the carousel", "Setting it to auto-post"],
    reply: (
      <p>
        Scheduled. It goes live <B>Tue 9:00</B> on Instagram, and I’ll email you how it did once it’s up.
      </p>
    ),
  },
]

const STEP_MS = 800
const TYPE_MS = 26

type Phase = "idle" | "typing" | "working" | "done"

/** Other agent pages pass their own requests; the first run starts on `startIndex`. */
export function AgentDemo({ commands = COMMANDS, startIndex = 2 }: { commands?: Command[]; startIndex?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const [cmd, setCmd] = useState<Command | null>(null)
  const [phase, setPhase] = useState<Phase>("idle")
  const [typed, setTyped] = useState("")
  const [stepsDone, setStepsDone] = useState(0)
  const timers = useRef<number[]>([])
  const started = useRef(false)

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }
  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }
  useEffect(() => clear, [])

  function run(next: Command) {
    clear()
    setCmd(null)
    setStepsDone(0)
    setPhase("typing")
    setTyped("")
    for (let i = 1; i <= next.prompt.length; i++) later(() => setTyped(next.prompt.slice(0, i)), i * TYPE_MS)
    const sent = next.prompt.length * TYPE_MS + 350
    later(() => {
      setTyped("")
      setCmd(next)
      setPhase("working")
    }, sent)
    next.steps.forEach((_, i) => later(() => setStepsDone(i + 1), sent + (i + 1) * STEP_MS))
    later(() => setPhase("done"), sent + next.steps.length * STEP_MS + 300)
  }

  // Start on its own the first time it scrolls into view, so it reads as the agent at work.
  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    later(() => run(commands[startIndex]), 500)
  }, [inView])

  const busy = phase === "typing" || phase === "working"
  const pose: AmbassadorPose = phase === "working" ? "working" : phase === "done" ? "thumbs-up" : "wave"
  const bubble =
    phase === "idle"
      ? "Pick one and watch me work."
      : phase === "typing"
        ? "Got it…"
        : phase === "working" && cmd
          ? `${cmd.steps[Math.min(stepsDone, cmd.steps.length - 1)]}…`
          : "Done. Want me to change anything?"

  return (
    <MotionConfig reducedMotion="user">
      <section id="agent-demo" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div ref={ref} className="mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink text-white">
          <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            {/* Left: the ask, and the ambassador who does it */}
            <div className="flex flex-col p-7 pb-0 sm:p-10 sm:pb-0 lg:p-12 lg:pb-0">
              <p className="eyebrow mb-5 text-white/50">Try it</p>
              <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)] text-white!">Tell it what to do. It does it.</h2>
              <p className="mt-5 max-w-md text-base font-light leading-snug text-white/65">
                Ask a question about your numbers, or tell it what to make. Pick a request and watch the agent work through it.
              </p>

              <div role="group" aria-label="Requests to try" className="mt-7 flex flex-col gap-2">
                {commands.map((c) => {
                  const active = cmd?.id === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      disabled={busy}
                      onClick={() => run(c)}
                      aria-pressed={active}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-full border px-4 py-2.5 text-left text-sm font-medium transition-colors disabled:cursor-default",
                        active ? "border-white bg-white text-ink" : "border-white/15 text-white/85 hover:bg-white/10 disabled:opacity-60",
                      )}
                    >
                      <c.Icon className="h-4 w-4 shrink-0" />
                      {c.prompt}
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 flex items-end gap-3 self-start">
                <Ambassador pose={pose} sizes="200px" className="-mb-px h-[190px] w-[150px] shrink-0 sm:h-[210px] sm:w-[170px]" />
                <div
                  aria-live="polite"
                  className="relative mb-8 max-w-[15rem] rounded-2xl rounded-bl-sm bg-white/10 px-3.5 py-2.5 text-[13px] leading-snug text-white ring-1 ring-white/15"
                >
                  {busy && <Loader2 className="mr-1.5 inline h-3 w-3 animate-spin align-[-1px] text-white/60" />}
                  {bubble}
                </div>
              </div>
            </div>

            {/* Right: the conversation */}
            <div className="p-4 pt-0 sm:p-8 sm:pt-0 lg:p-10 lg:pl-2">
              <div className="flex h-full min-h-[520px] flex-col overflow-hidden rounded-3xl bg-white text-ink">
                <div className="border-b border-hairline px-5 py-3.5">
                  <p className="text-sm font-semibold">Ask your Agent</p>
                  <p className="text-[11px] text-quiet">Answers use the numbers on your dashboard</p>
                </div>

                <div className="flex-1 space-y-4 px-5 py-5 text-[14px] leading-relaxed text-quiet">
                  <AnimatePresence mode="wait" initial={false}>
                    {cmd ? (
                      <motion.div key={cmd.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-4">
                        <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-mist px-4 py-2.5 font-medium text-ink">{cmd.prompt}</div>

                        <ul className="space-y-1.5">
                          {cmd.steps.map((step, i) => {
                            const done = i < stepsDone
                            const active = i === stepsDone && phase === "working"
                            return (
                              <li
                                key={step}
                                className={cn("flex items-center gap-2.5 text-[13px] transition-opacity duration-300", done || active ? "opacity-100" : "opacity-0")}
                              >
                                <span className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-full", done ? "bg-ink text-white" : "ring-1 ring-inset ring-hairline")}>
                                  {done ? <Check className="h-2.5 w-2.5" /> : <Loader2 className="h-2.5 w-2.5 animate-spin text-quiet" />}
                                </span>
                                <span className={done ? "text-quiet" : "text-ink"}>{step}</span>
                              </li>
                            )
                          })}
                        </ul>

                        {phase === "done" && (
                          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-mist px-2.5 py-1 text-[11px] font-medium text-quiet">
                              <Zap className="h-3 w-3 text-amber-500" />
                              Used {cmd.steps.length} tools
                            </span>
                            <div className="text-ink">{cmd.reply}</div>
                            {cmd.attachment}
                          </motion.div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-16 text-center text-sm text-faint">
                        {phase === "typing" ? "" : "Your conversation with the agent shows up here."}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* The bar types the request out, then sends it */}
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 rounded-full border border-hairline py-1.5 pl-4 pr-1.5">
                    <Sparkles className="h-4 w-4 shrink-0 text-faint" />
                    <span className={cn("min-w-0 flex-1 truncate text-sm", typed ? "text-ink" : "text-faint")}>{typed || "Ask the agent to complete a task…"}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                      <ArrowUp className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}
