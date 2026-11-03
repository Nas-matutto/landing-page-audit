"use client"

import { Check, CornerDownLeft, Mail, Send, Target } from "lucide-react"
import { SiGmail } from "react-icons/si"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/sections/social-agent/parts"
import { Frame } from "@/components/sections/seo-agent/mocks"

// One row per outcome the agent gets you. Copy leads with the result, then
// says how the agent gets there. Panels use a sample business: a marketing
// agency selling to other agencies, the same as the homepage SDR showcase.

function Initials({ name }: { name: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">
      {name.split(" ").map((p) => p[0]).join("")}
    </span>
  )
}

function FitTag({ strong }: { strong?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset",
        strong ? "bg-sdr-soft text-sdr ring-sdr/20" : "bg-mist text-ink ring-hairline",
      )}
    >
      {strong ? "Strong fit" : "Good fit"}
    </span>
  )
}

// ── Panels ──────────────────────────────────────────────────────────────────

const LEADS = [
  { name: "Maya Collins", role: "Founder, Northwind Creative", why: "Hiring 2 account managers", strong: true },
  { name: "Daniel Okafor", role: "Head of Growth, Brightside Media", why: "Launched a new service line", strong: true },
  { name: "Priya Nair", role: "MD, Loop & Lantern", why: "Team grew 40% this year", strong: false },
  { name: "Leo Brandt", role: "CEO, Fieldhouse Studio", why: "Posted about slow months", strong: false },
]

function LeadsPanel() {
  return (
    <Frame title="Today's leads" meta="38 found · 6:02am">
      <div className="p-4 sm:p-5">
        <p className="flex items-start gap-2 rounded-xl bg-mist px-3 py-2.5 text-[13px] leading-snug text-quiet">
          <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sdr" />
          Marketing agencies with 10 to 50 people that need more qualified leads
        </p>
        <ul className="mt-4 divide-y divide-hairline">
          {LEADS.map((l) => (
            <li key={l.name} className="flex items-center gap-3 py-2.5">
              <Initials name={l.name} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{l.name}</span>
                <span className="block truncate text-xs text-quiet">{l.role}</span>
              </span>
              <span className="hidden min-w-0 truncate text-[11px] text-quiet sm:block">{l.why}</span>
              <FitTag strong={l.strong} />
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  )
}

function EmailPanel() {
  return (
    <Frame title="Email to Maya Collins" meta="Written in your voice">
      <div className="p-4 text-[13px] sm:p-5">
        <p className="text-quiet">
          <span className="text-faint">Subject</span> <span className="font-semibold text-ink">Northwind&apos;s new account manager roles</span>
        </p>
        <div className="mt-3 space-y-2.5 leading-relaxed text-ink">
          <p>Hi Maya,</p>
          <p>
            <mark className="rounded bg-sdr-soft px-1 text-sdr">Saw Northwind is hiring two account managers</mark>, so I&apos;m guessing new client demand is up.
          </p>
          <p>We help agencies like yours turn that demand into booked calls without adding headcount. Worth a 15 minute look this week?</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-hairline pt-3.5 text-[11px] text-quiet">
          <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-0.5 font-medium text-ink">
            <Check className="h-3 w-3 text-sdr" /> Opens on why now
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-0.5 font-medium text-ink">
            <Check className="h-3 w-3 text-sdr" /> One clear ask
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-0.5 font-medium text-ink">
            <Check className="h-3 w-3 text-sdr" /> Short and easy to read
          </span>
        </div>
      </div>
    </Frame>
  )
}

const SEQUENCE = [
  { day: "Day 1", what: "First email", note: "Northwind's new account manager roles", sent: true },
  { day: "Day 3", what: "Follow-up", note: "A short nudge with one example", sent: false },
  { day: "Day 7", what: "Last follow-up", note: "Closes the loop, politely", sent: false },
]

function SequencePanel() {
  return (
    <Frame title="Sequence for Maya Collins" meta="Lined up automatically">
      <ol className="relative p-4 sm:p-5">
        <span aria-hidden className="absolute bottom-9 left-[31px] top-9 w-px bg-hairline sm:left-[35px]" />
        {SEQUENCE.map((s) => (
          <li key={s.day} className="relative flex items-start gap-3 py-2.5">
            <span
              className={cn(
                "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                s.sent ? "bg-sdr text-white" : "bg-white text-quiet ring-1 ring-inset ring-hairline",
              )}
            >
              {s.sent ? <Check className="h-3.5 w-3.5" /> : <Send className="h-3 w-3" />}
            </span>
            <span className="min-w-0 flex-1 rounded-xl border border-hairline px-3 py-2.5">
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{s.what}</span>
                <span className={cn("shrink-0 text-[11px] font-semibold", s.sent ? "text-sdr" : "text-quiet")}>
                  {s.day} · {s.sent ? "Sent" : "Scheduled"}
                </span>
              </span>
              <span className="mt-0.5 block truncate text-xs text-quiet">{s.note}</span>
            </span>
          </li>
        ))}
      </ol>
    </Frame>
  )
}

const REPLIES = [
  { name: "Maya Collins", text: "Good timing, actually. Does Thursday at 2 work?", hot: true },
  { name: "Daniel Okafor", text: "Can you send over pricing and a case study?", hot: true },
  { name: "Priya Nair", text: "Not this quarter, but try me again in January.", hot: false },
]

function RepliesPanel() {
  return (
    <Frame title="Your inbox" meta="Replies to your agent's emails">
      <ul className="divide-y divide-hairline px-4 sm:px-5">
        {REPLIES.map((r) => (
          <li key={r.name} className="flex items-start gap-3 py-3.5">
            <Initials name={r.name} />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold">{r.name}</span>
                <SiGmail className="h-3 w-3 shrink-0 text-[#EA4335]" aria-hidden />
              </span>
              <span className="mt-0.5 flex items-start gap-1.5 text-[13px] leading-snug text-quiet">
                <CornerDownLeft className="mt-0.5 h-3 w-3 shrink-0 text-faint" />
                {r.text}
              </span>
            </span>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset",
                r.hot ? "bg-sdr text-white ring-sdr" : "bg-mist text-quiet ring-hairline",
              )}
            >
              {r.hot ? "Interested" : "Later"}
            </span>
          </li>
        ))}
      </ul>
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
    label: "A full list, every day",
    title: "Start every morning with buyers who fit",
    body: "Describe your ideal customer once. Your agent searches for the companies and people that match, and checks each one for a reason to talk to you now.",
    bullets: [
      "B2B leads that match the customer you describe",
      "Spots the signals that say now is a good time: hiring, funding, growth, new launches",
      "Tells you why each lead fits, so you know who to call first",
      "Change who you're after any time, in plain English",
    ],
    result: "No more evenings building lead lists",
    visual: <LeadsPanel />,
  },
  {
    label: "More replies",
    title: "Emails that get answered, not deleted",
    body: "Every email is written for one person, opening on something true about their business. That's what makes a busy founder stop scrolling and reply.",
    bullets: [
      "A tailored email for every lead, never a mail merge",
      "Opens on why now, then makes one clear ask",
      "Written in your voice, about their business",
      "Short enough to read on a phone between meetings",
    ],
    result: "Conversations with buyers, not silence",
    visual: <EmailPanel />,
  },
  {
    label: "No lead goes cold",
    title: "Every follow-up sent, even on your busiest week",
    body: "Plenty of buyers only reply to the second or third email, and that's exactly where busy people drop the ball. Your agent lines up every follow-up the moment the first email is written.",
    bullets: [
      "A full sequence for every lead, not a single email",
      "Follow-ups timed for you, so nobody gets forgotten",
      "Keeps going while you're in meetings, on holiday or closing deals",
    ],
    result: "The deals you used to lose to bad timing",
    visual: <SequencePanel />,
  },
  {
    label: "Replies land with you",
    title: "Buyers reply straight to your inbox, ready to talk",
    body: "On paid plans your agent sends from your own Gmail or Outlook. Replies come to you like any other email, so you step in exactly when a buyer is warm.",
    bullets: [
      "Sends from your own mailbox, under your name",
      "Replies arrive in the inbox you already use",
      "Nothing to copy and paste between tools",
      "You spend your time on the people who said yes",
    ],
    result: "More sales calls, without hiring an SDR",
    visual: <RepliesPanel />,
  },
]

export function SdrAgentOutcomes() {
  return (
    <div>
      {OUTCOMES.map((o, i) => {
        const flip = i % 2 === 1
        return (
          <section key={o.label} className={cn("px-6 py-20 sm:py-28 lg:px-8", i % 2 === 0 ? "bg-white" : "border-y border-hairline bg-mist")}>
            <div className={cn("mx-auto grid max-w-7xl items-center gap-12 lg:gap-14", flip ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]")}>
              <Reveal className={cn("min-w-0", flip && "lg:order-2")}>
                <p className="eyebrow mb-5">
                  <span className="text-sdr">{String(i + 1).padStart(2, "0")}</span> · {o.label}
                </p>
                <h2 className="display text-[clamp(1.85rem,3.6vw,2.75rem)]">{o.title}</h2>
                <p className="lede mt-5 max-w-lg text-base sm:text-lg">{o.body}</p>

                <ul className="mt-7 space-y-3">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sdr" />
                      <span className="text-sm leading-relaxed text-quiet">{b}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 inline-flex max-w-full items-center gap-2 rounded-full bg-sdr-soft py-2 pl-3 pr-4 text-[13px] text-sdr ring-1 ring-inset ring-sdr/15">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    You get: <span className="font-semibold">{o.result}</span>
                  </span>
                </p>
              </Reveal>

              <Reveal className={cn("min-w-0", flip && "lg:order-1")}>
                {o.visual}
              </Reveal>
            </div>
          </section>
        )
      })}
    </div>
  )
}
