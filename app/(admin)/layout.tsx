import { redirect } from 'next/navigation'
import { getSessionUser, isSupabaseConfigured } from '@/lib/auth/session'
import { AdminShell } from '@/components/layout/AdminShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser()

  if (!user) {
    redirect('/login')
  }

  // In mock mode allow access; in production require admin role
  if (isSupabaseConfigured() && user.role !== 'admin' && user.role !== 'super_admin') {
    redirect('/app/dashboard')
  }

  return (
    <AdminShell
      userName={user.name}
      userEmail={user.email}
      userRole={user.role}
    >
      {children}
    </AdminShell>
  )
}
