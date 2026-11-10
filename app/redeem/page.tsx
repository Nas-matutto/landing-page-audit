import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CONTACT_EMAIL } from "@/components/legal-page"
import { RedeemForm } from "@/components/redeem/redeem-form"
import { Reveal } from "@/components/sections/social-agent/parts"

export const metadata: Metadata = {
  title: "Redeem your AppSumo code | Talk to me Data",
  description: "Bought Talk to me Data on AppSumo? Enter your code to unlock the Solo plan.",
  alternates: { canonical: "https://talktomedata.com/redeem" },
  robots: { index: false, follow: false },
}

const INCLUDED = [
  "450 actions a month across every agent",
  "All five pre-built AI agents",
  "Autopilot: scheduled runs, weekly refreshes and daily leads",
  "1 custom agent built around your workflow",
]

export default function RedeemPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-white px-6 pb-24 pt-36 sm:pt-44 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Reveal className="text-center">
            <p className="eyebrow mb-5">AppSumo</p>
            <h1 className="display text-[clamp(2.5rem,7vw,4rem)]">Redeem your code</h1>
            <p className="lede mx-auto mt-6 max-w-md text-lg">
              Enter the code from your AppSumo purchase to unlock the Solo plan.
            </p>
          </Reveal>

          <Reveal className="mt-10 rounded-[32px] border border-hairline bg-white p-6 sm:p-8">
            <RedeemForm />
          </Reveal>

          <Reveal className="mt-8 rounded-3xl bg-mist p-6 sm:p-7">
            <p className="eyebrow mb-4">What Solo includes</p>
            <ul className="space-y-2.5">
              {INCLUDED.map(item => (
                <li key={item} className="flex gap-3 text-sm text-ink">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <p className="mt-8 text-center text-sm text-quiet">
            Trouble with your code? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
