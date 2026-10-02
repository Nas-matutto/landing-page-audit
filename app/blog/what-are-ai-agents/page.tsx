import Link from "next/link"
import { Brain } from "lucide-react"
import { BlogPostShell } from "@/components/blog/post-shell"
import { buildPostMetadata, type Faq } from "@/lib/blog"
import { Quiz } from "./quiz"

const SLUG = "what-are-ai-agents"

export const metadata = buildPostMetadata(SLUG)

const faqs: Faq[] = [
  {
    question: "Do I need a technical team to use AI agents?",
    answer:
      "Not necessarily. Several platforms let you configure agents without writing code. That said, integrating agents with your specific stack usually benefits from technical help at the initial setup stage.",
  },
  {
    question: "How much do AI agents cost?",
    answer:
      "Simple reactive agents can cost a few hundred dollars a month to run. More complex multi-agent systems with high throughput will cost more. The right comparison is cost of the agent vs. cost of the human time it replaces.",
  },
  {
    question: "Are AI agents secure?",
    answer:
      "Security depends on how they're built. An agent should only have access to systems and data it needs, and you should ask specifically about data handling if the agent processes customers' personal information.",
  },
  {
    question: "Can AI agents make mistakes?",
    answer:
      "Yes. They can hallucinate information, take the wrong action, or get stuck in unexpected states. This is why human-in-the-loop patterns matter, especially for actions that are hard to reverse.",
  },
  {
    question: "Which AI model powers AI agents?",
    answer:
      "Most production agents run on frontier models from Anthropic (Claude), OpenAI (GPT), or Google (Gemini). Claude is widely used for agentic workflows because of its strong instruction-following and long context window.",
  },
]

/** The perceive → reason → act → observe loop. Inline SVG, so the labels are crawlable text. */
function AgentLoopDiagram() {
  const steps = [
    { x: 300, y: 70, title: "1. Perceive", detail: "Message, email, webhook, schedule" },
    { x: 510, y: 200, title: "2. Reason", detail: "The model plans the next step" },
    { x: 300, y: 330, title: "3. Act", detail: "Calls a tool: CRM, Sheets, email, API" },
    { x: 90, y: 200, title: "4. Observe", detail: "Reads the result, decides: done?" },
  ]
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 600 400"
        role="img"
        aria-labelledby="agent-loop-title"
        className="h-auto w-full rounded-2xl border border-slate-200 bg-slate-50"
      >
        <title id="agent-loop-title">The AI agent loop: perceive, reason, act, observe, repeated until the goal is complete</title>
        <defs>
          <marker id="agent-loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7c3aed" />
          </marker>
        </defs>
        <circle cx="300" cy="200" r="130" fill="none" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="6 6" />
        {[
          "M385,95 A130,130 0 0,1 445,150",
          "M445,250 A130,130 0 0,1 385,305",
          "M215,305 A130,130 0 0,1 155,250",
          "M155,150 A130,130 0 0,1 215,95",
        ].map(d => (
          <path key={d} d={d} fill="none" stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#agent-loop-arrow)" />
        ))}
        <text x="300" y="195" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">Goal</text>
        <text x="300" y="217" textAnchor="middle" fontSize="12" fill="#64748b">loop until complete</text>
        {steps.map(step => (
          <g key={step.title}>
            <rect x={step.x - 82} y={step.y - 30} width="164" height="60" rx="12" fill="white" stroke="#7c3aed" strokeWidth="1.5" />
            <text x={step.x} y={step.y - 6} textAnchor="middle" fontSize="15" fontWeight="700" fill="#0f172a">{step.title}</text>
            <text x={step.x} y={step.y + 14} textAnchor="middle" fontSize="10.5" fill="#64748b">{step.detail}</text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-center text-sm text-slate-500">
        Every AI agent runs the same loop: it perceives an input, reasons about the next step, acts through a tool, and observes the result before going again.
      </figcaption>
    </figure>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhatAreAIAgentsPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      {/* Quiz teaser */}
      <a
        href="#quiz"
        className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors"
      >
        <Brain className="w-4 h-4" />
        Includes a 10-question quiz: test your knowledge below
      </a>

      <div className="prose prose-lg max-w-none">
        <div className="space-y-6 text-muted-foreground leading-relaxed">

          <p className="text-lg text-foreground">
            <strong>An AI agent is software that is given a goal and works toward it on its own: it reasons about what to do, uses tools such as your email, CRM or spreadsheets to take actions, checks the results, and repeats until the task is done.</strong> Unlike a chatbot, which only replies to the message in front of it, an agent completes multi-step work with little human input.
          </p>
          <p>
            "AI agent" is one of the most used (and most misunderstood) phrases in tech right now. It gets applied to everything from a basic chatbot to a fully autonomous system managing complex business workflows, which can create confusion for a lot of people.
          </p>
          <p>
            This guide cuts through the noise. By the end, you'll know exactly what an AI agent is, how it works under the hood, how it differs from tools you already use, and, most importantly, what it can realistically do for your business today.
          </p>

          <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-foreground mb-3">TL;DR</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>An AI agent is a software system that can perceive inputs, reason about them, and take autonomous actions to complete a goal</li>
              <li>Unlike chatbots, agents can use tools, call APIs, and complete multi-step tasks without human prompting at each step</li>
              <li>They differ from traditional automation (like Zapier) because they can reason, adapt, and handle exceptions</li>
              <li>The most valuable use cases: lead qualification, customer support, internal reporting, and outbound outreach</li>
              <li>They work best on repetitive, high-volume, logic-driven tasks, not strategy or relationship-building</li>
            </ul>
          </div>

          <h2 id="the-short-answer-what-is-an-ai-agent" className="text-3xl font-bold text-foreground mt-12 mb-4">The Short Answer: What Is an AI Agent?</h2>
          <p>
            An <strong>AI agent</strong> is, according to OpenAI, a system that independently performs multi-step workflows or tasks on a user's behalf. Or essentially a software system that can perceive its environment, reason about what it perceives, decide what to do, and then act in a loop, without requiring a human to prompt it at every step.
          </p>
          <p>
            The term comes from AI research, where an "agent" is defined as anything that can take actions in pursuit of a goal. What makes modern AI agents different from earlier rule-based systems is that they're powered by large language models (LLMs), which means they can reason in natural language, handle ambiguity, and adapt to situations that weren't explicitly anticipated when they were built.
          </p>
          <p>
            A concrete way to think about it: a standard LLM like ChatGPT responds to a single prompt and stops. An AI agent receives a goal, breaks it into steps, takes actions across multiple tools and systems, handles what comes back, and keeps going until the task is done.
          </p>

          <h2 id="how-do-ai-agents-work-the-core-loop" className="text-3xl font-bold text-foreground mt-12 mb-4">How Do AI Agents Work? The Core Loop</h2>
          <p>
            Most AI agents operate on a loop: <strong>perceive → reason → act → observe</strong>. This cycle repeats until the agent completes its goal or hits a condition that stops it.
          </p>
          <AgentLoopDiagram />
          <div className="my-6 space-y-4">
            <div className="border-l-4 border-primary pl-6 bg-primary/5 p-4 rounded-r-lg">
              <h3 className="text-base font-bold text-foreground mb-1">1. Perceive</h3>
              <p className="text-sm">The agent receives inputs, say a user message, a new email, a webhook from your CRM or a scheduled trigger. This is what kicks the loop off.</p>
            </div>
            <div className="border-l-4 border-primary pl-6 bg-primary/5 p-4 rounded-r-lg">
              <h3 className="text-base font-bold text-foreground mb-1">2. Reason</h3>
              <p className="text-sm">The LLM at the agent's core thinks through what it knows, what it needs to find out, and what the best next action is. This is where the "intelligence" lives.</p>
            </div>
            <div className="border-l-4 border-primary pl-6 bg-primary/5 p-4 rounded-r-lg">
              <h3 className="text-base font-bold text-foreground mb-1">3. Act</h3>
              <p className="text-sm">The agent calls a tool, for example searching the web, writing to a spreadsheet, sending an email, querying a database, calling an API. This is what separates agents from plain chatbots.</p>
            </div>
            <div className="border-l-4 border-primary pl-6 bg-primary/5 p-4 rounded-r-lg">
              <h3 className="text-base font-bold text-foreground mb-1">4. Observe</h3>
              <p className="text-sm">The agent sees the result of its action, updates its understanding, and decides whether it's done or needs to take another step. Then the loop repeats.</p>
            </div>
          </div>

          <h2 id="ai-agents-vs-ai-chatbots-whats-the-difference" className="text-3xl font-bold text-foreground mt-12 mb-4">AI Agents vs. AI Chatbots: What's the Difference?</h2>
          <p>Both involve AI and natural language, but they're fundamentally different in what they can do.</p>
          <div className="my-8 overflow-x-auto">
            <table className="w-full border-collapse border-2 border-border rounded-lg text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-4 text-left text-foreground font-bold"></th>
                  <th className="border border-border p-4 text-left text-foreground font-bold">AI Chatbot</th>
                  <th className="border border-border p-4 text-left text-foreground font-bold">AI Agent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-4 font-semibold text-foreground">Interaction model</td>
                  <td className="border border-border p-4">Responds to a single prompt</td>
                  <td className="border border-border p-4">Pursues a goal across multiple steps</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-4 font-semibold text-foreground">Tool access</td>
                  <td className="border border-border p-4">Usually none</td>
                  <td className="border border-border p-4">Can call APIs, databases, external apps</td>
                </tr>
                <tr>
                  <td className="border border-border p-4 font-semibold text-foreground">Output</td>
                  <td className="border border-border p-4">Text response</td>
                  <td className="border border-border p-4">Completed action or workflow</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-4 font-semibold text-foreground">Human involvement</td>
                  <td className="border border-border p-4">Required at each turn</td>
                  <td className="border border-border p-4">Only needed to set the goal and review results</td>
                </tr>
                <tr>
                  <td className="border border-border p-4 font-semibold text-foreground">Handles exceptions</td>
                  <td className="border border-border p-4">No</td>
                  <td className="border border-border p-4">Yes, can adapt when things don't go as planned</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-4 font-semibold text-foreground">Example</td>
                  <td className="border border-border p-4">"Summarise this email for me"</td>
                  <td className="border border-border p-4">"Process all incoming enquiries and book demos with qualified leads"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="ai-agents-vs-traditional-automation-zapier-make" className="text-3xl font-bold text-foreground mt-12 mb-4">AI Agents vs. Traditional Automation (Zapier, Make)</h2>
          <p>Traditional automation tools like Zapier, Make, or n8n work on fixed if/then rules, which makes them excellent for predictable, linear workflows, as long as every input fits the expected pattern, they work flawlessly.</p>
          <p>The problem is that in reality, inputs are often not clean and fixed automations can't adapt to changing workflows. So when a traditional automation stops, it fails silently or sends incorrect data downstream.</p>
          <p>AI agents handle the situations that traditional automations can't, by accessing tools, a model and custom instructions on how to act. They can, for example, read an email that doesn't fit a template, infer what the person meant, look up missing information, and proceed appropriately.</p>

          <h2 id="the-four-types-of-ai-agents" className="text-3xl font-bold text-foreground mt-12 mb-4">The Four Types of AI Agents</h2>
          <div className="my-6 space-y-5">
            <div className="border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-2">1. Reactive Agents</h3>
              <p className="text-sm">Respond to a trigger and complete a single, immediate task. No memory, no planning. Example: an agent that classifies an incoming support ticket the moment it arrives.</p>
            </div>
            <div className="border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-2">2. Deliberative Agents</h3>
              <p className="text-sm">Build a plan before acting and work through it step by step. Better for complex, multi-step goals. Example: an agent that researches a prospect, drafts a personalised email, and schedules a follow-up.</p>
            </div>
            <div className="border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-2">3. Memory-Augmented Agents</h3>
              <p className="text-sm">Retain context across sessions, learning from past interactions. Particularly useful for customer-facing agents that need to remember previous conversations or preferences.</p>
            </div>
            <div className="border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-2">4. Multi-Agent Systems</h3>
              <p className="text-sm">Multiple agents working in parallel or sequence, each specialised in one part of a larger workflow. One qualifies a lead; another researches them; a third drafts outreach; a fourth monitors replies.</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── QUIZ ── */}
      <div id="quiz" className="my-12 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%)" }}>
        <div className="px-8 pt-8 pb-5">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 uppercase tracking-widest mb-4">
            <Brain className="w-3.5 h-3.5" />
            10-Question Quiz
          </span>
          <p className="text-2xl font-bold text-white mb-2">Test your knowledge</p>
          <p className="text-white/50 text-sm">Questions cover everything above. Each answer comes with an explanation even if you get it right.</p>
        </div>
        <div className="px-5 pb-6">
          <Quiz />
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="space-y-6 text-muted-foreground leading-relaxed">

          <h2 id="what-can-ai-agents-actually-do-real-business-use-cases" className="text-3xl font-bold text-foreground mt-12 mb-4">What Can AI Agents Actually Do? Real Business Use Cases</h2>
          <div className="my-6">
            <h3 className="text-xl font-bold text-foreground mb-4">High-value use cases</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-5 py-1">
                <h4 className="font-bold text-foreground mb-1">Lead qualification and follow-up</h4>
                <p className="text-sm">An agent monitors your inbound leads, scores them against your ICP, looks up company data, sends a personalised first message, and books a demo, all before your team has opened their laptop.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-5 py-1">
                <h4 className="font-bold text-foreground mb-1">Customer support triage</h4>
                <p className="text-sm">An agent reads every incoming support ticket, categorises it, searches your knowledge base, drafts a response, and either sends it or routes it to the right human with the draft pre-filled.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-5 py-1">
                <h4 className="font-bold text-foreground mb-1">Internal reporting and data entry</h4>
                <p className="text-sm">Pulling data from multiple sources, updating your CRM from email conversations, syncing platforms that don't have native integrations: repetitive work that takes hours and produces no strategic value.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-5 py-1">
                <h4 className="font-bold text-foreground mb-1">Outbound prospecting</h4>
                <p className="text-sm">Research target accounts, identify the right contacts, personalise outreach based on recent signals, and send at optimal times, at scale, without a dedicated sales development team.</p>
              </div>
            </div>
          </div>
          <div className="bg-muted/30 border-l-4 border-amber-400 p-5 rounded-r-lg space-y-3">
            <p className="font-semibold text-foreground">Where AI agents fall short</p>
            <p className="text-sm"><strong className="text-foreground">Strategy and high-stakes decisions.</strong> AI agents are executors, not strategists. Final decisions on pricing, hiring, or company direction require human judgement.</p>
            <p className="text-sm"><strong className="text-foreground">Relationship-critical interactions.</strong> A first call with an enterprise client, a difficult conversation about a product failure: these require human empathy and authority.</p>
            <p className="text-sm"><strong className="text-foreground">Novel creative direction.</strong> Agents can execute creative tasks well, but generating a brand's creative direction from scratch still benefits from human creative leadership.</p>
          </div>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="bg-linear-to-r from-primary to-violet-500 px-8 py-5">
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Free download</p>
              <p className="text-xl font-bold text-white">Not sure if your business is ready for AI agents?</p>
            </div>
            <div className="bg-white px-8 py-6">
              <p className="text-foreground mb-5 leading-relaxed text-sm">
                Take our free AI Agent Readiness Audit. It scores your business across four dimensions: data, processes, team, and tooling. It then tells you exactly where to start.
              </p>
              <Link href="/free-guides/ai-agent-readiness-audit" className="inline-flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Get the free audit →
              </Link>
            </div>
          </div>

          <h2 id="key-concepts-worth-knowing" className="text-3xl font-bold text-foreground mt-12 mb-4">Key Concepts Worth Knowing</h2>
          <div className="my-6 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Tool use</h3>
              <p className="text-sm">The ability of an AI agent to call external services: APIs, databases, web search, email, calendar, CRM. Without tools, an agent can only generate text. With tools, it can take real-world actions.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">RAG (Retrieval-Augmented Generation)</h3>
              <p className="text-sm">A technique where the agent searches a specific knowledge base before generating a response, grounding its answers in your actual data and dramatically reducing hallucinations.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Memory</h3>
              <p className="text-sm">The ability to retain information across sessions. With memory, an agent can remember a customer's previous issue, a lead's stated preferences, or the context from a week-old email thread.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Human-in-the-loop</h3>
              <p className="text-sm">A design pattern where certain agent actions require human approval before proceeding. High-stakes outputs often benefit from a checkpoint before the agent acts.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Agentic AI</h3>
              <p className="text-sm">"Agentic" describes AI systems that operate autonomously over extended periods and sequences of actions, with minimal human intervention.</p>
            </div>
          </div>

          <h2 id="summary" className="text-3xl font-bold text-foreground mt-12 mb-4">Summary</h2>
          <p>
            AI agents are software systems that can perceive inputs, reason about them, take actions using real tools, and complete goals across multiple steps, without requiring a human to prompt them at each turn.
          </p>
          <p>
            The best use cases today are high-volume, repetitive, logic-driven tasks: lead qualification, customer support triage, data entry and reporting, and outbound prospecting. Strategy, relationships, and physical-world tasks remain firmly in human territory.
          </p>
          <p>
            Ready to try one? Our step-by-step guide on <Link href="/blog/how-to-build-an-ai-agent" className="text-primary hover:underline">how to build an AI agent</Link> walks through picking a workflow, writing the instructions, connecting tools and testing it.
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
              <p className="text-2xl font-bold text-white mb-3">Ready to see what an AI agent could do for your business?</p>
              <p className="text-white/80 mb-6 leading-relaxed max-w-xl text-sm">We build, deploy, and host custom AI agents for small businesses. Book a free 20-minute call and we'll walk you through what's possible for your specific workflows.</p>
              <Link href="/book-demo" className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
                Book a free call →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BlogPostShell>
  )
}
