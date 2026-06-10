'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { DiagnosticQuestion } from '@/types/database'

interface DiagnosticFormProps {
  questions: DiagnosticQuestion[]
  stepTitle: string
  stepDescription?: string
  stepNumber: number
  totalSteps: number
  initialAnswers?: Record<string, unknown>
  onSubmit: (answers: Record<string, unknown>) => void
  onBack?: () => void
  isLoading?: boolean
}

export function DiagnosticForm({
  questions,
  stepTitle,
  stepDescription,
  stepNumber,
  totalSteps,
  initialAnswers = {},
  onSubmit,
  onBack,
  isLoading,
}: DiagnosticFormProps) {
  const [answers, setAnswers] = useState<Record<string, unknown>>(initialAnswers)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function setAnswer(key: string, value: unknown) {
    setAnswers(prev => ({ ...prev, [key]: value }))
    setErrors(prev => { const e = { ...prev }; delete e[key]; return e })
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    questions.forEach(q => {
      if (q.required) {
        const val = answers[q.variable_key]
        if (val === undefined || val === null || val === '' ||
            (Array.isArray(val) && val.length === 0)) {
          newErrors[q.variable_key] = 'Campo obrigatório'
        }
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) onSubmit(answers)
  }

  return (
    <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
      {/* Header */}
      <div className="border-b border-[#E2D5C0] px-6 py-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-[#968C7B] uppercase tracking-wide">
            Passo {stepNumber} de {totalSteps}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2 mb-4 h-1.5 w-full rounded-full bg-[#E2D5C0]">
          <div
            className="h-1.5 rounded-full bg-[#235139] transition-all duration-500"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>

        <h2 className="text-lg font-semibold text-[#211E19]">{stepTitle}</h2>
        {stepDescription && (
          <p className="mt-1 text-sm text-[#6F6657]">{stepDescription}</p>
        )}
      </div>

      {/* Questions */}
      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
        {questions.map((question, idx) => (
          <QuestionField
            key={question.id}
            question={question}
            value={answers[question.variable_key]}
            error={errors[question.variable_key]}
            onChange={(val) => setAnswer(question.variable_key, val)}
            index={idx + 1}
          />
        ))}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E2D5C0]">
          {onBack ? (
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="text-[#6F6657] hover:text-[#443E35]"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Voltar
            </Button>
          ) : <div />}

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#235139] hover:bg-[#1B3D2E] text-white"
          >
            {isLoading ? (
              'Salvando…'
            ) : stepNumber < totalSteps ? (
              <>
                Continuar
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Gerar Receita do Sistema
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

// ─── Individual question renderer ──────────────────────────────────

interface QuestionFieldProps {
  question: DiagnosticQuestion
  value: unknown
  error?: string
  onChange: (value: unknown) => void
  index: number
}

function QuestionField({ question, value, error, onChange, index }: QuestionFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="flex gap-2 text-sm font-medium text-[#443E35]">
        <span className="text-[#968C7B] font-normal">{index}.</span>
        {question.question_text}
        {question.required && <span className="text-[#6E2A38]">*</span>}
      </Label>

      {question.question_type === 'text' && (
        <Input
          value={(value as string) ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder="Sua resposta…"
          maxLength={question.max_length}
          className={cn('border-[#E2D5C0] focus:border-[#235139] focus:ring-[#235139]/20', error && 'border-[#6E2A38]')}
        />
      )}

      {question.question_type === 'textarea' && (
        <Textarea
          value={(value as string) ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder="Sua resposta…"
          rows={3}
          maxLength={question.max_length}
          className={cn('border-[#E2D5C0] focus:border-[#235139] resize-none', error && 'border-[#6E2A38]')}
        />
      )}

      {question.question_type === 'number' && (
        <Input
          type="number"
          value={(value as string) ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder="0"
          className={cn('border-[#E2D5C0] focus:border-[#235139] w-32', error && 'border-[#6E2A38]')}
        />
      )}

      {question.question_type === 'boolean' && (
        <div className="flex gap-3">
          {['Sim', 'Não'].map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt === 'Sim')}
              className={cn(
                'rounded-lg border px-5 py-2 text-sm font-medium transition-colors',
                value === (opt === 'Sim')
                  ? 'border-[#235139] bg-[#DEEBE1] text-[#235139]'
                  : 'border-[#E2D5C0] bg-white text-[#443E35] hover:border-[#235139] hover:bg-[#ECF3ED]'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {question.question_type === 'single_choice' && question.options && (
        <div className="space-y-2">
          {question.options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-sm text-left transition-colors',
                value === opt
                  ? 'border-[#235139] bg-[#DEEBE1] text-[#235139] font-medium'
                  : 'border-[#E2D5C0] bg-white text-[#443E35] hover:border-[#235139] hover:bg-[#ECF3ED]'
              )}
            >
              <span className={cn(
                'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2',
                value === opt ? 'border-[#235139] bg-[#235139]' : 'border-[#B9AE9B]'
              )}>
                {value === opt && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
              {opt}
            </button>
          ))}
        </div>
      )}

      {question.question_type === 'multiple_choice' && question.options && (
        <div className="space-y-2">
          {question.options.map(opt => {
            const selected = Array.isArray(value) && (value as string[]).includes(opt)
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  const current = Array.isArray(value) ? (value as string[]) : []
                  onChange(selected ? current.filter(v => v !== opt) : [...current, opt])
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-sm text-left transition-colors',
                  selected
                    ? 'border-[#235139] bg-[#DEEBE1] text-[#235139] font-medium'
                    : 'border-[#E2D5C0] bg-white text-[#443E35] hover:border-[#235139] hover:bg-[#ECF3ED]'
                )}
              >
                <span className={cn(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded-md border-2',
                  selected ? 'border-[#235139] bg-[#235139]' : 'border-[#B9AE9B]'
                )}>
                  {selected && (
                    <svg viewBox="0 0 10 8" className="h-2.5 w-2.5 fill-white stroke-none">
                      <path d="M1 4l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="white" fill="none"/>
                    </svg>
                  )}
                </span>
                {opt}
              </button>
            )
          })}
        </div>
      )}

      {error && <p className="text-xs text-[#6E2A38]">{error}</p>}
    </div>
  )
}
