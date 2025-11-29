import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('leadership')
    .select('*')
    .order('position')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const response = NextResponse.json(data)
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  return response
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  const { data, error } = await supabase
    .from('leadership')
    .insert([body])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}