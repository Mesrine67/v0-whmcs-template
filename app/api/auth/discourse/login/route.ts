import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { randomBytes } from "crypto"

/**
 * GET /api/auth/discourse/login
 *
 * Redirige l’utilisateur vers Discourse pour autorisation “User API Keys”.
 * Nécessite les variables d’environnement :
 *  – NEXT_PUBLIC_DISCOURSE_FORUM_URL
 *  – NEXT_PUBLIC_DISCOURSE_APPLICATION_NAME
 *  – DISCOURSE_PUBLIC_KEY               ← contenu du fichier publickey.pem
 */
export async function GET() {
  try {
    const forumUrl = process.env.NEXT_PUBLIC_DISCOURSE_FORUM_URL
    const applicationName = process.env.NEXT_PUBLIC_DISCOURSE_APPLICATION_NAME
    const publicKey = process.env.DISCOURSE_PUBLIC_KEY

    if (!forumUrl || !applicationName || !publicKey) {
      return NextResponse.json({ error: "Missing Discourse environment variables" }, { status: 500 })
    }

    // 1. Génère nonce & client-id, stocke en cookies (5 min)
    const nonce = randomBytes(16).toString("hex")
    const clientId = randomBytes(48).toString("hex")

    cookies().set("discourse_nonce", nonce, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 5,
      path: "/",
    })
    cookies().set("discourse_client_id", clientId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 5,
      path: "/",
    })

    // 2. Construit l’URL de redirection vers Discourse
    const redirectUrl = new URL(
      "/api/auth/discourse/callback",
      process.env.VERCEL_URL || "http://localhost:3000",
    ).toString()

    const query = new URLSearchParams({
      auth_redirect: redirectUrl,
      application_name: applicationName,
      scopes: "session_info",
      client_id: clientId,
      nonce,
      public_key: publicKey, // This is sent to Discourse
    }).toString()

    return NextResponse.redirect(`${forumUrl}/user-api-key/new?${query}`)
  } catch (error: any) {
    console.error("Error in /api/auth/discourse/login:", error)
    return NextResponse.json(
      { error: `Failed to initiate Discourse login: ${error.message || "Unknown error"}` },
      { status: 500 },
    )
  }
}
