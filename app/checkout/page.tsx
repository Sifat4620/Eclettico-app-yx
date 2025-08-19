import { CheckoutForm } from "@/components/checkout/checkout-form"
import { Header } from "@/components/header"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CheckoutForm />
      </main>
    </div>
  )
}
