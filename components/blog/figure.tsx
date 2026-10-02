import Image from "next/image"

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
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  priority?: boolean
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-2xl border border-slate-200">
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
      {caption && <figcaption className="mt-3 text-center text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  )
}
