import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token')?.value
 
  // if (!authToken) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/upload/:path*', '/my-blogs/:path*', '/funds/:path*', '/profile/:path*', '/withdraw/:path*'],
}
