import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { DiagnosticQuestionsPanel } from '@/components/admin/DiagnosticQuestionsPanel'
import { getAdminQuestions } from '@/lib/db/questions'

export default async function BaseDiagnosticPage() {
  const questions = await getAdminQuestions(null)

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link href="/admin/modulos" className="inline-flex items-center gap-1.5 text-sm text-[#6F6657] hover:text-[#443E35] transition-colors mb-4">
          <ChevronLeft className="h-4 w-4" />
          Módulos
        </Link>
        <h1 className="text-2xl font-semibold text-[#211E19]">Diagnóstico base</h1>
        <p className="text-sm text-[#6F6657] mt-1">
          Perguntas exibidas no primeiro passo de qualquer módulo — antes do diagnóstico específico.
        </p>
      </div>

      <DiagnosticQuestionsPanel
        key={questions.map(q => q.id).join('-')}
        moduleId={null}
        initialQuestions={questions}
        scope="base"
      />
    </div>
  )
}
