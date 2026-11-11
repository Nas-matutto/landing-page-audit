import Image from "next/image"
import Link from "next/link"
import { Figure } from "@/components/blog/figure"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { PromptBlock } from "@/components/blog/prompt-block"
import { YouTubeEmbed } from "@/components/ui/youtube-embed"
import { CLAUDE_SOCIAL_TUTORIAL_VIDEO } from "@/lib/links"
import { buildPostMetadata, type Faq } from "@/lib/blog"

const SLUG = "how-to-automate-instagram-with-ai"
const IMG = `/blog/${SLUG}`

export const metadata = buildPostMetadata(SLUG)

const LINK = "text-ink underline decoration-social/40 underline-offset-4 hover:decoration-social"
const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4"
const H2_STEP = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-3"

const faqs: Faq[] = [
  {
    question: "Can AI post to Instagram automatically?",
    answer:
      "Yes. An AI agent can publish to Instagram through Instagram's official API once you connect your account through Instagram's own sign-in. The account needs to be a Business or Creator account. In the Talk to me Data social media agent you choose, post by post, whether it auto-posts at its scheduled time or emails you a reminder to post it yourself.",
  },
  {
    question: "Is automating Instagram against Instagram's rules?",
    answer:
      "Publishing through Instagram's official API is allowed; it's how scheduling tools work. What gets accounts in trouble is automating engagement: bots that mass-like, follow, unfollow or comment. Automate the analysis, planning, design and scheduling, and keep the conversations with your audience human.",
  },
  {
    question: "Can AI make Instagram Reels for me?",
    answer:
      "Partly. The agent picks the Reel topic from your data, writes hook options, the script and the caption, and puts it in your plan at your best time, but you still film it. If you want the editing automated too, Claude can edit short videos with HyperFrames, an open-source video framework. Carousels and images are fully automatic: the agent designs them in your brand kit and posts them.",
  },
  {
    question: "Do I need to share my Instagram password?",
    answer:
      "No. To analyze your account you only paste your public profile link. To let the agent post for you, you connect through Instagram's own sign-in, which you can disconnect at any time.",
  },
  {
    question: "How much does it cost to automate Instagram with AI?",
    answer:
      "You can start for free. The Starter plan is free forever with 50 actions a month, enough to analyze your account, research competitors and build posts when you ask. Autopilot and posting to Instagram for you start on the Solo plan at $49 a month.",
  },
  {
    question: "How often should an AI agent post to Instagram?",
    answer:
      "Consistency matters more than volume. Autopilot in the social media agent builds a new post every 7, 4, 3 or 2 days; a post every 2 days is the top of the healthy range. Start with what you can review comfortably, then raise the pace once you trust the posts.",
  },
]

const DIY_PROMPT = `You are my Instagram strategist. Below is a CSV of my last [30] Instagram posts
exported from Meta Business Suite (date, type, caption, reach, likes, comments, saves, shares).

1. Work out my median reach. List every post that did 2x the median or more ("breakouts").
2. Compare formats (Reel, carousel, image): average reach, saves and shares per post.
3. Find my best posting days and times from the data.
4. Read the first line of every caption and group the hooks by style
   (result first, question, list, curiosity gap, bold claim, how-to, POV).
   Score each style against my median and write my best style as a fill-in-the-blank formula.
5. Here are 3 competitor posts that broke out in my niche: [paste links or captions].
   Tell me the pattern behind each one, not the topic.
6. Plan my next [3] posts: format, hook (in my best style), a 5-slide outline or a
   30-second script, caption, and the day and time to post. Explain each choice with my numbers.

Only use the numbers in the CSV. If something can't be worked out from the data, say so.

[paste CSV here]`

/** The automation loop: four jobs the agent runs every week, then posting feeds the next round. */
function InstagramAutomationLoop() {
  const steps = [
    { x: 30, n: "1", title: "Find winners", lines: ["posts that beat", "your median"] },
    { x: 180, n: "2", title: "Study rivals", lines: ["competitors'", "breakout posts"] },
    { x: 330, n: "3", title: "Rank hooks", lines: ["openings scored", "by performance"] },
    { x: 480, n: "4", title: "Create", lines: ["designed in your", "brand kit"] },
    { x: 630, n: "5", title: "Schedule", lines: ["auto-posts in your", "best time slot"] },
  ]
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 262" role="img" aria-labelledby="ig-loop-title" className="h-auto w-full rounded-2xl border border-social/15 bg-social-soft">
        <title id="ig-loop-title">
          The Instagram automation loop: an AI agent finds your posts that beat your median, studies competitors&apos; breakout
          posts, ranks your hooks by performance, creates new posts in your brand kit and schedules them to auto-post in your
          best time slot. Every new post feeds the next round of analysis.
        </title>
        <defs>
          <marker id="ig-loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
          <marker id="ig-loop-arrow-pink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#d6246e" />
          </marker>
        </defs>
        <text x="390" y="34" textAnchor="middle" fontSize="12" fontWeight="600" letterSpacing="1.5" fill="#717171">
          WHAT THE AGENT DOES EVERY WEEK
        </text>
        {steps.map((step, i) => (
          <g key={step.title}>
            <rect x={step.x} y="56" width="120" height="104" rx="14" fill="white" stroke={i === 4 ? "#d6246e" : "#141414"} strokeWidth="1.5" />
            <circle cx={step.x + 60} cy="80" r="12" fill="#d6246e" />
            <text x={step.x + 60} y="84.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">{step.n}</text>
            <text x={step.x + 60} y="114" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="#141414">{step.title}</text>
            {step.lines.map((line, j) => (
              <text key={line} x={step.x + 60} y={132 + j * 14} textAnchor="middle" fontSize="10.5" fill="#717171">{line}</text>
            ))}
            {i < steps.length - 1 && (
              <path d={`M${step.x + 122},108 L${step.x + 146},108`} stroke="#141414" strokeWidth="2.5" markerEnd="url(#ig-loop-arrow)" />
            )}
          </g>
        ))}
        <path d="M690,163 C690,226 90,226 90,166" fill="none" stroke="#d6246e" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#ig-loop-arrow-pink)" />
        <text x="390" y="250" textAnchor="middle" fontSize="11.5" fill="#141414">every post you publish becomes data for the next round</text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        Five jobs, one loop. The first three decide what to post; the last two make it and post it. The more you post, the
        sharper the next round gets.
      </figcaption>
    </figure>
  )
}

/** The five slides of a carousel the agent designed, side by side. */
function CarouselStrip() {
  const slides = [
    "Cover slide: 3 branding mistakes killing your reach",
    "Slide 2: a logo with no system",
    "Slide 3: copying your competitors",
    "Slide 4: changing things every month, with three fixes",
    "Slide 5: call to action, want your brand audited?",
  ]
  return (
    <figure className="my-8">
      <div className="rounded-3xl border border-social/15 bg-social-soft p-3 sm:p-4">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
          {slides.map((alt, i) => (
            <Image
              key={alt}
              src={`${IMG}/ai-designed-instagram-carousel-slide-${i + 1}.webp`}
              alt={alt}
              width={480}
              height={600}
              sizes="(min-width: 768px) 150px, 20vw"
              className="h-auto w-full rounded-md shadow-sm sm:rounded-xl"
            />
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        A finished carousel from the sample account: the hook came from its best hook style, the format from its best format,
        and the colours from its brand kit. Nobody opened a design tool.
      </figcaption>
    </figure>
  )
}

function Step({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-social-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-social">
      Step {n}
    </span>
  )
}

export default function AutomateInstagramWithAiPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="space-y-6 text-neutral-600 leading-relaxed">
        <p className="text-lg text-ink">
          <strong>
            To fully automate your Instagram with AI, connect your account to an AI agent and let it run a weekly loop: find
            the posts that beat your own median, study the breakout posts of competitors in your niche, rank your hooks by
            performance, then design new posts in your brand kit and schedule them to auto-post in your best time slots. You
            stay in charge of what goes out; the agent does the rest.
          </strong>
        </p>
        <p>
          Most people who try to automate Instagram start at the wrong end. They buy a scheduler, then still spend Sunday
          night staring at a blank caption wondering what to post. Scheduling was never the hard part. The hard part is
          knowing <em>what</em> to post, and that answer is already sitting in your data and in your competitors&apos; best
          posts. So this guide starts there and ends with posts going out on their own. I&apos;ll show you how I do it with
          the Talk to me Data social media agent, and the do-it-yourself version with Claude if you&apos;d rather build it.
        </p>

        <div className="my-8 rounded-2xl border border-social/15 bg-social-soft p-6">
          <h2 className="mb-3 text-xl font-semibold tracking-[-0.02em] text-ink">TL;DR</h2>
          <ul className="list-disc space-y-2 pl-6 text-ink marker:text-social">
            <li>Automate the <strong>thinking</strong> first (what to post), then the <strong>doing</strong> (design and scheduling)</li>
            <li>Find your best posts by comparing each one with <strong>your own median</strong>, not by raw views</li>
            <li>Track a few competitors and only study their <strong>breakout posts</strong>: 2× their usual views or more</li>
            <li>Rank your hooks by style and reuse your strongest one as a formula</li>
            <li>Set your brand kit once, then let the agent design carousels and write Reel scripts</li>
            <li>Schedule posts to auto-publish to Instagram, or turn on autopilot for a new post every few days</li>
          </ul>
        </div>

        <h2 id="can-you-fully-automate-instagram-with-ai" className={H2}>Can You Fully Automate Instagram With AI?</h2>
        <p>
          Yes, almost all of it. An AI agent can analyze your posts, research competitors, pick topics and hooks, design
          carousels and images, write captions and Reel scripts, and publish to Instagram through its official API. The two
          things worth keeping human are filming Reels (unless you also automate editing) and replying to your community.
        </p>
        <p>The whole thing is one loop that runs every week:</p>

        <InstagramAutomationLoop />

        <p>
          Before we go step by step, here is my full tutorial on YouTube. It covers the same loop, plus how I use Claude to
          write scripts and build carousels, animated posts and short videos:
        </p>
        <YouTubeEmbed
          youtubeId={CLAUDE_SOCIAL_TUTORIAL_VIDEO.youtubeId}
          title={CLAUDE_SOCIAL_TUTORIAL_VIDEO.title}
          thumbnail={CLAUDE_SOCIAL_TUTORIAL_VIDEO.thumbnail}
          className="my-6"
        />
        <p className="text-sm">
          <strong className="text-ink">In the video (14 minutes):</strong> finding topics your audience asks for, picking the
          right topic with the social media agent, writing the script, then using Claude with HyperFrames to build carousels,
          animated posts and a short-form video edited end to end.
        </p>

        <div className="pt-6">
          <Step n={1} />
          <h2 id="connect-your-instagram-to-an-ai-agent" className={H2_STEP}>Connect Your Instagram to an AI Agent</h2>
        </div>
        <p>
          The first step is getting every post&apos;s numbers in one place without pulling them by hand. In the{" "}
          <Link href="/agents/social-media" className={LINK}>social media agent</Link>, you sign up, paste your public
          Instagram profile link, and the agent reads your posts. Your first analysis is ready in a few minutes.
        </p>
        <p>
          You don&apos;t share a password. Analysis only needs the public link. Later, if you want the agent to post for
          you, you connect through Instagram&apos;s own sign-in. Posting needs an Instagram <strong>Business or Creator
          account</strong> (switching is free in Instagram&apos;s settings).
        </p>

        <Figure
          src={`${IMG}/instagram-ai-agent-dashboard.webp`}
          alt="The social media agent dashboard for the sample account Studio Nova: followers, posts, views and interactions, with Overview, Content, Competitors, Audience, Hooks and Create tabs"
          width={1800}
          height={1215}
          caption="One dashboard, and the tabs along the middle are the steps of this guide. Every screenshot here is from a sample account, Studio Nova."
        />

        <div className="pt-6">
          <Step n={2} />
          <h2 id="how-do-you-find-your-best-performing-instagram-posts" className={H2_STEP}>How Do You Find Your Best Performing Instagram Posts?</h2>
        </div>
        <p>
          You find your best posts by comparing each one with <strong>your own median</strong>, not by looking at the biggest
          numbers. A Reel with 10K views is a hit on an account that usually gets 2K and a flop on one that usually gets
          50K. The agent measures every post against your usual results and flags the <strong>breakouts</strong>: posts
          that did 2× your median or more. Those are the posts your audience is telling you to make again.
        </p>
        <p>
          The Overview tab leads with the verdict in plain English: what to keep doing, what to fix and what to try this
          week. Each one has a <strong>Build it</strong> button, which matters later, because it turns an insight straight
          into a post.
        </p>

        <Figure
          src={`${IMG}/best-instagram-posts-keep-fix-try.webp`}
          alt="The agent's verdict: carousels earn 2.4 times the median, with cards for keep doing, fix and try this week, each with a Build it button"
          width={1600}
          height={570}
          caption="The headline insight for the sample account: carousels earn 2.4× its median. That one line decides the format of its next posts."
        />

        <p>Under the verdict, these are the four charts worth checking each week:</p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-social-soft text-ink">
              <tr>
                <th className="p-4 font-semibold">Chart</th>
                <th className="p-4 font-semibold">The question it answers</th>
                <th className="p-4 font-semibold">What the agent does with it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Breakouts</td><td className="p-4">Which posts beat my median, and by how much?</td><td className="p-4">Uses them as the model for new posts</td></tr>
              <tr><td className="p-4 font-medium text-ink">What each format earns</td><td className="p-4">Should I post more Reels, carousels or images?</td><td className="p-4">Shifts the plan toward the format that earns most</td></tr>
              <tr><td className="p-4 font-medium text-ink">When you post</td><td className="p-4">Which days and times get the most interactions?</td><td className="p-4">Schedules new posts into those slots</td></tr>
              <tr><td className="p-4 font-medium text-ink">Posting rhythm</td><td className="p-4">How consistent am I, and where are the gaps?</td><td className="p-4">Sets a pace you can keep</td></tr>
            </tbody>
          </table>
        </div>

        <Figure
          src={`${IMG}/instagram-breakouts-formats-best-times.webp`}
          alt="Four charts: posting rhythm calendar, breakout posts plotted against the median, a heatmap of the best days and times to post, and average interactions by format"
          width={1600}
          height={1275}
          caption="Rhythm, breakouts, timing and formats on one screen. These four answers feed every post the agent plans later."
        />

        <p>
          One habit I&apos;d keep even with everything automated: open your top three breakouts on Instagram and watch them
          again. The numbers tell you <em>which</em> post won. Seeing it again tells you <em>why</em>.
        </p>

        <SignupCta eyebrow="Try it on your Instagram" heading="Find your best posts in minutes" accent="social">
          Sign up free, paste your Instagram link, and the agent shows you your breakouts, your best format and your best
          time to post, from your own data.
        </SignupCta>

        <div className="pt-6">
          <Step n={3} />
          <h2 id="how-do-you-research-competitors-on-instagram" className={H2_STEP}>How Do You Research Competitors on Instagram and Find Their Breakout Posts?</h2>
        </div>
        <p>
          You research competitors by tracking a handful of accounts in your niche and only studying their{" "}
          <strong>breakout posts</strong>, the ones that did at least twice that account&apos;s usual views. Scrolling their
          whole grid wastes time, because most of their posts are average too. A breakout is different: it shows a topic or
          format the audience in your niche already wants, with proof.
        </p>
        <p>
          The agent reads your bio and captions to understand your niche, then suggests accounts to track, labeled{" "}
          <strong>peer</strong> (a similar size to you) or <strong>aspirational</strong> (bigger accounts in your niche). I
          track a mix: peers show what works at my size, aspirational accounts show where the niche is heading. You can also
          paste any account&apos;s link to add it.
        </p>

        <Figure
          src={`${IMG}/instagram-competitors-to-track.webp`}
          alt="Suggested competitors: a peer account and an aspirational account in the same niche, each with three recent posts, a Track button and a Not relevant option"
          width={1600}
          height={834}
          caption="Suggested accounts, labeled peer or aspirational, with a preview of their recent posts. Track the useful ones, dismiss the rest."
        />

        <p>Once you track a few, the Competitors tab collects every breakout in your niche from the last 90 days:</p>

        <Figure
          src={`${IMG}/instagram-competitor-breakout-posts.webp`}
          alt="Breakout posts in your niche: competitor carousels and Reels that did between 2 and 5.3 times their account's median views, with views, likes, comments and engagement rate"
          width={1600}
          height={1333}
          caption="Each card shows how far the post beat that account's own usual, so a small account's breakout counts as much as a big one's."
        />

        <p>
          The rule I follow: <strong>borrow the pattern, never the post.</strong> If a competitor&apos;s carousel broke out
          because it taught one lesson per slide, or a Reel broke out because it showed the result in the first second,
          that structure is yours to use on your own topic. The <strong>What to borrow</strong> cards do this translation
          for you, and <strong>Script this for me</strong> writes your version.
        </p>

        <Figure
          src={`${IMG}/instagram-you-vs-competitors-what-to-borrow.webp`}
          alt="You versus competitors table comparing followers, average views, engagement, posts per week and top format, followed by What to borrow cards with a Script this for me button"
          width={1600}
          height={1474}
          caption="You vs them shows where you stand; What to borrow turns their breakouts into plays you can run this week."
        />

        <div className="pt-6">
          <Step n={4} />
          <h2 id="how-do-you-find-your-best-instagram-hooks" className={H2_STEP}>How Do You Find Your Best Instagram Hooks?</h2>
        </div>
        <p>
          You find your best hooks by grouping the openings of your past posts into styles and scoring each style against
          your median. On Instagram the first line of a carousel or the first second of a Reel decides whether anyone sees
          the rest, so this is the single most reusable thing in your data.
        </p>
        <p>
          The Hooks tab reads how your latest posts open, sorts them (result first, question, list, curiosity gap, bold
          claim, how-to, POV) and shows how each style performed. Your strongest style becomes a fill-in-the-blank formula,
          and <strong>Write 5 hooks like this</strong> gives you five new ones on your topics.
        </p>

        <Figure
          src={`${IMG}/best-instagram-hooks-by-performance.webp`}
          alt="The Hooks tab: the strongest opening style, result first at 2.1 times the median, as a fill-in-the-blank formula with a Write 5 hooks like this button, and every hook style scored against the median"
          width={1600}
          height={1090}
          caption="In the sample account, result-first hooks earn 2.1× the median. That becomes the formula for every new post's opening line."
        />

        <p>
          Read the notes on which openings to stop using, too; that&apos;s just as useful. And with only a few posts per
          style, treat the scores as early signals. They get more reliable every week the loop runs.
        </p>

        <div className="pt-6">
          <Step n={5} />
          <h2 id="how-do-you-create-instagram-posts-with-ai" className={H2_STEP}>How Do You Create Instagram Posts With AI?</h2>
        </div>
        <p>
          You create posts with AI by giving the agent the three things it learned above (your best format, your best hook
          style and the patterns behind breakouts) plus a brand kit, and letting it build a complete post kit. Do the brand
          kit once: logo, colours, font, layout and the handle in your footer. Every image and carousel the agent designs
          uses it, so posts look like you made them.
        </p>

        <Figure
          src={`${IMG}/instagram-brand-kit.webp`}
          alt="The brand kit: logo upload, colour presets and custom colours, font and layout choices, a footer handle and a live preview of a carousel cover"
          width={1600}
          height={651}
          caption="Set it once. The live preview on the right shows how every carousel cover will look."
        />

        <p>
          Then go to the Create tab. Either type what you want (&quot;a carousel on the three mistakes I see in every brand
          audit&quot;) or click <strong>Build it</strong> on any insight from steps 2 to 4. The agent writes the hook options,
          the slides or Reel script, and the caption, and puts the post into your plan with a <strong>Why this</strong> line
          that ties it back to your numbers.
        </p>

        <Figure
          src={`${IMG}/instagram-content-plan-auto-post.webp`}
          alt="The content plan: a five-slide carousel scheduled for Tuesday 6 October at 9am, set to auto-post, with the reason it was chosen and three hooks to pick from"
          width={1600}
          height={898}
          caption="Every planned post explains itself. Here: carousels earn 2.4× the median, list hooks beat it by 1.2×, and Tuesday 9:00 is the strongest slot."
        />

        <CarouselStrip />

        <p>
          For Reels, the agent gives you the hook, a script and a caption to film from. If you want the editing automated as
          well, I edit short videos with Claude and HyperFrames; the tutorial above shows how, and I wrote up the setup in{" "}
          <a href="https://www.sellingwithnas.com/how-to-build-free-ai-videos-with-claude-hyperframes" target="_blank" rel="noopener" className={LINK}>
            how to build free AI videos with Claude and HyperFrames
          </a>
          .
        </p>

        <div className="pt-6">
          <Step n={6} />
          <h2 id="how-do-you-schedule-posts-directly-to-instagram" className={H2_STEP}>How Do You Schedule Posts Directly to Instagram With AI?</h2>
        </div>
        <p>
          You schedule posts directly to Instagram by connecting your account through Instagram&apos;s sign-in and setting
          each post to <strong>auto-post</strong>. The agent puts every post in your best time slot and publishes it at that
          time. If you&apos;d rather post it yourself, switch it to an email reminder and you get the finished post in your
          inbox when it&apos;s due.
        </p>

        <Figure
          src={`${IMG}/instagram-carousel-scheduled-auto-post.webp`}
          alt="The design studio: a five-slide carousel with editable slide text, portrait and square options, and a scheduled auto-post to Instagram"
          width={1500}
          height={1513}
          className="mx-auto max-w-lg"
          caption="Edit any slide before it goes out, then leave it on auto-post. This is the last moment you need to touch it."
        />

        <p>
          The final switch is <strong>autopilot</strong>. Turn it on in the Create tab and the agent builds a new post on its
          own every 7, 4, 3 or 2 days, based on what does well for you, and drops it into your plan at your best time. That
          is the point where the loop runs without you starting it. Here is how the work splits once it&apos;s on:
        </p>

        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-social-soft text-ink">
              <tr>
                <th className="p-4 font-semibold">Job</th>
                <th className="p-4 font-semibold">Who does it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Analyze posts and find breakouts</td><td className="p-4">Agent, refreshed every week</td></tr>
              <tr><td className="p-4 font-medium text-ink">Track competitors and their breakouts</td><td className="p-4">Agent</td></tr>
              <tr><td className="p-4 font-medium text-ink">Rank hooks and write new ones</td><td className="p-4">Agent</td></tr>
              <tr><td className="p-4 font-medium text-ink">Design carousels and images</td><td className="p-4">Agent, in your brand kit</td></tr>
              <tr><td className="p-4 font-medium text-ink">Write Reel scripts and captions</td><td className="p-4">Agent</td></tr>
              <tr><td className="p-4 font-medium text-ink">Film Reels</td><td className="p-4">You (or Claude with HyperFrames for the edit)</td></tr>
              <tr><td className="p-4 font-medium text-ink">Approve and publish</td><td className="p-4">Your choice, post by post: auto-post or reminder</td></tr>
              <tr><td className="p-4 font-medium text-ink">Reply to comments and DMs</td><td className="p-4">You. Keep this human.</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          On plans: the free Starter plan covers everything up to building posts when you ask. Autopilot and posting to
          Instagram for you start on the paid plans.
        </p>

        <h2 id="how-do-you-automate-instagram-with-claude-without-a-tool" className={H2}>How Do You Automate Instagram With Claude, Without a Tool?</h2>
        <p>
          You can run the same loop by hand with Claude: export your post data, paste it into Claude with a structured
          prompt, and schedule the results in Meta Business Suite, which has a free planner for Instagram. It takes about an
          hour a week instead of zero, but it costs nothing beyond your Claude plan.
        </p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Export your recent posts as a CSV from the Insights section of Meta Business Suite.</li>
          <li>Pick three competitor posts that clearly beat that account&apos;s usual views.</li>
          <li>Paste both into Claude with the prompt below.</li>
          <li>Design the posts (Claude can build carousel slides too) and schedule them in Meta Business Suite.</li>
        </ol>

        <PromptBlock prompt={DIY_PROMPT} label="Weekly Instagram prompt for Claude" leadSource="prompt_automate_instagram_weekly" />

        <p>
          The catch is the parts Claude can&apos;t do alone: it can&apos;t log into Instagram, it doesn&apos;t watch your
          competitors between sessions, and it can&apos;t publish. That&apos;s exactly the gap an agent fills. If you want
          to build your own, start with{" "}
          <Link href="/blog/how-to-build-social-media-ai-agent" className={LINK}>how to build a social media AI agent</Link>.
        </p>

        <h2 id="what-are-the-most-common-instagram-automation-mistakes" className={H2}>What Are the Most Common Instagram Automation Mistakes?</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-social">
          <li><strong className="text-ink">Automating the schedule before the strategy.</strong> A scheduler full of guesses just posts guesses on time.</li>
          <li><strong className="text-ink">Judging posts by raw views.</strong> Compare with your own median, or you&apos;ll chase the wrong winners.</li>
          <li><strong className="text-ink">Copying competitors&apos; posts.</strong> Borrow the structure behind a breakout, then apply it to what you know.</li>
          <li><strong className="text-ink">Automating engagement.</strong> Bots that like, follow or comment for you break Instagram&apos;s rules and put the account at risk.</li>
          <li><strong className="text-ink">Posting too often too soon.</strong> Start at a pace you can review, then speed up. Consistency beats volume.</li>
        </ul>

        <h2 id="summary" className={H2}>Summary</h2>
        <p>
          Fully automating Instagram with AI comes down to automating the decisions before the posting. Let an agent find
          the posts that beat your median, the breakout posts in your niche and the hooks that work best for you. Then let
          it design posts in your brand kit, put them in your best time slots and publish them, or turn on autopilot so the
          loop runs on its own.
        </p>
        <p>
          For the bigger picture across every platform, read{" "}
          <Link href="/blog/how-to-automate-social-media-posting-with-ai-agent" className={LINK}>how to automate social media posting with an AI agent</Link>,
          or see how I turn the same data into carousels and edited videos in{" "}
          <Link href="/blog/how-to-grow-on-social-media-with-claude-and-ai-agent" className={LINK}>how to grow on social media with Claude and an AI agent</Link>.
        </p>

        <SignupCta heading="Put your Instagram on autopilot" accent="social">
          Sign up free and paste your Instagram link. In a few minutes you&apos;ll see your best posts, your competitors&apos;
          breakouts and your strongest hooks, and the agent can start building your next posts.
        </SignupCta>
      </div>
    </BlogPostShell>
  )
}
