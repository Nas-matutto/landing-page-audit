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

export function HeroVideo({ src, poster, alt, sizes, className }: { src: string; poster: string; alt: string; sizes: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (reduce || saveData) return

    // Play once it's both on screen and has its first frames. Safari can still
    // refuse a play() made in the first moments after the page loads (it does
    // on the homepage, where the clip is in view straight away), so a refused
    // play is retried every half second for a few seconds, and again whenever the clip
    // comes back into view. In Low Power Mode every try fails and the still stays.
    let observer: IntersectionObserver | undefined
    let visible = false
    let started = false
    let retries = 0
    let retryTimer: number | undefined
    const maybePlay = () => {
      if (started || !visible || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return
      started = true
      video.play().then(
        () => observer?.disconnect(),
        () => {
          started = false
          if (retries++ < 8) retryTimer = window.setTimeout(maybePlay, 500)
        },
      )
    }
    const start = () => {
      video.muted = true
      video.defaultMuted = true
      video.setAttribute("muted", "")
      video.setAttribute("playsinline", "")
      video.addEventListener("loadeddata", maybePlay)
      video.src = src
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting
          maybePlay()
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
      window.clearTimeout(retryTimer)
      window.removeEventListener("load", start)
      video.removeEventListener("loadeddata", maybePlay)
      observer?.disconnect()
    }
  }, [src])

  return (
    <div className={cn("relative aspect-square w-full overflow-hidden rounded-[32px] bg-white", className)}>
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
