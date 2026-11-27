import Link from "next/link"
import type { Faq } from "@/lib/blog"
import { comparePath, getVisibleComparisons } from "@/lib/compare"

/**
 * The Social Media Automation hub (/blog/category/social-media-automation).
 *
 * DRAFT until `reviewed: true`. While it's false, the long guide, FAQ and
 * comparison links below only show in `next dev`; production keeps the old,
 * short category page. Nas: read it, rewrite whatever doesn't sound like you,
 * fill in the HUMAN slots, then flip `reviewed`.
 *
 * Keyword: this hub targets the broad search "social media automation". The
 * how-to "how to automate social media with AI" belongs to the blog post
 * how-to-automate-social-media-posting-with-ai-agent, and "AI social media
 * agent" belongs to the homepage. Keep them apart.
 */

const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-14 mb-4"
const H3 = "text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3"
const LINK = "text-ink underline decoration-social/40 underline-offset-4 hover:decoration-social"

export const SOCIAL_HUB = {
  reviewed: true,
  heading: "Social Media Automation: A Practical Guide for Small Businesses",
  description:
    "What social media automation is, what to automate and what to keep human, schedulers vs AI agents, real costs, and step-by-step guides to doing it.",
  intro: [
    "Social media automation means letting software do the repetitive parts of running your accounts: working out what performs, planning what to post, creating the posts, publishing them on time and checking how they did. Done well, you spend your time on the parts only you can do, like talking to your customers.",
    "This guide covers what you can automate, what you shouldn't, the difference between a scheduler and an AI agent, what it costs, and how to set it up step by step. Every guide linked below goes deeper on one part.",
  ],

  /** HUMAN: Nas, first person, 2 to 4 sentences. Why you automate your own social media, or what changed when you did. */
  nasTake: "",
  /** HUMAN: how you actually run @talktomedata (what's automated, what you still do by hand). Real setup only. */
  ourSetup: "",

  faqs: [
    {
      question: "What is social media automation?",
      answer:
        "Social media automation is using software to handle repetitive social media work: scheduling and publishing posts, and increasingly creating them too. A scheduler publishes posts you make at set times. An AI agent can also study what performs on your account, write and design new posts, and post them on a schedule or on autopilot.",
    },
    {
      question: "Is social media automation worth it for a small business?",
      answer:
        "Usually, yes, because consistency is the hardest part of social media for a small team and automation is what keeps you posting in busy weeks. Start by automating scheduling and the first drafts of posts, keep reviewing what goes out, and keep replies to customers personal.",
    },
    {
      question: "Can I automate posting to Instagram, TikTok and Facebook?",
      answer:
        "Yes. All three let approved tools publish posts for you through their official connections, so you never share your password. Schedulers such as Buffer and Later post content you've made; an AI social media agent like Talk to me Data can create the posts as well and publish them on schedule.",
    },
    {
      question: "Will automated posts hurt my reach?",
      answer:
        "Scheduling isn't what hurts reach; what's in the post is. Reach drops when posts are generic, repetitive or off-brand, so build posts from what already works for your audience, publish through each platform's official connection, and review them before they go out.",
    },
    {
      question: "What should I never automate on social media?",
      answer:
        "Don't automate real conversations: replies to complaints, sensitive direct messages and anything where a customer expects a person. Also avoid fake engagement such as automated likes, follows or comments, which breaks platform rules and can get an account restricted.",
    },
    {
      question: "How much does social media automation cost?",
      answer:
        "Scheduling tools start low: Buffer from $5 per channel a month billed yearly, Later from $18.75 a month billed yearly, Hootsuite from $99 per user a month billed yearly (prices from their sites, November 2026). AI agents that also create the posts cost more than a basic scheduler; Talk to me Data is free to start and $49 a month for autopilot and posting.",
    },
  ] satisfies Faq[],
}

/** The long-form guide, rendered between the hub intro and the list of guides. */
export function SocialHubGuide() {
  // Only link comparisons that exist here: drafts 404 in production.
  const comparisons = getVisibleComparisons()
  return (
    <div className="space-y-6 leading-relaxed text-neutral-600">
      <h2 id="what-is-social-media-automation" className={H2}>What Is Social Media Automation?</h2>
      <p>
        <strong className="text-ink">
          Social media automation is using software to do the repeatable parts of social media for you, from publishing
          posts at the right time to creating the posts themselves.
        </strong>{" "}
        For years it meant one thing: scheduling. You made a week of posts, loaded them into a tool, and it published them.
        AI has moved the line. Today an agent can also look at which of your posts did best, work out why, and make new
        ones in the same style.
      </p>
      <p>
        That matters because the slow part of social media was never pressing publish. It is deciding what to post and then
        making it, every few days, without running out of ideas.
      </p>

      <h2 id="what-can-you-automate" className={H2}>Which Parts of Social Media Can You Automate?</h2>
      <p>
        Most of the loop can be automated, but not all of it should run without you. This is how we split it:
      </p>
      <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
        <table className="w-full text-left text-sm">
          <thead className="bg-social-soft text-ink">
            <tr>
              <th className="p-4 font-semibold">Task</th>
              <th className="p-4 font-semibold">What automation can do</th>
              <th className="p-4 font-semibold">Keep a human on it?</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            <tr><td className="p-4 font-medium text-ink">Finding what works</td><td className="p-4">Rank your posts by views and engagement and spot the hooks, formats and topics behind the winners</td><td className="p-4">Glance at it weekly</td></tr>
            <tr><td className="p-4 font-medium text-ink">Watching competitors</td><td className="p-4">Track accounts like yours and flag posts that do far better than usual</td><td className="p-4">Decide which ideas fit you</td></tr>
            <tr><td className="p-4 font-medium text-ink">Planning</td><td className="p-4">Turn those patterns into a plan for the week and pick your best time slots</td><td className="p-4">Approve the plan</td></tr>
            <tr><td className="p-4 font-medium text-ink">Creating posts</td><td className="p-4">Write hooks, captions and reel scripts, and design carousels and images in your brand</td><td className="p-4">Review before it goes out, at least at first</td></tr>
            <tr><td className="p-4 font-medium text-ink">Publishing</td><td className="p-4">Post at the scheduled time on each platform</td><td className="p-4">No, once you trust it</td></tr>
            <tr><td className="p-4 font-medium text-ink">Replying to people</td><td className="p-4">Draft replies to common questions</td><td className="p-4">Yes, always</td></tr>
            <tr><td className="p-4 font-medium text-ink">Filming yourself</td><td className="p-4">Write the script and the shot list</td><td className="p-4">Yes, it&apos;s your face and voice</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Our guide to <Link href="/blog/how-to-automate-instagram-with-ai" className={LINK}>automating Instagram with AI</Link>{" "}
        walks through this whole loop on one platform, step by step.
      </p>

      <h2 id="scheduler-vs-ai-agent" className={H2}>What Is the Difference Between a Scheduler and an AI Agent?</h2>
      <p>
        A scheduler publishes posts you have already made. An AI agent decides what to post, makes it and then publishes
        it. Both save you time; they save it in different places.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong className="text-ink">Schedulers</strong> such as Buffer, Later and Hootsuite give you a calendar, a queue
          and analytics, and most now include an AI writing assistant for captions. They are a good fit if you enjoy making
          content and only need it out on time, and they support a long list of platforms.
        </li>
        <li>
          <strong className="text-ink">AI social media agents</strong> start from your results. Our{" "}
          <Link href="/" className={LINK}>AI social media agent</Link> reads every post on your account, creates new posts
          in your brand kit, schedules them for your best times and can run on autopilot, building a new post every few
          days.
        </li>
      </ul>
      {comparisons.length > 0 && (
        <p>
          If you&apos;re choosing between them, our honest comparisons with{" "}
          {comparisons.map((c, i) => (
            <span key={c.slug}>
              {i > 0 && (i === comparisons.length - 1 ? " and " : ", ")}
              <Link href={comparePath(c.slug)} className={LINK}>{c.competitor}</Link>
            </span>
          ))}{" "}
          go through features, platforms and real prices, including where each of them is the better pick.
        </p>
      )}

      <h2 id="how-to-automate-social-media" className={H2}>How Do You Automate Social Media, Step by Step?</h2>
      <p>Whatever tool you use, the order is the same. Get the first steps right and the rest gets easier.</p>

      <h3 className={H3}>1. Find out what already works for you</h3>
      <p>
        Pull your last 30 to 60 posts and rank them by views and engagement. Look for the patterns in the top ten: the
        first line, the format (reel, carousel, single image), the length and the topic. Our free{" "}
        <Link href="/free-tools/social-media-analyzer" className={LINK}>social media page analyzer</Link> does this for an
        Instagram account in a minute, and our guide to{" "}
        <Link href="/blog/how-to-grow-on-social-media-with-claude-and-ai-agent" className={LINK}>growing on social media with Claude and an AI agent</Link>{" "}
        shows how to do it yourself.
      </p>

      <h3 className={H3}>2. Watch the competitors who are winning</h3>
      <p>
        Pick a handful of accounts in your niche and note their breakout posts, the ones that do several times better than
        their usual. Those show you what your audience wants right now. Our guide on{" "}
        <Link href="/blog/how-to-spy-on-competitors-instagram" className={LINK}>how to track your competitors on Instagram</Link>{" "}
        covers it in 7 steps.
      </p>

      <h3 className={H3}>3. Set your brand once</h3>
      <p>
        Save your logo, colours, fonts and a few rules about your tone. Every automated post should look and sound like you
        without you checking the basics each time.
      </p>

      <h3 className={H3}>4. Create a week of posts, then review them</h3>
      <p>
        Turn your winning patterns into new posts. With an agent this is a request (&quot;make 3 posts for next week from my
        best hooks&quot;); with a scheduler it&apos;s your own work plus an AI writing assistant. Read every post before it goes
        out for the first few weeks. Our guide to{" "}
        <Link href="/blog/how-to-automate-social-media-posting-with-ai-agent" className={LINK}>automating social media posting with an AI agent</Link>{" "}
        shows this step in detail, and if you want to build your own agent, follow{" "}
        <Link href="/blog/how-to-build-social-media-ai-agent" className={LINK}>how to build a social media AI agent</Link>.
      </p>

      <h3 className={H3}>5. Schedule it, then switch on autopilot when you trust it</h3>
      <p>
        Connect your accounts through each platform&apos;s official sign-in and schedule the week. Once the posts you review
        need few changes, let the tool post on its own. Start slower than you think: a post every 3 or 4 days you can keep up
        beats a daily plan you abandon in a month.
      </p>

      <h2 id="what-not-to-automate" className={H2}>What Should You Never Automate?</h2>
      <p>
        <strong className="text-ink">Never automate real conversations or fake engagement.</strong> Automation is for the
        work behind your posts, not for pretending to be present.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li><strong className="text-ink">Replies to complaints and sensitive messages.</strong> A drafted reply is fine; sending it without reading it isn&apos;t.</li>
        <li><strong className="text-ink">Automated likes, follows and comments.</strong> They break the platforms&apos; rules and can get your account restricted.</li>
        <li><strong className="text-ink">Reacting to the news.</strong> A scheduled post that lands at the wrong moment can do real damage. Pause your queue when something big happens.</li>
        <li><strong className="text-ink">Your face and voice.</strong> An agent can write the script; the people who follow you want to see you.</li>
      </ul>

      <h2 id="keep-it-human" className={H2}>How Do You Keep Automated Posts Sounding Like You?</h2>
      <p>
        Build posts from your own best content, not from generic templates, and keep a human edit in the loop. The posts that
        feel automated are the ones written from nothing: vague hooks, stock phrases, the same structure every time.
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Feed the tool your real top posts and your own words, so it copies your style rather than the internet&apos;s.</li>
        <li>Add one specific detail to every post: a number, a customer moment, something that happened this week.</li>
        <li>Mix formats. Let the agent handle carousels and images, and film the talking videos yourself.</li>
        <li>Reply to comments yourself. That is where followers decide whether there&apos;s a person behind the account.</li>
      </ul>

      <h2 id="cost" className={H2}>How Much Does Social Media Automation Cost?</h2>
      <p>
        It depends on whether you only want scheduling or want the posts made too. These are the entry prices on each
        company&apos;s own site in November 2026:
      </p>
      <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
        <table className="w-full text-left text-sm">
          <thead className="bg-social-soft text-ink">
            <tr>
              <th className="p-4 font-semibold">Tool</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Free plan</th>
              <th className="p-4 font-semibold">Entry paid plan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            <tr><td className="p-4 font-medium text-ink">Buffer</td><td className="p-4">Scheduler</td><td className="p-4">Yes, 3 channels</td><td className="p-4">$5 per channel a month, billed yearly</td></tr>
            <tr><td className="p-4 font-medium text-ink">Later</td><td className="p-4">Scheduler and planner</td><td className="p-4">No, 14-day trial</td><td className="p-4">$18.75 a month billed yearly ($25 monthly)</td></tr>
            <tr><td className="p-4 font-medium text-ink">Hootsuite</td><td className="p-4">Platform for teams</td><td className="p-4">No, 14-day trial</td><td className="p-4">$99 per user a month billed yearly ($149 monthly)</td></tr>
            <tr><td className="p-4 font-medium text-ink">Talk to me Data</td><td className="p-4">AI social media agent</td><td className="p-4">Yes, 50 actions a month</td><td className="p-4">$49 a month, about 40 finished posts, autopilot and posting</td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        Sources: <a href="https://buffer.com/pricing" className={LINK} target="_blank" rel="noopener nofollow">Buffer</a>,{" "}
        <a href="https://later.com/pricing" className={LINK} target="_blank" rel="noopener nofollow">Later</a>,{" "}
        <a href="https://www.hootsuite.com/plans" className={LINK} target="_blank" rel="noopener nofollow">Hootsuite</a> and
        our <Link href="/pricing" className={LINK}>pricing page</Link>, checked 27 November 2026. Prices exclude tax.
      </p>
      <p>
        A scheduler is the cheapest way to publish on time. An agent costs more than a basic scheduler because it also does
        the creating, which is usually the part that takes the hours.
      </p>
    </div>
  )
}
