"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, CheckCircle2, Search, Wrench, AlertTriangle, Sparkles, Download } from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    icon: Search,
    title: "8 real workflows worth automating",
    description: "A tour of the everyday, repetitive tasks that are a perfect fit for an agent — from invoice processing to lead research — with a manual-vs-agent breakdown for each.",
  },
  {
    icon: Wrench,
    title: "Build your first agent in Claude — step by step",
    description: "The exact setup: create a Project, add context and instructions, connect real tools via MCP, and run the workflow. Includes an example prompt you can copy.",
  },
  {
    icon: AlertTriangle,
    title: "The honest limitations of the DIY path",
    description: "Where building it yourself hits a wall — the 5-hour usage window, agents stalling mid-task, API keys and infrastructure — so you know before you rely on it.",
  },
  {
    icon: Sparkles,
    title: "The done-for-you alternative",
    description: "How to skip the setup entirely: describe the work in plain language and get a running agent that's built, hosted, and monitored for you.",
  },
]

const areas = [
  "Invoice processing & bookkeeping",
  "Social media content creation",
  "Lead research at scale",
  "Follow-up sequences & outreach",
  "CRM & data entry",
  "Customer support replies",
  "Proposal drafts",
  "Review requests & re-engagement",
]

function EmailForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [botField, setBotField] = useState("") // honeypot
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@")) return

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/send-build-ai-agents-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: firstName.trim(), lastName: lastName.trim(), hp: botField }),
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Honeypot — hidden from humans; bots that fill every field give themselves away. */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            autoComplete="given-name"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
          <input
            type="text"
            required
            autoComplete="family-name"
            placeholder="Surname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
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
          {status === "loading" ? "Sending…" : "Send me the guide →"}
        </button>
        </div>
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

export default function HowToBuildAIAgentsPage() {
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
              Free Guide
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5 leading-tight">
            How to Build AI Agents
          </h1>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-2xl">
            A practical guide to automating your manual work with AI agents — from spotting the tasks worth
            automating, to building your first agent in Claude, to running it without the technical headaches.
            Two paths inside: build it yourself, or have it built for you.
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
                Get the guide sent to your inbox
              </h2>
            </div>
            <div className="bg-white px-8 py-7">
              <p className="text-slate-500 text-sm mb-5">
                Enter your email and we'll send you the PDF instantly. No signup, no upsell — just a clear,
                practical walkthrough you can act on today.
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

          {/* Workflows covered */}
          <div className="mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-5">
              Workflows the guide walks through
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
              <p className="text-3xl font-bold text-slate-900 mb-1">2 paths</p>
              <p className="text-xs text-slate-500 leading-snug">DIY or done-for-you</p>
            </div>
            <div className="text-center border-x border-slate-200">
              <p className="text-3xl font-bold text-slate-900 mb-1">8</p>
              <p className="text-xs text-slate-500 leading-snug">workflows broken down</p>
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
              This guide is for business owners and operators who keep doing the same repetitive tasks by hand -
              invoices, follow-ups, data entry, content - and want to know whether an AI agent can take them off
              their plate.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              You'll see exactly how to build an agent yourself inside Claude, using Projects and connected tools,
              with a real example prompt. You'll also get an honest look at where the DIY path breaks down, so you
              go in with eyes open rather than hitting the walls later.
            </p>
            <p className="text-slate-500 leading-relaxed">
              No technical background needed. The guide uses plain language throughout, and if you'd rather skip
              the building altogether, it shows you the done-for-you route too.
            </p>
          </div>

          {/* Related reading */}
          <div className="mb-16 p-6 rounded-2xl border border-slate-100 bg-slate-50/60">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Related reading</p>
            <ul className="space-y-3">
              <li>
                <Link href="/free-guides/ai-agent-readiness-audit" className="group flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm text-slate-600 group-hover:text-primary transition-colors leading-relaxed">
                    The AI Agent Readiness Audit - is your business ready for one yet?
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
              <h2 className="text-xl font-bold text-white">Ready to build your first agent?</h2>
              <p className="text-white/75 text-sm mt-1">Get the free guide - no signup required, just your email.</p>
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
