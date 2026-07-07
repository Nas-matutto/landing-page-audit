import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DemoGate } from "@/components/demo-gate"

export const metadata: Metadata = {
  title: "Watch the Demo — Talk to Me Data",
  description:
    "See how we build custom AI agents that automate your workflows — from invoice processing to lead qualification. Takes less than 2 minutes.",
  robots: { index: false, follow: false },
}

export default function WatchDemoPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <DemoGate />
      </main>
      <Footer />
    </div>
  )
}
