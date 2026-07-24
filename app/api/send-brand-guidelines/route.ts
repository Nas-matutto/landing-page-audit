import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { appendLeadRow, updateLeadRow, buildLeadRow, findLeadRowByEmail } from '@/lib/leads-sheet'
import { isLikelyBot } from '@/lib/bot-filter'

type Brand = {
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

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function swatch(hex?: string, label?: string): string {
  if (!hex) return ''
  return `
    <td style="padding:0 10px 0 0;vertical-align:top;">
      <div style="width:88px;height:56px;border-radius:10px;background:${esc(hex)};border:1px solid #e2e8f0;"></div>
      <div style="font:600 11px system-ui,sans-serif;color:#64748b;margin-top:6px;">${esc(label)}</div>
      <div style="font:700 12px system-ui,sans-serif;color:#0f172a;">${esc(hex)}</div>
    </td>`
}

function buildEmailHtml(brand: Brand, markdown: string): string {
  const traits = (brand.traits ?? []).map(t =>
    `<span style="display:inline-block;background:#eef2ff;color:#4338ca;font:600 12px system-ui,sans-serif;padding:5px 11px;border-radius:999px;margin:0 6px 6px 0;">${esc(t)}</span>`
  ).join('')

  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
    <div style="background:linear-gradient(135deg,${esc(brand.primary || '#185FA5')},${esc(brand.secondary || '#7c3aed')});border-radius:16px;padding:28px 24px;color:#fff;">
      <p style="margin:0 0 4px;font:700 11px system-ui,sans-serif;letter-spacing:2px;opacity:.8;">BRAND GUIDELINES</p>
      <h1 style="margin:0;font-size:26px;">${esc(brand.name || 'Your Brand')}</h1>
      ${brand.tagline ? `<p style="margin:8px 0 0;opacity:.9;font-size:14px;">${esc(brand.tagline)}</p>` : ''}
    </div>

    <p style="font-size:15px;margin:22px 4px 8px;">Hey${brand.name ? '' : ''},</p>
    <p style="font-size:15px;margin:0 4px 18px;line-height:1.6;">
      Here are your one-page brand guidelines. The PNG is attached, and the text below is ready to paste
      straight into an AI agent so it always writes and designs on-brand.
    </p>

    <h3 style="font-size:13px;letter-spacing:1px;color:#64748b;margin:22px 4px 10px;">COLORS</h3>
    <table role="presentation" style="margin:0 4px;"><tr>
      ${swatch(brand.primary, 'Primary')}${swatch(brand.secondary, 'Secondary')}${swatch(brand.accent, 'Accent')}
    </tr></table>

    <h3 style="font-size:13px;letter-spacing:1px;color:#64748b;margin:22px 4px 8px;">TYPOGRAPHY</h3>
    <p style="font-size:14px;margin:0 4px 4px;"><strong>Headings:</strong> ${esc(brand.headingFont)}</p>
    <p style="font-size:14px;margin:0 4px;"><strong>Body:</strong> ${esc(brand.bodyFont)}</p>

    <h3 style="font-size:13px;letter-spacing:1px;color:#64748b;margin:22px 4px 8px;">TONE OF VOICE</h3>
    <p style="font-size:14px;margin:0 4px;line-height:1.6;"><strong>${esc(brand.tone)}.</strong> ${esc(brand.toneDescriptor)}</p>

    ${traits ? `<h3 style="font-size:13px;letter-spacing:1px;color:#64748b;margin:22px 4px 10px;">PERSONALITY</h3><div style="margin:0 4px;">${traits}</div>` : ''}

    <h3 style="font-size:13px;letter-spacing:1px;color:#64748b;margin:24px 4px 8px;">PASTE THIS INTO YOUR AI AGENT</h3>
    <pre style="white-space:pre-wrap;background:#0f172a;color:#e2e8f0;border-radius:12px;padding:16px;font:12px ui-monospace,Menlo,monospace;line-height:1.55;overflow-x:auto;">${esc(markdown)}</pre>

    <div style="margin:28px 4px 8px;padding:18px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;">
      <p style="margin:0 0 10px;font-size:14px;"><strong>Want an AI agent that uses these guidelines automatically?</strong></p>
      <a href="https://talktomedata.com/get-started" style="display:inline-block;background:#185FA5;color:#fff;text-decoration:none;font:600 14px system-ui,sans-serif;padding:10px 18px;border-radius:10px;">Build your agent →</a>
    </div>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0;" />
    <p style="font-size:12px;color:#94a3b8;margin:0 4px;">Generated with <a href="https://talktomedata.com/free-tools/brand-guidelines" style="color:#185FA5;">talktomedata.com</a>.</p>
  </div>`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName, hp, brand, markdown, imageDataUrl } = body as {
      email?: string
      firstName?: string
      lastName?: string
      hp?: string
      brand?: Brand
      markdown?: string
      imageDataUrl?: string
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Bot filter — silently accept and write nothing.
    if (isLikelyBot(hp, firstName, lastName)) {
      return NextResponse.json({ success: true })
    }

    const brandName = brand?.name || 'Your Brand'
    const source = 'brand_guidelines'

    // Brevo — add/update contact
    const brevoKey = process.env.BREVO_API_KEY?.trim()
    const brevoListIdRaw = process.env.BREVO_LIST_ID?.trim()
    const brevoListId = brevoListIdRaw ? parseInt(brevoListIdRaw, 10) : null
    if (brevoKey) {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': brevoKey },
        body: JSON.stringify({
          email,
          updateEnabled: true,
          ...(brevoListId && !isNaN(brevoListId) ? { listIds: [brevoListId] } : {}),
          attributes: {
            SOURCE: source,
            ...(firstName ? { FIRSTNAME: firstName } : {}),
            ...(lastName ? { LASTNAME: lastName } : {}),
          },
        }),
      }).then(async r => { if (!r.ok) console.error('Brevo error', r.status, await r.text()) })
        .catch(err => console.error('Brevo error:', err))
    }

    // PostHog
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (posthogKey) {
      fetch('https://app.posthog.com/capture/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: posthogKey,
          event: 'lead_captured',
          distinct_id: email,
          properties: {
            email, source, brand_name: brandName,
            ...(firstName ? { first_name: firstName } : {}),
            ...(lastName ? { last_name: lastName } : {}),
            $set: { email, lead_source: source, ...(firstName ? { first_name: firstName } : {}), ...(lastName ? { last_name: lastName } : {}) },
          },
        }),
      }).catch(err => console.error('PostHog error:', err))
    }

    // Google Sheet — dedupe by email; store the brand name in the tools column.
    const row = buildLeadRow({ email, firstName, lastName, page: source, tools: brandName })
    const existing = await findLeadRowByEmail(email).catch(() => undefined)
    if (existing) {
      await updateLeadRow(existing, row).catch(err => {
        console.error('Sheets update error — appending instead:', err)
        return appendLeadRow(row).catch(e => console.error('Sheets append fallback error:', e))
      })
    } else {
      await appendLeadRow(row).catch(err => console.error('Sheets error (brand guidelines):', err))
    }

    // Resend — email the document
    const resendKey = process.env.RESEND_API_KEY?.trim()
    if (resendKey) {
      const resend = new Resend(resendKey)
      const attachments: { filename: string; content: Buffer }[] = []
      if (typeof imageDataUrl === 'string' && imageDataUrl.startsWith('data:image')) {
        const b64 = imageDataUrl.split(',')[1] ?? ''
        if (b64) attachments.push({ filename: 'brand-guidelines.png', content: Buffer.from(b64, 'base64') })
      }
      const { error } = await resend.emails.send({
        from: 'Nas <nas@talktomedata.com>',
        to: [email],
        subject: `Your Brand Guidelines — ${brandName}`,
        html: buildEmailHtml(brand ?? {}, markdown ?? ''),
        attachments,
      })
      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json({ error: `Email failed to send: ${error.message}` }, { status: 500 })
      }
    } else {
      console.warn('RESEND_API_KEY is not set — skipping email send')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send brand guidelines error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
