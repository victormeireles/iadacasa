import { createServerSupabaseClient } from '@/lib/supabase/server'
import { BASE_DIAGNOSTIC_QUESTIONS, getQuestionsForModule as getMockQuestionsForModule } from '@/lib/mock/diagnostic-questions'
import type { DiagnosticQuestion } from '@/types/database'

export async function getBaseQuestions(): Promise<DiagnosticQuestion[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return BASE_DIAGNOSTIC_QUESTIONS

  const { data } = await supabase
    .from('diagnostic_questions')
    .select('*')
    .is('module_id', null)
    .eq('status', 'active')
    .order('order_index')

  if (!data || data.length === 0) return BASE_DIAGNOSTIC_QUESTIONS
  return data as DiagnosticQuestion[]
}

export async function getModuleQuestions(moduleId: string): Promise<DiagnosticQuestion[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return getMockQuestionsForModule(moduleId)

  const { data } = await supabase
    .from('diagnostic_questions')
    .select('*')
    .eq('module_id', moduleId)
    .eq('status', 'active')
    .order('order_index')

  if (!data || data.length === 0) return getMockQuestionsForModule(moduleId)
  return data as DiagnosticQuestion[]
}
