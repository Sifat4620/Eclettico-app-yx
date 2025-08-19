"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { cartService, type ShopifyCart } from "@/lib/shopify-services"

interface CartContextType {
  cart: ShopifyCart | null
  isLoading: boolean
  addToCart: (variantId: string, quantity: number) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
  removeFromCart: (lineId: string) => Promise<void>
  clearCart: () => void
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize cart on mount
  useEffect(() => {
    initializeCart()
  }, [])

  const initializeCart = async () => {
    try {
      // Check if cart ID exists in localStorage
      const savedCartId = localStorage.getItem("shopify-cart-id")

      if (!savedCartId) {
        // Create new cart
        const newCart = await cartService.createCart()
        setCart(newCart)
        localStorage.setItem("shopify-cart-id", newCart.id)
      } else {
        // TODO: Fetch existing cart by ID
        // For now, create a new cart if no saved cart
        const newCart = await cartService.createCart()
        setCart(newCart)
        localStorage.setItem("shopify-cart-id", newCart.id)
      }
    } catch (error) {
      console.error("Error initializing cart:", error)
    }
  }

  const addToCart = async (variantId: string, quantity: number) => {
    if (!cart) return

    setIsLoading(true)
    try {
      const updatedCart = await cartService.addToCart(cart.id, variantId, quantity)
      setCart(updatedCart)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return

    setIsLoading(true)
    try {
      const updatedCart = await cartService.updateCartLine(cart.id, lineId, quantity)
      setCart(updatedCart)
    } catch (error) {
      console.error("Error updating cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromCart = async (lineId: string) => {
    if (!cart) return

    setIsLoading(true)
    try {
      const updatedCart = await cartService.removeFromCart(cart.id, lineId)
      setCart(updatedCart)
    } catch (error) {
      console.error("Error removing from cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = () => {
    setCart(null)
    localStorage.removeItem("shopify-cart-id")
    initializeCart()
  }

  const totalItems = cart?.totalQuantity || 0

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
