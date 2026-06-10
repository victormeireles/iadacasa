import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { SessionUser } from '@/types/users'
import { MOCK_USER } from '@/lib/mock/users'

/**
 * Returns the current authenticated user (server-side).
 * Falls back to mock data when Supabase is not configured.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createServerSupabaseClient()

  if (!supabase) {
    // Supabase not configured — return mock user so the UI works
    return MOCK_USER
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return {
    id: user.id,
    email: user.email ?? '',
    name: profile?.name ?? user.email ?? '',
    role: profile?.role ?? 'client',
    restaurantId: undefined,
  }
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await getSessionUser()
  if (!user) throw new Error('Unauthenticated')
  return user
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireAuth()
  if (user.role !== 'admin' && user.role !== 'super_admin') {
    throw new Error('Forbidden')
  }
  return user
}

export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
