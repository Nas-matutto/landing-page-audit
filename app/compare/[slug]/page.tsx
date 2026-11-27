import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Check, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/blog/json-ld"
import { FaqSection } from "@/components/blog/faq-section"
import { SignupCta } from "@/components/blog/signup-cta"
import { AuthorAvatar } from "@/components/blog/author-avatar"
import { authorUrl, getAuthor } from "@/lib/authors"
import { SITE_NAME, SITE_URL, absoluteUrl, categoryPath } from "@/lib/blog"
import { comparePath, getComparison, getVisibleComparisons, type CompareRow, type Comparison } from "@/lib/compare"

// One template for every comparison, built to docs/comparison-page-spec.md:
// verdict, 8 question sections, FAQs, sources and 8+ internal links.

type Params = Promise<{ slug: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return getVisibleComparisons().map(c => ({ slug: c.slug }))
}

function findVisible(slug: string) {
  return getVisibleComparisons().find(c => c.slug === slug)
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = findVisible((await params).slug)
  if (!c) return {}
  const url = absoluteUrl(comparePath(c.slug))
  return {
    title: c.seoTitle,
    description: c.description,
    alternates: { canonical: url },
    // Belt and braces: drafts only exist in development, but never let one be indexed.
    ...(!c.reviewed && { robots: { index: false, follow: false } }),
    openGraph: {
      type: "article",
      url,
      title: c.seoTitle,
      description: c.description,
      siteName: SITE_NAME,
      modifiedTime: c.dateModified,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: c.title }],
    },
    twitter: { card: "summary_large_image", title: c.seoTitle, description: c.description, images: ["/opengraph-image.png"] },
  }
}

const H2 = "text-3xl font-semibold tracking-[-0.02em] text-ink mt-14 mb-4"
const H3 = "text-xl font-semibold tracking-[-0.01em] text-ink mt-8 mb-3"
const LINK = "text-ink underline decoration-social/40 underline-offset-4 hover:decoration-social"

function CompareTable({ rows, competitor, first = "" }: { rows: CompareRow[]; competitor: string; first?: string }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-hairline">
      <table className="w-full text-left text-sm">
        <thead className="bg-social-soft text-ink">
          <tr>
            <th className="p-4 font-semibold">{first}</th>
            <th className="p-4 font-semibold">Talk to me Data</th>
            <th className="p-4 font-semibold">{competitor}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline">
          {rows.map(row => (
            <tr key={row.label}>
              <td className="p-4 font-medium text-ink">{row.label}</td>
              <td className="p-4">{row.us}</td>
              <td className="p-4">{row.them}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map(p => (
        <p key={p}>{p}</p>
      ))}
    </>
  )
}

function PickList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-hairline bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-ink">{heading}</h3>
      <ul className="space-y-2.5">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">
              <Check className="h-3 w-3" />
            </span>
            <span className="text-[15px] leading-relaxed text-ink">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function buildJsonLd(c: Comparison) {
  const url = absoluteUrl(comparePath(c.slug))
  const author = getAuthor("nas")
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: c.title,
        description: c.description,
        datePublished: c.datePublished,
        dateModified: c.dateModified,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        author: { "@type": "Person", name: author.name, url: absoluteUrl(authorUrl(author.id)) },
        about: [
          { "@type": "SoftwareApplication", name: "Talk to me Data", applicationCategory: "BusinessApplication", url: SITE_URL },
          { "@type": "SoftwareApplication", name: c.competitor, applicationCategory: "BusinessApplication", url: c.competitorUrl },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl("/compare") },
          { "@type": "ListItem", position: 3, name: `Talk to me Data vs ${c.competitor}`, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: c.faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      },
    ],
  }
}

export default async function ComparePage({ params }: { params: Params }) {
  const c = findVisible((await params).slug)
  if (!c) notFound()
  const author = getAuthor("nas")
  const them = c.competitor
  const others = getVisibleComparisons().filter(o => o.slug !== c.slug)

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={buildJsonLd(c)} />
      <Header />
      <main>
        {!c.reviewed && (
          <div className="fixed inset-x-0 bottom-0 z-50 bg-social px-4 py-3 text-center text-sm font-semibold text-white">
            Draft: only visible in development. Edit it in lib/compare.ts, fill in your own words, then set reviewed: true.
          </div>
        )}

        <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 sm:pt-44 lg:pt-40">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 text-sm text-quiet">
              <li><Link href="/compare" className="transition-colors hover:text-ink">Compare</Link></li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5 text-faint" /></li>
              <li className="text-ink">Talk to me Data vs {them}</li>
            </ol>
          </nav>

          <h1 className="display text-[clamp(2.25rem,5.5vw,3.5rem)]">{c.title}</h1>

          <div className="mt-6 flex items-center gap-3 text-sm text-quiet">
            <AuthorAvatar author={author} size={36} />
            <span>
              By <Link href={authorUrl(author.id)} className="font-semibold text-ink hover:underline">{author.name}</Link>
              {" · "}Updated {fmtDate(c.dateModified)}
              {" · "}{them} facts checked {fmtDate(c.factsChecked)}
            </span>
          </div>

          <div className="mt-10 space-y-6 leading-relaxed text-neutral-600">
            {/* 1 · The verdict: answers the search on its own, so it can be quoted. */}
            <div className="rounded-2xl border border-social/20 bg-social-soft p-6">
              <h2 className="mb-3 text-xl font-semibold tracking-[-0.02em] text-ink">The short answer</h2>
              <p className="text-lg text-ink">{c.verdict}</p>
            </div>

            {c.nasTake && (
              <aside className="rounded-2xl border border-hairline p-6">
                <div className="mb-3 flex items-center gap-3">
                  <AuthorAvatar author={author} size={32} />
                  <p className="text-sm font-semibold text-ink">{author.name}&apos;s take</p>
                </div>
                <p className="text-ink">{c.nasTake}</p>
              </aside>
            )}

            {/* 2 */}
            <h2 id="difference" className={H2}>What Is the Difference Between Talk to me Data and {them}?</h2>
            <p>
              <strong className="text-ink">{c.whatUs}</strong> {c.whatThem}
            </p>
            <CompareTable rows={c.atAGlance} competitor={them} />

            {/* 3 */}
            <h2 id="creating-posts" className={H2}>Which Is Better for Creating Posts?</h2>
            <Paragraphs items={c.creating} />
            {c.weTried && (
              <>
                <h3 className={H3}>What we found when we tried {them}</h3>
                <p>{c.weTried}</p>
              </>
            )}

            {/* 4 */}
            <h2 id="scheduling" className={H2}>Which Is Better for Scheduling and Autopilot?</h2>
            <Paragraphs items={c.scheduling} />

            <SignupCta eyebrow="Try it on your own account" heading="Let the agent make your next posts" accent="social">
              Start free, connect Instagram, TikTok or Facebook, and see the posts your agent creates from what already works
              for you.
            </SignupCta>

            {/* 5 */}
            <h2 id="platforms" className={H2}>Which Platforms Do Talk to me Data and {them} Post To?</h2>
            <CompareTable rows={c.platforms} competitor={them} first="Platform" />

            {/* 6 */}
            <h2 id="pricing" className={H2}>How Much Do Talk to me Data and {them} Cost?</h2>
            <p>{c.pricingIntro}</p>
            <CompareTable rows={c.pricing} competitor={them} />
            <h3 className={H3}>What does it cost to post 3 times a week?</h3>
            <Paragraphs items={c.costExample} />
            <p>
              See every plan on our <Link href="/pricing" className={LINK}>pricing page</Link>.
            </p>

            {/* 7 */}
            <h2 id="which-to-choose" className={H2}>Should You Choose Talk to me Data or {them}?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <PickList heading="Choose Talk to me Data if" items={c.pickUsIf} />
              <PickList heading={`Choose ${them} if`} items={c.pickThemIf} />
            </div>
            {c.customerQuote && (
              <figure className="my-8 border-l-4 border-social pl-6">
                <blockquote className="text-lg text-ink">“{c.customerQuote.quote}”</blockquote>
                <figcaption className="mt-3 text-sm text-quiet">
                  {c.customerQuote.name}, {c.customerQuote.role}
                </figcaption>
              </figure>
            )}

            {/* 8 */}
            <h2 id="together" className={H2}>Can You Use Talk to me Data and {them} Together?</h2>
            <Paragraphs items={c.together} />

            <FaqSection faqs={c.faqs} />

            <section aria-labelledby="sources" className="mt-12">
              <h2 id="sources" className="mb-3 text-xl font-semibold text-ink">Sources</h2>
              <p className="text-sm">
                {them} details are from {them}&apos;s own website, checked on {fmtDate(c.factsChecked)}. Prices are in US
                dollars before tax and can change, so check before you buy:{" "}
                {c.sources.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && ", "}
                    <a href={s.url} className={LINK} target="_blank" rel="noopener nofollow">{s.label}</a>
                  </span>
                ))}
                . Talk to me Data details are from our <Link href="/pricing" className={LINK}>pricing page</Link>.
              </p>
            </section>

            <nav aria-labelledby="keep-exploring" className="mt-12 rounded-2xl border border-hairline bg-mist p-6">
              <h2 id="keep-exploring" className="mb-4 text-xl font-semibold text-ink">Keep exploring</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li><Link href="/" className={LINK}>The AI social media agent</Link>: how it creates, schedules and posts on autopilot</li>
                <li><Link href="/agents/social-media" className={LINK}>AI social media manager features</Link>: insights, competitor tracking and brand kit</li>
                <li><Link href={categoryPath("social-media-automation")} className={LINK}>Social media automation guide</Link>: what to automate and how</li>
                <li><Link href="/free-tools/social-media-analyzer" className={LINK}>Free social media page analyzer</Link>: see what works on your Instagram</li>
                <li><Link href="/blog/how-to-automate-instagram-with-ai" className={LINK}>How to automate Instagram with AI</Link></li>
                <li><Link href="/blog/how-to-spy-on-competitors-instagram" className={LINK}>How to track your competitors on Instagram</Link></li>
                {others.map(o => (
                  <li key={o.slug}><Link href={comparePath(o.slug)} className={LINK}>Talk to me Data vs {o.competitor}</Link></li>
                ))}
              </ul>
            </nav>

            <SignupCta heading="Put your social media on autopilot" accent="social">
              Start free with 50 actions a month and no card. Your agent studies your account, creates posts in your brand
              and, from Solo, schedules and posts them for you.
            </SignupCta>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
