"use client"

import { useEffect, useState } from "react"
import { PREBUILT_AGENTS } from "@/lib/prebuilt-agents"
import { cn } from "@/lib/utils"

// The agents page hero's rotating word: the pre-built agents in turn. The
// first word is in the page's HTML, so it shows before any JavaScript runs;
// the swaps are plain CSS transitions.

const WORDS = PREBUILT_AGENTS.map((a) => a.short)

export function AgentsRotatingWord({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % WORDS.length), 2200)
    return () => clearTimeout(id)
  }, [index])

  return (
    <span className={cn("relative inline-flex w-full justify-center overflow-hidden", className)} style={{ height: "1.15em" }}>
      {WORDS.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={cn(
            "display absolute whitespace-nowrap transition-[opacity,transform] duration-700 ease-out",
            i === index ? "translate-y-0 opacity-100" : i < index ? "-translate-y-[60px] opacity-0" : "translate-y-[60px] opacity-0",
          )}
        >
          {word}
        </span>
      ))}
    </span>
  )
}
