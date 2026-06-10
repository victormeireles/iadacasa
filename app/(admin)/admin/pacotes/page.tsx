import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'
import { getAllPackages } from '@/lib/db/packages'
import { formatDateTime } from '@/lib/utils'

export default async function AdminPacotesPage() {
  const packages = await getAllPackages()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#211E19] mb-1">Pacotes gerados</h1>
        <p className="text-[#6F6657]">
          {packages.length > 0
            ? `${packages.length} receita${packages.length !== 1 ? 's' : ''} gerada${packages.length !== 1 ? 's' : ''}.`
            : 'Nenhum pacote gerado ainda.'}
        </p>
      </div>

      {packages.length === 0 ? (
        <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-12 text-center shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EEE1] mx-auto mb-4">
            <FileText className="h-7 w-7 text-[#443E35]" />
          </div>
          <h2 className="font-semibold text-[#211E19] mb-2">Nenhum pacote gerado ainda</h2>
          <p className="text-sm text-[#6F6657]">Quando os clientes gerarem Receitas do Sistema, elas aparecerão aqui.</p>
        </div>
      ) : (
        <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] overflow-hidden shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2D5C0] bg-[#F5EEE1]">
                <th className="text-left px-5 py-3 font-semibold text-[#443E35]">Receita</th>
                <th className="text-left px-5 py-3 font-semibold text-[#443E35] hidden sm:table-cell">Restaurante</th>
                <th className="text-left px-5 py-3 font-semibold text-[#443E35] hidden md:table-cell">Módulo</th>
                <th className="text-left px-5 py-3 font-semibold text-[#443E35] hidden lg:table-cell">Gerado em</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, idx) => (
                <tr key={pkg.id} className={`hover:bg-[#FBF7F0] transition-colors ${idx < packages.length - 1 ? 'border-b border-[#F5EEE1]' : ''}`}>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-[#211E19]">{pkg.package_title}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell text-[#6F6657]">{pkg.restaurant_name ?? '—'}</td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-[#6F6657]">{pkg.module_name ?? '—'}</td>
                  <td className="px-5 py-3.5 hidden lg:table-cell text-[#6F6657]">{formatDateTime(pkg.generated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
