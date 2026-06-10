# IA da Casa — Design System

> Plataforma onde donos de restaurante criam seus próprios sistemas de gestão com IA.
> *AI of the house* — a guided platform that turns a restaurant's real operation into custom system modules.

This is the source of truth for the IA da Casa brand: tokens, typography, color, components and full-screen UI kits. It is read by an automated compiler that bundles the components and indexes the tokens; consuming projects link the single root `styles.css`.

---

## 1. Product context

**IA da Casa** is a Brazilian platform that helps restaurant owners (restaurantes, hamburguerias, bares, pizzarias, food service) build their own bespoke management systems with AI — instead of renting a generic SaaS.

The experience is a guided **"cardápio de soluções"** (menu of solutions). The owner:
1. Picks a module from the menu — **Ficha Técnica, Receitas, Estoque, Compras, Checklist, Financeiro**, and more — each one a fix for a real operational pain.
2. Answers a few questions about their business.
3. Receives a **"Receita do Sistema"** (System Recipe): a build plan with operational explanation, business rules, AI prompts and a step-by-step to assemble the module in AI tools like Lovable.

**Audience:** restaurant owners, frequently non-technical. The interface must feel **simple, guided and safe** — never cold, never "for developers."

**Brand must convey:** restaurant + real operation, personalization (sistema sob medida), practicality, trust, and *accessible* technology. AI is a calm co-pilot, not a sci-fi gadget.

### Sources
This system was authored from a written brand brief — **no codebase or Figma was provided.** The visual language (palette, type, logo, components) was designed from scratch to match the brief. If/when real product code or Figma files exist, reconcile against them and update this readme with the links.

---

## 2. Content fundamentals (voice & tone)

- **Language:** Brazilian Portuguese (pt-BR). Warm, plain, confident. Talk like an experienced kitchen manager who respects the owner's time.
- **Person:** Address the user as **"você"**; the product/AI speaks in first person sparingly ("vou montar", "preparei pra você"). Lean on the cooking metaphor naturally — *receita, ingrediente, montar, preparar, ponto* — but never force puns.
- **Casing:** Sentence case everywhere — buttons, titles, labels. **Eyebrows/overlines** are the only UPPERCASE element (tracked `--ls-overline`).
- **Tone examples:**
  - CTA: *"Montar meu sistema"*, *"Ver a receita"*, *"Continuar"* — verb-first, concrete.
  - Empty/help: *"Conte como funciona seu estoque hoje. A gente cuida do resto."*
  - AI co-pilot voice: *"Preparei um passo a passo. Você pode ajustar qualquer parte."*
- **Numbers & jargon:** avoid technical/SaaS jargon (no "deploy", "endpoint", "schema" in user-facing copy). Prefer *montar, gerar, organizar, controlar*. Only show numbers that help a decision — no data-slop dashboards.
- **Emoji:** **not used.** Meaning is carried by warm copy, color-coded modules and Lucide icons — not emoji.

---

## 3. Visual foundations

**Mood:** a modern menu meets an organized kitchen meets a calm operating system. Warm, premium, human, trustworthy.

- **Backgrounds:** warm cream (`--surface-page` `#FBF7F0`) — *never* hospital white. Sunken areas step down to `--cream-100`. Inverse/feature panels use deep green `--green-900`. No purple/blue gradients, no neon, no glassmorphism by default. Subtle warm tints (module-soft fills) carry color.
- **Color:** deep herb-green primary (`--brand` `#235139`); a gastronomic accent family of mustard/gold (`--accent` `#D8A23E`), terracotta, wine and sage. Each cardápio module owns a hue (`--mod-*`). Text is warm graphite, never pure black.
- **Type:** *Young Serif* for display/hero moments (artisanal, gastronomic), *Hanken Grotesk* for all UI & body (friendly, legible), *JetBrains Mono* for generated prompts/recipes. See `tokens/typography.css`.
- **Corners:** generous rounding — cards `--radius-lg` (18px), feature panels `--radius-xl` (26px), pills for buttons/chips. Friendly, never sharp.
- **Cards:** warm `--paper` surface, 1px `--border-subtle` hairline, soft warm shadow (`--shadow-md`), well separated with real gaps. Cards are the primary unit — the cardápio is a grid of them.
- **Shadows:** soft, warm-tinted (graphite low-alpha), never hard black. Elevation ladder `--shadow-xs → --shadow-xl`.
- **Borders:** hairline cream borders on light surfaces; `--border-width-strong` (1.5px) on controls for a crisp, tactile edge.
- **Motion:** calm and confident. `--ease-out` for entrances, `--ease-spring` for playful affordances. Durations 120/200/320ms. Buttons depress slightly on `:active` (`translateY(1px) scale(.985)`); no bouncy loops on content.
- **Hover states:** primary buttons darken (`--brand-hover`); secondary fill with `--surface-sunken`; ghost fills with `--brand-soft`; cards lift one shadow step. **Press:** slight shrink + downward nudge.
- **Focus:** green halo ring `--ring-brand` (accent/danger variants swap ring color).
- **Imagery:** warm, natural-light kitchen/food photography (not stock-cheesy, not cold). Use as full-bleed feature bands or framed within `--radius-lg`. Selection highlight is `--mustard-200`.
- **Layout:** breathing room; 4px spacing grid; max content widths via `--container-*`. Sticky bars may use `--blur-md` backdrop.

---

## 4. Iconography

- **Set:** [**Lucide**](https://lucide.dev) line icons, loaded from CDN (`https://unpkg.com/lucide@latest`). Clean 2px rounded strokes — modern but warm, not generic-corporate. **(Substitution flag:** no proprietary icon set was provided; Lucide is the chosen default. Swap if the brand later commissions custom icons.)
- **Usage:** stroke icons sit inside buttons, list items, module headers. Size 18–22px in UI; module tiles use a tinted square (`--mod-*-soft`) holding a `--mod-*`-colored icon.
- **Module → icon map:** Ficha Técnica `clipboard-list` · Receitas `cooking-pot` · Estoque `package` · Compras `shopping-cart` · Checklist `list-checks` · Financeiro `wallet`.
- **Emoji / unicode:** not used as icons.
- **Logo:** a cloche/dome (restaurant plate cover that doubles as a house roof) with a mustard AI spark. `assets/logo-mark.svg`, `assets/logo-full.svg`, `assets/logo-mark-light.svg` (for dark surfaces).

---

## 5. Index / manifest

**Root**
- `styles.css` — global entry (consumers link this). `@import` list only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`.
- `assets/` — `logo-mark.svg`, `logo-full.svg`, `logo-mark-light.svg`.
- `ds-runtime.js` — in-repo render shim (auto-generated from the component sources) that exposes `window.IADaCasaDesignSystem_449ba5` to the `@dsCard` cards and the UI kit via `<script type="text/babel">`, so previews render reliably. **Consuming projects** use the compiler-generated `_ds_bundle.js` instead — regenerate `ds-runtime.js` whenever a component changes.
- `SKILL.md` — Agent-Skill wrapper for use in Claude Code.

**Components** (`components/`) — `window.IADaCasaDesignSystem_449ba5.<Name>`
- `buttons/` — `Button`, `IconButton`
- `forms/` — `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`
- `data-display/` — `Card`, `Badge`, `Avatar`
- `feedback/` — `Callout`, `StepList`
- `modules/` — `ModuleCard` (the cardápio signature card)

**UI kits** (`ui_kits/`)
- `app/` — the IA da Casa app: cardápio de soluções, módulo + questionário, Receita do Sistema.

Run `check_design_system` after edits to confirm the compiler picks everything up.
