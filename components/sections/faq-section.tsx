"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "Will this work with my Shopify theme?",
      answer: "Yes! Our analysis works with all Shopify themes including custom themes, premium themes from the Shopify theme store, and free themes. We analyze your live store regardless of which theme you're using. The recommendations we provide are theme-agnostic and focus on conversion optimization principles that apply universally."
    },
    {
      question: "Do I need technical knowledge to implement the recommendations?",
      answer: "No technical knowledge required! Our reports include step-by-step instructions for each recommendation. Many fixes can be done directly in your Shopify admin without touching any code. For technical recommendations (like image optimization or app removal), we provide clear instructions and link to Shopify's documentation. If you prefer, you can share the report with your developer or hire a Shopify expert to implement the changes."
    },
    {
      question: "How long does it take to see conversion improvements?",
      answer: "It depends on which recommendations you implement first. Quick wins like fixing broken mobile buttons or adding trust badges can show results within days. Site speed improvements typically show impact within 1-2 weeks. More comprehensive changes like restructuring product pages may take 3-4 weeks to show full impact. We prioritize our recommendations by expected impact and implementation effort, so you can focus on high-impact, quick wins first."
    },
    {
      question: "Can you analyze Shopify Plus stores?",
      answer: "Absolutely! We analyze both standard Shopify stores and Shopify Plus stores. For Shopify Plus merchants, we also examine Plus-specific features like custom checkout, expanded APIs, and advanced reporting capabilities. Our recommendations take into account the additional customization options available to Plus merchants."
    },
    {
      question: "What if I use custom checkout or headless commerce?",
      answer: "We can analyze stores with custom checkout experiences. For headless Shopify implementations, our analysis focuses on the storefront experience, API performance, and conversion funnel optimization. Since headless setups vary significantly, some recommendations may require customization. We'll flag which recommendations apply to your specific setup and provide guidance on implementation approaches for headless architectures."
    },
    {
      question: "How often should I run a new analysis?",
      answer: "We recommend running a new analysis every 30-60 days, especially after making changes to your store. This helps you track improvement over time and identify new optimization opportunities as you add products, change themes, or install new apps. Many merchants run a baseline analysis, implement recommendations, then re-analyze after 30 days to measure impact and get fresh insights."
    },
    {
      question: "Do you analyze all pages or just the homepage?",
      answer: "We analyze your entire store including homepage, product pages, collection pages, cart, and checkout flow. We also examine your most important product pages (typically your best sellers) in detail. The analysis covers navigation, search functionality, mobile experience across all pages, and the complete customer journey from landing to purchase."
    },
    {
      question: "What about apps and third-party integrations?",
      answer: "We identify which apps may be slowing down your site or causing conversion friction. Common issues include apps that load unnecessary scripts, conflict with your theme, or create mobile usability problems. We'll recommend which apps to keep, which to replace with lighter alternatives, and which to remove entirely. We also check if critical conversion apps (like reviews, upsells, or email capture) are properly implemented."
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Everything you need to know about analyzing and optimizing your Shopify store
            </p>
          </div>

          {/* FAQ accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border-2 border-border rounded-lg overflow-hidden bg-background hover:border-primary/30 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-foreground leading-relaxed border-t border-border pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <p className="text-lg text-foreground font-semibold mb-2">
              Still have questions?
            </p>
            <p className="text-muted-foreground">
              Get your free analysis and we'll answer any questions specific to your store
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}