import type { Metadata } from "next"
import { format, parseISO } from "date-fns"
import { authorUrl, getAuthor } from "@/lib/authors"

/**
 * Single source of truth for the blog. The index page, category hubs, author
 * pages, sitemap, RSS feed and every post's metadata + JSON-LD read from here,
 * so a post's title, dates and cover only ever live in one place.
 *
 * To add a post: add an entry to POSTS, then create app/blog/<slug>/page.tsx
 * that exports `metadata = buildPostMetadata(SLUG)` and wraps its body in
 * <BlogPostShell slug={SLUG}>. Follow docs/blog-writing-standard.md.
 */

export const SITE_URL = "https://talktomedata.com"
export const SITE_NAME = "Talk to Me Data"

export type CategoryId =
  | "ai-agents"
  | "social-media-automation"
  | "seo-automation"
  | "business-automation"
  | "lead-generation"
  | "conversion-optimization"

export type Category = {
  id: CategoryId
  name: string
  /** H1 and <title> of the hub page — phrased as the cluster's head keyword. */
  heading: string
  description: string
  /** Hub intro copy, one string per paragraph. */
  intro: string[]
}

export const CATEGORIES: Category[] = [
  {
    id: "ai-agents",
    name: "AI Agents",
    heading: "AI Agents: Guides for Business Owners",
    description:
      "What AI agents are, how they work, and how to build one: plain-English guides with real prompts, tools and examples for small and medium businesses.",
    intro: [
      "An AI agent is software that is given a goal, reasons about how to reach it, and takes actions on its own: it reads data, calls tools like your CRM, inbox or Google Sheets, checks its work and keeps going until the task is done. That is the difference from a chatbot, which only answers the message in front of it.",
      "These guides start from the basics (what AI agents are, how they differ from chatbots and rule-based automation such as Zapier) and move to hands-on builds. Each build guide includes the exact prompt we use, the tools it connects to, and the limits you should know about before you rely on it in production.",
    ],
  },
  {
    id: "social-media-automation",
    name: "Social Media Automation",
    heading: "How to Automate Social Media With AI",
    description:
      "Guides to automating social media with AI agents: analyze what performs, plan content, and create posts, captions, images and videos for every platform.",
    intro: [
      "Automating social media with AI means handing the repetitive loop (checking what performed, deciding what to post next, writing captions, producing images and video, scheduling) to an AI agent that works from your real account data instead of generic templates.",
      "The guides below cover both halves: analyzing your existing content to find the hooks and formats that work, and running a fully autonomous agent that plans and produces posts for Instagram, TikTok, LinkedIn, YouTube, X and Facebook. Every guide includes the prompt so you can build it yourself.",
    ],
  },
  {
    id: "seo-automation",
    name: "SEO & GEO Automation",
    heading: "How to Automate SEO and GEO With AI",
    description:
      "How to automate SEO and GEO (generative engine optimization) with AI agents: Search Console analysis, keyword gaps and content that ranks and gets cited.",
    intro: [
      "Most of SEO is repetitive analysis and production: pulling Google Search Console data, spotting queries stuck on page two, fixing titles with weak click-through rates, then writing and publishing content against the gaps. An AI agent can run that loop every week from your real data.",
      "GEO, or generative engine optimization, is the newer half of the job: structuring content so that ChatGPT, Perplexity, Gemini and Google's AI Overviews quote and cite it. These guides show how to automate both, with the prompts we use in production.",
    ],
  },
  {
    id: "business-automation",
    name: "Business Automation",
    heading: "Automate Business Operations With AI Agents",
    description:
      "Step-by-step guides to automating customer service, data entry, reporting and invoice processing with AI agents, each with the exact prompt to copy.",
    intro: [
      "Customer support, data entry, reporting and invoice processing are high-volume, rule-driven and well suited to AI agents. These are the workflows where small teams typically get the most hours back first.",
      "Each guide walks through how the agent works end to end, which tools it connects to (Google Sheets, QuickBooks, your CRM, your website chat), and gives you the full prompt to copy.",
    ],
  },
  {
    id: "lead-generation",
    name: "Lead Generation",
    heading: "AI Lead Generation Guides",
    description:
      "How to find, qualify and research B2B leads with AI agents and intent signals, and turn them into personalized outreach that gets replies.",
    intro: [
      "AI agents can now do the slow parts of B2B lead generation: scraping and filtering prospect lists, verifying emails, researching each company for a real buying signal and drafting a first message that references it.",
      "These guides cover building a lead-finding agent and using intent signals to prioritize the accounts most likely to buy.",
    ],
  },
  {
    id: "conversion-optimization",
    name: "Conversion Optimization",
    heading: "Website Conversion Optimization Guides",
    description:
      "Practical guides to raising your website conversion rate: landing page checklists, page speed, conversion analysis and patterns from top startup sites.",
    intro: [
      "Traffic only matters if it converts. These guides cover how to diagnose where visitors drop off, what every high-converting landing page includes, how page speed affects sign-ups, and the patterns shared by the best Y Combinator startup websites.",
    ],
  },
]

export type BlogPost = {
  slug: string
  /** Display title, used as the H1. */
  title: string
  /** <title> tag when the H1 is too long or not keyword-led. Aim for ≤ 60 chars. */
  seoTitle?: string
  /** Meta description. Aim for ≤ 155 chars. */
  description: string
  /** Card copy on the blog index and hubs. */
  excerpt: string
  category: CategoryId
  author: string
  /** ISO dates. Bump dateModified only when the content meaningfully changes. */
  datePublished: string
  dateModified: string
  readMinutes: number
  cover: { src: string; alt: string; width: number; height: number }
  keywords: string[]
  /** Pillar posts anchor a topic cluster; the newest one is featured on /blog. */
  pillar?: boolean
  /** The commercial page this guide supports — linked from the post. */
  agentPage?: { href: string; label: string }
  /** A YouTube walkthrough embedded in the post, emitted as VideoObject. */
  video?: { youtubeId: string; title: string; description: string }
}

const COVER = { width: 1200, height: 630 }

export const POSTS: BlogPost[] = [
  {
    slug: "how-to-build-an-ai-agent",
    title: "How to Build an AI Agent: A Step-by-Step Guide for 2026",
    seoTitle: "How to Build an AI Agent (Step-by-Step Guide, 2026)",
    description:
      "How to build an AI agent step by step: pick a workflow, write the instructions, connect tools with MCP, test it and run it. No-code and code options compared.",
    excerpt:
      "The four parts every AI agent needs, three ways to build one (no-code in Claude, n8n/Make, or code), and the six steps we follow for every agent we build, with example instructions to copy.",
    category: "ai-agents",
    author: "nas",
    datePublished: "2026-10-01",
    dateModified: "2026-10-01",
    readMinutes: 12,
    cover: {
      src: "/blog/how-to-build-an-ai-agent/ai-agent-prompt-to-completed-tasks.png",
      alt: "A plain-language instruction to an AI agent and the tasks it completes: lead captured, qualified and call booked",
      width: 1986,
      height: 1247,
    },
    keywords: ["how to build an AI agent", "build AI agent", "how to create an AI agent", "AI agent tutorial", "no-code AI agent", "Claude AI agent", "MCP"],
    pillar: true,
    agentPage: { href: "/agents", label: "Skip the build: browse ready-built AI agents" },
    video: {
      youtubeId: "fFKQb1RacLI",
      title: "How to build an AI agent from scratch",
      description: "Building an AI agent from scratch in Claude: creating a Project, writing instructions, connecting tools and running the workflow.",
    },
  },
  {
    slug: "what-are-ai-agents",
    title: "What Are AI Agents? A Plain-English Guide for Business Owners",
    description:
      "AI agents are software that reasons, uses tools and completes multi-step tasks on its own. Learn how they work, the main types, and real business uses.",
    excerpt:
      "AI agents go far beyond chatbots. This guide explains what they are, how they work, the different types, and what they can realistically do for your business today, plus a 10-question quiz to test your knowledge.",
    category: "ai-agents",
    author: "nas",
    datePublished: "2026-06-16",
    dateModified: "2026-10-01",
    readMinutes: 14,
    cover: { src: "/AI_Agents_Quiz.png", alt: "What are AI agents: a plain-English guide with a quiz to test your knowledge", ...COVER },
    keywords: ["what are AI agents", "AI agents explained", "how do AI agents work", "AI agent vs chatbot", "types of AI agents", "agentic AI"],
    pillar: true,
    agentPage: { href: "/agents", label: "Browse ready-built AI agents" },
  },
  {
    slug: "how-to-automate-social-media-posting-with-ai-agent",
    title: "How to Automate Social Media Posting with an AI Agent",
    seoTitle: "How to Automate Social Media with AI: Step-by-Step Guide",
    description:
      "How to automate social media with an AI agent that analyzes your channels, plans content, and creates posts, images and captions for every platform.",
    excerpt:
      "A step-by-step guide to an AI agent that analyzes your channels and competitors, builds a data-driven content plan, and creates the images, videos, and captions for every platform, then saves them to your folder. Runs independently, no human intervention.",
    category: "social-media-automation",
    author: "nas",
    datePublished: "2026-07-23",
    dateModified: "2026-10-01",
    readMinutes: 13,
    cover: { src: "/blog/social-media-ai-agent-cover.png", alt: "AI social media agent creating images, videos and captions for Instagram, TikTok, LinkedIn, YouTube, X and Facebook", ...COVER },
    keywords: ["how to automate social media", "automate social media posting", "AI social media automation", "social media AI agent", "AI content calendar", "automate Instagram posts"],
    pillar: true,
    agentPage: { href: "/agents/social-media", label: "The Social Media AI Agent: built and hosted for you" },
  },
  {
    slug: "how-to-automate-data-entry-and-reporting-with-ai-agent",
    title: "How to Automate Data Entry and Reporting With an AI Agent (With the Exact Prompt)",
    seoTitle: "How to Automate Data Entry and Reporting With an AI Agent",
    description:
      "Automate data entry and reporting with an AI agent that pulls data from your tools, cleans it, fills Google Sheets or your CRM, and sends scheduled reports.",
    excerpt:
      "An AI agent that pulls data from your tools, cleans and structures it, enters it into Google Sheets or your CRM, and generates ready-to-share reports on a schedule. Includes the full prompt to copy.",
    category: "business-automation",
    author: "nas",
    datePublished: "2026-07-23",
    dateModified: "2026-07-23",
    readMinutes: 10,
    cover: { src: "/Data_entry_and_reporting.png", alt: "AI agent pulling data from business tools into a structured sheet and an auto-generated report", ...COVER },
    keywords: ["automate data entry", "automate reporting", "AI data entry agent", "automate Google Sheets", "automated business reports"],
    agentPage: { href: "/agents/data-entry-reporting", label: "The Data Entry & Reporting AI Agent" },
  },
  {
    slug: "how-to-automate-customer-service-with-ai-agent",
    title: "How to Automate Customer Service With an AI Agent (With the Exact Prompt)",
    seoTitle: "How to Automate Customer Service With an AI Agent",
    description:
      "Set up an AI agent that answers customer questions in your website chat, logs every request to Google Sheets, ranks it by urgency and drafts a reply.",
    excerpt:
      "An AI agent that lives in your website chat bubble, answers common questions instantly, logs every request to Google Sheets, ranks them by urgency, and drafts a recommended solution for your team. Includes the full prompt to copy.",
    category: "business-automation",
    author: "nas",
    datePublished: "2026-07-22",
    dateModified: "2026-07-22",
    readMinutes: 10,
    cover: { src: "/Customer_support_example.png", alt: "AI customer support agent in a website chat bubble triaging requests into a ranked Google Sheet with recommended solutions", ...COVER },
    keywords: ["automate customer service", "AI customer service agent", "AI customer support", "AI chatbot for website", "support ticket triage"],
    agentPage: { href: "/agents/customer-support", label: "The Customer Support AI Agent" },
  },
  {
    slug: "how-to-automate-seo-and-geo-growth-with-ai-agent",
    title: "How to Automate SEO (and GEO) With an AI Agent",
    seoTitle: "How to Automate SEO With AI (and Get Cited by AI Search)",
    description:
      "How to automate SEO with an AI agent that reads Google Search Console, finds keywords you can rank for, and writes and publishes SEO- and GEO-ready content.",
    excerpt:
      "An AI agent that reads your Google Search Console data, finds the keywords you can rank higher for, and writes and publishes SEO- and GEO-optimized content on autopilot, on request or automatically every week.",
    category: "seo-automation",
    author: "nas",
    datePublished: "2026-07-17",
    dateModified: "2026-10-01",
    readMinutes: 11,
    cover: { src: "/blog/Google_Search_Console_Ggraph_GEO.png", alt: "Google Search Console clicks and impressions climbing after an AI SEO and GEO agent takes over", ...COVER },
    keywords: ["how to automate SEO", "automate SEO with AI", "AI SEO agent", "generative engine optimization", "GEO", "Google Search Console automation", "AI Overviews optimization"],
    pillar: true,
    agentPage: { href: "/agents/seo-geo", label: "The SEO & GEO AI Agent: built, hosted and managed" },
    video: {
      youtubeId: "aT3CD-h4TsE",
      title: "How to automate SEO and GEO growth with an AI agent",
      description: "An AI agent reads Google Search Console data, finds ranking opportunities and writes SEO- and GEO-optimized content.",
    },
  },
  {
    slug: "how-to-automate-invoices-into-accounting-software",
    title: "How to Automate Invoices Into Your Accounting Software (With the Exact Prompt)",
    seoTitle: "How to Automate Invoices Into Accounting Software With AI",
    description:
      "Use an AI agent to scan PDF and paper invoices, extract vendor, line items and totals, and enter them into QuickBooks or any accounting software.",
    excerpt:
      "An AI agent that scans PDF invoices, extracts the vendor, line items, and pricing, and auto-populates them into QuickBooks, or any other accounting software. Includes the full prompt to copy.",
    category: "business-automation",
    author: "nas",
    datePublished: "2026-07-10",
    dateModified: "2026-07-10",
    readMinutes: 9,
    cover: { src: "/Invoice_AI_Agent.png", alt: "AI agent extracting invoice data into QuickBooks", ...COVER },
    keywords: ["automate invoices", "invoice automation", "AI invoice processing", "automate QuickBooks data entry", "invoice data extraction"],
    agentPage: { href: "/agents/invoice-processing", label: "The Invoice Processing AI Agent" },
    video: {
      youtubeId: "TdBnadO2BJU",
      title: "How to automate invoices into your accounting software: step-by-step guide",
      description: "An AI agent turns a photographed invoice into a QuickBooks entry, step by step.",
    },
  },
  {
    slug: "how-to-build-social-media-ai-agent",
    title: "How to Build a Social Media AI Agent (With the Exact Prompt to Copy)",
    seoTitle: "How to Build a Social Media AI Agent for Instagram",
    description:
      "Build an AI agent that scrapes your Instagram, ranks your top posts, extracts winning hooks and generates 10 new content ideas into a Google Sheet.",
    excerpt:
      "Build an AI agent that scrapes your Instagram, ranks your top-performing posts, extracts your winning hooks, and generates 10 new content ideas, all logged automatically to a Google Sheet. Includes the full prompt.",
    category: "social-media-automation",
    author: "nas",
    datePublished: "2026-06-22",
    dateModified: "2026-06-22",
    readMinutes: 10,
    cover: { src: "/Instagram_AI_Agent.png", alt: "Social media AI agent ranking top Instagram posts and logging new content ideas to a Google Sheet", ...COVER },
    keywords: ["how to build a social media AI agent", "Instagram AI agent", "Instagram content analysis", "AI content ideas", "social media AI prompt"],
    agentPage: { href: "/agents/social-media", label: "The Social Media AI Agent: built and hosted for you" },
    video: {
      youtubeId: "bv9GAe_2uLs",
      title: "How to Build a Social Media AI Agent",
      description: "Building an AI agent that analyzes Instagram content and generates new post ideas.",
    },
  },
  {
    slug: "ai-agents-for-small-business",
    title: "AI Agents for Small Business: How SMBs Are Automating Operations Without a Tech Team",
    seoTitle: "AI Agents for Small Business: How SMBs Automate Operations",
    description:
      "How small and medium businesses use AI agents to automate support, lead qualification, booking and admin without a tech team, and how to get started.",
    excerpt:
      "Most small business owners assume AI automation is reserved for companies with large engineering teams and enterprise budgets. It isn't. Here's how AI agents are changing what's possible for SMBs, and how to get started.",
    category: "ai-agents",
    author: "nas",
    datePublished: "2026-06-03",
    dateModified: "2026-06-03",
    readMinutes: 13,
    cover: { src: "/blog/ai-agents-smb-cover.png", alt: "AI agents automating operations for a small business team", ...COVER },
    keywords: ["AI agents for small business", "AI automation for SMBs", "small business automation", "AI agents without a tech team"],
    agentPage: { href: "/agents", label: "Browse ready-built AI agents" },
  },
  {
    slug: "how-to-build-ai-lead-finder-agent",
    title: "How to Build an AI Agent That Finds, Qualifies and Researches B2B Leads",
    seoTitle: "How to Build an AI Lead Generation Agent (Free Prompts)",
    description:
      "Build a two-agent B2B lead generation pipeline with Claude, Apify and Google Sheets: find, qualify and research leads, and verify emails before outreach.",
    excerpt:
      "A step-by-step guide to building a two-agent lead generation pipeline using Claude, Apify, and Google Sheets. Includes both agent prompts ready to copy, plus how to verify emails with NeverBounce before you send a single message.",
    category: "lead-generation",
    author: "nas",
    datePublished: "2026-06-10",
    dateModified: "2026-06-10",
    readMinutes: 12,
    cover: { src: "/blog/ai-leads-agent-cover.png", alt: "AI lead finder agent scraping, qualifying and researching B2B leads into Google Sheets", ...COVER },
    keywords: ["AI lead generation agent", "how to build an AI agent for lead generation", "B2B lead finder", "Apify Claude leads", "AI prospect research"],
    agentPage: { href: "/agents/lead-finder", label: "The Lead Finder AI Agent" },
    video: {
      youtubeId: "husaiR18Fec",
      title: "How to Build an AI Agent That Finds B2B Leads",
      description: "Building a two-agent pipeline with Claude, Apify and Google Sheets that finds, qualifies and researches B2B leads.",
    },
  },
  {
    slug: "how-to-build-ai-voice-agent",
    title: "How to Build an AI Voice Agent for Free Using Claude and ElevenLabs",
    seoTitle: "How to Build an AI Voice Agent for Free (Claude + ElevenLabs)",
    description:
      "Build your first AI voice agent for free with Claude Desktop and ElevenLabs. No code: step-by-step setup, a ready-to-use agent prompt and a video walkthrough.",
    excerpt:
      "A step-by-step guide to building your first AI voice agent with no code and no cost, using Claude Desktop and ElevenLabs. Includes a ready-to-use agent prompt and a full video walkthrough.",
    category: "ai-agents",
    author: "nas",
    datePublished: "2026-06-07",
    dateModified: "2026-06-07",
    readMinutes: 11,
    cover: { src: "/blog/ai-voice-agent-cover.png", alt: "Building an AI voice agent with Claude Desktop and ElevenLabs", ...COVER },
    keywords: ["how to build an AI voice agent", "AI voice agent free", "ElevenLabs Claude", "voice AI agent", "no-code voice agent"],
    agentPage: { href: "/agents/customer-support", label: "The Customer Support AI Agent" },
    video: {
      youtubeId: "lzuc3YP2UAY",
      title: "How to Build an AI Voice Agent for Free Using Claude and ElevenLabs",
      description: "A full walkthrough of building a no-code AI voice agent with Claude Desktop and ElevenLabs.",
    },
  },
  {
    slug: "how-to-use-intent-signals-to-increase-conversion-rates",
    title: "How to Use Intent Signals to Increase Your Conversion Rates",
    seoTitle: "How to Use Intent Signals to Increase Conversion Rates",
    description:
      "Intent signals show which companies are actively using competitor tools. Learn to find them and write outreach that gets 5–15× more replies than cold email.",
    excerpt:
      "Intent signals reveal which companies are actively using your competitor's tools. Learn how to find them, craft messages that resonate, and achieve 5–15× higher reply rates than cold outreach.",
    category: "lead-generation",
    author: "nas",
    datePublished: "2026-04-21",
    dateModified: "2026-04-21",
    readMinutes: 10,
    cover: { src: "/blog/Signal_based_buying.jpg", alt: "Signal-based selling: using buyer intent signals to prioritize outreach", ...COVER },
    keywords: ["intent signals", "buyer intent data", "signal-based selling", "increase reply rates", "B2B intent signals"],
    agentPage: { href: "/agents/lead-finder", label: "The Lead Finder AI Agent" },
  },
  {
    slug: "how-to-analyze-website-conversion-issues",
    title: "How to Analyze Your Website for Conversion Issues (Step-by-Step)",
    seoTitle: "How to Analyze Your Website for Conversion Issues",
    description:
      "A step-by-step framework to find and fix website conversion problems: funnel analysis, analytics, page speed, UX and copy, with tools for each step.",
    excerpt:
      "Learn the exact framework top founders use to identify and fix conversion problems on their websites. A practical, step-by-step guide.",
    category: "conversion-optimization",
    author: "nas",
    datePublished: "2025-12-19",
    dateModified: "2025-12-19",
    readMinutes: 9,
    cover: { src: "/blog/conversion-analysis-cover.jpg", alt: "Analyzing a website for conversion issues", ...COVER },
    keywords: ["website conversion analysis", "conversion issues", "conversion rate optimization", "CRO audit"],
  },
  {
    slug: "website-checklist-how-to-build-landing-page-that-converts",
    title: "Website Checklist: How to Build a Landing Page That Converts",
    seoTitle: "Landing Page Checklist: Build a Page That Converts",
    description:
      "A complete landing page checklist: the must-have elements, priorities by business stage and the common mistakes that stop visitors from converting.",
    excerpt:
      "Complete landing page checklist covering must-have elements, business stage priorities, and common mistakes. Build pages that convert at 2-3x industry averages.",
    category: "conversion-optimization",
    author: "nas",
    datePublished: "2026-01-14",
    dateModified: "2026-01-14",
    readMinutes: 11,
    cover: { src: "/blog/website-checklist-cover.jpg", alt: "Landing page checklist for a high-converting website", ...COVER },
    keywords: ["landing page checklist", "website checklist", "landing page that converts", "landing page best practices"],
  },
  {
    slug: "how-to-use-ai-to-improve-conversion-rates",
    title: "How to Use AI to Improve Conversion Rate: A Practical Guide for Founders",
    seoTitle: "How to Use AI to Improve Conversion Rates: Founder's Guide",
    description:
      "How to use AI to find and fix conversion problems on your website, apply the recommendations and measure the results: a practical guide for founders.",
    excerpt:
      "Discover how AI analyzes 150+ factors in 60 seconds to boost conversions by 15-40%. Learn to implement AI recommendations and measure results.",
    category: "conversion-optimization",
    author: "nas",
    datePublished: "2026-01-13",
    dateModified: "2026-01-13",
    readMinutes: 11,
    cover: { src: "/blog/ai-conversion-cover.jpg", alt: "Using AI to improve website conversion rates", ...COVER },
    keywords: ["AI conversion rate optimization", "use AI to improve conversion rate", "AI CRO", "AI website analysis"],
  },
  {
    slug: "how-to-build-website-to-collect-leads",
    title: "How to Build a Website to Collect Leads: The Complete B2B Landing Page Guide",
    seoTitle: "How to Build a Website That Collects Leads (B2B Guide)",
    description:
      "Build a B2B website that collects leads: landing page structure, form optimization and the follow-up systems that turn visitors into qualified leads.",
    excerpt:
      "Master B2B lead generation with proven landing page structures, form optimization strategies, and follow-up systems that convert visitors into qualified leads.",
    category: "conversion-optimization",
    author: "nas",
    datePublished: "2026-01-08",
    dateModified: "2026-01-08",
    readMinutes: 12,
    cover: { src: "/blog/lead-generation-cover.jpg", alt: "B2B landing page designed to collect leads", ...COVER },
    keywords: ["website to collect leads", "B2B landing page", "lead generation website", "lead capture form"],
  },
  {
    slug: "how-to-make-website-faster",
    title: "How to Make Your Website Faster: The Complete Guide for Founders",
    seoTitle: "How to Make Your Website Faster: A Guide for Founders",
    description:
      "Practical ways to speed up your website (images, code, hosting and caching), the tools to measure it, and how page speed affects conversions.",
    excerpt:
      "Practical speed optimization strategies that reduce load time by 50-70%. Learn which tools to use and how page speed impacts conversions.",
    category: "conversion-optimization",
    author: "nas",
    datePublished: "2025-12-26",
    dateModified: "2025-12-26",
    readMinutes: 10,
    cover: { src: "/blog/website-speed-cover.jpg", alt: "Website speed optimization metrics", ...COVER },
    keywords: ["how to make website faster", "website speed optimization", "page speed", "Core Web Vitals"],
  },
  {
    slug: "yc-landing-page-optimization",
    title: "10 Things Every Y Combinator Startup Landing Page Has in Common (2026 Analysis)",
    seoTitle: "10 Things Every YC Startup Landing Page Has in Common",
    description:
      "We analyzed Y Combinator startup landing pages and found 10 shared patterns. Here's what they do, and how to apply each one to your own website.",
    excerpt:
      "Analyze the common patterns in successful YC startup landing pages and learn how to apply them to your own website.",
    category: "conversion-optimization",
    author: "nas",
    datePublished: "2025-12-23",
    dateModified: "2025-12-23",
    readMinutes: 15,
    cover: { src: "/blog/YC_image.jpeg", alt: "Y Combinator startup landing page examples", width: 1835, height: 1014 },
    keywords: ["YC landing page", "Y Combinator landing pages", "startup landing page examples", "landing page optimization"],
  },
  {
    slug: "increase-conversion-rate-30-days",
    title: "How to Increase Website Conversion Rate in 30 Days (No Redesign Required)",
    seoTitle: "How to Increase Website Conversion Rate in 30 Days",
    description:
      "A 30-day sprint to raise your website conversion rate without a redesign: the high-impact fixes to prioritize each week and how to measure them.",
    excerpt:
      "Achieve 15-30% conversion improvements in 30 days using the Sprint Method. Focus on high-impact changes that require no redesign.",
    category: "conversion-optimization",
    author: "nas",
    datePublished: "2025-12-21",
    dateModified: "2025-12-21",
    readMinutes: 10,
    cover: { src: "/blog/30-day-sprint-cover.jpg", alt: "30-day conversion rate sprint plan", ...COVER },
    keywords: ["increase website conversion rate", "conversion rate optimization", "improve conversion rate fast"],
  },
]

// ─── Lookups ────────────────────────────────────────────────────────────────

export function getPost(slug: string): BlogPost {
  const post = POSTS.find(p => p.slug === slug)
  if (!post) throw new Error(`Unknown blog post: ${slug}`)
  return post
}

export function getCategory(id: CategoryId): Category {
  const category = CATEGORIES.find(c => c.id === id)
  if (!category) throw new Error(`Unknown blog category: ${id}`)
  return category
}

/** Newest first. */
export function getAllPostsSorted(): BlogPost[] {
  return [...POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished))
}

export function getPostsByCategory(id: CategoryId): BlogPost[] {
  return getAllPostsSorted().filter(p => p.category === id)
}

export function getFeaturedPost(): BlogPost {
  return getAllPostsSorted().find(p => p.pillar) ?? getAllPostsSorted()[0]
}

/** Same-category posts first, then pillars, then the newest — never the post itself. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPost(slug)
  const others = getAllPostsSorted().filter(p => p.slug !== slug)
  const ranked = [
    ...others.filter(p => p.category === post.category),
    ...others.filter(p => p.category !== post.category && p.pillar),
    ...others,
  ]
  return [...new Map(ranked.map(p => [p.slug, p])).values()].slice(0, limit)
}

export const postPath = (slug: string) => `/blog/${slug}`
export const categoryPath = (id: CategoryId) => `/blog/category/${id}`
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`

export function formatPostDate(iso: string) {
  return format(parseISO(iso), "MMMM d, yyyy")
}

// ─── Metadata + structured data ─────────────────────────────────────────────

export type Faq = { question: string; answer: string }

export function buildPostMetadata(slug: string): Metadata {
  const post = getPost(slug)
  const author = getAuthor(post.author)
  const url = absoluteUrl(postPath(slug))
  const title = post.seoTitle ?? post.title
  const image = { url: post.cover.src, width: post.cover.width, height: post.cover.height, alt: post.cover.alt }

  return {
    title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: author.name, url: absoluteUrl(authorUrl(author.id)) }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: post.description,
      siteName: SITE_NAME,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [absoluteUrl(authorUrl(author.id))],
      section: getCategory(post.category).name,
      tags: post.keywords,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [image],
    },
  }
}

export function buildPostJsonLd(slug: string, faqs: Faq[] = []) {
  const post = getPost(slug)
  const author = getAuthor(post.author)
  const category = getCategory(post.category)
  const url = absoluteUrl(postPath(slug))

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: {
          "@type": "ImageObject",
          url: absoluteUrl(post.cover.src),
          width: post.cover.width,
          height: post.cover.height,
          caption: post.cover.alt,
        },
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        inLanguage: "en",
        articleSection: category.name,
        keywords: post.keywords.join(", "),
        author: {
          "@type": "Person",
          "@id": `${absoluteUrl(authorUrl(author.id))}#person`,
          name: author.name,
          ...(author.jobTitle && { jobTitle: author.jobTitle }),
          url: absoluteUrl(authorUrl(author.id)),
          worksFor: { "@id": `${SITE_URL}/#organization` },
          ...(author.image && { image: absoluteUrl(author.image) }),
          ...(author.sameAs.length > 0 && { sameAs: author.sameAs }),
        },
        // Defined once, site-wide, in app/layout.tsx.
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        ...(post.video && {
          video: {
            "@type": "VideoObject",
            name: post.video.title,
            description: post.video.description,
            thumbnailUrl: `https://i.ytimg.com/vi/${post.video.youtubeId}/hqdefault.jpg`,
            embedUrl: `https://www.youtube.com/embed/${post.video.youtubeId}`,
            contentUrl: `https://www.youtube.com/watch?v=${post.video.youtubeId}`,
            uploadDate: post.datePublished,
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: category.name, item: absoluteUrl(categoryPath(category.id)) },
          { "@type": "ListItem", position: 4, name: post.title, item: url },
        ],
      },
      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: faqs.map(faq => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  }
}
