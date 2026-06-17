'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, LayoutDashboard, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import type { UserRole } from '@/types/database'
import { logout } from '@/lib/auth/logout'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface UserAccountMenuProps {
  userName: string
  userEmail: string
  userRole: UserRole
  context: 'client' | 'admin'
}

function isAdminRole(role: UserRole) {
  return role === 'admin' || role === 'super_admin'
}

export function UserAccountMenu({
  userName,
  userEmail,
  userRole,
  context,
}: UserAccountMenuProps) {
  const router = useRouter()
  const showAdminLink = context === 'client' && isAdminRole(userRole)
  const showClientLink = context === 'admin'

  async function handleLogout() {
    const result = await logout()
    if (!result.ok) {
      toast.error('Não foi possível sair. Tente novamente.')
      return
    }
    toast.success('Você saiu da conta')
    router.push('/login')
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#235139] text-white text-xs font-semibold outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#235139] focus-visible:ring-offset-2"
        aria-label={`Menu de ${userName}`}
      >
        {userName.slice(0, 1).toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-48 border-[#E2D5C0] bg-[#FFFDF9] text-[#443E35]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <p className="text-sm font-medium text-[#211E19]">{userName}</p>
            <p className="text-xs font-normal text-[#968C7B] truncate">{userEmail}</p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        {(showAdminLink || showClientLink) && (
          <>
            <DropdownMenuSeparator className="bg-[#E2D5C0]" />
            {showAdminLink && (
              <DropdownMenuItem
                render={<Link href="/admin" />}
                nativeButton={false}
                className="cursor-pointer text-[#443E35] focus:bg-[#F5EEE1] focus:text-[#235139]"
              >
                <LayoutDashboard className="h-4 w-4" />
                Painel admin
              </DropdownMenuItem>
            )}
            {showClientLink && (
              <DropdownMenuItem
                render={<Link href="/app/dashboard" />}
                nativeButton={false}
                className="cursor-pointer text-[#443E35] focus:bg-[#F5EEE1] focus:text-[#235139]"
              >
                <ArrowLeft className="h-4 w-4" />
                Área do cliente
              </DropdownMenuItem>
            )}
          </>
        )}

        <DropdownMenuSeparator className="bg-[#E2D5C0]" />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          className="cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
