'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { DiagnosticQuestion, QuestionType } from '@/types/database'

export interface DiagnosticQuestionInput {
  question_text: string
  question_type: QuestionType
  options?: string[]
  required: boolean
  max_length?: number
  variable_key: string
  order_index: number
}

function revalidateQuestionPaths(moduleId: string | null) {
  revalidatePath('/admin/modulos')
  revalidatePath('/admin/modulos/diagnostico-base')
  if (moduleId) {
    revalidatePath(`/admin/modulos/${moduleId}`)
    revalidatePath(`/admin/modulos/${moduleId}/preview`)
  }
}

function validateInput(input: DiagnosticQuestionInput): string | null {
  if (!input.question_text.trim()) return 'O texto da pergunta é obrigatório.'
  if (!input.variable_key.trim()) return 'A chave da variável é obrigatória.'
  if (!/^[a-z][a-z0-9_]*$/.test(input.variable_key)) {
    return 'A chave deve usar apenas letras minúsculas, números e underscore (ex: product_types).'
  }
  if (
    (input.question_type === 'single_choice' || input.question_type === 'multiple_choice') &&
    (!input.options || input.options.filter(o => o.trim()).length < 2)
  ) {
    return 'Perguntas de escolha precisam de pelo menos 2 opções.'
  }
  return null
}

export async function createDiagnosticQuestion(
  moduleId: string | null,
  input: DiagnosticQuestionInput
) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const validationError = validateInput(input)
  if (validationError) return { error: validationError }

  const payload = {
    module_id: moduleId,
    question_text: input.question_text.trim(),
    question_type: input.question_type,
    options:
      input.question_type === 'single_choice' || input.question_type === 'multiple_choice'
        ? input.options?.map(o => o.trim()).filter(Boolean)
        : null,
    required: input.required,
    max_length: input.max_length ?? null,
    order_index: input.order_index,
    variable_key: input.variable_key.trim(),
    status: 'active' as const,
  }

  const { data, error } = await supabase
    .from('diagnostic_questions')
    .insert(payload)
    .select()
    .single()

  if (error) return { error: error.message }

  revalidateQuestionPaths(moduleId)
  return { data: data as DiagnosticQuestion }
}

export async function updateDiagnosticQuestion(
  moduleId: string | null,
  questionId: string,
  input: DiagnosticQuestionInput
) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const validationError = validateInput(input)
  if (validationError) return { error: validationError }

  const payload = {
    question_text: input.question_text.trim(),
    question_type: input.question_type,
    options:
      input.question_type === 'single_choice' || input.question_type === 'multiple_choice'
        ? input.options?.map(o => o.trim()).filter(Boolean)
        : null,
    required: input.required,
    max_length: input.max_length ?? null,
    order_index: input.order_index,
    variable_key: input.variable_key.trim(),
  }

  let query = supabase
    .from('diagnostic_questions')
    .update(payload)
    .eq('id', questionId)

  query = moduleId === null
    ? query.is('module_id', null)
    : query.eq('module_id', moduleId)

  const { error } = await query

  if (error) return { error: error.message }

  revalidateQuestionPaths(moduleId)
  return { success: true }
}

export async function archiveDiagnosticQuestion(
  moduleId: string | null,
  questionId: string
) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  let query = supabase
    .from('diagnostic_questions')
    .update({ status: 'archived' })
    .eq('id', questionId)

  query = moduleId === null
    ? query.is('module_id', null)
    : query.eq('module_id', moduleId)

  const { error } = await query

  if (error) return { error: error.message }

  revalidateQuestionPaths(moduleId)
  return { success: true }
}

export async function reorderDiagnosticQuestions(
  moduleId: string | null,
  orderedQuestionIds: string[]
) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  const updates = orderedQuestionIds.map((questionId, index) => {
    const query = supabase
      .from('diagnostic_questions')
      .update({ order_index: index })
      .eq('id', questionId)

    return moduleId === null
      ? query.is('module_id', null)
      : query.eq('module_id', moduleId)
  })

  const results = await Promise.all(updates)
  const failed = results.find(r => r.error)
  if (failed?.error) return { error: failed.error.message }

  revalidateQuestionPaths(moduleId)
  return { success: true }
}
