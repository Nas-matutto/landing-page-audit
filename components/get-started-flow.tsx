"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, Mail, Check, X, Plus, CalendarDays } from "lucide-react"
import { FaSlack, FaWhatsapp, FaGoogle } from "react-icons/fa"
import {
  SiNotion, SiSalesforce, SiHubspot, SiShopify, SiStripe,
  SiZendesk, SiGmail, SiAirtable, SiMailchimp, SiIntercom,
} from "react-icons/si"

const DEMO_VIDEO_URL =
  process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ?? "https://www.youtube.com/embed/vM5USyYEK1g"

const ONBOARDING_CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2GEdSIRiXNGs2UjuxM8qmbJ4KKwq0PU1-veJzukFJumxcOjPgTr-_HHhIt1C9SMqhzZPqllK5k?gv=true"

type Question = {
  id: string
  question: string
  subtitle?: string
  options: string[]
  multi?: boolean
}

// Order after the email step. IDs map to the qualify-lead answer slots:
// challenge, role, teamSize, timeline, budget. `tools` is sent separately.
const QUESTIONS: Question[] = [
  {
    id: "challenge",
    question: "What do you want to automate?",
    subtitle: "Pick the workflow you'd hand to an AI agent first.",
    options: [
      "Customer support",
      "Lead qualification & follow-up",
      "Booking & scheduling",
      "Invoice / document processing",
      "Data entry & reporting",
      "Social media content",
      "Other",
    ],
  },
  {
    id: "tools",
    question: "Which tools should your agent connect to?",
    subtitle: "Select everything your agent should have access to.",
    multi: true,
    options: [
      "Slack", "Gmail / Google", "HubSpot", "Salesforce", "Shopify",
      "Stripe", "Zendesk", "WhatsApp", "Notion", "Airtable",
      "Mailchimp", "Intercom", "Other",
    ],
  },
  {
    id: "role",
    question: "What's your role?",
    options: ["Founder / CEO", "Operations or Finance", "Marketing or Sales", "IT / Developer", "Other"],
  },
  {
    id: "teamSize",
    question: "How big is your team?",
    options: ["1–10 people", "11–50 people", "51–200 people", "200+ people"],
  },
  {
    id: "timeline",
    question: "When are you looking to get started?",
    options: ["Ready now", "Within 3 months", "Just exploring"],
  },
  {
    id: "budget",
    question: "What's your monthly budget for automation?",
    options: ["Under $500 / mo", "$500–$2,000 / mo", "$2,000+ / mo", "Not sure yet"],
  },
]

// Brand icons for the tools step (falls back to a plain chip when unmapped, e.g. "Other")
const TOOL_ICONS: Record<string, { Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
  "Slack": { Icon: FaSlack, color: "#4A154B" },
  "Gmail / Google": { Icon: SiGmail, color: "#EA4335" },
  "HubSpot": { Icon: SiHubspot, color: "#FF7A59" },
  "Salesforce": { Icon: SiSalesforce, color: "#00A1E0" },
  "Shopify": { Icon: SiShopify, color: "#7AB55C" },
  "Stripe": { Icon: SiStripe, color: "#635BFF" },
  "Zendesk": { Icon: SiZendesk, color: "#03363D" },
  "WhatsApp": { Icon: FaWhatsapp, color: "#25D366" },
  "Notion": { Icon: SiNotion, color: "#374151" },
  "Airtable": { Icon: SiAirtable, color: "#18BFFF" },
  "Mailchimp": { Icon: SiMailchimp, color: "#e8a825" },
  "Intercom": { Icon: SiIntercom, color: "#1F8DED" },
  "Google": { Icon: FaGoogle, color: "#4285F4" },
}

const TOTAL_STEPS = QUESTIONS.length + 1 // email + questions

export function GetStartedFlow() {
  const [step, setStep] = useState(0) // step 0 = email
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [emailSubmitting, setEmailSubmitting] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [tools, setTools] = useState<string[]>([])
  const [pendingOther, setPendingOther] = useState<string | null>(null)
  const [otherInput, setOtherInput] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  function goBack() {
    setPendingOther(null)
    setOtherInput("")
    setStep(s => Math.max(0, s - 1))
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.")
      return
    }
    setEmailError("")
    setEmailSubmitting(true)

    // Partial capture — add the email to Brevo/PostHog now so we can still follow
    // up if they drop off. This does NOT write to the Google Sheet; only completed
    // leads (who reach the demo page) are saved there. Non-blocking: advance regardless.
    try {
      await fetch("/api/qualify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, page: "get_started", stage: "partial" }),
      })
    } catch {
      // ignore — advance regardless
    }

    setEmailSubmitting(false)
    setStep(1)
  }

  function selectOption(questionId: string, option: string) {
    if (option === "Other") {
      setPendingOther(questionId)
      setOtherInput("")
      return
    }
    setPendingOther(null)
    const next = { ...answers, [questionId]: option }
    setAnswers(next)
    if (isLastQuestion) {
      setTimeout(() => finish(next), 220)
    } else {
      setTimeout(() => setStep(s => s + 1), 220)
    }
  }

  function submitOther(questionId: string) {
    const value = otherInput.trim() || "Other"
    const next = { ...answers, [questionId]: value }
    setAnswers(next)
    setPendingOther(null)
    setOtherInput("")
    if (isLastQuestion) {
      setTimeout(() => finish(next), 100)
    } else {
      setTimeout(() => setStep(s => s + 1), 100)
    }
  }

  function toggleTool(option: string) {
    if (option === "Other") {
      // Toggle the free-text input open/closed
      setPendingOther(prev => (prev === "tools" ? null : "tools"))
      setOtherInput("")
      return
    }
    setTools(prev =>
      prev.includes(option) ? prev.filter(t => t !== option) : [...prev, option]
    )
  }

  function addOtherTool() {
    const value = otherInput.trim()
    if (value) setTools(prev => (prev.includes(value) ? prev : [...prev, value]))
    setOtherInput("")
    // Keep the input open (pendingOther stays "tools") so several tools can be added;
    // each addition appears immediately as a chip above for confirmation.
  }

  async function finish(finalAnswers: Record<string, string> = answers) {
    setSubmitting(true)

    const orderedAnswers = [
      finalAnswers.role ?? "",
      finalAnswers.teamSize ?? "",
      finalAnswers.challenge ?? "",
      finalAnswers.timeline ?? "",
      finalAnswers.budget ?? "",
    ]

    try {
      await fetch("/api/qualify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers: orderedAnswers,
          tools,
          page: "get_started",
          stage: "complete",
        }),
      })
    } catch {
      // non-blocking — reveal the demo regardless
    }

    setDone(true)
    setSubmitting(false)
    setTimeout(() => {
      videoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const questionIndex = step - 1 // step 1 => QUESTIONS[0]
  const currentQuestion =
    step >= 1 && step <= QUESTIONS.length ? QUESTIONS[questionIndex] : null
  const isLastQuestion = questionIndex === QUESTIONS.length - 1

  // For the tools step: the preset chips (minus "Other") plus any custom tools the
  // visitor typed, so every selection stays visible and toggleable.
  const toolBaseOptions = currentQuestion?.multi
    ? currentQuestion.options.filter(o => o !== "Other")
    : []
  const customTools = tools.filter(t => !toolBaseOptions.includes(t))

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 pb-24">
      {/* ── Flow ── */}
      {!done && (
        <div className="w-full max-w-2xl pt-20 sm:pt-28">
          {/* Back button */}
          {step > 0 && (
            <button
              onClick={goBack}
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i < step
                    ? "w-2.5 h-2.5 bg-primary"
                    : i === step
                    ? "w-2.5 h-2.5 bg-primary/30 ring-2 ring-primary"
                    : "w-2 h-2 bg-slate-200"
                }`}
              />
            ))}
          </div>

          {/* Email step */}
          {step === 0 && (
            <div key="email" className="animate-in fade-in slide-in-from-bottom-3 duration-300">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 text-center">
                Let's get started
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-3 text-balance">
                Let's build your AI agent
              </h2>
              <p className="text-slate-500 text-center mb-10 max-w-md mx-auto">
                Answer a few quick questions and we'll show you exactly what your agent can do. Where should we send the details?
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                    required
                  />
                </div>
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                <button
                  type="submit"
                  disabled={emailSubmitting}
                  className="relative overflow-hidden group w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-base px-8 py-4 rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all disabled:opacity-60"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative flex items-center gap-2">
                    {emailSubmitting ? "Starting…" : "Start building"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
                <p className="text-xs text-slate-400 text-center">
                  No spam. We'll only use this to follow up about your agent.
                </p>
              </form>
            </div>
          )}

          {/* Question steps */}
          {currentQuestion && (
            <div key={step} className="animate-in fade-in slide-in-from-bottom-3 duration-300">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 text-center">
                Question {step} of {QUESTIONS.length}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-3 text-balance">
                {currentQuestion.question}
              </h2>
              {currentQuestion.subtitle && (
                <p className="text-slate-500 text-center mb-10 max-w-md mx-auto">
                  {currentQuestion.subtitle}
                </p>
              )}
              {!currentQuestion.subtitle && <div className="mb-10" />}

              {/* Multi-select (tools) */}
              {currentQuestion.multi ? (
                <div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {toolBaseOptions.map(option => {
                      const selected = tools.includes(option)
                      const brand = TOOL_ICONS[option]
                      return (
                        <button
                          key={option}
                          onClick={() => toggleTool(option)}
                          className={`group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all shadow-sm ${
                            selected
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:bg-primary/5 hover:text-primary"
                          }`}
                        >
                          {brand ? (
                            <brand.Icon className="w-4 h-4 shrink-0" style={{ color: brand.color }} />
                          ) : null}
                          {option}
                          {selected && <Check className="w-4 h-4 shrink-0 text-primary" />}
                        </button>
                      )
                    })}

                    {/* Custom tools the visitor typed — shown as selected, removable chips */}
                    {customTools.map(tool => (
                      <button
                        key={tool}
                        onClick={() => toggleTool(tool)}
                        className="group inline-flex items-center gap-2 rounded-full border border-primary bg-primary/5 text-primary px-5 py-3 text-sm font-medium transition-all shadow-sm"
                      >
                        {tool}
                        <X className="w-3.5 h-3.5 shrink-0 text-primary/70 group-hover:text-primary" />
                      </button>
                    ))}

                    {/* "Other" chip — toggles the free-text input */}
                    <button
                      onClick={() => toggleTool("Other")}
                      className={`group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all shadow-sm ${
                        pendingOther === "tools"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      <Plus className="w-4 h-4 shrink-0" />
                      Other…
                    </button>
                  </div>

                  {/* "Other" free-text for tools — stays open so several can be added */}
                  {pendingOther === "tools" && (
                    <div className="max-w-md mx-auto space-y-2 pt-6">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Name the tool…"
                          value={otherInput}
                          onChange={e => setOtherInput(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addOtherTool())}
                          autoFocus
                          className="flex-1 px-4 py-3.5 rounded-xl border border-primary/30 bg-white text-slate-800 placeholder-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                        />
                        <button
                          onClick={addOtherTool}
                          disabled={!otherInput.trim()}
                          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40"
                        >
                          Add
                        </button>
                      </div>
                      <p className="text-xs text-slate-400">Press Add or Enter to include it — you can add several.</p>
                    </div>
                  )}

                  {/* Running confirmation of everything selected */}
                  {tools.length > 0 && (
                    <p className="mt-6 text-center text-sm text-primary font-medium">
                      <Check className="inline w-4 h-4 mr-1 align-text-bottom" />
                      {tools.length} tool{tools.length > 1 ? "s" : ""} added: {tools.join(", ")}
                    </p>
                  )}

                  <div className="mt-10 flex flex-col items-center gap-3">
                    <button
                      onClick={() => setStep(s => s + 1)}
                      className="relative overflow-hidden group inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-base px-10 py-4 rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                    >
                      <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                      <span className="relative flex items-center gap-2">
                        Continue <ArrowRight className="w-4 h-4" />
                      </span>
                    </button>
                    <button
                      onClick={() => setStep(s => s + 1)}
                      className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Skip — I'm not sure yet
                    </button>
                  </div>
                </div>
              ) : (
                /* Single-select */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map(option => {
                    const isSelectedOther = pendingOther === currentQuestion.id && option === "Other"
                    return (
                      <button
                        key={option}
                        onClick={() => selectOption(currentQuestion.id, option)}
                        className={`group w-full text-left rounded-2xl border px-6 py-5 text-base font-medium transition-all shadow-sm hover:shadow-md ${
                          isSelectedOther
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:bg-primary/5 hover:text-primary"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          {option}
                          <ArrowRight
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isSelectedOther ? "text-primary" : "text-slate-300 group-hover:text-primary"
                            }`}
                          />
                        </span>
                      </button>
                    )
                  })}

                  {/* "Other" free-text input */}
                  {pendingOther === currentQuestion.id && (
                    <div className="col-span-full space-y-3 pt-1">
                      <input
                        type="text"
                        placeholder="Tell us a bit more…"
                        value={otherInput}
                        onChange={e => setOtherInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && submitOther(currentQuestion.id)}
                        autoFocus
                        className="w-full px-4 py-3.5 rounded-xl border border-primary/30 bg-white text-slate-800 placeholder-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                      />
                      <button
                        onClick={() => submitOther(currentQuestion.id)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
                      >
                        Continue <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {submitting && !currentQuestion.multi && (
                <p className="mt-8 text-center text-sm text-slate-400">Building your demo…</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Result: demo video + Book Demo (everyone) ── */}
      {done && (
        <div ref={videoRef} className="w-full max-w-4xl pt-20 sm:pt-28 animate-in fade-in duration-500">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Your agent, in action</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-balance mb-6">
              Here's what we can build for you
            </h2>
            <a
              href={ONBOARDING_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-base px-8 py-4 rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Book your onboarding call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
            <p className="mt-3 text-sm text-slate-400">Or watch the 90-second demo below first</p>
          </div>

          {/* 16:9 iframe */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200">
            <iframe
              src={`${DEMO_VIDEO_URL}?autoplay=1&rel=0`}
              title="Talk to Me Data — Product Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Post-video CTAs */}
          <div className="mt-16 rounded-3xl bg-linear-to-br from-primary via-blue-600 to-violet-600 relative overflow-hidden px-8 py-14 text-center">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-300/15 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-balance">
                Ready to talk about your workflow?
              </h3>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Book a free 20-minute call and we'll tell you exactly what your agent can do — API costs, integrations, and hosting included.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book-demo"
                  className="relative overflow-hidden group inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl text-base shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative flex items-center gap-2">
                    Book a free call <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
                <a
                  href="mailto:nas@talktomedata.com"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email a question
                </a>
              </div>
              <p className="text-white/40 text-xs mt-6">Free call · No commitment · Built for you</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
