import { NextRequest, NextResponse } from 'next/server'
import { appendLeadRow, updateLeadRow, buildLeadRow, findLeadRowByEmail } from '@/lib/leads-sheet'
import { isLikelyBot } from '@/lib/bot-filter'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source, role, teamSize, tasks, hoursSaved, annualValue, firstName, lastName, hp } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Bot filter — a filled honeypot or machine-random name means a crawler.
    // Accept (200) so it doesn't retry, but write nothing anywhere.
    if (isLikelyBot(hp, firstName, lastName)) {
      return NextResponse.json({ success: true })
    }

    const tasksStr = Array.isArray(tasks) ? tasks.join(', ') : (tasks ?? '')

    // PostHog — server-side event capture (shows up in People with email as distinct_id)
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
            email,
            source,
            role,
            team_size: teamSize,
            tasks,
            hours_saved_per_week: hoursSaved,
            annual_value_usd: annualValue,
            ...(firstName ? { first_name: firstName } : {}),
            ...(lastName ? { last_name: lastName } : {}),
            $set: { email, role, lead_source: source, ...(firstName ? { first_name: firstName } : {}), ...(lastName ? { last_name: lastName } : {}) },
          },
        }),
      }).catch(err => console.error('PostHog error:', err))
    }

    // Brevo — add/update contact and add to list
    // NOTE: Custom attributes (SOURCE, ROLE, etc.) must be pre-created in Brevo under
    // Contacts → Settings → Contact attributes before they can be set here.
    const brevoKey = process.env.BREVO_API_KEY?.trim()
    const brevoListIdRaw = process.env.BREVO_LIST_ID?.trim()
    const brevoListId = brevoListIdRaw ? parseInt(brevoListIdRaw, 10) : null

    if (!brevoKey) {
      console.warn('BREVO_API_KEY is not set')
    } else {
      const brevoBody: Record<string, unknown> = {
        email,
        updateEnabled: true,
        ...(brevoListId && !isNaN(brevoListId) ? { listIds: [brevoListId] } : {}),
        attributes: {
          // These are safe defaults — extend after creating custom attrs in Brevo dashboard
          ...(source ? { SOURCE: source } : {}),
          ...(role ? { ROLE: role } : {}),
          ...(firstName ? { FIRSTNAME: firstName } : {}),
          ...(lastName ? { LASTNAME: lastName } : {}),
        },
      }

      const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': brevoKey,
        },
        body: JSON.stringify(brevoBody),
      })

      if (!brevoRes.ok) {
        const errText = await brevoRes.text()
        console.error(`Brevo error ${brevoRes.status}:`, errText)
      } else {
        console.log(`Brevo: contact ${email} added/updated (status ${brevoRes.status})`)
      }
    }

    // Google Sheets — only write a lead row when a name was captured (e.g. the
    // workflow-mapper download gate). Email-only captures (blog prompt copies)
    // stay out of the sheet to keep it clean. Dedupe by email so repeat
    // downloads update the same row instead of adding duplicates.
    if (firstName || lastName) {
      const row = buildLeadRow({ email, firstName, lastName, page: source ?? 'capture_lead', tools: tasksStr })
      const existing = await findLeadRowByEmail(email).catch(() => undefined)
      if (existing) {
        await updateLeadRow(existing, row).catch(err => {
          console.error('Sheets update error — appending instead:', err)
          return appendLeadRow(row).catch(e => console.error('Sheets append fallback error:', e))
        })
      } else {
        await appendLeadRow(row).catch(err => console.error('Sheets error (capture-lead):', err))
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 })
  }
}
