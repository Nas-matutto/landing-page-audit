import type { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StoreAnalyzerClient } from "./client"

export const metadata: Metadata = {
  title: 'Free E-commerce Store Analyzer | Instant Conversion Audit | Talk to me Data',
  description: 'Analyze your e-commerce store in 60 seconds. Get instant conversion health score and discover optimization opportunities. Free, unlimited use. Works with Shopify, WooCommerce, and all platforms.',
  keywords: [
    'ecommerce store analyzer',
    'free store audit',
    'conversion rate audit',
    'ecommerce optimization',
    'shopify analyzer',
    'woocommerce analyzer',
    'store health check',
    'conversion audit tool',
    'free ecommerce audit',
    'store analyzer tool'
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}