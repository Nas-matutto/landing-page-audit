"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, Copy, Check, CheckCircle2, ChevronDown, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const AGENT_PROMPT = `You are the front-line customer support agent in the chat bubble on [Company]'s website. You answer common questions instantly, and for anything you can't fully resolve you log a clean, ranked ticket with a recommended solution for the human team.

STEP 1 - UNDERSTAND & CATEGORISE
Read the customer's message. Sort it into one category: Order status, Returns & refunds, Billing, Technical issue, Product question, or Other. Detect the sentiment (calm, frustrated, angry) and note whether this looks like a high-value or at-risk customer if that's knowable.

STEP 2 - RESOLVE OR CAPTURE
If it's a common question you can answer from the knowledge base, answer it directly, warmly, and concisely. If it needs a human, account access, or an action you can't take, collect the details the team will need (order number, email, a one-line summary) so nobody has to ask the customer twice.

STEP 3 - LOG TO THE SHEET
Call sheets_append_row to add the request to the support queue with: timestamp, customer email, category, one-line summary, the full message, sentiment, and a priority score from 1 (low) to 5 (urgent). Score urgency on impact + sentiment + customer value together: an angry paying customer who can't log in is a 5; a general product question is a 1-2.

STEP 4 - RECOMMEND A SOLUTION
For every logged request, draft a recommended resolution for the human agent: the likely cause, a ready-to-send reply, and any action to take (refund, replacement, escalation). Put it in the "Recommended solution" column so a human can approve and send in seconds instead of starting from scratch.

STEP 5 - CONFIRM
Tell the customer what happens next and the expected timeframe. Be warm and concise, and never promise something you can't verify.`

const faqs = [
  {
    q: "Which channels can the AI customer support agent work in?",
    a: "It starts in the chat bubble on your website, where most requests come in, but the same agent works across email, WhatsApp, Instagram DMs, and helpdesk tools like Zendesk or Intercom. The logic - answer, log, rank, recommend - stays identical; only the channel it listens on changes.",
  },
  {
    q: "How does the agent decide which requests are most important?",
    a: "Every request is scored on a 1–5 priority scale using impact, sentiment, and customer value together. A frustrated paying customer who can't log in is a 5; a general product question is a 1–2. Because every ticket lands in Google Sheets with that score, your team works the queue top-down instead of first-in-first-out.",
  },
  {
    q: "Does it reply to customers automatically, or draft answers for a human?",
    a: "Both, and you choose the line. Common, low-risk questions (order status, store hours, return policy) can be answered instantly and autonomously. For anything sensitive - refunds, account changes, angry customers — the agent captures the details, drafts a recommended resolution, and hands it to a human to approve and send.",
  },
  {
    q: "What does it log to Google Sheets?",
    a: "For each request: a timestamp, the customer's email, the category, a one-line summary, the full message, the detected sentiment, a 1–5 priority score, and a drafted recommended solution. That turns a messy inbox into a clean, ranked, actionable support queue your whole team can see.",
  },
  {
    q: "Will an AI agent replace my support team?",
    a: "No — it removes the repetitive volume so your team spends time where it matters. The agent resolves the easy, repetitive tickets and prepares everything else so a human can approve a great answer in seconds. You keep the human judgment on the hard cases and lose the copy-paste busywork.",
  },
  {
    q: "Can Talk to Me Data build and host this agent for me?",
    a: "Yes. We build, connect, and host the agent on our infrastructure - the chat widget, the model, the Google Sheets (or helpdesk) integration, and the monitoring — so there's nothing to configure or maintain on your side. Book a demo and we'll get you onboarded in days.",
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
        body: JSON.stringify({ email, source: "prompt_customer_support_agent" }),
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

export default function AutomateCustomerServicePage() {
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
                  How to Automate Customer Service With an AI Agent (With the Exact Prompt)
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>July 22, 2026</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>10 min read</span></div>
                </div>
              </div>

              {/* Hero image */}
              <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200">
                <Image
                  src="/Customer_support_example.png"
                  alt="AI customer support agent in a website chat bubble triaging requests into a ranked Google Sheet with recommended solutions"
                  width={1200}
                  height={630}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <p>
                    Customer service is the workflow that quietly scales with your business whether you want it to or not. More customers means more &quot;where&apos;s my order?&quot;, more refund requests, more password resets, and more of the same handful of questions answered by hand, one message at a time. The volume is repetitive, the hours are unforgiving, and hiring your way out of it gets expensive fast.
                  </p>
                  <p>
                    This guide shows you how to automate customer service with an AI agent that lives in the chat bubble on your website. It answers the common questions instantly, and for everything else it captures the request, logs it to a <a href="https://www.google.com/sheets/about/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Sheet</a>, ranks it by urgency, and drafts a recommended solution — so your team opens a clean, prioritised queue instead of a chaotic inbox. If you&apos;re new to the idea, our primer on <Link href="/blog/what-are-ai-agents" className="text-primary hover:underline">what AI agents actually are</Link> is a good place to start.
                  </p>

                  {/* TL;DR */}
                  <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                    <h3 className="text-xl font-bold text-foreground mb-3">TL;DR</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground">
                      <li>An AI agent sits in your website chat bubble and handles incoming customer requests 24/7</li>
                      <li>It answers common, low-risk questions instantly using a model like <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a></li>
                      <li>Every request is categorised and logged to a <strong>Google Sheet</strong> support queue</li>
                      <li>Each one is ranked <strong>1–5 by urgency</strong> using impact, sentiment, and customer value</li>
                      <li>The agent drafts a <strong>recommended solution</strong> for each ticket so a human can approve and send in seconds</li>
                      <li>The full agent prompt is included below — ready to copy</li>
                    </ul>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Problem With Manual Customer Support</h2>
                  <p>
                    The pain of manual support isn&apos;t any single ticket — it&apos;s the aggregate. Studies of support teams consistently find that the large majority of incoming tickets are repetitive questions with known answers: order status, returns, billing, resets, hours. Your team retypes those answers all day, which means the genuinely hard problems — the frustrated customer about to churn — wait in the same undifferentiated queue as &quot;what are your opening hours?&quot;.
                  </p>
                  <p>
                    Two things break at once. First, <strong>response time</strong>: when everything is first-in-first-out, urgent issues sit behind trivial ones. Second, <strong>prioritisation</strong>: a human skim-reading an inbox has no consistent way to rank by importance, so triage is guesswork that changes with whoever is on shift. The result is slow replies on the tickets that matter most and burned-out agents doing copy-paste work on the ones that don&apos;t.
                  </p>
                  <p>
                    The usual &quot;fix&quot; - a rigid rules-based chatbot with buttons and decision trees - frustrates customers because it can&apos;t understand a question phrased in a way the script didn&apos;t anticipate. An AI agent is different: it reads the message the way a person would, understands intent and tone, answers what it can, and <em>takes the action</em> of logging, ranking, and drafting a resolution for everything else. For a broader look at how this applies across a business, see our guide on <Link href="/blog/ai-agents-for-small-business" className="text-primary hover:underline">AI agents for small business</Link>.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How the Customer Support Agent Works</h2>
                  <p>
                    The agent behind <Link href="/agents/customer-support" className="text-primary hover:underline">Talk to Me Data&apos;s customer support automation</Link> follows a simple loop every time a message lands in the chat bubble: understand it, resolve or capture it, log and rank it, and draft a recommended solution. Here&apos;s each step.
                  </p>

                  <div className="my-6 space-y-5">
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 1: Understand &amp; categorise</h4>
                      <p className="text-sm">A customer types into the chat bubble on your site. The agent reads the message, sorts it into a category (order status, returns &amp; refunds, billing, technical, product question, or other), and reads the sentiment — calm, frustrated, or angry. This is what a rules-based bot can&apos;t do: it understands a question no matter how it&apos;s phrased.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 2: Resolve or capture</h4>
                      <p className="text-sm">If it&apos;s a common question with a known answer, the agent responds instantly and warmly from your knowledge base — no waiting, any hour of the day. If it needs a human, account access, or an action the agent shouldn&apos;t take on its own, it collects the details the team will need (order number, email, a one-line summary) so the customer never has to repeat themselves.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 3: Log &amp; rank in Google Sheets</h4>
                      <p className="text-sm">The agent appends a row to your support queue in Google Sheets: timestamp, email, category, one-line summary, full message, sentiment, and a priority score from 1 (low) to 5 (urgent). Urgency is scored on impact, sentiment, and customer value together — so an angry paying customer who can&apos;t log in floats to the top and a general product question settles near the bottom.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 4: Draft a recommended solution</h4>
                      <p className="text-sm">For every logged request, the agent writes a recommended resolution into the sheet: the likely cause, a ready-to-send reply, and any action to take (refund, replacement, escalation). Your team opens a queue that&apos;s already sorted by urgency and pre-solved — approve, tweak, send. Minutes of thinking per ticket become seconds of reviewing.</p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Why the Chat Bubble Is the Right Place to Start</h2>
                  <p>
                    You could point this agent at email or a helpdesk like <a href="https://www.zendesk.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Zendesk</a> or <a href="https://www.intercom.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Intercom</a> - and eventually you probably will. But the chat bubble is the highest-leverage place to begin, because it&apos;s where intent is freshest: the customer is on your site, in the moment, with a specific question. Answering there deflects the ticket before it ever becomes an email, and captures the ones that do need a human while the context is still rich.
                  </p>
                  <p>
                    The best part is that the underlying logic doesn&apos;t change when you add channels. Whether the message arrives via chat, email, or <a href="https://business.whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a>, the agent still answers, logs, ranks, and recommends into the same Google Sheet. You build the brain once and plug in new channels over time.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Prompt</h2>
                  <p>
                    Here&apos;s the exact prompt behind the agent. Paste it into your AI agent orchestration interface, whether that&apos;s Talk to Me Data or a <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> project with your chat widget and Google Sheets connected. Swap <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">[Company]</code> for your business name and point <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">sheets_append_row</code> at your support-queue sheet.
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
                      <h4 className="font-bold text-foreground mb-1">A chat widget on your site</h4>
                      <p className="text-sm">The bubble your customers type into. It&apos;s the front door of the agent - the place requests come in and instant answers go out. The same agent can later listen on email, WhatsApp, or a helpdesk, but the website chat is where you get the fastest wins.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">A capable model with your knowledge base</h4>
                      <p className="text-sm">A model like <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> with tool use enabled, grounded in your FAQs, policies, and product docs. This is what lets it understand messy, real-world questions and answer them accurately instead of guessing.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">A Google Sheets connection</h4>
                      <p className="text-sm">A link to <a href="https://www.google.com/sheets/about/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Sheets</a> so the agent can append each request to your ranked support queue. This is the shared source of truth your whole team works from - the <code className="bg-muted px-1 rounded font-mono">sheets_append_row</code> action the prompt calls.</p>
                    </div>
                  </div>

                  <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                    <p className="font-semibold text-foreground mb-1 text-sm">Don&apos;t want to wire up the widget, model, and integrations yourself?</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Talk to Me Data builds, connects, and hosts this agent for you — the chat widget, the model, the Google Sheets (or helpdesk) integration, and the monitoring. Nothing to configure or maintain on your side.
                    </p>
                    <Link href="/agents/customer-support" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                      See the customer support agent →
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
                          <td className="border border-border p-4">Answer the same questions by hand, all day</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Common questions answered instantly, 24/7</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4">Tickets worked first-in-first-out</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Queue ranked 1–5 by urgency automatically</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4">Triage is guesswork, varies by who&apos;s on shift</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Consistent scoring on impact + sentiment + value</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4">Every reply written from scratch</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Recommended solution drafted for each ticket</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4">Requests scattered across inbox and DMs</td>
                          <td className="border border-border p-4 font-semibold text-foreground">One clean, shared queue in Google Sheets</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Mid-article CTA */}
                  <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="bg-linear-to-r from-primary to-violet-500 px-8 py-5">
                      <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">See it for yourself</p>
                      <h3 className="text-xl font-bold text-white">Watch the support agent answer, rank, and resolve in real time.</h3>
                    </div>
                    <div className="bg-white px-8 py-6">
                      <p className="text-foreground mb-5 leading-relaxed text-sm">
                        Prefer to see it before you build anything? Take a look at the customer support agent handling live requests — or book a free call and we&apos;ll build it around your stack and your knowledge base.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/agents/customer-support" className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
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
                    <h2 className="text-3xl font-bold text-foreground mb-4">How to automate customer service without losing the human touch</h2>
                    <p className="mb-6">
                      The goal isn&apos;t to remove people from support — it&apos;s to remove the repetitive volume so your people can do the part only they can do. The AI agent absorbs the &quot;where&apos;s my order&quot; and &quot;how do I reset my password&quot; tickets, and for everything harder it hands your team a ranked queue with a recommended solution already drafted. Customers get faster answers, your team gets its time back, and the hardest cases get the human attention they deserve. Want to put a number on the hours you&apos;d reclaim? Try our <Link href="/free-tools/calculator" className="text-primary hover:underline">workflow time savings calculator</Link>.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                      <Link
                        href="/agents/customer-support"
                        className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all no-underline"
                      >
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">See the agent</p>
                          <h3 className="text-lg font-bold text-foreground mb-1.5">Learn More</h3>
                          <p className="text-sm text-muted-foreground">See exactly how the AI customer support agent works, what it connects to, and how we build it around your knowledge base.</p>
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                          Explore the support agent →
                        </span>
                      </Link>
                      <Link
                        href="/get-started"
                        className="group flex flex-col justify-between rounded-2xl bg-linear-to-br from-primary to-violet-500 p-6 shadow-sm hover:opacity-95 transition-opacity no-underline"
                      >
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">Ready to go</p>
                          <h3 className="text-lg font-bold text-white mb-1.5">Get Started</h3>
                          <p className="text-sm text-white/80">Tell us your channels and knowledge base and we&apos;ll build, connect, and host your support agent — live in days.</p>
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
                    Automating customer service used to mean a rigid chatbot that annoyed customers and a support inbox no one could prioritise. An AI agent changes both. It lives in your chat bubble, answers the common questions instantly, and for everything else it logs the request to Google Sheets, ranks it by urgency, and drafts a recommended solution — turning a chaotic inbox into a clean, prioritised, pre-solved queue.
                  </p>
                  <p>
                    The prompt above is ready to use. Connect a capable model, your chat widget, and a Google Sheet, drop the prompt in, and start deflecting and triaging support automatically. If you&apos;d rather skip the setup entirely, we build, connect, and host the whole thing for you.
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
                      <h3 className="text-2xl font-bold text-white mb-3">Want the customer support agent built for your business?</h3>
                      <p className="text-white/80 mb-6 leading-relaxed max-w-xl text-sm">
                        We build, deploy, and host AI agents connected to your chat widget, Google Sheets, and helpdesk tools like Zendesk and Intercom. Book a free 20-minute call, or start building yours now.
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
                  <Link href="/agents/customer-support" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">The Customer Support AI Agent — built, hosted &amp; managed</span>
                  </Link>
                  <Link href="/blog/what-are-ai-agents" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">What Are AI Agents? A Plain-English Guide for Business Owners</span>
                  </Link>
                  <Link href="/blog/ai-agents-for-small-business" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">AI Agents for Small Business: Automating Operations Without a Tech Team</span>
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
