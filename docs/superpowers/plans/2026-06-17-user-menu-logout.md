# User Account Menu & Logout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add avatar dropdown with logout and contextual area switching (client ↔ admin) in both `/app/*` and `/admin/*`.

**Architecture:** Extract a shared `UserAccountMenu` client component used by `AppTopbar` and `AdminShell`. Centralize logout in `lib/auth/logout.ts` (Supabase `signOut` + mock cookie). Server-side `getSessionUser` and `proxy.ts` respect `mock_logged_out` cookie when Supabase is not configured.

**Tech Stack:** Next.js 16 App Router, React 19, Supabase SSR (`@supabase/ssr`), shadcn/base-ui `DropdownMenu`, Lucide icons, Sonner toasts.

**Spec:** `docs/superpowers/specs/2026-06-17-user-menu-logout-design.md`

---

## File Map

| File | Responsibility |
|------|----------------|
| `lib/auth/mock-session.ts` | Cookie name + pure helpers (readable in server and client) |
| `lib/auth/logout.ts` | Client-side logout orchestration |
| `lib/auth/session.ts` | Return `null` when mock logged out |
| `proxy.ts` | Block protected routes when mock logged out |
| `components/layout/UserAccountMenu.tsx` | Avatar dropdown UI + logout handler |
| `components/layout/AppTopbar.tsx` | Delegate user menu to shared component |
| `components/layout/AppShell.tsx` | Pass `userEmail` through |
| `components/layout/AdminShell.tsx` | User menu in header; remove duplicate links |
| `app/(client)/layout.tsx` | Pass `user.email` |
| `app/(admin)/layout.tsx` | Pass user props to `AdminShell` |
| `app/(public)/login/page.tsx` | Clear mock logout cookie on mock login |

---

### Task 1: Mock session helpers

**Files:**
- Create: `lib/auth/mock-session.ts`

- [ ] **Step 1: Create mock session constants and helpers**

```ts
// lib/auth/mock-session.ts
export const MOCK_LOGGED_OUT_COOKIE = 'mock_logged_out'

export function isMockLoggedOutCookie(value: string | undefined): boolean {
  return value === '1'
}

/** Client-only: mark mock session as logged out */
export function setMockLoggedOut(): void {
  document.cookie = `${MOCK_LOGGED_OUT_COOKIE}=1; path=/`
}

/** Client-only: restore mock session on login */
export function clearMockLoggedOut(): void {
  document.cookie = `${MOCK_LOGGED_OUT_COOKIE}=; path=/; max-age=0`
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors related to `mock-session.ts`

- [ ] **Step 3: Commit**

```bash
git add lib/auth/mock-session.ts
git commit -m "feat(auth): add mock session cookie helpers"
```

---

### Task 2: Logout function

**Files:**
- Create: `lib/auth/logout.ts`

- [ ] **Step 1: Create client logout function**

```ts
'use client'

import { createClient } from '@/lib/supabase/client'
import { setMockLoggedOut } from '@/lib/auth/mock-session'

export async function logout(): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createClient()

  if (!supabase) {
    setMockLoggedOut()
    return { ok: true }
  }

  const { error } = await supabase.auth.signOut()
  if (error) {
    return { ok: false, error: error.message }
  }

  return { ok: true }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add lib/auth/logout.ts
git commit -m "feat(auth): add client logout function"
```

---

### Task 3: Server-side mock logout enforcement

**Files:**
- Modify: `lib/auth/session.ts`
- Modify: `proxy.ts`
- Modify: `app/(public)/login/page.tsx`

- [ ] **Step 1: Update `getSessionUser` to respect mock cookie**

In `lib/auth/session.ts`, add imports:

```ts
import { cookies } from 'next/headers'
import { isMockLoggedOutCookie, MOCK_LOGGED_OUT_COOKIE } from '@/lib/auth/mock-session'
```

Replace the mock branch inside `getSessionUser`:

```ts
  if (!supabase) {
    const cookieStore = await cookies()
    const mockLoggedOut = isMockLoggedOutCookie(
      cookieStore.get(MOCK_LOGGED_OUT_COOKIE)?.value
    )
    if (mockLoggedOut) return null
    return MOCK_USER
  }
```

- [ ] **Step 2: Update `proxy.ts` mock mode block**

Replace lines 13–16 in `proxy.ts`:

```ts
  if (!supabaseUrl || !supabaseKey) {
    const mockLoggedOut = request.cookies.get('mock_logged_out')?.value === '1'
    const isProtected = pathname.startsWith('/app') || pathname.startsWith('/admin')

    if (isProtected && mockLoggedOut) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  }
```

- [ ] **Step 3: Clear mock cookie on mock login**

In `app/(public)/login/page.tsx`, add import:

```ts
import { clearMockLoggedOut } from '@/lib/auth/mock-session'
```

Inside the mock branch of `handleSubmit` (before `router.push`):

```ts
    if (!supabase) {
      clearMockLoggedOut()
      toast.success('Bem-vindo de volta!')
      router.push('/app/dashboard')
      return
    }
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds

- [ ] **Step 5: Commit**

```bash
git add lib/auth/session.ts proxy.ts app/(public)/login/page.tsx
git commit -m "feat(auth): enforce mock logout via cookie on server and proxy"
```

---

### Task 4: UserAccountMenu component

**Files:**
- Create: `components/layout/UserAccountMenu.tsx`

- [ ] **Step 1: Create the shared menu component**

```tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, LayoutDashboard, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import type { UserRole } from '@/types/database'
import { logout } from '@/lib/auth/logout'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface UserAccountMenuProps {
  userName: string
  userEmail: string
  userRole: UserRole
  context: 'client' | 'admin'
}

function isAdminRole(role: UserRole) {
  return role === 'admin' || role === 'super_admin'
}

export function UserAccountMenu({
  userName,
  userEmail,
  userRole,
  context,
}: UserAccountMenuProps) {
  const router = useRouter()
  const showAdminLink = context === 'client' && isAdminRole(userRole)
  const showClientLink = context === 'admin'

  async function handleLogout() {
    const result = await logout()
    if (!result.ok) {
      toast.error('Não foi possível sair. Tente novamente.')
      return
    }
    toast.success('Você saiu da conta')
    router.push('/login')
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#235139] text-white text-xs font-semibold outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#235139] focus-visible:ring-offset-2"
        aria-label={`Menu de ${userName}`}
      >
        {userName.slice(0, 1).toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-48 border-[#E2D5C0] bg-[#FFFDF9] text-[#443E35]"
      >
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium text-[#211E19]">{userName}</p>
          <p className="text-xs font-normal text-[#968C7B] truncate">{userEmail}</p>
        </DropdownMenuLabel>

        {(showAdminLink || showClientLink) && (
          <>
            <DropdownMenuSeparator className="bg-[#E2D5C0]" />
            {showAdminLink && (
              <DropdownMenuItem
                render={<Link href="/admin" />}
                nativeButton={false}
                className="cursor-pointer text-[#443E35] focus:bg-[#F5EEE1] focus:text-[#235139]"
              >
                <LayoutDashboard className="h-4 w-4" />
                Painel admin
              </DropdownMenuItem>
            )}
            {showClientLink && (
              <DropdownMenuItem
                render={<Link href="/app/dashboard" />}
                nativeButton={false}
                className="cursor-pointer text-[#443E35] focus:bg-[#F5EEE1] focus:text-[#235139]"
              >
                <ArrowLeft className="h-4 w-4" />
                Área do cliente
              </DropdownMenuItem>
            )}
          </>
        )}

        <DropdownMenuSeparator className="bg-[#E2D5C0]" />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          className="cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

- [ ] **Step 2: Run lint on new file**

Run: `npx eslint components/layout/UserAccountMenu.tsx`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/layout/UserAccountMenu.tsx
git commit -m "feat(ui): add shared UserAccountMenu with logout"
```

---

### Task 5: Wire client area

**Files:**
- Modify: `components/layout/AppTopbar.tsx`
- Modify: `components/layout/AppShell.tsx`
- Modify: `app/(client)/layout.tsx`

- [ ] **Step 1: Simplify `AppTopbar` to use `UserAccountMenu`**

Replace entire `AppTopbar.tsx` with:

```tsx
'use client'

import Link from 'next/link'
import { HelpCircle } from 'lucide-react'
import type { UserRole } from '@/types/database'
import { UserAccountMenu } from '@/components/layout/UserAccountMenu'

interface AppTopbarProps {
  restaurantName?: string
  progress?: string | null
  userName?: string
  userEmail?: string
  userRole?: UserRole
}

export function AppTopbar({
  restaurantName,
  progress,
  userName,
  userEmail,
  userRole,
}: AppTopbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2D5C0] bg-[#FFFDF9]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/app/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#235139]">
            <span className="text-xs font-bold text-white">IA</span>
          </div>
          <span
            className="hidden font-semibold text-[#211E19] sm:block"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            IA da Casa
          </span>
        </Link>

        {progress && (
          <span className="text-sm text-[#6F6657] font-medium whitespace-nowrap">
            {progress}
          </span>
        )}

        <div className="flex items-center gap-3 shrink-0">
          {restaurantName && (
            <span className="hidden text-sm text-[#6F6657] sm:block truncate max-w-[160px]">
              {restaurantName}
            </span>
          )}
          <Link
            href="/app/suporte"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6F6657] hover:bg-[#F5EEE1] hover:text-[#443E35] transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Ajuda</span>
          </Link>
          {userName && userEmail && userRole && (
            <UserAccountMenu
              userName={userName}
              userEmail={userEmail}
              userRole={userRole}
              context="client"
            />
          )}
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Add `userEmail` to `AppShell`**

In `components/layout/AppShell.tsx`, add `userEmail?: string` to props and pass to `AppTopbar`:

```tsx
interface AppShellProps {
  children: React.ReactNode
  restaurantName?: string
  progress?: string | null
  userName?: string
  userEmail?: string
  userRole?: UserRole
}

export function AppShell({ children, restaurantName, progress, userName, userEmail, userRole }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      <AppTopbar
        restaurantName={restaurantName}
        progress={progress}
        userName={userName}
        userEmail={userEmail}
        userRole={userRole}
      />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Pass email from client layout**

In `app/(client)/layout.tsx`, update `AppShell` usage:

```tsx
    <AppShell
      restaurantName={restaurantName}
      userName={user.name}
      userEmail={user.email}
      userRole={user.role}
    >
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/layout/AppTopbar.tsx components/layout/AppShell.tsx app/(client)/layout.tsx
git commit -m "feat(ui): wire UserAccountMenu into client app shell"
```

---

### Task 6: Wire admin area and remove duplicate links

**Files:**
- Modify: `components/layout/AdminShell.tsx`
- Modify: `app/(admin)/layout.tsx`

- [ ] **Step 1: Update `AdminShell` props and header**

Replace `AdminShell.tsx` with:

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Puzzle, Package,
  Users, MessageSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/types/database'
import { UserAccountMenu } from '@/components/layout/UserAccountMenu'

const NAV_ITEMS = [
  { href: '/admin', label: 'Painel', icon: LayoutDashboard, exact: true },
  { href: '/admin/modulos', label: 'Módulos', icon: Puzzle },
  { href: '/admin/pacotes', label: 'Pacotes gerados', icon: Package },
  { href: '/admin/usuarios', label: 'Usuários', icon: Users },
  { href: '/admin/suporte', label: 'Travas / suporte', icon: MessageSquare },
]

interface AdminShellProps {
  children: React.ReactNode
  userName: string
  userEmail: string
  userRole: UserRole
}

export function AdminShell({ children, userName, userEmail, userRole }: AdminShellProps) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-[#FBF7F0]">
      <aside className="hidden w-60 shrink-0 border-r border-[#E2D5C0] bg-[#FFFDF9] md:flex md:flex-col">
        <div className="flex h-14 items-center gap-2 border-b border-[#E2D5C0] px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#235139]">
            <span className="text-[10px] font-bold text-white">IA</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#211E19]">IA da Casa</p>
            <p className="text-[10px] text-[#968C7B]">Painel Admin</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  active
                    ? 'bg-[#DEEBE1] text-[#235139] font-medium'
                    : 'text-[#443E35] hover:bg-[#F5EEE1] hover:text-[#235139]'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b border-[#E2D5C0] bg-[#FFFDF9] px-6">
          <p className="text-sm font-medium text-[#443E35]">
            {NAV_ITEMS.find(i => (i.exact ? pathname === i.href : pathname.startsWith(i.href)))?.label ?? 'Admin'}
          </p>
          <UserAccountMenu
            userName={userName}
            userEmail={userEmail}
            userRole={userRole}
            context="admin"
          />
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Pass user props from admin layout**

In `app/(admin)/layout.tsx`, update return:

```tsx
  return (
    <AdminShell
      userName={user.name}
      userEmail={user.email}
      userRole={user.role}
    >
      {children}
    </AdminShell>
  )
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add components/layout/AdminShell.tsx app/(admin)/layout.tsx
git commit -m "feat(ui): add UserAccountMenu to admin shell and remove duplicate links"
```

---

### Task 7: Manual verification

**Files:** none (verification only)

- [ ] **Step 1: Mock mode — logout blocks re-access**

1. Run `npm run dev` (without Supabase env vars)
2. Open `/app/dashboard`
3. Click avatar → "Sair"
4. Confirm redirect to `/login`
5. Navigate manually to `/app/dashboard` → should redirect to `/login`
6. Log in again → should reach dashboard

- [ ] **Step 2: Client menu contents**

1. On `/app/dashboard`, open avatar menu
2. Confirm: name, email, "Sair" visible
3. Confirm: no "Painel admin" (mock user is `client` role)

- [ ] **Step 3: Admin menu contents**

1. Open `/admin` (mock mode allows access)
2. Open avatar menu in header
3. Confirm: "Área do cliente" link present
4. Confirm: "Sair" works
5. Confirm: sidebar has no "Ir para área do cliente" link at bottom
6. Confirm: topbar has no "← Área do cliente" text link

- [ ] **Step 4: Accessibility spot check**

1. Tab to avatar trigger — focus ring visible
2. Enter opens menu; arrow keys navigate items

- [ ] **Step 5: Final lint**

Run: `npm run lint`
Expected: PASS (or only pre-existing warnings)

---

## Spec Coverage Checklist

| Spec requirement | Task |
|------------------|------|
| Avatar dropdown client area | Task 4, 5 |
| Avatar dropdown admin area | Task 4, 6 |
| Name + email in menu | Task 4 |
| Admin link (role-gated) | Task 4 |
| Client link in admin context | Task 4, 6 |
| Logout destructive + separated | Task 4 |
| Supabase signOut | Task 2 |
| Mock cookie logout | Task 1, 3 |
| Remove duplicate admin links | Task 6 |
| Touch target ≥ 44px | Task 4 (`h-11 w-11`) |
| aria-label on trigger | Task 4 |

## Notes

- **Mock admin link:** `MOCK_USER.role` is `'client'`, so "Painel admin" won't appear in mock mode. Test admin link with a real Supabase user with `admin` role, or temporarily set `MOCK_USER.role = 'admin'` for local verification.
- **No automated tests:** project has no test runner; manual verification in Task 7 covers acceptance criteria.
