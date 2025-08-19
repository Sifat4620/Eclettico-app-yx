import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, Mail, Phone, MapPin, Calendar } from "lucide-react"

const customers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    orders: 12,
    totalSpent: "$2,450.00",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 987-6543",
    location: "Los Angeles, CA",
    orders: 8,
    totalSpent: "$1,890.00",
    status: "Active",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+1 (555) 456-7890",
    location: "San Francisco, CA",
    orders: 15,
    totalSpent: "$3,200.00",
    status: "VIP",
    joinDate: "2023-11-10",
  },
]

export default function CustomersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-sans">Customers</h1>
            <p className="text-muted-foreground font-serif">Manage your customer base and relationships</p>
          </div>
          <Button className="font-serif">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-8 font-serif" />
          </div>
        </div>

        <div className="grid gap-6">
          {customers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48&query=${customer.name}`} />
                      <AvatarFallback className="font-sans">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold font-sans">{customer.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            <span className="font-serif">{customer.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            <span className="font-serif">{customer.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span className="font-serif">{customer.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-serif">
                          <strong>{customer.orders}</strong> orders
                        </span>
                        <span className="font-serif">
                          <strong>{customer.totalSpent}</strong> total spent
                        </span>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span className="font-serif">Joined {customer.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant={customer.status === "VIP" ? "default" : "secondary"} className="font-serif">
                    {customer.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
