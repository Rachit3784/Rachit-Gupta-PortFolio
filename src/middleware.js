import { NextResponse } from 'next/server';

export function middleware(request) {
  // Skip redirect during build phase or internal Next.js data requests
  if (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    request.headers.get('x-nextjs-data') ||
    request.headers.get('purpose') === 'prefetch'
  ) {
    return NextResponse.next();
  }

  // Fetch the API key stored in cookies
  const adminKey = request.cookies.get('admin_key')?.value;

  // Check if the admin API key in cookies matches the stored environment key
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    request.nextUrl.pathname !== '/admin/login' &&
    process.env.NEXT_PUBLIC_KEY &&
    adminKey !== process.env.NEXT_PUBLIC_KEY
  ) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on all admin-related paths
export const config = {
  matcher: ['/admin/:path*'],
};
