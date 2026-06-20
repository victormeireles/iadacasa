# Migrations — IA da Casa

Migrations incrementais para bancos que já rodaram o schema base.

## Como usar

1. **Banco novo** — rode o schema completo uma vez:
   - [`../supabase-schema.sql`](../supabase-schema.sql)

2. **Banco existente** — rode só as migrations que ainda não foram aplicadas, em ordem numérica:
   - `01_seed_module_knowledge_blocks.sql` — vincula blocos de conhecimento ao módulo Ficha Técnica
   - `02_cleanup_global_module_links.sql` — remove vínculos globais do módulo (passam a ser injetados automaticamente)
   - `03_package_files_json.sql` — adiciona `files_json` e `guide_variant` em `generated_packages`

## Convenção de nomes

```
NN_descricao_curta.sql
```

- `NN` = número sequencial com dois dígitos (`01`, `02`, …)
- Descrição em snake_case
- Cada arquivo deve ser **idempotente** quando possível (`on conflict do nothing`, `if not exists`, etc.)

## Histórico

| # | Arquivo | Descrição |
|---|---------|-----------|
| 01 | `01_seed_module_knowledge_blocks.sql` | Seed dos vínculos `module_knowledge_blocks` para o módulo ficha-tecnica |
| 02 | `02_cleanup_global_module_links.sql` | Remove vínculos globais do módulo ficha-tecnica (injeção automática no 1º módulo) |
| 03 | `03_package_files_json.sql` | Colunas `files_json` e `guide_variant` para pacote Lovable |
