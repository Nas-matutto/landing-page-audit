"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, CheckCircle2, Clock, Zap, TrendingUp, Download } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

const benefits = [
  {
    icon: Clock,
    title: "Find where your time is going",
    description: "A task-by-task audit of your week so you can see exactly which activities are eating hours that could be automated.",
  },
  {
    icon: Zap,
    title: "Quick wins you can ship this week",
    description: "A prioritized list of automations you can implement in under 2 hours — no coding required.",
  },
  {
    icon: TrendingUp,
    title: "The right tools for each task",
    description: "For every automation category, we list the best tools (free and paid) so you're not guessing what to use.",
  },
  {
    icon: CheckCircle2,
    title: "A simple scoring system",
    description: "Score each task by time saved, effort required, and business impact — so you know exactly what to automate first.",
  },
]

const items = [
  "Email triage and follow-up sequences",
  "Lead capture and CRM data entry",
  "Reporting and weekly summaries",
  "Social media scheduling",
  "Invoice and payment reminders",
  "Onboarding and client comms",
  "Meeting scheduling and reminders",
  "Internal status updates",
]

export default function BusinessAutomationChecklistPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@")) return

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/send-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

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
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-widest">
              Free Checklist
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5 leading-tight">
            The Business Automation Checklist
          </h1>
          <p className="text-lg text-slate-500 mb-4 leading-relaxed">
            Most business owners spend 10–15 hours a week on tasks that could run themselves. This checklist helps you
            identify exactly what to automate, in what order, so you can reclaim that time — starting this Friday.
          </p>
          <p className="text-base text-slate-400 mb-12">
            It takes about 20 minutes to fill out. Most people find 3–5 quick wins they can implement the same week.
          </p>

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

          {/* Task categories */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-5">
              Tasks the checklist covers
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-600 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Email form */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div
              className="px-8 py-6"
              style={{ background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Download className="w-5 h-5 text-white/70" />
                <p className="text-white/80 text-xs font-semibold uppercase tracking-widest">Free download</p>
              </div>
              <h3 className="text-xl font-bold text-white">
                Get the checklist sent to your inbox
              </h3>
            </div>

            <div className="bg-white px-8 py-7">
              {status === "success" ? (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Check your inbox</p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      The PDF is on its way to <span className="font-medium text-slate-700">{email}</span>.
                      If you don't see it in a minute or two, check your spam folder.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-slate-500 text-sm mb-5">
                    Enter your email and we'll send you the PDF instantly — no spam, unsubscribe any time.
                  </p>
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
                      {status === "loading" ? "Sending…" : "Send me the checklist →"}
                    </button>
                  </form>
                  {status === "error" && (
                    <p className="text-red-500 text-sm mt-3">{errorMsg}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-4">
                    By submitting, you agree to receive occasional emails from Talk to me Data. No spam.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Who it's for */}
          <div className="mt-16 pt-12 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Who is this for?</h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              This checklist was built for small business owners, solopreneurs, and operators running lean teams who
              feel like they're always behind — not because they're not working hard enough, but because too much of
              their time goes to repetitive manual work.
            </p>
            <p className="text-slate-500 leading-relaxed">
              You don't need to be technical. Every automation in this guide either requires no code at all, or
              uses tools with step-by-step setup guides already linked inside.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
