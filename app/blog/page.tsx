import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "10 SEO Mistakes That Are Killing Your Conversion Rate",
      excerpt:
        "Discover the most common SEO errors that are preventing your website from converting visitors into customers, and learn how to fix them.",
      category: "SEO",
      date: "March 15, 2025",
      readTime: "8 min read",
      image: "/seo-analysis-dashboard.png",
      author: "Sarah Chen",
      featured: true,
    },
    {
      title: "How to Improve Website Speed by 50% in One Week",
      excerpt:
        "A step-by-step guide to dramatically improving your website's loading speed and boosting user experience for better conversions.",
      category: "Performance",
      date: "March 12, 2025",
      readTime: "6 min read",
      image: "/website-speed-optimization-metrics.jpg",
      author: "Michael Rodriguez",
      featured: false,
    },
    {
      title: "The Psychology of Website Messaging That Converts",
      excerpt:
        "Learn the psychological principles behind compelling website copy and how to apply them to increase your conversion rates.",
      category: "UX & Messaging",
      date: "March 8, 2025",
      readTime: "10 min read",
      image: "/website-copywriting-and-messaging.jpg",
      author: "Emily Foster",
      featured: false,
    },
    {
      title: "Mobile-First Design: Why It Matters More Than Ever",
      excerpt:
        "With 70% of web traffic coming from mobile devices, learn why mobile-first design is critical for your business success.",
      category: "Mobile",
      date: "March 5, 2025",
      readTime: "7 min read",
      image: "/mobile-responsive-design.png",
      author: "David Park",
      featured: false,
    },
    {
      title: "A/B Testing Your Way to Higher Conversions",
      excerpt:
        "Master the art of A/B testing with this comprehensive guide to testing website elements that drive real business results.",
      category: "Conversion",
      date: "March 1, 2025",
      readTime: "9 min read",
      image: "/ab-testing-analytics-dashboard.jpg",
      author: "Sarah Chen",
      featured: false,
    },
    {
      title: "Website Structure: The Foundation of Great UX",
      excerpt:
        "Explore how proper information architecture and navigation structure can dramatically improve user experience and conversions.",
      category: "Structure",
      date: "February 28, 2025",
      readTime: "8 min read",
      image: "/website-navigation-structure-diagram.jpg",
      author: "Michael Rodriguez",
      featured: false,
    },
  ]

  const categories = ["All", "SEO", "Performance", "UX & Messaging", "Mobile", "Conversion", "Structure"]

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
          <div className="mb-16">
            <div className="relative rounded-2xl overflow-hidden bg-secondary group cursor-pointer border-2 border-border hover:border-primary transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto min-h-[300px]">
                  <Image
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                  />
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
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <article
                key={index}
                className="group cursor-pointer rounded-2xl overflow-hidden border-2 border-border hover:border-primary bg-background transition-all hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-balance group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
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
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="cursor-pointer border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent px-8 py-6"
            >
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
