import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StoreAnalyzerClient } from "./client"

export const metadata: Metadata = {
  title: 'Free E-commerce Store Analyzer | Shopify Store Analyzer | Instant Conversion Audit | Talk to me Data',
  description: 'Analyze your e-commerce store in 60 seconds. Get instant conversion health score for Shopify, WooCommerce, and all platforms. Free, unlimited e-commerce landing page optimization tool.',
  keywords: [
    'ecommerce store analyzer',
    'shopify store analyzer',
    'free store audit',
    'conversion rate audit',
    'ecommerce optimization',
    'ecommerce landing page optimization',
    'shopify analyzer',
    'woocommerce analyzer',
    'store health check',
    'conversion audit tool',
    'free ecommerce audit',
    'store analyzer tool',
    'ecommerce conversion optimization'
  ],
  openGraph: {
    title: 'Free E-commerce Store Analyzer - Get Instant Conversion Insights',
    description: 'Analyze your store in 60 seconds. Get conversion score and top optimization opportunities. Free and unlimited.',
    type: 'website',
    url: 'https://talktomedata.com/features/store-analyzer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free E-commerce Store Analyzer | Talk to me Data',
    description: 'Get instant conversion health score and optimization insights for your store. Free and unlimited.',
  },
  alternates: {
    canonical: 'https://talktomedata.com/features/store-analyzer',
  },
}

export default function StoreAnalyzerPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  Free Tool
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                E-commerce Store{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Analyzer
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Get an instant conversion health score and discover optimization opportunities. Completely free, unlimited use.
              </p>
            </div>

            {/* Analyzer Tool */}
            <StoreAnalyzerClient />

            {/* What We Check */}
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="text-3xl font-bold text-center mb-8">What We Analyze</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Page Speed",
                    description: "Load time, image optimization, performance metrics"
                  },
                  {
                    title: "Mobile Experience",
                    description: "Responsive design, touch targets, mobile UX"
                  },
                  {
                    title: "Product Pages",
                    description: "Images, descriptions, CTAs, pricing visibility"
                  },
                  {
                    title: "Trust Signals",
                    description: "Security badges, reviews, contact information"
                  },
                  {
                    title: "Checkout Flow",
                    description: "Form fields, payment options, guest checkout"
                  },
                  {
                    title: "SEO Basics",
                    description: "Meta tags, headings, image alt text"
                  }
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors">
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Content Section */}
            <article className="mt-16 pt-16 border-t border-border prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">The Complete Guide to E-commerce Store Optimization</h2>
              
              <div className="space-y-8 text-foreground">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Why E-commerce Landing Page Optimization Matters</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    In today's competitive e-commerce landscape, optimizing your store's landing pages isn't optional—it's essential. Studies show that a one-second delay in page load time can reduce conversions by 7%, while optimized landing pages can increase conversion rates by up to 300%. Whether you're running a Shopify store, WooCommerce site, or custom e-commerce platform, conversion rate optimization (CRO) is the key to maximizing your revenue without spending more on advertising.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our free e-commerce store analyzer helps you identify exactly where your store is losing potential customers. By analyzing 15+ critical conversion factors, we provide actionable insights that can dramatically improve your store's performance.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">What Makes a High-Converting Shopify Store</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Shopify store optimization goes beyond just having good products. The most successful Shopify stores share common characteristics: lightning-fast load times (under 3 seconds), mobile-first design, clear value propositions above the fold, prominent trust signals, and frictionless checkout flows. Our Shopify store analyzer specifically checks for these elements and provides detailed recommendations for improvement.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Key elements our analyzer evaluates include product page structure, image optimization, social proof placement, shipping information visibility, and mobile responsiveness. Each of these factors plays a crucial role in converting visitors into customers.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">E-commerce Conversion Rate Benchmarks</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Understanding where your store stands is crucial. The average e-commerce conversion rate across all industries is 2-3%, but top-performing stores achieve 5-10% or higher. Our e-commerce analyzer provides a conversion health score that shows how your store compares to these benchmarks and identifies specific areas where improvements can push you into the top tier.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Factors that separate high-converting stores from average ones include page speed (top stores load in under 2 seconds), trust signals (displaying reviews prominently), mobile optimization (60-70% of traffic is mobile), and checkout simplicity (reducing form fields and offering guest checkout).
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Common E-commerce Optimization Mistakes</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Through analyzing thousands of e-commerce stores, we've identified recurring mistakes that kill conversions. The most common include: hidden shipping costs (revealed only at checkout), poor mobile experience, lack of social proof, slow page load times, unclear return policies, and complicated checkout processes. Our free store analyzer automatically detects these issues and provides specific fixes.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Many store owners focus on driving more traffic without optimizing for conversion. This is like pouring water into a leaky bucket. By fixing conversion issues first, you get more value from every visitor, effectively increasing your ROI on all marketing spend.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">The ROI of Store Optimization</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Improving your conversion rate from 2% to 3% means 50% more revenue from the same traffic. If you're spending $10,000/month on ads generating 10,000 visitors and 200 sales, improving to 3% means 300 sales—an extra $XX,XXX in revenue depending on your average order value. Unlike paid advertising, optimization improvements compound over time and benefit all traffic sources.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our e-commerce store analyzer identifies quick wins that can be implemented immediately, as well as strategic improvements for long-term growth. Most stores see measurable improvements within 30 days of implementing our recommendations.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">How to Use This Free Store Analyzer</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Using our free e-commerce analyzer is simple: enter your store URL, click analyze, and receive an instant conversion health score along with detailed optimization opportunities. The tool works with all e-commerce platforms including Shopify, WooCommerce, BigCommerce, Magento, and custom builds.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We analyze your store across 15+ conversion factors including page speed, mobile optimization, trust signals, SEO elements, checkout flow, and more. Each issue is prioritized by impact, so you know exactly what to fix first for maximum results. The tool is completely free and unlimited—analyze as many stores as you want.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Start Optimizing Your Store Today</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Don't let conversion issues cost you sales. Use our free store analyzer to identify exactly what's holding back your e-commerce store's performance. Whether you're just launching or looking to scale, understanding and fixing these issues is crucial for sustainable growth. Enter your store URL above to get started in 60 seconds.
                  </p>
                </section>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}