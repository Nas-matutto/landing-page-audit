import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AgentsPageContent } from "@/components/sections/agents-page-content"

export const metadata: Metadata = {
  title: "AI Agents | Talk to me Data",
  description: "Pre-built AI agents that grow your social media, rank your site on Google and in AI answers, update your website, fill your sales pipeline and find buyers in online conversations. Start free, or get a custom agent built around your workflow.",
}

export default function AgentsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AgentsPageContent />
      </main>
      <Footer />
    </div>
  )
}
