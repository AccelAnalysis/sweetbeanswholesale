import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Calendar, Users, Coffee, ArrowRight } from "lucide-react"

export default function RoasteryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1598516963288-467472097746?q=80&w=2070&auto=format&fit=crop"
            alt="Sweet Beans Roastery"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Roastery</h1>
          <p className="text-xl text-white/90">
            The heart of Sweet Beans. Where science meets art in every batch.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-coffee-dark">Roasted with Purpose in Hampton</h2>
              <p className="text-coffee-medium leading-relaxed">
                Located at 3355 Commander Shepard Blvd, our roastery is designed for transparency and community. 
                We roast in small batches on our state-of-the-art equipment to ensure that every bean reaches its 
                full potential.
              </p>
              <p className="text-coffee-medium leading-relaxed">
                We believe in ethical sourcing and building direct relationships with producers where possible. 
                Our goal is to bring the complex flavors of the world&apos;s best coffee regions to Hampton Roads 
                in an approachable, unpretentious way.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 bg-cream rounded-xl border border-coffee-light/20">
                  <div className="flex items-center gap-2 font-bold text-coffee-dark mb-2">
                    <MapPin className="h-5 w-5 text-brand-purple" />
                    <span>Visit Us</span>
                  </div>
                  <p className="text-sm text-coffee-medium">
                    3355 Commander Shepard Blvd<br />
                    Suite C<br />
                    Hampton, VA 23666
                  </p>
                </div>
                 <div className="p-4 bg-cream rounded-xl border border-coffee-light/20">
                  <div className="flex items-center gap-2 font-bold text-coffee-dark mb-2">
                    <Clock className="h-5 w-5 text-brand-purple" />
                    <span>Hours</span>
                  </div>
                  <p className="text-sm text-coffee-medium">
                    Mon-Fri: 7am - 4pm<br />
                    Sat-Sun: 8am - 3pm
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
               <Image
                  src="https://images.unsplash.com/photo-1525640788966-69bdb028aa73?q=80&w=2076&auto=format&fit=crop"
                  alt="Roasting Process"
                  fill
                  className="object-cover"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Events & Community */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-coffee-dark mb-4">Community & Events</h2>
            <p className="text-coffee-medium text-lg max-w-2xl mx-auto">
              We&apos;re more than just a roastery. We&apos;re a gathering place for the community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee-light/20">
              <Calendar className="h-10 w-10 text-brand-purple mb-4" />
              <h3 className="text-xl font-bold text-coffee-dark mb-2">Public Cuppings</h3>
              <p className="text-coffee-medium mb-4">
                Join us every first Saturday of the month at 10am to taste our newest roasts and learn about coffee origins.
              </p>
              <span className="text-sm font-semibold text-brand-purple">Free to attend</span>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee-light/20">
              <Users className="h-10 w-10 text-brand-purple mb-4" />
              <h3 className="text-xl font-bold text-coffee-dark mb-2">Wholesale Training</h3>
              <p className="text-coffee-medium mb-4">
                Dedicated training sessions for our wholesale partners. Espresso dialing, milk steaming, and workflow efficiency.
              </p>
              <span className="text-sm font-semibold text-brand-purple">By Appointment</span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-coffee-light/20">
              <Coffee className="h-10 w-10 text-brand-purple mb-4" />
              <h3 className="text-xl font-bold text-coffee-dark mb-2">Book a Tour</h3>
              <p className="text-coffee-medium mb-4">
                Interested in how it works? We offer private tours for groups and schools interested in the roasting process.
              </p>
              <span className="text-sm font-semibold text-brand-purple">Contact to schedule</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form CTA */}
      <section className="py-16 bg-coffee-dark text-white">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold">Experience Sweet Beans</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Whether you want to schedule a tasting for your business or just say hello, we&apos;d love to host you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button size="lg" className="bg-brand-purple hover:bg-brand-purple-light text-white border-0" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10 hover:text-white" asChild>
               <Link href="/wholesale">
                Partner With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
