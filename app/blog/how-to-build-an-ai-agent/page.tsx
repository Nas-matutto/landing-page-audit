import Link from "next/link"
import { BlogPostShell } from "@/components/blog/post-shell"
import { Figure } from "@/components/blog/figure"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"

const SLUG = "how-to-build-an-ai-agent"

export const metadata = buildPostMetadata(SLUG)

const faqs: Faq[] = [
  {
    question: "Can I build an AI agent without coding?",
    answer:
      "Yes. You can build a working agent with no code in Claude by creating a Project, writing instructions, and enabling connectors for tools like Gmail, Google Drive or Notion. Visual workflow builders such as n8n, Make and Zapier also let you add AI agent steps without writing code. Code (an agent SDK or a model API) only becomes necessary when you need the agent to run unattended, at scale, or inside your own product.",
  },
  {
    question: "What is the difference between an AI agent and an automation?",
    answer:
      "A traditional automation follows fixed if/then rules: when X happens, do Y. It breaks when an input doesn't match the expected pattern. An AI agent is given a goal and decides the steps itself, so it can read a messy email, work out what the person meant, look up missing information and choose which tool to use next. Many good systems combine both: an automation triggers the agent, and the agent handles the judgment.",
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

/** Trigger → instructions + model → tools → output. Inline SVG, so the labels are crawlable text. */
function AgentAnatomyDiagram() {
  const boxes = [
    { x: 20, title: "Trigger", lines: ["Message, schedule,", "form, email, webhook"] },
    { x: 215, title: "Model + instructions", lines: ["Plans the steps,", "decides what to do next"] },
    { x: 410, title: "Tools", lines: ["CRM, Sheets, Gmail,", "web search, APIs"] },
    { x: 605, title: "Output", lines: ["Updated records,", "drafts, reports, replies"] },
  ]
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 780 200"
        role="img"
        aria-labelledby="agent-anatomy-title"
        className="h-auto w-full rounded-2xl border border-slate-200 bg-slate-50"
      >
        <title id="agent-anatomy-title">
          Anatomy of an AI agent: a trigger starts it, the model follows its instructions, calls tools, and produces an output
        </title>
        <defs>
          <marker id="agent-anatomy-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#7c3aed" />
          </marker>
        </defs>
        {boxes.map((box, i) => (
          <g key={box.title}>
            <rect x={box.x} y="55" width="155" height="90" rx="12" fill="white" stroke="#7c3aed" strokeWidth="1.5" />
            <text x={box.x + 77.5} y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">{box.title}</text>
            {box.lines.map((line, j) => (
              <text key={line} x={box.x + 77.5} y={110 + j * 16} textAnchor="middle" fontSize="11" fill="#64748b">{line}</text>
            ))}
            {i < boxes.length - 1 && (
              <path d={`M${box.x + 160},100 L${box.x + 190},100`} stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#agent-anatomy-arrow)" />
            )}
          </g>
        ))}
        <path d="M487,150 C487,185 292,185 292,150" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#agent-anatomy-arrow)" />
        <text x="390" y="192" textAnchor="middle" fontSize="11" fill="#7c3aed">results feed back until the goal is met</text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-slate-500">
        Every AI agent has the same four parts. Building one means choosing each of them for your workflow.
      </figcaption>
    </figure>
  )
}

export default function HowToBuildAnAIAgentPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground">
          <strong>
            To build an AI agent, pick one repetitive workflow, give a capable model (such as Claude) clear instructions
            for it, connect the tools it needs to act (through MCP connectors or APIs), then test it on real inputs and
            decide how it gets triggered.
          </strong>{" "}
          You can do this with no code in Claude, with a visual builder like n8n or Make, or in code with an agent SDK.
          This guide walks through each step, with an example prompt you can copy.
        </p>
        <p>
          We build AI agents for small and medium businesses every week: agents that process invoices, triage support
          tickets, research leads, and write and publish content. The steps below are the same ones we follow, including
          the parts that usually go wrong when people build their first agent on their own.
        </p>

        <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
          <h2 className="text-xl font-bold text-foreground mb-3">TL;DR</h2>
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            <li>An AI agent has four parts: a <strong>trigger</strong>, a <strong>model with instructions</strong>, <strong>tools</strong> it can use, and an <strong>output</strong></li>
            <li>Start with one high-volume, rule-driven task (invoices, CRM updates, lead research, social posts), not a whole department</li>
            <li>Three ways to build: no-code in Claude (Projects + connectors), a workflow builder (n8n, Make, Zapier), or code (an agent SDK)</li>
            <li>The instructions matter most: role, goal, numbered steps, rules, output format and when to stop</li>
            <li>Test on real, messy inputs, start with read-only access, and keep a human approval step for anything hard to undo</li>
            <li>DIY agents in chat apps hit usage limits on long runs; always-on agents need hosting, retries and monitoring</li>
          </ul>
        </div>

        <h2 id="what-do-you-need-to-build-an-ai-agent" className="text-3xl font-bold text-foreground mt-12 mb-4">What Do You Need to Build an AI Agent?</h2>
        <p>
          Every AI agent, from a weekend experiment to a production system, is made of the same four parts. If you
          understand these, every tool and framework becomes a different way of supplying them. (New to the idea? Start
          with our plain-English guide to <Link href="/blog/what-are-ai-agents" className="text-primary hover:underline">what AI agents are</Link>.)
        </p>

        <AgentAnatomyDiagram />

        <div className="my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-foreground">
              <tr>
                <th className="p-4 font-semibold">Part</th>
                <th className="p-4 font-semibold">What it does</th>
                <th className="p-4 font-semibold">Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="p-4 font-medium text-foreground">Trigger</td><td className="p-4">Starts a run</td><td className="p-4">You send a message, a schedule (every Monday 8am), a new form entry, a new email, a webhook</td></tr>
              <tr><td className="p-4 font-medium text-foreground">Model</td><td className="p-4">Reasons about the task and decides each next step</td><td className="p-4">Claude, GPT, Gemini</td></tr>
              <tr><td className="p-4 font-medium text-foreground">Instructions</td><td className="p-4">Define the goal, steps, rules and output format</td><td className="p-4">A system prompt, or Project instructions in Claude</td></tr>
              <tr><td className="p-4 font-medium text-foreground">Tools</td><td className="p-4">Let the agent read and act in your apps</td><td className="p-4">MCP connectors or APIs for Gmail, Google Sheets, HubSpot, QuickBooks, Notion, web search</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="step-1-pick-a-workflow-worth-automating" className="text-3xl font-bold text-foreground mt-12 mb-4">Step 1: Pick a Workflow Worth Automating</h2>
        <p>
          The most common mistake is starting too big (&quot;automate our marketing&quot;). Agents succeed on tasks that are
          <strong> repetitive, high-volume and well-defined</strong>: you could write the steps down once and hand them to a new
          hire. They struggle with strategy, high-stakes judgment and relationship-critical conversations.
        </p>
        <p>Good first agents, with the manual time they typically replace:</p>
        <div className="my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-foreground">
              <tr>
                <th className="p-4 font-semibold">Workflow</th>
                <th className="p-4 font-semibold">Done by hand</th>
                <th className="p-4 font-semibold">What the agent does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="p-4 font-medium text-foreground"><Link href="/blog/how-to-automate-invoices-into-accounting-software" className="text-primary hover:underline">Invoice processing</Link></td><td className="p-4">20–40 min per invoice</td><td className="p-4">Reads the invoice, extracts line items, posts them to QuickBooks or Xero</td></tr>
              <tr><td className="p-4 font-medium text-foreground"><Link href="/blog/how-to-automate-social-media-posting-with-ai-agent" className="text-primary hover:underline">Social media content</Link></td><td className="p-4">2–3 hours a week</td><td className="p-4">Turns one idea into platform-specific posts, then drafts and schedules them</td></tr>
              <tr><td className="p-4 font-medium text-foreground"><Link href="/blog/how-to-build-ai-lead-finder-agent" className="text-primary hover:underline">Lead research</Link></td><td className="p-4">10–15 min per lead</td><td className="p-4">Finds, enriches and researches hundreds of leads overnight</td></tr>
              <tr><td className="p-4 font-medium text-foreground"><Link href="/blog/how-to-automate-data-entry-and-reporting-with-ai-agent" className="text-primary hover:underline">CRM and data entry</Link></td><td className="p-4">5–10 min per contact</td><td className="p-4">Logs calls and emails and updates records as they happen</td></tr>
              <tr><td className="p-4 font-medium text-foreground"><Link href="/blog/how-to-automate-customer-service-with-ai-agent" className="text-primary hover:underline">Customer support replies</Link></td><td className="p-4">All day, every day</td><td className="p-4">Answers common questions, ranks the rest by urgency, drafts a solution</td></tr>
              <tr><td className="p-4 font-medium text-foreground">Follow-ups and review requests</td><td className="p-4">Inconsistent or forgotten</td><td className="p-4">Sends timed, personalised follow-ups and review requests at the right moment</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Pick the one that costs you the most hours and has the clearest definition of &quot;done&quot;. You can add more
          agents later; one that works reliably is worth more than five that half-work.
        </p>

        <h2 id="step-2-choose-how-you-will-build-it" className="text-3xl font-bold text-foreground mt-12 mb-4">Step 2: Choose How You Will Build It</h2>
        <p>
          There are three practical routes. They supply the same four parts in different ways, and differ mostly in
          how much control you get and how reliably the agent can run without you.
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-foreground">
              <tr>
                <th className="p-4 font-semibold"></th>
                <th className="p-4 font-semibold">No-code chat agent</th>
                <th className="p-4 font-semibold">Workflow builder</th>
                <th className="p-4 font-semibold">Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="p-4 font-medium text-foreground">Tools</td><td className="p-4">Claude Projects + connectors (MCP)</td><td className="p-4">n8n, Make, Zapier</td><td className="p-4">Claude Agent SDK, OpenAI Agents SDK, model APIs</td></tr>
              <tr><td className="p-4 font-medium text-foreground">Skills needed</td><td className="p-4">None</td><td className="p-4">Comfortable with logic and APIs</td><td className="p-4">Developer</td></tr>
              <tr><td className="p-4 font-medium text-foreground">Time to first agent</td><td className="p-4">An afternoon</td><td className="p-4">A day or two</td><td className="p-4">Days to weeks</td></tr>
              <tr><td className="p-4 font-medium text-foreground">Runs unattended</td><td className="p-4">No, runs while you chat</td><td className="p-4">Yes, on triggers and schedules</td><td className="p-4">Yes</td></tr>
              <tr><td className="p-4 font-medium text-foreground">Best for</td><td className="p-4">Learning, personal workflows, prototypes</td><td className="p-4">Scheduled, multi-app business workflows</td><td className="p-4">High volume, custom logic, agents inside your product</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          If you are building your first agent, start with the no-code route. It is the fastest way to find out whether
          the workflow is a good fit before you invest in anything more robust. The rest of this guide uses that route,
          and the same principles carry over to the others.
        </p>

        <Figure
          src="/blog/how-to-build-an-ai-agent/n8n-workflow-with-ai-model-nodes.png"
          alt="An n8n workflow with a schedule trigger, data-fetching steps and several AI model nodes connected to a Google Gemini chat model"
          width={1986}
          height={1247}
          caption="The workflow-builder route: in n8n, a schedule trigger feeds data through ordinary steps and AI model nodes, which is how agents run unattended on a timer."
        />

        <h2 id="step-3-write-the-agents-instructions" className="text-3xl font-bold text-foreground mt-12 mb-4">Step 3: Write the Agent&apos;s Instructions</h2>
        <p>
          The instructions (often called the system prompt) are the agent&apos;s job description, and they determine most
          of its quality. In Claude, create a new Project named after the workflow (&quot;Invoice Processor&quot;, &quot;Lead
          Research Agent&quot;) and put the instructions in the Project, so every chat inside it follows them.
        </p>
        <p>Strong agent instructions always cover six things:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className="text-foreground">Role:</strong> who the agent is and who it works for.</li>
          <li><strong className="text-foreground">Goal:</strong> what a finished run produces.</li>
          <li><strong className="text-foreground">Steps:</strong> numbered, in order, including which tool to use at each step.</li>
          <li><strong className="text-foreground">Rules:</strong> what it must never do, such as inventing data, emailing customers directly or deleting records.</li>
          <li><strong className="text-foreground">Output format:</strong> exactly what to return and where to save it.</li>
          <li><strong className="text-foreground">Stop conditions:</strong> when to stop and ask a human instead of guessing.</li>
        </ol>
        <p>Here is a complete example for a social content agent. Copy it, swap the brackets for your details, and paste it into a Claude Project:</p>

        <PromptBlock prompt={EXAMPLE_PROMPT} label="Example agent instructions" leadSource="prompt_how_to_build_ai_agent" />

        <p>
          For full, production-tested prompts, see our guides to building a{" "}
          <Link href="/blog/how-to-automate-customer-service-with-ai-agent" className="text-primary hover:underline">customer service agent</Link>, an{" "}
          <Link href="/blog/how-to-automate-seo-and-geo-growth-with-ai-agent" className="text-primary hover:underline">SEO agent</Link> and a{" "}
          <Link href="/blog/how-to-build-ai-lead-finder-agent" className="text-primary hover:underline">lead generation agent</Link>.
        </p>

        <h2 id="step-4-connect-the-tools-it-needs" className="text-3xl font-bold text-foreground mt-12 mb-4">Step 4: Connect the Tools It Needs</h2>
        <p>
          Without tools, a model can only write text. Tools are what let an agent act: read your inbox, update a
          spreadsheet, create a CRM record or post an invoice. In Claude, you give it tools by enabling connectors in
          settings. These use <strong>MCP (Model Context Protocol)</strong>, an open standard for connecting AI models to
          apps and data. Connectors exist for Gmail, Google Drive, Notion, Airtable, Slack, HubSpot, QuickBooks and
          hundreds more.
        </p>
        <p>Two rules save a lot of pain here:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Connect only what the workflow needs.</strong> An invoice agent needs your invoices folder and your accounting software, not your whole Google account.</li>
          <li><strong className="text-foreground">Start read-only where you can.</strong> Let the agent draft and propose before you let it send, post or delete.</li>
        </ul>

        <Figure
          src="/blog/how-to-build-an-ai-agent/ai-agent-prompt-to-completed-tasks.png"
          alt="An instruction to qualify new form leads against the ideal customer profile and book a call, followed by the agent's completed checklist: lead captured, qualified, call booked, confirmation sending"
          width={1986}
          height={1247}
          caption="With tools connected, one plain-language instruction becomes a sequence of real actions across your apps."
        />

        <h2 id="step-5-test-on-real-inputs-and-add-guardrails" className="text-3xl font-bold text-foreground mt-12 mb-4">Step 5: Test on Real Inputs and Add Guardrails</h2>
        <p>
          Start a chat inside the Project and give the agent a real trigger, such as &quot;Process the invoices in the
          /Invoices/Pending folder&quot;. Then deliberately feed it the messy cases: a blurry scan, a duplicate lead, an email
          in another language, a request it shouldn&apos;t handle. Each failure tells you which rule or step to add to the
          instructions.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Human approval for irreversible actions.</strong> Sending emails, paying bills and deleting records should wait for a yes until you trust the agent.</li>
          <li><strong className="text-foreground">Deduplication.</strong> Have the agent check existing records before writing, or every run will add the same rows again.</li>
          <li><strong className="text-foreground">A run log.</strong> Ask it to report what it did on every run (items found, processed, skipped and why), so you can audit it.</li>
          <li><strong className="text-foreground">No guessing.</strong> Tell it to stop and flag missing data rather than fill gaps. A fabricated value is worse than an empty one.</li>
        </ul>

        <h2 id="step-6-decide-how-it-runs" className="text-3xl font-bold text-foreground mt-12 mb-4">Step 6: Decide How It Runs</h2>
        <p>
          A Claude Project agent runs when you open a chat and ask it to. That is fine for on-demand work, but many
          workflows need to run on their own: every morning, whenever a form is submitted, or whenever a new invoice
          arrives. This is where most do-it-yourself builds stall, for structural reasons:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Usage limits stop long runs.</strong> Consumer AI plans cap usage within a rolling window. A long run (100 invoices, 200 leads, a week of content) can hit the cap and stop mid-task, leaving a partial batch to clean up by hand.</li>
          <li><strong className="text-foreground">The agent competes with you.</strong> The same allowance that runs your agent is the one you use for everything else.</li>
          <li><strong className="text-foreground">Running it properly is infrastructure work.</strong> Moving to an API means managing keys, rate limits, hosting, retries, error alerts and monitoring.</li>
        </ul>
        <p>
          For scheduled, multi-app workflows, a workflow builder or a hosted agent is the right next step. If you would
          rather skip the setup entirely, we <Link href="/agents" className="text-primary hover:underline">build, host and monitor agents</Link> for
          you: you describe the work in plain language and get a running agent connected to your tools.
        </p>

        <div className="my-8 overflow-hidden rounded-2xl border border-border shadow-sm">
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
          <strong className="text-foreground">In the video:</strong> building an AI agent from scratch in Claude, from
          creating the Project and writing its instructions to connecting tools and running the workflow.
        </p>

        <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="bg-linear-to-r from-primary to-violet-500 px-8 py-5">
            <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Free guide</p>
            <p className="text-xl font-bold text-white">Take this guide with you as a PDF</p>
          </div>
          <div className="bg-white px-8 py-6">
            <p className="text-foreground mb-5 leading-relaxed text-sm">
              Our free guide covers the workflows worth automating, the Claude setup step by step, and the honest limits of
              the DIY route, in a format you can share with your team.
            </p>
            <Link href="/free-guides/how-to-build-ai-agents" className="inline-flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
              Get the free guide →
            </Link>
          </div>
        </div>

        <h2 id="summary" className="text-3xl font-bold text-foreground mt-12 mb-4">Summary</h2>
        <p>
          Building an AI agent comes down to four choices: what triggers it, which model and instructions run it, which
          tools it can use, and what it outputs. Start with one repetitive, well-defined workflow, write instructions
          with clear steps, rules and stop conditions, connect only the tools it needs, and test it against messy real
          inputs before you let it act on its own.
        </p>
        <p>
          A no-code agent in Claude is the fastest way to prove a workflow. When it needs to run every day without you,
          move it to a workflow builder, to code, or to a hosted agent.
        </p>

        <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <div
            className="relative px-8 py-10"
            style={{
              background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)",
              backgroundImage: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed), radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 24px 24px",
            }}
          >
            <p className="text-2xl font-bold text-white mb-3">Want the agent without the build?</p>
            <p className="text-white/80 mb-6 leading-relaxed max-w-xl text-sm">
              Tell us about one task on a free 20-minute call. We&apos;ll map what a custom agent would do with the tools you
              already use, then build, host and run it for you.
            </p>
            <Link href="/book-demo" className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
              Book a free call →
            </Link>
          </div>
        </div>
      </div>
    </BlogPostShell>
  )
}
