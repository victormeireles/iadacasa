import { createServerSupabaseClient } from '@/lib/supabase/server'
import { MOCK_KNOWLEDGE_BLOCKS } from '@/lib/mock/knowledge-blocks'
import type { KnowledgeBlock } from '@/types/database'

export async function getActiveKnowledgeBlocks(): Promise<KnowledgeBlock[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return MOCK_KNOWLEDGE_BLOCKS.filter(b => b.status === 'active')

  const { data } = await supabase
    .from('knowledge_blocks')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  return (data as KnowledgeBlock[]) ?? MOCK_KNOWLEDGE_BLOCKS
}

export async function getAllKnowledgeBlocks(): Promise<KnowledgeBlock[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return MOCK_KNOWLEDGE_BLOCKS

  const { data } = await supabase
    .from('knowledge_blocks')
    .select('*')
    .neq('status', 'archived')
    .order('created_at', { ascending: false })

  return (data as KnowledgeBlock[]) ?? MOCK_KNOWLEDGE_BLOCKS
}

export async function getKnowledgeBlockById(id: string): Promise<KnowledgeBlock | null> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return MOCK_KNOWLEDGE_BLOCKS.find(b => b.id === id) ?? null

  const { data } = await supabase
    .from('knowledge_blocks')
    .select('*')
    .eq('id', id)
    .single()

  return (data as KnowledgeBlock) ?? null
}

export async function getBlocksByType(type: string): Promise<KnowledgeBlock[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return MOCK_KNOWLEDGE_BLOCKS.filter(b => b.type === type)

  const { data } = await supabase
    .from('knowledge_blocks')
    .select('*')
    .eq('type', type)
    .eq('status', 'active')

  return (data as KnowledgeBlock[]) ?? []
}
