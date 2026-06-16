import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Talk to Me Data: AI Agent Readiness Audit",
  description:
    "Find out if your business is ready for AI agents. This free audit walks you through the exact areas to assess, scores your readiness, and tells you where to start — no technical knowledge required.",
  keywords: [
    "AI agent readiness",
    "is my business ready for AI",
    "AI readiness audit",
    "small business AI agents",
    "when to use AI agents",
    "AI automation readiness",
  ],
  alternates: {
    canonical: "https://talktomedata.com/free-guides/ai-agent-readiness-audit",
  },
  openGraph: {
    title: "AI Agent Readiness Audit — Free Download",
    description:
      "Score your business's readiness for AI agents. Free PDF audit with a step-by-step framework and clear next steps based on your results.",
    type: "article",
    url: "https://talktomedata.com/free-guides/ai-agent-readiness-audit",
    siteName: "Talk to Me Data",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Readiness Audit — Free Download",
    description:
      "Not sure if your business is ready for AI agents? This free audit tells you exactly where you stand.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
