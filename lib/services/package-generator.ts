/**
 * Package Generator Service
 *
 * Orchestrates the generation of a System Recipe (Receita do Sistema).
 * Fetches module-specific blocks via module_knowledge_blocks, injects global
 * blocks (base + global_rule) only on the restaurant's first module.
 */

import { generateSystemRecipe } from '@/lib/ai/generate-system-recipe'
import { getBlocksForModule } from '@/lib/db/module-knowledge-blocks'
import { isFirstModuleForRestaurant } from '@/lib/db/installations'
import { getGlobalKnowledgeBlocks } from '@/lib/db/knowledge-blocks'
import type {
  GeneratedPackage,
  KnowledgeBlock,
  ModuleKnowledgeBlockUsageType,
  ModuleKnowledgeBlockWithBlock,
} from '@/types/database'
import type { SystemRecipeOutput } from '@/types/recipes'

export interface PackageGeneratorInput {
  restaurantId: string
  userId: string
  moduleId: string
  moduleName: string
  moduleSlug: string
  restaurantName: string
  segment: string
  baseAnswers: Record<string, unknown>
  moduleAnswers: Record<string, unknown>
  installedModules: Array<{ name: string; version: string }>
}

function globalBlocksAsModuleLinks(
  globals: KnowledgeBlock[],
  moduleId: string
): ModuleKnowledgeBlockWithBlock[] {
  return globals.map((block, index) => ({
    id: `global-${block.id}`,
    module_id: moduleId,
    knowledge_block_id: block.id,
    usage_type: (block.type === 'base' ? 'dependency' : 'rule') as ModuleKnowledgeBlockUsageType,
    required: true,
    condition: null,
    order_index: index,
    knowledge_block: block,
  }))
}

function resolveBlocks(blocks: ModuleKnowledgeBlockWithBlock[]) {
  const active = blocks.filter(b => b.knowledge_block.status === 'active')

  const promptBlock = active.find(b =>
    b.usage_type === 'prompt' || b.knowledge_block.type === 'module'
  )
  const moduleMarkdown = promptBlock?.knowledge_block.content_markdown
    ?? active.find(b => b.knowledge_block.type === 'module')?.knowledge_block.content_markdown
    ?? ''

  const ruleBlocks = active.filter(b =>
    b.usage_type === 'rule' || b.knowledge_block.type === 'global_rule'
  )
  const contextBlocks = active.filter(b =>
    ['required_context', 'optional_context', 'dependency'].includes(b.usage_type)
    && b.knowledge_block.type !== 'module'
  )

  const globalRules = [
    ...contextBlocks.map(b => b.knowledge_block.content_markdown),
    ...ruleBlocks.map(b => b.knowledge_block.content_markdown),
  ].join('\n\n---\n\n')

  const sourceBlockIds = active.map(b => b.knowledge_block_id)

  return { moduleMarkdown, globalRules, sourceBlockIds }
}

export async function generatePackage(input: PackageGeneratorInput): Promise<SystemRecipeOutput> {
  const isFirstModule = await isFirstModuleForRestaurant(
    input.restaurantId,
    input.moduleId
  )

  const moduleBlocks = await getBlocksForModule(input.moduleId)
  const globalBlocks = isFirstModule ? await getGlobalKnowledgeBlocks() : []

  const allBlocks = [
    ...globalBlocksAsModuleLinks(globalBlocks, input.moduleId),
    ...moduleBlocks,
  ]

  const { moduleMarkdown, globalRules, sourceBlockIds } = resolveBlocks(allBlocks)

  const recipe = await generateSystemRecipe({
    restaurantName: input.restaurantName,
    segment: input.segment,
    moduleName: input.moduleName,
    moduleSlug: input.moduleSlug,
    installedModules: input.installedModules,
    baseAnswers: input.baseAnswers,
    moduleAnswers: input.moduleAnswers,
    moduleMarkdown,
    globalRules,
  })

  return {
    ...recipe,
    sourceBlockIds: recipe.sourceBlockIds.length > 0 ? recipe.sourceBlockIds : sourceBlockIds,
  }
}

export function buildGeneratedPackageRecord(
  input: PackageGeneratorInput,
  recipe: SystemRecipeOutput
): Omit<GeneratedPackage, 'id'> {
  return {
    restaurant_id: input.restaurantId,
    module_id: input.moduleId,
    user_id: input.userId,
    package_title: recipe.title,
    package_markdown: recipe.markdown,
    prompt_for_external_tool: recipe.promptForExternalTool,
    checklist_json: recipe.checklist,
    source_blocks_json: { block_ids: recipe.sourceBlockIds },
    client_context_snapshot: recipe.contextSnapshot,
    module_answers_snapshot: { base: input.baseAnswers, module: input.moduleAnswers },
    generated_at: new Date().toISOString(),
    status: 'active',
  }
}
