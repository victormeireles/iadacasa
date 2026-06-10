import type { KnowledgeBlock } from '@/types/database'

export const MOCK_KNOWLEDGE_BLOCKS: KnowledgeBlock[] = [
  {
    id: 'kb-base-001',
    title: 'Estrutura Base do Sistema',
    slug: 'estrutura-base',
    type: 'base',
    content_markdown: `# Estrutura Base do Sistema

## Objetivo
Criar a estrutura mínima necessária para qualquer módulo funcionar: autenticação, restaurante, usuários e permissões.

## Cadastros necessários
- Restaurante (nome, segmento, configurações)
- Usuários (nome, email, perfil)
- Permissões por perfil (dono, gerente, operador)

## Regras de negócio
- Cada restaurante tem um dono principal
- Permissões controlam o que cada usuário pode ver e fazer
- Dados financeiros (custo, margem) devem ter visibilidade restrita por padrão

## Instruções para ferramenta externa
Criar tabelas: restaurants, users, profiles, permissions
Configurar autenticação básica com email/senha
Implementar controle de acesso por perfil
`,
    version: 1,
    status: 'active',
    created_by: 'mock-admin-001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'kb-ficha-001',
    title: 'Ficha Técnica e Custo — Módulo',
    slug: 'ficha-tecnica-modulo',
    type: 'module',
    content_markdown: `# Ficha Técnica e Custo

## Objetivo
Permitir que o restaurante cadastre ingredientes, monte fichas técnicas dos produtos e calcule custo real e margem.

## Cadastros necessários
- Ingredientes (nome, unidade de medida, custo por unidade)
- Unidades de medida (kg, g, L, ml, unidade, porção)
- Produtos do cardápio (nome, categoria, preço de venda)
- Fichas técnicas (produto + lista de ingredientes + quantidades)

## Regras de negócio
- O custo do produto é a soma dos custos de cada ingrediente × quantidade usada
- A margem = (preço de venda - custo) / preço de venda × 100
- Custo e margem são informações restritas (visíveis apenas por perfis autorizados)
- Ao atualizar o custo de um ingrediente, o custo de todos os produtos que o usam deve recalcular automaticamente

## Telas necessárias
- Lista de ingredientes (com custo e unidade)
- Cadastro/edição de ingrediente
- Lista de produtos
- Cadastro/edição de produto com ficha técnica
- Visualização de ficha técnica com custo calculado

## Escopo deste módulo
- Calcular custo e margem
- Cadastrar ingredientes e fichas
- Opcional: modo de preparo

## Fora do escopo
- Controle de estoque
- Pedidos de compra
- Integração com PDV
- Relatórios avançados
`,
    version: 1,
    status: 'active',
    created_by: 'mock-admin-001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'kb-rule-global-001',
    title: 'Regra Anti-Duplicação',
    slug: 'regra-anti-duplicacao',
    type: 'global_rule',
    content_markdown: `# Regra Anti-Duplicação

Antes de criar qualquer nova tabela, tela, componente, cadastro ou fluxo, analise o projeto atual e verifique se já existe alguma estrutura equivalente ou parecida.

Se já existir, reutilize e adapte. Não crie duplicidade.

Se houver dúvida entre reutilizar algo existente ou criar algo novo, pare e apresente as opções antes de executar.

Preserve os dados existentes. Não apague, renomeie ou altere estruturas importantes sem necessidade clara.
`,
    version: 1,
    status: 'active',
    created_by: 'mock-admin-001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'kb-rule-planning-001',
    title: 'Regra de Planejamento Obrigatório',
    slug: 'regra-planejamento',
    type: 'global_rule',
    content_markdown: `# Regra de Planejamento Obrigatório

Toda implementação deve começar com planejamento.

Antes de executar, a ferramenta externa deve responder:
1. O que entendeu da solicitação
2. O que encontrou no projeto atual
3. O que pretende reutilizar
4. O que pretende criar
5. O que pretende alterar
6. Quais riscos existem
7. Quais confirmações precisa do usuário

**A ferramenta só deve implementar depois de confirmação explícita.**
`,
    version: 1,
    status: 'active',
    created_by: 'mock-admin-001',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export function getBlocksByType(type: string): KnowledgeBlock[] {
  return MOCK_KNOWLEDGE_BLOCKS.filter(b => b.type === type && b.status === 'active')
}

export function getBlockById(id: string): KnowledgeBlock | undefined {
  return MOCK_KNOWLEDGE_BLOCKS.find(b => b.id === id)
}
