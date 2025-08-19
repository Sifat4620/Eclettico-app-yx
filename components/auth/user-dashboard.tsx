"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Package, Heart, Settings, MapPin, CreditCard, Bell, Edit, Truck } from "lucide-react"

// Mock data - will be replaced with real data from Shopify
const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "March 2024",
  totalOrders: 12,
  totalSpent: 2847,
}

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 299.99,
    items: 2,
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 149.99,
    items: 1,
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "processing",
    total: 79.99,
    items: 1,
    trackingNumber: null,
  },
]

const mockWishlist = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    image: "/placeholder.svg?height=100&width=100",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Fitness Tracker",
    price: 199,
    image: "/placeholder.svg?height=100&width=100",
    inStock: false,
  },
]

export function UserDashboard() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState(mockUser)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage
                    src={userInfo.avatar || "/placeholder.svg"}
                    alt={`${userInfo.firstName} ${userInfo.lastName}`}
                  />
                  <AvatarFallback className="text-lg font-sans">
                    {userInfo.firstName[0]}
                    {userInfo.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold font-sans">
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                <p className="text-muted-foreground font-serif">{userInfo.email}</p>
                <p className="text-sm text-muted-foreground font-serif mt-1">Member since {userInfo.joinDate}</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-serif">Total Orders</span>
                  <span className="font-semibold font-sans">{userInfo.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-serif">Total Spent</span>
                  <span className="font-semibold font-sans">${userInfo.totalSpent}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Order History</CardTitle>
                  <CardDescription className="font-serif">Track and manage your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold font-sans">Order {order.id}</h3>
                            <p className="text-sm text-muted-foreground font-serif">{order.date}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-serif">{order.items} items</span>
                            <span className="font-semibold font-sans">${order.total}</span>
                            {order.trackingNumber && (
                              <span className="text-muted-foreground font-serif">Tracking: {order.trackingNumber}</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Truck className="h-4 w-4 mr-2" />
                              Track
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">My Wishlist</CardTitle>
                  <CardDescription className="font-serif">Items you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mockWishlist.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold font-sans mb-1">{item.name}</h3>
                            <p className="text-lg font-bold font-sans text-primary">${item.price}</p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" disabled={!item.inStock}>
                                Add to Cart
                              </Button>
                              <Button variant="outline" size="sm">
                                Remove
                              </Button>
                            </div>
                            {!item.inStock && (
                              <p className="text-sm text-muted-foreground mt-1 font-serif">Out of stock</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-sans">Profile Information</CardTitle>
                    <CardDescription className="font-serif">Manage your personal information</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-serif">
                        First Name
                      </Label>
                      <Input id="firstName" value={userInfo.firstName} disabled={!isEditing} className="font-serif" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-serif">
                        Last Name
                      </Label>
                      <Input id="lastName" value={userInfo.lastName} disabled={!isEditing} className="font-serif" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-serif">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      disabled={!isEditing}
                      className="font-serif"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-serif">
                      Phone
                    </Label>
                    <Input id="phone" value={userInfo.phone} disabled={!isEditing} className="font-serif" />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Account Settings</CardTitle>
                  <CardDescription className="font-serif">Manage your account preferences and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold font-sans">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground font-serif">
                          Receive updates about your orders and promotions
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold font-sans">Shipping Addresses</h3>
                        <p className="text-sm text-muted-foreground font-serif">Manage your delivery addresses</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold font-sans">Payment Methods</h3>
                        <p className="text-sm text-muted-foreground font-serif">Manage your saved payment methods</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold font-sans">Change Password</h3>
                        <p className="text-sm text-muted-foreground font-serif">Update your account password</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
