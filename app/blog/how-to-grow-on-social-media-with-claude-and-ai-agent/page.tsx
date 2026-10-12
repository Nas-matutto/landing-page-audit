import Link from "next/link"
import { Figure } from "@/components/blog/figure"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"

const SLUG = "how-to-grow-on-social-media-with-claude-and-ai-agent"
const IMG = `/blog/${SLUG}`

export const metadata = buildPostMetadata(SLUG)

const LINK = "text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4"

const faqs: Faq[] = [
  {
    question: "Can Claude analyze my Instagram or TikTok analytics?",
    answer:
      "Not on its own. Claude can't log into your social accounts, so it only sees the numbers you paste in. A social media AI agent connects to your profile, pulls every post's views, engagement and interactions into one dashboard, and compares each post with your own median. You can then ask it questions in plain English, or take its insights into Claude to write scripts and design posts.",
  },
  {
    question: "Is the Talk to me Data social media agent free?",
    answer:
      "Yes, there is a free plan. It analyzes 1 social account from your last 10 posts, refreshes once a week and includes a preview of competitor tracking. Paid plans add more accounts, full competitor tracking, longer post history, and the agent building and auto-posting finished posts for you.",
  },
  {
    question: "Which platforms does the social media agent work with?",
    answer:
      "It analyzes Instagram, TikTok, YouTube and Facebook Pages. It can auto-post to Instagram, Facebook and TikTok. For other platforms you get an email reminder with the finished post.",
  },
  {
    question: "How do I find out what's working for my competitors?",
    answer:
      "Track a few accounts in your niche, both peers your size and bigger aspirational accounts, and look for their breakout posts: the ones that did at least twice that account's usual views. Breakouts show you a format or topic the audience already wants. Then adapt the pattern to your own expertise instead of copying the post.",
  },
  {
    question: "Which metrics matter most for growing on social media?",
    answer:
      "Views alone can mislead. Compare each post with your own median views to spot real winners, then look at engagement rate, interactions per post, saves and shares, and watch time where the platform reports it. A post that beats your median on views and engagement is the strongest signal of what to make more of.",
  },
  {
    question: "Can Claude edit full social media videos?",
    answer:
      "Yes, with HyperFrames, an open-source video framework from HeyGen. You install it as a plugin in Claude Code, describe the video you want, and Claude writes the video as code and renders it to an MP4. Short videos of under 30 seconds work best and use the least of your Claude plan's usage.",
  },
]

const CAROUSEL_PROMPT = `Use the web-asset-generator skill to design a 5-slide Instagram carousel.

Size: 1080 x 1350 px (portrait 4:5), one PNG per slide.
Brand: background [#141414], text [white], accent [#FF5A1F], font [a bold sans serif].
Show my handle [@yourhandle] bottom left on every slide.

Slides:
1. Cover: "[the hook your agent picked]" with the subtitle "[one short line]"
2. "[Point 1]" plus one sentence that explains it
3. "[Point 2]" plus one sentence that explains it
4. "[Point 3]" plus one sentence that explains it
5. Call to action: "[e.g. Follow for more / Comment AUDIT and I'll DM you]"

Rules:
- No more than 20 words on any slide. Big type, plenty of space.
- Same layout on every slide. Number them 1/5 to 5/5, top right.
- Save them as slide-1.png to slide-5.png in this folder, then show me a preview.`

/** Your data + competitors' breakouts → patterns → plan → Claude builds → post, and round again. */
function GrowthLoopDiagram() {
  const steps = [
    { x: 205, title: "AI agent", lines: ["finds the formats,", "hooks and times"] },
    { x: 350, title: "Content plan", lines: ["next posts and", "hooks to use"] },
    { x: 495, title: "Claude builds", lines: ["carousels and", "edited videos"] },
    { x: 640, title: "Post", lines: ["and measure", "against median"] },
  ]
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 260" role="img" aria-labelledby="growth-loop-title" className="h-auto w-full rounded-2xl border border-hairline bg-mist">
        <title id="growth-loop-title">
          The social media growth loop: your own post data and competitors&apos; breakout posts feed an AI agent, which finds the winning formats and hooks, builds a content plan, Claude creates the posts, and every new post feeds the next analysis
        </title>
        <defs>
          <marker id="growth-loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
        </defs>
        {[
          { y: 30, title: "Your data", sub: "what works for you" },
          { y: 120, title: "Competitors", sub: "what goes viral for others" },
        ].map(input => (
          <g key={input.title}>
            <rect x="20" y={input.y} width="160" height="70" rx="12" fill="#141414" />
            <text x="100" y={input.y + 31} textAnchor="middle" fontSize="14" fontWeight="700" fill="white">{input.title}</text>
            <text x="100" y={input.y + 50} textAnchor="middle" fontSize="11" fill="#d4d4d4">{input.sub}</text>
            <path d={`M182,${input.y + 35} C192,${input.y + 35} 190,110 200,110`} fill="none" stroke="#141414" strokeWidth="2" markerEnd="url(#growth-loop-arrow)" />
          </g>
        ))}
        {steps.map((step, i) => (
          <g key={step.title}>
            <rect x={step.x} y="65" width="125" height="90" rx="12" fill="white" stroke="#141414" strokeWidth="1.5" />
            <text x={step.x + 62.5} y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#141414">{step.title}</text>
            {step.lines.map((line, j) => (
              <text key={line} x={step.x + 62.5} y={120 + j * 15} textAnchor="middle" fontSize="11" fill="#717171">{line}</text>
            ))}
            {i < steps.length - 1 && (
              <path d={`M${step.x + 128},110 L${step.x + 142},110`} stroke="#141414" strokeWidth="2.5" markerEnd="url(#growth-loop-arrow)" />
            )}
          </g>
        ))}
        <path d="M702,158 C702,235 100,235 100,196" fill="none" stroke="#adadad" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#growth-loop-arrow)" />
        <text x="400" y="248" textAnchor="middle" fontSize="11" fill="#141414">every new post feeds the next analysis</text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        Growth comes from the loop, not from one viral post. Each round of data makes the next round of ideas better.
      </figcaption>
    </figure>
  )
}

export default function GrowOnSocialMediaWithClaudePage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="space-y-6 text-neutral-600 leading-relaxed">
        <p className="text-lg text-ink">
          <strong>
            To grow on social media with Claude and an AI agent, let the agent pull every post&apos;s views and engagement
            into one dashboard, find which formats, hooks and posting times beat your own median, and watch which
            competitor posts break out in your niche. Then use those insights to pick your next posts, and use Claude to
            build them as carousels and fully edited videos.
          </strong>
        </p>
        <p>
          In the last six months I&apos;ve been growing my social media channels, with several videos reaching hundreds of
          thousands of views. None of those ideas came from staring at a blank page. This guide is the exact system I
          use to get content ideas that work: how I read my data in the Talk to me Data social media agent, the trick I
          use to keep an eye on competitors, and how I use Claude to produce the posts themselves.
        </p>

        <div className="rounded-2xl border border-hairline bg-mist p-6 my-8">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink mb-3">TL;DR</h2>
          <ul className="list-disc pl-6 space-y-2 text-ink">
            <li>Good content ideas start with <strong>data</strong>, not brainstorming: what already works for you, and what is going viral for others</li>
            <li>Connect your account to a social media AI agent so it pulls every post into one dashboard (the free plan covers 1 account)</li>
            <li>Judge posts against <strong>your own median</strong>, not raw views: breakouts, formats, best times and engagement rate</li>
            <li>Track competitors and study their <strong>breakout posts</strong> for formats your audience already wants</li>
            <li>Use the Hooks tab to find your strongest opening and write new hooks in that style</li>
            <li>Build the posts with Claude: carousels with the Web Asset Generator skill, full videos with HyperFrames</li>
          </ul>
        </div>

        <h2 id="why-should-content-ideas-start-with-data" className={H2}>Why Should Content Ideas Start With Data?</h2>
        <p>
          Content ideas should start with data because your audience has already told you what it wants: in the posts
          they watched to the end, saved and shared. Most people start by opening Claude and brainstorming. That gives
          you ideas that sound good to you, not ideas proven to work with your audience.
        </p>
        <p>There are two kinds of data worth using, and an AI agent can collect both for you:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className="text-ink">What already works for you.</strong> Which of your own formats, topics, hooks and posting times beat your usual results.</li>
          <li><strong className="text-ink">What is going viral for others.</strong> The formats other creators in your niche are using to get far more views than they normally do.</li>
        </ol>

        <GrowthLoopDiagram />

        <h2 id="step-1-connect-your-account-to-a-social-media-ai-agent" className={H2}>Step 1: Connect Your Account to a Social Media AI Agent</h2>
        <p>
          The first step is getting all your numbers in one place without pulling them by hand. You can scroll your
          Instagram grid and see which videos have the most views, but views are only part of the story. Engagement rate,
          interactions per post and how each format performs matter more, and going post by post across your whole page
          to collect them isn&apos;t realistic.
        </p>
        <p>
          In the <Link href="/agents/social-media" className={LINK}>Talk to me Data social media agent</Link>, you sign up,
          paste your public profile link (Instagram, TikTok, YouTube or a Facebook Page) and the agent reads your posts.
          Your first analysis is ready in minutes. You don&apos;t share a password; you only connect the account through the
          platform&apos;s own sign-in later, if you want the agent to post for you.
        </p>
        <p>
          <strong className="text-ink">Good to know:</strong> the free plan connects <strong>1 social account</strong> and
          analyzes your last 10 posts, refreshed once a week. Paid plans add more accounts and a longer post history.
        </p>

        <Figure
          src={`${IMG}/social-media-agent-dashboard-overview.webp`}
          alt="The social media agent dashboard for a sample account: total followers, posts, views and interactions across channels, with Overview, Content, Competitors, Audience, Hooks and Create tabs"
          width={1800}
          height={1215}
          caption="One dashboard for every channel. The tabs along the middle (Overview, Content, Competitors, Audience, Hooks, Create) are the steps in this guide. Shown on a sample account."
        />

        <h2 id="step-2-how-do-you-know-which-posts-are-working" className={H2}>Step 2: How Do You Know Which Posts Are Actually Working?</h2>
        <p>
          You know a post is working when it beats <strong>your own median</strong>, not when it gets a big number. A
          10K-view video is a win on an account that usually gets 2K and a flop on one that usually gets 50K. The agent
          measures every post against your usual results and flags the breakouts: posts that did 2× or more.
        </p>
        <p>
          The Overview tab opens with the agent&apos;s verdict in plain English, split into what to keep doing, what to fix
          and what to try this week:
        </p>

        <Figure
          src={`${IMG}/agent-analysis-keep-fix-try.webp`}
          alt="The agent's analysis: carousels earn 2.4 times the median, with three cards for keep doing, fix and try this week, each with a Build it button"
          width={1600}
          height={570}
          caption="The verdict comes first: one headline insight and three actions. Each action has a Build it button that turns it into a post."
        />

        <p>Below the verdict are the charts I check every week:</p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-mist text-ink">
              <tr>
                <th className="p-4 font-semibold">Chart</th>
                <th className="p-4 font-semibold">What it tells you</th>
                <th className="p-4 font-semibold">What I do with it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Breakouts</td><td className="p-4">Every post plotted against your median; anything 2× or more is highlighted</td><td className="p-4">Open each breakout and ask what it had in common with the others</td></tr>
              <tr><td className="p-4 font-medium text-ink">What each format earns</td><td className="p-4">Average views, interactions and engagement rate for carousels, reels and images</td><td className="p-4">Shift my posting mix toward the format that earns most</td></tr>
              <tr><td className="p-4 font-medium text-ink">When you post</td><td className="p-4">A heatmap of interactions by day and time</td><td className="p-4">Schedule the next big post in my best slot</td></tr>
              <tr><td className="p-4 font-medium text-ink">Posting rhythm</td><td className="p-4">Days posted, usual gap and longest gap</td><td className="p-4">Keep the gaps short: consistency is the lever you control most</td></tr>
            </tbody>
          </table>
        </div>

        <Figure
          src={`${IMG}/posting-rhythm-breakouts-best-times-formats.webp`}
          alt="Four charts: posting rhythm calendar, breakout posts plotted against the median, a heatmap of the best days and times to post, and average interactions for carousels, reels and images"
          width={1600}
          height={1275}
          caption="Rhythm, breakouts, timing and formats on one screen. In this sample account, carousels earn more than twice the interactions of reels."
        />

        <p>
          In the Content tab you can click any post to open it on the platform and see exactly what it looked like.
          That matters: a number tells you <em>which</em> post won, but you need to watch it again to see <em>why</em>.
        </p>

        <SignupCta eyebrow="Try it on your account" heading="See your winning posts in minutes">
          Sign up free, paste your profile link, and the social media agent finds your breakouts, best formats and best
          posting times from your own data.
        </SignupCta>

        <h2 id="step-3-ask-the-agent-for-data-and-content-ideas" className={H2}>Step 3: Ask the Agent for Data and Content Ideas</h2>
        <p>
          Once the data is in, you don&apos;t need to read every chart yourself. Click <strong>Ask your Agent</strong> and
          ask in plain English. The answers use the numbers on your dashboard, so they are specific to your account
          rather than generic advice. The questions I ask most:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>&quot;Which of my posts should I make more of?&quot;</li>
          <li>&quot;Why did my last reel do worse than usual?&quot;</li>
          <li>&quot;Give me a content idea based on my best post, with a script.&quot;</li>
          <li>&quot;Plan my next week and schedule it.&quot;</li>
        </ul>

        <Figure
          src={`${IMG}/ask-your-agent-chat.webp`}
          alt="Ask your Agent chat: the agent recommends more carousels and result-first hooks based on the account's numbers, then plans three posts into the best time slots"
          width={720}
          height={1350}
          className="mx-auto max-w-sm"
          caption="Ask a question, get an answer grounded in your numbers. Then ask it to act on the answer."
        />

        <h2 id="step-4-how-do-you-keep-an-eye-on-competitors-content" className={H2}>Step 4: How Do You Keep an Eye on Competitors&apos; Content?</h2>
        <p>
          This is the trick I promised. Instead of scrolling competitors&apos; profiles, let the agent track them and
          surface only their <strong>breakout posts</strong>: the ones that did at least twice that account&apos;s usual
          views. A breakout tells you a format or topic the audience in your niche already wants. It is inspiration with
          evidence behind it.
        </p>
        <p>
          The agent reads your bio and captions to understand your niche, then suggests accounts to track. It labels them
          as <strong>peers</strong> (a similar size to you) or <strong>aspirational</strong> (bigger accounts in your
          niche). I track a mix of both: peers show what works at my size, aspirational accounts show where the niche is
          heading. You can also add any account by pasting its link.
        </p>

        <Figure
          src={`${IMG}/suggested-competitors-to-track.webp`}
          alt="Suggested competitors: a peer account and an aspirational account in the same niche, each with three recent posts, a Track button and a Not relevant option"
          width={1600}
          height={834}
          caption="Suggested accounts, labeled peer or aspirational. Track the ones worth learning from and dismiss the rest."
        />

        <p>Once you track a few accounts, the Competitors tab shows every breakout post in your niche from the last 90 days:</p>

        <Figure
          src={`${IMG}/competitor-breakout-posts.webp`}
          alt="Breakout posts in your niche: competitor carousels and reels that did between 2 and 5.3 times their account's median views, with views, likes, comments and engagement rate"
          width={1600}
          height={1333}
          caption="Each card shows how far the post beat that account's usual, so a small account's breakout counts as much as a big one's."
        />

        <p>
          Below that, <strong>You vs them</strong> compares followers, average views, engagement and posting rate side
          by side, and <strong>What to borrow</strong> turns the patterns behind their breakouts into plays you can run.
          Each play has a <strong>Script this for me</strong> button that writes your version.
        </p>

        <Figure
          src={`${IMG}/you-vs-competitors-what-to-borrow.webp`}
          alt="You versus competitors table comparing followers, average views, engagement, posts per week and top format, followed by What to borrow cards with a Script this for me button"
          width={1600}
          height={1474}
          caption="The point is never to copy a post. It is to borrow the pattern (one lesson per carousel, the result in the first second) and apply it to what you know."
        />

        <p>
          On the free plan you get a preview of competitor tracking; paid plans track 3 to 10 competitors depending on
          the plan.
        </p>

        <h2 id="step-5-how-do-you-find-hooks-that-work" className={H2}>Step 5: How Do You Find Hooks That Work?</h2>
        <p>
          You find hooks that work by sorting your past openings into styles and scoring each style against your median.
          The Hooks tab does this for you: it reads how your latest posts open, groups them (result first, question,
          list, curiosity gap, bold claim, how-to, POV) and shows how each style performed.
        </p>

        <Figure
          src={`${IMG}/hook-styles-vs-median.webp`}
          alt="The Hooks tab: the strongest opening style, result first at 2.1 times the median, as a fill-in-the-blank formula with a Write 5 hooks like this button, and every hook style scored against the median"
          width={1600}
          height={1090}
          caption="Your strongest opening becomes a formula you can reuse. Click Write 5 hooks like this to get new hooks in the same style."
        />

        <p>
          The top card turns your best opening into a fill-in-the-blank formula, such as &quot;We [did something
          impressive] in [short time]. Here&apos;s how.&quot; Click <strong>Write 5 hooks like this</strong> and the agent
          writes five new hooks in that style about your topics. Read the &quot;what to do with your openings&quot; notes
          too: they tell you which openings to stop using, which is just as useful.
        </p>
        <p>
          With only a few posts per style, treat these as early signals rather than rules. The more you post, the more
          reliable the scores get.
        </p>

        <h2 id="step-6-turn-the-insights-into-a-content-plan" className={H2}>Step 6: Turn the Insights Into a Content Plan</h2>
        <p>
          The Create tab is where the data turns into posts. Type what you want (&quot;a 15 second reel on my morning
          routine&quot;) or click <strong>Build it</strong> on any insight, and the agent writes a post kit: hook options,
          script and caption, and for carousels, the designed slides in your brand kit. Every post lands in your plan at
          your best time slot, with a &quot;why this&quot; line that ties it back to your data.
        </p>

        <Figure
          src={`${IMG}/content-plan-with-hooks.webp`}
          alt="The content plan: a five-slide carousel scheduled for Tuesday at 9am, set to auto-post, with the reason it was chosen and three hooks to pick from"
          width={1600}
          height={898}
          caption="Every planned post explains itself: here, carousels earn 2.4× the median and Tuesday 9:00 is the strongest slot."
        />

        <p>
          You can edit any slide, switch between portrait and square, and either let the agent auto-post to Instagram,
          Facebook or TikTok or get an email reminder to post it yourself. Building and posting finished content is part
          of the paid plans.
        </p>

        <Figure
          src={`${IMG}/carousel-design-studio.webp`}
          alt="The design studio: a five-slide carousel titled 3 branding mistakes killing your reach, with editable slide text and a scheduled auto-post to Instagram"
          width={1500}
          height={1513}
          className="mx-auto max-w-lg"
          caption="Carousels come out designed in your brand kit, with every slide editable before it posts."
        />

        <h2 id="how-do-you-make-carousels-with-claude" className={H2}>How Do You Make Carousels With Claude?</h2>
        <p>
          If you prefer to design posts yourself, Claude can build carousel slides with the <strong>Web Asset Generator</strong>{" "}
          skill, which creates image files from a description. Take a hook and the three points from your agent&apos;s plan,
          paste them into the prompt below, and Claude produces one image per slide in your brand colors.
        </p>

        <PromptBlock prompt={CAROUSEL_PROMPT} label="Carousel prompt for Claude" leadSource="prompt_grow_social_carousel" />

        <p>
          The important part is what goes into the brackets. A carousel built on a hook that already beat your median,
          in the format your data says earns most, starts with an unfair advantage over one built from a brainstorm.
        </p>

        <h2 id="how-do-you-edit-full-videos-with-claude" className={H2}>How Do You Edit Full Videos With Claude?</h2>
        <p>
          For video, I use <strong>HyperFrames</strong>, an open-source video framework from HeyGen. You install it as a
          plugin in Claude Code, describe the video you want (length, format, assets and call to action), and Claude
          writes the video as code and renders it to an MP4. I use it to edit full social media videos from a single
          prompt, and it keeps the cost to your Claude plan, with no per-render fees. Keep videos under 30 seconds to save
          usage.
        </p>
        <p>
          I wrote a full tutorial, including the install commands and the prompts I use:{" "}
          <a href="https://www.sellingwithnas.com/how-to-build-free-ai-videos-with-claude-hyperframes" target="_blank" rel="noopener" className={LINK}>
            how to build free AI videos with Claude and HyperFrames
          </a>
          .
        </p>

        <h2 id="summary" className={H2}>Summary</h2>
        <p>
          Growing on social media with Claude and an AI agent comes down to a loop. Let the agent pull your data and
          compare every post with your own median. Find your winning formats, best times and strongest hooks. Track
          competitors and borrow the patterns behind their breakout posts. Then use the plan to build the next posts,
          with the agent, with Claude and the Web Asset Generator skill for carousels, or with HyperFrames for full videos.
        </p>
        <p>
          For a deeper look at the automation side, read our guide on{" "}
          <Link href="/blog/how-to-automate-social-media-posting-with-ai-agent" className={LINK}>how to automate social media posting with an AI agent</Link>,
          or build your own analysis agent with the prompt in{" "}
          <Link href="/blog/how-to-build-social-media-ai-agent" className={LINK}>how to build a social media AI agent</Link>.
        </p>

        <SignupCta heading="Start with the data. It's free.">
          Connect one account on the free plan and the social media agent shows you which posts, formats and hooks are
          working, and what your competitors are doing that you&apos;re not.
        </SignupCta>
      </div>
    </BlogPostShell>
  )
}
