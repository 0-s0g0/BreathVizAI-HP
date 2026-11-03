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

// IP ごとの簡易レート制限（Edge のインスタンス単位で保持されるベストエフォート）
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const requestLog = new Map<string, number[]>()

const isRateLimited = (ip: string) => {
  const now = Date.now()
  const recent = (requestLog.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent)
    return true
  }
  recent.push(now)
  requestLog.set(ip, recent)

  if (requestLog.size > 10000) {
    for (const [key, times] of requestLog) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) requestLog.delete(key)
    }
  }
  return false
}

const getClientIp = (request: NextRequest) =>
  request.headers.get('cf-connecting-ip') ??
  request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
  'unknown'

// Cloudflare Turnstile のトークン検証
const verifyTurnstile = async (token: unknown, ip: string) => {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn('TURNSTILE_SECRET_KEY is not set; skipping CAPTCHA verification')
    return true
  }
  if (typeof token !== 'string' || !token || token.length > 2048) return false

  const formData = new FormData()
  formData.append('secret', secret)
  formData.append('response', token)
  if (ip !== 'unknown') formData.append('remoteip', ip)

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) return false
  const result = (await response.json()) as { success?: boolean }
  return result.success === true
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, organization, message, website, turnstileToken } = body

    // ハニーポット: 人間には見えない項目に入力があればボットとみなし、送信せず成功を返す
    if (website) {
      return NextResponse.json(
        { message: 'Message sent successfully' },
        { status: 200 }
      )
    }

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

    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed' },
        { status: 403 }
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
