import { shopifyStorefrontFetch, shopifyAdminFetch, STOREFRONT_QUERIES } from "./shopify"

// Types for Shopify data
export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  images: Array<{
    id: string
    url: string
    altText: string
    width: number
    height: number
  }>
  variants: Array<{
    id: string
    title: string
    price: {
      amount: string
      currencyCode: string
    }
    compareAtPrice?: {
      amount: string
      currencyCode: string
    }
    availableForSale: boolean
    quantityAvailable: number
    selectedOptions: Array<{
      name: string
      value: string
    }>
  }>
  productType: string
  vendor: string
  tags: string[]
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
    subtotalAmount: {
      amount: string
      currencyCode: string
    }
    totalTaxAmount?: {
      amount: string
      currencyCode: string
    }
  }
  lines: Array<{
    id: string
    quantity: number
    cost: {
      totalAmount: {
        amount: string
        currencyCode: string
      }
    }
    merchandise: {
      id: string
      title: string
      price: {
        amount: string
        currencyCode: string
      }
      product: {
        id: string
        title: string
        handle: string
        images: Array<{
          url: string
          altText: string
        }>
      }
    }
  }>
}

// Fallback data for when Shopify isn't configured
const FALLBACK_PRODUCTS = [
  {
    id: "1",
    title: "Wireless Earbuds Pro",
    handle: "wireless-earbuds-pro",
    description: "Premium wireless earbuds with active noise cancellation and 24-hour battery life.",
    images: [
      {
        id: "img1",
        url: "/placeholder.svg?height=400&width=400",
        altText: "Wireless Earbuds Pro",
        width: 400,
        height: 400,
      },
    ],
    variants: [
      {
        id: "var1",
        title: "Default Title",
        price: { amount: "199.99", currencyCode: "USD" },
        compareAtPrice: { amount: "249.99", currencyCode: "USD" },
        availableForSale: true,
        quantityAvailable: 50,
        selectedOptions: [],
      },
    ],
    productType: "Audio",
    vendor: "ECLETTICO",
    tags: ["wireless", "audio", "premium"],
  },
  {
    id: "2",
    title: "Smart Watch Ultra",
    handle: "smart-watch-ultra",
    description: "Advanced smartwatch with health monitoring, GPS, and 7-day battery life.",
    images: [
      {
        id: "img2",
        url: "/placeholder.svg?height=400&width=400",
        altText: "Smart Watch Ultra",
        width: 400,
        height: 400,
      },
    ],
    variants: [
      {
        id: "var2",
        title: "Default Title",
        price: { amount: "299.99", currencyCode: "USD" },
        availableForSale: true,
        quantityAvailable: 30,
        selectedOptions: [],
      },
    ],
    productType: "Wearables",
    vendor: "ECLETTICO",
    tags: ["smartwatch", "fitness", "health"],
  },
  {
    id: "3",
    title: "Portable Charger 20K",
    handle: "portable-charger-20k",
    description: "High-capacity portable charger with fast charging and wireless charging pad.",
    images: [
      {
        id: "img3",
        url: "/placeholder.svg?height=400&width=400",
        altText: "Portable Charger 20K",
        width: 400,
        height: 400,
      },
    ],
    variants: [
      {
        id: "var3",
        title: "Default Title",
        price: { amount: "79.99", currencyCode: "USD" },
        availableForSale: true,
        quantityAvailable: 100,
        selectedOptions: [],
      },
    ],
    productType: "Charging",
    vendor: "ECLETTICO",
    tags: ["charging", "portable", "wireless"],
  },
  {
    id: "4",
    title: "Smart Home Hub",
    handle: "smart-home-hub",
    description: "Central control hub for all your smart home devices with voice control.",
    images: [
      {
        id: "img4",
        url: "/placeholder.svg?height=400&width=400",
        altText: "Smart Home Hub",
        width: 400,
        height: 400,
      },
    ],
    variants: [
      {
        id: "var4",
        title: "Default Title",
        price: { amount: "149.99", currencyCode: "USD" },
        availableForSale: true,
        quantityAvailable: 25,
        selectedOptions: [],
      },
    ],
    productType: "Smart Home",
    vendor: "ECLETTICO",
    tags: ["smart-home", "hub", "voice-control"],
  },
]

function isShopifyConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN)
}

// Product Services
export const productService = {
  // Get all products with pagination
  async getProducts(
    first = 20,
    after?: string,
  ): Promise<{
    products: ShopifyProduct[]
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string
      endCursor: string
    }
  }> {
    if (!isShopifyConfigured()) {
      console.log("[v0] Using fallback product data - Shopify not configured")
      return {
        products: FALLBACK_PRODUCTS,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: "1",
          endCursor: "4",
        },
      }
    }

    try {
      const data = await shopifyStorefrontFetch<{
        products: {
          edges: Array<{ node: any }>
          pageInfo: any
        }
      }>({
        query: STOREFRONT_QUERIES.GET_PRODUCTS,
        variables: { first, after },
      })

      return {
        products: data.products.edges.map((edge) => ({
          ...edge.node,
          images: edge.node.images.edges.map((img: any) => img.node),
          variants: edge.node.variants.edges.map((variant: any) => variant.node),
        })),
        pageInfo: data.products.pageInfo,
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      console.log("[v0] Falling back to demo products due to API error")
      return {
        products: FALLBACK_PRODUCTS,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: "1",
          endCursor: "4",
        },
      }
    }
  },

  // Get single product by handle
  async getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
    if (!isShopifyConfigured()) {
      console.log("[v0] Using fallback product data - Shopify not configured")
      return FALLBACK_PRODUCTS.find((p) => p.handle === handle) || FALLBACK_PRODUCTS[0]
    }

    try {
      const data = await shopifyStorefrontFetch<{
        productByHandle: any
      }>({
        query: STOREFRONT_QUERIES.GET_PRODUCT_BY_HANDLE,
        variables: { handle },
      })

      if (!data.productByHandle) return null

      return {
        ...data.productByHandle,
        images: data.productByHandle.images.edges.map((img: any) => img.node),
        variants: data.productByHandle.variants.edges.map((variant: any) => variant.node),
      }
    } catch (error) {
      console.error("Error fetching product:", error)
      console.log("[v0] Falling back to demo product due to API error")
      return FALLBACK_PRODUCTS.find((p) => p.handle === handle) || FALLBACK_PRODUCTS[0]
    }
  },
}

// Cart Services
export const cartService = {
  // Create new cart
  async createCart(): Promise<ShopifyCart> {
    if (!isShopifyConfigured()) {
      console.log("[v0] Using fallback cart data - Shopify not configured")
      return {
        id: "demo-cart-1",
        checkoutUrl: "#",
        totalQuantity: 0,
        cost: {
          totalAmount: { amount: "0.00", currencyCode: "USD" },
          subtotalAmount: { amount: "0.00", currencyCode: "USD" },
        },
        lines: [],
      }
    }

    try {
      const data = await shopifyStorefrontFetch<{
        cartCreate: {
          cart: any
          userErrors: Array<{ field: string; message: string }>
        }
      }>({
        query: STOREFRONT_QUERIES.CREATE_CART,
        variables: {
          input: {},
        },
      })

      if (data.cartCreate.userErrors.length > 0) {
        throw new Error(data.cartCreate.userErrors[0].message)
      }

      return {
        ...data.cartCreate.cart,
        lines: data.cartCreate.cart.lines.edges.map((edge: any) => edge.node),
      }
    } catch (error) {
      console.error("Error creating cart:", error)
      console.log("[v0] Falling back to demo cart due to API error")
      return {
        id: "demo-cart-1",
        checkoutUrl: "#",
        totalQuantity: 0,
        cost: {
          totalAmount: { amount: "0.00", currencyCode: "USD" },
          subtotalAmount: { amount: "0.00", currencyCode: "USD" },
        },
        lines: [],
      }
    }
  },

  // Add items to cart
  async addToCart(cartId: string, variantId: string, quantity: number): Promise<ShopifyCart> {
    try {
      const data = await shopifyStorefrontFetch<{
        cartLinesAdd: {
          cart: any
          userErrors: Array<{ field: string; message: string }>
        }
      }>({
        query: STOREFRONT_QUERIES.ADD_TO_CART,
        variables: {
          cartId,
          lines: [
            {
              merchandiseId: variantId,
              quantity,
            },
          ],
        },
      })

      if (data.cartLinesAdd.userErrors.length > 0) {
        throw new Error(data.cartLinesAdd.userErrors[0].message)
      }

      return {
        ...data.cartLinesAdd.cart,
        lines: data.cartLinesAdd.cart.lines.edges.map((edge: any) => edge.node),
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      throw error
    }
  },

  // Update cart line quantity
  async updateCartLine(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
    try {
      const data = await shopifyStorefrontFetch<{
        cartLinesUpdate: {
          cart: any
          userErrors: Array<{ field: string; message: string }>
        }
      }>({
        query: STOREFRONT_QUERIES.UPDATE_CART,
        variables: {
          cartId,
          lines: [
            {
              id: lineId,
              quantity,
            },
          ],
        },
      })

      if (data.cartLinesUpdate.userErrors.length > 0) {
        throw new Error(data.cartLinesUpdate.userErrors[0].message)
      }

      return {
        ...data.cartLinesUpdate.cart,
        lines: data.cartLinesUpdate.cart.lines.edges.map((edge: any) => edge.node),
      }
    } catch (error) {
      console.error("Error updating cart:", error)
      throw error
    }
  },

  // Remove item from cart
  async removeFromCart(cartId: string, lineId: string): Promise<ShopifyCart> {
    try {
      const data = await shopifyStorefrontFetch<{
        cartLinesRemove: {
          cart: any
          userErrors: Array<{ field: string; message: string }>
        }
      }>({
        query: STOREFRONT_QUERIES.REMOVE_FROM_CART,
        variables: {
          cartId,
          lineIds: [lineId],
        },
      })

      if (data.cartLinesRemove.userErrors.length > 0) {
        throw new Error(data.cartLinesRemove.userErrors[0].message)
      }

      return {
        ...data.cartLinesRemove.cart,
        lines: data.cartLinesRemove.cart.lines.edges.map((edge: any) => edge.node),
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
      throw error
    }
  },
}

// Admin Services for backend operations
export const adminService = {
  // Get all orders
  async getOrders(limit = 50, status?: string) {
    try {
      let endpoint = `/orders.json?limit=${limit}&status=any`
      if (status && status !== "all") {
        endpoint = `/orders.json?limit=${limit}&status=${status}`
      }

      const data = await shopifyAdminFetch<{ orders: any[] }>({
        endpoint,
      })

      return data.orders
    } catch (error) {
      console.error("Error fetching orders:", error)
      throw error
    }
  },

  // Update order status
  async updateOrder(orderId: string, updates: any) {
    try {
      const data = await shopifyAdminFetch<{ order: any }>({
        endpoint: `/orders/${orderId}.json`,
        method: "PUT",
        body: { order: updates },
      })

      return data.order
    } catch (error) {
      console.error("Error updating order:", error)
      throw error
    }
  },

  // Get all products (admin)
  async getAdminProducts(limit = 50) {
    try {
      const data = await shopifyAdminFetch<{ products: any[] }>({
        endpoint: `/products.json?limit=${limit}`,
      })

      return data.products
    } catch (error) {
      console.error("Error fetching admin products:", error)
      throw error
    }
  },

  // Create product
  async createProduct(productData: any) {
    try {
      const data = await shopifyAdminFetch<{ product: any }>({
        endpoint: "/products.json",
        method: "POST",
        body: { product: productData },
      })

      return data.product
    } catch (error) {
      console.error("Error creating product:", error)
      throw error
    }
  },

  // Update product
  async updateProduct(productId: string, updates: any) {
    try {
      const data = await shopifyAdminFetch<{ product: any }>({
        endpoint: `/products/${productId}.json`,
        method: "PUT",
        body: { product: updates },
      })

      return data.product
    } catch (error) {
      console.error("Error updating product:", error)
      throw error
    }
  },

  // Delete product
  async deleteProduct(productId: string) {
    try {
      await shopifyAdminFetch({
        endpoint: `/products/${productId}.json`,
        method: "DELETE",
      })

      return true
    } catch (error) {
      console.error("Error deleting product:", error)
      throw error
    }
  },

  // Get customers
  async getCustomers(limit = 50) {
    try {
      const data = await shopifyAdminFetch<{ customers: any[] }>({
        endpoint: `/customers.json?limit=${limit}`,
      })

      return data.customers
    } catch (error) {
      console.error("Error fetching customers:", error)
      throw error
    }
  },
}
