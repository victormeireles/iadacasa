import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { DiagnosticQuestion } from '@/types/database'

export async function getBaseQuestions(): Promise<DiagnosticQuestion[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return []

  const { data } = await supabase
    .from('diagnostic_questions')
    .select('*')
    .is('module_id', null)
    .eq('status', 'active')
    .order('order_index')

  return (data as DiagnosticQuestion[]) ?? []
}

export async function getModuleQuestions(moduleId: string): Promise<DiagnosticQuestion[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return []

  const { data } = await supabase
    .from('diagnostic_questions')
    .select('*')
    .eq('module_id', moduleId)
    .eq('status', 'active')
    .order('order_index')

  return (data as DiagnosticQuestion[]) ?? []
}

/** Admin: perguntas ativas de um módulo ou do diagnóstico base (moduleId = null). */
export async function getAdminQuestions(moduleId: string | null): Promise<DiagnosticQuestion[]> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return []

  let query = supabase
    .from('diagnostic_questions')
    .select('*')
    .eq('status', 'active')
    .order('order_index')

  query = moduleId === null
    ? query.is('module_id', null)
    : query.eq('module_id', moduleId)

  const { data } = await query
  return (data as DiagnosticQuestion[]) ?? []
}
