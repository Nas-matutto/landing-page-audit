"use client"

import { useState } from "react"
import { Clock, Zap } from "lucide-react"

type Props = {
  question: string
  unitLabel: string
  min: number
  max: number
  step: number
  defaultValue: number
  period: "week" | "month"
  /** Manual minutes spent per unit. */
  manualMinsPer: number
  /** Seconds of human time per unit with the agent (review/exceptions). */
  aiSecsPer: number
  manualNote: string
  aiNote: string
  savedNoun: string
  disclaimer: string
}

function fmtHours(minutes: number): { value: string; unit: string } {
  const hrs = minutes / 60
  if (hrs < 1) return { value: Math.max(1, Math.round(minutes)).toString(), unit: "mins" }
  return { value: Math.round(hrs).toLocaleString(), unit: hrs < 2 ? "hr" : "hrs" }
}

function fmtHoursLong(minutes: number): string {
  const hrs = Math.round(minutes / 60)
  return `${hrs.toLocaleString()} hr${hrs !== 1 ? "s" : ""}`
}

export function AgentSavingsCalculator({
  question,
  unitLabel,
  min,
  max,
  step,
  defaultValue,
  period,
  manualMinsPer,
  aiSecsPer,
  manualNote,
  aiNote,
  savedNoun,
  disclaimer,
}: Props) {
  const [count, setCount] = useState(defaultValue)
  const annualMultiplier = period === "week" ? 52 : 12

  const manualMins = count * manualMinsPer
  const aiMins = (count * aiSecsPer) / 60
  const savedMins = manualMins - aiMins
  const savedYearMins = savedMins * annualMultiplier

  const manualFmt = fmtHours(manualMins)
  const aiFmt = fmtHours(aiMins)
  const savedFmt = fmtHoursLong(savedMins)
  const savedYearFmt = fmtHoursLong(savedYearMins)
  const savingsPct = Math.round((savedMins / manualMins) * 100)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Slider */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-500 mb-2 text-center">{question}</p>
        <p className="text-5xl font-bold text-center text-slate-900 mb-6 tabular-nums">
          {count.toLocaleString()}
          <span className="text-xl font-medium text-slate-400 ml-2">{unitLabel}</span>
        </p>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-full accent-primary h-2 rounded-full cursor-pointer"
          aria-label={question}
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2 px-0.5">
          <span>{min.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      </div>

      {/* Manual vs AI */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Without AI</p>
          <p className="text-3xl sm:text-4xl font-bold text-slate-700 tabular-nums leading-none">{manualFmt.value}</p>
          <p className="text-sm text-slate-400 mt-1">{manualFmt.unit} / {period}</p>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">{manualNote}</p>
        </div>

        <div className="bg-white rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center shadow-sm">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">With AI Agent</p>
          <p className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500 tabular-nums leading-none">
            {aiFmt.value}
          </p>
          <p className="text-sm text-slate-400 mt-1">{aiFmt.unit} / {period}</p>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">{aiNote}</p>
        </div>
      </div>

      {/* Savings callout */}
      <div className="rounded-2xl bg-linear-to-r from-primary to-violet-600 p-px shadow-lg shadow-primary/20">
        <div className="rounded-[calc(1rem-1px)] bg-linear-to-br from-primary/95 to-violet-600/95 px-8 py-7 text-center">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">You save</p>
          <p className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-1">{savedFmt}</p>
          <p className="text-white/60 text-sm mb-5">{savedNoun} per {period}</p>
          <div className="max-w-sm mx-auto mb-5">
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-white transition-all duration-300" style={{ width: `${savingsPct}%` }} />
            </div>
            <p className="text-white/50 text-xs mt-1.5">{savingsPct}% of your manual time</p>
          </div>
          <p className="text-white/80 text-sm">
            That&apos;s <span className="font-bold text-white">{savedYearFmt}</span> saved per year
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-4">{disclaimer}</p>
    </div>
  )
}
