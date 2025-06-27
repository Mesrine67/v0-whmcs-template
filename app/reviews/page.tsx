import type { Metadata } from "next"
import ReviewsWrapper from "./reviews-wrapper.client"

export const metadata: Metadata = {
  title: "Avis clients - HebergTonServ",
  description: "Consultez les avis de nos clients et partagez votre expérience avec HebergTonServ.",
}

export default function ReviewsPage() {
  return <ReviewsWrapper />
}
