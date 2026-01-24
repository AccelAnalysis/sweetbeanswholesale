"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle2, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { submitToGoogleSheet } from "@/lib/api"

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    paymentPreference: "invoice",
    notes: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const isRetail = items.every(item => item.id.startsWith("RET-"))
    const type = isRetail ? 'retail' : 'quote'

    try {
      await submitToGoogleSheet({
          type,
          customerName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          items: items,
          totalValue: cartTotal.toFixed(2),
          paymentPreference: formData.paymentPreference,
          notes: formData.notes
      })

      setIsSuccess(true)
      clearCart()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Checkout error:', error)
      alert('There was a problem submitting your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-cream py-12 flex items-center justify-center">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-lg w-full text-center space-y-6 border border-coffee-light/20 mx-4">
          <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-coffee-dark">Consultation Requested!</h1>
          <p className="text-coffee-medium text-lg">
            Thank you, {formData.firstName}. We have received your request.
          </p>
          <div className="bg-cream/50 p-4 rounded-lg text-sm text-coffee-medium text-left space-y-2">
            <p><strong>Next Steps:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>A Sweet Beans representative will call you within 24 hours to discuss your order and payment.</li>
              <li>We&apos;ll send a personalized invoice including shipping and final pricing.</li>
              <li>Once approved, we&apos;ll roast fresh coffee specifically for your order and arrange delivery.</li>
            </ol>
          </div>
          <Button size="lg" className="w-full" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <ShoppingBag className="h-16 w-16 text-coffee-medium/30 mx-auto" />
          <h1 className="text-3xl font-bold text-coffee-dark">Your cart is empty</h1>
          <p className="text-coffee-medium">Looks like you haven&apos;t added any wholesale items yet.</p>
          <Button asChild>
            <Link href="/wholesale/catalog">Browse Catalog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <Link href="/wholesale/catalog" className="text-coffee-medium hover:text-brand-purple flex items-center gap-2 text-sm font-medium mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Catalog
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-2">Request a Custom Quote & Consultation</h1>
          <p className="text-coffee-medium max-w-3xl">
            Our dedicated wholesale team will personally call you to discuss your order details, confirm pricing, and arrange payment—making the process seamless and tailored to your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-coffee-light/20 space-y-8">
              
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-coffee-dark border-b border-coffee-light/20 pb-2">
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      required 
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      required 
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-coffee-medium">
                      Required for our representative to provide personalized service and discuss your order.
                    </p>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="company">Company / Business Name</Label>
                    <Input 
                      id="company" 
                      name="company"
                      required 
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Preference */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-coffee-dark border-b border-coffee-light/20 pb-2">
                  Payment Preference
                </h2>
                <p className="text-sm text-coffee-medium">
                  Our team will call you to discuss payment options and finalize the best method for your business.
                </p>
                <RadioGroup 
                  defaultValue="invoice" 
                  name="paymentPreference"
                  onValueChange={(value) => setFormData(prev => ({ ...prev, paymentPreference: value }))}
                  className="grid gap-4"
                >
                  <div className="flex items-center space-x-2 border border-coffee-light/20 p-4 rounded-lg bg-cream/20">
                    <RadioGroupItem value="invoice" id="invoice" />
                    <Label htmlFor="invoice" className="cursor-pointer font-medium">Card Online (via Invoice Link)</Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-coffee-light/20 p-4 rounded-lg bg-cream/20">
                    <RadioGroupItem value="ach" id="ach" />
                    <Label htmlFor="ach" className="cursor-pointer font-medium">ACH / Bank Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-coffee-light/20 p-4 rounded-lg bg-cream/20">
                    <RadioGroupItem value="check" id="check" />
                    <Label htmlFor="check" className="cursor-pointer font-medium">Check by Mail</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Order Notes / Delivery Instructions</Label>
                <Textarea 
                  id="notes" 
                  name="notes"
                  placeholder="Any special requests?" 
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>

            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-coffee-light/20 sticky top-24">
              <h2 className="text-xl font-bold text-coffee-dark mb-4">Order Summary</h2>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3 text-sm">
                    <div className="relative h-16 w-16 bg-cream rounded-md overflow-hidden shrink-0 border border-coffee-light/10">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-coffee-light/20">
                          <ShoppingBag className="h-6 w-6 text-coffee-medium/50" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-coffee-dark">{item.name}</p>
                      <p className="text-coffee-medium">{item.size} x {item.quantity}</p>
                    </div>
                    <div className="font-semibold text-coffee-dark">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-coffee-light/20 pt-4 space-y-2">
                <div className="flex justify-between text-coffee-medium">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-coffee-medium">
                  <span>Shipping</span>
                  <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded-full">Calculated on Invoice</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-coffee-dark pt-2">
                  <span>Estimated Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                className="w-full mt-6" 
                size="lg" 
                onClick={() => {
                    const form = document.getElementById('checkout-form') as HTMLFormElement;
                    if (form.checkValidity()) {
                        form.requestSubmit();
                    } else {
                        form.reportValidity();
                    }
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Personal Consultation"
                )}
              </Button>
              <p className="text-xs text-center text-coffee-medium mt-4">
                Our representative will call you within 24 hours to complete your order.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
