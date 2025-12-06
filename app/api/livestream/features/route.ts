import { NextRequest, NextResponse } from "next/server"
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('livestream_features')
      .select('*')
      .order('created_at')

    if (error) throw error

    const response = NextResponse.json(data || [])
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    return response
  } catch (error: any) {
    console.error('Error fetching features:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const features = await request.json()
    
    // Delete existing features
    await supabase.from('livestream_features').delete().neq('id', 0)
    
    // Insert new features
    if (features.length > 0) {
      const { data, error } = await supabase
        .from('livestream_features')
        .insert(features)
        .select()
      
      if (error) throw error
      return NextResponse.json(data)
    }
    
    return NextResponse.json([])
  } catch (error: any) {
    console.error('Error saving features:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}