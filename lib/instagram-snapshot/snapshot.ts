import { SIGNUP_URL } from "@/lib/links"
import { addDurations, fetchImage } from "@/lib/instagram-snapshot/instagram"
import { writeInsights } from "@/lib/instagram-snapshot/insights"
import { last30Days, type Last30 } from "@/lib/instagram-snapshot/metrics"
import { renderSnapshotPdf } from "@/lib/instagram-snapshot/report"
import { SAMPLE_DATE, SAMPLE_POSTS, SAMPLE_PROFILE, sampleInsights } from "@/lib/instagram-snapshot/sample"
import type { SnapshotInsights, SnapshotPost, SnapshotProfile } from "@/lib/instagram-snapshot/types"

/** The PDF's "Create your free account" button, tagged so signups from the snapshot show up in analytics. */
export const SNAPSHOT_CTA_URL = `${SIGNUP_URL}?utm_source=instagram_snapshot&utm_medium=pdf&utm_campaign=free_tool`

/** Posts in the "last 10 posts" chart. */
const CHART_POSTS = 10

export interface Snapshot {
  pdf: Buffer
  last30: Last30
  insights: SnapshotInsights
}

/** Everything after the account lookup: video lengths, images, numbers, the agent's analysis, the PDF. */
export async function buildSnapshot(profile: SnapshotProfile, fetched: SnapshotPost[]): Promise<Snapshot> {
  const newestFirst = [...fetched].sort((a, b) => b.postedAt.localeCompare(a.postedAt))
  const [posts, avatar, thumbs] = await Promise.all([
    addDurations(newestFirst),
    fetchImage(profile.pictureUrl),
    Promise.all(newestFirst.slice(0, CHART_POSTS).map(p => fetchImage(p.thumbnailUrl))),
  ])
  const last30 = last30Days(posts, profile.followers)
  const insights = await writeInsights(profile, posts, last30)
  const pdf = await renderSnapshotPdf({
    profile,
    avatar,
    posts,
    chart: posts.slice(0, CHART_POSTS).map((post, i) => ({ post, thumb: thumbs[i] })),
    last30,
    insights,
    generatedAt: new Date(),
    ctaUrl: SNAPSHOT_CTA_URL,
  })
  return { pdf, last30, insights }
}

/** The demo account's report, as shown on the landing page. */
export function renderSamplePdf(): Promise<Buffer> {
  return renderSnapshotPdf({
    profile: SAMPLE_PROFILE,
    avatar: null,
    posts: SAMPLE_POSTS,
    chart: SAMPLE_POSTS.slice(0, CHART_POSTS).map(post => ({ post, thumb: null })),
    last30: last30Days(SAMPLE_POSTS, SAMPLE_PROFILE.followers, SAMPLE_DATE),
    insights: sampleInsights(),
    generatedAt: SAMPLE_DATE,
    sample: true,
    ctaUrl: SNAPSHOT_CTA_URL,
  })
}
