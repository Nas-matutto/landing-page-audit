import type { Metadata } from "next"

const URL = "https://talktomedata.com/blog/how-to-automate-seo-and-geo-growth-with-ai-agent"
const TITLE = "How to Automate SEO and GEO Growth With an AI Agent"
const DESCRIPTION =
  "Learn how an AI agent from Talk to Me Data reads your Google Search Console data, finds the keywords you can rank higher for, and writes and publishes SEO- and GEO-optimized content on autopilot — on request or automatically every week."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "automate SEO with AI agent",
    "GEO generative engine optimization",
    "AI SEO agent",
    "Google Search Console automation",
    "AI content that ranks",
    "automate content publishing",
    "SEO automation agent",
    "rank higher with AI",
    "AI Overviews optimization",
    "automated SEO growth",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-07-17",
    images: [{ url: "https://talktomedata.com/blog/Google_Search_Console_Ggraph_GEO.png", width: 1200, height: 630, alt: "Google Search Console clicks and impressions climbing after an AI SEO and GEO agent takes over" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "An AI agent reads your Google Search Console data, finds ranking opportunities, and writes and publishes SEO- and GEO-optimized content on autopilot.",
    images: ["https://talktomedata.com/blog/Google_Search_Console_Ggraph_GEO.png"],
  },
}

const faqs = [
  {
    q: "What is the difference between SEO and GEO?",
    a: "SEO (search engine optimization) is about ranking in traditional search results like Google's blue links. GEO (generative engine optimization) is about being cited and quoted inside AI answers — Google's AI Overviews, ChatGPT, Perplexity, and Gemini. They overlap, but GEO rewards clear, well-structured, citable content that an AI can lift and attribute to you. The agent is trained to optimize for both at once.",
  },
  {
    q: "How does the agent connect to my Google Search Console?",
    a: "We connect it to your Google Search Console property through Google's official API during onboarding — read-only. From then on the agent can pull your real clicks, impressions, average position, and query-level data whenever it runs, so every recommendation is based on your actual performance rather than generic best practices.",
  },
  {
    q: "Does the agent publish content automatically, or do I approve it first?",
    a: "Both modes are supported. You can run it in a review-first mode where every draft lands in your inbox or CMS as a draft for approval, or in full autopilot where it writes and publishes on a schedule. Most clients start in review mode and switch specific content types to autopilot once they trust the output.",
  },
  {
    q: "How often does the agent run?",
    a: "On demand whenever you ask it, and on a recurring schedule — typically a weekly run that re-pulls your Search Console data, refreshes its list of opportunities, and produces new or updated content. You set the cadence.",
  },
  {
    q: "What CMS or publishing platforms does it work with?",
    a: "It publishes into most common stacks — WordPress, Webflow, Ghost, Shopify blogs, or a headless CMS via API. If you have a custom setup, we wire the publishing step to your platform during the build.",
  },
  {
    q: "Can Talk to Me Data build and host this agent for me?",
    a: "Yes. We build, connect, and host the SEO and GEO agent on our infrastructure — the Search Console integration, the model access, the training on your brand and SEO/GEO best practices, and the publishing connection — so there is nothing to set up on your side.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${URL}#article`,
      headline: TITLE,
      description: DESCRIPTION,
      image: "https://talktomedata.com/blog/Google_Search_Console_Ggraph_GEO.png",
      datePublished: "2026-07-17",
      dateModified: "2026-07-17",
      author: { "@type": "Organization", name: "Talk to Me Data", url: "https://talktomedata.com" },
      publisher: {
        "@type": "Organization",
        name: "Talk to Me Data",
        url: "https://talktomedata.com",
        logo: { "@type": "ImageObject", url: "https://talktomedata.com/favicon-96x96.png" },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": URL },
    },
    {
      "@type": "FAQPage",
      "@id": `${URL}#faq`,
      mainEntity: faqs.map(faq => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
