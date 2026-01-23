"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, ShoppingBag, ChevronDown, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileWholesaleOpen, setMobileWholesaleOpen] = useState(false)
  const { setIsCartOpen, cartCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-coffee-light/20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-purple hover:opacity-90 transition-opacity">
            <Image src="/sweetbeanswholesale/Sweet_Beans_Logo_Jan2026.png" alt="Sweet Beans Logo" width={120} height={40} />
            <span>Sweet Beans</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-coffee-dark">
            <Link href="/" className="transition-colors hover:text-brand-purple">Home</Link>
            
            {/* Wholesale Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 transition-colors hover:text-brand-purple focus:outline-none">
                Wholesale
                <ChevronDown className="h-4 w-4" />
              </button>
              
              <div className="absolute top-full left-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="bg-white border border-coffee-light/20 rounded-xl shadow-xl overflow-hidden">
                  <div className="p-2 space-y-1">
                    <Link href="/wholesale" className="block px-4 py-2 rounded-lg hover:bg-cream text-coffee-dark hover:text-brand-purple transition-colors">
                      <span className="font-semibold block">Overview</span>
                      <span className="text-xs text-coffee-medium font-normal">Program benefits & details</span>
                    </Link>
                    <Link href="/wholesale/catalog" className="block px-4 py-2 rounded-lg hover:bg-cream text-coffee-dark hover:text-brand-purple transition-colors">
                      <span className="font-semibold block">Catalog</span>
                      <span className="text-xs text-coffee-medium font-normal">Browse our coffee selection</span>
                    </Link>
                    <Link href="/wholesale/apply" className="block px-4 py-2 rounded-lg hover:bg-cream text-coffee-dark hover:text-brand-purple transition-colors">
                      <span className="font-semibold block">Apply Now</span>
                      <span className="text-xs text-coffee-medium font-normal">Start your wholesale account</span>
                    </Link>
                  </div>
                  <div className="bg-coffee-light/10 p-2 border-t border-coffee-light/10">
                    <Link href="/wholesale/login" className="px-4 py-2 rounded-lg hover:bg-white text-coffee-dark hover:text-brand-purple transition-colors flex items-center justify-between group/login">
                      <span className="font-semibold">Portal Login</span>
                      <ChevronDown className="h-4 w-4 -rotate-90 opacity-0 group-hover/login:opacity-100 transition-opacity" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/roastery" className="transition-colors hover:text-brand-purple">Roastery</Link>
            <Link href="/about" className="transition-colors hover:text-brand-purple">About</Link>
            <Link href="/contact" className="transition-colors hover:text-brand-purple">Contact</Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
             <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-brand-purple text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Open Cart</span>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/shop">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop Retail
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/wholesale/apply">Get Wholesale</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-brand-purple text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Open Cart</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-coffee-light/20 bg-background max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className="text-coffee-dark hover:text-brand-purple font-medium py-3 border-b border-coffee-light/10"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Wholesale Accordion */}
              <div className="border-b border-coffee-light/10">
                <button 
                  onClick={() => setMobileWholesaleOpen(!mobileWholesaleOpen)}
                  className="flex items-center justify-between w-full text-coffee-dark hover:text-brand-purple font-medium py-3"
                >
                  Wholesale
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileWholesaleOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileWholesaleOpen && (
                  <div className="pl-4 pb-3 space-y-2 bg-cream/30 -mx-4 px-8 py-4 inner-shadow">
                    <Link href="/wholesale" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-coffee-medium hover:text-brand-purple">
                      Overview
                    </Link>
                    <Link href="/wholesale/catalog" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-coffee-medium hover:text-brand-purple">
                      Catalog
                    </Link>
                    <Link href="/wholesale/apply" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-coffee-medium hover:text-brand-purple">
                      Apply Now
                    </Link>
                     <Link href="/wholesale/login" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-semibold text-brand-purple">
                      Portal Login
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/roastery"
                className="text-coffee-dark hover:text-brand-purple font-medium py-3 border-b border-coffee-light/10"
                onClick={() => setIsOpen(false)}
              >
                Roastery
              </Link>
              <Link
                href="/about"
                className="text-coffee-dark hover:text-brand-purple font-medium py-3 border-b border-coffee-light/10"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-coffee-dark hover:text-brand-purple font-medium py-3 border-b border-coffee-light/10"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </nav>
            <div className="flex flex-col gap-3 pt-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/shop" onClick={() => setIsOpen(false)}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shop Retail
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/wholesale/apply" onClick={() => setIsOpen(false)}>
                  Get Wholesale
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
