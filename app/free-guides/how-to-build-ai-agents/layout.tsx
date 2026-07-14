import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Talk to Me Data: How to Build AI Agents",
  description:
    "A practical, free guide to automating your manual work with AI agents — the tasks worth automating, how to build your first agent in Claude, the honest limitations of the DIY path, and the done-for-you alternative.",
  keywords: [
    "how to build AI agents",
    "build an AI agent",
    "AI agents for business",
    "Claude projects agent",
    "MCP model context protocol",
    "automate manual work with AI",
    "done for you AI agents",
  ],
  alternates: {
    canonical: "https://talktomedata.com/free-guides/how-to-build-ai-agents",
  },
  openGraph: {
    title: "How to Build AI Agents — Free Guide",
    description:
      "Automate your manual work with AI agents. Build your first agent in Claude step by step, understand the DIY limitations, and see the done-for-you path.",
    type: "article",
    url: "https://talktomedata.com/free-guides/how-to-build-ai-agents",
    siteName: "Talk to Me Data",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Build AI Agents — Free Guide",
    description:
      "A practical guide to automating manual work with AI agents — build it yourself in Claude, or have it built for you.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
