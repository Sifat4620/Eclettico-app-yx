"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted animate-fade-in">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-right">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold font-sans leading-tight animate-slide-up">
                Premium Tech
                <span className="text-primary block animate-bounce-in">Gadgets & More</span>
              </h1>
              <p
                className="text-lg text-muted-foreground font-serif max-w-md animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                Discover cutting-edge portable technology, smart accessories, and innovative gadgets that enhance your
                digital lifestyle.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="btn-enhanced group font-serif hover:scale-105 transition-all duration-300">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="btn-enhanced group font-serif bg-transparent hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              {[
                { number: "10K+", label: "Happy Customers" },
                { number: "500+", label: "Products" },
                { number: "4.9★", label: "Rating" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`animate-stagger-${index + 1} hover:scale-110 transition-transform duration-300 cursor-pointer`}
                >
                  <div className="text-2xl font-bold font-sans text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-serif">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-left">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 hover:scale-105 transition-transform duration-500">
              <img
                src="/placeholder.svg?height=500&width=500"
                alt="Premium tech gadgets collection"
                className="w-full h-full object-cover rounded-xl hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full floating-element animate-glow"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-full floating-element animate-pulse"></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-secondary/10 rounded-full floating-element"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
