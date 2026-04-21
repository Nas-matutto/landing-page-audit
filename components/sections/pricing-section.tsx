"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Try it out. No credit card.",
    cta: "Get started",
    features: [
      "10 tool searches per month",
      "3 companies per search",
      "Job posting signals",
      "Community access",
    ],
    highlight: false,
  },
  {
    name: "Starter",
    price: "$49",
    period: "per month",
    description: "For founders doing active outreach.",
    cta: "Start for $49/mo",
    features: [
      "100 tool searches per month",
      "Full company lists (unlimited per search)",
      "Job posting + UGC signals",
      "CSV export",
      "Signal date & freshness",
      "Email support",
    ],
    highlight: true,
  },
  {
    name: "Growth",
    price: "$149",
    period: "per month",
    description: "For sales teams who run outreach at scale.",
    cta: "Start for $149/mo",
    features: [
      "Unlimited searches",
      "Unlimited company results",
      "All signal sources",
      "Bulk CSV export",
      "CRM webhook (HubSpot / Pipedrive)",
      "Priority support",
    ],
    highlight: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Pricing</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              Simple, honest pricing
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Start free. Upgrade when you're ready. No contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.highlight
                    ? "bg-primary text-white shadow-2xl shadow-primary/25 ring-2 ring-primary scale-[1.03]"
                    : "bg-white border border-slate-200 shadow-sm"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h3 className={`font-bold text-lg mb-1 ${plan.highlight ? "text-white" : "text-slate-800"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlight ? "text-white/70" : "text-slate-500"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className={`text-4xl font-black ${plan.highlight ? "text-white" : "text-slate-800"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-1 ${plan.highlight ? "text-white/60" : "text-slate-400"}`}>
                    /{plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-accent" : "text-primary"}`}
                      />
                      <span className={`text-sm leading-relaxed ${plan.highlight ? "text-white/85" : "text-slate-600"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => window.open("#", "_blank")}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    plan.highlight
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary/8 text-primary hover:bg-primary hover:text-white border border-primary/20"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-400 mt-10">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
