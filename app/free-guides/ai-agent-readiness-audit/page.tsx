import Link from "next/link"
import { GuideSection, GuideShell, GuideTable } from "@/components/guides/guide-shell"
import type { Faq } from "@/lib/blog"
import { buildGuideMetadata } from "@/lib/guides"

const SLUG = "ai-agent-readiness-audit"

export const metadata = buildGuideMetadata(SLUG)

const FAQS: Faq[] = [
  {
    question: "What is an AI agent readiness audit?",
    answer:
      "An AI agent readiness audit is a self-assessment that scores how much of your work is still done by hand in the areas where AI agents help most. Ours has 20 questions across lead response, customer support, scheduling, admin and growth, scored out of 40.",
  },
  {
    question: "What does a low score mean?",
    answer:
      "A low score means more opportunity, not a problem. It shows your team spends real hours on work that doesn't need a person, so one or two well-placed agents tend to make a fast, visible difference. Start with your two lowest sections.",
  },
  {
    question: "How long does the audit take?",
    answer:
      "About 15 minutes. There are 20 multiple-choice questions, four per area, and you circle the answer that best describes how things work today. Then you add up each section and your total.",
  },
  {
    question: "Is my business too small for AI agents?",
    answer:
      "Usually not. Small teams often gain the most, because every hour an agent saves is an hour of the owner's or a key person's time. If you score low in even one area, you have a clear candidate for your first agent.",
  },
  {
    question: "What do I do with my results?",
    answer:
      "Bring your scores to a free 20-minute call. We map your two lowest sections to a specific agent design and tell you what it would automate, how long it takes to build and what it costs to run. Or use How to Build AI Agents to build it yourself.",
  },
]

export default function AIAgentReadinessAuditPage() {
  return (
    <GuideShell slug={SLUG} faqs={FAQS} ctaHeading="Ready to find out where you stand?">
      <GuideSection id="what-it-measures" title="What does the AI agent readiness audit measure?">
        <p>
          It measures how much of your work is still manual in the five areas where AI agents pay off most. Each area has
          four questions, like the examples below:
        </p>
        <GuideTable
          caption="The five areas of the AI agent readiness audit"
          head={["Area", "What it looks at", "Example question"]}
          rows={[
            ["Lead response and sales", "How fast and consistently you respond to new inbound interest", "When a new lead comes in through your website or social, how fast do they typically get a response?"],
            ["Customer support", "How much support volume your team handles manually", "What share of your inbound support messages are repetitive questions you've answered many times?"],
            ["Scheduling and booking", "How appointments and availability are managed", "How do you reduce no-shows and last-minute cancellations?"],
            ["Admin and operations", "How much data entry, filing and follow-through your team owns", "How current is your CRM or client database, typically?"],
            ["Growth and retention", "How consistently you follow up, re-engage and ask for reviews", "How consistently do you request reviews after a completed job or service?"],
          ]}
        />
      </GuideSection>

      <GuideSection id="how-scoring-works" title="How is AI agent readiness scored?">
        <p>
          Each answer earns more points the more automated that job already is. Each area is scored out of 8, for a total
          out of 40. <strong>A lower score means more room to automate</strong>, not a worse business.
        </p>
        <GuideTable
          caption="AI agent readiness score bands"
          head={["Total", "Band", "What it means"]}
          rows={[
            ["0–12", "High opportunity", "Your business still runs almost entirely on manual effort. One or two well-placed agents tend to make a big difference, fast."],
            ["13–26", "Ready now", "The most common range. You have the foundations, with two or three areas where manual work is still the default. That is where an agent adds the most."],
            ["27–40", "Scale up", "You're already well systematized. Agents help you handle more volume, personalize at scale and add intelligence to simple automations."],
          ]}
        />
        <p>
          Whatever your total, look at your two lowest section scores. They are your highest-leverage starting points.
          Most businesses start with one agent on their weakest area, see results, then expand from there.
        </p>
      </GuideSection>

      <GuideSection id="readiness-signs" title="How do you know your business is ready for an AI agent?">
        <p>
          Your business is ready for an AI agent when you have work that is frequent, repetitive and rule-based, and
          someone on your team still does it by hand. Typical signs:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-faint">
          <li>New leads wait hours, or until the next day, for a first reply.</li>
          <li>Your team answers the same support questions every week.</li>
          <li>Booking a call takes several back-and-forth messages.</li>
          <li>Your CRM is weeks behind because updating it is always the last job.</li>
          <li>Review requests and follow-ups only happen when someone remembers.</li>
        </ul>
        <p>
          You don&apos;t need perfect data or a technical team to start. You need one clearly defined task to hand over.
          Our guide to <Link href="/blog/what-are-ai-agents">what AI agents are</Link> explains how they work, and the{" "}
          <Link href="/free-guides/business-automation-checklist">business automation checklist</Link> helps you list the
          candidates.
        </p>
      </GuideSection>

      <GuideSection id="who-its-for" title="Who is the audit for?">
        <p>
          Business owners and operators who are curious about AI agents but unsure where they fit, or whether their
          business is in the right shape to use one yet. If you&apos;ve seen an agent demo and thought &ldquo;useful, but
          where would I start?&rdquo;, the audit gives you a concrete answer.
        </p>
        <p>
          No technical background needed. Every question is multiple choice in plain language, and the score tells you
          what to do next. When you&apos;re ready to act on it, see the <Link href="/agents">agents we build</Link>.
        </p>
      </GuideSection>
    </GuideShell>
  )
}
