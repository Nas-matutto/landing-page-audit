import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCtaBand } from "@/components/blog/cta-band"
import { FaqSection } from "@/components/blog/faq-section"
import { JsonLd } from "@/components/blog/json-ld"
import { PostCard } from "@/components/blog/post-card"
import { GuideCard } from "@/components/guides/guide-card"
import { Ambassador } from "@/components/ui/ambassador"
import { Reveal } from "@/components/sections/social-agent/parts"
import { SITE_NAME, SITE_URL, absoluteUrl, getPost, type Faq } from "@/lib/blog"
import { GUIDES, GUIDES_DESCRIPTION, GUIDES_TITLE, guideDocumentJsonLd, guidePath } from "@/lib/guides"
import { OG_IMAGE } from "@/lib/og"

const PAGE_URL = absoluteUrl("/free-guides")

export const metadata: Metadata = {
  title: GUIDES_TITLE,
  description: GUIDES_DESCRIPTION,
  keywords: [
    "free AI agent guide",
    "business automation checklist",
    "AI readiness audit",
    "how to build AI agents PDF",
    "small business automation guide",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: GUIDES_TITLE,
    description: GUIDES_DESCRIPTION,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: GUIDES_TITLE, description: GUIDES_DESCRIPTION, images: [OG_IMAGE] },
}

const [checklist, audit, build] = GUIDES

/** The order we suggest reading them in. Each step names the question it answers. */
const PATH = [
  { guide: checklist, question: "What should I automate?", text: "Tick the tasks your team still does by hand and see where the hours go." },
  { guide: audit, question: "Where would an agent help most?", text: "Score five areas out of 40 and find your two best starting points." },
  { guide: build, question: "How do I build it?", text: "Build your first agent in Claude, or compare it with having one built for you." },
]

const PILLAR_POSTS = ["what-are-ai-agents", "how-to-build-an-ai-agent", "ai-agents-for-small-business"].map(getPost)

const FAQS: Faq[] = [
  {
    question: "Are the guides really free?",
    answer:
      "Yes. All three guides are free PDFs. Enter your name and email and the PDF is sent to your inbox straight away. There is no card, no trial and no signup to the app, and you can unsubscribe from our emails at any time.",
  },
  {
    question: "Which guide should I start with?",
    answer:
      "Start with the Business Automation Checklist if you're not sure what to automate yet. Take the AI Agent Readiness Audit next to score where an agent would help most. Read How to Build AI Agents when you're ready to build your first one, or to decide whether to build it yourself or have it built for you.",
  },
  {
    question: "Do I need technical knowledge to use them?",
    answer:
      "No. The guides are written for business owners and operators, not developers. The checklist and the audit are tick-box and multiple choice, and the build guide explains every step (Claude Projects, instructions and connecting tools with MCP) in plain language.",
  },
  {
    question: "What is an AI agent?",
    answer:
      "An AI agent is software that is given a goal and works towards it on its own: it reads data, uses your tools (inbox, CRM, calendar, accounting software), checks its work and keeps going until the task is done. Unlike a chatbot, it takes actions rather than only answering messages.",
  },
  {
    question: "Can you build the agent for me?",
    answer:
      "Yes. Talk to Me Data designs, builds, hosts and monitors AI agents for small and medium businesses. Bring your checklist or audit results to a free 20-minute call and we'll map your lowest-scoring areas to a specific agent, what it would automate and what it costs to run.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: GUIDES_TITLE,
      description: GUIDES_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: GUIDES.length,
        itemListElement: GUIDES.map((guide, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(guidePath(guide.slug)),
          item: guideDocumentJsonLd(guide),
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Free guides", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map(faq => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
}

export default function FreeGuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative w-full overflow-hidden bg-white pb-16 pt-36 sm:pt-44 lg:pb-20 lg:pt-40">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:px-8">
            <div className="text-center lg:text-left">
              <p className="eyebrow mb-5">Free guides</p>
              <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.8vw,4.25rem)]">
                Free guides to automating your business with AI agents
              </h1>
              <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
                Three free PDFs that take you from &ldquo;what should I automate?&rdquo; to a working AI agent: a
                business automation checklist, an AI agent readiness audit and a guide to building your first agent.
              </p>
            </div>

            {/* The ambassador, at work on the next guide */}
            <Reveal delay={0.1} className="mx-auto flex items-end gap-3 lg:mx-0 lg:justify-self-end">
              <Ambassador pose="working" sizes="200px" className="h-[260px] w-[150px] shrink-0 sm:h-[300px] sm:w-[175px]" priority />
              <div className="relative mb-24 max-w-[13rem] rounded-2xl rounded-bl-sm border border-hairline bg-white px-4 py-3 text-[14px] font-medium leading-snug text-ink shadow-lg shadow-black/5">
                Start with the checklist. It takes about ten minutes and shows you where your week goes.
              </div>
            </Reveal>
          </div>
        </section>

        {/* Guides */}
        <section aria-label="Free guides" className="border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {GUIDES.map((guide, i) => (
                <Reveal key={guide.slug} delay={i * 0.06} className="h-full">
                  <GuideCard guide={guide} number={i + 1} headingLevel="h2" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reading order */}
        <section aria-labelledby="where-to-start" className="bg-white px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <p className="eyebrow mb-4">Where to start</p>
              <h2 id="where-to-start" className="display text-[clamp(2rem,4vw,2.75rem)]">
                Which guide should you read first?
              </h2>
              <p className="lede mt-5 text-lg">
                Read them in order. Each one answers the question the last one raises, and together they take under an
                hour.
              </p>
            </Reveal>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline md:grid-cols-3">
              {PATH.map((step, i) => (
                <li key={step.guide.slug} className="flex flex-col bg-white p-7 sm:p-8">
                  <span className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-sm font-medium text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink">{step.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-quiet">{step.text}</p>
                  <Link
                    href={guidePath(step.guide.slug)}
                    className="mt-auto pt-6 text-sm font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                  >
                    {step.guide.title.split(":")[0]}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Blog pillars + FAQ */}
        <section className="border-y border-hairline bg-mist px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow mb-3">Prefer to read online?</p>
                <h2 className="text-2xl font-semibold tracking-[-0.01em] text-ink">Start with these guides on the blog</h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                All blog guides
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PILLAR_POSTS.map(post => (
                <PostCard key={post.slug} post={post} compact />
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-3xl">
              <FaqSection faqs={FAQS} />
            </div>
          </div>
        </section>

        <BlogCtaBand />
      </main>
      <Footer />
    </div>
  )
}
