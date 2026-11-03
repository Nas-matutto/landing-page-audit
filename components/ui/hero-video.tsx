"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

// A short, silent hero clip that never slows the page down. The first frame
// shows as an optimised still straight away; the video only starts loading
// once the page has, so it never competes with anything the page needs. It
// plays once, from the moment it's on screen (on phones it sits below the
// headline), and holds on its last frame. Clips are 720px silent H.264
// encodes (see public/videos).
//
// Safari only autoplays a video whose `muted` *attribute* is set, and React
// only sets the property, so the clip is muted and started by hand. Every
// iPhone browser (Chrome too) runs on Safari's engine, and two common iPhone
// settings stop autoplay: Low Power Mode refuses it outright, and Reduce
// Motion means we don't try. In both cases a Play button appears on the
// still, and in Low Power Mode the first tap anywhere on the page starts the
// clip too, since a tap is the permission iOS is waiting for.

function attach(video: HTMLVideoElement, src: string) {
  if (video.getAttribute("src")) return
  video.muted = true
  video.defaultMuted = true
  video.setAttribute("muted", "")
  video.setAttribute("playsinline", "")
  video.src = src
}

export function HeroVideo({ src, poster, alt, sizes, className }: { src: string; poster: string; alt: string; sizes: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const tapToPlay = useRef<() => void>(undefined)
  const [playing, setPlaying] = useState(false)
  const [needsTap, setNeedsTap] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    let observer: IntersectionObserver | undefined
    let visible = false
    let started = false
    let played = false
    let listening = false
    let retries = 0
    let retryTimer: number | undefined
    let giveUpTimer: number | undefined

    const stopListening = () => {
      document.removeEventListener("touchend", onPageTap)
      document.removeEventListener("click", onPageTap)
    }
    const listenForTap = () => {
      if (listening) return
      listening = true
      document.addEventListener("touchend", onPageTap)
      document.addEventListener("click", onPageTap)
    }
    const playFromTap = () => {
      attach(video, src)
      video.play().then(
        () => {
          started = played = true
          setNeedsTap(false)
          observer?.disconnect()
          stopListening()
        },
        () => {},
      )
    }
    function onPageTap() {
      if (visible && !played) playFromTap()
    }
    // Autoplay is off: show the button and let any tap start the clip.
    const giveUp = () => {
      if (played) return
      listenForTap()
      setNeedsTap(true)
    }
    tapToPlay.current = playFromTap

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (reduce || saveData) {
      setNeedsTap(true)
      return
    }

    // Play once it's both on screen and has its first frames. Safari can
    // refuse a play() made in the first moments after the page loads (it does
    // on the homepage, where the clip is in view straight away), so a refused
    // play is retried every half second for a few seconds. If it's still
    // refused, autoplay is off (Low Power Mode) and the Play button shows.
    // Low Power Mode can also stop the clip loading at all, so if it's been on
    // screen for a few seconds without playing, the button shows then too.
    const maybePlay = () => {
      if (started || !visible || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return
      started = true
      video.play().then(
        () => {
          played = true
          observer?.disconnect()
        },
        () => {
          started = false
          listenForTap()
          if (retries++ < 8) retryTimer = window.setTimeout(maybePlay, 500)
          else giveUp()
        },
      )
    }
    const start = () => {
      video.addEventListener("loadeddata", maybePlay)
      attach(video, src)
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting
          if (visible && giveUpTimer === undefined) giveUpTimer = window.setTimeout(giveUp, 5000)
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
      window.clearTimeout(giveUpTimer)
      window.removeEventListener("load", start)
      video.removeEventListener("loadeddata", maybePlay)
      stopListening()
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
      {needsTap && !playing && (
        <button
          type="button"
          onClick={() => tapToPlay.current?.()}
          className="absolute bottom-[18%] left-1/2 inline-flex -translate-x-1/2 cursor-pointer items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink shadow-lg ring-1 ring-hairline backdrop-blur transition-colors hover:bg-white"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          Play
        </button>
      )}
    </div>
  )
}
