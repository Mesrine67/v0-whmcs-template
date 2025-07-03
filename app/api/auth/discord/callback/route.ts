import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const supabase = await createClient()
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const discordUser = data.user.user_metadata // Supabase stocke les métadonnées de Discord ici

      if (discordUser) {
        try {
          const user = await prisma.user.upsert({
            where: {
              provider_providerAccountId: {
                provider: "discord",
                providerAccountId: discordUser.provider_id.toString(), // L'ID Discord est dans user_metadata.provider_id
              },
            },
            update: {
              username: discordUser.full_name || discordUser.user_name || "Discord User",
              name: discordUser.full_name || null,
              avatarTemplate: discordUser.avatar_url || null,
              // Discord n'expose pas directement admin/moderator via OAuth par défaut,
              // vous devrez gérer cela via des rôles Discord et votre logique interne si nécessaire.
              // Pour l'instant, on les laisse à false.
              isAdmin: false,
              isModerator: false,
            },
            create: {
              provider: "discord",
              providerAccountId: discordUser.provider_id.toString(),
              username: discordUser.full_name || discordUser.user_name || "Discord User",
              name: discordUser.full_name || null,
              avatarTemplate: discordUser.avatar_url || null,
              isAdmin: false,
              isModerator: false,
            },
          })
          console.log("Discord user saved/updated in DB:", user.username)
        } catch (dbError) {
          console.error("Failed to save/update Discord user in database:", dbError)
        }
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`) // Créez cette page si nécessaire
}
