import { redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/auth/session'
import { getRestaurantByUserId } from '@/lib/db/restaurants'
import { AppShell } from '@/components/layout/AppShell'
import { isSupabaseConfigured } from '@/lib/auth/session'
import { MOCK_RESTAURANT } from '@/lib/mock/users'

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser()

  if (!user) {
    redirect('/login')
  }

  // In mock mode use mock restaurant; otherwise fetch real one
  let restaurantName: string | undefined

  if (!isSupabaseConfigured()) {
    restaurantName = MOCK_RESTAURANT.name
  } else {
    const restaurant = await getRestaurantByUserId(user.id)

    // New user without restaurant — redirect to onboarding
    // (skip redirect if already on the restaurante page to avoid loops)
    if (!restaurant) {
      // We check the URL via a different mechanism — children will handle it
      // We'll pass restaurantName as undefined and let the dashboard handle the state
      restaurantName = undefined
    } else {
      restaurantName = restaurant.name
    }
  }

  return (
    <AppShell
      restaurantName={restaurantName}
      userName={user.name}
      userEmail={user.email}
      userRole={user.role}
    >
      {children}
    </AppShell>
  )
}
