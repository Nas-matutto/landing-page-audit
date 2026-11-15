import Link from "next/link"
import { Figure } from "@/components/blog/figure"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"

const SLUG = "how-to-spy-on-competitors-instagram"
const IMG = `/blog/${SLUG}`
/** Sample-account captures shared with the Instagram automation guide. */
const IG_IMG = "/blog/how-to-automate-instagram-with-ai"

export const metadata = buildPostMetadata(SLUG)

const LINK = "text-ink underline decoration-social/40 underline-offset-4 hover:decoration-social"
const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4"
const H2_STEP = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-3"

const faqs: Faq[] = [
  {
    question: "Is it legal to spy on competitors' Instagram accounts?",
    answer:
      "Yes, studying public posts is normal market research. Anyone can see a public account's posts, view counts, likes and comments. Stay on the right side of the line: only look at public accounts, never use fake accounts to get into private ones, and never repost a competitor's content as your own. Borrow the pattern behind a post, not the post itself.",
  },
  {
    question: "Can competitors see that I'm tracking their Instagram?",
    answer:
      "No. Tracking reads public posts, so it doesn't follow the account, like anything or send a notification. The only way a competitor would know is if you interact with their posts yourself.",
  },
  {
    question: "How many competitors should I track on Instagram?",
    answer:
      "Between 5 and 10. Fewer than 5 and you can't tell a trend from a lucky post; more than 10 and it becomes noise. The Talk to me Data social media agent tracks up to 10 accounts at any given time, and you can swap one out whenever it stops being useful. Mix peers (accounts your size) with aspirational accounts (bigger ones in your niche).",
  },
  {
    question: "Can I see a competitor's Instagram insights, like reach and saves?",
    answer:
      "No. Reach, saves, shares and profile visits are private to the account owner. What you can see is public: followers, Reel views, likes (unless hidden), comments and how often they post. That is enough to work out average views, engagement rate and which posts broke out, which is what matters.",
  },
  {
    question: "Won't copying competitors make my content generic?",
    answer:
      "Only if you copy the post. Copy the pattern instead: the hook style, the structure and the format that made it work, then fill it with your own story, examples and opinion. That's why the agent rewrites a competitor's winning post using your own hook data and audience, so the result sounds like you.",
  },
  {
    question: "How much does it cost to track competitors on Instagram?",
    answer:
      "You can do it by hand for free with a spreadsheet and Claude (the prompt is in this guide). The social media agent has a free Starter plan with 50 actions a month; finding competitors in your niche costs 10 to 15 actions and a weekly analysis of an account about 6.",
  },
]

const DIY_PROMPT = `You are my Instagram competitor analyst. My account: @[your handle], niche: [your niche].
My audience: [who they are and what they want].
My best hook style so far: [e.g. result first, question, list]. My usual views per Reel: [number].

Below is a table of my competitors' last [20] posts per account:
account, date, format, views, likes, comments, first line of caption, transcript.

1. For each account, work out its median views. Flag every post with 2x that median or more
   as a "breakout" and rank all breakouts by how far they beat their own account's median.
2. Look across accounts. If the same topic, hook style or format broke out for 2 or more
   accounts in the last 30 days, list it as a trend and name the accounts.
3. For the top 3 breakouts, break the transcript into: hook (first line or first 3 seconds),
   promise, structure (how the middle is built), proof, and call to action.
   Tell me the pattern behind each one, not the topic.
4. Write my version of each: same pattern, my topic and my examples, opened in my best hook
   style. Give me 3 hook options, a 30-second script and a caption.

Only use the numbers in the table. If something can't be worked out from the data, say so.

[paste table here]`

/** The seven stops of the spying mission, drawn as a route. */
function SpyMissionMap() {
  const stops = [
    { n: "1", a: "Know your", b: "baseline" },
    { n: "2", a: "Pick up to", b: "10 targets" },
    { n: "3", a: "Build the", b: "scoreboard" },
    { n: "4", a: "Catch their", b: "breakouts" },
    { n: "5", a: "Spot the", b: "trend" },
    { n: "6", a: "Transcribe", b: "and decode" },
    { n: "7", a: "Make your", b: "version" },
  ]
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 240" role="img" aria-labelledby="spy-map-title" className="h-auto w-full rounded-2xl border border-social/15 bg-social-soft">
        <title id="spy-map-title">
          The seven steps to spy on competitors&apos; Instagram: know your own baseline, pick up to 10 accounts to track, build a
          you vs them scoreboard, catch their breakout posts, spot trends that repeat across accounts, transcribe and decode the
          winners, and make your own version. Then repeat every week.
        </title>
        <defs>
          <marker id="spy-map-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#d6246e" />
          </marker>
        </defs>
        <text x="390" y="34" textAnchor="middle" fontSize="12" fontWeight="600" letterSpacing="1.5" fill="#717171">
          YOUR MISSION, STOP BY STOP
        </text>
        <path d="M60,100 L720,100" stroke="#d6246e" strokeWidth="2" strokeDasharray="6 6" />
        {stops.map((s, i) => {
          const x = 60 + i * 110
          const last = i === stops.length - 1
          return (
            <g key={s.n}>
              <circle cx={x} cy="100" r="22" fill={last ? "#d6246e" : "white"} stroke={last ? "#d6246e" : "#141414"} strokeWidth="1.5" />
              <text x={x} y="105" textAnchor="middle" fontSize="14" fontWeight="700" fill={last ? "white" : "#141414"}>{s.n}</text>
              <text x={x} y="146" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#141414">{s.a}</text>
              <text x={x} y="161" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#141414">{s.b}</text>
            </g>
          )
        })}
        <path d="M720,176 C720,200 60,200 60,180" fill="none" stroke="#d6246e" strokeWidth="1.5" strokeDasharray="4 5" markerEnd="url(#spy-map-arrow)" />
        <text x="390" y="226" textAnchor="middle" fontSize="11" fill="#717171">then the agent runs stops 3 to 7 again every week</text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        The route this guide takes. Stops 1 and 2 you do once; from stop 3 onwards it&apos;s a loop the agent keeps running for
        you.
      </figcaption>
    </figure>
  )
}

/** How a transcribed competitor breakout becomes a post for your account. */
function PatternNotPost() {
  const cols = [
    {
      x: 24,
      head: "THEIR BREAKOUT (TRANSCRIBED)",
      rows: [
        ["Hook", "“I built an AI assistant in a weekend.”"],
        ["Open", "Shows the finished thing in second 1"],
        ["Middle", "Three build steps, one per scene"],
        ["End", "“Comment BUILD for the guide.”"],
      ],
    },
    {
      x: 280,
      head: "THE PATTERN UNDERNEATH",
      rows: [
        ["Hook", "Big result + short time frame"],
        ["Open", "Result before explanation"],
        ["Middle", "Numbered steps, fast cuts"],
        ["End", "Keyword comment call to action"],
      ],
    },
    {
      x: 536,
      head: "YOUR VERSION",
      rows: [
        ["Hook", "Your best style: result first"],
        ["Open", "Your result, your numbers"],
        ["Middle", "Your 3 steps, your examples"],
        ["End", "The CTA your audience answers"],
      ],
    },
  ]
  return (
    <figure className="my-8">
      <svg viewBox="0 0 780 300" role="img" aria-labelledby="pattern-title" className="h-auto w-full rounded-2xl border border-social/15 bg-social-soft">
        <title id="pattern-title">
          Borrow the pattern, not the post. A competitor&apos;s breakout Reel is transcribed into hook, open, middle and end. The
          pattern underneath is a big result with a short time frame, the result shown before the explanation, numbered steps
          and a keyword comment call to action. Your version keeps the pattern but uses your best hook style, your own result,
          your own steps and the call to action your audience responds to.
        </title>
        <defs>
          <marker id="pattern-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#141414" />
          </marker>
        </defs>
        {cols.map((c, i) => (
          <g key={c.head}>
            <rect x={c.x} y="24" width="220" height="252" rx="14" fill="white" stroke={i === 2 ? "#d6246e" : "#141414"} strokeWidth="1.5" />
            <text x={c.x + 110} y="50" textAnchor="middle" fontSize="10.5" fontWeight="700" letterSpacing="1" fill={i === 2 ? "#d6246e" : "#717171"}>
              {c.head}
            </text>
            {c.rows.map(([label, text], j) => (
              <g key={label}>
                <text x={c.x + 16} y={86 + j * 52} fontSize="10" fontWeight="700" letterSpacing="1" fill="#717171">{label.toUpperCase()}</text>
                <text x={c.x + 16} y={104 + j * 52} fontSize="11.5" fill="#141414">{text}</text>
              </g>
            ))}
            {i < 2 && <path d={`M${c.x + 224},150 L${c.x + 252},150`} stroke="#141414" strokeWidth="2.5" markerEnd="url(#pattern-arrow)" />}
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        An illustration of what the agent does with a transcript: strip out their topic, keep the structure that made it
        work, then rebuild it from your own hooks, results and audience.
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

export default function SpyOnCompetitorsInstagramPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="space-y-6 text-neutral-600 leading-relaxed">
        <p className="text-lg text-ink">
          <strong>
            To spy on your competitors&apos; Instagram, pick up to 10 accounts in your niche, compare their followers, views,
            engagement and posting rate with yours, and watch for breakout posts: the ones that did at least twice that
            account&apos;s usual views. Then transcribe the winners, find the pattern behind them, and make your own version for
            your audience. An AI agent can run all of it for you every week.
          </strong>
        </p>
        <p>
          &quot;Spying&quot; sounds sneaky. It isn&apos;t. Every post your competitors publish is a public experiment, paid for
          with their time, and the results (views, likes, comments) are printed right under it. Most people scroll past that
          free research. In this guide we&apos;ll go on a small mission instead: seven stops, from knowing where you stand today
          to publishing a post built on what&apos;s already proven to work in your niche. I&apos;ll show you how I do it on my
          own account with the Talk to me Data social media agent, using my real numbers, plus the free manual version if
          you&apos;d rather do it by hand.
        </p>

        <div className="my-8 rounded-2xl border border-social/15 bg-social-soft p-6">
          <h2 className="mb-3 text-xl font-semibold tracking-[-0.02em] text-ink">TL;DR</h2>
          <ul className="list-disc space-y-2 pl-6 text-ink marker:text-social">
            <li>Don&apos;t reinvent the wheel: your competitors have already tested what your audience wants</li>
            <li>Track <strong>5 to 10 accounts</strong>, a mix of peers and bigger aspirational accounts (the agent watches up to 10 at a time)</li>
            <li>Compare <strong>you vs them</strong> on followers, average views, engagement, posts per week and top format</li>
            <li>Only study <strong>breakout posts</strong>: 2× the account&apos;s own usual views or more</li>
            <li>When the same pattern breaks out on 2 or more accounts, that&apos;s a <strong>trend</strong>, not luck</li>
            <li>Transcribe the winners, keep the pattern, and let the agent write <strong>your version</strong> from your own hook and audience data</li>
          </ul>
        </div>

        <h2 id="why-should-you-spy-on-your-competitors-instagram" className={H2}>Why Should You Spy on Your Competitors&apos; Instagram?</h2>
        <p>
          Because it&apos;s the fastest way to find out what your audience wants without guessing. Your competitors post to
          the same people you want to reach. Every Reel that flops and every carousel that takes off is a test result you get
          for free. Starting from a blank page every week means ignoring all of that data and paying for the same lessons
          yourself, one slow post at a time.
        </p>
        <p>
          This is the idea I keep coming back to: <strong>don&apos;t reinvent the wheel.</strong> Nobody builds a business by
          inventing a new format every week. They spot what&apos;s already working, understand <em>why</em>, and do their own
          version better or for a more specific audience. On Instagram, trends also move fast. A hook style or format can
          carry a niche for a few weeks and then fade. If you&apos;re watching the right accounts, you catch it while it&apos;s
          rising instead of after everyone is tired of it.
        </p>
        <p>Here&apos;s the route we&apos;ll take:</p>

        <SpyMissionMap />

        <div className="pt-6">
          <Step n={1} />
          <h2 id="how-do-you-know-where-your-instagram-stands" className={H2_STEP}>Know Your Own Baseline Before You Spy</h2>
        </div>
        <p>
          Before you look at anyone else, you need your own numbers: your usual views per post, your engagement rate, your best
          format and how often you post. Without them, a competitor&apos;s results are just big numbers. With them, you can see
          exactly where the gap is.
        </p>
        <p>
          The quickest way is our free{" "}
          <Link href="/free-tools/social-media-analyzer" className={LINK}>social media page analyzer</Link>. Paste your
          Instagram handle and you get a one-page snapshot of your account by email: what&apos;s working, what to fix and what
          to try next. It&apos;s the &quot;you are here&quot; pin on the map. If you already use the social media agent, the
          Overview tab gives you the same baseline and keeps it updated.
        </p>

        <div className="pt-6">
          <Step n={2} />
          <h2 id="how-do-you-find-competitors-to-track-on-instagram" className={H2_STEP}>How Do You Find the Right Competitors to Track on Instagram?</h2>
        </div>
        <p>
          You find the right competitors by looking for accounts that post <em>content like yours</em> to <em>people like
          yours</em>, not just accounts in the same industry. A bakery&apos;s real Instagram competitors might be food creators,
          not the bakery down the road. Pick two kinds:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-social">
          <li><strong className="text-ink">Peers:</strong> accounts around your size. They show what works at your level, right now.</li>
          <li><strong className="text-ink">Aspirational accounts:</strong> bigger accounts in your niche. They show where the niche is heading and which formats scale.</li>
        </ul>
        <p>
          The social media agent does the searching for you. It reads your bio and captions to understand your niche, then
          suggests accounts that post similar content, each with a short description and a preview of their recent posts and
          views. Here are the suggestions it gave me for my own account, @sellingwithnas, where I post about AI agents:
        </p>

        <Figure
          src={`${IMG}/instagram-competitors-suggested-to-track.webp`}
          alt="Suggested for you: seven aspirational Instagram accounts posting Claude Code and AI agent tutorials, each with a one-line description, three recent Reels with their views, a Track button and a Not relevant option"
          width={1800}
          height={1062}
          caption="Real suggestions for my account. Each card shows what the account posts and how its last three posts performed, so you can decide in seconds whether it's worth tracking."
        />

        <p>
          You click <strong>Track</strong> on the useful ones and <strong>Not relevant</strong> on the rest, and the agent
          learns from both. <strong>Find more</strong> pulls another batch. You can also paste any account&apos;s link to add
          it directly.
        </p>
        <p>
          <strong>How many should you track?</strong> The agent can spy on <strong>up to 10 accounts at any given
          time</strong>. That&apos;s the sweet spot: enough to tell a real trend from one lucky post, few enough that every
          account earns its place. If one stops being useful, remove it and track someone new.
        </p>

        <div className="pt-6">
          <Step n={3} />
          <h2 id="what-instagram-metrics-should-you-track-on-competitors" className={H2_STEP}>What Instagram Metrics Should You Track on Competitors?</h2>
        </div>
        <p>
          Track five public numbers per account: followers, average views, engagement rate, posts per week and top format.
          Together they tell you how big each account is, how much attention each post gets, how hard the audience reacts, how
          much effort they put in and what they bet on. The agent puts them side by side with yours in one <strong>You vs
          them</strong> table, averaged over each account&apos;s recent posts.
        </p>
        <p>This is my real scoreboard from this week, next to three of the accounts I track:</p>

        <Figure
          src={`${IMG}/instagram-competitor-tracking-you-vs-them.webp`}
          alt="You vs them table: my account @sellingwithnas with 204 followers, 555 average views, 7.1% engagement and 5.6 posts a week, compared with Nick Saraev, Mariah Brunner and Nate Herk, all with Reels as their top format"
          width={1800}
          height={547}
          caption="My account against three accounts I track, mid November 2026. The bars make the gaps obvious at a glance; the numbers tell you which gap is worth closing."
        />

        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-social-soft text-ink">
              <tr>
                <th className="p-4 font-semibold">Account</th>
                <th className="p-4 font-semibold">Followers</th>
                <th className="p-4 font-semibold">Avg views</th>
                <th className="p-4 font-semibold">Views per follower</th>
                <th className="p-4 font-semibold">Engagement</th>
                <th className="p-4 font-semibold">Posts / week</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Me (@sellingwithnas)</td><td className="p-4">204</td><td className="p-4">555</td><td className="p-4">2.7</td><td className="p-4">7.1%</td><td className="p-4">5.6</td></tr>
              <tr><td className="p-4 font-medium text-ink">Nick Saraev</td><td className="p-4">731K</td><td className="p-4">167K</td><td className="p-4">0.23</td><td className="p-4">1.2%</td><td className="p-4">5.6</td></tr>
              <tr><td className="p-4 font-medium text-ink">Mariah Brunner</td><td className="p-4">293K</td><td className="p-4">44K</td><td className="p-4">0.15</td><td className="p-4">0.7%</td><td className="p-4">4.1</td></tr>
              <tr><td className="p-4 font-medium text-ink">Nate Herk</td><td className="p-4">344K</td><td className="p-4">35K</td><td className="p-4">0.10</td><td className="p-4">0.5%</td><td className="p-4">10.0</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm">
          Views per follower is my own calculation (average views divided by followers). Every other number is from the
          agent&apos;s You vs them table on 15 November 2026. All four accounts&apos; top format is Reels.
        </p>

        <p>Here&apos;s what I read from it, and it&apos;s the kind of thing you should look for in yours:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-social">
          <li>
            <strong className="text-ink">Every account&apos;s top format is Reels.</strong> In my niche, the audience has voted.
            If I want reach, Reels get my best ideas, not carousels.
          </li>
          <li>
            <strong className="text-ink">Posting more isn&apos;t the answer.</strong> I already post as often as Nick (5.6 a
            week). Nate posts 10 times a week and averages fewer views than Mariah at 4.1. The gap is what&apos;s <em>in</em>
            the posts, so that&apos;s where to spy.
          </li>
          <li>
            <strong className="text-ink">Don&apos;t compare raw engagement.</strong> My 7.1% looks great next to 0.5% to 1.2%,
            but engagement rate always falls as accounts grow. That&apos;s why the next step compares each post with its own
            account&apos;s usual, not with mine.
          </li>
          <li>
            <strong className="text-ink">My views already reach beyond my followers.</strong> At 2.7 views per follower, most
            of my views come from people who don&apos;t follow me yet. Instagram is already showing my Reels to new people;
            the hook decides whether they stay. That tells me to study competitors&apos; hooks above everything else.
          </li>
        </ul>

        <SignupCta eyebrow="Spy on your niche" heading="Track up to 10 competitors in one place" accent="social">
          Sign up free, paste your Instagram link and let the agent suggest accounts like yours. Your You vs them scoreboard is
          ready in minutes.
        </SignupCta>

        <div className="pt-6">
          <Step n={4} />
          <h2 id="how-do-you-find-competitors-breakout-posts-on-instagram" className={H2_STEP}>How Do You Find Your Competitors&apos; Breakout Posts?</h2>
        </div>
        <p>
          A breakout post is one that did at least <strong>2× that account&apos;s median views</strong>. You find them by
          working out each account&apos;s usual and flagging anything well above it. This is the most important idea in this
          guide, because most of any account&apos;s posts are average. Studying the average teaches you nothing. Breakouts are
          where the audience clearly said &quot;more of this&quot;.
        </p>
        <p>
          Measuring against each account&apos;s own median also makes the comparison fair. A peer&apos;s Reel that jumped from
          2K to 9K views is a stronger signal than a big account&apos;s Reel that went from 150K to 180K, even though the
          second number is bigger.
        </p>
        <p>
          Doing this by hand across 10 accounts means opening every profile, writing down every view count and doing the maths
          every week. The agent does it <strong>at scale and as it happens</strong>: it watches every account you track, works
          out each one&apos;s median and flags new breakouts as they start beating their usual, so you see them while
          they&apos;re still fresh.
        </p>

        <Figure
          src={`${IG_IMG}/instagram-competitor-breakout-posts.webp`}
          alt="Breakout posts in your niche: competitor carousels and Reels that did between 2 and 5.3 times their account's median views, with views, likes, comments and engagement rate for each"
          width={1600}
          height={1333}
          caption="The breakout feed, shown on our sample account Studio Nova. Each card says how far the post beat its own account's usual, so a small account's win counts as much as a big one's."
        />

        <div className="pt-6">
          <Step n={5} />
          <h2 id="how-do-you-spot-instagram-trends-from-competitors" className={H2_STEP}>How Do You Spot Instagram Trends From Your Competitors?</h2>
        </div>
        <p>
          You spot a trend when <strong>the same pattern breaks out for two or more accounts</strong> within a few weeks. One
          breakout can be luck: a good day, a share from a big account. The same hook, topic or format working for several
          accounts at once means the audience in your niche wants it right now.
        </p>
        <p>
          Look back at my suggested accounts in step 2. Two different creators have the same idea near the top of their recent
          posts: Luke&apos;s &quot;How to build Jarvis in a weekend&quot; at 1.5M views, and Taki&apos;s &quot;5 things to
          build in Claude in a weekend&quot; at 118K, his best of the three recent posts shown. Different people,
          different audiences, same pattern: <em>an ambitious build plus a short time frame</em>. That&apos;s a trend
          signal, and it took one screen to see it.
        </p>
        <p>What counts as a pattern worth tracking:</p>
        <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-left text-sm">
            <thead className="bg-social-soft text-ink">
              <tr>
                <th className="p-4 font-semibold">Pattern type</th>
                <th className="p-4 font-semibold">What to look for</th>
                <th className="p-4 font-semibold">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              <tr><td className="p-4 font-medium text-ink">Hook style</td><td className="p-4">How the first line or first 3 seconds open</td><td className="p-4">Result first, a question, a bold claim</td></tr>
              <tr><td className="p-4 font-medium text-ink">Topic angle</td><td className="p-4">The promise, not the subject</td><td className="p-4">&quot;Build X in a weekend&quot;</td></tr>
              <tr><td className="p-4 font-medium text-ink">Format</td><td className="p-4">Reel, carousel or image, and its length</td><td className="p-4">30-second talking head Reels</td></tr>
              <tr><td className="p-4 font-medium text-ink">Structure</td><td className="p-4">How the middle of the post is built</td><td className="p-4">Result shown first, then 3 numbered steps</td></tr>
              <tr><td className="p-4 font-medium text-ink">Call to action</td><td className="p-4">What viewers are asked to do</td><td className="p-4">&quot;Comment a keyword and I&apos;ll send it&quot;</td></tr>
            </tbody>
          </table>
        </div>

        <div className="pt-6">
          <Step n={6} />
          <h2 id="how-do-you-analyze-why-a-competitors-post-worked" className={H2_STEP}>Transcribe the Winners and Decode Why They Worked</h2>
        </div>
        <p>
          To understand why a post worked, you need what was actually said, not just the caption. On Instagram most of the
          message in a Reel is spoken, so the caption only tells you half the story. The social media agent{" "}
          <strong>transcribes your competitors&apos; most successful posts</strong>: the words spoken in the Reel, the text on
          screen and the caption. Now you can read a 1.5M-view Reel in 20 seconds instead of rewatching it ten times.
        </p>
        <p>With the transcript in front of you, break it into five parts:</p>
        <ol className="list-decimal space-y-2 pl-6">
          <li><strong className="text-ink">Hook:</strong> the first line or first 3 seconds. Why would someone stop scrolling?</li>
          <li><strong className="text-ink">Promise:</strong> what does the viewer get if they keep watching?</li>
          <li><strong className="text-ink">Structure:</strong> how is the middle built? Steps, a story, a before and after, a list?</li>
          <li><strong className="text-ink">Proof:</strong> what makes it believable? A demo, a number, a screenshot?</li>
          <li><strong className="text-ink">Call to action:</strong> what are viewers asked to do at the end?</li>
        </ol>
        <p>
          That breakdown is the pattern. The topic is theirs; the pattern is free to use. One habit I still keep: open the top
          breakout on Instagram and watch it once after reading the transcript. The transcript tells you <em>what</em> they
          said; watching it shows you the pace and the visuals.
        </p>

        <div className="pt-6">
          <Step n={7} />
          <h2 id="how-do-you-turn-competitor-posts-into-your-own-content" className={H2_STEP}>How Do You Turn a Competitor&apos;s Post Into Your Own Content?</h2>
        </div>
        <p>
          You keep the pattern and rebuild everything else from your own data: your best hook style, your audience&apos;s
          questions and your own results. This is where the agent does the part that would take you an hour. It takes the
          transcript of a competitor&apos;s winning post and creates <strong>a version of it for your account</strong>, using
          three things it already knows about you:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-social">
          <li><strong className="text-ink">Your hooks:</strong> which opening styles beat your own median, so the new post opens the way your audience responds to.</li>
          <li><strong className="text-ink">Your audience:</strong> who follows you and what they care about, so the topic fits them, not the competitor&apos;s audience.</li>
          <li><strong className="text-ink">Your engagement:</strong> which formats, lengths and calls to action earn you the most, so the post is built to perform on your account.</li>
        </ul>

        <PatternNotPost />

        <p>
          In the agent, the <strong>What to borrow</strong> cards turn breakouts into plays you can run this week, and{" "}
          <strong>Script this for me</strong> writes your version: hook options in your best style, a script to film and a
          caption. From there it goes into your content plan like any other post.
        </p>

        <Figure
          src={`${IG_IMG}/instagram-you-vs-competitors-what-to-borrow.webp`}
          alt="You versus competitors table followed by What to borrow cards, each turning a competitor's breakout into a play, with a Script this for me button"
          width={1600}
          height={1474}
          caption="What to borrow, shown on the sample account. Each card names the pattern behind a competitor's breakout and one click turns it into your script."
        />

        <p>
          If you want the full journey from here (designing carousels in your brand kit and scheduling posts to Instagram
          automatically), that&apos;s in{" "}
          <Link href="/blog/how-to-automate-instagram-with-ai" className={LINK}>how to fully automate your Instagram with AI</Link>.
        </p>

        <h2 id="how-to-spy-on-competitors-instagram-for-free" className={H2}>How to Spy on Competitors&apos; Instagram for Free (the Manual Way)</h2>
        <p>
          You can run the same mission by hand with a spreadsheet and Claude. It takes one to two hours a week for five
          accounts instead of zero, but it costs nothing beyond your Claude plan.
        </p>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Open each competitor&apos;s profile and go to the Reels tab. Instagram shows the view count on every Reel in the grid.</li>
          <li>Log their last 20 posts in a sheet: date, format, views, likes, comments and the first line of the caption.</li>
          <li>For the posts that look well above their usual, turn on captions in the Reel and copy what&apos;s said into a transcript column.</li>
          <li>
            Check the{" "}
            <a href="https://www.facebook.com/ads/library/" target="_blank" rel="noopener" className={LINK}>Meta Ad Library</a>{" "}
            too. It&apos;s free and shows every ad a competitor is running on Instagram and Facebook. Ads that keep running for
            months are the ones that make them money.
          </li>
          <li>Paste the sheet into Claude with the prompt below.</li>
        </ol>

        <PromptBlock prompt={DIY_PROMPT} label="Competitor spying prompt for Claude" leadSource="prompt_spy_on_competitors_instagram" />

        <p>
          The catch: Claude can&apos;t open Instagram, it doesn&apos;t keep watching your competitors between sessions, and
          the transcripts are on you. That&apos;s fine for three accounts once a month. For 10 accounts every week, that&apos;s
          the gap the{" "}
          <Link href="/agents/social-media" className={LINK}>social media agent</Link> fills. If you&apos;d rather build your
          own, start with{" "}
          <Link href="/blog/how-to-build-social-media-ai-agent" className={LINK}>how to build a social media AI agent</Link>.
        </p>

        <h2 id="what-are-the-most-common-mistakes-when-spying-on-competitors" className={H2}>What Are the Most Common Mistakes When Spying on Competitors?</h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-social">
          <li><strong className="text-ink">Copying the post instead of the pattern.</strong> Reposting someone&apos;s idea word for word is lazy, easy to spot and can break copyright. Borrow the structure, bring your own story.</li>
          <li><strong className="text-ink">Tracking only the giants.</strong> A 1M-follower account can get away with things you can&apos;t. Keep a few peers on the list.</li>
          <li><strong className="text-ink">Studying their average posts.</strong> Only breakouts carry a signal. Ignore the rest.</li>
          <li><strong className="text-ink">Chasing one lucky post.</strong> Wait until a pattern breaks out on two or more accounts before you call it a trend.</li>
          <li><strong className="text-ink">Comparing raw numbers.</strong> Follower counts and engagement rates differ by account size. Compare each post with its own account&apos;s usual.</li>
          <li><strong className="text-ink">Spying once and stopping.</strong> Trends move in weeks. The value comes from checking every week.</li>
        </ul>

        <h2 id="summary" className={H2}>Summary</h2>
        <p>
          Spying on your competitors&apos; Instagram is the shortcut to content your audience already wants. Know your own
          baseline, track up to 10 peers and aspirational accounts, compare yourself on five public numbers, and only study the
          posts that broke out. When a pattern breaks out on more than one account, you&apos;ve found a trend. Transcribe the
          winners, keep the pattern, and rebuild the post from your own hooks, audience and engagement data.
        </p>
        <p>
          You don&apos;t need to reinvent the wheel. You need to notice which wheels are already turning, then build yours. For
          the bigger picture across every platform, read{" "}
          <Link href="/blog/how-to-automate-social-media-posting-with-ai-agent" className={LINK}>how to automate social media posting with an AI agent</Link>,
          or see how I turn this research into carousels and edited videos in{" "}
          <Link href="/blog/how-to-grow-on-social-media-with-claude-and-ai-agent" className={LINK}>how to grow on social media with Claude and an AI agent</Link>.
        </p>

        <SignupCta heading="Start spying on your niche" accent="social">
          Sign up free and paste your Instagram link. The agent finds accounts like yours, tracks up to 10 of them, flags their
          breakout posts and turns the best ones into your next post.
        </SignupCta>
      </div>
    </BlogPostShell>
  )
}
