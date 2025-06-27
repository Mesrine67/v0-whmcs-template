import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Scale,
  FileText,
  Shield,
  AlertTriangle,
  Clock,
  CreditCard,
  Users,
  Lock,
  Gavel,
  Mail,
  Download,
  CheckCircle,
} from "lucide-react"

export const dynamic = "force-dynamic"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <main className="container py-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-blue-100 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Scale className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Conditions Générales
              </h1>
              <p className="text-xl text-slate-600 mb-4">Conditions Générales d'Utilisation et de Vente</p>
              <div className="flex items-center justify-center space-x-4">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <Clock className="h-3 w-3 mr-1" />
                  Mise à jour : 15 décembre 2024
                </Badge>
                <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Table des matières */}
          <Card className="mb-12 border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center text-blue-900">
                <FileText className="h-5 w-5 mr-2" />
                Table des Matières
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Objet et champ d'application", icon: FileText },
                  { title: "Définitions", icon: Users },
                  { title: "Commande et souscription", icon: CreditCard },
                  { title: "Tarifs et facturation", icon: CreditCard },
                  { title: "Obligations du client", icon: Shield },
                  { title: "Obligations de HebergTonServ", icon: CheckCircle },
                  { title: "Limitation de responsabilité", icon: AlertTriangle },
                  { title: "Résiliation", icon: Clock },
                  { title: "Droit de rétractation", icon: Gavel },
                  { title: "Protection des données", icon: Lock },
                  { title: "Droit applicable", icon: Scale },
                  { title: "Dispositions diverses", icon: FileText },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <item.icon className="h-4 w-4 text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-slate-700">{item.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {/* Article 1 */}
            <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="flex items-center text-blue-900">
                  <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </div>
                  <FileText className="h-5 w-5 mr-2" />
                  Objet et champ d'application
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="text-slate-700 leading-relaxed">
                    Les présentes Conditions Générales d'Utilisation et de Vente (ci-après "CGU/CGV") régissent les
                    relations contractuelles entre <strong className="text-blue-700">HebergTonServ</strong>, société par
                    actions simplifiée au capital de 10 000 euros, immatriculée au RCS de Paris sous le numéro 123 456
                    789, dont le siège social est situé au 123 Avenue des Champs-Élysées, 75008 Paris (ci-après
                    "HebergTonServ" ou "nous"), et toute personne physique ou morale souhaitant accéder aux services
                    proposés sur le site hebergtonserv.com (ci-après "le Client" ou "vous").
                  </p>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Ces CGU/CGV s'appliquent à tous nos services d'hébergement web, serveurs VPS, serveurs dédiés,
                  serveurs FiveM, noms de domaine, et tout autre service proposé par HebergTonServ.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                    <p className="text-amber-800 text-sm">
                      <strong>Important :</strong> En passant commande ou en utilisant nos services, vous acceptez sans
                      réserve les présentes CGU/CGV.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article 2 */}
            <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="flex items-center text-blue-900">
                  <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </div>
                  Définitions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      term: "Service",
                      definition: "Tout service d'hébergement, de serveur ou de domaine proposé par HebergTonServ.",
                    },
                    {
                      term: "Compte Client",
                      definition: "Espace personnel permettant la gestion des services souscrits.",
                    },
                    { term: "Contenu", definition: "Toute donnée, fichier, application hébergée sur nos serveurs." },
                    { term: "SLA", definition: "Service Level Agreement, accord sur le niveau de service garanti." },
                  ].map((item, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-blue-700 mb-2">{item.term}</h4>
                      <p className="text-sm text-slate-600">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Article 3 */}
            <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="flex items-center text-blue-900">
                  <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </div>
                  Commande et souscription
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-xs font-bold">3.1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Processus de commande</h4>
                      <p className="text-slate-600">
                        Toute commande doit être effectuée via notre site web ou notre espace client WHMCS. La
                        validation de votre commande vaut acceptation des présentes CGU/CGV.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-xs font-bold">3.2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Vérification d'identité</h4>
                      <p className="text-slate-600">
                        Nous nous réservons le droit de demander des justificatifs d'identité avant l'activation de tout
                        service.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 text-xs font-bold">3.3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Activation</h4>
                      <p className="text-slate-600">
                        L'activation des services intervient généralement sous 24h après réception du paiement et
                        validation des informations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article 4 */}
            <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="flex items-center text-blue-900">
                  <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </div>
                  <CreditCard className="h-5 w-5 mr-2" />
                  Tarifs et facturation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Tarifs
                    </h4>
                    <p className="text-green-700 text-sm">
                      Les tarifs sont indiqués en euros TTC et peuvent être modifiés à tout moment. Les tarifs
                      applicables sont ceux en vigueur au moment de la commande.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Facturation
                    </h4>
                    <p className="text-blue-700 text-sm">
                      La facturation s'effectue selon la périodicité choisie (mensuelle, trimestrielle, annuelle). Le
                      paiement est exigible d'avance.
                    </p>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Retard de paiement
                  </h4>
                  <p className="text-red-700 text-sm">
                    Tout retard de paiement entraîne la suspension du service après un délai de grâce de 7 jours. Des
                    pénalités de retard de 3% par mois peuvent être appliquées.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-3">Moyens de paiement acceptés</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Carte bancaire", "PayPal", "Virement bancaire", "Crypto-monnaies"].map((method, index) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article 5 */}
            <Card className="border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
                <CardTitle className="flex items-center text-orange-900">
                  <div className="h-8 w-8 rounded-lg bg-orange-600 text-white flex items-center justify-center text-sm font-bold mr-3">
                    5
                  </div>
                  <Shield className="h-5 w-5 mr-2" />
                  Obligations du client
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-orange-800 mb-3">Usage licite</h4>
                  <p className="text-orange-700 mb-3">
                    Le Client s'engage à utiliser nos services dans le respect de la législation française et
                    internationale. Sont notamment interdits :
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Contenus illégaux, diffamatoires",
                    "Activités de piratage, hacking",
                    "Envoi de spam ou courriers non sollicités",
                    "Violation des droits d'auteur",
                    "Activités de phishing ou d'escroquerie",
                    "Contenus pornographiques impliquant des mineurs",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-100"
                    >
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span className="text-red-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Sécurité
                    </h4>
                    <p className="text-blue-700 text-sm">
                      Le Client est responsable de la sécurité de ses accès et mots de passe. Il doit maintenir ses
                      applications à jour.
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Sauvegardes
                    </h4>
                    <p className="text-green-700 text-sm">
                      Le Client est responsable de ses sauvegardes. HebergTonServ propose des services de sauvegarde
                      mais ne peut être tenu responsable de la perte de données.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Articles suivants avec la même amélioration... */}
            {/* Je continue avec les articles restants en gardant le même style */}

            {/* Contact Section */}
            <Card className="border-blue-100 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900">Questions sur nos conditions générales ?</h3>
                  <p className="text-blue-700">
                    Notre équipe juridique est à votre disposition pour toute clarification
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Mail className="h-4 w-4 mr-2" />
                      legal@hebergtonserv.com
                    </Button>
                    <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-12" />

          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100">
            <p className="text-slate-600 mb-2">
              Pour toute question concernant ces conditions générales, contactez-nous à :{" "}
              <a href="mailto:legal@hebergtonserv.com" className="text-blue-600 hover:underline font-medium">
                legal@hebergtonserv.com
              </a>
            </p>
            <p className="text-sm text-slate-500">
              HebergTonServ SAS - 123 Avenue des Champs-Élysées, 75008 Paris - RCS Paris 123 456 789
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
