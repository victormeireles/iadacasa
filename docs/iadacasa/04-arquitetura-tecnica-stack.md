# IA da Casa — Arquitetura técnica, stack e padrões de implementação

## 1. Objetivo deste documento

Este documento define a arquitetura técnica recomendada para a primeira versão da plataforma IA da Casa.

Ele deve orientar a implementação do projeto considerando:

* stack principal;
* organização de pastas;
* componentes;
* banco de dados;
* autenticação;
* permissões;
* painel admin;
* geração de pacotes;
* uso futuro de IA;
* deploy;
* padrões de código;
* decisões do MVP.

## 2. Stack recomendada

A stack recomendada para a IA da Casa é:

* Next.js com App Router;
* TypeScript;
* React;
* Tailwind CSS;
* shadcn/ui;
* Supabase;
* Supabase Auth;
* Supabase Postgres;
* Supabase Storage, se necessário;
* Vercel para deploy;
* camada própria de serviços para futuras chamadas de IA.

## 3. Por que essa stack

### 3.1 Next.js

Usar Next.js porque:

* é uma base forte para aplicações web modernas;
* permite criar páginas públicas e áreas logadas no mesmo projeto;
* funciona bem com Vercel;
* é compatível com Server Components e Server Actions;
* facilita separar lógica de servidor e interface;
* é bom para dashboards, painel admin e landing page.

### 3.2 TypeScript

Usar TypeScript porque:

* reduz erro em projeto que vai crescer;
* melhora autocomplete;
* facilita manutenção;
* ajuda o Codex/vibe coding a entender melhor os dados;
* evita confusão em entidades como módulos, blocos, restaurantes e pacotes gerados.

### 3.3 Supabase

Usar Supabase porque:

* entrega banco Postgres;
* autenticação;
* permissões;
* storage;
* APIs automáticas;
* possibilidade futura de edge functions;
* é simples o suficiente para MVP;
* é robusto o suficiente para escalar.

### 3.4 Tailwind + shadcn/ui

Usar Tailwind e shadcn/ui porque:

* combina bem com design system;
* facilita criar componentes rápidos;
* permite customização visual;
* evita dependência de biblioteca visual fechada;
* facilita reutilização de cards, botões, formulários, modais, tabelas e dashboards.

### 3.5 Vercel

Usar Vercel porque:

* deploy simples;
* integração natural com Next.js;
* preview por branch;
* bom para MVP;
* reduz trabalho de infraestrutura.

## 4. Decisão principal

A IA da Casa deve ser uma aplicação web própria.

Ela não deve hospedar os sistemas finais dos restaurantes.

A plataforma deve:

* cadastrar usuários;
* cadastrar restaurantes;
* mostrar módulos;
* coletar respostas;
* gerar Receita do Sistema;
* guardar histórico;
* permitir administração de conteúdos;
* preparar prompts para ferramentas externas.

A plataforma não deve, no MVP:

* criar projetos diretamente no Lovable;
* integrar com APIs do Lovable;
* hospedar o sistema final do cliente;
* controlar banco de dados do cliente externo;
* fazer deploy do sistema do cliente;
* substituir o PDV do restaurante.

## 5. Arquitetura geral

A aplicação deve ter estas grandes áreas:

1. Área pública
2. Área autenticada do cliente
3. Área admin
4. Serviços internos
5. Banco de dados Supabase
6. Camada futura de IA

## 6. Área pública

Rotas públicas sugeridas:

* `/`
* `/login`
* `/cadastro`
* `/precos`, se houver;
* `/sobre`, opcional;
* `/termos`, opcional;
* `/privacidade`, opcional.

A landing page deve explicar:

* o que é a IA da Casa;
* para quem é;
* quais dores resolve;
* como funciona;
* cardápio de soluções;
* ferramenta externa paga por fora;
* chamada para cadastro ou lista de espera.

## 7. Área do cliente

Rotas sugeridas:

* `/app`
* `/app/dashboard`
* `/app/restaurante`
* `/app/solucoes`
* `/app/solucoes/[slug]`
* `/app/modulos`
* `/app/modulos/[slug]`
* `/app/receitas-do-sistema`
* `/app/receitas-do-sistema/[id]`
* `/app/checklists/[id]`
* `/app/suporte`

A área do cliente deve permitir:

* ver cardápio de soluções;
* escolher módulo;
* responder diagnóstico;
* gerar Receita do Sistema;
* copiar prompt;
* visualizar checklist;
* marcar etapas;
* ver histórico de pacotes;
* acessar comunidade;
* enviar trava/suporte.

## 8. Área admin

Rotas sugeridas:

* `/admin`
* `/admin/modulos`
* `/admin/modulos/novo`
* `/admin/modulos/[id]`
* `/admin/blocos`
* `/admin/blocos/novo`
* `/admin/blocos/[id]`
* `/admin/perguntas`
* `/admin/checklists`
* `/admin/pacotes`
* `/admin/usuarios`
* `/admin/restaurantes`
* `/admin/suporte`
* `/admin/configuracoes`

O admin deve permitir:

* criar módulos;
* editar módulos;
* arquivar módulos;
* criar blocos de conhecimento;
* editar markdowns;
* versionar blocos;
* associar blocos a módulos;
* gerar configuração inteligente por IA no futuro;
* revisar perguntas sugeridas;
* visualizar pacotes gerados;
* simular preview de Receita do Sistema.

## 9. Organização sugerida de pastas

Estrutura recomendada:

```txt
/app
  /(public)
    page.tsx
    login/page.tsx
    cadastro/page.tsx

  /(client)
    app/dashboard/page.tsx
    app/solucoes/page.tsx
    app/solucoes/[slug]/page.tsx
    app/receitas-do-sistema/page.tsx
    app/receitas-do-sistema/[id]/page.tsx
    app/suporte/page.tsx

  /(admin)
    admin/page.tsx
    admin/modulos/page.tsx
    admin/modulos/[id]/page.tsx
    admin/blocos/page.tsx
    admin/blocos/[id]/page.tsx
    admin/pacotes/page.tsx

/components
  /ui
  /layout
  /marketing
  /dashboard
  /modules
  /forms
  /admin
  /recipes
  /checklists

/lib
  /supabase
  /auth
  /services
  /ai
  /validators
  /utils

/types
  database.ts
  modules.ts
  recipes.ts
  users.ts

/docs
  /iadacasa
```

## 10. Componentes principais

Criar componentes reutilizáveis.

### Componentes de layout

* `AppShell`
* `AdminShell`
* `Sidebar`
* `Topbar`
* `PageHeader`
* `SectionHeader`

### Componentes de módulos

* `SolutionCard`
* `ModuleCard`
* `ModuleStatusBadge`
* `ModuleProgress`
* `ModuleDependencyList`
* `ModulePreview`

### Componentes de diagnóstico

* `DiagnosticForm`
* `DiagnosticStep`
* `QuestionRenderer`
* `ProgressStepper`
* `AnswerSummary`

### Componentes de Receita do Sistema

* `RecipePreview`
* `RecipeMarkdownViewer`
* `CopyPromptButton`
* `ChecklistPanel`
* `ImplementationSteps`
* `ExternalToolWarning`

### Componentes admin

* `AdminModuleForm`
* `KnowledgeBlockEditor`
* `MarkdownEditor`
* `BlockVersionBadge`
* `ModuleBlockSelector`
* `PackagePreview`
* `AdminStatusBadge`

## 11. Banco de dados Supabase

Usar Supabase Postgres como banco principal.

Entidades principais:

* users/profiles;
* restaurants;
* client_operational_profiles;
* modules;
* knowledge_blocks;
* module_knowledge_blocks;
* module_ai_configs;
* diagnostic_questions;
* client_module_answers;
* user_module_installations;
* generated_packages;
* support_requests.

## 12. Autenticação

Usar Supabase Auth.

Regras:

* usuários clientes acessam `/app`;
* admins acessam `/admin`;
* usuários não logados são redirecionados para login;
* usar sessão segura via cookies;
* evitar guardar lógica sensível apenas no front-end;
* validar permissões no servidor sempre que possível.

## 13. Perfis e permissões

Criar uma tabela `profiles` ligada ao usuário autenticado.

Campos sugeridos:

* id;
* user_id;
* name;
* role;
* created_at;
* updated_at.

Roles:

* `client`;
* `admin`;
* `super_admin`.

No MVP, pode começar com:

* `client`;
* `admin`.

## 14. RLS e segurança no Supabase

Ativar Row Level Security nas tabelas sensíveis.

Princípios:

* cliente só acessa seus próprios restaurantes;
* cliente só acessa seus próprios pacotes gerados;
* cliente só acessa suas próprias respostas;
* admin pode acessar dados operacionais;
* blocos ativos podem ser lidos pela aplicação;
* apenas admin pode criar/editar blocos e módulos.

No MVP, se RLS atrasar a implementação, ainda assim deixar a estrutura preparada e documentar pendências.

## 15. Geração da Receita do Sistema

Criar uma camada de serviço, por exemplo:

```txt
/lib/services/package-generator.ts
```

Essa camada deve receber:

* restaurante;
* perfil operacional;
* módulo escolhido;
* respostas do diagnóstico;
* módulos oficiais já instalados;
* blocos de conhecimento necessários;
* regras globais;
* prompts padrão.

E retornar:

* título do pacote;
* markdown completo;
* prompt final;
* checklist;
* blocos usados;
* snapshots do contexto.

## 16. IA real e IA mockada

No MVP, a geração por IA pode ser mockada ou semi-template.

Mas a arquitetura deve prever uma camada futura:

```txt
/lib/ai
  ai-client.ts
  prompts.ts
  generate-module-config.ts
  generate-system-recipe.ts
```

Essa camada deve permitir trocar o provedor de IA no futuro sem reescrever a aplicação.

Exemplo de funções futuras:

* `generateModuleConfigFromMarkdown()`;
* `generateQuestionsFromKnowledgeBlock()`;
* `generateClientOperationalProfile()`;
* `generateSystemRecipe()`.

No MVP, essas funções podem retornar dados simulados ou templates preenchidos.

## 17. Markdown

Os blocos de conhecimento devem ser salvos como markdown.

O sistema deve permitir:

* criar markdown;
* editar markdown;
* visualizar preview;
* associar markdown a módulos;
* versionar markdown;
* arquivar markdown.

A Receita do Sistema também deve ser gerada em markdown.

O usuário deve conseguir:

* visualizar;
* copiar;
* baixar futuramente;
* copiar apenas o prompt final.

## 18. Editor de markdown

No MVP, o editor pode ser simples:

* textarea grande;
* preview abaixo ou ao lado;
* botão salvar;
* botão arquivar;
* campo status;
* campo tipo.

Não precisa começar com editor rico sofisticado.

## 19. Tipos de blocos de conhecimento

Tipos sugeridos:

* `base`;
* `module`;
* `reusable_registration`;
* `standard_prompt`;
* `global_rule`;
* `checklist`;
* `example`;
* `implementation_guide`.

## 20. Design system

A implementação deve respeitar o design criado no Claude Design.

Princípios visuais:

* moderno;
* limpo;
* confiável;
* gastronômico sem clichê;
* simples;
* guiado;
* humano;
* brasileiro;
* profissional.

Evitar:

* visual técnico de programador;
* excesso de roxo/neon;
* cara de dashboard financeiro frio;
* linguagem de SaaS genérico.

## 21. Linguagem da interface

Usar português.

Evitar termos técnicos.

Preferir:

* “Soluções” em vez de “Módulos”, quando for para usuário final;
* “Receita do Sistema” em vez de “Markdown gerado”;
* “Cardápio de soluções” em vez de “Catálogo de módulos”;
* “Passo a passo” em vez de “Workflow”;
* “Cadastro” em vez de “Tabela”;
* “Seu restaurante” em vez de “workspace”.

No admin, termos técnicos podem aparecer um pouco mais.

## 22. MVP técnico recomendado

Implementar primeiro:

1. Landing page.
2. Login/cadastro.
3. Dashboard do cliente.
4. Cardápio de soluções.
5. Tela do módulo Ficha Técnica e Custo.
6. Diagnóstico base.
7. Diagnóstico do módulo.
8. Geração mockada da Receita do Sistema.
9. Tela da Receita do Sistema.
10. Botão copiar prompt.
11. Checklist.
12. Admin de módulos.
13. Admin de blocos de conhecimento.
14. Preview simples de pacote.

Não implementar no MVP:

* pagamento;
* comunidade dentro da plataforma;
* integração real com Lovable;
* IA real complexa;
* marketplace;
* multi-idioma;
* editor rico avançado;
* analytics sofisticado;
* integrações com PDV;
* upload de arquivos complexo;
* notificações automáticas.

## 23. Padrão de desenvolvimento

Regras para o código:

* usar TypeScript;
* criar componentes pequenos;
* evitar arquivos gigantes;
* separar lógica de interface;
* usar services para regra de negócio;
* usar tipos compartilhados;
* evitar duplicação;
* manter nomes em inglês no código;
* manter textos da interface em português;
* não misturar lógica de admin e cliente no mesmo componente quando possível.

## 24. Nomes no código

Código em inglês:

* `modules`;
* `restaurants`;
* `knowledgeBlocks`;
* `generatedPackages`;
* `supportRequests`;
* `clientOperationalProfile`.

Texto visível ao usuário em português:

* “Soluções”;
* “Receita do Sistema”;
* “Ficha Técnica e Custo”;
* “Seu restaurante”;
* “Continuar construção”.

## 25. Fluxo de implementação recomendado para o Codex

O Codex deve implementar em etapas:

1. Ler todos os documentos.
2. Ler design system.
3. Criar estrutura do projeto.
4. Criar tokens/componentes visuais.
5. Criar layout público.
6. Criar área logada.
7. Criar mock de autenticação se Supabase ainda não estiver configurado.
8. Criar estrutura Supabase se as variáveis estiverem disponíveis.
9. Criar dashboard.
10. Criar cardápio de soluções.
11. Criar fluxo Ficha Técnica.
12. Criar gerador mockado de Receita do Sistema.
13. Criar admin básico.
14. Criar documentação de próximos passos.

## 26. Variáveis de ambiente

Preparar o projeto para usar:

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
AI_PROVIDER=
AI_API_KEY=
```

No MVP, `AI_PROVIDER` e `AI_API_KEY` podem ficar sem uso se a geração for mockada.

Nunca expor `SUPABASE_SERVICE_ROLE_KEY` no cliente.

## 27. Pagamento

Pagamento não é prioridade do primeiro build.

Mas a arquitetura deve permitir adicionar depois:

* Stripe;
* Mercado Pago;
* Asaas;
* Hotmart;
* Kiwify;
* outro.

No MVP, o acesso pode ser controlado manualmente por admin.

## 28. Deploy

Deploy recomendado:

* Vercel para aplicação;
* Supabase para banco/auth/storage;
* variáveis de ambiente configuradas na Vercel;
* branches com preview, se houver GitHub.

## 29. Critério de sucesso do MVP

O MVP técnico está bom se permitir:

1. usuário criar conta;
2. entrar no dashboard;
3. escolher Ficha Técnica e Custo;
4. responder diagnóstico;
5. gerar Receita do Sistema;
6. copiar prompt;
7. visualizar checklist;
8. admin criar/editar módulo;
9. admin criar/editar bloco markdown;
10. sistema guardar histórico básico.

## 30. Trade-off principal

Não gastar tempo demais com infraestrutura perfeita.

Prioridade:

* fluxo claro;
* boa experiência;
* design bem aplicado;
* estrutura preparada para crescer;
* admin simples;
* geração de pacote funcionando, mesmo que mockada.

A plataforma pode começar simples. O método precisa ficar claro.
