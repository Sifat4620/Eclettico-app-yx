import { RegisterForm } from "@/components/auth/register-form"
import { Header } from "@/components/header"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <RegisterForm />
      </main>
    </div>
  )
}
