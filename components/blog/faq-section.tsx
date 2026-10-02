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
      <h2 id="faq" className="mb-6 text-3xl font-bold text-foreground">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map(faq => (
          <details key={faq.question} className="group overflow-hidden rounded-xl border-2 border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between p-5 transition-colors hover:bg-muted/40 [&::-webkit-details-marker]:hidden">
              <h3 className="pr-4 text-sm font-semibold text-foreground">{faq.question}</h3>
              <ChevronDown className="h-4 w-4 shrink-0 text-primary transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-border px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
