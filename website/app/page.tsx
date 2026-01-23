import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Coffee, MapPin, Store } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 z-0">
          <video
            src="https://img1.wsimg.com/blobby/go/0815fdc9-aafc-4fe1-99f8-dedc9ba0e23b/video/pulled%20pork%20sandwich.mp4"
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
            title="Coffee Roasting Video"
          ></video>
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
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop"
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
                  src="https://images.unsplash.com/photo-1611854779393-1b2ae9bc4048?q=80&w=2000&auto=format&fit=crop"
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
                  src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2080&auto=format&fit=crop"
                  alt="Ethiopia Coffee"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-coffee-dark">Ethiopia</h3>
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
                  src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2070&auto=format&fit=crop"
                  alt="Sumatra Coffee"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-coffee-dark">Sumatra</h3>
              <span className="px-3 py-1 bg-coffee-dark text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                Dark Roast
              </span>
              <p className="text-coffee-medium">
                Cedar, dark chocolate, and cherries. Bold, low acidity, and rich body.
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
