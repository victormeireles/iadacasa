import Link from 'next/link'
import { Puzzle, BookOpen, Package, Users, ArrowRight } from 'lucide-react'
import { getAllModules } from '@/lib/db/modules'
import { getAllKnowledgeBlocks } from '@/lib/db/knowledge-blocks'
import { getAllPackages } from '@/lib/db/packages'
import { getAllProfiles } from '@/lib/db/profiles'

const QUICK_LINKS = [
  { href: '/admin/modulos',  icon: Puzzle,   label: 'Módulos',                 desc: 'Criar, editar e publicar módulos do cardápio',      color: 'bg-[#DEEBE1] text-[#235139]' },
  { href: '/admin/blocos',   icon: BookOpen,  label: 'Blocos de conhecimento',  desc: 'Gerenciar documentos, prompts e regras',            color: 'bg-[#F6E0D3] text-[#B25A38]' },
  { href: '/admin/pacotes',  icon: Package,   label: 'Pacotes gerados',         desc: 'Histórico de Receitas do Sistema geradas',          color: 'bg-[#F9EFD6] text-[#C28C2A]' },
  { href: '/admin/usuarios', icon: Users,     label: 'Usuários',                desc: 'Clientes e restaurantes cadastrados',               color: 'bg-[#EDD7DB] text-[#6E2A38]' },
]

export default async function AdminDashboardPage() {
  const [modules, blocks, packages, users] = await Promise.all([
    getAllModules(),
    getAllKnowledgeBlocks(),
    getAllPackages(),
    getAllProfiles(),
  ])

  const activeModules  = modules.filter(m => m.status === 'active').length
  const comingSoon     = modules.filter(m => m.status === 'coming_soon').length
  const activeBlocks   = blocks.filter(b => b.status === 'active').length
  const totalPackages  = packages.length
  const totalUsers     = users.length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#211E19] mb-1">Painel Admin</h1>
        <p className="text-[#6F6657]">Gerencie módulos, blocos de conhecimento e acompanhe os clientes.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Módulos ativos',          value: activeModules, color: 'text-[#235139]' },
          { label: 'Em breve',                value: comingSoon,    color: 'text-[#C28C2A]' },
          { label: 'Blocos de conhecimento',  value: activeBlocks,  color: 'text-[#B25A38]' },
          { label: 'Pacotes gerados',         value: totalPackages, color: 'text-[#443E35]' },
        ].map(stat => (
          <div key={stat.label} className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-4 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
            <p className={`text-2xl font-semibold mb-1 ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-[#6F6657]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 gap-4">
        {QUICK_LINKS.map(({ href, icon: Icon, label, desc, color }) => (
          <Link key={href} href={href} className="flex items-start gap-4 rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-5 hover:border-[#235139] hover:shadow-[0_4px_12px_rgba(33,30,25,0.10)] transition-all group">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#211E19] mb-0.5">{label}</p>
              <p className="text-sm text-[#6F6657]">{desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[#968C7B] group-hover:text-[#235139] shrink-0 mt-0.5 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Summary row */}
      <div className="rounded-[18px] border border-[#E2D5C0] bg-[#FFFDF9] p-5 shadow-[0_1px_3px_rgba(33,30,25,0.08)]">
        <div className="flex flex-wrap gap-6 text-sm text-[#6F6657]">
          <span><strong className="text-[#211E19]">{totalUsers}</strong> usuário{totalUsers !== 1 ? 's' : ''} cadastrado{totalUsers !== 1 ? 's' : ''}</span>
          <span><strong className="text-[#211E19]">{totalPackages}</strong> receita{totalPackages !== 1 ? 's' : ''} gerada{totalPackages !== 1 ? 's' : ''}</span>
          <span><strong className="text-[#211E19]">{modules.length}</strong> módulo{modules.length !== 1 ? 's' : ''} no total</span>
          <span><strong className="text-[#211E19]">{blocks.length}</strong> bloco{blocks.length !== 1 ? 's' : ''} de conhecimento</span>
        </div>
      </div>
    </div>
  )
}
