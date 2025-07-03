"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTebexPackages } from "@/actions/tebex"

interface TebexPackage {
  id: number
  name: string
  description: string
  price: number
  image: string | null
}

export default function TebexStore() {
  const [packages, setPackages] = useState<TebexPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true)
      const result = await getTebexPackages()
      if ("error" in result) {
        setError(result.error)
        setPackages([])
      } else {
        setPackages(result)
        setError(null)
      }
      setLoading(false)
    }
    fetchPackages()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Chargement des packages Tebex...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Erreur: {error}</div>
  }

  if (packages.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Aucun package Tebex trouvé.</div>
  }

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Notre Boutique</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {pkg.image && (
                <img
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <p className="text-2xl font-bold text-primary">{pkg.price} €</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a href={`https://checkout.tebex.io/packages/${pkg.id}`} target="_blank" rel="noopener noreferrer">
                  Acheter maintenant
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
