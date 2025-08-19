"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { productService, type ShopifyProduct } from "@/lib/shopify-services"
import { Heart, ShoppingCart, Star } from "lucide-react"

export function ProductGrid() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart, isLoading: cartLoading } = useCart()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const { products } = await productService.getProducts(12)
      setProducts(products)
    } catch (error) {
      console.error("Error loading products:", error)
      // Fallback to mock data if Shopify is not configured
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = async (product: ShopifyProduct) => {
    if (product.variants.length > 0) {
      await addToCart(product.variants[0].id, 1)
    }
  }

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-sans mb-4">Featured Products</h2>
            <p className="text-muted-foreground font-serif max-w-2xl mx-auto">Loading products...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="w-full h-64 bg-muted rounded-t-lg" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-8 bg-muted rounded w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl lg:text-4xl font-bold font-sans mb-4">Featured Products</h2>
          <p className="text-muted-foreground font-serif max-w-2xl mx-auto">
            {products.length > 0
              ? "Discover our handpicked selection of premium tech gadgets and smart accessories"
              : "Configure your Shopify integration to display products"}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 animate-bounce-in">
            <p className="text-muted-foreground font-serif mb-4">
              No products found. Please configure your Shopify integration.
            </p>
            <p className="text-sm text-muted-foreground font-serif">
              Check the SHOPIFY_INTEGRATION.md file for setup instructions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className={`product-card group hover-lift-strong transition-all duration-500 overflow-hidden animate-stagger-${Math.min(index + 1, 6)} hover:shadow-2xl`}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images[0]?.url || "/placeholder.svg?height=300&width=300"}
                      alt={product.images[0]?.altText || product.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="product-zoom-overlay"></div>
                    <Badge className="absolute top-3 left-3 animate-bounce-in">{product.productType}</Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-background/80 hover:bg-background hover:scale-110 transition-all duration-300"
                    >
                      <Heart className="h-4 w-4 hover:text-red-500 transition-colors" />
                    </Button>
                    {product.variants[0]?.compareAtPrice && (
                      <Badge variant="destructive" className="absolute bottom-3 right-3 animate-glow">
                        SALE
                      </Badge>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs text-muted-foreground font-serif uppercase tracking-wide">
                        {product.vendor}
                      </span>
                    </div>

                    <h3 className="font-semibold font-sans mb-2 group-hover:text-primary transition-colors duration-300">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">4.8</span>
                      </div>
                      <span className="text-sm text-muted-foreground">(124)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-sans group-hover:text-primary transition-colors">
                          ${Number.parseFloat(product.variants[0]?.price.amount || "0").toFixed(2)}
                        </span>
                        {product.variants[0]?.compareAtPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${Number.parseFloat(product.variants[0].compareAtPrice.amount).toFixed(2)}
                          </span>
                        )}
                      </div>

                      <Button
                        size="sm"
                        className="btn-enhanced group/btn hover:scale-105 transition-all duration-300"
                        onClick={() => handleAddToCart(product)}
                        disabled={cartLoading || !product.variants[0]?.availableForSale}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover/btn:scale-110" />
                        {cartLoading ? "Adding..." : "Add to Cart"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12 animate-slide-up">
          <Button
            variant="outline"
            size="lg"
            className="btn-enhanced font-serif bg-transparent hover:scale-105 transition-all duration-300"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
