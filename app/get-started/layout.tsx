import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get Started — Build Your AI Agent | Talk to Me Data",
  description:
    "Tell us what you want to automate and which tools your agent should connect to. We'll show you exactly what your custom AI agent can do — in under 2 minutes.",
}

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
