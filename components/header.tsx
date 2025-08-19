"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { Search, User, Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-slide-down">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center animate-pulse-subtle">
              <span className="text-primary-foreground font-bold text-lg font-sans">E</span>
            </div>
            <span className="text-xl font-bold font-sans bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ECLETTICO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/shop"
              className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transform"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transform"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transform"
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium hover:text-primary transition-colors hover:scale-105 transform"
            >
              Admin
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 font-serif hover:ring-2 hover:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <CartDrawer />
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search products..." className="pl-10 font-serif" />
              </div>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/shop"
                  className="text-sm font-medium hover:text-primary transition-colors py-2 hover:bg-primary/5 rounded px-2"
                >
                  Shop
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium hover:text-primary transition-colors py-2 hover:bg-primary/5 rounded px-2"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium hover:text-primary transition-colors py-2 hover:bg-primary/5 rounded px-2"
                >
                  Contact
                </Link>
                <Link
                  href="/login"
                  className="text-sm font-medium hover:text-primary transition-colors py-2 hover:bg-primary/5 rounded px-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors py-2 hover:bg-primary/5 rounded px-2"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin"
                  className="text-sm font-medium hover:text-primary transition-colors py-2 hover:bg-primary/5 rounded px-2"
                >
                  Admin
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
