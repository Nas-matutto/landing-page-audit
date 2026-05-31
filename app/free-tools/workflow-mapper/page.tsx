"use client"

import { useRef, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, CheckCircle2, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

const AUTOMATABLE_KEYWORDS = [
  "email", "send", "notify", "notification", "ping", "message", "slack", "teams",
  "log", "record", "update", "enter", "save", "create", "add", "post",
  "schedule", "calendar", "book", "remind", "reminder",
  "notion", "hubspot", "salesforce", "airtable", "crm", "pipedrive", "zoho",
  "copy", "sync", "assign", "tag", "move", "file", "archive",
  "generate", "report", "export", "import", "download", "upload",
  "invoice", "charge", "payment", "receipt",
  "forward", "route", "escalate", "transfer",
  "respond", "reply", "draft",
  "score", "qualify", "filter", "sort",
  "zapier", "make", "integromat", "webhook", "api",
]

function isAutomatable(step: string): boolean {
  const lower = step.toLowerCase()
  return AUTOMATABLE_KEYWORDS.some(kw => lower.includes(kw))
}

interface Step {
  id: string
  text: string
}

type Phase = "form" | "diagram"

// Canvas dimensions
const CANVAS_W = 640
const NODE_W = 480
const NODE_H = 72
const ARROW_H = 36
const PAD_TOP = 32
const PAD_BOTTOM = 32
const PAD_X = (CANVAS_W - NODE_W) / 2

function nodeY(index: number): number {
  return PAD_TOP + index * (NODE_H + ARROW_H)
}

function totalCanvasHeight(stepCount: number): number {
  // trigger + steps + output = stepCount + 2 total nodes
  return PAD_TOP + (stepCount + 2) * (NODE_H + ARROW_H) - ARROW_H + PAD_BOTTOM
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function drawArrow(ctx: CanvasRenderingContext2D, fromY: number) {
  const x = CANVAS_W / 2
  const y1 = fromY + NODE_H
  const y2 = fromY + NODE_H + ARROW_H

  ctx.strokeStyle = "#cbd5e1"
  ctx.lineWidth = 1.5
  ctx.setLineDash([])
  ctx.beginPath()
  ctx.moveTo(x, y1)
  ctx.lineTo(x, y2 - 8)
  ctx.stroke()

  // Arrowhead
  ctx.fillStyle = "#cbd5e1"
  ctx.beginPath()
  ctx.moveTo(x - 5, y2 - 8)
  ctx.lineTo(x + 5, y2 - 8)
  ctx.lineTo(x, y2)
  ctx.closePath()
  ctx.fill()
}

function drawNode(
  ctx: CanvasRenderingContext2D,
  y: number,
  label: string,
  type: "trigger" | "automatable" | "manual" | "output"
) {
  const x = PAD_X

  if (type === "trigger") {
    // Filled blue
    ctx.fillStyle = "#185FA5"
    roundRect(ctx, x, y, NODE_W, NODE_H, 10)
    ctx.fill()

    // Badge
    const badgeText = "✦ Trigger"
    ctx.font = "600 10px system-ui, sans-serif"
    const bw = ctx.measureText(badgeText).width + 16
    const bx = x + NODE_W - bw - 12
    const by = y + 12
    ctx.fillStyle = "rgba(255,255,255,0.18)"
    roundRect(ctx, bx, by, bw, 18, 9)
    ctx.fill()
    ctx.fillStyle = "#fff"
    ctx.fillText(badgeText, bx + 8, by + 13)

    // Label
    ctx.fillStyle = "#fff"
    ctx.font = "600 13px system-ui, sans-serif"
    ctx.fillText(label, x + 16, y + NODE_H / 2 + 5)

  } else if (type === "output") {
    // Dark fill
    ctx.fillStyle = "#0f172a"
    roundRect(ctx, x, y, NODE_W, NODE_H, 10)
    ctx.fill()

    // Badge
    const badgeText = "Output"
    ctx.font = "600 10px system-ui, sans-serif"
    const bw = ctx.measureText(badgeText).width + 16
    const bx = x + NODE_W - bw - 12
    const by = y + 12
    ctx.fillStyle = "rgba(255,255,255,0.15)"
    roundRect(ctx, bx, by, bw, 18, 9)
    ctx.fill()
    ctx.fillStyle = "#fff"
    ctx.fillText(badgeText, bx + 8, by + 13)

    ctx.fillStyle = "#fff"
    ctx.font = "600 13px system-ui, sans-serif"
    ctx.fillText(label, x + 16, y + NODE_H / 2 + 5)

  } else if (type === "automatable") {
    // Light blue fill + blue border
    ctx.fillStyle = "#eff6ff"
    roundRect(ctx, x, y, NODE_W, NODE_H, 10)
    ctx.fill()
    ctx.strokeStyle = "#185FA5"
    ctx.lineWidth = 1.5
    ctx.setLineDash([])
    roundRect(ctx, x, y, NODE_W, NODE_H, 10)
    ctx.stroke()

    // Badge
    const badgeText = "✦ Automatable"
    ctx.font = "600 10px system-ui, sans-serif"
    const bw = ctx.measureText(badgeText).width + 16
    const bx = x + NODE_W - bw - 12
    const by = y + 12
    ctx.fillStyle = "#185FA5"
    roundRect(ctx, bx, by, bw, 18, 9)
    ctx.fill()
    ctx.fillStyle = "#fff"
    ctx.fillText(badgeText, bx + 8, by + 13)

    ctx.fillStyle = "#185FA5"
    ctx.font = "600 13px system-ui, sans-serif"
    ctx.fillText(label, x + 16, y + NODE_H / 2 + 5)

  } else {
    // Manual: light grey + grey border dashed
    ctx.fillStyle = "#f8fafc"
    roundRect(ctx, x, y, NODE_W, NODE_H, 10)
    ctx.fill()
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1.5
    ctx.setLineDash([4, 3])
    roundRect(ctx, x, y, NODE_W, NODE_H, 10)
    ctx.stroke()
    ctx.setLineDash([])

    // Badge
    const badgeText = "Manual step"
    ctx.font = "600 10px system-ui, sans-serif"
    const bw = ctx.measureText(badgeText).width + 16
    const bx = x + NODE_W - bw - 12
    const by = y + 12
    ctx.fillStyle = "#e2e8f0"
    roundRect(ctx, bx, by, bw, 18, 9)
    ctx.fill()
    ctx.fillStyle = "#64748b"
    ctx.fillText(badgeText, bx + 8, by + 13)

    ctx.fillStyle = "#334155"
    ctx.font = "600 13px system-ui, sans-serif"
    ctx.fillText(label, x + 16, y + NODE_H / 2 + 5)
  }
}

function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen - 1) + "…" : text
}

export default function WorkflowMapperPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [trigger, setTrigger] = useState("")
  const [steps, setSteps] = useState<Step[]>([{ id: "s1", text: "" }])
  const [output, setOutput] = useState("")
  const [phase, setPhase] = useState<Phase>("form")
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  const canMap = trigger.trim().length > 0 && steps.some(s => s.text.trim().length > 0) && output.trim().length > 0

  const addStep = () => {
    if (steps.length >= 10) return
    setSteps(prev => [...prev, { id: `s${Date.now()}`, text: "" }])
  }

  const removeStep = (id: string) => {
    setSteps(prev => prev.filter(s => s.id !== id))
  }

  const updateStep = (id: string, text: string) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, text } : s))
  }

  const filledSteps = steps.filter(s => s.text.trim().length > 0)
  const automatableCount = filledSteps.filter(s => isAutomatable(s.text)).length

  const drawDiagram = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const totalNodes = filledSteps.length + 2 // trigger + steps + output
    canvas.width = CANVAS_W
    canvas.height = totalCanvasHeight(filledSteps.length)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Trigger
    drawNode(ctx, nodeY(0), truncate(trigger.trim(), 55), "trigger")

    // Steps
    filledSteps.forEach((step, i) => {
      drawArrow(ctx, nodeY(i))
      const type = isAutomatable(step.text) ? "automatable" : "manual"
      drawNode(ctx, nodeY(i + 1), truncate(step.text, 55), type)
    })

    // Output
    drawArrow(ctx, nodeY(filledSteps.length))
    drawNode(ctx, nodeY(filledSteps.length + 1), truncate(output.trim(), 55), "output")

    // Watermark
    ctx.fillStyle = "#cbd5e1"
    ctx.font = "11px system-ui, sans-serif"
    ctx.fillText("talktomedata.com", CANVAS_W - 130, canvas.height - 10)
  }

  const handleMap = () => {
    if (!canMap) return
    setPhase("diagram")
    // Draw after state update + canvas mount
    setTimeout(drawDiagram, 50)
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = url
    a.download = "workflow-diagram.png"
    a.click()
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setEmailLoading(true)
    try {
      await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "workflow_mapper",
          tasks: filledSteps.map(s => s.text),
        }),
      })
    } finally {
      setEmailSubmitted(true)
      setEmailLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 sm:pt-40 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/free-tools" className="hover:text-slate-600 transition-colors">Free Tools</Link>
            <span>/</span>
            <span className="text-slate-600">Workflow Mapper</span>
          </div>

          {/* Card */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

            {/* Card header */}
            <div
              className="px-8 py-6"
              style={{ background: "linear-gradient(135deg, #0D9488, #0891b2, #2563eb)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Tool 02</p>
                  <h1 className="text-xl font-bold text-white">Agent Workflow Mapper</h1>
                </div>
              </div>
              <p className="text-white/80 text-sm mt-3 max-w-lg">
                Describe your workflow — trigger, steps, and expected output. We'll render a diagram showing exactly which steps an AI agent can handle automatically.
              </p>
            </div>

            <div className="p-8">
              {phase === "form" ? (
                <div className="space-y-8">

                  {/* Trigger */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      1. What triggers this workflow?
                    </label>
                    <p className="text-xs text-slate-400 mb-3">e.g. "A new lead comes in on HubSpot", "I receive a support email"</p>
                    <input
                      type="text"
                      value={trigger}
                      onChange={e => setTrigger(e.target.value)}
                      placeholder="When I receive a new lead in HubSpot…"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Steps */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">
                      2. What are the steps in your workflow?
                    </label>
                    <p className="text-xs text-slate-400 mb-3">
                      Add each manual step in order. The tool will label which ones an agent can automate.
                    </p>
                    <div className="space-y-2">
                      {steps.map((step, i) => (
                        <div key={step.id} className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-mono w-5 shrink-0 text-right">{i + 1}.</span>
                          <input
                            type="text"
                            value={step.text}
                            onChange={e => updateStep(step.id, e.target.value)}
                            placeholder={`Step ${i + 1} — e.g. "Send welcome email", "Log in Notion"`}
                            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                          {steps.length > 1 && (
                            <button
                              onClick={() => removeStep(step.id)}
                              className="text-slate-300 hover:text-red-400 transition-colors cursor-pointer shrink-0"
                              aria-label="Remove step"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {steps.length < 10 && (
                      <button
                        onClick={addStep}
                        className="mt-3 flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Add step
                      </button>
                    )}
                  </div>

                  {/* Output */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">
                      3. What's the expected output or result?
                    </label>
                    <p className="text-xs text-slate-400 mb-3">e.g. "Lead is qualified and meeting is booked", "Support ticket is resolved"</p>
                    <input
                      type="text"
                      value={output}
                      onChange={e => setOutput(e.target.value)}
                      placeholder="Lead is qualified and routed to sales…"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Map button */}
                  <div>
                    <button
                      onClick={handleMap}
                      disabled={!canMap}
                      className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                        canMap
                          ? "bg-linear-to-r from-primary to-violet-500 text-white hover:opacity-90 cursor-pointer"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      Map my workflow <ArrowRight className="w-4 h-4" />
                    </button>
                    {!canMap && (
                      <p className="text-xs text-slate-400 mt-2">
                        Fill in the trigger, at least one step, and the output to continue.
                      </p>
                    )}
                  </div>
                </div>

              ) : (
                <div className="space-y-8">

                  {/* Results header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">Your workflow diagram</span>
                    </div>
                    <button
                      onClick={() => setPhase("form")}
                      className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
                    >
                      ← Edit workflow
                    </button>
                  </div>

                  {/* Summary badge row */}
                  {automatableCount > 0 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4">
                      <p className="text-sm text-slate-700">
                        <span className="font-bold text-primary">{automatableCount} of {filledSteps.length} step{filledSteps.length !== 1 ? "s" : ""}</span>{" "}
                        in your workflow can be automated by an AI agent — saving you the manual work every time this workflow runs.
                      </p>
                    </div>
                  )}

                  {/* Canvas */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                    <canvas
                      ref={canvasRef}
                      className="block mx-auto"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>

                  {/* Download button */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:border-slate-300 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Download as PNG
                    </button>
                    <p className="text-xs text-slate-400">
                      Share with your team or save for later.
                    </p>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-[#185FA5] inline-block" />
                      Trigger / Output
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-[#eff6ff] border border-[#185FA5] inline-block" />
                      Automatable step
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-[#f8fafc] border border-slate-200 inline-block" />
                      Manual step
                    </div>
                  </div>

                  {/* Email capture */}
                  <div className="border border-primary/20 bg-primary/5 rounded-xl p-6">
                    {!emailSubmitted ? (
                      <>
                        <h3 className="text-base font-bold text-slate-900 mb-1">
                          Want us to build this workflow for you?
                        </h3>
                        <p className="text-sm text-slate-500 mb-5">
                          Share your email and we'll send you a quote for automating your exact workflow — no obligation.
                        </p>
                        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            placeholder="your@email.com"
                            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                          <button
                            type="submit"
                            disabled={emailLoading}
                            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-primary to-violet-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60 shrink-0"
                          >
                            {emailLoading ? "Sending…" : "Get a quote →"}
                          </button>
                        </form>
                        <p className="text-xs text-slate-400 mt-3">No spam. Unsubscribe anytime.</p>
                      </>
                    ) : (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Got it — we'll be in touch.</p>
                          <p className="text-sm text-slate-500 mt-0.5">
                            We'll review your workflow and send a quote to <strong>{email}</strong>.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Book demo CTA */}
                  <div
                    className="rounded-2xl px-8 py-8"
                    style={{ background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)" }}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      Ready to automate this workflow?
                    </h3>
                    <p className="text-white/80 text-sm mb-5 max-w-lg">
                      We build, deploy, and host custom AI agents. Book a free call and we'll show you exactly how to run this workflow on autopilot — live in days.
                    </p>
                    <Link
                      href="/book-demo"
                      className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
                    >
                      Book a free call <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
