import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This will be automatically populated from your blog posts
// For now, we'll use this data structure
const blogPosts = [
  {
    slug: "how-to-analyze-website-conversion-issues",
    title: "How to Analyze Your Website for Conversion Issues (Step-by-Step)",
    excerpt:
      "Learn the exact framework top founders use to identify and fix conversion problems on their websites. A practical, step-by-step guide.",
    category: "Conversion",
    date: "December 19, 2025",
    readTime: "5 min read",
    image: "/blog/conversion-analysis-cover.jpg",
    author: "Nas",
    featured: true,
  },
  // Add more blog posts here as you write them
]

const categories = ["All", "SEO", "Performance", "UX & Messaging", "Mobile", "Conversion", "Structure"]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6">
              Insights to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">
                Boost Conversions
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
              Expert tips, guides, and strategies to help you optimize your website for maximum performance and
              conversions.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  category === "All"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {blogPosts.length > 0 && blogPosts[0].featured && (
            <div className="mb-16">
              <Link href={`/blog/${blogPosts[0].slug}`}>
                <div className="relative rounded-2xl overflow-hidden bg-secondary group cursor-pointer border-2 border-border hover:border-primary transition-all">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto min-h-[300px] bg-muted/50">
                      {blogPosts[0].image ? (
                        <Image
                          src={blogPosts[0].image}
                          alt={blogPosts[0].title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-muted-foreground">Featured Post</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="inline-block mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {blogPosts[0].category}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance group-hover:text-primary transition-colors">
                        {blogPosts[0].title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {blogPosts[0].date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {blogPosts[0].readTime}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {blogPosts[0].author[0]}
                        </div>
                        <span className="font-medium">{blogPosts[0].author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Blog Grid */}
          {blogPosts.length > 1 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <Link key={index} href={`/blog/${post.slug}`}>
                  <article className="group cursor-pointer rounded-2xl overflow-hidden border-2 border-border hover:border-primary bg-background transition-all hover:shadow-lg h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-muted/50">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-muted-foreground">Blog Post</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="inline-block mb-3 self-start">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-balance group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            {post.author[0]}
                          </div>
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Empty state */}
          {blogPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
