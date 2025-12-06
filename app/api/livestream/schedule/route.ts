import { NextRequest, NextResponse } from "next/server"
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('livestream_schedule')
      .select('*')
      .order('day')

    if (error) throw error

    const response = NextResponse.json(data || [])
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    return response
  } catch (error: any) {
    console.error('Error fetching schedule:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const scheduleItems = await request.json()
    
    // Delete existing schedule items
    await supabase.from('livestream_schedule').delete().neq('id', 0)
    
    // Insert new schedule items
    if (scheduleItems.length > 0) {
      const { data, error } = await supabase
        .from('livestream_schedule')
        .insert(scheduleItems)
        .select()
      
      if (error) throw error
      return NextResponse.json(data)
    }
    
    return NextResponse.json([])
  } catch (error: any) {
    console.error('Error saving schedule:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}