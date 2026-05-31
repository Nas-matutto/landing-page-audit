"use client"

import { useRef, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, CheckCircle2, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

// ─── Automatable keyword heuristic ───────────────────────────────────────────

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

// ─── Canvas constants ─────────────────────────────────────────────────────────

const CW = 720          // canvas width
const NW = 560          // node width
const NX = (CW - NW) / 2 // node left edge
const NH = 76           // standard node height
const ARROW = 52        // vertical gap between nodes (for the arrow)
const PT = 52           // pad top
const PB = 52           // pad bottom
const CX = CW / 2       // canvas horizontal center

// Rotating palette for automatable steps: [fill-start, fill-end, text]
const AUTO_PALETTE: [string, string][] = [
  ["#2563eb", "#3b82f6"],
  ["#7c3aed", "#8b5cf6"],
  ["#0d9488", "#14b8a6"],
  ["#dc2626", "#ef4444"],
  ["#d97706", "#f59e0b"],
  ["#4f46e5", "#6366f1"],
]

function canvasHeight(stepCount: number): number {
  // trigger + steps + output = stepCount + 2 nodes, stepCount + 1 arrows
  return PT + (stepCount + 2) * NH + (stepCount + 1) * ARROW + PB
}

function nodeTopY(index: number): number {
  // index 0 = trigger, index 1..n = steps, index n+1 = output
  return PT + index * (NH + ARROW)
}

// ─── Canvas helpers ───────────────────────────────────────────────────────────

function pill(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
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

function diamond(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, hw: number, hh: number
) {
  ctx.beginPath()
  ctx.moveTo(cx, cy - hh)
  ctx.lineTo(cx + hw, cy)
  ctx.lineTo(cx, cy + hh)
  ctx.lineTo(cx - hw, cy)
  ctx.closePath()
}

function shadow(ctx: CanvasRenderingContext2D, color: string, blur: number, dy: number) {
  ctx.shadowColor = color
  ctx.shadowBlur = blur
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = dy
}

function noShadow(ctx: CanvasRenderingContext2D) {
  ctx.shadowColor = "transparent"
  ctx.shadowBlur = 0
  ctx.shadowOffsetY = 0
}

function badge(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, text: string,
  bg: string, fg: string
) {
  ctx.font = "600 10px system-ui,sans-serif"
  const tw = ctx.measureText(text).width
  const bw = tw + 16
  const bh = 18
  pill(ctx, x, y, bw, bh, 9)
  ctx.fillStyle = bg
  ctx.fill()
  ctx.fillStyle = fg
  ctx.textAlign = "left"
  ctx.fillText(text, x + 8, y + 13)
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 1) + "…" : text
}

function drawArrow(ctx: CanvasRenderingContext2D, fromY: number, color: string = "#94a3b8") {
  const ay = fromY + NH         // start of arrow gap
  const by = fromY + NH + ARROW // end (top of next node)
  const mid = (ay + by) / 2

  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.setLineDash([])
  ctx.beginPath()
  ctx.moveTo(CX, ay)
  ctx.bezierCurveTo(CX, mid, CX, mid, CX, by - 10)
  ctx.stroke()

  // Filled arrowhead
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(CX - 7, by - 10)
  ctx.lineTo(CX + 7, by - 10)
  ctx.lineTo(CX, by)
  ctx.closePath()
  ctx.fill()
}

// ─── Node drawing ─────────────────────────────────────────────────────────────

function drawTrigger(ctx: CanvasRenderingContext2D, y: number, text: string) {
  const x = NX

  shadow(ctx, "rgba(24,95,165,0.28)", 18, 6)
  const grad = ctx.createLinearGradient(x, y, x + NW, y + NH)
  grad.addColorStop(0, "#185FA5")
  grad.addColorStop(1, "#2563eb")
  pill(ctx, x, y, NW, NH, NH / 2)
  ctx.fillStyle = grad
  ctx.fill()
  noShadow(ctx)

  // Left icon circle
  const iconR = 22
  const iconCX = x + iconR + 14
  const iconCY = y + NH / 2
  ctx.fillStyle = "rgba(255,255,255,0.18)"
  ctx.beginPath()
  ctx.arc(iconCX, iconCY, iconR, 0, Math.PI * 2)
  ctx.fill()

  // Lightning bolt icon (simple polygon)
  ctx.fillStyle = "#fff"
  ctx.beginPath()
  ctx.moveTo(iconCX + 2, iconCY - 10)
  ctx.lineTo(iconCX - 4, iconCY + 2)
  ctx.lineTo(iconCX + 2, iconCY + 2)
  ctx.lineTo(iconCX - 2, iconCY + 11)
  ctx.lineTo(iconCX + 5, iconCY - 1)
  ctx.lineTo(iconCX - 1, iconCY - 1)
  ctx.closePath()
  ctx.fill()

  // Text
  ctx.fillStyle = "#fff"
  ctx.font = "600 13px system-ui,sans-serif"
  ctx.textAlign = "left"
  ctx.fillText(truncate(text, 46), x + iconR * 2 + 24, y + NH / 2 + 5)

  // Badge
  badge(ctx, x + NW - 76, y + 13, "⚡ Trigger", "rgba(255,255,255,0.22)", "#fff")
}

function drawAutoStep(
  ctx: CanvasRenderingContext2D, y: number,
  text: string, num: number, colorIdx: number
) {
  const x = NX
  const [c1, c2] = AUTO_PALETTE[colorIdx % AUTO_PALETTE.length]

  shadow(ctx, `${c1}55`, 16, 5)
  const grad = ctx.createLinearGradient(x, y, x + NW, y)
  grad.addColorStop(0, c1)
  grad.addColorStop(1, c2)
  pill(ctx, x, y, NW, NH, 14)
  ctx.fillStyle = grad
  ctx.fill()
  noShadow(ctx)

  // Step number circle
  const numCX = x + 28
  const numCY = y + NH / 2
  ctx.fillStyle = "rgba(255,255,255,0.22)"
  ctx.beginPath()
  ctx.arc(numCX, numCY, 16, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = "#fff"
  ctx.font = "bold 13px system-ui,sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(String(num), numCX, numCY + 5)

  // Text
  ctx.fillStyle = "#fff"
  ctx.font = "600 13px system-ui,sans-serif"
  ctx.textAlign = "left"
  ctx.fillText(truncate(text, 46), x + 56, y + NH / 2 + 5)

  // Badge
  badge(ctx, x + NW - 104, y + 13, "✦ Automatable", "rgba(255,255,255,0.24)", "#fff")
}

function drawManualStep(
  ctx: CanvasRenderingContext2D, y: number,
  text: string, num: number
) {
  const x = NX

  shadow(ctx, "rgba(0,0,0,0.06)", 10, 3)
  pill(ctx, x, y, NW, NH, 14)
  ctx.fillStyle = "#f8fafc"
  ctx.fill()
  noShadow(ctx)

  ctx.strokeStyle = "#cbd5e1"
  ctx.lineWidth = 2
  ctx.setLineDash([6, 4])
  pill(ctx, x, y, NW, NH, 14)
  ctx.stroke()
  ctx.setLineDash([])

  // Step number circle
  const numCX = x + 28
  const numCY = y + NH / 2
  ctx.fillStyle = "#e2e8f0"
  ctx.beginPath()
  ctx.arc(numCX, numCY, 16, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = "#64748b"
  ctx.font = "bold 13px system-ui,sans-serif"
  ctx.textAlign = "center"
  ctx.fillText(String(num), numCX, numCY + 5)

  // Text
  ctx.fillStyle = "#334155"
  ctx.font = "600 13px system-ui,sans-serif"
  ctx.textAlign = "left"
  ctx.fillText(truncate(text, 46), x + 56, y + NH / 2 + 5)

  // Badge
  badge(ctx, x + NW - 76, y + 13, "Manual step", "#e2e8f0", "#64748b")
}

function drawOutput(ctx: CanvasRenderingContext2D, y: number, text: string) {
  const x = NX

  shadow(ctx, "rgba(0,0,0,0.22)", 20, 7)
  pill(ctx, x, y, NW, NH, 14)
  ctx.fillStyle = "#0f172a"
  ctx.fill()
  noShadow(ctx)

  // Inner glow border
  ctx.strokeStyle = "rgba(255,255,255,0.1)"
  ctx.lineWidth = 1.5
  pill(ctx, x + 2, y + 2, NW - 4, NH - 4, 13)
  ctx.stroke()

  // Left diamond shape (UML activity final)
  const dCX = x + 32
  const dCY = y + NH / 2
  diamond(ctx, dCX, dCY, 14, 14)
  ctx.fillStyle = "#334155"
  ctx.fill()
  diamond(ctx, dCX, dCY, 7, 7)
  ctx.fillStyle = "#94a3b8"
  ctx.fill()

  // Text
  ctx.fillStyle = "#e2e8f0"
  ctx.font = "600 13px system-ui,sans-serif"
  ctx.textAlign = "left"
  ctx.fillText(truncate(text, 46), x + 58, y + NH / 2 + 5)

  // Badge
  badge(ctx, x + NW - 68, y + 13, "✓ Output", "rgba(255,255,255,0.1)", "#94a3b8")
}

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, w, h)

  // Dot grid (Excalidraw-ish)
  ctx.fillStyle = "#e2e8f0"
  const spacing = 22
  for (let gx = spacing; gx < w; gx += spacing) {
    for (let gy = spacing; gy < h; gy += spacing) {
      ctx.beginPath()
      ctx.arc(gx, gy, 1.2, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  id: string
  text: string
}

type Phase = "form" | "diagram"

// ─── Component ───────────────────────────────────────────────────────────────

export default function WorkflowMapperPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [trigger, setTrigger] = useState("")
  const [steps, setSteps] = useState<Step[]>([{ id: "s1", text: "" }])
  const [output, setOutput] = useState("")
  const [phase, setPhase] = useState<Phase>("form")
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  const filledSteps = steps.filter(s => s.text.trim().length > 0)
  const canMap = trigger.trim().length > 0 && filledSteps.length > 0 && output.trim().length > 0
  const automatableCount = filledSteps.filter(s => isAutomatable(s.text)).length

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

  const drawDiagram = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const n = filledSteps.length
    const ch = canvasHeight(n)
    canvas.width = CW
    canvas.height = ch

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    drawBackground(ctx, CW, ch)

    // Trigger
    const trigY = nodeTopY(0)
    drawTrigger(ctx, trigY, trigger.trim())
    drawArrow(ctx, trigY, "#185FA5")

    // Steps
    let autoIdx = 0
    filledSteps.forEach((step, i) => {
      const stepY = nodeTopY(i + 1)
      const auto = isAutomatable(step.text)

      if (auto) {
        drawAutoStep(ctx, stepY, step.text, i + 1, autoIdx)
        autoIdx++
      } else {
        drawManualStep(ctx, stepY, step.text, i + 1)
      }

      drawArrow(ctx, stepY, auto ? AUTO_PALETTE[Math.max(autoIdx - 1, 0) % AUTO_PALETTE.length][0] : "#cbd5e1")
    })

    // Output
    drawOutput(ctx, nodeTopY(n + 1), output.trim())

    // Watermark
    ctx.fillStyle = "#cbd5e1"
    ctx.font = "11px system-ui,sans-serif"
    ctx.textAlign = "right"
    ctx.fillText("talktomedata.com", CW - 16, ch - 14)
    ctx.textAlign = "left"
  }

  const handleMap = () => {
    if (!canMap) return
    setPhase("diagram")
    setTimeout(drawDiagram, 60)
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
                      Add each step in order. The tool detects which ones an agent can automate.
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

                  {/* Summary */}
                  {automatableCount > 0 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4">
                      <p className="text-sm text-slate-700">
                        <span className="font-bold text-primary">
                          {automatableCount} of {filledSteps.length} step{filledSteps.length !== 1 ? "s" : ""}
                        </span>{" "}
                        in your workflow can be automated by an AI agent — saving you the manual work every time this runs.
                      </p>
                    </div>
                  )}

                  {/* Canvas diagram */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-2">
                    <canvas
                      ref={canvasRef}
                      className="block mx-auto rounded-lg"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>

                  {/* Legend + Download */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#185FA5] inline-block" />
                        Trigger / Output
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm bg-[#2563eb] inline-block" />
                        Automatable step
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm border-2 border-dashed border-slate-300 bg-slate-50 inline-block" />
                        Manual step
                      </div>
                    </div>
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:border-slate-300 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Download PNG
                    </button>
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
