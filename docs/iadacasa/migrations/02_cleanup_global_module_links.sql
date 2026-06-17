-- ============================================================
-- Migration 02 — Remove vínculos globais indevidos por módulo
--
-- Pré-requisito: migration 01 aplicada (ou vínculos manuais equivalentes)
-- Execute no SQL Editor do Supabase após a migration 01.
-- ============================================================

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
