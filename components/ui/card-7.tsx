"use client"

import { useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"

export type AgentCardData = {
  icon: LucideIcon
  iconColor: string
  gradientFrom: string
  gradientTo: string
  title: string
  tag: string
  description: string
  examples: { label: string; value: string }[]
}

export function InteractiveAgentCard({ card }: { card: AgentCardData }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const maxTilt = 10
    setTilt({
      x: (-dy / (rect.height / 2)) * maxTilt,
      y: (dx / (rect.width / 2)) * maxTilt,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  const Icon = card.icon

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${hovered ? 1.03 : 1}, ${hovered ? 1.03 : 1}, 1)`,
        transition: hovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
      }}
      className="relative w-72 shrink-0 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md select-none"
    >
      {/* Gradient header */}
      <div
        className="h-36 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${card.gradientFrom}, ${card.gradientTo})` }}
      >
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
          <Icon className="w-8 h-8" style={{ color: card.iconColor }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-semibold mb-1" style={{ color: card.gradientFrom }}>
          {card.tag}
        </p>
        <h3 className="font-bold text-base text-slate-800 mb-2">{card.title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">{card.description}</p>

        <div className="space-y-1.5">
          {card.examples.map((ex, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
              <span className="text-xs text-slate-400">{ex.label}</span>
              <span className="text-xs font-medium text-slate-700">{ex.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
