"use client"

import { useRef, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, ArrowLeft, CheckCircle2, Download, Copy, Check, Upload } from "lucide-react"
import Link from "next/link"

// ─── Preset fonts (Google Fonts — loaded client-side, free) ───────────────────

const FONT_GROUPS: { label: string; fonts: string[] }[] = [
  { label: "Sans-serif", fonts: ["Inter", "Poppins", "Montserrat", "Roboto", "Open Sans", "Lato", "Work Sans", "Nunito", "Raleway", "Manrope", "DM Sans", "Rubik", "Mulish", "Figtree", "Plus Jakarta Sans"] },
  { label: "Serif", fonts: ["Playfair Display", "Merriweather", "Lora", "PT Serif", "Cormorant Garamond", "Libre Baskerville", "EB Garamond", "Source Serif 4"] },
  { label: "Display", fonts: ["Oswald", "Bebas Neue", "Archivo", "Sora", "Space Grotesk", "Fraunces"] },
  { label: "Monospace", fonts: ["JetBrains Mono", "IBM Plex Mono", "Space Mono"] },
]

const TONES: { value: string; descriptor: string; doTip: string; avoidTip: string }[] = [
  { value: "Professional", descriptor: "Clear, competent, and trustworthy — like an expert you can rely on. No jargon, no fluff.", doTip: "Be precise and back claims up.", avoidTip: "Avoid slang and hype." },
  { value: "Friendly & approachable", descriptor: "Warm, human, and easy to talk to. We write like a helpful person, not a corporation.", doTip: "Use “you”, contractions, and a welcoming tone.", avoidTip: "Avoid stiff, corporate phrasing." },
  { value: "Bold & confident", descriptor: "Direct, punchy, and self-assured. We make strong statements and get to the point.", doTip: "Lead with the benefit; keep sentences short.", avoidTip: "Avoid hedging words like “maybe” or “sort of”." },
  { value: "Playful & witty", descriptor: "Light, fun, and a little cheeky. We use humour and personality to stay memorable.", doTip: "Add wit where it fits naturally.", avoidTip: "Avoid forcing jokes over clarity." },
  { value: "Luxurious & elegant", descriptor: "Refined, aspirational, and understated. Every word feels considered and premium.", doTip: "Choose evocative, precise words.", avoidTip: "Avoid exclamation marks and discounts-speak." },
  { value: "Minimal & direct", descriptor: "Short, plain, and to the point. We cut every unnecessary word.", doTip: "Say it in the fewest words possible.", avoidTip: "Avoid filler and adjectives." },
  { value: "Warm & empathetic", descriptor: "Caring, reassuring, and supportive. We meet people where they are.", doTip: "Acknowledge the reader’s situation first.", avoidTip: "Avoid cold, transactional language." },
  { value: "Technical & precise", descriptor: "Accurate, detailed, and specific. We value correctness over flourish.", doTip: "Use exact terms and concrete numbers.", avoidTip: "Avoid vague generalisations." },
  { value: "Inspirational", descriptor: "Uplifting, visionary, and motivating. We paint the bigger picture.", doTip: "Connect features to a bigger purpose.", avoidTip: "Avoid empty buzzwords." },
  { value: "Conversational", descriptor: "Casual and natural, like a chat with a friend. Everyday language and contractions.", doTip: "Write how people actually speak.", avoidTip: "Avoid formal, essay-like structure." },
]

const TRAIT_OPTIONS = ["Trustworthy", "Innovative", "Approachable", "Premium", "Playful", "Bold", "Calm", "Energetic", "Sophisticated", "Authentic", "Minimal", "Friendly"]

const PRESET_PALETTES: { name: string; primary: string; secondary: string; accent: string }[] = [
  { name: "Ocean", primary: "#185FA5", secondary: "#7C3AED", accent: "#06B6D4" },
  { name: "Sunset", primary: "#DC2626", secondary: "#F59E0B", accent: "#7C3AED" },
  { name: "Forest", primary: "#0D9488", secondary: "#16A34A", accent: "#84CC16" },
  { name: "Berry", primary: "#DB2777", secondary: "#7C3AED", accent: "#F472B6" },
  { name: "Midnight", primary: "#0F172A", secondary: "#4F46E5", accent: "#22D3EE" },
  { name: "Mono", primary: "#111827", secondary: "#6B7280", accent: "#F59E0B" },
]

// ─── Color helpers ────────────────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h
  const int = parseInt(full, 16)
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 }
}
function rgbStr(hex: string): string { const { r, g, b } = hexToRgb(hex); return `rgb(${r}, ${g}, ${b})` }
function hexToRgba(hex: string, a: number): string { const { r, g, b } = hexToRgb(hex); return `rgba(${r}, ${g}, ${b}, ${a})` }
function isValidHex(v: string): boolean { return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v) }
function normalizeHex(v: string): string { let h = v.trim(); if (h && !h.startsWith("#")) h = "#" + h; return h }

// ─── Canvas helpers ───────────────────────────────────────────────────────────

const SCALE = 2, CW = 1080, PH = 1527, M = 64
const contentW = CW - 2 * M

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
function ellipsize(ctx: CanvasRenderingContext2D, text: string, maxW: number): string {
  if (ctx.measureText(text).width <= maxW) return text
  let t = text
  while (t.length > 1 && ctx.measureText(t + "…").width > maxW) t = t.slice(0, -1)
  return t + "…"
}
function wrapDraw(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number, maxLines: number) {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ""
  for (const w of words) {
    const test = line ? line + " " + w : w
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line); line = w
      if (lines.length === maxLines - 1) break
    } else line = test
  }
  if (line && lines.length < maxLines) lines.push(line)
  const used = lines.join(" ").split(/\s+/).length
  if (used < words.length && lines.length) lines[lines.length - 1] = ellipsize(ctx, lines[lines.length - 1] + " …", maxW)
  lines.forEach((ln, i) => ctx.fillText(ln, x, y + i * lh))
}

// ─── Component ───────────────────────────────────────────────────────────────

type Phase = "form" | "result"

export default function BrandGuidelinesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const headingFileRef = useRef<HTMLInputElement>(null)
  const bodyFileRef = useRef<HTMLInputElement>(null)
  const logoFileRef = useRef<HTMLInputElement>(null)

  const [phase, setPhase] = useState<Phase>("form")

  // Brand fields
  const [brandName, setBrandName] = useState("")
  const [tagline, setTagline] = useState("")
  const [mission, setMission] = useState("")
  const [audience, setAudience] = useState("")
  const [wordsUse, setWordsUse] = useState("")
  const [wordsAvoid, setWordsAvoid] = useState("")

  // Fonts (family used for rendering + display name)
  const [headingFont, setHeadingFont] = useState("Poppins")
  const [headingName, setHeadingName] = useState("Poppins")
  const [headingCustom, setHeadingCustom] = useState(false)
  const [bodyFont, setBodyFont] = useState("Inter")
  const [bodyName, setBodyName] = useState("Inter")
  const [bodyCustom, setBodyCustom] = useState(false)

  // Logo (optional) — stored as a loaded image (its .src is a data URL, so the
  // canvas stays untainted and exports/downloads work).
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null)

  // Colors
  const [primaryHex, setPrimaryHex] = useState("#185FA5")
  const [secondaryHex, setSecondaryHex] = useState("#7C3AED")
  const [accentHex, setAccentHex] = useState("#06B6D4")

  // Tone + personality
  const [tone, setTone] = useState("Friendly & approachable")
  const [traits, setTraits] = useState<string[]>(["Trustworthy", "Innovative"])

  // Delivery capture
  const [dlFirst, setDlFirst] = useState("")
  const [dlLast, setDlLast] = useState("")
  const [dlEmail, setDlEmail] = useState("")
  const [dlBot, setDlBot] = useState("")
  const [dlLoading, setDlLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const toneObj = TONES.find(t => t.value === tone) ?? TONES[0]
  const canGenerate = brandName.trim().length > 0 && isValidHex(primaryHex) && isValidHex(secondaryHex) && tone.length > 0

  const toggleTrait = (t: string) =>
    setTraits(prev => prev.includes(t) ? prev.filter(x => x !== t) : (prev.length >= 5 ? prev : [...prev, t]))

  // ── Font loading ──
  async function loadFontFamily(family: string, custom: boolean) {
    if (custom) return
    const id = "gf-" + family.replace(/[^a-z0-9]/gi, "")
    if (!document.getElementById(id)) {
      const link = document.createElement("link")
      link.id = id; link.rel = "stylesheet"
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, "+")}:wght@400;600;700;800&display=swap`
      document.head.appendChild(link)
    }
    try {
      await Promise.race([
        Promise.all([document.fonts.load(`800 48px "${family}"`), document.fonts.load(`400 18px "${family}"`)]),
        new Promise(res => setTimeout(res, 2500)),
      ])
      await document.fonts.ready
    } catch { /* fall back to system font */ }
  }

  async function handleFontUpload(file: File, which: "heading" | "body") {
    try {
      const buf = await file.arrayBuffer()
      const fam = which === "heading" ? "CustomHeadingFont" : "CustomBodyFont"
      const face = new FontFace(fam, buf)
      await face.load()
      document.fonts.add(face)
      const name = file.name.replace(/\.(woff2?|ttf|otf)$/i, "")
      if (which === "heading") { setHeadingFont(fam); setHeadingName(name); setHeadingCustom(true) }
      else { setBodyFont(fam); setBodyName(name); setBodyCustom(true) }
    } catch {
      alert("Sorry — that font file couldn't be loaded. Try a .woff2, .woff, .ttf or .otf file.")
    }
  }

  function handleLogoUpload(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => setLogoImg(img)
      img.onerror = () => alert("Sorry — that image couldn't be loaded. Try a PNG or JPG.")
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  const onFontSelect = (value: string, which: "heading" | "body") => {
    if (value === "__upload__") { (which === "heading" ? headingFileRef : bodyFileRef).current?.click(); return }
    if (which === "heading") { setHeadingFont(value); setHeadingName(value); setHeadingCustom(false) }
    else { setBodyFont(value); setBodyName(value); setBodyCustom(false) }
  }

  // ── Draw the 1-page document ──
  function drawDoc() {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = CW * SCALE; canvas.height = PH * SCALE
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, CW, PH)

    const headF = `"${headingFont}", system-ui, sans-serif`
    const bodyF = `"${bodyFont}", system-ui, sans-serif`
    const pr = primaryHex, se = secondaryHex, ac = accentHex

    // Header
    const hg = ctx.createLinearGradient(0, 0, CW, 248)
    hg.addColorStop(0, pr); hg.addColorStop(1, se)
    ctx.fillStyle = hg; ctx.fillRect(0, 0, CW, 248)

    // Logo (optional) — white card, top-right. Reserves space so the brand name
    // never runs underneath it.
    let nameMaxW = contentW
    if (logoImg && logoImg.width > 0 && logoImg.height > 0) {
      const maxW = 200, maxH = 74
      const ar = logoImg.width / logoImg.height
      let lw = maxW, lh = lw / ar
      if (lh > maxH) { lh = maxH; lw = lh * ar }
      const padX = 18, padY = 16
      const cardW = lw + padX * 2, cardH = lh + padY * 2
      const cardX = CW - M - cardW, cardY = 40
      roundRect(ctx, cardX, cardY, cardW, cardH, 14); ctx.fillStyle = "#ffffff"; ctx.fill()
      ctx.drawImage(logoImg, cardX + padX, cardY + padY, lw, lh)
      nameMaxW = cardX - M - 24
    }

    ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"
    ctx.fillStyle = "rgba(255,255,255,0.82)"; ctx.font = "700 13px system-ui,sans-serif"
    if ("letterSpacing" in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = "3px"
    ctx.fillText("BRAND GUIDELINES", M, 76)
    if ("letterSpacing" in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = "0px"
    let fs = 64
    ctx.font = `800 ${fs}px ${headF}`
    while (ctx.measureText(brandName || "Your Brand").width > nameMaxW && fs > 32) { fs -= 2; ctx.font = `800 ${fs}px ${headF}` }
    ctx.fillStyle = "#ffffff"; ctx.fillText(ellipsize(ctx, brandName || "Your Brand", nameMaxW), M, 152)
    if (tagline) { ctx.font = `500 20px ${bodyF}`; ctx.fillStyle = "rgba(255,255,255,0.92)"; ctx.fillText(ellipsize(ctx, tagline, nameMaxW), M, 196) }

    const label = (y: number, t: string) => { ctx.font = "800 13px system-ui,sans-serif"; ctx.fillStyle = pr; ctx.textAlign = "left"; ctx.fillText(t.toUpperCase(), M, y) }

    // Colors
    label(312, "Color palette")
    const cols: [string, string][] = [["Primary", pr], ["Secondary", se]]
    if (isValidHex(ac)) cols.push(["Accent", ac])
    const gap = 24, cw = (contentW - gap * (cols.length - 1)) / cols.length, cy = 336, bh = 132
    cols.forEach(([nm, hx], i) => {
      const cx = M + i * (cw + gap)
      roundRect(ctx, cx, cy, cw, bh, 16); ctx.fillStyle = hx; ctx.fill()
      ctx.strokeStyle = "rgba(15,23,42,0.08)"; ctx.lineWidth = 1; roundRect(ctx, cx + 0.5, cy + 0.5, cw - 1, bh - 1, 16); ctx.stroke()
      ctx.textAlign = "left"
      ctx.font = "600 13px system-ui,sans-serif"; ctx.fillStyle = "#64748b"; ctx.fillText(nm, cx, cy + bh + 28)
      ctx.font = "800 17px system-ui,sans-serif"; ctx.fillStyle = "#0f172a"; ctx.fillText(hx.toUpperCase(), cx, cy + bh + 52)
      ctx.font = "500 13px system-ui,sans-serif"; ctx.fillStyle = "#94a3b8"; ctx.fillText(rgbStr(hx), cx, cy + bh + 72)
    })

    // Typography
    label(600, "Typography")
    ctx.font = "700 13px system-ui,sans-serif"; ctx.fillStyle = "#64748b"; ctx.fillText(`HEADINGS · ${headingName}`, M, 636)
    ctx.font = `800 52px ${headF}`; ctx.fillStyle = "#0f172a"; ctx.fillText("Aa Bb Cc  123", M, 700)
    ctx.font = "700 13px system-ui,sans-serif"; ctx.fillStyle = "#64748b"; ctx.fillText(`BODY · ${bodyName}`, M, 750)
    const bodySample = mission || `This is how ${brandName || "our"} body copy reads — clear, human, and easy to follow across everything we publish.`
    ctx.font = `400 17px ${bodyF}`; ctx.fillStyle = "#334155"
    wrapDraw(ctx, bodySample, M, 782, contentW, 25, 2)

    // Tone
    label(892, "Tone of voice")
    ctx.font = "800 22px system-ui,sans-serif"; ctx.fillStyle = "#0f172a"; ctx.fillText(tone, M, 926)
    ctx.font = "400 16px system-ui,sans-serif"; ctx.fillStyle = "#475569"
    wrapDraw(ctx, toneObj.descriptor, M, 956, contentW, 24, 2)

    // Personality chips
    label(1058, "Personality")
    ctx.textBaseline = "middle"
    let chx = M
    const chy = 1084
    ctx.font = "700 14px system-ui,sans-serif"
    traits.forEach(t => {
      const tw = ctx.measureText(t).width
      const pw = tw + 30
      if (chx + pw > CW - M) return
      roundRect(ctx, chx, chy - 17, pw, 34, 17); ctx.fillStyle = hexToRgba(pr, 0.10); ctx.fill()
      ctx.fillStyle = pr; ctx.fillText(t, chx + 15, chy + 1)
      chx += pw + 12
    })
    ctx.textBaseline = "alphabetic"

    // Essentials
    const essentials: [string, string][] = []
    if (audience.trim()) essentials.push(["Who it’s for", audience.trim()])
    if (wordsUse.trim()) essentials.push(["Words we use", wordsUse.trim()])
    if (wordsAvoid.trim()) essentials.push(["Words we avoid", wordsAvoid.trim()])
    if (essentials.length) {
      label(1166, "The essentials")
      let ey = 1198
      essentials.slice(0, 3).forEach(([k, v]) => {
        ctx.textAlign = "left"
        ctx.font = "700 14px system-ui,sans-serif"; ctx.fillStyle = "#0f172a"
        const key = k + ": "; ctx.fillText(key, M, ey)
        const kw = ctx.measureText(key).width
        ctx.font = "400 14px system-ui,sans-serif"; ctx.fillStyle = "#475569"
        ctx.fillText(ellipsize(ctx, v, contentW - kw), M + kw, ey)
        ey += 32
      })
    }

    // Footer
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(M, 1452); ctx.lineTo(CW - M, 1452); ctx.stroke()
    ctx.font = "700 13px system-ui,sans-serif"; ctx.fillStyle = "#94a3b8"; ctx.textAlign = "left"
    ctx.fillText("Generated with talktomedata.com", M, 1482)
    ctx.textAlign = "right"; ctx.fillStyle = "#cbd5e1"
    ctx.fillText(new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), CW - M, 1482)
    ctx.textAlign = "left"
  }

  const handleGenerate = () => {
    if (!canGenerate) return
    setPhase("result"); setSent(false)
    setTimeout(async () => {
      await Promise.all([loadFontFamily(headingFont, headingCustom), loadFontFamily(bodyFont, bodyCustom)])
      drawDoc()
    }, 60)
  }

  function buildMarkdown(): string {
    const lines = [
      `# Brand Guidelines — ${brandName || "Your Brand"}`,
      tagline ? `**Tagline:** ${tagline}` : "",
      mission ? `**What we do:** ${mission}` : "",
      audience ? `**Who it's for:** ${audience}` : "",
      "",
      `## Colors`,
      `- Primary: ${primaryHex.toUpperCase()} · ${rgbStr(primaryHex)}`,
      `- Secondary: ${secondaryHex.toUpperCase()} · ${rgbStr(secondaryHex)}`,
      isValidHex(accentHex) ? `- Accent: ${accentHex.toUpperCase()} · ${rgbStr(accentHex)}` : "",
      "",
      `## Typography`,
      `- Headings: ${headingName}`,
      `- Body: ${bodyName}`,
      "",
      `## Tone of voice`,
      `${tone} — ${toneObj.descriptor}`,
      `- Do: ${toneObj.doTip}`,
      `- Don't: ${toneObj.avoidTip}`,
      "",
      `## Personality`,
      traits.length ? `- ${traits.join(", ")}` : "",
      wordsUse ? `\n## Words we use\n- ${wordsUse}` : "",
      wordsAvoid ? `\n## Words we avoid\n- ${wordsAvoid}` : "",
      "",
      `---`,
      `When writing or designing anything for ${brandName || "this brand"}, follow the tone, personality, and word choices above, use the primary/secondary colors, and set headings in ${headingName} and body text in ${bodyName}.`,
    ]
    return lines.filter(l => l !== "").join("\n")
  }

  function scaledPng(targetW: number): string {
    const canvas = canvasRef.current
    if (!canvas) return ""
    const ratio = targetW / canvas.width
    const off = document.createElement("canvas")
    off.width = targetW; off.height = Math.round(canvas.height * ratio)
    const c = off.getContext("2d")
    if (!c) return canvas.toDataURL("image/png")
    c.drawImage(canvas, 0, 0, off.width, off.height)
    return off.toDataURL("image/png")
  }

  const downloadPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement("a")
    a.href = canvas.toDataURL("image/png")
    a.download = `${(brandName || "brand").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-brand-guidelines.png`
    a.click()
  }

  const copyMarkdown = () => {
    navigator.clipboard.writeText(buildMarkdown())
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dlEmail.includes("@")) return
    setDlLoading(true)
    try {
      await fetch("/api/send-brand-guidelines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: dlEmail, firstName: dlFirst.trim(), lastName: dlLast.trim(), hp: dlBot,
          markdown: buildMarkdown(),
          imageDataUrl: scaledPng(1000),
          brand: {
            name: brandName, tagline, mission, audience,
            headingFont: headingName, bodyFont: bodyName,
            primary: primaryHex.toUpperCase(), secondary: secondaryHex.toUpperCase(),
            accent: isValidHex(accentHex) ? accentHex.toUpperCase() : "",
            tone, toneDescriptor: toneObj.descriptor, traits, wordsUse, wordsAvoid,
          },
        }),
      })
    } catch {
      // non-blocking
    } finally {
      setDlLoading(false); setSent(true)
    }
  }

  // ── Reusable field styles ──
  const inputCls = "w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
  const labelCls = "text-sm font-semibold text-slate-700 block mb-2"

  // Inline render-functions (NOT components) so parent re-renders don't remount
  // the inputs and steal focus while typing.
  const renderColorField = (label: string, hex: string, set: (v: string) => void) => (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="flex items-center gap-2">
        <input type="color" value={isValidHex(hex) ? hex : "#000000"} onChange={e => set(e.target.value)}
          className="w-11 h-11 rounded-lg border border-slate-200 cursor-pointer shrink-0 bg-white p-0.5" aria-label={`${label} swatch`} />
        <input type="text" value={hex} onChange={e => set(normalizeHex(e.target.value))} placeholder="#185FA5"
          className={`${inputCls} font-mono`} />
      </div>
      <p className="text-xs text-slate-400 mt-1.5 font-mono">{isValidHex(hex) ? rgbStr(hex) : "Enter a valid hex like #185FA5"}</p>
    </div>
  )

  const renderFontSelect = (label: string, value: string, name: string, custom: boolean, which: "heading" | "body") => (
    <div>
      <label className={labelCls}>{label}</label>
      <select value={custom ? "__custom_current__" : value} onChange={e => onFontSelect(e.target.value, which)} className={`${inputCls} cursor-pointer`}>
        {custom && <option value="__custom_current__">{name} (uploaded)</option>}
        {FONT_GROUPS.map(g => (
          <optgroup key={g.label} label={g.label}>
            {g.fonts.map(f => <option key={f} value={f}>{f}</option>)}
          </optgroup>
        ))}
        <option value="__upload__">＋ Upload your own font…</option>
      </select>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 sm:pt-40 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/free-tools" className="hover:text-slate-600 transition-colors">Free Tools</Link>
            <span>/</span>
            <span className="text-slate-600">Brand Guidelines Generator</span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Card header */}
            <div className="px-8 py-6" style={{ background: "linear-gradient(135deg, #7c3aed, #db2777, #f59e0b)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Tool 03</p>
                  <h1 className="text-xl font-bold text-white">Brand Guidelines Generator</h1>
                </div>
              </div>
              <p className="text-white/85 text-sm mt-3 max-w-lg">
                Pick your fonts, colors, and tone of voice. We&apos;ll turn them into a beautiful one-page brand guideline you can download — and paste straight into your AI agent so it always stays on brand.
              </p>
            </div>

            <div className="p-8">
              {phase === "form" ? (
                <div className="space-y-8">
                  {/* Basics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Brand name <span className="text-red-400">*</span></label>
                      <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="Acme Studio" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Tagline <span className="text-slate-300 font-normal">(optional)</span></label>
                      <input type="text" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Design that works." className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>What does your brand do? <span className="text-slate-300 font-normal">(optional — used as your body-copy sample)</span></label>
                    <input type="text" value={mission} onChange={e => setMission(e.target.value)} placeholder="We build websites that turn visitors into customers." className={inputCls} />
                  </div>

                  {/* Logo */}
                  <div>
                    <label className={labelCls}>Logo <span className="text-slate-300 font-normal">(optional — PNG or JPG works best)</span></label>
                    {logoImg ? (
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-16 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={logoImg.src} alt="Your logo preview" className="max-w-full max-h-full object-contain" />
                        </div>
                        <button type="button" onClick={() => logoFileRef.current?.click()} className="text-sm font-semibold text-primary hover:underline cursor-pointer">Replace</button>
                        <button type="button" onClick={() => setLogoImg(null)} className="text-sm text-slate-400 hover:text-red-400 transition-colors cursor-pointer">Remove</button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => logoFileRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-slate-200 rounded-lg text-sm text-slate-500 hover:border-primary hover:text-primary transition-colors cursor-pointer">
                        <Upload className="w-4 h-4" /> Upload your logo
                      </button>
                    )}
                    <input ref={logoFileRef} type="file" accept="image/png,image/jpeg,image/svg+xml,image/*" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); e.target.value = "" }} />
                  </div>

                  {/* Fonts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {renderFontSelect("Heading font", headingFont, headingName, headingCustom, "heading")}
                    {renderFontSelect("Body font", bodyFont, bodyName, bodyCustom, "body")}
                    <input ref={headingFileRef} type="file" accept=".woff2,.woff,.ttf,.otf,font/*" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleFontUpload(f, "heading"); e.target.value = "" }} />
                    <input ref={bodyFileRef} type="file" accept=".woff2,.woff,.ttf,.otf,font/*" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleFontUpload(f, "body"); e.target.value = "" }} />
                  </div>

                  {/* Colors */}
                  <div>
                    <label className={labelCls}>Colors</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {PRESET_PALETTES.map(p => (
                        <button key={p.name} type="button"
                          onClick={() => { setPrimaryHex(p.primary); setSecondaryHex(p.secondary); setAccentHex(p.accent) }}
                          className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-primary transition-colors cursor-pointer">
                          <span className="flex -space-x-1">
                            <span className="w-4 h-4 rounded-full border border-white" style={{ background: p.primary }} />
                            <span className="w-4 h-4 rounded-full border border-white" style={{ background: p.secondary }} />
                            <span className="w-4 h-4 rounded-full border border-white" style={{ background: p.accent }} />
                          </span>
                          <span className="text-xs font-medium text-slate-500 group-hover:text-primary">{p.name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {renderColorField("Primary *", primaryHex, setPrimaryHex)}
                      {renderColorField("Secondary *", secondaryHex, setSecondaryHex)}
                      {renderColorField("Accent (optional)", accentHex, setAccentHex)}
                    </div>
                  </div>

                  {/* Tone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Tone of voice</label>
                      <select value={tone} onChange={e => setTone(e.target.value)} className={`${inputCls} cursor-pointer`}>
                        {TONES.map(t => <option key={t.value} value={t.value}>{t.value}</option>)}
                      </select>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{toneObj.descriptor}</p>
                    </div>
                    <div>
                      <label className={labelCls}>Who is it for? <span className="text-slate-300 font-normal">(optional)</span></label>
                      <input type="text" value={audience} onChange={e => setAudience(e.target.value)} placeholder="Small business owners in the US" className={inputCls} />
                    </div>
                  </div>

                  {/* Personality */}
                  <div>
                    <label className={labelCls}>Brand personality <span className="text-slate-300 font-normal">(pick up to 5)</span></label>
                    <div className="flex flex-wrap gap-2">
                      {TRAIT_OPTIONS.map(t => {
                        const on = traits.includes(t)
                        return (
                          <button key={t} type="button" onClick={() => toggleTrait(t)}
                            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${on ? "bg-primary text-white border-primary" : "bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary"}`}>
                            {t}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Words */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Words we use <span className="text-slate-300 font-normal">(optional)</span></label>
                      <input type="text" value={wordsUse} onChange={e => setWordsUse(e.target.value)} placeholder="simple, fast, human, honest" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Words we avoid <span className="text-slate-300 font-normal">(optional)</span></label>
                      <input type="text" value={wordsAvoid} onChange={e => setWordsAvoid(e.target.value)} placeholder="synergy, disrupt, leverage" className={inputCls} />
                    </div>
                  </div>

                  {/* Generate */}
                  <div>
                    <button onClick={handleGenerate} disabled={!canGenerate}
                      className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all ${canGenerate ? "bg-linear-to-r from-primary to-violet-500 text-white hover:opacity-90 cursor-pointer" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
                      Generate my brand guidelines <ArrowRight className="w-4 h-4" />
                    </button>
                    {!canGenerate && <p className="text-xs text-slate-400 mt-2">Add a brand name and valid primary &amp; secondary colors to continue.</p>}
                  </div>
                </div>

              ) : (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">Your brand guidelines</span>
                    </div>
                    <button onClick={() => setPhase("form")} className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer">
                      <ArrowLeft className="w-3.5 h-3.5" /> Edit
                    </button>
                  </div>

                  {/* Document preview */}
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-4">
                    <canvas ref={canvasRef} className="block mx-auto rounded-lg shadow-lg bg-white" style={{ maxWidth: "min(100%, 520px)", height: "auto" }} />
                  </div>

                  {/* Delivery capture */}
                  {!sent ? (
                    <div className="border-2 border-primary/20 bg-primary/5 rounded-xl p-6">
                      <h3 className="text-base font-bold text-slate-900 mb-1">Get your brand guidelines</h3>
                      <p className="text-sm text-slate-500 mb-5">Tell us where to send it — we&apos;ll email you the PNG plus the ready-to-paste text for your AI agent, and unlock the download.</p>
                      <form onSubmit={handleSend} className="space-y-3">
                        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={dlBot} onChange={e => setDlBot(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input type="text" required autoComplete="given-name" placeholder="First name" value={dlFirst} onChange={e => setDlFirst(e.target.value)} className={`${inputCls} bg-white`} />
                          <input type="text" required autoComplete="family-name" placeholder="Surname" value={dlLast} onChange={e => setDlLast(e.target.value)} className={`${inputCls} bg-white`} />
                        </div>
                        <input type="email" required autoComplete="email" placeholder="your@email.com" value={dlEmail} onChange={e => setDlEmail(e.target.value)} className={`${inputCls} bg-white`} />
                        <button type="submit" disabled={dlLoading}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-violet-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60">
                          {dlLoading ? "Sending…" : <><Download className="w-4 h-4" /> Email &amp; unlock download</>}
                        </button>
                        <p className="text-xs text-slate-400">No spam. We&apos;ll only use this to send your guidelines and follow up about your brand.</p>
                      </form>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-start gap-3 border border-green-100 bg-green-50 rounded-xl p-5">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Sent — check your inbox.</p>
                          <p className="text-sm text-slate-500 mt-0.5">Your brand guidelines are on their way to <strong>{dlEmail}</strong>. You can also grab them here:</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={downloadPng} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary to-violet-500 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer">
                          <Download className="w-4 h-4" /> Download PNG
                        </button>
                        <button onClick={copyMarkdown} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-800 transition-colors cursor-pointer">
                          {copied ? <><Check className="w-4 h-4 text-green-500" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy for your AI agent</>}
                        </button>
                      </div>

                      {/* Agent-ready text */}
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Paste this into your AI agent</p>
                        <pre className="text-xs leading-relaxed p-5 rounded-xl bg-slate-900 text-slate-200 overflow-x-auto whitespace-pre-wrap font-mono">{buildMarkdown()}</pre>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="rounded-2xl px-8 py-8" style={{ background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)" }}>
                    <h3 className="text-xl font-bold text-white mb-2">Want an AI agent that uses these guidelines automatically?</h3>
                    <p className="text-white/80 text-sm mb-5 max-w-lg">We build, deploy, and host custom AI agents that write and design on-brand every time. Tell us about your workflow and we&apos;ll build it — live in days.</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/get-started" className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
                        Get started <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link href="/agents/social-media" className="inline-flex items-center gap-2 border border-white/40 bg-white/10 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm">
                        See the social media agent
                      </Link>
                    </div>
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
