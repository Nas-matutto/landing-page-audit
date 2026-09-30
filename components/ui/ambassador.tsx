import Image from "next/image"
import { cn } from "@/lib/utils"

// The agent ambassador as transparent cutouts (the same character as the
// hero and the app). Poses are real PNGs with alpha, so he sits on any surface.
// The /agent_ambassador_no_background.jpeg file is a JPEG with a checkerboard
// baked into its pixels, so it can't be used over a coloured background.

export type AmbassadorPose = "wave" | "working" | "thumbs-up"

const POSES: Record<AmbassadorPose, { src: string; width: number; height: number; alt: string }> = {
  wave: { src: "/ambassador-wave.png", width: 496, height: 1000, alt: "The TTMD agent ambassador waving hello" },
  working: { src: "/ambassador-working.png", width: 540, height: 914, alt: "The TTMD agent ambassador working on a laptop" },
  "thumbs-up": { src: "/ambassador-thumbs-up.png", width: 566, height: 912, alt: "The TTMD agent ambassador giving a thumbs up" },
}

interface AmbassadorProps {
  pose: AmbassadorPose
  /** Sets the crop window, e.g. "h-28 w-32". Each pose is drawn full width from the top, so a short window shows head and shoulders. */
  className?: string
  sizes?: string
  priority?: boolean
}

/** Every pose stays mounted and crossfades, so changing pose never flashes or reloads. */
export function Ambassador({ pose, className, sizes = "200px", priority }: AmbassadorProps) {
  return (
    <div className={cn("relative select-none overflow-hidden", className)}>
      {(Object.keys(POSES) as AmbassadorPose[]).map((key) => {
        const p = POSES[key]
        const active = key === pose
        return (
          <Image
            key={key}
            src={p.src}
            alt={active ? p.alt : ""}
            aria-hidden={!active}
            width={p.width}
            height={p.height}
            sizes={sizes}
            priority={priority}
            draggable={false}
            className={cn(
              "absolute inset-x-0 top-0 h-auto w-full max-w-none transition-opacity duration-300",
              active ? "opacity-100" : "opacity-0",
            )}
          />
        )
      })}
    </div>
  )
}
