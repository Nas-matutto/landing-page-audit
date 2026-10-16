import { compactNumber, percent } from "@/lib/instagram-snapshot/metrics"
import { SNAPSHOT_CTA_URL } from "@/lib/instagram-snapshot/snapshot"
import type { Snapshot } from "@/lib/instagram-snapshot/snapshot"

function esc(s: unknown): string {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function stat(label: string, value: string): string {
  return `
    <td style="padding:14px 12px;border:1px solid #e4e4e7;border-radius:12px;width:33%;vertical-align:top;">
      <div style="font:500 12px system-ui,sans-serif;color:#71717a;">${esc(label)}</div>
      <div style="font:700 22px system-ui,sans-serif;color:#141414;margin-top:4px;">${esc(value)}</div>
    </td>`
}

/** The email that carries the PDF: the headline finding, three numbers and the signup link. */
export function snapshotEmailHtml({ handle, firstName, snapshot }: { handle: string; firstName?: string; snapshot: Snapshot }): string {
  const k = snapshot.last30.current
  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;color:#141414;">
    <p style="margin:0 0 4px;font:600 11px system-ui,sans-serif;letter-spacing:2px;color:#71717a;">INSTAGRAM SNAPSHOT</p>
    <h1 style="margin:0 0 20px;font-size:24px;">@${esc(handle)}</h1>

    <p style="font-size:15px;line-height:1.6;margin:0 0 16px;">Hi${firstName ? ` ${esc(firstName)}` : ""},</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">
      Your one-page Instagram snapshot is attached as a PDF. Here's the headline from your agent:
    </p>
    <p style="font-size:17px;font-weight:600;line-height:1.5;margin:0 0 20px;padding:16px 18px;background:#f4f4f5;border-radius:12px;">
      ${esc(snapshot.insights.headline)}
    </p>

    <p style="margin:0 0 8px;font:600 11px system-ui,sans-serif;letter-spacing:1px;color:#71717a;">YOUR LAST 30 DAYS</p>
    <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:6px 0;margin:0 -6px 24px;"><tr>
      ${stat("Posts", String(k.posts))}${stat("Engagement rate", percent(k.engagementRate))}${stat("Avg Reel views", compactNumber(k.avgReelViews))}
    </tr></table>

    <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">
      Open the PDF for your last 10 posts, your video length sweet spot, whether calls to action work for you,
      and three things to do next: <strong>do this</strong>, <strong>fix this</strong> and <strong>try this</strong>.
    </p>

    <div style="padding:22px;border-radius:16px;background:#141414;color:#ffffff;">
      <p style="margin:0 0 6px;font-size:17px;font-weight:700;">Want this every week, with your audience data?</p>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.55;color:rgba(255,255,255,.7);">
        Your social media agent tracks your account, shows who your audience is, which hooks work and what your competitors post, then plans and makes your next posts.
      </p>
      <a href="${SNAPSHOT_CTA_URL.replace("utm_medium=pdf", "utm_medium=email")}" style="display:inline-block;background:#ffffff;color:#141414;text-decoration:none;font:600 14px system-ui,sans-serif;padding:11px 20px;border-radius:999px;">Create your free account</a>
    </div>

    <p style="font-size:15px;line-height:1.6;margin:24px 0 0;">Nas<br><span style="color:#71717a;">Talk to me Data</span></p>
    <hr style="border:none;border-top:1px solid #e4e4e7;margin:28px 0 16px;" />
    <p style="font-size:12px;color:#a1a1aa;margin:0;">
      You asked for this snapshot at <a href="https://talktomedata.com/free-tools/social-media-analyzer" style="color:#71717a;">talktomedata.com</a>. It uses public data only.
    </p>
  </div>`
}
