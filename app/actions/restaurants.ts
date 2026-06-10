'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { RestaurantSegment } from '@/types/database'

export interface CreateRestaurantInput {
  name: string
  segment: RestaurantSegment
  city?: string
  state?: string
  number_of_units: number
  operation_type?: string
  technical_level?: 'baixo' | 'medio' | 'alto'
  current_systems?: string
}

export async function createRestaurant(input: CreateRestaurantInput) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autenticado' }

  const { data, error } = await supabase
    .from('restaurants')
    .insert({ ...input, owner_user_id: user.id })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/app/dashboard')
  return { data }
}

export async function updateRestaurant(id: string, input: Partial<CreateRestaurantInput>) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const { data, error } = await supabase
    .from('restaurants')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/app/restaurante')
  revalidatePath('/app/dashboard')
  return { data }
}
