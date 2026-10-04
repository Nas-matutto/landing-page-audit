import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, BookOpen, CalendarDays, Check, Mail } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CONTACT_EMAIL } from "@/components/legal-page"
import { Ambassador } from "@/components/ui/ambassador"
import { Reveal } from "@/components/sections/social-agent/parts"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/support`

const TITLE = "Support | Talk to me Data"
const DESCRIPTION =
  "Get help with Talk to me Data. Learn what we do, and email us at nas@talktomedata.com with questions about your AI agents, your account or billing."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "Talk to me Data", type: "website" },
}

const MAILTO = `mailto:${CONTACT_EMAIL}`

// ── Content ───────────────────────────────────────────────────────────────────

const WHAT_WE_DO = [
  { title: "We build it", body: "Tell us the job you want done. We design a custom AI agent around your tools and the way your team already works." },
  { title: "We host it", body: "Your agent runs on our infrastructure. No servers, no code and no AI accounts or API bills to manage." },
  { title: "We look after it", body: "We monitor every agent, fix anything that breaks, and improve it as your business changes." },
]

const AGENTS = [
  { label: "Social media", href: "/agents/social-media" },
  { label: "SEO & GEO", href: "/agents/seo-geo" },
  { label: "Lead finder", href: "/agents/lead-finder" },
  { label: "Real estate", href: "/agents/real-estate-agent" },
  { label: "Data entry & reporting", href: "/agents/data-entry-reporting" },
  { label: "Customer support", href: "/agents/customer-support" },
  { label: "Lead qualification", href: "/agents/lead-qualification" },
  { label: "Invoice processing", href: "/agents/invoice-processing" },
]

const EMAIL_TIPS = [
  "The email address on your account",
  "Which agent your question is about",
  "What you expected to happen, and what happened instead",
  "A screenshot, if you have one",
]

const OTHER_WAYS = [
  {
    Icon: CalendarDays,
    title: "Book a demo",
    body: "Thinking about an agent for your business? Book a call and we'll walk you through what it can do.",
    cta: "Book a demo",
    href: "/book-demo",
  },
  {
    Icon: BookOpen,
    title: "Free guides and blog",
    body: "Step-by-step guides on building AI agents and automating the work that eats your week.",
    cta: "Browse the guides",
    href: "/free-guides",
  },
]

const ACCOUNT_LINKS = [
  { label: "Pricing and plans", href: "/pricing" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Delete your data", href: "/data-deletion" },
  { label: "Terms of Service", href: "/terms-of-service" },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${PAGE_URL}#page`,
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  mainEntity: {
    "@type": "Organization",
    name: "Talk to me Data",
    url: BASE_URL,
    email: CONTACT_EMAIL,
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: CONTACT_EMAIL },
  },
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pb-16 pt-36 sm:pt-44 lg:px-8 lg:pb-20">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-5">Support</p>
              <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.4vw,4rem)]">How can we help?</h1>
              <p className="lede mx-auto mt-6 max-w-xl text-lg sm:text-xl">
                Questions about your agent, your account or billing? Email us and a real person will get back to you.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-[32px] bg-ink px-7 py-10 text-white sm:px-10 sm:py-12">
              <div className="relative z-10 sm:pr-40">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                  <Mail className="h-4 w-4" />
                </div>
                <p className="eyebrow mt-6 text-white/50">Email us</p>
                <a href={MAILTO} className="mt-2 block break-all text-2xl font-semibold tracking-[-0.01em] text-white underline-offset-4 hover:underline sm:text-3xl">
                  {CONTACT_EMAIL}
                </a>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">Your email goes straight to Nas at Talk to me Data, not to a ticket queue.</p>
                <a
                  href={MAILTO}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-opacity hover:opacity-90 sm:w-auto"
                >
                  Send an email <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <Ambassador pose="wave" sizes="200px" className="pointer-events-none absolute -bottom-6 right-6 hidden h-[260px] w-[130px] sm:block" />
            </Reveal>
          </div>
        </section>

        {/* What to include */}
        <section className="border-y border-hairline bg-white px-6 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center xl:flex-row xl:text-left">
            <p className="eyebrow shrink-0">To help us help you, include</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {EMAIL_TIPS.map((tip) => (
                <li key={tip} className="flex items-center gap-2 text-sm font-medium text-ink">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What we do */}
        <section className="bg-mist px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-12 max-w-3xl">
              <p className="eyebrow mb-5">About Talk to me Data</p>
              <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">AI agents that do the work, managed for you</h2>
              <p className="lede mt-5 max-w-2xl text-base sm:text-lg">
                Talk to me Data builds, deploys and hosts custom AI agents for small businesses. Each agent takes a job off your plate, from posting on social media to finding leads and writing reports, and we run it for you.
              </p>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {WHAT_WE_DO.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06} className="rounded-3xl border border-hairline bg-white p-7">
                  <span className="font-mono text-sm font-medium text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-quiet">{item.body}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10">
              <p className="eyebrow mb-4">Our agents</p>
              <ul className="flex flex-wrap gap-2">
                {AGENTS.map((a) => (
                  <li key={a.href}>
                    <Link href={a.href} className="inline-flex rounded-full border border-hairline bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink">
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Other ways */}
        <section className="bg-white px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-12 text-center">
              <p className="eyebrow mb-5">Other ways to get help</p>
              <h2 className="display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">Not a support question?</h2>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              {OTHER_WAYS.map(({ Icon, title, body, cta, href }, i) => (
                <Reveal key={title} delay={i * 0.08} className="flex flex-col rounded-3xl border border-hairline bg-white p-7 sm:p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline">
                    <Icon className="h-4 w-4 text-ink" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-ink">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-quiet">{body}</p>
                  <Link
                    href={href}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-hairline px-5 py-3 text-[15px] font-semibold tracking-[0.2px] text-ink transition-colors hover:bg-mist sm:w-auto sm:self-start"
                  >
                    {cta}
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-hairline bg-mist px-7 py-6 text-center lg:flex-row lg:text-left">
              <p className="text-sm font-medium text-ink">Account, billing and your data</p>
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {ACCOUNT_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-quiet underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
