import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Profile } from '@/types/database'

export async function getAllProfiles(): Promise<Array<Profile & { restaurant_name?: string; restaurant_segment?: string }>> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return []

  const { data } = await supabase
    .from('profiles')
    .select(`
      *,
      restaurants!restaurants_owner_user_id_fkey (
        name,
        segment
      )
    `)
    .order('created_at', { ascending: false })

  if (!data) return []

  return data.map((p: Record<string, unknown>) => {
    const restaurants = p.restaurants as Array<{ name?: string; segment?: string }> | null
    const restaurant = Array.isArray(restaurants) ? restaurants[0] : restaurants
    return {
      ...(p as unknown as Profile),
      restaurant_name: restaurant?.name,
      restaurant_segment: restaurant?.segment,
    }
  })
}

export async function getProfileByUserId(userId: string): Promise<Profile | null> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  return (data as Profile) ?? null
}
