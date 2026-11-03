"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// A short, silent hero clip that never slows the page down. The first frame
// shows as an optimised still straight away; the video only starts loading
// once the page has, so it never competes with anything the page needs, and
// it's skipped for reduced motion and Save-Data. It plays once, from the
// moment it's on screen (on phones it sits below the headline), and holds on
// its last frame. Clips are 720px silent H.264 encodes (see public/videos).
//
// Safari only autoplays a video whose `muted` *attribute* is set, and React
// only sets the property, so the clip is muted and started by hand. Where
// Safari still refuses (Low Power Mode), the still simply stays.

export function HeroVideo({ src, poster, alt, sizes }: { src: string; poster: string; alt: string; sizes: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (reduce || saveData) return

    let observer: IntersectionObserver | undefined
    const start = () => {
      video.muted = true
      video.defaultMuted = true
      video.setAttribute("muted", "")
      video.setAttribute("playsinline", "")
      video.src = src
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          observer?.disconnect()
          video.play().catch(() => {})
        },
        { threshold: 0.5 },
      )
      observer.observe(video)
    }

    let timer: number | undefined
    if (document.readyState === "complete") timer = window.setTimeout(start, 150)
    else window.addEventListener("load", start, { once: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("load", start)
      observer?.disconnect()
    }
  }, [src])

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[32px] bg-white">
      <Image src={poster} alt={alt} width={720} height={720} sizes={sizes} priority className="absolute inset-0 h-full w-full object-cover" />
      <video
        ref={ref}
        muted
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-300", playing ? "opacity-100" : "opacity-0")}
      />
    </div>
  )
}
