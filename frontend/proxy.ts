import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip protection for /login (and anything under it if needed)
  if (pathname.startsWith('/login')) {
    // If already authenticated → redirect to dashboard (optional but good UX)
    const token = request.cookies.get('adminToken')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (token) {
      return NextResponse.redirect(new URL('/admin/properties', request.url));
    }

    // Not authenticated → allow access to login page
    return NextResponse.next();
  }

  // Protect all other /admin/* paths
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('adminToken')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      // No token → redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Has token → allow access
    return NextResponse.next();
  }

  // Everything else (public pages, API, etc.) → pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',           // Run on all /admin/...
  ],
};