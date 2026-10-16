import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Sparkles } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FaqSection } from "@/components/blog/faq-section"
import { JsonLd } from "@/components/blog/json-ld"
import { InstagramSnapshotForm } from "@/components/free-tools/instagram-snapshot-form"
import { Ambassador } from "@/components/ui/ambassador"
import { GhostCta, PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import type { Faq } from "@/lib/blog"
import { OG_IMAGE } from "@/lib/og"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/free-tools/social-media-analyzer`

const TITLE = "Free Social Media Page Analyzer for Instagram | Talk to me Data"
const DESCRIPTION =
  "Free AI social media page analyzer. Enter your Instagram handle and our AI agent analyzes your page, finds what's working and tells you how to grow it, in a one-page PDF."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "social media page analyzer",
    "social media analyzer",
    "instagram page analyzer",
    "instagram account analyzer",
    "instagram analyzer free",
    "free instagram audit",
    "ai instagram audit",
    "instagram engagement rate checker",
    "how to grow my instagram page",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [OG_IMAGE],
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PAGE_URL,
    siteName: "Talk to me Data",
  },
  twitter: { images: [OG_IMAGE], card: "summary_large_image", title: TITLE, description: DESCRIPTION },
}

const STEPS = [
  {
    title: "Enter your Instagram handle",
    description: "Any Instagram Creator or Business account. No login and no password: the analyzer only reads public data.",
  },
  {
    title: "Our AI agent analyzes your page",
    description:
      "It reads up to your latest 30 posts and measures views, engagement, video length and captions against your own average, so you're compared with yourself, not a generic benchmark.",
  },
  {
    title: "Get told how to grow it",
    description: "A one-page PDF lands in your inbox in about a minute, with what to do more of, what to fix and what to try next.",
  },
]

// Each item describes a section of the PDF, in order. Keep in step with lib/instagram-snapshot/report.tsx.
const CHECKS = [
  {
    title: "How your page is trending",
    description: "Posts published, average Reel views, engagement rate and interactions per post over the last 30 days, compared with the 30 days before.",
  },
  {
    title: "Which posts are working",
    description: "Views and engagement rate for your 10 latest posts side by side, against your own median.",
  },
  {
    title: "Your best video length",
    description: "Your Reels grouped by length, so you know how long to make the next one.",
  },
  {
    title: "Whether calls to action help",
    description: "Captions that ask for an action (comment, save, share, link in bio) against captions that don't.",
  },
  {
    title: "How to grow your page",
    description: "The agent's verdict on your page and three moves written from your numbers: do this, fix this and try this.",
  },
]

const FAQS: Faq[] = [
  {
    question: "What is a social media page analyzer?",
    answer:
      "A social media page analyzer reads the posts on an account and measures how they perform: views, likes, comments and engagement rate, and which formats, lengths and captions do best. Ours adds an AI agent that turns those numbers into advice on how to grow the page.",
  },
  {
    question: "Is the analyzer free?",
    answer: "Yes. Enter your Instagram handle and email and we send your one-page analysis as a PDF. There's one free analysis per email address.",
  },
  {
    question: "Which social media platforms does it analyze?",
    answer:
      "The free analyzer covers Instagram. Our social media agent, which you can start for free, analyzes Instagram, TikTok, YouTube and Facebook Pages, and keeps the numbers up to date every week.",
  },
  {
    question: "How does the AI agent decide how I should grow?",
    answer:
      "It compares your posts with your own averages, not industry benchmarks: which formats, lengths and captions beat your typical post and which fall behind. Every recommendation cites a number from your page.",
  },
  {
    question: "Why does it only work for Creator and Business accounts?",
    answer:
      "Instagram only shares post data for professional accounts (Creator and Business) through its official API, so personal accounts can't be analyzed. Switching is free and takes a minute in the Instagram app: Settings and activity, then Account type and tools, then Switch to professional account.",
  },
  {
    question: "Do I need to log in or give you my password?",
    answer:
      "No. The analyzer only reads public data: your follower count and your latest posts with their likes, comments, Reel views and captions. We never ask for your password and never post anything.",
  },
  {
    question: "How is engagement rate calculated?",
    answer: "For each post, likes plus comments divided by your follower count. The analysis shows the average across your posts.",
  },
  {
    question: "Why are views missing for my photos and carousels?",
    answer: "Instagram only makes view counts public for Reels. Photos and carousels are measured on likes and comments instead.",
  },
]

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Social Media Page Analyzer",
      alternateName: ["Instagram Page Analyzer", "Instagram Account Analyzer", "Free Instagram Audit"],
      url: PAGE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: DESCRIPTION,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: "Talk to me Data", url: BASE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Free tools", item: `${BASE_URL}/free-tools` },
        { "@type": "ListItem", position: 3, name: "Social Media Page Analyzer", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
  ],
}

export default function SocialMediaAnalyzerPage() {
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
                <li aria-current="page" className="text-ink">Social Media Page Analyzer</li>
              </ol>
            </nav>

            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
              <header>
                <p className="eyebrow mb-5">Free AI tool · Instagram</p>
                <h1 className="display text-[clamp(2.4rem,6vw,3.75rem)] leading-[1.04]">Free social media page analyzer</h1>
                <p className="lede mt-6 max-w-xl text-lg sm:text-xl">
                  Enter your Instagram handle and our AI agent analyzes your page, finds what&apos;s working and tells you how to grow it. Your
                  analysis lands in your inbox as a one-page PDF in about a minute.
                </p>
                <ul className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
                  {[
                    ["30 posts", "analyzed by the agent"],
                    ["3 moves", "do, fix and try"],
                    ["1 minute", "to your inbox"],
                  ].map(([value, label]) => (
                    <li key={label}>
                      <span className="block text-3xl font-semibold tracking-[-0.02em] text-ink">{value}</span>
                      <span className="mt-1 block text-sm text-quiet">{label}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-9 text-sm text-faint">For Instagram Creator and Business accounts. Public data only, no login.</p>
              </header>

              <div id="analyze" className="relative scroll-mt-32 pt-[98px]">
                <Ambassador pose="wave" sizes="120px" priority className="absolute right-8 top-0 h-[112px] w-[120px]" />
                <div className="absolute right-[10.5rem] top-3 hidden max-w-[12rem] rounded-2xl rounded-br-sm border border-hairline bg-white px-4 py-2.5 text-[13px] font-medium leading-snug text-ink shadow-lg shadow-black/5 sm:block">
                  Give me your handle. I&apos;ll tell you how to grow your page.
                </div>
                <div className="relative rounded-3xl border border-hairline bg-white p-6 shadow-xl shadow-black/5 sm:p-8">
                  <p className="eyebrow mb-3 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5" /> Free analysis
                  </p>
                  <p className="text-2xl font-semibold tracking-[-0.01em] text-ink">Analyze my Instagram page</p>
                  <p className="mb-6 mt-2 text-sm leading-relaxed text-quiet">
                    Our AI agent reads your public posts, measures them and emails you how to grow. It takes about a minute.
                  </p>
                  <InstagramSnapshotForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="how" className="border-t border-hairline bg-white px-6 py-20 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="eyebrow mb-4">How it works</p>
              <h2 id="how" className="display mb-12 max-w-2xl text-[clamp(2rem,4vw,2.75rem)]">
                How the social media page analyzer works
              </h2>
            </Reveal>
            <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <li key={step.title} className="h-full">
                  <Reveal delay={i * 0.06} className="flex h-full flex-col rounded-3xl border border-hairline bg-white p-7">
                    <span className="mb-8 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">{i + 1}</span>
                    <h3 className="mb-2 text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-quiet">{step.description}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What the agent checks, beside the sample PDF */}
        <section aria-labelledby="checks" className="border-y border-hairline bg-mist px-6 py-20 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
            <Reveal>
              <figure>
                <div className="overflow-hidden rounded-3xl border border-hairline bg-white p-3 shadow-xl shadow-black/5 sm:p-4">
                  <Image
                    src="/free-tools/instagram-snapshot-sample.png"
                    alt="A sample analysis PDF from the social media page analyzer: last 30 days, the latest 10 posts measured, Reel length and call to action comparisons, and the AI agent's do, fix and try advice"
                    width={1241}
                    height={1754}
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="h-auto w-full rounded-xl"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm text-quiet">
                  A sample analysis for a demo account.{" "}
                  <a href="/free-tools/instagram-snapshot-sample.pdf" className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    Open the sample PDF
                  </a>
                </figcaption>
              </figure>
            </Reveal>

            <div>
              <Reveal>
                <p className="eyebrow mb-4">Inside your analysis</p>
                <h2 id="checks" className="display mb-10 text-[clamp(2rem,4vw,2.75rem)]">
                  What the AI agent checks on your page
                </h2>
              </Reveal>
              <ol className="space-y-3">
                {CHECKS.map((item, i) => (
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

        {/* Who it's for, beyond Instagram, then FAQ */}
        <section className="bg-white px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <section aria-labelledby="who" className="mb-14">
              <h2 id="who" className="mb-5 text-3xl font-semibold tracking-[-0.02em] text-balance text-ink">
                Built for Instagram Creator and Business accounts
              </h2>
              <div className="space-y-4 text-[17px] leading-relaxed text-quiet [&_strong]:font-semibold [&_strong]:text-ink">
                <p>
                  The analyzer works for <strong>Instagram Creator and Business accounts</strong>, because Instagram only shares post data for
                  professional accounts. If yours is personal, switch it in the Instagram app under Settings and activity, then Account type and
                  tools. It&apos;s free and you can switch back.
                </p>
                <p>
                  It only reads <strong>public data</strong>: your follower count and your latest posts with their likes, comments, Reel views and
                  captions. No Instagram login, no password, and we never post anything.
                </p>
              </div>
            </section>

            <section aria-labelledby="more" className="mb-14">
              <h2 id="more" className="mb-5 text-3xl font-semibold tracking-[-0.02em] text-balance text-ink">
                Analyze every channel, every week
              </h2>
              <div className="space-y-4 text-[17px] leading-relaxed text-quiet">
                <p>
                  The free analyzer is a one-off look at your Instagram. The{" "}
                  <Link href="/agents/social-media" className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    AI social media agent
                  </Link>{" "}
                  analyzes Instagram, TikTok, YouTube and Facebook Pages every week. It adds your audience data, the hooks that work for you and
                  your competitors&apos; best posts, then plans, designs and posts your next content.
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
              <p className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">Find out how to grow your Instagram</p>
              <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/65">
                Let our AI agent analyze your page for free, or meet the agent that tracks every channel each week and makes your next posts.
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <PrimaryCta href="#analyze" className="bg-white text-ink">
                  Analyze my page
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
