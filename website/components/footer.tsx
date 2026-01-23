"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react"
import { useState } from "react"
import { submitToGoogleSheet } from "@/lib/api"

export function Footer() {
  return (
    <footer className="w-full bg-coffee-dark text-coffee-light border-t border-coffee-light/10">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <Image src="/sweetbeanswholesale/Sweet_Beans_Logo_Jan2026.png" alt="Sweet Beans Logo" width={120} height={40} />
              <span>Sweet Beans</span>
            </Link>
            <p className="text-sm text-coffee-light/80">
              Fresh Roasted in Hampton, Serving Hampton Roads. Local small-batch roasting with reliable delivery and expert support.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/sweetbeanscs/" target="_blank" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/wholesale" className="hover:text-brand-purple-light transition-colors">
                  Wholesale Program
                </Link>
              </li>
              <li>
                <Link href="/wholesale/catalog" className="hover:text-brand-purple-light transition-colors">
                  View Catalog
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-brand-purple-light transition-colors">
                  Shop Retail
                </Link>
              </li>
              <li>
                <Link href="/roastery" className="hover:text-brand-purple-light transition-colors">
                  Our Roastery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>
                  3355 Commander Shepard Blvd<br />
                  Suite C<br />
                  Hampton, VA 23666
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:757-964-6925" className="hover:text-white transition-colors">
                  757-964-6925
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:sweetbeanscs@gmail.com" className="hover:text-white transition-colors">
                  sweetbeanscs@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter (Mockup) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Wholesale Updates</h3>
            <p className="text-sm text-coffee-light/80">
              Subscribe for roast updates and seasonal offerings.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-coffee-light/10 text-center text-xs text-coffee-light/60">
          <p>&copy; {new Date().getFullYear()} Sweet Beans Coffee & Roastery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitToGoogleSheet({
        type: 'subscription',
        email: email
      })

      setIsSuccess(true)
      setEmail("")
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-sm text-green-300">
        Thanks! You&apos;ll receive updates soon.
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-coffee-dark/50 border border-coffee-light/20 rounded-md px-3 py-2 text-sm text-white placeholder:text-coffee-light/50 focus:outline-none focus:border-brand-purple-light"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-brand-purple hover:bg-brand-purple-light disabled:opacity-50 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  )
}
