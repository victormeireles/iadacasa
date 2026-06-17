-- ============================================================
-- Migration 01 — Seed: vínculos módulo ↔ bloco de conhecimento
--
-- Pré-requisito: schema base já aplicado (supabase-schema.sql)
-- Execute no SQL Editor do Supabase após o schema inicial.
-- ============================================================

insert into module_knowledge_blocks (module_id, knowledge_block_id, usage_type, required, order_index)
select m.id, kb.id, v.usage_type, v.required, v.order_index
from (values
  ('ficha-tecnica', 'estrutura-base',        'dependency', true, 0),
  ('ficha-tecnica', 'ficha-tecnica-modulo',  'prompt',     true, 1),
  ('ficha-tecnica', 'regra-anti-duplicacao', 'rule',       true, 2),
  ('ficha-tecnica', 'regra-planejamento',    'rule',       true, 3)
) as v(module_slug, block_slug, usage_type, required, order_index)
join modules m on m.slug = v.module_slug
join knowledge_blocks kb on kb.slug = v.block_slug
on conflict (module_id, knowledge_block_id) do nothing;
