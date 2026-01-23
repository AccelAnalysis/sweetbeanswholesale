import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Users, Coffee, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
            alt="Coffee Community"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Sweet Beans</h1>
          <p className="text-xl text-white/90">
            Fresh Roasted in Hampton. Rooted in Community.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
               <Image
                  src="https://images.unsplash.com/photo-1511537632536-b7a5758742af?q=80&w=2070&auto=format&fit=crop"
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl font-bold text-coffee-dark">More Than Just Coffee</h2>
              <p className="text-coffee-medium leading-relaxed">
                Sweet Beans Coffee & Roastery began with a simple mission: to serve Hampton Roads with coffee that tastes like home. 
                We believe that a coffee shop should be more than a place to get caffeine—it should be a &quot;third place&quot; where the 
                community comes together.
              </p>
              <p className="text-coffee-medium leading-relaxed">
                We roast our beans in small batches right here in Hampton, ensuring that every cup you drink is as fresh as possible. 
                Whether you&apos;re visiting our cafe on Commander Shepard Blvd or brewing our beans at home, you&apos;re part of the Sweet Beans family.
              </p>
              <div className="pt-4">
                <Button asChild>
                  <Link href="/roastery">See Our Roasting Process</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-coffee-dark mb-4">Our Core Values</h2>
            <p className="text-coffee-medium text-lg max-w-2xl mx-auto">
              These principles guide every batch we roast and every cup we pour.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-coffee-light/20 text-center">
              <div className="h-16 w-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-purple">
                <Coffee className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-coffee-dark mb-3">Quality Consistency</h3>
              <p className="text-coffee-medium">
                We obsession over roast profiles and sourcing to ensure your favorite blend tastes perfect every time.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-coffee-light/20 text-center">
              <div className="h-16 w-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-purple">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-coffee-dark mb-3">Community First</h3>
              <p className="text-coffee-medium">
                We are proud to be a Hampton business. We support local events, partners, and causes that make our city better.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-coffee-light/20 text-center">
              <div className="h-16 w-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-purple">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-coffee-dark mb-3">Approachable Specialty</h3>
              <p className="text-coffee-medium">
                Great coffee shouldn&apos;t be pretentious. We&apos;re here to help you find what you love, no gatekeeping allowed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
           <div className="bg-coffee-dark text-white rounded-3xl p-12 md:p-20 relative overflow-hidden">
             <div className="relative z-10 space-y-6">
               <h2 className="text-3xl md:text-5xl font-bold">Join Our Team</h2>
               <p className="text-white/80 max-w-2xl mx-auto text-lg">
                 We&apos;re always looking for passionate people to join our cafe and roastery teams.
               </p>
               <Button size="lg" className="bg-white text-coffee-dark hover:bg-cream" asChild>
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
             </div>
             {/* Abstract Pattern Overlay */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple rounded-full blur-3xl opacity-20 -mr-32 -mt-32" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple rounded-full blur-3xl opacity-20 -ml-32 -mb-32" />
           </div>
        </div>
      </section>

    </div>
  )
}
