-- 03: Package files for Lovable assistant
alter table generated_packages
  add column if not exists files_json jsonb not null default '[]',
  add column if not exists guide_variant text not null default 'first_module'
    check (guide_variant in ('first_module', 'additional_module'));
