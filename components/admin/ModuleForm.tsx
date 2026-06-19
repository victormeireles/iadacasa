'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { slugify } from '@/lib/utils'
import { createModule, updateModule } from '@/app/actions/modules'
import { ModuleKnowledgeBlocksPanel } from '@/components/admin/ModuleKnowledgeBlocksPanel'
import { DiagnosticQuestionsPanel } from '@/components/admin/DiagnosticQuestionsPanel'
import type { DiagnosticQuestion, Module, ModuleKnowledgeBlockWithBlock } from '@/types/database'

interface ModuleFormProps {
  initialData?: Partial<Module>
  moduleId?: string
  knowledgeBlocks?: ModuleKnowledgeBlockWithBlock[]
  diagnosticQuestions?: DiagnosticQuestion[]
}

export function ModuleForm({ initialData, moduleId, knowledgeBlocks = [], diagnosticQuestions = [] }: ModuleFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name:             initialData?.name ?? '',
    slug:             initialData?.slug ?? '',
    short_description: initialData?.short_description ?? '',
    pain:             initialData?.pain ?? '',
    expected_result:  initialData?.expected_result ?? '',
    difficulty_level: initialData?.difficulty_level ?? 'basico' as Module['difficulty_level'],
    estimated_time:   initialData?.estimated_time ?? '',
    status:           initialData?.status ?? 'draft' as Module['status'],
    order_index:      initialData?.order_index ?? 99,
  })

  function handleNameChange(name: string) {
    setForm(prev => ({ ...prev, name, slug: prev.slug || slugify(name) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const result = moduleId
      ? await updateModule(moduleId, form)
      : await createModule(form)

    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }

    toast.success(moduleId ? 'Módulo atualizado!' : 'Módulo criado! Agora adicione os blocos de conhecimento.')
    if (moduleId) {
      router.push('/admin/modulos')
    } else if (result.data?.id) {
      router.push(`/admin/modulos/${result.data.id}`)
    } else {
      router.push('/admin/modulos')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <h2 className="font-semibold text-[#211E19] mb-5">Informações do módulo</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Nome *</Label>
            <Input required value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="Ex: Ficha Técnica e Custo" className="border-[#E2D5C0] focus:border-[#235139]" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Slug *</Label>
            <Input required value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="ficha-tecnica" className="border-[#E2D5C0] focus:border-[#235139] font-mono text-sm" />
          </div>
        </div>
        <div className="mt-5 space-y-1.5">
          <Label className="text-sm font-medium text-[#443E35]">Descrição curta *</Label>
          <Textarea required value={form.short_description} onChange={e => setForm(p => ({ ...p, short_description: e.target.value }))} rows={2} className="border-[#E2D5C0] resize-none" />
        </div>
        <div className="mt-5 space-y-1.5">
          <Label className="text-sm font-medium text-[#443E35]">Dor que resolve *</Label>
          <Input required value={form.pain} onChange={e => setForm(p => ({ ...p, pain: e.target.value }))} placeholder="Ex: Não saber o custo real dos produtos" className="border-[#E2D5C0] focus:border-[#235139]" />
        </div>
        <div className="mt-5 space-y-1.5">
          <Label className="text-sm font-medium text-[#443E35]">Resultado esperado *</Label>
          <Input required value={form.expected_result} onChange={e => setForm(p => ({ ...p, expected_result: e.target.value }))} placeholder="Ex: Módulo para calcular custo e margem" className="border-[#E2D5C0] focus:border-[#235139]" />
        </div>
      </div>

      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <h2 className="font-semibold text-[#211E19] mb-5">Configurações</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Dificuldade</Label>
            <Select value={form.difficulty_level} onValueChange={v => setForm(p => ({ ...p, difficulty_level: v as Module['difficulty_level'] }))}>
              <SelectTrigger className="border-[#E2D5C0]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="basico">Básico</SelectItem>
                <SelectItem value="intermediario">Intermediário</SelectItem>
                <SelectItem value="avancado">Avançado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Tempo estimado</Label>
            <Input value={form.estimated_time} onChange={e => setForm(p => ({ ...p, estimated_time: e.target.value }))} placeholder="Ex: 1 a 3 horas" className="border-[#E2D5C0]" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Status</Label>
            <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v as Module['status'] }))}>
              <SelectTrigger className="border-[#E2D5C0]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="coming_soon">Em breve</SelectItem>
                <SelectItem value="active">Disponível</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {moduleId ? (
        <>
          <DiagnosticQuestionsPanel
            key={diagnosticQuestions.map(q => q.id).join('-')}
            moduleId={moduleId}
            initialQuestions={diagnosticQuestions}
            scope="module"
          />
          <ModuleKnowledgeBlocksPanel
            key={knowledgeBlocks.map(b => b.id).join('-')}
            moduleId={moduleId}
            initialBlocks={knowledgeBlocks}
          />
        </>
      ) : (
        <div className="rounded-[18px] border border-dashed border-[#E2D5C0] bg-[#FBF7F0] p-6 text-center space-y-2">
          <p className="text-sm text-[#6F6657]">
            Salve o módulo primeiro para adicionar perguntas de diagnóstico e blocos de conhecimento.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={() => router.back()} className="border-[#E2D5C0] text-[#443E35] hover:bg-[#F5EEE1]">Cancelar</Button>
        <Button type="submit" disabled={loading} className="bg-[#235139] hover:bg-[#1B3D2E] text-white">
          {loading ? 'Salvando…' : moduleId ? 'Salvar alterações' : 'Criar módulo'}
        </Button>
      </div>
    </form>
  )
}
