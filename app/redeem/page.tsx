import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CONTACT_EMAIL } from "@/components/legal-page"
import { RedeemForm } from "@/components/redeem/redeem-form"
import { Reveal } from "@/components/sections/social-agent/parts"

const PAGE_URL = "https://talktomedata.com/redeem"
const TITLE = "Redeem your AppSumo code | Talk to me Data"
const DESCRIPTION = "Bought Talk to me Data on AppSumo? Enter your code to unlock the Solo plan."

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
              Enter the code from your AppSumo purchase to unlock the Solo plan.
            </p>
          </Reveal>

          <Reveal className="mt-10 rounded-[32px] border border-hairline bg-white p-6 sm:p-8">
            <RedeemForm />
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
