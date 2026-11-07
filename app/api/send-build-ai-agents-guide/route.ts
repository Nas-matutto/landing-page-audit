import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import fs from 'fs'
import path from 'path'
import { appendLeadRow, buildLeadRow } from '@/lib/leads-sheet'
import { isLikelyBot } from '@/lib/bot-filter'
import { EMAIL_FROM, REPLY_TO } from '@/lib/email-from'
import { guideEmail } from '@/lib/email-layout'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName, hp } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // Bot filter — a filled honeypot or machine-random name means a crawler.
    // Accept (200) so it doesn't retry, but send no email and write nothing.
    if (isLikelyBot(hp, firstName, lastName)) {
      return NextResponse.json({ success: true })
    }

    // Brevo — add contact to list 5
    const brevoKey = process.env.BREVO_API_KEY?.trim()
    if (!brevoKey) {
      console.warn('BREVO_API_KEY is not set')
    } else {
      const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': brevoKey,
        },
        body: JSON.stringify({
          email,
          updateEnabled: true,
          listIds: [5],
          attributes: {
            SOURCE: 'guide_how_to_build_ai_agents',
            ...(firstName ? { FIRSTNAME: firstName } : {}),
            ...(lastName ? { LASTNAME: lastName } : {}),
          },
        }),
      })

      if (!brevoRes.ok) {
        const errText = await brevoRes.text()
        console.error(`Brevo error ${brevoRes.status}:`, errText)
      }
    }

    // Google Sheets — add to the Leads sheet, noting which guide they downloaded
    await appendLeadRow(
      buildLeadRow({ email, firstName, lastName, page: 'guide - How to Build AI Agents' })
    ).catch(err => console.error('Sheets error (guide):', err))

    // Resend — send email with PDF attached
    const resendKey = process.env.RESEND_API_KEY?.trim()
    if (!resendKey) {
      console.warn('RESEND_API_KEY is not set — skipping email send')
    } else {
      const resend = new Resend(resendKey)

      const pdfPath = path.join(process.cwd(), 'public', 'guides', 'how-to-build-ai-agents-Oct.25 v2.pdf')
      const pdfBuffer = fs.readFileSync(pdfPath)

      const { error } = await resend.emails.send({
        from: EMAIL_FROM,
        replyTo: REPLY_TO,
        to: [email],
        subject: 'Your guide: How to Build AI Agents',
        html: guideEmail({
          firstName,
          title: "How to Build AI Agents guide",
          what: "it's attached as a PDF: the work worth automating, how to build your first agent in Claude step by step, and where the DIY path falls short.",
          steps: [
            "Start with Section 1. It maps the tasks that fit an agent best.",
            "Follow the Claude setup steps to build your first agent today.",
            "Read the limitations before trusting a business-critical workflow to DIY.",
          ],
          reply: "Rather we build and host it for you? Just reply. Happy to help.",
          source: "guide_build_ai_agents",
        }),
        attachments: [
          {
            filename: 'how-to-build-ai-agents.pdf',
            content: pdfBuffer,
          },
        ],
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json({ error: `Email failed to send: ${error.message}` }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send build AI agents guide error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
