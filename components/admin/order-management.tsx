"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Package, Truck, RefreshCw } from "lucide-react"

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    total: 299.99,
    status: "completed",
    date: "2024-01-15",
    items: 2,
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 149.99,
    status: "processing",
    date: "2024-01-15",
    items: 1,
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    trackingNumber: null,
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    total: 79.99,
    status: "shipped",
    date: "2024-01-14",
    items: 1,
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    trackingNumber: "TRK987654321",
  },
]

export function OrderManagement() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-sans">Orders</h1>
        <p className="text-muted-foreground font-serif">Manage customer orders and fulfillment</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-serif"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40 font-serif">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32 font-serif">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Order List</CardTitle>
          <CardDescription className="font-serif">{filteredOrders.length} orders found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-serif">Order ID</TableHead>
                <TableHead className="font-serif">Customer</TableHead>
                <TableHead className="font-serif">Date</TableHead>
                <TableHead className="font-serif">Items</TableHead>
                <TableHead className="font-serif">Total</TableHead>
                <TableHead className="font-serif">Status</TableHead>
                <TableHead className="font-serif">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium font-sans">{order.customer}</p>
                      <p className="text-sm text-muted-foreground font-serif">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-serif">{order.date}</TableCell>
                  <TableCell className="font-sans">{order.items}</TableCell>
                  <TableCell className="font-sans">${order.total}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="font-sans">Order Details - {order.id}</DialogTitle>
                            <DialogDescription className="font-serif">
                              Manage order status and fulfillment
                            </DialogDescription>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-semibold font-sans mb-2">Customer Information</h3>
                                  <p className="text-sm font-serif">{selectedOrder.customer}</p>
                                  <p className="text-sm text-muted-foreground font-serif">{selectedOrder.email}</p>
                                </div>
                                <div>
                                  <h3 className="font-semibold font-sans mb-2">Order Summary</h3>
                                  <p className="text-sm font-serif">Items: {selectedOrder.items}</p>
                                  <p className="text-sm font-serif">Total: ${selectedOrder.total}</p>
                                  <p className="text-sm font-serif">Date: {selectedOrder.date}</p>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-semibold font-sans mb-2">Shipping Address</h3>
                                <p className="text-sm font-serif">{selectedOrder.shippingAddress}</p>
                                {selectedOrder.trackingNumber && (
                                  <p className="text-sm font-serif mt-1">Tracking: {selectedOrder.trackingNumber}</p>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <Select
                                  value={selectedOrder.status}
                                  onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                                >
                                  <SelectTrigger className="w-40 font-serif">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button size="sm" className="font-serif">
                                  Update Status
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button variant="ghost" size="icon">
                        <Package className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Truck className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
