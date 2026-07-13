import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GetStartedFlow } from "@/components/get-started-flow"

export const metadata: Metadata = {
  title: "Get Started — Build Your AI Agent | Talk to Me Data",
  description:
    "Tell us what you want to automate and which tools your agent should connect to. We'll show you exactly what your custom AI agent can do — in under 2 minutes.",
}

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <GetStartedFlow />
      </main>
      <Footer />
    </div>
  )
}
