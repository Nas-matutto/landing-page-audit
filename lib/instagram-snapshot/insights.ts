import Anthropic from "@anthropic-ai/sdk"
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod"
import * as z from "zod/v4"
import {
  TYPE_LABEL,
  compactNumber,
  ctaGroups,
  engagementRate,
  formatBreakdown,
  lengthBuckets,
  multiple,
  percent,
  signedPercent,
  type Last30,
} from "@/lib/instagram-snapshot/metrics"
import type { SnapshotInsights, SnapshotPost, SnapshotProfile } from "@/lib/instagram-snapshot/types"

// ---------------------------------------------------------------------------
// "Your Agent's analysis" in the snapshot: a one-line verdict plus Do this,
// Fix this and Try this. Same brief as the agent's Overview card, cut down to
// fit one PDF page. The model only writes words; every number it may quote is
// computed in metrics.ts and handed to it.
//
// Server-only: reads ANTHROPIC_API_KEY.
// ---------------------------------------------------------------------------

const MODEL = "claude-sonnet-5-5"

const InsightSchema = z.object({ title: z.string(), why: z.string() })
const InsightsSchema = z.object({ headline: z.string(), do: InsightSchema, fix: InsightSchema, try: InsightSchema })

const SYSTEM = `You are a social media agent writing the analysis section of a one-page Instagram snapshot for a creator or business. You get their profile, their numbers and a table of their latest posts. Tell them what to do, not what you observed.

Write:
- headline: the verdict on the account right now in one sentence (max 25 words), including the most important number.
- do: the thing that's working that they should do more of.
- fix: the biggest thing underperforming against their own average.
- try: one concrete experiment for the next two weeks.
Each of do, fix and try has:
- title: a specific instruction starting with a verb, one sentence (max 16 words). Precise enough to act on today, e.g. "Film two more talking-head Reels that open with the result, like your 12 Sep pricing post".
- why: the evidence in one or two sentences (max 30 words), citing numbers from the data, e.g. "Your 3 talking-head Reels averaged 2.1× your typical views, while carousels sat at 0.6×."

Rules:
- Every claim must come from the numbers given. Compare with the account's own averages, not industry benchmarks.
- With fewer than 15 posts, say "so far" rather than presenting patterns as settled.
- Refer to posts by their date or a few words of caption, never by row number.
- Plain words. No hedging, no filler, no hashtags, no emoji, no markdown. Never use dashes as punctuation; use commas, colons or full stops.`

function postTable(posts: SnapshotPost[], followers: number | null): string {
  const rows = posts.map(p =>
    [
      p.postedAt.slice(0, 10),
      TYPE_LABEL[p.type],
      p.views ?? "n/a",
      p.likes ?? "hidden",
      p.comments ?? "n/a",
      percent(engagementRate(p, followers)),
      p.durationS ? `${Math.round(p.durationS)}s` : "n/a",
      (p.caption ?? "").replace(/\s+/g, " ").slice(0, 100),
    ].join(" | "),
  )
  return ["date | format | views | likes | comments | engagement rate | length | caption", ...rows].join("\n")
}

function buildPrompt(profile: SnapshotProfile, posts: SnapshotPost[], last30: Last30): string {
  const k = last30.current
  const d = last30.delta
  const vs = (v: number | null) => (v === null ? "" : ` (${signedPercent(v)} vs the 30 days before)`)
  const formats = formatBreakdown(posts, profile.followers)
    .map(f => `${TYPE_LABEL[f.type]}s: ${f.count} posts, ${percent(f.engagementRate)} engagement${f.avgViews ? `, avg ${compactNumber(f.avgViews)} views` : ""}`)
    .join("; ")
  const lengths = lengthBuckets(posts)
  const cta = ctaGroups(posts)
  const by = (metric: string) => (metric === "views" ? "views" : "interactions")

  return [
    `Account: @${profile.handle}${profile.name ? ` (${profile.name})` : ""}, ${compactNumber(profile.followers)} followers`,
    `Bio: ${(profile.bio ?? "").replace(/\s+/g, " ").slice(0, 300)}`,
    `Last 30 days: ${k.posts} posts${vs(d.posts)}, avg Reel views ${compactNumber(k.avgReelViews)}${vs(d.avgReelViews)}, engagement rate ${percent(k.engagementRate)}${vs(d.engagementRate)}, ${compactNumber(k.avgInteractions)} interactions per post${vs(d.avgInteractions)}.`,
    `By format (all ${posts.length} posts): ${formats}`,
    lengths.videos >= 3
      ? `Reel length vs their typical Reel, by ${by(lengths.metric)}: ${lengths.buckets.filter(b => b.count > 0).map(b => `${b.label}: ${multiple(b.multiple)} (${b.count} Reels)`).join("; ")}`
      : "Reel length: not enough Reels to compare.",
    `Captions vs their typical post, by ${by(cta.metric)}: ${cta.groups.map(g => `${g.label}: ${multiple(g.multiple)} (${g.count} posts)`).join("; ")}`,
    "Interactions are likes plus comments. Instagram only makes views public for Reels.",
    "",
    postTable(posts, profile.followers),
  ].join("\n")
}

export async function writeInsights(profile: SnapshotProfile, posts: SnapshotPost[], last30: Last30): Promise<SnapshotInsights> {
  try {
    const client = new Anthropic({ timeout: 40_000, maxRetries: 1 })
    const response = await client.beta.messages.parse({
      model: MODEL,
      max_tokens: 8000,
      // Refusals are unlikely here, but if one happens the API reruns it on its default fallback model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium", format: betaZodOutputFormat(InsightsSchema) },
      system: SYSTEM,
      messages: [{ role: "user", content: buildPrompt(profile, posts, last30) }],
    })
    if (response.stop_reason === "refusal" || !response.parsed_output) {
      console.error("[instagram-snapshot] insights: no parsed output", response.stop_reason)
      return fallbackInsights(profile, posts, last30)
    }
    return response.parsed_output
  } catch (err) {
    if (err instanceof Anthropic.APIError) console.error(`[instagram-snapshot] insights API ${err.status}:`, err.message)
    else console.error("[instagram-snapshot] insights failed:", err)
    return fallbackInsights(profile, posts, last30)
  }
}

/** Rule-based insights so the snapshot still goes out if the model call fails. */
export function fallbackInsights(profile: SnapshotProfile, posts: SnapshotPost[], last30: Last30): SnapshotInsights {
  const formats = formatBreakdown(posts, profile.followers)
  const best = formats[0]
  const worst = formats.length > 1 ? formats[formats.length - 1] : null
  const lengths = lengthBuckets(posts).buckets.filter(b => b.count >= 2 && b.multiple !== null)
  const bestLength = lengths.sort((a, b) => (b.multiple ?? 0) - (a.multiple ?? 0))[0]
  const [withCta, withoutCta] = ctaGroups(posts).groups
  const ctaHelps = withCta.count >= 2 && (withCta.multiple ?? 0) > (withoutCta.multiple ?? 0)

  return {
    headline: `@${profile.handle} posted ${last30.current.posts} times in the last 30 days at ${percent(last30.current.engagementRate)} engagement.`,
    do: best
      ? { title: `Post more ${TYPE_LABEL[best.type]}s, your strongest format so far.`, why: `Your ${best.count} ${TYPE_LABEL[best.type]}s averaged ${percent(best.engagementRate)} engagement, the best of any format.` }
      : { title: "Keep posting consistently.", why: "Consistency is the lever you control most." },
    fix:
      last30.postsPerWeek < 2
        ? { title: "Post at least twice a week for the next month.", why: `You averaged ${last30.postsPerWeek.toFixed(1)} posts a week over the last 30 days.` }
        : worst
          ? { title: `Rethink your ${TYPE_LABEL[worst.type]}s or post fewer of them.`, why: `They averaged ${percent(worst.engagementRate)} engagement against ${percent(best.engagementRate)} for ${TYPE_LABEL[best.type]}s.` }
          : { title: "Vary your formats to find what lands.", why: "All your recent posts use the same format, so there's nothing to compare yet." },
    try: bestLength
      ? { title: `Make your next three Reels ${bestLength.label.toLowerCase()}.`, why: `Reels of that length did ${multiple(bestLength.multiple)} your typical Reel.` }
      : ctaHelps
        ? { title: "End every caption with one clear call to action.", why: `Posts with one did ${multiple(withCta.multiple)} your typical post.` }
        : { title: "Ask for one action in your next three captions.", why: "Try a single ask, like save this or comment below, and compare the results." },
  }
}
