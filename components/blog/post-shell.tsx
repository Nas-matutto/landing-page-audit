import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowUpRight, ChevronRight, Clock } from "lucide-react"
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
  const linkedIn = author.sameAs.find(url => url.includes("linkedin.com"))

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={buildPostJsonLd(slug, faqs)} />
      <Header />
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:grid lg:max-w-6xl lg:grid-cols-[minmax(0,48rem)_14rem] lg:justify-center lg:gap-16">
            <article className="min-w-0 text-neutral-600 [&_h2[id]]:scroll-mt-32">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-1.5 text-sm text-quiet">
                  <li><Link href="/blog" className="transition-colors hover:text-ink">Blog</Link></li>
                  <li aria-hidden><ChevronRight className="h-3.5 w-3.5 text-faint" /></li>
                  <li><Link href={categoryPath(category.id)} className="transition-colors hover:text-ink">{category.name}</Link></li>
                </ol>
              </nav>

              <header className="mb-10">
                <Link href={categoryPath(category.id)} className="eyebrow transition-colors hover:text-ink!">
                  {category.name}
                </Link>
                <h1 className="display mt-5 mb-7 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05]">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-quiet">
                  <Link href={authorUrl(author.id)} className="group flex items-center gap-2.5">
                    <AuthorAvatar author={author} size={28} />
                    <span>
                      By <span className="font-semibold text-ink group-hover:underline">{author.name}</span>
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

              <div className="mb-10 overflow-hidden rounded-3xl border border-hairline bg-mist">
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
                  className="group mt-12 flex items-center justify-between gap-4 rounded-3xl border border-hairline p-6 transition-colors hover:border-ink sm:p-7"
                >
                  <span>
                    <span className="eyebrow block">Done for you</span>
                    <span className="mt-2 block text-lg font-semibold tracking-[-0.01em] text-ink">{post.agentPage.label}</span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
              )}

              <aside aria-label="About the author" className="mt-6 flex gap-5 rounded-3xl border border-hairline bg-mist p-6 sm:p-7">
                <AuthorAvatar author={author} size={44} />
                <div>
                  <p className="eyebrow">Written by</p>
                  <Link href={authorUrl(author.id)} className="mt-1.5 block text-lg font-semibold text-ink hover:underline">
                    {author.name}
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-quiet">{author.bio}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-faint">
                    {linkedIn && (
                      <a
                        href={linkedIn}
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="text-sm font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                      >
                        Connect on LinkedIn
                      </a>
                    )}
                    <span>
                      Published <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time>
                      {updated && <> · Updated <time dateTime={post.dateModified}>{formatPostDate(post.dateModified)}</time></>}
                    </span>
                  </div>
                </div>
              </aside>

              <section aria-labelledby="related" className="mt-16 border-t border-hairline pt-12">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="eyebrow mb-3">Keep reading</p>
                    <h2 id="related" className="text-2xl font-semibold tracking-[-0.01em] text-ink">Related guides</h2>
                  </div>
                  <Link href={categoryPath(category.id)} className="text-sm font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                    All {category.name} guides
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {getRelatedPosts(slug).map(related => (
                    <PostCard key={related.slug} post={related} compact />
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
