// app/login/page.tsx (server component)
import LoginWrapper from "./login-wrapper.client"

export const metadata = {
  title: "Connexion – HebergTonServ",
  description: "Connectez-vous à votre compte HebergTonServ.",
}

export default function Page() {
  return <LoginWrapper />
}
