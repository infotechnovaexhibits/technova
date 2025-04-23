import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set this to true when you want to enable maintenance mode
const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

export function middleware(request: NextRequest) {
  // If maintenance mode is enabled and user is not on the maintenance page
  if (MAINTENANCE_MODE && !request.nextUrl.pathname.startsWith('/maintenance')) {
    // Create a new URL for the maintenance page
    const maintenanceUrl = new URL('/maintenance', request.url);
    
    // Redirect to maintenance page
    return NextResponse.redirect(maintenanceUrl);
  }

  // If maintenance mode is disabled and user is on maintenance page
  if (!MAINTENANCE_MODE && request.nextUrl.pathname.startsWith('/maintenance')) {
    // Redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Only protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check if user is authenticated
    const isAuthenticated = request.cookies.has('auth_token');

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/dashboard/:path*']
}; 