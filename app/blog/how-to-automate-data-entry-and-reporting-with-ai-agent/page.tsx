"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, Copy, Check, CheckCircle2, ChevronDown, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const AGENT_PROMPT = `You are the data entry and reporting agent for [Company]. You collect data from wherever it lives, keep the master records clean and up to date, and turn those records into a ready-to-share report on a schedule.

STEP 1 - INGEST
Collect the raw inputs from the sources you are connected to: spreadsheets and CSVs, PDFs and forms, emails and attachments, and tool APIs (CRM, e-commerce, ads, payments). Note where each record came from and when.

STEP 2 - EXTRACT & CLEAN
Read each input and pull out the fields that matter. Normalise formats (dates, currencies, names), de-duplicate, and reconcile the same entity across sources. Fix obvious errors; never invent a value you cannot find.

STEP 3 - ENTER TO THE SYSTEM OF RECORD
Call sheets_append_row (or the CRM/database equivalent) to add new records and update existing ones in the master dataset. Keep one clean, de-duplicated source of truth. Record a timestamp and the source for every row.

STEP 4 - GENERATE THE REPORT
On the defined schedule (daily/weekly/monthly), calculate the KPIs, totals, and trends that matter, compare against the prior period, and write a clear, ready-to-share report: headline numbers first, then what changed and why, then anything that needs attention. Deliver it to the agreed destination (Google Doc, dashboard, email, or Slack).

STEP 5 - FLAG & CONFIRM
Flag anomalies, missing data, and anything you were unsure about in a "Needs review" section so a human can check it. Confirm what you updated and what you reported, and never present an assumption as a verified fact.`

const faqs = [
  {
    q: "What data sources can the agent pull from?",
    a: "Almost anything you already use: spreadsheets and CSVs, PDFs and forms, emails and attachments, and tools like your CRM, e-commerce platform, ad accounts, and payment processor via their APIs. It reads structured and unstructured data alike, so your inputs don't have to be in any particular template.",
  },
  {
    q: "Where does it enter the data?",
    a: "Wherever your system of record lives — most commonly Google Sheets, but equally a database, a CRM like HubSpot, or an internal tool. It appends new rows, updates existing ones, and keeps a clean, de-duplicated dataset your whole team can trust.",
  },
  {
    q: "Can it generate reports automatically on a schedule?",
    a: "Yes. The agent can run on a schedule — daily, weekly, or monthly — pull the latest numbers, calculate the KPIs and trends you care about, flag anomalies, and deliver a ready-to-share report to a Google Doc, a dashboard, email, or Slack, with no one lifting a finger.",
  },
  {
    q: "How accurate is it, and can it handle messy data?",
    a: "Modern models are strong at reading and normalising messy, inconsistent inputs — reconciling different date formats, fixing obvious typos, and mapping fields across sources. The agent is instructed to validate as it goes and flag anything ambiguous or missing for human review, so edge cases surface instead of silently corrupting the data.",
  },
  {
    q: "Will an AI agent replace my analyst or data team?",
    a: "No — it removes the repetitive copy-paste-and-summarise work so your people focus on interpretation and decisions. The agent handles the collection, entry, and first-draft reporting; your analyst spends their time on the 'so what', not on assembling the numbers.",
  },
  {
    q: "Can Talk to Me Data build and host this agent for me?",
    a: "Yes. We build, connect, and host the agent on our infrastructure — the integrations to your tools, the model, the Google Sheets or database, the report templates, and the scheduling and monitoring — so there's nothing to configure or maintain on your side. Book a demo and we'll get you onboarded in days.",
  },
]

function PromptBlock() {
  const [copied, setCopied] = useState(false)
  const [showCapture, setShowCapture] = useState(false)
  const [email, setEmail] = useState("")
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  function handleCopy() {
    navigator.clipboard.writeText(AGENT_PROMPT)
    setCopied(true)
    setShowCapture(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@")) return
    setEmailStatus("loading")
    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "prompt_data_entry_reporting_agent" }),
      })
      if (!res.ok) throw new Error()
      setEmailStatus("success")
    } catch {
      setEmailStatus("error")
    }
  }

  return (
    <div className="my-8">
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ background: "linear-gradient(135deg, #0f172a, #1e1b4b)" }}
        >
          <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">Agent Prompt</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={copied
              ? { background: "rgba(34,197,94,0.15)", color: "#86efac" }
              : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
          >
            {copied ? <><Check className="w-3.5 h-3.5" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy prompt</>}
          </button>
        </div>
        <pre
          className="text-sm leading-relaxed p-6 overflow-x-auto whitespace-pre-wrap text-slate-700 bg-slate-50 font-mono"
          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace" }}
        >
          {AGENT_PROMPT}
        </pre>
      </div>

      {showCapture && (
        <div className="mt-4 rounded-2xl border-2 border-violet-200 bg-violet-50 p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-violet-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-violet-900 mb-0.5 text-sm">Prompt copied!</p>
              {emailStatus === "success" ? (
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <p className="text-slate-600 text-sm">You're in - we'll send new prompts as we build them.</p>
                </div>
              ) : (
                <>
                  <p className="text-violet-700 text-sm mb-4">Interested in building AI Agents?</p>
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-violet-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 transition"
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "loading"}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60 cursor-pointer whitespace-nowrap transition hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #6d28d9, #7c3aed)" }}
                    >
                      {emailStatus === "loading" ? "Sending…" : "Yes, send me more →"}
                    </button>
                  </form>
                  {emailStatus === "error" && (
                    <p className="text-red-500 text-xs mt-2">Something went wrong - please try again.</p>
                  )}
                  <p className="text-xs text-violet-400 mt-2">No spam. Unsubscribe any time.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border-2 border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full p-5 text-left flex items-center justify-between hover:bg-muted/40 transition-colors cursor-pointer"
          >
            <span className="font-semibold text-foreground pr-4 text-sm">{faq.q}</span>
            <ChevronDown className={`w-4 h-4 text-primary shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function AutomateDataEntryReportingPage() {
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
              <div className="mb-10">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">AI Agents</span>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-5 mb-5 leading-tight text-slate-900">
                  How to Automate Data Entry and Reporting With an AI Agent (With the Exact Prompt)
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>July 23, 2026</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>10 min read</span></div>
                </div>
              </div>

              {/* Hero image */}
              <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200">
                <Image
                  src="/Data_entry_and_reporting.png"
                  alt="An AI agent pulling data from business tools into a clean sheet and an automatically generated report"
                  width={1200}
                  height={630}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <p>
                    Almost every business runs on data that someone, somewhere, is moving by hand. A person exports a
                    report from one tool, copies numbers into a spreadsheet, reconciles them against another source,
                    fixes the formatting, and then rebuilds the same weekly summary they built last week. It&apos;s slow,
                    it&apos;s mind-numbing, and it&apos;s exactly the kind of work that quietly consumes ten or more hours
                    a week without ever moving the business forward.
                  </p>
                  <p>
                    This guide shows you how to automate data entry and reporting with an AI agent. It pulls data from
                    the tools you already use, cleans and structures it, enters it into your system of record — usually a
                    {" "}<a href="https://www.google.com/sheets/about/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Sheet</a>
                    {" "}— and then generates a ready-to-share report on whatever schedule you set. If you&apos;re new to
                    the idea, our primer on <Link href="/blog/what-are-ai-agents" className="text-primary hover:underline">what AI agents actually are</Link> is a good place to start.
                  </p>

                  {/* TL;DR */}
                  <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                    <h3 className="text-xl font-bold text-foreground mb-3">TL;DR</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground">
                      <li>An AI agent collects data from your spreadsheets, PDFs, emails, and tool APIs automatically</li>
                      <li>It extracts, cleans, normalises, and de-duplicates the data using a model like <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a></li>
                      <li>It enters everything into one clean <strong>system of record</strong> (Google Sheets, a CRM, or a database)</li>
                      <li>On a <strong>schedule</strong>, it calculates your KPIs and trends and writes a ready-to-share report</li>
                      <li>It <strong>flags anomalies and missing data</strong> for human review instead of guessing</li>
                      <li>The full agent prompt is included below — ready to copy</li>
                    </ul>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Problem With Manual Data Entry and Reporting</h2>
                  <p>
                    The pain of manual data work isn&apos;t any single task — it&apos;s the compounding. Every source has
                    its own format, so someone has to reconcile them. Every week the same report gets rebuilt from
                    scratch. And because the work is repetitive and boring, it&apos;s error-prone and easy to defer, which
                    is how teams end up making decisions on numbers that are days old or quietly wrong.
                  </p>
                  <p>
                    Two things break at once. First, <strong>accuracy</strong>: a transposed digit, a missed row, or two
                    slightly different spellings of the same customer silently corrupt the dataset everyone downstream
                    trusts. Second, <strong>timeliness</strong>: by the time a human has collected, cleaned, and
                    summarised everything, the report describes the past rather than the present, and the insight arrives
                    too late to act on.
                  </p>
                  <p>
                    The traditional fixes — rigid import scripts and brittle spreadsheet macros — break the moment a
                    source changes its layout or someone types a date differently. An AI agent is different: it reads
                    messy, inconsistent inputs the way a person would, understands what each value means, and then
                    <em> takes the action</em> of entering it and reporting on it. If you want the wider view of how this
                    applies across a business, see our guide on <Link href="/blog/ai-agents-for-small-business" className="text-primary hover:underline">AI agents for small business</Link>.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How the Data Entry &amp; Reporting Agent Works</h2>
                  <p>
                    The agent behind <Link href="/agents/data-entry-reporting" className="text-primary hover:underline">Talk to Me Data&apos;s data entry and reporting automation</Link> follows a simple loop: ingest the raw data, clean it,
                    enter it into one source of truth, and turn that into a report. Here&apos;s each step.
                  </p>

                  <div className="my-6 space-y-5">
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 1 — Ingest the data</h4>
                      <p className="text-sm">The agent collects raw inputs from wherever they live: spreadsheets and CSVs, PDFs and forms, emails and attachments, and the APIs of the tools you already run (CRM, e-commerce, ad accounts, payments). It records where every record came from and when, so the trail is always auditable.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 2 — Extract &amp; clean</h4>
                      <p className="text-sm">It reads each input, pulls out the fields that matter, and normalises them — reconciling different date and currency formats, fixing obvious typos, de-duplicating, and matching the same customer or order across sources. This is what scripts can&apos;t do reliably: it understands the data instead of pattern-matching it.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 3 — Enter it into your system of record</h4>
                      <p className="text-sm">The agent appends new rows and updates existing ones in your master dataset — a Google Sheet, a database, or a CRM — keeping one clean, de-duplicated source of truth with a timestamp and source on every row. No more three conflicting versions of the same spreadsheet.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 4 — Generate the report</h4>
                      <p className="text-sm">On the schedule you set — daily, weekly, or monthly — the agent calculates the KPIs and trends you care about, compares them to the prior period, and writes a clear report: headline numbers first, then what changed and why, then anything that needs attention. It delivers it to a Google Doc, a dashboard, email, or Slack, and flags anomalies and missing data in a &quot;Needs review&quot; section for a human to check.</p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Why Start With Your Reporting Bottleneck</h2>
                  <p>
                    You could point this agent at almost any data chore, but the recurring report is usually the
                    highest-leverage place to begin, because it&apos;s painful on a predictable cadence. Someone loses a
                    morning every week assembling the same numbers, and the output is stale the moment it&apos;s done.
                    Automating that one loop frees real hours immediately and gives everyone a live, trustworthy picture
                    instead of a weekly snapshot.
                  </p>
                  <p>
                    The best part is that the underlying logic doesn&apos;t change as you add sources. Whether the data
                    arrives from a spreadsheet, a <a href="https://www.hubspot.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">HubSpot</a> export, or a
                    {" "}<a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stripe</a> feed, the agent still ingests, cleans, enters, and reports into the same
                    place. You build the engine once and plug new inputs into it over time. This is the same pattern our
                    {" "}<Link href="/blog/how-to-automate-customer-service-with-ai-agent" className="text-primary hover:underline">customer service agent</Link> and
                    {" "}<Link href="/blog/how-to-automate-invoices-into-accounting-software" className="text-primary hover:underline">invoice processing agent</Link> use to turn messy inputs into clean, structured records.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Prompt</h2>
                  <p>
                    Here&apos;s the exact prompt behind the agent. Paste it into your AI agent orchestration interface —
                    whether that&apos;s Talk to Me Data or a <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> project with your data sources and Google Sheets connected. Swap
                    {" "}<code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">[Company]</code> for your business name and point <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">sheets_append_row</code> at your master dataset.
                  </p>

                </div>
              </div>

              {/* Prompt block */}
              <PromptBlock />

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">What You Need to Set It Up</h2>
                  <div className="my-6 space-y-4">
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">Connections to your data sources</h4>
                      <p className="text-sm">Access to the tools and inboxes your data comes from — spreadsheets, a shared drive, an email inbox, or the APIs of your CRM, e-commerce, ads, and payments tools. These are the inputs the agent ingests and reconciles.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">A capable model</h4>
                      <p className="text-sm">A model like <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> with tool use enabled. This is what lets it read messy, inconsistent inputs, understand what each value means, and write a genuinely useful report rather than a raw data dump.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">A system of record and a report destination</h4>
                      <p className="text-sm">A place to store the clean data — usually <a href="https://www.google.com/sheets/about/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Sheets</a>, a database, or your CRM — and a destination for the report, such as a <a href="https://www.google.com/docs/about/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Doc</a>, a dashboard, email, or Slack. This is the <code className="bg-muted px-1 rounded font-mono">sheets_append_row</code> target the prompt calls.</p>
                    </div>
                  </div>

                  <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                    <p className="font-semibold text-foreground mb-1 text-sm">Don&apos;t want to wire up the integrations, model, and schedule yourself?</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Talk to Me Data builds, connects, and hosts this agent for you — the integrations, the model, the Google Sheets or database, the report templates, and the scheduling and monitoring. Nothing to configure or maintain on your side.
                    </p>
                    <Link href="/agents/data-entry-reporting" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                      See the data entry &amp; reporting agent →
                    </Link>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">What You Get Out of It</h2>
                  <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse border-2 border-border rounded-lg text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border border-border p-4 text-left text-foreground font-bold">Before (manual)</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">After (AI agent)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4">Export, copy, and paste between tools by hand</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Data pulled and entered automatically</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4">Reconcile mismatched formats every time</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Cleaned, normalised, and de-duplicated on ingest</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4">Rebuild the same report from scratch weekly</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Report generated on schedule, ready to share</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4">Errors slip through unnoticed</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Anomalies and gaps flagged for review</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4">Numbers are days old and often conflicting</td>
                          <td className="border border-border p-4 font-semibold text-foreground">One live, trustworthy source of truth</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Mid-article CTA */}
                  <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="bg-linear-to-r from-primary to-violet-500 px-8 py-5">
                      <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">See it for yourself</p>
                      <h3 className="text-xl font-bold text-white">Watch the agent turn scattered data into a clean, scheduled report.</h3>
                    </div>
                    <div className="bg-white px-8 py-6">
                      <p className="text-foreground mb-5 leading-relaxed text-sm">
                        Prefer to see it before you build anything? Take a look at the data entry and reporting agent pulling live data into one place — or book a free call and we&apos;ll build it around your tools and your reports.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/agents/data-entry-reporting" className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                          <Play className="w-4 h-4" /> See the agent
                        </Link>
                        <Link href="/book-demo" className="inline-flex items-center justify-center gap-2 border border-slate-300 text-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-colors">
                          Book a free call →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Keyword section + CTAs */}
                  <div className="my-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">How to automate data entry and reporting without hiring for it</h2>
                    <p className="mb-6">
                      The goal isn&apos;t to add headcount to move data around — it&apos;s to remove the repetitive work so
                      the people you have can focus on decisions. The AI agent absorbs the exporting, cleaning, entering,
                      and first-draft reporting, and hands your team a live source of truth and a ready-to-share report
                      with the exceptions already flagged. You get faster, more accurate numbers, and your team gets its
                      time back. Want to put a number on the hours you&apos;d reclaim? Try our <Link href="/free-tools/calculator" className="text-primary hover:underline">workflow time savings calculator</Link>.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                      <Link
                        href="/agents/data-entry-reporting"
                        className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all no-underline"
                      >
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">See the agent</p>
                          <h3 className="text-lg font-bold text-foreground mb-1.5">Learn More</h3>
                          <p className="text-sm text-muted-foreground">See exactly how the AI data entry and reporting agent works, what it connects to, and how we build it around your stack.</p>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                          Explore the reporting agent →
                        </span>
                      </Link>
                      <Link
                        href="/get-started"
                        className="group flex flex-col justify-between rounded-2xl bg-linear-to-br from-primary to-violet-500 p-6 shadow-sm hover:opacity-95 transition-opacity no-underline"
                      >
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">Ready to go</p>
                          <h3 className="text-lg font-bold text-white mb-1.5">Get Started</h3>
                          <p className="text-sm text-white/80">Tell us your tools and the reports you need and we&apos;ll build, connect, and host your data agent — live in days.</p>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                          Start now →
                        </span>
                      </Link>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Frequently Asked Questions</h2>
                </div>
              </div>

              {/* FAQ */}
              <div className="my-6">
                <FAQ />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Summary</h2>
                  <p>
                    Automating data entry and reporting used to mean brittle import scripts and a human babysitting every
                    spreadsheet. An AI agent changes that. It pulls data from your tools, cleans and structures it, keeps
                    one trustworthy source of truth, and turns it into a ready-to-share report on a schedule — with
                    anomalies and gaps flagged for a human instead of buried in the numbers.
                  </p>
                  <p>
                    The prompt above is ready to use. Connect a capable model, your data sources, and a Google Sheet, drop
                    the prompt in, and let the collecting, entering, and reporting run themselves. If you&apos;d rather
                    skip the setup entirely, we build, connect, and host the whole thing for you.
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
                      <h3 className="text-2xl font-bold text-white mb-3">Want the data entry &amp; reporting agent built for your business?</h3>
                      <p className="text-white/80 mb-6 leading-relaxed max-w-xl text-sm">
                        We build, deploy, and host AI agents connected to your spreadsheets, CRM, ad accounts, and payment tools. Book a free 20-minute call, or start building yours now.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/get-started" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
                          Get started →
                        </Link>
                        <Link href="/book-demo" className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/10 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm">
                          Book a free call
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-5">Related reading</h3>
                <div className="space-y-3">
                  <Link href="/agents/data-entry-reporting" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">The Data Entry &amp; Reporting AI Agent — built, hosted &amp; managed</span>
                  </Link>
                  <Link href="/blog/how-to-automate-customer-service-with-ai-agent" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">How to Automate Customer Service With an AI Agent</span>
                  </Link>
                  <Link href="/blog/how-to-automate-invoices-into-accounting-software" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">How to Automate Invoices Into Your Accounting Software</span>
                  </Link>
                  <Link href="/blog/what-are-ai-agents" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">What Are AI Agents? A Plain-English Guide for Business Owners</span>
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
