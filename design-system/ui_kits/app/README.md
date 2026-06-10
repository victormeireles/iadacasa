# UI Kit — IA da Casa (app)

Interactive recreation of the core IA da Casa product flow. Composes the design-system primitives; it does not re-implement them.

## Flow (3 screens)
1. **Cardápio de soluções** (`CardapioScreen`) — the home. A welcome hero + the grid of `ModuleCard`s. Picking a module advances the flow.
2. **Módulo + questionário** (`ModuloScreen`) — guided questionnaire. A sticky aside shows the module identity + `StepList`; the main column holds the form (`Input`/`Textarea`/`Select`/`Checkbox`) and an AI `Callout`.
3. **Receita do Sistema** (`ReceitaScreen`) — the generated output: operational summary, business rules, a copy-able prompt block (mono on deep green), and a "passo a passo" `StepList` to build it in Lovable. A sticky co-pilot card drives the CTA.

## Files
- `index.html` — wires the screens with a small screen state machine. Loads the DS bundle, `data.js`, then each screen JSX.
- `data.js` — demo content (`window.IA_APP_DATA`): restaurant, modules, questionário, steps, recipe.
- `AppShell.jsx` — `AppTopbar` + `Page` wrapper.
- `CardapioScreen.jsx`, `ModuloScreen.jsx`, `ReceitaScreen.jsx` — the screens.
- `app.css` — kit-only layout (topbar, page, hero, grids). All values come from DS tokens.

## Notes
- Each screen JSX reads primitives via `const DS = window.IADaCasaDesignSystem_449ba5;` and attaches its component(s) to `window` (separate-scope babel pattern).
- Lucide icons are re-created (`lucide.createIcons()`) after each screen change.
- This is a high-fidelity recreation, not production code — interactions are mocked.
