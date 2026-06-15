import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Talk to Me Data: Business Automation Checklist",
  description:
    "A free step-by-step checklist to identify which business tasks you should automate first. Find your quick wins and reclaim 10+ hours a week — no technical knowledge required.",
  keywords: [
    "business automation checklist",
    "what to automate in business",
    "small business automation",
    "workflow automation guide",
    "automate repetitive tasks",
    "productivity automation",
  ],
  alternates: {
    canonical: "https://talktomedata.com/free-guides/business-automation-checklist",
  },
  openGraph: {
    title: "Business Automation Checklist — Free Download",
    description:
      "Identify exactly what to automate in your business, in what order, and which tools to use. Free PDF checklist.",
    type: "article",
    url: "https://talktomedata.com/free-guides/business-automation-checklist",
    siteName: "Talk to Me Data",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Automation Checklist — Free Download",
    description:
      "Find out which tasks in your business are draining your time — and automate them this week.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
