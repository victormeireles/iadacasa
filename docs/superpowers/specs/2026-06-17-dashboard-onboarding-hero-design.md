# Design: Destaque do dashboard para onboarding (cardápio de soluções)

**Data:** 2026-06-17  
**Status:** Aprovado pelo usuário  
**Escopo:** `app/(client)/app/dashboard/page.tsx`

## Problema

Após o cadastro, o banner verde destacava o primeiro módulo ativo no banco (`activeModules[0]`), hoje "Ficha Técnica e Custo", com CTA direto para `/app/solucoes/ficha-tecnica`. Isso contradiz:

- a pergunta "Por onde quer começar?" no cabeçalho;
- o passo 1 em "Próximos passos" ("Escolha um módulo no cardápio de soluções");
- o posicionamento do produto ("comece pela dor que mais atrapalha").

A lógica era apenas ordem de cadastro (`order_index`), não recomendação personalizada.

## Objetivo

Usar o destaque verde como **guia de onboarding** que direciona ao cardápio de soluções, sem empurrar um módulo específico no primeiro acesso.

## Decisões de produto

| Decisão | Escolha |
|---------|---------|
| Conteúdo do banner (0 receitas) | 4 passos do fluxo + CTA para `/app/solucoes` |
| CTA principal | "Explorar cardápio" → `/app/solucoes` |
| Destaque de módulo específico | Removido no primeiro acesso |
| Card "Próximos passos" | Removido quando banner de onboarding está visível (evita duplicação) |
| Quando o banner some | Usuário com pelo menos 1 Receita do Sistema gerada |
| Layout inferior (0 receitas) | "Como funciona" + "Ajuda e comunidade" em duas colunas |

## UI — Banner de onboarding

```
┌──────────────────────────────────────────────────────────────┐
│  POR ONDE COMEÇAR                                            │
│  Siga estes passos para criar seu primeiro módulo            │
│                                                              │
│  ① Escolha um módulo no cardápio de soluções                │
│  ② Responda as perguntas do diagnóstico                     │
│  ③ Receba e copie a Receita do Sistema                      │
│  ④ Monte o módulo no Lovable com o prompt                   │
│                                                              │
│                              [ Explorar cardápio → ]         │
└──────────────────────────────────────────────────────────────┘
```

### Diretrizes visuais

- Manter fundo `#235139`, texto branco, label em `#8FB59C`
- Botão CTA dourado `#D8A23E` (mesmo padrão atual)
- Números dos passos em círculos com fundo `#8FB59C/30`
- Responsivo: CTA abaixo dos passos no mobile, à direita no desktop

## UI — Usuário com receitas geradas

- Banner verde **não** é exibido
- Card "Próximos passos" retorna com checklist de progresso (passo 3 marcado como concluído quando `installedCount > 0`)
- CTA "Ver cardápio de soluções" permanece no card de próximos passos

## Regras de exibição

| Condição | Banner onboarding | Próximos passos | Como funciona |
|----------|-------------------|-----------------|---------------|
| `installedCount === 0` | Sim | Não | Sim |
| `installedCount > 0` | Não | Sim (com progresso) | Não |

## Fora de escopo (futuro)

- Recomendação de módulo por diagnóstico de dor no cadastro
- Checklist dinâmico (marcar passo 1 ao visitar cardápio, passo 2 ao iniciar questionário)
- Mini cardápio embutido no dashboard

## Arquivos afetados

- `app/(client)/app/dashboard/page.tsx` — única alteração necessária

## Critérios de aceite

1. Novo usuário (0 receitas) vê banner com 4 passos e CTA para `/app/solucoes`
2. Banner não menciona nem linka módulo específico
3. Card "Próximos passos" não duplica os 4 passos quando o banner está visível
4. Usuário com receita gerada não vê o banner; vê histórico de receitas e próximos passos com passo 3 concluído
