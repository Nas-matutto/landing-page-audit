"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Headphones, Users, Calendar, FileText, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { InteractiveAgentCard, type AgentCardData } from "@/components/ui/card-7"

const CARDS: AgentCardData[] = [
  {
    icon: Headphones,
    iconColor: "#ffffff",
    gradientFrom: "#2563eb",
    gradientTo: "#60a5fa",
    title: "Customer support agent",
    tag: "Answers questions 24/7",
    description: "Handles FAQs, tracks orders, and escalates complex issues — without a support team on call.",
    examples: [
      { label: "Ticket resolved", value: "Order #4821 status confirmed" },
      { label: "Auto-escalated", value: "Billing dispute → Human agent" },
      { label: "Response time", value: "< 2 seconds" },
    ],
  },
  {
    icon: Users,
    iconColor: "#ffffff",
    gradientFrom: "#0d9488",
    gradientTo: "#5eead4",
    title: "Lead qualification agent",
    tag: "Captures and scores inbound leads",
    description: "Engages visitors, asks qualifying questions, and routes hot leads directly to your inbox.",
    examples: [
      { label: "Lead scored", value: "High intent · Budget confirmed" },
      { label: "Routed to", value: "Sales rep · Slack notified" },
      { label: "Qualified today", value: "14 of 38 visitors" },
    ],
  },
  {
    icon: Calendar,
    iconColor: "#ffffff",
    gradientFrom: "#d97706",
    gradientTo: "#fcd34d",
    title: "Booking & scheduling agent",
    tag: "Automates appointments",
    description: "Lets clients self-book, reschedule, and get reminders — synced to your calendar automatically.",
    examples: [
      { label: "Booking confirmed", value: "Tue 14 Jan · 10:00am" },
      { label: "Reminder sent", value: "24h before · via email" },
      { label: "Reschedule handled", value: "No back-and-forth needed" },
    ],
  },
  {
    icon: FileText,
    iconColor: "#ffffff",
    gradientFrom: "#7c3aed",
    gradientTo: "#c4b5fd",
    title: "Document Q&A agent",
    tag: "Answers from your own docs",
    description: "Upload your manuals, policies, or reports. Your agent answers staff or client questions instantly.",
    examples: [
      { label: "Source", value: "Employee handbook · p.12" },
      { label: "Question answered", value: "Parental leave policy" },
      { label: "Accuracy", value: "Grounded in your actual docs" },
    ],
  },
]

const AUTO_INTERVAL = 3500

export function WhatWeAnalyzeSection() {
  const router = useRouter()
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => setActive((a) => (a + 1) % CARDS.length), [])
  const prev = useCallback(() => setActive((a) => (a - 1 + CARDS.length) % CARDS.length), [])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(next, AUTO_INTERVAL)
  }, [next])

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [resetTimer])

  const handlePrev = () => { prev(); resetTimer() }
  const handleNext = () => { next(); resetTimer() }

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

          {/* Desktop: all 4 cards side by side */}
          <div className="hidden lg:flex items-stretch gap-5 justify-center">
            {CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                animate={{
                  scale: i === active ? 1.04 : 0.97,
                  opacity: i === active ? 1 : 0.72,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={() => { setActive(i); resetTimer() }}
                className="cursor-pointer"
              >
                <InteractiveAgentCard card={card} />
              </motion.div>
            ))}
          </div>

          {/* Mobile / tablet: single card carousel */}
          <div className="lg:hidden flex flex-col items-center gap-6">
            <div className="relative w-72">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <InteractiveAgentCard card={CARDS[active]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-primary/40 hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {CARDS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActive(i); resetTimer() }}
                    className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-primary" : "w-2 bg-slate-300"}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-primary/40 hover:text-primary transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop dot indicators */}
          <div className="hidden lg:flex justify-center gap-2 mt-8">
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); resetTimer() }}
                className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-primary" : "w-2 bg-slate-300"}`}
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
