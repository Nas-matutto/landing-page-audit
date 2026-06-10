import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Free Guides — Talk to me Data",
  description:
    "Free downloadable guides on AI agents, automation, and how to build workflows that save your business time. No signup required.",
  alternates: {
    canonical: "https://talktomedata.com/free-guides",
  },
}

export default function FreeGuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 sm:pt-40 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Hero */}
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Free Guides
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Guides to help you build smarter
            </h1>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              Free downloadable guides on AI agents and automation for your business. No signup required.
            </p>
          </div>

          {/* Coming soon */}
          <div className="border border-dashed border-slate-200 rounded-2xl p-16 text-center">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Coming soon</p>
            <p className="text-slate-500 text-sm">
              Downloadable guides on building AI agents, automating your workflows, and getting started with AI for your business — dropping soon.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
