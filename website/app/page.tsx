import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Coffee, MapPin, Store } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://player.vimeo.com/video/1157684253?background=1&autoplay=1&loop=1&byline=0&title=0"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full aspect-video max-w-none md:w-full md:h-[56.25vw] md:aspect-auto pointer-events-none"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="relative z-20 container mx-auto px-4 max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Fresh Roasted in Hampton,<br />Serving Hampton Roads.
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            We are a community-driven small-batch roastery dedicated to consistent quality, 
            local partnerships, and the perfect cup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/wholesale">
                Explore Wholesale
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white" asChild>
              <Link href="/roastery">
                Visit Roastery
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Segments Grid */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Wholesale Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-coffee-light/20 hover:shadow-xl transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511537632536-b7a5758742af?q=80&w=2070&auto=format&fit=crop"
                  alt="Wholesale Coffee Bags"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-8">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Store className="h-8 w-8 text-brand-purple-light" />
                    For Business
                  </h2>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <p className="text-coffee-dark/80 text-lg">
                  Partner with a local roaster that understands your needs. reliable delivery, 
                  barista training, and custom blends for cafes, restaurants, and offices.
                </p>
                <ul className="space-y-2 text-coffee-medium mb-6">
                  <li className="flex items-center gap-2">✓ Fresh Roasted in Hampton</li>
                  <li className="flex items-center gap-2">✓ Free Local Delivery</li>
                  <li className="flex items-center gap-2">✓ Equipment & Training Support</li>
                </ul>
                <Button className="w-full sm:w-auto" asChild>
                  <Link href="/wholesale">
                    View Wholesale Program
                  </Link>
                </Button>
              </div>
            </div>

            {/* Retail/Cafe Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-coffee-light/20 hover:shadow-xl transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop"
                  alt="Cafe Interior"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-8">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Coffee className="h-8 w-8 text-brand-purple-light" />
                    Visit the Cafe
                  </h2>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <p className="text-coffee-dark/80 text-lg">
                  Experience our third-place vibe. Grab a signature latte, meet with friends, 
                  or get some work done in our comfortable Hampton roastery cafe.
                </p>
                <div className="flex items-start gap-3 text-coffee-medium mb-6 bg-coffee-light/20 p-4 rounded-lg">
                  <MapPin className="h-5 w-5 mt-1 shrink-0 text-brand-purple" />
                  <div>
                    <p className="font-semibold text-coffee-dark">Sweet Beans Roastery</p>
                    <p>3355 Commander Shepard Blvd, Suite C</p>
                    <p>Hampton, VA 23666</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href="/roastery">
                    Cafe Menu & Hours
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Roasts Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-bold text-coffee-dark">Fresh from the Roaster</h2>
            <p className="text-coffee-medium max-w-2xl mx-auto">
              Small-batch coffees roasted right here in Hampton. Available for retail and wholesale.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Roast 1 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl border border-coffee-light/30 hover:border-brand-purple/30 transition-colors">
              <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg mb-4">
                 <Image
                  src="https://images.unsplash.com/photo-1621251399450-4222df422273?q=80&w=2000&auto=format&fit=crop"
                  alt="Brazil Coffee"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-coffee-dark">Brazil</h3>
              <span className="px-3 py-1 bg-coffee-light/30 text-coffee-dark text-xs font-semibold rounded-full uppercase tracking-wide">
                Medium Roast
              </span>
              <p className="text-coffee-medium">
                Caramel, toffee, and a mellow balance. The perfect base for espresso or a smooth daily drip.
              </p>
            </div>

            {/* Roast 2 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl border border-coffee-light/30 hover:border-brand-purple/30 transition-colors">
              <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg mb-4">
                 <Image
                  src="https://images.unsplash.com/photo-1587049352851-8d4e8918685f?q=80&w=2000&auto=format&fit=crop"
                  alt="Ethiopia Coffee"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-coffee-dark">Ethiopia Yirgacheffe</h3>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full uppercase tracking-wide">
                Light Roast
              </span>
              <p className="text-coffee-medium">
                Citrus, floral, and tropical fruits with jasmine notes. Bright and complex for pour-overs.
              </p>
            </div>

            {/* Roast 3 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl border border-coffee-light/30 hover:border-brand-purple/30 transition-colors">
              <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg mb-4">
                 <Image
                  src="https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=2000&auto=format&fit=crop"
                  alt="Decaf Mexico Coffee"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-coffee-dark">Decaf Mexico</h3>
              <span className="px-3 py-1 bg-coffee-dark text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                Decaf
              </span>
              <p className="text-coffee-medium">
                Swiss Water Process. Chocolate, cinnamon, and graham cracker. Smooth and caffeine-free.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="secondary" asChild>
              <Link href="/wholesale/catalog">View Full Wholesale Catalog</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
