import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FiveMSection } from "@/components/fivem-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Server, Users, Shield, Headphones, Database, Code } from "lucide-react"

export const dynamic = "force-dynamic"

export default function FiveMPage() {
  const fivemFeatures = [
    {
      icon: Server,
      title: "Serveurs Haute Performance",
      description: "CPU Intel Xeon dernière génération avec SSD NVMe pour des performances optimales",
    },
    {
      icon: Shield,
      title: "Protection DDoS Avancée",
      description: "Protection multicouche contre les attaques DDoS spécialement adaptée au gaming",
    },
    {
      icon: Database,
      title: "Base de Données MySQL",
      description: "Base de données MySQL incluse pour vos scripts et sauvegardes de données",
    },
    {
      icon: Code,
      title: "Mods & Scripts Illimités",
      description: "Installez tous vos mods et scripts favoris sans limitation",
    },
    {
      icon: Users,
      title: "Multi-joueurs Optimisé",
      description: "Supportez jusqu'à 128 joueurs simultanés avec une latence minimale",
    },
    {
      icon: Headphones,
      title: "Support Expert FiveM",
      description: "Équipe spécialisée dans FiveM disponible 24/7 pour vous aider",
    },
  ]

  const testimonials = [
    {
      name: "Alex Gaming",
      server: "Los Santos RP",
      comment: "Excellent service ! Mon serveur FiveM tourne parfaitement avec 80+ joueurs simultanés.",
      rating: 5,
    },
    {
      name: "Marie L.",
      server: "French Roleplay",
      comment: "Support réactif et serveurs très stables. Je recommande HebergTonServ !",
      rating: 5,
    },
    {
      name: "Thomas RP",
      server: "City Life RP",
      comment: "Meilleur hébergeur FiveM que j'ai testé. Performance au top !",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section FiveM */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-600 to-sky-600 text-white">
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Gamepad2 className="h-12 w-12 mr-4" />
                <h1 className="text-4xl lg:text-6xl font-bold">Serveurs FiveM</h1>
              </div>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                L'hébergement FiveM de référence en France. Serveurs optimisés, support expert et performance garantie
                pour votre serveur roleplay.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 bg-white text-blue-600 hover:bg-gray-100">
                  Voir les offres FiveM
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Tester gratuitement
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section des fonctionnalités */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Pourquoi Choisir Nos Serveurs FiveM ?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Des serveurs spécialement optimisés pour FiveM avec toutes les fonctionnalités dont vous avez besoin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fivemFeatures.map((feature, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section des plans */}
        <FiveMSection />

        {/* Témoignages */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ce Que Disent Nos Clients</h2>
              <p className="text-xl text-muted-foreground">Des centaines de serveurs FiveM nous font confiance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.server}</CardDescription>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ FiveM */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Questions Fréquentes</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Combien de joueurs puis-je avoir sur mon serveur ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Selon votre plan, vous pouvez avoir de 32 à 128 joueurs simultanés. Nos serveurs sont optimisés pour
                    maintenir d'excellentes performances même avec un grand nombre de joueurs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Puis-je installer mes propres mods et scripts ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absolument ! Vous avez un accès complet à votre serveur via FTP et notre panel de gestion. Installez
                    tous les mods et scripts que vous souhaitez sans limitation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Le support technique est-il inclus ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oui ! Notre équipe d'experts FiveM est disponible 24/7 pour vous aider avec la configuration, les
                    mods, et tout problème technique que vous pourriez rencontrer.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
