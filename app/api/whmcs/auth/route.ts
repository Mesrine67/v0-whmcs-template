import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const WHMCS_URL = process.env.WHMCS_URL || "https://hebergtonserv.com/whmcs"
const WHMCS_API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER
const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET

export async function POST(request: NextRequest) {
  try {
    const { email, password, rememberMe } = await request.json()

    // Appel à l'API WHMCS pour l'authentification
    const whmcsResponse = await fetch(`${WHMCS_URL}/includes/api.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "ValidateLogin",
        email: email,
        password2: password,
        identifier: WHMCS_API_IDENTIFIER!,
        secret: WHMCS_API_SECRET!,
        responsetype: "json",
      }),
    })

    const whmcsData = await whmcsResponse.json()

    if (whmcsData.result === "success") {
      // Récupération des détails du client
      const clientResponse = await fetch(`${WHMCS_URL}/includes/api.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          action: "GetClientsDetails",
          clientid: whmcsData.userid,
          identifier: WHMCS_API_IDENTIFIER!,
          secret: WHMCS_API_SECRET!,
          responsetype: "json",
        }),
      })

      const clientData = await clientResponse.json()

      if (clientData.result === "success") {
        // Création de la session
        const sessionData = {
          userId: clientData.userid,
          email: clientData.email,
          firstName: clientData.firstname,
          lastName: clientData.lastname,
          status: clientData.status,
        }

        // Configuration du cookie de session
        const cookieStore = cookies()
        const sessionCookie = {
          name: "whmcs_session",
          value: Buffer.from(JSON.stringify(sessionData)).toString("base64"),
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax" as const,
          maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 jours ou 1 jour
        }

        const response = NextResponse.json({
          success: true,
          user: sessionData,
          redirectUrl: "/client-area",
        })

        response.cookies.set(sessionCookie)

        return response
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Identifiants incorrects",
      },
      { status: 401 },
    )
  } catch (error) {
    console.error("Erreur API WHMCS Auth:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur",
      },
      { status: 500 },
    )
  }
}

// Route pour vérifier la session
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("whmcs_session")

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString())

    return NextResponse.json({
      authenticated: true,
      user: sessionData,
    })
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}

// Route pour la déconnexion
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete("whmcs_session")
  return response
}
