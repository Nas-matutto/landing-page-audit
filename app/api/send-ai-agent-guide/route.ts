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
            SOURCE: 'guide_ai_agent_readiness',
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
      buildLeadRow({ email, firstName, lastName, page: 'guide - AI Agent Readiness Audit' })
    ).catch(err => console.error('Sheets error (guide):', err))

    // Resend — send email with PDF attached
    const resendKey = process.env.RESEND_API_KEY?.trim()
    if (!resendKey) {
      console.warn('RESEND_API_KEY is not set — skipping email send')
    } else {
      const resend = new Resend(resendKey)

      const pdfPath = path.join(process.cwd(), 'public', 'guides', 'ai-agent-readiness-audit.pdf')
      const pdfBuffer = fs.readFileSync(pdfPath)

      const { error } = await resend.emails.send({
        from: EMAIL_FROM,
        replyTo: REPLY_TO,
        to: [email],
        subject: 'Your AI Agent Readiness Audit is here',
        html: guideEmail({
          firstName,
          title: "AI Agent Readiness Audit",
          what: "it's attached as a PDF: 20 questions across five parts of your business, so you can see where an AI agent would help most.",
          steps: [
            "Answer honestly. There are no right answers, only an accurate picture.",
            "Add up each section, then your total out of 60. Lower means more room to automate.",
            "Your two lowest sections are where your first agent should start.",
          ],
          reply: "Want to talk through what you find? Just reply. Happy to help.",
          source: "guide_ai_agent_readiness",
        }),
        attachments: [
          {
            filename: 'ai-agent-readiness-audit.pdf',
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
    console.error('Send AI agent guide error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
