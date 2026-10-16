import type { PostType, SnapshotPost, SnapshotProfile } from "@/lib/instagram-snapshot/types"

// ---------------------------------------------------------------------------
// Public data for any Instagram Creator or Business account, through Meta's
// Business Discovery API: we ask on behalf of our own Instagram business
// account (META_BD_IG_USER_ID, linked to a Facebook Page) with a Facebook
// Login user token (META_BD_ACCESS_TOKEN) holding instagram_basic,
// instagram_manage_insights and pages_read_engagement, plus ads_read when the
// Page role comes through a business portfolio. Personal accounts aren't
// reachable this way, which is why the tool is for professional accounts only.
//
// The API has no video length, so it's read from each Reel's MP4 header.
//
// Server-only.
// ---------------------------------------------------------------------------

const VERSION = process.env.META_GRAPH_VERSION || "v24.0"

/** How many recent posts to read. Patterns (length, CTA) use all of them; the chart shows 10. */
export const POSTS_TO_READ = 30

export class AccountNotFoundError extends Error {}

/** "@Name", "instagram.com/name/", "https://www.instagram.com/name?igsh=…" → "name"; null if it can't be a handle. */
export function normalizeHandle(input: string): string | null {
  let v = input.trim()
  const fromUrl = /instagram\.com\/([^/?#]+)/i.exec(v)
  if (fromUrl) v = fromUrl[1]
  v = v.replace(/^@/, "").toLowerCase()
  return /^[a-z0-9._]{1,30}$/.test(v) ? v : null
}

interface GraphMedia {
  id: string
  caption?: string
  comments_count?: number
  like_count?: number
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_product_type?: "FEED" | "REELS" | "AD" | "STORY"
  media_url?: string
  permalink?: string
  timestamp?: string
  thumbnail_url?: string
  view_count?: number
}

interface GraphDiscovery {
  business_discovery?: {
    username: string
    name?: string
    biography?: string
    followers_count?: number
    media_count?: number
    profile_picture_url?: string
    media?: { data: GraphMedia[] }
  }
  error?: { message: string; code?: number; error_subcode?: number }
}

function postType(m: GraphMedia): PostType {
  if (m.media_product_type === "REELS" || m.media_type === "VIDEO") return "reel"
  return m.media_type === "CAROUSEL_ALBUM" ? "carousel" : "image"
}

export async function fetchAccount(handle: string): Promise<{ profile: SnapshotProfile; posts: SnapshotPost[] }> {
  const token = process.env.META_BD_ACCESS_TOKEN?.trim()
  const igUserId = process.env.META_BD_IG_USER_ID?.trim()
  if (!token || !igUserId) throw new Error("META_BD_ACCESS_TOKEN and META_BD_IG_USER_ID must be set")

  const media = `media.limit(${POSTS_TO_READ}){id,caption,comments_count,like_count,media_type,media_product_type,media_url,permalink,timestamp,thumbnail_url,view_count}`
  const fields = `business_discovery.username(${handle}){username,name,biography,followers_count,media_count,profile_picture_url,${media}}`
  const url = `https://graph.facebook.com/${VERSION}/${igUserId}?fields=${encodeURIComponent(fields)}&access_token=${encodeURIComponent(token)}`

  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15_000) })
  const body = (await res.json().catch(() => ({}))) as GraphDiscovery
  if (body.error || !body.business_discovery) {
    // 110 / 2207013: no professional account with that username (personal accounts land here too).
    if (body.error?.code === 110 || body.error?.error_subcode === 2207013 || /cannot be found|does not exist/i.test(body.error?.message ?? "")) {
      throw new AccountNotFoundError(handle)
    }
    throw new Error(`Business Discovery ${res.status}: ${body.error?.message ?? "no data"}`)
  }

  const bd = body.business_discovery
  const posts = (bd.media?.data ?? [])
    .filter(m => m.timestamp)
    .map((m): SnapshotPost => {
      const type = postType(m)
      return {
        id: m.id,
        type,
        postedAt: m.timestamp as string,
        likes: typeof m.like_count === "number" ? m.like_count : null,
        comments: typeof m.comments_count === "number" ? m.comments_count : null,
        views: type === "reel" && typeof m.view_count === "number" ? m.view_count : null,
        caption: m.caption ?? null,
        permalink: m.permalink ?? null,
        thumbnailUrl: (type === "reel" ? m.thumbnail_url : m.media_url) ?? null,
        videoUrl: type === "reel" ? m.media_url ?? null : null,
        durationS: null,
      }
    })

  return {
    profile: {
      handle: bd.username,
      name: bd.name ?? null,
      bio: bd.biography ?? null,
      followers: bd.followers_count ?? null,
      mediaCount: bd.media_count ?? null,
      pictureUrl: bd.profile_picture_url ?? null,
    },
    posts,
  }
}

// ---------------------------------------------------------------------------
// Video length from the MP4 header
// ---------------------------------------------------------------------------

/** Reads at most `max` bytes, so a server that ignores Range can't make us download a whole video. */
async function readUpTo(res: Response, max: number): Promise<Uint8Array> {
  const reader = res.body?.getReader()
  if (!reader) return new Uint8Array()
  const chunks: Uint8Array[] = []
  let size = 0
  while (size < max) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    size += value.length
  }
  await reader.cancel().catch(() => {})
  const out = new Uint8Array(Math.min(size, max))
  let offset = 0
  for (const c of chunks) {
    const part = c.subarray(0, out.length - offset)
    out.set(part, offset)
    offset += part.length
    if (offset >= out.length) break
  }
  return out
}

/** Duration in seconds from an MP4 `mvhd` box, or null if the bytes don't contain one. */
export function mvhdDuration(buf: Uint8Array): number | null {
  for (let i = 0; i + 32 < buf.length; i++) {
    if (buf[i] !== 0x6d || buf[i + 1] !== 0x76 || buf[i + 2] !== 0x68 || buf[i + 3] !== 0x64) continue // "mvhd"
    const view = new DataView(buf.buffer, buf.byteOffset + i + 4)
    const version = view.getUint8(0)
    const timescale = version === 1 ? view.getUint32(20) : view.getUint32(12)
    const duration = version === 1 ? view.getUint32(24) * 2 ** 32 + view.getUint32(28) : view.getUint32(16)
    const seconds = timescale > 0 ? duration / timescale : 0
    return seconds > 0 && seconds < 4 * 3600 ? seconds : null
  }
  return null
}

const PROBE_BYTES = 256 * 1024

/** The `moov` box sits at the start of web-optimised MP4s, otherwise at the end: try both. */
export async function videoDuration(url: string): Promise<number | null> {
  for (const range of [`bytes=0-${PROBE_BYTES - 1}`, `bytes=-${PROBE_BYTES}`]) {
    try {
      const res = await fetch(url, { headers: { Range: range }, cache: "no-store", signal: AbortSignal.timeout(6_000) })
      if (!res.ok) return null
      const seconds = mvhdDuration(await readUpTo(res, PROBE_BYTES))
      if (seconds !== null) return seconds
    } catch {
      return null
    }
  }
  return null
}

export async function addDurations(posts: SnapshotPost[]): Promise<SnapshotPost[]> {
  return Promise.all(
    posts.map(async p => (p.videoUrl ? { ...p, durationS: await videoDuration(p.videoUrl) } : p)),
  )
}

// ---------------------------------------------------------------------------
// Images for the PDF (avatar and post covers)
// ---------------------------------------------------------------------------

export type PdfImage = { data: Buffer; format: "jpg" | "png" }

/** JPEG or PNG only (what the PDF renderer can embed); null on anything else or any failure. */
export async function fetchImage(url: string | null): Promise<PdfImage | null> {
  if (!url) return null
  try {
    const res = await fetch(url, { headers: { Accept: "image/jpeg,image/png" }, cache: "no-store", signal: AbortSignal.timeout(5_000) })
    if (!res.ok) return null
    const data = Buffer.from(await readUpTo(res, 3 * 1024 * 1024))
    if (data[0] === 0xff && data[1] === 0xd8) return { data, format: "jpg" }
    if (data[0] === 0x89 && data[1] === 0x50) return { data, format: "png" }
    return null
  } catch {
    return null
  }
}
