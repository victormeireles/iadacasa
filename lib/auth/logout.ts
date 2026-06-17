'use client'

import { createClient } from '@/lib/supabase/client'
import { setMockLoggedOut } from '@/lib/auth/mock-session'

export async function logout(): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createClient()

  if (!supabase) {
    setMockLoggedOut()
    return { ok: true }
  }

  const { error } = await supabase.auth.signOut()
  if (error) {
    return { ok: false, error: error.message }
  }

  return { ok: true }
}
