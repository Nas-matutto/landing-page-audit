import type { Metadata } from "next"

const URL = "https://talktomedata.com/blog/how-to-automate-social-media-posting-with-ai-agent"
const TITLE = "How to Automate Social Media Posting with an AI Agent"
const DESCRIPTION =
  "A step-by-step guide to automating social media posting with an AI agent that analyzes your channels and competitors, builds a data-driven content plan, creates the images, videos, and captions for every platform, and saves them to your folder — running independently, with no human intervention."
const IMAGE = "https://talktomedata.com/blog/social-media-ai-agent-cover.png"

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "how to automate social media posting with an AI agent",
    "automate social media",
    "AI social media agent",
    "social media automation",
    "AI content creation agent",
    "automated content plan",
    "AI social media manager",
    "autonomous social media agent",
    "AI generated social media posts",
    "AI agent for social media",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-07-23",
    images: [{ url: IMAGE, width: 1200, height: 630, alt: "AI social media agent creating images, videos, and captions for Instagram, TikTok, LinkedIn, YouTube, X, and Facebook" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "An AI agent that analyzes your channels and competitors, builds a data-driven content plan, and creates the images, videos, and captions for every platform — autonomously.",
    images: [IMAGE],
  },
}

const faqs = [
  {
    q: "Which platforms does the social media agent support?",
    a: "All the major ones — Instagram, TikTok, LinkedIn, YouTube, X (Twitter), and Facebook. It adapts each post to the platform's native format and aspect ratio, so a short-form video, a carousel, and a thread are each built the way that platform expects rather than copy-pasted across all of them.",
  },
  {
    q: "Does it actually create the images and videos, or just the text?",
    a: "It creates everything a post needs: images, short-form video, and the written copy, plus a ready-to-use caption with hooks and hashtags. You get finished, on-brand assets for each platform, not just a content calendar or a list of ideas.",
  },
  {
    q: "Does it post automatically, or do I stay in control?",
    a: "By default it does everything up to the moment of publishing and saves the finished posts into your folder, so a human just reviews and hits post. If you'd rather it publish directly on a schedule, it can — you choose how much control to keep.",
  },
  {
    q: "How does it know what content will perform?",
    a: "It analyzes your own channels to learn what already works for your audience, and studies competitor and niche accounts to spot the hooks, formats, and topics that are performing right now. Every decision in the content plan is grounded in that data rather than guesswork.",
  },
  {
    q: "Does it get better over time?",
    a: "Yes. After posts go live, the agent reads the results, compares them against the plan, and refines its understanding of what works — better hooks, better timing, better formats. The more it posts, the sharper the plan gets, so results compound over time.",
  },
  {
    q: "Can Talk to Me Data build and host this agent for me?",
    a: "Yes. We build, connect, and host the agent on our infrastructure — the channel connections, the model, the content generation, and the delivery to your folder — so there's nothing to configure or maintain on your side. Book a demo and we'll get you onboarded in days.",
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
      image: IMAGE,
      datePublished: "2026-07-23",
      dateModified: "2026-07-23",
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
