import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "./i18n"

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
})

export function middleware(request: NextRequest) {
  // Handle internationalization first
  const response = intlMiddleware(request)

  // Then handle authentication for protected paths
  const protectedPaths = ["/client-area", "/admin"]
  const pathname = request.nextUrl.pathname

  // Remove locale prefix for path checking
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/"

  if (protectedPaths.some((path) => pathWithoutLocale.startsWith(path))) {
    const sessionCookie = request.cookies.get("whmcs_session")

    if (!sessionCookie) {
      const loginUrl = new URL(`/${request.nextUrl.pathname.split("/")[1]}/login`, request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      const sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString())

      if (sessionData.expiresAt && Date.now() > sessionData.expiresAt) {
        const redirectResponse = NextResponse.redirect(
          new URL(`/${request.nextUrl.pathname.split("/")[1]}/login`, request.url),
        )
        redirectResponse.cookies.delete("whmcs_session")
        return redirectResponse
      }
    } catch (error) {
      const redirectResponse = NextResponse.redirect(
        new URL(`/${request.nextUrl.pathname.split("/")[1]}/login`, request.url),
      )
      redirectResponse.cookies.delete("whmcs_session")
      return redirectResponse
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
}
