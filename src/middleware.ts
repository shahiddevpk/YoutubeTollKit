import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { resolveRedirect } from '@/lib/redirects';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const rule = resolveRedirect(pathname);
  if (rule) {
    const url = request.nextUrl.clone();
    url.pathname = rule.destination;
    url.search = '';
    return NextResponse.redirect(url, rule.permanent === false ? 302 : 301);
  }

  // Block common WordPress probe paths (return 404, not redirect loops)
  const lower = pathname.toLowerCase();
  if (
    lower.startsWith('/wp-content/') ||
    lower.startsWith('/wp-includes/') ||
    lower.endsWith('.php') ||
    lower.includes('/xmlrpc.php')
  ) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const response = NextResponse.next();
  response.headers.set('x-request-path', pathname);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|manifest.json|api/og).*)',
  ],
};
