import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Vérifier l'authentification pour les pages protégées
  const protectedPaths = ["/client-area", "/admin"]
  const pathname = request.nextUrl.pathname

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const sessionCookie = request.cookies.get("whmcs_session")

    if (!sessionCookie) {
      // Rediriger vers la page de connexion
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // Vérifier la validité du cookie de session
      const sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString())

      // Vérifier l'expiration (optionnel)
      if (sessionData.expiresAt && Date.now() > sessionData.expiresAt) {
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("whmcs_session")
        return response
      }
    } catch (error) {
      // Cookie invalide, rediriger vers la connexion
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("whmcs_session")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
