"use client"

import { useState } from "react"
import { Play, X } from "lucide-react"

export function DemoSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  
  // 👇 ADD YOUR YOUTUBE VIDEO LINK HERE
  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  // Or: https://youtu.be/VIDEO_ID
  const youtubeVideoUrl = "https://www.youtube.com/watch?v=RjzCSxvTA-4"
  
  // Extract video ID from YouTube URL
  const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }
  
  const videoId = getYoutubeVideoId(youtubeVideoUrl)
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : ""
  
  // Get YouTube thumbnail
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "/website-analytics-dashboard.png"

  return (
    <section id="demo-section" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              See{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Talk to me Data
              </span>{" "}
              in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Watch how our AI-powered analysis identifies conversion bottlenecks and provides actionable
              recommendations in seconds.
            </p>
          </div>

          {/* Demo video */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-secondary/50">
            {!isVideoOpen ? (
              // Video thumbnail with play button
              <div 
                className="relative w-full h-full group cursor-pointer"
                onClick={() => setIsVideoOpen(true)}
              >
                {/* Video thumbnail */}
                <img 
                  src={thumbnailUrl} 
                  alt="Demo video thumbnail" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to default image if YouTube thumbnail fails
                    e.currentTarget.src = "/website-analytics-dashboard.png"
                  }}
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            ) : (
              // YouTube iframe embed
              <div className="relative w-full h-full">
                <iframe
                  className="w-full h-full"
                  src={embedUrl}
                  title="Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                
                {/* Close button */}
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-colors z-10"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Key highlights */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { number: "< 60s", label: "Analysis Time" },
              { number: "150+", label: "Data Points" },
              { number: "98%", label: "Accuracy Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
