"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, CheckCircle2, Clock, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

const HOURLY_RATE = 15

const TEAM_SIZES = [
  { id: "solo", label: "Just me", multiplier: 1 },
  { id: "small", label: "2–5 people", multiplier: 3 },
  { id: "medium", label: "6–15 people", multiplier: 8 },
  { id: "large", label: "16–50 people", multiplier: 20 },
  { id: "enterprise", label: "50+ people", multiplier: 40 },
]

const DEFAULT_TASKS = [
  { id: "email", label: "Email triage & sorting", defaultHours: 3.5 },
  { id: "data_entry", label: "Data entry", defaultHours: 4 },
  { id: "reporting", label: "Reporting & analytics", defaultHours: 2.5 },
  { id: "scheduling", label: "Scheduling & calendar", defaultHours: 1.5 },
  { id: "customer_support", label: "Customer support responses", defaultHours: 4.5 },
  { id: "lead_qual", label: "Lead qualification", defaultHours: 3 },
  { id: "invoicing", label: "Invoice processing", defaultHours: 2 },
  { id: "social", label: "Social media posting", defaultHours: 2.5 },
  { id: "meeting_notes", label: "Meeting notes & summaries", defaultHours: 1.5 },
  { id: "crm", label: "CRM updates", defaultHours: 2 },
]

type Phase = "form" | "results"

export default function CalculatorPage() {
  const [teamSize, setTeamSize] = useState("")
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [taskHours, setTaskHours] = useState<Record<string, number>>(
    Object.fromEntries(DEFAULT_TASKS.map(t => [t.id, t.defaultHours]))
  )
  const [phase, setPhase] = useState<Phase>("form")
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  const selectedTeam = TEAM_SIZES.find(t => t.id === teamSize)

  const checkedTasks = DEFAULT_TASKS.filter(t => selectedTasks.includes(t.id))
  const totalPersonHoursPerWeek = checkedTasks.reduce((sum, t) => sum + (taskHours[t.id] ?? t.defaultHours), 0)
  const totalTeamHoursPerWeek = Math.round(totalPersonHoursPerWeek * (selectedTeam?.multiplier ?? 1))
  const annualValue = Math.round((totalTeamHoursPerWeek * 52 * HOURLY_RATE) / 100) * 100

  const canCalculate = teamSize && selectedTasks.length > 0

  const toggleTask = (id: string) => {
    setSelectedTasks(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const updateHours = (id: string, value: string) => {
    const num = parseFloat(value)
    if (!isNaN(num) && num >= 0) {
      setTaskHours(prev => ({ ...prev, [id]: num }))
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setEmailLoading(true)
    try {
      await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "workflow_calculator",
          teamSize: selectedTeam?.label,
          tasks: checkedTasks.map(t => t.label),
          hoursSaved: totalTeamHoursPerWeek,
          annualValue,
        }),
      })
    } finally {
      setEmailSubmitted(true)
      setEmailLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 sm:pt-40 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/free-tools" className="hover:text-slate-600 transition-colors">Free Tools</Link>
            <span>/</span>
            <span className="text-slate-600">Calculator</span>
          </div>

          {/* Card */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

            {/* Card header */}
            <div
              className="px-8 py-6"
              style={{
                background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Tool 01</p>
                  <h1 className="text-xl font-bold text-white">Workflow Time Savings Calculator</h1>
                </div>
              </div>
              <p className="text-white/80 text-sm mt-3 max-w-lg">
                Enter how many hours per week your team spends on each manual task. We'll calculate what an AI agent could save you — in time and dollars.
              </p>
            </div>

            <div className="p-8">
              {phase === "form" ? (
                <div className="space-y-8">

                  {/* Team size */}
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-3">
                      1. How big is your team?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TEAM_SIZES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setTeamSize(t.id)}
                          className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                            teamSize === t.id
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tasks with hour inputs */}
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-1">
                      2. Which tasks does your team handle manually?
                    </p>
                    <p className="text-xs text-slate-400 mb-3">
                      Check each task that applies and adjust the hours your team spends on it per week.
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {DEFAULT_TASKS.map(t => {
                        const checked = selectedTasks.includes(t.id)
                        return (
                          <div
                            key={t.id}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-all ${
                              checked ? "border-primary bg-primary/5" : "border-slate-200"
                            }`}
                          >
                            {/* Checkbox */}
                            <button
                              onClick={() => toggleTask(t.id)}
                              className="cursor-pointer shrink-0"
                              aria-label={`Toggle ${t.label}`}
                            >
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                                checked ? "border-primary bg-primary" : "border-slate-300"
                              }`}>
                                {checked && (
                                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                                    <path d="M1.5 5l2.5 2.5 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                            </button>

                            {/* Label */}
                            <button
                              onClick={() => toggleTask(t.id)}
                              className={`grow text-left font-medium cursor-pointer ${checked ? "text-slate-800" : "text-slate-600"}`}
                            >
                              {t.label}
                            </button>

                            {/* Hours input */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              <input
                                type="number"
                                min="0"
                                max="40"
                                step="0.5"
                                value={taskHours[t.id] ?? t.defaultHours}
                                onChange={e => updateHours(t.id, e.target.value)}
                                onClick={e => {
                                  if (!checked) {
                                    toggleTask(t.id)
                                  }
                                  e.stopPropagation()
                                }}
                                className={`w-16 px-2 py-1 border rounded text-right text-sm transition-colors focus:outline-none focus:border-primary ${
                                  checked ? "border-primary/30 bg-white text-slate-800" : "border-slate-200 bg-slate-50 text-slate-400"
                                }`}
                              />
                              <span className="text-xs text-slate-400">h/wk</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Assumed cost: <strong>$15/hr</strong> per person
                    </p>
                  </div>

                  {/* Calculate button */}
                  <div>
                    <button
                      onClick={() => canCalculate && setPhase("results")}
                      disabled={!canCalculate}
                      className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                        canCalculate
                          ? "bg-linear-to-r from-primary to-violet-500 text-white hover:opacity-90 cursor-pointer"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      Calculate my savings <ArrowRight className="w-4 h-4" />
                    </button>
                    {!canCalculate && (
                      <p className="text-xs text-slate-400 mt-2">
                        Select your team size and at least one task to continue.
                      </p>
                    )}
                  </div>
                </div>

              ) : (
                <div className="space-y-8">

                  {/* Main result */}
                  <div>
                    <div className="flex items-center gap-2 mb-5">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">Your results</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                      <p className="text-slate-500 text-sm mb-2">
                        Based on {checkedTasks.length} workflow{checkedTasks.length !== 1 ? "s" : ""} · {selectedTeam?.label}
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                        An agent could save your team{" "}
                        <span className="text-primary">{totalTeamHoursPerWeek}h/week</span>
                        {" "}— worth approximately{" "}
                        <span className="text-primary">${annualValue.toLocaleString()}/year</span>.
                      </p>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="border border-slate-200 rounded-xl p-4 text-center">
                        <Clock className="w-4 h-4 text-primary mx-auto mb-1.5" />
                        <p className="text-2xl font-bold text-slate-900">{totalTeamHoursPerWeek}h</p>
                        <p className="text-xs text-slate-400 mt-0.5">saved / week</p>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-4 text-center">
                        <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1.5" />
                        <p className="text-2xl font-bold text-slate-900">${(annualValue / 1000).toFixed(0)}k</p>
                        <p className="text-xs text-slate-400 mt-0.5">annual value</p>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-4 text-center">
                        <Users className="w-4 h-4 text-primary mx-auto mb-1.5" />
                        <p className="text-2xl font-bold text-slate-900">{checkedTasks.length}</p>
                        <p className="text-xs text-slate-400 mt-0.5">workflows</p>
                      </div>
                    </div>

                    {/* Task breakdown */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-slate-700 mb-3">Workflows that could be automated:</p>
                      <div className="flex flex-wrap gap-2">
                        {checkedTasks.map(t => (
                          <span
                            key={t.id}
                            className="px-3 py-1 bg-primary/8 text-primary text-xs font-medium rounded-full border border-primary/20"
                          >
                            {t.label} · {taskHours[t.id] ?? t.defaultHours}h/wk
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setPhase("form")}
                      className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
                    >
                      ← Adjust inputs
                    </button>
                  </div>

                  {/* Email capture */}
                  <div className="border border-primary/20 bg-primary/5 rounded-xl p-6">
                    {!emailSubmitted ? (
                      <>
                        <h3 className="text-base font-bold text-slate-900 mb-1">
                          Get your personalised automation roadmap
                        </h3>
                        <p className="text-sm text-slate-500 mb-5">
                          We'll send you a breakdown of which of your {checkedTasks.length} workflows to automate first, realistic timelines, and what each agent costs to build — plus a weekly newsletter on AI automation.
                        </p>
                        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            placeholder="your@email.com"
                            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                          <button
                            type="submit"
                            disabled={emailLoading}
                            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-primary to-violet-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60 shrink-0"
                          >
                            {emailLoading ? "Sending…" : "Send my roadmap →"}
                          </button>
                        </form>
                        <p className="text-xs text-slate-400 mt-3">No spam. Unsubscribe anytime.</p>
                      </>
                    ) : (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">You're on the list.</p>
                          <p className="text-sm text-slate-500 mt-0.5">
                            Your automation roadmap is on its way to <strong>{email}</strong>. Check your inbox.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Book demo CTA */}
                  <div
                    className="rounded-2xl px-8 py-8"
                    style={{ background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)" }}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      Ready to actually build this agent?
                    </h3>
                    <p className="text-white/80 text-sm mb-5 max-w-lg">
                      We build, deploy, and host custom AI agents for exactly these workflows. Book a free call and we'll tell you what's possible for your team — live in days, not months.
                    </p>
                    <Link
                      href="/book-demo"
                      className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
                    >
                      Book a free call <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
