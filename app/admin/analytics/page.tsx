import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

const metrics = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+15.3%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Products Sold",
    value: "5,678",
    change: "-2.4%",
    trend: "down",
    icon: Package,
  },
]

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-sans">Analytics</h1>
          <p className="text-muted-foreground font-serif">Track your store performance and insights</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium font-serif">{metric.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-sans">{metric.value}</div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`font-serif ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {metric.change}
                    </span>
                    <span className="font-serif">from last month</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="font-sans">Sales Overview</CardTitle>
              <CardDescription className="font-serif">Monthly sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground font-serif">
                Sales chart will be displayed here
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="font-sans">Top Products</CardTitle>
              <CardDescription className="font-serif">Best performing products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Wireless Earbuds Pro", sales: 234, revenue: "$11,700" },
                  { name: "Smart Watch Series X", sales: 189, revenue: "$37,800" },
                  { name: "Portable Charger 20K", sales: 156, revenue: "$4,680" },
                ].map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium font-sans">{product.name}</p>
                      <p className="text-sm text-muted-foreground font-serif">{product.sales} units sold</p>
                    </div>
                    <Badge variant="outline" className="font-serif">
                      {product.revenue}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
