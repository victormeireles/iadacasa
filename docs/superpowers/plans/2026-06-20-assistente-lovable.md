# Assistente Lovable — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan step-by-step. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace template-based recipe generation with deterministic markdown file packs + a 4-step Lovable setup wizard on the package result screen.

**Architecture:** `package-generator` fetches knowledge blocks (globals on first module), `package-file-assembler` builds one `.md` per block with client context prepended, `package-prompt-builder` generates a short external prompt referencing filenames. UI uses `LovableSetupWizard` instead of tabbed `RecipeViewer`. Package detail page at `/app/receitas-do-sistema/[id]`.

**Tech Stack:** Next.js 16 App Router, TypeScript, Supabase, Tailwind, Lucide, Vitest (new, for pure logic), JSZip (new, for ZIP download API route)

**Spec:** `docs/superpowers/specs/2026-06-20-assistente-lovable-design.md`

---

## File map

| File | Responsibility |
|------|----------------|
| `types/packages.ts` | `PackageFile`, `GuideVariant`, assembler input types |
| `lib/services/format-diagnostic-context.ts` | Human-readable Q&A formatting |
| `lib/services/package-file-assembler.ts` | Build `PackageFile[]` from blocks + answers |
| `lib/services/package-prompt-builder.ts` | Build `prompt_for_external_tool` from files + metadata |
| `lib/services/package-summary-builder.ts` | Short `package_markdown` summary |
| `lib/services/package-generator.ts` | Orchestrate blocks → files → prompt → recipe output |
| `lib/ai/generate-system-recipe.ts` | Delegate to deterministic assembler (keep AI path stub) |
| `types/recipes.ts` | Extend `SystemRecipeOutput` with `files`, `guideVariant` |
| `types/database.ts` | Extend `GeneratedPackage` |
| `app/actions/packages.ts` | Persist `files_json`, `guide_variant` |
| `app/api/packages/[id]/download-zip/route.ts` | Authenticated ZIP download |
| `lib/db/packages.ts` | `getPackageByIdForUser` with ownership check |
| `components/recipes/LovableSetupWizard.tsx` | 4-step wizard UI |
| `components/recipes/PackageFileList.tsx` | Download buttons + ZIP link |
| `components/recipes/RecipeViewer.tsx` | Thin wrapper or redirect to wizard |
| `app/(client)/app/receitas-do-sistema/[id]/page.tsx` | Package detail page |
| `app/(client)/app/solucoes/[slug]/ModuleFlow.tsx` | Redirect after generate; conditional first-module banner |
| `app/(client)/app/solucoes/[slug]/page.tsx` | Pass `isFirstModule` prop |
| `docs/iadacasa/migrations/03_package_files_json.sql` | DB migration |

---

### Task 1: Types and test harness

**Files:**
- Create: `types/packages.ts`
- Modify: `types/recipes.ts`
- Modify: `types/database.ts`
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Add Vitest**

```bash
npm install -D vitest
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: { environment: 'node' },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

- [ ] **Step 2: Create `types/packages.ts`**

```ts
export type GuideVariant = 'first_module' | 'additional_module'

export interface PackageFile {
  filename: string
  title: string
  content_markdown: string
  knowledge_block_id: string | null
  sort_order: number
}

export interface AssemblePackageFilesInput {
  restaurantName: string
  segment: string
  moduleName: string
  moduleSlug: string
  baseAnswers: Record<string, unknown>
  moduleAnswers: Record<string, unknown>
  blocks: Array<{
    order_index: number
    knowledge_block: {
      id: string
      title: string
      slug: string
      type: string
      content_markdown: string
      status: string
    }
  }>
}

export interface BuildExternalPromptInput {
  restaurantName: string
  moduleName: string
  files: PackageFile[]
  guideVariant: GuideVariant
}
```

- [ ] **Step 3: Extend `types/recipes.ts`**

```ts
import type { PackageFile, GuideVariant } from './packages'

export interface SystemRecipeOutput {
  title: string
  markdown: string
  promptForExternalTool: string
  checklist: ChecklistItem[]
  sourceBlockIds: string[]
  contextSnapshot: Record<string, unknown>
  files: PackageFile[]
  guideVariant: GuideVariant
}
```

- [ ] **Step 4: Extend `types/database.ts` `GeneratedPackage`**

Add fields:

```ts
files_json: PackageFile[]
guide_variant: 'first_module' | 'additional_module'
```

Import `PackageFile` from `./packages`.

- [ ] **Step 5: Commit**

```bash
git add types/packages.ts types/recipes.ts types/database.ts package.json package-lock.json vitest.config.ts
git commit -m "chore: add package types and vitest for Lovable assistant"
```

---

### Task 2: Format diagnostic context

**Files:**
- Create: `lib/services/format-diagnostic-context.ts`
- Create: `lib/services/format-diagnostic-context.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
// lib/services/format-diagnostic-context.test.ts
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
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test -- lib/services/format-diagnostic-context.test.ts
```

- [ ] **Step 3: Implement `lib/services/format-diagnostic-context.ts`**

```ts
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
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test -- lib/services/format-diagnostic-context.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add lib/services/format-diagnostic-context.ts lib/services/format-diagnostic-context.test.ts
git commit -m "feat: format diagnostic answers as markdown context"
```

---

### Task 3: Package file assembler

**Files:**
- Create: `lib/services/package-file-assembler.ts`
- Create: `lib/services/package-file-assembler.test.ts`

- [ ] **Step 1: Write failing tests**

Use mock blocks matching `MOCK_KNOWLEDGE_BLOCKS` slugs: `estrutura-base`, `ficha-tecnica-modulo`.

```ts
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
    expect(files).toHaveLength(1) // only context file
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

- [ ] **Step 3: Implement `lib/services/package-file-assembler.ts`**

```ts
import type { AssemblePackageFilesInput, PackageFile } from '@/types/packages'
import {
  formatContextFileContent,
  prependContextToBlock,
} from './format-diagnostic-context'

function padOrder(n: number): string {
  return String(n).padStart(2, '0')
}

export function assemblePackageFiles(input: AssemblePackageFilesInput): PackageFile[] {
  const allAnswers = { ...input.baseAnswers, ...input.moduleAnswers }
  const activeBlocks = input.blocks
    .filter(b => b.knowledge_block.status === 'active')
    .sort((a, b) => a.order_index - b.order_index)

  const files: PackageFile[] = []

  files.push({
    filename: '00-contexto-restaurante.md',
    title: 'Contexto do restaurante',
    content_markdown: formatContextFileContent({
      restaurantName: input.restaurantName,
      segment: input.segment,
      baseAnswers: input.baseAnswers,
      moduleAnswers: input.moduleAnswers,
    }),
    knowledge_block_id: null,
    sort_order: 0,
  })

  activeBlocks.forEach((link, index) => {
    const block = link.knowledge_block
    files.push({
      filename: `${padOrder(index + 1)}-${block.slug}.md`,
      title: block.title,
      content_markdown: prependContextToBlock({
        restaurantName: input.restaurantName,
        segment: input.segment,
        blockTitle: block.title,
        relevantAnswers: allAnswers,
        blockContent: block.content_markdown,
      }),
      knowledge_block_id: block.id,
      sort_order: index + 1,
    })
  })

  return files
}
```

- [ ] **Step 4: Run tests — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add lib/services/package-file-assembler.ts lib/services/package-file-assembler.test.ts
git commit -m "feat: assemble package markdown files from knowledge blocks"
```

---

### Task 4: External prompt builder

**Files:**
- Create: `lib/services/package-prompt-builder.ts`
- Create: `lib/services/package-prompt-builder.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
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
```

- [ ] **Step 2: Run tests — expect FAIL**

- [ ] **Step 3: Implement `lib/services/package-prompt-builder.ts`**

```ts
import type { BuildExternalPromptInput } from '@/types/packages'

const PLANNING_STEPS = `1. O que você entendeu da solicitação
2. O que encontrou no projeto atual
3. O que pretende reutilizar
4. O que pretende criar
5. O que pretende alterar
6. Quais riscos existem`

export function buildExternalPrompt(input: BuildExternalPromptInput): string {
  const fileList = input.files.map(f => `- ${f.filename}`).join('\n')
  const blockFiles = input.files.filter(f => f.knowledge_block_id !== null)
  const blockNames = blockFiles.map(f => `- ${f.filename}`).join('\n')

  if (input.guideVariant === 'first_module') {
    return `Você está implementando o módulo **${input.moduleName}** para o restaurante **${input.restaurantName}**.

Anexei os seguintes arquivos de contexto — leia todos antes de responder:
${fileList}

**Importante:** mantenha os arquivos de base e regras neste projeto. Eles serão consultados em módulos futuros.

**Não implemente nada ainda.**

Estou usando o modo **Planejar**. Responda com:
${PLANNING_STEPS}

Aguarde minha confirmação explícita antes de implementar.`.trim()
  }

  return `Você está implementando o módulo **${input.moduleName}** para o restaurante **${input.restaurantName}**.

Os arquivos de base e regras globais já devem estar salvos neste projeto (implementados em módulo anterior pela metodologia IA da Casa). Consulte-os antes de criar estruturas novas.

Anexei apenas os arquivos deste módulo:
${blockNames}

**Não implemente nada ainda.**

Estou usando o modo **Planejar**. Responda com:
${PLANNING_STEPS}

Aguarde minha confirmação explícita antes de implementar.`.trim()
}
```

- [ ] **Step 4: Run tests — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add lib/services/package-prompt-builder.ts lib/services/package-prompt-builder.test.ts
git commit -m "feat: build external Lovable prompt referencing package files"
```

---

### Task 5: Package summary + wire package-generator

**Files:**
- Create: `lib/services/package-summary-builder.ts`
- Modify: `lib/services/package-generator.ts`
- Modify: `lib/ai/generate-system-recipe.ts`

- [ ] **Step 1: Create `package-summary-builder.ts`**

```ts
export function buildPackageSummary(params: {
  moduleName: string
  restaurantName: string
  isFirstModule: boolean
  blockTitles: string[]
}): string {
  const baseNote = params.isFirstModule
    ? 'Como este é seu primeiro módulo, o pacote inclui a estrutura base do sistema (usuários, permissões e cadastros fundamentais) junto com o módulo escolhido.\n\n'
    : ''

  const blocks = params.blockTitles.length
    ? params.blockTitles.map(t => `- ${t}`).join('\n')
    : '- (nenhum bloco ativo)'

  return `# ${params.moduleName} — ${params.restaurantName}

${baseNote}Este pacote contém arquivos de contexto para anexar no Lovable e um prompt para colar em modo **Planejar**.

## Documentos incluídos
${blocks}

Siga o assistente passo a passo na tela para montar seu módulo.`.trim()
}
```

- [ ] **Step 2: Refactor `package-generator.ts`**

Replace `generateSystemRecipe` call with direct assembly:

```ts
import { assemblePackageFiles } from './package-file-assembler'
import { buildExternalPrompt } from './package-prompt-builder'
import { buildPackageSummary } from './package-summary-builder'
import { buildDefaultChecklist } from '@/lib/ai/generate-system-recipe' // export buildDefaultChecklist

// inside generatePackage, after resolveBlocks:
const isFirstModule = await isFirstModuleForRestaurant(...)
const guideVariant = isFirstModule ? 'first_module' : 'additional_module'
const files = assemblePackageFiles({
  restaurantName: input.restaurantName,
  segment: input.segment,
  moduleName: input.moduleName,
  moduleSlug: input.moduleSlug,
  baseAnswers: input.baseAnswers,
  moduleAnswers: input.moduleAnswers,
  blocks: allBlocks,
})

if (files.length <= 1) {
  throw new Error('Este módulo não tem blocos de conhecimento ativos. Configure no admin antes de gerar.')
}

const promptForExternalTool = buildExternalPrompt({
  restaurantName: input.restaurantName,
  moduleName: input.moduleName,
  files,
  guideVariant,
})

const blockTitles = files.filter(f => f.knowledge_block_id).map(f => f.title)

return {
  title: `Pacote — ${isFirstModule ? 'Base + ' : ''}${input.moduleName}`,
  markdown: buildPackageSummary({ ... }),
  promptForExternalTool,
  checklist: buildDefaultChecklist(input.moduleSlug),
  sourceBlockIds,
  contextSnapshot: { restaurantName, segment, isFirstModule },
  files,
  guideVariant,
}
```

- [ ] **Step 3: Export `buildDefaultChecklist` from `generate-system-recipe.ts`**

Change `function buildDefaultChecklist` → `export function buildDefaultChecklist`.

Make `generateSystemRecipe` call the same assembly path (or mark as deprecated wrapper).

- [ ] **Step 4: Run all tests**

```bash
npm test
npm run build
```

Expected: tests PASS, build succeeds.

- [ ] **Step 5: Commit**

```bash
git add lib/services/package-summary-builder.ts lib/services/package-generator.ts lib/ai/generate-system-recipe.ts
git commit -m "feat: wire deterministic package assembly in package-generator"
```

---

### Task 6: Database migration and persist new fields

**Files:**
- Create: `docs/iadacasa/migrations/03_package_files_json.sql`
- Modify: `docs/iadacasa/migrations/README.md`
- Modify: `app/actions/packages.ts`
- Modify: `lib/services/package-generator.ts` → `buildGeneratedPackageRecord`

- [ ] **Step 1: Create migration SQL**

```sql
-- 03: Package files for Lovable assistant
alter table generated_packages
  add column if not exists files_json jsonb not null default '[]',
  add column if not exists guide_variant text not null default 'first_module'
    check (guide_variant in ('first_module', 'additional_module'));
```

- [ ] **Step 2: Update `app/actions/packages.ts` insert**

Add to `.insert({ ... })`:

```ts
files_json: recipe.files,
guide_variant: recipe.guideVariant,
```

- [ ] **Step 3: Update `buildGeneratedPackageRecord` in package-generator.ts**

Add `files_json` and `guide_variant` fields.

- [ ] **Step 4: Run migration on Supabase** (manual, if env configured)

- [ ] **Step 5: Commit**

```bash
git add docs/iadacasa/migrations/03_package_files_json.sql docs/iadacasa/migrations/README.md app/actions/packages.ts lib/services/package-generator.ts
git commit -m "feat: persist files_json and guide_variant on generated packages"
```

---

### Task 7: ZIP download API route

**Files:**
- Create: `app/api/packages/[id]/download-zip/route.ts`
- Modify: `lib/db/packages.ts`
- Add dependency: `jszip`

- [ ] **Step 1: Install JSZip**

```bash
npm install jszip
```

- [ ] **Step 2: Add `getPackageByIdForUser` in `lib/db/packages.ts`**

```ts
export async function getPackageByIdForUser(
  packageId: string,
  userId: string,
): Promise<GeneratedPackage | null> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return null

  const { data } = await supabase
    .from('generated_packages')
    .select('*, restaurants!inner(owner_user_id)')
    .eq('id', packageId)
    .eq('user_id', userId)
    .single()

  if (!data) return null
  return data as GeneratedPackage
}
```

Adjust join if `restaurants` ownership uses different column — verify `restaurants` table in `docs/iadacasa/supabase-schema.sql` (`user_id` or `owner_user_id`).

- [ ] **Step 3: Create API route**

```ts
// app/api/packages/[id]/download-zip/route.ts
import JSZip from 'jszip'
import { getSessionUser } from '@/lib/auth/session'
import { getPackageByIdForUser } from '@/lib/db/packages'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const user = await getSessionUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  const pkg = await getPackageByIdForUser(id, user.id)
  if (!pkg) return new Response('Not found', { status: 404 })

  const zip = new JSZip()
  for (const file of pkg.files_json ?? []) {
    zip.file(file.filename, file.content_markdown)
  }
  const buffer = await zip.generateAsync({ type: 'nodebuffer' })

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="pacote-${id.slice(0, 8)}.zip"`,
    },
  })
}
```

- [ ] **Step 4: Commit**

```bash
git add app/api/packages/[id]/download-zip/route.ts lib/db/packages.ts package.json package-lock.json
git commit -m "feat: add authenticated ZIP download for package files"
```

---

### Task 8: LovableSetupWizard UI

**Files:**
- Create: `components/recipes/LovableSetupWizard.tsx`
- Create: `components/recipes/PackageFileList.tsx`
- Create: `lib/client/download-package-file.ts`

- [ ] **Step 1: Client-side single file download helper**

```ts
// lib/client/download-package-file.ts
import type { PackageFile } from '@/types/packages'

export function downloadPackageFile(file: PackageFile) {
  const blob = new Blob([file.content_markdown], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file.filename
  a.click()
  URL.revokeObjectURL(url)
}
```

- [ ] **Step 2: Create `PackageFileList.tsx`**

Props: `files: PackageFile[]`, `packageId: string`, `showBaseHint: boolean`

- Renders each file with Download button calling `downloadPackageFile`
- Link/button "Baixar todos (.zip)" → `/api/packages/${packageId}/download-zip`
- Yellow callout when `showBaseHint`: text about keeping base files in Lovable project

- [ ] **Step 3: Create `LovableSetupWizard.tsx`**

Props:

```ts
interface LovableSetupWizardProps {
  package: GeneratedPackage
  moduleName: string
  onChecklistUpdate?: (items: ChecklistItem[]) => void
}
```

Structure:

- Header with title `package.package_title`
- Progress: `Passo N de M` (M = 4 if `guide_variant === 'first_module'`, else 3)
- `useEffect` + `localStorage` key `lovable-wizard:${package.id}` for completed steps
- **Step 1** (only `first_module`): Lovable account — ExternalLink button to `https://lovable.dev`, checkbox "Já criei minha conta"
- **Step 2**: `PackageFileList` + Lovable attach instructions (+ → Anexar → Arquivo) + checkbox
- **Step 3**: prompt `<pre>`, Copy button, Planejar instructions + checkbox
- **Step 4**: execute text + checkbox + checklist from `package.checklist_json`
- Accordion: only current step fully expanded; completed show Check icon
- Collapsible summary at top: `package.package_markdown` in `<details>`

Use existing color tokens from `RecipeViewer` (`#235139`, `#FFFDF9`, etc.) and Lucide icons.

- [ ] **Step 4: Manual smoke test**

```bash
npm run dev
```

Generate a package → verify wizard renders (after Task 9 wires it).

- [ ] **Step 5: Commit**

```bash
git add components/recipes/LovableSetupWizard.tsx components/recipes/PackageFileList.tsx lib/client/download-package-file.ts
git commit -m "feat: add Lovable setup wizard and package file downloads"
```

---

### Task 9: Package detail page and ModuleFlow integration

**Files:**
- Create: `app/(client)/app/receitas-do-sistema/[id]/page.tsx`
- Modify: `components/recipes/RecipeViewer.tsx`
- Modify: `app/(client)/app/solucoes/[slug]/ModuleFlow.tsx`
- Modify: `app/(client)/app/solucoes/[slug]/page.tsx`

- [ ] **Step 1: Create detail page**

```tsx
// app/(client)/app/receitas-do-sistema/[id]/page.tsx
import { notFound, redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/auth/session'
import { getPackageByIdForUser } from '@/lib/db/packages'
import { LovableSetupWizard } from '@/components/recipes/LovableSetupWizard'

export default async function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  const { id } = await params
  const pkg = await getPackageByIdForUser(id, user.id)
  if (!pkg) notFound()

  const moduleName = pkg.package_title.replace(/^Pacote — (Base \+ )?/, '')

  return (
    <div className="max-w-3xl space-y-6">
      <LovableSetupWizard package={pkg} moduleName={moduleName} />
    </div>
  )
}
```

Prefer extracting module name from joined `modules` table if available — extend `getPackageByIdForUser` select.

- [ ] **Step 2: Update `ModuleFlow.tsx`**

After successful `generateAndSavePackage`:

```ts
router.push(`/app/receitas-do-sistema/${result.data.id}`)
```

Remove inline `RecipeViewer` step or keep as fallback redirect only.

Update loading text: `"Montando seus arquivos de contexto…"`

- [ ] **Step 3: Conditional first-module banner in `ModuleFlow` intro**

Add prop `isFirstModule: boolean` from `page.tsx`:

```tsx
// page.tsx
import { isFirstModuleForRestaurant } from '@/lib/db/installations'
const isFirstModule = restaurant ? await isFirstModuleForRestaurant(restaurant.id, module.id) : true
```

Wrap yellow banner:

```tsx
{isFirstModule && (
  <div className="rounded-lg bg-[#F9EFD6] ...">...</div>
)}
```

- [ ] **Step 4: Simplify `RecipeViewer.tsx`**

Re-export or delegate to `LovableSetupWizard` for backward compatibility if used elsewhere.

- [ ] **Step 5: Commit**

```bash
git add app/(client)/app/receitas-do-sistema/[id]/page.tsx components/recipes/RecipeViewer.tsx app/(client)/app/solucoes/[slug]/ModuleFlow.tsx app/(client)/app/solucoes/[slug]/page.tsx
git commit -m "feat: package detail page with Lovable wizard and redirect after generate"
```

---

### Task 10: Checklist persistence + final verification

**Files:**
- Modify: `app/(client)/app/receitas-do-sistema/[id]/page.tsx` or wizard client wrapper
- Existing: `app/actions/packages.ts` → `updateChecklist`

- [ ] **Step 1: Wire `onChecklistUpdate` in wizard**

Create thin client wrapper `PackageWizardClient.tsx` if needed:

```tsx
'use client'
import { updateChecklist } from '@/app/actions/packages'
// pass onChecklistUpdate that calls updateChecklist(packageId, items)
```

- [ ] **Step 2: Run full test suite + build**

```bash
npm test
npm run lint
npm run build
```

- [ ] **Step 3: Manual acceptance checklist**

- [ ] Restaurante novo → Ficha Técnica → wizard 4 passos, 3+ arquivos
- [ ] Download individual funciona
- [ ] ZIP download funciona
- [ ] Copiar prompt funciona
- [ ] `/app/receitas-do-sistema/[id]` abre do histórico
- [ ] Banner primeiro módulo só quando `isFirstModule`
- [ ] Conteúdo dos arquivos reflete blocos do admin

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: complete Lovable assistant flow with checklist persistence"
```

---

## Spec coverage self-review

| Spec requirement | Task |
|------------------|------|
| One file per block | Task 3 |
| Context prepended | Task 2, 3 |
| 00-contexto file | Task 3 |
| First module globals | Task 5 (existing package-generator) |
| External prompt | Task 4 |
| 4-step wizard | Task 8 |
| ZIP download | Task 7 |
| files_json + guide_variant | Task 6 |
| Detail route | Task 9 |
| No AI in v1 | Task 5 |
| Checklist in step 4 | Task 8, 10 |
| First module banner conditional | Task 9 |

## Out of scope (deferred)

- Lovable screenshots / GIFs (v2)
- Wizard progress in Supabase (v2)
- Anthropic/OpenAI integration
- Admin intelligent config generation
