import { FROM_NAS, cards, emailShell, esc, label, p, signupUrl } from '@/lib/email-layout'

// The email the free brand guidelines tool sends (app/api/send-brand-guidelines).

export type Brand = {
  name?: string
  tagline?: string
  mission?: string
  audience?: string
  headingFont?: string
  bodyFont?: string
  primary?: string
  secondary?: string
  accent?: string
  tone?: string
  toneDescriptor?: string
  traits?: string[]
  wordsUse?: string
  wordsAvoid?: string
}

function swatch(hex?: string, name?: string): string {
  if (!hex) return ''
  return `<td style="padding:0 8px 0 0;vertical-align:top">
<div style="width:72px;height:44px;border-radius:10px;background:${esc(hex)};border:1px solid #e4e4e7"></div>
<p style="margin:6px 0 0;font-size:11px;color:#71717a">${esc(name)}</p><p style="margin:0;font-size:12px;font-weight:700;color:#18181b">${esc(hex)}</p></td>`
}

export function buildEmailHtml(brand: Brand, markdown: string): string {
  const traits = (brand.traits ?? [])
    .map((t) => `<span style="display:inline-block;background:#f4f4f5;color:#18181b;font-size:12px;font-weight:600;padding:3px 10px;border-radius:999px;margin:0 6px 6px 0">${esc(t)}</span>`)
    .join('')
  return emailShell({
    from: FROM_NAS,
    heading: `Your brand guidelines: ${brand.name || 'Your Brand'}`,
    blocks: [
      p('The one-page PNG is attached. The text at the bottom is ready to paste into any AI agent so it writes and designs on-brand.'),
      `<table role="presentation" style="border-collapse:collapse;margin:6px 0 10px"><tr>${swatch(brand.primary, 'Primary')}${swatch(brand.secondary, 'Secondary')}${swatch(brand.accent, 'Accent')}</tr></table>`,
      cards([
        { tag: 'Fonts', title: [brand.headingFont, brand.bodyFont].filter(Boolean).join(' · ') || 'See the PNG' },
        { tag: 'Tone', title: brand.tone || 'See the PNG', note: brand.toneDescriptor },
      ]),
      traits ? `<div style="margin:2px 0 6px">${traits}</div>` : '',
      label('Paste this into your AI agent'),
      `<pre style="white-space:pre-wrap;margin:0;background:#18181b;color:#e4e4e7;border-radius:12px;padding:14px;font:12px/1.55 ui-monospace,Menlo,monospace">${esc(markdown)}</pre>`,
    ],
    button: { label: 'Get an agent that uses these', url: signupUrl('brand_guidelines') },
    footer: `Made with the free brand guidelines tool at <a href="https://talktomedata.com/free-tools/brand-guidelines" style="color:#71717a">talktomedata.com</a>.`,
  })
}
