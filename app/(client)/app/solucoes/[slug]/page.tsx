import { notFound, redirect } from 'next/navigation'
import { getModuleBySlug } from '@/lib/db/modules'
import { getBaseQuestions, getModuleQuestions } from '@/lib/db/questions'
import { getSessionUser, isSupabaseConfigured } from '@/lib/auth/session'
import { getRestaurantByUserId } from '@/lib/db/restaurants'
import { MOCK_RESTAURANT } from '@/lib/mock/users'
import { ModuleFlow } from './ModuleFlow'

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [user, module] = await Promise.all([
    getSessionUser(),
    getModuleBySlug(slug),
  ])

  if (!user) redirect('/login')
  if (!module) notFound()

  // Get restaurant
  const supabaseOn = isSupabaseConfigured()
  const restaurant = supabaseOn
    ? await getRestaurantByUserId(user.id)
    : MOCK_RESTAURANT

  if (supabaseOn && !restaurant) redirect('/app/restaurante')

  // Load questions server-side
  const [baseQuestions, moduleQuestions] = await Promise.all([
    getBaseQuestions(),
    getModuleQuestions(module.id),
  ])

  return (
    <ModuleFlow
      module={module}
      baseQuestions={baseQuestions}
      moduleQuestions={moduleQuestions}
      restaurant={restaurant!}
      userId={user.id}
    />
  )
}
