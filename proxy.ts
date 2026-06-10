import { type NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/', '/login', '/cadastro', '/sobre', '/termos', '/privacidade']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = PUBLIC_PATHS.some(p => pathname === p) || pathname.startsWith('/_next') || pathname.startsWith('/api/public')

  // When Supabase is not configured, allow all routes (mock mode)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Mock mode: just let everything through
    return NextResponse.next()
  }

  // Supabase configured: check session cookie
  const sessionCookie =
    request.cookies.get('sb-access-token') ??
    request.cookies.get(`sb-${new URL(supabaseUrl).hostname.split('.')[0]}-auth-token`)

  const isAuthenticated = !!sessionCookie

  // Protect /app/* routes
  if (pathname.startsWith('/app') && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Protect /admin/* routes
  if (pathname.startsWith('/admin') && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from login/cadastro
  if (isAuthenticated && (pathname === '/login' || pathname === '/cadastro')) {
    return NextResponse.redirect(new URL('/app/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
