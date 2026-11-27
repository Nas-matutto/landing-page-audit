"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowRight, ChevronLeft, ChevronRight, Wand2 } from "lucide-react"
import { PREBUILT_AGENTS } from "@/lib/prebuilt-agents"
import { PrebuiltAgentCard } from "@/components/sections/prebuilt-agent-card"
import { cn } from "@/lib/utils"

// ── Other agents ─────────────────────────────────────────────────────────────
// The homepage is about the social media agent, so the rest get one compact
// carousel: the social agent first and marked as the favourite, the other
// ready-made agents after it, and a custom agent at the end. Each card is the
// same one the /agents page and the app use.

const CUSTOM_IDEAS = ["Chase overdue invoices", "Log every sales call in your CRM", "Send a weekly KPI report to Slack"]

export function OtherAgentsSection() {
  const [viewportRef, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" })
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  useEffect(() => {
    if (!api) return
    const onChange = () => {
      setSelected(api.selectedScrollSnap())
      setSnaps(api.scrollSnapList().length)
      setCanPrev(api.canScrollPrev())
      setCanNext(api.canScrollNext())
    }
    onChange()
    api.on("select", onChange).on("reInit", onChange)
    return () => {
      api.off("select", onChange).off("reInit", onChange)
    }
  }, [api])

  const prev = useCallback(() => api?.scrollPrev(), [api])
  const next = useCallback(() => api?.scrollNext(), [api])

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      prev()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      next()
    }
  }

  const slideCount = PREBUILT_AGENTS.length + 1

  return (
    <section id="use-cases" className="border-y border-hairline bg-mist py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-12 text-center sm:mb-14">
            <p className="eyebrow mb-5">More AI agents</p>
            <h2 className="display mx-auto max-w-4xl text-balance text-[clamp(2rem,4.5vw,3.25rem)]">
              Can I use other AI agents with Talk to me Data?
            </h2>
            <p className="lede mx-auto mt-6 max-w-3xl text-base sm:text-lg">
              Yes. The social media agent is where most people start and the one they use most, but every plan also
              includes agents for SEO, your website, sales outreach and social listening. Add one whenever you&apos;re
              ready, or ask us to build one for a job of your own.
            </p>
          </div>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="AI agents you can use with Talk to me Data"
            onKeyDown={onKeyDown}
            className="reveal"
          >
            {/* Vertical padding leaves room for the cards' hover lift inside the clip */}
            <div ref={viewportRef} className="-my-3 cursor-grab overflow-hidden py-3 active:cursor-grabbing">
              <div className="-ml-4 flex touch-pan-y">
                {PREBUILT_AGENTS.map((agent, i) => (
                  <div
                    key={agent.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${slideCount}: ${agent.title}`}
                    className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3"
                  >
                    <PrebuiltAgentCard agent={agent} badge={agent.id === "social_manager" ? "Most popular" : undefined} />
                  </div>
                ))}

                {/* Custom agent: the light card after the dark ones */}
                <div
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${slideCount} of ${slideCount}: Custom agent`}
                  className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    href="/get-started"
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-mist text-ink">
                      <Wand2 className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold leading-tight tracking-tight text-ink sm:text-2xl">
                      Request a custom agent
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-quiet">
                      Got a job none of these do? Describe it in plain English and we&apos;ll build, host and maintain an
                      agent that does it for you.
                    </p>
                    <ul className="mb-6 mt-4 space-y-2 text-sm text-ink/80">
                      {CUSTOM_IDEAS.map((idea) => (
                        <li key={idea} className="flex items-center gap-2">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-ink" />
                          {idea}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-opacity group-hover:opacity-85">
                      Request an agent
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Arrows under the cards, either side of the dots */}
            <div className="mx-auto mt-6 flex max-w-xs items-center justify-between gap-3">
              <ArrowButton direction="prev" label="Previous agents" onClick={prev} disabled={!canPrev} />
              <span className="flex gap-1.5" aria-hidden>
                {Array.from({ length: snaps }).map((_, i) => (
                  <span key={i} className={cn("h-1.5 rounded-full transition-all", selected === i ? "w-5 bg-ink" : "w-1.5 bg-faint")} />
                ))}
              </span>
              <ArrowButton direction="next" label="More agents" onClick={next} disabled={!canNext} />
            </div>
          </div>

          <p className="reveal mt-10 text-center text-sm text-quiet">
            All five ready-made agents come with every plan, the free one too.{" "}
            <Link href="/agents" className="font-semibold text-ink underline-offset-4 hover:underline">
              Explore all agents
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

function ArrowButton({
  direction,
  label,
  onClick,
  disabled,
}: {
  direction: "prev" | "next"
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-hairline bg-white text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-ink"
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}
