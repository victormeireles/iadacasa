import Link from 'next/link'
import { Plus, Edit2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getAllModules } from '@/lib/db/modules'
import { MODULE_STATUS_LABELS, DIFFICULTY_LABELS } from '@/lib/utils'

const STATUS_COLORS: Record<string, string> = {
  active:      'bg-[#DEEBE1] text-[#235139]',
  coming_soon: 'bg-[#F9EFD6] text-[#C28C2A]',
  draft:       'bg-[#F5EEE1] text-[#6F6657]',
  archived:    'bg-[#EDE3D2] text-[#443E35]',
}

export default async function AdminModulosPage() {
  const modules = await getAllModules()

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#211E19] mb-1">Módulos</h1>
          <p className="text-[#6F6657]">{modules.length} módulo{modules.length !== 1 ? 's' : ''} cadastrado{modules.length !== 1 ? 's' : ''}.</p>
          <Link href="/admin/modulos/globais" className="inline-block text-sm text-[#235139] hover:underline mt-2">
            Blocos globais da plataforma
          </Link>
        </div>
        <Link href="/admin/modulos/novo">
          <Button className="bg-[#235139] hover:bg-[#1B3D2E] text-white shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Novo módulo
          </Button>
        </Link>
      </div>

      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] overflow-hidden shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E2D5C0] bg-[#F5EEE1]">
              <th className="text-left px-5 py-3 font-semibold text-[#443E35]">Módulo</th>
              <th className="text-left px-5 py-3 font-semibold text-[#443E35] hidden sm:table-cell">Dificuldade</th>
              <th className="text-left px-5 py-3 font-semibold text-[#443E35] hidden md:table-cell">Tempo</th>
              <th className="text-left px-5 py-3 font-semibold text-[#443E35]">Status</th>
              <th className="text-right px-5 py-3 font-semibold text-[#443E35]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module, idx) => (
              <tr key={module.id} className={`hover:bg-[#FBF7F0] transition-colors ${idx < modules.length - 1 ? 'border-b border-[#F5EEE1]' : ''}`}>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-[#211E19]">{module.name}</p>
                  <p className="text-xs text-[#968C7B] mt-0.5 hidden sm:block truncate max-w-xs">{module.short_description}</p>
                </td>
                <td className="px-5 py-3.5 hidden sm:table-cell text-[#6F6657]">
                  {DIFFICULTY_LABELS[module.difficulty_level]}
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell text-[#6F6657]">
                  {module.estimated_time}
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[module.status]}`}>
                    {MODULE_STATUS_LABELS[module.status]}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/modulos/${module.id}/preview`} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#968C7B] hover:bg-[#F5EEE1] hover:text-[#443E35] transition-colors" title="Visualizar">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link href={`/admin/modulos/${module.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#968C7B] hover:bg-[#F5EEE1] hover:text-[#235139] transition-colors" title="Editar">
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
