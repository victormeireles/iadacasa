import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getMockInstalledModules, isMockFirstModule } from '@/lib/mock/installations'
import type { InstallationStatus } from '@/types/database'

const GENERATED_STATUSES: InstallationStatus[] = [
  'package_generated',
  'implementation_started',
  'installed',
  'validated',
]

export async function isFirstModuleForRestaurant(
  restaurantId: string,
  currentModuleId?: string
): Promise<boolean> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return isMockFirstModule(restaurantId, currentModuleId)

  let query = supabase
    .from('user_module_installations')
    .select('module_id')
    .eq('restaurant_id', restaurantId)
    .in('status', GENERATED_STATUSES)

  if (currentModuleId) {
    query = query.neq('module_id', currentModuleId)
  }

  const { data } = await query.limit(1)
  return !data || data.length === 0
}

export async function getInstalledModulesForRestaurant(restaurantId: string) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return getMockInstalledModules(restaurantId)

  const { data } = await supabase
    .from('user_module_installations')
    .select('module_id, status, modules(name)')
    .eq('restaurant_id', restaurantId)
    .in('status', GENERATED_STATUSES)

  return (data ?? []).map(row => {
    const modules = row.modules as { name: string } | { name: string }[] | null
    const name = Array.isArray(modules) ? modules[0]?.name : modules?.name
    return { name: name ?? 'Módulo', version: '1' }
  })
}
