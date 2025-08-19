import { UserDashboard } from "@/components/auth/user-dashboard"
import { Header } from "@/components/header"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <UserDashboard />
      </main>
    </div>
  )
}
