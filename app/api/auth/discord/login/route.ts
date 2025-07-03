import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams, origin } = new URL(request.url)
  const next = searchParams.get("next") ?? "/"

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${origin}/api/auth/discord/callback?next=${next}`,
    },
  })

  if (error) {
    console.error("Error initiating Discord login:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.redirect(data.url)
}
