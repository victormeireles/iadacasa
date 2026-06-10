---
name: ia-da-casa-design
description: Use this skill to generate well-branded interfaces and assets for IA da Casa (plataforma onde donos de restaurante criam sistemas de gestão com IA), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# IA da Casa — Design System skill

Read **README.md** in this skill for the full brand guide — product context, voice & tone (pt-BR, warm, plain, verb-first CTAs, no jargon, no emoji), visual foundations (warm cream surfaces, deep herb-green primary, mustard/terracotta/wine/sage accents, Young Serif + Hanken Grotesk + JetBrains Mono), iconography (Lucide), and the file index.

Then explore the other files:
- `styles.css` + `tokens/` — link `styles.css` to get every CSS custom property (colors, type, spacing, effects). Reach for semantic aliases (`--brand`, `--surface-card`, `--text-strong`, `--mod-*`) over raw scales.
- `components/` — React UI primitives (Button, IconButton, Input, Textarea, Select, Checkbox, Switch, Card, Badge, Avatar, Callout, StepList, ModuleCard). Each has a `.prompt.md` with usage. The signature is **ModuleCard** — one solution on the "cardápio de soluções", color-coded per module.
- `ui_kits/app/` — the IA da Casa app recreated: cardápio de soluções → módulo + questionário → Receita do Sistema. Read these for real composition patterns.
- `assets/` — logos (cloche/dome mark with a mustard AI spark).

## How to work
- If creating **visual artifacts** (slides, mocks, throwaway prototypes): copy the assets and tokens you need into your output folder and produce static/standalone HTML the user can open. Don't reference design-system files by absolute path.
- If working in **production code**: copy assets and adopt the tokens/components; read the rules here to design like a brand expert.
- Icons: use Lucide (`https://unpkg.com/lucide@latest`), 2px rounded stroke. Never emoji.
- Keep it warm and human, never cold/technical/developer-y. The audience is restaurant owners, often non-technical.

If invoked with no other guidance, ask the user what they want to build or design, ask a few focused questions, then act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.
