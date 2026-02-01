import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // APIキーの確認
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error: API key not set' },
        { status: 500 }
      )
    }

    console.log('Attempting to send email via Resend...')

    // Resendでメール送信
    const contactEmail = process.env.CONTACT_EMAIL || 'info@0-s0g0.com'
    const { data, error } = await resend.emails.send({
      from: 'BreathVizAI お問い合わせ <noreply@0-s0g0.com>',
      to: [contactEmail],
      replyTo: email,
      subject: `【お問い合わせ】${organization ? `${organization} - ` : ''}${name}様より`,
      html: `
        <h2>新しいお問い合わせが届きました</h2>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        ${organization ? `<p><strong>組織名:</strong> ${organization}</p>` : ''}
        <h3>メッセージ:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', data)

    return NextResponse.json(
      { message: 'Message sent successfully', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
