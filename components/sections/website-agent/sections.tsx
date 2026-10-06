"use client"

import { X, Check, Wrench, Sparkles, Code2 } from "lucide-react"
import { SiClaude, SiOpenai, SiStackblitz, SiV0, SiWordpress } from "react-icons/si"
import type { IconType } from "react-icons"
import { Ambassador } from "@/components/ui/ambassador"
import { SIGNUP_URL } from "@/lib/links"
import { Reveal } from "@/components/sections/social-agent/parts"

// ── What it works with ──────────────────────────────────────────────────────

const BUILDERS: { label: string; Icon: IconType | typeof Code2 }[] = [
  { label: "Claude Code", Icon: SiClaude },
  { label: "Codex", Icon: SiOpenai },
  { label: "WordPress", Icon: SiWordpress },
  { label: "Lovable", Icon: Code2 },
  { label: "Bolt", Icon: SiStackblitz },
  { label: "v0", Icon: SiV0 },
]

export function BuilderStrip() {
  return (
    <section className="border-y border-hairline bg-white px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 xl:flex-row">
        <p className="eyebrow">Works with sites built in</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {BUILDERS.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink">
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">Via GitHub or WordPress</p>
      </div>
    </section>
  )
}

// ── Does, not supports ──────────────────────────────────────────────────────

const SUPPORTS = [
  "Waiting days for a developer to change one line",
  "Dragging blocks around a page builder yourself",
  "Re-prompting your AI builder and hoping nothing else breaks",
  "No easy way back when a change goes wrong",
]

const DOES = [
  "Shows you your live site, on desktop and phone",
  "Makes the change from one sentence",
  "Puts it live in minutes, on your own hosting",
  "Undoes any change in one click",
]

export function DoesNotSupport() {
  return (
    <section className="bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">The difference</p>
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">Other tools give you an editor. This agent makes the edit.</h2>
          <p className="lede mx-auto mt-6 max-w-2xl text-base sm:text-lg">
            Website builders hand you a drag-and-drop editor, and AI coding tools hand you a terminal. This one is a teammate: you say what to change, and it changes it.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal className="flex flex-col rounded-3xl border border-hairline bg-white p-7 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-quiet">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="eyebrow">The usual way</span>
            </div>
            <h3 className="mb-6 text-xl font-semibold tracking-[-0.01em] text-ink">Leaves the work with you</h3>
            <ul className="mt-auto space-y-3.5">
              {SUPPORTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-faint" />
                  <span className="text-sm leading-relaxed text-quiet">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="relative flex flex-col overflow-hidden rounded-3xl bg-ink p-7 sm:p-8">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="eyebrow text-white/50">Your AI agent</span>
            </div>
            <h3 className="mb-6 text-xl font-semibold tracking-[-0.01em] text-white">Does it for you</h3>
            <ul className="mt-auto space-y-3.5 pr-24 sm:pr-32">
              {DOES.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  <span className="text-sm leading-relaxed text-white/80">{point}</span>
                </li>
              ))}
            </ul>
            <Ambassador pose="thumbs-up" sizes="180px" className="pointer-events-none absolute -right-2 bottom-0 h-[150px] w-[130px] sm:h-[190px] sm:w-[165px]" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── How it works ────────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", title: "Connect your site", body: "Add your website and connect it through GitHub or WordPress. It opens in a live preview right away, and you never share a password." },
  { n: "02", title: "Say what to change", body: "Type it in plain English, like “make the button green” or “add a pricing page”. The agent makes the change on your site." },
  { n: "03", title: "Watch it go live", body: "Your site updates in minutes and the preview refreshes. Not quite right? Undo it in one click, or ask for a tweak." },
]

export function WebsiteHowItWorks() {
  return (
    <section className="border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-5">How it works</p>
          <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">From an idea to your live site, in three steps</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="rounded-3xl border border-hairline bg-white p-7 transition-colors hover:border-ink sm:p-8">
              <span className="font-mono text-lg font-medium text-faint">{s.n}</span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-quiet">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ───────────────────────────────────────────────────────────────

export function WebsiteFinalCta() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
        <div className="relative z-10 max-w-xl">
          <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Hand your website to an agent</h2>
          <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/65">
            Connect your site, tell it what to change, and watch it go live. Start free with 3 changes a month.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={SIGNUP_URL}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-opacity hover:opacity-90"
            >
              Get Started
            </a>
            <a
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-colors hover:bg-white/10"
            >
              Book Demo
            </a>
          </div>
          <p className="mt-6 text-xs text-white/40">Previews on this page use a sample site.</p>
        </div>
        <Ambassador pose="thumbs-up" sizes="360px" className="pointer-events-none absolute -bottom-2 -right-6 hidden h-[300px] w-[270px] sm:block lg:right-8 lg:h-[380px] lg:w-[340px]" />
      </Reveal>
    </section>
  )
}
