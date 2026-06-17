'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, Edit3, Save, Archive } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn, slugify } from '@/lib/utils'
import { createKnowledgeBlock, updateKnowledgeBlock, archiveKnowledgeBlock } from '@/app/actions/knowledge-blocks'
import type { KnowledgeBlock, KnowledgeBlockType, KnowledgeBlockStatus } from '@/types/database'
import ReactMarkdown from 'react-markdown'

interface KnowledgeBlockEditorProps {
  initialData?: Partial<KnowledgeBlock>
  blockId?: string
  returnPath?: string
  allowedTypes?: KnowledgeBlockType[]
}

const BLOCK_TYPES: Array<{ value: KnowledgeBlockType; label: string }> = [
  { value: 'base', label: 'Base' },
  { value: 'module', label: 'Módulo' },
  { value: 'reusable_registration', label: 'Cadastro reutilizável' },
  { value: 'standard_prompt', label: 'Prompt padrão' },
  { value: 'global_rule', label: 'Regra global' },
  { value: 'checklist', label: 'Checklist' },
  { value: 'example', label: 'Exemplo' },
  { value: 'implementation_guide', label: 'Guia de implementação' },
]

export function KnowledgeBlockEditor({
  initialData,
  blockId,
  returnPath = '/admin/modulos/globais',
  allowedTypes,
}: KnowledgeBlockEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const typeOptions = allowedTypes
    ? BLOCK_TYPES.filter(t => allowedTypes.includes(t.value))
    : BLOCK_TYPES
  const defaultType = typeOptions[0]?.value ?? 'base'
  const [form, setForm] = useState({
    title:            initialData?.title ?? '',
    slug:             initialData?.slug ?? '',
    type:             initialData?.type ?? defaultType as KnowledgeBlockType,
    status:           initialData?.status ?? 'draft' as KnowledgeBlockStatus,
    content_markdown: initialData?.content_markdown ?? '',
    version:          initialData?.version ?? 1,
  })

  function handleTitleChange(title: string) {
    setForm(prev => ({ ...prev, title, slug: prev.slug || slugify(title) }))
  }

  async function handleSave(archive = false) {
    setLoading(true)

    const result = archive
      ? await archiveKnowledgeBlock(blockId!)
      : blockId
        ? await updateKnowledgeBlock(blockId, form)
        : await createKnowledgeBlock(form)

    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }

    toast.success(archive ? 'Bloco arquivado.' : blockId ? 'Bloco atualizado!' : 'Bloco criado!')
    router.push(returnPath)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <h2 className="font-semibold text-[#211E19] mb-5">Informações do bloco</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Título *</Label>
            <Input required value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Ex: Ficha Técnica — Módulo" className="border-[#E2D5C0] focus:border-[#235139]" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Slug</Label>
            <Input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} className="border-[#E2D5C0] font-mono text-sm" />
          </div>
        </div>
        <div className="mt-5 grid sm:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Tipo *</Label>
            <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v as KnowledgeBlockType }))}>
              <SelectTrigger className="border-[#E2D5C0]"><SelectValue /></SelectTrigger>
              <SelectContent>{typeOptions.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
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
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-[#443E35]">Versão</Label>
            <Input type="number" min={1} value={form.version} onChange={e => setForm(p => ({ ...p, version: Number(e.target.value) }))} className="border-[#E2D5C0] w-24" />
          </div>
        </div>
      </div>

      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] overflow-hidden shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <Tabs defaultValue="editor">
          <div className="flex items-center justify-between border-b border-[#E2D5C0] px-5 py-3">
            <h2 className="font-semibold text-[#211E19]">Conteúdo (Markdown)</h2>
            <TabsList className="bg-[#F5EEE1]">
              <TabsTrigger value="editor" className="data-[state=active]:bg-[#FFFDF9] text-xs gap-1.5"><Edit3 className="h-3.5 w-3.5" />Editor</TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-[#FFFDF9] text-xs gap-1.5"><Eye className="h-3.5 w-3.5" />Preview</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="editor" className="m-0">
            <Textarea
              value={form.content_markdown}
              onChange={e => setForm(p => ({ ...p, content_markdown: e.target.value }))}
              placeholder="# Título&#10;&#10;Escreva em Markdown…"
              className={cn('min-h-[420px] resize-y rounded-none border-0 font-mono text-sm focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#FFFDF9] text-[#211E19] placeholder:text-[#B9AE9B]')}
            />
          </TabsContent>
          <TabsContent value="preview" className="m-0 p-6">
            <article className="prose prose-sm max-w-none prose-headings:text-[#211E19] prose-p:text-[#443E35] prose-li:text-[#443E35] prose-strong:text-[#211E19] prose-code:bg-[#F5EEE1] prose-code:text-[#235139] prose-pre:bg-[#143025] prose-pre:text-[#F4FBF5] min-h-[200px]">
              {form.content_markdown
                ? <ReactMarkdown>{form.content_markdown}</ReactMarkdown>
                : <p className="text-[#B9AE9B] italic">Nada para visualizar.</p>}
            </article>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {blockId && (
            <Button type="button" variant="outline" onClick={() => handleSave(true)} disabled={loading} className="border-[#E2D5C0] text-[#6F6657] hover:bg-[#F5EEE1] gap-2">
              <Archive className="h-4 w-4" />Arquivar
            </Button>
          )}
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()} className="border-[#E2D5C0] text-[#443E35] hover:bg-[#F5EEE1]">Cancelar</Button>
          <Button onClick={() => handleSave()} disabled={loading} className="bg-[#235139] hover:bg-[#1B3D2E] text-white gap-2">
            <Save className="h-4 w-4" />
            {loading ? 'Salvando…' : 'Salvar bloco'}
          </Button>
        </div>
      </div>
    </div>
  )
}
