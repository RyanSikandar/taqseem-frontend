import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    console.log('Middleware running on path:', request.nextUrl.pathname);
    console.log('Token exists:', !!token);

    // If a user is logged in and trying to access the login page, redirect to dashboard
    if (token && request.nextUrl.pathname === '/login') {
        console.log('Redirecting logged-in user to dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (token && request.nextUrl.pathname === '/register') {
        console.log('Redirecting logged-in user to dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (token) {
        // If token exists and trying to access the home page, redirect to dashboard
        if (request.nextUrl.pathname === '/') {
            console.log('Redirecting to dashboard');
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        // For all other routes, allow access
        return NextResponse.next();
    }

    // If no token and trying to access protected routes, redirect to login
    if (!token && request.nextUrl.pathname !== '/login') {
        console.log('Redirecting to login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // For all other cases, continue with the request
    return NextResponse.next();
}

// Update matcher configuration
export const config = {
    matcher: ['/profile/:path*', '/login', '/favourite/:path*', '/add-donation/:path*', '/donation/:path*', '/your-donations/:path*', '/your-volunteers/:path*'],
};
