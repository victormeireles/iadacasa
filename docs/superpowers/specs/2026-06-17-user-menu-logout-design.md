# Design: Menu do usuário com logout e troca de área

**Data:** 2026-06-17  
**Status:** Aprovado pelo usuário  
**Escopo:** Área do cliente (`/app/*`) e painel admin (`/admin/*`)

## Problema

Após o login, não há opção de logout na interface. O avatar na topbar da área do cliente é decorativo (ou tem menu parcial sem "Sair"). O painel admin não possui menu de usuário equivalente — apenas links soltos para voltar à área do cliente.

## Objetivo

Oferecer logout e navegação entre áreas (cliente ↔ admin) via menu dropdown no avatar do usuário, seguindo o padrão SaaS (Notion, Linear, Vercel).

## Decisões de produto

| Decisão | Escolha |
|---------|---------|
| Escopo | Cliente **e** admin |
| Padrão de UI | Dropdown no avatar (clique/tap) |
| Conteúdo do menu | Nome + email, troca de área contextual, logout |
| Confirmação antes de sair | Não |
| Link admin na área cliente | Só para `admin` e `super_admin` |
| Link cliente no admin | Sempre visível |

## UI — Estrutura do menu

### Área do cliente (`context: 'client'`)

```
┌─────────────────────────┐
│  {userName}             │
│  {userEmail}            │  ← texto menor, cor secundária (#968C7B)
├─────────────────────────┤
│  Painel admin           │  ← só se role ∈ {admin, super_admin}
├─────────────────────────┤
│  Sair                   │  ← variant destructive, ícone LogOut
└─────────────────────────┘
```

### Painel admin (`context: 'admin'`)

```
┌─────────────────────────┐
│  {userName}             │
│  {userEmail}            │
├─────────────────────────┤
│  Área do cliente        │  ← link para /app/dashboard
├─────────────────────────┤
│  Sair                   │
└─────────────────────────┘
```

### Diretrizes UX

- Trigger: avatar circular com inicial do nome, mínimo 44×44px (`h-11 w-11`)
- `aria-label="Menu de {userName}"` no trigger
- Ícones Lucide: `LayoutDashboard`, `ArrowLeft`, `LogOut` — sem emoji
- "Sair" usa `DropdownMenuItem` com `variant="destructive"`, precedido por `DropdownMenuSeparator`
- Cores alinhadas ao design system existente: fundo `#FFFDF9`, borda `#E2D5C0`, texto `#443E35`
- Dropdown alinhado à direita (`align="end"`)

## Arquitetura

### Novo componente: `UserAccountMenu`

**Localização:** `components/layout/UserAccountMenu.tsx`  
**Tipo:** Client Component (`'use client'`)

**Props:**

```ts
interface UserAccountMenuProps {
  userName: string
  userEmail: string
  userRole: UserRole
  context: 'client' | 'admin'
}
```

**Responsabilidades:**
- Renderizar trigger (avatar) e dropdown
- Exibir itens de navegação conforme `context` e `userRole`
- Executar logout ao clicar em "Sair"

### Integração nos shells

| Shell | Mudança |
|-------|---------|
| `AppTopbar` | Substituir dropdown inline por `<UserAccountMenu context="client" … />` |
| `AdminShell` | Adicionar `<UserAccountMenu context="admin" … />` no header direito |
| `AppShell` | Repassar `userEmail` além de `userName` e `userRole` |
| `app/(client)/layout.tsx` | Passar `user.email` ao `AppShell` |
| `app/(admin)/layout.tsx` | Passar `user.name`, `user.email`, `user.role` ao `AdminShell` |

### Limpeza no admin

Remover links duplicados de "Ir para área do cliente":
- Sidebar inferior (`AdminShell` linha ~64–71)
- Topbar direita (`AdminShell` linha ~82–87)

A troca de área passa a existir apenas no menu do avatar.

## Fluxo de logout

### Modo Supabase (produção)

1. Usuário clica "Sair"
2. `createClient()` → `supabase.auth.signOut()`
3. `router.push('/login')`
4. `router.refresh()` para invalidar cache do servidor
5. Toast opcional: "Você saiu da conta"

Implementação em `lib/auth/logout.ts` (função client-side exportada) ou inline no `UserAccountMenu`.

### Modo mock (Supabase não configurado)

**Problema atual:** `getSessionUser()` sempre retorna `MOCK_USER`; redirect para `/login` não impede reacesso a `/app/*`.

**Solução:** cookie `mock_logged_out=1` ao fazer logout:

1. No logout mock: `document.cookie = 'mock_logged_out=1; path=/'`
2. Em `getSessionUser()`: se cookie presente e Supabase não configurado, retornar `null`
3. Em `proxy.ts` (mock mode): se cookie presente e rota protegida (`/app/*`, `/admin/*`), redirecionar para `/login`
4. No login mock (já existente): limpar cookie `mock_logged_out` antes de redirecionar ao dashboard

## Fluxo de dados

```
ClientLayout / AdminLayout (server)
  └─ getSessionUser() → user { name, email, role }
       └─ AppShell / AdminShell
            └─ AppTopbar / AdminShell header
                 └─ UserAccountMenu (client)
                      ├─ Link → /admin ou /app/dashboard
                      └─ Sair → signOut / mock cookie → /login
```

## Arquivos afetados

| Arquivo | Ação |
|---------|------|
| `components/layout/UserAccountMenu.tsx` | Criar |
| `components/layout/AppTopbar.tsx` | Refatorar — usar `UserAccountMenu` |
| `components/layout/AppShell.tsx` | Adicionar prop `userEmail` |
| `components/layout/AdminShell.tsx` | Adicionar menu; remover links duplicados |
| `app/(client)/layout.tsx` | Passar `userEmail` |
| `app/(admin)/layout.tsx` | Passar dados do usuário ao shell |
| `lib/auth/session.ts` | Checar cookie mock no `getSessionUser` |
| `proxy.ts` | Checar cookie mock em rotas protegidas |
| `app/(public)/login/page.tsx` | Limpar cookie mock no login |

## Fora de escopo

- Página de perfil / conta do usuário
- Confirmação modal antes de logout
- Logout em páginas públicas (landing, login)
- Alteração de roles ou permissões

## Critérios de aceite

1. Na área do cliente, clicar no avatar abre menu com nome, email e "Sair"
2. Admin logado na área do cliente vê também "Painel admin" no menu
3. No painel admin, clicar no avatar abre menu com "Área do cliente" e "Sair"
4. "Sair" encerra a sessão e redireciona para `/login`
5. Após logout, `/app/dashboard` e `/admin` redirecionam para `/login`
6. Login mock limpa estado de logout e restaura acesso
7. Links duplicados de troca de área removidos do `AdminShell`
8. Avatar tem alvo de toque ≥ 44px e label acessível

## Testes manuais

- [ ] Cliente comum: menu sem link admin; logout funciona (Supabase)
- [ ] Admin: menu com link para `/admin` na área cliente
- [ ] Admin no painel: menu com link para `/app/dashboard`
- [ ] Mock mode: logout impede reacesso sem novo login
- [ ] Teclado: Tab até avatar, Enter abre menu, setas navegam itens
- [ ] Mobile: menu abre e fecha corretamente ao toque
