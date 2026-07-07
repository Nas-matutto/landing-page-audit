"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

// ─── Conversation definition ──────────────────────────────────────────────────

const STEPS = [
  {
    message: "👋 Hey there! What's your role?",
    options: ["Founder / CEO", "Operations or Finance", "Marketing or Sales", "IT / Developer", "Other"],
  },
  {
    message: "Got it. How big is your team?",
    options: ["1–10 people", "11–50 people", "51–200 people", "200+ people"],
  },
  {
    message: "What's your biggest bottleneck right now?",
    options: [
      "Too much manual admin",
      "Slow lead follow-up",
      "Customer support volume",
      "Reporting & analytics",
      "Social media content",
      "Other",
    ],
  },
  {
    message: "When are you looking to get started?",
    options: ["Ready now", "Within 3 months", "Just exploring"],
  },
  {
    message: "And what's your monthly budget for automation tools?",
    options: ["Under $500 / mo", "$500–$2,000 / mo", "$2,000+ / mo"],
  },
]

const CUSTOM_INTENT_MSG = "Can you tell us a bit more?"
const EMAIL_STEP = 5
const EMAIL_MSG =
  "Almost there! Drop your email below and I'll unlock a 1-minute video of Talk to Me Data's AI Agent Platform at work 👇"
const TYPING_DELAY = 700

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-slate-800 rounded-2xl rounded-tl-sm w-fit">
      {[0, 150, 300].map(delay => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
          style={{ animationDelay: `${delay}ms`, animationDuration: "800ms" }}
        />
      ))}
    </div>
  )
}

function AgentBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2 items-end"
    >
      <div className="w-6 h-6 rounded-full bg-linear-to-br from-primary to-violet-500 shrink-0 flex items-center justify-center mb-0.5">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
      </div>
      <p className="px-4 py-3 bg-slate-800 text-white text-sm rounded-2xl rounded-tl-sm max-w-[260px] leading-relaxed">
        {text}
      </p>
    </motion.div>
  )
}

function UserChip({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-end"
    >
      <span className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary text-sm rounded-2xl rounded-tr-sm font-medium">
        {text}
      </span>
    </motion.div>
  )
}

const CALENDAR_URL = "https://calendar.app.google/44swscmcQVWHCPxN8"

// ─── Main widget ──────────────────────────────────────────────────────────────

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [pulsing, setPulsing] = useState(true)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [customIntentMode, setCustomIntentMode] = useState(false)
  const [customIntentText, setCustomIntentText] = useState("")
  const [showTyping, setShowTyping] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const dismissedRef = useRef(false)

  const SESSION_KEY = "ttmd_chat_dismissed"

  // ── Auto-open logic ─────────────────────────────────────────────────────────
  useEffect(() => {
    const alreadyDismissed = !!sessionStorage.getItem(SESSION_KEY)
    if (alreadyDismissed) {
      dismissedRef.current = true
      setPulsing(false)
    }

    const buttonTimer = setTimeout(() => setShowButton(true), 3_000)

    if (alreadyDismissed) {
      return () => clearTimeout(buttonTimer)
    }

    const openTimer = setTimeout(() => {
      if (!dismissedRef.current) {
        setIsOpen(true)
        setPulsing(false)
      }
    }, 10_000)

    const handleScroll = () => {
      if (dismissedRef.current) return
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (pct >= 0.5) {
        setIsOpen(true)
        setPulsing(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      clearTimeout(buttonTimer)
      clearTimeout(openTimer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Scroll messages to bottom ───────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [step, showTyping, answers, customIntentMode])

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const advanceWithTyping = (nextStep: number) => {
    setShowTyping(true)
    setTimeout(() => {
      setShowTyping(false)
      setStep(nextStep)
    }, TYPING_DELAY)
  }

  const handleOption = (option: string) => {
    if (option === "Other") {
      setAnswers(prev => [...prev, "Other"])
      setShowTyping(true)
      setTimeout(() => {
        setShowTyping(false)
        setCustomIntentMode(true)
      }, TYPING_DELAY)
      return
    }
    setAnswers(prev => [...prev, option])
    advanceWithTyping(step + 1)
  }

  const handleCustomIntentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = customIntentText.trim()
    if (!text) return
    const currentStep = step
    setAnswers(prev => {
      const updated = [...prev]
      updated[currentStep] = text
      return updated
    })
    setCustomIntentMode(false)
    setCustomIntentText("")
    advanceWithTyping(currentStep + 1)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.")
      return
    }
    setEmailError("")
    setSubmitting(true)
    try {
      await fetch("/api/qualify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, email, page: "chatbot" }),
      })
    } catch {
      // non-blocking
    }
    // Navigate to watch-demo — the page detects the param and skips the gate
    window.location.href = "/watch-demo?unlocked=1"
  }

  const handleClose = () => {
    setIsOpen(false)
    setPulsing(false)
    dismissedRef.current = true
    sessionStorage.setItem(SESSION_KEY, "1")
  }

  // ── Message list ────────────────────────────────────────────────────────────
  const renderedMessages: React.ReactNode[] = []

  // Greeting always visible
  renderedMessages.push(<AgentBubble key="msg-0" text={STEPS[0].message} />)

  // Q&A pairs for completed steps
  for (let i = 0; i < Math.min(step, STEPS.length); i++) {
    if (answers[i]) {
      renderedMessages.push(<UserChip key={`ans-${i}`} text={answers[i]} />)
    }
    if (i + 1 <= step) {
      const nextMsg = i + 1 < STEPS.length ? STEPS[i + 1].message : EMAIL_MSG
      renderedMessages.push(<AgentBubble key={`msg-${i + 1}`} text={nextMsg} />)
    }
  }

  // "Other" free-text mode — works for any step
  if (customIntentMode) {
    renderedMessages.push(<UserChip key={`ans-other-${step}`} text="Other" />)
    if (!showTyping) {
      renderedMessages.push(<AgentBubble key="msg-custom" text={CUSTOM_INTENT_MSG} />)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => { setIsOpen(true); setPulsing(false) }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-linear-to-br from-primary to-violet-500 text-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            aria-label="Open chat"
          >
            {pulsing && (
              <span className="absolute inset-0 rounded-full bg-linear-to-br from-primary to-violet-500 animate-ping opacity-30" />
            )}
            <svg className="w-6 h-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a] shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-linear-to-br from-primary to-violet-500 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">TTMD</p>
                  <p className="text-slate-400 text-xs">AI qualification agent</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                aria-label="Close chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 space-y-3 min-h-0">
              {renderedMessages}

              <AnimatePresence>
                {showTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-primary to-violet-500 shrink-0 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="bg-white border-t border-slate-100 px-4 py-3 shrink-0">
              <AnimatePresence mode="wait">

                {/* "Other" free-text input — any step */}
                {customIntentMode && !showTyping && (
                  <motion.form
                    key={`other-form-${step}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleCustomIntentSubmit}
                    className="space-y-2"
                  >
                    <input
                      type="text"
                      value={customIntentText}
                      onChange={e => setCustomIntentText(e.target.value)}
                      placeholder="Tell us a bit more…"
                      autoFocus
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-primary to-violet-500 hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Continue →
                    </button>
                  </motion.form>
                )}

                {/* Answer chips for steps 0–4 */}
                {step < EMAIL_STEP && !customIntentMode && !showTyping && (
                  <motion.div
                    key={`chips-${step}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-wrap gap-2"
                  >
                    {STEPS[step]?.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleOption(opt)}
                        className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-full text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Email input */}
                {step === EMAIL_STEP && !showTyping && (
                  <motion.form
                    key="email-form"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleEmailSubmit}
                    className="space-y-2"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      autoFocus
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-primary to-violet-500 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
                    >
                      {submitting ? "Opening demo…" : "Watch the demo →"}
                    </button>
                  </motion.form>
                )}

                {showTyping && <motion.div key="typing-placeholder" className="h-8" />}

              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
