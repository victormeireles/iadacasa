'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, ChevronDown, ChevronUp, Pencil, Trash2, BookOpen } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { slugify } from '@/lib/utils'
import {
  createModuleKnowledgeBlock,
  updateModuleKnowledgeBlock,
  unlinkModuleKnowledgeBlock,
  reorderModuleKnowledgeBlocks,
  type ModuleBlockInput,
} from '@/app/actions/module-knowledge-blocks'
import type {
  KnowledgeBlockType,
  KnowledgeBlockStatus,
  ModuleKnowledgeBlockUsageType,
  ModuleKnowledgeBlockWithBlock,
} from '@/types/database'

const BLOCK_TYPES: Array<{ value: KnowledgeBlockType; label: string }> = [
  { value: 'module', label: 'Módulo (prompt principal)' },
  { value: 'checklist', label: 'Checklist' },
  { value: 'reusable_registration', label: 'Cadastro reutilizável' },
  { value: 'standard_prompt', label: 'Prompt padrão' },
  { value: 'example', label: 'Exemplo' },
  { value: 'implementation_guide', label: 'Guia de implementação' },
]

const USAGE_TYPES: Array<{ value: ModuleKnowledgeBlockUsageType; label: string }> = [
  { value: 'prompt', label: 'Prompt principal' },
  { value: 'required_context', label: 'Contexto obrigatório' },
  { value: 'optional_context', label: 'Contexto opcional' },
  { value: 'rule', label: 'Regra' },
  { value: 'checklist', label: 'Checklist' },
  { value: 'dependency', label: 'Dependência' },
]

const TYPE_LABELS: Record<KnowledgeBlockType, string> = Object.fromEntries(
  BLOCK_TYPES.map(t => [t.value, t.label])
) as Record<KnowledgeBlockType, string>

const USAGE_LABELS: Record<ModuleKnowledgeBlockUsageType, string> = Object.fromEntries(
  USAGE_TYPES.map(t => [t.value, t.label])
) as Record<ModuleKnowledgeBlockUsageType, string>

interface ModuleKnowledgeBlocksPanelProps {
  moduleId: string
  initialBlocks: ModuleKnowledgeBlockWithBlock[]
}

const EMPTY_FORM: ModuleBlockInput = {
  title: '',
  slug: '',
  type: 'module',
  status: 'active',
  content_markdown: '',
  version: 1,
  usage_type: 'prompt',
  required: true,
  order_index: 0,
}

export function ModuleKnowledgeBlocksPanel({ moduleId, initialBlocks }: ModuleKnowledgeBlocksPanelProps) {
  const router = useRouter()
  const [blocks, setBlocks] = useState(initialBlocks)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<ModuleBlockInput>({ ...EMPTY_FORM, order_index: initialBlocks.length })

  function handleTitleChange(title: string) {
    setForm(prev => ({ ...prev, title, slug: prev.slug || slugify(title) }))
  }

  function startEdit(item: ModuleKnowledgeBlockWithBlock) {
    setEditingId(item.id)
    setShowNewForm(false)
    setForm({
      title: item.knowledge_block.title,
      slug: item.knowledge_block.slug,
      type: item.knowledge_block.type,
      status: item.knowledge_block.status,
      content_markdown: item.knowledge_block.content_markdown,
      version: item.knowledge_block.version,
      usage_type: item.usage_type,
      required: item.required,
      order_index: item.order_index,
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setShowNewForm(false)
    setForm({ ...EMPTY_FORM, order_index: blocks.length })
  }

  async function handleSaveNew() {
    setLoading(true)
    const result = await createModuleKnowledgeBlock(moduleId, {
      ...form,
      order_index: blocks.length,
    })
    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }
    toast.success('Bloco adicionado ao módulo!')
    setShowNewForm(false)
    setForm({ ...EMPTY_FORM, order_index: blocks.length + 1 })
    setLoading(false)
    router.refresh()
  }

  async function handleSaveEdit(item: ModuleKnowledgeBlockWithBlock) {
    setLoading(true)
    const result = await updateModuleKnowledgeBlock(
      moduleId,
      item.knowledge_block_id,
      item.id,
      form
    )
    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }
    toast.success('Bloco atualizado!')
    setEditingId(null)
    setLoading(false)
    router.refresh()
  }

  async function handleUnlink(linkId: string) {
    if (!confirm('Remover este bloco do módulo? O conteúdo do bloco será mantido no sistema.')) return
    setLoading(true)
    const result = await unlinkModuleKnowledgeBlock(moduleId, linkId)
    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }
    toast.success('Bloco desvinculado do módulo.')
    setBlocks(prev => prev.filter(b => b.id !== linkId))
    setLoading(false)
    router.refresh()
  }

  async function handleMove(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= blocks.length) return

    const reordered = [...blocks]
    const [moved] = reordered.splice(index, 1)
    reordered.splice(newIndex, 0, moved)
    setBlocks(reordered)

    const result = await reorderModuleKnowledgeBlocks(moduleId, reordered.map(b => b.id))
    if (result.error) {
      toast.error(result.error)
      setBlocks(initialBlocks)
      return
    }
    router.refresh()
  }

  function renderBlockForm(onSave: () => void, saveLabel: string) {
    return (
      <div className="space-y-4 rounded-xl border border-[#E2D5C0] bg-[#FBF7F0] p-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Título *</Label>
            <Input
              required
              value={form.title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Ex: Ficha Técnica — Módulo"
              className="border-[#E2D5C0] focus:border-[#235139]"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Slug</Label>
            <Input
              value={form.slug}
              onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
              className="border-[#E2D5C0] font-mono text-sm"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Tipo do bloco</Label>
            <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v as KnowledgeBlockType }))}>
              <SelectTrigger className="border-[#E2D5C0]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {BLOCK_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Papel no módulo</Label>
            <Select value={form.usage_type} onValueChange={v => setForm(p => ({ ...p, usage_type: v as ModuleKnowledgeBlockUsageType }))}>
              <SelectTrigger className="border-[#E2D5C0]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {USAGE_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Status</Label>
            <Select value={form.status} onValueChange={v => setForm(p => ({ ...p, status: v as KnowledgeBlockStatus }))}>
              <SelectTrigger className="border-[#E2D5C0]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="required"
            checked={form.required}
            onCheckedChange={v => setForm(p => ({ ...p, required: v === true }))}
          />
          <Label htmlFor="required" className="text-sm text-[#443E35] cursor-pointer">
            Obrigatório na geração do pacote
          </Label>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-[#443E35]">Conteúdo (Markdown) *</Label>
          <Textarea
            required
            value={form.content_markdown}
            onChange={e => setForm(p => ({ ...p, content_markdown: e.target.value }))}
            placeholder="# Título do bloco&#10;&#10;Descreva o prompt, regras ou contexto..."
            rows={12}
            className="border-[#E2D5C0] font-mono text-sm resize-y min-h-[200px]"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={cancelEdit} className="border-[#E2D5C0]">
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={onSave}
            disabled={loading || !form.title || !form.content_markdown}
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
            <BookOpen className="h-4 w-4 text-[#235139]" />
            Blocos de conhecimento
          </h2>
          <p className="text-sm text-[#6F6657] mt-1">
            Prompts, regras e contextos usados para gerar o pacote deste módulo.
          </p>
          <p className="text-xs text-[#968C7B] mt-1">
            Blocos globais (base e regras) são gerenciados em{' '}
            <Link href="/admin/modulos/globais" className="text-[#235139] underline">
              Blocos globais da plataforma
            </Link>
            . Incluídos automaticamente no primeiro módulo do cliente.
          </p>
        </div>
        {!showNewForm && !editingId && (
          <Button
            type="button"
            variant="outline"
            onClick={() => { setShowNewForm(true); setForm({ ...EMPTY_FORM, order_index: blocks.length }) }}
            className="border-[#E2D5C0] text-[#235139] hover:bg-[#DEEBE1] shrink-0 gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Adicionar bloco
          </Button>
        )}
      </div>

      {blocks.length === 0 && !showNewForm && (
        <div className="rounded-xl border border-dashed border-[#E2D5C0] bg-[#FBF7F0] p-8 text-center">
          <p className="text-sm text-[#6F6657] mb-3">Nenhum bloco vinculado a este módulo.</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowNewForm(true)}
            className="border-[#E2D5C0] text-[#235139] gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Criar primeiro bloco
          </Button>
        </div>
      )}

      {blocks.length > 0 && (
        <div className="space-y-2 mb-4">
          {blocks.map((item, index) => (
            <div key={item.id}>
              {editingId === item.id ? (
                renderBlockForm(() => handleSaveEdit(item), 'Salvar bloco')
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-[#E2D5C0] bg-[#FBF7F0] px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <button
                      type="button"
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0 || loading}
                      className="text-[#968C7B] hover:text-[#443E35] disabled:opacity-30"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === blocks.length - 1 || loading}
                      className="text-[#968C7B] hover:text-[#443E35] disabled:opacity-30"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#211E19] truncate">{item.knowledge_block.title}</p>
                    <p className="text-xs text-[#968C7B] mt-0.5">
                      {TYPE_LABELS[item.knowledge_block.type]} · {USAGE_LABELS[item.usage_type]}
                      {item.required ? ' · obrigatório' : ' · opcional'}
                      {' · v'}{item.knowledge_block.version}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#968C7B] hover:bg-[#F5EEE1] hover:text-[#235139]"
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUnlink(item.id)}
                      disabled={loading}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#968C7B] hover:bg-[#EDD7DB] hover:text-[#6E2A38]"
                      title="Desvincular"
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

      {showNewForm && renderBlockForm(handleSaveNew, 'Adicionar bloco')}
    </div>
  )
}
