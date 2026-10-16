import { TYPE_LABEL, ctaGroups, formatBreakdown, lengthBuckets, multiple, percent } from "@/lib/instagram-snapshot/metrics"
import type { PostType, SnapshotInsights, SnapshotPost, SnapshotProfile } from "@/lib/instagram-snapshot/types"

// ---------------------------------------------------------------------------
// "Studio Nova": the demo account behind the sample report on the landing
// page (the same sample account as the agent screenshots). Fixed numbers and a
// fixed date, so the preview image only changes when the template does.
// Regenerate the preview with scripts/instagram-snapshot-sample.tsx.
// ---------------------------------------------------------------------------

export const SAMPLE_DATE = new Date("2026-10-14T12:00:00Z")

export const SAMPLE_PROFILE: SnapshotProfile = {
  handle: "studionova.interiors",
  name: "Studio Nova",
  bio: "Small-space interior design. Before and afters, styling tips and budget finds. Book a consult via the link.",
  followers: 12480,
  mediaCount: 214,
  pictureUrl: null,
}

const CAPTIONS = [
  "Before and after: a 9m² studio flat that now fits a desk, a sofa and a reading nook. Save this for your next refresh.",
  "The three paint colours we keep coming back to for north-facing rooms.",
  "One rug, three looks. Which one would you pick? Comment A, B or C.",
  "Morning light in the Hackney project.",
  "Stop buying matching furniture sets. Here's what to do instead.",
  "Our client's hallway went from dumping ground to the best room in the house. Share this with someone who needs it.",
  "Small kitchen, big storage: 5 tricks that cost under £50.",
  "Details from this week's install.",
  "How we plan a room in 20 minutes, start to finish. Follow for more of the process.",
  "Shelf styling rules we actually use.",
  "Rented flat? These changes come off when you move out. Link in bio for the full list.",
  "A quiet corner for the weekend.",
]

const TYPES: PostType[] = ["reel", "carousel", "reel", "image", "reel", "carousel", "reel", "reel", "image", "carousel"]
const LENGTHS = [22, 48, 12, 75, 26, 40, 95, 35, 52, 20, 65, 14]
const NOISE = [1.12, 0.84, 1.3, 0.92, 1.05, 0.71, 1.21, 0.95, 1.4, 0.88, 1.02, 0.79, 1.16, 0.9]

function reelFactor(seconds: number): number {
  if (seconds <= 15) return 1.15
  if (seconds <= 30) return 1.9
  if (seconds <= 60) return 0.95
  if (seconds <= 90) return 0.6
  return 0.45
}

/** 30 posts over about 75 days, newest first. */
export const SAMPLE_POSTS: SnapshotPost[] = Array.from({ length: 30 }, (_, i) => {
  const type = TYPES[i % TYPES.length]
  const caption = CAPTIONS[(i * 5) % CAPTIONS.length]
  const noise = NOISE[i % NOISE.length]
  const cta = /save this|comment|share this|follow for|link in bio/i.test(caption) ? 1.35 : 1
  const durationS = type === "reel" ? LENGTHS[i % LENGTHS.length] : null
  const views = durationS ? Math.round(3100 * reelFactor(durationS) * noise * cta) : null
  const likes = Math.round((views ? views * 0.075 : type === "carousel" ? 410 : 190) * (views ? 1 : noise * cta))
  const daysAgo = 1 + i * 2.5 + (i % 3) * 0.4
  return {
    id: `sample-${i}`,
    type,
    postedAt: new Date(SAMPLE_DATE.getTime() - daysAgo * 86_400_000).toISOString(),
    likes,
    comments: Math.round(likes * (cta > 1 ? 0.07 : 0.035)),
    views,
    caption,
    permalink: null,
    thumbnailUrl: null,
    videoUrl: null,
    durationS,
  }
})

/** Written from the sample's own numbers, the way the agent would. */
export function sampleInsights(): SnapshotInsights {
  const lengths = lengthBuckets(SAMPLE_POSTS).buckets
  const sweet = lengths.find(b => b.id === "30")
  const long = lengths.find(b => b.id === "90")
  const [cta, none] = ctaGroups(SAMPLE_POSTS).groups
  const formats = formatBreakdown(SAMPLE_POSTS, SAMPLE_PROFILE.followers)
  const image = formats.find(f => f.type === "image")
  const best = formats[0]
  return {
    headline: `Short Reels are carrying the account: ${sweet?.count} Reels between 15 and 30 seconds did ${multiple(sweet?.multiple ?? null)} your typical Reel.`,
    do: {
      title: "Film two more 20 second before and afters this week, opening on the finished room.",
      why: `Reels of 15 to 30 seconds did ${multiple(sweet?.multiple ?? null)} your typical Reel, and before and afters are your most watched posts.`,
    },
    fix: {
      title: "Cut Reels over 60 seconds down to one idea each, or turn them into carousels.",
      why: `Your Reels of 60 to 90 seconds sat at ${multiple(long?.multiple ?? null)}, and ${image ? `single photos averaged ${percent(image.engagementRate)} engagement against ${percent(best.engagementRate)} for ${TYPE_LABEL[best.type]}s` : "they hold viewers for less time"}.`,
    },
    try: {
      title: "End your next five captions with one ask: save this or comment your pick.",
      why: `Posts with a call to action did ${multiple(cta.multiple)} your typical post, against ${multiple(none.multiple)} without one.`,
    },
  }
}
