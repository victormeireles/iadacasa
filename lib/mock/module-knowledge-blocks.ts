import type { ModuleKnowledgeBlockWithBlock } from '@/types/database'
import { MOCK_KNOWLEDGE_BLOCKS } from './knowledge-blocks'

export const MOCK_MODULE_KNOWLEDGE_BLOCKS: ModuleKnowledgeBlockWithBlock[] = [
  {
    id: 'mkb-001',
    module_id: 'mod-ficha-tecnica',
    knowledge_block_id: 'kb-ficha-001',
    usage_type: 'prompt',
    required: true,
    condition: null,
    order_index: 0,
    knowledge_block: MOCK_KNOWLEDGE_BLOCKS.find(b => b.id === 'kb-ficha-001')!,
  },
]

export function getMockBlocksForModule(moduleId: string): ModuleKnowledgeBlockWithBlock[] {
  return MOCK_MODULE_KNOWLEDGE_BLOCKS
    .filter(mkb => mkb.module_id === moduleId)
    .sort((a, b) => a.order_index - b.order_index)
}
