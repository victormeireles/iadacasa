import { aiComplete, isAIConfigured } from './ai-client'
import { SYSTEM_PROMPT_RECIPE_GENERATOR, buildRecipePrompt } from './prompts'
import type { SystemRecipeOutput } from '@/types/recipes'
import type { ChecklistItem } from '@/types/database'

interface RecipeInput {
  restaurantName: string
  segment: string
  moduleName: string
  moduleSlug: string
  installedModules: Array<{ name: string; version: string }>
  baseAnswers: Record<string, unknown>
  moduleAnswers: Record<string, unknown>
  moduleMarkdown: string
  globalRules: string
}

/**
 * Generates a System Recipe (Receita do Sistema) for the client.
 * Uses real AI when configured, falls back to template generation.
 */
export async function generateSystemRecipe(input: RecipeInput): Promise<SystemRecipeOutput> {
  if (isAIConfigured()) {
    return generateWithAI(input)
  }
  return generateWithTemplate(input)
}

async function generateWithAI(input: RecipeInput): Promise<SystemRecipeOutput> {
  const userPrompt = buildRecipePrompt({
    restaurantName: input.restaurantName,
    segment: input.segment,
    moduleName: input.moduleName,
    installedModules: input.installedModules.map(m => `${m.name} v${m.version}`),
    baseAnswers: input.baseAnswers,
    moduleAnswers: input.moduleAnswers,
    moduleMarkdown: input.moduleMarkdown,
    globalRules: input.globalRules,
  })

  const markdown = await aiComplete([
    { role: 'system', content: SYSTEM_PROMPT_RECIPE_GENERATOR },
    { role: 'user', content: userPrompt },
  ])

  return {
    title: `Receita do Sistema — ${input.moduleName}`,
    markdown,
    promptForExternalTool: extractPromptBlock(markdown),
    checklist: buildDefaultChecklist(input.moduleSlug),
    sourceBlockIds: [],
    contextSnapshot: { restaurantName: input.restaurantName, segment: input.segment },
    files: [],
    guideVariant: input.installedModules.length === 0 ? 'first_module' : 'additional_module',
  }
}

function generateWithTemplate(input: RecipeInput): SystemRecipeOutput {
  const isFirstModule = input.installedModules.length === 0
  const answers = { ...input.baseAnswers, ...input.moduleAnswers }

  const hasAddons = answers.has_addons === true || answers.has_addons === 'true'
  const hasCombos = answers.product_types === 'Combos também' || answers.product_types === 'Os dois'
  const showMargin = answers.calculation_scope !== 'Só o custo do produto'
  const costVisibility = answers.cost_visibility as string ?? 'Só o dono'
  const includePrep = answers.include_preparation_method === 'Composição, custo e modo de preparo'
  const multiUnit = answers.ingredient_cost_type === 'Varia por loja'

  const markdown = `# Receita do Sistema — ${isFirstModule ? 'Base + ' : ''}${input.moduleName}

## Contexto do restaurante

**Restaurante:** ${input.restaurantName}
**Segmento:** ${answers.segment ?? input.segment}
**Lojas:** ${answers.number_of_units ?? '1'}
**Usuários do sistema:** ${Array.isArray(answers.system_users) ? (answers.system_users as string[]).join(', ') : answers.system_users ?? 'dono'}
**Sistemas atuais:** ${answers.current_systems ?? 'Não informado'}
**Nível técnico:** ${answers.technical_level ?? 'Baixo'}

${isFirstModule ? `## Atenção: primeiro módulo

Como este é o seu primeiro módulo, vamos preparar também a **estrutura mínima do sistema**: restaurante, usuários e permissões.
Você vai sentir que está criando a Ficha Técnica — e vai! Só que por trás, o sistema já estará preparado para crescer.

` : `## Módulos já instalados

${input.installedModules.map(m => `- ${m.name} v${m.version} (instalado pela IA da Casa)`).join('\n')}

`}## O que será criado

${isFirstModule ? `### Estrutura base
- Cadastro do restaurante
- Usuários e perfis de acesso (dono, gerente${Array.isArray(answers.system_users) && (answers.system_users as string[]).includes('Atendimento / Caixa') ? ', operador' : ''})
- Permissões por perfil

### Ficha Técnica e Custo
` : ''}
- Cadastro de ingredientes (nome, unidade de medida, custo por unidade)
- Unidades de medida (kg, g, L, ml, unidade, porção)
- Cadastro de produtos do cardápio
- Ficha técnica com composição e cálculo de custo${showMargin ? ' e margem' : ''}
${hasCombos ? '- Suporte a combos (produto composto de outros produtos)\n' : ''}\
${hasAddons ? '- Suporte a adicionais com impacto no custo\n' : ''}\
${includePrep ? '- Modo de preparo dentro da ficha técnica\n' : ''}

## O que NÃO será criado agora

- Controle de estoque
- Pedidos de compra
- Integração com PDV
- Relatórios financeiros avançados
- Gestão de fornecedores
- Escalas e RH

## Regras de negócio

1. O custo do produto é a soma de (custo do ingrediente × quantidade usada) para cada item da ficha técnica.
${showMargin ? '2. Margem de lucro = (preço de venda − custo) ÷ preço de venda × 100.\n' : ''}
3. **Visibilidade de custo${showMargin ? ' e margem' : ''}:** ${costVisibility.toLowerCase()}.
4. Ao atualizar o custo de um ingrediente, todos os produtos que o utilizam devem recalcular automaticamente.
${multiUnit ? '5. O custo dos ingredientes pode variar por unidade (loja). A ficha técnica usa o custo da loja atual.\n' : ''}

## Cadastros necessários

| Cadastro | Campos principais |
|---|---|
| Ingredientes | nome, unidade de medida, custo por unidade |
| Produtos | nome, categoria, preço de venda |
| Fichas Técnicas | produto, lista de ingredientes, quantidade de cada um |
${hasCombos ? '| Combos | nome, produtos que compõem, quantidade de cada |\n' : ''}

## Telas necessárias

1. **Lista de ingredientes** — com custo e unidade; botão de editar
2. **Cadastrar / editar ingrediente** — nome, unidade, custo
3. **Lista de produtos** — com custo calculado${showMargin ? ' e margem' : ''}
4. **Cadastrar / editar produto** — com ficha técnica embutida (selecionar ingredientes + quantidades)
5. **Visualizar ficha técnica** — custo total, custo por porção${showMargin ? ', margem' : ''}
${includePrep ? '6. **Modo de preparo** — campo de texto dentro do cadastro do produto\n' : ''}

## Permissões

| Ação | Quem pode |
|---|---|
| Cadastrar e editar ingredientes | ${costVisibility === 'Qualquer pessoa com acesso ao sistema' ? 'Todos' : 'Dono e gerente'} |
| Ver custo${showMargin ? ' e margem' : ''} dos produtos | ${costVisibility} |
| Cadastrar e editar produtos | ${costVisibility === 'Qualquer pessoa com acesso ao sistema' ? 'Todos' : 'Dono e gerente'} |
| Ver lista de produtos (sem custo) | Todos |

## Instruções de reaproveitamento

${isFirstModule
  ? 'Este é o primeiro módulo. Crie toda a estrutura do zero.'
  : `Este restaurante já tem módulos instalados oficialmente pela IA da Casa.
Antes de criar qualquer tabela ou tela, analise o projeto atual.
Reaproveite: tabelas de usuários, permissões, ingredientes e unidades de medida se já existirem.`}

---

## Prompt para ferramenta externa

\`\`\`
Você está trabalhando no sistema de gestão personalizado do restaurante ${input.restaurantName}.
Este sistema está sendo construído com base na metodologia IA da Casa.

Sua tarefa é implementar o módulo: **${input.moduleName}**
${isFirstModule ? '\nComo este é o primeiro módulo, crie também a estrutura base: restaurante, usuários e permissões.' : ''}

**Módulos já instalados pela IA da Casa:**
${input.installedModules.length > 0 ? input.installedModules.map(m => `- ${m.name} v${m.version}`).join('\n') : '- Nenhum (primeiro módulo)'}

**O que criar:**
- Cadastro de ingredientes (nome, unidade, custo)
- Cadastro de produtos do cardápio
- Ficha técnica (composição + cálculo de custo${showMargin ? ' e margem' : ''})
${hasCombos ? '- Suporte a combos\n' : ''}\
${hasAddons ? '- Suporte a adicionais\n' : ''}

**O que NÃO criar agora:**
- Estoque, compras, financeiro, PDV, RH

**Permissões:**
- Custo${showMargin ? ' e margem' : ''} visível apenas para: ${costVisibility.toLowerCase()}

**REGRA ANTI-DUPLICAÇÃO:**
Antes de criar qualquer tabela, tela ou cadastro, analise o projeto atual. Se já existir algo equivalente, reutilize. Não crie duplicidade. Se houver dúvida, apresente as opções antes de executar.

**REGRA DE PLANEJAMENTO:**
Antes de implementar qualquer coisa, responda:
1. O que entendeu
2. O que encontrou no projeto atual
3. O que pretende reutilizar
4. O que pretende criar
5. O que pretende alterar
6. Quais riscos existem

**Não implemente nada até eu confirmar o plano.**
\`\`\`

---

## Checklist de validação

${buildDefaultChecklist(input.moduleSlug).map(item => `- [ ] ${item.text}`).join('\n')}
`

  const promptMatch = markdown.match(/```\n([\s\S]*?)\n```/)
  const promptForExternalTool = promptMatch ? promptMatch[1] : ''

  return {
    title: `Receita do Sistema — ${isFirstModule ? 'Base + ' : ''}${input.moduleName}`,
    markdown,
    promptForExternalTool,
    checklist: buildDefaultChecklist(input.moduleSlug),
    sourceBlockIds: ['kb-base-001', 'kb-ficha-001', 'kb-rule-global-001', 'kb-rule-planning-001'],
    contextSnapshot: {
      restaurantName: input.restaurantName,
      segment: answers.segment ?? input.segment,
      isFirstModule,
    },
    files: [],
    guideVariant: isFirstModule ? 'first_module' : 'additional_module',
  }
}

function extractPromptBlock(markdown: string): string {
  const match = markdown.match(/```[\w]*\n([\s\S]*?)\n```/)
  return match ? match[1] : ''
}

export function buildDefaultChecklist(moduleSlug: string): ChecklistItem[] {
  const base: ChecklistItem[] = [
    { id: 'cl-1', text: 'Login funciona corretamente', completed: false, category: 'acesso' },
    { id: 'cl-2', text: 'Usuário dono acessa o sistema', completed: false, category: 'acesso' },
    { id: 'cl-3', text: 'Permissões estão aplicadas corretamente', completed: false, category: 'acesso' },
    { id: 'cl-4', text: 'Telas funcionam no celular', completed: false, category: 'usabilidade' },
    { id: 'cl-5', text: 'Dados salvos permanecem após atualizar a página', completed: false, category: 'dados' },
  ]

  if (moduleSlug === 'ficha-tecnica') {
    return [
      ...base,
      { id: 'cl-ft-1', text: 'Cadastrar um ingrediente com unidade e custo', completed: false, category: 'ficha-tecnica' },
      { id: 'cl-ft-2', text: 'Editar o custo de um ingrediente', completed: false, category: 'ficha-tecnica' },
      { id: 'cl-ft-3', text: 'Cadastrar um produto do cardápio', completed: false, category: 'ficha-tecnica' },
      { id: 'cl-ft-4', text: 'Montar a ficha técnica com ingredientes e quantidades', completed: false, category: 'ficha-tecnica' },
      { id: 'cl-ft-5', text: 'Custo total do produto calculado corretamente', completed: false, category: 'ficha-tecnica' },
      { id: 'cl-ft-6', text: 'Validar o cálculo manualmente em pelo menos um produto real', completed: false, category: 'ficha-tecnica' },
      { id: 'cl-ft-7', text: 'Custo/margem invisível para operador (se configurado)', completed: false, category: 'permissoes' },
      { id: 'cl-ft-8', text: 'Ao alterar custo de ingrediente, custo do produto atualiza', completed: false, category: 'ficha-tecnica' },
      { id: 'cl-ft-9', text: 'Nenhum módulo anterior quebrou', completed: false, category: 'regressao' },
    ]
  }

  return base
}
