import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  cookies().delete("discourse_user")
  return NextResponse.json({ message: "Logged out successfully" })
}
