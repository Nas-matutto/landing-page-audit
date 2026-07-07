import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const SCORE_MAP = {
  role:      { 'Founder / CEO': 3, 'Operations or Finance': 2, 'Marketing or Sales': 2, 'IT / Developer': 1, 'Other': 0 } as Record<string, number>,
  teamSize:  { 'Just me': 0, '2–10 people': 1, '1–10 people': 1, '11–50 people': 2, '51–200 people': 1, '50+ people': 3, '200+ people': 1 } as Record<string, number>,
  challenge: { 'Too much manual admin': 2, 'Slow lead follow-up': 2, 'Customer support volume': 2, 'Reporting & analytics': 2, 'Social media content': 2, 'Other': 1 } as Record<string, number>,
  timeline:  { 'Just exploring': 0, '1–3 months': 1, 'Within 3 months': 1, 'Ready now': 3 } as Record<string, number>,
  budget:    { 'Under $500 / mo': 0, '$500–$2,000 / mo': 2, '$2,000+ / mo': 3, 'Not sure yet': 1 } as Record<string, number>,
}

async function appendToSheet(row: string[]) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    ?.replace(/\\n/g, '\n')
    ?.replace(/^["']|["']$/g, '')
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
    range: 'Sheet1!A:I',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, email, page } = body as {
      answers: string[]
      email: string
      page: string
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const isDemoGate = page === 'demo_gate' || page === 'chatbot'
    const timestamp = new Date().toISOString()
    let row: string[]
    let score: number

    if (isDemoGate) {
      // 5-answer demo gate: [role, teamSize, challenge, timeline, budget]
      const [role = '', teamSize = '', challenge = '', timeline = '', budget = ''] = answers
      score =
        (SCORE_MAP.role[role] ?? 0) +
        (SCORE_MAP.teamSize[teamSize] ?? 0) +
        (SCORE_MAP.challenge[challenge] ?? 0) +
        (SCORE_MAP.timeline[timeline] ?? 0) +
        (SCORE_MAP.budget[budget] ?? 0)
      row = [timestamp, email, role, teamSize, challenge, timeline, budget, String(score), page]
    } else {
      // Legacy 3-answer chat widget: [intent, teamSize, timeline]
      const [intent = '', teamSize = '', timeline = ''] = answers
      score =
        (SCORE_MAP.teamSize[teamSize] ?? 0) +
        (SCORE_MAP.timeline[timeline] ?? 0)
      row = [timestamp, email, intent, teamSize, '', timeline, '', String(score), page ?? 'chat_widget']
    }

    await appendToSheet(row).catch(err => console.error('Sheets error:', err))

    // PostHog
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (posthogKey) {
      const [role, teamSize, challenge, timeline, budget] = isDemoGate ? answers : ['', answers[1], '', answers[2], '']
      fetch('https://app.posthog.com/capture/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: posthogKey,
          event: isDemoGate ? 'demo_lead_captured' : 'lead_captured',
          distinct_id: email,
          properties: {
            email,
            source: page ?? 'chat_widget',
            ...(isDemoGate ? { role, team_size: teamSize, challenge, timeline, budget } : { intent: answers[0], team_size: teamSize, timeline }),
            score,
            $set: { email, lead_source: isDemoGate ? 'demo_gate' : 'chat_widget' },
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
          attributes: { SOURCE: page ?? 'chat_widget' },
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
