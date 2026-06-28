import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
    }

    // In production: call Supabase or email provider here
    // const { error } = await supabase.from('newsletter_subscribers').upsert({ email })
    // if (error) throw error

    // Simulate success for now
    console.log(`[Newsletter] New subscriber: ${email}`)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Newsletter] Error:', err)
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
