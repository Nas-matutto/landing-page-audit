import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * An in-article image with a visible caption. Captions are read by search
 * engines and answer engines alongside alt text, so describe what the image
 * shows and why it matters, not just its title.
 */
export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 630,
  priority = false,
  className,
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  priority?: boolean
  /** Constrains the figure, e.g. "mx-auto max-w-sm" for a tall screenshot. */
  className?: string
}) {
  return (
    <figure className={cn("my-8", className)}>
      <div className="overflow-hidden rounded-3xl border border-hairline bg-mist">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 768px, 100vw"
          className="h-auto w-full"
          priority={priority}
        />
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm text-quiet">{caption}</figcaption>}
    </figure>
  )
}
