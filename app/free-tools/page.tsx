"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, CheckCircle2, Clock, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

const ROLES = [
  { id: "founder", label: "Founder / CEO", rate: 75 },
  { id: "ops", label: "Operations Manager", rate: 45 },
  { id: "sales", label: "Sales Manager", rate: 50 },
  { id: "marketing", label: "Marketing Manager", rate: 42 },
  { id: "support", label: "Customer Support Lead", rate: 32 },
  { id: "hr", label: "HR Manager", rate: 38 },
  { id: "finance", label: "Finance / Admin", rate: 35 },
  { id: "project", label: "Project Manager", rate: 40 },
  { id: "other", label: "Other", rate: 35 },
]

const TEAM_SIZES = [
  { id: "solo", label: "Just me", multiplier: 1 },
  { id: "small", label: "2–5 people", multiplier: 2 },
  { id: "medium", label: "6–15 people", multiplier: 3.5 },
  { id: "large", label: "16–50 people", multiplier: 5 },
  { id: "enterprise", label: "50+ people", multiplier: 8 },
]

const TASKS = [
  { id: "email", label: "Email triage & sorting", hours: 3.5 },
  { id: "data_entry", label: "Data entry", hours: 4 },
  { id: "reporting", label: "Reporting & analytics", hours: 2.5 },
  { id: "scheduling", label: "Scheduling & calendar", hours: 1.5 },
  { id: "customer_support", label: "Customer support responses", hours: 4.5 },
  { id: "lead_qual", label: "Lead qualification", hours: 3 },
  { id: "invoicing", label: "Invoice processing", hours: 2 },
  { id: "social", label: "Social media posting", hours: 2.5 },
  { id: "meeting_notes", label: "Meeting notes & summaries", hours: 1.5 },
  { id: "crm", label: "CRM updates", hours: 2 },
]

type Phase = "form" | "results"

export default function FreeToolsPage() {
  const [role, setRole] = useState("")
  const [teamSize, setTeamSize] = useState("")
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [phase, setPhase] = useState<Phase>("form")
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  const selectedRole = ROLES.find(r => r.id === role)
  const selectedTeam = TEAM_SIZES.find(t => t.id === teamSize)
  const selectedTaskData = TASKS.filter(t => selectedTasks.includes(t.id))

  const baseHours = selectedTaskData.reduce((sum, t) => sum + t.hours, 0)
  const totalHoursPerWeek = Math.round(baseHours * (selectedTeam?.multiplier ?? 1))
  const hourlyRate = selectedRole?.rate ?? 35
  const annualValue = Math.round((totalHoursPerWeek * 52 * hourlyRate) / 100) * 100

  const canCalculate = role && teamSize && selectedTasks.length > 0

  const toggleTask = (id: string) => {
    setSelectedTasks(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
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
          role: selectedRole?.label,
          teamSize: selectedTeam?.label,
          tasks: selectedTaskData.map(t => t.label),
          hoursSaved: totalHoursPerWeek,
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

          {/* Hero */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Free Tools
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Tools to help you work smarter
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Free calculators and resources for teams exploring AI automation. No signup required.
            </p>
          </div>

          {/* Calculator card */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

            {/* Card header */}
            <div
              className="px-8 py-6"
              style={{
                background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)",
                backgroundImage: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed), radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "100% 100%, 24px 24px",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Calculator #1</p>
                  <h2 className="text-xl font-bold text-white">Workflow Time Savings Calculator</h2>
                </div>
              </div>
              <p className="text-white/80 text-sm mt-3 max-w-lg">
                See how many hours — and how much money — an AI agent could save your team based on your actual day-to-day workflows.
              </p>
            </div>

            <div className="p-8">
              {phase === "form" ? (
                <div className="space-y-8">

                  {/* Step 1: Role */}
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-3">
                      1. What's your role?
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {ROLES.map(r => (
                        <button
                          key={r.id}
                          onClick={() => setRole(r.id)}
                          className={`text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                            role === r.id
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Team size */}
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-3">
                      2. How big is your team?
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

                  {/* Step 3: Tasks */}
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-1">
                      3. Which tasks does your team handle manually?
                    </p>
                    <p className="text-xs text-slate-400 mb-3">Select all that apply — estimated time per person shown.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {TASKS.map(t => {
                        const checked = selectedTasks.includes(t.id)
                        return (
                          <button
                            key={t.id}
                            onClick={() => toggleTask(t.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm text-left transition-all cursor-pointer ${
                              checked
                                ? "border-primary bg-primary/5"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                              checked ? "border-primary bg-primary" : "border-slate-300"
                            }`}>
                              {checked && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                                  <path d="M1.5 5l2.5 2.5 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span className={`font-medium ${checked ? "text-slate-800" : "text-slate-600"}`}>
                              {t.label}
                            </span>
                            <span className="ml-auto text-xs text-slate-400 shrink-0">~{t.hours}h/wk</span>
                          </button>
                        )
                      })}
                    </div>
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
                        Select your role, team size, and at least one task to continue.
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
                      <p className="text-slate-500 text-sm mb-2">Based on {selectedTaskData.length} workflows · {selectedTeam?.label} · {selectedRole?.label}</p>
                      <p className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                        An agent could save your team{" "}
                        <span className="text-primary">{totalHoursPerWeek}h/week</span>
                        {" "}— worth approximately{" "}
                        <span className="text-primary">€{annualValue.toLocaleString()}/year</span>
                        {" "}at your team's rate.
                      </p>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="border border-slate-200 rounded-xl p-4 text-center">
                        <Clock className="w-4 h-4 text-primary mx-auto mb-1.5" />
                        <p className="text-2xl font-bold text-slate-900">{totalHoursPerWeek}h</p>
                        <p className="text-xs text-slate-400 mt-0.5">saved / week</p>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-4 text-center">
                        <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1.5" />
                        <p className="text-2xl font-bold text-slate-900">€{(annualValue / 1000).toFixed(0)}k</p>
                        <p className="text-xs text-slate-400 mt-0.5">annual value</p>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-4 text-center">
                        <Users className="w-4 h-4 text-primary mx-auto mb-1.5" />
                        <p className="text-2xl font-bold text-slate-900">{selectedTaskData.length}</p>
                        <p className="text-xs text-slate-400 mt-0.5">workflows</p>
                      </div>
                    </div>

                    {/* Task breakdown */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-slate-700 mb-3">Workflows that could be automated:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedTaskData.map(t => (
                          <span
                            key={t.id}
                            className="px-3 py-1 bg-primary/8 text-primary text-xs font-medium rounded-full border border-primary/20"
                          >
                            {t.label} · ~{(t.hours * (selectedTeam?.multiplier ?? 1)).toFixed(1)}h/wk
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
                          We'll send you a breakdown of which of your {selectedTaskData.length} workflows to automate first, realistic timelines, and what each agent costs to build — plus a weekly newsletter on AI automation for {selectedRole?.label ?? "your role"}.
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
                    style={{
                      background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)",
                      backgroundImage: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed), radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
                      backgroundSize: "100% 100%, 24px 24px",
                    }}
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

          {/* Coming soon */}
          <div className="mt-6 border border-dashed border-slate-200 rounded-2xl p-8 text-center">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Coming soon</p>
            <p className="text-slate-500 text-sm">
              More free tools — ROI calculator, agent readiness audit, automation playbook generator
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
