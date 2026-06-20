import { describe, it, expect } from 'vitest'
import { formatAnswersAsMarkdown, formatContextFileContent } from './format-diagnostic-context'

describe('formatAnswersAsMarkdown', () => {
  it('formats single and multiple choice answers', () => {
    const md = formatAnswersAsMarkdown(
      { segment: 'Hamburgueria', system_users: ['Eu mesmo (dono)', 'Gerente'] },
      { segment: 'Tipo do negócio', system_users: 'Quem usa o sistema' },
    )
    expect(md).toContain('**Tipo do negócio:** Hamburgueria')
    expect(md).toContain('**Quem usa o sistema:** Eu mesmo (dono), Gerente')
  })
})

describe('formatContextFileContent', () => {
  it('builds 00-contexto file with restaurant header', () => {
    const content = formatContextFileContent({
      restaurantName: 'Burger House',
      segment: 'Hamburgueria',
      baseAnswers: { number_of_units: 'Só uma' },
      moduleAnswers: { cost_visibility: 'Só o dono' },
      labelMap: { number_of_units: 'Lojas', cost_visibility: 'Visibilidade de custo' },
    })
    expect(content).toContain('# Contexto — Burger House')
    expect(content).toContain('**Lojas:** Só uma')
  })
})
