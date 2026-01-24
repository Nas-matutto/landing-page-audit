"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const handleGetFreeAnalysis = () => {
    window.open('https://app.talktomedata.com/signup', '_blank')
  }

  const handleWatchDemo = () => {
    const demoSection = document.getElementById('how-it-works')
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // 👇 ADD YOUR PROFILE IMAGE PATHS HERE
  // Place images in: public/avatars/user1.jpg, user2.jpg, etc.
  const profilePictures = [
    "/avatars/user1.jpg",
    "/avatars/user2.jpg",
    "/avatars/user3.jpg",
    "/avatars/user4.jpg",
  ]

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-[11px] sm:text-sm font-medium mb-6">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">Built Specifically for Shopify Stores</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
            Increase Your Shopify Store{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">
              Conversion Rate
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-pretty">
            Get instant AI-powered insights on your product pages, checkout flow, site speed, mobile experience, and conversion blockers. Turn more visitors into paying customers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-xl group cursor-pointer"
              onClick={handleGetFreeAnalysis}
            >
              Analyze My Store Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg bg-transparent cursor-pointer"
              onClick={handleWatchDemo}
            >
              See How It Works
            </Button>
          </div>

          {/* Social proof with profile pictures */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {profilePictures.map((pic, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background overflow-hidden relative"
                >
                  <Image
                    src={pic}
                    alt={`Shopify store owner ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="font-medium text-center sm:text-left">
              Join <span className="text-foreground font-semibold">2,000+</span> Shopify merchants optimizing their stores
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}