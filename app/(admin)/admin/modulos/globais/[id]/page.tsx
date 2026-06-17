import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { KnowledgeBlockEditor } from '@/components/admin/KnowledgeBlockEditor'
import { getKnowledgeBlockById } from '@/lib/db/knowledge-blocks'
import { formatDate } from '@/lib/utils'

export default async function EditGlobalBlockPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'novo'
  const block = isNew ? undefined : await getKnowledgeBlockById(id)

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link href="/admin/modulos/globais" className="inline-flex items-center gap-1.5 text-sm text-[#6F6657] hover:text-[#443E35] transition-colors mb-4">
          <ChevronLeft className="h-4 w-4" />
          Blocos globais
        </Link>
        <h1 className="text-2xl font-semibold text-[#211E19]">
          {isNew ? 'Novo bloco global' : `Editar: ${block?.title ?? id}`}
        </h1>
        {block && (
          <p className="text-sm text-[#6F6657] mt-1">v{block.version} · Atualizado em {formatDate(block.updated_at)}</p>
        )}
      </div>
      <KnowledgeBlockEditor
        initialData={block ?? undefined}
        blockId={isNew ? undefined : id}
        returnPath="/admin/modulos/globais"
        allowedTypes={['base', 'global_rule']}
      />
    </div>
  )
}
