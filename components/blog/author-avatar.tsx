import Image from "next/image"
import type { Author } from "@/lib/authors"

export function AuthorAvatar({ author, size }: { author: Author; size: number }) {
  if (author.image) {
    return (
      <Image
        src={author.image}
        alt={author.name}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
      />
    )
  }
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {author.name[0]}
    </span>
  )
}
