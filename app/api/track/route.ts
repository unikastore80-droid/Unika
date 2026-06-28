import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { productId, platform } = await request.json()
    if (!productId || !platform) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // In production: save to Supabase click_events table
    // await supabase.from('click_events').insert({ product_id: productId, platform })

    console.log(`[Click] product=${productId} platform=${platform}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
