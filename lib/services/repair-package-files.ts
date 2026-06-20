import { getBlocksForModule } from '@/lib/db/module-knowledge-blocks'
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
import type { PackageFile } from '@/types/packages'

function globalBlocksAsModuleLinks(
  globals: KnowledgeBlock[],
  moduleId: string,
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

function hasBlockFiles(files: PackageFile[] | null | undefined): boolean {
  return (files ?? []).some(f => f.knowledge_block_id !== null)
}

export function packageNeedsFileRepair(pkg: GeneratedPackage): boolean {
  return !hasBlockFiles(pkg.files_json)
}

export async function rebuildPackageFiles(
  pkg: GeneratedPackage,
  moduleMeta?: { name?: string; slug?: string },
): Promise<{
  files: PackageFile[]
  prompt_for_external_tool: string
  package_markdown: string
} | null> {
  const snapshot = pkg.module_answers_snapshot as {
    base?: Record<string, unknown>
    module?: Record<string, unknown>
  } | null

  const baseAnswers = snapshot?.base ?? {}
  const moduleAnswers = snapshot?.module ?? {}
  const ctx = pkg.client_context_snapshot as {
    restaurantName?: string
    segment?: string
    isFirstModule?: boolean
  } | null

  const restaurantName = ctx?.restaurantName ?? 'Restaurante'
  const segment = ctx?.segment ?? 'Não informado'
  const isFirstModule =
    pkg.guide_variant === 'first_module' || ctx?.isFirstModule === true

  const moduleBlocks = await getBlocksForModule(pkg.module_id)
  const globalBlocks = isFirstModule ? await getGlobalKnowledgeBlocks() : []
  const allBlocks = [
    ...globalBlocksAsModuleLinks(globalBlocks, pkg.module_id),
    ...moduleBlocks,
  ]

  const moduleName =
    moduleMeta?.name ??
    pkg.package_title.replace(/^(Pacote|Receita do Sistema) — (Base \+ )?/, '')
  const moduleSlug = moduleMeta?.slug ?? 'modulo'

  const files = assemblePackageFiles({
    restaurantName,
    segment,
    moduleName,
    moduleSlug,
    baseAnswers,
    moduleAnswers,
    blocks: allBlocks,
  })

  if (!hasBlockFiles(files)) return null

  const guideVariant = isFirstModule ? 'first_module' : 'additional_module'

  return {
    files,
    prompt_for_external_tool: buildExternalPrompt({
      restaurantName,
      moduleName,
      files,
      guideVariant,
    }),
    package_markdown: buildPackageSummary({
      moduleName,
      restaurantName,
      isFirstModule,
      blockTitles: files.filter(f => f.knowledge_block_id).map(f => f.title),
    }),
  }
}
