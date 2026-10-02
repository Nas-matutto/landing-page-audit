import { PostCard } from "@/components/blog/post-card"
import { getAllPostsSorted } from "@/lib/blog"

/**
 * "Guides" band for an agent page: the blog posts whose `agentPage` points at
 * this agent. Links the commercial page to its informational guides (and the
 * guides already link back), so each keyword cluster is internally connected.
 */
export function AgentGuidesSection({ agentHref }: { agentHref: string }) {
  const posts = getAllPostsSorted().filter(p => p.agentPage?.href === agentHref)
  if (posts.length === 0) return null
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">Guides</p>
          <h2 className="text-3xl font-bold tracking-tight text-balance text-slate-900 sm:text-4xl">
            Learn how this agent works
          </h2>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
