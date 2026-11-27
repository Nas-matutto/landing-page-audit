import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/blog/json-ld"
import { SITE_URL, absoluteUrl, categoryPath } from "@/lib/blog"
import { comparePath, getLiveComparisons, getVisibleComparisons } from "@/lib/compare"

const TITLE = "Talk to me Data vs Other Social Media Tools: Comparisons"
const DESCRIPTION =
  "Honest comparisons of Talk to me Data's AI social media agent with Buffer, Later, Hootsuite and other schedulers: features, platforms and real prices."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/compare") },
  // Indexed only once at least one comparison has been reviewed and is live.
  ...(getLiveComparisons().length === 0 && { robots: { index: false, follow: false } }),
}

export default function CompareIndexPage() {
  const comparisons = getVisibleComparisons()
  // No reviewed pages yet in production: no index page either.
  if (comparisons.length === 0) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/compare"),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: comparisons.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(comparePath(c.slug)),
        name: c.title,
      })),
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <Header />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-36 sm:pt-44 lg:pt-40">
        <p className="eyebrow mb-5">Compare</p>
        <h1 className="display max-w-3xl text-[clamp(2.25rem,5.5vw,3.75rem)]">How does Talk to me Data compare?</h1>
        <p className="lede mt-6 max-w-2xl text-lg">
          Most social media tools schedule posts you make yourself. Talk to me Data is an AI agent that creates the posts
          too. These pages compare it with the tools people ask us about, honestly, including where the other tool is the
          better pick.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map(c => (
            <Link
              key={c.slug}
              href={comparePath(c.slug)}
              className="group flex flex-col rounded-3xl border border-hairline bg-white p-6 transition-colors hover:border-ink"
            >
              <p className="eyebrow mb-3">{c.reviewed ? "Comparison" : "Draft"}</p>
              <h2 className="text-xl font-semibold tracking-[-0.01em] text-ink">Talk to me Data vs {c.competitor}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-quiet">{c.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                Read the comparison <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-sm text-quiet">
          New to automating social media? Start with our{" "}
          <Link href={categoryPath("social-media-automation")} className="text-ink underline underline-offset-4">
            social media automation guide
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  )
}
