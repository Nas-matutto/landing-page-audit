"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
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
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#95BF47]/10 border border-[#95BF47]/20 text-[#5E8E3E] text-[11px] sm:text-sm font-medium mb-6">
            {/* Shopify Logo SVG */}
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.337 2.368c-.017-.106-.09-.195-.195-.195-.106 0-1.376-.035-1.376-.035s-1.017-.993-1.14-1.116c-.124-.124-.371-.089-.466-.053 0 0-.231.071-.626.195-.052-.16-.124-.354-.23-.566-.337-.69-.832-1.057-1.429-1.057h-.071c-.213-.266-.478-.372-.69-.372C8.432-.83 7.76.124 7.485.92c-.195.566-.337 1.27-.39 1.695-.832.266-1.411.443-1.482.478-.46.142-.478.16-.531.584C5.03 4 3.22 19.633 3.22 19.633l11.78 2.226 5.77-1.411S15.354 2.474 15.337 2.368zm-3.477-.778c-.372.106-.796.266-1.27.408v-.337c0-.637-.089-1.146-.23-1.553.584.053 1.075.69 1.5 1.482zm-1.958-.478c-.142.39-.266.85-.337 1.5-.514.16-1.075.337-1.64.514.16-.973.673-1.93 1.27-2.368.195.106.478.248.707.354zm-.92-1.14c.106 0 .213.035.301.106-.69.531-1.376 1.71-1.606 3.441-.478.142-.938.301-1.376.443.195-1.712 1.34-3.99 2.681-3.99z"/>
            </svg>
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
              Join <span className="text-foreground font-semibold">2,000+</span> Shopify brands optimizing their stores
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}