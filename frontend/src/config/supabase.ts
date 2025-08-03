import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour l'authentification
export interface AuthUser {
  id: string
  email: string
  nom: string
  prenom: string
  created_at: string
}

export interface SignUpData {
  email: string
  password: string
  nom: string
  prenom: string
}

export interface SignInData {
  email: string
  password: string
} 