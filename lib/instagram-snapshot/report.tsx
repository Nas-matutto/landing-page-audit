import path from "path"
import { Document, Font, Image, Link, Page, Path, Polyline, StyleSheet, Svg, Text, View, renderToBuffer } from "@react-pdf/renderer"
import type { PdfImage } from "@/lib/instagram-snapshot/instagram"
import {
  TYPE_LABEL,
  byDateAsc,
  compactNumber,
  ctaGroups,
  engagementRate,
  interactions,
  lengthBuckets,
  median,
  multiple,
  percent,
  signedPercent,
  type Last30,
  type PostGroup,
} from "@/lib/instagram-snapshot/metrics"
import type { InsightKind, PostType, SnapshotInsights, SnapshotPost, SnapshotProfile } from "@/lib/instagram-snapshot/types"

// ---------------------------------------------------------------------------
// The one-page Instagram Snapshot PDF. A fixed template: every report has the
// same sections in the same places, filled from ReportData.
//
// Styled after the social media agent's Overview tab (app-TTDM): zinc cards,
// Inter for text and Bricolage Grotesque for headline numbers, Instagram's
// format colours on charts, and the Keep/Fix/Try tones for Do/Fix/Try.
//
// Server-only (reads font files from disk).
// ---------------------------------------------------------------------------

// Literal paths so Vercel's file tracing bundles them with the route.
const ASSETS = {
  inter400: path.join(process.cwd(), "lib/instagram-snapshot/assets/inter-400.woff"),
  inter500: path.join(process.cwd(), "lib/instagram-snapshot/assets/inter-500.woff"),
  inter600: path.join(process.cwd(), "lib/instagram-snapshot/assets/inter-600.woff"),
  inter700: path.join(process.cwd(), "lib/instagram-snapshot/assets/inter-700.woff"),
  bricolage700: path.join(process.cwd(), "lib/instagram-snapshot/assets/bricolage-700.woff"),
  ambassador: path.join(process.cwd(), "lib/instagram-snapshot/assets/ambassador-working.png"),
}

Font.register({
  family: "Inter",
  fonts: [
    { src: ASSETS.inter400, fontWeight: 400 },
    { src: ASSETS.inter500, fontWeight: 500 },
    { src: ASSETS.inter600, fontWeight: 600 },
    { src: ASSETS.inter700, fontWeight: 700 },
  ],
})
Font.register({ family: "Bricolage", src: ASSETS.bricolage700, fontWeight: 700 })
Font.registerHyphenationCallback(word => [word])

const C = {
  ink: "#141414",
  z900: "#18181B",
  z700: "#3F3F46",
  z500: "#71717A",
  z400: "#A1A1AA",
  z200: "#E4E4E7",
  z100: "#F4F4F5",
  z50: "#FAFAFA",
  emerald: "#047857",
  emeraldBg: "#ECFDF5",
  rose: "#BE123C",
  roseBg: "#FFF1F2",
}

/** Instagram's format colours, as in the agent's charts. */
const FORMAT: Record<PostType, string> = { reel: "#DD2A7B", carousel: "#8134AF", image: "#D9661A" }

const s = StyleSheet.create({
  page: { paddingHorizontal: 26, paddingTop: 18, paddingBottom: 12, fontFamily: "Inter", fontSize: 8, color: C.z900, backgroundColor: "#FFFFFF" },
  row: { flexDirection: "row" },
  card: { borderWidth: 1, borderColor: C.z200, borderRadius: 10, padding: 10 },
  h2: { fontSize: 9, fontWeight: 600, color: C.z900 },
  sub: { fontSize: 7, color: C.z500, marginTop: 2 },
  eyebrow: { fontSize: 6.5, fontWeight: 600, letterSpacing: 1, color: C.z500, textTransform: "uppercase" },
  num: { fontFamily: "Bricolage", fontWeight: 700 },
})

/** The bundled fonts cover Latin-1 and common punctuation; drop anything else (emoji, other scripts) rather than print boxes. */
function clean(text: string | null | undefined): string {
  return (text ?? "").replace(/[^ -~ -ÿ‐-‧‰-⁞€™↑↓−]/g, "").replace(/\s+/g, " ").trim()
}

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
}

export interface ChartPost {
  post: SnapshotPost
  thumb: PdfImage | null
}

export interface ReportData {
  profile: SnapshotProfile
  avatar: PdfImage | null
  /** Every post read (up to 30): patterns are computed from these. */
  posts: SnapshotPost[]
  /** The latest 10 posts with their covers, oldest first. */
  chart: ChartPost[]
  last30: Last30
  insights: SnapshotInsights
  generatedAt: Date
  /** Marks the demo account used for the preview on the landing page. */
  sample?: boolean
  ctaUrl: string
}

// ---------------------------------------------------------------------------
// Header + KPI tiles
// ---------------------------------------------------------------------------

function Header({ profile, avatar, generatedAt }: Pick<ReportData, "profile" | "avatar" | "generatedAt">) {
  const name = clean(profile.name) || `@${profile.handle}`
  return (
    <View>
      <View style={[s.row, { justifyContent: "space-between", alignItems: "center", paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: C.z200 }]}>
        <Text style={[s.num, { fontSize: 10, color: C.ink }]}>Talk to me Data</Text>
        <Text style={s.eyebrow}>
          Instagram Snapshot · {generatedAt.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
        </Text>
      </View>
      <View style={[s.row, { alignItems: "center", marginTop: 9 }]}>
        <View style={{ width: 38, height: 38, borderRadius: 19, borderWidth: 1.5, borderColor: FORMAT.reel, padding: 2 }}>
          {avatar ? (
            <Image src={avatar} style={{ width: 31, height: 31, borderRadius: 15.5, objectFit: "cover" }} />
          ) : (
            <View style={{ width: 31, height: 31, borderRadius: 15.5, backgroundColor: C.z100, alignItems: "center", justifyContent: "center" }}>
              <Text style={[s.num, { fontSize: 13, color: C.z500 }]}>{profile.handle.charAt(0).toUpperCase()}</Text>
            </View>
          )}
        </View>
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={[s.num, { fontSize: 16, color: C.z900 }]}>{name}</Text>
          <Text style={{ fontSize: 8, color: C.z500, marginTop: 2 }}>
            @{profile.handle} · {compactNumber(profile.followers)} followers · {compactNumber(profile.mediaCount)} posts
          </Text>
        </View>
      </View>
    </View>
  )
}

function Tile({ label, value, delta, note }: { label: string; value: string; delta: number | null; note: string }) {
  const dir = delta === null || Math.abs(delta) < 0.005 ? 0 : delta > 0 ? 1 : -1
  return (
    <View style={[s.card, { flex: 1, paddingVertical: 7 }]}>
      <Text style={{ fontSize: 7, fontWeight: 500, color: C.z500 }}>{label}</Text>
      <Text style={[s.num, { fontSize: 17, marginTop: 3, color: C.z900 }]}>{value}</Text>
      <Text style={{ fontSize: 6.5, marginTop: 3, color: C.z400 }}>
        {delta !== null && (
          <Text style={{ fontWeight: 600, color: dir > 0 ? C.emerald : dir < 0 ? C.rose : C.z500 }}>
            {dir === 0 ? "Flat" : `${dir > 0 ? "↑" : "↓"} ${signedPercent(Math.abs(delta)).replace("+", "")}`}{" "}
          </Text>
        )}
        {note}
      </Text>
    </View>
  )
}

function KpiRow({ last30 }: { last30: Last30 }) {
  const { current: k, delta: d } = last30
  const vs = (v: number | null, fallback: string) => (v === null ? fallback : "vs previous 30 days")
  return (
    <View style={{ marginTop: 9 }}>
      <Text style={[s.eyebrow, { marginBottom: 4 }]}>Your last 30 days</Text>
      <View style={[s.row, { gap: 6 }]}>
        <Tile label="Posts published" value={String(k.posts)} delta={d.posts} note={vs(d.posts, `${last30.postsPerWeek.toFixed(1)} a week`)} />
        <Tile label="Average Reel views" value={compactNumber(k.avgReelViews)} delta={d.avgReelViews} note={vs(d.avgReelViews, k.avgReelViews === null ? "No Reels this month" : "Reels only")} />
        <Tile label="Engagement rate" value={percent(k.engagementRate)} delta={d.engagementRate} note={vs(d.engagementRate, "Likes + comments ÷ followers")} />
        <Tile label="Interactions per post" value={compactNumber(k.avgInteractions)} delta={d.avgInteractions} note={vs(d.avgInteractions, "Likes + comments")} />
      </View>
    </View>
  )
}

// ---------------------------------------------------------------------------
// Last 10 posts: two bar rows sharing one x-axis, then covers and dates
// ---------------------------------------------------------------------------

const BAR_H = 38

function BarRow({ label, values, chart, fmt }: { label: string; values: (number | null)[]; chart: ChartPost[]; fmt: (v: number | null) => string }) {
  const present = values.filter((v): v is number => v !== null)
  const max = Math.max(...present, 0) || 1
  const med = median(present)
  const top = 12 // room for the value labels above the tallest bar
  return (
    <View style={{ marginTop: 5 }}>
      <Text style={{ fontSize: 6.5, fontWeight: 600, color: C.z500 }}>
        {label}
        {med !== null && <Text style={{ fontWeight: 400, color: C.z400 }}>{`  ·  median ${fmt(med)} (dashed line)`}</Text>}
      </Text>
      <View style={{ position: "relative", height: BAR_H + top, marginTop: 2 }}>
        {med !== null && (
          <View style={{ position: "absolute", left: 0, right: 0, top: top + BAR_H - (med / max) * BAR_H, borderTopWidth: 0.75, borderTopColor: C.z400, borderStyle: "dashed" }} />
        )}
        <View style={[s.row, { position: "absolute", left: 0, right: 0, bottom: 0, height: BAR_H + top, alignItems: "flex-end", gap: 5 }]}>
          {chart.map(({ post }, i) => {
            const v = values[i]
            const h = v === null ? 2 : Math.max((v / max) * BAR_H, 2)
            return (
              <View key={post.id} style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ fontSize: 5.5, color: v === null ? C.z400 : C.z700, marginBottom: 1.5 }}>{v === null ? "n/a" : fmt(v)}</Text>
                <View style={{ width: "100%", height: h, backgroundColor: v === null ? C.z200 : FORMAT[post.type], borderTopLeftRadius: 2.5, borderTopRightRadius: 2.5 }} />
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

function Legend({ types }: { types: PostType[] }) {
  return (
    <View style={[s.row, { gap: 8 }]}>
      {types.map(t => (
        <View key={t} style={[s.row, { alignItems: "center" }]}>
          <View style={{ width: 6, height: 6, borderRadius: 1.5, backgroundColor: FORMAT[t], marginRight: 3 }} />
          <Text style={{ fontSize: 6.5, color: C.z700 }}>{TYPE_LABEL[t]}s</Text>
        </View>
      ))}
    </View>
  )
}

function LastPosts({ chart, followers }: { chart: ChartPost[]; followers: number | null }) {
  const posts = chart.map(c => c.post)
  const hasViews = posts.some(p => p.views !== null)
  const types = (["reel", "carousel", "image"] as const).filter(t => posts.some(p => p.type === t))
  return (
    <View style={[s.card, { marginTop: 8 }]}>
      <View style={[s.row, { justifyContent: "space-between", alignItems: "flex-start" }]}>
        <View>
          <Text style={s.h2}>Your last {chart.length} posts, measured</Text>
          <Text style={s.sub}>Oldest to newest.{hasViews ? " Instagram only shares views for Reels." : ""} Each cover links to its post.</Text>
        </View>
        <Legend types={types} />
      </View>
      {hasViews ? (
        <BarRow label="Views" values={posts.map(p => p.views)} chart={chart} fmt={compactNumber} />
      ) : (
        <BarRow label="Interactions (likes + comments)" values={posts.map(interactions)} chart={chart} fmt={compactNumber} />
      )}
      {followers ? (
        <BarRow label="Engagement rate" values={posts.map(p => engagementRate(p, followers))} chart={chart} fmt={v => percent(v)} />
      ) : (
        hasViews && <BarRow label="Interactions (likes + comments)" values={posts.map(interactions)} chart={chart} fmt={compactNumber} />
      )}
      <View style={[s.row, { gap: 5, marginTop: 4 }]}>
        {chart.map(({ post, thumb }) => (
          <View key={post.id} style={{ flex: 1, alignItems: "center" }}>
            {post.permalink ? (
              <Link src={post.permalink} style={{ width: "100%" }}>
                <Cover type={post.type} thumb={thumb} />
              </Link>
            ) : (
              <Cover type={post.type} thumb={thumb} />
            )}
            <Text style={{ fontSize: 5.5, color: C.z400, marginTop: 2 }}>{shortDate(post.postedAt)}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

function Cover({ type, thumb }: { type: PostType; thumb: PdfImage | null }) {
  const box = { width: "100%" as const, height: 32, borderRadius: 4 }
  if (thumb) return <Image src={thumb} style={[box, { objectFit: "cover" }]} />
  return (
    <View style={[box, { backgroundColor: FORMAT[type], opacity: 0.18, alignItems: "center", justifyContent: "center" }]}>
      <Text style={{ fontSize: 6, fontWeight: 600, color: C.z900 }}>{TYPE_LABEL[type]}</Text>
    </View>
  )
}

// ---------------------------------------------------------------------------
// Patterns: video length and calls to action, each against the typical post
// ---------------------------------------------------------------------------

function GroupBars({ groups, unit }: { groups: PostGroup[]; unit: string }) {
  const max = Math.max(1.5, ...groups.map(g => g.multiple ?? 0))
  return (
    <View style={{ marginTop: 6, gap: 3 }}>
      {groups.map(g => (
        <View key={g.id} style={[s.row, { alignItems: "center" }]}>
          <Text style={{ width: 74, fontSize: 6.5, color: C.z700 }}>{g.label}</Text>
          <View style={{ flex: 1, height: 9, backgroundColor: C.z50, borderRadius: 2, position: "relative" }}>
            {g.multiple !== null && (
              <View style={{ width: `${(g.multiple / max) * 100}%`, height: 9, borderRadius: 2, backgroundColor: g.multiple >= 1 ? FORMAT.reel : C.z400 }} />
            )}
            {/* 1.0× = the account's typical post */}
            <View style={{ position: "absolute", left: `${(1 / max) * 100}%`, top: -2, bottom: -2, borderLeftWidth: 0.75, borderLeftColor: C.z900 }} />
          </View>
          <Text style={{ width: 62, fontSize: 6.5, textAlign: "right", color: C.z500 }}>
            <Text style={{ fontWeight: 700, color: C.z900 }}>{g.count ? multiple(g.multiple) : "none"}</Text>
            {` · ${g.count} ${g.count === 1 ? unit : `${unit}s`}`}
          </Text>
        </View>
      ))}
    </View>
  )
}

function Patterns({ posts }: { posts: SnapshotPost[] }) {
  const lengths = lengthBuckets(posts)
  const cta = ctaGroups(posts)
  const by = (m: string) => (m === "views" ? "views" : "interactions")
  return (
    <View style={[s.row, { gap: 6, marginTop: 8 }]}>
      <View style={[s.card, { flex: 1 }]}>
        <Text style={s.h2}>Your video length sweet spot</Text>
        <Text style={s.sub}>
          {lengths.videos >= 3 ? `${lengths.videos} Reels by length vs your typical Reel (by ${by(lengths.metric)}). Black line = 1.0×` : "Reels by length vs your typical Reel"}
        </Text>
        {lengths.videos >= 3 ? (
          <GroupBars groups={lengths.buckets} unit="Reel" />
        ) : (
          <Text style={{ fontSize: 7.5, color: C.z500, marginTop: 10, lineHeight: 1.4 }}>
            Not enough Reels to compare yet. Post three or more and the snapshot shows which length your audience watches most.
          </Text>
        )}
      </View>
      <View style={[s.card, { flex: 1 }]}>
        <Text style={s.h2}>Do calls to action work for you?</Text>
        <Text style={s.sub}>{posts.length} posts vs your typical post (by {by(cta.metric)}). Black line = 1.0×</Text>
        <GroupBars groups={cta.groups} unit="post" />
        <Text style={{ fontSize: 5.5, color: C.z400, marginTop: 3, lineHeight: 1.35 }}>
          We count captions that ask for an action: comment, save this, share with, link in bio, DM me, tag a friend.
        </Text>
      </View>
    </View>
  )
}

// ---------------------------------------------------------------------------
// The agent's analysis: headline + Do this / Fix this / Try this
// ---------------------------------------------------------------------------

const KIND: Record<InsightKind, { label: string; color: string; bg: string }> = {
  do: { label: "Do this", color: C.emerald, bg: C.emeraldBg },
  fix: { label: "Fix this", color: C.rose, bg: C.roseBg },
  try: { label: "Try this", color: C.z900, bg: C.z100 },
}

/** Lucide's trending-up, wrench and flask-conical, as in the agent. */
function KindIcon({ kind, color }: { kind: InsightKind; color: string }) {
  const stroke = { stroke: color, strokeWidth: 2.2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  return (
    <Svg viewBox="0 0 24 24" style={{ width: 8, height: 8 }}>
      {kind === "do" && (
        <>
          <Polyline points="22 7 13.5 15.5 8.5 10.5 2 17" {...stroke} />
          <Polyline points="16 7 22 7 22 13" {...stroke} />
        </>
      )}
      {kind === "fix" && (
        <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" {...stroke} />
      )}
      {kind === "try" && (
        <>
          <Path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" {...stroke} />
          <Path d="M8.5 2h7" {...stroke} />
          <Path d="M7 16h10" {...stroke} />
        </>
      )}
    </Svg>
  )
}

function Analysis({ insights, postCount }: { insights: SnapshotInsights; postCount: number }) {
  return (
    <View style={[s.card, { marginTop: 8 }]}>
      <View style={[s.row, { alignItems: "center" }]}>
        <Image src={ASSETS.ambassador} style={{ height: 46, width: 27 }} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={s.h2}>
            Your Agent&apos;s analysis <Text style={{ fontSize: 6.5, fontWeight: 400, color: C.z400 }}>  Based on your last {postCount} posts</Text>
          </Text>
          <Text style={[s.num, { fontSize: 11.5, marginTop: 3, lineHeight: 1.3, color: C.z900 }]}>{clean(insights.headline)}</Text>
        </View>
      </View>
      <View style={[s.row, { gap: 6, marginTop: 8 }]}>
        {(["do", "fix", "try"] as const).map(kind => {
          const k = KIND[kind]
          const item = insights[kind]
          return (
            <View key={kind} style={{ flex: 1, borderWidth: 1, borderColor: C.z100, borderRadius: 8, padding: 8 }}>
              <View style={[s.row, { alignItems: "center" }]}>
                <View style={{ width: 14, height: 14, borderRadius: 4, backgroundColor: k.bg, alignItems: "center", justifyContent: "center" }}>
                  <KindIcon kind={kind} color={k.color} />
                </View>
                <Text style={[s.eyebrow, { marginLeft: 5 }]}>{k.label}</Text>
              </View>
              <Text style={{ fontSize: 7.5, fontWeight: 600, marginTop: 5, lineHeight: 1.35, color: C.z900 }}>{clean(item.title)}</Text>
              <Text style={{ fontSize: 6.8, marginTop: 3, lineHeight: 1.4, color: C.z500 }}>{clean(item.why)}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

// ---------------------------------------------------------------------------
// What the full agent adds, then the footnote
// ---------------------------------------------------------------------------

const UNLOCKS = [
  ["Audience data", "Age, gender, top cities and the hours your followers are online."],
  ["Hooks that work", "Which opening lines stop the scroll for your audience, and why."],
  ["Competitor posts", "Your competitors' best posts each week, and what to borrow."],
  ["Posts made for you", "A content plan built from what works, with the posts ready to publish."],
]

function Cta({ url }: { url: string }) {
  return (
    <View style={{ marginTop: 8, backgroundColor: C.ink, borderRadius: 12, padding: 12 }}>
      <View style={[s.row, { justifyContent: "space-between", alignItems: "center" }]}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={[s.num, { fontSize: 13.5, color: "#FFFFFF" }]}>See the full picture with your social media agent</Text>
          <Text style={{ fontSize: 7, color: "#FFFFFFA6", marginTop: 3 }}>
            This snapshot reads your public posts once. Create a free Talk to me Data account and your agent tracks them every week.
          </Text>
        </View>
        <Link src={url} style={{ textDecoration: "none" }}>
          <View style={{ backgroundColor: "#FFFFFF", borderRadius: 999, paddingVertical: 7, paddingHorizontal: 14 }}>
            <Text style={{ fontSize: 8, fontWeight: 700, color: C.ink }}>Create your free account</Text>
          </View>
        </Link>
      </View>
      <View style={[s.row, { gap: 8, marginTop: 9 }]}>
        {UNLOCKS.map(([title, body]) => (
          <View key={title} style={{ flex: 1, borderTopWidth: 0.75, borderTopColor: "#FFFFFF33", paddingTop: 6 }}>
            <Text style={{ fontSize: 7.5, fontWeight: 600, color: "#FFFFFF" }}>{title}</Text>
            <Text style={{ fontSize: 6.5, color: "#FFFFFFA6", marginTop: 2, lineHeight: 1.35 }}>{body}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export function SnapshotReport(d: ReportData) {
  const ordered = byDateAsc(d.chart.map(c => c.post))
  const chart = ordered.map(p => d.chart.find(c => c.post.id === p.id) as ChartPost)
  return (
    <Document title={`Instagram Snapshot for @${d.profile.handle}`} author="Talk to me Data" creator="talktomedata.com">
      <Page size="A4" style={s.page}>
        <Header profile={d.profile} avatar={d.avatar} generatedAt={d.generatedAt} />
        <KpiRow last30={d.last30} />
        <LastPosts chart={chart} followers={d.profile.followers} />
        <Patterns posts={d.posts} />
        <Analysis insights={d.insights} postCount={d.posts.length} />
        <Cta url={d.ctaUrl} />
        <Text style={{ fontSize: 5.8, color: C.z400, marginTop: 6, lineHeight: 1.4 }}>
          {d.sample ? "Sample report for a demo account. " : ""}Based on the last {d.posts.length} public posts from @{d.profile.handle}, read on{" "}
          {d.generatedAt.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}. Interactions are likes plus
          comments; engagement rate is interactions divided by followers. Instagram only makes view counts public for Reels. talktomedata.com
        </Text>
      </Page>
    </Document>
  )
}

export function renderSnapshotPdf(data: ReportData): Promise<Buffer> {
  return renderToBuffer(<SnapshotReport {...data} />)
}
