import { notFound, redirect } from 'next/navigation'
import { getModuleBySlug } from '@/lib/db/modules'
import { getBaseAnswersForRestaurant } from '@/lib/db/answers'
import { getBaseQuestions, getModuleQuestions } from '@/lib/db/questions'
import { isFirstModuleForRestaurant } from '@/lib/db/installations'
import { baseAnswersFromRestaurant, mergeBaseAnswers } from '@/lib/diagnostic/restaurant-answers'
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

  // Load questions and any previously saved base answers
  const [baseQuestions, moduleQuestions, savedBaseAnswers] = await Promise.all([
    getBaseQuestions(),
    getModuleQuestions(module.id),
    supabaseOn ? getBaseAnswersForRestaurant(restaurant!.id) : Promise.resolve(null),
  ])

  const initialBaseAnswers = mergeBaseAnswers(
    baseAnswersFromRestaurant(restaurant!),
    savedBaseAnswers ?? undefined,
  )

  const isFirstModule = supabaseOn
    ? await isFirstModuleForRestaurant(restaurant!.id, module.id)
    : true

  return (
    <ModuleFlow
      module={module}
      baseQuestions={baseQuestions}
      moduleQuestions={moduleQuestions}
      restaurant={restaurant!}
      userId={user.id}
      isFirstModule={isFirstModule}
      initialBaseAnswers={initialBaseAnswers}
    />
  )
}
