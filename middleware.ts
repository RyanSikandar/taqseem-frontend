import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    user: string;
    admin: boolean;
    iat: number;
    exp: number;
  }
  

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    console.log('Middleware running on path:', request.nextUrl.pathname);
    console.log('Token exists:', !!token);

    // If a user is logged in, decode the token using jwt-decode
    if (token) {
        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            const isAdmin = decodedToken.admin;
            console.log('Decoded isAdmin:', decodedToken.admin);

            // If not an admin, restrict access to certain routes
            if (!isAdmin) {
                const restrictedPaths = [
                    '/add-donation',
                    '/add-volunteer',
                    '/your-donations',
                    '/your-volunteers'
                ];

                // Check for nested route protection
                const currentPath = request.nextUrl.pathname;
                if (
                    restrictedPaths.some((path) => currentPath.startsWith(path)) ||
                    currentPath.startsWith('/donation/detail/')
                ) {
                    console.log('Access denied for non-admin user');
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                }
            }
        } catch (error) {
            console.log('Invalid token:', error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Redirect to dashboard if a logged-in user tries to access login or register
    if (token && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
        console.log('Redirecting logged-in user to dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect to dashboard if accessing the home page while logged in
    if (token && request.nextUrl.pathname === '/') {
        console.log('Redirecting to dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If no token and trying to access protected routes, redirect to login
    if (!token && request.nextUrl.pathname !== '/login') {
        console.log('Redirecting to login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Continue with the request for all other cases
    return NextResponse.next();
}

// Update matcher configuration
export const config = {
    matcher: [
        '/profile/:path*',
        '/login',
        '/favourite/:path*',
        '/add-donation',
        '/add-volunteer',
        '/donation/detail/:path*',
        '/your-donations',
        '/your-volunteers'
    ],
};
