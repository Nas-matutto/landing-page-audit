"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "Do I need any technical knowledge to get started?",
    answer: "None at all. You describe what you want to automate in plain language and we handle all the technical work. No code, no configuration files, no developer required on your side.",
  },
  {
    question: "How long does it take to get my agent live?",
    answer: "Most agents are live between 24 hours and 3 business days of our initial call. Complex workflows with multiple integrations may take up to a week. We'll give you a clear timeline at the end of your free call.",
  },
  {
    question: "What tools and platforms can my agent connect to?",
    answer: "We integrate with most popular business tools - Gmail, Outlook, Slack, Zendesk, HubSpot, Pipedrive, Calendly, Google Sheets, Notion, and more. If you use a tool that isn't on this list, let us know and we'll check if it's possible.",
  },
  {
    question: "Who hosts and monitors the agent after it goes live?",
    answer: "We do. Your agent runs on our infrastructure and we monitor it around the clock. If something breaks or behaves unexpectedly, we fix it - you don't have to manage anything.",
  },
  {
    question: "Can I make changes to my agent after it's deployed?",
    answer: "Yes. If your workflow changes or you want to expand what the agent does, just let us know. We handle all updates and redeployments as part of your plan.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes. We follow standard data security practices and only access the tools and data sources required to run your agent.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center">
            <p className="eyebrow mb-5">FAQ</p>
            <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">
              Questions we get a lot
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-3xl border transition-colors duration-200 ${
                  openIndex === i ? "border-ink bg-white" : "border-hairline bg-white hover:bg-mist"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-ink sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-quiet transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
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
                      <div className="border-t border-hairline px-6 pb-5 pt-4 text-sm leading-relaxed text-quiet">
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
