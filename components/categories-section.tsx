"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Headphones, Watch, Home, Battery, Gamepad2 } from "lucide-react"

const categories = [
  {
    name: "Smartphones",
    icon: Smartphone,
    count: 45,
    color: "text-blue-500",
  },
  {
    name: "Audio",
    icon: Headphones,
    count: 32,
    color: "text-purple-500",
  },
  {
    name: "Wearables",
    icon: Watch,
    count: 28,
    color: "text-green-500",
  },
  {
    name: "Smart Home",
    icon: Home,
    count: 19,
    color: "text-orange-500",
  },
  {
    name: "Power & Charging",
    icon: Battery,
    count: 24,
    color: "text-yellow-500",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    count: 16,
    color: "text-red-500",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-muted/30 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl lg:text-4xl font-bold font-sans mb-4">Shop by Category</h2>
          <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
            Explore our diverse range of tech categories to find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card
                key={category.name}
                className={`group hover-lift-strong transition-all duration-500 cursor-pointer animate-stagger-${Math.min(index + 1, 6)} hover:shadow-xl`}
              >
                <CardContent className="p-6 text-center relative">
                  <div className="mb-4">
                    <Icon
                      className={`h-8 w-8 mx-auto ${category.color} group-hover:scale-125 transition-all duration-300 group-hover:animate-bounce`}
                    />
                  </div>
                  <h3 className="font-semibold font-sans mb-1 group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-serif group-hover:text-foreground transition-colors">
                    {category.count} products
                  </p>
                  <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
