import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Tools — Talk to me Data",
  description:
    "Free calculators and resources for teams exploring AI automation. See how much time and money an AI agent could save your business — no signup required.",
  alternates: {
    canonical: "https://talktomedata.com/free-tools",
  },
}

export default function FreeToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
