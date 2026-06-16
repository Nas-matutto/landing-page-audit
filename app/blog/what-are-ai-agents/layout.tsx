import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "What Are AI Agents? A Plain-English Guide for Business Owners",
  description:
    "AI agents are software systems that can perceive, reason, and take autonomous actions to complete multi-step tasks. This guide explains what they are, how they work, and what they can do for your business — with a quiz to test your knowledge.",
  keywords: [
    "what are AI agents",
    "AI agents explained",
    "AI agents for business",
    "how do AI agents work",
    "AI agent vs chatbot",
    "types of AI agents",
    "AI agents basics",
    "agentic AI",
    "autonomous AI",
  ],
  alternates: {
    canonical: "https://talktomedata.com/blog/what-are-ai-agents",
  },
  openGraph: {
    title: "What Are AI Agents? A Plain-English Guide for Business Owners",
    description:
      "AI agents go far beyond chatbots. This guide explains what they are, how they work, the different types, and what they can realistically do for your business today.",
    type: "article",
    url: "https://talktomedata.com/blog/what-are-ai-agents",
    siteName: "Talk to Me Data",
    publishedTime: "2026-06-16",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Are AI Agents? A Plain-English Guide",
    description:
      "Go beyond chatbots. Learn what AI agents actually are, how they work, and what they can do for your business.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
