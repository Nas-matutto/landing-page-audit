"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack"

const USE_CASES = [
  {
    id: "uc-1",
    title: "Customer Support Agent",
    description:
      "Handles FAQs, tracks orders, and escalates complex issues — without a support team on call. Available 24/7 across every channel your customers use.",
  },
  {
    id: "uc-2",
    title: "Lead Qualification Agent",
    description:
      "Engages visitors, asks qualifying questions, and routes hot leads directly to your inbox. Your sales team only speaks to prospects who are ready to buy.",
  },
  {
    id: "uc-3",
    title: "Booking & Scheduling Agent",
    description:
      "Lets clients self-book, reschedule, and get reminders — synced to your calendar automatically. No back-and-forth, no missed appointments.",
  },
  {
    id: "uc-4",
    title: "Document Q&A Agent",
    description:
      "Upload your manuals, policies, or reports. Your agent answers staff or client questions instantly — always grounded in your actual documents.",
  },
  {
    id: "uc-5",
    title: "Order Tracking Agent",
    description:
      "Gives customers real-time order status, shipping updates, and return instructions automatically — reducing support tickets and keeping customers informed.",
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
              <span className="text-primary">use it for</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-sm mb-8">
              From answering customer questions to qualifying leads — any repetitive workflow is a candidate for an AI agent.
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
          <ContainerScroll className="min-h-[420vh] space-y-6 py-24">
            {USE_CASES.map((uc, index) => (
              <CardSticky
                key={uc.id}
                index={index + 2}
                incrementY={14}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    {uc.title}
                  </h3>
                  <span className="text-2xl font-bold text-primary/30 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {uc.description}
                </p>
                <button
                  onClick={() => router.push("/book-demo")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </CardSticky>
            ))}
          </ContainerScroll>

        </div>
      </div>
    </section>
  )
}
