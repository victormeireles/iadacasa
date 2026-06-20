export type GuideVariant = 'first_module' | 'additional_module'

export interface PackageFile {
  filename: string
  title: string
  content_markdown: string
  knowledge_block_id: string | null
  sort_order: number
}

export interface AssemblePackageFilesInput {
  restaurantName: string
  segment: string
  moduleName: string
  moduleSlug: string
  baseAnswers: Record<string, unknown>
  moduleAnswers: Record<string, unknown>
  blocks: Array<{
    order_index: number
    knowledge_block: {
      id: string
      title: string
      slug: string
      type: string
      content_markdown: string
      status: string
    }
  }>
}

export interface BuildExternalPromptInput {
  restaurantName: string
  moduleName: string
  files: PackageFile[]
  guideVariant: GuideVariant
}
