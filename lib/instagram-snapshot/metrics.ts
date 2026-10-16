import type { PostType, SnapshotPost } from "@/lib/instagram-snapshot/types"

/**
 * The numbers in the Instagram Snapshot PDF. These follow the social media
 * agent's Overview tab (app-TTDM lib/social/metrics.ts and patterns.ts), so a
 * free snapshot and the agent agree on the same account: engagement rate is
 * interactions ÷ followers, videos are bucketed by the same lengths, and calls
 * to action are spotted with the same phrases.
 *
 * Instagram's public API gives likes and comments but not shares or saves, so
 * interactions here are likes + comments. Missing counts (views on photos,
 * hidden likes) are treated as absent, not zero.
 */

export const TYPE_LABEL: Record<PostType, string> = { reel: "Reel", carousel: "Carousel", image: "Photo" }

export function interactions(p: SnapshotPost): number {
  return (p.likes ?? 0) + (p.comments ?? 0)
}

/** Per-post engagement rate as a fraction (0.034 = 3.4%), or null without a follower count. */
export function engagementRate(p: SnapshotPost, followers: number | null): number | null {
  if (!followers || followers <= 0) return null
  return interactions(p) / followers
}

function mean(values: number[]): number | null {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : null
}

export function median(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

export function byDateAsc(posts: SnapshotPost[]): SnapshotPost[] {
  return [...posts].sort((a, b) => a.postedAt.localeCompare(b.postedAt))
}

export interface Kpis {
  posts: number
  avgReelViews: number | null
  engagementRate: number | null
  avgInteractions: number | null
}

function kpis(posts: SnapshotPost[], followers: number | null): Kpis {
  const views = posts.map(p => p.views).filter((v): v is number => typeof v === "number" && v > 0)
  const ers = posts.map(p => engagementRate(p, followers)).filter((v): v is number => v !== null)
  return {
    posts: posts.length,
    avgReelViews: mean(views),
    engagementRate: mean(ers),
    avgInteractions: mean(posts.map(interactions)),
  }
}

export interface Last30 {
  current: Kpis
  /** Relative change vs the 30 days before (0.12 = +12%); null when there's nothing to compare with. */
  delta: Record<keyof Kpis, number | null>
  postsPerWeek: number
}

const DAY_MS = 86_400_000

function rel(before: number | null, after: number | null): number | null {
  return before !== null && after !== null && before > 0 ? (after - before) / before : null
}

/** The last 30 days, compared with the 30 days before (only when that period has posts). */
export function last30Days(posts: SnapshotPost[], followers: number | null, now = new Date()): Last30 {
  const end = now.getTime()
  const start = end - 30 * DAY_MS
  const at = (p: SnapshotPost) => new Date(p.postedAt).getTime()
  const current = posts.filter(p => at(p) > start && at(p) <= end)
  const previous = posts.filter(p => at(p) > start - 30 * DAY_MS && at(p) <= start)
  const a = kpis(previous, followers)
  const b = kpis(current, followers)
  const has = previous.length > 0
  return {
    current: b,
    postsPerWeek: current.length / (30 / 7),
    delta: {
      posts: has ? rel(a.posts, b.posts) : null,
      avgReelViews: has ? rel(a.avgReelViews, b.avgReelViews) : null,
      engagementRate: has ? rel(a.engagementRate, b.engagementRate) : null,
      avgInteractions: has ? rel(a.avgInteractions, b.avgInteractions) : null,
    },
  }
}

// ---------------------------------------------------------------------------
// Groups compared against the account's typical post
// ---------------------------------------------------------------------------

export type PerfMetric = "views" | "interactions"

/** Views are fairer, but photos and carousels have none; mixed sets fall back to interactions. */
export function preferredMetric(posts: SnapshotPost[]): PerfMetric {
  const withViews = posts.filter(p => typeof p.views === "number").length
  return posts.length > 0 && withViews >= posts.length * 0.8 ? "views" : "interactions"
}

function metricValue(p: SnapshotPost, metric: PerfMetric): number | null {
  return metric === "views" ? p.views : interactions(p)
}

export interface PostGroup {
  id: string
  label: string
  count: number
  /** Median of the group's per-post multiples of the account's median (1.0 = typical). */
  multiple: number | null
}

function group(id: string, label: string, posts: SnapshotPost[], all: SnapshotPost[], metric: PerfMetric): PostGroup {
  const med = median(all.map(p => metricValue(p, metric)).filter((v): v is number => typeof v === "number"))
  const multiples = med
    ? posts.map(p => metricValue(p, metric)).filter((v): v is number => typeof v === "number").map(v => v / med)
    : []
  return { id, label, count: posts.length, multiple: median(multiples) }
}

const LENGTHS = [
  { id: "15", label: "Under 15s", max: 15 },
  { id: "30", label: "15 to 30s", max: 30 },
  { id: "60", label: "30 to 60s", max: 60 },
  { id: "90", label: "60 to 90s", max: 90 },
  { id: "long", label: "Over 90s", max: Infinity },
]

/** Reels bucketed by length, each against the typical Reel. Empty buckets stay: a length never tried is worth seeing. */
export function lengthBuckets(posts: SnapshotPost[]): { buckets: PostGroup[]; metric: PerfMetric; videos: number } {
  const videos = posts.filter(p => typeof p.durationS === "number" && p.durationS > 0)
  const metric = preferredMetric(videos)
  let lower = 0
  const buckets = LENGTHS.map(b => {
    const inBucket = videos.filter(p => (p.durationS as number) > lower && (p.durationS as number) <= b.max)
    lower = b.max
    return group(b.id, b.label, inBucket, videos, metric)
  })
  return { buckets, metric, videos: videos.length }
}

/**
 * Phrases that ask the viewer to do something (same list as the agent).
 * Questions aren't counted: nearly every caption has one.
 */
const CTA_PATTERNS = [
  /\bcomment\b/i,
  /\bfollow (me|for|along)\b/i,
  /\bsave (this|it|for)\b/i,
  /\bshare (this|it|with)\b/i,
  /\blink in (my )?bio\b/i,
  /\b(dm|message) me\b/i,
  /\bsend (this|it) to\b/i,
  /\btag (a|someone|your|a friend)\b/i,
  /\bsubscribe\b/i,
  /\b(click|tap) (the )?link\b/i,
  /\bsign up\b/i,
  /\bdownload\b/i,
  /\bjoin (my|the|our)\b/i,
  /\blet me know\b/i,
  /\bdrop (a|your)\b/i,
]

export function hasCallToAction(caption: string | null): boolean {
  return !!caption && CTA_PATTERNS.some(re => re.test(caption))
}

export function ctaGroups(posts: SnapshotPost[]): { groups: [PostGroup, PostGroup]; metric: PerfMetric } {
  const metric = preferredMetric(posts)
  return {
    metric,
    groups: [
      group("cta", "With a call to action", posts.filter(p => hasCallToAction(p.caption)), posts, metric),
      group("none", "No call to action", posts.filter(p => !hasCallToAction(p.caption)), posts, metric),
    ],
  }
}

export interface FormatStat {
  type: PostType
  count: number
  engagementRate: number | null
  avgViews: number | null
}

export function formatBreakdown(posts: SnapshotPost[], followers: number | null): FormatStat[] {
  return (["reel", "carousel", "image"] as const)
    .map(type => {
      const k = kpis(posts.filter(p => p.type === type), followers)
      return { type, count: k.posts, engagementRate: k.engagementRate, avgViews: k.avgReelViews }
    })
    .filter(f => f.count > 0)
    .sort((a, b) => (b.engagementRate ?? 0) - (a.engagementRate ?? 0))
}

// ---------------------------------------------------------------------------
// Formatting, shared by the PDF, the email and the model prompt
// ---------------------------------------------------------------------------

export function compactNumber(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "n/a"
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")}M`
  if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, "")}K`
  return Math.round(n).toLocaleString("en-US")
}

export function percent(fraction: number | null | undefined, digits = 1): string {
  if (fraction === null || fraction === undefined || Number.isNaN(fraction)) return "n/a"
  return `${(fraction * 100).toFixed(digits)}%`
}

export function signedPercent(fraction: number): string {
  const v = Math.round(fraction * 100)
  return `${v > 0 ? "+" : ""}${v}%`
}

export function multiple(m: number | null): string {
  return m === null ? "n/a" : `${m.toFixed(1)}×`
}
