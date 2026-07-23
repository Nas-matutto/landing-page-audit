import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import fs from 'fs'
import path from 'path'
import { appendLeadRow, buildLeadRow } from '@/lib/leads-sheet'
import { isLikelyBot } from '@/lib/bot-filter'

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
        from: 'Nas <nas@talktomedata.com>',
        to: [email],
        subject: 'Your AI Agent Readiness Audit is here',
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1e293b;">
            <p style="font-size: 16px; margin-bottom: 16px;">Hey,</p>
            <p style="font-size: 16px; margin-bottom: 16px;">
              Thanks for grabbing the <strong>AI Agent Readiness Audit</strong>!
            </p>
            <p style="font-size: 16px; margin-bottom: 16px;">
              I've attached the PDF to this email. It'll walk you through exactly where your business
              stands today and which areas are most ready for an AI agent — so you're not guessing
              where to start.
            </p>
            <p style="font-size: 16px; margin-bottom: 8px;">A few tips to get the most out of it:</p>
            <ul style="font-size: 15px; padding-left: 20px; margin-bottom: 24px; line-height: 1.8;">
              <li>Go through Section 1 honestly — it's designed to reveal blind spots, not validate what you already think</li>
              <li>Pay attention to the scoring at the end — it'll tell you whether you're ready to start with AI agents now or in a few months</li>
              <li>The last section has specific next steps based on your score</li>
            </ul>
            <p style="font-size: 16px; margin-bottom: 24px;">
              If you want to talk through what you find, just reply to this email. Happy to help.
            </p>
            <p style="font-size: 16px;">
              — Nas
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
            <p style="font-size: 13px; color: #94a3b8;">
              You're receiving this because you downloaded a free guide from
              <a href="https://talktomedata.com" style="color: #185FA5;">talktomedata.com</a>.
            </p>
          </div>
        `,
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
