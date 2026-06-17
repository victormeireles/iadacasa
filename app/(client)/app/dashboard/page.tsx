import Link from 'next/link'
import { ArrowRight, BookOpen, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSessionUser, isSupabaseConfigured } from '@/lib/auth/session'
import { getRestaurantByUserId } from '@/lib/db/restaurants'
import { getPublicModules } from '@/lib/db/modules'
import { getPackagesByRestaurant } from '@/lib/db/packages'
import { MOCK_RESTAURANT } from '@/lib/mock/users'
import { MOCK_MODULES } from '@/lib/mock/modules'
import { redirect } from 'next/navigation'

const ONBOARDING_STEPS = [
  'Escolha um módulo no cardápio de soluções',
  'Responda as perguntas do diagnóstico',
  'Receba e copie a Receita do Sistema',
  'Monte o módulo no Lovable com o prompt',
]

export default async function DashboardPage() {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  const firstName = user.name?.split(' ')[0] ?? 'Olá'
  const supabaseOn = isSupabaseConfigured()

  // Get restaurant (real or mock)
  const restaurant = supabaseOn ? await getRestaurantByUserId(user.id) : MOCK_RESTAURANT

  // No restaurant yet → redirect to onboarding
  if (supabaseOn && !restaurant) {
    redirect('/app/restaurante')
  }

  // Get modules and packages
  const modules = supabaseOn ? await getPublicModules() : MOCK_MODULES
  const packages = supabaseOn && restaurant ? await getPackagesByRestaurant(restaurant.id) : []

  const activeModules = modules.filter(m => m.status === 'active')
  const installedCount = packages.length
  const isNewUser = installedCount === 0

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold text-[#211E19] mb-1">
          Olá, {firstName} 👋
        </h1>
        <p className="text-[#6F6657]">
          Bem-vindo ao painel do <strong>{restaurant?.name}</strong>. Por onde quer começar?
        </p>
      </div>

      {/* Onboarding hero — guides new users to the solutions menu */}
      {isNewUser && (
        <div className="rounded-[18px] bg-[#235139] p-6 sm:p-8 text-white shadow-[0_4px_12px_rgba(33,30,25,0.15)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-[#8FB59C] text-xs font-semibold uppercase tracking-widest mb-2">
                Por onde começar
              </p>
              <h2 className="text-xl font-semibold text-white mb-4 leading-snug">
                Siga estes passos para criar seu primeiro módulo
              </h2>
              <ol className="space-y-2.5">
                {ONBOARDING_STEPS.map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8FB59C]/30 text-[10px] font-bold text-white mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[#DEEBE1] leading-relaxed">{text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <Link href="/app/solucoes" className="shrink-0 w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#D8A23E] hover:bg-[#C28C2A] text-[#211E19] font-semibold whitespace-nowrap">
                Explorar cardápio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Módulos disponíveis', value: activeModules.length, color: 'text-[#235139]' },
          { label: 'Receitas geradas', value: installedCount, color: installedCount > 0 ? 'text-[#235139]' : 'text-[#443E35]' },
          { label: 'Módulos instalados', value: 0, color: 'text-[#443E35]' },
          { label: 'Checklists ativos', value: 0, color: 'text-[#443E35]' },
        ].map(stat => (
          <div key={stat.label} className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-4 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
            <p className={`text-2xl font-semibold mb-1 ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-[#6F6657]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Packages history */}
      {packages.length > 0 && (
        <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#211E19]">Receitas do Sistema geradas</h3>
            <Link href="/app/receitas-do-sistema" className="text-xs text-[#235139] hover:underline">
              Ver todas →
            </Link>
          </div>
          <div className="space-y-2">
            {packages.slice(0, 3).map(pkg => (
              <Link
                key={pkg.id}
                href={`/app/receitas-do-sistema/${pkg.id}`}
                className="flex items-center justify-between rounded-lg border border-[#E2D5C0] p-3 hover:border-[#235139] hover:bg-[#ECF3ED] transition-colors"
              >
                <p className="text-sm font-medium text-[#211E19]">{pkg.package_title}</p>
                <ArrowRight className="h-3.5 w-3.5 text-[#968C7B]" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Two columns */}
      <div className="grid sm:grid-cols-2 gap-6">
        {isNewUser ? (
          <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
            <h3 className="font-semibold text-[#211E19] mb-3">Como funciona</h3>
            <p className="text-sm text-[#6F6657] leading-relaxed">
              Escolha um módulo, responda algumas perguntas sobre o seu negócio e a IA da Casa
              gera uma <strong className="text-[#443E35]">Receita do Sistema</strong> personalizada — com regras de negócio,
              telas e um prompt pronto para você montar no Lovable.
            </p>
          </div>
        ) : (
          <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
            <h3 className="font-semibold text-[#211E19] mb-4">Próximos passos</h3>
            <ol className="space-y-3">
              {ONBOARDING_STEPS.map((text, i) => {
                const done = i === 2 && installedCount > 0
                return (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold mt-0.5 ${done ? 'bg-[#235139] text-white' : 'bg-[#E2D5C0] text-[#443E35]'}`}>
                      {done ? '✓' : i + 1}
                    </span>
                    <span className={`text-sm ${done ? 'line-through text-[#968C7B]' : 'text-[#443E35]'}`}>{text}</span>
                  </li>
                )
              })}
            </ol>
            <Link href="/app/solucoes" className="mt-5 block">
              <Button variant="outline" className="w-full border-[#E2D5C0] text-[#443E35] hover:bg-[#F5EEE1]">
                Ver cardápio de soluções
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {/* Help */}
        <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-6 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
          <h3 className="font-semibold text-[#211E19] mb-4">Ajuda e comunidade</h3>
          <div className="space-y-3">
            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-lg border border-[#E2D5C0] p-3 hover:border-[#235139] hover:bg-[#ECF3ED] transition-colors"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#DEEBE1]">
                <MessageSquare className="h-4 w-4 text-[#235139]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#211E19]">Grupo da comunidade</p>
                <p className="text-xs text-[#6F6657]">WhatsApp — dúvidas, cases e suporte</p>
              </div>
            </a>
            <Link href="/app/suporte" className="flex items-start gap-3 rounded-lg border border-[#E2D5C0] p-3 hover:border-[#235139] hover:bg-[#ECF3ED] transition-colors">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F6E0D3]">
                <BookOpen className="h-4 w-4 text-[#B25A38]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#211E19]">Reportar uma trava</p>
                <p className="text-xs text-[#6F6657]">Formulário para dúvidas e problemas</p>
              </div>
            </Link>
          </div>
          <div className="mt-4 rounded-lg bg-[#F5EEE1] p-3">
            <p className="text-xs text-[#6F6657] leading-relaxed">
              <strong className="text-[#443E35]">Lembrete:</strong> A IA da Casa guia a construção.
              A ferramenta externa (Lovable) é paga separadamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
