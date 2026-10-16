import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Download, FileText } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FaqSection } from "@/components/blog/faq-section"
import { JsonLd } from "@/components/blog/json-ld"
import { InstagramSnapshotForm } from "@/components/free-tools/instagram-snapshot-form"
import { Ambassador } from "@/components/ui/ambassador"
import { GhostCta, PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import type { Faq } from "@/lib/blog"

const URL = "https://talktomedata.com/free-tools/instagram-snapshot"

export const metadata: Metadata = {
  title: "Free Instagram Snapshot: Your Account on One Page | Talk to me Data",
  description:
    "Get a free one-page PDF of your Instagram account: your last 10 posts measured, your last 30 days, your best Reel length, whether calls to action work, and three things to do next.",
  alternates: { canonical: URL },
}

// Each item describes a section of the PDF, in order. Keep in step with lib/instagram-snapshot/report.tsx.
const INSIDE = [
  {
    title: "Your last 30 days",
    description: "Posts published, average Reel views, engagement rate and interactions per post, each compared with the 30 days before.",
  },
  {
    title: "Your last 10 posts, measured",
    description: "Views and engagement rate for each of your latest posts, side by side, against your own median.",
  },
  {
    title: "Your video length sweet spot",
    description: "Your Reels grouped by length, so you can see which length your audience watches most.",
  },
  {
    title: "Do calls to action work for you?",
    description: "Captions that ask for an action (comment, save, share, link in bio) against captions that don't.",
  },
  {
    title: "Your Agent's analysis",
    description: "A one-line verdict and three moves written from your numbers: do this, fix this and try this.",
  },
]

const FAQS: Faq[] = [
  {
    question: "Is the Instagram snapshot free?",
    answer: "Yes. Enter your handle and email and we send the one-page PDF to your inbox. There's one free snapshot per email address.",
  },
  {
    question: "Why does it only work for Creator and Business accounts?",
    answer:
      "Instagram only shares post data for professional accounts (Creator and Business) through its official API, so personal accounts can't be analysed. Switching is free and takes a minute in the Instagram app: Settings and activity, then Account type and tools, then Switch to professional account.",
  },
  {
    question: "Do I need to log in or give you my password?",
    answer:
      "No. The snapshot only reads public data: your follower count, recent posts, likes, comments, Reel views and captions. We never ask for your password and never post anything.",
  },
  {
    question: "Why are views missing for my photos and carousels?",
    answer: "Instagram only makes view counts public for Reels. Photos and carousels are measured on likes and comments instead.",
  },
  {
    question: "How is engagement rate calculated?",
    answer: "For each post, likes plus comments divided by your follower count. The snapshot shows the average across your posts.",
  },
  {
    question: "Can I get a new snapshot next month?",
    answer:
      "The free snapshot is one per email. To track your account every week, create a free Talk to me Data account: your social media agent keeps the numbers up to date and adds audience data, the hooks that work for you and your competitors' best posts.",
  },
]

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Instagram Snapshot",
      url: URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: metadata.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: "Talk to me Data", url: "https://talktomedata.com" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
  ],
}

export default function InstagramSnapshotPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={JSON_LD} />
      <Header />
      <main>
        {/* Hero + form */}
        <section className="relative w-full overflow-hidden bg-white pb-16 pt-32 sm:pt-40 lg:pb-24">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-quiet">
                <li><Link href="/" className="transition-colors hover:text-ink">Home</Link></li>
                <li aria-hidden><ChevronRight className="h-3.5 w-3.5 text-faint" /></li>
                <li><Link href="/free-tools" className="transition-colors hover:text-ink">Free tools</Link></li>
                <li aria-hidden><ChevronRight className="h-3.5 w-3.5 text-faint" /></li>
                <li aria-current="page" className="text-ink">Instagram Snapshot</li>
              </ol>
            </nav>

            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
              <header>
                <p className="eyebrow mb-5">Free tool · 1-page PDF</p>
                <h1 className="display text-[clamp(2.4rem,6vw,3.75rem)] leading-[1.04]">Get a free snapshot of your Instagram account</h1>
                <p className="lede mt-6 max-w-xl text-lg sm:text-xl">
                  Enter your handle and we&apos;ll email you a one-page PDF: your last 10 posts measured, your last 30 days, your best Reel
                  length, whether calls to action work for you, and three things to do next.
                </p>
                <ul className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
                  {[
                    ["1 page", "PDF in your inbox"],
                    ["10 posts", "measured side by side"],
                    ["3 moves", "do, fix and try"],
                  ].map(([value, label]) => (
                    <li key={label}>
                      <span className="block text-3xl font-semibold tracking-[-0.02em] text-ink">{value}</span>
                      <span className="mt-1 block text-sm text-quiet">{label}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-9 text-sm text-faint">For Instagram Creator and Business accounts. Public data only.</p>
              </header>

              <div id="snapshot" className="relative scroll-mt-32 pt-[98px]">
                <Ambassador pose="wave" sizes="120px" priority className="absolute right-8 top-0 h-[112px] w-[120px]" />
                <div className="absolute right-[10.5rem] top-3 hidden max-w-[12rem] rounded-2xl rounded-br-sm border border-hairline bg-white px-4 py-2.5 text-[13px] font-medium leading-snug text-ink shadow-lg shadow-black/5 sm:block">
                  Give me your handle. I&apos;ll send your snapshot in a minute.
                </div>
                <div className="relative rounded-3xl border border-hairline bg-white p-6 shadow-xl shadow-black/5 sm:p-8">
                  <p className="eyebrow mb-3 flex items-center gap-2">
                    <Download className="h-3.5 w-3.5" /> Free snapshot
                  </p>
                  <p className="text-2xl font-semibold tracking-[-0.01em] text-ink">Get your snapshot by email</p>
                  <p className="mb-6 mt-2 text-sm leading-relaxed text-quiet">
                    We read your public posts, measure them and email you the PDF. It takes about a minute.
                  </p>
                  <InstagramSnapshotForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What the PDF looks like */}
        <section aria-labelledby="preview" className="border-y border-hairline bg-mist px-6 py-20 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
            <Reveal>
              <figure>
                <div className="overflow-hidden rounded-3xl border border-hairline bg-white p-3 shadow-xl shadow-black/5 sm:p-4">
                  <Image
                    src="/free-tools/instagram-snapshot-sample.png"
                    alt="A sample Instagram Snapshot PDF: KPI tiles for the last 30 days, bar charts of the last 10 posts, Reel length and call to action comparisons, and the agent's do, fix and try advice"
                    width={1241}
                    height={1754}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="h-auto w-full rounded-xl"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm text-quiet">
                  A sample snapshot for a demo account.{" "}
                  <a href="/free-tools/instagram-snapshot-sample.pdf" className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    Open the sample PDF
                  </a>
                </figcaption>
              </figure>
            </Reveal>

            <div>
              <Reveal>
                <p className="eyebrow mb-4">Inside the PDF</p>
                <h2 id="preview" className="display mb-10 text-[clamp(2rem,4vw,2.75rem)]">
                  What&apos;s in your snapshot
                </h2>
              </Reveal>
              <ol className="space-y-3">
                {INSIDE.map((item, i) => (
                  <li key={item.title}>
                    <Reveal delay={i * 0.04} className="flex gap-5 rounded-3xl border border-hairline bg-white p-6">
                      <span className="font-mono text-sm font-medium text-faint">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="mb-1 text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-quiet">{item.description}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Who it's for, then FAQ */}
        <section className="bg-white px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <section aria-labelledby="who" className="mb-16">
              <h2 id="who" className="mb-5 text-3xl font-semibold tracking-[-0.02em] text-balance text-ink">
                Built for Creator and Business accounts
              </h2>
              <div className="space-y-4 text-[17px] leading-relaxed text-quiet [&_strong]:font-semibold [&_strong]:text-ink">
                <p>
                  The snapshot works for <strong>Instagram Creator and Business accounts</strong>, because Instagram only shares post data for
                  professional accounts. If yours is personal, switch it in the Instagram app under Settings and activity, then Account type and
                  tools. It&apos;s free and you can switch back.
                </p>
                <p>
                  We only read <strong>public data</strong>: your follower count and your latest posts with their likes, comments, Reel views and
                  captions. No Instagram login, no password, and we never post anything.
                </p>
              </div>
              <div className="mt-8 flex items-start gap-4 rounded-3xl border border-hairline bg-mist p-6">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                <p className="text-sm leading-relaxed text-quiet">
                  <span className="font-semibold text-ink">Want more than a snapshot?</span> The{" "}
                  <Link href="/agents/social-media" className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    social media agent
                  </Link>{" "}
                  tracks your account every week and adds your audience data, the hooks that work for you and your competitors&apos; best posts,
                  then plans and makes your next posts.
                </p>
              </div>
            </section>
            <FaqSection faqs={FAQS} />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
          <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
            <div className="relative z-10 max-w-xl">
              <p className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">See what&apos;s working on your Instagram</p>
              <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/65">
                Get your free one-page snapshot by email, or meet the agent that tracks your account every week and makes your next posts.
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <PrimaryCta href="#snapshot" className="bg-white text-ink">
                  Get my free snapshot
                </PrimaryCta>
                <GhostCta href="/agents/social-media" className="border-white/25 text-white hover:bg-white/10">
                  See the social media agent
                </GhostCta>
              </div>
            </div>
            <Ambassador
              pose="thumbs-up"
              sizes="360px"
              className="pointer-events-none absolute -bottom-2 -right-6 hidden h-[300px] w-[270px] sm:block lg:right-8 lg:h-[380px] lg:w-[340px]"
            />
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  )
}
