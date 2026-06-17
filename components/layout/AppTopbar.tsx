'use client'

import Link from 'next/link'
import { HelpCircle } from 'lucide-react'
import type { UserRole } from '@/types/database'
import { UserAccountMenu } from '@/components/layout/UserAccountMenu'

interface AppTopbarProps {
  restaurantName?: string
  progress?: string | null
  userName?: string
  userEmail?: string
  userRole?: UserRole
}

export function AppTopbar({
  restaurantName,
  progress,
  userName,
  userEmail,
  userRole,
}: AppTopbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2D5C0] bg-[#FFFDF9]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/app/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#235139]">
            <span className="text-xs font-bold text-white">IA</span>
          </div>
          <span
            className="hidden font-semibold text-[#211E19] sm:block"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            IA da Casa
          </span>
        </Link>

        {progress && (
          <span className="text-sm text-[#6F6657] font-medium whitespace-nowrap">
            {progress}
          </span>
        )}

        <div className="flex items-center gap-3 shrink-0">
          {restaurantName && (
            <span className="hidden text-sm text-[#6F6657] sm:block truncate max-w-[160px]">
              {restaurantName}
            </span>
          )}
          <Link
            href="/app/suporte"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6F6657] hover:bg-[#F5EEE1] hover:text-[#443E35] transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Ajuda</span>
          </Link>
          {userName && userEmail && userRole && (
            <UserAccountMenu
              userName={userName}
              userEmail={userEmail}
              userRole={userRole}
              context="client"
            />
          )}
        </div>
      </div>
    </header>
  )
}
