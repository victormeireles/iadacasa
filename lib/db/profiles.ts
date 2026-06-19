import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Profile } from '@/types/database'

export async function getAllProfiles(): Promise<Array<Profile & { restaurant_name?: string; restaurant_segment?: string }>> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return []

  const [{ data: profiles, error: profilesError }, { data: restaurants }] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    supabase.from('restaurants').select('owner_user_id, name, segment'),
  ])

  if (profilesError || !profiles) return []

  const restaurantByOwner = new Map(
    (restaurants ?? []).map(r => [r.owner_user_id, r])
  )

  return profiles.map((profile) => {
    const restaurant = restaurantByOwner.get(profile.user_id)
    return {
      ...(profile as Profile),
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
