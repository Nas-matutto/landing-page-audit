"use client"

import Image from "next/image"
import { useState } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

const PLAYER_ORIGIN = "https://www.youtube-nocookie.com"
let warmed = false

/** Opens connections to YouTube when the visitor shows intent, so the player starts faster on click. */
function warmConnections() {
  if (warmed) return
  warmed = true
  for (const href of [PLAYER_ORIGIN, "https://www.google.com", "https://i.ytimg.com"]) {
    const link = document.createElement("link")
    link.rel = "preconnect"
    link.href = href
    document.head.append(link)
  }
}

/**
 * A YouTube video that costs nothing until it's played. It renders a local,
 * optimized thumbnail and a play button; YouTube's player (around 1 MB of
 * scripts) only loads after a click or tap.
 */
export function YouTubeEmbed({
  youtubeId,
  title,
  thumbnail,
  className,
}: {
  youtubeId: string
  title: string
  /** A local 16:9 image in /public, so next/image can serve it as AVIF/WebP at the right size. */
  thumbnail: string
  className?: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden rounded-3xl border border-hairline bg-ink", className)}>
      {playing ? (
        <iframe
          src={`${PLAYER_ORIGIN}/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          onPointerEnter={warmConnections}
          onFocus={warmConnections}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-ink shadow-xl shadow-black/25 transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
              <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
