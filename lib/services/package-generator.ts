/**
 * Package Generator Service
 *
 * Orchestrates the generation of a System Recipe (Receita do Sistema).
 * Fetches module-specific blocks via module_knowledge_blocks, injects global
 * blocks (base + global_rule) only on the restaurant's first module.
 */

import { buildDefaultChecklist } from '@/lib/ai/generate-system-recipe'
import { getBlocksForModule } from '@/lib/db/module-knowledge-blocks'
import { isFirstModuleForRestaurant } from '@/lib/db/installations'
import { getGlobalKnowledgeBlocks } from '@/lib/db/knowledge-blocks'
import { assemblePackageFiles } from '@/lib/services/package-file-assembler'
import { buildExternalPrompt } from '@/lib/services/package-prompt-builder'
import { buildPackageSummary } from '@/lib/services/package-summary-builder'
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

function resolveSourceBlockIds(blocks: ModuleKnowledgeBlockWithBlock[]) {
  return blocks
    .filter(b => b.knowledge_block.status === 'active')
    .map(b => b.knowledge_block_id)
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

  const sourceBlockIds = resolveSourceBlockIds(allBlocks)
  const guideVariant = isFirstModule ? 'first_module' : 'additional_module'

  const files = assemblePackageFiles({
    restaurantName: input.restaurantName,
    segment: input.segment,
    moduleName: input.moduleName,
    moduleSlug: input.moduleSlug,
    baseAnswers: input.baseAnswers,
    moduleAnswers: input.moduleAnswers,
    blocks: allBlocks,
  })

  if (files.length <= 1) {
    throw new Error(
      'Não foi possível montar os arquivos deste módulo. Tente novamente em alguns minutos ou fale com o suporte.',
    )
  }

  const promptForExternalTool = buildExternalPrompt({
    restaurantName: input.restaurantName,
    moduleName: input.moduleName,
    files,
    guideVariant,
  })

  const blockTitles = files.filter(f => f.knowledge_block_id).map(f => f.title)

  return {
    title: `Pacote — ${isFirstModule ? 'Base + ' : ''}${input.moduleName}`,
    markdown: buildPackageSummary({
      moduleName: input.moduleName,
      restaurantName: input.restaurantName,
      isFirstModule,
      blockTitles,
    }),
    promptForExternalTool,
    checklist: buildDefaultChecklist(input.moduleSlug),
    sourceBlockIds,
    contextSnapshot: {
      restaurantName: input.restaurantName,
      segment: input.segment,
      isFirstModule,
    },
    files,
    guideVariant,
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
    files_json: recipe.files,
    guide_variant: recipe.guideVariant,
    generated_at: new Date().toISOString(),
    status: 'active',
  }
}
