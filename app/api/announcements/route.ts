import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      return NextResponse.json([])
    }

    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error: any) {
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  const { data, error } = await supabase
    .from('announcements')
    .insert([body])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}