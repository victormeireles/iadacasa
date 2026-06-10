Inline notice box. The `ai` variant is the IA da Casa co-pilot voice — use it for AI suggestions and reassurance; other variants for info/warning/danger/success.

```jsx
<Callout variant="ai" title="Dica do copiloto">
  Preparei um passo a passo. Você pode ajustar qualquer parte antes de montar.
</Callout>
```

Default icons per variant (Lucide). Pass `icon={null}` to hide. Needs `lucide.createIcons()` after mount when using default icons.
