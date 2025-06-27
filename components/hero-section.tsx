import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Gamepad2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-background to-sky-500/5" />
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Hébergement Web & Gaming
            <span className="text-blue-600 block">Professionnel</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Des solutions d'hébergement fiables pour vos sites web et serveurs de jeux FiveM. Performance optimale,
            support 24/7 et infrastructure française.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 bg-blue-600 hover:bg-blue-700">
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Voir les prix
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Sécurité Maximale</h3>
              <p className="text-sm text-muted-foreground">Protection DDoS, SSL gratuit et sauvegardes automatiques</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Performance Optimale</h3>
              <p className="text-sm text-muted-foreground">SSD NVMe, réseau 10Gbps et serveurs haute performance</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Gamepad2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Spécialiste Gaming</h3>
              <p className="text-sm text-muted-foreground">Serveurs FiveM optimisés et support expert</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
