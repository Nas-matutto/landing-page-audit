"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, CheckCircle2, XCircle, ChevronRight, Brain } from "lucide-react"
import Link from "next/link"

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
      "An AI agent is defined by its ability to perceive inputs, reason about them, and take actions autonomously — not just respond to a single prompt.",
  },
  {
    question: "What distinguishes an AI agent from a basic AI chatbot?",
    options: [
      "AI agents are more expensive to build and maintain",
      "AI agents can take multi-step actions and complete tasks end-to-end — not just generate text responses",
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
      "An AI that receives a new lead, looks up their LinkedIn profile, scores their fit, and sends a personalised email — without human input",
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
      "Autonomy means the agent can progress through a task independently. Humans can still set goals and review outputs — but they don't need to approve every individual action.",
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
      "Repetitive, rule-based, high-volume processes — like ticket triage — are ideal for AI agents. Strategy and human relationship tasks are not.",
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
      "AI agents excel at execution — but strategy, relationships, and high-stakes decisions still require human judgement. The goal is augmentation, not replacement.",
  },
  {
    question: "What does RAG (Retrieval-Augmented Generation) help AI agents do?",
    options: [
      "Generate realistic product images from text descriptions",
      "Ground responses in accurate, up-to-date information from a specific knowledge base — significantly reducing hallucinations",
      "Train entirely new AI models faster and more cheaply",
      "Convert voice recordings into structured text transcripts",
    ],
    correct: 1,
    explanation:
      "RAG lets an agent search a knowledge base (your docs, your CRM, your FAQs) before generating a response — so it answers based on your actual data, not just what it was trained on.",
  },
]

// ─── Score helper ─────────────────────────────────────────────────────────────

function scoreMessage(score: number) {
  if (score >= 9) return { label: "AI Agent Expert", text: "Impressive — you clearly know your stuff. If you're thinking about deploying agents in your business, you're already ahead of most." }
  if (score >= 7) return { label: "Strong Foundation", text: "You've got a solid grasp of the fundamentals. A few areas to dig deeper, but you're well positioned to start exploring AI agents practically." }
  if (score >= 5) return { label: "Good Start", text: "You understand the basics. Some of the nuances around tool use, multi-agent systems, and RAG are worth exploring further." }
  return { label: "Room to Grow", text: "AI agents are genuinely complex — the fact that you're here means you're already ahead of the curve. This guide is a great place to start." }
}

// ─── Quiz component ───────────────────────────────────────────────────────────

function Quiz() {
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
            <p className="text-white/50 text-sm">Get practical tips and real examples — sent to your inbox, no spam.</p>
          </div>
          <div className="px-8 py-6">
            {emailStatus === "success" ? (
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                <p className="text-white/80 text-sm font-medium">You're in — check your inbox.</p>
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
                {emailStatus === "error" && <p className="text-red-400 text-xs mt-2">Something went wrong — please try again.</p>}
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

        <h3 className="text-lg font-bold text-white mb-5 leading-snug">{q.question}</h3>

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
            <span className="font-semibold">{isCorrect ? "Correct! " : "Not quite — "}</span>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhatAreAIAgentsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>

            <article>
              {/* Header */}
              <div className="mb-10">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  AI Agents
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-5 mb-5 leading-tight text-slate-900">
                  What Are AI Agents? A Plain-English Guide for Business Owners
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-5">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>June 16, 2026</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>14 min read</span></div>
                </div>
                {/* Quiz teaser */}
                <a
                  href="#quiz"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors"
                >
                  <Brain className="w-4 h-4" />
                  Includes a 10-question quiz — test your knowledge below
                </a>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <p>
                    "AI agent" is one of the most used — and most misunderstood — phrases in tech right now. It gets applied to everything from a basic chatbot to a fully autonomous system managing complex business workflows. That range makes it confusing.
                  </p>
                  <p>
                    This guide cuts through the noise. By the end, you'll know exactly what an AI agent is, how it works under the hood, how it differs from tools you already use, and — most importantly — what it can realistically do for your business today.
                  </p>

                  <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                    <h3 className="text-xl font-bold text-foreground mb-3">TL;DR</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground">
                      <li>An AI agent is a software system that can perceive inputs, reason about them, and take autonomous actions to complete a goal</li>
                      <li>Unlike chatbots, agents can use tools, call APIs, and complete multi-step tasks without human prompting at each step</li>
                      <li>They differ from traditional automation (like Zapier) because they can reason, adapt, and handle exceptions</li>
                      <li>The most valuable use cases: lead qualification, customer support, internal reporting, and outbound outreach</li>
                      <li>They work best on repetitive, high-volume, logic-driven tasks — not strategy or relationship-building</li>
                    </ul>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Short Answer: What Is an AI Agent?</h2>
                  <p>
                    An <strong>AI agent</strong> is a software system that can perceive its environment, reason about what it perceives, decide what to do, and then act — repeatedly, without requiring a human to prompt it at every step.
                  </p>
                  <p>
                    The term comes from AI research, where an "agent" is defined as anything that can take actions in pursuit of a goal. What makes modern AI agents different from earlier rule-based systems is that they're powered by large language models (LLMs) — which means they can reason in natural language, handle ambiguity, and adapt to situations that weren't explicitly anticipated when they were built.
                  </p>
                  <p>
                    A concrete way to think about it: a standard LLM like ChatGPT responds to a single prompt and stops. An AI agent receives a goal, breaks it into steps, takes actions across multiple tools and systems, handles what comes back, and keeps going until the task is done.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How Do AI Agents Work? The Core Loop</h2>
                  <p>
                    Most AI agents operate on a loop: <strong>perceive → reason → act → observe</strong>. This cycle repeats until the agent completes its goal or hits a condition that stops it.
                  </p>
                  <div className="my-6 space-y-4">
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-4 rounded-r-lg">
                      <h4 className="text-base font-bold text-foreground mb-1">1. Perceive</h4>
                      <p className="text-sm">The agent receives inputs — a user message, a new email, a webhook from your CRM, a scheduled trigger. This is what kicks the loop off.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-4 rounded-r-lg">
                      <h4 className="text-base font-bold text-foreground mb-1">2. Reason</h4>
                      <p className="text-sm">The LLM at the agent's core thinks through what it knows, what it needs to find out, and what the best next action is. This is where the "intelligence" lives.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-4 rounded-r-lg">
                      <h4 className="text-base font-bold text-foreground mb-1">3. Act</h4>
                      <p className="text-sm">The agent calls a tool — searching the web, writing to a spreadsheet, sending an email, querying a database, calling an API. This is what separates agents from plain chatbots.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-4 rounded-r-lg">
                      <h4 className="text-base font-bold text-foreground mb-1">4. Observe</h4>
                      <p className="text-sm">The agent sees the result of its action, updates its understanding, and decides whether it's done or needs to take another step. Then the loop repeats.</p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">AI Agents vs. AI Chatbots: What's the Difference?</h2>
                  <p>Both involve AI and natural language — but they're fundamentally different in what they can do.</p>
                  <div className="my-8 overflow-x-auto">
                    <table className="w-full border-collapse border-2 border-border rounded-lg text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border border-border p-4 text-left text-foreground font-bold"></th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">AI Chatbot</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">AI Agent</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4 font-semibold text-foreground">Interaction model</td>
                          <td className="border border-border p-4">Responds to a single prompt</td>
                          <td className="border border-border p-4">Pursues a goal across multiple steps</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4 font-semibold text-foreground">Tool access</td>
                          <td className="border border-border p-4">Usually none</td>
                          <td className="border border-border p-4">Can call APIs, databases, external apps</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 font-semibold text-foreground">Output</td>
                          <td className="border border-border p-4">Text response</td>
                          <td className="border border-border p-4">Completed action or workflow</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4 font-semibold text-foreground">Human involvement</td>
                          <td className="border border-border p-4">Required at each turn</td>
                          <td className="border border-border p-4">Only needed to set the goal and review results</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 font-semibold text-foreground">Handles exceptions</td>
                          <td className="border border-border p-4">No</td>
                          <td className="border border-border p-4">Yes — can adapt when things don't go as planned</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4 font-semibold text-foreground">Example</td>
                          <td className="border border-border p-4">"Summarise this email for me"</td>
                          <td className="border border-border p-4">"Process all incoming enquiries and book demos with qualified leads"</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">AI Agents vs. Traditional Automation (Zapier, Make)</h2>
                  <p>Traditional automation tools like Zapier, Make, or n8n work on fixed if/then rules. They're excellent for predictable, linear workflows — as long as every input fits the expected pattern, they work flawlessly.</p>
                  <p>The problem is reality. Inputs aren't always clean. An exception happens — and the traditional automation stops, fails silently, or sends garbage data downstream.</p>
                  <p>AI agents handle the messy middle. They can read an email that doesn't fit a template, infer what the person meant, look up missing information, and proceed appropriately.</p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Four Types of AI Agents</h2>
                  <div className="my-6 space-y-5">
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-2">1. Reactive Agents</h4>
                      <p className="text-sm">Respond to a trigger and complete a single, immediate task. No memory, no planning. Example: an agent that classifies an incoming support ticket the moment it arrives.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-2">2. Deliberative Agents</h4>
                      <p className="text-sm">Build a plan before acting and work through it step by step. Better for complex, multi-step goals. Example: an agent that researches a prospect, drafts a personalised email, and schedules a follow-up.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-2">3. Memory-Augmented Agents</h4>
                      <p className="text-sm">Retain context across sessions, learning from past interactions. Particularly useful for customer-facing agents that need to remember previous conversations or preferences.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-2">4. Multi-Agent Systems</h4>
                      <p className="text-sm">Multiple agents working in parallel or sequence, each specialised in one part of a larger workflow. One qualifies a lead; another researches them; a third drafts outreach; a fourth monitors replies.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* ── QUIZ ── */}
              <div id="quiz" className="my-12 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%)" }}>
                <div className="px-8 pt-8 pb-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 uppercase tracking-widest mb-4">
                    <Brain className="w-3.5 h-3.5" />
                    10-Question Quiz
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-2">Test your knowledge</h2>
                  <p className="text-white/50 text-sm">Questions cover everything above. Each answer comes with an explanation — useful even if you get it right.</p>
                </div>
                <div className="px-5 pb-6">
                  <Quiz />
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">What Can AI Agents Actually Do? Real Business Use Cases</h2>
                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">High-value use cases</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-5 py-1">
                        <h4 className="font-bold text-foreground mb-1">Lead qualification and follow-up</h4>
                        <p className="text-sm">An agent monitors your inbound leads, scores them against your ICP, looks up company data, sends a personalised first message, and books a demo — all before your team has opened their laptop.</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-5 py-1">
                        <h4 className="font-bold text-foreground mb-1">Customer support triage</h4>
                        <p className="text-sm">An agent reads every incoming support ticket, categorises it, searches your knowledge base, drafts a response, and either sends it or routes it to the right human with the draft pre-filled.</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-5 py-1">
                        <h4 className="font-bold text-foreground mb-1">Internal reporting and data entry</h4>
                        <p className="text-sm">Pulling data from multiple sources, updating your CRM from email conversations, syncing platforms that don't have native integrations — repetitive work that takes hours and produces no strategic value.</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-5 py-1">
                        <h4 className="font-bold text-foreground mb-1">Outbound prospecting</h4>
                        <p className="text-sm">Research target accounts, identify the right contacts, personalise outreach based on recent signals, and send at optimal times — at scale, without a dedicated sales development team.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/30 border-l-4 border-amber-400 p-5 rounded-r-lg space-y-3">
                    <p className="font-semibold text-foreground">Where AI agents fall short</p>
                    <p className="text-sm"><strong className="text-foreground">Strategy and high-stakes decisions.</strong> AI agents are executors, not strategists. Final decisions on pricing, hiring, or company direction require human judgement.</p>
                    <p className="text-sm"><strong className="text-foreground">Relationship-critical interactions.</strong> A first call with an enterprise client, a difficult conversation about a product failure — these require human empathy and authority.</p>
                    <p className="text-sm"><strong className="text-foreground">Novel creative direction.</strong> Agents can execute creative tasks well, but generating a brand's creative direction from scratch still benefits from human creative leadership.</p>
                  </div>

                  {/* Mid-article CTA */}
                  <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="bg-linear-to-r from-primary to-violet-500 px-8 py-5">
                      <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Free download</p>
                      <h3 className="text-xl font-bold text-white">Not sure if your business is ready for AI agents?</h3>
                    </div>
                    <div className="bg-white px-8 py-6">
                      <p className="text-foreground mb-5 leading-relaxed text-sm">
                        Take our free AI Agent Readiness Audit. It scores your business across four dimensions — data, processes, team, and tooling — and tells you exactly where to start.
                      </p>
                      <Link href="/free-guides/ai-agent-readiness-audit" className="inline-flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                        Get the free audit →
                      </Link>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Key Concepts Worth Knowing</h2>
                  <div className="my-6 space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Tool use</h3>
                      <p className="text-sm">The ability of an AI agent to call external services — APIs, databases, web search, email, calendar, CRM. Without tools, an agent can only generate text. With tools, it can take real-world actions.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">RAG (Retrieval-Augmented Generation)</h3>
                      <p className="text-sm">A technique where the agent searches a specific knowledge base before generating a response — grounding its answers in your actual data and dramatically reducing hallucinations.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Memory</h3>
                      <p className="text-sm">The ability to retain information across sessions. With memory, an agent can remember a customer's previous issue, a lead's stated preferences, or the context from a week-old email thread.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Human-in-the-loop</h3>
                      <p className="text-sm">A design pattern where certain agent actions require human approval before proceeding. High-stakes outputs often benefit from a checkpoint before the agent acts.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Agentic AI</h3>
                      <p className="text-sm">"Agentic" describes AI systems that operate autonomously over extended periods and sequences of actions — with minimal human intervention.</p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Do I need a technical team to use AI agents?</h3>
                      <p className="text-sm">Not necessarily. Several platforms let you configure agents without writing code. That said, integrating agents with your specific stack usually benefits from technical help at the initial setup stage.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">How much do AI agents cost?</h3>
                      <p className="text-sm">Simple reactive agents can cost a few hundred dollars a month to run. More complex multi-agent systems with high throughput will cost more. The right comparison is cost of the agent vs. cost of the human time it replaces.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Are AI agents secure?</h3>
                      <p className="text-sm">Security depends on how they're built. An agent should only have access to systems and data it needs — the principle of least privilege. Ask specifically about data handling if the agent processes customer PII.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Can AI agents make mistakes?</h3>
                      <p className="text-sm">Yes. They can hallucinate information, take the wrong action, or get stuck in unexpected states. This is why human-in-the-loop patterns matter — especially for actions that are hard to reverse.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Which AI model powers AI agents?</h3>
                      <p className="text-sm">Most production agents run on frontier models from Anthropic (Claude), OpenAI (GPT-4o), or Google (Gemini). Claude is widely used for agentic workflows because of its strong instruction-following and long context window.</p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Summary</h2>
                  <p>
                    AI agents are software systems that can perceive inputs, reason about them, take actions using real tools, and complete goals across multiple steps — without requiring a human to prompt them at each turn.
                  </p>
                  <p>
                    The best use cases today are high-volume, repetitive, logic-driven tasks: lead qualification, customer support triage, data entry and reporting, and outbound prospecting. Strategy, relationships, and physical-world tasks remain firmly in human territory.
                  </p>

                  <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div
                      className="relative px-8 py-10"
                      style={{
                        background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)",
                        backgroundImage: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed), radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
                        backgroundSize: "100% 100%, 24px 24px",
                      }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-3">Ready to see what an AI agent could do for your business?</h3>
                      <p className="text-white/80 mb-6 leading-relaxed max-w-xl text-sm">We build, deploy, and host custom AI agents for small businesses. Book a free 20-minute call and we'll walk you through what's possible for your specific workflows.</p>
                      <Link href="/book-demo" className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
                        Book a free call →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-5">Related reading</h3>
                <div className="space-y-3">
                  <Link href="/blog/ai-agents-for-small-business" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">AI Agents for Small Business: How SMBs Are Automating Without a Tech Team</span>
                  </Link>
                  <Link href="/blog/how-to-build-ai-lead-finder-agent" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">How to Build an AI Agent That Finds and Qualifies B2B Leads</span>
                  </Link>
                  <Link href="/free-guides/business-automation-checklist" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">Free Guide: The Business Automation Checklist</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
