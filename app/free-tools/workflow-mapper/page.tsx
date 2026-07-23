"use client"

import { useRef, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, CheckCircle2, Plus, Trash2, X, Download } from "lucide-react"
import Link from "next/link"

// ─── "Can AI automate this?" heuristic ────────────────────────────────────────
// Improved accuracy: strong digital/data/comms signals are always automatable;
// clearly human/physical/relationship/judgment tasks are manual; anything else
// defaults to automatable, since a modern AI agent can handle most digital steps.

// Matches a keyword at a word start (so "call" matches "calling" but not "recall").
function hasTerm(text: string, term: string): boolean {
  if (term.includes(" ")) return text.includes(term)
  return new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(text)
}

// Digital work an AI agent reliably does — always automatable, even if a manual
// word also appears (e.g. "call the API").
const STRONG_AUTO = [
  "email", "e-mail", "send", "reply", "respond", "draft", "message", "slack", "teams",
  "whatsapp", "sms", "notify", "notification", "alert", "chase", "follow up", "follow-up",
  "remind", "reminder", "log", "record", "update", "enter", "input", "save", "store",
  "create", "add", "insert", "post", "publish", "upload", "download", "export", "import",
  "backup", "schedule", "calendar", "book", "reschedule", "crm", "hubspot", "salesforce",
  "pipedrive", "zoho", "notion", "airtable", "sheet", "spreadsheet", "excel", "database",
  "api", "webhook", "integration", "integrate", "sync", "zapier", "endpoint", "script",
  "copy", "move", "tag", "label", "assign", "route", "forward", "escalate", "transfer",
  "archive", "invoice", "billing", "charge", "payment", "receipt", "refund", "reconcile",
  "generate", "report", "dashboard", "summary", "summarise", "summarize", "analyse",
  "analyze", "calculate", "compute", "score", "qualify", "classify", "categorise",
  "categorize", "sort", "filter", "dedupe", "deduplicate", "validate", "format", "enrich",
  "extract", "parse", "scan", "ocr", "transcribe", "translate", "research", "scrape",
  "monitor", "track", "collect", "compile", "collate", "ticket", "status", "order",
  "confirm", "verify", "lookup", "look up", "search", "match",
]

// Clearly human / physical / relationship / high-judgment — manual.
const MANUAL_SIGNALS = [
  "call", "phone", "dial", "meet", "meeting", "in person", "in-person", "face to face",
  "face-to-face", "visit", "travel", "commute", "onsite", "on site", "on-site", "sign",
  "signature", "negotiate", "negotiation", "haggle", "interview", "recruit", "hire",
  "fire", "handshake", "shake hands", "deliver", "delivery", "ship", "courier", "pack",
  "package", "warehouse", "physically", "by hand", "manually", "inspect", "install",
  "repair", "assemble", "clean", "cook", "serve", "drive", "pickup", "pick up", "drop off",
  "attend", "pitch", "approve", "sign off", "sign-off", "authorise", "authorize",
  "final decision", "judgement", "judgment", "photoshoot", "photo shoot", "film", "shoot",
]

function isAutomatable(step: string): boolean {
  const lower = step.toLowerCase()
  if (STRONG_AUTO.some(kw => hasTerm(lower, kw))) return true
  if (MANUAL_SIGNALS.some(kw => hasTerm(lower, kw))) return false
  return true // default: AI agents handle most digital steps
}

// ─── Canvas layout ─────────────────────────────────────────────────────────────

const SCALE = 2          // hi-DPI multiplier for a crisp, big export
const CW = 940           // logical canvas width
const NW = 800           // node width
const NX = (CW - NW) / 2 // node left edge
const NH = 96            // node height
const ARROW = 60         // vertical gap between nodes
const CX = CW / 2        // horizontal center
const HEADER_H = 132     // title band
const FOOTER_H = 92      // legend band
const GAP_TOP = 26
const GAP_BOTTOM = 22

// Vivid rotating gradients for automatable steps: [start, end]
const AUTO_PALETTE: [string, string][] = [
  ["#2563eb", "#06b6d4"],
  ["#7c3aed", "#d946ef"],
  ["#0d9488", "#22c55e"],
  ["#f59e0b", "#f97316"],
  ["#ec4899", "#f43f5e"],
  ["#6366f1", "#3b82f6"],
]

function canvasHeight(stepCount: number): number {
  const nodes = stepCount + 2
  const arrows = stepCount + 1
  return HEADER_H + GAP_TOP + nodes * NH + arrows * ARROW + GAP_BOTTOM + FOOTER_H
}

function nodeTopY(index: number): number {
  return HEADER_H + GAP_TOP + index * (NH + ARROW)
}

// ─── Canvas helpers ───────────────────────────────────────────────────────────

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
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

// Right-anchored badge
function badgeRight(
  ctx: CanvasRenderingContext2D,
  rightX: number, y: number, text: string, bg: string, fg: string
) {
  ctx.font = "700 11px system-ui,-apple-system,sans-serif"
  const tw = ctx.measureText(text).width
  const bw = tw + 20
  const bh = 22
  const x = rightX - bw
  rr(ctx, x, y, bw, bh, 11)
  ctx.fillStyle = bg
  ctx.fill()
  ctx.fillStyle = fg
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  ctx.fillText(text, x + 10, y + bh / 2 + 0.5)
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxW: number, maxLines: number): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ""
  for (const word of words) {
    const test = line ? line + " " + word : word
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line)
      line = word
      if (lines.length === maxLines - 1) break
    } else {
      line = test
    }
  }
  if (line && lines.length < maxLines) lines.push(line)
  // If content overflowed, ellipsize the last line
  const consumed = lines.join(" ").split(/\s+/).length
  if (consumed < words.length && lines.length) {
    let last = lines[lines.length - 1]
    while (ctx.measureText(last + "…").width > maxW && last.length > 1) last = last.slice(0, -1)
    lines[lines.length - 1] = last + "…"
  }
  return lines
}

function nodeLabel(ctx: CanvasRenderingContext2D, text: string, leftX: number, y: number, color: string) {
  ctx.font = "600 16px system-ui,-apple-system,sans-serif"
  ctx.fillStyle = color
  const maxW = NX + NW - 30 - leftX
  const lines = wrapText(ctx, text, maxW, 2)
  const lh = 21
  const startY = y + NH / 2 - ((lines.length - 1) * lh) / 2
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  lines.forEach((ln, i) => ctx.fillText(ln, leftX, startY + i * lh))
}

// ─── Arrows ─────────────────────────────────────────────────────────────────

function drawArrow(ctx: CanvasRenderingContext2D, fromY: number, color: string) {
  const ay = fromY + NH
  const by = fromY + NH + ARROW
  ctx.strokeStyle = color
  ctx.lineCap = "round"
  ctx.lineWidth = 3.5
  ctx.setLineDash([])
  ctx.beginPath()
  ctx.moveTo(CX, ay + 2)
  ctx.lineTo(CX, by - 12)
  ctx.stroke()
  // arrowhead
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(CX - 9, by - 13)
  ctx.lineTo(CX + 9, by - 13)
  ctx.lineTo(CX, by - 1)
  ctx.closePath()
  ctx.fill()
}

// ─── Nodes ─────────────────────────────────────────────────────────────────

function drawTrigger(ctx: CanvasRenderingContext2D, y: number, text: string) {
  const x = NX
  shadow(ctx, "rgba(37,99,235,0.35)", 22, 8)
  const g = ctx.createLinearGradient(x, y, x + NW, y + NH)
  g.addColorStop(0, "#185FA5"); g.addColorStop(1, "#4f46e5")
  rr(ctx, x, y, NW, NH, 22); ctx.fillStyle = g; ctx.fill()
  noShadow(ctx)

  const iconR = 24, icx = x + iconR + 18, icy = y + NH / 2
  ctx.fillStyle = "rgba(255,255,255,0.20)"
  ctx.beginPath(); ctx.arc(icx, icy, iconR, 0, Math.PI * 2); ctx.fill()
  // lightning
  ctx.fillStyle = "#fff"
  ctx.beginPath()
  ctx.moveTo(icx + 3, icy - 12); ctx.lineTo(icx - 6, icy + 2); ctx.lineTo(icx + 1, icy + 2)
  ctx.lineTo(icx - 3, icy + 13); ctx.lineTo(icx + 7, icy - 2); ctx.lineTo(icx - 1, icy - 2)
  ctx.closePath(); ctx.fill()

  nodeLabel(ctx, text, x + iconR * 2 + 30, y, "#fff")
  badgeRight(ctx, x + NW - 18, y + 16, "⚡ TRIGGER", "rgba(255,255,255,0.22)", "#fff")
}

function drawAutoStep(ctx: CanvasRenderingContext2D, y: number, text: string, num: number, colorIdx: number) {
  const x = NX
  const [c1, c2] = AUTO_PALETTE[colorIdx % AUTO_PALETTE.length]
  shadow(ctx, `${c1}66`, 20, 7)
  const g = ctx.createLinearGradient(x, y, x + NW, y + NH)
  g.addColorStop(0, c1); g.addColorStop(1, c2)
  rr(ctx, x, y, NW, NH, 20); ctx.fillStyle = g; ctx.fill()
  noShadow(ctx)

  // number chip
  const ncx = x + 34, ncy = y + NH / 2
  ctx.fillStyle = "rgba(255,255,255,0.25)"
  ctx.beginPath(); ctx.arc(ncx, ncy, 19, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = "#fff"; ctx.font = "800 15px system-ui,sans-serif"
  ctx.textAlign = "center"; ctx.textBaseline = "middle"
  ctx.fillText(String(num), ncx, ncy + 1)

  nodeLabel(ctx, text, x + 66, y, "#fff")
  badgeRight(ctx, x + NW - 18, y + 16, "✦ AI AUTOMATABLE", "rgba(255,255,255,0.26)", "#fff")
}

function drawManualStep(ctx: CanvasRenderingContext2D, y: number, text: string, num: number) {
  const x = NX
  shadow(ctx, "rgba(15,23,42,0.08)", 12, 4)
  rr(ctx, x, y, NW, NH, 20); ctx.fillStyle = "#fffdf7"; ctx.fill()
  noShadow(ctx)
  ctx.strokeStyle = "#f59e0b"; ctx.lineWidth = 2; ctx.setLineDash([7, 5])
  rr(ctx, x + 1, y + 1, NW - 2, NH - 2, 19); ctx.stroke(); ctx.setLineDash([])

  const ncx = x + 34, ncy = y + NH / 2
  ctx.fillStyle = "#fef3c7"; ctx.beginPath(); ctx.arc(ncx, ncy, 19, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = "#b45309"; ctx.font = "800 15px system-ui,sans-serif"
  ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(String(num), ncx, ncy + 1)

  nodeLabel(ctx, text, x + 66, y, "#334155")
  badgeRight(ctx, x + NW - 18, y + 16, "MANUAL STEP", "#fde68a", "#92400e")
}

function drawOutput(ctx: CanvasRenderingContext2D, y: number, text: string) {
  const x = NX
  shadow(ctx, "rgba(15,23,42,0.30)", 24, 9)
  const g = ctx.createLinearGradient(x, y, x + NW, y + NH)
  g.addColorStop(0, "#0f172a"); g.addColorStop(1, "#312e81")
  rr(ctx, x, y, NW, NH, 20); ctx.fillStyle = g; ctx.fill()
  noShadow(ctx)
  ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 1.5
  rr(ctx, x + 2, y + 2, NW - 4, NH - 4, 18); ctx.stroke()

  // green check circle
  const ccx = x + 36, ccy = y + NH / 2
  ctx.fillStyle = "#22c55e"; ctx.beginPath(); ctx.arc(ccx, ccy, 20, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 3; ctx.lineCap = "round"
  ctx.beginPath(); ctx.moveTo(ccx - 8, ccy); ctx.lineTo(ccx - 2, ccy + 6); ctx.lineTo(ccx + 9, ccy - 7); ctx.stroke()

  nodeLabel(ctx, text, x + 70, y, "#e2e8f0")
  badgeRight(ctx, x + NW - 18, y + 16, "✓ RESULT", "rgba(255,255,255,0.14)", "#c7d2fe")
}

// ─── Background, header, footer ───────────────────────────────────────────────

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const g = ctx.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, "#f7faff"); g.addColorStop(1, "#eef2ff")
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)

  // soft colour orbs
  const orb = (cx: number, cy: number, r: number, col: string) => {
    const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
    rg.addColorStop(0, col); rg.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill()
  }
  orb(w - 60, 90, 260, "rgba(124,58,237,0.10)")
  orb(40, h - 120, 240, "rgba(6,182,212,0.10)")

  // dot grid
  ctx.fillStyle = "rgba(100,116,139,0.14)"
  const s = 26
  for (let gx = s; gx < w; gx += s)
    for (let gy = s; gy < h; gy += s) { ctx.beginPath(); ctx.arc(gx, gy, 1.1, 0, Math.PI * 2); ctx.fill() }
}

function drawHeader(ctx: CanvasRenderingContext2D, autoCount: number, total: number) {
  ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"
  ctx.fillStyle = "#7c3aed"
  ctx.font = "800 12px system-ui,sans-serif"
  ctx.fillText("AGENT WORKFLOW MAPPER", NX, 52)

  ctx.fillStyle = "#0f172a"
  ctx.font = "800 30px system-ui,-apple-system,sans-serif"
  ctx.fillText("Your Automation Blueprint", NX, 88)

  // savings pill (right)
  const label = `⚡ ${autoCount} of ${total} steps automatable with AI`
  ctx.font = "700 14px system-ui,sans-serif"
  const tw = ctx.measureText(label).width
  const bw = tw + 32, bh = 40, bx = NX + NW - bw, by = 54
  shadow(ctx, "rgba(34,197,94,0.35)", 16, 5)
  const g = ctx.createLinearGradient(bx, by, bx + bw, by)
  g.addColorStop(0, "#0d9488"); g.addColorStop(1, "#22c55e")
  rr(ctx, bx, by, bw, bh, bh / 2); ctx.fillStyle = g; ctx.fill()
  noShadow(ctx)
  ctx.fillStyle = "#fff"; ctx.textAlign = "left"; ctx.textBaseline = "middle"
  ctx.fillText(label, bx + 16, by + bh / 2 + 1)
  ctx.textBaseline = "alphabetic"
}

function drawFooter(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const y = h - FOOTER_H + 34
  const items: [string, string][] = [
    ["#4f46e5", "Trigger"],
    ["#7c3aed", "AI automatable"],
    ["#f59e0b", "Manual step"],
    ["#0f172a", "Result"],
  ]
  let x = NX
  ctx.font = "600 13px system-ui,sans-serif"
  ctx.textAlign = "left"; ctx.textBaseline = "middle"
  for (const [col, lab] of items) {
    rr(ctx, x, y - 7, 14, 14, 4); ctx.fillStyle = col; ctx.fill()
    ctx.fillStyle = "#475569"; ctx.fillText(lab, x + 22, y)
    x += 26 + ctx.measureText(lab).width + 26
  }
  ctx.fillStyle = "#94a3b8"; ctx.font = "700 13px system-ui,sans-serif"
  ctx.textAlign = "right"
  ctx.fillText("Made with talktomedata.com", NX + NW, y)
  ctx.textAlign = "left"
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step { id: string; text: string }
type Phase = "form" | "diagram"

// ─── Component ───────────────────────────────────────────────────────────────

export default function WorkflowMapperPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [trigger, setTrigger] = useState("")
  const [steps, setSteps] = useState<Step[]>([{ id: "s1", text: "" }])
  const [output, setOutput] = useState("")
  const [phase, setPhase] = useState<Phase>("form")

  // "Get a quote" email capture (existing)
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  // Download gate (name + surname + email)
  const [showDownload, setShowDownload] = useState(false)
  const [dlFirst, setDlFirst] = useState("")
  const [dlLast, setDlLast] = useState("")
  const [dlEmail, setDlEmail] = useState("")
  const [dlBot, setDlBot] = useState("") // honeypot
  const [dlLoading, setDlLoading] = useState(false)
  const [downloadUnlocked, setDownloadUnlocked] = useState(false)

  const filledSteps = steps.filter(s => s.text.trim().length > 0)
  const canMap = trigger.trim().length > 0 && filledSteps.length > 0 && output.trim().length > 0
  const automatableCount = filledSteps.filter(s => isAutomatable(s.text)).length

  const addStep = () => { if (steps.length < 12) setSteps(prev => [...prev, { id: `s${Date.now()}`, text: "" }]) }
  const removeStep = (id: string) => setSteps(prev => prev.filter(s => s.id !== id))
  const updateStep = (id: string, text: string) => setSteps(prev => prev.map(s => s.id === id ? { ...s, text } : s))

  const drawDiagram = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const n = filledSteps.length
    const ch = canvasHeight(n)
    canvas.width = CW * SCALE
    canvas.height = ch * SCALE
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)

    drawBackground(ctx, CW, ch)
    drawHeader(ctx, automatableCount, n)

    const trigY = nodeTopY(0)
    drawTrigger(ctx, trigY, trigger.trim())
    drawArrow(ctx, trigY, "#4f46e5")

    let autoIdx = 0
    filledSteps.forEach((step, i) => {
      const stepY = nodeTopY(i + 1)
      const auto = isAutomatable(step.text)
      if (auto) { drawAutoStep(ctx, stepY, step.text, i + 1, autoIdx); autoIdx++ }
      else drawManualStep(ctx, stepY, step.text, i + 1)
      const arrowColor = auto ? AUTO_PALETTE[Math.max(autoIdx - 1, 0) % AUTO_PALETTE.length][1] : "#f59e0b"
      drawArrow(ctx, stepY, arrowColor)
    })

    drawOutput(ctx, nodeTopY(n + 1), output.trim())
    drawFooter(ctx, CW, ch)
  }

  const handleMap = () => { if (!canMap) return; setPhase("diagram"); setTimeout(drawDiagram, 60) }

  const downloadPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement("a")
    a.href = canvas.toDataURL("image/png")
    a.download = "automation-blueprint.png"
    a.click()
  }

  const handleDownloadClick = () => {
    if (downloadUnlocked) downloadPng()
    else setShowDownload(true)
  }

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dlEmail.includes("@")) return
    setDlLoading(true)
    try {
      await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: dlEmail,
          firstName: dlFirst.trim(),
          lastName: dlLast.trim(),
          hp: dlBot,
          source: "workflow_mapper_download",
          tasks: filledSteps.map(s => s.text),
        }),
      })
    } catch {
      // non-blocking — still let them download
    } finally {
      setDlLoading(false)
      setDownloadUnlocked(true)
      setShowDownload(false)
      setTimeout(downloadPng, 50)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setEmailLoading(true)
    try {
      await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "workflow_mapper", tasks: filledSteps.map(s => s.text) }),
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/free-tools" className="hover:text-slate-600 transition-colors">Free Tools</Link>
            <span>/</span>
            <span className="text-slate-600">Workflow Mapper</span>
          </div>

          {/* Card */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

            {/* Card header */}
            <div className="px-8 py-6" style={{ background: "linear-gradient(135deg, #0D9488, #0891b2, #2563eb)" }}>
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
                Describe your workflow — trigger, steps, and expected output. We&apos;ll turn it into a colourful blueprint showing exactly which steps an AI agent can handle automatically.
              </p>
            </div>

            <div className="p-8">
              {phase === "form" ? (
                <div className="space-y-8">
                  {/* Trigger */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">1. What triggers this workflow?</label>
                    <p className="text-xs text-slate-400 mb-3">e.g. &quot;A new lead comes in on HubSpot&quot;, &quot;I receive a support email&quot;</p>
                    <input
                      type="text" value={trigger} onChange={e => setTrigger(e.target.value)}
                      placeholder="When I receive a new lead in HubSpot…"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Steps */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">2. What are the steps in your workflow?</label>
                    <p className="text-xs text-slate-400 mb-3">Add each step in order. The tool detects which ones an agent can automate.</p>
                    <div className="space-y-2">
                      {steps.map((step, i) => (
                        <div key={step.id} className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-mono w-5 shrink-0 text-right">{i + 1}.</span>
                          <input
                            type="text" value={step.text} onChange={e => updateStep(step.id, e.target.value)}
                            placeholder={`Step ${i + 1} — e.g. "Send welcome email", "Log in Notion"`}
                            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                          {steps.length > 1 && (
                            <button onClick={() => removeStep(step.id)} className="text-slate-300 hover:text-red-400 transition-colors cursor-pointer shrink-0" aria-label="Remove step">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {steps.length < 12 && (
                      <button onClick={addStep} className="mt-3 flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary transition-colors cursor-pointer">
                        <Plus className="w-4 h-4" /> Add step
                      </button>
                    )}
                  </div>

                  {/* Output */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">3. What&apos;s the expected output or result?</label>
                    <p className="text-xs text-slate-400 mb-3">e.g. &quot;Lead is qualified and meeting is booked&quot;, &quot;Support ticket is resolved&quot;</p>
                    <input
                      type="text" value={output} onChange={e => setOutput(e.target.value)}
                      placeholder="Lead is qualified and routed to sales…"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Map button */}
                  <div>
                    <button
                      onClick={handleMap} disabled={!canMap}
                      className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                        canMap ? "bg-linear-to-r from-primary to-violet-500 text-white hover:opacity-90 cursor-pointer" : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      Map my workflow <ArrowRight className="w-4 h-4" />
                    </button>
                    {!canMap && <p className="text-xs text-slate-400 mt-2">Fill in the trigger, at least one step, and the output to continue.</p>}
                  </div>
                </div>

              ) : (
                <div className="space-y-8">
                  {/* Results header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">Your automation blueprint</span>
                    </div>
                    <button onClick={() => setPhase("form")} className="text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer">← Edit workflow</button>
                  </div>

                  {/* Summary */}
                  {automatableCount > 0 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4">
                      <p className="text-sm text-slate-700">
                        <span className="font-bold text-primary">{automatableCount} of {filledSteps.length} step{filledSteps.length !== 1 ? "s" : ""}</span>{" "}
                        in your workflow can be automated by an AI agent — saving you the manual work every time this runs.
                      </p>
                    </div>
                  )}

                  {/* Canvas diagram */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <canvas ref={canvasRef} className="block mx-auto rounded-xl" style={{ maxWidth: "100%", height: "auto" }} />
                  </div>

                  {/* Legend + Download */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#4f46e5] inline-block" /> Trigger</div>
                      <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#7c3aed] inline-block" /> AI automatable</div>
                      <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#f59e0b] inline-block" /> Manual step</div>
                      <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#0f172a] inline-block" /> Result</div>
                    </div>
                    <button
                      onClick={handleDownloadClick}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary to-violet-500 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                    >
                      <Download className="w-4 h-4" /> Download PNG
                    </button>
                  </div>

                  {/* Email capture */}
                  <div className="border border-primary/20 bg-primary/5 rounded-xl p-6">
                    {!emailSubmitted ? (
                      <>
                        <h3 className="text-base font-bold text-slate-900 mb-1">Want us to build this workflow for you?</h3>
                        <p className="text-sm text-slate-500 mb-5">Share your email and we&apos;ll send you a quote for automating your exact workflow — no obligation.</p>
                        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com"
                            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                          <button type="submit" disabled={emailLoading}
                            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-primary to-violet-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60 shrink-0">
                            {emailLoading ? "Sending…" : "Get a quote →"}
                          </button>
                        </form>
                        <p className="text-xs text-slate-400 mt-3">No spam. Unsubscribe anytime.</p>
                      </>
                    ) : (
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Got it — we&apos;ll be in touch.</p>
                          <p className="text-sm text-slate-500 mt-0.5">We&apos;ll review your workflow and send a quote to <strong>{email}</strong>.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Book demo CTA */}
                  <div className="rounded-2xl px-8 py-8" style={{ background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)" }}>
                    <h3 className="text-xl font-bold text-white mb-2">Ready to automate this workflow?</h3>
                    <p className="text-white/80 text-sm mb-5 max-w-lg">We build, deploy, and host custom AI agents. Book a free call and we&apos;ll show you exactly how to run this workflow on autopilot — live in days.</p>
                    <Link href="/book-demo" className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
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

      {/* Download gate modal */}
      {showDownload && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowDownload(false)} />
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 p-6 sm:p-8">
            <button onClick={() => setShowDownload(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
            <div className="mb-5">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Download your blueprint</h3>
              <p className="text-sm text-slate-500 mt-1">Tell us where to send it and we&apos;ll deliver your PNG right away — plus tips on automating your workflow.</p>
            </div>
            <form onSubmit={handleDownloadSubmit} className="space-y-3">
              {/* Honeypot */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={dlBot} onChange={e => setDlBot(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" required autoComplete="given-name" placeholder="First name" value={dlFirst} onChange={e => setDlFirst(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                <input type="text" required autoComplete="family-name" placeholder="Surname" value={dlLast} onChange={e => setDlLast(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <input type="email" required autoComplete="email" placeholder="your@email.com" value={dlEmail} onChange={e => setDlEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              <button type="submit" disabled={dlLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-violet-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60">
                {dlLoading ? "Preparing…" : <><Download className="w-4 h-4" /> Download my blueprint</>}
              </button>
              <p className="text-xs text-slate-400 text-center">No spam. We&apos;ll only use this to follow up about your workflow.</p>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
