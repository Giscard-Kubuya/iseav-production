import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For the INFONET admin system, we handle authentication client-side
  // This middleware just allows all requests through
  // In production, you would validate JWT tokens here
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
}