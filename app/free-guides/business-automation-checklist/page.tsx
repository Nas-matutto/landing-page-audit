import Link from "next/link"
import { Check } from "lucide-react"
import { GuideSection, GuideShell, GuideTable } from "@/components/guides/guide-shell"
import type { Faq } from "@/lib/blog"
import { buildGuideMetadata } from "@/lib/guides"

const SLUG = "business-automation-checklist"

export const metadata = buildGuideMetadata(SLUG)

// The 18 tasks, exactly as grouped in public/guides/automate-by-friday-checklist.pdf.
const AREAS = [
  {
    name: "Sales and lead response",
    tasks: [
      "New website inquiries sit in an inbox until someone is free",
      "The same qualifying questions get asked manually, every time",
      "Leads who don't convert straight away rarely hear from you again",
      "Pricing and quote info is typed out fresh for every inquiry",
    ],
  },
  {
    name: "Customer support",
    tasks: [
      "The same FAQs get answered over and over",
      "\"Where's my order or appointment?\" calls tie up staff time",
      "Simple requests wait in the same queue as everything else",
      "Anything that comes in after hours waits until tomorrow",
    ],
  },
  {
    name: "Scheduling and operations",
    tasks: [
      "Booking a call takes several back-and-forth messages",
      "No-shows happen because reminders are inconsistent",
      "Reschedules and cancellations are handled one at a time",
      "Staff cross-check several calendars to confirm availability",
    ],
  },
  {
    name: "Admin and back office",
    tasks: [
      "Invoices and payment reminders go out manually, and sometimes late",
      "New client information gets typed in by hand",
      "CRM records get updated \"when there's time\"",
    ],
  },
  {
    name: "Marketing and retention",
    tasks: [
      "Review requests are an afterthought, or skipped entirely",
      "Past customers go quiet because no one follows up",
      "Recap notes and follow-ups after calls are written from scratch",
    ],
  },
]

const FAQS: Faq[] = [
  {
    question: "What is a business automation checklist?",
    answer:
      "A business automation checklist is a list of repetitive tasks you tick off to see which ones your team still does by hand. Ours covers 18 tasks across sales, support, scheduling, admin and marketing, and scores your total so you know how much of your week could be automated.",
  },
  {
    question: "Which tasks should a small business automate first?",
    answer:
      "Start with tasks that happen often, follow the same steps every time and need no judgment: replying to new inquiries, answering repeat questions, booking and reminders, data entry and payment reminders. They pay back fastest and free up time for the work that does need you.",
  },
  {
    question: "How long does the checklist take?",
    answer:
      "About ten minutes. Tick every task that is even partly manual today, add up your ticks and read your result on the last checklist page. Don't overthink it: if a task is partly manual, tick it.",
  },
  {
    question: "Do I need technical skills or software to use it?",
    answer:
      "No. It's a plain-language, tick-box PDF you can fill in on screen or print. You don't need to know anything about AI or automation tools to complete it.",
  },
  {
    question: "What should I do after completing the checklist?",
    answer:
      "Take the AI Agent Readiness Audit to score which area an agent would help most, read How to Build AI Agents if you want to build one yourself, or bring your ticked list to a free 20-minute call and we'll design, build and run the agent for you.",
  },
]

export default function BusinessAutomationChecklistPage() {
  return (
    <GuideShell slug={SLUG} faqs={FAQS} ctaHeading="Ready to get your week back?">
      <GuideSection id="tasks-to-automate" title="What business tasks should you automate first?">
        <p>
          Automate the tasks that happen often, follow the same steps every time and don&apos;t need a person&apos;s
          judgment. The checklist groups the 18 most common ones small businesses still do by hand into five areas:
        </p>
        <div className="grid gap-4 pt-2 sm:grid-cols-2">
          {AREAS.map((area, i) => (
            <div key={area.name} className="rounded-3xl border border-hairline p-6">
              <h3 className="mb-4 flex items-baseline justify-between gap-3 text-base font-semibold text-ink">
                {area.name}
                <span className="font-mono text-xs font-medium text-faint">0{i + 1}</span>
              </h3>
              <ul className="space-y-2.5 text-[15px] leading-snug">
                {area.tasks.map(task => (
                  <li key={task} className="flex gap-3">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-hairline">
                      <Check className="h-3 w-3 text-faint" />
                    </span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p>
          The PDF adds a line on what each task costs you while it stays manual, and what it looks like once an AI agent
          takes it over.
        </p>
      </GuideSection>

      <GuideSection id="how-scoring-works" title="How is the checklist scored?">
        <p>Add up your ticks. Your total out of 18 falls into one of three bands:</p>
        <GuideTable
          caption="Business automation checklist score bands"
          head={["Ticks", "What it means"]}
          rows={[
            ["0–5", "You're leaner than most. The few tasks you ticked are still worth a look, because they tend to be the ones that quietly eat the most time."],
            ["6–11", "The most common range. Each task feels small on its own, but together they take a real share of every week that could go to growth."],
            ["12–18", "Your business is running a second, unpaid employee made of busywork. This is exactly the kind of work an AI agent is built for."],
          ]}
        />
      </GuideSection>

      <GuideSection id="what-an-agent-does" title="What does an AI agent do with these tasks?">
        <p>
          An AI agent handles a task from start to finish, the same way every time, at any hour, without being reminded.
          For the tasks on the checklist, that looks like this:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-faint">
          <li>
            <Link href="/agents/lead-qualification">A lead qualification agent</Link> replies to new inquiries in seconds,
            asks your standard questions and only passes on the leads that are ready to talk.
          </li>
          <li>
            <Link href="/agents/customer-support">A customer support agent</Link> answers FAQs and order status questions
            around the clock and escalates anything it can&apos;t resolve to your team.
          </li>
          <li>
            A booking agent lets clients book, reschedule and get reminders, synced to your real calendar with no
            back-and-forth.
          </li>
          <li>
            <Link href="/agents/data-entry-reporting">A data entry agent</Link> keeps your CRM current and can trigger an{" "}
            <Link href="/agents/invoice-processing">invoice</Link> the moment a job is marked complete.
          </li>
        </ul>
        <p>
          Not sure which area to start with? The <Link href="/free-guides/ai-agent-readiness-audit">AI Agent Readiness Audit</Link>{" "}
          scores each one. Want to build the agent yourself? Read{" "}
          <Link href="/free-guides/how-to-build-ai-agents">How to Build AI Agents</Link>.
        </p>
      </GuideSection>

      <GuideSection id="who-its-for" title="Who is the checklist for?">
        <p>
          Small business owners, solo founders and operators of lean teams who always feel behind. Not because they
          aren&apos;t working hard, but because too much of the week goes to repetitive work that doesn&apos;t need them.
        </p>
        <p>
          You don&apos;t need to be technical. It&apos;s a tick-box list in plain language, and for a wider view of where
          AI fits, read <Link href="/blog/ai-agents-for-small-business">how small businesses use AI agents</Link>.
        </p>
      </GuideSection>
    </GuideShell>
  )
}
