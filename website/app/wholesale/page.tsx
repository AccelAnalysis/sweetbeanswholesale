import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Truck, Users, Coffee, Store, Building2, UtensilsCrossed } from "lucide-react"

export default function WholesalePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center bg-coffee-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511537632536-b7a5758742af?q=80&w=2070&auto=format&fit=crop"
            alt="Wholesale Coffee"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Wholesale Fresh-Roasted Coffee for Hampton Roads
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Local small-batch roasting with reliable delivery and expert support for cafes, offices, and restaurants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/wholesale/apply">
                  Request Free Samples
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white" asChild>
                <Link href="/wholesale/catalog">
                  View Catalog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-coffee-dark">Built for Local Business</h2>
            <p className="text-coffee-medium text-lg max-w-2xl mx-auto">
              We provide tailored coffee programs for partners across the Peninsula and Southside.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Store,
                title: "Cafes",
                desc: "Complete espresso programs, seasonal rotations, and barista training to help you stand out.",
              },
              {
                icon: Building2,
                title: "Offices",
                desc: "Upgrade your breakroom with consistent, fresh drip coffee that keeps your team fueled.",
              },
              {
                icon: UtensilsCrossed,
                title: "Restaurants",
                desc: "Custom blends and reliable supply that matches the quality of your food menu.",
              },
              {
                icon: Users,
                title: "Institutions",
                desc: "Scalable solutions for churches, events, and community organizations.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-coffee-light/20 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-6 text-brand-purple">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-coffee-dark mb-3">{item.title}</h3>
                <p className="text-coffee-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Sweet Beans */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop"
                alt="Barista Training"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-coffee-dark">Why Partner With Us?</h2>
                <p className="text-coffee-medium text-lg">
                  We&apos;re not just a supplier; we&apos;re your local coffee partner. We understand that consistency and reliability are just as important as flavor.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Roasted Fresh in Hampton",
                    desc: "Beans are roasted to order in our local facility, ensuring peak freshness for your customers.",
                  },
                  {
                    title: "Reliable Local Delivery",
                    desc: "Weekly or bi-weekly delivery schedules to Hampton, Newport News, and surrounding areas.",
                  },
                  {
                    title: "Training & Calibration",
                    desc: "On-site barista training and equipment dial-in support to ensure every cup tastes perfect.",
                  },
                  {
                    title: "Ethical Sourcing",
                    desc: "We prioritize direct trade and ethically sourced beans that support farming communities.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="mt-1 shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-brand-purple" />
                    </div>
                    <div>
                      <h3 className="font-bold text-coffee-dark text-lg">{item.title}</h3>
                      <p className="text-coffee-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button asChild>
                  <Link href="/roastery">Learn More About Our Process</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-coffee-dark mb-4">Wholesale Coffee Programs</h2>
            <p className="text-coffee-medium text-lg max-w-2xl mx-auto">
              From house blends to single-origin features, we have the right profile for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-coffee-light/20">
              <div className="h-48 bg-coffee-dark relative">
                <div className="absolute inset-0 flex items-center justify-center">
                   <Coffee className="h-16 w-16 text-white/20" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-coffee-dark mb-2">House Espresso</h3>
                <p className="text-coffee-medium mb-4">
                  Brazilian-based blends designed for milk pairing. Chocolate, caramel, and smooth body.
                </p>
                <span className="inline-block px-3 py-1 bg-coffee-light/30 text-coffee-dark text-xs font-semibold rounded-full">
                  Medium Roast
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-coffee-light/20">
              <div className="h-48 bg-coffee-medium relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                   <Coffee className="h-16 w-16 text-white/20" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-coffee-dark mb-2">Classic Drip</h3>
                <p className="text-coffee-medium mb-4">
                  Crowd-pleasing blends (Colombia/Guatemala) perfect for breakfast service and office pots.
                </p>
                <span className="inline-block px-3 py-1 bg-coffee-light/30 text-coffee-dark text-xs font-semibold rounded-full">
                  Medium-Dark Roast
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-coffee-light/20">
              <div className="h-48 bg-brand-purple relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                   <Coffee className="h-16 w-16 text-white/20" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-coffee-dark mb-2">Seasonal Single Origins</h3>
                <p className="text-coffee-medium mb-4">
                  Rotating selections from Ethiopia, Kenya, and beyond for pour-over bars and retail shelves.
                </p>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                  Light Roast
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white border-y border-coffee-light/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-coffee-dark">Trusted by Hampton Roads Businesses</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "Switched to Sweet Beans for better flavor consistency—highly recommend! Our customers noticed the difference immediately.",
                author: "Sarah J.",
                role: "Owner, Harbor Cafe",
              },
              {
                quote: "The team at Sweet Beans helped us dial in our espresso machine and trained our staff. The support is unmatched.",
                author: "Mike T.",
                role: "Manager, Downtown Bakery",
              },
              {
                quote: "Reliable delivery and fresh beans every week. It's one less thing for me to worry about as a business owner.",
                author: "Jessica R.",
                role: "Director, TechPark Office",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-cream p-8 rounded-xl relative">
                <div className="absolute top-6 left-6 text-brand-purple/20">
                  <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.096 14.017 14.742 14.017 13.938C14.017 13.134 14.017 12.33 14.017 11.526C14.017 10.722 14.017 9.918 14.017 9.114L14.017 6L21 6L21 13C21 14.904 20.306 16.516 18.918 17.836C17.53 19.156 15.896 20.211 14.017 21ZM5.017 21L5.017 18C5.017 16.096 5.017 14.742 5.017 13.938C5.017 13.134 5.017 12.33 5.017 11.526C5.017 10.722 5.017 9.918 5.017 9.114L5.017 6L12 6L12 13C12 14.904 11.306 16.516 9.918 17.836C8.53 19.156 6.896 20.211 5.017 21Z" />
                  </svg>
                </div>
                <p className="text-coffee-dark text-lg relative z-10 mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-coffee-light/30 rounded-full flex items-center justify-center font-bold text-coffee-dark">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-coffee-dark">{testimonial.author}</p>
                    <p className="text-sm text-coffee-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Placeholders for Partner Logos */}
             <div className="h-16 flex items-center justify-center font-bold text-xl text-coffee-medium border-2 border-dashed border-coffee-light/30 rounded-lg">
                Partner 1
             </div>
             <div className="h-16 flex items-center justify-center font-bold text-xl text-coffee-medium border-2 border-dashed border-coffee-light/30 rounded-lg">
                Partner 2
             </div>
             <div className="h-16 flex items-center justify-center font-bold text-xl text-coffee-medium border-2 border-dashed border-coffee-light/30 rounded-lg">
                Partner 3
             </div>
             <div className="h-16 flex items-center justify-center font-bold text-xl text-coffee-medium border-2 border-dashed border-coffee-light/30 rounded-lg">
                Partner 4
             </div>
          </div>
          
          <div className="text-center mt-12 pt-8 border-t border-coffee-light/10">
            <p className="text-coffee-medium font-semibold">
              Proudly serving <span className="text-brand-purple text-xl mx-1">50+</span> businesses across Virginia
            </p>
          </div>
        </div>
      </section>

      {/* Logistics & CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Logistics */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-coffee-dark">Logistics Made Simple</h2>
              <div className="grid gap-6">
                <div className="flex gap-4 p-4 bg-cream rounded-lg border border-coffee-light/20">
                  <Truck className="h-6 w-6 text-brand-purple mt-1" />
                  <div>
                    <h3 className="font-bold text-coffee-dark">Delivery Zones</h3>
                    <p className="text-sm text-coffee-medium mt-1">
                      Free delivery in Hampton, Newport News, Yorktown, and Poquoson. 
                      Low-cost delivery to Norfolk, Virginia Beach, and Suffolk.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-cream rounded-lg border border-coffee-light/20">
                  <Store className="h-6 w-6 text-brand-purple mt-1" />
                  <div>
                    <h3 className="font-bold text-coffee-dark">Minimums & Lead Times</h3>
                    <p className="text-sm text-coffee-medium mt-1">
                      Low 10lb minimum per order. 3-5 day lead time for roasting and delivery.
                      Pickup available at our Hampton roastery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Funnel */}
            <div className="bg-coffee-dark text-white p-8 rounded-2xl shadow-xl flex flex-col justify-center space-y-6">
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="text-white/90">
                Join 50+ local businesses serving the best coffee in Hampton Roads.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-brand-purple flex items-center justify-center font-bold text-sm">1</div>
                  <p>Request free samples of our core roasts</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-brand-purple flex items-center justify-center font-bold text-sm">2</div>
                  <p>Approve your wholesale account</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-brand-purple flex items-center justify-center font-bold text-sm">3</div>
                  <p>Place your first order online</p>
                </div>
              </div>

              <div className="pt-4">
                <Button size="lg" className="w-full bg-white text-coffee-dark hover:bg-cream" asChild>
                  <Link href="/wholesale/apply">
                    Start Wholesale Application
                  </Link>
                </Button>
                <p className="text-center text-xs text-white/60 mt-4">
                  No commitment required. Samples ship in 2 days.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
