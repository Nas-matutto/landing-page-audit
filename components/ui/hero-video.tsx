"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// A short, silent hero clip that never slows the page down. The first frame
// shows as an optimised still straight away; the video only starts loading
// once the page has, so it never competes with anything the page needs, and
// it's skipped for reduced motion and Save-Data. It plays once and holds on
// its last frame. Clips are 720px silent H.264 encodes (see public/videos).

export function HeroVideo({ src, poster, alt, sizes }: { src: string; poster: string; alt: string; sizes: string }) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (reduce || saveData) return

    const start = () => setVideoSrc(src)
    if (document.readyState === "complete") {
      const id = window.setTimeout(start, 150)
      return () => window.clearTimeout(id)
    }
    window.addEventListener("load", start, { once: true })
    return () => window.removeEventListener("load", start)
  }, [src])

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[32px] bg-white">
      <Image src={poster} alt={alt} width={720} height={720} sizes={sizes} priority className="absolute inset-0 h-full w-full object-cover" />
      {videoSrc && (
        <video
          src={videoSrc}
          muted
          autoPlay
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-300", playing ? "opacity-100" : "opacity-0")}
        />
      )}
    </div>
  )
}
