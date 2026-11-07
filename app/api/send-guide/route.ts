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
            SOURCE: 'guide_automation_checklist',
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
      buildLeadRow({ email, firstName, lastName, page: 'guide - Business Automation Checklist' })
    ).catch(err => console.error('Sheets error (guide):', err))

    // Resend — send email with PDF attached
    const resendKey = process.env.RESEND_API_KEY?.trim()
    if (!resendKey) {
      console.warn('RESEND_API_KEY is not set — skipping email send')
    } else {
      const resend = new Resend(resendKey)
      const fromEmail = EMAIL_FROM

      const pdfPath = path.join(process.cwd(), 'public', 'guides', 'automate-by-friday-checklist.pdf')
      const pdfBuffer = fs.readFileSync(pdfPath)

      const { error } = await resend.emails.send({
        from: fromEmail,
        replyTo: REPLY_TO,
        to: [email],
        subject: 'Your Business Automation Checklist is here',
        html: guideEmail({
          firstName,
          title: "Automate by Friday Checklist",
          what: "it's attached as a PDF: 18 everyday tasks most small businesses still do by hand, across sales, support, scheduling, admin and marketing.",
          steps: [
            "Tick every task that's even partly manual. Don't overthink it.",
            "Add up your ticks and read your result on the last page.",
            "Start where you ticked the most. That's where an agent saves the most time.",
          ],
          reply: "Stuck, or want help setting something up? Just reply. I read every one.",
          source: "guide_automation_checklist",
        }),
        attachments: [
          {
            filename: 'automate-by-friday-checklist.pdf',
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
    console.error('Send guide error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
