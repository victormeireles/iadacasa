import { createServerSupabaseClient } from '@/lib/supabase/server'
import { MOCK_MODULES } from '@/lib/mock/modules'
import type { Module } from '@/types/database'

export async function getPublicModules(): Promise<Module[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return MOCK_MODULES

  const { data } = await supabase
    .from('modules')
    .select('*')
    .in('status', ['active', 'coming_soon'])
    .order('order_index')

  return (data as Module[]) ?? MOCK_MODULES
}

export async function getAllModules(): Promise<Module[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return MOCK_MODULES

  const { data } = await supabase
    .from('modules')
    .select('*')
    .neq('status', 'archived')
    .order('order_index')

  return (data as Module[]) ?? MOCK_MODULES
}

export async function getModuleBySlug(slug: string): Promise<Module | null> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return MOCK_MODULES.find(m => m.slug === slug) ?? null

  const { data } = await supabase
    .from('modules')
    .select('*')
    .eq('slug', slug)
    .single()

  return (data as Module) ?? null
}

export async function getModuleById(id: string): Promise<Module | null> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return MOCK_MODULES.find(m => m.id === id) ?? null

  const { data } = await supabase
    .from('modules')
    .select('*')
    .eq('id', id)
    .single()

  return (data as Module) ?? null
}
