"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "per month",
    description: "For founders doing focused outreach.",
    cta: "Book a demo",
    features: [
      "500 credits per month",
      "Job posting + UGC signals",
      "CSV export",
      "Signal date & freshness indicators",
      "Email support",
    ],
    gradient: false,
    custom: false,
  },
  {
    name: "Custom",
    price: "Let's talk",
    period: "",
    description: "For sales teams running outreach at scale.",
    cta: "Get in touch",
    features: [
      "Everything in Starter",
      "Custom credit volume",
      "Bulk CSV export",
      "CRM webhook (HubSpot / Pipedrive)",
      "Dedicated onboarding & support",
      "Custom integrations",
    ],
    gradient: true,
    custom: true,
  },
]

export function PricingSection() {
  const router = useRouter()
  const goToDemo = () => router.push("/book-demo")

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Pricing</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
              Starting at{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">
                $49/mo
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Book a demo to see TTMD in action — then choose the plan that fits your team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl p-7 flex flex-col ${
                  plan.gradient
                    ? "bg-linear-to-br from-primary to-violet-600 text-white shadow-2xl shadow-primary/30 ring-1 ring-primary/20"
                    : "bg-white border-2 border-slate-200 shadow-sm hover:border-primary/40 transition-colors"
                }`}
              >
                {plan.gradient && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/8 rounded-full blur-2xl" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-violet-300/10 rounded-full blur-xl" />
                  </div>
                )}

                <div className="relative mb-5">
                  <h3 className={`font-bold text-lg mb-1 ${plan.gradient ? "text-white" : "text-slate-800"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.gradient ? "text-white/70" : "text-slate-500"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="relative mb-6">
                  {plan.custom ? (
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-6 h-6 text-white/70" />
                      <span className="text-2xl font-bold text-white">Let's talk</span>
                    </div>
                  ) : (
                    <>
                      <span className={`text-5xl font-black ${plan.gradient ? "text-white" : "text-slate-900"}`}>
                        {plan.price}
                      </span>
                      <span className={`text-sm ml-1.5 ${plan.gradient ? "text-white/60" : "text-slate-400"}`}>
                        /{plan.period}
                      </span>
                    </>
                  )}
                </div>

                <ul className="relative space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${plan.gradient ? "text-white/80" : "text-primary"}`}
                      />
                      <span className={`text-sm leading-relaxed ${plan.gradient ? "text-white/85" : "text-slate-600"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={goToDemo}
                  className={`relative overflow-hidden group w-full py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    plan.gradient
                      ? "bg-white text-primary hover:bg-white/92"
                      : "bg-linear-to-r from-primary to-violet-500 text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                  }`}
                >
                  {!plan.gradient && (
                    <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  )}
                  <span className="relative flex items-center gap-2">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-400 mt-10">
            All plans require a demo first. No long-term contracts.
          </p>
        </div>
      </div>
    </section>
  )
}
