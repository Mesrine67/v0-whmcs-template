import { NextResponse } from "next/server"
import { decryptDiscoursePayload } from "@/lib/discourse-keys"
import { cookies } from "next/headers"
import prisma from "@/lib/prisma" // Importez le client Prisma

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const payload = searchParams.get("payload")

  const forumUrl = process.env.NEXT_PUBLIC_DISCOURSE_FORUM_URL
  const privateKeyPem = process.env.DISCOURSE_PRIVATE_KEY

  if (!payload || !forumUrl || !privateKeyPem) {
    return NextResponse.json({ error: "Missing payload or Discourse environment variables" }, { status: 400 })
  }

  const storedNonce = cookies().get("discourse_nonce")?.value
  const storedClientId = cookies().get("discourse_client_id")?.value

  if (!storedNonce || !storedClientId) {
    return NextResponse.json({ error: "Missing nonce or client ID in cookies" }, { status: 400 })
  }

  try {
    const decryptedResponse = await decryptDiscoursePayload(payload, privateKeyPem)

    if (decryptedResponse.nonce !== storedNonce) {
      return NextResponse.json({ error: "Invalid nonce" }, { status: 403 })
    }

    const userApiKey = decryptedResponse.key

    // Fetch current session from Discourse
    const sessionResponse = await fetch(`${forumUrl}/session/current.json`, {
      headers: {
        "User-Api-Key": userApiKey,
        "User-Api-Client-Id": storedClientId,
      },
    })

    if (!sessionResponse.ok) {
      const errorText = await sessionResponse.text()
      console.error("Failed to get Discourse session information:", sessionResponse.status, errorText)
      return NextResponse.json(
        { error: "Failed to get Discourse session information" },
        { status: sessionResponse.status },
      )
    }

    const sessionData = await sessionResponse.json()
    const discourseUser = sessionData.current_user

    // --- Nouvelle logique pour sauvegarder/mettre à jour l'utilisateur dans la BDD ---
    if (discourseUser) {
      try {
        const user = await prisma.user.upsert({
          where: {
            provider_providerAccountId: {
              provider: "discourse",
              providerAccountId: discourseUser.id.toString(), // L'ID Discourse est un nombre, le convertir en string
            },
          },
          update: {
            username: discourseUser.username,
            name: discourseUser.name || null,
            avatarTemplate: discourseUser.avatar_template || null,
            isAdmin: discourseUser.admin || false,
            isModerator: discourseUser.moderator || false,
          },
          create: {
            provider: "discourse",
            providerAccountId: discourseUser.id.toString(),
            username: discourseUser.username,
            name: discourseUser.name || null,
            avatarTemplate: discourseUser.avatar_template || null,
            isAdmin: discourseUser.admin || false,
            isModerator: discourseUser.moderator || false,
          },
        })
        console.log("Discourse user saved/updated in DB:", user.username)
      } catch (dbError) {
        console.error("Failed to save/update Discourse user in database:", dbError)
        // Ne pas bloquer la connexion si la BDD échoue, mais logguer l'erreur
      }
    }
    // --- Fin de la nouvelle logique ---

    // Clear temporary cookies
    cookies().delete("discourse_nonce")
    cookies().delete("discourse_client_id")

    // Store user data in a secure cookie for your application
    cookies().set("discourse_user", JSON.stringify(discourseUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Redirect to home page or dashboard
    return NextResponse.redirect(new URL("/", request.url))
  } catch (error: any) {
    console.error("Discourse callback failed:", error)
    return NextResponse.json(
      { error: `Discourse authentication failed: ${error.message || "Unknown error"}` },
      { status: 500 },
    )
  }
}
