import { AppTopbar } from './AppTopbar'

interface AppShellProps {
  children: React.ReactNode
  restaurantName?: string
  progress?: string | null
  userName?: string
}

export function AppShell({ children, restaurantName, progress, userName }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      <AppTopbar restaurantName={restaurantName} progress={progress} userName={userName} />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
