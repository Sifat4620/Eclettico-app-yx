import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Store, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-sans">Settings</h1>
          <p className="text-muted-foreground font-serif">Manage your store configuration and preferences</p>
        </div>

        <div className="grid gap-6">
          {/* Store Information */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Store className="h-5 w-5" />
                <CardTitle className="font-sans">Store Information</CardTitle>
              </div>
              <CardDescription className="font-serif">Basic information about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-name" className="font-serif">
                    Store Name
                  </Label>
                  <Input id="store-name" defaultValue="ECLETTICO" className="font-serif" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-email" className="font-serif">
                    Contact Email
                  </Label>
                  <Input id="store-email" type="email" defaultValue="contact@eclettico.com" className="font-serif" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-description" className="font-serif">
                  Store Description
                </Label>
                <Textarea
                  id="store-description"
                  defaultValue="Premium tech gadgets and smart accessories for modern living"
                  className="font-serif"
                />
              </div>
              <Button className="font-serif">Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <CardTitle className="font-sans">Notifications</CardTitle>
              </div>
              <CardDescription className="font-serif">Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-serif">Order Notifications</Label>
                  <p className="text-sm text-muted-foreground font-serif">Get notified when new orders are placed</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-serif">Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground font-serif">Alert when products are running low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="font-serif">Customer Messages</Label>
                  <p className="text-sm text-muted-foreground font-serif">Notifications for customer inquiries</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <CardTitle className="font-sans">Security</CardTitle>
              </div>
              <CardDescription className="font-serif">Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="font-serif">
                  Current Password
                </Label>
                <Input id="current-password" type="password" className="font-serif" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="font-serif">
                    New Password
                  </Label>
                  <Input id="new-password" type="password" className="font-serif" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="font-serif">
                    Confirm Password
                  </Label>
                  <Input id="confirm-password" type="password" className="font-serif" />
                </div>
              </div>
              <Button className="font-serif">Update Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
