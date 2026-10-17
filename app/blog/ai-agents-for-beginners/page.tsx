import Link from "next/link"
import { Figure } from "@/components/blog/figure"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { PromptBlock } from "@/components/blog/prompt-block"
import { YouTubeEmbed } from "@/components/ui/youtube-embed"
import { SOCIAL_AGENT_VIDEO } from "@/lib/links"
import { buildPostMetadata, type Faq } from "@/lib/blog"

const SLUG = "ai-agents-for-beginners"
const SOCIAL_IMG = "/blog/how-to-grow-on-social-media-with-claude-and-ai-agent"

export const metadata = buildPostMetadata(SLUG)

const LINK = "text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4"
const H3 = "text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3"

const faqs: Faq[] = [
  {
    question: "What is an AI agent, in simple terms?",
    answer:
      "An AI agent is software that works toward a goal on its own instead of waiting for your next message. It is built from three parts: a model that does the thinking (such as Claude Opus 5.5 or GPT-6 Astra), tools that let it read data and take actions (your apps, MCP connections, web search, APIs), and instructions, called a system prompt, that define how it should behave.",
  },
  {
    question: "Do I need to know how to code to use an AI agent?",
    answer:
      "No. Ready-built agents connect to your apps through the platform's own sign-in, and you talk to them in plain English. Coding only matters if you want to build an agent from scratch, and even then no-code options like Claude Projects or n8n cover most beginner use cases.",
  },
  {
    question: "What is the difference between an AI agent and a chatbot?",
    answer:
      "A chatbot answers the message in front of it and then waits. An AI agent is given a goal, uses tools to gather data and take actions, checks the result and keeps going until the job is done. A good agent also works inside the tools you already use, like your Instagram account or Google Search Console, so you don't have to copy and paste data into a chat window.",
  },
  {
    question: "What is a system prompt?",
    answer:
      "A system prompt is the set of standing instructions an AI agent follows every time it runs. It describes the agent's role, its goal, the steps to take, the rules it must respect and the tone to use. If the model is the brain and the tools are the hands, the system prompt is the job description.",
  },
  {
    question: "What is MCP in AI agents?",
    answer:
      "MCP, the Model Context Protocol, is an open standard introduced by Anthropic that lets an AI model connect to outside tools and data sources in a consistent way. An MCP server for Google Sheets, Gmail or a database gives the agent a safe, defined set of actions it can take there, without custom code for every app.",
  },
  {
    question: "Is it safe to connect an AI agent to my accounts?",
    answer:
      "It can be, if the agent connects through the platform's official sign-in instead of asking for your password, asks only for the access it needs (read-only where possible), and lets you approve its work before anything goes live. Start in review mode and only switch on autopilot once you trust the results.",
  },
  {
    question: "How much does it cost to get started with AI agents?",
    answer:
      "You can start for free. Talk to me Data has a free plan for both the social media agent (1 account, your last 10 posts, refreshed weekly) and the SEO and GEO agent (1 website, Google Search Console connected free, a site check of up to 25 pages). Paid plans add more accounts, more history and the agent doing the work for you, such as designing posts or publishing pages.",
  },
  {
    question: "Which AI model is best for AI agents?",
    answer:
      "For most business agents, the top models from the main labs, such as Claude Opus 5.5 from Anthropic and GPT-6 Astra from OpenAI, are all capable enough. As a beginner, the model matters less than you think: the tools the agent can reach and the quality of its instructions decide most of the result.",
  },
]

const BEGINNER_PROMPT = `You are my social media assistant for [@yourhandle], a [what you do] account.

Your goal: help me post content my audience already wants.

Every Monday:
1. Read my last 10 posts and compare each one with my median views.
2. Tell me which format, topic and hook did best, and why you think so.
3. Suggest 3 posts for this week, each with a hook, a short script and the best time to post.

Rules:
- Use my real numbers only. If you don't have the data, say so.
- Write like me: [short, friendly, no jargon].
- Never post anything without my approval.`

/** Model + tools + instructions → agent → works inside your apps. */
function AgentAnatomyDiagram() {
  const parts = [
    { y: 20, title: "1. Model", sub: "Claude Opus 5.5, GPT-6 Astra" },
    { y: 115, title: "2. Tools", sub: "data, MCPs, web search, APIs" },
    { y: 210, title: "3. Instructions", sub: "the system prompt" },
  ]
  const apps = ["Instagram", "Search Console", "Your website", "Google Sheets"]
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 300" role="img" aria-labelledby="agent-anatomy-title" className="h-auto w-full rounded-2xl border border-hairline bg-mist">
        <title id="agent-anatomy-title">
          The three parts of an AI agent: a model, tools and instructions combine into an AI agent, which works inside the apps you already use, such as Instagram, Google Search Console, your website and Google Sheets
        </title>
        <defs>
          <marker id="agent-anatomy-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
        </defs>
        {parts.map(part => (
          <g key={part.title}>
            <rect x="20" y={part.y} width="210" height="70" rx="12" fill="white" stroke="#141414" strokeWidth="1.5" />
            <text x="125" y={part.y + 30} textAnchor="middle" fontSize="14" fontWeight="700" fill="#141414">{part.title}</text>
            <text x="125" y={part.y + 50} textAnchor="middle" fontSize="11" fill="#717171">{part.sub}</text>
            <path d={`M232,${part.y + 35} C262,${part.y + 35} 262,150 290,150`} fill="none" stroke="#141414" strokeWidth="2" markerEnd="url(#agent-anatomy-arrow)" />
          </g>
        ))}
        <rect x="295" y="95" width="180" height="110" rx="14" fill="#141414" />
        <text x="385" y="143" textAnchor="middle" fontSize="17" fontWeight="700" fill="white">AI agent</text>
        <text x="385" y="165" textAnchor="middle" fontSize="11" fill="#d4d4d4">works toward a goal</text>
        <path d="M478,150 L540,150" stroke="#141414" strokeWidth="2.5" markerEnd="url(#agent-anatomy-arrow)" />
        <rect x="548" y="40" width="212" height="220" rx="14" fill="white" stroke="#141414" strokeWidth="1.5" strokeDasharray="6 5" />
        <text x="654" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="#141414">Inside your apps</text>
        {apps.map((app, i) => (
          <g key={app}>
            <rect x="572" y={88 + i * 40} width="164" height="30" rx="15" fill="#f4f4f4" />
            <text x="654" y={108 + i * 40} textAnchor="middle" fontSize="12" fill="#141414">{app}</text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        Every agent is the same three ingredients. What makes it useful is where it works: inside the tools where the task already lives.
      </figcaption>
    </figure>
  )
}

/** Search Console → find searches → write → publish → track, and round again. */
function SeoAgentDiagram() {
  const steps = [
    { x: 20, title: "Reads your data", lines: ["Google Search", "Console clicks"] },
    { x: 210, title: "Finds the gaps", lines: ["searches and prompts", "you can win"] },
    { x: 400, title: "Writes pages", lines: ["built for Google", "and AI answers"] },
    { x: 590, title: "Publishes", lines: ["to your site, or as", "drafts to review"] },
  ]
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 230" role="img" aria-labelledby="seo-agent-title" className="h-auto w-full rounded-2xl border border-hairline bg-mist">
        <title id="seo-agent-title">
          How the SEO and GEO agent works: it reads your Google Search Console data, finds the searches and AI prompts you can win, writes pages built to rank on Google and be cited by ChatGPT, Claude and Perplexity, publishes them to your site, then tracks the results to start the next round
        </title>
        <defs>
          <marker id="seo-agent-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
        </defs>
        {steps.map((step, i) => (
          <g key={step.title}>
            <rect x={step.x} y="40" width="170" height="90" rx="12" fill={i === 0 ? "#141414" : "white"} stroke="#141414" strokeWidth="1.5" />
            <text x={step.x + 85} y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill={i === 0 ? "white" : "#141414"}>{step.title}</text>
            {step.lines.map((line, j) => (
              <text key={line} x={step.x + 85} y={96 + j * 15} textAnchor="middle" fontSize="11" fill={i === 0 ? "#d4d4d4" : "#717171"}>{line}</text>
            ))}
            {i < steps.length - 1 && (
              <path d={`M${step.x + 172},85 L${step.x + 186},85`} stroke="#141414" strokeWidth="2.5" markerEnd="url(#seo-agent-arrow)" />
            )}
          </g>
        ))}
        <path d="M675,133 C675,205 105,205 105,140" fill="none" stroke="#adadad" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#seo-agent-arrow)" />
        <text x="390" y="218" textAnchor="middle" fontSize="11" fill="#141414">tracks rankings and AI citations, then starts the next round</text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        The SEO and GEO agent never asks you to paste a spreadsheet into a chat. It starts from your real Search Console numbers and ends on your live website.
      </figcaption>
    </figure>
  )
}

export default function AiAgentsForBeginnersPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="space-y-6 text-neutral-600 leading-relaxed">
        <p className="text-lg text-ink">
          <strong>
            An AI agent is software that works toward a goal on its own instead of waiting for your next message. Every
            agent has three parts: a model that thinks, tools that let it read data and take actions, and instructions
            (a system prompt) that define how it behaves. To get started, give one repetitive task to an agent that works
            inside the app where that task lives.
          </strong>
        </p>
        <p>
          If AI agents sound technical, expensive or a little scary, this guide is for you. I build and run AI agents
          every day, and the honest truth is that the idea is simple. This is AI Agents 101: what an agent is made of,
          why I think most &quot;AI agent&quot; products are built in the wrong place, and how you can get started this
          week without writing a line of code.
        </p>

        <div className="rounded-2xl border border-hairline bg-mist p-6 my-8">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink mb-3">TL;DR</h2>
          <ul className="list-disc pl-6 space-y-2 text-ink">
            <li>An AI agent is given a <strong>goal</strong>, not a single question, and keeps working until it is done</li>
            <li>Every agent is three parts: a <strong>model</strong> (like Claude Opus 5.5 or GPT-6 Astra), <strong>tools</strong> (data, MCPs, web search, API calls) and <strong>instructions</strong> (the system prompt)</li>
            <li>Agents are not meant to live in a chatbox. The useful ones work <strong>inside the tools you already use</strong>, like your Instagram or Google Search Console</li>
            <li>The best agents then give you an extra layer of insight and visibility on top of that tool</li>
            <li>Start with one task, connect one tool through its official sign-in, and keep the agent in review mode until you trust it</li>
            <li>You can try it free today with the Talk to me Data social media agent or SEO and GEO agent</li>
          </ul>
        </div>

        <h2 id="what-is-an-ai-agent-in-plain-english" className={H2}>What Is an AI Agent, in Plain English?</h2>
        <p>
          An AI agent is a digital worker that you give a goal to, rather than a question. You don&apos;t ask it
          &quot;write me a caption&quot;. You tell it &quot;help me grow my Instagram&quot;, and it reads your posts, works
          out what is working, plans what to post next and, if you allow it, posts it for you.
        </p>
        <p>
          The difference from the AI most people know is that a chat assistant answers and stops. An agent reasons about
          the next step, uses tools to take it, looks at the result and keeps going. If you want the longer version with
          the agent loop and the different types of agents, read our{" "}
          <Link href="/blog/what-are-ai-agents" className={LINK}>plain-English guide to what AI agents are</Link>. For
          getting started, you only need to understand the three parts below.
        </p>

        <h2 id="what-are-the-3-parts-of-an-ai-agent" className={H2}>What Are the 3 Parts of an AI Agent?</h2>
        <p>
          Every AI agent, from a simple weekly report bot to a fully autonomous social media manager, is made of the same
          three parts: a <strong>model</strong>, <strong>tools</strong> and <strong>instructions</strong>. Once you see
          them, every agent product on the market becomes easy to understand and compare.
        </p>

        <AgentAnatomyDiagram />

        <h3 className={H3}>1. The model: the brain</h3>
        <p>
          The model is the large language model (LLM) that reads, reasons and decides what to do next. As of October
          2026 the leading options include <strong>Claude Opus 5.5</strong> from Anthropic and{" "}
          <strong>GPT-6 Astra</strong> from OpenAI, the company behind ChatGPT. The model is what makes an agent able to
          handle messy, real-world situations instead of following a rigid script.
        </p>
        <p>
          Beginners tend to obsess over which model is best. In practice, the top models are all capable enough for
          business tasks. The other two parts decide most of the result.
        </p>

        <h3 className={H3}>2. Tools: the hands</h3>
        <p>
          Tools are everything the agent can reach beyond its own knowledge. A model on its own can only talk. With
          tools, it can act:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Data:</strong> large datasets such as your post history, your Search Console clicks, your sales or your customer list</li>
          <li><strong className="text-ink">MCPs:</strong> connections built on the Model Context Protocol, an open standard that lets an agent plug into apps like Google Sheets, Gmail or Notion in a consistent, controlled way</li>
          <li><strong className="text-ink">Web search:</strong> the ability to look things up live, such as what competitors published this week</li>
          <li><strong className="text-ink">API calls:</strong> direct actions in other software, like scheduling an Instagram post or publishing a page to WordPress</li>
        </ul>
        <p>
          Tools are what turn &quot;here is some advice&quot; into &quot;here is the work, done&quot;. They are also why an
          agent&apos;s answers can be specific to <em>your</em> business instead of generic.
        </p>

        <h3 className={H3}>3. Instructions: the job description</h3>
        <p>
          Instructions, usually called the <strong>system prompt</strong>, are the standing orders the agent follows every
          time it runs: its role, its goal, the steps to take, the rules it must respect and the tone to write in. If the
          model is the brain and the tools are the hands, the system prompt is the job description.
        </p>
        <p>Here is a beginner-friendly example for a social media agent. Replace the brackets with your own details:</p>

        <PromptBlock prompt={BEGINNER_PROMPT} label="Example system prompt for a beginner agent" leadSource="prompt_ai_agents_for_beginners" />

        <p>
          Notice the last rule. Good instructions don&apos;t just tell an agent what to do; they tell it what it must never
          do without you. That one line is what makes it safe to hand over real work.
        </p>

        <h2 id="why-shouldnt-ai-agents-live-in-a-chatbox" className={H2}>Why Shouldn&apos;t AI Agents Live in a Chatbox?</h2>
        <p>
          Because a chatbox puts the work back on you. You have to export the data, paste it in, ask the right question,
          copy the answer out and then go and do the task yourself. That is a chatbot with a new label, not an agent.
        </p>
        <p>
          In my opinion, this is the biggest mistake in AI right now. Most vibe-coded startups build an AI agent that
          operates inside a chat window and call it innovative. But your business doesn&apos;t live in a chat window. It
          lives in Instagram, in Google Search Console, in your website, your inbox and your spreadsheets. AI agents
          should work <strong>inside the tools you already use</strong>, and then give you an extra layer of insight and
          visibility on top of them.
        </p>

        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold"></th>
                <th className="p-4 font-semibold">&quot;Agent&quot; in a chatbox</th>
                <th className="p-4 font-semibold">Agent inside your tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Where your data comes from</td><td className="p-4">Whatever you copy and paste in</td><td className="p-4">Pulled directly from the app, every time</td></tr>
              <tr><td className="p-4 font-medium text-ink">Who does the work</td><td className="p-4">You, after reading the answer</td><td className="p-4">The agent, with your approval</td></tr>
              <tr><td className="p-4 font-medium text-ink">When it runs</td><td className="p-4">Only when you remember to ask</td><td className="p-4">On a schedule, or when something changes</td></tr>
              <tr><td className="p-4 font-medium text-ink">What you get</td><td className="p-4">Generic advice</td><td className="p-4">Insights from your own numbers, plus the finished task</td></tr>
              <tr><td className="p-4 font-medium text-ink">What you need to learn</td><td className="p-4">How to write good prompts</td><td className="p-4">Nothing new: you keep using the tools you know</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          You can still talk to a good agent in plain English. The difference is that the conversation is a shortcut on
          top of the work, not the place where the work has to happen.
        </p>

        <h2 id="what-does-an-ai-agent-inside-your-tools-look-like" className={H2}>What Does an AI Agent Inside Your Tools Look Like?</h2>
        <p>
          The easiest way to understand it is to see two real agents. Both are ones we run at Talk to me Data, and both
          follow the same recipe: a model, tools that plug into an app you already use, and instructions written for one
          job.
        </p>

        <h3 className={H3}>Example 1: the Social Media agent that lives inside your Instagram</h3>
        <p>
          The <Link href="/agents/social-media" className={LINK}>Talk to me Data social media agent</Link> works inside
          your Instagram (and TikTok, YouTube or Facebook Page). You paste your public profile link and it reads every
          post, compares each one with your own median views, finds your best formats, hooks and posting times, and tracks
          what is breaking out for competitors in your niche.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Model:</strong> a frontier LLM that reads your posts and writes the analysis and content</li>
          <li><strong className="text-ink">Tools:</strong> your post data, competitor accounts, a design studio and the official Instagram connection for posting</li>
          <li><strong className="text-ink">Instructions:</strong> grow this account using what already works for it, and never guess a number</li>
        </ul>

        <Figure
          src={`${SOCIAL_IMG}/social-media-agent-dashboard-overview.webp`}
          alt="The social media agent dashboard for a sample account: total followers, posts, views and interactions across channels, with Overview, Content, Competitors, Audience, Hooks and Create tabs"
          width={1800}
          height={1215}
          caption="The extra layer of visibility: every channel in one dashboard, built from the data already in your Instagram. Shown on a sample account."
        />

        <p>
          Then it turns what it finds into action. On a sample account, it spotted that carousels earn{" "}
          <strong>2.4 times</strong> the account&apos;s median, and turned that into three clear moves: what to keep doing,
          what to fix and what to try this week.
        </p>

        <Figure
          src={`${SOCIAL_IMG}/agent-analysis-keep-fix-try.webp`}
          alt="The agent's analysis: carousels earn 2.4 times the median, with three cards for keep doing, fix and try this week, each with a Build it button"
          width={1600}
          height={570}
          caption="Insight you would not get from scrolling your own grid, with a Build it button that turns each idea into a post."
        />

        <p>Here is the agent in a 71-second demo:</p>
        <YouTubeEmbed
          youtubeId={SOCIAL_AGENT_VIDEO.youtubeId}
          title={SOCIAL_AGENT_VIDEO.title}
          thumbnail={SOCIAL_AGENT_VIDEO.thumbnail}
          className="my-6"
        />
        <p className="text-sm">
          <strong className="text-ink">In the video:</strong> the social media agent pulls an account&apos;s posts into one
          dashboard, finds what works, plans the next posts and creates them. For the full walkthrough, read{" "}
          <Link href="/blog/how-to-grow-on-social-media-with-claude-and-ai-agent" className={LINK}>how to grow on social media with Claude and an AI agent</Link>.
        </p>

        <SignupCta eyebrow="Try your first agent" heading="Let an agent read your Instagram for free">
          Paste your profile link and the social media agent shows you your best posts, formats and posting times from
          your own data. One account is free, no card required.
        </SignupCta>

        <h3 className={H3}>Example 2: the SEO and GEO agent that lives inside your Search Console and website</h3>
        <p>
          The <Link href="/agents/seo-geo" className={LINK}>Talk to me Data SEO and GEO agent</Link> connects to Google
          Search Console through Google&apos;s own sign-in, with read-only access. It works out which searches you can win,
          writes pages built to rank on Google and to be quoted by ChatGPT, Claude, Perplexity and Google&apos;s AI
          Overviews (that second part is GEO, generative engine optimization), and publishes them to your WordPress,
          Webflow, Shopify or Ghost site.
        </p>

        <SeoAgentDiagram />

        <p>
          You can ask it questions in plain English, like &quot;why did my clicks drop on /pricing?&quot;, or tell it what
          to do, like &quot;write a page on agency CRMs&quot;. Pages can land as drafts for you to review, or you can switch
          on autopilot once you trust it. Most people start with review first. To see the full workflow, read{" "}
          <Link href="/blog/how-to-automate-seo-and-geo-growth-with-ai-agent" className={LINK}>how to automate SEO and GEO with an AI agent</Link>.
        </p>

        <h2 id="how-do-you-get-started-with-ai-agents" className={H2}>How Do You Get Started With AI Agents?</h2>
        <p>
          You get started by giving one small, repetitive task to an agent that works where that task already lives. Not
          your whole business, one task. These are the five steps I recommend to every beginner:
        </p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong className="text-ink">Pick one task you repeat every week.</strong> Checking which posts did well,
            reading your Search Console report, logging leads in a sheet. If you can describe it in three sentences, an
            agent can probably do it.
          </li>
          <li>
            <strong className="text-ink">Find the tool where it lives.</strong> That is the tool your agent needs to
            connect to. If the task lives in Instagram, a chatbox agent is the wrong choice.
          </li>
          <li>
            <strong className="text-ink">Choose ready-built or build your own.</strong> A ready-built agent like ours is
            the fastest way to see results. If you want to learn by doing, follow our guide on{" "}
            <Link href="/blog/how-to-build-an-ai-agent" className={LINK}>how to build an AI agent step by step</Link>.
          </li>
          <li>
            <strong className="text-ink">Connect with the official sign-in and start in review mode.</strong> Never hand
            over a password. Give the agent the least access it needs, and approve its work before anything goes live.
          </li>
          <li>
            <strong className="text-ink">Give feedback, then give it more autonomy.</strong> Correct it like you would a
            new hire. Once its suggestions are consistently good, let it act on its own: schedule the posts, publish the
            pages.
          </li>
        </ol>
        <p>
          Not ready to sign up for anything? Run our free{" "}
          <Link href="/free-tools/social-media-analyzer" className={LINK}>social media page analyzer</Link> first. It is a
          small taste of what an agent sees when it reads your account.
        </p>

        <h2 id="are-ai-agents-safe-for-beginners" className={H2}>Are AI Agents Safe for Beginners?</h2>
        <p>
          Yes, as long as you stay in control of three things: <strong>access</strong>, <strong>approval</strong> and{" "}
          <strong>instructions</strong>. Most of the fear around AI agents comes from imagining software that does
          whatever it wants with your accounts. A well-built agent is the opposite.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-ink">Access:</strong> it connects through the platform&apos;s own sign-in, read-only wherever possible, and you can disconnect it at any time</li>
          <li><strong className="text-ink">Approval:</strong> it drafts first and acts only when you say go, until you choose otherwise</li>
          <li><strong className="text-ink">Instructions:</strong> its rules say what it must never do, like posting without approval or inventing numbers</li>
        </ul>
        <p>
          The real risk for most small businesses isn&apos;t an agent doing too much. It is spending another year doing
          by hand what an agent could do every week.
        </p>

        <h2 id="ai-agents-101-glossary" className={H2}>AI Agents 101: The Words You&apos;ll Hear</h2>
        <p>You don&apos;t need to master the jargon, but these eight terms come up in almost every conversation about agents:</p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold">Term</th>
                <th className="p-4 font-semibold">What it means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">AI agent</td><td className="p-4">Software that works toward a goal using a model, tools and instructions</td></tr>
              <tr><td className="p-4 font-medium text-ink">Model (LLM)</td><td className="p-4">The AI that reads, reasons and writes, e.g. Claude Opus 5.5 or GPT-6 Astra</td></tr>
              <tr><td className="p-4 font-medium text-ink">Tool</td><td className="p-4">Anything the agent can use beyond its own knowledge: data, apps, web search, APIs</td></tr>
              <tr><td className="p-4 font-medium text-ink">MCP</td><td className="p-4">Model Context Protocol, an open standard for connecting agents to apps and data</td></tr>
              <tr><td className="p-4 font-medium text-ink">API</td><td className="p-4">The official way one piece of software talks to another, e.g. to publish a post</td></tr>
              <tr><td className="p-4 font-medium text-ink">System prompt</td><td className="p-4">The agent&apos;s standing instructions: role, goal, steps and rules</td></tr>
              <tr><td className="p-4 font-medium text-ink">Human in the loop</td><td className="p-4">The agent waits for your approval before it acts</td></tr>
              <tr><td className="p-4 font-medium text-ink">Autopilot</td><td className="p-4">The agent acts on its own, on a schedule, once you trust it</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="summary" className={H2}>Summary</h2>
        <p>
          AI agents are simpler than they sound. Every agent is a model, a set of tools and a set of instructions. The
          ones worth using don&apos;t make you work inside a chatbox; they work inside the tools you already use, like
          your Instagram or your Google Search Console, and give you an extra layer of insight on top. Start with one
          task, connect one tool, keep the agent in review mode, and let it earn more responsibility over time.
        </p>
        <p>
          Next, see the <Link href="/agents" className={LINK}>ready-built AI agents</Link> you can start with, or learn{" "}
          <Link href="/blog/how-to-build-an-ai-agent" className={LINK}>how to build your own AI agent</Link>.
        </p>

        <SignupCta heading="Your first AI agent, free, in minutes">
          Start with the social media agent on your Instagram or the SEO and GEO agent on your website. Connect one
          account, see what it finds, and decide for yourself.
        </SignupCta>
      </div>
    </BlogPostShell>
  )
}
