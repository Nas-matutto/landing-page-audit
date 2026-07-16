"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, Copy, Check, CheckCircle2, ChevronDown, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const AGENT_PROMPT = `You turn a photographed paper invoice into a QuickBooks invoice. The user uploads an image with their message.

STEP 1 - READ THE IMAGE
Extract: the customer/client name, invoice date, due date if shown, and every line item (description, quantity, unit price).

STEP 2 - CREATE THE INVOICE
Call quickbooks_create_invoice with the customer name and the line items (description, quantity, unit_price), plus invoice_date/due_date if present.

STEP 3 - CONFIRM
Report the new QuickBooks invoice number, the total, and the view link. If anything on the invoice was unclear, say what you assumed.`

const faqs = [
  {
    q: "Which accounting software does the AI invoice agent work with?",
    a: "We used QuickBooks in this guide because it's the most popular choice among small and mid-sized businesses, but the agent is software-agnostic. The same approach works with Xero, Sage, Zoho Books, NetSuite, FreshBooks, and most other accounting or ERP systems.",
  },
  {
    q: "What invoice formats can it read?",
    a: "PDF invoices, scanned documents, and photographs taken on a phone. The agent reads structured and unstructured layouts, so your vendors don't need to send invoices in any particular template.",
  },
  {
    q: "Does it extract line items or just the total?",
    a: "It extracts everything the invoice contains: vendor or customer name, invoice date, due date, and every individual line item with its description, quantity, and unit price - then it recalculates and verifies the total before syncing.",
  },
  {
    q: "How accurate is the data extraction?",
    a: "Modern vision-capable models read typed invoices with very high accuracy. The agent is also instructed to flag anything ambiguous and state the assumptions it made, so a human can review edge cases instead of silent errors slipping through.",
  },
  {
    q: "Can Talk to Me Data build and host this agent for me?",
    a: "Yes. We build, connect, and host the agent on our infrastructure - including the QuickBooks (or other accounting) integration, the model access, and monitoring, so there are no API keys or setup on your side. Book a demo and we'll get you onboarded.",
  },
  {
    q: "Is this different from the OCR built into my accounting tool?",
    a: "Yes. Traditional OCR reads text but doesn't understand it, so it struggles with varied layouts and rarely maps fields correctly on its own. An AI agent reads the invoice, understands which value is the quantity versus the unit price versus the total, matches the vendor, and takes the action of creating the record - end to end.",
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
        body: JSON.stringify({ email, source: "prompt_invoice_agent" }),
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

export default function AutomateInvoicesPage() {
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
                  How to Automate Invoices Into Your Accounting Software (With the Exact Prompt)
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>July 10, 2026</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>9 min read</span></div>
                </div>
              </div>

              {/* Hero image */}
              <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200">
                <Image
                  src="/Invoice_AI_Agent.png"
                  alt="AI invoice agent scanning a PDF invoice and auto-populating the data into QuickBooks"
                  width={1200}
                  height={630}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  <p>
                    Every business receives invoices, and almost every business still types them in by hand. Someone opens the PDF, reads the vendor name, copies each line item, retypes the quantities and prices into <a href="https://quickbooks.intuit.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">QuickBooks</a>, double-checks the total, and moves on to the next one. It's slow, it's repetitive, and it's exactly the kind of work that quietly eats hours out of every week.
                  </p>
                  <p>
                    This guide shows you how to automate that entire flow with an AI agent. You upload or forward an invoice, the agent reads it, extracts the vendor, line items, dates, and pricing, and creates the record directly in your accounting software - no manual data entry. We use QuickBooks throughout because it's the most popular choice, but the same agent fits <a href="https://www.xero.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Xero</a>, <a href="https://www.sage.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Sage</a>, Zoho Books, NetSuite, and virtually any other tool.
                  </p>

                  {/* TL;DR */}
                  <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                    <h3 className="text-xl font-bold text-foreground mb-3">TL;DR</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground">
                      <li>The agent reads a PDF or photographed invoice using a vision-capable model like <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a></li>
                      <li>It extracts the vendor/customer name, invoice date, due date, and every line item (description, quantity, unit price)</li>
                      <li>It calls your accounting software's API to create the invoice automatically</li>
                      <li>It confirms back the new invoice number, the total, and a link to view it</li>
                      <li>We use <strong>QuickBooks</strong> as the example, but it works with any accounting or ERP system</li>
                      <li>The full agent prompt is included below - ready to copy</li>
                    </ul>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Problem With Manual Invoice Entry</h2>
                  <p>
                    Manual invoice processing isn't just slow, it's error-prone in ways that cost real money. A transposed digit turns $1,730 into $1,370. A missed line item understates a bill. A due date typed wrong triggers a late fee or an early payment. And because the work is boring, it's often the first thing that gets deferred, which is how finance teams end up with a backlog of unentered invoices at month-end.
                  </p>
                  <p>
                    The traditional fix is OCR (optical character recognition), but OCR only reads text, it doesn't understand it. It can pull the characters off the page, but it can't reliably tell which number is the quantity, which is the unit price, and which is the line total, especially when every vendor uses a different layout. That's why so much "automated" invoice software still needs a human to map fields and correct mistakes.
                  </p>
                  <p>
                    An AI agent closes that gap. It reads the invoice the way a person would, understands what each value means, and then <em>takes the action</em> of creating the record in your accounting software. Reading plus understanding plus doing, end to end. If you're new to the concept, our guide on <Link href="/blog/what-are-ai-agents" className="text-primary hover:underline">what AI agents actually are</Link> is a good primer.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How the Invoice Agent Works</h2>
                  <p>
                    The agent that powers <Link href="/agents/invoice-processing" className="text-primary hover:underline">Talk to Me Data's invoice processing</Link> follows three simple steps. The screenshot at the top of this article shows it in action: a PDF invoice on the left, the agent extracting fields in the middle, and a fully populated QuickBooks invoice on the right, all fields verified.
                  </p>

                  <div className="my-6 space-y-5">
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 1 — Read the invoice</h4>
                      <p className="text-sm">You upload the invoice image or PDF (or forward it to a dedicated inbox). The agent reads it and extracts the customer or vendor name, the invoice date, the due date if present, and every line item with its description, quantity, and unit price. Because it uses a vision-capable model, it handles typed PDFs, scans, and phone photos alike, regardless of the vendor's layout.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 2 — Create the invoice</h4>
                      <p className="text-sm">The agent calls your accounting software's "create invoice" action, passing the customer name and the structured line items, plus the invoice and due dates. In our example that action is <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">quickbooks_create_invoice</code>, but the equivalent exists for Xero, Sage, Zoho, and others. The record is created natively in your system, exactly as if a person had typed it.</p>
                    </div>
                    <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
                      <h4 className="text-base font-bold text-foreground mb-2">Step 3 — Confirm and verify</h4>
                      <p className="text-sm">The agent reports back the new invoice number, the calculated total, and a link to view it in your accounting tool. Crucially, if anything on the invoice was unclear or ambiguous, it says what it assumed, so you get a clean audit trail and a chance to review edge cases instead of silent errors.</p>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Why QuickBooks - and Why It Doesn&apos;t Matter</h2>
                  <p>
                    We built the example around <a href="https://quickbooks.intuit.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">QuickBooks</a> because it's the accounting software most small and mid-sized businesses already run, so the fewest people have to translate the steps. But nothing about the approach is QuickBooks-specific.
                  </p>
                  <p>
                    The agent's job is always the same: read the invoice, structure the data, and call a "create invoice" action. The only thing that changes between platforms is that final integration. Swap <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">quickbooks_create_invoice</code> for your platform's equivalent and everything else in the prompt stays identical. That's why the same agent comfortably serves teams on QuickBooks, Xero, Sage, Zoho Books, FreshBooks, or a full ERP like NetSuite.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Prompt</h2>
                  <p>
                    Here's the exact prompt behind the agent. Paste it into your AI agent orchestration interface, whether that's Talk to Me Data or a Claude Project with your accounting integration connected. If you're using a different accounting tool, replace the QuickBooks action name in Step 2 with your platform's create-invoice action.
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
                      <h4 className="font-bold text-foreground mb-1">A vision-capable model</h4>
                      <p className="text-sm">The agent needs a model that can read images, such as <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> with tool use enabled. This is what lets it read a PDF or photographed invoice rather than needing clean, pre-typed text.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">Your accounting software's API access</h4>
                      <p className="text-sm">A connection to <a href="https://quickbooks.intuit.com/app/apps/appdetails" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">QuickBooks</a> (or your platform) so the agent can create invoices. This is the integration that exposes the <code className="bg-muted px-1 rounded font-mono">create_invoice</code> action the prompt calls.</p>
                    </div>
                    <div className="border border-border rounded-xl p-5">
                      <h4 className="font-bold text-foreground mb-1">A way to send invoices in</h4>
                      <p className="text-sm">Either upload images directly in the chat, or wire up a dedicated email inbox so forwarding an invoice triggers the agent automatically. The second option is what most finance teams end up using day to day.</p>
                    </div>
                  </div>

                  <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                    <p className="font-semibold text-foreground mb-1 text-sm">Don&apos;t want to wire up API keys and integrations yourself?</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Talk to Me Data builds, connects, and hosts this agent for you - including the QuickBooks (or other accounting) integration, model access, and monitoring. Nothing to configure or maintain on your side.
                    </p>
                    <Link href="/agents/invoice-processing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                      See the invoice processing agent →
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
                          <td className="border border-border p-4">Open each PDF and read it by hand</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Agent reads any format automatically</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4">Retype vendor, dates, and every line item</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Fields extracted and structured instantly</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4">Manually create the record in QuickBooks</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Invoice created via API, natively</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4">Re-check the total, hope you didn&apos;t fat-finger it</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Total recalculated and verified, assumptions flagged</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4">Minutes per invoice, backlog at month-end</td>
                          <td className="border border-border p-4 font-semibold text-foreground">Seconds per invoice, no backlog</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Mid-article CTA */}
                  <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <div className="bg-linear-to-r from-primary to-violet-500 px-8 py-5">
                      <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">See it for yourself</p>
                      <h3 className="text-xl font-bold text-white">Watch the invoice agent turn a PDF into a QuickBooks invoice.</h3>
                    </div>
                    <div className="bg-white px-8 py-6">
                      <p className="text-foreground mb-5 leading-relaxed text-sm">
                        Prefer to see it before you build anything? Watch a short demo of the agent scanning an invoice and populating the accounting software in seconds — or book a free call and we&apos;ll build it for your stack.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/agents/invoice-processing" className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                          <Play className="w-4 h-4" /> Watch the demo
                        </Link>
                        <Link href="/book-demo" className="inline-flex items-center justify-center gap-2 border border-slate-300 text-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-colors">
                          Book a free call →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-step video */}
                  <div className="my-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Watch the step-by-step guide</h2>
                    <p className="mb-5">
                      Prefer to follow along? This short walkthrough shows the invoice agent reading a PDF and creating the record in the accounting software, end to end.
                    </p>
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src="https://www.youtube.com/embed/TdBnadO2BJU"
                        title="How to automate invoices into your accounting software — step-by-step guide"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
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
                    Automating invoices into your accounting software used to mean brittle OCR and a human babysitting every mapping. An AI agent changes that. It reads the invoice, understands the vendor, dates, and line items, creates the record in QuickBooks (or any other tool), and confirms the result, flagging anything it wasn&apos;t sure about.
                  </p>
                  <p>
                    The prompt above is ready to use. Connect a vision-capable model and your accounting integration, drop the prompt in, and start forwarding invoices. If you&apos;d rather skip the setup entirely, we build, connect, and host the whole thing for you.
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
                      <h3 className="text-2xl font-bold text-white mb-3">Want the invoice agent built for your business?</h3>
                      <p className="text-white/80 mb-6 leading-relaxed max-w-xl text-sm">
                        We build, deploy, and host AI agents connected to QuickBooks, Xero, Sage, and any other accounting software. Book a free 20-minute call, or watch a quick demo first.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/book-demo" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
                          Book a free call →
                        </Link>
                        <Link href="/agents/invoice-processing" className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/10 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm">
                          <Play className="w-4 h-4" /> Watch a demo
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
                  <Link href="/agents/invoice-processing" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">The Invoice Processing AI Agent — built, hosted &amp; managed</span>
                  </Link>
                  <Link href="/blog/ai-agents-for-small-business" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">AI Agents for Small Business: Automating Operations Without a Tech Team</span>
                  </Link>
                  <Link href="/blog/what-are-ai-agents" className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/3 transition-all">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">What Are AI Agents? A Plain-English Guide for Business Owners</span>
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
