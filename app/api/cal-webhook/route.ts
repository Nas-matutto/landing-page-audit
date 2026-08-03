import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * Cal.com booking webhook → Meta Conversions API.
 *
 * The browser pixel on /booking-confirmed already fires `Schedule`, but roughly
 * a third of those never arrive (ad blockers, ITP, people closing the Cal.com tab
 * before the redirect runs). This route sends the same event server-side, keyed on
 * the Cal.com booking uid as `event_id`. Meta deduplicates against the pixel event,
 * so we get the browser event when it works and this one when it doesn't.
 *
 * Cal.com setup: Settings → Developer → Webhooks → new webhook
 *   URL:     https://talktomedata.com/api/cal-webhook
 *   Trigger: BOOKING_CREATED
 *   Secret:  must match CAL_WEBHOOK_SECRET
 */

const META_PIXEL_ID = process.env.META_PIXEL_ID
const META_CAPI_ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN
const CAL_WEBHOOK_SECRET = process.env.CAL_WEBHOOK_SECRET
// Only set this while testing — it routes events to Events Manager → Test Events
// instead of counting them as real conversions.
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE
const META_API_VERSION = process.env.META_API_VERSION ?? 'v23.0'

const EVENT_SOURCE_URL = 'https://talktomedata.com/booking-confirmed'

/** Meta requires all PII to be SHA-256 of the normalised (trimmed, lowercased) value. */
function hash(value: string | undefined | null): string | undefined {
  const normalised = value?.trim().toLowerCase()
  if (!normalised) return undefined
  return crypto.createHash('sha256').update(normalised).digest('hex')
}

/** Phone numbers normalise differently: digits only, country code included, no `+`. */
function hashPhone(value: string | undefined | null): string | undefined {
  const digits = value?.replace(/\D/g, '')
  if (!digits) return undefined
  return crypto.createHash('sha256').update(digits).digest('hex')
}

/**
 * Cal.com signs the raw body with HMAC-SHA256 using the webhook secret and sends
 * it as `x-cal-signature-256`. Without this check anyone who finds the URL can
 * inject fake conversions and poison campaign optimisation.
 */
function isValidSignature(rawBody: string, signature: string | null): boolean {
  if (!CAL_WEBHOOK_SECRET || !signature) return false

  const expected = crypto
    .createHmac('sha256', CAL_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex')

  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  // timingSafeEqual throws on length mismatch, so guard first.
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

type CalAttendee = {
  email?: string
  name?: string
  phoneNumber?: string
}

type CalWebhookPayload = {
  triggerEvent?: string
  payload?: {
    uid?: string
    bookingId?: number
    startTime?: string
    attendees?: CalAttendee[]
    // Populated when the booking URL carried `metadata[fbp]` / `metadata[fbc]`.
    metadata?: Record<string, string>
  }
}

export async function POST(request: NextRequest) {
  if (!META_PIXEL_ID || !META_CAPI_ACCESS_TOKEN || !CAL_WEBHOOK_SECRET) {
    console.error('[cal-webhook] Missing Meta CAPI or Cal webhook env vars')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  // Signature is over the exact bytes Cal.com sent — read the body as text and
  // parse it ourselves rather than using request.json().
  const rawBody = await request.text()

  if (!isValidSignature(rawBody, request.headers.get('x-cal-signature-256'))) {
    console.warn('[cal-webhook] Rejected request with invalid signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let body: CalWebhookPayload
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Only new bookings are conversions. Reschedules and cancellations would
  // double-count or contradict the signal we optimise towards.
  if (body.triggerEvent !== 'BOOKING_CREATED') {
    return NextResponse.json({ ok: true, ignored: body.triggerEvent })
  }

  const booking = body.payload ?? {}
  const attendee = booking.attendees?.[0]

  // Must match the pixel's eventID on /booking-confirmed for deduplication to work.
  const eventId = booking.uid ?? (booking.bookingId ? String(booking.bookingId) : undefined)
  if (!eventId) {
    console.error('[cal-webhook] Booking payload had no uid — cannot deduplicate')
    return NextResponse.json({ error: 'Missing booking uid' }, { status: 400 })
  }

  // Note: no client_ip_address / client_user_agent. This request comes from
  // Cal.com's servers, so those values describe Cal.com, not the buyer, and
  // sending them would actively damage match quality.
  const userData: Record<string, string | string[]> = {}
  const email = hash(attendee?.email)
  if (email) userData.em = [email]

  const phone = hashPhone(attendee?.phoneNumber)
  if (phone) userData.ph = [phone]

  // Cal.com gives one full name field; Meta wants first/last separately.
  const nameParts = attendee?.name?.trim().split(/\s+/) ?? []
  const firstName = hash(nameParts[0])
  if (firstName) userData.fn = [firstName]
  const lastName = hash(nameParts.length > 1 ? nameParts[nameParts.length - 1] : undefined)
  if (lastName) userData.ln = [lastName]

  // Browser cookies forwarded through the booking URL, when present — these are
  // the strongest ad-attribution signals Meta has.
  const fbp = booking.metadata?.fbp
  if (fbp) userData.fbp = fbp
  const fbc = booking.metadata?.fbc
  if (fbc) userData.fbc = fbc

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'Schedule',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: EVENT_SOURCE_URL,
        action_source: 'website',
        user_data: userData,
        custom_data: { content_name: 'Talk to Me Data demo call' },
      },
    ],
  }
  if (META_TEST_EVENT_CODE) payload.test_event_code = META_TEST_EVENT_CODE

  try {
    const res = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${META_CAPI_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    const result = await res.json()

    if (!res.ok) {
      console.error('[cal-webhook] Meta CAPI rejected event:', JSON.stringify(result))
      // 200 back to Cal.com regardless — retries would not fix a malformed event
      // and Cal.com disables webhooks that keep failing.
      return NextResponse.json({ ok: false, metaError: result }, { status: 200 })
    }

    console.log(`[cal-webhook] Sent Schedule to Meta for booking ${eventId}`)
    return NextResponse.json({ ok: true, eventId, meta: result })
  } catch (error) {
    console.error('[cal-webhook] Failed to reach Meta CAPI:', error)
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
