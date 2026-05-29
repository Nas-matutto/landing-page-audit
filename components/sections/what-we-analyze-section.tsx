"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { AgentCard3D } from "@/components/ui/3d-card"

const AGENTS = [
  {
    title: "Customer Support Agent",
    description: "Handles FAQs, tracks orders, and escalates complex issues — without a support team on call.",
    gradient: "linear-gradient(135deg, #185FA5 0%, #1e40af 100%)",
  },
  {
    title: "Lead Qualification Agent",
    description: "Engages visitors, asks qualifying questions, and routes hot leads directly to your inbox.",
    gradient: "linear-gradient(135deg, #1e40af 0%, #4338ca 100%)",
  },
  {
    title: "Booking & Scheduling Agent",
    description: "Lets clients self-book, reschedule, and get reminders — synced to your calendar automatically.",
    gradient: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
  },
  {
    title: "Document Q&A Agent",
    description: "Upload your manuals, policies, or reports. Your agent answers staff or client questions instantly.",
    gradient: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)",
  },
  {
    title: "Order Tracking Agent",
    description: "Gives customers real-time order status, shipping updates, and return instructions — automatically.",
    gradient: "linear-gradient(135deg, #185FA5 0%, #0369a1 100%)",
  },
  {
    title: "Onboarding Agent",
    description: "Guides new users or clients through setup steps, collects required info, and answers questions as they go.",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #185FA5 100%)",
  },
  {
    title: "Invoice Processing Agent",
    description: "Reads, extracts, and routes invoice data from emails or uploads — keeping your finance team hands-free.",
    gradient: "linear-gradient(135deg, #3730a3 0%, #4338ca 100%)",
  },
]

const CARD_WIDTH = 288 // w-72 = 18rem = 288px
const GAP = 20

export function WhatWeAnalyzeSection() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const maxIndex = AGENTS.length - 1

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1))

  const offset = -(index * (CARD_WIDTH + GAP))

  return (
    <section id="use-cases" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Use cases</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              What businesses use it for
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              From answering customer questions to qualifying leads — any repetitive workflow is a candidate for an AI agent.
            </p>
          </div>

          {/* Carousel wrapper */}
          <div className="relative flex items-center gap-3">
            {/* Left arrow */}
            <button
              onClick={prev}
              disabled={index === 0}
              className="shrink-0 z-10 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Track */}
            <div className="overflow-hidden grow" style={{ perspective: "1000px" }}>
              <motion.div
                ref={trackRef}
                className="flex gap-5"
                animate={{ x: offset }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {AGENTS.map((agent) => (
                  <AgentCard3D
                    key={agent.title}
                    title={agent.title}
                    description={agent.description}
                    gradient={agent.gradient}
                    actionText="Learn more"
                    onActionClick={() => router.push("/book-demo")}
                  />
                ))}
              </motion.div>
            </div>

            {/* Right arrow */}
            <button
              onClick={next}
              disabled={index === maxIndex}
              className="shrink-0 z-10 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {AGENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2 bg-slate-300"}`}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => router.push("/agents")}
              className="relative overflow-hidden group inline-flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 transition-all cursor-pointer"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Explore Agents <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
