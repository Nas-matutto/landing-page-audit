"use client"

import { Check, MessageSquareText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/sections/social-agent/parts"
import { OpportunitiesPanel, PagePanel, PublishPanel, RankingsPanel, ReportPanel } from "./mocks"

// One row per job the agent does. Copy is written as what the agent DOES,
// and every claim maps to something the agent really does with your data.

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
    title: "Finds the searches you're closest to winning",
    body: "It reads your Google Search Console: every query, every page, every click. Then it ranks what to do next by how much traffic it's worth and how much work it takes.",
    bullets: [
      "Flags searches stuck on page two that one good page can push up",
      "Spots pages people see but don't click, and fixes the title",
      "Finds questions your buyers ask that no page of yours answers",
      "Catches pages competing with each other for the same search",
    ],
    ask: "Which searches can I win this month?",
    visual: <OpportunitiesPanel />,
  },
  {
    verb: "Reports",
    title: "Tells you what changed this week, and why",
    body: "Every week it compares your clicks, impressions and positions with the week before. You get a plain-English verdict, and a check on whether last week's work paid off.",
    bullets: [
      "Totals for this week against last week, with the change",
      "The pages and searches that moved most, up and down",
      "Follows up on every past recommendation with real numbers",
      "Runs on a schedule, or whenever you ask",
    ],
    ask: "Why did my clicks drop on /pricing?",
    visual: <ReportPanel />,
  },
  {
    verb: "Writes",
    title: "Writes pages built to rank on Google and get quoted by AI",
    body: "Each page is written for the search it targets, in your voice. It's structured for Google, and for ChatGPT, Claude and Perplexity, which quote pages that answer clearly.",
    bullets: [
      "Titles, meta, headings and internal links, done for SEO",
      "Opens with a direct answer AI tools can lift and cite",
      "Question-style headings, FAQ blocks and schema",
      "Checks who ranks today, so each page beats the real bar",
    ],
    ask: "Write my next page",
    visual: <PagePanel />,
  },
  {
    verb: "Publishes",
    title: "Publishes it to your site, on your schedule",
    body: "Finished pages go straight into your website as drafts for you to approve, or live on autopilot. No copying and pasting, no formatting to fix.",
    bullets: [
      "Publishes to WordPress, Webflow, Shopify and Ghost",
      "Review first, or switch to autopilot when you trust it",
      "Updates live pages that slip, not just new ones",
      "Links new pages into the rest of your site",
    ],
    ask: "Publish it to my site",
    visual: <PublishPanel />,
  },
  {
    verb: "Tracks",
    title: "Tracks where you rank, on Google and in AI answers",
    body: "Once a page is live, the agent watches its position on Google and checks whether AI tools quote it. When a page slips, it rewrites it before you lose the traffic.",
    bullets: [
      "Google position for every page it writes or updates",
      "Which AI tools cite you: ChatGPT, Claude, Perplexity and Gemini",
      "Refreshes pages that start to slip",
      "Shows how each page did in your weekly report",
    ],
    ask: "Am I cited by ChatGPT?",
    visual: <RankingsPanel />,
  },
]

export function SeoAgentFeatures() {
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
