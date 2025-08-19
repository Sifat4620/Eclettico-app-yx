import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import Image from "next/image"

export default function ProductDetailPage({ params }: { params: { handle: string } }) {
  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="animate-slide-right">
            <div className="aspect-square mb-4 relative overflow-hidden rounded-lg bg-muted">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Product Image"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square relative overflow-hidden rounded-md bg-muted cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                >
                  <Image
                    src={`/placeholder.svg?height=150&width=150&query=product thumbnail ${i}`}
                    alt={`Product thumbnail ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-slide-left">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">
                New Arrival
              </Badge>
              <h1 className="text-4xl font-bold mb-2">Wireless Earbuds Pro</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(128 reviews)</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">$199.99</span>
                <span className="text-xl text-muted-foreground line-through">$249.99</span>
                <Badge variant="destructive">20% OFF</Badge>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Experience premium audio quality with our latest Wireless Earbuds Pro. Featuring advanced noise
              cancellation, 24-hour battery life, and crystal-clear call quality. Perfect for music lovers and
              professionals alike.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <span>2-year warranty included</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>30-day return policy</span>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <Button size="lg" className="flex-1 animate-pulse-subtle">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="animate-slide-up">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <div className="prose max-w-none">
                    <p>
                      The Wireless Earbuds Pro represent the pinnacle of audio technology, combining superior sound
                      quality with cutting-edge features.
                    </p>
                    <h4>Key Features:</h4>
                    <ul>
                      <li>Advanced Active Noise Cancellation</li>
                      <li>24-hour total battery life with charging case</li>
                      <li>IPX7 water resistance rating</li>
                      <li>Touch controls for music and calls</li>
                      <li>Quick charge: 15 minutes for 3 hours playback</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Audio</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>Driver: 11mm dynamic drivers</li>
                        <li>Frequency Response: 20Hz - 20kHz</li>
                        <li>Impedance: 32Ω</li>
                        <li>Sensitivity: 98dB</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Battery & Connectivity</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>Bluetooth: 5.3</li>
                        <li>Range: Up to 10m</li>
                        <li>Earbud Battery: 6 hours</li>
                        <li>Case Battery: 18 hours</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-medium">John D.</span>
                          <span className="text-sm text-muted-foreground">Verified Purchase</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Amazing sound quality and the noise cancellation works perfectly. Battery life is exactly as
                          advertised. Highly recommended!
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
