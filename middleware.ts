import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'dev-secret-change-me');

const PUBLIC_API = ['/api/auth/login'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin/login sayfasını koru (sonsuz yönlendirme engeli)
  if (pathname === '/admin/login') return NextResponse.next();

  const isAdminRoute = pathname.startsWith('/admin');
  const isProtectedApi = pathname.startsWith('/api') && !PUBLIC_API.includes(pathname);

  if (!isAdminRoute && !isProtectedApi) return NextResponse.next();

  const token = req.cookies.get('admin_token')?.value;

  if (!token) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    return NextResponse.json({ error: 'Geçersiz oturum.' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
