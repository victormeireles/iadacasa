'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { updateUserRole } from '@/app/actions/profiles'
import type { UserRole } from '@/types/database'

interface UserRoleSelectorProps {
  profileId: string
  currentRole: UserRole
  isSelf: boolean
  canSetSuperAdmin: boolean
}

const ROLES: Array<{ value: UserRole; label: string; color: string; desc: string }> = [
  { value: 'client',      label: 'Cliente',     color: 'bg-[#DEEBE1] text-[#235139]', desc: 'Só área do cliente' },
  { value: 'admin',       label: 'Admin',        color: 'bg-[#F9EFD6] text-[#A9761F]', desc: 'Acessa painel admin' },
  { value: 'super_admin', label: 'Super admin',  color: 'bg-[#EDD7DB] text-[#6E2A38]', desc: 'Pode gerenciar admins' },
]

export function UserRoleSelector({ profileId, currentRole, isSelf, canSetSuperAdmin }: UserRoleSelectorProps) {
  const [role, setRole] = useState<UserRole>(currentRole)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const current = ROLES.find(r => r.value === role) ?? ROLES[0]
  const available = ROLES.filter(r => r.value !== 'super_admin' || canSetSuperAdmin)

  if (isSelf) {
    return (
      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${current.color}`}>
        {current.label}
      </span>
    )
  }

  async function handleSelect(newRole: UserRole) {
    if (newRole === role) { setOpen(false); return }
    setLoading(true)
    setOpen(false)

    const result = await updateUserRole(profileId, newRole)
    if (result.error) {
      toast.error(result.error)
    } else {
      setRole(newRole)
      toast.success(`Perfil alterado para ${ROLES.find(r => r.value === newRole)?.label}.`)
    }
    setLoading(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        disabled={loading}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-opacity',
          current.color,
          loading && 'opacity-50 cursor-not-allowed',
          !loading && 'hover:opacity-80 cursor-pointer'
        )}
      >
        {loading ? '…' : current.label}
        {!loading && <ChevronDown className="h-3 w-3" />}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-8 z-20 w-44 rounded-xl border border-[#E2D5C0] bg-[#FFFDF9] shadow-[0_8px_24px_rgba(33,30,25,0.12)] overflow-hidden">
            {available.map(r => (
              <button
                key={r.value}
                onClick={() => handleSelect(r.value)}
                className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left hover:bg-[#F5EEE1] transition-colors"
              >
                <span className={`mt-0.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${r.color}`}>
                  {r.label}
                </span>
                <span className="text-xs text-[#6F6657] leading-relaxed flex-1">{r.desc}</span>
                {r.value === role && <Check className="h-3.5 w-3.5 text-[#235139] shrink-0 mt-0.5" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
