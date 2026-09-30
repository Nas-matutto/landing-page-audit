"use client"

import { Check, MessageSquareText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal, Screenshot } from "./parts"

// One row per job the agent does. Copy is written as what the agent DOES,
// and every claim maps to something the dashboard really shows.

interface Feature {
  verb: string
  title: string
  body: string
  bullets: string[]
  /** What you'd say to get it started. */
  ask: string
  visual: React.ReactNode
}

const FEATURES: Feature[] = [
  {
    verb: "Finds",
    title: "Finds your winning posts, and tells you why they won",
    body: "It reads every post on your account and measures it against your own median. Breakouts get flagged, and the patterns behind them get written up for you.",
    bullets: [
      "Flags every post that did 2× or more than your usual",
      "Finds your best days and times to post",
      "Shows which formats, video lengths and captions earn the most",
      "Ends with a plain-English verdict: keep, fix, try",
    ],
    ask: "Which of my posts should I make more of?",
    visual: (
      <div className="space-y-4">
        <Screenshot name="analysis" width={1600} height={570} alt="Your Agent's analysis: a one-line verdict with three instructions to keep, fix and try" />
        <Screenshot name="patterns" width={1600} height={1275} alt="Posting rhythm, breakout posts, the best times to post and what each format earns" />
      </div>
    ),
  },
  {
    verb: "Learns",
    title: "Learns what makes your audience stop scrolling",
    body: "It reads how your latest posts open, sorts every hook into a style, and scores each style against your median. Then it gives you a formula to copy.",
    bullets: [
      "Scores hook styles like question, result-first and list",
      "Shows your strongest opening and how far it beats your median",
      "Turns your best opener into a fill-in-the-blank formula",
      "Writes new hooks in the styles that work for you",
    ],
    ask: "Give me 5 hooks like my best post",
    visual: <Screenshot name="hooks" width={1600} height={1090} alt="The Hooks tab: the strongest opening style, takeaways, and every hook style scored against your median" />,
  },
  {
    verb: "Tracks",
    title: "Tracks your competitors, then turns what works into your next post",
    body: "It finds accounts like yours, tracks the ones you choose, and flags their breakout posts. The patterns behind them come back as plays you can run.",
    bullets: [
      "Suggests peers and bigger accounts in your niche",
      "Compares followers, views, engagement and posting rate side by side",
      "Flags competitor posts that did 2× their usual",
      "Writes “what to borrow” plays, and scripts your version on request",
    ],
    ask: "What are my competitors doing that I'm not?",
    visual: <Screenshot name="competitors" width={1600} height={1474} alt="You versus your competitors, with plays to borrow from their breakout posts" />,
  },
  {
    verb: "Creates",
    title: "Creates the post: hooks, script, caption and the finished carousel",
    body: "Tell it what to make and it writes the hooks, the script and the caption. For carousels it designs every slide in your brand kit, so it looks like you made it.",
    bullets: [
      "Writes ready-to-film kits from your best-performing posts",
      "Designs carousels and images in your logo, colours and font",
      "Edit any slide, or switch between portrait and square",
      "Set your brand kit once and it applies to everything",
    ],
    ask: "Make a carousel from my best topic",
    visual: (
      <div className="space-y-4">
        <Screenshot name="design" width={1500} height={1513} alt="The design studio: a five-slide carousel designed in the brand kit, with the slide text editable" sizes="(min-width: 1024px) 560px, 100vw" className="mx-auto max-w-[560px]" />
        <Screenshot name="brand-kit" width={1600} height={651} alt="The brand kit: logo, colours, font and layout with a live slide preview" />
      </div>
    ),
  },
  {
    verb: "Posts",
    title: "Schedules it into your best slot, then posts it for you",
    body: "Every post lands in your plan at the time that works for you. Turn on auto-post and the agent publishes it, or get an email reminder if you'd rather post yourself.",
    bullets: [
      "Plans posts into your best days and times",
      "Auto-posts to Instagram, Facebook and TikTok",
      "Emails you a reminder with the finished post if you'd rather do it",
      "Links the post back to your plan and tells you how it did",
    ],
    ask: "Plan my week, and post it for me",
    visual: <Screenshot name="plan" width={1600} height={898} alt="The content plan: a designed carousel set to auto-post, with hooks, script and caption ready" />,
  },
]

export function SocialAgentFeatures() {
  return (
    <div>
      {FEATURES.map((f, i) => {
        const flip = i % 2 === 1
        return (
          <section key={f.verb} className={cn("px-6 py-20 sm:py-28 lg:px-8", i % 2 === 0 ? "bg-white" : "border-y border-hairline bg-mist")}>
            <div className={cn("mx-auto grid max-w-7xl items-center gap-12 lg:gap-14", flip ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]")}>
              <Reveal className={cn(flip && "lg:order-2")}>
                <p className="eyebrow mb-5">
                  {String(i + 1).padStart(2, "0")} · It {f.verb.toLowerCase()}
                </p>
                <h2 className="display text-[clamp(1.85rem,3.6vw,2.75rem)]">{f.title}</h2>
                <p className="lede mt-5 max-w-lg text-base sm:text-lg">{f.body}</p>

                <ul className="mt-7 space-y-3">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                      <span className="text-sm leading-relaxed text-quiet">{b}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 inline-flex max-w-full items-center gap-2 rounded-full border border-hairline bg-white py-2 pl-3 pr-4 text-[13px] text-quiet">
                  <MessageSquareText className="h-4 w-4 shrink-0 text-ink" />
                  <span className="truncate">
                    Ask: <span className="font-medium text-ink">“{f.ask}”</span>
                  </span>
                </p>
              </Reveal>

              <Reveal delay={0.1} className={cn("min-w-0", flip && "lg:order-1")}>
                {f.visual}
              </Reveal>
            </div>
          </section>
        )
      })}
    </div>
  )
}
