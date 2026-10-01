import { OG_IMAGE } from "@/lib/og"
import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DemoGate } from "@/components/demo-gate"

const PAGE_URL = "https://talktomedata.com/watch-demo"
const TITLE = "Watch the Demo: Custom AI Agents in Action | Talk to Me Data"
const DESCRIPTION =
  "See how we build, host and manage custom AI agents that automate your workflows, from invoice processing to lead qualification. Takes less than 2 minutes."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
  },
  twitter: {
    images: [OG_IMAGE],
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

const DEMO_AGENTS = [
  { label: "Invoice processing", href: "/agents/invoice-processing" },
  { label: "Lead qualification", href: "/agents/lead-qualification" },
  { label: "Lead finding", href: "/agents/lead-finder" },
  { label: "Customer support", href: "/agents/customer-support" },
  { label: "Real estate", href: "/agents/real-estate-agent" },
  { label: "Social media", href: "/agents/social-media" },
]

export default function WatchDemoPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="px-4 sm:px-6 pt-20 sm:pt-28 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Product demo
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 text-balance">
              Watch custom AI agents automate real business workflows
            </h1>
            <p className="mt-6 text-lg text-slate-600 text-pretty">
              In under 2 minutes, see how Talk to Me Data builds, hosts and manages AI agents that take
              repetitive work off your team. They read invoices into your accounting software, qualify
              and follow up with leads, answer customer questions and keep your calendar full, all
              connected to the tools you already use.
            </p>
            <p className="mt-4 text-base text-slate-500 text-pretty">
              Answer five quick questions to unlock the video, and we&apos;ll tailor the follow-up to
              your workflow. Prefer to talk it through?{" "}
              <Link href="/book-demo" className="font-medium text-primary hover:underline">
                Book a free 20-minute call
              </Link>
              .
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {DEMO_AGENTS.map(agent => (
                <li key={agent.href}>
                  <Link
                    href={agent.href}
                    className="inline-block rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    {agent.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <DemoGate />
      </main>
      <Footer />
    </div>
  )
}
