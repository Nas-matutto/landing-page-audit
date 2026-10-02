import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthorAvatar } from "@/components/blog/author-avatar"
import { JsonLd } from "@/components/blog/json-ld"
import { PostCard } from "@/components/blog/post-card"
import { AUTHORS, authorUrl } from "@/lib/authors"
import { SITE_NAME, SITE_URL, absoluteUrl, getAllPostsSorted, postPath } from "@/lib/blog"

type Params = Promise<{ id: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(AUTHORS).map(id => ({ id }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const author = AUTHORS[(await params).id]
  if (!author) return {}
  const title = `${author.name}, Author at ${SITE_NAME}`
  return {
    title,
    description: author.bio,
    alternates: { canonical: absoluteUrl(authorUrl(author.id)) },
    openGraph: {
      type: "profile",
      url: absoluteUrl(authorUrl(author.id)),
      title,
      description: author.bio,
      siteName: SITE_NAME,
      images: [author.image ?? "/opengraph-image.png"],
    },
  }
}

export default async function AuthorPage({ params }: { params: Params }) {
  const author = AUTHORS[(await params).id]
  if (!author) notFound()
  const posts = getAllPostsSorted().filter(p => p.author === author.id)
  const url = absoluteUrl(authorUrl(author.id))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#page`,
    url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "Person",
      "@id": `${url}#person`,
      name: author.name,
      ...(author.jobTitle && { jobTitle: author.jobTitle }),
      description: author.bio,
      url,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      ...(author.image && { image: absoluteUrl(author.image) }),
      ...(author.sameAs.length > 0 && { sameAs: author.sameAs }),
    },
    hasPart: posts.map(p => ({ "@type": "BlogPosting", headline: p.title, url: absoluteUrl(postPath(p.slug)) })),
  }

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center">
            <AuthorAvatar author={author} size={96} />
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">{author.name}</h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-primary">{author.jobTitle ?? SITE_NAME}</p>
            <p className="mt-5 text-lg leading-relaxed text-slate-500">{author.bio}</p>
            {author.sameAs.length > 0 && (
              <ul className="mt-5 flex flex-wrap justify-center gap-4 text-sm">
                {author.sameAs.map(profile => (
                  <li key={profile}>
                    <a href={profile} rel="me noopener noreferrer" target="_blank" className="text-primary hover:underline">
                      {new URL(profile).hostname.replace(/^www\./, "").replace(/\.com$/, "").replace(/^linkedin$/, "LinkedIn")}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </header>

          <h2 className="mb-6 text-2xl font-bold text-slate-900">Guides by {author.name}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
