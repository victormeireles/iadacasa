import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Restaurant } from '@/types/database'

export async function getRestaurantByUserId(userId: string): Promise<Restaurant | null> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return null

  const { data } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_user_id', userId)
    .order('created_at')
    .limit(1)
    .single()

  return (data as Restaurant) ?? null
}

export async function getAllRestaurants(): Promise<Array<Restaurant & { owner_name?: string; owner_email?: string }>> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return []

  const { data } = await supabase
    .from('restaurants')
    .select(`
      *,
      profiles!restaurants_owner_user_id_fkey (
        name,
        email
      )
    `)
    .order('created_at', { ascending: false })

  if (!data) return []

  return data.map((r: Record<string, unknown>) => {
    const profile = r.profiles as { name?: string; email?: string } | null
    return {
      ...(r as unknown as Restaurant),
      owner_name: profile?.name,
      owner_email: profile?.email,
    }
  })
}
