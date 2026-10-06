"use client"

import { Check, MessageSquareText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/sections/social-agent/parts"
import { ChangePanel, ChangesPanel, PreviewPanel, PublishPanel } from "./mocks"

// One row per job the agent does, written as what the agent DOES. Every claim
// maps to something the Website Manager really does (app-TTDM lib/website).

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
    verb: "Shows",
    title: "Shows you your live site, right next to the chat",
    body: "Add your website and it opens in a live preview, on desktop or phone. Ask about anything on it: the agent reads the page and answers in plain English.",
    bullets: [
      "Your real site, as your visitors see it",
      "Switch between desktop and phone in one click",
      "Reads any page, so it can answer questions about it",
      "Refreshes by itself when a change goes live",
    ],
    ask: "What does my contact page say?",
    visual: <PreviewPanel />,
  },
  {
    verb: "Changes",
    title: "Makes the change from one sentence",
    body: "Say what you want, the way you'd say it to a web developer. The agent finds the right place on your site, makes the change, and keeps your fonts, colours and style.",
    bullets: [
      "New wording, colours, sections and whole new pages",
      "Adds new pages to your menu so people can find them",
      "One request is one change, so nothing else moves",
      "Asks one short question when a request could mean two things",
    ],
    ask: "Add a reviews section under the hero",
    visual: <ChangePanel />,
  },
  {
    verb: "Publishes",
    title: "Puts it live in minutes, on your own hosting",
    body: "Sites built with Claude Code, Codex, Lovable or Bolt live on GitHub, so the change goes there and your host publishes it as it always does. On WordPress, it's live the moment it's saved.",
    bullets: [
      "Connects through GitHub or WordPress, free on every plan",
      "Your site stays on your hosting and your domain",
      "Most changes are live in 1 to 3 minutes",
      "Tells you plainly if your host couldn't publish a change",
    ],
    ask: "Make the Book a call button green",
    visual: <PublishPanel />,
  },
  {
    verb: "Undoes",
    title: "Undoes any change in one click",
    body: "Every change is kept in a list, newest first. If you don't like one, undo it, or just tell the agent to put it back. Undo is always free.",
    bullets: [
      "A record of everything it changed, and when",
      "Undo any change, not only the last one",
      "Undo never counts towards your plan",
      "Or ask in plain English: “put the old headline back”",
    ],
    ask: "Undo the last change",
    visual: <ChangesPanel />,
  },
]

export function WebsiteAgentFeatures() {
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
