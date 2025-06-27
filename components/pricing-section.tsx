import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "4.99",
      period: "/mois",
      description: "Parfait pour débuter",
      popular: false,
      features: [
        "1 Site Web",
        "10 GB Stockage SSD",
        "Bande passante illimitée",
        "1 Compte Email",
        "SSL Gratuit",
        "Support par ticket",
      ],
    },
    {
      name: "Business",
      price: "9.99",
      period: "/mois",
      description: "Idéal pour les entreprises",
      popular: true,
      features: [
        "Sites Web illimités",
        "50 GB Stockage SSD",
        "Bande passante illimitée",
        "10 Comptes Email",
        "SSL Gratuit",
        "Support prioritaire",
        "Sauvegardes quotidiennes",
        "CDN gratuit",
      ],
    },
    {
      name: "Pro",
      price: "19.99",
      period: "/mois",
      description: "Pour les professionnels",
      popular: false,
      features: [
        "Sites Web illimités",
        "100 GB Stockage SSD",
        "Bande passante illimitée",
        "Comptes Email illimités",
        "SSL Gratuit",
        "Support 24/7",
        "Sauvegardes quotidiennes",
        "CDN gratuit",
        "Staging gratuit",
        "Protection malware",
      ],
    },
  ]

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Tarifs Transparents</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins. Tous nos plans incluent une garantie de remboursement de 30
            jours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative h-full ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Plus populaire</Badge>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}€</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                  Choisir ce plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Besoin d'une solution sur mesure ?</p>
          <Button variant="outline" size="lg">
            Contactez notre équipe commerciale
          </Button>
        </div>
      </div>
    </section>
  )
}
