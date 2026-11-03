"use client"

import { Check, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/sections/social-agent/parts"
import { OpportunitiesPanel, PagePanel, PublishPanel, RankingsPanel, ReportPanel } from "./mocks"

// One row per outcome the agent gets you. Copy leads with the result, then
// says how the agent gets there; every claim maps to something the agent
// really does with your data.

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
    label: "More clicks, sooner",
    title: "Win the searches you're closest to",
    body: "Your agent reads your Google Search Console and finds the searches where one good page or a better title puts you on page one. You start with the wins worth the most traffic.",
    bullets: [
      "Searches stuck on page two that one good page can push up",
      "Pages people see but don't click, with a better title ready",
      "Questions your buyers ask that no page of yours answers",
      "Pages competing with each other for the same search",
    ],
    result: "Traffic from searches you were already close to",
    visual: <OpportunitiesPanel />,
  },
  {
    label: "Know what's working",
    title: "Know every week what grew your traffic, and why",
    body: "Every week you get a plain-English verdict on your clicks, impressions and positions, plus proof of whether last week's work paid off.",
    bullets: [
      "This week against last week, with the change",
      "The pages and searches that moved most, up and down",
      "Every past recommendation followed up with real numbers",
      "On a schedule, or whenever you ask",
    ],
    result: "No more guessing which work paid off",
    visual: <ReportPanel />,
  },
  {
    label: "Pages that bring buyers",
    title: "Pages that rank on Google and get quoted by AI",
    body: "Each page is written for the search it targets, in your voice, and built the way ChatGPT, Claude and Perplexity like to quote. Buyers find you whether they search or ask.",
    bullets: [
      "Titles, meta, headings and internal links, done for SEO",
      "A direct answer up top that AI tools can lift and cite",
      "Question-style headings, FAQ blocks and schema",
      "Written to beat the pages that rank today",
    ],
    result: "Content that brings in buyers, without writing it",
    visual: <PagePanel />,
  },
  {
    label: "Live without lifting a finger",
    title: "New pages live on your site, with no copy and paste",
    body: "Finished pages go straight into your website as drafts for you to approve, or live on autopilot. Your site keeps growing while you get on with your week.",
    bullets: [
      "Publishes to WordPress, Webflow, Shopify and Ghost",
      "Review first, or switch to autopilot when you trust it",
      "Updates live pages that slip, not just new ones",
      "Links new pages into the rest of your site",
    ],
    result: "A site that grows every week on its own",
    visual: <PublishPanel />,
  },
  {
    label: "Rankings that hold",
    title: "Keep the traffic you win, on Google and in AI answers",
    body: "Once a page is live, your agent watches where it ranks on Google and whether AI tools quote it. When a page slips, it rewrites it before you lose the traffic.",
    bullets: [
      "Google position for every page it writes or updates",
      "Which AI tools cite you: ChatGPT, Claude, Perplexity and Gemini",
      "Pages refreshed as soon as they start to slip",
      "How each page did, in your weekly report",
    ],
    result: "Traffic you keep, not just traffic you win",
    visual: <RankingsPanel />,
  },
]

export function SeoAgentFeatures() {
  return (
    <div>
      {OUTCOMES.map((o, i) => {
        const flip = i % 2 === 1
        return (
          <section key={o.label} className={cn("px-6 py-20 sm:py-28 lg:px-8", i % 2 === 0 ? "bg-white" : "border-y border-hairline bg-mist")}>
            <div className={cn("mx-auto grid max-w-7xl items-center gap-12 lg:gap-14", flip ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]")}>
              <Reveal className={cn("min-w-0", flip && "lg:order-2")}>
                <p className="eyebrow mb-5">
                  <span className="text-seo">{String(i + 1).padStart(2, "0")}</span> · {o.label}
                </p>
                <h2 className="display text-[clamp(1.85rem,3.6vw,2.75rem)]">{o.title}</h2>
                <p className="lede mt-5 max-w-lg text-base sm:text-lg">{o.body}</p>

                <ul className="mt-7 space-y-3">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-seo" />
                      <span className="text-sm leading-relaxed text-quiet">{b}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 inline-flex max-w-full items-center gap-2 rounded-full bg-seo-soft py-2 pl-3 pr-4 text-[13px] text-seo ring-1 ring-inset ring-seo/15">
                  <TrendingUp className="h-4 w-4 shrink-0" />
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
