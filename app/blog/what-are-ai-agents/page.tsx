"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, CheckCircle2, XCircle, ChevronRight } from "lucide-react"
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

// ─── Quiz component ───────────────────────────────────────────────────────────

function scoreMessage(score: number) {
  if (score >= 9) return { label: "AI Agent Expert", text: "Impressive — you clearly know your stuff. If you're thinking about deploying agents in your business, you're already ahead of most." }
  if (score >= 7) return { label: "Strong Foundation", text: "You've got a solid grasp of the fundamentals. A few areas to dig deeper, but you're well positioned to start exploring AI agents practically." }
  if (score >= 5) return { label: "Good Start", text: "You understand the basics. Some of the nuances around tool use, multi-agent systems, and RAG are worth exploring further." }
  return { label: "Room to Grow", text: "AI agents are genuinely complex — the fact that you're here means you're already ahead of the curve. This guide is a great place to start." }
}

function Quiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null))
  const [showExplanation, setShowExplanation] = useState(false)
  const [finished, setFinished] = useState(false)

  // Email capture state
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
      <div className="space-y-8">
        {/* Score card */}
        <div className="rounded-2xl overflow-hidden border border-slate-200">
          <div
            className="px-8 py-8 text-center"
            style={{ background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)" }}
          >
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">Your result</p>
            <p className="text-6xl font-bold text-white mb-2">{score}<span className="text-3xl text-white/60">/{quizQuestions.length}</span></p>
            <p className="text-white font-semibold text-lg">{label}</p>
          </div>
          <div className="bg-white px-8 py-6">
            <p className="text-slate-600 text-sm leading-relaxed mb-6">{text}</p>

            {/* Answer breakdown */}
            <div className="space-y-2">
              {quizQuestions.map((q, i) => {
                const correct = answers[i] === q.correct
                return (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl text-sm ${correct ? "bg-green-50" : "bg-red-50"}`}>
                    {correct
                      ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      : <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
                    <span className={`leading-snug ${correct ? "text-slate-700" : "text-slate-600"}`}>
                      {q.question}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Email capture */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-8 py-5 bg-slate-900">
            <p className="text-white font-bold text-lg mb-1">Want to see how AI agents could work in your business?</p>
            <p className="text-slate-400 text-sm">Get practical tips and real examples — sent to your inbox, no spam.</p>
          </div>
          <div className="bg-white px-8 py-6">
            {emailStatus === "success" ? (
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <p className="text-slate-700 text-sm font-medium">You're in — check your inbox for a welcome email.</p>
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
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
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
                {emailStatus === "error" && (
                  <p className="text-red-500 text-xs mt-2">Something went wrong — please try again.</p>
                )}
                <p className="text-xs text-slate-400 mt-3">No spam. Unsubscribe any time.</p>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden">
      {/* Progress bar */}
      <div className="h-1.5 bg-slate-100">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${((current) / quizQuestions.length) * 100}%`,
            background: "linear-gradient(90deg, #185FA5, #7c3aed)",
          }}
        />
      </div>

      <div className="px-7 py-6">
        {/* Counter */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Question {current + 1} of {quizQuestions.length}
          </span>
          <span className="text-xs font-semibold text-primary">
            {answers.filter((a, i) => a !== null && a === quizQuestions[i].correct).length} correct so far
          </span>
        </div>

        {/* Question */}
        <h3 className="text-lg font-bold text-slate-900 mb-5 leading-snug">{q.question}</h3>

        {/* Options */}
        <div className="space-y-3 mb-5">
          {q.options.map((opt, idx) => {
            let style = "border-slate-200 bg-white hover:border-primary/40 hover:bg-primary/3 cursor-pointer"
            if (isAnswered) {
              if (idx === q.correct) style = "border-green-400 bg-green-50 cursor-default"
              else if (idx === selected && selected !== q.correct) style = "border-red-300 bg-red-50 cursor-default"
              else style = "border-slate-200 bg-white opacity-60 cursor-default"
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`w-full text-left px-5 py-3.5 rounded-xl border-2 text-sm transition-all ${style}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${
                    isAnswered && idx === q.correct ? "border-green-400 bg-green-400 text-white" :
                    isAnswered && idx === selected && selected !== q.correct ? "border-red-300 bg-red-300 text-white" :
                    "border-slate-300 text-slate-500"
                  }`}>
                    {["A","B","C","D"][idx]}
                  </span>
                  <span className="text-slate-700 leading-snug">{opt}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-4 rounded-xl text-sm leading-relaxed mb-5 ${isCorrect ? "bg-green-50 border border-green-100 text-green-800" : "bg-amber-50 border border-amber-100 text-amber-900"}`}>
            <span className="font-semibold">{isCorrect ? "Correct! " : "Not quite — "}</span>
            {q.explanation}
          </div>
        )}

        {/* Next button */}
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

            {/* Back */}
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
                <div className="flex items-center gap-6 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>June 16, 2026</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>14 min read</span></div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  {/* Intro */}
                  <p>
                    "AI agent" is one of the most used — and most misunderstood — phrases in tech right now. It gets applied to everything from a basic chatbot to a fully autonomous system managing complex business workflows. That range makes it confusing.
                  </p>
                  <p>
                    This guide cuts through the noise. By the end, you'll know exactly what an AI agent is, how it works under the hood, how it differs from tools you already use, and — most importantly — what it can realistically do for your business today.
                  </p>

                  {/* TL;DR */}
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

                  {/* Section 1 */}
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

                  {/* Section 2 */}
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

                  <p>
                    This loop is what gives AI agents their power. A task that would require a human to log into three different systems, copy data between them, and send a follow-up email can be handled by an agent in seconds — running the perceive-reason-act-observe loop as many times as needed.
                  </p>

                  {/* Section 3 */}
                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">AI Agents vs. AI Chatbots: What's the Difference?</h2>
                  <p>
                    This is the question that trips up most people. Both involve AI and natural language — but they're fundamentally different in what they can do.
                  </p>

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

                  <p>
                    The practical implication: a chatbot is a tool you use. An AI agent is a system that does work on your behalf — you give it a goal and it figures out the steps.
                  </p>

                  {/* Section 4 */}
                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">AI Agents vs. Traditional Automation (Zapier, Make)</h2>
                  <p>
                    You might be thinking: "This sounds like what Zapier does." It's similar — but the difference matters in practice.
                  </p>
                  <p>
                    Traditional automation tools like Zapier, Make, or n8n work on fixed if/then rules. They're excellent for predictable, linear workflows: "When a new lead fills out this form, add them to HubSpot and send a welcome email." As long as every input fits the expected pattern, they work flawlessly.
                  </p>
                  <p>
                    The problem is reality. Inputs aren't always clean. A lead might fill out your form with their job title missing. An email might arrive in a format your Zap wasn't built for. An exception happens — and the traditional automation stops, fails silently, or sends garbage data downstream.
                  </p>
                  <p>
                    AI agents handle the messy middle. They can read an email that doesn't fit a template, infer what the person meant, look up missing information, and proceed appropriately. They're not smarter because of the LLM — they're smarter because they can reason about what to do when the situation doesn't match the script.
                  </p>

                  {/* Section 5 */}
                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Four Types of AI Agents</h2>
                  <p>
                    Not all AI agents are built the same. Understanding the types helps you match the right architecture to your actual problem.
                  </p>

                  <div className="my-6 space-y-5">
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-2">1. Reactive Agents</h4>
                      <p className="text-sm">Respond to a trigger and complete a single, immediate task. The simplest form — no memory, no planning. Example: an agent that classifies an incoming support ticket the moment it arrives.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-2">2. Deliberative Agents</h4>
                      <p className="text-sm">Build a plan before acting and work through it step by step. Better for complex, multi-step goals where the sequence of actions matters. Example: an agent that researches a prospect, drafts a personalised email, and schedules a follow-up.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-2">3. Memory-Augmented Agents</h4>
                      <p className="text-sm">Retain context across sessions, learning from past interactions to improve future responses. Particularly useful for customer-facing agents that need to remember previous conversations or preferences.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-2">4. Multi-Agent Systems</h4>
                      <p className="text-sm">Multiple agents working in parallel or sequence, each specialised in one part of a larger workflow. One agent qualifies a lead; another researches them; a third drafts outreach; a fourth monitors replies. Each is optimised for its role.</p>
                    </div>
                  </div>

                  {/* Section 6 */}
                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">What Can AI Agents Actually Do? Real Business Use Cases</h2>
                  <p>
                    The most common mistake is deploying an AI agent on the wrong type of task. Here's where they create real value — and where they don't.
                  </p>

                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">High-value use cases</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-5 py-1">
                        <h4 className="font-bold text-foreground mb-1">Lead qualification and follow-up</h4>
                        <p className="text-sm">An agent monitors your inbound leads, scores them against your ICP, looks up company data, sends a personalised first message, and books a demo — all before your team has opened their laptop. Response time drops from hours to minutes.</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-5 py-1">
                        <h4 className="font-bold text-foreground mb-1">Customer support triage</h4>
                        <p className="text-sm">An agent reads every incoming support ticket, categorises it by issue type and urgency, searches your knowledge base for a resolution, drafts a response, and either sends it automatically or routes it to the right human with the draft pre-filled.</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-5 py-1">
                        <h4 className="font-bold text-foreground mb-1">Internal reporting and data entry</h4>
                        <p className="text-sm">Pulling data from three sources to build a weekly report. Updating your CRM from email conversations. Syncing data between platforms that don't have native integrations. Repetitive, error-prone work that takes hours and produces no strategic value.</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-5 py-1">
                        <h4 className="font-bold text-foreground mb-1">Outbound prospecting</h4>
                        <p className="text-sm">Research a list of target accounts, identify the right contacts, personalise outreach based on recent news or job postings, and send at optimal times — at scale, without a sales development team.</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-5 py-1">
                        <h4 className="font-bold text-foreground mb-1">Onboarding workflows</h4>
                        <p className="text-sm">When a new customer signs up, an agent can trigger the right welcome sequence, set up their account, send personalised onboarding content based on their use case, and flag anything that needs human attention — without a team member touching it.</p>
                      </div>
                    </div>
                  </div>

                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Where AI agents fall short</h3>
                    <div className="bg-muted/30 border-l-4 border-amber-400 p-5 rounded-r-lg space-y-3">
                      <p className="text-sm"><strong className="text-foreground">Strategy and high-stakes decisions.</strong> AI agents are executors, not strategists. They can surface data and options, but final decisions on pricing, hiring, or company direction require human judgement and accountability.</p>
                      <p className="text-sm"><strong className="text-foreground">Relationship-critical interactions.</strong> A first call with a potential enterprise client. A difficult conversation with a customer about a product failure. These require human empathy, intuition, and authority.</p>
                      <p className="text-sm"><strong className="text-foreground">Tasks requiring physical presence.</strong> Everything in the physical world — installation, delivery, hands-on service — is outside the scope of software agents.</p>
                      <p className="text-sm"><strong className="text-foreground">Novel creative direction.</strong> AI agents can execute creative tasks well (drafting copy, editing images) but generating a brand's creative direction from scratch still benefits from human creative leadership.</p>
                    </div>
                  </div>

                  {/* Mid-article CTA */}
                  <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="bg-linear-to-r from-primary to-violet-500 px-8 py-5">
                      <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Free download</p>
                      <h3 className="text-xl font-bold text-white">Not sure if your business is ready for AI agents?</h3>
                    </div>
                    <div className="bg-white px-8 py-6">
                      <p className="text-foreground mb-5 leading-relaxed text-sm">
                        Take our free AI Agent Readiness Audit. It scores your business across four dimensions — data, processes, team, and tooling — and tells you exactly where to start and what to fix first.
                      </p>
                      <Link
                        href="/free-guides/ai-agent-readiness-audit"
                        className="inline-flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                      >
                        Get the free audit →
                      </Link>
                    </div>
                  </div>

                  {/* Section 7 */}
                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Key Concepts Worth Knowing</h2>

                  <div className="my-6 space-y-5">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Tool use</h3>
                      <p className="text-sm">The ability of an AI agent to call external services — APIs, databases, web search, email, calendar, CRM. Without tools, an agent can only generate text. With tools, it can take real-world actions. Tool use is the key enabler of everything that makes agents genuinely useful.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">RAG (Retrieval-Augmented Generation)</h3>
                      <p className="text-sm">A technique where the agent searches a specific knowledge base before generating a response. Instead of relying only on what the LLM was trained on, RAG lets the agent pull from your documentation, your CRM, your product specs — grounding its answers in your actual data and dramatically reducing hallucinations.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Memory</h3>
                      <p className="text-sm">The ability to retain information across sessions. Without memory, every conversation with an AI agent starts from scratch. With memory, an agent can remember a customer's previous issue, a lead's stated preferences, or the context from a week-old email thread.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Human-in-the-loop</h3>
                      <p className="text-sm">A design pattern where certain agent actions require human approval before proceeding. Not every task should be fully autonomous — high-stakes outputs (sending an email to an enterprise prospect, updating pricing in a production database) often benefit from a human checkpoint before the agent acts.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Agentic AI</h3>
                      <p className="text-sm">"Agentic" is the adjective used to describe AI systems that operate autonomously over extended periods and sequences of actions. An "agentic workflow" is one that runs with minimal human intervention. You'll see this term increasingly in product marketing — it generally means "uses AI agents" rather than a specific technical standard.</p>
                    </div>
                  </div>

                  {/* Quiz section */}
                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-2">Test Your Knowledge</h2>
                  <p className="mb-6">
                    10 questions covering what you've just read. Each question has a brief explanation of the right answer — useful even if you get it correct.
                  </p>
                </div>
              </div>

              {/* Quiz — outside prose wrapper for full layout control */}
              <div className="my-6">
                <Quiz />
              </div>

              <div className="prose prose-lg max-w-none mt-10">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  {/* FAQ */}
                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Frequently Asked Questions</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Do I need a technical team to use AI agents?</h3>
                      <p className="text-sm">Not necessarily. The barrier to deploying AI agents has dropped significantly. Several platforms let you configure agents without writing code. That said, integrating agents with your specific stack — your CRM, your inbox, your databases — usually benefits from technical help, at least in the initial setup.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">How much do AI agents cost?</h3>
                      <p className="text-sm">It depends heavily on complexity and usage volume. Simple reactive agents can cost a few hundred dollars a month to run. More complex multi-agent systems with high throughput will cost more. The right comparison isn't "cost of the agent" — it's "cost of the agent vs. cost of the human time it replaces."</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Are AI agents secure?</h3>
                      <p className="text-sm">Security depends on how they're built and what access they're given. An agent should only have access to the systems and data it needs to complete its specific task — the principle of least privilege. Reputable providers handle data encryption and access controls, but you should ask specifically about data handling, especially if the agent processes customer PII.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">What's the difference between an AI agent and an AI workflow?</h3>
                      <p className="text-sm">An AI workflow is a sequence of steps that includes AI processing at one or more points. An AI agent is the reasoning component within that workflow — it's what makes decisions about what to do next. You'll often see both terms used interchangeably, but strictly speaking, a workflow is the structure and the agent is the intelligence inside it.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Can AI agents make mistakes?</h3>
                      <p className="text-sm">Yes. AI agents can hallucinate information, take the wrong action based on a misread input, or get stuck in an unexpected state. This is why the "human-in-the-loop" pattern matters — especially when agents are taking actions that are hard to reverse. Over time, well-monitored agents improve as you refine their instructions and catch edge cases.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Which AI model powers AI agents?</h3>
                      <p className="text-sm">Most production AI agents today run on frontier models from Anthropic (Claude), OpenAI (GPT-4o), or Google (Gemini). Claude is widely used for agentic workflows because of its strong instruction-following, long context window, and built-in safety features. The model is often less important than the quality of the agent's design, prompts, and tool access.</p>
                    </div>
                  </div>

                  {/* Conclusion */}
                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Summary</h2>
                  <p>
                    AI agents are software systems that can perceive inputs, reason about them, take actions using real tools, and complete goals across multiple steps — without requiring a human to prompt them at each turn.
                  </p>
                  <p>
                    They're different from chatbots (which only generate text responses) and from traditional automation tools (which can only follow fixed rules). Their power comes from combining LLM reasoning with tool access — which is why they can handle complex, variable, real-world workflows that neither chatbots nor Zapier can touch.
                  </p>
                  <p>
                    The best use cases today are high-volume, repetitive, logic-driven tasks: lead qualification, customer support triage, data entry and reporting, and outbound prospecting. Strategy, relationships, and physical-world tasks remain firmly in human territory.
                  </p>
                  <p className="text-lg font-medium text-foreground/90">
                    If you're a business owner trying to figure out whether AI agents could work for you, the best starting point is a clear map of where your team's time is actually going — and which of those tasks fit the profile above.
                  </p>

                  {/* Final CTA */}
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
                      <p className="text-white/80 mb-6 leading-relaxed max-w-xl text-sm">
                        We build, deploy, and host custom AI agents for small businesses. Book a free 20-minute call and we'll walk you through what's possible for your specific workflows.
                      </p>
                      <Link
                        href="/book-demo"
                        className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
                      >
                        Book a free call →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related posts */}
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
