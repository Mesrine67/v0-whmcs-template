// app/client-area/page.tsx (server component)
import ClientAreaWrapper from "./client-wrapper.client"

export const metadata = {
  title: "Espace client – HebergTonServ",
  description: "Gérez vos services et vos factures depuis votre espace client.",
}

export default function Page() {
  return <ClientAreaWrapper />
}
