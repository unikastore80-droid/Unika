import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !isValidAuth(authHeader)) {
      return new NextResponse('Acesso negado. Faça login para continuar.', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="UNIKA STORE Admin", charset="UTF-8"',
        },
      })
    }
  }

  return NextResponse.next()
}

function isValidAuth(header: string): boolean {
  const base64 = header.replace('Basic ', '')
  const [user, pass] = Buffer.from(base64, 'base64').toString().split(':')

  const validUser = process.env.ADMIN_USER ?? 'admin'
  const validPass = process.env.ADMIN_SECRET ?? 'unika2026'

  return user === validUser && pass === validPass
}

export const config = {
  matcher: ['/admin/:path*'],
}
