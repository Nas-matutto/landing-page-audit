"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SocialAgentShowcase } from "@/components/sections/social-agent-showcase"
import { SeoAgentShowcase } from "@/components/sections/seo-agent-showcase"
import { WebsiteAgentShowcase } from "@/components/sections/website-agent-showcase"
import { cn } from "@/lib/utils"

// The ready-made agents, one showcase at a time. Swipe or drag between them,
// use the arrows (beside the card on large screens, under it on smaller ones),
// the agent pills above, or the arrow keys. It loops, so there's no dead end.

const AGENTS = [
  { id: "social", name: "Social Media Manager", short: "Social media", Showcase: SocialAgentShowcase },
  { id: "seo", name: "SEO & GEO Agent", short: "SEO & GEO", Showcase: SeoAgentShowcase },
  { id: "website", name: "Website Manager", short: "Website", Showcase: WebsiteAgentShowcase },
]

/** Text fields keep their own drag, so selecting what you typed doesn't swipe the card away. */
function startsOnField(evt: MouseEvent | TouchEvent) {
  return evt.target instanceof Element && evt.target.closest("input, textarea, select") !== null
}

export function ReadyMadeAgentsCarousel() {
  const [viewportRef, api] = useEmblaCarousel({
    loop: true,
    align: "start",
    watchDrag: (_api, evt) => !startsOnField(evt),
  })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect).on("reInit", onSelect)
    return () => {
      api.off("select", onSelect).off("reInit", onSelect)
    }
  }, [api])

  const prev = useCallback(() => api?.scrollPrev(), [api])
  const next = useCallback(() => api?.scrollNext(), [api])

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.target instanceof Element && e.target.closest("input, textarea, select")) return
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      prev()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      next()
    }
  }

  const prevName = AGENTS[(selected + AGENTS.length - 1) % AGENTS.length].name
  const nextName = AGENTS[(selected + 1) % AGENTS.length].name

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Ready-made agents" onKeyDown={onKeyDown}>
      {/* Which agent you're on, and a shortcut to the others */}
      <div className="mb-5 flex items-center justify-center lg:justify-between">
        <div role="group" aria-label="Choose an agent" className="inline-flex max-w-full gap-1 rounded-full border border-hairline bg-white p-1">
          {AGENTS.map((agent, i) => (
            <button
              key={agent.id}
              type="button"
              aria-current={selected === i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "cursor-pointer whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold transition-colors sm:px-4 sm:text-sm",
                selected === i ? "bg-ink text-white" : "text-quiet hover:text-ink",
              )}
            >
              <span className="sm:hidden">{agent.short}</span>
              <span className="hidden sm:inline">{agent.name}</span>
            </button>
          ))}
        </div>
        <p className="hidden font-mono text-sm text-faint lg:block" aria-hidden>
          <span className="text-ink">{String(selected + 1).padStart(2, "0")}</span> / {String(AGENTS.length).padStart(2, "0")}
        </p>
      </div>

      <div className="relative">
        <div ref={viewportRef} className="cursor-grab overflow-hidden rounded-3xl active:cursor-grabbing">
          <div className="-ml-4 flex touch-pan-y">
            {AGENTS.map(({ id, name, Showcase }, i) => (
              <div
                key={id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${AGENTS.length}: ${name}`}
                inert={selected !== i}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4"
              >
                <Showcase />
              </div>
            ))}
          </div>
        </div>

        {/* Large screens: arrows on either side of the card */}
        <ArrowButton direction="prev" label={`Previous agent: ${prevName}`} onClick={prev} className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex" />
        <ArrowButton direction="next" label={`Next agent: ${nextName}`} onClick={next} className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:flex" />
      </div>

      {/* Phones and tablets: arrows under the card, either side of a swipe hint */}
      <div className="mt-5 flex items-center justify-between gap-3 lg:hidden">
        <ArrowButton direction="prev" label={`Previous agent: ${prevName}`} onClick={prev} />
        <div className="flex min-w-0 flex-col items-center gap-2">
          <span className="flex gap-1.5" aria-hidden>
            {AGENTS.map((agent, i) => (
              <span key={agent.id} className={cn("h-1.5 rounded-full transition-all", selected === i ? "w-5 bg-ink" : "w-1.5 bg-faint")} />
            ))}
          </span>
          <span className="truncate text-xs text-quiet">
            Swipe for the next agent
          </span>
        </div>
        <ArrowButton direction="next" label={`Next agent: ${nextName}`} onClick={next} />
      </div>
    </div>
  )
}

function ArrowButton({ direction, label, onClick, className }: { direction: "prev" | "next"; label: string; onClick: () => void; className?: string }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "z-10 flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-hairline bg-white text-ink shadow-[0_12px_30px_-12px_rgba(20,20,20,0.45)] transition-colors hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2",
        className,
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}
