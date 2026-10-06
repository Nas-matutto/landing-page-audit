"use client"

import { LENSES, type Lens } from "@/lib/pricing"
import { cn } from "@/lib/utils"

/** The agent switch used across /pricing. One line on every screen: short labels on phones. */
export function LensTabs({ lens, setLens, className }: { lens: Lens; setLens: (l: Lens) => void; className?: string }) {
  return (
    <div role="tablist" aria-label="Agent type" className={cn("inline-flex max-w-full gap-0.5 rounded-full border border-hairline p-1 sm:gap-1", className)}>
      {LENSES.map((l) => (
        <button
          key={l.id}
          role="tab"
          aria-selected={lens === l.id}
          onClick={() => setLens(l.id)}
          className={cn(
            "cursor-pointer whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold transition-colors sm:px-4 sm:text-sm",
            lens === l.id ? "bg-ink text-white" : "text-quiet hover:text-ink",
          )}
        >
          <span className="sm:hidden">{l.tiny}</span>
          <span className="hidden sm:inline">{l.short}</span>
        </button>
      ))}
    </div>
  )
}
