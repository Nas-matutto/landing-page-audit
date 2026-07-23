"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack"

const USE_CASES = [
  {
    id: "uc-1",
    title: "AI Social Media Agent",
    description:
      "Plans, writes, and posts content on your behalf — studying what performs, generating on-brand ideas, and keeping your feed active without you lifting a finger.",
    href: "/agents/social-media",
  },
  {
    id: "uc-2",
    title: "Lead Finder Agent",
    description:
      "Finds companies that match your ideal customer, researches each one, and hands your sales team a steady stream of qualified, ready-to-contact prospects — no cold lists.",
    href: "/agents/lead-finder",
  },
  {
    id: "uc-3",
    title: "SEO & GEO Agent",
    description:
      "Reads your Search Console, spots the keywords you can win, and writes and publishes content that ranks on Google and gets cited by AI answer engines — on autopilot.",
    href: "/agents/seo-geo",
  },
  {
    id: "uc-4",
    title: "Invoice Processing Agent",
    description:
      "Reads any invoice — PDF, scan, or photo — extracts every line item, and enters it straight into your accounting software. You just review and approve.",
    href: "/agents/invoice-processing",
  },
  {
    id: "uc-5",
    title: "Customize to Any Workflow",
    description:
      "Every business has workflows that don't fit a template. Tell us what you want to automate and we'll design a custom agent built around your exact process.",
    href: "/get-started",
  },
]

export function WhatWeAnalyzeSection() {
  const router = useRouter()

  return (
    <section id="use-cases" className="bg-slate-50 px-6 xl:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 md:gap-8 xl:gap-16">

          {/* Left — sticky */}
          <div className="left-0 top-0 md:sticky md:h-svh md:py-24 flex flex-col justify-center py-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              Use cases
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              What businesses{" "}
              <span className="bg-linear-to-r from-primary to-violet-500 bg-clip-text text-transparent">use it for</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-sm mb-8">
              From planning your social content to finding new customers — these are agents we already build, and any workflow can become one.
            </p>
            <button
              onClick={() => router.push("/agents")}
              className="relative overflow-hidden group self-start inline-flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 transition-all cursor-pointer"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Explore Agents <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Right — stacking cards */}
          <ContainerScroll className="min-h-[120vh] space-y-6 py-24">
            {USE_CASES.map((uc, index) => (
              <CardSticky
                key={uc.id}
                index={index + 7}
                incrementY={14}
                onClick={() => router.push(uc.href)}
                className="group/card cursor-pointer rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover/card:text-primary transition-colors">
                    {uc.title}
                  </h3>
                  <span className="text-2xl font-bold text-primary/30 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {uc.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover/card:gap-3 transition-all">
                  {uc.href === "/get-started" ? "Build yours" : "See the agent"}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </CardSticky>
            ))}
          </ContainerScroll>

        </div>
      </div>
    </section>
  )
}
