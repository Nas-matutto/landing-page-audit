import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
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
          attributes: { SOURCE: 'guide_automation_checklist' },
        }),
      })

      if (!brevoRes.ok) {
        const errText = await brevoRes.text()
        console.error(`Brevo error ${brevoRes.status}:`, errText)
      }
    }

    // Resend — send email with PDF attached
    const resendKey = process.env.RESEND_API_KEY?.trim()
    if (!resendKey) {
      console.warn('RESEND_API_KEY is not set — skipping email send')
    } else {
      const resend = new Resend(resendKey)
      const fromEmail = 'Nas <nas@talktomedata.com>'

      const pdfPath = path.join(process.cwd(), 'public', 'guides', 'automate-by-friday-checklist.pdf')
      const pdfBuffer = fs.readFileSync(pdfPath)

      const { error } = await resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: 'Your Business Automation Checklist is here',
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1e293b;">
            <p style="font-size: 16px; margin-bottom: 16px;">Hey,</p>
            <p style="font-size: 16px; margin-bottom: 16px;">
              Thanks for grabbing the <strong>Automate by Friday Checklist</strong>!
            </p>
            <p style="font-size: 16px; margin-bottom: 16px;">
              I've attached the PDF to this email. Inside you'll find a step-by-step guide to identifying
              which tasks in your business are draining your time — and exactly how to automate them this week.
            </p>
            <p style="font-size: 16px; margin-bottom: 8px;">A few things to get the most out of it:</p>
            <ul style="font-size: 15px; padding-left: 20px; margin-bottom: 24px; line-height: 1.8;">
              <li>Work through Section 1 first — it'll show you where you're losing the most time</li>
              <li>Focus on your top 3 tasks before moving on to everything else</li>
              <li>Use the tools column to find the right automation for each task</li>
            </ul>
            <p style="font-size: 16px; margin-bottom: 24px;">
              If you get stuck or want help setting something up, just reply to this email — I read every one.
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
