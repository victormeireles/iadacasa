function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return 'Não informado'
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não'
  return String(value)
}

export function formatAnswersAsMarkdown(
  answers: Record<string, unknown>,
  labelMap: Record<string, string> = {},
): string {
  return Object.entries(answers)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([key, value]) => {
      const label = labelMap[key] ?? key.replace(/_/g, ' ')
      return `- **${label}:** ${formatValue(value)}`
    })
    .join('\n')
}

export function formatContextFileContent(params: {
  restaurantName: string
  segment: string
  baseAnswers: Record<string, unknown>
  moduleAnswers: Record<string, unknown>
  labelMap?: Record<string, string>
}): string {
  const labels = params.labelMap ?? {}
  const baseSection = formatAnswersAsMarkdown(params.baseAnswers, labels)
  const moduleSection = formatAnswersAsMarkdown(params.moduleAnswers, labels)

  return `# Contexto — ${params.restaurantName}

**Segmento:** ${params.segment}

## Diagnóstico do restaurante
${baseSection || '- (sem respostas adicionais)'}

## Diagnóstico do módulo
${moduleSection || '- (sem respostas adicionais)'}
`.trim()
}

export function prependContextToBlock(params: {
  restaurantName: string
  segment: string
  blockTitle: string
  relevantAnswers: Record<string, unknown>
  labelMap?: Record<string, string>
  blockContent: string
}): string {
  const answersMd = formatAnswersAsMarkdown(params.relevantAnswers, params.labelMap ?? {})
  return `# Contexto — ${params.restaurantName}

**Segmento:** ${params.segment}

${answersMd ? `**Respostas relevantes:**\n${answersMd}\n\n---\n\n` : '---\n\n'}# ${params.blockTitle}

${params.blockContent}`.trim()
}
