import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qtwxnmhkcscmeoediyjt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0d3hubWhrY3NjbWVvZWRpeWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyOTc0MzIsImV4cCI6MjA3Nzg3MzQzMn0.bcWNC6qWFYOGX2DtyTDTpzKrW9UKPHc3meqbz2Jrnf8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
