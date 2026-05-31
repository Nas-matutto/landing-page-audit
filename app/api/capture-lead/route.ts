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
      await fetch('https://app.posthog.com/capture/', {
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
            $set: {
              email,
              role,
              lead_source: source,
            },
          },
        }),
      }).catch(() => {/* non-blocking */})
    }

    // Brevo — add/update contact and add to list
    const brevoKey = process.env.BREVO_API_KEY
    const brevoListId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID) : null
    if (brevoKey) {
      const brevoBody: Record<string, unknown> = {
        email,
        updateEnabled: true,
        attributes: {
          SOURCE: source,
          ...(role ? { ROLE: role } : {}),
          ...(teamSize ? { TEAM_SIZE: teamSize } : {}),
          ...(hoursSaved ? { HOURS_SAVED: hoursSaved } : {}),
          ...(annualValue ? { ANNUAL_VALUE: annualValue } : {}),
        },
        ...(brevoListId ? { listIds: [brevoListId] } : {}),
      }

      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': brevoKey,
        },
        body: JSON.stringify(brevoBody),
      }).catch(() => {/* non-blocking */})
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 })
  }
}
