import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Guides — Talk to me Data",
  description:
    "Free downloadable guides on AI agents, automation, and how to build workflows that save your business time. No signup required.",
  alternates: {
    canonical: "https://talktomedata.com/free-guides",
  },
}

const guides = [
  {
    tag: "Checklist",
    title: "The Business Automation Checklist",
    description:
      "Identify which tasks in your business are draining your time — and get a prioritized list of automations you can ship this week. Takes 20 minutes, saves 10+ hours.",
    href: "/free-guides/business-automation-checklist",
    cta: "Get the free checklist",
  },
]

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
              Free downloadable guides on AI agents and automation for your business. No spam, no upsell — just useful.
            </p>
          </div>

          {/* Guide cards */}
          <div className="space-y-6">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block rounded-2xl border border-slate-200 hover:border-primary/40 hover:shadow-md transition-all overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Accent strip */}
                  <div
                    className="sm:w-2 h-2 sm:h-auto shrink-0"
                    style={{ background: "linear-gradient(180deg, #185FA5, #7c3aed)" }}
                  />

                  <div className="flex-1 p-7">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        <Download className="w-3 h-3" />
                        {guide.tag}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{guide.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                      {guide.cta}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* More coming */}
          <div className="mt-8 border border-dashed border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">More coming soon</p>
            <p className="text-slate-400 text-sm">
              More guides on AI agents, lead generation, and automation dropping soon.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
