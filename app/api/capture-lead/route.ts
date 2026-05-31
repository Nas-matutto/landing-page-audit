import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source, role, teamSize, tasks, hoursSaved, annualValue } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

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
            $set: { email, role, lead_source: source },
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 })
  }
}
