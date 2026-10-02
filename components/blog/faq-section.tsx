import { ChevronDown } from "lucide-react"
import type { Faq } from "@/lib/blog"

/**
 * Native <details> keeps every answer in the server HTML: crawlers and AI
 * answer engines that don't run JavaScript still read the full Q&A, and the
 * same `faqs` array feeds the FAQPage JSON-LD, so the two can't drift.
 */
export function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null
  return (
    <section aria-labelledby="faq" className="mt-12">
      <h2 id="faq" className="mb-6 text-3xl font-semibold tracking-[-0.02em] text-ink">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map(faq => (
          <details key={faq.question} className="group overflow-hidden rounded-2xl border border-hairline bg-white transition-colors open:border-ink">
            <summary className="flex cursor-pointer list-none items-center justify-between p-5 transition-colors hover:bg-mist [&::-webkit-details-marker]:hidden">
              <h3 className="pr-4 text-[15px] font-semibold text-ink">{faq.question}</h3>
              <ChevronDown className="h-4 w-4 shrink-0 text-ink transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-hairline px-5 pb-5 pt-4 text-sm leading-relaxed text-quiet">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
