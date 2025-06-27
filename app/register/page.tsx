// app/register/page.tsx (server component)
import RegisterWrapper from "./register-wrapper.client"

export const metadata = {
  title: "Inscription – HebergTonServ",
  description: "Créez votre compte HebergTonServ en quelques secondes.",
}

export default function Page() {
  return <RegisterWrapper />
}
