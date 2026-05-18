import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AgentsPageContent } from "@/components/sections/agents-page-content"

export const metadata: Metadata = {
  title: "AI Agents — Talk to me Data",
  description: "Explore the AI agents we build, deploy, and host for your business. Customer support, lead qualification, booking, document Q&A, and more — fully managed on our infrastructure.",
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
