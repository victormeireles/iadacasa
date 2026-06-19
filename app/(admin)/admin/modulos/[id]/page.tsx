import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ModuleForm } from '@/components/admin/ModuleForm'
import { getModuleById } from '@/lib/db/modules'
import { getBlocksForModule } from '@/lib/db/module-knowledge-blocks'
import { getAdminQuestions } from '@/lib/db/questions'

export default async function EditModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'novo'
  const moduleData = isNew ? undefined : await getModuleById(id)
  const [knowledgeBlocks, diagnosticQuestions] = isNew || !moduleData
    ? [[], []]
    : await Promise.all([
        getBlocksForModule(id),
        getAdminQuestions(id),
      ])

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link href="/admin/modulos" className="inline-flex items-center gap-1.5 text-sm text-[#6F6657] hover:text-[#443E35] transition-colors mb-4">
          <ChevronLeft className="h-4 w-4" />
          Módulos
        </Link>
        <h1 className="text-2xl font-semibold text-[#211E19]">
          {isNew ? 'Novo módulo' : `Editar: ${moduleData?.name ?? id}`}
        </h1>
      </div>
      <ModuleForm
        initialData={moduleData ?? undefined}
        moduleId={isNew ? undefined : id}
        knowledgeBlocks={knowledgeBlocks}
        diagnosticQuestions={diagnosticQuestions}
      />
    </div>
  )
}
