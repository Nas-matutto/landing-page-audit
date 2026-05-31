import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source, role, teamSize, tasks, hoursSaved, annualValue } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Send to PostHog as a server-side event — shows up in People with the email as distinct_id.
    // Wire up an additional email service (Loops, Mailchimp, Resend, etc.) here when ready.
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
            annual_value_eur: annualValue,
            $set: {
              email,
              role,
              lead_source: source,
            },
          },
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 })
  }
}
