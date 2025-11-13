import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const [settingsRes, scheduleRes, featuresRes] = await Promise.all([
      supabase.from('livestream_settings').select('*').single(),
      supabase.from('livestream_schedule').select('*').order('day'),
      supabase.from('livestream_features').select('*').order('id')
    ])

    return NextResponse.json({
      settings: settingsRes.data || {
        title: "Join Us Online",
        description: "Can't make it to church in person? Join us online for live worship services and special events.",
        streamUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        isLive: false,
        heroImage: "/placeholder.svg?height=400&width=1200",
        ctaTitle: "Join Us In Person Too!",
        ctaDescription: "While we love having you online, we'd also love to meet you in person. Come visit us anytime!",
        next_service: {
          date: "2024-04-07",
          time: "10:00 AM",
          service: "Sunday Worship Service"
        }
      },
      schedule: scheduleRes.data || [
        { day: "Sunday", time: "10:00 AM", service: "Main Worship Service" },
        { day: "Sunday", time: "6:00 PM", service: "Evening Service" },
        { day: "Wednesday", time: "7:00 PM", service: "Prayer Meeting" },
        { day: "Thursday", time: "7:00 PM", service: "Bible Study" }
      ],
      features: featuresRes.data || [
        {
          title: "High Quality Stream",
          description: "Crystal clear video and audio quality ensures you don't miss a moment of worship.",
          icon: "Wifi"
        },
        {
          title: "Interactive Community",
          description: "Connect with other viewers and participate in our online community during services.",
          icon: "Users"
        },
        {
          title: "Never Miss a Service",
          description: "Can't make it in person? Join us online and be part of our worship community from anywhere.",
          icon: "Calendar"
        }
      ]
    })
  } catch (error) {
    console.error('Error fetching livestream data:', error)
    return NextResponse.json({ error: 'Failed to fetch livestream data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    switch (type) {
      case 'settings':
        const { error: settingsError } = await supabase
          .from('livestream_settings')
          .upsert(data)
        
        if (settingsError) throw settingsError
        break

      case 'schedule':
        await supabase.from('livestream_schedule').delete().neq('id', 0)
        const { error: scheduleError } = await supabase
          .from('livestream_schedule')
          .insert(data)
        
        if (scheduleError) throw scheduleError
        break

      case 'features':
        await supabase.from('livestream_features').delete().neq('id', 0)
        const { error: featuresError } = await supabase
          .from('livestream_features')
          .insert(data)
        
        if (featuresError) throw featuresError
        break

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating livestream data:', error)
    return NextResponse.json({ error: 'Failed to update livestream data' }, { status: 500 })
  }
}