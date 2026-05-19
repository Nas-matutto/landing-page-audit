"use client"

import { motion } from "framer-motion"
import { Headphones, Users, Calendar, FileText, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const USE_CASES = [
  {
    icon: Headphones,
    color: "text-blue-600",
    bg: "bg-blue-50",
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
    color: "text-teal-600",
    bg: "bg-teal-50",
    title: "Lead qualification agent",
    tag: "Captures and scores inbound leads",
    description: "Engages visitors, asks qualifying questions, and routes hot leads directly to your inbox.",
    examples: [
      { label: "Lead scored", value: "High intent · Budget confirmed" },
      { label: "Routed to", value: "Sales rep · Slack notified" },
      { label: "Qualified today", value: "14 of 38 visitors" },
    ],
  },
]

const USE_CASES_2 = [
  {
    icon: Calendar,
    color: "text-amber-600",
    bg: "bg-amber-50",
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
    color: "text-violet-600",
    bg: "bg-violet-50",
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

function UseCaseCard({ uc, delay }: { uc: typeof USE_CASES[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl ${uc.bg} flex items-center justify-center`}>
          <uc.icon className={`w-5 h-5 ${uc.color}`} />
        </div>
        <div>
          <h3 className="font-bold text-base text-slate-800">{uc.title}</h3>
          <p className={`text-xs font-semibold ${uc.color}`}>{uc.tag}</p>
        </div>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">{uc.description}</p>
      <div className="space-y-2">
        {uc.examples.map((ex, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
            <span className="text-xs text-slate-400">{ex.label}</span>
            <span className="text-xs font-medium text-slate-700">{ex.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function WhatWeAnalyzeSection() {
  const router = useRouter()
  return (
    <section id="use-cases" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Use cases</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              What businesses use it for
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              From answering customer questions to qualifying leads — any repetitive workflow is a candidate for an AI agent.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {USE_CASES.map((uc, i) => (
                <UseCaseCard key={i} uc={uc} delay={i * 0.1} />
              ))}
            </div>
            <div className="space-y-6">
              {USE_CASES_2.map((uc, i) => (
                <UseCaseCard key={i} uc={uc} delay={i * 0.1 + 0.1} />
              ))}
            </div>
          </div>

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
