-- ============================================================
--  IA da Casa — Schema completo do Supabase
--  Execute no SQL Editor do Supabase (Project > SQL Editor > New query)
--  Pode rodar tudo de uma vez: selecione tudo (Ctrl+A) e clique em Run
-- ============================================================


-- ============================================================
-- 0. EXTENSÕES E UTILITÁRIOS
-- ============================================================

-- UUID gerado automaticamente
create extension if not exists "pgcrypto";

-- Função auxiliar: atualiza updated_at automaticamente em qualquer tabela
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;


-- ============================================================
-- 1. PROFILES (perfil do usuário, ligado ao auth.users do Supabase)
-- ============================================================

create table if not exists profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null default '',
  email       text not null default '',
  role        text not null default 'client'
                check (role in ('client', 'admin', 'super_admin')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id)
);

create trigger set_profiles_updated_at
  before update on profiles
  for each row execute function handle_updated_at();

-- Cria perfil automaticamente quando um usuário se cadastra
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (user_id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.email, ''),
    'client'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();


-- ============================================================
-- 2. RESTAURANTS
-- ============================================================

create table if not exists restaurants (
  id               uuid primary key default gen_random_uuid(),
  owner_user_id    uuid not null references auth.users(id) on delete cascade,
  name             text not null,
  segment          text not null default 'restaurante'
                     check (segment in (
                       'hamburgueria','restaurante','pizzaria','bar',
                       'cafeteria','dark_kitchen','delivery','outro'
                     )),
  city             text,
  state            text,
  number_of_units  int not null default 1,
  operation_type   text,
  technical_level  text check (technical_level in ('baixo','medio','alto')),
  current_systems  text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists idx_restaurants_owner on restaurants(owner_user_id);

create trigger set_restaurants_updated_at
  before update on restaurants
  for each row execute function handle_updated_at();


-- ============================================================
-- 3. CLIENT_OPERATIONAL_PROFILES (resumo gerado após diagnóstico base)
-- ============================================================

create table if not exists client_operational_profiles (
  id              uuid primary key default gen_random_uuid(),
  restaurant_id   uuid not null references restaurants(id) on delete cascade,
  summary         text not null default '',
  structured_data jsonb not null default '{}',
  source_answers  jsonb not null default '{}',
  version         int  not null default 1,
  generated_at    timestamptz not null default now()
);

create index if not exists idx_cop_restaurant on client_operational_profiles(restaurant_id);


-- ============================================================
-- 4. MODULES (cardápio de soluções)
-- ============================================================

create table if not exists modules (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  slug             text not null unique,
  short_description text not null default '',
  pain             text not null default '',
  expected_result  text not null default '',
  segment          text not null default 'todos',
  difficulty_level text not null default 'basico'
                     check (difficulty_level in ('basico','intermediario','avancado')),
  estimated_time   text not null default '',
  status           text not null default 'draft'
                     check (status in ('draft','active','coming_soon','archived')),
  order_index      int  not null default 99,
  icon             text,
  color_key        text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists idx_modules_status on modules(status);
create index if not exists idx_modules_order  on modules(order_index);

create trigger set_modules_updated_at
  before update on modules
  for each row execute function handle_updated_at();


-- ============================================================
-- 5. KNOWLEDGE_BLOCKS (biblioteca de conhecimento)
-- ============================================================

create table if not exists knowledge_blocks (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  type             text not null
                     check (type in (
                       'base','module','reusable_registration','standard_prompt',
                       'global_rule','checklist','example','implementation_guide'
                     )),
  content_markdown text not null default '',
  version          int  not null default 1,
  status           text not null default 'draft'
                     check (status in ('draft','active','archived')),
  created_by       uuid references auth.users(id) on delete set null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists idx_kb_type   on knowledge_blocks(type);
create index if not exists idx_kb_status on knowledge_blocks(status);

create trigger set_kb_updated_at
  before update on knowledge_blocks
  for each row execute function handle_updated_at();


-- ============================================================
-- 6. MODULE_KNOWLEDGE_BLOCKS (relacionamento módulo ↔ bloco)
-- ============================================================

create table if not exists module_knowledge_blocks (
  id                  uuid primary key default gen_random_uuid(),
  module_id           uuid not null references modules(id) on delete cascade,
  knowledge_block_id  uuid not null references knowledge_blocks(id) on delete cascade,
  usage_type          text not null default 'required_context'
                        check (usage_type in (
                          'required_context','optional_context',
                          'dependency','checklist','prompt','rule'
                        )),
  required            boolean not null default true,
  condition           text,
  order_index         int not null default 0,
  unique (module_id, knowledge_block_id)
);

create index if not exists idx_mkb_module on module_knowledge_blocks(module_id);
create index if not exists idx_mkb_block  on module_knowledge_blocks(knowledge_block_id);


-- ============================================================
-- 7. DIAGNOSTIC_QUESTIONS (perguntas dos diagnósticos)
-- ============================================================

create table if not exists diagnostic_questions (
  id            uuid primary key default gen_random_uuid(),
  module_id     uuid references modules(id) on delete cascade,
                -- NULL = pergunta do diagnóstico base (não pertence a nenhum módulo)
  question_text text not null,
  question_type text not null
                  check (question_type in (
                    'text','textarea','number',
                    'single_choice','multiple_choice','boolean'
                  )),
  options       jsonb,   -- array de strings para single/multiple_choice
  required      boolean not null default true,
  max_length    int,
  order_index   int not null default 0,
  condition     text,    -- lógica condicional futura (ex: "if multi_unidade == true")
  variable_key  text not null,
  status        text not null default 'active'
                  check (status in ('active','archived')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_dq_module on diagnostic_questions(module_id);
create index if not exists idx_dq_status on diagnostic_questions(status);

create trigger set_dq_updated_at
  before update on diagnostic_questions
  for each row execute function handle_updated_at();


-- ============================================================
-- 8. CLIENT_MODULE_ANSWERS (respostas dos diagnósticos por restaurante)
-- ============================================================

create table if not exists client_module_answers (
  id            uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  module_id     uuid references modules(id) on delete set null,
  user_id       uuid not null references auth.users(id) on delete cascade,
  answers_json  jsonb not null default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_cma_restaurant on client_module_answers(restaurant_id);
create index if not exists idx_cma_module     on client_module_answers(module_id);

create trigger set_cma_updated_at
  before update on client_module_answers
  for each row execute function handle_updated_at();


-- ============================================================
-- 9. USER_MODULE_INSTALLATIONS (histórico oficial de módulos instalados)
-- ============================================================

create table if not exists user_module_installations (
  id                   uuid primary key default gen_random_uuid(),
  restaurant_id        uuid not null references restaurants(id) on delete cascade,
  module_id            uuid not null references modules(id) on delete restrict,
  module_version       text,
  status               text not null default 'not_started'
                         check (status in (
                           'not_started','diagnostic_started','diagnostic_completed',
                           'package_generated','implementation_started',
                           'installed','validated','needs_adjustment','archived'
                         )),
  started_at           timestamptz,
  generated_at         timestamptz,
  installed_at         timestamptz,
  validated_at         timestamptz,
  generated_package_id uuid,  -- referência preenchida após geração (FK adicionada abaixo)
  unique (restaurant_id, module_id)
);

create index if not exists idx_umi_restaurant on user_module_installations(restaurant_id);
create index if not exists idx_umi_status     on user_module_installations(status);


-- ============================================================
-- 10. GENERATED_PACKAGES (Receitas do Sistema geradas)
-- ============================================================

create table if not exists generated_packages (
  id                       uuid primary key default gen_random_uuid(),
  restaurant_id            uuid not null references restaurants(id) on delete cascade,
  module_id                uuid not null references modules(id) on delete restrict,
  user_id                  uuid not null references auth.users(id) on delete cascade,
  package_title            text not null,
  package_markdown         text not null default '',
  prompt_for_external_tool text not null default '',
  checklist_json           jsonb not null default '[]',
  source_blocks_json       jsonb not null default '{}',
  client_context_snapshot  jsonb not null default '{}',
  module_answers_snapshot  jsonb not null default '{}',
  generated_at             timestamptz not null default now(),
  status                   text not null default 'active'
                             check (status in ('active','archived'))
);

create index if not exists idx_gp_restaurant on generated_packages(restaurant_id);
create index if not exists idx_gp_module     on generated_packages(module_id);
create index if not exists idx_gp_generated  on generated_packages(generated_at desc);

-- Agora que generated_packages existe, adiciona a FK em user_module_installations
alter table user_module_installations
  add constraint fk_umi_package
  foreign key (generated_package_id)
  references generated_packages(id)
  on delete set null;


-- ============================================================
-- 11. SUPPORT_REQUESTS (formulários de travas)
-- ============================================================

create table if not exists support_requests (
  id                  uuid primary key default gen_random_uuid(),
  restaurant_id       uuid not null references restaurants(id) on delete cascade,
  user_id             uuid not null references auth.users(id) on delete cascade,
  module_id           uuid references modules(id) on delete set null,
  tool_used           text,
  issue_description   text not null default '',
  intended_action     text not null default '',
  actual_result       text not null default '',
  prompt_used         text,
  screenshot_url      text,
  status              text not null default 'open'
                        check (status in ('open','reviewing','answered','solved','closed')),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists idx_sr_restaurant on support_requests(restaurant_id);
create index if not exists idx_sr_status     on support_requests(status);

create trigger set_sr_updated_at
  before update on support_requests
  for each row execute function handle_updated_at();


-- ============================================================
-- 12. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Habilitar RLS em todas as tabelas
alter table profiles                   enable row level security;
alter table restaurants                enable row level security;
alter table client_operational_profiles enable row level security;
alter table modules                    enable row level security;
alter table knowledge_blocks           enable row level security;
alter table module_knowledge_blocks    enable row level security;
alter table diagnostic_questions       enable row level security;
alter table client_module_answers      enable row level security;
alter table user_module_installations  enable row level security;
alter table generated_packages         enable row level security;
alter table support_requests           enable row level security;

-- ── Helper: verifica se o usuário atual é admin ou super_admin ──
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles
    where user_id = auth.uid()
    and role in ('admin', 'super_admin')
  );
$$ language sql security definer stable;


-- ── profiles ──
create policy "Usuário lê o próprio perfil"
  on profiles for select
  using (user_id = auth.uid() or is_admin());

create policy "Usuário atualiza o próprio perfil"
  on profiles for update
  using (user_id = auth.uid());

create policy "Admin lê todos os perfis"
  on profiles for select
  using (is_admin());


-- ── restaurants ──
create policy "Cliente lê o próprio restaurante"
  on restaurants for select
  using (owner_user_id = auth.uid() or is_admin());

create policy "Cliente cria restaurante"
  on restaurants for insert
  with check (owner_user_id = auth.uid());

create policy "Cliente atualiza o próprio restaurante"
  on restaurants for update
  using (owner_user_id = auth.uid() or is_admin());


-- ── client_operational_profiles ──
create policy "Cliente lê o próprio perfil operacional"
  on client_operational_profiles for select
  using (
    restaurant_id in (
      select id from restaurants where owner_user_id = auth.uid()
    ) or is_admin()
  );

create policy "Cliente cria perfil operacional"
  on client_operational_profiles for insert
  with check (
    restaurant_id in (
      select id from restaurants where owner_user_id = auth.uid()
    )
  );


-- ── modules (leitura pública para ativos; escrita só admin) ──
create policy "Qualquer um lê módulos ativos"
  on modules for select
  using (status in ('active','coming_soon') or is_admin());

create policy "Admin gerencia módulos"
  on modules for all
  using (is_admin());


-- ── knowledge_blocks (leitura para autenticados; escrita só admin) ──
create policy "Autenticado lê blocos ativos"
  on knowledge_blocks for select
  using (status = 'active' or is_admin());

create policy "Admin gerencia blocos"
  on knowledge_blocks for all
  using (is_admin());


-- ── module_knowledge_blocks ──
create policy "Autenticado lê associações"
  on module_knowledge_blocks for select
  using (auth.uid() is not null);

create policy "Admin gerencia associações"
  on module_knowledge_blocks for all
  using (is_admin());


-- ── diagnostic_questions ──
create policy "Autenticado lê perguntas ativas"
  on diagnostic_questions for select
  using (status = 'active' or is_admin());

create policy "Admin gerencia perguntas"
  on diagnostic_questions for all
  using (is_admin());


-- ── client_module_answers ──
create policy "Cliente lê as próprias respostas"
  on client_module_answers for select
  using (user_id = auth.uid() or is_admin());

create policy "Cliente insere respostas"
  on client_module_answers for insert
  with check (user_id = auth.uid());

create policy "Cliente atualiza as próprias respostas"
  on client_module_answers for update
  using (user_id = auth.uid());


-- ── user_module_installations ──
create policy "Cliente lê as próprias instalações"
  on user_module_installations for select
  using (
    restaurant_id in (
      select id from restaurants where owner_user_id = auth.uid()
    ) or is_admin()
  );

create policy "Cliente gerencia as próprias instalações"
  on user_module_installations for all
  using (
    restaurant_id in (
      select id from restaurants where owner_user_id = auth.uid()
    )
  );


-- ── generated_packages ──
create policy "Cliente lê os próprios pacotes"
  on generated_packages for select
  using (user_id = auth.uid() or is_admin());

create policy "Cliente cria pacotes"
  on generated_packages for insert
  with check (user_id = auth.uid());


-- ── support_requests ──
create policy "Cliente lê os próprios chamados"
  on support_requests for select
  using (user_id = auth.uid() or is_admin());

create policy "Cliente abre chamado"
  on support_requests for insert
  with check (user_id = auth.uid());

create policy "Admin atualiza chamados"
  on support_requests for update
  using (is_admin());


-- ============================================================
-- 13. SEED — Módulos iniciais
-- ============================================================

insert into modules (id, name, slug, short_description, pain, expected_result, segment, difficulty_level, estimated_time, status, order_index, icon, color_key)
values
  (
    gen_random_uuid(),
    'Ficha Técnica e Custo',
    'ficha-tecnica',
    'Cadastre ingredientes, monte fichas técnicas e descubra o custo real dos seus produtos.',
    'Não saber o custo real e a margem dos produtos do cardápio.',
    'Módulo para cadastrar ingredientes, montar ficha técnica e calcular custo e margem.',
    'todos', 'basico', '1 a 3 horas', 'active', 1, 'clipboard-list', 'ficha'
  ),
  (
    gen_random_uuid(),
    'Receitas Operacionais',
    'receitas',
    'Padronize o preparo dos seus produtos com receitas detalhadas passo a passo.',
    'Falta de padronização no preparo e variação de qualidade.',
    'Módulo de receitas com modo de preparo, fotos e controle de versão.',
    'todos', 'basico', '2 a 4 horas', 'coming_soon', 2, 'cooking-pot', 'receitas'
  ),
  (
    gen_random_uuid(),
    'Estoque de Insumos',
    'estoque',
    'Controle entradas, saídas e estoque atual dos seus insumos em tempo real.',
    'Desorganização e perdas no estoque de ingredientes.',
    'Módulo de controle de estoque com alertas de reposição.',
    'todos', 'intermediario', '3 a 6 horas', 'coming_soon', 3, 'package', 'estoque'
  ),
  (
    gen_random_uuid(),
    'Compras',
    'compras',
    'Organize pedidos de compra, fornecedores e histórico de preços.',
    'Compras feitas no feeling sem controle de fornecedores.',
    'Módulo de compras com pedidos, fornecedores e comparativo de preços.',
    'todos', 'intermediario', '2 a 4 horas', 'coming_soon', 4, 'shopping-cart', 'compras'
  ),
  (
    gen_random_uuid(),
    'Checklist de Abertura e Fechamento',
    'checklist',
    'Checklists digitais para abertura e fechamento com registro de responsável.',
    'Falhas operacionais por falta de processo de abertura e fechamento.',
    'Módulo de checklists com histórico de cumprimento.',
    'todos', 'basico', '1 a 2 horas', 'coming_soon', 5, 'list-checks', 'checklist'
  ),
  (
    gen_random_uuid(),
    'Financeiro Simples',
    'financeiro',
    'Controle de caixa, despesas e receitas para entender o resultado do mês.',
    'Falta de visibilidade sobre faturamento real, custos e resultado.',
    'Módulo financeiro com fluxo de caixa, DRE simplificado e relatórios básicos.',
    'todos', 'avancado', '4 a 8 horas', 'coming_soon', 6, 'wallet', 'financeiro'
  )
on conflict (slug) do nothing;


-- ============================================================
-- 14. SEED — Blocos de conhecimento iniciais
-- ============================================================

insert into knowledge_blocks (title, slug, type, content_markdown, version, status)
values
  (
    'Estrutura Base do Sistema',
    'estrutura-base',
    'base',
    E'# Estrutura Base do Sistema\n\n## Objetivo\nCriar a estrutura mínima necessária para qualquer módulo funcionar: autenticação, restaurante, usuários e permissões.\n\n## Cadastros necessários\n- Restaurante (nome, segmento, configurações)\n- Usuários (nome, email, perfil)\n- Permissões por perfil (dono, gerente, operador)\n\n## Regras de negócio\n- Cada restaurante tem um dono principal\n- Permissões controlam o que cada usuário pode ver e fazer\n- Dados financeiros (custo, margem) devem ter visibilidade restrita por padrão',
    1, 'active'
  ),
  (
    'Ficha Técnica e Custo — Módulo',
    'ficha-tecnica-modulo',
    'module',
    E'# Ficha Técnica e Custo\n\n## Objetivo\nPermitir que o restaurante cadastre ingredientes, monte fichas técnicas dos produtos e calcule custo real e margem.\n\n## Cadastros necessários\n- Ingredientes (nome, unidade de medida, custo por unidade)\n- Unidades de medida (kg, g, L, ml, unidade, porção)\n- Produtos do cardápio (nome, categoria, preço de venda)\n- Fichas técnicas (produto + lista de ingredientes + quantidades)\n\n## Regras de negócio\n- O custo do produto é a soma dos custos de cada ingrediente × quantidade usada\n- A margem = (preço de venda - custo) / preço de venda × 100\n- Custo e margem são informações restritas\n- Ao atualizar o custo de um ingrediente, o custo de todos os produtos que o usam deve recalcular automaticamente\n\n## Fora do escopo\n- Controle de estoque\n- Pedidos de compra\n- Integração com PDV',
    1, 'active'
  ),
  (
    'Regra Anti-Duplicação',
    'regra-anti-duplicacao',
    'global_rule',
    E'# Regra Anti-Duplicação\n\nAntes de criar qualquer nova tabela, tela, componente, cadastro ou fluxo, analise o projeto atual e verifique se já existe alguma estrutura equivalente ou parecida.\n\nSe já existir, reutilize e adapte. Não crie duplicidade.\n\nSe houver dúvida entre reutilizar algo existente ou criar algo novo, pare e apresente as opções antes de executar.\n\nPreserve os dados existentes. Não apague, renomeie ou altere estruturas importantes sem necessidade clara.',
    1, 'active'
  ),
  (
    'Regra de Planejamento Obrigatório',
    'regra-planejamento',
    'global_rule',
    E'# Regra de Planejamento Obrigatório\n\nToda implementação deve começar com planejamento.\n\nAntes de executar, a ferramenta externa deve responder:\n1. O que entendeu da solicitação\n2. O que encontrou no projeto atual\n3. O que pretende reutilizar\n4. O que pretende criar\n5. O que pretende alterar\n6. Quais riscos existem\n7. Quais confirmações precisa do usuário\n\n**A ferramenta só deve implementar depois de confirmação explícita.**',
    1, 'active'
  )
on conflict (slug) do nothing;


-- ============================================================
-- 15. SEED — Perguntas do diagnóstico base
-- ============================================================

insert into diagnostic_questions
  (module_id, question_text, question_type, options, required, order_index, variable_key, status)
values
  (null, 'Qual é o nome do seu restaurante?',           'text',            null, true,  1, 'restaurant_name', 'active'),
  (null, 'Qual é o tipo do seu negócio?',               'single_choice',
    '["Hamburgueria","Restaurante","Pizzaria","Bar","Cafeteria","Dark kitchen / Delivery","Outro"]'::jsonb,
    true, 2, 'segment', 'active'),
  (null, 'Quantas lojas ou unidades você tem?',         'single_choice',
    '["Só uma","2 ou 3","4 ou mais"]'::jsonb,
    true, 3, 'number_of_units', 'active'),
  (null, 'Quem vai usar o sistema no dia a dia?',       'multiple_choice',
    '["Eu mesmo (dono)","Gerente","Cozinheiro / Chef","Atendimento / Caixa","Estoque","Financeiro"]'::jsonb,
    true, 4, 'system_users', 'active'),
  (null, 'Hoje você usa algum sistema ou planilha para gestão?', 'textarea', null, false, 5, 'current_systems', 'active'),
  (null, 'Qual é sua familiaridade com tecnologia?',    'single_choice',
    '["Baixa — prefiro o mais simples possível","Média — consigo usar um app sem dificuldade","Alta — me sinto confortável com ferramentas novas"]'::jsonb,
    true, 6, 'technical_level', 'active'),
  (null, 'Quais são as maiores dores da sua operação hoje?', 'multiple_choice',
    '["Não sei o custo real dos produtos","Estoque desorganizado","Receitas sem padronização","Compras feitas sem controle","Falta de checklist de abertura e fechamento","Não tenho clareza do resultado financeiro","Falta organização na escala do time"]'::jsonb,
    true, 7, 'main_pains', 'active'),
  (null, 'Existem informações que só o dono ou gerente devem ver?', 'multiple_choice',
    '["Custo e margem dos produtos","Resultado financeiro","Salários e escalas","Histórico de compras e fornecedores","Não, todos podem ver tudo"]'::jsonb,
    false, 8, 'restricted_info', 'active');


-- ============================================================
-- 16. SEED — Perguntas do diagnóstico: Ficha Técnica
-- ============================================================

insert into diagnostic_questions
  (module_id, question_text, question_type, options, required, order_index, variable_key, status)
select
  m.id,
  q.question_text,
  q.question_type,
  q.options::jsonb,
  q.required,
  q.order_index,
  q.variable_key,
  'active'
from modules m,
(values
  ('Você vende produtos individuais, combos ou os dois?',
   'single_choice',
   '["Só produtos individuais","Combos também","Os dois"]',
   true, 1, 'product_types'),
  ('Você quer calcular só o custo ou também a margem e o preço sugerido?',
   'single_choice',
   '["Só o custo do produto","Custo e margem de lucro","Custo, margem e preço de venda sugerido"]',
   true, 2, 'calculation_scope'),
  ('Quem pode ver o custo e a margem dos produtos?',
   'single_choice',
   '["Só o dono","Dono e gerente","Qualquer pessoa com acesso ao sistema"]',
   true, 3, 'cost_visibility'),
  ('O preço dos ingredientes é o mesmo para todas as lojas ou varia por unidade?',
   'single_choice',
   '["É o mesmo para todas as lojas","Varia por loja","Tenho só uma loja"]',
   true, 4, 'ingredient_cost_type'),
  ('Você usa adicionais que impactam o custo do produto? (ex.: bacon extra, queijo duplo)',
   'boolean', null, true, 5, 'has_addons'),
  ('A ficha técnica precisa ter o modo de preparo ou só a composição e o custo?',
   'single_choice',
   '["Só composição e custo","Composição, custo e modo de preparo"]',
   true, 6, 'include_preparation_method'),
  ('Você quer guardar o histórico de variação de preço dos ingredientes?',
   'boolean', null, false, 7, 'track_price_history')
) as q(question_text, question_type, options, required, order_index, variable_key)
where m.slug = 'ficha-tecnica'
on conflict do nothing;


-- ============================================================
-- FIM DO SCRIPT
-- Após executar, volte ao app e crie uma conta — o perfil
-- será criado automaticamente pelo trigger handle_new_user.
-- ============================================================
