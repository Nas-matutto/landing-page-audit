"use client"

import { Check, Loader2, Menu, Monitor, RotateCcw, Smartphone, Star } from "lucide-react"
import { SiGithub, SiVercel, SiWordpress } from "react-icons/si"
import { Frame } from "@/components/sections/seo-agent/mocks"
import { cn } from "@/lib/utils"

// Panels in the style of the Website Manager's page in the app, filled with a
// sample site ("Northline Studio", a design studio built with Claude Code and
// kept on GitHub). They sit in the same frame as the other agent pages.

export const SITE = { name: "Northline Studio", domain: "northline.studio", builder: "Claude Code" }

/** The sample site, sketched: nav, hero, button, and the rest of the page. `flip` puts the picture first. */
function SiteSketch({ phone, green, reviews, flip, className }: { phone?: boolean; green?: boolean; reviews?: boolean; flip?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-white",
        phone ? "w-[132px] rounded-[20px] border-[5px] border-ink" : "rounded-xl border border-hairline",
        className,
      )}
    >
      {phone ? (
        <div className="flex justify-center py-1">
          <span className="h-0.5 w-8 rounded-full bg-ink/70" />
        </div>
      ) : (
        <div className="flex items-center gap-1 border-b border-hairline bg-mist px-2.5 py-1.5">
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: c }} />
          ))}
          <span className="ml-1.5 truncate rounded border border-hairline bg-white px-1.5 text-[9px] leading-3.5 text-faint">{SITE.domain}</span>
        </div>
      )}
      <div className={cn("flex items-center justify-between", phone ? "px-2.5 py-1.5" : "px-3.5 py-2")}>
        <span className="text-[9px] font-bold text-ink">{SITE.name}</span>
        {phone ? (
          <Menu className="h-2.5 w-2.5 text-ink" />
        ) : (
          <span className="flex gap-2 text-[8px] text-quiet">
            <span>Work</span>
            <span>Services</span>
            <span>Contact</span>
          </span>
        )}
      </div>
      <div className={cn("grid gap-2.5", phone ? "px-2.5 pb-2.5" : flip ? "grid-cols-[1fr_1.3fr] items-center px-3.5 pb-3" : "grid-cols-[1.3fr_1fr] items-center px-3.5 pb-3")}>
        <div className={cn(flip && !phone && "order-2")}>
          <p className={cn("font-bold leading-[1.1] tracking-tight text-ink", phone ? "text-[11px]" : "text-[13px] sm:text-[15px]")}>
            We design brands people remember
          </p>
          <p className="mt-1 text-[8px] leading-snug text-quiet">Strategy, identity and web design for teams of 5 to 50.</p>
          <span className={cn("mt-1.5 inline-flex rounded px-2 py-1 text-[8px] font-bold text-white", green ? "bg-emerald-600" : "bg-ink")}>Book a call</span>
        </div>
        <div className={cn("relative overflow-hidden rounded-lg bg-[#C7D2FE]", phone ? "h-12" : "aspect-[4/3]")}>
          <span className="absolute -bottom-4 -right-3 h-14 w-14 rounded-full bg-[#4F46E5]" />
          <span className="absolute left-2 top-2 h-5 w-8 rounded bg-white/80" />
        </div>
      </div>
      {reviews && (
        <div className={cn("grid gap-1.5", phone ? "px-2.5 pb-2.5" : "grid-cols-3 px-3.5 pb-3")}>
          {(phone ? [0] : [0, 1, 2]).map((i) => (
            <div key={i} className="rounded-md border border-hairline bg-mist p-1.5">
              <span className="flex gap-px text-amber-400">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-1.5 w-1.5 fill-current" />
                ))}
              </span>
              <span className="mt-1 block h-1 w-full rounded-full bg-hairline" />
              <span className="mt-0.5 block h-1 w-2/3 rounded-full bg-hairline" />
            </div>
          ))}
        </div>
      )}
      <div className={cn("grid grid-cols-3 gap-1.5", phone ? "px-2.5 pb-2.5" : "px-3.5 pb-3")}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-6 rounded-md bg-mist" />
        ))}
      </div>
    </div>
  )
}

function DeviceSwitch({ phone }: { phone?: boolean }) {
  return (
    <span className="flex rounded-full border border-hairline p-0.5">
      <span className={cn("rounded-full px-2 py-1", phone ? "text-quiet" : "bg-ink text-white")}>
        <Monitor className="h-3 w-3" />
      </span>
      <span className={cn("rounded-full px-2 py-1", phone ? "bg-ink text-white" : "text-quiet")}>
        <Smartphone className="h-3 w-3" />
      </span>
    </span>
  )
}

const LIVE = "bg-emerald-50 text-emerald-700 ring-emerald-200"

// ── Overview (hero) ─────────────────────────────────────────────────────────

export function OverviewPanel() {
  return (
    <Frame title={SITE.domain} meta={`Built with ${SITE.builder} · on GitHub`}>
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5 sm:px-5">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-quiet">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live preview
        </span>
        <DeviceSwitch />
      </div>
      <div className="bg-mist/60 p-3 sm:p-4">
        <SiteSketch green reviews flip />
      </div>
    </Frame>
  )
}

// ── Live preview ────────────────────────────────────────────────────────────

export function PreviewPanel() {
  return (
    <Frame title="Live preview" meta="Your real site, as visitors see it">
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5 sm:px-5">
        <span className="truncate font-mono text-[11px] text-quiet">{SITE.domain}/</span>
        <DeviceSwitch />
      </div>
      <div className="flex items-end gap-3 bg-mist/60 p-3 sm:gap-4 sm:p-5">
        <SiteSketch className="min-w-0 flex-1" />
        <SiteSketch phone className="hidden shrink-0 sm:block" />
      </div>
      <p className="border-t border-hairline bg-mist/60 px-4 py-3 text-[12px] leading-relaxed text-quiet sm:px-5">
        Asked “what does my contact page say?”, the agent <span className="font-medium text-ink">reads the page</span> and answers in a line.
      </p>
    </Frame>
  )
}

// ── Making a change ─────────────────────────────────────────────────────────

const CHANGE_STEPS = ["Found the hero on your homepage", "Added 3 client reviews under it, in your fonts and colours", "Put it live"]

export function ChangePanel() {
  return (
    <Frame title="Ask your agent" meta={SITE.name}>
      <div className="space-y-3.5 px-4 py-4 text-[13px] sm:px-5 sm:py-5">
        <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-mist px-3.5 py-2 font-medium">Add a reviews section under the hero</div>
        <div className="max-w-[90%] leading-relaxed text-quiet">
          On it. I&apos;m adding <span className="font-semibold text-ink">3 reviews from your clients</span> under the hero. You&apos;ll see it in the preview in a minute or two.
        </div>
        <div className="rounded-2xl border border-hairline p-3.5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold">Added a reviews section</p>
            <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset", LIVE)}>Live</span>
          </div>
          <p className="text-[11px] text-quiet">Homepage · under the hero</p>
          <ul className="mt-3 space-y-1.5">
            {CHANGE_STEPS.map((step) => (
              <li key={step} className="flex items-start gap-2 text-[12px]">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="h-2.5 w-2.5" />
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline bg-mist/60 p-3 sm:p-4">
        <SiteSketch reviews />
      </div>
    </Frame>
  )
}

// ── Going live ──────────────────────────────────────────────────────────────

const TIMELINE: { label: string; note: string; state: "done" | "active" }[] = [
  { label: "You asked", note: "“Make the Book a call button green”", state: "done" },
  { label: "Changed on your site", note: "The button, on every page it appears", state: "done" },
  { label: "Your host published it", note: "Vercel, the way it always does", state: "done" },
  { label: "Live on northline.studio", note: "The preview refreshed by itself", state: "active" },
]

export function PublishPanel() {
  return (
    <Frame title="Going live" meta="About 2 minutes, start to finish">
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium">
          <SiGithub className="h-3 w-3" aria-hidden /> GitHub
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium">
          <SiVercel className="h-3 w-3" aria-hidden /> Your hosting
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-2.5 py-1 text-[11px] font-medium">
          <SiWordpress className="h-3 w-3 text-[#21759B]" aria-hidden /> Or WordPress
        </span>
      </div>
      <ol className="space-y-0 px-4 py-4 sm:px-5">
        {TIMELINE.map((t, i) => (
          <li key={t.label} className="relative flex gap-3 pb-4 last:pb-0">
            {i < TIMELINE.length - 1 && <span aria-hidden className="absolute left-[11px] top-6 h-[calc(100%-18px)] w-px bg-hairline" />}
            <span
              className={cn(
                "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                t.state === "done" ? "bg-ink text-white" : "bg-emerald-600 text-white",
              )}
            >
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 pt-0.5">
              <span className="block text-[13px] font-semibold">{t.label}</span>
              <span className="block text-[12px] text-quiet">{t.note}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="border-t border-hairline bg-mist/60 px-4 py-3 text-[12px] leading-relaxed text-quiet sm:px-5">
        <span className="font-semibold text-ink">On WordPress</span>, a change is live the moment it&apos;s saved. No build to wait for.
      </p>
    </Frame>
  )
}

// ── Changes and undo ────────────────────────────────────────────────────────

const HISTORY: { title: string; when: string; undone?: boolean; working?: boolean }[] = [
  { title: "Added a pricing page", when: "Today, 10:45", working: true },
  { title: "Rewrote the homepage headline", when: "Yesterday, 16:20" },
  { title: "Made the Book a call button green", when: "Mon, 09:12", undone: true },
  { title: "Added a reviews section", when: "Mon, 09:05" },
]

export function ChangesPanel() {
  return (
    <Frame title="Changes" meta="Newest first">
      <ul className="divide-y divide-hairline">
        {HISTORY.map((h) => (
          <li key={h.title} className="flex items-center gap-3 px-4 py-3 sm:px-5">
            <span className="min-w-0 flex-1">
              <span className={cn("block truncate text-[13px] font-medium", h.undone && "text-quiet line-through")}>{h.title}</span>
              <span className="block truncate text-[11px] text-quiet">{h.when}</span>
            </span>
            {h.working ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700 ring-1 ring-inset ring-sky-200">
                <Loader2 className="h-2.5 w-2.5 animate-spin" /> Going live
              </span>
            ) : h.undone ? (
              <span className="shrink-0 rounded-full bg-mist px-2 py-0.5 text-[10px] font-semibold text-quiet ring-1 ring-inset ring-hairline">Undone</span>
            ) : (
              <>
                <span className={cn("hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset sm:inline", LIVE)}>Live</span>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-hairline px-2.5 py-1 text-[11px] font-semibold">
                  <RotateCcw className="h-3 w-3" /> Undo
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
      <p className="border-t border-hairline bg-mist/60 px-4 py-3 text-[12px] leading-relaxed text-quiet sm:px-5">
        <span className="font-semibold text-ink">Undo is free</span> and never counts towards your plan&apos;s changes.
      </p>
    </Frame>
  )
}
