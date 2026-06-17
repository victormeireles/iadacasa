import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getMockBlocksForModule } from '@/lib/mock/module-knowledge-blocks'
import type { ModuleKnowledgeBlockWithBlock } from '@/types/database'

export async function getBlocksForModule(moduleId: string): Promise<ModuleKnowledgeBlockWithBlock[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return getMockBlocksForModule(moduleId)

  const { data, error } = await supabase
    .from('module_knowledge_blocks')
    .select(`
      id,
      module_id,
      knowledge_block_id,
      usage_type,
      required,
      condition,
      order_index,
      knowledge_block:knowledge_blocks (*)
    `)
    .eq('module_id', moduleId)
    .order('order_index', { ascending: true })

  if (error || !data) return getMockBlocksForModule(moduleId)

  return data.map(row => ({
    id: row.id,
    module_id: row.module_id,
    knowledge_block_id: row.knowledge_block_id,
    usage_type: row.usage_type,
    required: row.required,
    condition: row.condition,
    order_index: row.order_index,
    knowledge_block: Array.isArray(row.knowledge_block)
      ? row.knowledge_block[0]
      : row.knowledge_block,
  })) as ModuleKnowledgeBlockWithBlock[]
}
