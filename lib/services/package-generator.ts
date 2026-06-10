/**
 * Package Generator Service
 *
 * Orchestrates the generation of a System Recipe (Receita do Sistema).
 * Fetches knowledge blocks, combines context, calls the AI layer.
 */

import { generateSystemRecipe } from '@/lib/ai/generate-system-recipe'
import { MOCK_KNOWLEDGE_BLOCKS } from '@/lib/mock/knowledge-blocks'
import type { GeneratedPackage } from '@/types/database'
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

export async function generatePackage(input: PackageGeneratorInput): Promise<SystemRecipeOutput> {
  // 1. Collect knowledge blocks
  const moduleBlock = MOCK_KNOWLEDGE_BLOCKS.find(
    b => b.type === 'module' && b.slug.includes(input.moduleSlug.replace('-', ''))
  ) ?? MOCK_KNOWLEDGE_BLOCKS.find(b => b.type === 'module')

  const globalRules = MOCK_KNOWLEDGE_BLOCKS
    .filter(b => b.type === 'global_rule' && b.status === 'active')
    .map(b => b.content_markdown)
    .join('\n\n---\n\n')

  // 2. Generate recipe via AI layer
  const recipe = await generateSystemRecipe({
    restaurantName: input.restaurantName,
    segment: input.segment,
    moduleName: input.moduleName,
    moduleSlug: input.moduleSlug,
    installedModules: input.installedModules,
    baseAnswers: input.baseAnswers,
    moduleAnswers: input.moduleAnswers,
    moduleMarkdown: moduleBlock?.content_markdown ?? '',
    globalRules,
  })

  return recipe
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
