import Link from 'next/link'
import { Plus, Edit2, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getAllKnowledgeBlocks } from '@/lib/db/knowledge-blocks'
import { formatDate } from '@/lib/utils'

const TYPE_LABELS: Record<string, string> = {
  base: 'Base',
  global_rule: 'Regra global',
}

const TYPE_COLORS: Record<string, string> = {
  base: 'bg-[#DEEBE1] text-[#235139]',
  global_rule: 'bg-[#EDD7DB] text-[#6E2A38]',
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-[#DEEBE1] text-[#235139]',
  draft: 'bg-[#F5EEE1] text-[#6F6657]',
  archived: 'bg-[#EDE3D2] text-[#443E35]',
}

export default async function GlobalBlocksPage() {
  const allBlocks = await getAllKnowledgeBlocks()
  const blocks = allBlocks.filter(b => b.type === 'base' || b.type === 'global_rule')

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/modulos" className="inline-flex items-center gap-1.5 text-sm text-[#6F6657] hover:text-[#443E35] transition-colors mb-4">
          <ChevronLeft className="h-4 w-4" />
          Módulos
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#211E19] mb-1">Blocos globais da plataforma</h1>
            <p className="text-[#6F6657]">
              Estrutura base e regras compartilhadas. Incluídos automaticamente no primeiro módulo de cada restaurante.
            </p>
          </div>
          <Link href="/admin/modulos/globais/novo">
            <Button className="bg-[#235139] hover:bg-[#1B3D2E] text-white shrink-0">
              <Plus className="mr-2 h-4 w-4" />
              Novo bloco global
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] overflow-hidden shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E2D5C0] bg-[#F5EEE1]">
              <th className="text-left px-5 py-3 font-semibold text-[#443E35]">Título</th>
              <th className="text-left px-5 py-3 font-semibold text-[#443E35] hidden sm:table-cell">Tipo</th>
              <th className="text-left px-5 py-3 font-semibold text-[#443E35] hidden md:table-cell">Versão</th>
              <th className="text-left px-5 py-3 font-semibold text-[#443E35] hidden lg:table-cell">Atualizado</th>
              <th className="text-left px-5 py-3 font-semibold text-[#443E35]">Status</th>
              <th className="text-right px-5 py-3 font-semibold text-[#443E35]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block, idx) => (
              <tr key={block.id} className={`hover:bg-[#FBF7F0] transition-colors ${idx < blocks.length - 1 ? 'border-b border-[#F5EEE1]' : ''}`}>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-[#211E19]">{block.title}</p>
                  <p className="text-xs text-[#968C7B] font-mono mt-0.5">{block.slug}</p>
                </td>
                <td className="px-5 py-3.5 hidden sm:table-cell">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[block.type] ?? 'bg-[#F5EEE1] text-[#6F6657]'}`}>
                    {TYPE_LABELS[block.type] ?? block.type}
                  </span>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell text-[#6F6657]">v{block.version}</td>
                <td className="px-5 py-3.5 hidden lg:table-cell text-[#6F6657]">{formatDate(block.updated_at)}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[block.status]}`}>
                    {block.status === 'active' ? 'Ativo' : block.status === 'draft' ? 'Rascunho' : 'Arquivado'}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end">
                    <Link href={`/admin/modulos/globais/${block.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#968C7B] hover:bg-[#F5EEE1] hover:text-[#235139] transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
