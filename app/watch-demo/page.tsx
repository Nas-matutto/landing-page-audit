import { OG_IMAGE } from "@/lib/og"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Ambassador } from "@/components/ui/ambassador"
import { DEMO_EMBED_URL, DEMO_VIDEO_ID, SIGNUP_URL } from "@/lib/links"

const PAGE_URL = "https://talktomedata.com/watch-demo"
const TITLE = "Watch the Demo: AI Agents in Action | Talk to me Data"
const DESCRIPTION =
  "See how Talk to me Data builds, hosts and manages AI agents that take repetitive work off your team, connected to the tools you already use."

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
    siteName: "Talk to me Data",
  },
  twitter: {
    images: [OG_IMAGE],
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Talk to me Data Demo: the new generation of AI Agents",
  description: DESCRIPTION,
  thumbnailUrl: `https://i.ytimg.com/vi/${DEMO_VIDEO_ID}/hqdefault.jpg`,
  embedUrl: DEMO_EMBED_URL,
  contentUrl: `https://www.youtube.com/watch?v=${DEMO_VIDEO_ID}`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <Header />

      <main className="flex-1">
        <section className="bg-white px-6 pt-36 pb-24 sm:pt-44 sm:pb-32 lg:px-8 lg:pt-36">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-5">Product demo</p>
            <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.4vw,4rem)]">
              See your next AI agent at work
            </h1>
            <p className="lede mx-auto mt-6 max-w-xl text-lg sm:text-xl">
              Watch how we build, host and manage AI agents that take repetitive work off your team, connected to
              the tools you already use.
            </p>
          </div>

          {/* The demo */}
          <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border border-hairline bg-mist p-2 sm:p-3">
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-ink">
              <iframe
                src={`${DEMO_EMBED_URL}?rel=0`}
                title="Talk to me Data product demo"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>

          {/* What next */}
          <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl border border-hairline bg-white">
            <div className="flex flex-col items-center gap-8 p-8 sm:p-10 md:flex-row md:items-end md:justify-between">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-semibold tracking-[-0.01em] text-ink sm:text-3xl">
                  Want one built for your workflow?
                </h2>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-quiet">
                  Book a free 20-minute call. Tell us the job you want off your plate and we&apos;ll show you what your
                  agent could do.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                  <Link
                    href="/book-demo"
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold tracking-[0.2px] text-white transition-opacity hover:opacity-85"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                    <span className="relative flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      Book a free call
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                  <a
                    href={SIGNUP_URL}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-hairline px-6 py-3.5 text-[15px] font-semibold tracking-[0.2px] text-ink transition-colors hover:bg-mist"
                  >
                    Start free
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <Ambassador pose="thumbs-up" sizes="160px" className="hidden h-44 w-36 shrink-0 md:block" />
            </div>
          </div>

          {/* Agents shown in the demo */}
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <p className="eyebrow mb-5">Explore the agents</p>
            <ul className="flex flex-wrap justify-center gap-2">
              {DEMO_AGENTS.map((agent) => (
                <li key={agent.href}>
                  <Link
                    href={agent.href}
                    className="inline-block rounded-full border border-hairline px-4 py-1.5 text-sm text-ink transition-colors hover:bg-mist"
                  >
                    {agent.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
