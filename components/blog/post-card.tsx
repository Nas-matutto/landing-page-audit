import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { formatPostDate, getCategory, postPath, type BlogPost } from "@/lib/blog"

export function PostCard({
  post,
  headingLevel = "h3",
  compact = false,
}: {
  post: BlogPost
  headingLevel?: "h2" | "h3"
  /** Hide the excerpt, for narrow grids such as related posts. */
  compact?: boolean
}) {
  const Heading = headingLevel
  return (
    <Link
      href={postPath(post.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-white transition-colors hover:border-ink"
    >
      <div className="relative aspect-1200/630 overflow-hidden border-b border-hairline bg-mist">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex grow flex-col p-6">
        <p className="eyebrow mb-3">{getCategory(post.category).name}</p>
        <Heading className="text-[17px] font-semibold leading-snug tracking-[-0.01em] text-balance text-ink">{post.title}</Heading>
        {!compact && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-quiet">{post.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between pt-6 text-xs text-faint">
          <span>
            <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time> · {post.readMinutes} min read
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
