import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const discourseUserCookie = cookies().get("discourse_user")

  if (discourseUserCookie) {
    try {
      const user = JSON.parse(discourseUserCookie.value)
      return NextResponse.json(user)
    } catch (error) {
      console.error("Failed to parse Discourse user cookie:", error)
      return NextResponse.json({ error: "Invalid user data" }, { status: 500 })
    }
  }

  return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
}
