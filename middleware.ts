import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Allow login page through
    if (pathname === '/admin/login') return NextResponse.next()

    // Check for admin session cookie
    const adminSession = req.cookies.get('admin_session')?.value
    const validSecret = process.env.ADMIN_SECRET

    if (!adminSession || adminSession !== validSecret) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
