import Link from "next/link"
import type { ReactNode } from "react"
import { ChevronRight, Download } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FaqSection } from "@/components/blog/faq-section"
import { JsonLd } from "@/components/blog/json-ld"
import { PostCard } from "@/components/blog/post-card"
import { GuideCard } from "@/components/guides/guide-card"
import { GuideForm } from "@/components/guides/guide-form"
import { Ambassador } from "@/components/ui/ambassador"
import { GhostCta, PrimaryCta, Reveal } from "@/components/sections/social-agent/parts"
import { formatPostDate, getPost, type Faq } from "@/lib/blog"
import { GUIDES, buildGuideJsonLd, getGuide, getOtherGuides } from "@/lib/guides"

/**
 * The frame every free guide renders in: breadcrumb, H1 + direct-answer lede,
 * the download form, "what's inside", the guide's own preview content, FAQ,
 * related guides and posts, and the page's JSON-LD. Guides supply only their
 * preview body (built from <GuideSection>) and FAQ list.
 */
export function GuideShell({
  slug,
  faqs,
  ctaHeading,
  jsonLdExtra = [],
  children,
}: {
  slug: string
  faqs: Faq[]
  /** Heading of the closing CTA band. */
  ctaHeading: string
  /** Extra schema.org nodes for this guide, e.g. HowTo. */
  jsonLdExtra?: object[]
  children: ReactNode
}) {
  const guide = getGuide(slug)
  const kind = guide.kind.toLowerCase()
  const relatedPosts = guide.relatedPosts.map(getPost)

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={buildGuideJsonLd(slug, faqs, jsonLdExtra)} />
      <Header />
      <main>
        {/* Hero + download form */}
        <section className="relative w-full overflow-hidden bg-white pb-16 pt-32 sm:pt-40 lg:pb-24">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-quiet">
                <li><Link href="/" className="transition-colors hover:text-ink">Home</Link></li>
                <li aria-hidden><ChevronRight className="h-3.5 w-3.5 text-faint" /></li>
                <li><Link href="/free-guides" className="transition-colors hover:text-ink">Free guides</Link></li>
                <li aria-hidden><ChevronRight className="h-3.5 w-3.5 text-faint" /></li>
                <li aria-current="page" className="text-ink">{guide.kind}</li>
              </ol>
            </nav>

            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
              <header>
                <p className="eyebrow mb-5">Free {kind} · {guide.pages}-page PDF</p>
                <h1 className="display text-[clamp(2.4rem,6vw,3.75rem)] leading-[1.04]">{guide.title}</h1>
                <p className="lede mt-6 max-w-xl text-lg sm:text-xl">{guide.lede}</p>
                <ul className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
                  {guide.stats.map(stat => (
                    <li key={stat.label}>
                      <span className="block text-3xl font-semibold tracking-[-0.02em] text-ink">{stat.value}</span>
                      <span className="mt-1 block text-sm text-quiet">{stat.label}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-9 text-sm text-faint">
                  By <span className="font-medium text-quiet">Talk to Me Data</span> · Updated{" "}
                  <time dateTime={guide.dateModified}>{formatPostDate(guide.dateModified)}</time>
                </p>
              </header>

              {/* The ambassador peeks over the form, waving you in */}
              <div id="download" className="relative scroll-mt-32 pt-[98px]">
                <Ambassador pose="wave" sizes="120px" priority className="absolute right-8 top-0 h-[112px] w-[120px]" />
                <div className="absolute right-[10.5rem] top-3 hidden max-w-[12rem] rounded-2xl rounded-br-sm border border-hairline bg-white px-4 py-2.5 text-[13px] font-medium leading-snug text-ink shadow-lg shadow-black/5 sm:block">
                  It&apos;s free. I&apos;ll send it straight to your inbox.
                </div>
                <div className="relative rounded-3xl border border-hairline bg-white p-6 shadow-xl shadow-black/5 sm:p-8">
                  <p className="eyebrow mb-3 flex items-center gap-2">
                    <Download className="h-3.5 w-3.5" /> Free download
                  </p>
                  <p className="text-2xl font-semibold tracking-[-0.01em] text-ink">Get the {kind} in your inbox</p>
                  <p className="mb-6 mt-2 text-sm leading-relaxed text-quiet">
                    Enter your details and we&apos;ll email you the {guide.pages}-page PDF right away.
                  </p>
                  <GuideForm endpoint={guide.endpoint} cta={guide.cta} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section aria-labelledby="inside" className="border-y border-hairline bg-mist px-6 py-20 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="eyebrow mb-4">Inside the PDF</p>
              <h2 id="inside" className="display mb-12 max-w-2xl text-[clamp(2rem,4vw,2.75rem)]">
                What&apos;s inside the {kind}
              </h2>
            </Reveal>
            <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {guide.inside.map((item, i) => (
                <li key={item.title} className="h-full">
                  <Reveal delay={(i % 4) * 0.05} className="flex h-full flex-col rounded-3xl border border-hairline bg-white p-7">
                    <span className="mb-8 font-mono text-sm font-medium text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mb-2 text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-quiet">{item.description}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The guide's own preview content, then FAQ */}
        <section className="bg-white px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {children}
            <FaqSection faqs={faqs} />
          </div>
        </section>

        {/* More guides + related reading */}
        <section aria-labelledby="more" className="border-y border-hairline bg-mist px-6 py-20 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="eyebrow mb-4">Keep going</p>
            <h2 id="more" className="mb-10 text-2xl font-semibold tracking-[-0.01em] text-ink">More free guides</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {getOtherGuides(slug).map(other => (
                <GuideCard key={other.slug} guide={other} number={GUIDES.indexOf(other) + 1} />
              ))}
            </div>

            <div className="mb-8 mt-16 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-[-0.01em] text-ink">Related reading on the blog</h2>
              <Link href="/blog" className="text-sm font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                All guides on the blog
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map(post => (
                <PostCard key={post.slug} post={post} compact />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16 lg:py-20">
            <div className="relative z-10 max-w-xl">
              <p className="display text-[clamp(2.25rem,5vw,3.75rem)] text-white!">{ctaHeading}</p>
              <p className="mt-6 max-w-md text-lg font-light leading-snug text-white/65">
                Get the free {kind} by email. Or skip ahead: bring your biggest time sink to a free 20-minute call and
                we&apos;ll show you the agent that takes it over.
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <PrimaryCta href="#download" className="bg-white text-ink">
                  Get the free {kind}
                </PrimaryCta>
                <GhostCta href="/book-demo" className="border-white/25 text-white hover:bg-white/10">
                  Book a free call
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

/** An H2 section of a guide's preview content. The first sentence should answer the heading. */
export function GuideSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mb-16">
      <h2 id={id} className="mb-5 scroll-mt-32 text-3xl font-semibold tracking-[-0.02em] text-balance text-ink">
        {title}
      </h2>
      <div className="space-y-4 text-[17px] leading-relaxed text-quiet [&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:decoration-ink/25 [&_a]:underline-offset-4 hover:[&_a]:decoration-ink [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </section>
  )
}

/** A real HTML table (crawlable and quotable), in the site's hairline frame. */
export function GuideTable({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-hairline">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-mist">
          <tr>
            {head.map(cell => (
              <th key={cell} scope="col" className="border-b border-hairline px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-hairline last:border-b-0">
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-5 py-4 align-top font-semibold text-ink">
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="px-5 py-4 align-top text-quiet">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
