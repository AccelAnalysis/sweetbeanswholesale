"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Users, Coffee, ArrowRight } from "lucide-react"
import { useMenu } from "@/components/menu-provider"

export default function AboutPage() {
  const { data } = useMenu()

  const heroAsset = data.siteAssets.find(
    (a) => a.page === "about" && a.location === "hero-background"
  )
  const storyVideo = data.siteAssets.find(
    (a) => a.page === "about" && a.location === "our-story-iframe"
  )
  const veteranOwners = data.siteAssets.find(
    (a) => a.page === "about" && a.location === "veteran-owners-image"
  )

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src={
              heroAsset?.url ||
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
            }
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
              <iframe
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                src={
                  storyVideo?.url ||
                  "https://redir1.wavy.com/nxs-video/vid-anvato-3976575/embed/?autoplay=1&injected_via=embed&post_id=186929"
                }
                rel="nofollow"
                width="640"
                height="320"
                title="Our Story Video"
              ></iframe>
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

      {/* Veteran Story */}
      <section className="py-20 bg-cream/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-coffee-dark">Veteran-Owned & Female-Led</h2>
              <div className="prose prose-lg text-coffee-medium">
                <p>
                  At Sweet Beans, it&apos;s the smiles you&apos;ll see behind the counter that truly pull you in. 
                  Nearly 10 years ago, Mallory Rugg started working as a barista when her husband first enlisted in the Army. 
                  She realized then, &quot;I just figured out what I want to do for the rest of my life, and I don&apos;t want to work for anyone else doing it.&quot;
                </p>
                <p>
                  But first, she felt called to serve and joined the U.S. Navy in 2012, working as a fire controlman. 
                  That&apos;s when she met her friend and co-owner, Heather Amodeo. &quot;Her husband and I had the same job,&quot; Rugg recalled. 
                  Their families became close, sharing dreams on the front porch.
                </p>
                <p>
                  &quot;I would tell her about my dreams... and she goes, &apos;Yeah that sounds amazing, I&apos;d love to do that.&apos; 
                  I go, &apos;Yeah you should do it with me,&apos; and then they got stationed in Hawaii,&quot; Rugg said.
                  As luck would have it, both families moved to Norfolk in 2017. &quot;She was like &apos;Are you serious about the coffee shop?&apos; 
                  I was like &apos;Yeah I am,&apos; and then we hit the ground running,&quot; said Amodeo.
                </p>
                <p>
                  While Rugg finished her enlistment and worked as an instructor on the Navy base, the two women faced the challenges 
                  of starting a business head-on. &quot;It was so much harder than I anticipated,&quot; Rugg admitted, citing endless nights 
                  working on business plans and navigating bank requirements.
                </p>
                <p>
                  Finally, they secured a loan and found their current spot near NASA Langley. Since opening, they&apos;ve built a loyal 
                  customer base. As a female and veteran-owned business, Sweet Beans is breaking stereotypes.
                  &quot;There&apos;s still kind of that idea that a woman veteran is different... but with her and with Heather, 
                  there aren&apos;t very many pairs of women who are stronger than those two,&quot; noted Rugg&apos;s husband, Ron.
                </p>
                <p>
                  Now, Rugg and Amodeo are paying it forward, using their training, story, and voices to inspire other female veterans 
                  and entrepreneurs. &quot;If you are so passionate about something and you feel like you have something you can sell, 
                  then exhaust all outlets,&quot; Amodeo advises.
                </p>
                <p className="text-sm italic mt-4">
                  Based on the story by <a href="https://www.wavy.com/news/veterans-voices/veteran-owned-coffee-shop-breaks-stereotypes-for-female-veterans/" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-purple">WAVY News 10 Veterans Voices</a>.
                </p>
              </div>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={veteranOwners?.url || "/sweetbeanswholesale/veteran-owners.jpg"}
                alt="Mallory Rugg and Heather Amodeo - Veteran Owners of Sweet Beans"
                fill
                className="object-cover"
              />
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
                <Link href="/join-team">
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
