'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils'
import type { Module } from '@/types/database'

export async function createModule(input: Partial<Module>) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const slug = input.slug || slugify(input.name ?? '')

  const { data, error } = await supabase
    .from('modules')
    .insert({ ...input, slug })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/admin/modulos')
  revalidatePath('/app/solucoes')
  return { data }
}

export async function updateModule(id: string, input: Partial<Module>) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const { data, error } = await supabase
    .from('modules')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/admin/modulos')
  revalidatePath('/app/solucoes')
  return { data }
}

export async function archiveModule(id: string) {
  return updateModule(id, { status: 'archived' })
}
