import { OG_IMAGE } from "@/lib/og"
import { AgentGuidesSection } from "@/components/blog/agent-guides-section"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/sections/faq-section"
import { SeoAgentHero } from "@/components/sections/seo-agent/hero"
import { SeoAgentDemo } from "@/components/sections/seo-agent/agent-demo"
import { SeoAgentFeatures } from "@/components/sections/seo-agent/features"
import {
  DoesNotSupport,
  EngineStrip,
  SeoFinalCta,
  SeoHowItWorks,
} from "@/components/sections/seo-agent/sections"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/seo-geo`

const TITLE = "AI SEO & GEO Agent That Writes and Publishes For You | Talk to me Data"
const DESCRIPTION =
  "An AI agent that grows your search traffic. It reads your Google Search Console, finds the searches you can win, writes pages built to rank on Google and get cited by ChatGPT, Claude and Perplexity, and publishes them to your site."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "ai seo agent",
    "geo agent",
    "generative engine optimization",
    "seo automation ai",
    "ai content that ranks",
    "rank in ai search",
    "google search console ai",
    "llm seo optimization",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-07-16",
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
    question: "What does the AI SEO & GEO agent actually do?",
    answer:
      "It reads your Google Search Console and works out which searches you can win. Then it writes pages built to rank on Google and get quoted by AI tools, publishes them to your site, and tracks how they do. You tell it what you want, and it does the work.",
  },
  {
    question: "What is GEO, and why does it matter?",
    answer:
      "GEO stands for generative engine optimization: getting your pages quoted in AI answers from ChatGPT, Claude, Perplexity, Gemini and Google's AI Overviews. More buyers now ask AI instead of searching, and those tools only cite a few sources. The agent writes every page to rank on Google and to be one of those sources.",
  },
  {
    question: "How does it connect to my Search Console?",
    answer:
      "Through Google's own sign-in and official API, with read-only access. You don't share a password, and you can disconnect whenever you like. From then on, every run starts from your real clicks, impressions and positions.",
  },
  {
    question: "Can it get me cited by ChatGPT and Claude?",
    answer:
      "Nobody can guarantee a citation, but the agent writes pages the way AI tools like to quote them: a direct answer up top, question-style headings, FAQ blocks, facts and sources. It also checks which AI tools cite you today, so you can see what's working.",
  },
  {
    question: "Which websites can it publish to?",
    answer:
      "WordPress, Webflow, Shopify and Ghost. If your site runs on something else, we build custom agents too. Tell us what you use.",
  },
  {
    question: "Do I approve pages before they go live?",
    answer:
      "Your call. Pages can land in your website as drafts for you to review, or you can switch on autopilot and let the agent publish on schedule. Most people start with review first.",
  },
  {
    question: "Will the pages sound like AI spam?",
    answer:
      "No. Each page is written from your own data and in your voice, for one search at a time. The agent checks the pages that rank today, so what it writes has to be more useful than them to be worth publishing.",
  },
  {
    question: "Can I just talk to it?",
    answer:
      "Yes. Ask questions about your numbers in plain English, like “why did my clicks drop on /pricing?”, or tell it what to do, like “write a page on agency CRMs”, and it gets to work.",
  },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "SEO & GEO AI Agent",
      serviceType: "SEO & GEO AI Agent",
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
        { "@type": "ListItem", position: 2, name: "SEO & GEO", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SeoGeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <SeoAgentHero />
        <EngineStrip />
        <DoesNotSupport />
        <SeoAgentDemo />
        <SeoAgentFeatures />
        <SeoHowItWorks />
        <AgentGuidesSection agentHref="/agents/seo-geo" />
        <FAQSection eyebrow="FAQ" heading="Questions about the SEO & GEO agent" items={FAQS} />
        <SeoFinalCta />
      </main>
      <Footer />
    </div>
  )
}
