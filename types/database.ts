export type UserRole = 'client' | 'admin' | 'super_admin'

export type ModuleStatus = 'draft' | 'active' | 'coming_soon' | 'archived'

export type KnowledgeBlockType =
  | 'base'
  | 'module'
  | 'reusable_registration'
  | 'standard_prompt'
  | 'global_rule'
  | 'checklist'
  | 'example'
  | 'implementation_guide'

export type KnowledgeBlockStatus = 'draft' | 'active' | 'archived'

export type InstallationStatus =
  | 'not_started'
  | 'diagnostic_started'
  | 'diagnostic_completed'
  | 'package_generated'
  | 'implementation_started'
  | 'installed'
  | 'validated'
  | 'needs_adjustment'
  | 'archived'

export type QuestionType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'single_choice'
  | 'multiple_choice'
  | 'boolean'

export type SupportStatus = 'open' | 'reviewing' | 'answered' | 'solved' | 'closed'

export type RestaurantSegment =
  | 'hamburgueria'
  | 'restaurante'
  | 'pizzaria'
  | 'bar'
  | 'cafeteria'
  | 'dark_kitchen'
  | 'delivery'
  | 'outro'

export interface Profile {
  id: string
  user_id: string
  name: string
  email: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Restaurant {
  id: string
  owner_user_id: string
  name: string
  segment: RestaurantSegment
  city?: string
  state?: string
  number_of_units: number
  operation_type?: string
  technical_level?: 'baixo' | 'medio' | 'alto'
  current_systems?: string
  created_at: string
  updated_at: string
}

export interface ClientOperationalProfile {
  id: string
  restaurant_id: string
  summary: string
  structured_data: Record<string, unknown>
  generated_at: string
  source_answers: Record<string, unknown>
  version: number
}

export interface Module {
  id: string
  name: string
  slug: string
  short_description: string
  pain: string
  expected_result: string
  segment?: string
  difficulty_level: 'basico' | 'intermediario' | 'avancado'
  estimated_time: string
  status: ModuleStatus
  order_index: number
  icon?: string
  color_key?: string
  created_at: string
  updated_at: string
}

export interface KnowledgeBlock {
  id: string
  title: string
  slug: string
  type: KnowledgeBlockType
  content_markdown: string
  version: number
  status: KnowledgeBlockStatus
  created_by?: string
  created_at: string
  updated_at: string
}

export interface DiagnosticQuestion {
  id: string
  module_id: string | null   // null = base diagnosis question
  question_text: string
  question_type: QuestionType
  options?: string[]
  required: boolean
  max_length?: number
  order_index: number
  condition?: string
  variable_key: string
  status: 'active' | 'archived'
  created_at: string
  updated_at: string
}

export interface ClientModuleAnswers {
  id: string
  restaurant_id: string
  module_id: string | null
  user_id: string
  answers_json: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface UserModuleInstallation {
  id: string
  restaurant_id: string
  module_id: string
  module_version?: string
  status: InstallationStatus
  started_at?: string
  generated_at?: string
  installed_at?: string
  validated_at?: string
  generated_package_id?: string
}

export interface GeneratedPackage {
  id: string
  restaurant_id: string
  module_id: string
  user_id: string
  package_title: string
  package_markdown: string
  prompt_for_external_tool: string
  checklist_json: ChecklistItem[]
  source_blocks_json: Record<string, unknown>
  client_context_snapshot: Record<string, unknown>
  module_answers_snapshot: Record<string, unknown>
  generated_at: string
  status: 'active' | 'archived'
}

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  category?: string
}

export interface SupportRequest {
  id: string
  restaurant_id: string
  user_id: string
  module_id?: string
  tool_used?: string
  issue_description: string
  intended_action: string
  actual_result: string
  prompt_used?: string
  screenshot_url?: string
  status: SupportStatus
  created_at: string
  updated_at: string
}
