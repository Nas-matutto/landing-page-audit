// Shapes for the free Instagram Snapshot tool (/free-tools/social-media-analyzer).

export type PostType = "reel" | "carousel" | "image"

export interface SnapshotPost {
  id: string
  type: PostType
  postedAt: string
  /** Null when the owner hides like counts. */
  likes: number | null
  comments: number | null
  /** Instagram only makes views public for Reels. */
  views: number | null
  caption: string | null
  permalink: string | null
  /** Cover image for Reels, the image itself otherwise. */
  thumbnailUrl: string | null
  /** The video file, used to read its length. Reels only. */
  videoUrl: string | null
  durationS: number | null
}

export interface SnapshotProfile {
  handle: string
  name: string | null
  bio: string | null
  followers: number | null
  mediaCount: number | null
  pictureUrl: string | null
}

export type InsightKind = "do" | "fix" | "try"

export interface Insight {
  title: string
  why: string
}

export interface SnapshotInsights {
  headline: string
  do: Insight
  fix: Insight
  try: Insight
}
