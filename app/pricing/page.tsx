import { OG_IMAGE } from "@/lib/og"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/sections/faq-section"
import { PricingContent, PricingFinalCta } from "@/components/sections/pricing/pricing-content"
import { PLANS } from "@/lib/pricing"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/pricing`

const TITLE = "Pricing — AI Agents From $0 a Month | Talk to me Data"
const DESCRIPTION =
  "Simple pricing for AI agents that do the work for you. Start free, then pick Solo ($49), Grow ($99) or Scale ($199). One plan covers your Social Media, SEO & GEO and custom agents."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["ai agent pricing", "ai social media manager pricing", "ai seo agent pricing", "custom ai agent cost", "ai agents for small business"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
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
    question: "Is there a free plan?",
    answer:
      "Yes. Starter is free forever: one ready-made agent and 100 actions a month, with no card required. It's the easiest way to see an agent work on your own account before you pay for anything.",
  },
  {
    question: "Do I need a separate plan for each agent?",
    answer:
      "No. One plan covers every agent you run, and they all share the same monthly actions. On paid plans, the Social Media Manager and the SEO & GEO Manager don't count towards your custom-agent limit.",
  },
  {
    question: "What is an action?",
    answer:
      "An action is one small step your agent takes for you, like pulling your latest posts, using a tool or writing something. A quick question is about 2 actions, a finished social post about 11, and a full blog post 10 to 20. Some things are always free, like reading your Google Search Console or posting to Instagram.",
  },
  {
    question: "What happens if I run out of actions?",
    answer:
      "Your agents pause until your actions reset on the 1st of the month, or until you upgrade. You're never charged extra, and a job that has already started always finishes.",
  },
  {
    question: "Can the agent post to Instagram for me?",
    answer:
      "Yes. On Solo, your agent designs 10 posts a month and posts 5 of them to Instagram for you. On Grow and Scale, it builds, schedules and posts every one at your best times.",
  },
  {
    question: "How many websites can the SEO & GEO Manager look after?",
    answer: "One website on Starter, Solo and Grow. Scale covers up to 3 websites, and AI Native is shaped around however many you run.",
  },
  {
    question: "What makes a custom agent proactive?",
    answer:
      "On Solo, your custom agent does the jobs you hand it. From Grow, it runs on its own schedule, so the work gets done every day or week without you having to ask.",
  },
  {
    question: "Can I change or cancel my plan?",
    answer: "Any time, from the billing page in your dashboard. There are no setup fees and no long-term contracts.",
  },
  {
    question: "What is AI Native?",
    answer:
      "AI Native is for companies that want agents across every team. You get unlimited agents and actions, custom integrations with your own systems, and a dedicated team that builds and runs your agents for you. Pricing is shaped around your workflows.",
  },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": `${PAGE_URL}#product`,
      name: "Talk to Me Data AI Agents",
      description: DESCRIPTION,
      url: PAGE_URL,
      brand: { "@type": "Brand", name: "Talk to Me Data" },
      offers: PLANS.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        description: plan.description,
        price: plan.price,
        priceCurrency: "USD",
        url: PAGE_URL,
        availability: "https://schema.org/InStock",
      })),
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
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Pricing", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <PricingContent />
        <FAQSection eyebrow="FAQ" heading="Questions about pricing" items={FAQS} />
        <PricingFinalCta />
      </main>
      <Footer />
    </div>
  )
}
