'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, ChevronDown, ChevronUp, Pencil, Trash2, ClipboardList, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  createDiagnosticQuestion,
  updateDiagnosticQuestion,
  archiveDiagnosticQuestion,
  reorderDiagnosticQuestions,
  type DiagnosticQuestionInput,
} from '@/app/actions/diagnostic-questions'
import { variableKeyFromText } from '@/lib/utils'
import type { DiagnosticQuestion, QuestionType } from '@/types/database'

const QUESTION_TYPES: Array<{ value: QuestionType; label: string }> = [
  { value: 'text', label: 'Texto curto' },
  { value: 'textarea', label: 'Texto longo' },
  { value: 'number', label: 'Número' },
  { value: 'single_choice', label: 'Escolha única' },
  { value: 'multiple_choice', label: 'Múltipla escolha' },
  { value: 'boolean', label: 'Sim / Não' },
]

const TYPE_LABELS: Record<QuestionType, string> = Object.fromEntries(
  QUESTION_TYPES.map(t => [t.value, t.label])
) as Record<QuestionType, string>

const CHOICE_TYPES: QuestionType[] = ['single_choice', 'multiple_choice']
const TEXT_TYPES: QuestionType[] = ['text', 'textarea']

interface DiagnosticQuestionsPanelProps {
  moduleId: string | null
  initialQuestions: DiagnosticQuestion[]
  scope: 'base' | 'module'
}

const EMPTY_FORM: DiagnosticQuestionInput = {
  question_text: '',
  question_type: 'single_choice',
  options: ['', ''],
  required: true,
  variable_key: '',
  order_index: 0,
}

export function DiagnosticQuestionsPanel({
  moduleId,
  initialQuestions,
  scope,
}: DiagnosticQuestionsPanelProps) {
  const router = useRouter()
  const [questions, setQuestions] = useState(initialQuestions)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<DiagnosticQuestionInput>({
    ...EMPTY_FORM,
    order_index: initialQuestions.length,
  })
  const [variableKeyTouched, setVariableKeyTouched] = useState(false)

  const title = scope === 'base' ? 'Perguntas do diagnóstico base' : 'Perguntas do diagnóstico do módulo'
  const description =
    scope === 'base'
      ? 'Exibidas no passo 1 para todos os módulos — antes das perguntas específicas.'
      : 'Exibidas no passo 2, somente quando o cliente acessa este módulo.'

  function handleQuestionTextChange(text: string) {
    setForm(prev => ({
      ...prev,
      question_text: text,
      variable_key: variableKeyTouched ? prev.variable_key : variableKeyFromText(text),
    }))
  }

  function handleTypeChange(type: QuestionType) {
    setForm(prev => ({
      ...prev,
      question_type: type,
      options: CHOICE_TYPES.includes(type)
        ? (prev.options?.length ? prev.options : ['', ''])
        : undefined,
      max_length: TEXT_TYPES.includes(type) ? prev.max_length : undefined,
    }))
  }

  function startEdit(question: DiagnosticQuestion) {
    setEditingId(question.id)
    setShowNewForm(false)
    setVariableKeyTouched(true)
    setForm({
      question_text: question.question_text,
      question_type: question.question_type,
      options: question.options?.length ? [...question.options] : ['', ''],
      required: question.required,
      max_length: question.max_length,
      variable_key: question.variable_key,
      order_index: question.order_index,
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setShowNewForm(false)
    setVariableKeyTouched(false)
    setForm({ ...EMPTY_FORM, order_index: questions.length })
  }

  function updateOption(index: number, value: string) {
    setForm(prev => {
      const options = [...(prev.options ?? [])]
      options[index] = value
      return { ...prev, options }
    })
  }

  function addOption() {
    setForm(prev => ({ ...prev, options: [...(prev.options ?? []), ''] }))
  }

  function removeOption(index: number) {
    setForm(prev => {
      const options = [...(prev.options ?? [])]
      options.splice(index, 1)
      return { ...prev, options }
    })
  }

  async function handleSaveNew() {
    setLoading(true)
    const result = await createDiagnosticQuestion(moduleId, {
      ...form,
      order_index: questions.length,
    })
    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }
    toast.success('Pergunta adicionada!')
    setShowNewForm(false)
    setVariableKeyTouched(false)
    setForm({ ...EMPTY_FORM, order_index: questions.length + 1 })
    setLoading(false)
    router.refresh()
  }

  async function handleSaveEdit(question: DiagnosticQuestion) {
    setLoading(true)
    const result = await updateDiagnosticQuestion(moduleId, question.id, form)
    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }
    toast.success('Pergunta atualizada!')
    setEditingId(null)
    setVariableKeyTouched(false)
    setLoading(false)
    router.refresh()
  }

  async function handleArchive(questionId: string) {
    if (!confirm('Remover esta pergunta? Ela deixará de aparecer no diagnóstico.')) return
    setLoading(true)
    const result = await archiveDiagnosticQuestion(moduleId, questionId)
    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }
    toast.success('Pergunta removida.')
    setQuestions(prev => prev.filter(q => q.id !== questionId))
    setLoading(false)
    router.refresh()
  }

  async function handleMove(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= questions.length) return

    const reordered = [...questions]
    const [moved] = reordered.splice(index, 1)
    reordered.splice(newIndex, 0, moved)
    setQuestions(reordered)

    const result = await reorderDiagnosticQuestions(moduleId, reordered.map(q => q.id))
    if (result.error) {
      toast.error(result.error)
      setQuestions(initialQuestions)
      return
    }
    router.refresh()
  }

  function renderQuestionForm(onSave: () => void, saveLabel: string) {
    const showOptions = CHOICE_TYPES.includes(form.question_type)
    const showMaxLength = TEXT_TYPES.includes(form.question_type)

    return (
      <div className="space-y-4 rounded-xl border border-[#E2D5C0] bg-[#FBF7F0] p-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-[#443E35]">Pergunta *</Label>
          <Textarea
            required
            value={form.question_text}
            onChange={e => handleQuestionTextChange(e.target.value)}
            placeholder="Ex: Você vende produtos individuais, combos ou os dois?"
            rows={2}
            className="border-[#E2D5C0] resize-none min-h-[72px]"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Tipo de resposta</Label>
            <Select value={form.question_type} onValueChange={v => handleTypeChange(v as QuestionType)}>
              <SelectTrigger className="border-[#E2D5C0]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {QUESTION_TYPES.map(t => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Chave da variável *</Label>
            <Input
              required
              value={form.variable_key}
              onChange={e => {
                setVariableKeyTouched(true)
                setForm(p => ({ ...p, variable_key: e.target.value }))
              }}
              placeholder="product_types"
              className="border-[#E2D5C0] font-mono text-sm"
            />
            <p className="text-xs text-[#968C7B]">
              Usada pela IA e nas respostas salvas. Não altere após clientes responderem.
            </p>
          </div>
        </div>

        {showMaxLength && (
          <div className="space-y-1.5 max-w-xs">
            <Label className="text-sm font-medium text-[#443E35]">Limite de caracteres</Label>
            <Input
              type="number"
              min={1}
              value={form.max_length ?? ''}
              onChange={e => setForm(p => ({
                ...p,
                max_length: e.target.value ? Number(e.target.value) : undefined,
              }))}
              placeholder="Ex: 300"
              className="border-[#E2D5C0]"
            />
          </div>
        )}

        {showOptions && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#443E35]">Opções *</Label>
            <p className="text-xs text-[#968C7B] -mt-1">Mínimo de 2 opções.</p>
            <div className="space-y-2">
              {(form.options ?? []).map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={e => updateOption(index, e.target.value)}
                    placeholder={`Opção ${index + 1}`}
                    className="border-[#E2D5C0] flex-1"
                  />
                  {(form.options?.length ?? 0) > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#968C7B] hover:bg-[#EDD7DB] hover:text-[#6E2A38]"
                      aria-label={`Remover opção ${index + 1}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addOption}
              className="border-[#E2D5C0] text-[#235139] hover:bg-[#DEEBE1] h-9 gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              Adicionar opção
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Checkbox
            id={`required-${editingId ?? 'new'}`}
            checked={form.required}
            onCheckedChange={v => setForm(p => ({ ...p, required: v === true }))}
          />
          <Label htmlFor={`required-${editingId ?? 'new'}`} className="text-sm text-[#443E35] cursor-pointer">
            Resposta obrigatória
          </Label>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="outline" onClick={cancelEdit} className="border-[#E2D5C0]">
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={onSave}
            disabled={loading || !form.question_text || !form.variable_key}
            className="bg-[#235139] hover:bg-[#1B3D2E] text-white"
          >
            {loading ? 'Salvando…' : saveLabel}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="font-semibold text-[#211E19] flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-[#235139]" />
            {title}
          </h2>
          <p className="text-sm text-[#6F6657] mt-1">{description}</p>
        </div>
        {!showNewForm && !editingId && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setShowNewForm(true)
              setVariableKeyTouched(false)
              setForm({ ...EMPTY_FORM, order_index: questions.length })
            }}
            className="border-[#E2D5C0] text-[#235139] hover:bg-[#DEEBE1] shrink-0 gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Adicionar pergunta
          </Button>
        )}
      </div>

      {questions.length === 0 && !showNewForm && (
        <div className="rounded-xl border border-dashed border-[#E2D5C0] bg-[#FBF7F0] p-8 text-center">
          <p className="text-sm text-[#6F6657] mb-3">Nenhuma pergunta cadastrada.</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setShowNewForm(true)
              setVariableKeyTouched(false)
            }}
            className="border-[#E2D5C0] text-[#235139] gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Criar primeira pergunta
          </Button>
        </div>
      )}

      {questions.length > 0 && (
        <div className="space-y-2 mb-4">
          {questions.map((question, index) => (
            <div key={question.id}>
              {editingId === question.id ? (
                renderQuestionForm(() => handleSaveEdit(question), 'Salvar pergunta')
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-[#E2D5C0] bg-[#FBF7F0] px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0 || loading}
                      className="flex h-5 w-8 items-center justify-center text-[#968C7B] hover:text-[#443E35] disabled:opacity-30"
                      aria-label="Mover para cima"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === questions.length - 1 || loading}
                      className="flex h-5 w-8 items-center justify-center text-[#968C7B] hover:text-[#443E35] disabled:opacity-30"
                      aria-label="Mover para baixo"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DEEBE1] text-[#235139] text-[10px] font-semibold">
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#211E19]">{question.question_text}</p>
                    <p className="text-xs text-[#968C7B] mt-0.5">
                      {TYPE_LABELS[question.question_type]}
                      {question.required ? ' · obrigatória' : ' · opcional'}
                      {' · '}
                      <span className="font-mono">{question.variable_key}</span>
                      {question.options?.length ? ` · ${question.options.length} opções` : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(question)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-[#968C7B] hover:bg-[#F5EEE1] hover:text-[#235139]"
                      aria-label="Editar pergunta"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleArchive(question.id)}
                      disabled={loading}
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-[#968C7B] hover:bg-[#EDD7DB] hover:text-[#6E2A38]"
                      aria-label="Remover pergunta"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showNewForm && renderQuestionForm(handleSaveNew, 'Adicionar pergunta')}
    </div>
  )
}
