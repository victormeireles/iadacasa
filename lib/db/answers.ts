import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { ClientModuleAnswers } from '@/types/database'

export async function getBaseAnswersForRestaurant(
  restaurantId: string,
): Promise<Record<string, unknown> | null> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return null

  const { data } = await supabase
    .from('client_module_answers')
    .select('answers_json')
    .eq('restaurant_id', restaurantId)
    .is('module_id', null)
    .maybeSingle()

  if (!data?.answers_json || typeof data.answers_json !== 'object') return null
  return data.answers_json as Record<string, unknown>
}

export async function getBaseAnswersRecord(
  restaurantId: string,
): Promise<ClientModuleAnswers | null> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return null

  const { data } = await supabase
    .from('client_module_answers')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .is('module_id', null)
    .maybeSingle()

  return (data as ClientModuleAnswers | null) ?? null
}
