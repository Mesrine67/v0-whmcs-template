import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const WHMCS_URL = process.env.WHMCS_URL
const WHMCS_API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER
const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("whmcs_session")

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Décoder les données de session
    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString())

    // Vérifier la validité de la session avec WHMCS
    const response = await fetch(`${WHMCS_URL}/includes/api.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "GetClientsDetails",
        clientid: sessionData.userId,
        identifier: WHMCS_API_IDENTIFIER!,
        secret: WHMCS_API_SECRET!,
        responsetype: "json",
      }),
    })

    const whmcsData = await response.json()

    if (whmcsData.result === "success") {
      // Session valide, mettre à jour les données si nécessaire
      const updatedSessionData = {
        ...sessionData,
        firstName: whmcsData.firstname,
        lastName: whmcsData.lastname,
        email: whmcsData.email,
        status: whmcsData.status,
        lastValidated: Date.now(),
      }

      return NextResponse.json({
        authenticated: true,
        user: updatedSessionData,
      })
    } else {
      // Session invalide, supprimer le cookie
      const response = NextResponse.json({ authenticated: false }, { status: 401 })
      response.cookies.delete("whmcs_session")
      return response
    }
  } catch (error) {
    console.error("Erreur validation session:", error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
