import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCtaBand } from "@/components/blog/cta-band"
import { JsonLd } from "@/components/blog/json-ld"
import { PostCard } from "@/components/blog/post-card"
import { Ambassador } from "@/components/ui/ambassador"
import { Reveal } from "@/components/sections/social-agent/parts"
import {
  CATEGORIES,
  SITE_NAME,
  absoluteUrl,
  categoryPath,
  formatPostDate,
  getAllPostsSorted,
  getCategory,
  getFeaturedPost,
  getPostsByCategory,
  postPath,
} from "@/lib/blog"

const TITLE = "AI Agent & Automation Guides: Build, Automate, Grow"
const DESCRIPTION =
  "Practical guides to AI agents: what they are, how to build one, and how to automate social media, SEO, customer service, data entry and lead generation."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: { "application/rss+xml": absoluteUrl("/blog/rss.xml") },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/blog"),
    title: TITLE,
    description: DESCRIPTION,
    siteName: SITE_NAME,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Talk to Me Data: AI agent guides" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/opengraph-image.png"] },
}

export default function BlogPage() {
  const featured = getFeaturedPost()
  const rest = getAllPostsSorted().filter(p => p.slug !== featured.slug)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    name: `${SITE_NAME} Blog`,
    description: DESCRIPTION,
    url: absoluteUrl("/blog"),
    publisher: { "@id": absoluteUrl("/#organization") },
    blogPost: getAllPostsSorted().map(p => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(postPath(p.slug)),
      datePublished: p.datePublished,
      dateModified: p.dateModified,
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative w-full overflow-hidden bg-white pb-14 pt-36 sm:pt-44 lg:pb-16 lg:pt-40">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:px-8">
            <Reveal className="text-center lg:text-left">
              <p className="eyebrow mb-5">The Talk to Me Data blog</p>
              <h1 className="display text-[clamp(2.75rem,7.5vw,5rem)] lg:text-[clamp(3rem,4.8vw,4.25rem)]">
                AI agent &amp; automation guides
              </h1>
              <p className="lede mx-auto mt-6 max-w-lg text-lg sm:text-xl lg:mx-0">
                Learn what AI agents are, how to build one, and how to automate social media, SEO, customer service,
                data entry and lead generation.
              </p>
            </Reveal>

            {/* The ambassador, at work on the next guide */}
            <Reveal delay={0.1} className="mx-auto flex items-end gap-3 lg:mx-0 lg:justify-self-end">
              <Ambassador pose="working" sizes="200px" className="h-[260px] w-[150px] shrink-0 sm:h-[300px] sm:w-[175px]" priority />
              <div className="relative mb-24 max-w-[13rem] rounded-2xl rounded-bl-sm border border-hairline bg-white px-4 py-3 text-[14px] font-medium leading-snug text-ink shadow-lg shadow-black/5">
                Every guide includes the exact prompts we use. Copy them and build your own.
              </div>
            </Reveal>
          </div>

          {/* Topic hubs */}
          <nav aria-label="Blog topics" className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-2 px-6 lg:justify-start lg:px-8">
            {CATEGORIES.map(category => (
              <Link
                key={category.id}
                href={categoryPath(category.id)}
                className="rounded-full border border-hairline px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                {category.name}
                <span className="ml-1.5 font-mono text-xs text-faint">{getPostsByCategory(category.id).length}</span>
              </Link>
            ))}
          </nav>
        </section>

        {/* Featured + all guides */}
        <section className="border-y border-hairline bg-mist px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="eyebrow mb-5">Featured guide</p>
              <Link
                href={postPath(featured.slug)}
                className="group grid overflow-hidden rounded-3xl border border-hairline bg-white transition-colors hover:border-ink md:grid-cols-2"
              >
                <div className="relative aspect-1200/630 border-b border-hairline bg-mist md:aspect-auto md:min-h-80 md:border-b-0 md:border-r">
                  <Image
                    src={featured.cover.src}
                    alt={featured.cover.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <p className="eyebrow mb-4">{getCategory(featured.category).name}</p>
                  <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-ink">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-quiet">{featured.excerpt}</p>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-faint">
                    <span>
                      <time dateTime={featured.datePublished}>{formatPostDate(featured.datePublished)}</time> · {featured.readMinutes} min read
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                      Read the guide
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>

            <h2 className="eyebrow mb-5 mt-16">All guides</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rest.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Quizzings reviews. The widget renders into a shadow root and only
                inherits font-family and color, so it picks up Geist from <body>
                without any styles here. */}
            <div className="mt-16 flex justify-center">
              <div data-quizzings="reviews" />
            </div>
            {/* www, not the apex: the apex 308s to www and the redirect carries no
                Access-Control-Allow-Origin, so the browser refuses to follow it.
                The script pins its own API origin now, so this only affects the
                script fetch itself, but www is what the docs specify. Polling for
                new reviews is built in (data-refresh, 60s default): do not add a
                refresh loop on top of it. */}
            <Script
              src="https://www.quizzings.com/widget.js"
              data-site="88fed68f-06dc-4f7d-b600-4901330bef19"
              data-layout="badge"
              strategy="afterInteractive"
            />
          </div>
        </section>

        <BlogCtaBand />
      </main>
      <Footer />
    </div>
  )
}
