"use client"

import { useState } from "react"
import { Clock, Zap } from "lucide-react"

const MANUAL_MINS = 5      // minutes per invoice manually
const AI_SECS = 20         // seconds per invoice with AI

function formatTime(minutes: number): { value: string; unit: string } {
  if (minutes < 60) return { value: Math.round(minutes).toString(), unit: minutes === 1 ? "min" : "mins" }
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  if (m === 0) return { value: h.toString(), unit: h === 1 ? "hr" : "hrs" }
  return { value: `${h}h ${m}m`, unit: "per month" }
}

function formatTimeLong(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} hr${h !== 1 ? "s" : ""}`
  return `${h} hr${h !== 1 ? "s" : ""} ${m} min`
}

export function InvoiceSavingsCalculator() {
  const [count, setCount] = useState(50)

  const manualMins = count * MANUAL_MINS
  const aiMins = (count * AI_SECS) / 60
  const savedMins = manualMins - aiMins
  const savedYearMins = savedMins * 12

  const manualFmt = formatTime(manualMins)
  const aiFmt = formatTime(aiMins)
  const savedFmt = formatTimeLong(savedMins)
  const savedYearFmt = formatTimeLong(savedYearMins)

  // percentage of manual time saved (for the visual bar)
  const savingsPct = Math.round((savedMins / manualMins) * 100)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Slider control */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-500 mb-2 text-center">
          How many invoices do you process per month?
        </p>
        <p className="text-5xl font-bold text-center text-slate-900 mb-6 tabular-nums">
          {count}
          <span className="text-xl font-medium text-slate-400 ml-2">invoices</span>
        </p>

        <input
          type="range"
          min={10}
          max={500}
          step={5}
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-full accent-primary h-2 rounded-full cursor-pointer"
          aria-label="Number of invoices per month"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2 px-0.5">
          <span>10</span>
          <span>500</span>
        </div>
      </div>

      {/* Comparison: manual vs AI */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Manual */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Without AI</p>
          <p className="text-3xl sm:text-4xl font-bold text-slate-700 tabular-nums leading-none">
            {manualFmt.value}
          </p>
          <p className="text-sm text-slate-400 mt-1">{manualFmt.unit} / month</p>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Entering each invoice manually at {MANUAL_MINS} min each
          </p>
        </div>

        {/* With AI */}
        <div className="bg-white rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center shadow-sm">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">With AI Agent</p>
          <p className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500 tabular-nums leading-none">
            {aiFmt.value}
          </p>
          <p className="text-sm text-slate-400 mt-1">{aiFmt.unit} / month</p>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            AI scans and adds each invoice in ~{AI_SECS} seconds
          </p>
        </div>
      </div>

      {/* Savings callout */}
      <div className="rounded-2xl bg-linear-to-r from-primary to-violet-600 p-px shadow-lg shadow-primary/20">
        <div className="rounded-[calc(1rem-1px)] bg-linear-to-br from-primary/95 to-violet-600/95 px-8 py-7 text-center">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">You save</p>
          <p className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-1">{savedFmt}</p>
          <p className="text-white/60 text-sm mb-5">per month</p>

          {/* Progress bar showing % saved */}
          <div className="max-w-sm mx-auto mb-5">
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{ width: `${savingsPct}%` }}
              />
            </div>
            <p className="text-white/50 text-xs mt-1.5">{savingsPct}% of your manual processing time</p>
          </div>

          <p className="text-white/80 text-sm">
            That&apos;s{" "}
            <span className="font-bold text-white">{savedYearFmt}</span>
            {" "}saved per year
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-4">
        Based on 5 min manual entry vs. ~20 sec with the AI agent. Actual results vary by invoice complexity.
      </p>
    </div>
  )
}
