import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('homepage_content')
      .select('*')

    if (error) {
      console.error('Supabase error:', error)
      // Return empty array as fallback
      return NextResponse.json([])
    }
    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('Homepage API error:', error)
    return NextResponse.json([], { status: 200 }) // Return empty array instead of error
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, ...updateData } = body
    
    const { data, error } = await supabase
      .from('homepage_content')
      .upsert({ section, ...updateData })
      .select()

    if (error) throw error
    return NextResponse.json(data[0])
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}