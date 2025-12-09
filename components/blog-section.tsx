import { Card } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    title: "10 Quick Wins to Boost Your Conversion Rate Today",
    excerpt:
      "Discover simple, actionable changes you can make right now to see immediate improvements in your website conversions.",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    category: "Conversion Optimization",
  },
  {
    title: "The Ultimate Guide to SEO in 2025",
    excerpt: "Everything you need to know about modern SEO practices, from technical optimization to content strategy.",
    date: "Jan 12, 2025",
    readTime: "8 min read",
    category: "SEO",
  },
  {
    title: "Mobile-First Design: Why It Matters More Than Ever",
    excerpt:
      "Learn why mobile optimization is crucial for conversions and how to ensure your site performs flawlessly on all devices.",
    date: "Jan 8, 2025",
    readTime: "6 min read",
    category: "Mobile",
  },
]

export function BlogSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            Latest Insights & Resources
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Stay ahead of the curve with expert tips, strategies, and insights on website optimization.
          </p>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all overflow-hidden border-2 hover:border-primary/20"
            >
              {/* Image */}
              <div className="aspect-video bg-secondary overflow-hidden">
                <img
                  src={`/.jpg?height=400&width=600&query=${post.category.toLowerCase()}+optimization`}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-semibold mb-3">
                  {post.category}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Read more link */}
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-primary font-semibold text-sm mt-4 group-hover:gap-2 transition-all"
                >
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center">
          <Link
            href="#blog"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-lg transition-colors"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
