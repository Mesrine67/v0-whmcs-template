"use server"

interface TebexPackage {
  id: number
  name: string
  description: string
  price: number
  image: string | null
  // Add other relevant package properties
}

interface TebexPackagesResponse {
  data: TebexPackage[]
}

export async function getTebexPackages(): Promise<TebexPackage[] | { error: string }> {
  const secretKey = process.env.TEBEX_SECRET_KEY
  const webstoreId = process.env.NEXT_PUBLIC_TEBEX_WEBSTORE_ID

  if (!secretKey || !webstoreId) {
    return { error: "Missing Tebex environment variables (TEBEX_SECRET_KEY or NEXT_PUBLIC_TEBEX_WEBSTORE_ID)" }
  }

  try {
    const response = await fetch(`https://plugin.tebex.io/stores/${webstoreId}/packages`, {
      headers: {
        "X-Tebex-Secret": secretKey,
        "Content-Type": "application/json",
      },
      // Ensure no-cache if you want fresh data every time
      cache: "no-store",
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Failed to fetch Tebex packages:", response.status, errorData)
      return { error: `Failed to fetch Tebex packages: ${errorData.message || response.statusText}` }
    }

    const data: TebexPackagesResponse = await response.json()
    return data.data
  } catch (error) {
    console.error("Error fetching Tebex packages:", error)
    return { error: "An unexpected error occurred while fetching Tebex packages." }
  }
}
