import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST() {
  try {
    // Insert default settings directly (table will be created automatically by Supabase)
    const { error: settingsError } = await supabase.from('livestream_settings').upsert({
      title: 'Join Us Online',
      description: 'Can\'t make it to church in person? Join us online for live worship services and special events.',
      stream_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      is_live: false,
      hero_image: '/placeholder.svg?height=400&width=1200',
      cta_title: 'Join Us In Person Too!',
      cta_description: 'While we love having you online, we\'d also love to meet you in person. Come visit us anytime!',
      next_service: {
        date: '2024-04-07',
        time: '10:00 AM',
        service: 'Sunday Worship Service'
      }
    })

    if (settingsError) {
      console.log('Settings error (table may not exist):', settingsError)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database setup attempted',
      note: 'You need to create tables manually in Supabase dashboard'
    })
  } catch (error) {
    console.error('Database setup error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Database setup failed', 
      message: 'Please create tables manually in Supabase dashboard using the SQL script'
    })
  }
}