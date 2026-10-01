import { OG_IMAGE } from "@/lib/og"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/sections/faq-section"
import {
  MarketStrip,
  RealEstateAsks,
  RealEstateDifference,
  RealEstateFinalCta,
  RealEstateHero,
  RealEstateHowItWorks,
  RealEstateSignals,
} from "@/components/sections/real-estate/sections"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/real-estate-agent`

const TITLE = "AI Real Estate Agent for Realtors: Find Likely Sellers | Talk to Me Data"
const DESCRIPTION =
  "An AI agent for realtors and real estate agents. Ask in plain English and it finds homeowners likely to sell in public property records, pulls comps, and builds just-sold mailing lists with owner names and mailing addresses."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "ai real estate agent",
    "ai for realtors",
    "ai agent for real estate agents",
    "realtor ai assistant",
    "find likely sellers",
    "motivated seller leads",
    "real estate listing leads",
    "absentee owner list",
    "just sold postcards",
    "real estate seller leads",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-10-01",
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
    question: "What is an AI real estate agent?",
    answer:
      "It's an AI assistant for realtors, not a replacement for one. You ask it questions in plain English, and it searches public property records to find homeowners likely to sell, looks up any address, pulls comps and builds mailing lists, so you spend your time on listings instead of research.",
  },
  {
    question: "Where does the data come from?",
    answer:
      "The public property records for the areas you work in: the county or land registry, recorded sales, permits, foreclosure filings and city records. We connect the agent to your local sources when we set it up. What's public, including owner names and mailing addresses, varies by country and state, so we'll tell you upfront what's available for your market.",
  },
  {
    question: "Does it work in my city, state or country?",
    answer:
      "Yes. It's a custom agent, so we set it up for the areas you farm, in any city, state or country with public property records. Tell us your market and we'll check which records and seller signals are available there before we build it.",
  },
  {
    question: "How does it decide who is likely to sell?",
    answer:
      "It filters on seller signals such as how long the home has been owned, absentee or out-of-state owners, a scheduled foreclosure auction, a big jump in assessed value, a recent renovation permit, and vacancy or code violations. We match the signals to what your area publishes. You get up to 100 homes per search, strongest signals first.",
  },
  {
    question: "Can it see missed mortgage payments?",
    answer:
      "No. Missed mortgage payments aren't public record. The closest public signal is a scheduled foreclosure auction, and the agent can search for those.",
  },
  {
    question: "Does it use MLS data?",
    answer:
      "No. It works from public records, so sale prices come from recorded deeds, which can appear weeks or months after closing depending on the area. It doesn't show list prices or days on market, which are MLS data.",
  },
  {
    question: "Can it check my own contacts?",
    answer:
      "Yes. Upload a CSV of your contacts once, and ask things like “which of my contacts own a home and might sell?”. You can download the list back with years owned, estimated value and any seller signals.",
  },
  {
    question: "How much does it cost?",
    answer: "It runs as a custom agent on our standard plans, starting with Solo at $49 a month. Every plan is on our pricing page at talktomedata.com/pricing.",
  },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "AI Real Estate Agent for Realtors",
      serviceType: "AI Real Estate Agent",
      description: DESCRIPTION,
      url: PAGE_URL,
      provider: { "@type": "Organization", name: "Talk to Me Data", url: BASE_URL },
      areaServed: "Worldwide",
      audience: { "@type": "BusinessAudience", audienceType: "Realtors and real estate agents" },
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
        { "@type": "ListItem", position: 2, name: "Real estate agent", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RealEstateAgentPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <RealEstateHero />
        <MarketStrip />
        <RealEstateDifference />
        <RealEstateSignals />
        <RealEstateHowItWorks />
        <RealEstateAsks />
        <FAQSection eyebrow="FAQ" heading="Questions about the AI real estate agent" items={FAQS} />
        <RealEstateFinalCta />
      </main>
      <Footer />
    </div>
  )
}
