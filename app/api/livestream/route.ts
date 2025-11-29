import { NextRequest, NextResponse } from "next/server"
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const [settingsRes, scheduleRes, featuresRes] = await Promise.all([
      supabase.from('livestream_settings').select('*').limit(1).single(),
      supabase.from('livestream_schedule').select('*').order('day'),
      supabase.from('livestream_features').select('*').order('created_at')
    ])

    const response = NextResponse.json({
      settings: settingsRes.data || {
        title: "Join Us Online",
        description: "Can't make it to church in person? Join us online for live worship services and special events.",
        stream_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        is_live: false,
        hero_image: "/placeholder.svg?height=400&width=1200",
        cta_title: "Join Us In Person Too!",
        cta_description: "While we love having you online, we'd also love to meet you in person. Come visit us anytime!",
        next_service: {
          date: "2024-04-07",
          time: "10:00 AM",
          service: "Sunday Worship Service"
        }
      },
      schedule: scheduleRes.data || [],
      features: featuresRes.data || []
    })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    return response
  } catch (error: any) {
    console.error('Error fetching livestream data:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle settings update/insert
    const { data: existingSettings } = await supabase
      .from('livestream_settings')
      .select('id')
      .limit(1)
      .single()
    
    if (existingSettings) {
      const { data, error } = await supabase
        .from('livestream_settings')
        .update(body)
        .eq('id', existingSettings.id)
        .select()
      
      if (error) throw error
      return NextResponse.json(data[0])
    } else {
      const { data, error } = await supabase
        .from('livestream_settings')
        .insert([body])
        .select()
      
      if (error) throw error
      return NextResponse.json(data[0], { status: 201 })
    }
  } catch (error: any) {
    console.error('Error updating livestream data:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    const { data, error } = await supabase
      .from('livestream_settings')
      .update(updateData)
      .eq('id', id)
      .select()

    if (error) throw error
    return NextResponse.json(data[0])
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}