import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const SCORE_MAP = {
  teamSize: { 'Just me': 0, '2–10 people': 1, '11–50 people': 2, '50+ people': 3 } as Record<string, number>,
  timeline: { 'Just exploring': 0, '1–3 months': 1, 'Ready now': 3 } as Record<string, number>,
}

async function appendToSheet(row: string[]) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const sheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

  if (!email || !privateKey || !sheetId) {
    console.warn('Google Sheets env vars not set — skipping sheet write')
    return
  }

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: privateKey },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, email, page } = body as {
      answers: string[]   // [intent, teamSize, timeline]
      email: string
      page: string
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const [intent, teamSize, timeline] = answers ?? []
    const score =
      (SCORE_MAP.teamSize[teamSize] ?? 0) +
      (SCORE_MAP.timeline[timeline] ?? 0)

    const timestamp = new Date().toISOString()
    const row = [timestamp, email, intent ?? '', teamSize ?? '', timeline ?? '', String(score), page ?? '']

    // Write to Google Sheets (non-blocking on failure)
    await appendToSheet(row).catch(err => console.error('Sheets error:', err))

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
            email,
            source: 'chat_widget',
            intent,
            team_size: teamSize,
            timeline,
            score,
            $set: { email, lead_source: 'chat_widget' },
          },
        }),
      }).catch(err => console.error('PostHog error:', err))
    }

    // Brevo
    const brevoKey = process.env.BREVO_API_KEY?.trim()
    const brevoListId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID.trim(), 10) : null
    if (brevoKey) {
      const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': brevoKey },
        body: JSON.stringify({
          email,
          updateEnabled: true,
          attributes: { SOURCE: 'chat_widget' },
          ...(brevoListId && !isNaN(brevoListId) ? { listIds: [brevoListId] } : {}),
        }),
      })
      if (!brevoRes.ok) {
        const errText = await brevoRes.text()
        console.error(`Brevo error ${brevoRes.status}:`, errText)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('qualify-lead error:', err)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}
