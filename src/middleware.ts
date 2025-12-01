import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = /^\/(pt|en)/.test(pathname);
  
  if (pathnameHasLocale) return;
  
  // Get locale from cookie or accept-language header
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'pt';
  
  // Redirect to locale-prefixed path
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg).*)',
  ],
};
