"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ChevronLeft, Mail, User, Check, X, Plus } from "lucide-react"
import { FaSlack, FaWhatsapp, FaGoogle } from "react-icons/fa"
import {
  SiNotion, SiSalesforce, SiHubspot, SiShopify, SiStripe,
  SiZendesk, SiGmail, SiAirtable, SiMailchimp, SiIntercom,
} from "react-icons/si"

// Where the flow sends people once they complete it. A real route (rather than a
// toggled in-page view) so reaching the end fires a genuine GA + PostHog pageview
// we can build a funnel-completion metric on.
const ONBOARDING_PATH = "/get-started-onboarding"

type Question = {
  id: string
  question: string
  subtitle?: string
  options: string[]
  multi?: boolean
}

// Order after the email step. IDs map to the qualify-lead answer slots:
// challenge, role, timeline, budget. `tools` and `hours` are sent separately.
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
    id: "timeline",
    question: "When are you looking to get started?",
    options: ["Ready now", "Within 3 months", "Just exploring"],
  },
  {
    id: "hours",
    question: "How many hours a week does this task currently take you or your team?",
    options: ["Less than 5 hours", "5 to 10 hours", "10 to 20 hours", "20+ hours"],
  },
  {
    id: "budget",
    question: "If this ran on autopilot, what would that be worth to your business per month?",
    options: ["$99–$500 / mo", "$500–$2,000 / mo", "$2,000+ / mo"],
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

export function GetStartedFlow({ onInFlowChange }: { onInFlowChange?: (inFlow: boolean) => void } = {}) {
  const router = useRouter()
  const [step, setStep] = useState(0) // step 0 = email
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [emailSubmitting, setEmailSubmitting] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [tools, setTools] = useState<string[]>([])
  const [pendingOther, setPendingOther] = useState<string | null>(null)
  const [otherInput, setOtherInput] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // ── Resume guard ──────────────────────────────────────────────────────────
  // A lot of visitors leave the flow mid-way (accidental back-swipe on mobile,
  // a mis-tap on the top-nav "Free Tools" link on tablet-width screens, etc.)
  // and their answers used to reset to the email step. We snapshot progress to
  // sessionStorage so that if they come back they pick up exactly where they
  // left off instead of dropping out of the funnel entirely.
  const STORAGE_KEY = "ttmd_get_started_v1"

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const saved = JSON.parse(raw)
      if (!saved || typeof saved !== "object") return
      if (typeof saved.firstName === "string") setFirstName(saved.firstName)
      if (typeof saved.lastName === "string") setLastName(saved.lastName)
      if (typeof saved.email === "string") setEmail(saved.email)
      if (saved.answers && typeof saved.answers === "object") setAnswers(saved.answers)
      if (Array.isArray(saved.tools)) setTools(saved.tools)
      if (typeof saved.step === "number" && saved.step > 0 && saved.step <= QUESTIONS.length) {
        setStep(saved.step)
      }
    } catch {
      // ignore — start fresh
    }
  }, [])

  useEffect(() => {
    try {
      // Nothing worth saving until they've at least entered an email.
      if (step === 0 && !email) return
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ firstName, lastName, email, answers, tools, step }))
    } catch {
      // ignore — persistence is best-effort
    }
  }, [firstName, lastName, email, answers, tools, step])

  // Let the page know when the visitor is actively in a question step so it can
  // strip the nav chrome. The email step (0) keeps full nav.
  useEffect(() => {
    onInFlowChange?.(step >= 1)
  }, [step, onInFlowChange])

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
        body: JSON.stringify({
          email,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          page: "get_started",
          stage: "partial",
        }),
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

    // teamSize is no longer collected in this flow — its slot stays blank so the
    // shared qualify-lead API (also used by the legacy demo gate) keeps working.
    const orderedAnswers = [
      finalAnswers.role ?? "",
      "",
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
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          answers: orderedAnswers,
          hours: finalAnswers.hours ?? "",
          tools,
          page: "get_started",
          stage: "complete",
        }),
      })
    } catch {
      // non-blocking — send them to the onboarding page regardless
    }

    // Clear the resume snapshot so a completed visitor doesn't get dropped back
    // into a half-finished flow, then hand off to the real onboarding page (this
    // navigation is what registers a funnel-completion pageview).
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    router.push(ONBOARDING_PATH)
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      autoComplete="given-name"
                      placeholder="First name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                      required
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      autoComplete="family-name"
                      placeholder="Surname"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    autoComplete="email"
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
    </div>
  )
}
