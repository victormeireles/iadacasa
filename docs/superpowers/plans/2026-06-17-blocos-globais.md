# Blocos Globais Compartilhados Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Injetar blocos globais (`base`, `global_rule`) automaticamente só no primeiro módulo do restaurante; módulos gerenciam apenas blocos específicos.

**Architecture:** `lib/db/installations.ts` detecta primeiro módulo via `user_module_installations`. `package-generator.ts` concatena `getGlobalKnowledgeBlocks()` + `getBlocksForModule()` quando `isFirstModule`. Admin ganha `/admin/modulos/globais` para CRUD dos globais; painel do módulo exclui tipos globais.

**Tech Stack:** Next.js App Router, TypeScript, Supabase Postgres, server actions, mocks em `lib/mock/`.

**Spec:** `docs/superpowers/specs/2026-06-17-blocos-globais-design.md`

---

## File Map

| File | Responsibility |
|------|----------------|
| `lib/db/installations.ts` | Consultar instalações; `isFirstModuleForRestaurant` |
| `lib/mock/installations.ts` | Mock de instalações para dev sem Supabase |
| `lib/db/knowledge-blocks.ts` | `getGlobalKnowledgeBlocks()` |
| `lib/services/package-generator.ts` | Injeção condicional de globais |
| `app/actions/packages.ts` | Buscar instalações no servidor; remover prop do cliente |
| `app/(client)/app/solucoes/[slug]/ModuleFlow.tsx` | Remover `installedModules: []` |
| `components/admin/ModuleKnowledgeBlocksPanel.tsx` | Filtrar tipos globais do seletor |
| `components/admin/KnowledgeBlockEditor.tsx` | Prop `returnPath` para navegação |
| `app/(admin)/admin/modulos/globais/page.tsx` | Lista blocos globais |
| `app/(admin)/admin/modulos/globais/[id]/page.tsx` | Editar/criar bloco global |
| `app/(admin)/admin/modulos/page.tsx` | Link para globais |
| `app/actions/knowledge-blocks.ts` | Revalidar `/admin/modulos/globais` |
| `lib/mock/module-knowledge-blocks.ts` | Só vínculo específico ficha-tecnica |
| `docs/iadacasa/migrations/02_cleanup_global_module_links.sql` | Remove vínculos globais da migration 01 |
| `docs/iadacasa/migrations/README.md` | Histórico migration 02 |

---

### Task 1: Instalações — camada de dados

**Files:**
- Create: `lib/db/installations.ts`
- Create: `lib/mock/installations.ts`

- [ ] **Step 1: Criar mock de instalações**

```ts
// lib/mock/installations.ts
import type { InstallationStatus } from '@/types/database'

export interface MockInstallation {
  restaurant_id: string
  module_id: string
  module_name: string
  status: InstallationStatus
}

export const MOCK_INSTALLATIONS: MockInstallation[] = []

const GENERATED_STATUSES: InstallationStatus[] = [
  'package_generated',
  'implementation_started',
  'installed',
  'validated',
]

export function isMockFirstModule(restaurantId: string, currentModuleId?: string): boolean {
  return !MOCK_INSTALLATIONS.some(
    i =>
      i.restaurant_id === restaurantId &&
      GENERATED_STATUSES.includes(i.status) &&
      i.module_id !== currentModuleId
  )
}

export function getMockInstalledModules(restaurantId: string) {
  return MOCK_INSTALLATIONS
    .filter(i => i.restaurant_id === restaurantId && GENERATED_STATUSES.includes(i.status))
    .map(i => ({ name: i.module_name, version: '1' }))
}
```

- [ ] **Step 2: Criar `lib/db/installations.ts`**

```ts
// lib/db/installations.ts
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getMockInstalledModules, isMockFirstModule } from '@/lib/mock/installations'
import type { InstallationStatus } from '@/types/database'

const GENERATED_STATUSES: InstallationStatus[] = [
  'package_generated',
  'implementation_started',
  'installed',
  'validated',
]

export async function isFirstModuleForRestaurant(
  restaurantId: string,
  currentModuleId?: string
): Promise<boolean> {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return isMockFirstModule(restaurantId, currentModuleId)

  let query = supabase
    .from('user_module_installations')
    .select('module_id')
    .eq('restaurant_id', restaurantId)
    .in('status', GENERATED_STATUSES)

  if (currentModuleId) {
    query = query.neq('module_id', currentModuleId)
  }

  const { data } = await query.limit(1)
  return !data || data.length === 0
}

export async function getInstalledModulesForRestaurant(restaurantId: string) {
  const supabase = await createServerSupabaseClient()
  if (!supabase) return getMockInstalledModules(restaurantId)

  const { data } = await supabase
    .from('user_module_installations')
    .select('module_id, status, modules(name)')
    .eq('restaurant_id', restaurantId)
    .in('status', GENERATED_STATUSES)

  return (data ?? []).map(row => ({
    name: (row.modules as { name: string } | null)?.name ?? 'Módulo',
    version: '1',
  }))
}
```

- [ ] **Step 3: Verificar TypeScript**

Run: `npx tsc --noEmit`
Expected: sem erros

- [ ] **Step 4: Commit**

```bash
git add lib/db/installations.ts lib/mock/installations.ts
git commit -m "feat(db): add installation queries for first-module detection"
```

---

### Task 2: Blocos globais — query

**Files:**
- Modify: `lib/db/knowledge-blocks.ts`

- [ ] **Step 1: Adicionar `getGlobalKnowledgeBlocks`**

```ts
export async function getGlobalKnowledgeBlocks(): Promise<KnowledgeBlock[]> {
  const supabase = await createServerSupabaseClient()
  const globals = MOCK_KNOWLEDGE_BLOCKS.filter(
    b => (b.type === 'base' || b.type === 'global_rule') && b.status === 'active'
  )
  if (!supabase) return globals

  const { data } = await supabase
    .from('knowledge_blocks')
    .select('*')
    .in('type', ['base', 'global_rule'])
    .eq('status', 'active')
    .order('type', { ascending: true }) // base antes de global_rule
    .order('created_at', { ascending: true })

  return (data as KnowledgeBlock[]) ?? globals
}
```

- [ ] **Step 2: Verificar TypeScript**

Run: `npx tsc --noEmit`
Expected: sem erros

- [ ] **Step 3: Commit**

```bash
git add lib/db/knowledge-blocks.ts
git commit -m "feat(db): add getGlobalKnowledgeBlocks query"
```

---

### Task 3: Package generator — injeção condicional

**Files:**
- Modify: `lib/services/package-generator.ts`

- [ ] **Step 1: Importar novas funções e helper de merge**

```ts
import { isFirstModuleForRestaurant } from '@/lib/db/installations'
import { getGlobalKnowledgeBlocks } from '@/lib/db/knowledge-blocks'
import type { KnowledgeBlock } from '@/types/database'

function globalBlocksAsModuleLinks(
  globals: KnowledgeBlock[],
  moduleId: string
): ModuleKnowledgeBlockWithBlock[] {
  return globals.map((block, index) => ({
    id: `global-${block.id}`,
    module_id: moduleId,
    knowledge_block_id: block.id,
    usage_type: block.type === 'base' ? 'dependency' : 'rule',
    required: true,
    condition: null,
    order_index: index,
    knowledge_block: block,
  }))
}
```

- [ ] **Step 2: Alterar `generatePackage`**

```ts
export async function generatePackage(input: PackageGeneratorInput): Promise<SystemRecipeOutput> {
  const isFirstModule = await isFirstModuleForRestaurant(
    input.restaurantId,
    input.moduleId
  )

  const moduleBlocks = await getBlocksForModule(input.moduleId)
  const globalBlocks = isFirstModule
    ? await getGlobalKnowledgeBlocks()
    : []

  const allBlocks = [
    ...globalBlocksAsModuleLinks(globalBlocks, input.moduleId),
    ...moduleBlocks,
  ]

  const { moduleMarkdown, globalRules, sourceBlockIds } = resolveBlocks(allBlocks)
  // ... resto inalterado
}
```

- [ ] **Step 3: Verificar TypeScript**

Run: `npx tsc --noEmit`
Expected: sem erros

- [ ] **Step 4: Commit**

```bash
git add lib/services/package-generator.ts
git commit -m "feat(generator): inject global blocks only on first module"
```

---

### Task 4: Server action e ModuleFlow

**Files:**
- Modify: `app/actions/packages.ts`
- Modify: `app/(client)/app/solucoes/[slug]/ModuleFlow.tsx`

- [ ] **Step 1: Remover `installedModules` do input do cliente**

Em `GeneratePackageInput`, remover campo `installedModules`.

Em `generateAndSavePackage`, antes de `generatePackage`:

```ts
import { getInstalledModulesForRestaurant } from '@/lib/db/installations'

const installedModules = await getInstalledModulesForRestaurant(input.restaurantId)

const recipe = await generatePackage({
  ...input,
  installedModules,
})
```

- [ ] **Step 2: Remover `installedModules: []` do ModuleFlow**

```ts
const result = await generateAndSavePackage({
  restaurantId: restaurant.id,
  moduleId: module.id,
  moduleName: module.name,
  moduleSlug: module.slug,
  restaurantName: restaurant.name,
  segment: restaurant.segment,
  baseAnswers,
  moduleAnswers,
})
```

- [ ] **Step 3: Verificar TypeScript**

Run: `npx tsc --noEmit`
Expected: sem erros

- [ ] **Step 4: Commit**

```bash
git add app/actions/packages.ts "app/(client)/app/solucoes/[slug]/ModuleFlow.tsx"
git commit -m "fix(packages): resolve installed modules on server"
```

---

### Task 5: Mock — só bloco específico na ficha-tecnica

**Files:**
- Modify: `lib/mock/module-knowledge-blocks.ts`

- [ ] **Step 1: Remover vínculos globais do mock**

Manter apenas `mkb-001` (ficha-tecnica-modulo). Remover `mkb-002`, `mkb-003`, `mkb-004`.

- [ ] **Step 2: Commit**

```bash
git add lib/mock/module-knowledge-blocks.ts
git commit -m "chore(mock): remove global blocks from module links"
```

---

### Task 6: Admin globais — páginas e editor

**Files:**
- Modify: `components/admin/KnowledgeBlockEditor.tsx`
- Modify: `app/actions/knowledge-blocks.ts`
- Create: `app/(admin)/admin/modulos/globais/page.tsx`
- Create: `app/(admin)/admin/modulos/globais/[id]/page.tsx`
- Modify: `app/(admin)/admin/modulos/page.tsx`

- [ ] **Step 1: Adicionar prop `returnPath` ao KnowledgeBlockEditor**

```ts
interface KnowledgeBlockEditorProps {
  initialData?: Partial<KnowledgeBlock>
  blockId?: string
  returnPath?: string
  allowedTypes?: KnowledgeBlockType[]
}
```

Default `returnPath = '/admin/modulos/globais'`. Usar em `router.push(returnPath)` no save.

Se `allowedTypes` informado, filtrar `BLOCK_TYPES` no Select.

- [ ] **Step 2: Atualizar revalidatePath em knowledge-blocks actions**

```ts
revalidatePath('/admin/modulos/globais')
```

(manter ou remover `/admin/blocos` — rota redireciona)

- [ ] **Step 3: Criar lista `/admin/modulos/globais/page.tsx`**

- Buscar `getGlobalKnowledgeBlocks()` + blocos arquivados via query separada ou `getAllKnowledgeBlocks` filtrado
- Tabela com título, tipo, versão, status
- Botão "Novo bloco global" → `/admin/modulos/globais/novo`
- Link voltar → `/admin/modulos`

- [ ] **Step 4: Criar editor `/admin/modulos/globais/[id]/page.tsx`**

```tsx
<KnowledgeBlockEditor
  initialData={block}
  blockId={isNew ? undefined : id}
  returnPath="/admin/modulos/globais"
  allowedTypes={['base', 'global_rule']}
/>
```

- [ ] **Step 5: Link na listagem de módulos**

Em `app/(admin)/admin/modulos/page.tsx`, adicionar link secundário:

```tsx
<Link href="/admin/modulos/globais" className="text-sm text-[#235139] hover:underline">
  Blocos globais da plataforma
</Link>
```

- [ ] **Step 6: Verificar TypeScript**

Run: `npx tsc --noEmit`
Expected: sem erros

- [ ] **Step 7: Commit**

```bash
git add components/admin/KnowledgeBlockEditor.tsx app/actions/knowledge-blocks.ts \
  "app/(admin)/admin/modulos/globais/page.tsx" \
  "app/(admin)/admin/modulos/globais/[id]/page.tsx" \
  "app/(admin)/admin/modulos/page.tsx"
git commit -m "feat(admin): add global knowledge blocks management page"
```

---

### Task 7: Painel do módulo — sem tipos globais

**Files:**
- Modify: `components/admin/ModuleKnowledgeBlocksPanel.tsx`

- [ ] **Step 1: Filtrar BLOCK_TYPES**

```ts
const MODULE_BLOCK_TYPES = BLOCK_TYPES.filter(
  t => t.value !== 'base' && t.value !== 'global_rule'
)
```

Usar `MODULE_BLOCK_TYPES` no Select. Adicionar nota de ajuda:

```tsx
<p className="text-xs text-[#968C7B] mt-2">
  Blocos globais (base e regras) são gerenciados em{' '}
  <a href="/admin/modulos/globais" className="text-[#235139] underline">
    Blocos globais da plataforma
  </a>
  . São incluídos automaticamente no primeiro módulo do cliente.
</p>
```

- [ ] **Step 2: Commit**

```bash
git add components/admin/ModuleKnowledgeBlocksPanel.tsx
git commit -m "feat(admin): hide global block types from module panel"
```

---

### Task 8: Migration 02

**Files:**
- Create: `docs/iadacasa/migrations/02_cleanup_global_module_links.sql`
- Modify: `docs/iadacasa/migrations/README.md`

- [ ] **Step 1: Criar migration**

```sql
-- Migration 02 — Remove vínculos globais indevidos por módulo
-- Pré-requisito: migration 01 aplicada (ou vínculos manuais equivalentes)

delete from module_knowledge_blocks
where module_id = (select id from modules where slug = 'ficha-tecnica')
  and knowledge_block_id in (
    select id from knowledge_blocks
    where slug in (
      'estrutura-base',
      'regra-anti-duplicacao',
      'regra-planejamento'
    )
  );
```

- [ ] **Step 2: Atualizar README das migrations**

Adicionar linha na tabela de histórico:

| 02 | `02_cleanup_global_module_links.sql` | Remove vínculos globais do módulo ficha-tecnica |

- [ ] **Step 3: Commit**

```bash
git add docs/iadacasa/migrations/02_cleanup_global_module_links.sql docs/iadacasa/migrations/README.md
git commit -m "chore(db): add migration 02 to cleanup global module links"
```

---

### Task 9: Verificação manual end-to-end

- [ ] **Step 1: Rodar migration 02 no Supabase**

Run no SQL Editor o conteúdo de `02_cleanup_global_module_links.sql`

Verificar:

```sql
select kb.slug from module_knowledge_blocks mkb
join modules m on m.id = mkb.module_id
join knowledge_blocks kb on kb.id = mkb.knowledge_block_id
where m.slug = 'ficha-tecnica';
```

Expected: apenas `ficha-tecnica-modulo`

- [ ] **Step 2: Testar admin**

- `/admin/modulos` → link "Blocos globais da plataforma" visível
- `/admin/modulos/globais` → 3 blocos (base + 2 regras)
- Editar Ficha Técnica → 1 bloco na seção de conhecimento

- [ ] **Step 3: Testar geração — primeiro módulo**

Restaurante sem instalações prévias → gerar Ficha Técnica → pacote deve incluir estrutura base e regras

- [ ] **Step 4: Testar geração — módulo subsequente**

Simular instalação existente (ou gerar 2º módulo quando disponível) → pacote sem base/regras

- [ ] **Step 5: Commit final se houver ajustes**

```bash
git add -A
git commit -m "fix: address issues found in global blocks e2e testing"
```

---

## Spec Coverage Checklist

| Requisito do spec | Task |
|-------------------|------|
| `isFirstModuleForRestaurant` | Task 1 |
| `getGlobalKnowledgeBlocks` | Task 2 |
| Injeção condicional no generator | Task 3 |
| Server resolve instalações | Task 4 |
| Remover `installedModules: []` fixo | Task 4 |
| Mock sem vínculos globais | Task 5 |
| `/admin/modulos/globais` | Task 6 |
| Módulo sem tipos globais no seletor | Task 7 |
| Migration 02 | Task 8 |
| Critérios de aceite / testes manuais | Task 9 |
