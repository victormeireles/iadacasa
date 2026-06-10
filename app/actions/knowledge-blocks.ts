'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils'
import type { KnowledgeBlock, KnowledgeBlockStatus } from '@/types/database'

export async function createKnowledgeBlock(input: Partial<KnowledgeBlock>) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const { data: { user } } = await supabase.auth.getUser()

  const slug = input.slug || slugify(input.title ?? '')

  const { data, error } = await supabase
    .from('knowledge_blocks')
    .insert({ ...input, slug, created_by: user?.id })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/admin/blocos')
  return { data }
}

export async function updateKnowledgeBlock(id: string, input: Partial<KnowledgeBlock>) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  // Bump version when content changes
  const updateData = input.content_markdown
    ? { ...input, version: (input.version ?? 1) + 1 }
    : input

  const { data, error } = await supabase
    .from('knowledge_blocks')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/admin/blocos')
  return { data }
}

export async function archiveKnowledgeBlock(id: string) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const { data, error } = await supabase
    .from('knowledge_blocks')
    .update({ status: 'archived' as KnowledgeBlockStatus })
    .eq('id', id)
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/admin/blocos')
  return { data }
}
