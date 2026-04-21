"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "How do you detect which tools a company is using?",
    answer: "We scan two public signal sources: job postings (via ATS platforms like Greenhouse and Lever that expose public APIs for job descriptions) and user-generated content (reviews on G2, Capterra, Reddit, and Product Hunt). When a company posts a job requiring 'Salesforce experience' or an employee writes a G2 review mentioning HubSpot, we capture and index that signal.",
  },
  {
    question: "How accurate is the data?",
    answer: "We show verified signals with evidence — you'll see the actual excerpt from the job posting or review that triggered the match, plus the date it was captured. We don't infer or guess. If a company appears in your results, there's a real public source backing it up. That said, signals are indirect — we can't guarantee every company in the list is an active current user of the tool.",
  },
  {
    question: "How fresh is the data? How often is it updated?",
    answer: "We re-scan job boards weekly and UGC sources every 2–3 days. Each result shows the signal date so you know how recent the evidence is. A job posting from last week is a much stronger buying signal than one from 6 months ago.",
  },
  {
    question: "Is scraping job postings and reviews legal?",
    answer: "Yes. We only use data from public sources — job listings that companies post publicly and reviews that are publicly accessible on platforms like G2 and Reddit. We use the official public APIs where available (Greenhouse, Lever) and only access public-facing pages for the rest. We don't scrape private profile data or anything behind a login.",
  },
  {
    question: "What SaaS tools can I search for?",
    answer: "We currently cover 200+ popular SaaS tools across CRM, project management, marketing, HR, analytics, and more. This includes tools like HubSpot, Salesforce, Notion, Linear, Slack, Intercom, Mixpanel, Figma, Webflow, Monday.com, and many others. If we don't cover a tool you need, tell us — we can add it in days.",
  },
  {
    question: "Can I export the results to my CRM?",
    answer: "On the Starter plan and above, you can export any search result as a CSV with company name, domain, signal count, signal types, and most recent signal date. Growth plan users get direct CRM webhooks for HubSpot and Pipedrive, with more integrations coming.",
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
