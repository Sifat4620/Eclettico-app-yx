"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Users, Eye } from "lucide-react"

// Mock data - will be replaced with real data from Shopify
const stats = [
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
    change: "+180.1%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "1,234",
    change: "+19%",
    trend: "up",
    icon: Package,
  },
  {
    title: "Customers",
    value: "573",
    change: "+201",
    trend: "up",
    icon: Users,
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    total: 299.99,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 149.99,
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    total: 79.99,
    status: "shipped",
    date: "2024-01-14",
  },
]

const topProducts = [
  {
    name: "Wireless Earbuds Pro",
    sales: 234,
    revenue: 46680,
    trend: 12,
  },
  {
    name: "Smart Fitness Watch",
    sales: 189,
    revenue: 56511,
    trend: 8,
  },
  {
    name: "Portable Power Bank",
    sales: 156,
    revenue: 12324,
    trend: -3,
  },
]

export function DashboardOverview() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-sans">Dashboard</h1>
        <p className="text-muted-foreground font-serif">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-serif">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-sans">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className="font-serif">{stat.change} from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">Recent Orders</CardTitle>
            <CardDescription className="font-serif">Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium font-sans">{order.customer}</p>
                    <p className="text-xs text-muted-foreground font-serif">{order.email}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium font-sans">${order.total}</p>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 font-serif bg-transparent">
              <Eye className="mr-2 h-4 w-4" />
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">Top Products</CardTitle>
            <CardDescription className="font-serif">Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium font-sans">{product.name}</p>
                      <p className="text-xs text-muted-foreground font-serif">
                        {product.sales} sales • ${product.revenue.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center text-xs">
                      {product.trend > 0 ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className="font-serif">{Math.abs(product.trend)}%</span>
                    </div>
                  </div>
                  <Progress value={((index + 1) / topProducts.length) * 100} className="h-2" />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 font-serif bg-transparent">
              <Package className="mr-2 h-4 w-4" />
              View All Products
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
