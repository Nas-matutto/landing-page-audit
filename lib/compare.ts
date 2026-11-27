/**
 * Comparison pages (/compare/<slug>): Talk to me Data against one other tool.
 *
 * Every page is built to the same spec, docs/comparison-page-spec.md, and
 * rendered by app/compare/[slug]/page.tsx. This file holds all the copy, so
 * editing a page means editing its entry here.
 *
 * DRAFTS: a page with `reviewed: false` only renders in `next dev`. In
 * production it doesn't exist (404), it isn't in the sitemap or llms.txt, and
 * nothing links to it. Nas reads and rewrites each page in his own words, fills
 * in the HUMAN slots, then sets `reviewed: true`.
 *
 * HUMAN slots (`nasTake`, `weTried`, `customerQuote`): leave them empty ("" or
 * undefined) and they don't render. Only real experience goes in them. Never
 * fill them with made-up anecdotes.
 *
 * FACTS: every claim about a competitor comes from their own pricing page,
 * linked in `sources`, and was checked on `factsChecked`. Re-check every
 * quarter; prices change. Our own facts come from lib/pricing.ts; platforms
 * per Nas (2026-11-27): scheduled posting to Instagram, TikTok, Facebook and
 * X, LinkedIn on "Post now", Pinterest coming soon.
 */

import type { Faq } from "@/lib/blog"

export type CompareRow = { label: string; us: string; them: string }

export type Comparison = {
  slug: string
  competitor: string
  competitorUrl: string
  /** False until Nas has edited the page. Drafts only render in development. */
  reviewed: boolean
  /** H1. */
  title: string
  /** <title>, 60 characters or fewer. */
  seoTitle: string
  /** Meta description, 155 characters or fewer. */
  description: string
  /** The search this page is built to rank for. */
  keyword: string
  datePublished: string
  dateModified: string
  /** The day every competitor fact on the page was checked against their site. */
  factsChecked: string

  /** 40 to 60 words that answer "which should I pick?" on their own. */
  verdict: string
  /** HUMAN: Nas, first person. Why you'd pick one or the other, from your own use. */
  nasTake?: string
  /** HUMAN: what you saw when you actually tried the competitor. A real test only. */
  weTried?: string
  /** HUMAN: a real customer who switched or compared. Name and role as they agreed. */
  customerQuote?: { quote: string; name: string; role: string }

  /** One sentence per tool for the "at a glance" summary. */
  whatUs: string
  whatThem: string
  atAGlance: CompareRow[]
  /** "Which is better for creating posts?", paragraphs. */
  creating: string[]
  /** "Which is better for scheduling and autopilot?", paragraphs. */
  scheduling: string[]
  platforms: CompareRow[]
  pricingIntro: string
  pricing: CompareRow[]
  /** A worked example with real numbers, paragraphs. */
  costExample: string[]
  pickUsIf: string[]
  pickThemIf: string[]
  /** "Can you use both?", paragraphs. */
  together: string[]
  faqs: Faq[]
  sources: { label: string; url: string }[]
}

export const COMPARISONS: Comparison[] = [
  // ── Buffer ────────────────────────────────────────────────────────────────
  {
    slug: "buffer",
    competitor: "Buffer",
    competitorUrl: "https://buffer.com",
    reviewed: true,
    title: "Talk to me Data vs Buffer: AI Social Media Agent or Scheduler?",
    seoTitle: "Talk to me Data vs Buffer (2026): Which Should You Use?",
    description:
      "Talk to me Data vs Buffer compared on creating posts, scheduling, autopilot, platforms and price, with an honest verdict on who each one is for.",
    keyword: "Buffer alternative",
    datePublished: "2026-11-27",
    dateModified: "2026-11-27",
    factsChecked: "2026-11-27",

    verdict:
      "Pick Buffer if you already make your own posts and want a cheap, simple queue for a lot of platforms, including Threads, Bluesky and Mastodon. Pick Talk to me Data if you want the posts made for you: it studies what works on your account, creates posts in your brand, schedules them and can run on autopilot.",
    nasTake: "",
    weTried: "",

    whatUs:
      "Talk to me Data is an AI social media agent. It reads your account and your competitors, creates posts in your brand kit, schedules them for your best times and posts them for you, or runs on autopilot.",
    whatThem:
      "Buffer is a social media scheduler. You write and design the posts, then Buffer queues them and publishes them to the channels you connect, with an AI assistant to help refine your text.",
    atAGlance: [
      { label: "What it is", us: "An AI agent that makes and posts your content", them: "A scheduler for posts you make yourself" },
      { label: "Creates posts for you", us: "Yes: hooks, captions, scripts and designed carousels and images", them: "AI Assistant refines and repurposes text you write" },
      { label: "Learns from your account", us: "Yes, it builds posts from your best-performing posts", them: "Analytics and AI takeaways on how your posts performed" },
      { label: "Autopilot", us: "Yes, a new post every 7, 4, 3 or 2 days (from Solo)", them: "No, you fill the queue" },
      { label: "Competitor tracking", us: "Yes, it suggests accounts like yours and flags their breakout posts", them: "Not on Buffer's pricing page" },
      { label: "Free plan", us: "Yes: Starter, 50 actions a month", them: "Yes: 3 channels, 10 scheduled posts per channel" },
      { label: "Starting paid price", us: "$49 a month (Solo)", them: "$5 per channel a month, billed yearly (Essentials)" },
    ],
    creating: [
      "This is the biggest difference between the two. Buffer expects you to bring the post. You write the caption, make the image in Canva or upload a video, and Buffer's AI Assistant can help you rewrite or repurpose the text.",
      "Talk to me Data starts one step earlier. It reads every post on your account, works out which hooks, formats and topics win with your audience, and then writes and designs new posts from that: the hook, the caption, the script for a reel, and carousels and images in your brand kit (your logo, colours, font and layout). You can also just ask it for something, like a carousel about your new menu.",
      "So if writing and designing posts is the part that eats your week, Buffer won't take it off your plate. If you enjoy making the content and only need it published on time, Buffer does that well and costs less.",
    ],
    scheduling: [
      "Both tools schedule posts and publish them for you. Buffer gives you a queue per channel and a calendar, and on the Team plan adds approval workflows for teams.",
      "Talk to me Data plans each post into your best time slots and posts it at that time, or sends you an email reminder with the finished post if you'd rather post it yourself. The part Buffer doesn't have is autopilot: switch it on and the agent builds a new post every 7, 4, 3 or 2 days and posts it on schedule, without you filling a queue. Most people review every post at first and turn on autopilot once they trust it.",
    ],
    platforms: [
      { label: "Instagram", us: "Yes", them: "Yes (personal profiles get reminders, not auto-posting)" },
      { label: "TikTok", us: "Yes", them: "Yes" },
      { label: "Facebook", us: "Yes (Pages)", them: "Yes (Pages; groups get reminders)" },
      { label: "X", us: "Yes", them: "Yes" },
      { label: "Pinterest", us: "Coming soon", them: "Yes" },
      { label: "LinkedIn", us: "When you press Post now", them: "Yes" },
      { label: "YouTube", us: "Analyses your channel, doesn't post", them: "Yes (Shorts)" },
      { label: "Threads, Bluesky, Mastodon", us: "No (email reminder with the finished post)", them: "Yes" },
      { label: "Google Business Profile, Substack", us: "No", them: "Yes" },
    ],
    pricingIntro:
      "Buffer charges per channel. Talk to me Data charges for the work the agent does, in actions, with every agent included on every plan.",
    pricing: [
      { label: "Free plan", us: "Starter: 50 actions a month. Builds posts when you ask; doesn't post for you", them: "Free: 3 channels, 10 scheduled posts per channel, 1 user" },
      { label: "Entry plan", us: "Solo: $49 a month, 450 actions (about 40 finished posts), autopilot and posting", them: "Essentials: $5 per channel a month billed yearly ($60 a year per channel); monthly billing costs more" },
      { label: "Next plan up", us: "Grow: $99 a month, 900 actions", them: "Team: $10 per channel a month billed yearly ($120 a year per channel), unlimited team members" },
      { label: "Top self-serve plan", us: "Scale: $199 a month, 1,800 actions", them: "Team, with lower per-channel prices above 10 channels" },
      { label: "Free trial", us: "Starter is free forever", them: "14 days on paid plans" },
    ],
    costExample: [
      "Take a small business posting 3 times a week (about 13 posts a month) to Instagram, TikTok and Facebook.",
      "On Buffer Essentials that's 3 channels at $5, so $15 a month on yearly billing. You still write, design and film every one of those 13 posts yourself.",
      "On Talk to me Data, a finished post (from idea to designed) is about 11 actions, so 13 posts is about 143 actions. That fits in Solo's 450 actions for $49 a month, and posting them costs no extra actions. The agent makes the posts as well as publishing them.",
      "Buffer is cheaper for scheduling. The real question is whether you want to keep making the posts yourself.",
    ],
    pickUsIf: [
      "You want the posts created for you, not just scheduled",
      "You post mainly to Instagram, TikTok, Facebook and X",
      "You want posts built from what already works on your account",
      "You want it to run on autopilot once you trust it",
      "You want to keep an eye on competitors' breakout posts",
    ],
    pickThemIf: [
      "You already make your own content and only need a queue",
      "You post to Threads, Bluesky, Mastodon or Google Business Profile",
      "You need approval workflows for a team",
      "You want the lowest price for scheduling to a few channels",
    ],
    together: [
      "Yes. Some people let Talk to me Data create and post to Instagram, TikTok, Facebook and X, and keep Buffer for the channels we don't post to, like Threads or Bluesky. Talk to me Data can email you each finished post, so you can drop it into your Buffer queue for those channels.",
    ],
    faqs: [
      {
        question: "Is Talk to me Data a good Buffer alternative?",
        answer:
          "It is if you want your posts created as well as scheduled. Buffer publishes posts you make yourself. Talk to me Data studies your account, writes and designs posts in your brand, schedules them and can run on autopilot. If you only need a cheap queue for many platforms, Buffer is the better fit.",
      },
      {
        question: "Is Buffer free?",
        answer:
          "Buffer has a free plan for up to 3 channels, with 10 scheduled posts per channel and 1 user. Paid plans start at $5 per channel a month on yearly billing (Essentials), as listed on Buffer's pricing page in November 2026.",
      },
      {
        question: "Does Buffer create posts with AI?",
        answer:
          "Buffer's AI Assistant helps you refine and repurpose text you've written, and it suggests replies. It doesn't study your account and create finished, designed posts for you. That is what an AI social media agent like Talk to me Data does.",
      },
      {
        question: "Can Talk to me Data post to X and Threads?",
        answer:
          "It posts to X on a schedule or on autopilot, as it does to Instagram, TikTok and Facebook, and to LinkedIn when you press Post now. Pinterest is coming soon. It doesn't post to Threads yet: for platforms it doesn't post to, it emails you the finished post so you can share it yourself or add it to a scheduler like Buffer.",
      },
      {
        question: "Which is cheaper, Buffer or Talk to me Data?",
        answer:
          "Buffer is cheaper for scheduling alone: 3 channels on Essentials cost $15 a month on yearly billing. Talk to me Data's Solo plan is $49 a month, but that includes creating about 40 finished posts, not just publishing them.",
      },
      {
        question: "Can I use Buffer and Talk to me Data together?",
        answer:
          "Yes. A common setup is Talk to me Data for creating and posting to Instagram, TikTok, Facebook and X, and Buffer for platforms Talk to me Data doesn't post to, such as Threads and Bluesky.",
      },
    ],
    sources: [{ label: "Buffer pricing (plans, channels and platforms)", url: "https://buffer.com/pricing" }],
  },

  // ── Later ─────────────────────────────────────────────────────────────────
  {
    slug: "later",
    competitor: "Later",
    competitorUrl: "https://later.com",
    reviewed: true,
    title: "Talk to me Data vs Later: Which Is Better for Instagram and TikTok?",
    seoTitle: "Talk to me Data vs Later (2026): Which Should You Use?",
    description:
      "Talk to me Data vs Later compared on creating posts, scheduling, autopilot, competitor tracking and price, with an honest verdict on who each one suits.",
    keyword: "Later alternative",
    datePublished: "2026-11-27",
    dateModified: "2026-11-27",
    factsChecked: "2026-11-27",

    verdict:
      "Pick Later if you make your own content and want a visual planner with posting to Threads, Snapchat and YouTube, plus deep analytics. Pick Talk to me Data if you want the posts made for you: it learns what works on your account, creates posts in your brand, schedules them and can run on autopilot, with a free plan to start.",
    nasTake: "",
    weTried: "",

    whatUs:
      "Talk to me Data is an AI social media agent. It reads your account and your competitors, creates posts in your brand kit, schedules them for your best times and posts them for you, or runs on autopilot.",
    whatThem:
      "Later is a social media planner and scheduler with a visual calendar, analytics and an AI caption writer. You create the posts; Later plans and publishes them.",
    atAGlance: [
      { label: "What it is", us: "An AI agent that makes and posts your content", them: "A visual planner and scheduler for posts you make" },
      { label: "Creates posts for you", us: "Yes: hooks, captions, scripts and designed carousels and images", them: "AI Caption Writer and Ideas, paid in AI credits (1 credit = 1 caption or 3 ideas)" },
      { label: "Learns from your account", us: "Yes, it builds posts from your best-performing posts", them: "Analytics, from 3 months of history (Starter) to 2 years (Scale)" },
      { label: "Autopilot", us: "Yes, a new post every 7, 4, 3 or 2 days (from Solo)", them: "No, you plan each post" },
      { label: "Competitor tracking", us: "Yes, on every plan", them: "Competitive benchmarking on Scale only, up to 20 competitors" },
      { label: "Free plan", us: "Yes: Starter, 50 actions a month", them: "No, a 14-day free trial" },
      { label: "Starting paid price", us: "$49 a month (Solo)", them: "$18.75 a month billed yearly, $25 billed monthly (Starter)" },
    ],
    creating: [
      "Later is built around planning. You upload your photos and videos, edit them, arrange them on a visual calendar and see how your Instagram grid will look. Its AI Caption Writer can draft captions and ideas, paid for in AI credits: 5 a month on Starter, 50 on Growth and 100 on Scale.",
      "Talk to me Data starts from your results instead of a blank calendar. It reads every post on your account, works out which hooks, formats and topics win, and creates new posts from that: the hook, caption and reel script, plus carousels and images designed in your brand kit. You can also ask for something specific in plain English.",
      "If you enjoy making content and want a great planner, Later is strong. If making the content is the bottleneck, Talk to me Data takes that part on.",
    ],
    scheduling: [
      "Both publish for you. Later auto-publishes to Instagram (business or creator accounts), TikTok, Facebook, Threads, Pinterest and LinkedIn, and meters scheduled posts per profile: 30 a month on Starter, 180 on Growth and unlimited on Scale.",
      "Talk to me Data plans each post into your best time slots and posts it then, or emails you the finished post to share yourself. It also has autopilot, which Later doesn't: the agent builds a new post every 7, 4, 3 or 2 days and posts it on schedule without you planning each one.",
    ],
    platforms: [
      { label: "Instagram", us: "Yes", them: "Yes (business or creator accounts)" },
      { label: "TikTok", us: "Yes", them: "Yes" },
      { label: "Facebook", us: "Yes (Pages)", them: "Yes" },
      { label: "X", us: "Yes", them: "Not listed on Later's pricing page" },
      { label: "Pinterest", us: "Coming soon", them: "Yes" },
      { label: "LinkedIn", us: "When you press Post now", them: "Yes" },
      { label: "Threads", us: "No (email reminder with the finished post)", them: "Yes" },
      { label: "YouTube", us: "Analyses your channel, doesn't post", them: "Supported" },
      { label: "Snapchat", us: "No", them: "Supported" },
    ],
    pricingIntro:
      "Later charges by plan, with social sets (up to 8 profiles, one per platform), users and posts per profile capped on each. Talk to me Data charges for the work the agent does, in actions.",
    pricing: [
      { label: "Free plan", us: "Starter: 50 actions a month. Builds posts when you ask; doesn't post for you", them: "None. 14-day free trial" },
      { label: "Entry plan", us: "Solo: $49 a month, 450 actions (about 40 finished posts), autopilot and posting", them: "Starter: $18.75 a month billed yearly ($25 monthly). 1 social set, 1 user, 30 posts per profile a month" },
      { label: "Next plan up", us: "Grow: $99 a month, 900 actions", them: "Growth: $37.50 a month billed yearly ($50 monthly). 2 social sets, 2 users, 180 posts per profile" },
      { label: "Top self-serve plan", us: "Scale: $199 a month, 1,800 actions", them: "Scale: $82.50 a month billed yearly ($110 monthly). 6 social sets, 4 users, unlimited posts" },
      { label: "Competitor tracking", us: "Every plan", them: "Scale only" },
    ],
    costExample: [
      "Take a small business posting 3 times a week (about 13 posts a month) to Instagram, TikTok and Facebook.",
      "Later Starter covers that for $18.75 a month on yearly billing, or $25 monthly, since it allows 30 posts per profile. You create every post yourself, with 5 AI credits a month for captions.",
      "On Talk to me Data, a finished post is about 11 actions, so 13 posts is about 143 actions. That fits in Solo's 450 actions for $49 a month, and the agent creates the posts as well as publishing them. If you want competitor tracking on Later, that's the Scale plan at $82.50 a month billed yearly.",
    ],
    pickUsIf: [
      "You want the posts created for you, not just planned",
      "You want posts built from what already works on your account",
      "You want autopilot once you trust it",
      "You want competitor tracking without paying for a top plan",
      "You post to X as well as Instagram, TikTok and Facebook",
    ],
    pickThemIf: [
      "You make your own content and love a visual grid planner",
      "You post to Threads or Snapchat",
      "You want long analytics history and Meta Ads analytics",
      "You manage several brands with a small team on one plan",
    ],
    together: [
      "You can. Talk to me Data can create the posts and email each finished one to you, and you can plan them in Later alongside the rest of your calendar, for example on Threads where Talk to me Data doesn't post. Most people end up using one tool for posting, though, so they aren't paying twice for scheduling.",
    ],
    faqs: [
      {
        question: "Is Talk to me Data a good Later alternative?",
        answer:
          "It is if you want your posts created for you. Later is a planner and scheduler for content you make. Talk to me Data studies your account, creates posts in your brand, schedules them and can run on autopilot. If you want a visual grid planner for content you shoot yourself, Later is the better fit.",
      },
      {
        question: "Is Later free?",
        answer:
          "No. Later has a 14-day free trial and no free plan. Paid plans start at $18.75 a month on yearly billing (Starter), according to Later's pricing page in November 2026. Talk to me Data has a free Starter plan with 50 actions a month.",
      },
      {
        question: "Does Later create posts with AI?",
        answer:
          "Later's AI Caption Writer drafts captions and content ideas, paid for with AI credits (5 a month on Starter). It doesn't create finished, designed posts from your account's results. Talk to me Data writes the hook, caption and script and designs carousels and images in your brand kit.",
      },
      {
        question: "Which is better for Instagram, Later or Talk to me Data?",
        answer:
          "Later is better if you want to plan your grid visually and post content you make yourself. Talk to me Data is better if you want an agent to find what works on your Instagram, create new posts from it and post them for you on schedule or on autopilot.",
      },
      {
        question: "Does Later have competitor tracking?",
        answer:
          "Later offers competitive benchmarking for up to 20 competitors on its Scale plan only. Talk to me Data includes competitor tracking on every plan: it suggests accounts like yours and flags their breakout posts.",
      },
      {
        question: "Which is cheaper, Later or Talk to me Data?",
        answer:
          "For scheduling alone, Later is cheaper: Starter is $18.75 a month on yearly billing. Talk to me Data's paid plans start at $49 a month, which includes creating about 40 finished posts and competitor tracking, and it has a free plan to start.",
      },
    ],
    sources: [{ label: "Later pricing (plans, limits and platforms)", url: "https://later.com/pricing" }],
  },

  // ── Hootsuite ─────────────────────────────────────────────────────────────
  {
    slug: "hootsuite",
    competitor: "Hootsuite",
    competitorUrl: "https://www.hootsuite.com",
    reviewed: true,
    title: "Talk to me Data vs Hootsuite: Which Is Better for a Small Business?",
    seoTitle: "Talk to me Data vs Hootsuite (2026): Which Should You Use?",
    description:
      "Talk to me Data vs Hootsuite compared on creating posts, scheduling, autopilot, competitor tracking and price for small businesses, with an honest verdict.",
    keyword: "Hootsuite alternative",
    datePublished: "2026-11-27",
    dateModified: "2026-11-27",
    factsChecked: "2026-11-27",

    verdict:
      "Pick Hootsuite if you're a team or agency that needs one place for publishing, an inbox, approvals and reporting across many accounts, and the budget for per-user pricing. Pick Talk to me Data if you're a small business that wants the posts made and posted for you, from $49 a month or free to start.",
    nasTake: "",
    weTried: "",

    whatUs:
      "Talk to me Data is an AI social media agent. It reads your account and your competitors, creates posts in your brand kit, schedules them for your best times and posts them for you, or runs on autopilot.",
    whatThem:
      "Hootsuite is a social media management platform for teams: scheduling, an inbox for messages, analytics, competitor benchmarking and an AI assistant called Wisdom, priced per user.",
    atAGlance: [
      { label: "What it is", us: "An AI agent that makes and posts your content", them: "A management platform for social teams" },
      { label: "Creates posts for you", us: "Yes: hooks, captions, scripts and designed carousels and images", them: "Wisdom AI generates posts, images, captions and hashtags (100 AI credits a month)" },
      { label: "Learns from your account", us: "Yes, it builds posts from your best-performing posts", them: "Post performance reports and analytics" },
      { label: "Autopilot", us: "Yes, a new post every 7, 4, 3 or 2 days (from Solo)", them: "No, you schedule each post" },
      { label: "Competitor tracking", us: "Yes, on every plan", them: "Benchmarking: 5 competitors on Standard, 20 on Professional and up" },
      { label: "Free plan", us: "Yes: Starter, 50 actions a month", them: "No, a 14-day free trial" },
      { label: "Starting paid price", us: "$49 a month (Solo)", them: "$99 per user a month billed yearly, $149 billed monthly (Standard)" },
    ],
    creating: [
      "Hootsuite's AI assistant, Wisdom, can generate posts and images, improve captions and suggest hashtags, with 100 AI credits a month on paid plans. It also includes Canva and Adobe Express templates. You still decide what to post and put each one together.",
      "Talk to me Data works from your results. It reads every post on your account, works out which hooks, formats and topics win with your audience, and creates new posts from that, designed in your brand kit. It can also find competitors in your niche and turn their breakout posts into ideas for you.",
    ],
    scheduling: [
      "Hootsuite schedules and publishes unlimited posts on every paid plan, with bulk scheduling, an inbox for replies and, on Advanced, approvals and team features. It's built for teams managing many accounts.",
      "Talk to me Data plans each post into your best time slots and posts it then, or emails you the finished post. It adds autopilot, which Hootsuite doesn't have: the agent builds a new post every 7, 4, 3 or 2 days and posts it on schedule.",
    ],
    platforms: [
      { label: "Instagram", us: "Yes", them: "Yes" },
      { label: "TikTok", us: "Yes", them: "Yes" },
      { label: "Facebook", us: "Yes (Pages)", them: "Yes" },
      { label: "X", us: "Yes", them: "Yes" },
      { label: "Pinterest", us: "Coming soon", them: "Yes" },
      { label: "LinkedIn", us: "When you press Post now", them: "Yes" },
      { label: "YouTube", us: "Analyses your channel, doesn't post", them: "Yes" },
      { label: "Threads", us: "No (email reminder with the finished post)", them: "Yes" },
      { label: "WhatsApp", us: "No", them: "Yes" },
    ],
    pricingIntro:
      "Hootsuite charges per user, so the price grows with your team. Talk to me Data charges for the work the agent does, in actions, with every agent included.",
    pricing: [
      { label: "Free plan", us: "Starter: 50 actions a month. Builds posts when you ask; doesn't post for you", them: "None. 14-day free trial" },
      { label: "Entry plan", us: "Solo: $49 a month, 450 actions (about 40 finished posts), autopilot and posting", them: "Standard: $99 per user a month billed yearly ($149 monthly). Up to 10 social accounts" },
      { label: "Next plan up", us: "Grow: $99 a month, 900 actions", them: "Professional: $199 per user a month billed yearly ($299 monthly). Unlimited accounts" },
      { label: "Top self-serve plan", us: "Scale: $199 a month, 1,800 actions", them: "Advanced: $399 per user a month billed yearly ($499 monthly)" },
      { label: "Larger teams", us: "AI Native: unlimited agents, priced around your workflows", them: "Enterprise: custom pricing" },
    ],
    costExample: [
      "Take a small business with one person posting 3 times a week (about 13 posts a month) to Instagram, TikTok and Facebook.",
      "On Hootsuite Standard that's $99 a month on yearly billing ($1,188 a year), or $149 billed monthly, for one user. You create the posts, with Wisdom's AI credits to help.",
      "On Talk to me Data, a finished post is about 11 actions, so 13 posts is about 143 actions. That fits in Solo's 450 actions for $49 a month, and the agent creates the posts as well as posting them. For a solo owner or a small team, that's about half the price of Hootsuite's entry plan.",
    ],
    pickUsIf: [
      "You're a small business or creator, not a social media team",
      "You want the posts created for you, not just scheduled",
      "You want autopilot once you trust it",
      "You want competitor tracking without per-user pricing",
      "You want a free plan to try it on your own account",
    ],
    pickThemIf: [
      "You're a team or agency managing many accounts and clients",
      "You need a shared inbox, approvals and custom reports",
      "You post to Threads, YouTube or WhatsApp",
      "You need enterprise features like ROI reporting and advanced listening",
    ],
    together: [
      "It's possible, but rarely worth paying for both. Teams that already run Hootsuite for their inbox and reporting sometimes use Talk to me Data to create the posts, and Talk to me Data can email each finished post for the team to schedule in Hootsuite.",
    ],
    faqs: [
      {
        question: "Is Talk to me Data a good Hootsuite alternative?",
        answer:
          "For small businesses and creators, yes. Hootsuite is a platform for social teams, priced per user. Talk to me Data is an AI agent that creates your posts, schedules them and can run on autopilot, from $49 a month. Teams that need a shared inbox, approvals and reporting are better served by Hootsuite.",
      },
      {
        question: "How much does Hootsuite cost?",
        answer:
          "Hootsuite's Standard plan is $99 per user a month on yearly billing, or $149 billed monthly. Professional is $199 ($299 monthly) and Advanced $399 ($499 monthly), per user. Enterprise is custom. These are the prices on Hootsuite's plans page in November 2026.",
      },
      {
        question: "Does Hootsuite have a free plan?",
        answer:
          "No. Hootsuite offers a 14-day free trial on its Standard, Professional and Advanced plans, with posting limits during the trial. Talk to me Data has a free Starter plan with 50 actions a month and no card required.",
      },
      {
        question: "Does Hootsuite create posts with AI?",
        answer:
          "Hootsuite's Wisdom AI can generate posts and images, improve captions and suggest hashtags, with 100 AI credits a month. Talk to me Data goes further for small businesses: it studies what works on your account and creates finished posts in your brand kit, then posts them for you.",
      },
      {
        question: "Which has better competitor tracking?",
        answer:
          "Hootsuite benchmarks 5 competitors on Standard and 20 on Professional and above, with reporting built for teams. Talk to me Data suggests competitors in your niche, flags their breakout posts and turns the patterns into post ideas, on every plan.",
      },
      {
        question: "Is Hootsuite worth it for a small business?",
        answer:
          "It can be if several people manage many accounts and need an inbox and approvals. For one person or a small team that mainly needs posts made and published to Instagram, TikTok and Facebook, Hootsuite's per-user price is hard to justify next to an AI agent at $49 a month.",
      },
    ],
    sources: [
      { label: "Hootsuite plans and pricing", url: "https://www.hootsuite.com/plans" },
      { label: "Hootsuite supported networks", url: "https://www.hootsuite.com/products/mobile-apps" },
    ],
  },
]

/** Drafts render while developing, so Nas can preview and edit them, but never in production. */
export function isVisible(c: Comparison): boolean {
  return c.reviewed || process.env.NODE_ENV === "development"
}

export function getVisibleComparisons(): Comparison[] {
  return COMPARISONS.filter(isVisible)
}

/** Reviewed pages only: these are the ones that go in the sitemap and llms.txt. */
export function getLiveComparisons(): Comparison[] {
  return COMPARISONS.filter(c => c.reviewed)
}

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find(c => c.slug === slug)
}

export const comparePath = (slug: string) => `/compare/${slug}`
