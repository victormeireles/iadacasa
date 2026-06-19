import type { DiagnosticQuestion, Restaurant, RestaurantSegment } from '@/types/database'

const SEGMENT_LABELS: Record<RestaurantSegment, string> = {
  hamburgueria: 'Hamburgueria',
  restaurante: 'Restaurante',
  pizzaria: 'Pizzaria',
  bar: 'Bar',
  cafeteria: 'Cafeteria',
  dark_kitchen: 'Dark kitchen / Delivery',
  delivery: 'Dark kitchen / Delivery',
  outro: 'Outro',
}

const TECHNICAL_LEVEL_LABELS: Record<'baixo' | 'medio' | 'alto', string> = {
  baixo: 'Baixa — prefiro o mais simples possível',
  medio: 'Média — consigo usar um app sem dificuldade',
  alto: 'Alta — me sinto confortável com ferramentas novas',
}

export function segmentToDiagnosticLabel(segment: RestaurantSegment): string {
  return SEGMENT_LABELS[segment]
}

export function numberOfUnitsToDiagnosticLabel(units: number): string {
  if (units <= 1) return 'Só uma'
  if (units <= 3) return '2 ou 3'
  return '4 ou mais'
}

/** Maps restaurant profile fields to base diagnostic answer keys. */
export function baseAnswersFromRestaurant(restaurant: Restaurant): Record<string, unknown> {
  const answers: Record<string, unknown> = {
    restaurant_name: restaurant.name,
    segment: segmentToDiagnosticLabel(restaurant.segment),
    number_of_units: numberOfUnitsToDiagnosticLabel(restaurant.number_of_units),
  }

  if (restaurant.technical_level) {
    answers.technical_level = TECHNICAL_LEVEL_LABELS[restaurant.technical_level]
  }

  if (restaurant.current_systems) {
    answers.current_systems = restaurant.current_systems
  }

  return answers
}

export function isAnswerProvided(value: unknown): boolean {
  if (value === undefined || value === null || value === '') return false
  if (Array.isArray(value) && value.length === 0) return false
  return true
}

export function isBaseDiagnosticComplete(
  questions: DiagnosticQuestion[],
  answers: Record<string, unknown>,
): boolean {
  return questions
    .filter(q => q.required)
    .every(q => isAnswerProvided(answers[q.variable_key]))
}

export function getPendingBaseQuestions(
  questions: DiagnosticQuestion[],
  answers: Record<string, unknown>,
): DiagnosticQuestion[] {
  return questions.filter(q => q.required && !isAnswerProvided(answers[q.variable_key]))
}

export function mergeBaseAnswers(
  ...sources: Array<Record<string, unknown> | undefined>
): Record<string, unknown> {
  return sources.reduce<Record<string, unknown>>((merged, source) => {
    if (!source) return merged
    for (const [key, value] of Object.entries(source)) {
      if (isAnswerProvided(value)) merged[key] = value
    }
    return merged
  }, {})
}
