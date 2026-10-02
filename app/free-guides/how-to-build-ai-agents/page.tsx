import Link from "next/link"
import { GuideSection, GuideShell, GuideTable } from "@/components/guides/guide-shell"
import { absoluteUrl, type Faq } from "@/lib/blog"
import { buildGuideMetadata, guidePath } from "@/lib/guides"

const SLUG = "how-to-build-ai-agents"
const URL_BASE = absoluteUrl(guidePath(SLUG))

export const metadata = buildGuideMetadata(SLUG)

// The four-step Claude setup from public/guides/how-to-build-ai-agents.pdf.
// Rendered on the page and emitted as HowTo schema from the same array.
const STEPS = [
  {
    name: "Create a new Project",
    text: "In Claude's desktop app, create a new Project and name it after the workflow, for example \"Invoice Processor\". The Project holds all the context and instructions for this one agent.",
  },
  {
    name: "Add instructions to the Project knowledge",
    text: "Describe the task, the format you want the output in, the rules the agent must follow and an example of what a good result looks like.",
  },
  {
    name: "Connect your tools with MCP",
    text: "MCP (Model Context Protocol) lets Claude read from and act in apps such as Gmail, Google Drive, Notion, Airtable, QuickBooks, HubSpot and Slack. Enable the ones your workflow needs.",
  },
  {
    name: "Run the workflow",
    text: "Start a chat inside the Project and give the agent a trigger, such as \"Process the invoices in the Pending folder\". It works through the task with the connected tools.",
  },
]

const FAQS: Faq[] = [
  {
    question: "Can I build an AI agent without coding?",
    answer:
      "Yes. In Claude's desktop app you can build one with a Project, written instructions and tools connected through MCP, without writing any code. The guide walks through each of the four steps with an example instruction you can copy.",
  },
  {
    question: "What is MCP?",
    answer:
      "MCP (Model Context Protocol) is an open standard that lets an AI model connect to real apps and data, such as Gmail, Google Drive, Notion or QuickBooks. Once a tool is connected, the agent can read from it, write to it and trigger actions in it.",
  },
  {
    question: "Which task should I pick for my first AI agent?",
    answer:
      "Pick one task that happens often, follows the same steps every time and has a clear output: processing invoices, turning a blog post into social posts, or updating your CRM after calls. Avoid tasks that need a judgment call on every run.",
  },
  {
    question: "Why does my agent stop halfway through a task?",
    answer:
      "Usually because it hit the usage limit of a consumer AI plan. Long jobs, such as working through 100 invoices, can use up the allowance in one session, and the agent stops wherever it is. Smaller batches help; running the agent on dedicated infrastructure removes the limit.",
  },
  {
    question: "How is this guide different from the blog post on building an AI agent?",
    answer:
      "The PDF is a short, printable guide for business owners deciding whether to build an agent themselves or have it built. The blog post is the longer walkthrough, with three ways to build an agent (no-code in Claude, n8n or Make, or code) and example instructions to copy.",
  },
]

const HOW_TO = {
  "@type": "HowTo",
  "@id": `${URL_BASE}#howto`,
  name: "How to build an AI agent in Claude",
  description: "Build a first AI agent in Claude's desktop app with a Project, written instructions, tools connected through MCP and a trigger.",
  tool: [{ "@type": "HowToTool", name: "Claude desktop app" }],
  step: STEPS.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.name,
    text: step.text,
    url: `${URL_BASE}#build-in-claude`,
  })),
}

export default function HowToBuildAIAgentsPage() {
  return (
    <GuideShell slug={SLUG} faqs={FAQS} ctaHeading="Ready to build your first agent?" jsonLdExtra={[HOW_TO]}>
      <GuideSection id="tasks-to-automate" title="Which manual tasks can an AI agent take over?">
        <p>
          Any task that is clearly defined, predictable and repetitive. If you could write the steps down once and hand
          them to someone forever, an agent can do it. The guide breaks down the most common ones:
        </p>
        <GuideTable
          caption="Manual tasks compared with an AI agent"
          head={["Workflow", "Done by hand", "With an agent"]}
          rows={[
            ["Invoice processing", "20–40 min per invoice, typed into accounting software", "Reads, categorizes and posts each invoice"],
            ["Social media content", "2–3 hours a week turning one idea into posts for every platform", "Drafts, formats and schedules per platform"],
            ["Lead research", "10–15 min per lead to find, check and write an opener", "Researches and enriches hundreds of leads overnight"],
            ["Follow-ups and outreach", "Inconsistent, or forgotten", "Timed, personalized sequences that always go out"],
            ["CRM and data entry", "5–10 min per contact after every call", "Logs and updates records in real time"],
            ["Review requests", "Hit-or-miss timing", "Sent at the right moment, every time"],
          ]}
        />
        <p>It also covers customer support replies and proposal drafts.</p>
      </GuideSection>

      <GuideSection id="build-in-claude" title="How do you build an AI agent in Claude?">
        <p>You can build a first agent in Claude&apos;s desktop app in four steps:</p>
        <ol className="space-y-3 pt-1">
          {STEPS.map((step, i) => (
            <li key={step.name} className="flex gap-4 rounded-3xl border border-hairline p-5 sm:p-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-sm font-medium text-white">
                {i + 1}
              </span>
              <span>
                <span className="block font-semibold text-ink">{step.name}</span>
                <span className="mt-1 block text-[15px]">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
        <p>
          The PDF includes a full example instruction for a social content agent. For the long version, with three ways
          to build (no-code in Claude, n8n or Make, or code), read our{" "}
          <Link href="/blog/how-to-build-an-ai-agent">step-by-step guide to building an AI agent</Link>.
        </p>
      </GuideSection>

      <GuideSection id="diy-limits" title="What are the limits of building an AI agent yourself?">
        <p>
          Building it yourself works well for small jobs you can watch. On long or always-on workflows, it hits three
          walls:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-faint">
          <li>
            <strong>Usage limits.</strong> Consumer AI plans cap how much you can use the model in a rolling window. A
            long job, such as 100 invoices or 200 leads, can use it all, and the agent stops mid-task.
          </li>
          <li>
            <strong>It only runs while you do.</strong> The agent works inside your chat session, so it isn&apos;t running
            overnight, and it uses the same allowance you need for your own work.
          </li>
          <li>
            <strong>Running it properly is a project.</strong> Moving it out of the chat app means managing API keys, rate
            limits, hosting, error handling and monitoring.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="diy-vs-done-for-you" title="Should you build it yourself or have it built?">
        <p>
          Build it yourself if you want to learn and the task is small enough to run while you watch. Have it built if
          the agent needs to run every day, at volume, without you.
        </p>
        <GuideTable
          caption="Building an AI agent yourself in Claude compared with a done-for-you agent"
          head={["What you need", "DIY with Claude", "Done for you"]}
          rows={[
            ["No usage limits", "Usage windows apply", "Runs on our infrastructure"],
            ["Runs 24/7", "Only while you're active", "Always on, fully hosted"],
            ["No setup", "Projects, MCP and config needed", "Describe it and we build it"],
            ["Claude free for you", "The agent uses your quota", "Separate, so use Claude freely"],
            ["No API keys", "Needed for API use", "Fully managed"],
            ["Monitoring and updates", "Your responsibility", "Included"],
          ]}
        />
        <p>
          See the <Link href="/agents">agents we build and run for businesses</Link>, or check where an agent would help
          most first with the <Link href="/free-guides/ai-agent-readiness-audit">AI Agent Readiness Audit</Link>.
        </p>
      </GuideSection>
    </GuideShell>
  )
}
