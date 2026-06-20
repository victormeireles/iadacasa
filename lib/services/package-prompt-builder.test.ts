import { describe, it, expect } from 'vitest'
import { buildExternalPrompt } from './package-prompt-builder'
import type { PackageFile } from '@/types/packages'

const files: PackageFile[] = [
  { filename: '00-contexto-restaurante.md', title: 'Ctx', content_markdown: '', knowledge_block_id: null, sort_order: 0 },
  { filename: '01-estrutura-base.md', title: 'Base', content_markdown: '', knowledge_block_id: '1', sort_order: 1 },
  { filename: '02-ficha-tecnica-modulo.md', title: 'FT', content_markdown: '', knowledge_block_id: '2', sort_order: 2 },
]

describe('buildExternalPrompt', () => {
  it('lists all filenames on first module', () => {
    const prompt = buildExternalPrompt({
      restaurantName: 'Burger',
      moduleName: 'Ficha Técnica',
      files,
      guideVariant: 'first_module',
    })
    expect(prompt).toContain('01-estrutura-base.md')
    expect(prompt).toContain('modo **Planejar**')
    expect(prompt).toContain('mantenha os arquivos de base')
  })

  it('mentions existing base files on additional module', () => {
    const additionalFiles = [files[0], files[2]]
    const prompt = buildExternalPrompt({
      restaurantName: 'Burger',
      moduleName: 'Estoque',
      files: additionalFiles,
      guideVariant: 'additional_module',
    })
    expect(prompt).toContain('já devem estar salvos neste projeto')
    expect(prompt).not.toContain('01-estrutura-base.md')
    expect(prompt).toContain('02-ficha-tecnica-modulo.md')
  })
})
