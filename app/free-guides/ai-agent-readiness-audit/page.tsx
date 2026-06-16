"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, CheckCircle2, Search, BarChart3, Compass, Lightbulb, Download } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    icon: Search,
    title: "Identify your highest-value use cases",
    description: "A structured walkthrough of your business operations to pinpoint exactly where an AI agent would have the biggest impact.",
  },
  {
    icon: BarChart3,
    title: "Score your current readiness",
    description: "A simple scoring system across four dimensions — data, processes, team, and tooling — so you know where you stand today.",
  },
  {
    icon: Compass,
    title: "Know when to start (and when to wait)",
    description: "Not every business is ready for AI agents right now. This audit tells you honestly whether to move now or what to fix first.",
  },
  {
    icon: Lightbulb,
    title: "Clear next steps based on your score",
    description: "The audit ends with a personalised action plan based on your results — no generic advice, just what applies to your situation.",
  },
]

const areas = [
  "Customer-facing communication and support",
  "Lead qualification and follow-up",
  "Internal reporting and data entry",
  "Onboarding and client hand-offs",
  "Scheduling and coordination",
  "Document processing and summarisation",
  "Sales outreach and prospecting",
  "Knowledge management and FAQs",
]

function EmailForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@")) return

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/send-ai-agent-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (!res.ok) {
        setStatus("error")
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
        return
      }
      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-4 p-5 rounded-2xl bg-green-50 border border-green-100">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="font-semibold text-slate-800 mb-1">Check your inbox</p>
          <p className="text-slate-500 text-sm leading-relaxed">
            The PDF is on its way to <span className="font-medium text-slate-700">{email}</span>.
            If you don't see it in a couple of minutes, check your spam folder.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
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
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 cursor-pointer whitespace-nowrap"
          style={{ background: "linear-gradient(135deg, #185FA5, #7c3aed)" }}
        >
          {status === "loading" ? "Sending…" : "Send me the audit →"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-3">{errorMsg}</p>
      )}
      <p className="text-xs text-slate-400 mt-3">
        No spam. Unsubscribe any time.
      </p>
    </>
  )
}

export default function AIAgentReadinessAuditPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 sm:pt-40 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

          {/* Back link */}
          <Link
            href="/free-guides"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-10 group text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Free Guides
          </Link>

          {/* Tag */}
          <div className="mb-5">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-widest">
              Free Audit
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5 leading-tight">
            The AI Agent Readiness Audit
          </h1>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-2xl">
            Before you spend time or money on AI agents, you need to know if your business is actually ready for one.
            This free audit scores your readiness across four areas and tells you exactly what to do next, whether
            that's starting now or fixing something first.
          </p>

          {/* Email form — top */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-16">
            <div
              className="px-8 py-6"
              style={{ background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Download className="w-4 h-4 text-white/70" />
                <p className="text-white/80 text-xs font-semibold uppercase tracking-widest">Free download</p>
              </div>
              <h2 className="text-xl font-bold text-white">
                Get the audit sent to your inbox
              </h2>
            </div>
            <div className="bg-white px-8 py-7">
              <p className="text-slate-500 text-sm mb-5">
                Enter your email and we'll send you the PDF instantly. It takes about 15 minutes to complete and gives you a clear picture of where you stand with AI agents.
              </p>
              <EmailForm />
            </div>
          </div>

          {/* What's inside */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">What's inside</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {benefits.map((b) => {
                const Icon = b.icon
                return (
                  <div key={b.title} className="flex gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 mb-1 text-sm">{b.title}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Areas covered */}
          <div className="mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-5">
              Business areas the audit covers
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {areas.map((area) => (
                <li key={area} className="flex items-center gap-3 text-slate-600 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats block */}
          <div className="grid grid-cols-3 gap-4 mb-16 p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">15min</p>
              <p className="text-xs text-slate-500 leading-snug">to complete the full audit</p>
            </div>
            <div className="text-center border-x border-slate-200">
              <p className="text-3xl font-bold text-slate-900 mb-1">4</p>
              <p className="text-xs text-slate-500 leading-snug">readiness dimensions scored</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">100%</p>
              <p className="text-xs text-slate-500 leading-snug">free - no upsell, no catch</p>
            </div>
          </div>

          {/* Who it's for */}
          <div className="pt-10 border-t border-slate-100 mb-16">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Who is this for?</h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              This audit is for business owners and operators who are curious about AI agents but aren't sure
              where they fit - or whether their business is even in the right shape to use them yet.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              If you've seen AI agents demoed and thought "that looks useful but I don't know where to start",
              this audit gives you a concrete answer. It looks at your current processes, data quality, team
              capacity, and tooling, so the four factors that determine whether an AI agent will actually work
              for your business right now.
            </p>
            <p className="text-slate-500 leading-relaxed">
              You don't need a technical background. The audit uses plain language throughout and the
              scoring system makes the output easy to act on.
            </p>
          </div>

          {/* Related reading */}
          <div className="mb-16 p-6 rounded-2xl border border-slate-100 bg-slate-50/60">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Related reading</p>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ai-agents-for-small-business" className="group flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm text-slate-600 group-hover:text-primary transition-colors leading-relaxed">
                    AI Agents for Small Business - what they are and when to use one
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/free-guides/business-automation-checklist" className="group flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm text-slate-600 group-hover:text-primary transition-colors leading-relaxed">
                    The Business Automation Checklist - identify what to automate first
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/agents" className="group flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm text-slate-600 group-hover:text-primary transition-colors leading-relaxed">
                    See the AI agents we build and deploy for businesses
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Bottom CTA — repeat form */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div
              className="px-8 py-6"
              style={{ background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)" }}
            >
              <h2 className="text-xl font-bold text-white">Ready to find out where you stand?</h2>
              <p className="text-white/75 text-sm mt-1">Get the free audit - no signup required, just your email.</p>
            </div>
            <div className="bg-white px-8 py-7">
              <EmailForm />
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
