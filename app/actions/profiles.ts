'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { UserRole } from '@/types/database'

export async function updateUserRole(profileId: string, newRole: UserRole) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return { error: 'Supabase não configurado' }

  // Confirm the caller is an admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autenticado' }

  const { data: caller } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (!caller || (caller.role !== 'admin' && caller.role !== 'super_admin')) {
    return { error: 'Sem permissão' }
  }

  // Super admin only can create other super admins
  if (newRole === 'super_admin' && caller.role !== 'super_admin') {
    return { error: 'Apenas super admin pode promover para super admin' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', profileId)

  if (error) return { error: error.message }

  revalidatePath('/admin/usuarios')
  return { success: true }
}
