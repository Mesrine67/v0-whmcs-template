"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, Star } from "lucide-react"

interface Plan {
  id: string
  name: string
  price: number
  originalPrice?: number
  popular: boolean
  description: string
  features: {
    [key: string]: boolean | string | number
  }
  highlights: string[]
}

const webHostingPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 4.99,
    popular: false,
    description: "Parfait pour débuter",
    features: {
      websites: 1,
      storage: "10 GB",
      bandwidth: "Illimitée",
      emails: 1,
      ssl: true,
      backup: false,
      support: "Standard",
      uptime: "99.9%",
    },
    highlights: ["SSL gratuit", "Installation en 1 clic", "cPanel inclus"],
  },
  {
    id: "business",
    name: "Business",
    price: 9.99,
    originalPrice: 14.99,
    popular: true,
    description: "Idéal pour les entreprises",
    features: {
      websites: "Illimités",
      storage: "50 GB",
      bandwidth: "Illimitée",
      emails: 10,
      ssl: true,
      backup: true,
      support: "Prioritaire",
      uptime: "99.95%",
    },
    highlights: ["Sauvegardes quotidiennes", "CDN gratuit", "Support prioritaire"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 19.99,
    popular: false,
    description: "Pour les professionnels",
    features: {
      websites: "Illimités",
      storage: "100 GB",
      bandwidth: "Illimitée",
      emails: "Illimités",
      ssl: true,
      backup: true,
      support: "Premium",
      uptime: "99.99%",
    },
    highlights: ["Staging gratuit", "Protection malware", "Support 24/7"],
  },
]

const vpsPlans: Plan[] = [
  {
    id: "vps-basic",
    name: "VPS Basic",
    price: 15.99,
    popular: false,
    description: "VPS d'entrée de gamme",
    features: {
      cpu: "2 vCPU",
      ram: "4 GB",
      storage: "50 GB SSD",
      bandwidth: "2 TB",
      ip: "1 IP dédiée",
      backup: false,
      support: "Standard",
      uptime: "99.9%",
    },
    highlights: ["Accès root complet", "OS au choix", "Redémarrage instantané"],
  },
  {
    id: "vps-standard",
    name: "VPS Standard",
    price: 29.99,
    originalPrice: 39.99,
    popular: true,
    description: "Le plus populaire",
    features: {
      cpu: "4 vCPU",
      ram: "8 GB",
      storage: "100 GB SSD",
      bandwidth: "4 TB",
      ip: "2 IP dédiées",
      backup: true,
      support: "Prioritaire",
      uptime: "99.95%",
    },
    highlights: ["Sauvegardes automatiques", "Monitoring inclus", "Support prioritaire"],
  },
  {
    id: "vps-premium",
    name: "VPS Premium",
    price: 59.99,
    popular: false,
    description: "Performances maximales",
    features: {
      cpu: "8 vCPU",
      ram: "16 GB",
      storage: "200 GB SSD",
      bandwidth: "8 TB",
      ip: "4 IP dédiées",
      backup: true,
      support: "Premium",
      uptime: "99.99%",
    },
    highlights: ["SSD NVMe haute vitesse", "Protection DDoS", "Support 24/7"],
  },
]

export function ServiceComparison() {
  const [selectedCategory, setSelectedCategory] = useState("web")
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])

  const currentPlans = selectedCategory === "web" ? webHostingPlans : vpsPlans

  const togglePlanSelection = (planId: string) => {
    setSelectedPlans(
      (prev) => (prev.includes(planId) ? prev.filter((id) => id !== planId) : [...prev, planId].slice(-3)), // Max 3 plans
    )
  }

  const getFeatureValue = (value: boolean | string | number) => {
    if (typeof value === "boolean") {
      return value ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />
    }
    return value
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Comparateur de Services</h1>
        <p className="text-xl text-muted-foreground">
          Comparez nos différents plans pour trouver celui qui vous convient
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="web">Hébergement Web</TabsTrigger>
          <TabsTrigger value="vps">Serveurs VPS</TabsTrigger>
        </TabsList>

        <TabsContent value="web" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {webHostingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative transition-all duration-200 hover:shadow-lg ${
                  plan.popular ? "border-primary shadow-lg scale-105" : ""
                } ${selectedPlans.includes(plan.id) ? "ring-2 ring-primary" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Star className="h-3 w-3 mr-1" />
                    Plus populaire
                  </Badge>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 space-y-1">
                    {plan.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">{plan.originalPrice}€/mois</div>
                    )}
                    <div className="text-4xl font-bold text-primary">
                      {plan.price}€<span className="text-base font-normal text-muted-foreground">/mois</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                      Choisir ce plan
                    </Button>

                    <Button variant="ghost" size="sm" className="w-full" onClick={() => togglePlanSelection(plan.id)}>
                      {selectedPlans.includes(plan.id) ? "Retirer de la comparaison" : "Comparer"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vps" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vpsPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative transition-all duration-200 hover:shadow-lg ${
                  plan.popular ? "border-primary shadow-lg scale-105" : ""
                } ${selectedPlans.includes(plan.id) ? "ring-2 ring-primary" : ""}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Star className="h-3 w-3 mr-1" />
                    Plus populaire
                  </Badge>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 space-y-1">
                    {plan.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">{plan.originalPrice}€/mois</div>
                    )}
                    <div className="text-4xl font-bold text-primary">
                      {plan.price}€<span className="text-base font-normal text-muted-foreground">/mois</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                      Choisir ce plan
                    </Button>

                    <Button variant="ghost" size="sm" className="w-full" onClick={() => togglePlanSelection(plan.id)}>
                      {selectedPlans.includes(plan.id) ? "Retirer de la comparaison" : "Comparer"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Tableau de comparaison détaillé */}
      {selectedPlans.length > 1 && (
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Comparaison Détaillée</CardTitle>
            <CardDescription>Comparez les caractéristiques des plans sélectionnés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Caractéristiques</th>
                    {selectedPlans.map((planId) => {
                      const plan = currentPlans.find((p) => p.id === planId)
                      return (
                        <th key={planId} className="text-center p-4">
                          <div className="space-y-2">
                            <div className="font-semibold">{plan?.name}</div>
                            <div className="text-2xl font-bold text-primary">{plan?.price}€/mois</div>
                          </div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(currentPlans[0].features).map((feature) => (
                    <tr key={feature} className="border-b">
                      <td className="p-4 font-medium capitalize">{feature.replace(/([A-Z])/g, " $1").trim()}</td>
                      {selectedPlans.map((planId) => {
                        const plan = currentPlans.find((p) => p.id === planId)
                        const value = plan?.features[feature]
                        return (
                          <td key={planId} className="p-4 text-center">
                            {getFeatureValue(value)}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
