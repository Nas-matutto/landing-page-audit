"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface FAQItem {
  question: string
  answer: string
}

/** Each page passes its own questions. */
export function FAQSection({
  eyebrow = "FAQ",
  heading = "Questions we get a lot",
  items,
}: {
  eyebrow?: string
  heading?: string
  items: FAQItem[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center">
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">
              {heading}
            </h2>
          </div>

          <div className="space-y-3">
            {items.map((faq, i) => (
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
