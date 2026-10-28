import { OG_IMAGE } from "@/lib/og"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/sections/faq-section"
import { PricingContent, PricingFinalCta } from "@/components/sections/pricing/pricing-content"
import { PLANS } from "@/lib/pricing"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/pricing`

const TITLE = "AI Agent Pricing, From $0 a Month | Talk to me Data"
const DESCRIPTION =
  "Every plan includes all five pre-built AI agents: Social Media, SEO & GEO, Website, SDR and Social Listening. Pay for actions, not agents. Start free with 50 actions a month, then Solo ($49), Grow ($99) or Scale ($199)."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["ai agent pricing", "ai social media manager pricing", "ai seo agent pricing", "ai website manager pricing", "ai sdr agent pricing", "social listening tool pricing", "custom ai agent cost", "ai agents for small business"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PAGE_URL,
    siteName: "Talk to me Data",
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
      "Yes. Starter is free forever: every pre-built agent and 50 actions a month, with no card required. Your agents work when you ask them, so you can see real results on your own accounts before you pay for anything.",
  },
  {
    question: "Do I need a separate plan for each agent?",
    answer:
      "No. Every plan includes all five pre-built agents: the Social Media Manager, SEO & GEO Manager, Website Manager, SDR AI Agent and Social Listening. They all share one monthly pool of actions, so you can put one agent to work hard or spread the work across all of them.",
  },
  {
    question: "What is an action?",
    answer:
      "An action is one task your agent does for you, like pulling your latest posts, finding a lead or making a change to your site. Small tasks take one action, bigger ones take a few: a finished social post is about 11, a lead found and written to about 4, and a website change 5 to 15. Some things are always free, like reading your Google Search Console, posting to Instagram or undoing a change.",
  },
  {
    question: "How much work does a plan get me?",
    answer:
      "On Solo, 450 actions is about 40 finished posts, 110 leads written to or 60 website changes, or any mix of them across your agents. Grow doubles that and Scale doubles it again. The plan finder above adds it up for you.",
  },
  {
    question: "What do paid plans add?",
    answer:
      "Autopilot. On Starter your agents work when you ask them. From Solo they also work on their own: weekly refreshes, scheduled runs and daily leads, plus posting to Instagram and sending emails from your own mailbox. Paid plans also include custom agents.",
  },
  {
    question: "What happens if I run out of actions?",
    answer:
      "Your agents pause until your actions reset on the 1st of the month, or until you upgrade. You're never charged extra, and a job that has already started always finishes.",
  },
  {
    question: "What is a custom agent?",
    answer:
      "An agent we build with you around your own workflow, like chasing overdue invoices or logging sales calls in your CRM. Solo includes 1, Grow up to 2 and Scale up to 4. Pre-built agents never count towards that limit, and custom agents use the same actions as everything else.",
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
      name: "Talk to me Data AI Agents",
      description: DESCRIPTION,
      url: PAGE_URL,
      brand: { "@type": "Brand", name: "Talk to me Data" },
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
