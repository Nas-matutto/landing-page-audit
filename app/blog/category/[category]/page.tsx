import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCtaBand } from "@/components/blog/cta-band"
import { JsonLd } from "@/components/blog/json-ld"
import { Reveal } from "@/components/sections/social-agent/parts"
import { PostCard } from "@/components/blog/post-card"
import {
  CATEGORIES,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  categoryPath,
  getPostsByCategory,
  postPath,
  type CategoryId,
} from "@/lib/blog"

type Params = Promise<{ category: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORIES.map(c => ({ category: c.id }))
}

function findCategory(id: string) {
  return CATEGORIES.find(c => c.id === (id as CategoryId))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const category = findCategory((await params).category)
  if (!category) return {}
  const url = absoluteUrl(categoryPath(category.id))
  return {
    title: category.heading,
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: category.heading,
      description: category.description,
      siteName: SITE_NAME,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: category.heading }],
    },
    twitter: { card: "summary_large_image", title: category.heading, description: category.description, images: ["/opengraph-image.png"] },
  }
}

export default async function CategoryPage({ params }: { params: Params }) {
  const category = findCategory((await params).category)
  if (!category) notFound()
  const posts = getPostsByCategory(category.id)
  const url = absoluteUrl(categoryPath(category.id))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: category.heading,
        description: category.description,
        url,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.map((post, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(postPath(post.slug)),
            name: post.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: category.name, item: url },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <Header />
      <main>
        <section className="bg-white pb-14 pt-36 sm:pt-44 lg:pb-16 lg:pt-40">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-1.5 text-sm text-quiet">
                <li><Link href="/blog" className="transition-colors hover:text-ink">Blog</Link></li>
                <li aria-hidden><ChevronRight className="h-3.5 w-3.5 text-faint" /></li>
                <li className="text-ink">{category.name}</li>
              </ol>
            </nav>
            <Reveal className="max-w-3xl">
              <p className="eyebrow mb-5">
                {posts.length} {posts.length === 1 ? "guide" : "guides"}
              </p>
              <h1 className="display text-[clamp(2.5rem,6vw,4.25rem)]">{category.heading}</h1>
              <div className="lede mt-6 space-y-4 text-lg">
                {category.intro.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-hairline bg-mist px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="eyebrow mb-5">All {category.name} guides</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            <nav aria-label="Other topics" className="mt-16 text-center">
              <p className="eyebrow mb-4">More topics</p>
              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.filter(c => c.id !== category.id).map(other => (
                  <Link
                    key={other.id}
                    href={categoryPath(other.id)}
                    className="rounded-full border border-hairline bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                  >
                    {other.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </section>

        <BlogCtaBand />
      </main>
      <Footer />
    </div>
  )
}
