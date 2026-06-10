The signature card of IA da Casa — one solution on the "cardápio de soluções". Color-coded per module, hover-lifts, and shows a colored ring + check when `selected`.

```jsx
<ModuleCard
  accent="ficha"
  icon="clipboard-list"
  title="Ficha Técnica"
  description="Padronize fichas e calcule o custo real de cada prato."
  meta={<><i data-lucide="clock" /> 4 perguntas · ~5 min</>}
/>
```

`accent`: ficha · receitas · estoque · compras · checklist · financeiro (maps to `--mod-*`). `status="soon"` dims and shows "Em breve". `icon` accepts a Lucide name string (call `lucide.createIcons()` after mount) or a node.
