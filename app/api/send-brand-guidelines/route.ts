import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { appendLeadRow, updateLeadRow, buildLeadRow, findLeadRowByEmail } from '@/lib/leads-sheet'
import { isLikelyBot } from '@/lib/bot-filter'
import { EMAIL_FROM, REPLY_TO } from '@/lib/email-from'
import { buildEmailHtml, type Brand } from '@/lib/brand-guidelines-email'

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
        from: EMAIL_FROM,
        replyTo: REPLY_TO,
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
