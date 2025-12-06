import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Test connection and check what data exists
    const [settingsRes, scheduleRes, featuresRes] = await Promise.all([
      supabase.from('livestream_settings').select('*'),
      supabase.from('livestream_schedule').select('*'),
      supabase.from('livestream_features').select('*')
    ])

    return NextResponse.json({
      success: true,
      connection: 'Connected to Supabase',
      data: {
        settings: {
          count: settingsRes.data?.length || 0,
          data: settingsRes.data,
          error: settingsRes.error
        },
        schedule: {
          count: scheduleRes.data?.length || 0,
          data: scheduleRes.data,
          error: scheduleRes.error
        },
        features: {
          count: featuresRes.data?.length || 0,
          data: featuresRes.data,
          error: featuresRes.error
        }
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Failed to connect to database'
    }, { status: 500 })
  }
}