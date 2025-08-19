
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { user } } = await supabase.auth.getUser()
  const url = req.nextUrl
  const isLogin = url.pathname.startsWith('/login')
  const isApi = url.pathname.startsWith('/api')
  if (!user && !isLogin && !isApi) { url.pathname = '/login'; return NextResponse.redirect(url) }
  if (user && isLogin) { url.pathname = '/'; return NextResponse.redirect(url) }
  return res
}
export const config = { matcher: ['/', '/login', '/((?!_next/static|_next/image|favicon.ico).*)'] }
