import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How to Build a Social Media AI Agent (With the Exact Prompt to Copy)",
  description:
    "Build a social media AI agent that scrapes your Instagram, ranks your top-performing posts, extracts winning hooks, and generates 10 new content ideas — automatically logged to a Google Sheet. Includes the full prompt to copy.",
  keywords: [
    "social media AI agent",
    "Instagram AI agent",
    "how to build social media AI agent",
    "AI agent for Instagram",
    "automate social media content",
    "AI content strategy",
    "Claude social media agent",
    "Apify Instagram scraper agent",
    "AI content ideas",
  ],
  alternates: {
    canonical: "https://talktomedata.com/blog/how-to-build-social-media-ai-agent",
  },
  openGraph: {
    title: "How to Build a Social Media AI Agent (With the Exact Prompt to Copy)",
    description:
      "An AI agent that analyzes your Instagram, extracts what works, and generates 10 new content ideas modeled on your top performers — with the full prompt included.",
    type: "article",
    url: "https://talktomedata.com/blog/how-to-build-social-media-ai-agent",
    siteName: "Talk to Me Data",
    publishedTime: "2026-06-22",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Build a Social Media AI Agent",
    description:
      "Scrapes your Instagram, finds what works, writes 10 new ideas. Includes the full agent prompt to copy.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
