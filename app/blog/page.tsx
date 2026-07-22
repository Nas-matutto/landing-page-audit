import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Agents & Automation Guides | Talk to me Data",
  description:
    "Practical guides on building and deploying AI agents for small and medium businesses. No code, no complexity - just results.",
}

const blogPosts = [
  {
    slug: "what-are-ai-agents",
    title: "What Are AI Agents? A Plain-English Guide for Business Owners",
    excerpt:
      "AI agents go far beyond chatbots. This guide explains what they are, how they work, the different types, and what they can realistically do for your business today — plus a 10-question quiz to test your knowledge.",
    category: "AI Agents",
    date: "June 16, 2026",
    readTime: "14 min read",
    image: "/AI_Agents_Quiz.png",
    author: "Nas",
    featured: true,
  },
  {
    slug: "how-to-automate-customer-service-with-ai-agent",
    title: "How to Automate Customer Service With an AI Agent (With the Exact Prompt)",
    excerpt:
      "An AI agent that lives in your website chat bubble, answers common questions instantly, logs every request to Google Sheets, ranks them by urgency, and drafts a recommended solution for your team. Includes the full prompt to copy.",
    category: "AI Agents",
    date: "July 22, 2026",
    readTime: "10 min read",
    image: "/Customer_support_example.png",
    author: "Nas",
    featured: false,
  },
  {
    slug: "how-to-automate-seo-and-geo-growth-with-ai-agent",
    title: "How to Automate SEO and GEO Growth With an AI Agent",
    excerpt:
      "An AI agent that reads your Google Search Console data, finds the keywords you can rank higher for, and writes and publishes SEO- and GEO-optimized content on autopilot — on request or automatically every week.",
    category: "AI Agents",
    date: "July 17, 2026",
    readTime: "11 min read",
    image: "/blog/Google_Search_Console_Ggraph_GEO.png",
    author: "Nas",
    featured: false,
  },
  {
    slug: "how-to-automate-invoices-into-accounting-software",
    title: "How to Automate Invoices Into Your Accounting Software (With the Exact Prompt)",
    excerpt:
      "An AI agent that scans PDF invoices, extracts the vendor, line items, and pricing, and auto-populates them into QuickBooks — or any other accounting software. Includes the full prompt to copy.",
    category: "AI Agents",
    date: "July 10, 2026",
    readTime: "9 min read",
    image: "/Invoice_AI_Agent.png",
    author: "Nas",
    featured: false,
  },
  {
    slug: "how-to-build-social-media-ai-agent",
    title: "How to Build a Social Media AI Agent (With the Exact Prompt to Copy)",
    excerpt:
      "Build an AI agent that scrapes your Instagram, ranks your top-performing posts, extracts your winning hooks, and generates 10 new content ideas — all logged automatically to a Google Sheet. Includes the full prompt.",
    category: "AI Agents",
    date: "June 22, 2026",
    readTime: "10 min read",
    image: "/Instagram_AI_Agent.png",
    author: "Nas",
    featured: false,
  },
  {
    slug: "ai-agents-for-small-business",
    title: "AI Agents for Small Business: How SMBs Are Automating Operations Without a Tech Team",
    excerpt:
      "Most small business owners assume AI automation is reserved for companies with large engineering teams and enterprise budgets. It isn't. Here's how AI agents are changing what's possible for SMBs — and how to get started.",
    category: "AI Agents",
    date: "June 3, 2026",
    readTime: "13 min read",
    image: "/blog/ai-agents-smb-cover.png",
    author: "Nas",
    featured: false,
  },
  {
    slug: "how-to-build-ai-lead-finder-agent",
    title: "How to Build an AI Agent That Finds, Qualifies and Researches B2B Leads",
    excerpt:
      "A step-by-step guide to building a two-agent lead generation pipeline using Claude, Apify, and Google Sheets. Includes both agent prompts ready to copy, plus how to verify emails with NeverBounce before you send a single message.",
    category: "AI Agents",
    date: "June 10, 2026",
    readTime: "12 min read",
    image: "/blog/ai-leads-agent-cover.png",
    author: "Nas",
    featured: false,
  },
  {
    slug: "how-to-build-ai-voice-agent",
    title: "How to Build an AI Voice Agent for Free Using Claude and ElevenLabs",
    excerpt:
      "A step-by-step guide to building your first AI voice agent with no code and no cost - using Claude Desktop and ElevenLabs. Includes a ready-to-use agent prompt and a full video walkthrough.",
    category: "AI Agents",
    date: "June 7, 2026",
    readTime: "11 min read",
    image: "/blog/ai-voice-agent-cover.png",
    author: "Nas",
    featured: false,
  },
  {
    slug: "how-to-use-intent-signals-to-increase-conversion-rates",
    title: "How to Use Intent Signals to Increase Your Conversion Rates",
    excerpt:
      "Intent signals reveal which companies are actively using your competitor's tools. Learn how to find them, craft messages that resonate, and achieve 5–15× higher reply rates than cold outreach.",
    category: "Sales Intelligence",
    date: "April 21, 2026",
    readTime: "10 min read",
    image: "/blog/Signal_based_buying.jpg",
    author: "Nas",
    featured: false,
  },
  {
    slug: "how-to-analyze-website-conversion-issues",
    title: "How to Analyze Your Website for Conversion Issues (Step-by-Step)",
    excerpt:
      "Learn the exact framework top founders use to identify and fix conversion problems on their websites. A practical, step-by-step guide.",
    category: "Conversion",
    date: "December 19, 2025",
    readTime: "9 min read",
    image: "/blog/conversion-analysis-cover.jpg",
    author: "Nas",
    featured: false,
  },
  {
    slug: "website-checklist-how-to-build-landing-page-that-converts",
    title: "Website Checklist: How to Build a Landing Page That Converts",
    excerpt:
      "Complete landing page checklist covering must-have elements, business stage priorities, and common mistakes. Build pages that convert at 2-3x industry averages.",
    category: "Website Optimization",
    date: "January 14, 2026",
    readTime: "11 min read",
    image: "/blog/website-checklist-cover.jpg",
    author: "Nas",
    featured: false,
  },
  {
    slug: "how-to-use-ai-to-improve-conversion-rates",
    title: "How to Use AI to Improve Conversion Rate: A Practical Guide for Founders",
    excerpt:
      "Discover how AI analyzes 150+ factors in 60 seconds to boost conversions by 15-40%. Learn to implement AI recommendations and measure results.",
    category: "AI & Conversion",
    date: "January 13, 2026",
    readTime: "11 min read",
    image: "/blog/ai-conversion-cover.jpg",
    author: "Nas",
    featured: false,
  },
  {
    slug: "how-to-build-website-to-collect-leads",
    title: "How to Build a Website to Collect Leads: The Complete B2B Landing Page Guide",
    excerpt:
      "Master B2B lead generation with proven landing page structures, form optimization strategies, and follow-up systems that convert visitors into qualified leads.",
    category: "Lead Generation",
    date: "January 08, 2026",
    readTime: "12 min read",
    image: "/blog/lead-generation-cover.jpg",
    author: "Nas",
    featured: false,
  },
  {
    slug: "how-to-make-website-faster",
    title: "How to Make Your Website Faster: The Complete Guide for Founders",
    excerpt:
      "Practical speed optimization strategies that reduce load time by 50-70%. Learn which tools to use and how page speed impacts conversions.",
    category: "Performance",
    date: "December 26, 2025",
    readTime: "10 min read",
    image: "/blog/website-speed-cover.jpg",
    author: "Nas",
    featured: false,
  },
  {
    slug: "yc-landing-page-optimization",
    title: "10 Things Every Y Combinator Startup Landing Page Has in Common (2026 Analysis)",
    excerpt:
      "Analyze the common patterns in successful YC startup landing pages and learn how to apply them to your own website.",
    category: "Conversion",
    date: "December 23, 2025",
    readTime: "15 min read",
    image: "/blog/YC_image.jpeg",
    author: "Nas",
    featured: false,
  },
  {
    slug: "increase-conversion-rate-30-days",
    title: "How to Increase Website Conversion Rate in 30 Days (No Redesign Required)",
    excerpt:
      "Achieve 15-30% conversion improvements in 30 days using the Sprint Method. Focus on high-impact changes that require no redesign.",
    category: "Conversion",
    date: "December 21, 2025",
    readTime: "10 min read",
    image: "/blog/30-day-sprint-cover.jpg",
    author: "Nas",
    featured: false,
  },
]

const categories = ["All", "AI Agents", "Sales Intelligence", "Lead Generation", "Conversion", "Performance", "AI & Conversion", "Website Optimization"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">AI Agents & Automation</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6 text-slate-900">
              Read the best tips to launch your{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-500">
                AI Agents
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 text-pretty leading-relaxed">
              Practical guides on building, deploying and automating AI agents for your business.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  category === "All"
                    ? "bg-primary text-white shadow-sm shadow-primary/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 group cursor-pointer border-2 border-slate-200 hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/10">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto min-h-[300px] bg-slate-100">
                      {blogPosts[0].image ? (
                        <Image
                          src={blogPosts[0].image}
                          alt={blogPosts[0].title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-violet-500/10">
                          <span className="text-slate-400 text-sm">Featured Post</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full shadow-sm">
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
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance text-slate-900 group-hover:text-primary transition-colors leading-tight">
                        {blogPosts[0].title}
                      </h2>
                      <p className="text-slate-500 mb-6 leading-relaxed text-sm">{blogPosts[0].excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {blogPosts[0].date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {blogPosts[0].readTime}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">
                            {blogPosts[0].author[0]}
                          </div>
                          <span className="font-medium text-slate-700 text-sm">{blogPosts[0].author}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Blog Grid */}
          {blogPosts.length > 1 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(1).map((post, index) => (
                <Link key={index} href={`/blog/${post.slug}`}>
                  <article className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 hover:border-primary bg-white transition-all hover:shadow-lg hover:shadow-primary/8 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/5 to-violet-500/5">
                          <span className="text-slate-400 text-sm">Blog Post</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="inline-block mb-3 self-start">
                        <span className="px-2.5 py-1 bg-primary/8 text-primary text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold mb-3 text-balance text-slate-900 group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-3 grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
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
                          <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs">
                            {post.author[0]}
                          </div>
                          <span className="text-xs font-medium text-slate-600">{post.author}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
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
              <p className="text-slate-400 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
