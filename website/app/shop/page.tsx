"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Star, ArrowRight } from "lucide-react"
import { useCart } from "@/components/cart-provider"

const retailProducts = [
  {
    id: "RET-01",
    name: "Hampton House Blend",
    roast: "Medium",
    price: 21.50,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "RET-02",
    name: "Ethiopia Yirgacheffe",
    roast: "Light",
    price: 24.50,
    image: "https://img1.wsimg.com/isteam/ip/0815fdc9-aafc-4fe1-99f8-dedc9ba0e23b/1d77007d-8922-4127-bfdd-b6b332328c88.jpg"
  },
  {
    id: "RET-03",
    name: "Sumatra Dark",
    roast: "Dark",
    price: 21.50,
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "RET-04",
    name: "Decaf Mexico",
    roast: "Medium",
    price: 23.00,
    image: "https://img1.wsimg.com/isteam/ip/0815fdc9-aafc-4fe1-99f8-dedc9ba0e23b/mexico_coffee.png"
  }
]

export default function ShopPage() {
  const { addItem } = useCart()

  const handleAddToCart = (product: typeof retailProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: "12oz" // Retail standard
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      
      {/* Header */}
      <section className="bg-white border-b border-coffee-light/20 py-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold text-coffee-dark mb-4">Shop Sweet Beans</h1>
          <p className="text-xl text-coffee-medium max-w-2xl mx-auto">
            Bring the cafe experience home. Fresh roasted beans delivered to your door.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {retailProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-coffee-light/20 group hover:shadow-md transition-all">
                <div className="relative h-64 overflow-hidden bg-coffee-light/10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.roast === "Light" && (
                     <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full uppercase">
                       Light Roast
                     </div>
                  )}
                  {product.roast === "Medium" && (
                     <div className="absolute top-4 right-4 bg-coffee-light/30 text-coffee-dark text-xs font-bold px-2 py-1 rounded-full uppercase">
                       Medium Roast
                     </div>
                  )}
                   {product.roast === "Dark" && (
                     <div className="absolute top-4 right-4 bg-coffee-dark text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
                       Dark Roast
                     </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-coffee-dark mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-coffee-medium ml-1">(24)</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-coffee-dark">${product.price.toFixed(2)}</span>
                    <Button size="sm" className="gap-2" onClick={() => handleAddToCart(product)}>
                      <ShoppingBag className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale Cross-Sell */}
      <section className="py-16 bg-coffee-dark text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-3xl font-bold">Buying for your Business?</h2>
              <p className="text-white/80 text-lg">
                We offer wholesale pricing, equipment support, and training for cafes, restaurants, and offices. 
                Get fresh roasted coffee at bulk rates.
              </p>
            </div>
            <Button size="lg" variant="secondary" className="whitespace-nowrap" asChild>
              <Link href="/wholesale">
                Visit Wholesale Portal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
