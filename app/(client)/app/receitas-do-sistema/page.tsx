import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'
import { getSessionUser, isSupabaseConfigured } from '@/lib/auth/session'
import { getRestaurantByUserId } from '@/lib/db/restaurants'
import { getPackagesByRestaurant } from '@/lib/db/packages'
import { formatDateTime } from '@/lib/utils'
import { redirect } from 'next/navigation'

export default async function ReceitasPage() {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  const supabaseOn = isSupabaseConfigured()
  const restaurant = supabaseOn ? await getRestaurantByUserId(user.id) : null
  const packages = restaurant ? await getPackagesByRestaurant(restaurant.id) : []

  if (packages.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#211E19] mb-1">Receitas do Sistema</h1>
          <p className="text-[#6F6657]">Histórico de todas as receitas geradas para o seu restaurante.</p>
        </div>
        <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-12 text-center shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EEE1] mx-auto mb-4">
            <FileText className="h-7 w-7 text-[#443E35]" />
          </div>
          <h2 className="font-semibold text-[#211E19] mb-2">Nenhuma receita gerada ainda</h2>
          <p className="text-sm text-[#6F6657] mb-6">Escolha um módulo no cardápio de soluções para gerar sua primeira Receita do Sistema.</p>
          <Link href="/app/solucoes" className="inline-flex items-center gap-2 rounded-xl bg-[#235139] hover:bg-[#1B3D2E] text-white text-sm font-medium py-2.5 px-6 transition-colors">
            Ir ao cardápio de soluções
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#211E19] mb-1">Receitas do Sistema</h1>
        <p className="text-[#6F6657]">{packages.length} receita{packages.length !== 1 ? 's' : ''} gerada{packages.length !== 1 ? 's' : ''}.</p>
      </div>
      <div className="space-y-3">
        {packages.map(pkg => (
          <Link
            key={pkg.id}
            href={`/app/receitas-do-sistema/${pkg.id}`}
            className="flex items-center justify-between rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-5 hover:border-[#235139] hover:shadow-[0_4px_12px_rgba(33,30,25,0.10)] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DEEBE1]">
                <FileText className="h-5 w-5 text-[#235139]" />
              </div>
              <div>
                <p className="font-medium text-[#211E19]">{pkg.package_title}</p>
                <p className="text-xs text-[#6F6657]">{formatDateTime(pkg.generated_at)}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#968C7B] group-hover:text-[#235139] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}
