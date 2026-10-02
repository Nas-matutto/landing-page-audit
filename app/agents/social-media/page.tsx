import { OG_IMAGE } from "@/lib/og"
import { AgentGuidesSection } from "@/components/blog/agent-guides-section"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/sections/faq-section"
import { SocialAgentHero } from "@/components/sections/social-agent/hero"
import { AgentDemo } from "@/components/sections/social-agent/agent-demo"
import { SocialAgentFeatures } from "@/components/sections/social-agent/features"
import {
  DoesNotSupport,
  PlatformStrip,
  SocialFinalCta,
  SocialGallery,
  SocialHowItWorks,
} from "@/components/sections/social-agent/sections"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/social-media`

const TITLE = "AI Social Media Agent That Posts For You | Talk to me Data"
const DESCRIPTION =
  "An AI agent that runs your social media. It finds your winning posts, tracks competitors, writes and designs the content in your brand, and schedules and posts it for you on Instagram, Facebook and TikTok."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "ai social media agent",
    "ai social media manager",
    "social media automation",
    "ai content creator",
    "automate social media posts",
    "ai instagram agent",
    "competitor tracking social media",
    "social media scheduling ai",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-06-25",
  },
  twitter: {
    images: [OG_IMAGE],
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: "What does the AI social media agent actually do?",
    answer:
      "It reads every post on your account and works out what wins. Then it tracks your competitors, writes and designs new posts, plans them into your best time slots, and posts them for you. You tell it what you want, and it does the work.",
  },
  {
    question: "Which platforms does it work with?",
    answer:
      "It analyses Instagram, TikTok, YouTube and Facebook Pages. It can auto-post to Instagram, Facebook and TikTok. For anything else, you get an email reminder with the finished post. If you need LinkedIn, X or a scheduler like Buffer, we build custom agents too. Tell us what you use.",
  },
  {
    question: "Will the posts look and sound like my brand?",
    answer:
      "Carousels and images are designed in your brand kit: your logo, colours, font and layout, set once. Hooks, scripts and captions are built from your own best-performing posts, so they follow what already works for you.",
  },
  {
    question: "Do I approve posts before they go live?",
    answer:
      "Your call, post by post. Set a post to auto-post at its scheduled time, or ask for a reminder and post it yourself. Nothing is published for you unless you have connected the account and turned it on.",
  },
  {
    question: "How does it find and track competitors?",
    answer:
      "It reads your bio and captions to understand your niche, then suggests accounts like yours. You choose which to track. It flags their breakout posts and turns the patterns behind them into plays you can run.",
  },
  {
    question: "Do I need to share my password?",
    answer:
      "No. To start, you paste a public profile link. To post for you, you connect your account through the platform's own sign-in, and you can disconnect it whenever you like.",
  },
  {
    question: "Can I just talk to it?",
    answer:
      "Yes. Ask questions about your numbers in plain English, or tell it what to make, like “a 15 second reel on my morning routine”, and it builds the hooks, script and caption.",
  },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Social Media AI Agent",
      serviceType: "Social Media AI Agent",
      description: DESCRIPTION,
      url: PAGE_URL,
      provider: { "@type": "Organization", name: "Talk to Me Data", url: BASE_URL },
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Agents", item: `${BASE_URL}/agents` },
        { "@type": "ListItem", position: 2, name: "Social media", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <SocialAgentHero />
        <PlatformStrip />
        <DoesNotSupport />
        <AgentDemo />
        <SocialAgentFeatures />
        <SocialHowItWorks />
        <SocialGallery />
        <AgentGuidesSection agentHref="/agents/social-media" />
        <FAQSection eyebrow="FAQ" heading="Questions about the social media agent" items={FAQS} />
        <SocialFinalCta />
      </main>
      <Footer />
    </div>
  )
}
