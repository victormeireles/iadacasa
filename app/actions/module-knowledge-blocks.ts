'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils'
import type {
  KnowledgeBlock,
  ModuleKnowledgeBlockUsageType,
} from '@/types/database'

export interface ModuleBlockInput {
  title: string
  slug?: string
  type: KnowledgeBlock['type']
  status: KnowledgeBlock['status']
  content_markdown: string
  version?: number
  usage_type: ModuleKnowledgeBlockUsageType
  required: boolean
  order_index: number
}

function revalidateModulePaths(moduleId: string) {
  revalidatePath('/admin/modulos')
  revalidatePath(`/admin/modulos/${moduleId}`)
}

export async function createModuleKnowledgeBlock(moduleId: string, input: ModuleBlockInput) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const { data: { user } } = await supabase.auth.getUser()
  const slug = input.slug || slugify(input.title)

  const { data: block, error: blockError } = await supabase
    .from('knowledge_blocks')
    .insert({
      title: input.title,
      slug,
      type: input.type,
      status: input.status,
      content_markdown: input.content_markdown,
      version: input.version ?? 1,
      created_by: user?.id,
    })
    .select()
    .single()

  if (blockError) return { error: blockError.message }

  const { error: linkError } = await supabase
    .from('module_knowledge_blocks')
    .insert({
      module_id: moduleId,
      knowledge_block_id: block.id,
      usage_type: input.usage_type,
      required: input.required,
      order_index: input.order_index,
    })

  if (linkError) return { error: linkError.message }

  revalidateModulePaths(moduleId)
  return { data: block as KnowledgeBlock }
}

export async function updateModuleKnowledgeBlock(
  moduleId: string,
  blockId: string,
  linkId: string,
  input: ModuleBlockInput
) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const { data: existing } = await supabase
    .from('knowledge_blocks')
    .select('content_markdown, version')
    .eq('id', blockId)
    .single()

  const contentChanged = existing && input.content_markdown !== existing.content_markdown

  const { error: blockError } = await supabase
    .from('knowledge_blocks')
    .update({
      title: input.title,
      slug: input.slug,
      type: input.type,
      status: input.status,
      content_markdown: input.content_markdown,
      ...(contentChanged ? { version: (existing?.version ?? 1) + 1 } : {}),
    })
    .eq('id', blockId)

  if (blockError) return { error: blockError.message }

  const { error: linkError } = await supabase
    .from('module_knowledge_blocks')
    .update({
      usage_type: input.usage_type,
      required: input.required,
      order_index: input.order_index,
    })
    .eq('id', linkId)

  if (linkError) return { error: linkError.message }

  revalidateModulePaths(moduleId)
  return { success: true }
}

export async function unlinkModuleKnowledgeBlock(moduleId: string, linkId: string) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const { error } = await supabase
    .from('module_knowledge_blocks')
    .delete()
    .eq('id', linkId)
    .eq('module_id', moduleId)

  if (error) return { error: error.message }

  revalidateModulePaths(moduleId)
  return { success: true }
}

export async function reorderModuleKnowledgeBlocks(
  moduleId: string,
  orderedLinkIds: string[]
) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const updates = orderedLinkIds.map((linkId, index) =>
    supabase
      .from('module_knowledge_blocks')
      .update({ order_index: index })
      .eq('id', linkId)
      .eq('module_id', moduleId)
  )

  const results = await Promise.all(updates)
  const failed = results.find(r => r.error)
  if (failed?.error) return { error: failed.error.message }

  revalidateModulePaths(moduleId)
  return { success: true }
}
