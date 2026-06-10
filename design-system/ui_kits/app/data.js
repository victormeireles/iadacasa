/* IA da Casa — UI kit demo data */
window.IA_APP_DATA = {
  restaurant: { name: 'Bar do Zé', plan: 'Cozinha organizada', city: 'São Paulo · SP' },

  modules: [
    { key: 'ficha', accent: 'ficha', icon: 'clipboard-list', title: 'Ficha Técnica',
      desc: 'Padronize fichas e calcule o custo real de cada prato.', time: '~5 min',
      dor: 'Não sei o custo certo de cada prato.' },
    { key: 'receitas', accent: 'receitas', icon: 'cooking-pot', title: 'Receitas',
      desc: 'Centralize o modo de preparo e mantenha o padrão da casa.', time: '~6 min',
      dor: 'Cada um faz de um jeito na cozinha.' },
    { key: 'estoque', accent: 'estoque', icon: 'package', title: 'Estoque',
      desc: 'Saiba o que tem, o que falta e o que está vencendo.', time: '~7 min',
      dor: 'Sempre falta ingrediente na hora errada.' },
    { key: 'compras', accent: 'compras', icon: 'shopping-cart', title: 'Compras',
      desc: 'Liste o que comprar com base no consumo real.', time: '~5 min',
      dor: 'Compro no susto e gasto demais.' },
    { key: 'checklist', accent: 'checklist', icon: 'list-checks', title: 'Checklist',
      desc: 'Rotinas de abertura e fechamento sem esquecer nada.', time: '~4 min',
      dor: 'A equipe esquece etapas da rotina.' },
    { key: 'financeiro', accent: 'financeiro', icon: 'wallet', title: 'Financeiro',
      desc: 'Controle entradas, saídas e o caixa do dia.', time: '~8 min',
      dor: 'Não sei se o dia fechou no positivo.', status: 'soon' },
  ],

  /* Questionário do módulo Ficha Técnica */
  questions: [
    { id: 'op', kind: 'select', label: 'Qual o tipo da sua operação?',
      options: ['Hamburgueria', 'Pizzaria', 'Bar', 'Restaurante', 'Cafeteria'], value: 'Hamburgueria' },
    { id: 'pratos', kind: 'input', label: 'Quantos itens no cardápio, mais ou menos?',
      placeholder: 'Ex.: 24', value: '24', hint: 'Não precisa ser exato.' },
    { id: 'hoje', kind: 'textarea', label: 'Como você calcula o preço dos pratos hoje?',
      placeholder: 'Conte do seu jeito. A gente organiza depois.',
      value: 'Olho o preço dos concorrentes e chuto uma margem por cima do custo dos ingredientes principais.' },
    { id: 'controlar', kind: 'checks', label: 'O que você quer controlar?',
      options: [
        { label: 'Custo por porção', checked: true },
        { label: 'Margem de lucro alvo', checked: true },
        { label: 'Rendimento da receita', checked: false },
        { label: 'Validade dos insumos', checked: false },
      ] },
  ],

  steps: [
    { title: 'Escolher módulo', status: 'done' },
    { title: 'Responder o questionário', status: 'current', description: 'Conte como funciona hoje.' },
    { title: 'Revisar regras de negócio', status: 'upcoming' },
    { title: 'Receber a Receita do Sistema', status: 'upcoming' },
  ],

  /* Receita do Sistema gerada (Ficha Técnica) */
  recipe: {
    module: 'Ficha Técnica',
    summary: 'Um módulo onde você cadastra cada prato com seus ingredientes e quantidades. O sistema calcula o custo por porção e sugere o preço de venda pela margem que você definir — atualizando sozinho quando o preço de um insumo muda.',
    rules: [
      'Cada prato tem uma lista de ingredientes com quantidade e unidade.',
      'O custo do prato é a soma (quantidade × preço unitário) de cada ingrediente.',
      'O preço sugerido = custo ÷ (1 − margem alvo).',
      'Se faltar o preço de um ingrediente, o prato fica marcado como "custo incompleto".',
      'Alterou o preço de um insumo? Todos os pratos que o usam são recalculados.',
    ],
    prompt: `# Módulo: Ficha Técnica — IA da Casa
Você é um assistente de fichas técnicas para um restaurante.

Contexto: operação de hamburgueria, ~24 itens no cardápio.
Objetivo: calcular o custo por porção e sugerir o preço de venda.

Para cada prato, peça:
- nome do prato
- ingredientes (item, quantidade, unidade, preço unitário)
- margem alvo (%)

Então calcule:
- custo_total = soma(quantidade × preço_unitário)
- preço_sugerido = custo_total ÷ (1 − margem/100)

Sinalize pratos com ingrediente sem preço como "custo incompleto".`,
    build: [
      { title: 'Crie o app no Lovable', description: 'Cole o prompt acima como descrição inicial do projeto.' },
      { title: 'Adicione a tabela de ingredientes', description: 'Campos: nome, unidade, preço unitário.' },
      { title: 'Adicione a tabela de pratos', description: 'Cada prato referencia ingredientes com quantidade.' },
      { title: 'Ligue o cálculo de custo e preço', description: 'Use a regra de margem para sugerir o preço.' },
      { title: 'Teste com 3 pratos reais', description: 'Confira se o custo bate com a sua conta.' },
    ],
  },
};
