"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react"

// ─── Quiz data ───────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    question: "What is the core definition of an AI agent?",
    options: [
      "A human assistant who uses AI tools to do their job faster",
      "A software system that perceives its environment and takes autonomous actions to achieve a goal",
      "A simple chatbot that answers pre-written FAQs",
      "A database powered by machine learning",
    ],
    correct: 1,
    explanation:
      "An AI agent is defined by its ability to perceive inputs, reason about them, and take actions autonomously, not just respond to a single prompt.",
  },
  {
    question: "What distinguishes an AI agent from a basic AI chatbot?",
    options: [
      "AI agents are more expensive to build and maintain",
      "AI agents can take multi-step actions and complete tasks end-to-end, not just generate text responses",
      "AI agents can only be used by technical teams with engineering support",
      "AI agents require a dedicated on-premise server to run",
    ],
    correct: 1,
    explanation:
      "A chatbot responds to prompts. An AI agent can plan a sequence of actions, use tools, and complete a task from start to finish without prompting at each step.",
  },
  {
    question: "Which of these is the best real-world example of an AI agent in action?",
    options: [
      "A spell-checker that highlights typos as you type",
      "A recommendation engine that suggests products based on browsing history",
      "An AI that receives a new lead, looks up their LinkedIn profile, scores their fit, and sends a personalised email, without human input",
      "A search engine that returns relevant results for a query",
    ],
    correct: 2,
    explanation:
      "The key characteristics are: multiple steps, multiple tools (LinkedIn lookup, CRM, email), and completion without human involvement at each step.",
  },
  {
    question: "What does it mean for an AI agent to be 'autonomous'?",
    options: [
      "It never makes mistakes or requires correction",
      "It can complete multi-step tasks without requiring human sign-off at each individual step",
      "It runs on a physically separate computer from your other systems",
      "It only processes tasks automatically during business hours",
    ],
    correct: 1,
    explanation:
      "Autonomy means the agent can progress through a task independently. Humans can still set goals and review outputs, but they don't need to approve every individual action.",
  },
  {
    question: "Which business process is BEST suited for an AI agent?",
    options: [
      "Writing the company's three-year vision and strategy document",
      "Meeting a prospective client in person for the first time",
      "Triaging incoming support tickets, categorising them by issue type, and routing each one to the right team member",
      "Setting the company's annual pricing strategy",
    ],
    correct: 2,
    explanation:
      "Repetitive, rule-based, high-volume processes (like ticket triage) are ideal for AI agents. Strategy and human relationship tasks are not.",
  },
  {
    question: "What is a 'multi-agent system'?",
    options: [
      "An AI model that has been trained to speak multiple languages",
      "Multiple AI agents working together, each specialised in one part of a larger workflow",
      "A single AI model that presents itself as different team members to different users",
      "A software package that contains multiple pre-built automation templates",
    ],
    correct: 1,
    explanation:
      "Multi-agent systems let you break complex workflows into specialist sub-tasks. One agent might research a lead, another might draft the email, a third might schedule the follow-up.",
  },
  {
    question: "What is 'tool use' in the context of AI agents?",
    options: [
      "Teaching AI to operate physical hardware like keyboards and mice",
      "The ability of an AI agent to call external services, APIs, and applications to complete tasks",
      "A premium feature only available in enterprise-tier AI products",
      "A method for fine-tuning an AI model on industry-specific training data",
    ],
    correct: 1,
    explanation:
      "Tool use is what separates agents from pure language models. An agent with tools can search the web, write to a spreadsheet, send an email, or call any API you connect it to.",
  },
  {
    question: "What is the main difference between AI agents and traditional automation tools like Zapier?",
    options: [
      "Traditional automation tools are generally more reliable and easier to audit",
      "AI agents are better suited to visual design and creative tasks",
      "Traditional automation follows fixed if/then rules and breaks when situations change; AI agents can reason, adapt, and handle exceptions",
      "AI agents can only work with unstructured text data, not structured data",
    ],
    correct: 2,
    explanation:
      "Zapier and similar tools are excellent for predictable, linear workflows. AI agents handle variability, ambiguity, and edge cases that fixed rules can't anticipate.",
  },
  {
    question: "Which of the following is NOT a realistic benefit of deploying AI agents in a business?",
    options: [
      "Reducing the time your team spends on repetitive, manual tasks",
      "Handling customer queries and lead follow-up 24/7 without human involvement",
      "Completely replacing the need for human judgement, strategy, or leadership",
      "Scaling operations without proportionally increasing your headcount",
    ],
    correct: 2,
    explanation:
      "AI agents excel at execution, but strategy, relationships, and high-stakes decisions still require human judgement. The goal is augmentation, not replacement.",
  },
  {
    question: "What does RAG (Retrieval-Augmented Generation) help AI agents do?",
    options: [
      "Generate realistic product images from text descriptions",
      "Ground responses in accurate, up-to-date information from a specific knowledge base, significantly reducing hallucinations",
      "Train entirely new AI models faster and more cheaply",
      "Convert voice recordings into structured text transcripts",
    ],
    correct: 1,
    explanation:
      "RAG lets an agent search a knowledge base (your docs, your CRM, your FAQs) before generating a response, so it answers based on your actual data, not just what it was trained on.",
  },
]

// ─── Score helper ─────────────────────────────────────────────────────────────

function scoreMessage(score: number) {
  if (score >= 9) return { label: "AI Agent Expert", text: "Impressive. You clearly know your stuff. If you're thinking about deploying agents in your business, you're already ahead of most." }
  if (score >= 7) return { label: "Strong Foundation", text: "You've got a solid grasp of the fundamentals. A few areas to dig deeper, but you're well positioned to start exploring AI agents practically." }
  if (score >= 5) return { label: "Good Start", text: "You understand the basics. Some of the nuances around tool use, multi-agent systems, and RAG are worth exploring further." }
  return { label: "Room to Grow", text: "AI agents are genuinely complex; the fact that you're here means you're already ahead of the curve. This guide is a great place to start." }
}

// ─── Quiz component ───────────────────────────────────────────────────────────

export function Quiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null))
  const [showExplanation, setShowExplanation] = useState(false)
  const [finished, setFinished] = useState(false)
  const [email, setEmail] = useState("")
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const q = quizQuestions[current]
  const isAnswered = selected !== null
  const isCorrect = selected === q.correct
  const score = answers.filter((a, i) => a === quizQuestions[i].correct).length

  function handleSelect(idx: number) {
    if (isAnswered) return
    setSelected(idx)
    setShowExplanation(true)
    const updated = [...answers]
    updated[current] = idx
    setAnswers(updated)
  }

  function handleNext() {
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1)
      setSelected(null)
      setShowExplanation(false)
    } else {
      setFinished(true)
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@")) return
    setEmailStatus("loading")
    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "quiz_ai_agents_basics" }),
      })
      if (!res.ok) throw new Error()
      setEmailStatus("success")
    } catch {
      setEmailStatus("error")
    }
  }

  const { label, text } = scoreMessage(score)

  if (finished) {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <div
            className="px-8 py-8 text-center"
            style={{ background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)" }}
          >
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">Your result</p>
            <p className="text-6xl font-bold text-white mb-2">{score}<span className="text-3xl text-white/60">/{quizQuestions.length}</span></p>
            <p className="text-white font-semibold text-lg">{label}</p>
          </div>
          <div className="bg-white/5 border-t border-white/10 px-8 py-6">
            <p className="text-white/80 text-sm leading-relaxed mb-6">{text}</p>
            <div className="space-y-2">
              {quizQuestions.map((q, i) => {
                const correct = answers[i] === q.correct
                return (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl text-sm ${correct ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                    {correct
                      ? <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      : <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
                    <span className="text-white/70 leading-snug">{q.question}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <div className="px-8 py-5 border-b border-white/10">
            <p className="text-white font-bold text-lg mb-1">Want to see how AI agents could work in your business?</p>
            <p className="text-white/50 text-sm">Get practical tips and real examples, sent to your inbox, no spam.</p>
          </div>
          <div className="px-8 py-6">
            {emailStatus === "success" ? (
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                <p className="text-white/80 text-sm font-medium">You're in. Check your inbox.</p>
              </div>
            ) : (
              <>
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                  />
                  <button
                    type="submit"
                    disabled={emailStatus === "loading"}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60 cursor-pointer whitespace-nowrap transition hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #185FA5, #7c3aed)" }}
                  >
                    {emailStatus === "loading" ? "Sending…" : "Send me more →"}
                  </button>
                </form>
                {emailStatus === "error" && <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>}
                <p className="text-xs text-white/30 mt-3">No spam. Unsubscribe any time.</p>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
      {/* Progress bar */}
      <div className="h-1 bg-white/10">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${(current / quizQuestions.length) * 100}%`,
            background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
          }}
        />
      </div>

      <div className="px-7 py-6">
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
            Question {current + 1} of {quizQuestions.length}
          </span>
          <span className="text-xs font-semibold text-blue-400">
            {answers.filter((a, i) => a !== null && a === quizQuestions[i].correct).length} correct so far
          </span>
        </div>

        <p className="text-lg font-bold text-white mb-5 leading-snug">{q.question}</p>

        <div className="space-y-3 mb-5">
          {q.options.map((opt, idx) => {
            let cls = "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10 cursor-pointer text-white/80"
            if (isAnswered) {
              if (idx === q.correct) cls = "border-green-400/60 bg-green-500/15 cursor-default text-white"
              else if (idx === selected && selected !== q.correct) cls = "border-red-400/50 bg-red-500/10 cursor-default text-white/70"
              else cls = "border-white/8 bg-white/3 opacity-50 cursor-default text-white/50"
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`w-full text-left px-5 py-3.5 rounded-xl border-2 text-sm transition-all ${cls}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${
                    isAnswered && idx === q.correct ? "border-green-400 bg-green-400 text-white" :
                    isAnswered && idx === selected && selected !== q.correct ? "border-red-400 bg-red-400 text-white" :
                    "border-white/30 text-white/50"
                  }`}>
                    {["A","B","C","D"][idx]}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </div>
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className={`p-4 rounded-xl text-sm leading-relaxed mb-5 border ${isCorrect ? "bg-green-500/10 border-green-500/20 text-green-300" : "bg-amber-500/10 border-amber-500/20 text-amber-300"}`}>
            <span className="font-semibold">{isCorrect ? "Correct! " : "Not quite. "}</span>
            <span className="text-white/70">{q.explanation}</span>
          </div>
        )}

        {isAnswered && (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition hover:opacity-90 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #185FA5, #7c3aed)" }}
          >
            {current < quizQuestions.length - 1 ? "Next question" : "See my results"}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
