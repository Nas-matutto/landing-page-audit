import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthorAvatar } from "@/components/blog/author-avatar"
import { BlogCtaBand } from "@/components/blog/cta-band"
import { JsonLd } from "@/components/blog/json-ld"
import { Reveal } from "@/components/sections/social-agent/parts"
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
      <main>
        <section className="bg-white pb-14 pt-36 sm:pt-44 lg:pb-16 lg:pt-40">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
            <AuthorAvatar author={author} size={80} />
            <p className="eyebrow mt-7">{author.jobTitle ?? SITE_NAME}</p>
            <h1 className="display mt-4 text-[clamp(2.75rem,6vw,4.25rem)]">{author.name}</h1>
            <p className="lede mt-6 text-lg">{author.bio}</p>
            {author.sameAs.length > 0 && (
              <ul className="mt-7 flex flex-wrap justify-center gap-2">
                {author.sameAs.map(profile => (
                  <li key={profile}>
                    <a
                      href={profile}
                      rel="me noopener noreferrer"
                      target="_blank"
                      className="inline-flex items-center rounded-full border border-hairline px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                    >
                      {new URL(profile).hostname.includes("linkedin") ? "Connect on LinkedIn" : new URL(profile).hostname.replace(/^www\./, "")}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </section>

        <section className="border-y border-hairline bg-mist px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="eyebrow mb-5">Guides by {author.name}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        <BlogCtaBand />
      </main>
      <Footer />
    </div>
  )
}
