import type { UserRole } from '@/types/database'
import { AppTopbar } from './AppTopbar'

interface AppShellProps {
  children: React.ReactNode
  restaurantName?: string
  progress?: string | null
  userName?: string
  userEmail?: string
  userRole?: UserRole
}

export function AppShell({
  children,
  restaurantName,
  progress,
  userName,
  userEmail,
  userRole,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      <AppTopbar
        restaurantName={restaurantName}
        progress={progress}
        userName={userName}
        userEmail={userEmail}
        userRole={userRole}
      />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
