import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Percent, Users, Eye } from "lucide-react"

const promotions = [
  {
    id: 1,
    name: "Summer Sale 2024",
    type: "Percentage",
    discount: "25%",
    code: "SUMMER25",
    status: "Active",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    uses: 156,
    limit: 1000,
  },
  {
    id: 2,
    name: "New Customer Welcome",
    type: "Fixed Amount",
    discount: "$10",
    code: "WELCOME10",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    uses: 89,
    limit: 500,
  },
  {
    id: 3,
    name: "Black Friday Mega Sale",
    type: "Percentage",
    discount: "50%",
    code: "BLACKFRIDAY50",
    status: "Scheduled",
    startDate: "2024-11-29",
    endDate: "2024-12-02",
    uses: 0,
    limit: 2000,
  },
]

export default function PromotionsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-sans">Promotions</h1>
            <p className="text-muted-foreground font-serif">Manage discounts, coupons, and promotional campaigns</p>
          </div>
          <Button className="font-serif">
            <Plus className="mr-2 h-4 w-4" />
            Create Promotion
          </Button>
        </div>

        <div className="grid gap-6">
          {promotions.map((promotion) => (
            <Card key={promotion.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-sans">{promotion.name}</CardTitle>
                    <CardDescription className="font-serif">Code: {promotion.code}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      promotion.status === "Active"
                        ? "default"
                        : promotion.status === "Scheduled"
                          ? "secondary"
                          : "outline"
                    }
                    className="font-serif"
                  >
                    {promotion.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="flex items-center space-x-2">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium font-sans">{promotion.discount}</p>
                      <p className="text-xs text-muted-foreground font-serif">{promotion.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium font-sans">{promotion.startDate}</p>
                      <p className="text-xs text-muted-foreground font-serif">Start Date</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium font-sans">{promotion.endDate}</p>
                      <p className="text-xs text-muted-foreground font-serif">End Date</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium font-sans">
                        {promotion.uses}/{promotion.limit}
                      </p>
                      <p className="text-xs text-muted-foreground font-serif">Uses</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="font-serif bg-transparent">
                    <Eye className="mr-2 h-3 w-3" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="font-serif bg-transparent">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
