import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/blog/json-ld"
import { PostCard } from "@/components/blog/post-card"
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
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Talk to Me Data — AI agent guides" }],
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
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">The Talk to Me Data Blog</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6 text-slate-900">
              AI Agent &amp;{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">
                Automation Guides
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 text-pretty leading-relaxed">
              Learn what AI agents are, how to build one, and how to automate the work that eats your week: social
              media, SEO, customer service, data entry and lead generation. Every guide includes the exact prompts we use.
            </p>
          </div>

          {/* Topic hubs */}
          <nav aria-label="Blog topics" className="mb-16 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(category => (
              <Link
                key={category.id}
                href={categoryPath(category.id)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-primary hover:text-primary"
              >
                {category.name}
                <span className="ml-1.5 text-slate-400">{getPostsByCategory(category.id).length}</span>
              </Link>
            ))}
          </nav>

          {/* Featured Post */}
          <div className="mb-16">
            <Link href={postPath(featured.slug)}>
              <div className="relative rounded-2xl overflow-hidden bg-slate-50 group cursor-pointer border-2 border-slate-200 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto min-h-75 bg-slate-100">
                    <Image
                      src={featured.cover.src}
                      alt={featured.cover.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-sm">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="inline-block mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {getCategory(featured.category).name}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance text-slate-900 group-hover:text-primary transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-slate-500 mb-6 leading-relaxed text-sm">{featured.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={featured.datePublished}>{formatPostDate(featured.datePublished)}</time>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {featured.readMinutes} min read
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Blog Grid */}
          <h2 className="sr-only">All guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Quizzings reviews — mt-16 matches the mb-16 rhythm the header and
              featured post use. The widget renders into a shadow root and only
              inherits font-family and color, so it picks up Geist from <body>
              without any styles here. */}
          <div className="mt-16 flex justify-center">
            <div data-quizzings="reviews" />
          </div>
          {/* www, not the apex — the apex 308s to www and the redirect carries no
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
      </main>
      <Footer />
    </div>
  )
}
