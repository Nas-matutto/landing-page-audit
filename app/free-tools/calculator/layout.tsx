import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Workflow Time Savings Calculator — Free Tools | Talk to me Data",
  description:
    "Enter how many hours your team spends on manual tasks each week. Get an instant estimate of time saved and annual dollar value at $15/hr — no signup required.",
  alternates: {
    canonical: "https://talktomedata.com/free-tools/calculator",
  },
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
