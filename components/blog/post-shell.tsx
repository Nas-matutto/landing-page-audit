import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, ChevronRight, Clock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthorAvatar } from "@/components/blog/author-avatar"
import { FaqSection } from "@/components/blog/faq-section"
import { JsonLd } from "@/components/blog/json-ld"
import { PostCard } from "@/components/blog/post-card"
import { MobileTableOfContents, TableOfContents, collectHeadings } from "@/components/blog/table-of-contents"
import { authorUrl, getAuthor } from "@/lib/authors"
import {
  buildPostJsonLd,
  categoryPath,
  formatPostDate,
  getCategory,
  getPost,
  getRelatedPosts,
  type Faq,
} from "@/lib/blog"

/**
 * The frame every blog post renders in: breadcrumb, H1, author byline, dates,
 * hero image, table of contents, FAQ, author box, related posts and the
 * post's JSON-LD. Posts supply only their body and FAQ list.
 *
 * Body <h2>s need an `id` to appear in the table of contents.
 */
export function BlogPostShell({ slug, faqs = [], children }: { slug: string; faqs?: Faq[]; children: ReactNode }) {
  const post = getPost(slug)
  const author = getAuthor(post.author)
  const category = getCategory(post.category)
  const toc = collectHeadings(children)
  if (faqs.length > 0) toc.push({ id: "faq", text: "Frequently Asked Questions" })
  const updated = post.dateModified !== post.datePublished

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={buildPostJsonLd(slug, faqs)} />
      <Header />
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:grid lg:max-w-6xl lg:grid-cols-[minmax(0,48rem)_14rem] lg:justify-center lg:gap-16">
            <article className="min-w-0 [&_h2[id]]:scroll-mt-32">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
                  <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                  <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
                  <li><Link href={categoryPath(category.id)} className="hover:text-primary">{category.name}</Link></li>
                </ol>
              </nav>

              <header className="mb-10">
                <Link
                  href={categoryPath(category.id)}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/15"
                >
                  {category.name}
                </Link>
                <h1 className="mt-5 mb-6 text-4xl font-bold leading-tight tracking-tight text-balance text-slate-900 sm:text-5xl">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                  <Link href={authorUrl(author.id)} className="group flex items-center gap-2.5">
                    <AuthorAvatar author={author} size={36} />
                    <span>
                      By <span className="font-semibold text-slate-700 group-hover:text-primary">{author.name}</span>
                    </span>
                  </Link>
                  <span>
                    {updated ? "Updated " : "Published "}
                    <time dateTime={post.dateModified}>{formatPostDate(post.dateModified)}</time>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {post.readMinutes} min read
                  </span>
                </div>
              </header>

              <div className="mb-10 overflow-hidden rounded-2xl border border-slate-200">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  width={post.cover.width}
                  height={post.cover.height}
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="h-auto w-full"
                  priority
                />
              </div>

              <MobileTableOfContents entries={toc} />

              {children}

              <FaqSection faqs={faqs} />

              {post.agentPage && (
                <Link
                  href={post.agentPage.href}
                  className="group mt-12 flex items-center justify-between gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-6 transition-colors hover:border-primary"
                >
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-widest text-primary">Done for you</span>
                    <span className="mt-1 block font-semibold text-slate-900">{post.agentPage.label}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              <aside aria-label="About the author" className="mt-12 flex gap-5 rounded-2xl border border-slate-200 p-6">
                <AuthorAvatar author={author} size={56} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Written by</p>
                  <Link href={authorUrl(author.id)} className="mt-1 block text-lg font-bold text-slate-900 hover:text-primary">
                    {author.name}
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
                  {author.sameAs.some(url => url.includes("linkedin.com")) && (
                    <a
                      href={author.sameAs.find(url => url.includes("linkedin.com"))}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
                    >
                      Connect on LinkedIn
                    </a>
                  )}
                  <p className="mt-3 text-xs text-slate-400">
                    Published <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time>
                    {updated && <> · Last updated <time dateTime={post.dateModified}>{formatPostDate(post.dateModified)}</time></>}
                  </p>
                </div>
              </aside>

              <section aria-labelledby="related" className="mt-16 border-t border-border pt-10">
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                  <h2 id="related" className="text-2xl font-bold text-slate-900">Related guides</h2>
                  <Link href={categoryPath(category.id)} className="text-sm font-semibold text-primary hover:underline">
                    All {category.name} guides →
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {getRelatedPosts(slug).map(related => (
                    <PostCard key={related.slug} post={related} />
                  ))}
                </div>
              </section>
            </article>

            <aside className="hidden lg:block">
              <TableOfContents entries={toc} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
