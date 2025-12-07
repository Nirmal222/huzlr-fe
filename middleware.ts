import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Define paths to protect
const protectedPaths = ['/dashboard', '/projects', '/boards', '/brainstorms']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Check if accessing protected path
  const isProtected = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtected) {
    if (!token) {
        return NextResponse.redirect(new URL('/signup', request.url))
    }

    try {
        const secretKey = process.env.JWT_SECRET || "your-super-secret-key-change-it"
        const secret = new TextEncoder().encode(secretKey)
        const { payload } = await jwtVerify(token, secret)
        
        // Check access
        if (payload.has_access !== true) {
             return NextResponse.redirect(new URL('/onboarding', request.url))
        }
    } catch (err) {
        // Token invalid or verification failed
        return NextResponse.redirect(new URL('/signup', request.url))
    }
  }
  
  // If trying to access /onboarding but HAS access, redirect to dashboard
  if (pathname === '/onboarding') {
      if (token) {
          try {
            const secretKey = process.env.JWT_SECRET || "your-super-secret-key-change-it"
            const secret = new TextEncoder().encode(secretKey)
            const { payload } = await jwtVerify(token, secret)
            if (payload.has_access === true) {
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }
          } catch (e) {
              // ignore
          }
      }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}
