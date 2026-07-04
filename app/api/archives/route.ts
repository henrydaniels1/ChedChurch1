import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {


    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'

    let query = supabase.from('archives').select('*')
    
    if (type !== 'all') {
      query = query.eq('type', type)
    }

    const { data, error } = await query.order('date', { ascending: false })

    if (error) throw error
    const response = NextResponse.json(data || [])
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    return response
  } catch (error: any) {
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  const { data, error } = await supabase
    .from('archives')
    .insert([body])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { id, ...updates } = body

  const { data, error } = await supabase
    .from('archives')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json()

  const { error } = await supabase.from('archives').delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}