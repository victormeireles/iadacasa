'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Puzzle, BookOpen, Package,
  Users, MessageSquare, Settings, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/admin', label: 'Painel', icon: LayoutDashboard, exact: true },
  { href: '/admin/modulos', label: 'Módulos', icon: Puzzle },
  { href: '/admin/blocos', label: 'Blocos de conhecimento', icon: BookOpen },
  { href: '/admin/pacotes', label: 'Pacotes gerados', icon: Package },
  { href: '/admin/usuarios', label: 'Usuários', icon: Users },
  { href: '/admin/suporte', label: 'Travas / suporte', icon: MessageSquare },
]

interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-[#FBF7F0]">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-[#E2D5C0] bg-[#FFFDF9] md:flex md:flex-col">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-[#E2D5C0] px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#235139]">
            <span className="text-[10px] font-bold text-white">IA</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#211E19]">IA da Casa</p>
            <p className="text-[10px] text-[#968C7B]">Painel Admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  active
                    ? 'bg-[#DEEBE1] text-[#235139] font-medium'
                    : 'text-[#443E35] hover:bg-[#F5EEE1] hover:text-[#235139]'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[#E2D5C0] px-3 py-3">
          <Link
            href="/app/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#968C7B] hover:text-[#443E35] transition-colors"
          >
            <ChevronRight className="h-3 w-3" />
            Ir para área do cliente
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Admin topbar */}
        <header className="flex h-14 items-center justify-between border-b border-[#E2D5C0] bg-[#FFFDF9] px-6">
          <p className="text-sm font-medium text-[#443E35]">
            {NAV_ITEMS.find(i => (i.exact ? pathname === i.href : pathname.startsWith(i.href)))?.label ?? 'Admin'}
          </p>
          <Link
            href="/app/dashboard"
            className="text-xs text-[#968C7B] hover:text-[#235139] transition-colors"
          >
            ← Área do cliente
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
