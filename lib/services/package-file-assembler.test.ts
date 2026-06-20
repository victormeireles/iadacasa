import { describe, it, expect } from 'vitest'
import { assemblePackageFiles } from './package-file-assembler'

const baseBlock = {
  order_index: 0,
  knowledge_block: {
    id: 'kb-base-001',
    title: 'Estrutura Base',
    slug: 'estrutura-base',
    type: 'base',
    content_markdown: '# Base content',
    status: 'active',
  },
}

const moduleBlock = {
  order_index: 1,
  knowledge_block: {
    id: 'kb-ficha-001',
    title: 'Ficha Técnica',
    slug: 'ficha-tecnica-modulo',
    type: 'module',
    content_markdown: '# Module content',
    status: 'active',
  },
}

describe('assemblePackageFiles', () => {
  it('creates context file plus one file per active block', () => {
    const files = assemblePackageFiles({
      restaurantName: 'Test',
      segment: 'Hamburgueria',
      moduleName: 'Ficha Técnica',
      moduleSlug: 'ficha-tecnica',
      baseAnswers: { segment: 'Hamburgueria' },
      moduleAnswers: {},
      blocks: [baseBlock, moduleBlock],
    })
    expect(files[0].filename).toBe('00-contexto-restaurante.md')
    expect(files[0].knowledge_block_id).toBeNull()
    expect(files).toHaveLength(3)
    expect(files[1].filename).toBe('01-estrutura-base.md')
    expect(files[2].filename).toBe('02-ficha-tecnica-modulo.md')
    expect(files[1].content_markdown).toContain('# Contexto — Test')
    expect(files[1].content_markdown).toContain('# Base content')
  })

  it('skips inactive blocks', () => {
    const inactive = {
      ...moduleBlock,
      knowledge_block: { ...moduleBlock.knowledge_block, status: 'archived' },
    }
    const files = assemblePackageFiles({
      restaurantName: 'Test',
      segment: 'X',
      moduleName: 'M',
      moduleSlug: 'm',
      baseAnswers: {},
      moduleAnswers: {},
      blocks: [inactive],
    })
    expect(files).toHaveLength(1)
  })
})
