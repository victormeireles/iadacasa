import type { AssemblePackageFilesInput, PackageFile } from '@/types/packages'
import {
  formatContextFileContent,
  prependContextToBlock,
} from './format-diagnostic-context'

function padOrder(n: number): string {
  return String(n).padStart(2, '0')
}

export function assemblePackageFiles(input: AssemblePackageFilesInput): PackageFile[] {
  const allAnswers = { ...input.baseAnswers, ...input.moduleAnswers }
  const activeBlocks = input.blocks
    .filter(b => b.knowledge_block.status === 'active')
    .sort((a, b) => a.order_index - b.order_index)

  const files: PackageFile[] = []

  files.push({
    filename: '00-contexto-restaurante.md',
    title: 'Contexto do restaurante',
    content_markdown: formatContextFileContent({
      restaurantName: input.restaurantName,
      segment: input.segment,
      baseAnswers: input.baseAnswers,
      moduleAnswers: input.moduleAnswers,
    }),
    knowledge_block_id: null,
    sort_order: 0,
  })

  activeBlocks.forEach((link, index) => {
    const block = link.knowledge_block
    files.push({
      filename: `${padOrder(index + 1)}-${block.slug}.md`,
      title: block.title,
      content_markdown: prependContextToBlock({
        restaurantName: input.restaurantName,
        segment: input.segment,
        blockTitle: block.title,
        relevantAnswers: allAnswers,
        blockContent: block.content_markdown,
      }),
      knowledge_block_id: block.id,
      sort_order: index + 1,
    })
  })

  return files
}
