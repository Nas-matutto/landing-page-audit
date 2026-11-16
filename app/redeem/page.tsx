import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CONTACT_EMAIL } from "@/components/legal-page"
import { RedeemForm } from "@/components/redeem/redeem-form"
import { Reveal } from "@/components/sections/social-agent/parts"
import { APPSUMO_MAX_CODES, APPSUMO_TIERS } from "@/lib/appsumo/tiers"

const PAGE_URL = "https://talktomedata.com/redeem"
const TITLE = "Redeem your AppSumo code | Talk to me Data"
const DESCRIPTION = "Bought Talk to me Data on AppSumo? Enter your codes to unlock your lifetime deal. Stack up to 4 codes for more agents and actions."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "Talk to me Data", type: "website" },
}

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
              Enter the codes from your AppSumo purchase, then create your account or sign in. Your deal unlocks instantly.
              Stack up to {APPSUMO_MAX_CODES} codes on one account for more agents and actions.
            </p>
          </Reveal>

          <Reveal className="mt-10 rounded-[32px] border border-hairline bg-white p-6 sm:p-8">
            <RedeemForm />
          </Reveal>

          <Reveal className="mt-10">
            <h2 className="text-center text-lg font-semibold text-ink">What each stack unlocks</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {APPSUMO_TIERS.map(t => (
                <div key={t.codes} className="rounded-3xl border border-hairline bg-white p-4">
                  <p className="text-sm font-semibold text-ink">
                    {t.codes} {t.codes === 1 ? "code" : "codes"}
                  </p>
                  <p className="text-xs text-quiet">${t.price} on AppSumo</p>
                  <ul className="mt-3 space-y-1 text-sm text-ink">
                    <li>{t.readyMade} pre-built agents</li>
                    <li>{t.actions.toLocaleString()} actions a month</li>
                    <li>
                      {t.agents} custom {t.agents === 1 ? "agent" : "agents"}
                    </li>
                    <li>Autopilot</li>
                  </ul>
                </div>
              ))}
            </div>
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
