Single-line text field with label, hint, and error states.

```jsx
<Input label="Nome do prato" placeholder="Ex.: Hambúrguer da casa" required
       leftIcon={<i data-lucide="search" />} hint="Como aparece no cardápio" />
```

Props: `label`, `hint`, `error` (wine state, overrides hint), `required`, `leftIcon`. Spreads native input attrs.
