import type { Module, DiagnosticQuestion, KnowledgeBlock } from './database'

export interface ModuleWithStatus extends Module {
  installation_status?: string
  installation_id?: string
  generated_package_id?: string
}

export interface ModuleCardProps {
  module: Module
  installationStatus?: string
  onClick?: () => void
  disabled?: boolean
}

export interface DiagnosticStep {
  step: 'base' | 'module'
  title: string
  description: string
  questions: DiagnosticQuestion[]
}

export interface DiagnosticFormState {
  currentStep: number
  answers: Record<string, unknown>
  baseAnswers: Record<string, unknown>
  moduleAnswers: Record<string, unknown>
  isSubmitting: boolean
  isComplete: boolean
}

export interface ModuleConfigForGeneration {
  module: Module
  knowledgeBlocks: KnowledgeBlock[]
  baseAnswers: Record<string, unknown>
  moduleAnswers: Record<string, unknown>
  installedModules: Array<{ name: string; version: string }>
  restaurantContext: Record<string, unknown>
}
