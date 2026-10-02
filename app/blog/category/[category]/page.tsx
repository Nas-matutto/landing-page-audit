import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/blog/json-ld"
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
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mx-auto mb-8 max-w-3xl">
            <ol className="flex items-center gap-1.5 text-sm text-slate-500">
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li className="text-slate-700">{category.name}</li>
            </ol>
          </nav>

          <header className="mx-auto mb-12 max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-5xl">
              {category.heading}
            </h1>
            <div className="space-y-4 text-lg leading-relaxed text-slate-500">
              {category.intro.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </header>

          <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
            {posts.length} {posts.length === 1 ? "guide" : "guides"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <nav aria-label="Other topics" className="mt-16 border-t border-slate-200 pt-10 text-center">
            <p className="mb-4 text-sm font-semibold text-slate-700">More topics</p>
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.filter(c => c.id !== category.id).map(other => (
                <Link
                  key={other.id}
                  href={categoryPath(other.id)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-primary hover:text-primary"
                >
                  {other.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  )
}
