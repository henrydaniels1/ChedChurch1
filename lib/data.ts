import { supabase } from '@/lib/supabase'

export const revalidate = 0

export async function getPrograms() {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching programs:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Programs fetch failed:', error)
    return []
  }
}

export async function getAnnouncements() {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching announcements:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Announcements fetch failed:', error)
    return []
  }
}

export async function getHomepageContent() {
  try {
    const { data, error } = await supabase
      .from('homepage_content')
      .select('*')

    if (error) {
      console.error('Error fetching homepage content:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Homepage content fetch failed:', error)
    return []
  }
}

export async function getArchives() {
  try {
    const { data, error } = await supabase
      .from('archives')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching archives:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Archives fetch failed:', error)
    return []
  }
}

export async function getLeadership() {
  try {
    const { data, error } = await supabase
      .from('leadership')
      .select('*')
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching leadership:', error)
      throw error
    }
    return data || []
  } catch (error) {
    console.error('Leadership fetch failed:', error)
    return []
  }
}