import Link from 'next/link'
import { ChevronLeft, Clock, Zap, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getModuleById } from '@/lib/db/modules'
import { getModuleQuestions, getBaseQuestions } from '@/lib/db/questions'
import { getModuleColors, DIFFICULTY_LABELS, MODULE_STATUS_LABELS } from '@/lib/utils'

export default async function ModulePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const moduleData = await getModuleById(id)
  if (!moduleData) notFound()

  const [baseQuestions, moduleQuestions] = await Promise.all([
    getBaseQuestions(),
    getModuleQuestions(moduleData.id),
  ])

  const colors = getModuleColors(moduleData.color_key)

  const STATUS_COLORS: Record<string, string> = {
    active:      'bg-[#DEEBE1] text-[#235139]',
    coming_soon: 'bg-[#F9EFD6] text-[#C28C2A]',
    draft:       'bg-[#F5EEE1] text-[#6F6657]',
    archived:    'bg-[#EDE3D2] text-[#443E35]',
  }

  const QUESTION_TYPE_LABELS: Record<string, string> = {
    text: 'Texto curto',
    textarea: 'Texto longo',
    number: 'Número',
    single_choice: 'Escolha única',
    multiple_choice: 'Múltipla escolha',
    boolean: 'Sim / Não',
  }

  return (
    <div className="max-w-3xl space-y-8">
      {/* Back */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/modulos"
          className="inline-flex items-center gap-1.5 text-sm text-[#6F6657] hover:text-[#443E35] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Módulos
        </Link>
        <span className="text-[#E2D5C0]">/</span>
        <Link
          href={`/admin/modulos/${id}`}
          className="text-sm text-[#6F6657] hover:text-[#443E35] transition-colors"
        >
          {moduleData.name}
        </Link>
        <span className="text-[#E2D5C0]">/</span>
        <span className="text-sm text-[#443E35]">Preview</span>
      </div>

      {/* Notice */}
      <div className="rounded-lg bg-[#F9EFD6] border border-[#EDCD8A] px-4 py-3 text-sm text-[#A9761F]">
        Visualização do módulo como o cliente vê. Dados reais do banco — sem necessidade de restaurante.
      </div>

      {/* Module card */}
      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <div className="flex items-start justify-between mb-5">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${colors.bg}`}>
            📋
          </div>
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[moduleData.status]}`}>
            {MODULE_STATUS_LABELS[moduleData.status]}
          </span>
        </div>

        <h1 className="text-2xl font-semibold text-[#211E19] mb-2">{moduleData.name}</h1>
        <p className="text-[#6F6657] leading-relaxed mb-5">{moduleData.short_description}</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="rounded-lg bg-[#F5EEE1] p-3">
            <p className="text-xs text-[#6F6657] mb-0.5">Dor que resolve</p>
            <p className="text-sm font-medium text-[#443E35]">{moduleData.pain}</p>
          </div>
          <div className="rounded-lg bg-[#F5EEE1] p-3">
            <p className="text-xs text-[#6F6657] mb-0.5">Resultado esperado</p>
            <p className="text-sm font-medium text-[#443E35]">{moduleData.expected_result}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-[#6F6657]">
          <span className="flex items-center gap-1.5 rounded-full bg-[#F5EEE1] px-3 py-1">
            <Clock className="h-3.5 w-3.5" />
            {moduleData.estimated_time}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[#F5EEE1] px-3 py-1">
            <Zap className="h-3.5 w-3.5" />
            {DIFFICULTY_LABELS[moduleData.difficulty_level]}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[#F5EEE1] px-3 py-1">
            Segmento: {moduleData.segment ?? 'todos'}
          </span>
        </div>
      </div>

      {/* Diagnostic questions preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[#211E19]">
            Diagnóstico base
            <span className="ml-2 text-sm font-normal text-[#968C7B]">
              ({baseQuestions.length} pergunta{baseQuestions.length !== 1 ? 's' : ''})
            </span>
          </h2>
          <span className="text-xs text-[#968C7B]">Passo 1 de 2 — igual para todos os módulos</span>
        </div>

        <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] divide-y divide-[#F5EEE1] shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          {baseQuestions.map((q, idx) => (
            <div key={q.id} className="px-5 py-4">
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5EEE1] text-[#6F6657] text-[10px] font-semibold mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#211E19] mb-1">
                    {q.question_text}
                    {q.required && <span className="text-[#6E2A38] ml-1">*</span>}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-[#968C7B] bg-[#F5EEE1] rounded px-2 py-0.5">
                      {QUESTION_TYPE_LABELS[q.question_type] ?? q.question_type}
                    </span>
                    <span className="text-xs text-[#968C7B] font-mono">
                      {q.variable_key}
                    </span>
                    {q.options && Array.isArray(q.options) && (
                      <span className="text-xs text-[#968C7B]">
                        {(q.options as string[]).length} opções
                      </span>
                    )}
                  </div>
                  {q.options && Array.isArray(q.options) && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {(q.options as string[]).map(opt => (
                        <span key={opt} className="text-xs rounded border border-[#E2D5C0] bg-[#FBF7F0] px-2 py-0.5 text-[#443E35]">
                          {opt}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[#211E19]">
            Diagnóstico do módulo
            <span className="ml-2 text-sm font-normal text-[#968C7B]">
              ({moduleQuestions.length} pergunta{moduleQuestions.length !== 1 ? 's' : ''})
            </span>
          </h2>
          <span className="text-xs text-[#968C7B]">Passo 2 de 2 — específico de {moduleData.name}</span>
        </div>

        {moduleQuestions.length === 0 ? (
          <div className="rounded-[18px] border border-dashed border-[#E2D5C0] bg-[#FBF7F0] p-8 text-center">
            <p className="text-sm text-[#968C7B] mb-3">Nenhuma pergunta cadastrada para este módulo.</p>
            <Link
              href={`/admin/modulos/${id}`}
              className="text-sm text-[#235139] hover:underline"
            >
              Adicionar perguntas na edição do módulo
            </Link>
          </div>
        ) : (
          <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] divide-y divide-[#F5EEE1] shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
            {moduleQuestions.map((q, idx) => (
              <div key={q.id} className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DEEBE1] text-[#235139] text-[10px] font-semibold mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#211E19] mb-1">
                      {q.question_text}
                      {q.required && <span className="text-[#6E2A38] ml-1">*</span>}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-[#235139] bg-[#DEEBE1] rounded px-2 py-0.5">
                        {QUESTION_TYPE_LABELS[q.question_type] ?? q.question_type}
                      </span>
                      <span className="text-xs text-[#968C7B] font-mono">
                        {q.variable_key}
                      </span>
                      {q.options && Array.isArray(q.options) && (
                        <span className="text-xs text-[#968C7B]">
                          {(q.options as string[]).length} opções
                        </span>
                      )}
                    </div>
                    {q.options && Array.isArray(q.options) && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {(q.options as string[]).map(opt => (
                          <span key={opt} className="text-xs rounded border border-[#E2D5C0] bg-[#FBF7F0] px-2 py-0.5 text-[#443E35]">
                            {opt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Link
          href={`/admin/modulos/${id}`}
          className="inline-flex items-center gap-2 rounded-xl border border-[#E2D5C0] bg-[#FFFDF9] text-[#443E35] hover:bg-[#F5EEE1] text-sm font-medium py-2.5 px-5 transition-colors"
        >
          Editar módulo
        </Link>
        <Link
          href="/admin/modulos"
          className="inline-flex items-center gap-2 rounded-xl bg-[#235139] hover:bg-[#1B3D2E] text-white text-sm font-medium py-2.5 px-5 transition-colors"
        >
          Voltar para módulos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
