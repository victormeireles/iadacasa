import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { GeneratedPackage } from '@/types/database'

export async function getPackagesByRestaurant(restaurantId: string): Promise<GeneratedPackage[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return []

  const { data } = await supabase
    .from('generated_packages')
    .select('*, modules(name, slug)')
    .eq('restaurant_id', restaurantId)
    .eq('status', 'active')
    .order('generated_at', { ascending: false })

  return (data as GeneratedPackage[]) ?? []
}

export async function getPackageById(id: string): Promise<GeneratedPackage | null> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return null

  const { data } = await supabase
    .from('generated_packages')
    .select('*, modules(name, slug)')
    .eq('id', id)
    .single()

  return (data as GeneratedPackage) ?? null
}

export async function getAllPackages(): Promise<Array<GeneratedPackage & { module_name?: string; restaurant_name?: string }>> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return []

  const { data } = await supabase
    .from('generated_packages')
    .select('*, modules(name, slug), restaurants(name)')
    .eq('status', 'active')
    .order('generated_at', { ascending: false })

  if (!data) return []

  return data.map((p: Record<string, unknown>) => ({
    ...(p as unknown as GeneratedPackage),
    module_name: (p.modules as { name?: string } | null)?.name,
    restaurant_name: (p.restaurants as { name?: string } | null)?.name,
  }))
}
