import { SIGNUP_URL } from "@/lib/links"

// The one look for every email this site sends (lead magnets, free tools),
// matching the app's weekly digest: a white card on grey, who it's from with
// their face, a short heading, numbered cards, one button, a small footer.

const SITE = "https://talktomedata.com"

export const FROM_NAS = { name: "Nas", face: `${SITE}/ambassador_face.jpeg` }
export const FROM_SOCIAL_AGENT = { name: "Your Social Media Manager", face: `${SITE}/faces/social.jpg` }

export function esc(s: unknown): string {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

/** Signup link tagged with where the email came from. */
export function signupUrl(source: string): string {
  return `${SIGNUP_URL}?utm_source=${encodeURIComponent(source)}&utm_medium=email&utm_campaign=free_tool`
}

export function p(html: string): string {
  return `<p style="margin:0 0 12px;font-size:14px;line-height:1.55;color:#3f3f46">${html}</p>`
}

export function label(text: string): string {
  return `<p style="margin:18px 0 10px;font-size:15px;font-weight:700;color:#18181b">${esc(text)}</p>`
}

const TAG = {
  step: { color: "#18181b", bg: "#f4f4f5" },
  do: { color: "#047857", bg: "#ecfdf5" },
  fix: { color: "#b91c1c", bg: "#fef2f2" },
  try: { color: "#6d28d9", bg: "#f5f3ff" },
}

/** Numbered cards, like the digest's "3 moves": a tag, one bold line, an optional short line under it. */
export function cards(items: { tag: string; kind?: keyof typeof TAG; title: string; note?: string }[]): string {
  return `<table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0">${items
    .map((it, i) => {
      const t = TAG[it.kind ?? "step"]
      return `<tr><td style="padding:12px 14px;background:#fafafa;border:1px solid #f4f4f5;border-radius:12px">
<p style="margin:0 0 6px"><span style="font-size:11px;font-weight:700;color:${t.color};background:${t.bg};padding:2px 8px;border-radius:999px">${i + 1} · ${esc(it.tag)}</span></p>
<p style="margin:0;font-size:14px;line-height:1.45;font-weight:600;color:#18181b">${esc(it.title)}</p>${
        it.note ? `<p style="margin:4px 0 0;font-size:13px;line-height:1.45;color:#71717a">${esc(it.note)}</p>` : ""
      }</td></tr><tr><td style="height:8px"></td></tr>`
    })
    .join("")}</table>`
}

export function emailShell(opts: {
  from: { name: string; face: string }
  heading: string
  blocks: string[]
  button: { label: string; url: string }
  footer: string
}): string {
  return `<!doctype html><html><body style="margin:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#18181b">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
<div style="background:#fff;border:1px solid #e4e4e7;border-radius:16px;padding:28px">
<table role="presentation" style="border-collapse:collapse;margin:0 0 18px"><tr>
<td style="padding:0 12px 0 0;vertical-align:middle"><img src="${opts.from.face}" width="44" height="44" alt="" style="display:block;width:44px;height:44px;border-radius:50%;object-fit:cover"></td>
<td style="vertical-align:middle"><p style="margin:0;font-size:13px;font-weight:600;color:#18181b">${esc(opts.from.name)}</p><p style="margin:2px 0 0;font-size:12px;color:#71717a">Talk to Me Data</p></td>
</tr></table>
<h1 style="margin:0 0 16px;font-size:20px;line-height:1.3">${esc(opts.heading)}</h1>
${opts.blocks.filter(Boolean).join("\n")}
<a href="${opts.button.url}" style="display:inline-block;margin-top:20px;background:#18181b;color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:11px 18px;border-radius:10px">${esc(opts.button.label)}</a>
</div>
<p style="margin:16px 4px 0;font-size:11px;color:#a1a1aa">${opts.footer}</p>
</div></body></html>`
}

/** The three PDF guides: what's attached, three ways to use it, reply, one button. */
export function guideEmail(opts: { firstName?: string; title: string; what: string; steps: string[]; reply: string; source: string }): string {
  return emailShell({
    from: FROM_NAS,
    heading: `Your ${opts.title} is attached`,
    blocks: [
      p(`Hi ${opts.firstName ? esc(opts.firstName) : "there"}, ${esc(opts.what)}`),
      label("3 ways to get the most from it"),
      cards(opts.steps.map((title) => ({ tag: "Step", title }))),
      p(`<span style="display:block;margin-top:8px">${esc(opts.reply)}</span>`),
    ],
    button: { label: "Meet your AI agents", url: signupUrl(opts.source) },
    footer: `You're getting this because you downloaded a free guide from <a href="${SITE}" style="color:#71717a">talktomedata.com</a>.`,
  })
}
