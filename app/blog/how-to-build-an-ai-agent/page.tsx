import type { ReactNode } from "react"
import Link from "next/link"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { Figure } from "@/components/blog/figure"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"

const SLUG = "how-to-build-an-ai-agent"

export const metadata = buildPostMetadata(SLUG)

const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4"
const H3 = "text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3"
const LINK = "text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"

const faqs: Faq[] = [
  {
    question: "Can I build an AI agent without coding?",
    answer:
      "Yes. You can build a working agent with no code in Claude by creating a Project, writing instructions, and enabling connectors for tools like Gmail, Google Drive or Notion. Visual workflow builders such as n8n, Make and Zapier also let you add AI agent steps without writing code. Code (an agent SDK or a model API) only becomes necessary when you need the agent to run unattended at high volume, or inside your own product.",
  },
  {
    question: "What is the difference between an AI agent and an automation?",
    answer:
      "A traditional automation follows fixed if/then rules: when X happens, do Y. It breaks when an input doesn't match the expected pattern. An AI agent is given a goal and decides the steps itself, so it can read a messy email, work out what the person meant, look up missing information and choose which tool to use next. Many good systems combine both: an automation triggers the agent, and the agent handles the judgment.",
  },
  {
    question: "How much does it cost to build an AI agent?",
    answer:
      "A no-code agent costs nothing beyond the paid AI plan you may already have. Agents built on a model API are billed per token: at October 2026 prices, Claude Sonnet 5.5 costs $2 per million input tokens and $10 per million output tokens, so a run that reads about 20,000 tokens and writes 2,000 costs roughly 6 cents. Workflow builders such as n8n add a plan fee unless you self-host. For most small businesses the real cost is build and maintenance time, not model usage.",
  },
  {
    question: "Can I build an AI agent with ChatGPT?",
    answer:
      "Yes. The same six steps apply: pick a workflow, write the instructions, connect the apps the agent needs, test it and decide how it runs. ChatGPT supports custom instructions and connectors for the no-code route, and OpenAI's Agents SDK covers the code route. Pick the model that handles your real inputs best, and test at least two before committing.",
  },
  {
    question: "What is MCP and do I need it to build an AI agent?",
    answer:
      "MCP (Model Context Protocol) is an open standard for connecting AI models to tools and data, such as your email, CRM, file storage or databases. You don't strictly need it, since an agent can also call APIs directly, but MCP connectors are the fastest no-code way to give an agent like Claude access to the apps it needs to act in.",
  },
  {
    question: "Which AI model is best for building agents?",
    answer:
      "Most production agents run on frontier models from Anthropic (Claude), OpenAI (GPT) or Google (Gemini). What matters most for agents is reliable instruction-following, good tool use and a long context window. Claude is widely used for agentic workflows for these reasons. Test your actual workflow on two models before committing, because results vary by task.",
  },
  {
    question: "How long does it take to build an AI agent?",
    answer:
      "A simple single-task agent, such as one that turns a blog post into social posts, can be running in an afternoon. A production agent that connects several tools, handles edge cases, runs on a schedule and is monitored usually takes days to a couple of weeks, most of which goes into testing and guardrails rather than the prompt.",
  },
  {
    question: "Why does my DIY agent stop halfway through a task?",
    answer:
      "Consumer AI apps limit how much you can use the model within a rolling time window. A long agent run, such as processing 100 invoices or researching 200 leads, can exhaust that allowance and stop mid-task, leaving a partial batch. Agents that need to run reliably in the background are usually moved to the model's API with their own hosting, retries and monitoring.",
  },
]

const EXAMPLE_PROMPT = `You are a social media assistant for [Business Name].

GOAL
When given a topic or a URL, turn it into ready-to-publish posts for three platforms.

STEPS
1. Read the source (fetch the URL if one is given).
2. Pick the single most useful idea for our audience: [describe your audience].
3. Write:
   (1) a LinkedIn post of 150–200 words with a hook and 3 bullet points
   (2) an X thread of 5 posts
   (3) an Instagram caption with 5 relevant hashtags
4. Save all three to the Google Doc "Social drafts" under today's date.

RULES
- Write in first person, professional but conversational.
- Never invent statistics, customers or quotes. If the source has no data, don't use numbers.
- If the source is unreachable or off-topic, stop and say why instead of guessing.

OUTPUT
Reply with the three posts and the link to the doc.`

const PYTHON_AGENT = `# pip install anthropic
# export ANTHROPIC_API_KEY=your-key
import anthropic
from anthropic import beta_tool

client = anthropic.Anthropic()


@beta_tool
def list_overdue_invoices() -> str:
    """List unpaid invoices that are past their due date."""
    # Replace with a real call to QuickBooks, Xero or a Google Sheet
    return '[{"customer": "Acme Ltd", "email": "ap@acme.example", "amount": 1200, "days_overdue": 14}]'


@beta_tool
def save_draft_email(to: str, subject: str, body: str) -> str:
    """Save a payment reminder as a draft for a human to review. Never sends it.

    Args:
        to: The customer's email address.
        subject: The email subject line.
        body: The email text.
    """
    # Replace with a Gmail or Outlook "create draft" call
    return f"Draft saved for {to}"


runner = client.beta.messages.tool_runner(
    model="claude-opus-5-5",
    max_tokens=16000,
    max_iterations=10,  # guardrail: never more than 10 model turns per run
    system=(
        "You are an accounts assistant. Find overdue invoices and draft one polite "
        "payment reminder per customer. Never invent amounts or dates. "
        "Finish with a short report: invoices found, drafts saved, anything skipped and why."
    ),
    tools=[list_overdue_invoices, save_draft_email],
    messages=[{"role": "user", "content": "Chase this week's overdue invoices."}],
)

# The SDK runs the loop: model asks for a tool, the tool runs, the result goes back
for message in runner:
    for block in message.content:
        if block.type == "text":
            print(block.text)`

function DiagramFrame({ id, title, caption, viewBox, children }: { id: string; title: string; caption: string; viewBox: string; children: ReactNode }) {
  return (
    <figure className="my-8">
      <svg viewBox={viewBox} role="img" aria-labelledby={id} className="h-auto w-full rounded-2xl border border-hairline bg-mist">
        <title id={id}>{title}</title>
        <defs>
          <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
        </defs>
        {children}
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">{caption}</figcaption>
    </figure>
  )
}

/** Trigger → instructions + model → tools → output. Inline SVG, so the labels are crawlable text. */
function AgentAnatomyDiagram() {
  const boxes = [
    { x: 20, title: "Trigger", lines: ["Message, schedule,", "form, email, webhook"] },
    { x: 215, title: "Model + instructions", lines: ["Plans the steps,", "decides what to do next"] },
    { x: 410, title: "Tools", lines: ["CRM, Sheets, Gmail,", "web search, APIs"] },
    { x: 605, title: "Output", lines: ["Updated records,", "drafts, reports, replies"] },
  ]
  return (
    <DiagramFrame
      id="agent-anatomy-title"
      viewBox="0 0 780 200"
      title="Anatomy of an AI agent: a trigger starts it, the model follows its instructions, calls tools, and produces an output"
      caption="Every AI agent is a model, instructions and tools, plus a trigger that starts it. Building one means choosing each part for your workflow."
    >
      {boxes.map((box, i) => (
        <g key={box.title}>
          <rect x={box.x} y="55" width="155" height="90" rx="12" fill="white" stroke="#141414" strokeWidth="1.5" />
          <text x={box.x + 77.5} y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="#141414">{box.title}</text>
          {box.lines.map((line, j) => (
            <text key={line} x={box.x + 77.5} y={110 + j * 16} textAnchor="middle" fontSize="11" fill="#717171">{line}</text>
          ))}
          {i < boxes.length - 1 && (
            <path d={`M${box.x + 160},100 L${box.x + 190},100`} stroke="#141414" strokeWidth="2.5" markerEnd="url(#agent-anatomy-title-arrow)" />
          )}
        </g>
      ))}
      <path d="M487,150 C487,185 292,185 292,150" fill="none" stroke="#adadad" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#agent-anatomy-title-arrow)" />
      <text x="390" y="192" textAnchor="middle" fontSize="11" fill="#141414">results feed back until the goal is met</text>
    </DiagramFrame>
  )
}

/** Two questions that pick the build route. */
function BuildRouteDiagram() {
  const question = (x: number, y: number, lines: string[]) => (
    <g>
      <rect x={x} y={y} width="230" height="74" rx="37" fill="#141414" />
      {lines.map((line, i) => (
        <text key={line} x={x + 115} y={y + 33 + i * 17 - (lines.length - 1) * 8} textAnchor="middle" fontSize="13" fontWeight="600" fill="white">{line}</text>
      ))}
    </g>
  )
  const answer = (y: number, title: string, detail: string) => (
    <g>
      <rect x="520" y={y} width="240" height="64" rx="12" fill="white" stroke="#141414" strokeWidth="1.5" />
      <text x="640" y={y + 27} textAnchor="middle" fontSize="14" fontWeight="700" fill="#141414">{title}</text>
      <text x="640" y={y + 46} textAnchor="middle" fontSize="11" fill="#717171">{detail}</text>
    </g>
  )
  const label = (x: number, y: number, text: string) => (
    <text x={x} y={y} textAnchor="middle" fontSize="12" fontWeight="700" fill="#141414">{text}</text>
  )
  return (
    <DiagramFrame
      id="build-route-title"
      viewBox="0 0 780 300"
      title="Which way to build an AI agent: if it doesn't need to run without you, use a no-code agent; if it does, use a workflow builder, or code for high volume and agents inside your product"
      caption="Two questions decide the route. Most first agents belong in the top box, and move down only once the workflow has proved itself."
    >
      {question(20, 26, ["Does it need to run", "without you?"])}
      {question(20, 190, ["High volume, or built", "into your product?"])}
      {answer(31, "No-code agent", "Claude Project + connectors")}
      {answer(150, "Workflow builder", "n8n, Make, Zapier")}
      {answer(225, "Code", "Agent SDK or model API")}
      <path d="M254,63 L512,63" stroke="#141414" strokeWidth="2" markerEnd="url(#build-route-title-arrow)" />
      {label(385, 54, "No")}
      <path d="M135,104 L135,182" stroke="#141414" strokeWidth="2" markerEnd="url(#build-route-title-arrow)" />
      {label(155, 148, "Yes")}
      <path d="M254,214 C380,214 400,182 512,182" fill="none" stroke="#141414" strokeWidth="2" markerEnd="url(#build-route-title-arrow)" />
      {label(385, 190, "No")}
      <path d="M254,240 C380,240 400,257 512,257" fill="none" stroke="#141414" strokeWidth="2" markerEnd="url(#build-route-title-arrow)" />
      {label(385, 266, "Yes")}
    </DiagramFrame>
  )
}

/** The six parts of strong agent instructions, filled in for the example prompt. */
function InstructionsAnatomyDiagram() {
  const parts = [
    { title: "1. Role", lines: ["Social media assistant", "for [Business Name]"] },
    { title: "2. Goal", lines: ["Ready-to-publish posts", "for three platforms"] },
    { title: "3. Steps", lines: ["Read the source, pick one", "idea, write, save to a doc"] },
    { title: "4. Rules", lines: ["Never invent statistics,", "customers or quotes"] },
    { title: "5. Output", lines: ["Three posts and the", "link to the doc"] },
    { title: "6. Stop conditions", lines: ["Source unreachable or", "off-topic: stop, say why"] },
  ]
  return (
    <DiagramFrame
      id="instructions-anatomy-title"
      viewBox="0 0 780 260"
      title="The six parts of AI agent instructions: role, goal, steps, rules, output format and stop conditions, with an example of each"
      caption="The six parts, filled in for the social content agent below. If one is missing, that is usually where the agent goes wrong."
    >
      {parts.map((part, i) => {
        const x = 20 + (i % 3) * 252
        const y = 20 + Math.floor(i / 3) * 120
        return (
          <g key={part.title}>
            <rect x={x} y={y} width="236" height="104" rx="12" fill="white" stroke="#141414" strokeWidth="1.5" />
            <text x={x + 18} y={y + 34} fontSize="15" fontWeight="700" fill="#141414">{part.title}</text>
            {part.lines.map((line, j) => (
              <text key={line} x={x + 18} y={y + 60 + j * 17} fontSize="12" fill="#717171">{line}</text>
            ))}
          </g>
        )
      })}
    </DiagramFrame>
  )
}

/** Trust ladder: how much autonomy to give an agent as it proves itself. */
function AutonomyLadderDiagram() {
  const rungs = [
    { title: "1. Read only", lines: ["Looks and reports", "back to you"] },
    { title: "2. Draft", lines: ["Prepares the work,", "you press send"] },
    { title: "3. Approve", lines: ["Acts after", "your yes"] },
    { title: "4. Act alone", lines: ["Proven, reversible", "tasks only"] },
  ]
  return (
    <DiagramFrame
      id="autonomy-ladder-title"
      viewBox="0 0 780 260"
      title="The AI agent autonomy ladder: start read only, then let it draft, then act after approval, and only act alone on proven, reversible tasks"
      caption="Move an agent up one rung at a time, and only after it has handled real inputs correctly on the rung below."
    >
      {rungs.map((rung, i) => {
        const x = 20 + i * 190
        const top = 120 - i * 32
        return (
          <g key={rung.title}>
            <rect x={x} y={top} width="174" height={200 - top} rx="10" fill={i === 3 ? "#141414" : "white"} stroke="#141414" strokeWidth="1.5" />
            <text x={x + 16} y={top + 28} fontSize="14" fontWeight="700" fill={i === 3 ? "white" : "#141414"}>{rung.title}</text>
            {rung.lines.map((line, j) => (
              <text key={line} x={x + 16} y={top + 48 + j * 15} fontSize="11" fill={i === 3 ? "#d4d4d4" : "#717171"}>{line}</text>
            ))}
          </g>
        )
      })}
      <path d="M20,228 L752,228" stroke="#141414" strokeWidth="2" markerEnd="url(#autonomy-ladder-title-arrow)" />
      <text x="390" y="250" textAnchor="middle" fontSize="11" fill="#141414">more trust, earned on real inputs</text>
    </DiagramFrame>
  )
}

/** What the code version does under the hood. */
function ToolLoopDiagram() {
  const boxes = [
    { x: 20, title: "Model (Claude)", lines: ["Decides the next step,", "or gives the final answer"] },
    { x: 305, title: "Your code", lines: ["The loop: runs whatever", "tool the model asks for"] },
    { x: 590, title: "Your tools", lines: ["Invoices, email drafts,", "CRM, any API"] },
  ]
  return (
    <DiagramFrame
      id="tool-loop-title"
      viewBox="0 0 780 230"
      title="How an AI agent works in code: the model asks for a tool, your code runs it, the result goes back to the model, and the loop repeats until the model gives a final answer"
      caption="Every agent framework runs this loop. The Python SDK's tool runner writes it for you, so you only write the tools and the instructions."
    >
      {boxes.map(box => (
        <g key={box.title}>
          <rect x={box.x} y="60" width="170" height="96" rx="12" fill="white" stroke="#141414" strokeWidth="1.5" />
          <text x={box.x + 85} y="95" textAnchor="middle" fontSize="14" fontWeight="700" fill="#141414">{box.title}</text>
          {box.lines.map((line, j) => (
            <text key={line} x={box.x + 85} y={117 + j * 15} textAnchor="middle" fontSize="11" fill="#717171">{line}</text>
          ))}
        </g>
      ))}
      <path d="M196,88 L297,88" stroke="#141414" strokeWidth="2" markerEnd="url(#tool-loop-title-arrow)" />
      <text x="247" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="#141414">1. asks for a tool</text>
      <path d="M481,88 L582,88" stroke="#141414" strokeWidth="2" markerEnd="url(#tool-loop-title-arrow)" />
      <text x="532" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="#141414">2. runs it</text>
      <path d="M586,128 L485,128" stroke="#141414" strokeWidth="2" markerEnd="url(#tool-loop-title-arrow)" />
      <text x="532" y="146" textAnchor="middle" fontSize="11" fontWeight="600" fill="#141414">3. returns data</text>
      <path d="M301,128 L200,128" stroke="#141414" strokeWidth="2" markerEnd="url(#tool-loop-title-arrow)" />
      <text x="247" y="146" textAnchor="middle" fontSize="11" fontWeight="600" fill="#141414">4. sends result</text>
      <text x="390" y="200" textAnchor="middle" fontSize="12" fill="#141414">repeats until the model replies with a final answer instead of a tool request</text>
    </DiagramFrame>
  )
}

export default function HowToBuildAnAIAgentPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="space-y-6 text-neutral-600 leading-relaxed">
        <p className="text-lg text-ink">
          <strong>
            To build an AI agent, pick one repetitive workflow, give a capable model (such as Claude) clear instructions
            for it, connect the tools it needs to act (through MCP connectors or APIs), then test it on real inputs and
            decide how it gets triggered.
          </strong>{" "}
          You can do this with no code in Claude, with a visual builder like n8n, or in one short Python script. This
          guide walks through all three, with instructions and code you can copy.
        </p>
        <p>
          We build AI agents for small and medium businesses every week: agents that process invoices, triage support
          tickets, research leads, and write and publish content. The steps below are the same ones we follow, including
          the parts that usually go wrong when people build their first agent on their own.
        </p>

        <div className="rounded-2xl border border-hairline bg-mist p-6 my-8">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink mb-3">How to build an AI agent in 6 steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-ink">
            <li><strong>Pick one workflow</strong> that is repetitive, high-volume and easy to define, such as invoices, lead research or social posts.</li>
            <li><strong>Choose how to build it:</strong> no code in Claude, a workflow builder like n8n, or code with an agent SDK.</li>
            <li><strong>Write the instructions:</strong> role, goal, numbered steps, rules, output format and when to stop.</li>
            <li><strong>Connect only the tools it needs,</strong> through MCP connectors or APIs, read-only where you can.</li>
            <li><strong>Test it on real, messy inputs</strong> and add guardrails, with a human approval step for anything hard to undo.</li>
            <li><strong>Decide how it runs:</strong> on demand in chat, or on a schedule or trigger with hosting and monitoring.</li>
          </ol>
        </div>

        <h2 id="what-do-you-need-to-build-an-ai-agent" className={H2}>What Do You Need to Build an AI Agent?</h2>
        <p>
          You need three things: a <strong>model</strong> that reasons, <strong>instructions</strong> that define the job,
          and <strong>tools</strong> that let it act in your apps. To run it, you also need a <strong>trigger</strong> that
          starts it. Every tool and framework is just a different way of supplying these parts. (New to the idea? Start
          with our plain-English guide to <Link href="/blog/what-are-ai-agents" className={LINK}>what AI agents are</Link>,
          or our <Link href="/blog/ai-agents-for-beginners" className={LINK}>AI agents for beginners</Link> guide.)
        </p>

        <AgentAnatomyDiagram />

        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold">Part</th>
                <th className="p-4 font-semibold">What it does</th>
                <th className="p-4 font-semibold">Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Model</td><td className="p-4">Reasons about the task and decides each next step</td><td className="p-4">Claude, GPT, Gemini</td></tr>
              <tr><td className="p-4 font-medium text-ink">Instructions</td><td className="p-4">Define the goal, steps, rules and output format</td><td className="p-4">A system prompt, or Project instructions in Claude</td></tr>
              <tr><td className="p-4 font-medium text-ink">Tools</td><td className="p-4">Let the agent read and act in your apps</td><td className="p-4">MCP connectors or APIs for Gmail, Google Sheets, HubSpot, QuickBooks, Notion, web search</td></tr>
              <tr><td className="p-4 font-medium text-ink">Trigger</td><td className="p-4">Starts a run</td><td className="p-4">You send a message, a schedule (every Monday 8am), a new form entry, a new email, a webhook</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="step-1-pick-a-workflow-worth-automating" className={H2}>Step 1: Pick a Workflow Worth Automating</h2>
        <p>
          Pick a task that is <strong>repetitive, high-volume and well-defined</strong>: one you could write down once and
          hand to a new hire. The most common mistake is starting too big (&quot;automate our marketing&quot;). Agents
          struggle with strategy, high-stakes judgment and relationship-critical conversations.
        </p>
        <p>Good first agents, with the manual time they typically replace:</p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold">Workflow</th>
                <th className="p-4 font-semibold">Done by hand</th>
                <th className="p-4 font-semibold">What the agent does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink"><Link href="/blog/how-to-automate-invoices-into-accounting-software" className={LINK}>Invoice processing</Link></td><td className="p-4">20–40 min per invoice</td><td className="p-4">Reads the invoice, extracts line items, posts them to QuickBooks or Xero</td></tr>
              <tr><td className="p-4 font-medium text-ink"><Link href="/blog/how-to-automate-social-media-posting-with-ai-agent" className={LINK}>Social media content</Link></td><td className="p-4">2–3 hours a week</td><td className="p-4">Turns one idea into platform-specific posts, then drafts and schedules them</td></tr>
              <tr><td className="p-4 font-medium text-ink"><Link href="/blog/how-to-build-ai-lead-finder-agent" className={LINK}>Lead research</Link></td><td className="p-4">10–15 min per lead</td><td className="p-4">Finds, enriches and researches hundreds of leads overnight</td></tr>
              <tr><td className="p-4 font-medium text-ink"><Link href="/blog/how-to-automate-data-entry-and-reporting-with-ai-agent" className={LINK}>CRM and data entry</Link></td><td className="p-4">5–10 min per contact</td><td className="p-4">Logs calls and emails and updates records as they happen</td></tr>
              <tr><td className="p-4 font-medium text-ink"><Link href="/blog/how-to-automate-customer-service-with-ai-agent" className={LINK}>Customer support replies</Link></td><td className="p-4">All day, every day</td><td className="p-4">Answers common questions, ranks the rest by urgency, drafts a solution</td></tr>
              <tr><td className="p-4 font-medium text-ink">Follow-ups and review requests</td><td className="p-4">Inconsistent or forgotten</td><td className="p-4">Sends timed, personalised follow-ups and review requests at the right moment</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Pick the one that costs you the most hours and has the clearest definition of &quot;done&quot;. You can add more
          agents later; one that works reliably is worth more than five that half-work.
        </p>

        <h2 id="step-2-choose-how-you-will-build-it" className={H2}>Step 2: Choose How You Will Build It</h2>
        <p>
          Choose between three routes: a no-code agent in Claude, a workflow builder such as n8n, or code. They supply
          the same parts in different ways, and differ mostly in how much control you get and whether the agent can run
          without you.
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold"></th>
                <th className="p-4 font-semibold">No-code chat agent</th>
                <th className="p-4 font-semibold">Workflow builder</th>
                <th className="p-4 font-semibold">Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Tools</td><td className="p-4">Claude Projects + connectors (MCP)</td><td className="p-4">n8n, Make, Zapier</td><td className="p-4">Anthropic or OpenAI SDKs, Claude Agent SDK, model APIs</td></tr>
              <tr><td className="p-4 font-medium text-ink">Skills needed</td><td className="p-4">None</td><td className="p-4">Comfortable with logic and APIs</td><td className="p-4">Basic Python or JavaScript</td></tr>
              <tr><td className="p-4 font-medium text-ink">Time to first agent</td><td className="p-4">An afternoon</td><td className="p-4">A day or two</td><td className="p-4">A day for a prototype, weeks for production</td></tr>
              <tr><td className="p-4 font-medium text-ink">Runs unattended</td><td className="p-4">No, runs while you chat</td><td className="p-4">Yes, on triggers and schedules</td><td className="p-4">Yes, once you host it</td></tr>
              <tr><td className="p-4 font-medium text-ink">Best for</td><td className="p-4">Learning, personal workflows, prototypes</td><td className="p-4">Scheduled, multi-app business workflows</td><td className="p-4">High volume, custom logic, agents inside your product</td></tr>
            </tbody>
          </table>
        </div>

        <BuildRouteDiagram />

        <p>
          If you are building your first agent, start with the no-code route. It is the fastest way to find out whether
          the workflow is a good fit before you invest in anything more robust. Steps 3 to 6 use that route; the{" "}
          <a href="#how-do-you-build-an-ai-agent-in-n8n" className={LINK}>n8n</a> and{" "}
          <a href="#how-do-you-build-an-ai-agent-in-python" className={LINK}>Python</a> versions follow after them.
        </p>

        <h2 id="step-3-write-the-agents-instructions" className={H2}>Step 3: Write the Agent&apos;s Instructions</h2>
        <p>
          Write the instructions like a job description for a new hire, because they decide most of the agent&apos;s
          quality. In Claude, create a new Project named after the workflow (&quot;Invoice Processor&quot;, &quot;Lead
          Research Agent&quot;) and put the instructions in the Project, so every chat inside it follows them.
        </p>
        <p>Strong agent instructions always cover six things:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className="text-ink">Role:</strong> who the agent is and who it works for.</li>
          <li><strong className="text-ink">Goal:</strong> what a finished run produces.</li>
          <li><strong className="text-ink">Steps:</strong> numbered, in order, including which tool to use at each step.</li>
          <li><strong className="text-ink">Rules:</strong> what it must never do, such as inventing data, emailing customers directly or deleting records.</li>
          <li><strong className="text-ink">Output format:</strong> exactly what to return and where to save it.</li>
          <li><strong className="text-ink">Stop conditions:</strong> when to stop and ask a human instead of guessing.</li>
        </ol>

        <InstructionsAnatomyDiagram />

        <p>Here is the complete example for a social content agent. Copy it, swap the brackets for your details, and paste it into a Claude Project:</p>

        <PromptBlock prompt={EXAMPLE_PROMPT} label="Example agent instructions" leadSource="prompt_how_to_build_ai_agent" />

        <p>
          For full, production-tested prompts, see our guides to building a{" "}
          <Link href="/blog/how-to-automate-customer-service-with-ai-agent" className={LINK}>customer service agent</Link>, an{" "}
          <Link href="/blog/how-to-automate-seo-and-geo-growth-with-ai-agent" className={LINK}>SEO agent</Link> and a{" "}
          <Link href="/blog/how-to-build-ai-lead-finder-agent" className={LINK}>lead generation agent</Link>.
        </p>

        <h2 id="step-4-connect-the-tools-it-needs" className={H2}>Step 4: Connect the Tools It Needs</h2>
        <p>
          Connect only the apps the workflow touches, because tools are what turn a model that writes text into an agent
          that acts: it reads your inbox, updates a spreadsheet, creates a CRM record or posts an invoice. In Claude, you
          give it tools by enabling connectors in settings. These use <strong>MCP (Model Context Protocol)</strong>, an
          open standard for connecting AI models to apps and data. Connectors exist for Gmail, Google Drive, Notion,
          Airtable, Slack, HubSpot, QuickBooks and hundreds more.
        </p>
        <p>Two rules save a lot of pain here:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Connect only what the workflow needs.</strong> An invoice agent needs your invoices folder and your accounting software, not your whole Google account.</li>
          <li><strong className="text-ink">Start read-only where you can.</strong> Let the agent draft and propose before you let it send, post or delete.</li>
        </ul>

        <Figure
          src="/blog/how-to-build-an-ai-agent/ai-agent-plain-language-instruction-to-actions.png"
          alt="Illustration: a plain-language instruction to qualify a new form lead and book a call, followed by the agent's actions in Forms, the CRM, Calendar and Gmail"
          width={2400}
          height={1500}
          caption="Each line is a different connected tool. Without connectors the agent could only describe these steps; with them, one instruction becomes four actions."
        />

        <h2 id="step-5-test-on-real-inputs-and-add-guardrails" className={H2}>Step 5: Test on Real Inputs and Add Guardrails</h2>
        <p>
          Test the agent on the messiest real inputs you can find, because each failure tells you which rule or step to
          add. Start a chat inside the Project and give it a real trigger, such as &quot;Process the invoices in the
          /Invoices/Pending folder&quot;. Then feed it the hard cases: a blurry scan, a duplicate lead, an email in another
          language, a request it shouldn&apos;t handle.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Human approval for irreversible actions.</strong> Sending emails, paying bills and deleting records should wait for a yes until you trust the agent.</li>
          <li><strong className="text-ink">Deduplication.</strong> Have the agent check existing records before writing, or every run will add the same rows again.</li>
          <li><strong className="text-ink">A run log.</strong> Ask it to report what it did on every run (items found, processed, skipped and why), so you can audit it.</li>
          <li><strong className="text-ink">No guessing.</strong> Tell it to stop and flag missing data rather than fill gaps. A fabricated value is worse than an empty one.</li>
        </ul>

        <AutonomyLadderDiagram />

        <h2 id="step-6-decide-how-it-runs" className={H2}>Step 6: Decide How It Runs</h2>
        <p>
          Decide whether the agent runs when you ask it to, or on its own. A Claude Project agent runs when you open a
          chat, which is fine for on-demand work. Many workflows need to run every morning, whenever a form is submitted,
          or whenever a new invoice arrives. This is where most do-it-yourself builds stall, for structural reasons:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Usage limits stop long runs.</strong> Consumer AI plans cap usage within a rolling window. A long run (100 invoices, 200 leads, a week of content) can hit the cap and stop mid-task, leaving a partial batch to clean up by hand.</li>
          <li><strong className="text-ink">The agent competes with you.</strong> The same allowance that runs your agent is the one you use for everything else.</li>
          <li><strong className="text-ink">Running it properly is infrastructure work.</strong> Moving to an API means managing keys, rate limits, hosting, retries, error alerts and monitoring.</li>
        </ul>
        <p>
          For scheduled, multi-app workflows, a workflow builder or code is the right next step; both are covered below.
          If you would rather skip the setup entirely, we <Link href="/agents" className={LINK}>build, host and monitor agents</Link> for
          you: you describe the work in plain language and get a running agent connected to your tools.
        </p>

        <div className="my-8 overflow-hidden rounded-2xl border border-hairline">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/fFKQb1RacLI"
              title="How to build an AI agent from scratch"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <p className="text-sm">
          <strong className="text-ink">In the video:</strong> building an AI agent from scratch in Claude, from
          creating the Project and writing its instructions to connecting tools and running the workflow.
        </p>

        <h2 id="how-do-you-build-an-ai-agent-in-n8n" className={H2}>How Do You Build an AI Agent in n8n?</h2>
        <p>
          In n8n, you build an agent by adding an <strong>AI Agent</strong> node to a workflow and attaching a chat model
          and tools to it. The six steps above stay the same; n8n just gives the agent a trigger and lets it run on its
          own.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className="text-ink">Add a trigger.</strong> A Schedule Trigger for &quot;every Monday at 8am&quot;, a form or webhook for new leads, or a Chat Trigger while you test.</li>
          <li><strong className="text-ink">Add the AI Agent node</strong> and paste your instructions into its system message.</li>
          <li><strong className="text-ink">Attach a chat model.</strong> The Anthropic Chat Model sub-node runs Claude; OpenAI and Gemini models work the same way. You need an API key for the model.</li>
          <li><strong className="text-ink">Attach tools.</strong> Add Gmail, Google Sheets, HubSpot or an HTTP Request node as tools the agent can call. Add a memory sub-node only if it holds conversations.</li>
          <li><strong className="text-ink">Test with real data, then switch it on.</strong> Run a few test executions, read each step&apos;s input and output, and fix the instructions before the workflow goes live.</li>
        </ol>

        <Figure
          src="/blog/how-to-build-an-ai-agent/n8n-workflow-with-ai-model-nodes.png"
          alt="An n8n workflow with a schedule trigger, data-fetching steps and several AI model nodes connected to a Google Gemini chat model"
          width={1986}
          height={1247}
          caption="The workflow-builder route: in n8n, a schedule trigger feeds data through ordinary steps and AI model nodes, which is how agents run unattended on a timer."
        />

        <h2 id="how-do-you-build-an-ai-agent-in-python" className={H2}>How Do You Build an AI Agent in Python?</h2>
        <p>
          In Python, an AI agent is a loop: you send the model your instructions and a list of tools, it asks for a tool,
          your code runs it and sends the result back, and this repeats until the task is done. The Anthropic Python SDK
          includes a tool runner that writes that loop for you, so a working agent fits on one screen.
        </p>

        <ToolLoopDiagram />

        <p>
          This example chases overdue invoices. It has two tools, one that lists overdue invoices and one that saves a
          reminder email as a draft. It never sends anything, so it sits on the &quot;draft&quot; rung of the ladder above.
          Swap the two placeholder functions for real calls to your accounting software and email.
        </p>

        <PromptBlock prompt={PYTHON_AGENT} label="agent.py" copyLabel="Copy code" />

        <p>A few things worth noticing in that code, because they apply to any agent you write:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">The docstrings are instructions.</strong> The model reads each tool&apos;s description to decide when to use it, so &quot;Never sends it&quot; matters.</li>
          <li><strong className="text-ink">The system prompt follows the same six parts</strong> as the no-code version: role, goal, rules and a required report at the end.</li>
          <li><strong className="text-ink"><code>max_iterations</code> is a guardrail.</strong> It caps how many turns one run can take, so a confused agent can&apos;t loop forever.</li>
        </ul>
        <p>
          To run it on a schedule, call the script from a cron job or a cloud function, or use a hosted option such as
          Anthropic&apos;s Managed Agents, which runs the loop and the schedule for you. If you prefer OpenAI models, the
          OpenAI Agents SDK follows the same pattern. For agents that need to read files and run commands, the Claude
          Agent SDK gives you the same harness that powers Claude Code.
        </p>

        <div className="my-12 rounded-2xl overflow-hidden border border-hairline">
          <div className="bg-ink px-8 py-5">
            <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Free guide</p>
            <p className="text-xl font-bold text-white">Take this guide with you as a PDF</p>
          </div>
          <div className="bg-white px-8 py-6">
            <p className="text-ink mb-5 leading-relaxed text-sm">
              Our free guide covers the workflows worth automating, the Claude setup step by step, and the honest limits of
              the DIY route, in a format you can share with your team.
            </p>
            <Link href="/free-guides/how-to-build-ai-agents" className="inline-flex items-center gap-2 bg-ink text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
              Get the free guide →
            </Link>
          </div>
        </div>

        <h2 id="what-are-the-most-common-mistakes-when-building-an-ai-agent" className={H2}>What Are the Most Common Mistakes When Building an AI Agent?</h2>
        <p>
          Most first agents fail for the same few reasons, and none of them is the choice of model. These are the ones we
          see most often:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className="text-ink">Starting with a whole department.</strong> &quot;Run our marketing&quot; has no clear finish line. &quot;Turn each blog post into three social drafts&quot; does.</li>
          <li><strong className="text-ink">Vague instructions.</strong> &quot;Be helpful and professional&quot; gives the agent nothing to follow. Numbered steps and named tools do.</li>
          <li><strong className="text-ink">Too many tools, too much access.</strong> Every extra connector is another way to go wrong. Give it the minimum, read-only first.</li>
          <li><strong className="text-ink">Testing only the clean cases.</strong> An agent that works on three tidy examples will still break on the first scanned PDF or forwarded email chain.</li>
          <li><strong className="text-ink">No stop condition.</strong> Without one, an agent that hits missing data will guess, and a confident wrong answer is the most expensive kind.</li>
          <li><strong className="text-ink">Treating a chat agent as a system.</strong> If the business depends on it running daily, it needs a schedule, retries and someone who gets an alert when it fails.</li>
        </ol>

        <h2 id="summary" className={H2}>Summary</h2>
        <p>
          Building an AI agent comes down to a model, instructions and tools, plus a trigger that starts it. Start with
          one repetitive, well-defined workflow, write instructions with clear steps, rules and stop conditions, connect
          only the tools it needs, and test it against messy real inputs before you let it act on its own.
        </p>
        <p>
          A no-code agent in Claude is the fastest way to prove a workflow. When it needs to run every day without you,
          move it to n8n, to a short Python script, or to a hosted agent.
        </p>

        <SignupCta heading="Want the agent without the build?">
          Sign up free and start with a ready-made agent. Or tell us the task, and we&apos;ll build, host and run a custom agent with the tools you already use.
        </SignupCta>
      </div>
    </BlogPostShell>
  )
}
