import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Users, Zap, Shield, Headphones, Server } from "lucide-react"

export function FiveMSection() {
  const fivemPlans = [
    {
      name: "FiveM Starter",
      price: "15.99",
      players: "32 joueurs",
      ram: "4 GB RAM",
      storage: "20 GB SSD",
      features: ["Anti-DDoS", "Panel TCAdmin", "Support 24/7", "Mods illimités"],
      popular: false,
    },
    {
      name: "FiveM Pro",
      price: "29.99",
      players: "64 joueurs",
      ram: "8 GB RAM",
      storage: "50 GB SSD",
      features: ["Anti-DDoS", "Panel TCAdmin", "Support prioritaire", "Base de données MySQL", "Backup automatique"],
      popular: true,
    },
    {
      name: "FiveM Elite",
      price: "49.99",
      players: "128 joueurs",
      ram: "16 GB RAM",
      storage: "100 GB SSD",
      features: [
        "Anti-DDoS",
        "Panel TCAdmin",
        "Support dédié",
        "Base de données MySQL",
        "Backup automatique",
        "CPU dédié",
      ],
      popular: false,
    },
  ]

  const fivemFeatures = [
    {
      icon: Gamepad2,
      title: "Optimisé FiveM",
      description: "Serveurs spécialement configurés pour FiveM avec les meilleures performances",
    },
    {
      icon: Users,
      title: "Multi-joueurs",
      description: "Supportez jusqu'à 128 joueurs simultanés selon votre plan",
    },
    {
      icon: Zap,
      title: "Démarrage Instantané",
      description: "Votre serveur FiveM est prêt en moins de 5 minutes",
    },
    {
      icon: Shield,
      title: "Protection DDoS",
      description: "Protection avancée contre les attaques DDoS incluse",
    },
    {
      icon: Headphones,
      title: "Support Expert",
      description: "Équipe spécialisée dans FiveM disponible 24/7",
    },
    {
      icon: Server,
      title: "Panel de Gestion",
      description: "Interface TCAdmin pour gérer facilement votre serveur",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Gamepad2 className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl lg:text-4xl font-bold">Serveurs FiveM</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hébergement spécialisé pour vos serveurs FiveM avec une performance exceptionnelle et un support expert
          </p>
        </div>

        {/* Plans FiveM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {fivemPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative h-full ${plan.popular ? "border-blue-600 shadow-lg scale-105" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  Plus populaire
                </Badge>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.players}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}€</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {plan.ram} • {plan.storage}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600 mr-3" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                  {plan.popular ? (
                    <span className="bg-blue-600 hover:bg-blue-700">Choisir ce plan</span>
                  ) : (
                    <span className="border-blue-600 text-blue-600 hover:bg-blue-50">Choisir ce plan</span>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fonctionnalités FiveM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fivemFeatures.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow bg-white/50">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Besoin d'un serveur sur mesure ?</p>
          <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
            Contactez notre équipe FiveM
          </Button>
        </div>
      </div>
    </section>
  )
}
