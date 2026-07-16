"use client"

import { useState } from "react"
import { Clock, Zap } from "lucide-react"

const MANUAL_MINS_PER_LEAD = 12 // research + enrich one lead by hand
const AI_REVIEW_SECS_PER_LEAD = 30 // quick review of an agent-delivered lead

function formatHours(minutes: number): { value: string; unit: string } {
  const hrs = minutes / 60
  if (hrs < 1) return { value: Math.max(1, Math.round(minutes)).toString(), unit: "mins" }
  return { value: Math.round(hrs).toString(), unit: hrs < 2 ? "hr" : "hrs" }
}

function formatHoursLong(minutes: number): string {
  const hrs = Math.round(minutes / 60)
  return `${hrs.toLocaleString()} hr${hrs !== 1 ? "s" : ""}`
}

export function LeadFinderSavingsCalculator() {
  const [leads, setLeads] = useState(300)

  const manualMinsWeek = leads * MANUAL_MINS_PER_LEAD
  const aiMinsWeek = (leads * AI_REVIEW_SECS_PER_LEAD) / 60
  const savedMinsWeek = manualMinsWeek - aiMinsWeek
  const savedYearMins = savedMinsWeek * 52

  const manualFmt = formatHours(manualMinsWeek)
  const aiFmt = formatHours(aiMinsWeek)
  const savedFmt = formatHoursLong(savedMinsWeek)
  const savedYearFmt = formatHoursLong(savedYearMins)

  const savingsPct = Math.round((savedMinsWeek / manualMinsWeek) * 100)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Slider control */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6 shadow-sm">
        <p className="text-sm font-semibold text-slate-500 mb-2 text-center">
          How many verified leads do you want per week?
        </p>
        <p className="text-5xl font-bold text-center text-slate-900 mb-6 tabular-nums">
          {leads.toLocaleString()}
          <span className="text-xl font-medium text-slate-400 ml-2">leads</span>
        </p>

        <input
          type="range"
          min={50}
          max={1000}
          step={25}
          value={leads}
          onChange={e => setLeads(Number(e.target.value))}
          className="w-full accent-primary h-2 rounded-full cursor-pointer"
          aria-label="Number of verified leads per week"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2 px-0.5">
          <span>50</span>
          <span>1,000</span>
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
          <p className="text-sm text-slate-400 mt-1">{manualFmt.unit} / week</p>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Researching &amp; enriching each lead at ~{MANUAL_MINS_PER_LEAD} min
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
          <p className="text-sm text-slate-400 mt-1">{aiFmt.unit} / week</p>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            The agent finds &amp; enriches them — you just review
          </p>
        </div>
      </div>

      {/* Savings callout */}
      <div className="rounded-2xl bg-linear-to-r from-primary to-violet-600 p-px shadow-lg shadow-primary/20">
        <div className="rounded-[calc(1rem-1px)] bg-linear-to-br from-primary/95 to-violet-600/95 px-8 py-7 text-center">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">You save</p>
          <p className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-1">{savedFmt}</p>
          <p className="text-white/60 text-sm mb-5">of prospecting time per week</p>

          {/* Progress bar showing % saved */}
          <div className="max-w-sm mx-auto mb-5">
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{ width: `${savingsPct}%` }}
              />
            </div>
            <p className="text-white/50 text-xs mt-1.5">{savingsPct}% of your manual prospecting time</p>
          </div>

          <p className="text-white/80 text-sm">
            That&apos;s{" "}
            <span className="font-bold text-white">{savedYearFmt}</span>
            {" "}saved per year
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-4">
        Based on ~{MANUAL_MINS_PER_LEAD} min manual research &amp; enrichment per lead vs a quick review with the agent.
        Actual results vary by ICP and data sources.
      </p>
    </div>
  )
}
