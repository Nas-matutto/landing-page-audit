"use client"

import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion"
import { cn } from "@/lib/utils"

function GridPattern({ offsetX, offsetY }: { offsetX: any; offsetY: any }) {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="agents-grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-slate-400"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#agents-grid-pattern)" />
    </svg>
  )
}

/**
 * Drop-in background: infinite scrolling grid + mouse-reveal highlight + soft glows.
 * Place as the first child of a `relative overflow-hidden` container.
 */
export function InfiniteGridBackground({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const gridOffsetX = useMotionValue(0)
  const gridOffsetY = useMotionValue(0)

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.4) % 40)
    gridOffsetY.set((gridOffsetY.get() + 0.4) % 40)
  })

  const maskImage = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black, transparent)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {/* Always-on faint grid */}
      <div className="absolute inset-0 opacity-[0.06]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Mouse-revealed brighter grid */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Brand-coloured atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[-15%] top-[-20%] w-[45%] h-[45%] rounded-full bg-violet-500/25 blur-[130px]" />
        <div className="absolute right-[5%] top-[-5%] w-[22%] h-[22%] rounded-full bg-primary/20 blur-[90px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px]" />
      </div>
    </div>
  )
}
