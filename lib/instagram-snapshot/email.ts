import { compactNumber, percent } from "@/lib/instagram-snapshot/metrics"
import { SNAPSHOT_CTA_URL } from "@/lib/instagram-snapshot/snapshot"
import type { Snapshot } from "@/lib/instagram-snapshot/snapshot"
import { FROM_SOCIAL_AGENT, cards, emailShell, esc, label, p } from "@/lib/email-layout"

function stat(name: string, value: string): string {
  return `<td style="padding:10px 12px;background:#fafafa;border:1px solid #f4f4f5;border-radius:12px;width:33%;vertical-align:top">
<p style="margin:0;font-size:11px;color:#71717a">${esc(name)}</p><p style="margin:2px 0 0;font-size:18px;font-weight:700;color:#18181b">${esc(value)}</p></td>`
}

/** The first sentence, so the headline reads in one breath. */
const firstSentence = (s: string) => (s.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? s).trim()

/** The email that carries the PDF: the headline, three numbers, three moves (like the app's weekly digest), the signup link. */
export function snapshotEmailHtml({ handle, firstName, snapshot }: { handle: string; firstName?: string; snapshot: Snapshot }): string {
  const k = snapshot.last30.current
  const i = snapshot.insights
  return emailShell({
    from: FROM_SOCIAL_AGENT,
    heading: `${firstName ? `${firstName}, here's` : "Here's"} your Instagram snapshot`,
    blocks: [
      `<p style="margin:0 0 2px;font-size:11px;font-weight:600;color:#71717a;text-transform:uppercase;letter-spacing:.04em">Instagram · @${esc(handle)}</p>`,
      p(esc(firstSentence(i.headline))),
      `<table role="presentation" style="width:100%;border-collapse:separate;border-spacing:6px 0;margin:4px -6px 4px"><tr>${stat("Posts, last 30 days", String(k.posts))}${stat("Engagement", percent(k.engagementRate))}${stat("Avg Reel views", compactNumber(k.avgReelViews))}</tr></table>`,
      label("3 moves for this week"),
      cards([
        { tag: "Do more", kind: "do", title: i.do.title },
        { tag: "Fix", kind: "fix", title: i.fix.title },
        { tag: "Try", kind: "try", title: i.try.title },
      ]),
      p(`<span style="display:block;margin-top:8px">The full report is attached as a PDF: your last 10 posts, your video length sweet spot and why each move matters.</span>`),
    ],
    button: { label: "Get this every week, free", url: SNAPSHOT_CTA_URL.replace("utm_medium=pdf", "utm_medium=email") },
    footer: `You asked for this snapshot at <a href="https://talktomedata.com/free-tools/social-media-analyzer" style="color:#71717a">talktomedata.com</a>. It uses public data only.`,
  })
}
