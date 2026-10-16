import { NextRequest, NextResponse, after } from 'next/server'
import { Resend } from 'resend'
import { appendLeadRow, buildLeadRow, hasLeadRowForPage } from '@/lib/leads-sheet'
import { isLikelyBot } from '@/lib/bot-filter'
import { AccountNotFoundError, fetchAccount, normalizeHandle } from '@/lib/instagram-snapshot/instagram'
import { buildSnapshot } from '@/lib/instagram-snapshot/snapshot'
import { snapshotEmailHtml } from '@/lib/instagram-snapshot/email'

// The free Instagram Snapshot (/free-tools/social-media-analyzer).
//
// The request checks everything the visitor can fix (email, handle, account
// type, one snapshot per email) and records the lead, then answers. The
// report itself (video lengths, Sonnet's analysis, the PDF, the email) is
// built in after(), so the form doesn't wait on it; it takes 20 to 40s.

export const maxDuration = 60

const SOURCE = 'instagram_snapshot'

function listId(raw: string | undefined): number | null {
  const n = raw ? parseInt(raw.trim(), 10) : NaN
  return Number.isNaN(n) ? null : n
}

// Snapshot leads go to the main list (BREVO_LIST_ID, shared with every guide
// and tool), tagged SOURCE=instagram_snapshot. Optionally they also go to a
// list of their own (BREVO_INSTAGRAM_SNAPSHOT_LIST_ID), which then doubles as
// the one-per-email check; otherwise the leads sheet is the check.
const MAIN_LIST = () => listId(process.env.BREVO_LIST_ID)
const SNAPSHOT_LIST = () => listId(process.env.BREVO_INSTAGRAM_SNAPSHOT_LIST_ID)

async function brevoContactLists(email: string): Promise<number[]> {
  const key = process.env.BREVO_API_KEY?.trim()
  if (!key) return []
  const res = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
    headers: { 'api-key': key },
    cache: 'no-store',
  })
  if (!res.ok) return [] // 404: not a contact yet
  const contact = (await res.json()) as { listIds?: number[] }
  return contact.listIds ?? []
}

/** One snapshot per email: a snapshot row in the leads sheet, or (if configured) the snapshot list in Brevo. */
async function alreadyHadSnapshot(email: string): Promise<boolean> {
  const list = SNAPSHOT_LIST()
  const [inList, inSheet] = await Promise.all([
    list ? brevoContactLists(email).then(ids => ids.includes(list)).catch(() => false) : false,
    hasLeadRowForPage(email, SOURCE).catch(() => false),
  ])
  return inList || inSheet
}

async function recordLead(email: string, firstName: string, lastName: string, handle: string) {
  const key = process.env.BREVO_API_KEY?.trim()
  const listIds = [MAIN_LIST(), SNAPSHOT_LIST()].filter((id): id is number => id !== null)

  await Promise.all([
    key
      ? fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'api-key': key },
          body: JSON.stringify({
            email,
            updateEnabled: true,
            listIds,
            attributes: { SOURCE, ...(firstName ? { FIRSTNAME: firstName } : {}), ...(lastName ? { LASTNAME: lastName } : {}) },
          }),
        })
          .then(async r => { if (!r.ok) console.error('Brevo error', r.status, await r.text()) })
          .catch(err => console.error('Brevo error:', err))
      : console.warn('BREVO_API_KEY is not set'),
    // Always a new row (never an update), so the one-per-email check can find it.
    appendLeadRow(buildLeadRow({ email, firstName, lastName, page: SOURCE, tools: `@${handle}` })).catch(err =>
      console.error('Sheets error (instagram snapshot):', err),
    ),
  ])

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
          email, source: SOURCE, instagram_handle: handle,
          $set: { email, lead_source: SOURCE, ...(firstName ? { first_name: firstName } : {}), ...(lastName ? { last_name: lastName } : {}) },
        },
      }),
    }).catch(err => console.error('PostHog error:', err))
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email?: string
      firstName?: string
      lastName?: string
      handle?: string
      professionalAccount?: boolean
      hp?: string
    }
    const email = body.email?.trim().toLowerCase() ?? ''
    const firstName = body.firstName?.trim() ?? ''
    const lastName = body.lastName?.trim() ?? ''

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    // Bot filter: accept (200) so it doesn't retry, but run nothing and write nothing.
    if (isLikelyBot(body.hp, firstName, lastName)) {
      return NextResponse.json({ success: true })
    }
    const handle = normalizeHandle(body.handle ?? '')
    if (!handle) {
      return NextResponse.json({ error: 'Please enter your Instagram handle, like @yourbrand.' }, { status: 400 })
    }
    if (body.professionalAccount !== true) {
      return NextResponse.json({ error: 'The analyzer is for Instagram Creator and Business accounts. Please confirm yours is one.' }, { status: 400 })
    }
    if (!process.env.META_BD_ACCESS_TOKEN || !process.env.META_BD_IG_USER_ID) {
      console.error('Instagram snapshot: META_BD_ACCESS_TOKEN / META_BD_IG_USER_ID are not set')
      return NextResponse.json({ error: 'The analyzer is unavailable right now. Please try again later.' }, { status: 503 })
    }

    if (await alreadyHadSnapshot(email)) {
      return NextResponse.json(
        { error: "We've already sent a free analysis to this email. Check your inbox (and spam folder) for it." },
        { status: 409 },
      )
    }

    let account: Awaited<ReturnType<typeof fetchAccount>>
    try {
      account = await fetchAccount(handle)
    } catch (err) {
      if (err instanceof AccountNotFoundError) {
        return NextResponse.json(
          {
            error: `We couldn't find a Creator or Business account called @${handle}. Check the spelling, and if it's a personal account, switch it to a professional account in Instagram's settings (it's free) and try again.`,
          },
          { status: 404 },
        )
      }
      throw err
    }
    if (account.posts.length === 0) {
      return NextResponse.json({ error: `@${handle} has no public posts yet, so there's nothing to analyse.` }, { status: 422 })
    }

    await recordLead(email, firstName, lastName, account.profile.handle)

    after(async () => {
      try {
        const snapshot = await buildSnapshot(account.profile, account.posts)
        const resendKey = process.env.RESEND_API_KEY?.trim()
        if (!resendKey) {
          console.warn('RESEND_API_KEY is not set; skipping email send')
          return
        }
        const { error } = await new Resend(resendKey).emails.send({
          from: 'Nas <nas@talktomedata.com>',
          to: [email],
          subject: `Your Instagram snapshot for @${account.profile.handle}`,
          html: snapshotEmailHtml({ handle: account.profile.handle, firstName, snapshot }),
          attachments: [{ filename: `instagram-snapshot-${account.profile.handle}.pdf`, content: snapshot.pdf }],
        })
        if (error) console.error('Resend error (instagram snapshot):', error)
      } catch (err) {
        console.error(`Instagram snapshot failed for @${handle} (${email}):`, err)
      }
    })

    return NextResponse.json({ success: true, handle: account.profile.handle })
  } catch (error) {
    console.error('Instagram snapshot error:', error)
    return NextResponse.json({ error: 'Something went wrong on our side. Please try again in a minute.' }, { status: 500 })
  }
}
