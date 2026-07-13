import { NextRequest, NextResponse } from 'next/server'
import { appendLeadRow, updateLeadRow, buildLeadRow } from '@/lib/leads-sheet'

const SCORE_MAP = {
  role:      { 'Founder / CEO': 3, 'Operations or Finance': 2, 'Marketing or Sales': 2, 'IT / Developer': 1, 'Other': 0 } as Record<string, number>,
  teamSize:  { 'Just me': 0, '2–10 people': 1, '1–10 people': 1, '11–50 people': 2, '51–200 people': 1, '50+ people': 3, '200+ people': 1 } as Record<string, number>,
  challenge: {
    // Legacy demo-gate bottleneck labels
    'Too much manual admin': 2, 'Slow lead follow-up': 2, 'Customer support volume': 2, 'Reporting & analytics': 2, 'Social media content': 2,
    // "What do you want to automate?" labels from the /get-started flow
    'Customer support': 2, 'Lead qualification & follow-up': 2, 'Booking & scheduling': 2, 'Invoice / document processing': 2, 'Data entry & reporting': 2,
    'Other': 1,
  } as Record<string, number>,
  timeline:  { 'Just exploring': 0, '1–3 months': 1, 'Within 3 months': 1, 'Ready now': 3 } as Record<string, number>,
  budget:    { 'Under $500 / mo': 0, '$500–$2,000 / mo': 2, '$2,000+ / mo': 3, 'Not sure yet': 1 } as Record<string, number>,
}

// Highest possible raw total for each flow, derived from SCORE_MAP so it stays
// correct if the weights above change.
const maxOf = (m: Record<string, number>) => Math.max(0, ...Object.values(m))
const DEMO_MAX = maxOf(SCORE_MAP.role) + maxOf(SCORE_MAP.teamSize) + maxOf(SCORE_MAP.challenge) + maxOf(SCORE_MAP.timeline) + maxOf(SCORE_MAP.budget)
const CHAT_MAX = maxOf(SCORE_MAP.teamSize) + maxOf(SCORE_MAP.timeline)

// Normalise a raw score onto a 1–10 scale: 1 = least important lead, 10 = highest.
function to10(raw: number, max: number): number {
  if (max <= 0) return 1
  return Math.max(1, Math.min(10, Math.round(1 + (raw / max) * 9)))
}

async function addToBrevo(email: string, source: string, toolsStr: string) {
  const brevoKey = process.env.BREVO_API_KEY?.trim()
  const brevoListId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID.trim(), 10) : null
  if (!brevoKey) return

  const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': brevoKey },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      attributes: {
        SOURCE: source,
        ...(toolsStr ? { TOOLS: toolsStr } : {}),
      },
      ...(brevoListId && !isNaN(brevoListId) ? { listIds: [brevoListId] } : {}),
    }),
  })
  if (!brevoRes.ok) {
    const errText = await brevoRes.text()
    console.error(`Brevo error ${brevoRes.status}:`, errText)
  }
}

function capturePosthog(event: string, email: string, properties: Record<string, unknown>) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!posthogKey) return
  fetch('https://app.posthog.com/capture/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: posthogKey,
      event,
      distinct_id: email,
      properties: { email, ...properties },
    }),
  }).catch(err => console.error('PostHog error:', err))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, email, page, tools, stage, rowRange } = body as {
      answers?: string[]
      email: string
      page: string
      tools?: string[]
      stage?: 'partial' | 'complete'
      rowRange?: string
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const source = page ?? 'chat_widget'

    // ── Partial (email-first) — save the email now so a drop-off is still captured.
    // Writes a stub row (blank answers) and returns its range for later completion.
    if (stage === 'partial') {
      const stubRow = buildLeadRow({ email, page: source })
      const range = await appendLeadRow(stubRow).catch(err => {
        console.error('Sheets error (partial):', err)
        return undefined
      })
      await addToBrevo(email, source, '')
      capturePosthog('lead_started', email, { source, $set: { email, lead_source: source } })
      return NextResponse.json({ success: true, rowRange: range })
    }

    // ── Complete — full qualification payload.
    const safeAnswers = Array.isArray(answers) ? answers : []
    const toolsStr = Array.isArray(tools) ? tools.join(', ') : ''
    const isDemoGate = page === 'demo_gate' || page === 'chatbot' || page === 'get_started'
    let row: string[]
    let score: number

    if (isDemoGate) {
      // 5-answer demo gate / get-started: [role, teamSize, challenge, timeline, budget]
      const [role = '', teamSize = '', challenge = '', timeline = '', budget = ''] = safeAnswers
      const raw =
        (SCORE_MAP.role[role] ?? 0) +
        (SCORE_MAP.teamSize[teamSize] ?? 0) +
        (SCORE_MAP.challenge[challenge] ?? 0) +
        (SCORE_MAP.timeline[timeline] ?? 0) +
        (SCORE_MAP.budget[budget] ?? 0)
      score = to10(raw, DEMO_MAX)
      row = buildLeadRow({ email, role, teamSize, challenge, timeline, budget, score, page: source, tools: toolsStr })
    } else {
      // Legacy 3-answer chat widget: [intent, teamSize, timeline]
      const [intent = '', teamSize = '', timeline = ''] = safeAnswers
      const raw =
        (SCORE_MAP.teamSize[teamSize] ?? 0) +
        (SCORE_MAP.timeline[timeline] ?? 0)
      score = to10(raw, CHAT_MAX)
      // Legacy layout kept intent in the role column (C).
      row = buildLeadRow({ email, role: intent, teamSize, timeline, score, page: source, tools: toolsStr })
    }

    // Update the partial row in place if we have its range; otherwise append a fresh row.
    if (rowRange) {
      await updateLeadRow(rowRange, row).catch(err => {
        console.error('Sheets update error — appending instead:', err)
        return appendLeadRow(row).catch(e => console.error('Sheets append fallback error:', e))
      })
    } else {
      await appendLeadRow(row).catch(err => console.error('Sheets error:', err))
    }

    // PostHog
    const [role, teamSize, challenge, timeline, budget] = isDemoGate
      ? safeAnswers
      : ['', safeAnswers[1], '', safeAnswers[2], '']
    capturePosthog(isDemoGate ? 'demo_lead_captured' : 'lead_captured', email, {
      source,
      ...(isDemoGate ? { role, team_size: teamSize, challenge, timeline, budget } : { intent: safeAnswers[0], team_size: teamSize, timeline }),
      ...(toolsStr ? { tools: toolsStr } : {}),
      score,
      $set: { email, lead_source: source },
    })

    await addToBrevo(email, source, toolsStr)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('qualify-lead error:', err)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}
