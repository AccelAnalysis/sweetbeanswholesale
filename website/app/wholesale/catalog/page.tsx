"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Download, Filter, Package, ShoppingCart } from "lucide-react"

// Product Data
const products = [
  {
    id: "BRZ-01",
    name: "Brazil Santos",
    origin: "Brazil",
    roast: "Medium",
    notes: "Caramel, toffee, mellow balance",
    acidity: "Low",
    use: "Espresso base, blends",
    sizes: "12oz, 2lb, 5lb",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1611854779393-1b2ae9bc4048?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "COL-01",
    name: "Colombia Supremo",
    origin: "Colombia",
    roast: "Medium",
    notes: "Chocolate, fruity, nutty",
    acidity: "Mellow",
    use: "Drip, medium roasts",
    sizes: "12oz, 2lb, 5lb",
    price: 48.00,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "ETH-01",
    name: "Ethiopia Yirgacheffe",
    origin: "Ethiopia",
    roast: "Light",
    notes: "Citrus, floral, tropical fruits, jasmine",
    acidity: "Bright",
    use: "Pour-over, specialty",
    sizes: "12oz, 2lb, 5lb",
    price: 52.00,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2080&auto=format&fit=crop"
  },
  {
    id: "GUA-01",
    name: "Guatemala Antigua",
    origin: "Guatemala",
    roast: "Medium",
    notes: "Chocolate, caramel, fruit hints",
    acidity: "Vibrant",
    use: "Bold drinks",
    sizes: "12oz, 2lb, 5lb",
    price: 49.00,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "SUM-01",
    name: "Sumatra Mandheling",
    origin: "Sumatra",
    roast: "Dark",
    notes: "Cedar, dark chocolate, cherries",
    acidity: "Low",
    use: "Dark roasts",
    sizes: "12oz, 2lb, 5lb",
    price: 47.00,
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "DEC-01",
    name: "Decaf Mexico",
    origin: "Mexico",
    roast: "Medium",
    notes: "Nutmeg, molasses, chocolate",
    acidity: "Tangy",
    use: "Decaf alternatives",
    sizes: "12oz, 2lb, 5lb",
    price: 50.00,
    image: "https://images.unsplash.com/photo-1552346990-3543163013ba?q=80&w=2070&auto=format&fit=crop"
  }
]

export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const { addItem } = useCart()

  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter(p => p.roast === activeFilter)

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: "5lb" // Defaulting to 5lb for wholesale
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      
      {/* Header */}
      <section className="bg-coffee-dark text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wholesale Catalog</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Our current selection of single origins and blends. 
            Login to the portal for real-time pricing and availability.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 container mx-auto px-4 md:px-6">
        
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-4 rounded-xl shadow-sm border border-coffee-light/20">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <span className="flex items-center gap-2 font-semibold text-coffee-dark whitespace-nowrap">
              <Filter className="h-4 w-4" /> Filter by Roast:
            </span>
            {["All", "Light", "Medium", "Dark"].map((roast) => (
              <button
                key={roast}
                onClick={() => setActiveFilter(roast)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeFilter === roast
                    ? "bg-brand-purple text-white"
                    : "bg-coffee-light/20 text-coffee-dark hover:bg-coffee-light/40"
                }`}
              >
                {roast}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
             <Button variant="outline" className="gap-2 w-full md:w-auto" asChild>
              <a href="/sweetbeanswholesale/wholesale-catalog.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                Download PDF Catalog
              </a>
            </Button>
            <Button className="gap-2 w-full md:w-auto" asChild>
              <Link href="/wholesale/apply">
                Request Samples
              </Link>
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-coffee-light/20 hover:shadow-md transition-all hover:border-brand-purple/30">
              <div className="relative h-64 overflow-hidden bg-coffee-light/10">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide shadow-sm ${
                    product.roast === 'Light' ? 'bg-amber-100 text-amber-800' :
                    product.roast === 'Medium' ? 'bg-coffee-light text-coffee-dark' :
                    'bg-coffee-dark text-white'
                  }`}>
                    {product.roast} Roast
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-coffee-dark">{product.name}</h3>
                    <span className="text-xs font-mono text-coffee-medium/60">{product.id}</span>
                  </div>
                  <p className="text-brand-purple font-medium text-sm">{product.origin}</p>
                </div>

                <div className="space-y-3 pt-2 border-t border-coffee-light/20">
                  <div>
                    <span className="text-xs text-coffee-medium uppercase tracking-wider font-semibold">Tasting Notes</span>
                    <p className="text-coffee-dark font-medium">{product.notes}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-coffee-medium uppercase tracking-wider font-semibold">Acidity</span>
                      <p className="text-coffee-dark">{product.acidity}</p>
                    </div>
                    <div>
                      <span className="text-xs text-coffee-medium uppercase tracking-wider font-semibold">Best For</span>
                      <p className="text-coffee-dark">{product.use}</p>
                    </div>
                  </div>
                  <div>
                      <span className="text-xs text-coffee-medium uppercase tracking-wider font-semibold">Available Sizes</span>
                      <p className="text-coffee-dark">{product.sizes}</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-coffee-light/20">
                  <div className="flex flex-col">
                    <span className="text-xs text-coffee-medium">Wholesale Price (5lb)</span>
                    <span className="text-lg font-bold text-coffee-dark">${product.price.toFixed(2)}</span>
                  </div>
                  <Button size="sm" onClick={() => handleAddToCart(product)} className="gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sampler Box Promo */}
      <section className="py-20 bg-coffee-dark/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-coffee-light/20 overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-0">
               <Image
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop"
                  alt="Coffee Sampler Box"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-brand-purple/20 mix-blend-multiply" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-3 text-brand-purple">
                <Package className="h-6 w-6" />
                <span className="font-bold tracking-wide uppercase text-sm">New Partner Offer</span>
              </div>
              <h2 className="text-3xl font-bold text-coffee-dark">Wholesale Sampler Box</h2>
              <p className="text-coffee-medium text-lg">
                Not sure where to start? Try our curated sampler box featuring 6 x 4oz bags of our most popular origins. 
                Perfect for cupping with your team.
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-coffee-dark">$25</span>
                <span className="text-coffee-medium">/ box (Credited back on your first wholesale order)</span>
              </div>
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/wholesale/apply?type=sampler">
                  Request Sampler Box
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
