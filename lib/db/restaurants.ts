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

  const [{ data: restaurants, error: restaurantsError }, { data: profiles }] = await Promise.all([
    supabase.from('restaurants').select('*').order('created_at', { ascending: false }),
    supabase.from('profiles').select('user_id, name, email'),
  ])

  if (restaurantsError || !restaurants) return []

  const profileByUserId = new Map(
    (profiles ?? []).map(p => [p.user_id, p])
  )

  return restaurants.map((restaurant) => {
    const profile = profileByUserId.get(restaurant.owner_user_id)
    return {
      ...(restaurant as Restaurant),
      owner_name: profile?.name,
      owner_email: profile?.email,
    }
  })
}
