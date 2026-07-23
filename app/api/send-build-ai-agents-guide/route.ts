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

      const pdfPath = path.join(process.cwd(), 'public', 'guides', 'how-to-build-ai-agents.pdf')
      const pdfBuffer = fs.readFileSync(pdfPath)

      const { error } = await resend.emails.send({
        from: 'Nas <nas@talktomedata.com>',
        to: [email],
        subject: 'Your guide: How to Build AI Agents',
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1e293b;">
            <p style="font-size: 16px; margin-bottom: 16px;">Hey,</p>
            <p style="font-size: 16px; margin-bottom: 16px;">
              Thanks for grabbing <strong>How to Build AI Agents</strong>!
            </p>
            <p style="font-size: 16px; margin-bottom: 16px;">
              I've attached the PDF to this email. It walks you through the everyday work worth automating,
              how to build your first agent in Claude step by step, the real limitations of the DIY path,
              and the done-for-you alternative.
            </p>
            <p style="font-size: 16px; margin-bottom: 8px;">A few tips to get the most out of it:</p>
            <ul style="font-size: 15px; padding-left: 20px; margin-bottom: 24px; line-height: 1.8;">
              <li>Start with Section 1 — it maps the tasks that are the best fit for an agent</li>
              <li>Follow the Claude setup steps to build your first agent today</li>
              <li>Read the limitations section before you commit a business-critical workflow to the DIY path</li>
            </ul>
            <p style="font-size: 16px; margin-bottom: 24px;">
              If you'd rather we just build and host it for you, reply to this email — happy to help.
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
