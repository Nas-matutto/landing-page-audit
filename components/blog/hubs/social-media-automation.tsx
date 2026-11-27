import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  Hash,
  LayoutTemplate,
  MessageCircle,
  Palette,
  Repeat2,
  Send,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react"
import { AuthorAvatar } from "@/components/blog/author-avatar"
import { FaqSection } from "@/components/blog/faq-section"
import { PostCard } from "@/components/blog/post-card"
import { SignupCta } from "@/components/blog/signup-cta"
import { MobileTableOfContents, TableOfContents, type TocEntry } from "@/components/blog/table-of-contents"
import { authorUrl, getAuthor } from "@/lib/authors"
import { formatPostDate, type BlogPost, type Faq } from "@/lib/blog"
import { comparePath, getVisibleComparisons } from "@/lib/compare"
import { SIGNUP_URL } from "@/lib/links"

/**
 * The Social Media Automation hub (/blog/category/social-media-automation):
 * the pillar guide for the social media agent's topic. It renders in the same
 * frame as a blog post (byline, sticky "On this page" sidebar) with the
 * category's guides and the comparison pages woven in.
 *
 * Keyword: the broad search "social media automation". The how-to "how to
 * automate social media with AI" belongs to the blog post
 * how-to-automate-social-media-posting-with-ai-agent, and "AI social media
 * agent" belongs to the homepage. Keep them apart.
 *
 * HUMAN slots (`nasTake`, `ourSetup`): Nas's own words only. Empty renders nothing.
 * Competitor facts: from their own pricing pages (see lib/compare.ts), checked `factsChecked`.
 * Our platforms: Instagram, TikTok, Facebook and X scheduled or on autopilot;
 * LinkedIn on "Post now"; Pinterest coming soon.
 *
 * The table of contents is the TOC array below: keep it in sync with the H2s.
 */

export const SOCIAL_HUB = {
  reviewed: true,
  heading: "Social Media Automation: The Complete Guide for Small Businesses",
  description:
    "What social media automation is, 12 tasks you can automate, the best tools compared, a sample automated week, mistakes to avoid and real costs.",
  intro: [
    "Social media automation means letting software do the repetitive parts of running your accounts: working out what performs, planning, creating posts, publishing them on time and checking how they did. Done well, you spend your time on the parts only you can do, like talking to your customers and filming yourself.",
  ],
  dateModified: "2026-11-27",
  factsChecked: "2026-11-27",
  readMinutes: 15,

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
      question: "What is the best social media automation tool?",
      answer:
        "It depends on what you want automated. If you make your own posts and need them published on time, a scheduler such as Buffer or Later is the cheapest option. Teams that need an inbox, approvals and reporting often use Hootsuite. If you want the posts created for you as well, an AI social media agent like Talk to me Data studies your account, makes the posts and publishes them.",
    },
    {
      question: "Can I automate posting to Instagram, TikTok and Facebook?",
      answer:
        "Yes. All three let approved tools publish posts for you through their official connections, so you never share your password. On Instagram you need a professional (business or creator) account for automatic publishing, and on Facebook you post to a Page. Schedulers post content you've made; an AI social media agent can create the posts as well.",
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
      question: "How often should an automated account post?",
      answer:
        "As often as you can keep the quality up. For most small businesses that is every 2 to 4 days per platform. A steady pace you can keep for months beats a daily plan you drop after three weeks, and it gives you enough posts each month to see what works.",
    },
    {
      question: "How much does social media automation cost?",
      answer:
        "Scheduling tools start low: Buffer from $5 per channel a month billed yearly, Later from $18.75 a month billed yearly, Hootsuite from $99 per user a month billed yearly (prices from their sites, November 2026). AI agents that also create the posts cost more than a basic scheduler; Talk to me Data is free to start and $49 a month for autopilot and posting.",
    },
  ] satisfies Faq[],
}

const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-16 mb-4"
const LINK = "text-ink underline decoration-social/40 underline-offset-4 hover:decoration-social"
const PINK = "#d6246e"
const INK = "#141414"

/** The H2s, in page order, for the table of contents. Keep in sync with the H2s below. */
const TOC: TocEntry[] = [
  { id: "what-is-social-media-automation", text: "What is social media automation?" },
  { id: "tasks-you-can-automate", text: "12 tasks you can automate" },
  { id: "scheduler-vs-ai-agent", text: "Scheduler or AI agent?" },
  { id: "best-tools", text: "The best automation tools" },
  { id: "how-to-automate-social-media", text: "How to automate it in 5 steps" },
  { id: "automated-week", text: "An automated week" },
  { id: "platforms", text: "Platform by platform" },
  { id: "what-not-to-automate", text: "What never to automate" },
  { id: "keep-it-human", text: "Keeping it sounding like you" },
  { id: "mistakes", text: "7 mistakes to avoid" },
  { id: "cost", text: "What it costs" },
  { id: "guides", text: "Step-by-step guides" },
]

// ── Content ─────────────────────────────────────────────────────────────────

const TASKS: { title: string; does: string; you: string; Icon: LucideIcon; href?: string; link?: string }[] = [
  { title: "Find your best-performing posts", does: "Ranks every post by views and engagement, so you see your real winners instead of guessing.", you: "Glance at it weekly", Icon: BarChart3, href: "/free-tools/social-media-analyzer", link: "Try it free on your Instagram" },
  { title: "Spot the hooks that work", does: "Pulls out the first lines, formats and topics your top posts have in common.", you: "Keep the ones that fit your brand", Icon: Hash, href: "/blog/how-to-grow-on-social-media-with-claude-and-ai-agent", link: "How to find your winning hooks" },
  { title: "Track competitors' breakout posts", does: "Watches accounts like yours and flags posts that do far better than their usual.", you: "Decide which ideas fit you", Icon: Eye, href: "/blog/how-to-spy-on-competitors-instagram", link: "How to track competitors" },
  { title: "Plan the week", does: "Turns those patterns into a content plan and picks a time slot for each post.", you: "Approve the plan", Icon: CalendarClock },
  { title: "Write captions", does: "Drafts captions in your tone, built from the captions that already performed.", you: "Add one real detail", Icon: FileText },
  { title: "Write reel and video scripts", does: "Writes the hook, the script and a shot list for each video.", you: "Film it yourself", Icon: Video },
  { title: "Design carousels and images", does: "Lays out carousels and images in your brand kit: logo, colours and fonts.", you: "Review before it goes out", Icon: Palette },
  { title: "Reshape one idea for each platform", does: "Turns one idea into the right format for each place, from a carousel on Instagram to a short post on X.", you: "Check it reads naturally", Icon: Repeat2 },
  { title: "Schedule at your best times", does: "Queues every post for the slots when your audience is most active.", you: "Nothing, once it's set up", Icon: Clock },
  { title: "Publish on autopilot", does: "Creates and posts a new post every few days without you filling a queue.", you: "Switch it on once you trust it", Icon: Send, href: "/blog/how-to-automate-instagram-with-ai", link: "How autopilot works on Instagram" },
  { title: "Report on results", does: "Shows what worked, what didn't and what to try next, so the next round is better.", you: "Read it, adjust the plan", Icon: LayoutTemplate },
  { title: "Draft replies to common comments", does: "Suggests replies to the questions you get again and again.", you: "Always read and send them yourself", Icon: MessageCircle },
]

type Tool = {
  name: string
  type: string
  bestFor: string
  free: string
  price: string
  posts: string
  strengths: string[]
  limits: string[]
  /** lib/compare.ts slug, linked only while that page is visible. */
  compare?: string
}

const TOOLS: Tool[] = [
  {
    name: "Talk to me Data",
    type: "AI social media agent",
    bestFor: "Small businesses that want the posts made for them, not just scheduled",
    free: "Yes, 50 actions a month",
    price: "$49 a month (about 40 finished posts, autopilot and posting)",
    posts: "Instagram, TikTok, Facebook and X; LinkedIn on Post now; Pinterest coming soon",
    strengths: ["Creates posts from what already works on your account", "Designs carousels and images in your brand kit", "Autopilot: a new post every 7, 4, 3 or 2 days", "Competitor tracking on every plan"],
    limits: ["Doesn't post to Threads, YouTube or Bluesky (it emails you the finished post)", "Costs more than a basic scheduler"],
  },
  {
    name: "Buffer",
    type: "Scheduler",
    bestFor: "People who make their own posts and want a cheap queue for many platforms",
    free: "Yes, 3 channels",
    price: "$5 per channel a month, billed yearly",
    posts: "Instagram, TikTok, Facebook, X, LinkedIn, Pinterest, YouTube Shorts, Threads, Bluesky, Mastodon and more",
    strengths: ["Low price per channel", "The longest list of platforms here", "Simple to learn"],
    limits: ["You make every post yourself", "No autopilot"],
    compare: "buffer",
  },
  {
    name: "Later",
    type: "Scheduler and visual planner",
    bestFor: "Creators who shoot their own content and plan their Instagram grid visually",
    free: "No, 14-day trial",
    price: "$18.75 a month billed yearly ($25 monthly)",
    posts: "Instagram, TikTok, Facebook, Threads, Pinterest, LinkedIn, YouTube and Snapchat",
    strengths: ["Visual calendar and grid preview", "AI caption writer (paid in AI credits)", "Deep analytics history on higher plans"],
    limits: ["Posts per profile are capped on lower plans", "Competitor benchmarking only on Scale"],
    compare: "later",
  },
  {
    name: "Hootsuite",
    type: "Platform for social media teams",
    bestFor: "Teams and agencies that need an inbox, approvals and reporting across many accounts",
    free: "No, 14-day trial",
    price: "$99 per user a month billed yearly ($149 monthly)",
    posts: "Instagram, TikTok, Facebook, X, LinkedIn, YouTube, Threads, Pinterest and WhatsApp",
    strengths: ["Shared inbox for messages", "Competitor benchmarking from Standard", "Built for many accounts"],
    limits: ["Priced per user, so it grows with your team", "More than most small businesses need"],
    compare: "hootsuite",
  },
]

const WEEK: { day: string; agent: string; you: string }[] = [
  { day: "Monday", agent: "Reads last week's results and competitors' breakout posts, then drafts the week's plan", you: "Approve or tweak the plan" },
  { day: "Tuesday", agent: "Creates the week's posts: captions, carousels, images and video scripts", you: "Review the posts; film any talking videos" },
  { day: "Wednesday", agent: "Publishes post 1 at your best time slot", you: "Reply to comments" },
  { day: "Thursday", agent: "Flags a competitor post that's taking off and suggests your version", you: "Say yes or no" },
  { day: "Friday", agent: "Publishes post 2", you: "Reply to comments and DMs" },
  { day: "Saturday", agent: "Publishes post 3", you: "Nothing" },
  { day: "Sunday", agent: "Gathers the week's numbers: what worked, what didn't, what to try next", you: "Read it and adjust next week" },
]

const PLATFORMS: { name: string; automate: string; works: string; need: string }[] = [
  { name: "Instagram", automate: "Carousels, images and reels", works: "Carousels for saves and shares, reels for reach", need: "A professional (business or creator) account" },
  { name: "TikTok", automate: "Scripts, captions and scheduled videos", works: "A strong hook in the first seconds, and you on camera", need: "Your account connected through TikTok's sign-in" },
  { name: "Facebook", automate: "Posts to your Page", works: "Images and short videos that start a conversation", need: "A Facebook Page (groups mostly can't be automated)" },
  { name: "X", automate: "Short posts and threads", works: "Frequent, short, opinionated posts", need: "Your account connected through X's sign-in" },
  { name: "LinkedIn", automate: "Drafts; many tools publish too", works: "Lessons and stories from running your business", need: "Your profile or a company Page" },
  { name: "Pinterest", automate: "Pins to the right boards", works: "Tall images that link back to your site", need: "A Pinterest business account" },
]

const MISTAKES: { title: string; body: string }[] = [
  { title: "Automating before you know what works", body: "Scheduling generic posts faster just gets you more generic posts. Start from your own best content." },
  { title: "Posting the same thing everywhere", body: "A carousel that works on Instagram reads badly as a post on X. Reshape each post for the platform." },
  { title: "Setting it and forgetting it", body: "Read your results every week. Automation only gets better if someone looks at what it learned." },
  { title: "Going too fast too soon", body: "Start with a post every 3 or 4 days you can review, then raise the pace once the posts need few changes." },
  { title: "Letting a bot talk to customers", body: "Drafted replies save time. Sending them unread is how brands end up apologising in public." },
  { title: "Forgetting to pause", body: "When something big happens in the news or in your business, pause the queue for the day." },
  { title: "Faking engagement", body: "Automated likes, follows and comments break the platforms' rules and can get your account restricted." },
]

// ── Pieces ──────────────────────────────────────────────────────────────────

/** The automation loop: five stages around your account, the last feeding the first. */
function AutomationLoopDiagram() {
  const stages = [
    { x: 390, y: 52, title: "1. Find what works", sub: "your best posts and hooks" },
    { x: 650, y: 150, title: "2. Watch competitors", sub: "their breakout posts" },
    { x: 560, y: 300, title: "3. Create", sub: "posts in your brand" },
    { x: 220, y: 300, title: "4. Schedule and post", sub: "at your best times" },
    { x: 130, y: 150, title: "5. Learn", sub: "what did well, and why" },
  ]
  const arrows = [
    "M486,58 C560,66 612,92 634,116",
    "M660,180 C656,222 636,252 616,268",
    "M462,318 C420,330 360,330 318,318",
    "M156,272 C134,250 122,214 124,184",
    "M150,118 C176,86 236,62 290,56",
  ]
  return (
    <figure className="mb-10">
      <svg viewBox="0 0 780 360" role="img" aria-labelledby="loop-title" className="h-auto w-full rounded-3xl border border-social/15 bg-social-soft">
        <title id="loop-title">
          The social media automation loop: find what works on your account, watch competitors&apos; breakout posts, create
          posts in your brand, schedule and post them at your best times, then learn what did well, which feeds the next round.
        </title>
        <defs>
          <marker id="loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={PINK} />
          </marker>
        </defs>
        <ellipse cx="390" cy="190" rx="250" ry="118" fill="none" stroke={PINK} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 8" />
        {arrows.map(d => (
          <path key={d} d={d} fill="none" stroke={PINK} strokeWidth="2.5" markerEnd="url(#loop-arrow)" />
        ))}
        <circle cx="390" cy="190" r="62" fill={INK} />
        <text x="390" y="185" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Your</text>
        <text x="390" y="205" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">account</text>
        {stages.map(s => (
          <g key={s.title}>
            <rect x={s.x - 94} y={s.y - 27} width="188" height="56" rx="14" fill="white" stroke={INK} strokeWidth="1.5" />
            <text x={s.x} y={s.y - 4} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={INK}>{s.title}</text>
            <text x={s.x} y={s.y + 15} textAnchor="middle" fontSize="11.5" fill="#6b6b6b">{s.sub}</text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-center text-sm text-quiet">
        Social media automation is a loop, not a queue. Every round of posts teaches the next one.
      </figcaption>
    </figure>
  )
}

function Takeaways() {
  const points = [
    "Automate the work behind your posts: analysis, planning, creating and publishing.",
    "Keep a person on the parts that need you: replies, your face and voice, and the final check.",
    "A scheduler publishes posts you make. An AI agent also decides what to post and makes it.",
    "Start from what already works on your account, not from generic templates.",
    "Post every 2 to 4 days at a quality you can keep, then speed up.",
  ]
  return (
    <div className="mb-10 rounded-3xl border border-hairline bg-mist p-6 sm:p-7">
      <p className="mb-4 text-xl font-semibold tracking-[-0.02em] text-ink">Key takeaways</p>
      <ul className="space-y-2.5">
        {points.map(p => (
          <li key={p} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink">
            <Sparkles className="mt-1 h-4 w-4 shrink-0 text-social" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-hairline">
      <table className="w-full text-left text-sm">
        <thead className="bg-social-soft text-ink">
          <tr>
            {head.map(h => (
              <th key={h} className="p-4 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} className={c === 0 ? "p-4 align-top font-medium text-ink" : "p-4 align-top"}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SidebarCta() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white">
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-social/50 blur-2xl" />
      <p className="relative text-lg font-semibold leading-snug">Put your social media on autopilot</p>
      <p className="relative mt-2 text-sm leading-relaxed text-white/65">
        Your agent creates posts from what already works, schedules them and posts them for you.
      </p>
      <a
        href={SIGNUP_URL}
        className="relative mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-social px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Start free <ArrowRight className="h-4 w-4" />
      </a>
      <p className="relative mt-2 text-center text-xs text-white/45">Free plan · No card required</p>
    </div>
  )
}

// ── The page ────────────────────────────────────────────────────────────────

/** The whole hub, in the blog post frame. `posts` are the category's guides. */
export function SocialHubPage({ posts }: { posts: BlogPost[] }) {
  const author = getAuthor("nas")
  // Only link comparisons that exist here: drafts 404 in production.
  const comparisons = getVisibleComparisons()
  const hasCompare = (slug?: string) => !!slug && comparisons.some(c => c.slug === slug)
  const toc: TocEntry[] = [
    ...TOC,
    ...(SOCIAL_HUB.ourSetup ? [{ id: "how-we-run-ours", text: "How we run our own" }] : []),
    { id: "faq", text: "FAQ" },
  ]
  const checked = formatPostDate(SOCIAL_HUB.factsChecked)

  return (
    <div className="pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:grid lg:max-w-6xl lg:grid-cols-[minmax(0,48rem)_15rem] lg:justify-center lg:gap-14">
          <article className="min-w-0 text-neutral-600 [&_h2[id]]:scroll-mt-32">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-quiet">
                <li><Link href="/blog" className="transition-colors hover:text-ink">Blog</Link></li>
                <li aria-hidden><ChevronRight className="h-3.5 w-3.5 text-faint" /></li>
                <li className="text-ink">Social Media Automation</li>
              </ol>
            </nav>

            <header className="mb-10">
              <p className="eyebrow">
                Complete guide · {posts.length} step-by-step guides{comparisons.length > 0 && ` · ${comparisons.length} tool comparisons`}
              </p>
              <h1 className="display mt-5 mb-7 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05]">{SOCIAL_HUB.heading}</h1>
              {SOCIAL_HUB.intro.map(p => (
                <p key={p} className="lede mb-7 text-lg">{p}</p>
              ))}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-quiet">
                <Link href={authorUrl(author.id)} className="group flex items-center gap-2.5">
                  <AuthorAvatar author={author} size={28} />
                  <span>
                    By <span className="font-semibold text-ink group-hover:underline">{author.name}</span>
                  </span>
                </Link>
                <span>
                  Updated <time dateTime={SOCIAL_HUB.dateModified}>{formatPostDate(SOCIAL_HUB.dateModified)}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {SOCIAL_HUB.readMinutes} min read
                </span>
              </div>
            </header>

            <AutomationLoopDiagram />

            {SOCIAL_HUB.nasTake && (
              <aside className="mb-10 rounded-3xl border border-hairline p-6">
                <div className="mb-3 flex items-center gap-3">
                  <AuthorAvatar author={author} size={32} />
                  <p className="text-sm font-semibold text-ink">{author.name}&apos;s take</p>
                </div>
                <p className="text-ink">{SOCIAL_HUB.nasTake}</p>
              </aside>
            )}

            <Takeaways />

            <MobileTableOfContents entries={toc} />

            <div className="space-y-6 leading-relaxed">
              {/* ── What it is ── */}
              <h2 id="what-is-social-media-automation" className={H2}>What Is Social Media Automation?</h2>
              <p>
                <strong className="text-ink">
                  Social media automation is using software to do the repeatable parts of social media for you, from
                  publishing posts at the right time to creating the posts themselves.
                </strong>{" "}
                For years it meant one thing: scheduling. You made a week of posts, loaded them into a tool, and it published
                them. AI has moved the line. Today an agent can also look at which of your posts did best, work out why, and
                make new ones in the same style.
              </p>
              <p>
                That matters because the slow part of social media was never pressing publish. It is deciding what to post
                and then making it, every few days, without running out of ideas. Good automation takes that weight off and
                leaves you the parts that need a person.
              </p>

              {/* ── Listicle: tasks ── */}
              <h2 id="tasks-you-can-automate" className={H2}>12 Social Media Tasks You Can Automate</h2>
              <p>
                These are the jobs that eat a small team&apos;s week, in the order they happen. For each one: what automation
                does, and what&apos;s left for you.
              </p>
              <ol className="my-8 grid gap-4 sm:grid-cols-2">
                {TASKS.map((t, i) => (
                  <li key={t.title} className="flex flex-col rounded-2xl border border-hairline bg-white p-5 transition-colors hover:border-social/40">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-social-soft text-social">
                        <t.Icon className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-faint">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-[17px] font-semibold leading-snug text-ink">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed">{t.does}</p>
                    <p className="mt-3 text-sm">
                      <span className="font-semibold text-ink">You: </span>
                      {t.you}
                    </p>
                    {t.href && (
                      <Link href={t.href} className={`mt-auto pt-3 text-sm font-semibold ${LINK}`}>
                        {t.link}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>

              {/* ── Scheduler vs agent ── */}
              <h2 id="scheduler-vs-ai-agent" className={H2}>Scheduler or AI Agent: What&apos;s the Difference?</h2>
              <p>
                <strong className="text-ink">
                  A scheduler publishes posts you have already made. An AI agent decides what to post, makes it and then
                  publishes it.
                </strong>{" "}
                Both save you time; they save it in different places.
              </p>
              <Table
                head={["", "Scheduler", "AI social media agent"]}
                rows={[
                  ["Who makes the posts", "You", "The agent, from what works on your account"],
                  ["AI help", "A writing assistant for captions", "Hooks, captions, scripts and designed posts"],
                  ["Your results", "Shown to you in analytics", "Used to build the next posts"],
                  ["Competitors", "Benchmarks on some plans", "Breakout posts turned into ideas"],
                  ["Autopilot", "No, you fill the queue", "Yes, a new post every few days"],
                  ["Best for", "People who enjoy making content", "People short on time to make it"],
                ]}
              />
              <p>
                Our <Link href="/" className={LINK}>AI social media agent</Link> is the second kind: it reads every post on
                your account, creates new posts in your brand kit, schedules them for your best times and can run on
                autopilot.
              </p>

              {/* ── Listicle: tools ── */}
              <h2 id="best-tools" className={H2}>The 4 Best Social Media Automation Tools for Small Businesses</h2>
              <p>
                These four cover what most small businesses need, and they suit different people. Facts and prices are from
                each company&apos;s own site, checked {checked}.
              </p>
              <div className="my-8 space-y-5">
                {TOOLS.map((tool, i) => (
                  <section key={tool.name} aria-labelledby={`tool-${i}`} className={`rounded-3xl border bg-white p-6 sm:p-7 ${i === 0 ? "border-social/40" : "border-hairline"}`}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 id={`tool-${i}`} className="text-2xl font-semibold tracking-[-0.01em] text-ink">
                        {i + 1}. {tool.name}
                      </h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${i === 0 ? "bg-social-soft text-social" : "bg-mist text-ink"}`}>{tool.type}</span>
                    </div>
                    <p className="mt-2 text-[15px] text-ink">
                      <span className="font-semibold">Best for:</span> {tool.bestFor}
                    </p>
                    <dl className="mt-5 grid gap-4 rounded-2xl bg-mist p-4 text-sm sm:grid-cols-3">
                      <div><dt className="mb-1 font-semibold text-ink">Free plan</dt><dd>{tool.free}</dd></div>
                      <div><dt className="mb-1 font-semibold text-ink">Paid from</dt><dd>{tool.price}</dd></div>
                      <div><dt className="mb-1 font-semibold text-ink">Posts to</dt><dd>{tool.posts}</dd></div>
                    </dl>
                    <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                      <div>
                        <p className="mb-2 font-semibold text-ink">Strengths</p>
                        <ul className="list-disc space-y-1 pl-5">{tool.strengths.map(s => <li key={s}>{s}</li>)}</ul>
                      </div>
                      <div>
                        <p className="mb-2 font-semibold text-ink">Limits</p>
                        <ul className="list-disc space-y-1 pl-5">{tool.limits.map(s => <li key={s}>{s}</li>)}</ul>
                      </div>
                    </div>
                    {hasCompare(tool.compare) && (
                      <Link href={comparePath(tool.compare!)} className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${LINK}`}>
                        Talk to me Data vs {tool.name}, compared in full <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    {i === 0 && (
                      <Link href="/agents/social-media" className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${LINK}`}>
                        See how the social media agent works <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </section>
                ))}
              </div>

              {/* ── How to ── */}
              <h2 id="how-to-automate-social-media" className={H2}>How to Automate Social Media in 5 Steps</h2>
              <p>Whatever tool you use, the order is the same. Get the first steps right and the rest gets easier.</p>
              <ol className="my-8 space-y-4">
                {[
                  {
                    t: "Find out what already works for you",
                    b: (
                      <>
                        Pull your last 30 to 60 posts and rank them by views and engagement. Look for the patterns in the top
                        ten: the first line, the format, the length and the topic. Our free{" "}
                        <Link href="/free-tools/social-media-analyzer" className={LINK}>social media page analyzer</Link> does
                        this for an Instagram account in a minute.
                      </>
                    ),
                  },
                  {
                    t: "Watch the competitors who are winning",
                    b: (
                      <>
                        Pick a handful of accounts in your niche and note their breakout posts, the ones that do several times
                        better than their usual. Our guide on{" "}
                        <Link href="/blog/how-to-spy-on-competitors-instagram" className={LINK}>tracking your competitors on Instagram</Link>{" "}
                        covers it in 7 steps.
                      </>
                    ),
                  },
                  {
                    t: "Set your brand once",
                    b: <>Save your logo, colours, fonts and a few rules about your tone, so every post looks and sounds like you without you checking the basics each time.</>,
                  },
                  {
                    t: "Create a week of posts, then review them",
                    b: (
                      <>
                        Turn your winning patterns into new posts and read every one before it goes out for the first few
                        weeks. Our guide to{" "}
                        <Link href="/blog/how-to-automate-social-media-posting-with-ai-agent" className={LINK}>automating social media posting with an AI agent</Link>{" "}
                        shows this step in detail, and{" "}
                        <Link href="/blog/how-to-build-social-media-ai-agent" className={LINK}>how to build a social media AI agent</Link>{" "}
                        shows how to make your own.
                      </>
                    ),
                  },
                  {
                    t: "Schedule it, then switch on autopilot when you trust it",
                    b: <>Connect your accounts through each platform&apos;s official sign-in and schedule the week. Once the posts you review need few changes, let the tool post on its own.</>,
                  },
                ].map((step, i) => (
                  <li key={step.t} className="flex gap-4 rounded-2xl border border-hairline p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">{i + 1}</span>
                    <div>
                      <h3 className="text-[17px] font-semibold text-ink">{step.t}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed">{step.b}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <SignupCta eyebrow="Let the agent do it" heading="Automate your social media this afternoon" accent="social">
                Start free, connect Instagram, TikTok, Facebook or X, and see the posts your agent creates from what already
                works for you. Autopilot starts on Solo.
              </SignupCta>

              {/* ── A week ── */}
              <h2 id="automated-week" className={H2}>What Does an Automated Week Look Like?</h2>
              <p>
                Here is what a week can look like for a small business posting three times a week with an AI agent. The agent
                does the repetitive work; you keep the decisions and the conversations.
              </p>
              <Table head={["Day", "The agent", "You"]} rows={WEEK.map(d => [d.day, d.agent, d.you])} />
              <p>
                Most of what&apos;s left for you is replying to people, which is the part worth your time anyway.
              </p>

              {/* ── Platforms ── */}
              <h2 id="platforms" className={H2}>How to Automate Each Platform</h2>
              <p>
                Every major platform lets approved tools publish for you through its official connection, so you never hand
                over a password. What works, and what you need, differs by platform:
              </p>
              <Table
                head={["Platform", "What to automate", "What tends to work", "What you need"]}
                rows={PLATFORMS.map(p => [p.name, p.automate, p.works, p.need])}
              />
              <p>
                For a full walkthrough on the platform most small businesses start with, read{" "}
                <Link href="/blog/how-to-automate-instagram-with-ai" className={LINK}>how to automate Instagram with AI</Link>.
              </p>

              {/* ── Never automate ── */}
              <h2 id="what-not-to-automate" className={H2}>What Should You Never Automate?</h2>
              <p>
                <strong className="text-ink">Never automate real conversations or fake engagement.</strong> Automation is for
                the work behind your posts, not for pretending to be present.
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong className="text-ink">Replies to complaints and sensitive messages.</strong> A drafted reply is fine; sending it without reading it isn&apos;t.</li>
                <li><strong className="text-ink">Automated likes, follows and comments.</strong> They break the platforms&apos; rules and can get your account restricted.</li>
                <li><strong className="text-ink">Reacting to the news.</strong> A scheduled post that lands at the wrong moment can do real damage.</li>
                <li><strong className="text-ink">Your face and voice.</strong> An agent can write the script; the people who follow you want to see you.</li>
              </ul>

              {/* ── Human ── */}
              <h2 id="keep-it-human" className={H2}>How Do You Keep Automated Posts Sounding Like You?</h2>
              <p>
                Build posts from your own best content, not from generic templates, and keep a human edit in the loop. The
                posts that feel automated are the ones written from nothing: vague hooks, stock phrases, the same structure
                every time.
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Feed the tool your real top posts and your own words, so it copies your style rather than the internet&apos;s.</li>
                <li>Add one specific detail to every post: a number, a customer moment, something that happened this week.</li>
                <li>Mix formats. Let the agent handle carousels and images, and film the talking videos yourself.</li>
                <li>Reply to comments yourself. That is where followers decide whether there&apos;s a person behind the account.</li>
              </ul>

              {/* ── Listicle: mistakes ── */}
              <h2 id="mistakes" className={H2}>7 Social Media Automation Mistakes to Avoid</h2>
              <ol className="my-6 space-y-3">
                {MISTAKES.map((m, i) => (
                  <li key={m.title} className="flex gap-5 rounded-2xl bg-mist p-5">
                    <span className="w-6 shrink-0 text-2xl font-semibold leading-none text-social">{i + 1}</span>
                    <div>
                      <h3 className="font-semibold text-ink">{m.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed">{m.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* ── Cost ── */}
              <h2 id="cost" className={H2}>How Much Does Social Media Automation Cost?</h2>
              <p>
                It depends on whether you only want scheduling or want the posts made too. Entry prices on each company&apos;s
                own site:
              </p>
              <Table head={["Tool", "Type", "Free plan", "Entry paid plan"]} rows={TOOLS.map(t => [t.name, t.type, t.free, t.price])} />
              <p className="text-sm">
                Sources: <a href="https://buffer.com/pricing" className={LINK} target="_blank" rel="noopener nofollow">Buffer</a>,{" "}
                <a href="https://later.com/pricing" className={LINK} target="_blank" rel="noopener nofollow">Later</a>,{" "}
                <a href="https://www.hootsuite.com/plans" className={LINK} target="_blank" rel="noopener nofollow">Hootsuite</a> and
                our <Link href="/pricing" className={LINK}>pricing page</Link>, checked {checked}. Prices exclude tax.
              </p>
              <p>
                A scheduler is the cheapest way to publish on time. An agent costs more than a basic scheduler because it also
                does the creating, which is usually the part that takes the hours.
              </p>

              {/* ── Guides ── */}
              <h2 id="guides" className={H2}>Go Deeper: Step-by-Step Guides</h2>
              <p>Each guide takes one part of the loop and walks through it, with the prompts you can copy.</p>
              <div className="my-6 grid gap-4 sm:grid-cols-2">
                {posts.map(post => (
                  <PostCard key={post.slug} post={post} compact />
                ))}
              </div>

              {SOCIAL_HUB.ourSetup && (
                <>
                  <h2 id="how-we-run-ours" className={H2}>How Do We Run Our Own Social Media?</h2>
                  <p>{SOCIAL_HUB.ourSetup}</p>
                </>
              )}
            </div>

            <FaqSection faqs={SOCIAL_HUB.faqs} />

            {comparisons.length > 0 && (
              <nav aria-label="Tool comparisons" className="mt-12 rounded-3xl border border-hairline p-6 sm:p-7">
                <p className="eyebrow mb-4">Compare tools</p>
                <ul className="grid gap-3 sm:grid-cols-3">
                  {comparisons.map(c => (
                    <li key={c.slug}>
                      <Link href={comparePath(c.slug)} className="group flex items-center justify-between rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-social-soft">
                        vs {c.competitor}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <aside aria-label="About the author" className="mt-6 flex gap-5 rounded-3xl border border-hairline bg-mist p-6 sm:p-7">
              <AuthorAvatar author={author} size={44} />
              <div>
                <p className="eyebrow">Written by</p>
                <Link href={authorUrl(author.id)} className="mt-1.5 block text-lg font-semibold text-ink hover:underline">
                  {author.name}
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-quiet">{author.bio}</p>
              </div>
            </aside>

            <SignupCta heading="Put your social media on autopilot" accent="social">
              Start free with 50 actions a month. Your agent studies your account, creates posts in your brand and, from
              Solo, schedules and posts them for you.
            </SignupCta>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <SidebarCta />
              <TableOfContents entries={toc} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
