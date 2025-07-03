import SocialAuthButtons from "@/components/social-auth-buttons" // Renommé
import TebexStore from "@/components/tebex-store"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto py-6 px-4 border-b">
        <h1 className="text-4xl font-bold text-center">Bienvenue sur notre serveur FiveM</h1>
      </header>
      <main className="container mx-auto py-8 px-4 grid gap-12 lg:grid-cols-2">
        <section className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Connectez-vous à votre compte</h2>
          <SocialAuthButtons /> {/* Utilisé le nouveau composant */}
        </section>
        <section>
          <TebexStore />
        </section>
      </main>
      <footer className="container mx-auto py-6 px-4 border-t text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Votre serveur FiveM. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
