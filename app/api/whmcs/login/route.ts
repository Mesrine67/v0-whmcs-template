import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  // Rediriger vers la nouvelle route d'authentification
  return fetch(new URL("/api/whmcs/auth", request.url), {
    method: "POST",
    headers: request.headers,
    body: await request.text(),
  })
}
