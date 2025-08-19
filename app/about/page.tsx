import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Users, Award } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About ECLETTICO
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're passionate about bringing you the latest in premium tech gadgets and smart accessories. Our curated
            collection represents the perfect blend of innovation, quality, and style.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="animate-slide-right">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              At ECLETTICO, we believe technology should enhance your life, not complicate it. That's why we carefully
              select each product in our collection, ensuring it meets our high standards for quality, innovation, and
              user experience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From wireless audio solutions to smart home devices, every item we offer is chosen with the modern
              consumer in mind. We're not just selling products – we're curating a lifestyle of seamless technology
              integration.
            </p>
          </div>
          <div className="animate-slide-left">
            <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="ECLETTICO workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16 animate-slide-up">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Innovation",
                description: "We stay ahead of tech trends to bring you cutting-edge products",
              },
              {
                icon: Shield,
                title: "Quality",
                description: "Every product is tested and verified to meet our premium standards",
              },
              {
                icon: Users,
                title: "Customer First",
                description: "Your satisfaction and experience are our top priorities",
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We strive for excellence in everything we do, from products to service",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16 animate-slide-up">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "Founder & CEO", image: "professional woman tech leader" },
              { name: "Marcus Rodriguez", role: "Head of Product", image: "professional man product manager" },
              { name: "Emily Johnson", role: "Customer Experience", image: "professional woman customer service" },
            ].map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="aspect-square relative overflow-hidden rounded-full mx-auto mb-4 w-32 h-32">
                    <Image
                      src={`/placeholder.svg?height=200&width=200&query=${member.image}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="secondary">{member.role}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-muted rounded-lg p-8 animate-slide-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "200+", label: "Premium Products" },
              { number: "99.5%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
