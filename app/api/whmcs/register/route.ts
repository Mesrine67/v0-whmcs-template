import { type NextRequest, NextResponse } from "next/server"

const WHMCS_URL = process.env.WHMCS_URL || "https://hebergtonserv.com/whmcs"
const WHMCS_API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER
const WHMCS_API_SECRET = process.env.WHMCS_API_SECRET

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, phone, address, city, country, acceptNewsletter } =
      await request.json()

    // Appel à l'API WHMCS pour créer le client
    const whmcsResponse = await fetch(`${WHMCS_URL}/includes/api.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "AddClient",
        firstname: firstName,
        lastname: lastName,
        email: email,
        password2: password,
        phonenumber: phone || "",
        address1: address || "",
        city: city || "",
        country: country || "FR",
        clientip: request.headers.get("x-forwarded-for") || "127.0.0.1",
        identifier: WHMCS_API_IDENTIFIER!,
        secret: WHMCS_API_SECRET!,
        responsetype: "json",
      }),
    })

    const whmcsData = await whmcsResponse.json()

    if (whmcsData.result === "success") {
      // Optionnel : Ajouter à la newsletter si accepté
      if (acceptNewsletter) {
        // Logique d'ajout à la newsletter
      }

      return NextResponse.json({
        success: true,
        message: "Compte créé avec succès",
        clientId: whmcsData.clientid,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: whmcsData.message || "Erreur lors de la création du compte",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Erreur API WHMCS Register:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur",
      },
      { status: 500 },
    )
  }
}
