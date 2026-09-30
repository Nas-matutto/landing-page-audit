"use client"

import { Check, FileText, Search, Sparkles, TrendingDown, UploadCloud } from "lucide-react"
import { AgentDemo, B, type Command } from "@/components/sections/social-agent/agent-demo"

// The same replay as the social agent page, with the SEO agent's jobs on a
// sample site ("Flowdesk", a SaaS on Webflow): Search Console analysis in chat,
// SEO + GEO pages, publishing and rank tracking.

const PAGE_DRAFT = (
  <div className="rounded-2xl border border-hairline p-3.5 text-[13px]">
    <p className="font-mono text-[11px] text-quiet">/blog/best-crm-for-agencies</p>
    <p className="mt-1 font-semibold text-ink">Best CRM for Agencies in 2026: 7 Tools Compared</p>
    <ul className="mt-2.5 flex flex-wrap gap-1.5">
      {["Direct answer up top", "FAQ schema", "4 internal links"].map((c) => (
        <li key={c} className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-0.5 text-[11px] font-medium text-ink">
          <Check className="h-3 w-3" /> {c}
        </li>
      ))}
    </ul>
  </div>
)

const COMMANDS: Command[] = [
  {
    id: "win",
    prompt: "Which searches can I win this month?",
    Icon: Search,
    steps: ["Reading 3 months of Search Console data", "Finding searches stuck on page two", "Estimating the traffic each one is worth"],
    reply: (
      <>
        <p>
          Start with <B>“best crm for agencies”</B>. You&apos;re #11 on 18.2K impressions, so one stronger page puts it on page one: about <B>+640 clicks a month</B>.
        </p>
        <p className="mt-2">
          Next, <B>“crm pricing for agencies”</B>. You rank #4 but only 1.9% of people click, so it needs a better title, not a new page.
        </p>
      </>
    ),
  },
  {
    id: "drop",
    prompt: "Why did my clicks drop on /pricing?",
    Icon: TrendingDown,
    steps: ["Comparing this week with last week", "Checking the queries behind /pricing", "Reading the pages now above you"],
    reply: (
      <>
        <p>
          /pricing slipped from <B>#6 to #8</B> for “crm pricing for agencies”. The two pages that passed you answer the price in their first line. Yours doesn&apos;t until halfway down.
        </p>
        <p className="mt-2">I&apos;ve rewritten the title and intro to lead with the price. Want me to publish the update?</p>
      </>
    ),
  },
  {
    id: "write",
    prompt: "Write my next page",
    Icon: FileText,
    steps: ["Picking your biggest opportunity", "Reading the pages that rank today", "Writing it for Google and for AI answers"],
    attachment: PAGE_DRAFT,
    reply: (
      <p>
        Done. A <B>2,100-word guide</B> targeting “best crm for agencies”, with a direct answer AI can quote, question-style headings and FAQ schema. It&apos;s a draft in Webflow.
      </p>
    ),
  },
  {
    id: "ai",
    prompt: "Am I cited by ChatGPT?",
    Icon: Sparkles,
    steps: ["Asking ChatGPT, Claude, Perplexity and Gemini", "Checking which sources they quote", "Matching them to your pages"],
    reply: (
      <>
        <p>
          Yes, on <B>3 of your pages</B>. ChatGPT, Perplexity and Gemini quote “Best CRM for agencies” when asked what CRM a small agency should use.
        </p>
        <p className="mt-2">
          Claude cites a competitor for billing questions. A short <B>FAQ on billable hours</B> would give it an answer to quote. Want me to write it?
        </p>
      </>
    ),
  },
  {
    id: "publish",
    prompt: "Publish it to my site",
    Icon: UploadCloud,
    steps: ["Running the final SEO checks", "Adding internal links from 4 pages", "Publishing to Webflow"],
    reply: (
      <p>
        Live at <B>flowdesk.io/blog/best-crm-for-agencies</B>. I&apos;ll track where it ranks on Google and in AI answers, and tell you how it did in Monday&apos;s report.
      </p>
    ),
  },
]

export function SeoAgentDemo() {
  return <AgentDemo commands={COMMANDS} startIndex={2} />
}
