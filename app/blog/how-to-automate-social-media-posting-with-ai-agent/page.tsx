import Link from "next/link"
import { Figure } from "@/components/blog/figure"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"
import { SIGNUP_URL } from "@/lib/links"

const SLUG = "how-to-automate-social-media-posting-with-ai-agent"

export const metadata = buildPostMetadata(SLUG)

const LINK = "text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4"
const H3 = "text-xl font-semibold tracking-[-0.01em] text-ink mt-10 mb-3"

const AGENT_PROMPT = `You are the autonomous social media agent for [Company]. You run the whole content cycle end to end: analyze, plan, create and deliver, without a human prompting each step.

STEP 1 - ANALYZE OUR CHANNELS
Read the connected accounts ([Instagram, TikTok, YouTube, Facebook, LinkedIn, X]). Learn the brand voice, the best-performing formats and hooks, the posting cadence, and which topics drive reach, saves and engagement. Compare every post with the account's median, not with raw views.

STEP 2 - STUDY THE COMPETITION
Analyze [competitor accounts] and similar accounts in the niche. Find their breakout posts (2x or more their usual views), the hooks and formats that keep working, the content gaps we can own, and the trends worth using now.

STEP 3 - BUILD A DATA-DRIVEN CONTENT PLAN
Turn what you learned into a plan for the next [2 weeks]: the topic, format (reel, carousel, short, static), platform, day and time, and goal of every post. Give one line of evidence from the data for each choice.

STEP 4 - CREATE THE CONTENT
For each post, write the hook, the script or slide text, and a ready-to-use caption with hashtags. Create the images and slides in our brand colors and font, sized for each platform. Keep it on-brand and native to each platform.

STEP 5 - DELIVER FOR APPROVAL
Save every finished asset and caption to [Google Drive folder], organized by platform and date, so all a human has to do is review and post. Nothing is published without approval.

STEP 6 - LEARN AND REFINE
After posts go live, read the results, compare them with the plan, and update what you know about our audience. Each cycle, improve the hooks, timing and formats you choose.

RULES
- Never invent numbers. If data is missing, say so.
- Never copy a competitor's post. Borrow the pattern, not the content.`

const faqs: Faq[] = [
  {
    question: "Which platforms does the social media agent support?",
    answer:
      "The Talk to me Data social media agent analyzes Instagram, TikTok, YouTube and Facebook Pages. On the Grow and Scale plans it posts to Instagram for you at your best times; otherwise you get a reminder with the finished post. If you build your own agent with the prompt in this guide, you can point it at any platform you can connect, including LinkedIn and X.",
  },
  {
    question: "Does it actually create the images and videos, or just the text?",
    answer:
      "It creates the post, not just the idea. For each post it writes the hooks, the script or slide text and the caption, and it designs carousels and images in your brand kit: your logo, colors, font and layout. For video it gives you a ready-to-film script, and you can edit full videos with Claude and HyperFrames.",
  },
  {
    question: "Does it post automatically, or do I stay in control?",
    answer:
      "You choose, post by post. You can review every post before it goes live, set it to auto-post at its scheduled time, or get a reminder and post it yourself. Nothing is published unless you connect the account and turn posting on.",
  },
  {
    question: "How does it know what content will perform?",
    answer:
      "It compares every post on your account with your own median, so it can see which formats, hooks, topics and posting times beat your usual results. It also tracks competitors in your niche and flags their breakout posts, the ones that did at least twice their usual views. Every post in the plan comes with the data behind it.",
  },
  {
    question: "Does it get better over time?",
    answer:
      "Yes. Each week it refreshes your data, checks how the latest posts did against your median, and updates what it recommends: which hooks, formats and times to use next. The more you post, the more reliable its picks become.",
  },
  {
    question: "Is there a free way to automate social media with AI?",
    answer:
      "Yes. The Talk to me Data free plan analyzes one social account and tells you what to post next, with no card required. You can also build your own agent for free with Claude and the prompt in this guide, though you'll need to connect your accounts and run it yourself.",
  },
]

/** Analyze → competitors → plan → create → post → learn, drawn as a loop. */
function AgentCycleDiagram() {
  const steps = [
    { n: "1", title: "Analyze", sub: "your channels" },
    { n: "2", title: "Study", sub: "competitors" },
    { n: "3", title: "Plan", sub: "the next posts" },
    { n: "4", title: "Create", sub: "hooks and slides" },
    { n: "5", title: "Post", sub: "or send for review" },
    { n: "6", title: "Learn", sub: "from the results" },
  ]
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 210" role="img" aria-labelledby="agent-cycle-title" className="h-auto w-full rounded-2xl border border-hairline bg-mist">
        <title id="agent-cycle-title">
          How a social media AI agent works: it analyzes your channels, studies competitors, plans the next posts, creates them, posts them or sends them for review, and learns from the results before the next cycle
        </title>
        <defs>
          <marker id="agent-cycle-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
        </defs>
        {steps.map((step, i) => {
          const x = 20 + i * 126
          return (
            <g key={step.title}>
              <rect x={x} y="40" width="108" height="92" rx="12" fill={i === 4 ? "#141414" : "white"} stroke="#141414" strokeWidth="1.5" />
              <text x={x + 14} y="62" fontSize="11" fontFamily="monospace" fill="#adadad">{step.n.padStart(2, "0")}</text>
              <text x={x + 14} y="88" fontSize="15" fontWeight="700" fill={i === 4 ? "white" : "#141414"}>{step.title}</text>
              <text x={x + 14} y="108" fontSize="10.5" fill={i === 4 ? "#d4d4d4" : "#717171"}>{step.sub}</text>
              {i < steps.length - 1 && (
                <path d={`M${x + 110},86 L${x + 124},86`} stroke="#141414" strokeWidth="2.5" markerEnd="url(#agent-cycle-arrow)" />
              )}
            </g>
          )
        })}
        <path d="M704,134 C704,190 74,190 74,138" fill="none" stroke="#adadad" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#agent-cycle-arrow)" />
        <text x="390" y="200" textAnchor="middle" fontSize="11" fill="#141414">every week, the results feed the next plan</text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        The six steps run as a loop. The agent does each one; you decide whether step 5 posts on its own or waits for your approval.
      </figcaption>
    </figure>
  )
}

export default function AutomateSocialMediaPostingPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="space-y-6 text-neutral-600 leading-relaxed">
        <p className="text-lg text-ink">
          <strong>
            To automate social media with AI, hand the content cycle to an AI agent: it analyzes what performs on your
            channels and your competitors&apos;, builds a content plan from that data, creates the posts (hooks, captions,
            carousels and images) for each platform, and schedules them at your best times.
          </strong>{" "}
          You stay in control by approving posts before they go live, or let the agent post them for you.
        </p>
        <p>
          A scheduling tool only automates the last click. You still have to come up with the idea, design the post and
          write the caption. An AI agent automates the work before that click, which is where the hours go. This guide
          shows how it works in six simple steps, then two ways to set it up: a ready-made agent you can start free, or
          your own agent built with Claude and the prompt below.
        </p>

        <div className="rounded-2xl border border-hairline bg-mist p-6 my-8">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink mb-3">TL;DR</h2>
          <ul className="list-disc pl-6 space-y-2 text-ink">
            <li>An AI agent runs six steps: <strong>analyze, study competitors, plan, create, post, learn</strong></li>
            <li>It judges every post against <strong>your own median</strong>, so the plan is built on what already works for you</li>
            <li>It creates the post itself: hooks, captions and designed carousels in your brand kit</li>
            <li>You choose: approve each post, or let it <strong>auto-post</strong> at your best times</li>
            <li>Fastest route: <a href={SIGNUP_URL} className={LINK}>sign up free</a> and paste your profile link. DIY route: the free prompt below</li>
          </ul>
        </div>

        <h2 id="what-can-you-automate-on-social-media" className={H2}>What Can You Automate on Social Media With AI?</h2>
        <p>
          You can automate almost everything except your own expertise and your face on camera. Here is how the weekly
          work splits:
        </p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold">Task</th>
                <th className="p-4 font-semibold">Doing it by hand</th>
                <th className="p-4 font-semibold">With an AI agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Checking what works</td><td className="p-4">Scroll your grid and guess from view counts</td><td className="p-4">Every post compared with your median; breakouts flagged</td></tr>
              <tr><td className="p-4 font-medium text-ink">Watching competitors</td><td className="p-4">Scroll their profiles when you remember</td><td className="p-4">Tracked automatically; only their breakout posts surface</td></tr>
              <tr><td className="p-4 font-medium text-ink">Deciding what to post</td><td className="p-4">A blank calendar every Monday</td><td className="p-4">A plan with the data behind every post</td></tr>
              <tr><td className="p-4 font-medium text-ink">Writing hooks and captions</td><td className="p-4">From scratch, every time</td><td className="p-4">Written in the hook styles that beat your median</td></tr>
              <tr><td className="p-4 font-medium text-ink">Designing carousels</td><td className="p-4">Time in a design tool for every post</td><td className="p-4">Designed in your brand kit, every slide editable</td></tr>
              <tr><td className="p-4 font-medium text-ink">Posting on time</td><td className="p-4">Easy to forget</td><td className="p-4">Scheduled at your best time, posted or reminded</td></tr>
              <tr><td className="p-4 font-medium text-ink">Filming and your expertise</td><td className="p-4">You</td><td className="p-4">Still you. The agent gives you a ready-to-film script</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="how-the-social-media-agent-works-end-to-end" className={H2}>How Does a Social Media AI Agent Work?</h2>
        <p>
          A social media AI agent works in a loop of six steps. The screenshots below are from the{" "}
          <Link href="/agents/social-media" className={LINK}>Talk to me Data social media agent</Link>, shown on a sample
          account.
        </p>

        <AgentCycleDiagram />

        <h3 className={H3}>Step 1: It analyzes your channels</h3>
        <p>
          The agent reads every post on your account and compares each one with <strong>your own median</strong>. That is
          what makes the analysis useful: a post that did twice your usual views is a winner whether you have 500
          followers or 500,000. It works out:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>which formats (carousels, reels, images) earn the most for you;</li>
          <li>which hooks and topics your audience responds to;</li>
          <li>your best days and times to post.</li>
        </ul>
        <Figure
          src="/social-agent/analysis.webp"
          alt="The agent's analysis: carousels earn 2.4 times the median, with three cards for keep doing, fix and try this week"
          width={1600}
          height={570}
          caption="Each analysis ends in three plain actions: keep doing, fix, try this week."
        />

        <h3 className={H3}>Step 2: It studies your competitors</h3>
        <p>
          Next it looks outward. It suggests accounts in your niche, tracks the ones you pick, and flags their{" "}
          <strong>breakout posts</strong>: posts that did at least twice that account&apos;s usual views. Those show you
          formats and topics your audience already wants. The agent turns them into plays you can run, never copies.
        </p>
        <Figure
          src="/social-agent/breakouts.webp"
          alt="Breakout posts from competitors in the same niche, each showing how many times their usual views it earned"
          width={1600}
          height={1333}
          caption="Competitor breakouts, ranked by how far they beat that account's usual. This is the fastest source of proven ideas."
        />
        <p>
          I explain how I use this every week, and the competitor trick in detail, in{" "}
          <Link href="/blog/how-to-grow-on-social-media-with-claude-and-ai-agent" className={LINK}>how to grow on social media with Claude and an AI agent</Link>.
        </p>

        <h3 className={H3}>Step 3: It builds a data-driven content plan</h3>
        <p>
          With both reads in hand, the agent plans your next posts: the topic, the format, the platform, and the day and
          time. Every post comes with a one-line &quot;why this&quot;, so you can see the data behind each choice instead
          of trusting a guess.
        </p>

        <h3 className={H3}>Step 4: It creates the posts</h3>
        <p>
          This is where most tools stop and the agent keeps going. For each post it writes several hook options, the
          script or slide text and the caption. Carousels and images are designed in your brand kit (logo, colors, font and
          layout), and you can edit any slide before it goes out.
        </p>
        <Figure
          src="/social-agent/plan.webp"
          alt="The content plan: a designed five-slide carousel scheduled for Tuesday at 9am, the reason it was chosen, and three hooks to pick from"
          width={1600}
          height={898}
          caption="A planned post with its slides, its hook options and the reason it was chosen: carousels earn 2.4× the median here, and Tuesday 9:00 is the best slot."
        />

        <h3 className={H3}>Step 5: It posts, or sends it to you for approval</h3>
        <p>
          Every post lands in your plan at your best time. You choose what happens next, post by post: approve it, let the
          agent post it for you, or get a reminder and post it yourself. Nothing goes live unless you connect the account
          and turn posting on.
        </p>

        <h3 className={H3}>Step 6: It learns from the results</h3>
        <p>
          After posts go live, the agent checks how each one did against your median and feeds that into the next plan.
          Week by week, its picks of hooks, formats and times get sharper, because they are based on more of your own data.
        </p>

        <SignupCta eyebrow="Start free" heading="Let the agent find your next winning post">
          Sign up free, paste your Instagram, TikTok, YouTube or Facebook link, and the social media agent analyzes your
          posts and tells you what to post next. No card required.
        </SignupCta>

        <h2 id="how-do-you-set-up-social-media-automation" className={H2}>How Do You Set Up Social Media Automation?</h2>
        <p>There are two ways to set it up. Pick the one that matches how much time you want to spend on setup.</p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold"></th>
                <th className="p-4 font-semibold">Ready-made agent</th>
                <th className="p-4 font-semibold">Build your own with Claude</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Setup time</td><td className="p-4">About 5 minutes</td><td className="p-4">An afternoon, plus connecting accounts</td></tr>
              <tr><td className="p-4 font-medium text-ink">What you need</td><td className="p-4">Your profile link</td><td className="p-4">Claude, connectors to your accounts, a Drive folder</td></tr>
              <tr><td className="p-4 font-medium text-ink">Dashboards and charts</td><td className="p-4">Included</td><td className="p-4">You build them</td></tr>
              <tr><td className="p-4 font-medium text-ink">Runs every week on its own</td><td className="p-4">Yes</td><td className="p-4">Only if you schedule it</td></tr>
              <tr><td className="p-4 font-medium text-ink">Cost</td><td className="p-4">Free plan for 1 account; <Link href="/pricing" className={LINK}>paid plans</Link> to design and post</td><td className="p-4">Your Claude plan</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className={H3}>Option 1: Use a ready-made agent (about 5 minutes)</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li><a href={SIGNUP_URL} className={LINK}>Sign up free</a>. No card required.</li>
          <li>Paste your public profile link: Instagram, TikTok, YouTube or a Facebook Page. No password needed.</li>
          <li>Read your first analysis, ready in minutes: your winning posts, best formats and best times.</li>
          <li>Ask the agent what to post next, or ask it to plan your week.</li>
          <li>On a paid plan, approve the designed posts or let the agent post them for you.</li>
        </ol>
        <Figure
          src="/social-agent/chat.webp"
          alt="Ask your Agent chat: the agent recommends more carousels based on the account's numbers, then plans three posts into the best time slots"
          width={720}
          height={1350}
          className="mx-auto max-w-sm"
          caption="Ask in plain English. The answers use the numbers on your dashboard, then the agent acts on them."
        />

        <h3 className={H3}>Option 2: Build your own agent with Claude</h3>
        <p>
          If you prefer to build it yourself, you need three things: a capable model with tool use such as{" "}
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className={LINK}>Claude</a>, connectors to
          your social accounts, and a folder (for example in{" "}
          <a href="https://www.google.com/drive/" target="_blank" rel="noopener noreferrer" className={LINK}>Google Drive</a>)
          where it saves finished posts. Create a Claude Project, paste the prompt below into its instructions, and swap
          the brackets for your details. New to this? Our guide on{" "}
          <Link href="/blog/how-to-build-an-ai-agent" className={LINK}>how to build an AI agent</Link> walks through the setup,
          and <Link href="/blog/how-to-build-social-media-ai-agent" className={LINK}>how to build a social media AI agent</Link>{" "}
          has a simpler Instagram-only version.
        </p>

        <h3 id="the-prompt" className={H3}>The prompt</h3>
        <PromptBlock prompt={AGENT_PROMPT} leadSource="prompt_social_media_agent" />
        <p>
          Two honest limits of the DIY route: it runs when you open a chat, not on a schedule, and long runs in a chat app
          can hit usage limits halfway through. To make your carousels with Claude, add the Web Asset Generator skill; for
          full videos, see{" "}
          <a href="https://www.sellingwithnas.com/how-to-build-free-ai-videos-with-claude-hyperframes" target="_blank" rel="noopener" className={LINK}>how to build free AI videos with Claude and HyperFrames</a>.
        </p>

        <h2 id="how-to-automate-social-media-posting-without-hiring-an-agency" className={H2}>How Do You Automate Social Media Without Hiring an Agency?</h2>
        <p>
          You automate social media without an agency by letting an agent do the repeatable work (the analysis, the plan,
          the hooks, the designs and the scheduling) and keeping the parts only you can do: your expertise and your voice on
          camera. That gives you a consistent presence on every platform without a retainer or a full-time hire, and it
          improves the longer it runs. Small teams use the same approach across the business; see{" "}
          <Link href="/blog/ai-agents-for-small-business" className={LINK}>AI agents for small business</Link> for other
          workflows, or the <Link href="/blog/how-to-automate-seo-and-geo-growth-with-ai-agent" className={LINK}>SEO and GEO agent guide</Link>{" "}
          to automate your search traffic too.
        </p>

        <h2 id="summary" className={H2}>Summary</h2>
        <p>
          Automating social media with AI means handing the whole content cycle to an agent: analyze your channels, study
          competitors, plan the next posts, create them, post them, and learn from the results. Start with a ready-made agent
          if you want results this week, or build your own with Claude and the prompt above. Either way, the posts are built
          on what your data says works, not on guesswork. New to agents in general? Start with{" "}
          <Link href="/blog/what-are-ai-agents" className={LINK}>what AI agents are</Link>.
        </p>

        <SignupCta heading="Automate your social media, starting today">
          Sign up free and connect one account. The social media agent finds your winning posts, tracks your competitors
          and tells you what to post next.
        </SignupCta>
      </div>
    </BlogPostShell>
  )
}
