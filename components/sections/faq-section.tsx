"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "Do I need any technical knowledge to get started?",
    answer: "None at all. You describe what you want to automate in plain language — we handle all the technical work. No code, no configuration files, no developer required on your side.",
  },
  {
    question: "How long does it take to get my agent live?",
    answer: "Most agents go live within 3 business days of our initial call. Complex workflows with multiple integrations may take up to a week. We'll give you a clear timeline at the end of your free call.",
  },
  {
    question: "What tools and platforms can my agent connect to?",
    answer: "We integrate with most popular business tools — Gmail, Outlook, Slack, Zendesk, HubSpot, Pipedrive, Calendly, Google Sheets, Notion, and more. If you use a tool that isn't on this list, let us know and we'll check if it's possible.",
  },
  {
    question: "Who hosts and monitors the agent after it goes live?",
    answer: "We do. Your agent runs on our infrastructure and we monitor it around the clock. If something breaks or behaves unexpectedly, we fix it — you don't have to manage anything.",
  },
  {
    question: "Can I make changes to my agent after it's deployed?",
    answer: "Yes. If your workflow changes or you want to expand what the agent does, just let us know. We handle all updates and redeployments as part of your plan.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes. We follow standard data security practices and only access the tools and data sources required to run your agent. We never share your data with third parties. For specific compliance requirements (GDPR, SOC 2, etc.), let us know on the call and we'll walk you through how we handle them.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">FAQ</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              Questions we get a lot
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  openIndex === i ? "border-primary/30 bg-primary/3" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                >
                  <span className="font-semibold text-slate-800 text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
