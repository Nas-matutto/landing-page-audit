"use client"

import { Check, CornerDownRight, Filter, Mail, MessageCircle, Send } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"
import { SiReddit, SiX } from "react-icons/si"
import type { IconType } from "react-icons"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/sections/social-agent/parts"
import { Frame } from "@/components/sections/seo-agent/mocks"

// One row per outcome the agent gets you. Copy leads with the result, then
// says how the agent gets there. Panels use a sample business: a bookkeeping
// app for freelancers, the same as the homepage Social Listening showcase.

function MatchTag({ strong }: { strong?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset",
        strong ? "bg-ink text-white ring-ink" : "bg-mist text-ink ring-hairline",
      )}
    >
      {strong ? "Strong match" : "Good match"}
    </span>
  )
}

function PlatformMark({ Icon, color }: { Icon: IconType; color: string }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-hairline">
      <Icon className="h-3.5 w-3.5" style={{ color }} />
    </span>
  )
}

// ── Panels ──────────────────────────────────────────────────────────────────

const MATCHES = [
  { Icon: SiReddit, color: "#FF4500", where: "u/designdaily_ in r/freelance", post: "Tax time again and my receipts are a mess. What do you all use to track expenses?", ago: "12m", strong: true },
  { Icon: SiX, color: "#000000", where: "Kayla M. on X", post: "Chasing three clients for unpaid invoices today. There has to be a better way than spreadsheets.", ago: "1h", strong: true },
  { Icon: FaLinkedin, color: "#0A66C2", where: "Tom Reyes on LinkedIn", post: "Two years freelancing and I still do my books in a spreadsheet. What should I switch to?", ago: "3h", strong: false },
]

function MatchesPanel() {
  return (
    <Frame title="Found today" meta="14 people asking · last 24h">
      <ul className="divide-y divide-hairline">
        {MATCHES.map((m) => (
          <li key={m.where} className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
            <PlatformMark Icon={m.Icon} color={m.color} />
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2 text-xs text-quiet">
                <span className="truncate">
                  {m.where} · {m.ago}
                </span>
                <MatchTag strong={m.strong} />
              </span>
              <span className="mt-1 block text-[13px] leading-snug text-ink">{m.post}</span>
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

const READ = [
  { label: "Self-promotion", count: 96 },
  { label: "Vendors pitching", count: 41 },
  { label: "Off topic", count: 44 },
  { label: "Job posts", count: 23 },
]

function FilterPanel() {
  const skipped = READ.reduce((n, r) => n + r.count, 0)
  const max = Math.max(...READ.map((r) => r.count))
  return (
    <Frame title="Today's filter" meta={`${skipped + 14} posts read`}>
      <div className="p-4 sm:p-5">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-quiet">
          <Filter className="h-3.5 w-3.5" /> Skipped for you
        </p>
        <ul className="mt-3 space-y-2.5">
          {READ.map((r) => (
            <li key={r.label} className="grid grid-cols-[8rem_1fr_2rem] items-center gap-3 text-[13px]">
              <span className="text-quiet">{r.label}</span>
              <span className="h-2 overflow-hidden rounded-full bg-mist">
                <span className="block h-full rounded-full bg-faint" style={{ width: `${(r.count / max) * 100}%` }} />
              </span>
              <span className="text-right font-mono text-[12px] tabular-nums text-quiet">{r.count}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-white">
          <span className="text-sm font-semibold">Real buyers to reply to</span>
          <span className="font-mono text-lg font-semibold tabular-nums">14</span>
        </div>
      </div>
    </Frame>
  )
}

function ReplyPanel() {
  return (
    <Frame title="Reply to u/designdaily_" meta="r/freelance">
      <div className="p-4 text-[13px] sm:p-5">
        <div className="flex items-start gap-3 rounded-2xl bg-mist p-3.5">
          <PlatformMark Icon={SiReddit} color="#FF4500" />
          <p className="leading-snug text-ink">Tax time again and my receipts are a mess. What do you all use to track expenses without losing a weekend to it?</p>
        </div>
        <div className="mt-3 flex gap-2 pl-4">
          <CornerDownRight className="mt-3 h-4 w-4 shrink-0 text-faint" />
          <div className="rounded-2xl border border-hairline p-3.5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-quiet">
              <MessageCircle className="h-3.5 w-3.5" /> Reply drafted
            </p>
            <p className="mt-2 leading-relaxed text-ink">
              I feel this every year. What fixed it for me was snapping receipts into one app as they happen, so tax time is a 10 minute export, not a weekend. Happy to share my setup if useful.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-hairline pt-3.5 text-[11px]">
          {["Answers the question first", "No hard sell", "Sounds like you"].map((c) => (
            <span key={c} className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-0.5 font-medium text-ink">
              <Check className="h-3 w-3" /> {c}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function DmPanel() {
  return (
    <Frame title="DM to Kayla M." meta="On X">
      <div className="p-4 sm:p-5">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-quiet">
          <Mail className="h-3.5 w-3.5" /> DM drafted
        </p>
        <div className="mt-3 ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-md bg-ink px-4 py-3 text-[13px] leading-relaxed text-white">
          Hi Kayla, saw your post about chasing invoices. We built something that sends the reminders for you, happy to show you in two minutes.
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-hairline pt-4">
          <p className="text-xs text-quiet">Sent by you, from your account</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-white">
            <Send className="h-3.5 w-3.5" /> Send
          </span>
        </div>
      </div>
    </Frame>
  )
}

// ── Rows ────────────────────────────────────────────────────────────────────

interface Outcome {
  label: string
  title: string
  body: string
  bullets: string[]
  /** What it's worth to you, in one line. */
  result: string
  visual: React.ReactNode
}

const OUTCOMES: Outcome[] = [
  {
    label: "Warm leads every day",
    title: "Find people the day they ask for what you sell",
    body: "Describe who you help. Your agent reads the conversations across seven platforms and brings you the posts where someone is asking for exactly what you offer.",
    bullets: [
      "Reddit, X, Threads, YouTube, LinkedIn, Facebook and Instagram",
      "Matched to the people and problems you describe",
      "Every match rated, so you answer the strongest first",
      "Fresh posts every day, while they're still worth replying to",
    ],
    result: "Buyers who already want what you sell",
    visual: <MatchesPanel />,
  },
  {
    label: "Only real buyers",
    title: "Skip the noise, keep the buyers",
    body: "Most posts that mention your topic are other people selling. Your agent filters them out, so you only see the ones worth your time.",
    bullets: [
      "Skips self-promotion and vendors pitching their own tools",
      "Skips job posts and off topic chatter",
      "Keeps the people actually asking for help",
      "No more scrolling through hundreds of posts yourself",
    ],
    result: "Hours of scrolling back, every week",
    visual: <FilterPanel />,
  },
  {
    label: "Replies that get noticed",
    title: "A helpful reply for every post, not a pitch",
    body: "The fastest way to lose a buyer online is to answer with an ad. Your agent drafts a reply that actually helps, so people want to hear more.",
    bullets: [
      "Answers the question they asked, first",
      "Written in a natural voice, never a sales script",
      "Short enough to read in a feed",
      "Yours to edit before you post it",
    ],
    result: "Replies that start conversations",
    visual: <ReplyPanel />,
  },
  {
    label: "From comment to customer",
    title: "A DM ready to take it private",
    body: "Every match comes with a short direct message too, so you can move from a public thread to a real conversation in one step.",
    bullets: [
      "A DM drafted alongside every reply",
      "Mentions the exact post, so it never feels cold",
      "One small, easy ask",
      "Sent by you, from your own account",
    ],
    result: "More conversations that turn into customers",
    visual: <DmPanel />,
  },
]

export function ListeningAgentOutcomes() {
  return (
    <div>
      {OUTCOMES.map((o, i) => {
        const flip = i % 2 === 1
        return (
          <section key={o.label} className={cn("px-6 py-20 sm:py-28 lg:px-8", i % 2 === 0 ? "bg-white" : "border-y border-hairline bg-mist")}>
            <div className={cn("mx-auto grid max-w-7xl items-center gap-12 lg:gap-14", flip ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]")}>
              <Reveal className={cn("min-w-0", flip && "lg:order-2")}>
                <p className="eyebrow mb-5">
                  <span className="text-ink">{String(i + 1).padStart(2, "0")}</span> · {o.label}
                </p>
                <h2 className="display text-[clamp(1.85rem,3.6vw,2.75rem)]">{o.title}</h2>
                <p className="lede mt-5 max-w-lg text-base sm:text-lg">{o.body}</p>

                <ul className="mt-7 space-y-3">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                      <span className="text-sm leading-relaxed text-quiet">{b}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 inline-flex max-w-full items-center gap-2 rounded-full bg-ink py-2 pl-3 pr-4 text-[13px] text-white">
                  <Check className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    You get: <span className="font-semibold">{o.result}</span>
                  </span>
                </p>
              </Reveal>

              <Reveal delay={0.1} className={cn("min-w-0", flip && "lg:order-1")}>
                {o.visual}
              </Reveal>
            </div>
          </section>
        )
      })}
    </div>
  )
}
