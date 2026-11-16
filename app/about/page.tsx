import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CONTACT_EMAIL } from "@/components/legal-page"
import { Reveal } from "@/components/sections/social-agent/parts"
import { SIGNUP_URL } from "@/lib/links"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/about`

const TITLE = "About us | Talk to me Data"
const DESCRIPTION =
  "Talk to me Data is built by Nas, an ex-Amazon founder who built, raised for and exited a startup, and has shipped more than 50 AI products. Meet the person behind the agents."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "Talk to me Data", type: "website" },
}

// ── Content ───────────────────────────────────────────────────────────────────
// Background facts are Nas's own, as stated on sellingwithnas.com. Company
// details match the privacy policy.

const COMPANY = {
  legalName: "MATUTTO LTD",
  number: "12558540",
  city: "London",
}

const FOUNDER = {
  name: "Nasser Mansurali",
  shortName: "Nas",
  image: "/authors/nas-paris.jpg",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nasser-mansurali-659145102/" },
    { label: "Instagram", href: "https://www.instagram.com/sellingwithnas/" },
    { label: "sellingwithnas.com", href: "https://www.sellingwithnas.com" },
  ],
}

const FACTS = [
  { value: "5 years", label: "at Amazon, helping brands grow their e-commerce revenue" },
  { value: "15k+", label: "users at my last startup, which raised VC and was acquired" },
  { value: "50+", label: "AI products built and shipped, from landing page tools to full apps" },
]

const PRINCIPLES = [
  {
    title: "Agents that do the job",
    body: "An agent should work inside the tools you already use and finish real work: posting, finding leads, fixing your SEO. Not sit in a chat box waiting for you to ask.",
  },
  {
    title: "We run it for you",
    body: "We build every agent, host it and keep it working. No servers, no code and no AI accounts or API bills for you to manage.",
  },
  {
    title: "A real person answers",
    body: "Email us and it goes straight to Nas, not to a ticket queue. If something breaks, the person who built it fixes it.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${PAGE_URL}#page`,
  url: PAGE_URL,
  name: TITLE,
  description: DESCRIPTION,
  mainEntity: {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Talk to me Data",
    legalName: COMPANY.legalName,
    url: BASE_URL,
    email: CONTACT_EMAIL,
    founder: {
      "@type": "Person",
      name: FOUNDER.name,
      alternateName: FOUNDER.shortName,
      jobTitle: "Founder",
      image: `${BASE_URL}${FOUNDER.image}`,
      sameAs: FOUNDER.links.map((l) => l.href),
    },
  },
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-white px-6 pb-16 pt-36 sm:pt-44 lg:px-8 lg:pb-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-5">About us</p>
            <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.4vw,4rem)]">Built by a founder, for founders</h1>
            <p className="lede mx-auto mt-6 max-w-xl text-lg sm:text-xl">
              Talk to me Data gives small businesses AI agents that do real work, like posting on social media, finding leads and
              growing your website. Here&apos;s who is behind it.
            </p>
          </Reveal>
        </section>

        {/* Founder */}
        <section className="bg-white px-6 pb-20 sm:pb-28 lg:px-8">
          <Reveal className="mx-auto grid max-w-5xl items-center gap-10 rounded-[32px] border border-hairline bg-white p-6 sm:p-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-mist">
              <Image
                src={FOUNDER.image}
                alt={`${FOUNDER.shortName}, founder of Talk to me Data`}
                fill
                sizes="(min-width: 768px) 400px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="eyebrow mb-3">Founder</p>
              <h2 className="text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
                {FOUNDER.shortName} <span className="text-quiet">({FOUNDER.name})</span>
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-quiet sm:text-base">
                <p>
                  I&apos;m Nas, the founder of Talk to me Data. I spent five years at Amazon helping brands grow their revenue in
                  e-commerce, which taught me what actually moves the needle online.
                </p>
                <p>
                  After Amazon I founded a startup, raised venture capital, grew it to more than 15,000 users and sold it to a larger
                  brand. Since then I&apos;ve built and shipped more than 50 AI products, from landing page generators to full apps
                  with logins, payments and data behind them.
                </p>
                <p>
                  Most small businesses can&apos;t hire a team to post every day, chase leads and keep their SEO up to date. AI agents
                  can do that work, but setting one up still takes time and skills most owners don&apos;t have. So that&apos;s what
                  we do: build the agents, run them and look after them, so you get the work done without the setup.
                </p>
              </div>
              <ul className="mt-7 flex flex-wrap gap-2">
                {FOUNDER.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink"
                    >
                      {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* Facts */}
        <section className="border-y border-hairline bg-white px-6 py-12 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 text-center sm:grid-cols-3">
            {FACTS.map((f) => (
              <Reveal key={f.value}>
                <p className="display text-[clamp(2.25rem,5vw,3rem)]">{f.value}</p>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-quiet">{f.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* How we work */}
        <section className="bg-mist px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-12 max-w-3xl">
              <p className="eyebrow mb-5">How we work</p>
              <h2 className="display text-[clamp(2rem,4.5vw,3.25rem)]">AI agents that do the work, managed for you</h2>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {PRINCIPLES.map((item, i) => (
                <Reveal key={item.title} className="rounded-3xl border border-hairline bg-white p-7">
                  <span className="font-mono text-sm font-medium text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-quiet">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white px-6 pb-10 pt-20 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Reveal className="flex flex-col rounded-3xl bg-ink p-7 text-white sm:p-10">
              <p className="eyebrow mb-4 text-white/50">Get started</p>
              <h2 className="text-2xl font-semibold tracking-[-0.01em]">See what an agent can take off your plate</h2>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/65">
                Start free with every pre-built agent, or book a call and we&apos;ll walk you through it.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={SIGNUP_URL}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-ink transition-opacity hover:opacity-90"
                >
                  Start free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/book-demo"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:border-white"
                >
                  Book a demo
                </Link>
              </div>
            </Reveal>
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-xs leading-relaxed text-faint">
            Talk to me Data is a trading name of {COMPANY.legalName}, registered in England and Wales ({COMPANY.number}), {COMPANY.city}.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
