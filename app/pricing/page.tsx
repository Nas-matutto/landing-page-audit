"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useState } from "react"

export default function PricingPage() {
  // Keep billing period state for future subscription model (currently hidden)
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual")

  const handleGetStarted = () => {
    window.open('https://app.talktomedata.com/signup', '_blank')
  }

  const handleContactSales = () => {
    window.location.href = 'mailto:nas@talktomedata.com?subject=Talk to me Data - Sales Inquiry&body=Hi, I would like to learn more about Talk to me Data.'
  }

  const tiers = [
    {
      name: "Free",
      price: "$0",
      // period: "forever", // Hidden for one-off payment model
      description: "Perfect for getting started",
      features: [
        "Basic website report",
        "Basic speed report",
        "Free UX consultation",
      ],
      cta: "Get Started for Free",
      highlighted: false,
      // showBilling: false, // Hidden for one-off payment model
      action: handleGetStarted,
    },
    {
      name: "Pro",
      price: "$25", // One-off payment price
      // Alternative pricing for future subscription model (hidden):
      // price: billingPeriod === "annual" ? "$29" : "$39",
      // period: "per month",
      description: "For serious website optimization",
      features: [
        "Everything in Free, plus:",
        "Full website report",
        "Full speed report",
        "Content generation Plan",
        "Priority support",
      ],
      cta: "Get Started",
      highlighted: true,
      // showBilling: true, // Hidden for one-off payment model
      action: handleGetStarted,
    },
    {
      name: "Enterprise",
      price: "Custom",
      // period: "pricing",
      description: "For teams and agencies",
      features: [
        "Everything in Pro, plus:",
        "Competitor analysis",
        "Team accounts & collaboration",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics dashboard",
        "Custom reporting schedules",
        "Priority support",
      ],
      cta: "Contact Us",
      highlighted: false,
      action: handleContactSales,
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">
              Simple,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">
                Transparent Pricing
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
              Choose the plan that fits your needs. All plans include our core analysis features.
            </p>
          </div>

          {/* Monthly/Annual Toggle - Hidden for one-off payment model */}
          {/* Uncomment this section to re-enable subscription billing toggle */}
          {/*
          <div className="flex justify-center mb-8 md:mb-16">
            <div className="inline-flex items-center bg-secondary rounded-full p-1 gap-1">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  billingPeriod === "monthly"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  billingPeriod === "annual" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual
              </button>
            </div>
          </div>
          */}

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-12 md:mb-16">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`relative rounded-2xl border-2 p-5 sm:p-6 md:p-8 flex flex-col ${
                  tier.highlighted
                    ? "border-primary bg-primary/5 shadow-xl md:scale-105"
                    : "border-border bg-background"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-4 md:mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{tier.description}</p>
                </div>

                <div className="mb-4 md:mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold">{tier.price}</span>
                    {/* Period text hidden for one-off payment model */}
                    {/* {tier.period && (
                      <span className="text-muted-foreground text-xs sm:text-sm">/ {tier.period}</span>
                    )} */}
                  </div>
                  {/* Billing period text hidden for one-off payment model */}
                  {/* {tier.showBilling && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {billingPeriod === "annual" ? "Billed annually" : "Billed monthly"}
                    </p>
                  )} */}
                </div>

                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-grow">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={tier.action}
                  className={`w-full font-semibold py-5 md:py-6 cursor-pointer text-sm md:text-base ${
                    tier.highlighted
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ or Additional Info Section */}
          <div className="max-w-3xl mx-auto text-center mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-bold mb-4">Need help choosing?</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Not sure which plan is right for you? Get in touch and we'll help you choose!
            </p>
            <Button
              onClick={handleContactSales}
              variant="outline"
              className="cursor-pointer border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
