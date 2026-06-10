import type { GeneratedPackage, ChecklistItem } from './database'

export interface SystemRecipeOutput {
  title: string
  markdown: string
  promptForExternalTool: string
  checklist: ChecklistItem[]
  sourceBlockIds: string[]
  contextSnapshot: Record<string, unknown>
}

export interface RecipeSection {
  id: string
  title: string
  content: string
}

export interface ParsedRecipe {
  title: string
  sections: RecipeSection[]
  promptBlock: string
  checklist: ChecklistItem[]
}

export type RecipeWithModule = GeneratedPackage & {
  module_name?: string
  module_slug?: string
}
