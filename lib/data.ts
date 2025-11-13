import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getPrograms() {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    return []
  }
}

export async function getAnnouncements() {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    return []
  }
}

export async function getHomepageContent() {
  try {
    const { data, error } = await supabase
      .from('homepage_content')
      .select('*')

    if (error) throw error
    return data || []
  } catch (error) {
    return []
  }
}

export async function getArchives() {
  try {
    const { data, error } = await supabase
      .from('archives')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    return []
  }
}

export async function getLeadership() {
  try {
    const { data, error } = await supabase
      .from('leadership')
      .select('*')
      .order('order', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    return []
  }
}