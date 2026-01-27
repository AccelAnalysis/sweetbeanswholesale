"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { useMenu } from "@/components/menu-provider"
import { MapPin, Clock, Coffee, ArrowRight, Utensils, ShoppingBag, Gift } from "lucide-react"

function getCategoryIcon(iconName?: string) {
  if (iconName === "Coffee") return <Coffee className="h-6 w-6 text-brand-purple" />
  if (iconName === "Utensils") return <Utensils className="h-6 w-6 text-brand-purple" />
  if (iconName === "Gift") return <Gift className="h-6 w-6 text-brand-purple" />
  if (iconName === "ShoppingBag") return <ShoppingBag className="h-6 w-6 text-brand-purple" />
  return undefined
}

export default function CafePage() {
  const { data } = useMenu()

  const heroAsset = useMemo(() => {
    return data.siteAssets.find(
      (a) => a.page === "cafe" && a.location === "hero-background" && a.type === "image"
    )
  }, [data.siteAssets])

  const menuCategories = useMemo(() => {
    return data.cafeCategories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      icon: getCategoryIcon(cat.icon),
      items: data.cafeItems.filter((it) => it.categoryId === cat.id),
    }))
  }, [data.cafeCategories, data.cafeItems])

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src={
              heroAsset?.url ||
              "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop"
            }
            alt="Sweet Beans Cafe Interior"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Welcome to the Cafe
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Experience our third-place vibe. Grab a signature latte, meet with friends, 
            or get some work done in our comfortable Hampton roastery cafe.
          </p>
          <div className="pt-4">
             <Button size="lg" className="bg-brand-purple hover:bg-brand-purple-light text-white border-0" asChild>
               <Link href="#menu">
                 View Menu
               </Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Location & Hours Bar */}
      <section className="bg-white border-b border-coffee-light/20 shadow-sm relative z-30 -mt-8 mx-4 md:mx-auto max-w-5xl rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-coffee-light/20">
          <div className="p-6 md:p-8 flex items-start gap-4">
            <MapPin className="h-6 w-6 text-brand-purple shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-coffee-dark text-lg mb-2">Visit Us</h3>
              <p className="text-coffee-medium">
                3355 Commander Shepard Blvd, Suite C<br />
                Hampton, VA 23666
              </p>
              <a 
                href="https://www.google.com/maps/place/Sweet+Beans+Coffee+Bar/@37.0930618,-76.3958294,17z/data=!3m1!4b1!4m6!3m5!1s0x89ba83935cec8a43:0x7b35e220bcb5c8ae!8m2!3d37.0930618!4d-76.3932545!16s%2Fg%2F11h0zcwn5x!5m2!1e4!1e1?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-brand-purple text-sm font-semibold mt-2 hover:underline"
              >
                Get Directions <ArrowRight className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
          <div className="p-6 md:p-8 flex items-start gap-4">
            <Clock className="h-6 w-6 text-brand-purple shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-coffee-dark text-lg mb-2">Cafe Hours</h3>
              <ul className="space-y-1 text-coffee-medium">
                <li className="flex justify-between w-48"><span>Mon - Fri:</span> <span>7am - 4pm</span></li>
                <li className="flex justify-between w-48"><span>Sat - Sun:</span> <span>8am - 4pm</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Menu Section */}
      <section id="menu" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark flex items-center justify-center gap-3">
              <Coffee className="h-8 w-8 text-brand-purple" />
              Cafe Menu
            </h2>
            <p className="text-coffee-medium max-w-2xl mx-auto text-lg">
              Freshly prepared in-house. From morning boosts to sweet treats.
            </p>
          </div>

          <div className="space-y-20">
            {menuCategories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-8 border-b-2 border-brand-purple/20 pb-4">
                  {category.icon}
                  <h3 className="text-2xl font-bold text-coffee-dark uppercase tracking-wide">
                    {category.title}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, index) => (
                    <div 
                      key={index} 
                      className={`
                        flex flex-col p-6 rounded-xl border transition-all duration-200
                        ${item.highlight 
                          ? 'bg-white border-brand-purple/30 shadow-md hover:shadow-lg' 
                          : 'bg-white/60 border-coffee-light/20 hover:bg-white hover:shadow-md'
                        }
                      `}
                    >
                      {(item.image || item.videoUrl) && (
                        <div className="mb-4">
                          <div className="relative w-full h-40 rounded-lg overflow-hidden bg-coffee-light/10">
                            {item.videoUrl ? (
                              <iframe
                                src={item.videoUrl}
                                className="absolute inset-0 w-full h-full"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <Image
                                src={item.image as string}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-2 pb-2 border-b border-dashed border-coffee-light/20">
                        <h4 className={`font-bold text-lg ${item.highlight ? 'text-brand-purple' : 'text-coffee-dark'}`}>
                          {item.name}
                        </h4>
                        <span className="font-bold text-coffee-dark font-mono">
                          ${item.price}
                        </span>
                      </div>
                      
                      <p className="text-coffee-medium text-sm grow leading-relaxed">
                        {item.description}
                      </p>

                      {item.note && (
                        <p className="mt-3 text-xs italic text-coffee-medium/80 bg-coffee-light/10 p-2 rounded">
                          {item.note}
                        </p>
                      )}

                      <div className="mt-6 pt-4 border-t border-coffee-light/10">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-coffee-dark hover:text-brand-purple hover:border-brand-purple"
                          asChild
                        >
                          <Link href={`/contact?subject=Order Inquiry: ${item.name}`}>
                            Contact to Order
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering CTA */}
      <section className="py-16 bg-white border-t border-coffee-light/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-coffee-dark rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
             <div className="relative z-10 max-w-2xl mx-auto space-y-6">
               <h2 className="text-3xl font-bold">Planning an Event?</h2>
               <p className="text-white/80 text-lg">
                 Our catering platters are perfect for office meetings, parties, and gatherings.
                 Please order 24 hours in advance.
               </p>
               <Button size="lg" variant="secondary" asChild>
                 <Link href="/contact?subject=Catering Inquiry">
                   Inquire About Catering
                 </Link>
               </Button>
             </div>
             {/* Decorative Background Pattern */}
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="coffee-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="currentColor"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#coffee-pattern)"/>
                </svg>
             </div>
          </div>
        </div>
      </section>

    </div>
  )
}
