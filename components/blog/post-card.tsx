import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { formatPostDate, getCategory, postPath, type BlogPost } from "@/lib/blog"

export function PostCard({ post, headingLevel = "h3" }: { post: BlogPost; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel
  return (
    <Link href={postPath(post.slug)} className="block h-full">
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/8">
        <div className="relative aspect-[1200/630] overflow-hidden bg-slate-100">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex grow flex-col p-6">
          <span className="mb-3 self-start rounded-full bg-primary/8 px-2.5 py-1 text-xs font-semibold text-primary">
            {getCategory(post.category).name}
          </span>
          <Heading className="mb-3 text-base font-bold leading-snug text-balance text-slate-900 transition-colors group-hover:text-primary">
            {post.title}
          </Heading>
          <p className="mb-4 line-clamp-3 grow text-sm leading-relaxed text-slate-500">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readMinutes} min read
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  )
}
