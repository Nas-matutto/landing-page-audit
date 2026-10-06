import { OG_IMAGE } from "@/lib/og"
import { AgentGuidesSection } from "@/components/blog/agent-guides-section"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/sections/faq-section"
import { WebsiteAgentHero } from "@/components/sections/website-agent/hero"
import { WebsiteAgentDemo } from "@/components/sections/website-agent/agent-demo"
import { WebsiteAgentFeatures } from "@/components/sections/website-agent/features"
import {
  BuilderStrip,
  DoesNotSupport,
  WebsiteFinalCta,
  WebsiteHowItWorks,
} from "@/components/sections/website-agent/sections"

// Was /agents/lead-qualification until 2026-10 (redirected in next.config.mjs).

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/website-manager`

const TITLE = "AI Website Manager: Change Your Site in Plain English | Talk to me Data"
const DESCRIPTION =
  "An AI agent that makes changes to your website for you. Connect a site built with Claude Code, Codex, Lovable or WordPress, say what to change in plain English, and it goes live in minutes, with one-click undo."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "ai website manager",
    "ai website builder agent",
    "edit website with ai",
    "claude code website",
    "codex website",
    "update website without a developer",
    "ai web developer",
    "wordpress ai agent",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to me Data",
    publishedTime: "2026-10-06",
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
    question: "What does the AI Website Manager actually do?",
    answer:
      "It shows you your live website next to a chat, and makes the changes you ask for. Say “make the button green” or “add a pricing page” and it makes the change on your site and puts it live, usually within a few minutes. Every change can be undone in one click.",
  },
  {
    question: "Which websites does it work with?",
    answer:
      "Any site whose code is on GitHub, which covers sites built with Claude Code, Codex, Lovable, Bolt, v0, Replit and Cursor, and any WordPress site. If you built your site with Lovable, Bolt or v0, connect the project to GitHub inside that tool first.",
  },
  {
    question: "Is it a good fit for sites built with Claude Code or Codex?",
    answer:
      "It's ideal for them. Those sites already live on GitHub, so there's nothing to set up: connect the repository and keep changing your site in plain English, without opening a terminal or re-prompting from scratch.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "No. You talk to it the way you'd talk to a web developer. It never shows you code unless you ask for it.",
  },
  {
    question: "Does every change go live straight away?",
    answer:
      "Yes. A clear request goes straight onto your live site, and your preview refreshes once it's up. If a request could mean two things, it asks one short question first. Want to see new wording before it goes live? Just say so.",
  },
  {
    question: "What if I don't like a change?",
    answer:
      "Undo it in one click from the list of changes, or ask the agent to put it back. Undo is free and never counts towards your plan.",
  },
  {
    question: "How many changes can I make?",
    answer:
      "3 a month on the free Starter plan, then 25 on Solo, 100 on Grow and 250 on Scale. Changes don't use your actions: those are only for the questions you ask the agent.",
  },
  {
    question: "What can't it change?",
    answer:
      "Things that don't live in your site itself: your domain and DNS, hosting settings, where your form emails go, and passwords or API keys. On WordPress it edits your pages, posts, menus and site title, but not your theme's design or page-builder layouts like Elementor. When it can't do something, it tells you how to do it yourself.",
  },
  {
    question: "Is my site safe?",
    answer:
      "You connect GitHub through GitHub's own sign-in and choose the one repository it can work on, and WordPress with an application password you can revoke any time. You never share your password, and every change is saved so it can be undone.",
  },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "AI Website Manager",
      serviceType: "AI Website Management Agent",
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
        { "@type": "ListItem", position: 2, name: "Website Manager", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WebsiteManagerPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <WebsiteAgentHero />
        <BuilderStrip />
        <DoesNotSupport />
        <WebsiteAgentDemo />
        <WebsiteAgentFeatures />
        <WebsiteHowItWorks />
        <AgentGuidesSection agentHref="/agents/website-manager" />
        <FAQSection eyebrow="FAQ" heading="Questions about the Website Manager" items={FAQS} />
        <WebsiteFinalCta />
      </main>
      <Footer />
    </div>
  )
}
