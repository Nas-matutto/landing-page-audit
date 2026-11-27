import { OG_IMAGE } from "@/lib/og"
import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { OtherAgentsSection } from "@/components/sections/other-agents-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"

const BASE_URL = 'https://talktomedata.com'
// The homepage is built around the social media agent: most users come for it.
// Title and H1 target the search "AI social media agent"; the H2s and FAQ answer
// the questions people ask about creating, scheduling and auto-posting.
const TITLE = "AI Social Media Agent: Create, Schedule and Post on Autopilot"
const DESCRIPTION =
  "Talk to me Data's AI social media agent creates posts in your brand, schedules them and posts to Instagram, TikTok and Facebook on autopilot. Start free."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI social media agent",
    "AI social media manager",
    "AI social media post generator",
    "schedule social media posts with AI",
    "social media autopilot",
    "auto post to Instagram",
    "auto post to TikTok",
    "AI content creation for social media",
    "Talk to me Data",
    "TTMD",
  ],
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: BASE_URL,
    siteName: 'Talk to me Data',
  },
  twitter: {
    images: [OG_IMAGE],
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: BASE_URL
  },
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
// Facts here must match /pricing and the privacy policy (section on accounts
// connected for posting): scheduled posting to Instagram, TikTok, Facebook and
// Pinterest; LinkedIn only on "Post now", never scheduled; autopilot from Solo.

const FAQS = [
  {
    question: "What is the AI social media agent?",
    answer:
      "An AI agent from Talk to me Data that runs your social media for you. It studies your best posts and your competitors, creates new posts in your brand, schedules them for your best times and posts them to Instagram, TikTok, Facebook and more. Approve each post yourself, or let it run on autopilot.",
  },
  {
    question: "Can AI create social media posts for me?",
    answer:
      "Yes. Tell the agent what you want, or let it work from what already performs on your account. It writes the hooks, scripts and captions from your own best posts, and designs carousels and images in your brand kit: your logo, colours, font and layout, set once.",
  },
  {
    question: "How do I schedule social media posts with AI?",
    answer:
      "The agent plans each post into your best time slots. Set a post to auto-post at its scheduled time, or ask for an email reminder with the finished post and share it yourself.",
  },
  {
    question: "Can it run my social media on autopilot?",
    answer:
      "Yes. Turn on autopilot and the agent builds a new post every 7, 4, 3 or 2 days and posts it on schedule. Most people review every post at first, then switch on autopilot once they trust it. Autopilot starts on the Solo plan.",
  },
  {
    question: "Which social media platforms can it post to?",
    answer:
      "It schedules and posts to Instagram, TikTok, Facebook and Pinterest, and publishes to LinkedIn when you press Post now. It analyses Instagram, TikTok, YouTube and Facebook Pages. For any other platform you get an email reminder with the finished post.",
  },
  {
    question: "How does it know what to post?",
    answer:
      "It reads every post on your account and works out which formats, hooks and topics win with your audience. Then it turns those patterns, and your competitors' breakout posts, into new posts for you.",
  },
  {
    question: "Can it track my competitors?",
    answer:
      "Yes. It reads your bio and captions to understand your niche, then suggests accounts like yours. You choose which to track, and it flags their breakout posts and turns the patterns behind them into plays you can run.",
  },
  {
    question: "Will the posts look and sound like my brand?",
    answer:
      "Carousels and images use your brand kit, so every design carries your logo, colours, font and layout. Hooks, scripts and captions are built from your own best-performing posts, so they follow what already works for you.",
  },
  {
    question: "Will anything be posted without my approval?",
    answer:
      "Only if you switch it on. You can review every post before it goes out, set it to publish on schedule, or get an email reminder with the finished post and share it yourself.",
  },
  {
    question: "Can I just talk to it?",
    answer:
      "Yes. Ask questions about your numbers in plain English, or tell it what to make, like “a 15 second reel on my morning routine”, and it builds the hooks, script and caption.",
  },
  {
    question: "Is it free to start?",
    answer:
      "Yes. The Starter plan is free forever, with 50 actions a month and no card needed. That is enough to analyse your account, research competitors and build posts when you ask. You see your first analysis within minutes.",
  },
  {
    question: "How much does the AI social media agent cost?",
    answer:
      "Starter is free. Paid plans are Solo at $49 a month, Grow at $99 and Scale at $199. You pay for the work your agent does, not per agent: a finished post is about 11 actions, so Solo's 450 actions make about 40 posts a month.",
  },
  {
    question: "How is it different from a scheduler like Buffer or Later?",
    answer:
      "A scheduler posts what you have already made. The agent also decides what to post from your own numbers, writes and designs it in your brand, then schedules it and posts it for you.",
  },
  {
    question: "Do I need any technical skills?",
    answer:
      "None. There's no code, no workflow to wire and no API keys to manage. Paste your profile link, connect your accounts through each platform's own sign-in, and tell the agent what you want.",
  },
  {
    question: "Do I have to share my passwords? Is my data safe?",
    answer:
      "You never share a password. You connect accounts through each platform's own sign-in, and you can disconnect them at any time. Your agents only access the accounts you connect, and we never sell your data or use it to train AI models.",
  },
  {
    question: "Do you have agents for other jobs?",
    answer:
      "Yes. Every plan also includes the SEO & GEO Manager, Website Manager, SDR AI Agent and Social Listening agent. Need something else, like chasing invoices or sending a weekly report? Request a custom agent and we build it around how your team works.",
  },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${BASE_URL}#faq`,
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

// ── Page ──────────────────────────────────────────────────────────────────────
// The story runs: the platforms the social media agent works with, how it goes
// from connecting your accounts to posting, the other agents you can add, then
// the objections and the ask.

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <OtherAgentsSection />
        <FAQSection heading="Questions about the AI social media agent" items={FAQS} />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}
