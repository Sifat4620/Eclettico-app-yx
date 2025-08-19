import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Calendar, Eye, Edit } from "lucide-react"

const pages = [
  {
    id: 1,
    title: "About Us",
    slug: "/about",
    status: "Published",
    lastModified: "2024-03-15",
    author: "Admin",
  },
  {
    id: 2,
    title: "Contact",
    slug: "/contact",
    status: "Published",
    lastModified: "2024-03-10",
    author: "Admin",
  },
  {
    id: 3,
    title: "Privacy Policy",
    slug: "/privacy",
    status: "Draft",
    lastModified: "2024-03-20",
    author: "Admin",
  },
  {
    id: 4,
    title: "Terms of Service",
    slug: "/terms",
    status: "Draft",
    lastModified: "2024-03-18",
    author: "Admin",
  },
  {
    id: 5,
    title: "FAQ",
    slug: "/faq",
    status: "Published",
    lastModified: "2024-03-12",
    author: "Admin",
  },
]

export default function PagesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-sans">Pages</h1>
            <p className="text-muted-foreground font-serif">Manage your website content and static pages</p>
          </div>
          <Button className="font-serif">
            <Plus className="mr-2 h-4 w-4" />
            Create Page
          </Button>
        </div>

        <div className="grid gap-4">
          {pages.map((page) => (
            <Card key={page.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-sans">{page.title}</h3>
                      <p className="text-sm text-muted-foreground font-serif">{page.slug}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span className="font-serif">Modified {page.lastModified}</span>
                        </div>
                        <span className="font-serif">by {page.author}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={page.status === "Published" ? "default" : "secondary"} className="font-serif">
                      {page.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="font-serif">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="font-serif">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
