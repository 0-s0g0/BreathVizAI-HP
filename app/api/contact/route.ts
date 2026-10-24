import { NextRequest, NextResponse } from 'next/server'

// Cloudflare Pages requires Edge Runtime
export const runtime = 'edge'

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const EMAIL_PATTERN = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, organization, message } = body

    console.log('Contact form data:', { name, email, organization, messageLength: message?.length })

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      (organization != null && typeof organization !== 'string') ||
      name.length > 200 ||
      email.length > 254 ||
      (organization?.length ?? 0) > 200 ||
      message.length > 5000 ||
      !EMAIL_PATTERN.test(email)
    ) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    // APIキーの確認
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables')
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    console.log('Attempting to send email via Resend...')

    // Resend API を直接呼び出し（Edge Runtime対応）
    const contactEmail = process.env.CONTACT_EMAIL || 'info@0-s0g0.com'
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'BreathVizAI お問い合わせ <noreply@0-s0g0.com>',
        to: [contactEmail],
        reply_to: email,
        subject: `【お問い合わせ】${organization ? `${organization} - ` : ''}${name}様より`,
        html: `
          <h2>新しいお問い合わせが届きました</h2>
          <p><strong>お名前:</strong> ${escapeHtml(name)}</p>
          <p><strong>メールアドレス:</strong> ${escapeHtml(email)}</p>
          ${organization ? `<p><strong>組織名:</strong> ${escapeHtml(organization)}</p>` : ''}
          <h3>メッセージ:</h3>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 502 }
      )
    }

    const data = await response.json()
    console.log('Email sent successfully:', data)

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
