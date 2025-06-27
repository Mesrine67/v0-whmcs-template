import { Card, CardContent } from "@/components/ui/card"
import { Clock, Shield, Headphones, Zap, Database, Globe, Lock, BarChart3 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: "Disponibilité 99.9%",
      description: "Garantie de temps de fonctionnement avec SLA",
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Protection multicouche contre toutes les menaces",
    },
    {
      icon: Headphones,
      title: "Support Expert",
      description: "Équipe technique disponible 24h/24, 7j/7",
    },
    {
      icon: Zap,
      title: "Performance Optimale",
      description: "Serveurs SSD NVMe et CDN mondial",
    },
    {
      icon: Database,
      title: "Sauvegardes Automatiques",
      description: "Vos données protégées quotidiennement",
    },
    {
      icon: Globe,
      title: "Réseau Mondial",
      description: "Centres de données sur 5 continents",
    },
    {
      icon: Lock,
      title: "SSL Gratuit",
      description: "Certificats SSL inclus avec tous les plans",
    },
    {
      icon: BarChart3,
      title: "Statistiques Détaillées",
      description: "Analytics et monitoring en temps réel",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Pourquoi Nous Choisir ?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des fonctionnalités avancées et un service de qualité pour garantir le succès de votre projet web
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
