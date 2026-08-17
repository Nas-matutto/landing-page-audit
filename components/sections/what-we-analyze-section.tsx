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
    <section id="use-cases" className="border-y border-hairline bg-mist px-6 xl:px-12">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 md:gap-8 xl:gap-16">

          {/* Left — sticky */}
          <div className="left-0 top-0 md:sticky md:h-svh md:py-24 flex flex-col justify-center py-16">
            <p className="eyebrow mb-5">Use cases</p>
            <h2 className="display mb-6 text-[clamp(2rem,4.5vw,3.25rem)]">
              What businesses use it for
            </h2>
            <p className="lede mb-8 max-w-sm text-base">
              From planning your social content to finding new customers — these are agents we already build, and any workflow can become one.
            </p>
            <button
              onClick={() => router.push("/agents")}
              className="group relative inline-flex cursor-pointer items-center gap-2 self-start overflow-hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Explore Agents <ArrowRight className="h-4 w-4" />
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
                className="group/card cursor-pointer rounded-3xl border border-hairline bg-white p-8 transition-colors hover:border-ink"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink">
                    {uc.title}
                  </h3>
                  <span className="shrink-0 font-mono text-lg font-medium text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-quiet">
                  {uc.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-all group-hover/card:gap-3">
                  {uc.href === "/get-started" ? "Build yours" : "See the agent"}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </CardSticky>
            ))}
          </ContainerScroll>

        </div>
      </div>
    </section>
  )
}
