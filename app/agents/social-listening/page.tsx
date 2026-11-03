import { OG_IMAGE } from "@/lib/og"
import { AgentGuidesSection } from "@/components/blog/agent-guides-section"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/sections/faq-section"
import { ListeningAgentHero } from "@/components/sections/listening-agent/hero"
import { ListeningAgentOutcomes } from "@/components/sections/listening-agent/features"
import {
  BeforeAfter,
  ListeningFinalCta,
  ListeningHowItWorks,
  ListeningTryIt,
  PlatformStrip,
} from "@/components/sections/listening-agent/sections"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/social-listening`

const TITLE = "AI Social Listening Agent: Turn Online Conversations Into Customers | Talk to me Data"
const DESCRIPTION =
  "An AI social listening agent that finds people asking for what you sell on Reddit, X, Threads, YouTube, LinkedIn, Facebook and Instagram, skips the noise and drafts a helpful reply and DM for you to send."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "ai social listening",
    "social listening agent",
    "social listening for lead generation",
    "find customers on reddit",
    "reddit lead generation",
    "social selling ai",
    "buying intent social media",
    "ai reply drafting",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to me Data",
    publishedTime: "2026-11-03",
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
    question: "What does the social listening agent get me?",
    answer:
      "A steady stream of people who are already asking for what you sell. Your agent finds their posts, filters out the noise and drafts a helpful reply and a DM for each one, so you spend your time in conversations instead of scrolling.",
  },
  {
    question: "Which platforms does it listen on?",
    answer: "Reddit, X, Threads, YouTube, LinkedIn, Facebook and Instagram.",
  },
  {
    question: "Does it post or message people for me?",
    answer:
      "No. It drafts the reply and the DM, and you send them from your own account. Every message comes from you, and you decide which conversations to join.",
  },
  {
    question: "How does it tell a real buyer from noise?",
    answer:
      "It reads each post against the people you described and skips self-promotion, vendors pitching their own tools and job posts. Every match it keeps is rated, so you can answer the strongest first.",
  },
  {
    question: "Will my replies sound like an ad?",
    answer:
      "No. Replies are written to help first: they answer the question the person asked, in a natural voice, with no hard sell. That's what makes people want to hear more.",
  },
  {
    question: "Is it free to start?",
    answer:
      "Yes. The social listening agent is included on every plan, Starter too. Sign up, describe who you want to reach and see your first matches.",
  },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "AI Social Listening Agent",
      serviceType: "AI Social Listening Agent",
      description: DESCRIPTION,
      url: PAGE_URL,
      provider: { "@type": "Organization", name: "Talk to me Data", url: BASE_URL },
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
        { "@type": "ListItem", position: 2, name: "Social Listening", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SocialListeningPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <ListeningAgentHero />
        <PlatformStrip />
        <BeforeAfter />
        <ListeningAgentOutcomes />
        <ListeningTryIt />
        <ListeningHowItWorks />
        <AgentGuidesSection agentHref="/agents/social-listening" />
        <FAQSection eyebrow="FAQ" heading="Questions about the social listening agent" items={FAQS} />
        <ListeningFinalCta />
      </main>
      <Footer />
    </div>
  )
}
