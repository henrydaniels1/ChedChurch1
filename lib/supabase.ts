import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bcmmlrlabyzizvcgxxzf.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbW1scmxhYnl6aXp2Y2d4eHpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5ODkzNDgsImV4cCI6MjA3ODU2NTM0OH0.alUzfGlFtDUgNu3NI08pvCleyVQoM-VdDNePv1G2o-U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)